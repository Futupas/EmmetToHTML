(()=>{"use strict";var t={797:function(t,r,e){var n,o=this&&this.__extends||(n=function(t,r){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])})(t,r)},function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function e(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)});Object.defineProperty(r,"__esModule",{value:!0}),r.makePseudoHtml=void 0;var i=e(314);function s(t){var r=function(t){for(var r=[],e="+",n=a(t);!1!==n&&t.length>0;){var o=e+t.substring(0,n);r.push(o),e=t.charAt(n),n=a(t=t.substring(n+1))}return r.push(e+t),r}(t),e=new i.PseudoHTML("PSEUDO_PARENT",void 0);e.parent=e;for(var n=e,o=0,c=r;o<c.length;o++){var l=c[o],f=n.parent;if(l.startsWith(">"))f=n,l="+"+l.substring(1);else if(l.startsWith("^")){for(;l.startsWith("^");)f=(n=n.parent).parent,l=l.substring(1);if(""===l)continue;l="+"+l}if(!l.startsWith("+"))throw new u("Incorrect first symbol");if("("===l.charAt(1)){var h=s(l.substring(2,l.length-1));if(h.length<1)throw new u("Error parsing with brackets (I guess, it's because of there are empty brackets)");n=h[0];for(var p=0,d=h;p<d.length;p++){var g=d[p];g.parent=f,f.children.push(g)}}else{var v=new i.PseudoHTML(l.substring(1),f);f.children.push(v),n=v}}for(var b=0,y=e.children;b<y.length;b++)y[b].parent=void 0;return e.children}function a(t){var r=0;if(t.startsWith("(")||t.startsWith("{"))for(var e=0,n=!1,o=0;o<t.length;o-=-1)if("{"===t.charAt(o)&&(n=!0),"}"===t.charAt(o)&&(n=!1),"("!==t.charAt(o)||n||e++,")"!==t.charAt(o)||n||e--,0===e){r=o+1,t=t.substring(o+1);break}var i=t.indexOf("+"),s=t.indexOf(">"),a=t.indexOf("^");return(-1!==i||-1!==s||-1!==a)&&(-1===i&&(i=Math.max(s,a)),-1===s&&(s=Math.max(i,a)),-1===a&&(a=Math.max(i,s)),Math.min(i,s,a)+r)}r.makePseudoHtml=function(t){return s(t)};var u=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return o(r,t),r}(Error)},105:(t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.prepareString=void 0,r.prepareString=function(t){return t}},314:(t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.PseudoHTML=void 0;r.PseudoHTML=function(t,r){this.tag=t,this.parent=r,this.children=[]}}},r={};function e(n){var o=r[n];if(void 0!==o)return o.exports;var i=r[n]={exports:{}};return t[n].call(i.exports,i,i.exports,e),i.exports}e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{e(797),e(105);(globalThis||window||e.g).globalFunction=function(t){console.log(t),console.log("from global function")},String.prototype.toHtml=function(){return"htmlled string"}})()})();