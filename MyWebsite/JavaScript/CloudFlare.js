/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Popper=t()}(this,function(){"use strict";function i(e){return e&&"[object Function]"==={}.toString.call(e)}function y(e,t){if(1!==e.nodeType)return[];var n=getComputedStyle(e,null);return t?n[t]:n}function b(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function w(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var t=y(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/(auto|scroll)/.test(n+o+r)?e:w(b(e))}function E(e){var t=e&&e.offsetParent,n=t&&t.nodeName;return n&&"BODY"!==n&&"HTML"!==n?-1!==["TD","TABLE"].indexOf(t.nodeName)&&"static"===y(t,"position")?E(t):t:e?e.ownerDocument.documentElement:document.documentElement}function l(e){return null===e.parentNode?e:l(e.parentNode)}function O(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return document.documentElement;var n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,r=n?e:t,o=n?t:e,i=document.createRange();i.setStart(r,0),i.setEnd(o,0);var s,a,f=i.commonAncestorContainer;if(e!==f&&t!==f||r.contains(o))return"BODY"===(a=(s=f).nodeName)||"HTML"!==a&&E(s.firstElementChild)!==s?E(f):f;var p=l(e);return p.host?O(p.host,t):O(e,l(t).host)}function x(e,t){var n="top"===(1<arguments.length&&void 0!==t?t:"top")?"scrollTop":"scrollLeft",r=e.nodeName;if("BODY"!==r&&"HTML"!==r)return e[n];var o=e.ownerDocument.documentElement;return(e.ownerDocument.scrollingElement||o)[n]}function u(e,t){var n="x"===t?"Left":"Top",r="Left"==n?"Right":"Bottom";return parseFloat(e["border"+n+"Width"],10)+parseFloat(e["border"+r+"Width"],10)}function r(e,t,n,r){return M(t["offset"+e],t["scroll"+e],n["client"+e],n["offset"+e],n["scroll"+e],I()?n["offset"+e]+r["margin"+("Height"===e?"Top":"Left")]+r["margin"+("Height"===e?"Bottom":"Right")]:0)}function L(){var e=document.body,t=document.documentElement,n=I()&&getComputedStyle(t);return{height:r("Height",e,t,n),width:r("Width",e,t,n)}}function T(e){return V({},e,{right:e.left+e.width,bottom:e.top+e.height})}function D(e){var t={};if(I())try{t=e.getBoundingClientRect();var n=x(e,"top"),r=x(e,"left");t.top+=n,t.left+=r,t.bottom+=n,t.right+=r}catch(e){}else t=e.getBoundingClientRect();var o={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},i="HTML"===e.nodeName?L():{},s=i.width||e.clientWidth||o.right-o.left,a=i.height||e.clientHeight||o.bottom-o.top,f=e.offsetWidth-s,p=e.offsetHeight-a;if(f||p){var l=y(e);f-=u(l,"x"),p-=u(l,"y"),o.width-=f,o.height-=p}return T(o)}function N(e,t){var n=I(),r="HTML"===t.nodeName,o=D(e),i=D(t),s=w(e),a=y(t),f=parseFloat(a.borderTopWidth,10),p=parseFloat(a.borderLeftWidth,10),l=T({top:o.top-i.top-f,left:o.left-i.left-p,width:o.width,height:o.height});if(l.marginTop=0,l.marginLeft=0,!n&&r){var u=parseFloat(a.marginTop,10),c=parseFloat(a.marginLeft,10);l.top-=f-u,l.bottom-=f-u,l.left-=p-c,l.right-=p-c,l.marginTop=u,l.marginLeft=c}return(n?t.contains(s):t===s&&"BODY"!==s.nodeName)&&(l=function(e,t,n){var r=2<arguments.length&&void 0!==n&&n,o=x(t,"top"),i=x(t,"left"),s=r?-1:1;return e.top+=o*s,e.bottom+=o*s,e.left+=i*s,e.right+=i*s,e}(l,t)),l}function d(e,t,n,r){var o,i,s,a,f,p,l,u={top:0,left:0},c=O(e,t);if("viewport"===r)i=(o=c).ownerDocument.documentElement,s=N(o,i),a=M(i.clientWidth,window.innerWidth||0),f=M(i.clientHeight,window.innerHeight||0),p=x(i),l=x(i,"left"),u=T({top:p-s.top+s.marginTop,left:l-s.left+s.marginLeft,width:a,height:f});else{var d;"scrollParent"===r?"BODY"===(d=w(b(t))).nodeName&&(d=e.ownerDocument.documentElement):d="window"===r?e.ownerDocument.documentElement:r;var h=N(d,c);if("HTML"!==d.nodeName||function e(t){var n=t.nodeName;return"BODY"!==n&&"HTML"!==n&&("fixed"===y(t,"position")||e(b(t)))}(c))u=h;else{var m=L(),g=m.height,v=m.width;u.top+=h.top-h.marginTop,u.bottom=g+h.top,u.left+=h.left-h.marginLeft,u.right=v+h.left}}return u.left+=n,u.top+=n,u.right-=n,u.bottom-=n,u}function a(e,t,r,n,o,i){var s=5<arguments.length&&void 0!==i?i:0;if(-1===e.indexOf("auto"))return e;var a=d(r,n,s,o),f={top:{width:a.width,height:t.top-a.top},right:{width:a.right-t.right,height:a.height},bottom:{width:a.width,height:a.bottom-t.bottom},left:{width:t.left-a.left,height:a.height}},p=Object.keys(f).map(function(e){return V({key:e},f[e],{area:(t=f[e]).width*t.height});var t}).sort(function(e,t){return t.area-e.area}),l=p.filter(function(e){var t=e.width,n=e.height;return t>=r.clientWidth&&n>=r.clientHeight}),u=0<l.length?l[0].key:p[0].key,c=e.split("-")[1];return u+(c?"-"+c:"")}function f(e,t,n){return N(n,O(t,n))}function k(e){var t=getComputedStyle(e),n=parseFloat(t.marginTop)+parseFloat(t.marginBottom),r=parseFloat(t.marginLeft)+parseFloat(t.marginRight);return{width:e.offsetWidth+r,height:e.offsetHeight+n}}function B(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function H(e,t,n){n=n.split("-")[0];var r=k(e),o={width:r.width,height:r.height},i=-1!==["right","left"].indexOf(n),s=i?"top":"left",a=i?"left":"top",f=i?"height":"width",p=i?"width":"height";return o[s]=t[s]+t[f]/2-r[f]/2,o[a]=n===a?t[a]-r[p]:t[B(a)],o}function W(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function A(e,n,t){return(void 0===t?e:e.slice(0,function(e,t,n){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===n});var r=W(e,function(e){return e[t]===n});return e.indexOf(r)}(e,"name",t))).forEach(function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var t=e.function||e.fn;e.enabled&&i(t)&&(n.offsets.popper=T(n.offsets.popper),n.offsets.reference=T(n.offsets.reference),n=t(n,e))}),n}function e(e,n){return e.some(function(e){var t=e.name;return e.enabled&&t===n})}function C(e){for(var t=[!1,"ms","Webkit","Moz","O"],n=e.charAt(0).toUpperCase()+e.slice(1),r=0;r<t.length-1;r++){var o=t[r],i=o?""+o+n:e;if(void 0!==document.body.style[i])return i}return null}function s(e){var t=e.ownerDocument;return t?t.defaultView:window}function t(e,t,n,r){n.updateBound=r,s(e).addEventListener("resize",n.updateBound,{passive:!0});var o=w(e);return function e(t,n,r,o){var i="BODY"===t.nodeName,s=i?t.ownerDocument.defaultView:t;s.addEventListener(n,r,{passive:!0}),i||e(w(s.parentNode),n,r,o),o.push(s)}(o,"scroll",n.updateBound,n.scrollParents),n.scrollElement=o,n.eventsEnabled=!0,n}function n(){var e,t;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(e=this.reference,t=this.state,s(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t))}function c(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function p(n,r){Object.keys(r).forEach(function(e){var t="";-1!==["width","height","top","right","bottom","left"].indexOf(e)&&c(r[e])&&(t="px"),n.style[e]=r[e]+t})}function F(e,t,n){var r=W(e,function(e){return e.name===t}),o=!!r&&e.some(function(e){return e.name===n&&e.enabled&&e.order<r.order});if(!o){var i="`"+t+"`";console.warn("`"+n+"` modifier is required by "+i+" modifier in order to work, be sure to include it before "+i+"!")}return o}function o(e,t){var n=1<arguments.length&&void 0!==t&&t,r=G.indexOf(e),o=G.slice(r+1).concat(G.slice(0,r));return n?o.reverse():o}function h(e,o,i,t){var s=[0,0],a=-1!==["right","left"].indexOf(t),n=e.split(/(\+|\-)/).map(function(e){return e.trim()}),r=n.indexOf(W(n,function(e){return-1!==e.search(/,|\s/)}));n[r]&&-1===n[r].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var f=/\s*,\s*|\s+/,p=-1===r?[n]:[n.slice(0,r).concat([n[r].split(f)[0]]),[n[r].split(f)[1]].concat(n.slice(r+1))];return(p=p.map(function(e,t){var n=(1===t?!a:a)?"height":"width",r=!1;return e.reduce(function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,r=!0,e):r?(e[e.length-1]+=t,r=!1,e):e.concat(t)},[]).map(function(e){return function(e,t,n,r){var o,i=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),s=+i[1],a=i[2];if(!s)return e;if(0!==a.indexOf("%"))return"vh"!==a&&"vw"!==a?s:("vh"===a?M(document.documentElement.clientHeight,window.innerHeight||0):M(document.documentElement.clientWidth,window.innerWidth||0))/100*s;switch(a){case"%p":o=n;break;case"%":case"%r":default:o=r}return T(o)[t]/100*s}(e,n,o,i)})})).forEach(function(n,r){n.forEach(function(e,t){c(e)&&(s[r]+=e*("-"===n[t-1]?-1:1))})}),s}for(var P=Math.min,S=Math.floor,M=Math.max,m="undefined"!=typeof window&&"undefined"!=typeof document,g=["Edge","Trident","Firefox"],v=0,j=0;j<g.length;j+=1)if(m&&0<=navigator.userAgent.indexOf(g[j])){v=1;break}function R(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var U,Y=m&&window.Promise?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},v))}},I=function(){return null==U&&(U=-1!==navigator.appVersion.indexOf("MSIE 10")),U},q=function(e,t,n){return t&&Z(e.prototype,t),n&&Z(e,n),e},V=Object.assign||function(e){for(var t,n=1;n<arguments.length;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},z=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],G=z.slice(3),_="flip",X="clockwise",J="counterclockwise",K=(q(Q,[{key:"update",value:function(){return function(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=f(this.state,this.popper,this.reference),e.placement=a(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.offsets.popper=H(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position="absolute",e=A(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}.call(this)}},{key:"destroy",value:function(){return function(){return this.state.isDestroyed=!0,e(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.left="",this.popper.style.position="",this.popper.style.top="",this.popper.style[C("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}.call(this)}},{key:"enableEventListeners",value:function(){return function(){this.state.eventsEnabled||(this.state=t(this.reference,this.options,this.state,this.scheduleUpdate))}.call(this)}},{key:"disableEventListeners",value:function(){return n.call(this)}}]),Q);function Q(e,t){var n=this,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,Q),this.scheduleUpdate=function(){return requestAnimationFrame(n.update)},this.update=Y(this.update.bind(this)),this.options=V({},Q.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=t&&t.jquery?t[0]:t,this.options.modifiers={},Object.keys(V({},Q.Defaults.modifiers,r.modifiers)).forEach(function(e){n.options.modifiers[e]=V({},Q.Defaults.modifiers[e]||{},r.modifiers?r.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return V({name:e},n.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(e){e.enabled&&i(e.onLoad)&&e.onLoad(n.reference,n.popper,n.options,e,n.state)}),this.update();var o=this.options.eventsEnabled;o&&this.enableEventListeners(),this.state.eventsEnabled=o}function Z(e,t){for(var n,r=0;r<t.length;r++)(n=t[r]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}return K.Utils=("undefined"==typeof window?global:window).PopperUtils,K.placements=z,K.Defaults={placement:"bottom",eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,n=t.split("-")[0],r=t.split("-")[1];if(r){var o=e.offsets,i=o.reference,s=o.popper,a=-1!==["bottom","top"].indexOf(n),f=a?"left":"top",p=a?"width":"height",l={start:R({},f,i[f]),end:R({},f,i[f]+i[p]-s[p])};e.offsets.popper=V({},s,l[r])}return e}},offset:{order:200,enabled:!0,fn:function(e,t){var n,r=t.offset,o=e.placement,i=e.offsets,s=i.popper,a=i.reference,f=o.split("-")[0];return n=c(+r)?[+r,0]:h(r,s,a,f),"left"===f?(s.top+=n[0],s.left-=n[1]):"right"===f?(s.top+=n[0],s.left+=n[1]):"top"===f?(s.left+=n[0],s.top-=n[1]):"bottom"===f&&(s.left+=n[0],s.top+=n[1]),e.popper=s,e},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,r){var t=r.boundariesElement||E(e.instance.popper);e.instance.reference===t&&(t=E(t));var o=d(e.instance.popper,e.instance.reference,r.padding,t);r.boundaries=o;var n=r.priority,i=e.offsets.popper,s={primary:function(e){var t=i[e];return i[e]<o[e]&&!r.escapeWithReference&&(t=M(i[e],o[e])),R({},e,t)},secondary:function(e){var t="right"===e?"left":"top",n=i[t];return i[e]>o[e]&&!r.escapeWithReference&&(n=P(i[t],o[e]-("right"===e?i.width:i.height))),R({},t,n)}};return n.forEach(function(e){var t=-1===["left","top"].indexOf(e)?"secondary":"primary";i=V({},i,s[t](e))}),e.offsets.popper=i,e},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,n=t.popper,r=t.reference,o=e.placement.split("-")[0],i=S,s=-1!==["top","bottom"].indexOf(o),a=s?"right":"bottom",f=s?"left":"top",p=s?"width":"height";return n[a]<i(r[f])&&(e.offsets.popper[f]=i(r[f])-n[p]),n[f]>i(r[a])&&(e.offsets.popper[f]=i(r[a])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){var n;if(!F(e.instance.modifiers,"arrow","keepTogether"))return e;var r=t.element;if("string"==typeof r){if(!(r=e.instance.popper.querySelector(r)))return e}else if(!e.instance.popper.contains(r))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var o=e.placement.split("-")[0],i=e.offsets,s=i.popper,a=i.reference,f=-1!==["left","right"].indexOf(o),p=f?"height":"width",l=f?"Top":"Left",u=l.toLowerCase(),c=f?"left":"top",d=f?"bottom":"right",h=k(r)[p];a[d]-h<s[u]&&(e.offsets.popper[u]-=s[u]-(a[d]-h)),a[u]+h>s[d]&&(e.offsets.popper[u]+=a[u]+h-s[d]),e.offsets.popper=T(e.offsets.popper);var m=a[u]+a[p]/2-h/2,g=y(e.instance.popper),v=parseFloat(g["margin"+l],10),b=parseFloat(g["border"+l+"Width"],10),w=m-e.offsets.popper[u]-v-b;return w=M(P(s[p]-h,w),0),e.arrowElement=r,e.offsets.arrow=(R(n={},u,Math.round(w)),R(n,c,""),n),e},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(h,m){if(e(h.instance.modifiers,"inner"))return h;if(h.flipped&&h.placement===h.originalPlacement)return h;var g=d(h.instance.popper,h.instance.reference,m.padding,m.boundariesElement),v=h.placement.split("-")[0],b=B(v),w=h.placement.split("-")[1]||"",y=[];switch(m.behavior){case _:y=[v,b];break;case X:y=o(v);break;case J:y=o(v,!0);break;default:y=m.behavior}return y.forEach(function(e,t){if(v!==e||y.length===t+1)return h;v=h.placement.split("-")[0],b=B(v);var n,r=h.offsets.popper,o=h.offsets.reference,i=S,s="left"===v&&i(r.right)>i(o.left)||"right"===v&&i(r.left)<i(o.right)||"top"===v&&i(r.bottom)>i(o.top)||"bottom"===v&&i(r.top)<i(o.bottom),a=i(r.left)<i(g.left),f=i(r.right)>i(g.right),p=i(r.top)<i(g.top),l=i(r.bottom)>i(g.bottom),u="left"===v&&a||"right"===v&&f||"top"===v&&p||"bottom"===v&&l,c=-1!==["top","bottom"].indexOf(v),d=!!m.flipVariations&&(c&&"start"===w&&a||c&&"end"===w&&f||!c&&"start"===w&&p||!c&&"end"===w&&l);(s||u||d)&&(h.flipped=!0,(s||u)&&(v=y[t+1]),d&&(w="end"===(n=w)?"start":"start"===n?"end":n),h.placement=v+(w?"-"+w:""),h.offsets.popper=V({},h.offsets.popper,H(h.instance.popper,h.offsets.reference,h.placement)),h=A(h.instance.modifiers,h,"flip"))}),h},behavior:"flip",padding:5,boundariesElement:"viewport"},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,n=t.split("-")[0],r=e.offsets,o=r.popper,i=r.reference,s=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return o[s?"left":"top"]=i[n]-(a?o[s?"width":"height"]:0),e.placement=B(t),e.offsets.popper=T(o),e}},hide:{order:800,enabled:!0,fn:function(e){if(!F(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,n=W(e.instance.modifiers,function(e){return"preventOverflow"===e.name}).boundaries;if(t.bottom<n.top||t.left>n.right||t.top>n.bottom||t.right<n.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var n=t.x,r=t.y,o=e.offsets.popper,i=W(e.instance.modifiers,function(e){return"applyStyle"===e.name}).gpuAcceleration;void 0!==i&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var s,a,f=void 0===i?t.gpuAcceleration:i,p=D(E(e.instance.popper)),l={position:o.position},u={left:S(o.left),top:S(o.top),bottom:S(o.bottom),right:S(o.right)},c="bottom"===n?"top":"bottom",d="right"===r?"left":"right",h=C("transform");if(a="bottom"==c?-p.height+u.bottom:u.top,s="right"==d?-p.width+u.right:u.left,f&&h)l[h]="translate3d("+s+"px, "+a+"px, 0)",l[c]=0,l[d]=0,l.willChange="transform";else{var m="bottom"==c?-1:1,g="right"==d?-1:1;l[c]=a*m,l[d]=s*g,l.willChange=c+", "+d}var v={"x-placement":e.placement};return e.attributes=V({},v,e.attributes),e.styles=V({},l,e.styles),e.arrowStyles=V({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(e){return p(e.instance.popper,e.styles),t=e.instance.popper,n=e.attributes,Object.keys(n).forEach(function(e){!1===n[e]?t.removeAttribute(e):t.setAttribute(e,n[e])}),e.arrowElement&&Object.keys(e.arrowStyles).length&&p(e.arrowElement,e.arrowStyles),e;var t,n},onLoad:function(e,t,n,r,o){var i=f(0,t,e),s=a(n.placement,i,t,e,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return t.setAttribute("x-placement",s),p(t,{position:"absolute"}),n},gpuAcceleration:void 0}}},K});//# sourceMappingURL=popper.min.js.map