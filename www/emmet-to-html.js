(()=>{"use strict";var t={74:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.EmmetStringParsingError=void 0;class r extends Error{constructor(t,e){super(t),this.position=e}}e.EmmetStringParsingError=r},797:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.makePseudoHtml=void 0;const n=r(74),s=r(314);function i(t,e=0){const r=function(t){const e=[];let r="+",n=o(t),s=-1;for(;!1!==n&&t.length>0;){const i=r+t.substring(0,n);e.push({str:i,pos:s}),r=t.charAt(n),s+=n+1,n=o(t=t.substring(n+1))}return e.push({str:r+t,pos:s}),e}(t),a=new s.PseudoHTML("PSEUDO_PARENT",void 0,void 0);a.parent=a;let u=a;for(const t of r){const r=t;r.pos+=e;let o=u.parent;if(r.str.startsWith(">"))o=u,r.str="+"+r.str.substring(1);else if(r.str.startsWith("^")){for(;r.str.startsWith("^");)u=u.parent,o=u.parent,r.str=r.str.substring(1),r.pos++;if(""===r.str)continue;r.str="+"+r.str,r.pos--}if(!r.str.startsWith("+"))throw new n.EmmetStringParsingError("Incorrect first symbol");if("("===r.str.charAt(1)){const t=i(r.str.substring(2,r.str.length-1),r.pos+2);if(t.length<1)throw new n.EmmetStringParsingError("Error parsing with brackets (I guess, it's because of there are empty brackets)",r.pos);u=t[0];for(const e of t)e.parent=o,o.children.push(e)}else{const t=new s.PseudoHTML(r.str.substring(1),o,r.pos);o.children.push(t),u=t}}for(const t of a.children)t.parent=void 0;return a.children}function o(t){let e=0;if(t.startsWith("(")||t.startsWith("{")){let r=0,n=!1;for(let s=0;s<t.length;s-=-1)if("{"===t.charAt(s)&&(n=!0),"}"===t.charAt(s)&&(n=!1),"("!==t.charAt(s)||n||r++,")"!==t.charAt(s)||n||r--,0===r){e=s+1,t=t.substring(s+1);break}}let r=t.indexOf("+"),n=t.indexOf(">"),s=t.indexOf("^");return(-1!==r||-1!==n||-1!==s)&&(-1===r&&(r=Math.max(n,s)),-1===n&&(n=Math.max(r,s)),-1===s&&(s=Math.max(r,n)),Math.min(r,n,s)+e)}e.makePseudoHtml=function(t){return i(t)}},105:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.prepareString=void 0,e.prepareString=function(t){return t}},314:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.PseudoHTML=void 0;const n=r(74);e.PseudoHTML=class{constructor(t,e,r){this.raw=t,this.parent=e,this.startingInString=r,this.children=[]}parse(){const t=this.raw,e={raw:t,attributes:[],classList:[],id:"",innerText:"",quantity:void 0,tagName:""};let r,s=0;for(let i=0;i<t.length;i++){const o=t[i];if(3===s){if("}"!==o){e.innerText+=o;continue}s=void 0}if(6!==s)switch(o){case".":e.classList.push(""),s=1;break;case"#":s=2;break;case"{":s=3;break;case"[":e.attributes.push({name:"",value:""}),s=5;continue;case"]":s=void 0;continue;case"*":s=4;break;default:switch(s){case 1:e.classList[e.classList.length-1]+=o;break;case 0:e.tagName+=o;break;case 2:e.id+=o;break;case 4:if(!["0","1","2","3","4","5","6","7","8","9"].includes(o))throw new n.EmmetStringParsingError("Unknown number",i+(this.startingInString||0));const t=10*(e.quantity||0)+ +o;e.quantity=t;break;case 5:if("]"===o){s=void 0;continue}if(" "===o&&""!==e.attributes[e.attributes.length-1].name){e.attributes[e.attributes.length-1].value=void 0,e.attributes.push({name:"",value:""});continue}if("="===o){s=6,r=void 0;continue}e.attributes[e.attributes.length-1].name+=o}}else{if("]"===o){s=void 0;continue}if(" "===o&&1!==r&&2!==r){r=void 0,s=5,e.attributes.push({name:"",value:""});continue}if(!r){"'"===o?r=1:'"'===o?r=2:" "===o||(r=0,e.attributes[e.attributes.length-1].value+=o);continue}if(1===r&&"'"===o||2===r&&'"'===o){r=void 0,s=5,e.attributes.push({name:"",value:""});continue}e.attributes[e.attributes.length-1].value+=o}}return e.attributes=e.attributes.map((t=>{const e=t.name.trim();return{name:e&&e.length?e:void 0,value:t.value&&t.value.length?t.value:void 0}})).filter((t=>t.name)),console.log(e),e}render(){const t=this.parse(),e=[],r=t.quantity??1;for(let n=0;n<r;n++){const s=document.createElement(t.tagName||"div"),i=(t.classList??[]).map((t=>this.parseNumInString(t,n,r)));s.classList.add(...i),t.id&&s.setAttribute("id",this.parseNumInString(t.id,n,r)),t.innerText&&(s.innerText=this.parseNumInString(t.innerText,n,r));for(const e of t.attributes??[]){const t=this.parseNumInString(e.name,n,r),i=e.value?this.parseNumInString(e.value,n,r):"";s.setAttribute(t,i)}for(const t of this.children){const e=t.render();for(const t of e)s.appendChild(t)}e.push(s)}return e}parseNumInString(t,e,r){const n=[];let s;for(let e=0;e<t.length;e++){const r=t[e];s?s.extended?"-"===r?(s.raw+=r,s.minus=!0):["0","1","2","3","4","5","6","7","8","9"].includes(r)?(s.raw+=r,s.startNumber+=r):(n.push(s),s=void 0):"$"===r?(s.raw+=r,s.dollars+=r):"@"===r?(s.raw+=r,s.extended=!0):(n.push(s),s=void 0):"$"===r&&(s={raw:r,indexInString:e,minus:!1,startNumber:"",dollars:"$",extended:!1})}s&&n.push(s);for(let s=n.length-1;s>=0;s--){const i=n[s],o=t.substring(0,i.indexInString),a=t.substring(i.indexInString+i.raw.length),u=i.startNumber||"1";let c=`${i.minus?+u+r-e-1:+u+e}`;for(;c.length<i.dollars.length;)c="0"+c;t=o+c+a}return t}}},607:function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0});const n=r(797),s=r(314),i=r(105),o=globalThis||window||r.g;function a(t){const e=i.prepareString(t),r=n.makePseudoHtml(e),s=[];for(const t of r){const e=t.render();s.push(...e)}return s}o.globalFunction=t=>{console.log(t),console.log("from global function")},o.parseAttributes=t=>new s.PseudoHTML(t).parse(),o.emmetToHTML=a,o.emmetToPseudoHTML=t=>n.makePseudoHtml(t).map((t=>{const e=t;return e.parsed=t.parse(),e.rendered=t.render(),e})),String.prototype.toHtml=()=>a(String(this))}},e={};function r(n){var s=e[n];if(void 0!==s)return s.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r(607)})();