// داشبورد مدیریتی صدف info@sadafdashboard.ir 

var ngApp=angular.module("navbarCat",["pascalprecht.translate","ngSanitize"]);ngApp.factory("navbar",["$rootScope",function(a){var b=null;return{getOption:function(){return b},setOption:function(c){b=c,a.$broadcast("navbarChange")}}}]),ngApp.factory("drawer",[function(a){var b={init:function(){if(!$("body #drawer-overlay").length){var a='<div class="drawer-overlay" id="drawer-overlay"></div>';$("body").append(a),$("body #drawer-overlay").on("click",this.close)}},toggle:function(){$("body").hasClass("drawer-open")?$("body").removeClass("drawer-open"):$("body").addClass("drawer-open")},close:function(){$("body").removeClass("drawer-open")}};return{init:b.init,toggle:b.toggle,close:b.close}}]),ngApp.controller("navbarCtrl",["$scope","$http","$rootScope","navbar","drawer","$translate",function(a,b,c,d,e,f){a.toggle=function(){e.toggle()},f.use(0==+$("#lang").val()?"fa":"en"),b.get(app.urlPrefix+"menu/MainMenu").then(function(b){a.menu=b.data,a.dashboardActions={fullScreenToggle:function(){},designToggle:function(){},printToggle:function(){},slideShowToggle:function(){},canDesign:!0},d.getOption()&&(a.dashboardActions=d.getOption()),c.$on("navbarChange",function(){d.getOption()&&(a.dashboardActions=d.getOption())})}),app.lang.setLang({selector:".navbar.navbar-inverse"})}]);var app=app||{};app.contentSegment=$("#content_segment"),app.contentSegmentModal=$("#content_segmentModal"),console||(console={},console.log=function(){}),app.chartLoadDelay=120,app.absoluteUrl="/",app.setAboluteUrl=function(a){app.absoluteUrl=a},app.loadContent=function(a){app.showLoadingProgress(),$("#content_segment").load(app.urlPrefix+a,function(){app.hideLoadingProgress(),app.lang.setLang()})},app.setContent=function(a){$("#content_segment").html(a),app.hideLoadingProgress(),app.lang.setLang()},app.setLocation=function(a){app.router.navigate(a,{trigger:!0})},app.urlPrefix="/",app.setUrlPrefix=function(a){app.urlPrefix=a.replace(/Moderation.*/g,"")},app.showInfo=function(a){$("#app-info-text").html(a),$("#app-info-text").fadeIn(),$("#app-loading-text").hide(),app.showInfoHolder.show(),setTimeout(function(){app.showInfoHolder.hide(),$("#app-info-text").fadeOut(400,function(){$("#app-loading-text").show()})},4e3)},app.showLoadingProgress=function(){app.showInfoHolder.show()},app.hideLoadingProgress=function(){app.showInfoHolder.hide()},app.showInfoHolder={holderCount:0,timeout:{},hide:function(){if(app.showInfoHolder.holderCount>0&&--app.showInfoHolder.holderCount,0==app.showInfoHolder.holderCount){var a=(new Date).getTime()-app.showInfoHolder.ticks;clearTimeout(app.showInfoHolder.timeout),setTimeout(function(){$("#app-loading").parent("div").animate({top:"0",opacity:0},400)},a<1e3?1e3:0)}},show:function(){var a=$("#app-loading").parent("div");a.css("left",$(window).width()/2-a.outerWidth()/2),++app.showInfoHolder.holderCount,app.showInfoHolder.ticks=(new Date).getTime(),app.showInfoHolder.timeout=setTimeout(function(){$("#app-loading").parent("div").animate({top:"50",opacity:1},400)},1e3)}},app.encodeHTML=function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")},app.convertOldPropObject=function(a,b){if(a){if(a.chartProp&&a.chartProp.info)return a;var c={};if(c.chartProp={},+b==chartTypes.TABLE){c.chartProp.info={chartSize:a.chartProp.chartSize,pivotTable:a.chartProp.pivotTable},c.chartProp.series={};for(var d in a.seriesProp)a.seriesProp.hasOwnProperty(d)&&(c.chartProp.series[""+d]={name:a.seriesProp[""+d].table.headerName,numberFactor:"1",textAlign:a.seriesProp[""+d].table.textAlign,formatString:a.seriesProp[""+d].table.formatString,fontSize:a.seriesProp[""+d].table.fontSize,textBold:!1,textItalic:!1,color:a.seriesProp[""+d].table.fontColor}),c.chartProp.series["default"]={name:"",numberFactor:"1",textAlign:"right",formatString:"A",fontSize:"1m",textBold:!1,textItalic:!1,color:"#000000"}}if(+b==chartTypes.BAR){c.chartProp.info={chartSize:a.chartProp.chartSize,horizontalLines:a.chartProp.horizontalLine,formatString:a.chartProp.formatString},c.chartProp.series={};for(var d in a.seriesProp)a.seriesProp.hasOwnProperty(d)&&(c.chartProp.series[""+d]={name:"",numberFactor:a.seriesProp[""+d].barlineChartProp.numberFactor,seriesType:a.seriesProp[""+d].barlineChartProp.barlineChartType,seriesColor:a.seriesProp[""+d].barlineChartProp.barlineChartColor,lineType:a.seriesProp[""+d].barlineChartProp.barlineChartTypeLineProp.lineChartStyle,lineStyle:a.seriesProp[""+d].barlineChartProp.barlineChartTypeLineProp.lineChartLineStyle,lineWeight:a.seriesProp[""+d].barlineChartProp.barlineChartTypeLineProp.lineChartLineWeight,lineFace:a.seriesProp[""+d].barlineChartProp.barlineChartTypeLineProp.lineChartLineDashes});c.chartProp.series["default"]={name:"",numberFactor:"1",seriesType:"bar",seriesColor:"#1f77b4",lineType:"line-dot-area",lineStyle:"linear",lineWeight:"2",lineFace:"5,0"}}return+b==chartTypes.PIE&&(c.chartProp.info={horizontalLines:a.chartProp.horizontalLine,chartSize:a.chartProp.chartSize,formatString:a.chartProp.formatString,pieStyle:a.chartProp.pieStyle,hole:"65"},c.chartProp.series={},c.chartProp.series["default"]={numberFactor:"1"}),+b==chartTypes.GAUGE&&(c.chartProp.info={chartSize:a.chartProp.chartSize,style:a.chartProp.gaugeStyle,height:"medium",color:"#333333",fontSize:"3em",formatString:",.2f",status:"",target:"",textBold:!0,textItalic:!1,trend:"",value:"",segmentType:"singleSegment",min:"",yellow:"",green:"",max:""},c.chartProp.series={},c.chartProp.series["default"]={numberFactor:"1",type:"value",typeMs:"value"}),c.dataUrl=a.chartProp.DataUrl,c.editMode=a.chartProp.editMode,c}},app.autoPlayTimer=app.autoPlayTimer||{counter:0},app.autoPlay=function(a,b){if(a&&"start"==a){var c=$("#side-navigation2 .simple-link");b=b||10,$(".sadaf-circular-preogress").progressbar(10,1e3*+b),app.autoPlayTimer.timer=setTimeout(function(){var a=$(c[app.autoPlayTimer.counter++%c.length]);document.location.href=a.attr("href"),a.parents(".panel-collapse").collapse("show"),$(".sadaf-circular-preogress").progressbar("stop"),app.autoPlay("start",b)},1e3*+b)}a&&"stop"==a&&($(".sadaf-circular-preogress").progressbar("stop"),clearTimeout(app.autoPlayTimer.timer))};var resizeTimer;app.lestenWindowResize=function(a){function b(){clearTimeout(resizeTimer),resizeTimer=setTimeout(function(){a()},400)}var c=$(window).width();$(window).resize(function(){$(window).width();$(window).width()!=c&&(c=$(this).width(),b())})};var designMenuTimer,printMenuTimer;app.onMenusClick=function(a,b){return"showPrintMenu"==a||"hidePrintMenu"==a?(clearTimeout(printMenuTimer),void(printMenuTimer=setTimeout(function(){"showPrintMenu"==a?$(".navbar .print-toggle").fadeIn():"hidePrintMenu"==a&&$(".navbar .print-toggle").fadeOut()},800))):(clearTimeout(designMenuTimer),designMenuTimer=setTimeout(function(){"showDesignMenu"==a?$(".navbar .design-toggle").fadeIn():"hideDesignMenu"==a&&$(".navbar .design-toggle").fadeOut(),b&&"showfullScreenMenu"==b?$(".navbar .fullscreen-toggle").parents(".pull-right").fadeIn():$(".navbar .fullscreen-toggle").parents(".pull-right").fadeOut()},800),void $("html,body").animate({scrollTop:0},"slow",function(){$(".side-menu").hasClass("open")&&$("#side-menu-toggle").click()}))},app.print={printSingle:function(a,b){var c=this.getWidgetHtml(a);app.print.print(c,b)},getWidgetHtml:function(a){var b=$(a).height(),c=$(a).width(),d=$(a).clone();d.width(c),d.height(b);var e=d.find(".title.over-show .desc").html();d.find(".title.over-show *:not(.title-move)").remove();var f=$("<div>").append(d).html(),g=$('<div style="margin-top:10px;">'+e+"</div>").width(c),h=$("<div>").html(f).append(g);h.css({"page-break-inside":"avoid",margin:"0 50px 50px 50px"}),h.addClass("pull-left");var i=$("<div>").append(h).html();return i},printPage:function(){var a="";$(".chart-widget").each(function(){var b=$(this).find(".chart-layout").attr("id");a+=app.print.getWidgetHtml("#"+b)});var b=$(".dashboard-page.active > a").text();app.print.print(a,b)},print:function(a,b){var c='<link href="'+app.absoluteUrl+"dist/css/dash-all"+(app.lang.isRtl?"-rtl":"")+".css?v="+app.version+'" rel="stylesheet" />                   <style  type="text/css">@page {                                margin: 1.5cm;                                @top-center {                                        content: "sapam";                                    }                                }                    </style>',d=window.open();d.document.write('<html><head><meta charset="utf-8"><title>'+b+"</title>"+c),d.document.write("</head><body>"),d.document.write(a),d.document.write("</body></html>"),d.document.close(),d.focus(),setTimeout(function(){d.print()},400)}},app.post=function(a,b,c){$.ajax({url:a,type:"POST",data:JSON.stringify(b),dataType:"json",contentType:"application/json; charset=utf-8",traditional:!0,success:c})},app.lang={langType:0,setLangTyle:function(a){this.langType=+(a||0)},isRtl:function(){return 0==app.lang.langType},translate:function(a){return app.lang.lang?app.lang.lang[a]||a:a},q:[],translateAsync:function(a,b){app.lang.lang?b&&b(app.lang.lang[a]||a):this.q.push({key:a,callback:b})},setLang:function(a){if(a&&a.data&&(this.lang=a.data),this.lang||!this.inProgress)if(this.lang||this.inProgress){var b;b=a&&a.selector?$(a.selector).find("*[data-trans-key]"):$("*[data-trans-key]"),b.each(function(){var a=$(this),b=a.data("translated");if(!b){var c=app.lang.lang[a.data("trans-key")],d=a.data("trans-attr");d?a.attr(d,c):a.text(c),a.data("translated",!0)}})}else{var c=0==app.lang.langType?"fa":"en";for(this.inProgress=!0,$.getJSON(app.urlPrefix+"dist/locales/locale-"+c+".js?v="+app.version,null,function(a){app.lang.setLang({data:a})});this.q.length>0;){var d=this.q.pop();d.callback&&callback(app.lang.lang[d.key]||d.key)}}}},function(){"use strict";function a(a,b,c){a.result=!0,a.success=c.data.result,a.error=!c.data.result,a.message=b.trustAsHtml(c.data.message+"")}function b(a,b,c){b.result=!0,b.error=!0,b.success=!1,b.message=a.trustAsHtml(c.desc)}var c=angular.module("profileCat",["ngAnimate","ngRoute","navbarCat","pascalprecht.translate","ngSanitize"]);c.factory("userFactory",["$http",function(a){function b(){return j||(j=a.get(app.urlPrefix+"api/users/getCurrent")),j}function c(){return a.get(app.urlPrefix+"api/users/getLoginHistory")}function d(){return a.get(app.urlPrefix+"api/users/getActiveSessions")}function e(b){return a.post(app.urlPrefix+"api/users/update",b)}function f(b){return a.get(app.urlPrefix+"api/users/kick/"+b)}function g(){return a.get(app.urlPrefix+"api/users/getPolicy")}function h(b,c,d){return a.post(app.urlPrefix+"api/users/changePass",{passwordOld:b,passwordNew:c,passwordRepeat:d})}function i(b){return a.post(app.urlPrefix+"api/users/updateSettings",b)}var j;return{getInfo:b,update:e,changePass:h,updateSettings:i,getHistory:c,getSessions:d,kick:f,getPolicy:g}}]),c.controller("cProfile",["$scope","$http","userFactory","$sce","$translate",function(b,c,d,e,f){d.getInfo().then(function(a){b.user=a.data}),b.update=function(){d.update(b.user).then(function(c){a(b,e,c)})},f.use(0==+$("#lang").val()?"fa":"en")}]),c.controller("cChangePass",["$scope","userFactory","$sce","$translate",function(c,d,e,f){c.app=app,c.changePass=function(){c.progress=!0,d.changePass(c.oldPass,c.newPass,c.repeatPass).then(function(b){c.progress=!1,a(c,e,b)})["catch"](function(a){c.progress=!1,b(e,c,a.data)})},d.getPolicy().then(function(a){c.help=a.data}),f.use(0==+$("#lang").val()?"fa":"en")}]),c.controller("cGeneral",["$scope","$location","$translate",function(a,b,c){a.path=b.path(),a.$on("$locationChangeStart",function(c,d,e){a.path=b.path()}),c.use(0==+$("#lang").val()?"fa":"en")}]),c.controller("cHistory",["$scope","$http","userFactory","$sce","$translate",function(a,b,c,d,e){c.getHistory().then(function(b){a.list=b.data}),a.moment=moment}]),c.controller("cSessions",["$scope","$http","userFactory","$sce","$translate",function(a,b,c,d,e){function f(){c.getSessions().then(function(b){a.list=b.data})}f(),a.kick=function(a){var b=confirm("آیا برای بستن نشست اطمینان دارید؟");b&&c.kick(a.Id).then(f)},a.moment=moment}]),c.controller("cSettings",["$scope","$http","userFactory","$sce","$translate",function(b,c,d,e,f){d.getInfo().then(function(a){b.user=a.data,b.user.language=a.data.language+""}),b.updateSettings=function(){d.updateSettings(b.user).then(function(c){location.reload(),a(b,e,c)})},f.use(0==+$("#lang").val()?"fa":"en")}]),c.config(["$routeProvider","$locationProvider",function(a,b){a.when("/profile",{templateUrl:app.urlPrefix+"dist/partial/profile/partial/profile.html",controller:"cProfile"}).when("/changepass",{templateUrl:app.urlPrefix+"dist/partial/profile/partial/changePass.html",controller:"cChangePass"}).when("/settings",{templateUrl:app.urlPrefix+"dist/partial/profile/partial/settings.html",controller:"cSettings"}).when("/history",{templateUrl:app.urlPrefix+"dist/partial/profile/partial/history.html",controller:"cHistory"}).when("/active_sessions",{templateUrl:app.urlPrefix+"dist/partial/profile/partial/sessions.html",controller:"cSessions"}).otherwise({redirectTo:"/profile"})}]),c.config(["$translateProvider",function(a){a.useStaticFilesLoader({prefix:app.urlPrefix+"dist/locales/locale-",suffix:".js"}),a.preferredLanguage("fa"),a.useSanitizeValueStrategy("sanitizeParameters")}]),c.config(["$locationProvider",function(a){a.hashPrefix("")}]),ngApp.factory("httpResponseInterceptor",["$q","$rootScope","$location",function(a,b,c){return{responseError:function(b){return 401===b.status&&(alert("زمان نشست شما به اتمام رسیده است. لطفا دوباره در برنامه لاگین کنید"),document.location="/account/login"),a.reject(b)}}}]),ngApp.config(["$httpProvider",function(a){a.interceptors.push("httpResponseInterceptor");var b=$("input[name=__RequestVerificationToken]").val();a.defaults.headers.post.__RequestVerificationToken=b}])}();