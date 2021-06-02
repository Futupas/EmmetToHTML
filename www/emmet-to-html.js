(()=>{"use strict";var t={74:(t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.EmmetStringParsingError=void 0;class e extends Error{constructor(t,r){super(t),this.position=r}}r.EmmetStringParsingError=e},797:(t,r,e)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.makePseudoHtml=void 0;const s=e(74),n=e(314);function i(t,r=0){const e=function(t){const r=[];let e="+",s=a(t),n=-1;for(;!1!==s&&t.length>0;){const i=e+t.substring(0,s);r.push({str:i,pos:n}),e=t.charAt(s),n+=s+1,s=a(t=t.substring(s+1))}return r.push({str:e+t,pos:n}),r}(t),o=new n.PseudoHTML("PSEUDO_PARENT",void 0,void 0);o.parent=o;let c=o;for(const t of e){const e=t;e.pos+=r;let a=c.parent;if(e.str.startsWith(">"))a=c,e.str="+"+e.str.substring(1);else if(e.str.startsWith("^")){for(;e.str.startsWith("^");)c=c.parent,a=c.parent,e.str=e.str.substring(1),e.pos++;if(""===e.str)continue;e.str="+"+e.str,e.pos--}if(!e.str.startsWith("+"))throw new s.EmmetStringParsingError("Incorrect first symbol");if("("===e.str.charAt(1)){const t=i(e.str.substring(2,e.str.length-1),e.pos+2);if(t.length<1)throw new s.EmmetStringParsingError("Error parsing with brackets (I guess, it's because of there are empty brackets)",e.pos);c=t[0];for(const r of t)r.parent=a,a.children.push(r)}else{const t=new n.PseudoHTML(e.str.substring(1),a,e.pos);a.children.push(t),c=t}}for(const t of o.children)t.parent=void 0;return o.children}function a(t){let r=0;if(t.startsWith("(")||t.startsWith("{")){let e=0,s=!1;for(let n=0;n<t.length;n-=-1)if("{"===t.charAt(n)&&(s=!0),"}"===t.charAt(n)&&(s=!1),"("!==t.charAt(n)||s||e++,")"!==t.charAt(n)||s||e--,0===e){r=n+1,t=t.substring(n+1);break}}let e=t.indexOf("+"),s=t.indexOf(">"),n=t.indexOf("^");return(-1!==e||-1!==s||-1!==n)&&(-1===e&&(e=Math.max(s,n)),-1===s&&(s=Math.max(e,n)),-1===n&&(n=Math.max(e,s)),Math.min(e,s,n)+r)}r.makePseudoHtml=function(t){return i(t)}},105:(t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.prepareString=void 0,r.prepareString=function(t){return t}},314:(t,r,e)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.PseudoHTML=void 0;const s=e(74);r.PseudoHTML=class{constructor(t,r,e){this.raw=t,this.parent=r,this.startingInString=e,this.children=[]}parse2(){const t=["","#",".","[","=","]","{","}","*"," "],r={raw:this.raw,attributes:[],classList:[]};let e="",n="",i=!0,a=!1;const o=/([a-zA-Z]){1}([a-zA-Z]|-|_|[0-9])*/,c=/(([a-zA-Z]){1}([a-zA-Z]|-|_|[0-9])*)*/;for(let u=0;u<this.raw.length;u++)if("]"!==e&&"}"!==e||(i=!1),t.includes(this.raw[u]))switch("{"===e&&"}"===this.raw[u]&&(i&&(r.innerText=n),e=this.raw[u],n=""),"["===e&&"]"===this.raw[u]&&(i&&r.attributes.push({name:n}),e=this.raw[u],n=""),e){case"{":case"[":break;case"":if(i&&(r.tagName=n,!n.match(c).includes(n)))throw new s.EmmetStringParsingError("tag name syntax error",u);e=this.raw[u],n="";break;case"#":if(i&&(r.id=n,!n.match(o).includes(n)))throw new s.EmmetStringParsingError("id name syntax error",u);e=this.raw[u],n="";break;case".":if(i&&(r.classList.push(n),!n.match(o).includes(n)))throw new s.EmmetStringParsingError("class name syntax error",u);e=this.raw[u],n="";break;case"]":if(i){let t=!1,e="",i=!0,a=!0,c="",l="";for(let h=0;h<n.length;h++)if(" "===n[h]){if(a&&(a=!1),t&&(l+=n[h]),!t&&0!==c.length&&0!==l.length){if(!c.match(o).includes(n))throw new s.EmmetStringParsingError("attribute name syntax error",u);r.attributes.push({name:c,value:l})}}else"="===n[h]?t||(a=!1):'"'===n[h]?(i||(i=!0,e='"'),i&&"\\"!==n[h-1]&&(i=!1)):"'"===n[h]?(i||(i=!0,e="'"),i&&"\\"!==n[h-1]&&(i=!1)):a?c+=n[h]:a||(l+=n[h]);if(!a)throw new s.EmmetStringParsingError("missing value after =",u)}e=this.raw[u],n="";break;case"}":i&&r.classList.push(n),e=this.raw[u],n="";break;case"*":i&&r.classList.push(n),e=this.raw[u],n="",a=!0}else n+=this.raw[u];return r}parse(){const t=this.raw,r={raw:t,attributes:[],classList:[],id:"",innerText:"",quantity:void 0,tagName:""};let e=0;for(let n=0;n<t.length;n++){const i=t[n];if(3===e){if("}"!==i){r.innerText+=i;continue}e=void 0}switch(i){case".":r.classList.push(""),e=1;break;case"#":e=2;break;case"{":e=3;break;case"*":e=4;break;default:switch(e){case 1:r.classList[r.classList.length-1]+=i;break;case 0:r.tagName+=i;break;case 2:r.id+=i;break;case 4:if(!["0","1","2","3","4","5","6","7","8","9"].includes(i))throw new s.EmmetStringParsingError("Unknown number",n+(this.startingInString||0));const t=10*(r.quantity||0)+ +i;r.quantity=t}}}return console.log(r),r}render(){const t=this.parse(),r=[],e=t.quantity??1;for(let s=0;s<e;s++){const n=document.createElement(t.tagName||"div"),i=(t.classList??[]).map((t=>this.parseNumInString(t,s,e)));n.classList.add(...i),t.id&&n.setAttribute("id",this.parseNumInString(t.id,s,e)),t.innerText&&(n.innerText=this.parseNumInString(t.innerText,s,e));for(const r of t.attributes??[]){const t=this.parseNumInString(r.name,s,e),i=r.value?this.parseNumInString(r.value,s,e):"";n.setAttribute(t,i)}for(const t of this.children){const r=t.render();for(const t of r)n.appendChild(t)}r.push(n)}return r}parseNumInString(t,r,e){const s=[];let n;for(let r=0;r<t.length;r++){const e=t[r];n?n.extended?"-"===e?(n.raw+=e,n.minus=!0):["0","1","2","3","4","5","6","7","8","9"].includes(e)?(n.raw+=e,n.startNumber+=e):(s.push(n),n=void 0):"$"===e?(n.raw+=e,n.dollars+=e):"@"===e?(n.raw+=e,n.extended=!0):(s.push(n),n=void 0):"$"===e&&(n={raw:e,indexInString:r,minus:!1,startNumber:"",dollars:"$",extended:!1})}n&&s.push(n);for(let n=s.length-1;n>=0;n--){const i=s[n],a=t.substring(0,i.indexInString),o=t.substring(i.indexInString+i.raw.length),c=i.startNumber||"1";let u=`${i.minus?+c+e-r-1:+c+r}`;for(;u.length<i.dollars.length;)u="0"+u;t=a+u+o}return t}}},607:function(t,r,e){Object.defineProperty(r,"__esModule",{value:!0});const s=e(797),n=e(314),i=e(105),a=globalThis||window||e.g;function o(t){const r=i.prepareString(t),e=s.makePseudoHtml(r),n=[];for(const t of e){const r=t.render();n.push(...r)}return n}a.globalFunction=t=>{console.log(t),console.log("from global function")},a.parseAttributes=t=>new n.PseudoHTML(t).parse(),a.emmetToHTML=o,a.emmetToPseudoHTML=t=>s.makePseudoHtml(t).map((t=>{const r=t;return r.parsed=t.parse(),r.rendered=t.render(),r})),String.prototype.toHtml=()=>o(String(this))}},r={};function e(s){var n=r[s];if(void 0!==n)return n.exports;var i=r[s]={exports:{}};return t[s].call(i.exports,i,i.exports,e),i.exports}e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),e(607)})();