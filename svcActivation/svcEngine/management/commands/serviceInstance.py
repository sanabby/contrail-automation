#!/usr/bin/python

#-----------------------------------------------------
#Script for provisioning contrail Service Instance
#Base version from contrail modified 
#Author Sanju Abraham - sanjua@juniper.net
#-----------------------------------------------------

import os
import sys
import errno
import subprocess
import time
import argparse
import servicePolicy

sys.path.insert(0, os.path.realpath('/usr/lib/python2.7/site-packages'))

from django.core.management.base import BaseCommand, CommandError
from vnc_api.vnc_api import *
from cfgm_common.exceptions import *

from optparse import make_option

class Command(BaseCommand):
    option_list = BaseCommand.option_list + ()

class ServiceInstanceCmd(object):
    def __init__(self, args_str = None):
        self._args = None
        if not args_str:
            args_str = ' '.join(sys.argv[1:])
        self._parse_args(args_str)

        self._proj_fq_name = [self._args.domain_name, self._args.proj_name]
        self._si_fq_name = [self._args.domain_name, self._args.proj_name, self._args.instance_name]
        self._chain_si_fq_name = [self._args.domain_name, self._args.proj_name, self._args.chained_service_name]
        self._st_fq_name = [self._args.domain_name, self._args.template_name]
        self._chain_st_fq_name = [self._args.domain_name, self._args.chained_service_template]
        self._domain_fq_name = [self._args.domain_name]
        if self._args.left_vn:
            self._left_vn_fq_name = [self._args.domain_name, self._args.proj_name, self._args.left_vn]
        if self._args.right_vn:
            self._right_vn_fq_name = [self._args.domain_name, self._args.proj_name, self._args.right_vn]
        if self._args.mgmt_vn:
            self._mgmt_vn_fq_name = [self._args.domain_name, self._args.proj_name, self._args.mgmt_vn]

        self._vnc_lib = VncApi('u', 'p', 
                         api_server_host = self._args.api_server_ip, 
                         api_server_port = self._args.api_server_port)
    #end __init__

    def _parse_args(self, args_str):
        # Source any specified config/ini file
        # Turn off help, so we print all options in response to -h
        conf_parser = argparse.ArgumentParser(add_help = False)
        conf_parser.add_argument("-c", "--conf_file",
                                help="Specify config file", metavar="FILE")
        args, remaining_argv = conf_parser.parse_known_args(args_str.split())

        global_defaults = {
            'domain_name'     : 'default-domain',
            'template_name'   : None,
            'instance_name'   : None,
            'sc_inst_name'    : None,
            'proj_name'       : 'demo',
            'service_mode'    : 'In-network',
            'mgmt_vn'         : None,
            'left_vn'         : None,
            'right_vn'        : None,
            'api_server_ip'   : '127.0.0.1',
            'api_server_port' : '8082',
            'policy_name'     : None,
            'sc_policy_name'  : None,
            'chained_service_name' : None,
            'chained_service_name' : None,
        }

        if args.conf_file:
            self._conf_file = args.conf_file
            config = ConfigParser.SafeConfigParser()
            config.read([args.conf_file])
            global_defaults.update(dict(config.items("DEFAULTS")))

        # Override with CLI options
        # Don't surpress add_help here so it will handle -h
        parser = argparse.ArgumentParser(
            # Inherit options from config_parser
            parents=[conf_parser],
            # print script description with -h/--help
            description=__doc__,
            # Don't mess with format of description
            formatter_class=argparse.RawDescriptionHelpFormatter,
            )

        parser.set_defaults(**global_defaults)
        subparsers = parser.add_subparsers()

        create_parser = subparsers.add_parser('add')
        
        create_parser.add_argument("--service_mode", help = "service mode")
        create_parser.add_argument("instance_name", help = "service instance name")
        create_parser.add_argument("sc_inst_name", help = "service chained service instance name")
        create_parser.add_argument("template_name", help = "service template name")
        create_parser.add_argument("--proj_name", help = "name of project [default: demo]")
        create_parser.add_argument("--mgmt_vn", help = "name of management vn [default: none]")
        create_parser.add_argument("--left_vn", help = "name of left vn [default: none]")
        create_parser.add_argument("--right_vn", help = "name of right vn [default: none]")
        create_parser.add_argument("--max_instances", type = int,  default = 1,
                                   help = "max instances to launch [default: 1]")
        create_parser.add_argument("--auto_scale", action = "store_true", default = False,
                                   help = "enable auto-scale from 1 to max_instances")
        create_parser.add_argument("policy_name", help = "network policy name")
        create_parser.add_argument("sc_policy_name", help = "network policy name to delete")
        create_parser.add_argument("chained_service_name", help = "chained service name")
        create_parser.add_argument("chained_service_template", help = "chained service template name")
        create_parser.set_defaults(func = self.create_si)

        delete_parser = subparsers.add_parser('del')
        create_parser.add_argument("--config_server_ip", help = "config server IP")
        create_parser.add_argument("--config_server_port", help = "config server Port")
        delete_parser.add_argument("instance_name", help = "service instance name")
        delete_parser.add_argument("sc_inst_name", help = "service chained service instance name")
        delete_parser.add_argument("policy_name", help = "network policy name")
        delete_parser.add_argument("sc_policy_name", help = "Deleted network policy name to re-add")
        delete_parser.add_argument("chained_service_name", help = "chained service name")
        delete_parser.add_argument("--proj_name", help = "name of project [default: demo]")
        delete_parser.set_defaults(func = self.delete_si)

        self._args = parser.parse_args(remaining_argv)
    #end _parse_args

    #create service instance
    def create_si(self):
        #check if passed VNs exist
        if self._args.left_vn:
            try:
                self._vnc_lib.virtual_network_read(fq_name = self._left_vn_fq_name)
            except NoIdError:
                print "Error: Left VN %s not found" % (self._left_vn_fq_name)
                return
        if self._args.right_vn:
            try:
                self._vnc_lib.virtual_network_read(fq_name = self._right_vn_fq_name)
            except NoIdError:
                print "Error: Right VN %s not found" % (self._right_vn_fq_name)
                return
        if self._mgmt_vn_fq_name:
            try:
                self._vnc_lib.virtual_network_read(fq_name = self._mgmt_vn_fq_name)
            except NoIdError:
                print "Error: Management VN %s not found" % (self._mgmt_vn_fq_name)
                return 
        
        #get service template
        try:
            st_obj = self._vnc_lib.service_template_read(fq_name=self._st_fq_name)
            st_prop = st_obj.get_service_template_properties()
            if st_prop == None:
                print "Error: Service template %s properties not found" % (self._args.template_name)
                return
        except NoIdError:
            return "Service template %s not found" % (self._args.template_name)
        
        if self._args.chained_service_template != 'None':
            try:
                chain_st_obj = self._vnc_lib.service_template_read(fq_name=self._chain_st_fq_name)
                chain_st_prop = chain_st_obj.get_service_template_properties()
                if chain_st_prop == None:
                    print "Error: Service template %s properties not found" % (self._args.template_name)
                    return
            except NoIdError:
                return "Chained Service template %s not found" % (self._args.template_name)

        #create si
        print "Creating service instance %s" % (self._args.instance_name)
        project = self._vnc_lib.project_read(fq_name=self._proj_fq_name)
        try:
            si_obj = self._vnc_lib.service_instance_read(fq_name=self._si_fq_name)
            si_uuid = si_obj.uuid
            print "Service Instance - %s, already exists" % (self._args.instance_name)
        except NoIdError:
            si_obj = ServiceInstance(self._args.instance_name, parent_obj = project)
            
        if self._args.chained_service_name != 'None':
            try:
                chain_si_obj = self._vnc_lib.service_instance_read(fq_name=self._chain_si_fq_name)
                si_uuid = chain_si_obj.uuid
                print "Chained Service Instance - %s, already exists" % (self._args.instance_name)
            except NoIdError:
                chain_si_obj = ServiceInstance(self._args.chained_service_name, parent_obj = project)
            
        if self._args.service_mode == 'Transparent':
            lft_vn = ""
        else:
            lft_vn = "%s:%s:%s" % (self._args.domain_name, self._args.proj_name, self._args.left_vn)    
                
        if self._args.service_mode == 'Transparent':
            rgt_vn = ""
        else:    
            rgt_vn = "%s:%s:%s" % (self._args.domain_name, self._args.proj_name, self._args.right_vn)
                    
        mgt_vn = "%s:%s:%s" % (self._args.domain_name, self._args.proj_name, self._args.mgmt_vn)
        
        if lft_vn == "" and rgt_vn == "":
            intf_list = [{"virtual_network":mgt_vn},{"virtual_network":""},{"virtual_network":""}]
        else:
            intf_list = [{"virtual_network":mgt_vn},{"virtual_network":lft_vn},{"virtual_network":rgt_vn}]
            
        #set scale out
        scale_out = ServiceScaleOutType(max_instances = self._args.max_instances, 
                                            auto_scale = self._args.auto_scale)
            
        si_prop = ServiceInstanceType(left_virtual_network = lft_vn, 
                                      management_virtual_network = mgt_vn,
                                      right_virtual_network = rgt_vn,
                                      interface_list = intf_list,
                                      scale_out = scale_out)
        
        #si_prop.set_scale_out(scale_out)

        si_obj.set_service_instance_properties(si_prop)
        st_obj = self._vnc_lib.service_template_read(id = st_obj.uuid)
        si_obj.set_service_template(st_obj)
            
        si_uuid = self._vnc_lib.service_instance_create(si_obj)
            
        if self._args.chained_service_name != 'None':
            chain_si_obj.set_service_instance_properties(si_prop)
            chain_st_obj = self._vnc_lib.service_template_read(id = chain_st_obj.uuid)
            chain_si_obj.set_service_template(chain_st_obj)
            chain_si_uuid = self._vnc_lib.service_instance_create(chain_si_obj)

        """
        si_prop = ServiceInstanceType(left_virtual_network = self._args.left_vn, 
                                      management_virtual_network = self._args.mgmt_vn,
                                      right_virtual_network = self._args.right_vn)

        #set scale out
        scale_out = ServiceScaleOutType(max_instances = self._args.max_instances, 
                                        auto_scale = self._args.auto_scale)
        si_prop.set_scale_out(scale_out)

        si_obj.set_service_instance_properties(si_prop)
        st_obj = self._vnc_lib.service_template_read(id = st_obj.uuid)
        si_obj.set_service_template(st_obj)
        self._vnc_lib.service_instance_update(si_obj)
        """

        if si_uuid is None:
            return "Error in creating Service Instance - %s" % (self._args.instance_name)
        else:
            confFile = "-c %s" % (self._conf_file)
            policy_fq_name = [self._args.domain_name, self._args.proj_name, self._args.sc_policy_name]
            
            try:
                netpo = self._vnc_lib.network_policy_read(policy_fq_name)
                if netpo.uuid is None:
                    return "Error in retrieving policy info for %s" % (self._args.sc_policy_name)
                else:
                    confFile = "-c %s" % (self._conf_file)
                    policyArgs = "%s %s %s %s %s" % (confFile, "del", "--proj_name", self._args.proj_name, self._args.sc_policy_name)
                    print "%s" % servicePolicy.main(policyArgs)
            except NoIdError:
                print "Policy %s marked for deletion. Does not exist" % (self._args.sc_policy_name)
            
            if self._args.chained_service_name != 'None':
                svcList = "%s %s" % (self._args.instance_name, self._args.chained_service_name)
            else:
                svcList = "%s" % (self._args.instance_name)
                
            policyArgs = "%s %s %s %s %s %s %s %s %s %s" % (confFile, "add", "--svc_list", svcList, "--vn_list", 
                                                     self._args.left_vn, self._args.right_vn, "--proj_name", self._args.proj_name, 
                                                     self._args.policy_name)
            time.sleep(5)
            print "Creating network policy for this service instance"
            print "%s" % servicePolicy.main(policyArgs)
            return "Activated Service"
        return si_uuid
    #end create_si

    def delete_si(self):
        try:
            confFile = "-c %s" % (self._conf_file)
            policyArgs = "%s %s %s %s %s" % (confFile, "del", "--proj_name", self._args.proj_name, self._args.policy_name)
            print "%s" % servicePolicy.main(policyArgs)
            
            si_fq_name = [self._args.domain_name, self._args.proj_name, self._args.sc_inst_name]
            try:
                si_obj = self._vnc_lib.service_instance_read(fq_name=si_fq_name)
                si_uuid = si_obj.uuid
                policy_fq_name = [self._args.domain_name, self._args.proj_name, self._args.sc_policy_name]
                try:
                    netpo = self._vnc_lib.network_policy_read(policy_fq_name)
                    netpo_uuid = netpo.uuid
                except NoIdError:
                    policyArgs = "%s %s %s %s %s %s %s %s %s %s" % (confFile, "add", "--svc_list", self._args.sc_inst_name, "--vn_list", 
                                                     self._args.left_vn, self._args.right_vn, "--proj_name", self._args.proj_name, 
                                                     self._args.sc_policy_name)
                    time.sleep(5)
                    print "%s" % servicePolicy.main(policyArgs)
            except NoIdError:
                print "Create the service chained service instance -- EXPLICITLY"
                
            print "Deleting service instance %s" % (self._args.instance_name)
            self._vnc_lib.service_instance_delete(fq_name = self._si_fq_name)
            if self._args.chained_service_name != 'None':
                self._vnc_lib.service_instance_delete(fq_name = self._chain_si_fq_name)
            return "Deactivated Service" 
        except NoIdError:
            print "Not Found: Service Instance -%s does not exist" % (self._args.instance_name)
            return "Service does not exist for this account"
    #delete_si

