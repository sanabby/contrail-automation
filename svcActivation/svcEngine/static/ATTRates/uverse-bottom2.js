/*! $Revision$ $Date$ GENERATED FILE DO NOT MODIFY:Concatination of gvpUtils.js, serviceObjects.js, serviceMethods.js */
function gvpUtils(){var G=(!document.all&&document.getElementById);var w=(document.all);var m=(document.layers);var R=false;var u="";var F="#vBrowBackbut";var T="";var t="";var U="";var W=navigator.appVersion;var x=(W.indexOf("MSIE 6.0")!=-1)?true:false;var p=(W.indexOf("MSIE")!=-1)?true:false;var aa=(W.toLowerCase().indexOf("win")!=-1)?true:false;var e=(navigator.userAgent.indexOf("Opera")!=-1)?true:false;var v=(navigator.userAgent.indexOf("iPhone")!=-1)?true:false;var X=(navigator.userAgent.indexOf("android")!=-1)?true:false;var a=(navigator.userAgent.indexOf("iPad")!=-1)?true:false;var h=0;var o;var j;var E;var z;var g="";var r="";this.popOnLoad=function ac(ad){if(ad.gvpFile){if(ad.gvpFile.indexOf("/")==-1){if(this.isNumeric(ad.gvpFile)){ad.gvpFile=ad.gvpFile}else{ad.gvpFile="video_resources/xml/"+ad.gvpFile+".xml"}}if(ad.gvpEnv){if(ad.gvpLgFormat){gvp.showPopUp("",true,true,"gvp",ad.gvpFile+"&gvpEnv="+ad.gvpEnv+"&gvpLgFormat")}else{gvp.showPopUp("",true,true,"gvp",ad.gvpFile+"&gvpEnv="+ad.gvpEnv)}}else{if(ad.gvpFile.indexOf(".xml")==-1&&!this.isNumeric(ad.gvpFile)){if(ad.gvpLgFormat){gvp.showPopUp("",true,true,"gvp",ad.gvpFile+".xml&gvpLgFormat")}else{gvp.showPopUp("",true,true,"gvp",ad.gvpFile+".xml")}}else{if(ad.gvpLgFormat){gvp.showPopUp("",true,true,"gvp",ad.gvpFile+"&gvpLgFormat")}else{gvp.showPopUp("",true,true,"gvp",ad.gvpFile)}}}}};this.parseQueryString=function Q(ae){var ai=new Object();var aj=new Object();var ag=false;var af=location.search.substring(1).split("&");for(var ad=0;ad<af.length;ad++){var ah=af[ad].split("=");ai[unescape(ah[0])]=ah.length==2?unescape(ah[1]):undefined;if(ah[0].indexOf("gvpFile")!=-1){ag=true;aj[unescape(ah[0])]=unescape(ah[1])}if(ah[0].indexOf("gvpEnv")!=-1){ag=true;U=unescape(ah[1]);aj[unescape(ah[0])]=unescape(ah[1])}if(ah[0].indexOf("gvpLgFormat")!=-1){ag=true;aj[unescape(ah[0])]=unescape(ah[1])}}if(ag){if(ae){this.popOnLoad(aj)}else{return aj}}};this.parseQstring=function L(ad){var ae=window.location.search;if(ae.length){if(ae.indexOf("gvp")!=-1){return this.parseQueryString(ad)}}else{return false}};if(window.location.search.indexOf("android")!=-1){X=true;if(typeof(console)!="undefined"&&R){console.log("is android")}}this.getFlashVersion=function Y(){return this.DetectFlashVer(9,1,2)};this.incFile=function(ad){var ae=document.getElementsByTagName("head")[0];if(ad.indexOf(".js")!=-1){var af=document.createElement("script");af.setAttribute("src",ad);af.setAttribute("type","text/javascript")}else{if(ad.indexOf(".css")!=-1){var af=document.createElement("link");af.setAttribute("href",ad);af.setAttribute("rel","stylesheet");af.setAttribute("type","text/css")}}ae.appendChild(af)};this.ControlVersion=function S(){var ad;var ae;var af;try{ae=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");ad=ae.GetVariable("$version")}catch(af){}if(!ad){try{ae=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");ad="WIN 6,0,21,0";ae.AllowScriptAccess="always";ad=ae.GetVariable("$version")}catch(af){}}if(!ad){try{ae=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");ad=ae.GetVariable("$version")}catch(af){}}if(!ad){try{ae=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");ad="WIN 3,0,18,0"}catch(af){}}if(!ad){try{ae=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");ad="WIN 2,0,0,11"}catch(af){ad=-1}}return ad};this.GetSwfVer=function A(){var aj=-1;if(navigator.plugins!=null&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var ai=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";var ad=navigator.plugins["Shockwave Flash"+ai].description;var ah=ad.split(" ");var af=ah[2].split(".");var ak=af[0];var ae=af[1];var ag=ah[3];if(ag==""){ag=ah[4]}if(ag[0]=="d"){ag=ag.substring(1)}else{if(ag[0]=="r"){ag=ag.substring(1);if(ag.indexOf("d")>0){ag=ag.substring(0,ag.indexOf("d"))}}}aj=ak+"."+ae+"."+ag}}else{if(navigator.userAgent.toLowerCase().indexOf("webtv/2.6")!=-1){aj=4}else{if(navigator.userAgent.toLowerCase().indexOf("webtv/2.5")!=-1){aj=3}else{if(navigator.userAgent.toLowerCase().indexOf("webtv")!=-1){aj=2}else{if(w&&aa&&!e){aj=this.ControlVersion()}}}}}return aj};this.DetectFlashVer=function V(ai,ag,af){versionStr=this.GetSwfVer();if(versionStr==-1){return false}else{if(versionStr!=0){if(w&&aa&&!e){tempArray=versionStr.split(" ");tempString=tempArray[1];versionArray=tempString.split(",")}else{versionArray=versionStr.split(".")}var ah=versionArray[0];var ad=versionArray[1];var ae=versionArray[2];if(ah>parseFloat(ai)){return true}else{if(ah==parseFloat(ai)){if(ad>parseFloat(ag)){return true}else{if(ad==parseFloat(ag)){if(ae>=parseFloat(af)){return true}}}}}return false}}};function M(ae,ad){if(typeof(console)!="undefined"&&R){if(w){alert("error occur in "+B(ae)+" "+ad)}else{console.log("error occur in "+B(ae)+" "+ad)}}}function B(ad){var ae=ad;ae=ae.substr("function ".length);ae=ae.substr(0,ae.indexOf("("));return ae}this.getPageLanguage=function N(){var ad="en_US";if(typeof v_locale!="undefined"){ad=v_locale}return ad};this.abandonPage=function b(){this.closePopup()};this.reportWebTrendsEvent=function d(ai,ak,ag,af,ad,ae,ah){var al=ah.substr(27,ah.length);var aj=this.getWindowLocation();lastTarget=ah;if(ae!="null"){}else{}var am="wtSKU="+ai+"\r\n";am+="pageName="+ak+"\r\n";am+="locationOfLink="+ag+"\r\n";am+="linkName="+af+"\r\n";am+="pageHit="+ad+"\r\n";am+="fileName="+ae+"\r\n";am+="target="+al+"\r\n";am+="referrer="+aj+"\r\n"};this.centerDiv=function ab(aj){try{var ai=0,ad=0;obj=this.getElementObj(aj);if(w){var ah=(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body;winH=parseInt(ah.clientHeight/2);winW=parseInt(ah.clientWidth/2);ai=ah.scrollLeft;ad=ah.scrollTop}else{winH=parseInt(window.innerHeight/2);winW=parseInt(window.innerWidth/2);ai=window.pageXOffset;ad=window.pageYOffset}var ag=ad+winH-parseInt(obj.offsetHeight/2);var af=ai+winW-parseInt(obj.offsetWidth/2);obj.style.top=ag+"px";obj.style.left=af+"px"}catch(ae){M(arguments.callee.toString(),ae)}};this.typeOf=function l(ae){var ad=typeof ae;if(ad==="object"){if(ae){if(ae instanceof Array){ad="array"}}else{ad="null"}}return ad};this.setModalTitle=function k(ad){if(typeof ad!="undefined"){this.getElementObj("gvp_mainPopUpTitle").innerHTML=ad}else{this.getElementObj("gvp_mainPopUpTitle").innerHTML="AT&amp;T Video Player"}};this.setFlashStageSize=function K(ae,ad){if(typeof(console)!="undefined"&&R){console.log("setFlashStageSize(): width="+ae+", height="+ad+" called: "+h+" times")}document.getElementById("gvp_mainPopupDiv").style.width=ae+22+"px";document.getElementById("gvp_mainPopupDiv").style.height=ad+62+"px";document.getElementById("gvp_pop").setAttribute("width",ae);document.getElementById("gvp_pop").setAttribute("height",ad);if(!w){document.getElementById("gvp_pop_embed").setAttribute("width",ae);document.getElementById("gvp_pop_embed").setAttribute("height",ad)}this.divPopUp("gvp_mainPopupDiv",true);return true};this.getWindowLocation=function P(){return window.location};this.iphone_vidCallback=function C(af,ai){var ag="http://www.wireless.att.com/home/video_progressive/gvp/mp4/";var ad=ag+af;if(ai){gvp.iphoneStatusUpdater(200,ad);return true}if(v){this.getElementObj("gvp_popCloseButton").style.fontSize=28+"px";this.getElementObj("gvp_mainPopUpTitle").style.fontSize=28+"px";this.getElementObj("gvp_popCloseButton").style.fontWeight=200;this.getElementObj("gvp_mainPopUpTitle").style.fontWeight=200;this.getElementObj("gvp_pPopDivTitle").style.marginTop=-14+"px"}this.getElementObj("gvp_mainPopupDiv").style.width=666+"px";this.getElementObj("gvp_mainPopupBody").innerHTML='<img src="'+U+'global_resources/defaultMedia/GVP_iPhone_checking.jpg" border="0" onload="gvp.divPopUp(\'mainPopupDiv\',true);" />';try{if(typeof(console)!="undefined"&&R){console.log("in vid_Callback")}var ae=new XMLHttpRequest();ae.open("GET",ad+".html");ae.onreadystatechange=function(){if(ae.readyState==4){if(typeof(console)!="undefined"&&R){console.log(ae.status)}if(typeof(console)!="undefined"&&R){console.log("SUCCESS")}gvp.iphoneStatusUpdater(ae.status,ad)}else{if(typeof(console)!="undefined"&&R){console.log("ERROR")}gvp.iphoneStatusUpdater("error",ad)}};ae.send(null)}catch(ah){gvp.iphoneStatusUpdater("error",ad)}};this.iphoneStatusUpdater=function f(ae,ad){if(typeof(console)!="undefined"&&R){console.log("in iphoneStatusUpdater with status: "+ae)}if(ae==0){this.getElementObj("gvp_mainPopupBody").innerHTML='<img src="'+U+'global_resources/defaultMedia/GVP_iPhone_noVideo.jpg" border="0" onclick="gvp.closePopup();" onload="gvp.divPopUp(\'gvp_mainPopupDiv\',true);" />'}else{if(ae==200){this.getElementObj("gvp_mainPopupDiv").style.width=535+"px";this.centerDiv("gvp_mainPopupDiv");this.getElementObj("gvp_mainPopupBody").innerHTML='<center><video id="currEmbStream" src="'+ad+'.mp4" poster="/media/gvp/global_resources/defaultMedia/GVP_iPhone.jpg" controls="controls" width="512" height="288" onended="gvp.closePopup();" /></center>';this.centerDiv("gvp_mainPopupDiv");gvp.divPopUp("gvp_mainPopupDiv",true)}else{this.getElementObj("gvp_mainPopupBody").innerHTML='<img src="'+U+'global_resources/defaultMedia/GVP_iPhone_noVideo.jpg" border="0" onclick="gvp.closePopup();" onload="gvp.divPopUp(\'gvp_mainPopupDiv\',true);" />'}}};this.rplFlash=function s(ae){if(typeof(console)!="undefined"&&R){console.log("rplFlash() called with error code: "+ae)}if(typeof ae!="undefined"){if(ae=="noFlash"){this.getElementObj("gvp_mainPopupBody").innerHTML='<a href="http://www.adobe.com/products/flashplayer/" target="_Fp"><img src="'+U+'global_resources/defaultMedia/GVP_NoFlash.jpg" border="0" onload="gvp.divPopUp(\'gvp_mainPopupDiv\',true);" border="0" /></a>'}else{if(ae.indexOf("iPhone")!=-1){var ag=false;var ad=ae.split("|");var af=ad[1];if(typeof(console)!="undefined"&&R){console.log("vidname= "+af)}if(window.location.href.indexOf("rethinkpossible"!=-1)){ag=true}this.iphone_vidCallback(af,ag)}else{this.getElementObj("gvp_mainPopupBody").innerHTML='<img src="'+U+'global_resources/defaultMedia/GVP_GeneralError.jpg" border="0" onload="gvp.divPopUp(\'gvp_mainPopupDiv\',true);" />'}}}else{this.getElementObj("gvp_mainPopupBody").innerHTML='<img src="'+U+'global_resources/defaultMedia/GVP_GeneralError.jpg" border="0" onload="gvp.divPopUp(\'gvp_mainPopupDiv\',true);" />'}};this.debug=function(ad){R=ad};this.hideSelectOption=function(ag){try{var ad=navigator.appVersion;if(ad.indexOf("MSIE 6.0")!=-1){var ae=document.getElementsByTagName("select");for(i=0;i<ae.length;i++){if(ag){this.visibleElement(ae[i],false)}else{this.visibleElement(ae[i],true)}}}}catch(af){M(arguments.callee.toString(),af)}};this.flashMovie=function q(ad){if(navigator.appName.indexOf("Microsoft")!=-1){return window[ad]}else{return document[ad]}};this.updateWtField=function D(ae){var ad;if(navigator.appName.indexOf("Microsoft")!=-1){ad=window.getElementById("wtText")}else{ad=document.getElementById("wtText")}ad.value=ad.value+ae};this.closePopup=function c(){if(typeof onCloseGvpWindow!="undefined"){onCloseGvpWindow()}try{if(this.getElementObj("gvp_pop")){if(p){try{this.flashMovie("gvp_pop").modalWindowClosing()}catch(ad){if(typeof(console)!="undefined"&&R){console.log("flash failed to load")}}}else{try{this.flashMovie("gvp_pop_embed").modalWindowClosing()}catch(ad){if(typeof(console)!="undefined"&&R){console.log("flash failed to load")}}}}overLayDiv_id=this.overLayDiv(false);this.divPopUp("gvp_mainPopupDiv",false);this.getElementObj("gvp_mainPopupBody").innerHTML=" ";this.visibleElement("gvp_popCloseButton",true);this.getElementObj("gvp_mainPopupButton").innerHTML=" ";g="";z.removeChild(this.getElementObj("gvp_mainPopupDiv"));if(x){if(this.getElementObj("gvp_mainPopupDiv").style.visibility=="hidden"){}}}catch(ad){M(arguments.callee.toString(),ad)}};this.setBtnContent=function H(ae){var ad=ae.split("|");g='<table border="0" width="100%"><tr><td align="right" valign="middle"><a href="'+ad[0]+'"><img src="'+ad[1]+'" /></a></td></tr></table>'};this.showPopUp=function J(aJ,am,ah,at,aA){r="_2.1.2";z=document.getElementsByTagName("body")[0];if(arguments.length>=4){if(arguments.length==5){if(at=="360"){o=aA;E=600}else{if(at=="details"){o=aA;E=745}else{if(at=="vid"){j=aA;var ao=window.location.href;if(ao.indexOf("smartphones")!=-1){E=505}else{E=540}}else{if(at=="inline"){var aB=aA.split("|");var aF=aB[0];var ag=aB[1];var ak=aB[2];E=parseInt(ag)+parseInt("22")}else{if(at=="div"){var aB=aA.split("|");var aD=aB[0];var ag=aB[1];var ak=aB[2];E=parseInt(ag)+parseInt("22")}else{if(at=="gvp"){pConfig=aA;E=542}else{if(at=="swf"){var aB=aA.split("|");var aF=aB[0];var ag=aB[1];var ak=aB[2];E=parseInt(ag)+parseInt("22")}}}}}}}}else{E=582}}try{var av=false;var aG,ae,aC,az,aj;if(am){aG=this.overLayDiv(true)}if(ah==true){}if(this.getElementObj("gvp_mainPopupDiv")){this.getElementObj("gvp_mainPopupDiv").show()}else{var aq=document.createElement("div");aq.setAttribute("id","gvp_mainPopupDiv");aq.setAttribute("style","position:absolute; visibility:hidden; left:100px; top:100px; width:"+E+"px; z-index:500; border:#CCCCCC solid 2px;  background-color:#FFFFFF;");if(w){aq.style.setAttribute("cssText","position:absolute; visibility:hidden; left:100px; top:100px; width:"+E+"px; z-index:500; border:#CCCCCC solid 2px;  background-color:#FFFFFF;")}var ay=document.createElement("div");ay.setAttribute("id","gvp_pPopDivTitleBG");ay.setAttribute("style","height:37px; background-image:url(http://www.att.com/media/en_US/images/img/img_uverse-gradient-4x37_AA0009R6.gif); background-repeat:repeat-x; border-top:#FFFFFF solid 1px; border-left:#FFFFFF solid 1px; border-right:#FFFFFF solid 1px;");if(w){ay.style.setAttribute("cssText","height:37px; background-image:url(http://www.att.com/media/en_US/images/img/img_uverse-gradient-4x37_AA0009R6.gif); background-repeat:repeat-x; border-top:#FFFFFF solid 1px; border-left:#FFFFFF solid 1px; border-right:#FFFFFF solid 1px;")}var al=document.createElement("div");al.setAttribute("id","gvp_pPopDivTitleWrapper");al.setAttribute("style","padding:10px;");if(w){al.style.setAttribute("cssText","padding:10px;")}var au=document.createElement("div");au.setAttribute("id","gvp_pPopDivTitle");au.setAttribute("style","float:left; padding-left:10px;");if(w){au.style.setAttribute("cssText","float:left; padding-left:10px;")}var ar=document.createElement("H1");ar.setAttribute("id","gvp_mainPopUpTitle");ar.setAttribute("style","font-size:14px;");if(w){ar.style.setAttribute("cssText","font-size:14px;")}var aI=document.createElement("div");aI.setAttribute("id","gvp_popCloseButton");aI.setAttribute("style","text-align:right; font-size:11px;");if(w){aI.style.setAttribute("cssText","text-align:right; font-size:11px;")}var ad=document.createElement("div");ad.setAttribute("id","gvp_mainPopupBody");ad.setAttribute("style","border:#CCCCCC solid 1px; margin:10px;");if(w){ad.style.setAttribute("cssText","border:#CCCCCC solid 1px; margin:10px;")}var an=document.createElement("div");an.setAttribute("id","gvp_mainPopupButton");an.setAttribute("style","padding-right:10px;padding-bottom:8px;");if(w){an.style.setAttribute("cssText","padding-right:10px;padding-bottom:8px;")}z.appendChild(aq);this.getElementObj("gvp_mainPopupDiv").appendChild(ay);this.getElementObj("gvp_pPopDivTitleBG").appendChild(al);this.getElementObj("gvp_pPopDivTitleWrapper").appendChild(au);this.getElementObj("gvp_pPopDivTitle").appendChild(ar);this.getElementObj("gvp_pPopDivTitleWrapper").appendChild(aI);this.getElementObj("gvp_mainPopupDiv").appendChild(ad);this.getElementObj("gvp_mainPopupDiv").appendChild(an)}if(aJ!=""){this.getElementObj("gvp_mainPopUpTitle").innerHTML=aJ}else{this.getElementObj("gvp_mainPopUpTitle").innerHTML="AT&amp;T Video Player"}if(at=="360"){this.getElementObj("gvp_mainPopupBody").innerHTML='<div align="center" style="width:600px;height:335px;overflow:hidden;text-align:center;margin-left:auto;margin-right:auto;"><iframe src="/media/en_US/360s/gvp360Wrapper.html#'+o+'" style="margin-left:-170px;width:740px;height:335px;" frameborder="0" align="left" scrolling="no"></iframe></div>';if(!w){this.getElementObj("gvp_mainPopupBody").focus()}av=true}else{if(at=="details"){this.getElementObj("gvp_mainPopupBody").innerHTML='<div align="center" style="width:755px;height:440px;overflow:hidden;text-align:center;margin-left:auto;margin-right:auto;"><iframe src="/media/en_US/360s/gvpDeviceDetailsWrapper.html#'+o+'" style="margin-top:-100px;margin-left:-125px;width:800px;height:526px;"frameborder="0" align="center" scrolling="no"></iframe></div>';if(!w){this.getElementObj("gvp_mainPopupBody").focus()}av=true}else{if(at=="inline"){this.getElementObj("gvp_mainPopupBody").innerHTML='<div align="center" style="width:'+ag+"px;height:"+ak+'px;overflow:hidden;text-align:center;margin-left:auto;margin-right:auto;">'+aF+"</div>";if(!w){this.getElementObj("gvp_mainPopupBody").focus()}av=true}else{if(at=="vid"){var aH;var ao=window.location.href;if(ao.indexOf("smartphones")!=-1){aH="std_vid";this.getElementObj("gvp_mainPopupBody").innerHTML='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="480" height="360" id="gvp_pop" align="TL"><param name="allowScriptAccess" value="sameDomain" /><param name="scale" value="noScale" /><param name="allowFullScreen" value="true" /><param name="FlashVars" value="_vidSrc='+j+'"><param name="movie" value="/media/en_US/360s/'+aH+'.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />	<embed src="/media/en_US/360s/'+aH+'.swf" FlashVars="_vidSrc='+j+'" allowfullscreen="true" id="gvp_pop" quality="high" bgcolor="#ffffff" width="480" height="360" name="gvp_pop" scale="noScale" align="TL" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" /></object>';av=true}else{aH="gvp_vid";this.getElementObj("gvp_mainPopupBody").innerHTML='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="516" height="292" id="gvp_pop" align="middle"><param name="allowScriptAccess" value="sameDomain" /><param name="allowFullScreen" value="true" /><param name="FlashVars" value="_vidSrc='+j+'"><param name="movie" value="/media/en_US/360s/'+aH+'.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />	<embed src="/media/en_US/360s/'+aH+'.swf" FlashVars="_vidSrc='+j+'" allowfullscreen="true" style="width:516px;height:292px" id="gvp_pop" quality="high" bgcolor="#ffffff" width="516" height="292" name="gvp_pop" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" /></object>';av=true}}else{if(at=="div"){this.getElementObj("gvp_mainPopupBody").innerHTML='<div align="center" style="width:'+ag+"px;height:"+ak+'px;overflow:hidden;text-align:center;margin-left:auto;margin-right:auto;"><iframe src="'+aD+'"width="100%" height="100%" frameborder="0" align="left" scrolling="auto"></iframe></div>';if(!w){this.getElementObj("gvp_mainPopupBody").focus()}av=true}else{if(at=="gvp"){var ax=pConfig.indexOf("gvpEnv=");if(ax!=-1){var ap=pConfig.indexOf("&",ax);if(ap==-1){ap=pConfig.length}U=pConfig.substring((ax+7),ap)}else{U="/media/gvp/"}if(v||a||X){var ai=pConfig.lastIndexOf("/")+1;var af=pConfig.indexOf(".",ai);var aw=pConfig.substring(ai,af);this.rplFlash("iPhone|"+aw)}else{if(!this.getFlashVersion()){this.rplFlash("noFlash")}else{if(pConfig.indexOf("gvpLgFormat")==-1){this.getElementObj("gvp_mainPopupBody").innerHTML='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="516" height="415" id="gvp_pop" align="middle"><param name="allowScriptAccess" value="sameDomain" /><param name="allowFullScreen" value="true" /><param name="movie" value="'+U+"ATT_GlobalVideoPlayer"+r+".swf?configXml="+pConfig+'" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />	<embed src="'+U+"ATT_GlobalVideoPlayer"+r+".swf?configXml="+pConfig+'" allowfullscreen="true" id="gvp_pop_embed" quality="high" bgcolor="#ffffff" width="516" height="415" name="gvp_pop" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" /></object>'}else{this.getElementObj("gvp_mainPopupBody").innerHTML='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="516" height="415" id="gvp_pop" align="middle"><param name="allowScriptAccess" value="sameDomain" /><param name="allowFullScreen" value="true" /><param name="movie" value="'+U+"ATT_GlobalVideoPlayer_640x480"+r+".swf?configXml="+pConfig+'" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />	<embed src="'+U+"ATT_GlobalVideoPlayer_640x480"+r+".swf?configXml="+pConfig+'" allowfullscreen="true" id="gvp_pop_embed" quality="high" bgcolor="#ffffff" width="516" height="415" name="gvp_pop" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" /></object>'}av=true}}}}}}}}this.getElementObj("gvp_popCloseButton").innerHTML='<a href="javascript: void(0)" onClick="gvp.closePopup();" id="p_CloseButton">Close <img src="/media/en_US/images/btn/btn_close-popup_red_AA0009RA.gif" border="0"/></a>';this.getElementObj("gvp_mainPopupButton").innerHTML=g;if(x){}if(av){this.divPopUp("gvp_mainPopupDiv",true)}}catch(aE){M(arguments.callee.toString(),aE)}};this.overLayDiv=function y(ag){try{var an=1,ah=1;var aj=0;v_opacity=0;var ap="gvp_overlayDiv";var ai;ai=this.getElementObj(ap);if(ai==null){divElement=document.createElement("div");divElement.setAttribute("id",ap);divElement.onclick=function(){gvp.closePopup()};divElement.setAttribute("style","z-index:200;");document.getElementsByTagName("body")[0].appendChild(divElement);ai=this.getElementObj(ap)}if(ag==true){var ae=document;var ak=document.body;var af=document.documentElement;function al(){return Math.max(ak.scrollHeight,af.scrollHeight,ak.offsetHeight,af.offsetHeight,ak.clientHeight,af.clientHeight)}function ad(){return Math.max(ak.scrollWidth,af.scrollWidth,ak.offsetWidth,af.offsetWidth,ak.clientWidth,af.clientWidth)}an=ad();ah=al();if(w){var ao=(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body;aj="alpha(opacity=50)";v_opacity="50"}else{aj="alpha(opacity=.5)";v_opacity=".5"}ai.style.filter=aj;ai.style.opacity=v_opacity}else{z.removeChild(document.getElementById("gvp_overlayDiv"))}ai.style.position="absolute";ai.style.top="0px";ai.style.left="0px";ai.style.height=ah+"px";ai.style.width=an+"px";ai.style.backgroundColor="black";ai.style.zIndex=200;return(ap)}catch(am){M(arguments.callee.toString())}};this.visibleElement=function Z(ag,ad){try{var af=this.getElementObj(ag);if(af!=undefined){if(ad==true){af.style.visibility=""}else{if(ad==false){af.style.visibility="hidden"}}}}catch(ae){M(arguments.callee.toString())}};this.divPopUp=function O(af,ae){try{this.visibleElement(af,ae);if(ae){this.centerDiv(af)}window.document.gvp_pop.focus()}catch(ad){M(arguments.callee.toString())}};this.getElementObj=function n(ae){try{if(typeof ae=="object"){return ae}else{if(document.getElementById){return document.getElementById(ae)}else{if(document.all){return document.all[ae]}else{if(document.layers){return document.layers[ae]}}}}}catch(ad){M(arguments.callee.toString())}};this.flipBGFlash=function I(ad,af){try{if(this.getElementObj(ad)!=null){if(af=="visibility"){if(this.getElementObj(ad).style.visibility=="visible"){this.getElementObj(ad).setStyle({visibility:"hidden"})}else{this.getElementObj(ad).setStyle({visibility:"visible"})}}else{if(af=="display"){if(this.getElementObj(ad).style.display=="block"){this.getElementObj(ad).hide()}else{this.getElementObj(ad).show()}}}}}catch(ae){M(arguments.callee.toString())}};this.isNumeric=function(ad){if(isNaN(parseFloat(ad))){return false}return true};this.getCookie=function(af){var ae=document.cookie;var ah=af+"=";var ag=ae.indexOf("; "+ah);if(ag==-1){ag=ae.indexOf(ah);if(ag!=0){return null}}else{ag+=2}var ad=document.cookie.indexOf(";",ag);if(ad==-1){ad=ae.length}return unescape(ae.substring(ag+ah.length,ad))};this.checkExistingMobilityCustomer=function(){var ad=false;var ae=this.getCookie("colam_ctn");if(this.isNumeric(ae.substr(0,9))){ad=true}return ad}}gvp=new gvpUtils();if(window.attachEvent){window.attachEvent("onload",function(){var a=setTimeout("gvp.parseQstring(true);",1000)})}else{window.addEventListener("load",function(){var a=setTimeout("gvp.parseQstring(true);",1000)},false)}Modal=function(a,d,e,c){if(Modal[a]&&!c){return Modal[undefined]=Modal[a]}else{return Modal[undefined]=new b()}function b(){this.key=a||"";this.name=d||"";this.title=e||"";this.options=c||[];this.insert=function(f){this.remove(f);this.options.push(f);this.options[f.key.toString()]=f};this.remove=function(g){for(var f=0;f<this.options.length;++f){if(this.options[f].key==g.key){this.options[g.key.toString()]=null;this.options.splice(f,1);return -1}}return 0};this.search=function(l,k,h){for(var g=0;g<this.options.length;++g){if(l&&this.options[g][h||"key"]==l){return g}else{for(var f=0;f<this.options[g].selections.length;++f){if(k&&this.options[g].selections[f][h||"key"]==k){return g}}}}return -1};this.loop=function(f,k){for(var h=0;h<this.options.length;++h){var m=this.options[h];for(var g=0;g<this.options[h].selections.length;++g){var l=this.options[h].selections[g];if(f){g+=f(m,l)||0}}if(k){h+=k(m,l)||0}}};this.revert=function(){for(var f=0;f<this.options.length;++f){this.options[f].revert()}};this.requires=[];this.finished=[];this.ready=function(){for(var f=0;f<this.requires.length;++f){if(!this.finished[f]){return false}if(!this.options[this.requires[f]]){return false}}return true};this.changed=function(j,h){var f=[Modal.Details.phoneLinesList];for(var l=0;l<this.options.length;++l){for(var g=0;g<this.options[l].selections.length;++g){if(this.options[l].selections[g].key.indexOf("0.")!=0){f.push(this.options[l].selections[g].key.split(".").slice(1).join("."))}}}if(j=="upGradeHsia"){showReturnToCart()}if(h){this.reset=-10}if(this.reset){j=true,this.reset++}if(j||!this.saved){this.saved=f.toString()}var m=new Array();m=this.saved.toString().split(",");var k=new Array();k=f.toString().split(",");m=m.sort();k=k.sort();if(k.join("")!=m.join("")){return true}return false}}};Options=function(c,a,e,b){if(Options[c]&&!b){return Options[c].backup()}else{return new d()}function d(){this.key=c||"";this.name=a||"";this.title=e||"";this.selections=b||[];this.insert=function(f){this.remove(f);this.selections.push(f);this.selections[f.key.toString()]=f};this.remove=function(g){for(var f=0;f<this.selections.length;++f){if(this.selections[f].key==g.key){this.selections[g.key.toString()]=null;this.selections.splice(f,1);return -1}}return 0};this.backup=function(){if(!this._selections){this._selections=this.selections.slice()}return this};this.revert=function(){if(this._selections){this.selections=this._selections.slice()}this._selections=null;return this};this.commit=function(){this._selections=null;return this}}};Selections=function(d,h,l,g,e,a,j,c){if(!arguments[1]){return Selections.apply(this,arguments[0])}var f=arguments[arguments.length-1];var k=arguments[arguments.length-2];if(arguments.length<10){c=null}if(arguments.length<9){j=null}if(arguments.length<8){a=null}if(arguments.length<7){e=null}return new b();function b(){this.pid=d||"0";this.sku=h||"0";this.qty=l||"0";this.svc=g||"";this.price=e||"0";this.key=d+"."+l+"."+f;this.name=a||k||"";this.title=j||k||"";this.status=c||"";this.text=k||"";this.index=f||"0";this.pointers=[]}};Modal.getKey=function(b,a){return a[3].replace(/[A-Z0-9]+$/,"")};Options.getKey=function(b,a){return b[1]||b[0]};Selections.getKey=function(b,a){return a[0]+"."+a[2]+"."+a[a.length-1]};if(!window.Modal){var script=document.createElement("script");script.src=window.location.host+"/u-verse/scripts/serviceObjects.js";script.type="text/javascript";var head=document.getElementsByTagName("head")[0];head.appendChild(script)}Modal.Details=function(a,b){Modal.Details.div=b||Modal.Details.div||"mainPopupBodyIDM";if(!Modal[a]){Modal.Details.init(a,Modal.Details.div)}Modal.Details.clearOptions(a);Modal.Details.readFormElements(Modal.Details.div);Modal.Details.updateOptions(a);Modal.Details.writeDetails("modalDetailsBody",a);Modal.Details.extras(a)};Modal.Details.init=function(a){Modal[a]=new Modal(a,"","");Modal.Details.onloadJSCalls(a)};Modal.Details.extras=function(a){if(!Modal[a].changed()){showReturnToCart()}else{Modal[a].ready()?enableAddToCart():disableAddToCart()}};Modal.Details.clearOptions=function(a){if(!Modal[a]){return}Modal[a].loop(function(c,b){Options[c.key].selections=[]},function(c,b){Modal[a].options=[]});Modal.Details.phoneLinesList=[]};Modal.Details.readFormElements=function(h){var h=typeof(h)=="object"?h:document.getElementById(h);var a=h?h.getElementsByTagName("INPUT"):[];for(var e=0;e<a.length;++e){var c=a[e].name||a[e].id;var f=a[e].value+";"+a[e].text+";"+e;if(g(a[e])){continue}if((a[e].checked||a[e].type=="hidden")&&!a[e].disabled){Modal.Details.insertElementAsOption(c,f)}else{Modal.Details.removeElementAsOption(c,f)}}var d=h?h.getElementsByTagName("SELECT"):[];for(var e=0;e<d.length;++e){for(var b=0;b<d[e].options.length;++b){var c=(d[e].name||d[e].id);var f=d[e].options[b].value+";"+d[e].options[b].text+";"+e;if(g(d[e])){continue}if(d[e].options[b].selected&&!d[e].options[b].disabled){Modal.Details.insertElementAsOption(c,f)}else{Modal.Details.removeElementAsOption(c,f)}}}function g(j){if(c.indexOf("phoneNumber")==0){if(~c.indexOf("phoneNumberPrimary")){Modal.Details.phoneLines(getPortOptionPrimary(),1)}if(~c.indexOf("phoneNumberAdditional")){Modal.Details.phoneLines(getPortOptionAdditional(),2)}return true}}};Modal.Details.insertElementAsOption=function(e,f,a){var g=e.split(";");var d=f.split(";");if(!d[0]||!d[1]||!d[3]){return}var h=Modal.getKey(g,d);var b=Options.getKey(g,d);var c=Selections.getKey(g,d);Selections[c]=new Selections(d);Selections[c].pointers=g;Options[b]=new Options(b);Options[b].insert(Selections[c]);Modal[a]=new Modal(a);Modal[a].insert(Options[b])};Modal.Details.removeElementAsOption=function(d,e){var f=d.split(";");var c=e.split(";");if(c.length<4){return}var a=Options.getKey(f,c);var b=Selections.getKey(f,c);if(!Options[a]){return}if(!Selections[b]){return}Options[a].remove(Selections[b])};Modal.Details.updateOptions=function(a){if(!Modal[a]){return}Modal[a].loop(function(c,b){if(b.pointers[0]&&b.pointers[1]){if((!~Modal[a].search(1,b.pointers[0],"name"))){return(Options[c.key].remove(b))}}if(b.pointers[2]||b.pointers[3]){if((~Modal[a].search(1,b.pointers[2],"name"))||(~Modal[a].search(1,b.pointers[3],"name"))){return(Options[c.key].remove(b))}}},function(c,b){if(!c.selections.length){return(Modal[a].remove(c))}})};Modal.Details.writeDetails=function(c,a){if(!Modal[a]){return}var c=typeof(c)=="object"?c:document.getElementById(c);if(c){c.innerHTML=""}else{return}Modal[a].loop(function(j,f){if((f.key.indexOf("0.")==0)||(~f.status.toLowerCase().indexOf("retired"))||(~f.status.toLowerCase().indexOf("existing"))){return}var g=document.createElement("TABLE");g.setAttribute("class","modal selection entry");var h=document.createElement("TR");g.appendChild(h);var e=document.createElement("TD");e.setAttribute("class","modal selection entry-title");e.innerHTML=Selections[f.key].title;h.appendChild(e);var d=document.createElement("TD");d.setAttribute("class","modal selection entry-price");d.innerHTML="&nbsp;"+b(Selections[f.key].price);h.appendChild(d);if(c){c.appendChild(g)}c.innerHTML+=""});function b(h,g){var j=h.match(/(\/month|\/mo|\/mo.)/)?"/mo":"";var h=h.toString().replace(/[^0-9\-\.]/g,"");h=(parseFloat(h)||0)+0.0050000000001;var f=h<0?(h=-h,"-"):"";var e=parseInt(h).toString().replace(/(\d)(\d\d\d)$/,"$1,$2");var d=parseInt(h*100%(100)).toString().replace(/^(\d)$/,"0$1");return(f)+"$"+e+"."+d}};Modal.Details.onloadJSCalls=function(g){if(g=="hsia"){var h=document.getElementsByClassName("modal hsia stage table").slice();for(var e=1;e<h.length;++e){var d=h[0].getElementsByClassName("colgroup")[0];var b=h[e].getElementsByClassName("col")[0];d.appendChild(b);var l=h[e].getElementsByClassName("row");for(var c=0;c<l.length;++c){var a=h[0].rows[c].appendChild(l[c].cells[0].cloneNode(true));if(~b.className.indexOf("disabled")){a.className=b.className;a.title=b.title;a.onmousemove=f;a.onmouseout=k}}h[e].parentNode.removeChild(h[e])}}function f(n){if(!n){n=window.event}if(!n.srcElement){n.srcElement=n.target}if(n.srcElement.nodeType==3){n.srcElement=n.srcElement.parentNode}var m=document.getElementById("modalStageAlert");m.style.display="block";var p=n.pageX||(n.clientX+document.documentElement.scrollLeft+document.body.scrollLeft)||385;var o=n.pageY||(n.clientY+document.documentElement.scrollTop+document.body.scrollTop)||215;var j=0,r=0;var q=document.getElementById(Modal.Details.div);while(q.offsetParent){q=q.offsetParent;if(q.offsetLeft){j+=q.offsetLeft}if(q.offsetTop){r+=q.offsetTop}}m.style.left=p-j+15+"px";m.style.top=o-r+10+"px"}function k(m){if(!m){m=window.event}if(!m.srcElement){m.srcElement=m.target}if(m.srcElement.nodeType==3){m.srcElement=m.srcElement.parentNode}var j=document.getElementById("modalStageAlert");j.style.display="none"}};Modal.Details.phoneLines=function(b,a){if(!Modal.Details.phoneLinesList){Modal.Details.phoneLinesList=[]}if(b==null){return}if(a&&a==1){Modal.Details.phoneLinesList.unshift(b)}else{Modal.Details.phoneLinesList.push(b)}Modal.Details.phoneLinesList.error=false;if(document.getElementById("phoneLine1Port").checked&&!getPortOptionPrimary()){Modal.Details.phoneLinesList.error=true}if(document.getElementById("secondLineCheckbox").checked&&document.getElementById("phoneLine2Port").checked&&!getPortOptionAdditional()){Modal.Details.phoneLinesList.error=true}};Modal.Details.submitOptions=function(a){if(!Modal[a]||!Modal[a].ready()&&!jQuery("#equipmentLeased").is(":visible")){return}var b=[];Modal[a].loop(function(f,d){if(d.pid!="0"&&d.sku!="0"&&d.qty!="0"){var e=c(d.pid,d.sku,d.qty,d.svc);b.push(e)}});if(ShoppingCart&&b.length){ShoppingCart.updateVOIPDataIDM.phoneLinesList=null;if(Modal.Details.phoneLinesList){if(portPhoneLineslist()){return}}Modal[a].changed(save=true);if(webTrendParamAddSkuQty){webTrendParamAddSkuQty()}ShoppingCart.addItemsToOrderIDM(b)}else{if(document.getElementById("equipmentInstallModal")!=null){closeIDMPopup()}}function c(d,g,f,e){return{productId:d,catalogRefId:g,quantity:f,losgId:e}}};