(this.webpackJsonpface_blur=this.webpackJsonpface_blur||[]).push([[0],{109:function(e,t,n){e.exports=n(232)},119:function(e,t,n){},127:function(e,t){},129:function(e,t){},163:function(e,t){},164:function(e,t){},232:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),c=n(96),o=n.n(c),i=(n(58),n(97)),l=n(98),s=n(106),u=n(99),f=n(107),d=n(235),p=n(233),h=n(100),m=n.n(h),g=(n(119),n(10)),b=n.n(g),w=n(18),v=n(101),O=n(30),j=n(234),y=n(16);function E(){return x.apply(this,arguments)}function x(){return(x=Object(w.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="/Face_Blur/models",e.next=3,y.h(t);case 3:return e.next=5,y.f(t);case 5:return e.next=7,y.g(t);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(e){return k.apply(this,arguments)}function k(){return(k=Object(w.a)(b.a.mark((function e(t){var n,a,r,c,o,i,l=arguments;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=l.length>1&&void 0!==l[1]?l[1]:512,a=.5,r=new y.c({inputSize:n,scoreThreshold:a}),c=!0,e.next=6,y.e(t);case 6:return o=e.sent,e.next=9,y.d(o,r).withFaceLandmarks(c).withFaceDescriptors();case 9:return i=e.sent,e.abrupt("return",i);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var L=n(102);function U(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?U(n,!0).forEach((function(t){Object(v.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):U(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var C={imageURL:null,fullDesc:null,detections:null,descriptors:null,match:null},F=Object(j.a)((function(){var e=Object(a.useState)(I({},C,{faceMatcher:null})),t=Object(O.a)(e,2),n=t[0],c=t[1],o=Object(a.useRef)(null),i=Object(a.useRef)(null),l=Object(a.useRef)(null);Object(a.useEffect)((function(){window.addEventListener("load",d,!1),window.addEventListener("resize",d,!1)}),[]),Object(a.useEffect)((function(){console.log("useEffect"),console.log(n),s()}),[n.imageURL]),Object(a.useEffect)((function(){n.detections&&f()}),[n.detections]),Object(a.useEffect)(Object(w.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E();case 2:case"end":return e.stop()}}),e)}))),[]);var s=function(){var e=Object(w.a)(b.a.mark((function e(){var t,a=arguments;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=a.length>0&&void 0!==a[0]?a[0]:n.imageURL,console.log("handleImage"),!t){e.next=7;break}return e.next=5,R(t).then((function(e){if(console.log(e),e){console.log(n);var t=I({},n);t.descriptors=e.map((function(e){return e.descriptor})),t.detections=e.map((function(e){return e.detection})),c(t),console.log(t)}}));case 5:e.next=8;break;case 7:console.log("\uc774\ubbf8\uc9c0 \ubabb \ubc1b\uc544\uc634");case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),u=function(){var e=Object(w.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("handleFile"),e.next=3,c({imageURL:URL.createObjectURL(o.current.files[0]),loading:!0});case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=i.current,t=e.getContext("2d"),a=l.current,r=(n.imageURL,n.detections);n.match;e.width=a.width,e.height=a.height,d(),console.log(n),t.clearRect(0,0,e.width,e.height),t.filter="none",t.drawImage(a,0,0),r&&r.map((function(e,n){var r=e.box.height,c=e.box.width,o=e.box._x+c/2,i=e.box._y+r/2;t.filter="blur(10px)",t.beginPath(),t.arc(o,i,r/2,0,2*Math.PI),t.clip(),t.drawImage(a,0,0)}));var o=I({},n);o.loading=!1,c(o)},d=function(){console.log("resize");var e=i.current,t=e.width/e.height,n=window.innerHeight,a=n*t;a>window.innerWidth&&(n=(a=window.innerWidth)/t),e.style.width=a+"px",e.style.height=n+"px"},p=n.imageURL,h=(n.detections,n.match,["\u2728\uc5bc\uad74 \ube14\ub7ec \ucc98\ub9ac\u2728","\u2728FACE BLUR YOUR IMAGE\u2728"]),m=["\u2b07\ufe0f \ube14\ub7ec \ucc98\ub9ac \uc774\ubbf8\uc9c0 \ub2e4\uc6b4\ub85c\ub4dc","\u2b07\ufe0f Download Blured Image"],g=["\ud83e\udd33 \uc5bc\uad74 \uc774\ubbf8\uc9c0 \uc62c\ub9ac\uae30","\ud83e\udd33 Upload Face Image"],v=Object(a.useState)("\u2728FACE BLUR YOUR IMAGE\u2728"),j=Object(O.a)(v,2),y=j[0],x=j[1],k=Object(a.useState)("\u2b07\ufe0f Download Blured Image"),U=Object(O.a)(k,2),F=U[0],P=U[1],B=Object(a.useState)("\ud83e\udd33 Upload Face Image"),D=Object(O.a)(B,2),S=D[0],_=D[1],N=0;return Object(a.useEffect)((function(){setInterval((function(){h.length>N&&(x(h[N]),P(m[N]),_(g[N]),++N==h.length&&(N=0))}),2e3)}),[]),r.a.createElement("div",{style:{backgroundColor:"#1a1a1a",height:"100vh",width:"100vw",margin:-8}},r.a.createElement("div",{id:"titleText"},y),r.a.createElement("div",{className:"flexContainer"},r.a.createElement("button",{className:"buttonStyle"},r.a.createElement("label",{style:{cursor:"pointer"}},S,r.a.createElement("input",{style:{display:"none"},ref:o,type:"file",onChange:u,accept:".jpg, .jpeg, .png"}))),r.a.createElement("button",{className:"buttonStyle",onClick:function(){!function(e,t){var n=document.createElement("a");n.download=t,n.href=e,n.click()}("data:"+i.current.toDataURL("image/jpeg"),"yourImage.jpeg")}},F)),r.a.createElement("div",{style:{height:"1rem"}}),r.a.createElement("canvas",{ref:i}),r.a.createElement("img",{src:p,ref:l,alt:"imageURL",style:{display:"none"}}),!0===n.loading?r.a.createElement("div",{className:"flexContainerCenter"},r.a.createElement("div",{style:{flex:1}},r.a.createElement(L.BarLoader,{color:"#123abc",loading:!!n.loading}),r.a.createElement("div",{style:{height:20}}),r.a.createElement("span",null,"\ub85c\ub529\uc911!_!"))):r.a.createElement(r.a.Fragment,null))})),P=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(d.a,{history:m()({basename:"/Face_Blur"})},r.a.createElement("div",{className:"route"},r.a.createElement(p.a,{exact:!0,path:"/",component:F}))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},58:function(e,t,n){}},[[109,1,2]]]);
//# sourceMappingURL=main.b63995a4.chunk.js.map