#end class ServiceInstanceCmd

def main(args_str = None):
    si = ServiceInstanceCmd(args_str)
    return si._args.func()
#end main

def initialize(args_str = None):
    conf_parser = argparse.ArgumentParser(add_help = False)
    conf_parser.add_argument("--form",help="Specify form data", metavar="STRING")
    conf_parser.add_argument("-c", "--conf_file",
                                 help="Specify config file", metavar="FILE")
    conf_parser.add_argument("--operation",help="Specify operation", metavar="STRING")
    conf_parser.add_argument("--service_mode",help="Specify service mode",metavar="String")
    conf_parser.add_argument("--proj",help="Specify project", metavar="STRING")
    conf_parser.add_argument("--mgmt",help="Specify management-vn", metavar="STRING")
    conf_parser.add_argument("--left",help="Specify left-vn", metavar="STRING")
    conf_parser.add_argument("--right",help="Specify right-vn", metavar="STRING")
    conf_parser.add_argument("--svctemp",help="Specify service template", metavar="STRING")
    conf_parser.add_argument("--svcname",help="Specify service name", metavar="STRING")
    conf_parser.add_argument("--chainedsvctemp",help="Specify chained service template", metavar="STRING")
    conf_parser.add_argument("--chainedsvcname",help="Specify chained ervice name", metavar="STRING")
    conf_parser.add_argument("--svcmax",help="Specify max instances", metavar="STRING")
    conf_parser.add_argument("--auto_scale",help="Specify auto scale", metavar="STRING")
    conf_parser.add_argument("--policy",help="Specify policy", metavar="STRING")
    args, remaining_argv = conf_parser.parse_known_args(args_str.split())
    
    if args.form == 'true':
        form = True
    else:
        form = False
        
    config_file = {
            'domain_name'     : 'default-domain',
            'proj_name'       : 'admin',
            'service_mode'    : 'In-network',
            'mgmt_vn'         : 'mgmt-vn',
            'left_vn'         : 'left-vn',
            'right_vn'        : 'right-vn',
            'max_instances'   : '1',
            'auto_scale'      : '--auto_scale',
            'instance_name'   : None,
            'sc_inst_name'    : None,
            'template_name'   : None,
            'api_server_ip'   : '127.0.0.1',
            'api_server_port' : '8082',
            'policy_name' : None,
            'sc_policy_name' : None,
            'chained_service_name' : None,
            'chained_service_template' : None,
        }  

    if args.conf_file:
        config = ConfigParser.SafeConfigParser()
        config.read([args.conf_file])
        config_file.update(dict(config.items("DEFAULTS")))
    
    conf = "-c %s" % (args.conf_file)
        
    oper = "%s" % (args.operation)
    
    if form:
        proj = "--proj_name %s" % (args.proj)
        mgmt = "--mgmt_vn %s" % (args.mgmt)
        lft = "--left_vn %s" % (args.left)
        rgt = "--right_vn %s" % (args.right)
        maxinst = "--max_instances %s" % (args.svcmax)
        if args.auto_scale == 'true':
            scale = "--auto_scale"
        else:
            scale = ""        
        inst = "%s" % (args.svcname)
        temp = "%s" % (args.svctemp)
        policy = "%s" % (args.policy)
    else:
        for k, v in config_file.iteritems():
            if k is 'service_mode':
                svcmode = "--service_mode %s" % (v)
            else:    
                if k is 'proj_name':
                    proj = "--proj_name %s" % (v)
                else:
                    if k is 'mgmt_vn':
                        mgmt = "--mgmt_vn %s" % (v)
                    else:
                        if k is 'left_vn':
                            lft = "--left_vn %s" % (v)
                        else:
                            if k is 'right_vn':
                                rgt = "--right_vn %s" % (v)
                            else:    
                                if k is 'max_instances':
                                    maxinst = "--max_instances %s" % (v)
                                else:
                                    if k is 'auto_scale':
                                        if v == 'true':
                                            scale = "--auto_scale"
                                        else:
                                            scale = ""
                                    else:
                                        if k is 'instance_name':
                                            inst = v
                                        else:
                                            if k is 'sc_inst_name':
                                                sc_inst = v
                                            else:
                                                if k is 'template_name':
                                                    temp = v
                                                else:
                                                    if k is 'policy_name':
                                                        policy = v
                                                    else:
                                                        if k is 'sc_policy_name':
                                                            policy_sc = v
                                                        else:
                                                            if k is 'chained_service_name':
                                                                chain_svc = v
                                                            else:
                                                                if k is 'chained_service_template':
                                                                    chain_svc_temp = v
                                                        
    if oper == 'add':
        if form:
            arguments = "%s %s %s %s %s %s %s %s %s %s %s" % (conf, oper, proj, mgmt, lft, rgt, maxinst, scale, inst, temp, policy)
        else:
            arguments = "%s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s" % (conf, oper, svcmode, proj, mgmt, lft, rgt, maxinst, scale, inst, sc_inst, temp, policy, policy_sc, chain_svc, chain_svc_temp)         
    else:
        if form:
            arguments = "%s %s %s %s %s %s" % (conf, oper, proj, inst, temp, policy)
        else:
            arguments = "%s %s %s %s %s %s %s %s" % (conf, oper, proj, inst, sc_inst, policy, policy_sc, chain_svc)
    
    print "COMMAND ARGS %s" %(arguments)
    status = main(arguments)
    return status        
#end initialize

if __name__ == "__main__":
    main() 
