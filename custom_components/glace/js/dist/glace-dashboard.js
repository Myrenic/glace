/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let s=class{constructor(t,e,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=a.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&a.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const a=1===t.length?t[0]:e.reduce((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new s(a,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,g=globalThis,u=g.trustedTypes,m=u?u.emptyScript:"",f=g.reactiveElementPolyfillSupport,b=(t,e)=>t,x={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!o(t,e),v={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(t,i,e);void 0!==a&&c(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){const{get:a,set:s}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:a,set(e){const n=a?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(e)i.adoptedStyleSheets=a.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of a){const a=document.createElement("style"),s=t.litNonce;void 0!==s&&a.setAttribute("nonce",s),a.textContent=e.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,i);if(void 0!==a&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,a=i._$Eh.get(t);if(void 0!==a&&this._$Em!==a){const t=i.getPropertyOptions(a),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:x;this._$Em=a;const n=s.fromAttribute(e,t.type);this[a]=n??this._$Ej?.get(a)??n,this._$Em=null}}requestUpdate(t,e,i,a=!1,s){if(void 0!==t){const n=this.constructor;if(!1===a&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:a,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===a&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,a=this[e];!0!==t||this._$AL.has(e)||void 0===a||this.C(e,void 0,i,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[b("elementProperties")]=new Map,_[b("finalized")]=new Map,f?.({ReactiveElement:_}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,$=t=>t,k=w.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,z=`<${C}>`,O=document,P=()=>O.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,M="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,H=/>/g,N=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,L=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,V=O.createTreeWalker(O,129);function Y(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,a=[];let s,n=2===e?"<svg>":3===e?"<math>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let o,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===U?"!--"===c[1]?r=D:void 0!==c[1]?r=H:void 0!==c[2]?(I.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=N):void 0!==c[3]&&(r=N):r===N?">"===c[0]?(r=s??U,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,o=c[1],r=void 0===c[3]?N:'"'===c[3]?L:R):r===L||r===R?r=N:r===D||r===H?r=U:(r=N,s=void 0);const h=r===N&&t[e+1].startsWith("/>")?" ":"";n+=r===U?i+z:l>=0?(a.push(o),i.slice(0,l)+E+i.slice(l)+S+h):i+S+(-2===l?e:h)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),a]};class Z{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let s=0,n=0;const r=t.length-1,o=this.parts,[c,l]=F(t,e);if(this.el=Z.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(a=V.nextNode())&&o.length<r;){if(1===a.nodeType){if(a.hasAttributes())for(const t of a.getAttributeNames())if(t.endsWith(E)){const e=l[n++],i=a.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);o.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:X}),a.removeAttribute(t)}else t.startsWith(S)&&(o.push({type:6,index:s}),a.removeAttribute(t));if(I.test(a.tagName)){const t=a.textContent.split(S),e=t.length-1;if(e>0){a.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],P()),V.nextNode(),o.push({type:2,index:++s});a.append(t[e],P())}}}else if(8===a.nodeType)if(a.data===C)o.push({type:2,index:s});else{let t=-1;for(;-1!==(t=a.data.indexOf(S,t+1));)o.push({type:7,index:s}),t+=S.length-1}s++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,a){if(e===W)return e;let s=void 0!==a?i._$Co?.[a]:i._$Cl;const n=j(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,a)),void 0!==a?(i._$Co??=[])[a]=s:i._$Cl=s),void 0!==s&&(e=J(t,s._$AS(t,e.values),s,a)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,a=(t?.creationScope??O).importNode(e,!0);V.currentNode=a;let s=V.nextNode(),n=0,r=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new Q(s,s.nextSibling,this,t):1===o.type?e=new o.ctor(s,o.name,o.strings,this,t):6===o.type&&(e=new at(s,this,t)),this._$AV.push(e),o=i[++r]}n!==o?.index&&(s=V.nextNode(),n++)}return V.currentNode=O,a}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,a){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),j(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,a="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(e);else{const t=new K(a,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Z(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const s of t)a===e.length?e.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=e[a],i._$AI(s),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,a,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,a){const s=this.strings;let n=!1;if(void 0===s)t=J(this,t,e,0),n=!j(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const a=t;let r,o;for(t=s[0],r=0;r<s.length-1;r++)o=J(this,a[i+r],e,r),o===W&&(o=this._$AH[r]),n||=!j(o)||o!==this._$AH[r],o===q?t=q:t!==q&&(t+=(o??"")+s[r+1]),this._$AH[r]=o}n&&!a&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends X{constructor(t,e,i,a,s){super(t,e,i,a,s),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??q)===W)return;const i=this._$AH,a=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==q&&(i===q||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(Z,Q),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let rt=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const a=i?.renderBefore??e;let s=a._$litPart$;if(void 0===s){const t=i?.renderBefore??null;a._$litPart$=s=new Q(e.insertBefore(P(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const ot=nt.litElementPolyfillSupport;ot?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=1;let lt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt="important",ht=" !"+dt,pt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends lt{constructor(t){if(super(t),t.type!==ct||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const a=t[i];return null==a?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const a=e[t];if(null!=a){this.ft.add(t);const e="string"==typeof a&&a.endsWith(ht);t.includes("-")||e?i.setProperty(t,e?a.slice(0,-11):a,e?dt:""):i[t]=a}}return W}});function gt(t,e){const i={};for(const t of e){const e=t.split(".")[0];i[e]||(i[e]=[]),i[e].push(t)}const a=[];for(const[e,s]of Object.entries(i))for(const i of s)a.push(t.callService(e,"turn_off",{entity_id:i}));return Promise.all(a)}function ut(){return(new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}const mt="\n  radial-gradient(circle at 18% 18%, rgba(117, 192, 255, 0.18), transparent 38%),\n  radial-gradient(circle at 84% 14%, rgba(188, 118, 255, 0.16), transparent 42%),\n  radial-gradient(circle at 76% 72%, rgba(64, 218, 196, 0.13), transparent 34%),\n  radial-gradient(circle at 24% 82%, rgba(255, 166, 117, 0.12), transparent 32%),\n  linear-gradient(160deg, #06070b 0%, #0b1020 42%, #090e17 68%, #040507 100%)\n".trim(),ft={obsidian:mt,aurora:"\n    radial-gradient(circle at 12% 18%, rgba(107, 188, 255, 0.26), transparent 34%),\n    radial-gradient(circle at 78% 14%, rgba(217, 134, 255, 0.22), transparent 36%),\n    radial-gradient(circle at 70% 72%, rgba(44, 230, 192, 0.18), transparent 34%),\n    radial-gradient(circle at 28% 78%, rgba(255, 173, 102, 0.14), transparent 30%),\n    linear-gradient(160deg, #05070e 0%, #0a1226 38%, #0b1320 64%, #040507 100%)\n  ".trim(),dawn:"\n    radial-gradient(circle at 20% 18%, rgba(255, 201, 154, 0.24), transparent 34%),\n    radial-gradient(circle at 82% 18%, rgba(255, 140, 184, 0.20), transparent 34%),\n    radial-gradient(circle at 60% 76%, rgba(123, 202, 255, 0.18), transparent 30%),\n    linear-gradient(155deg, #1a0f1a 0%, #291a2f 28%, #1a243a 60%, #0a0e16 100%)\n  ".trim(),studio:"\n    radial-gradient(circle at 22% 22%, rgba(255, 255, 255, 0.10), transparent 28%),\n    radial-gradient(circle at 78% 24%, rgba(118, 154, 255, 0.14), transparent 30%),\n    radial-gradient(circle at 70% 74%, rgba(135, 255, 225, 0.10), transparent 28%),\n    linear-gradient(160deg, #08090d 0%, #10141b 40%, #0c1118 72%, #050608 100%)\n  ".trim()},bt=[{id:"home",path:"home",title:"Home",subtitle:"A calmer starting point",icon:"mdi:home-variant"},{id:"lighting",path:"lighting",title:"Lighting",subtitle:"Lights, scenes, and quick controls",icon:"mdi:lightbulb-group-outline"},{id:"switches",path:"switches",title:"Switches",subtitle:"Useful switches without the clutter",icon:"mdi:toggle-switch-outline"}],xt="\n  linear-gradient(180deg, rgba(3, 6, 12, 0.22) 0%, rgba(3, 6, 12, 0.44) 52%, rgba(3, 6, 12, 0.68) 100%)\n".trim();function yt(t=""){return String(t).replace(/"/g,'\\"')}function vt(t,e={}){const i=bt.find(e=>e.id===t)||{id:t,path:t,title:t,subtitle:"",icon:"mdi:view-grid-outline"};return{...i,...e,id:t,path:e.path||i.path||t}}function _t(t={}){const e=t.pages||{};return bt.map(t=>vt(t.id,e[t.id]||{})).filter(t=>!0!==t.hidden)}function wt(t={},e="home",i){const a=(s=i||t?.background?.pages?.[e]||t?.background?.global)?"string"==typeof s?{kind:"css",css:s}:s.css?{kind:"css",css:s.css}:s.image?{kind:"image",image:s.image,overlay:s.overlay||xt,position:s.position||"center center",size:s.size||"cover",attachment:s.attachment||"fixed"}:{kind:"preset",preset:s.preset||"obsidian"}:{kind:"preset",preset:"obsidian"};var s;return"image"===a.kind?{backgroundImage:`${a.overlay}, url("${yt(a.image)}")`,backgroundSize:`cover, ${a.size}`,backgroundPosition:`center center, ${a.position}`,backgroundAttachment:`fixed, ${a.attachment}`}:{backgroundImage:"css"===a.kind?a.css:ft[a.preset]||mt,backgroundSize:"cover",backgroundPosition:"center center",backgroundAttachment:"fixed"}}customElements.define("glace-layout",class extends rt{static get properties(){return{hass:{type:Object},_cards:{type:Array},_config:{type:Object},_userConfig:{type:Object}}}static get styles(){return n`
      :host {
        display: block;
        min-height: 100vh;
        min-height: 100dvh;
        margin: 0;
        padding: 0;
        position: relative;

        /* Rich dark wallpaper with mesh gradient layers */
        background:
          /* Warm accent top-right */
          radial-gradient(
            ellipse 60% 50% at 85% 15%,
            rgba(100, 60, 180, 0.18) 0%,
            transparent 70%
          ),
          /* Cool accent bottom-left */
          radial-gradient(
            ellipse 55% 45% at 15% 80%,
            rgba(10, 80, 160, 0.16) 0%,
            transparent 70%
          ),
          /* Warm glow center */
          radial-gradient(
            ellipse 40% 35% at 50% 40%,
            rgba(80, 40, 120, 0.10) 0%,
            transparent 70%
          ),
          /* Teal accent */
          radial-gradient(
            ellipse 30% 40% at 70% 65%,
            rgba(20, 100, 130, 0.09) 0%,
            transparent 70%
          ),
          /* Base gradient */
          linear-gradient(
            170deg,
            #0c0c14 0%,
            #0e1018 20%,
            #0a0e16 40%,
            #0c0f1a 60%,
            #08090f 80%,
            #060608 100%
          );
        background-attachment: fixed;
        overflow: hidden;
        color: rgba(255, 255, 255, 0.94);
      }

      .shell {
        position: relative;
        min-height: 100vh;
        min-height: 100dvh;
      }

      .backdrop,
      .backdrop-glow,
      .backdrop-noise,
      .backdrop-vignette {
        position: fixed;
        inset: 0;
        pointer-events: none;
      }

      .backdrop {
        background-repeat: no-repeat;
        filter: saturate(1.08) contrast(1.04);
        transform: scale(1.04);
      }

      .backdrop-glow {
        background:
          radial-gradient(circle at 15% 18%, rgba(255, 255, 255, 0.08), transparent 26%),
          radial-gradient(circle at 84% 12%, rgba(118, 188, 255, 0.10), transparent 28%),
          radial-gradient(circle at 70% 80%, rgba(44, 230, 192, 0.08), transparent 24%);
        mix-blend-mode: screen;
        opacity: 0.8;
      }

      .backdrop-noise {
        opacity: 0.08;
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
        background-size: 3px 3px, 3px 3px;
        mix-blend-mode: soft-light;
      }

      .backdrop-vignette {
        background:
          radial-gradient(circle at center, transparent 0%, rgba(1, 4, 9, 0.08) 52%, rgba(1, 4, 9, 0.44) 100%),
          linear-gradient(180deg, rgba(1, 4, 9, 0.08) 0%, rgba(1, 4, 9, 0.28) 100%);
      }

      .layout-wrapper {
        display: flex;
        flex-direction: column;
        gap: 18px;
        min-height: 100vh;
        min-height: 100dvh;
        padding:
          calc(24px + env(safe-area-inset-top, 0px))
          16px
          calc(118px + env(safe-area-inset-bottom, 0px))
          16px;
        position: relative;
        z-index: 1;
      }

      .page-chrome {
        padding: 18px 20px;
        border-radius: 28px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.07) 48%, rgba(255, 255, 255, 0.03) 100%);
        backdrop-filter: blur(28px) saturate(1.5);
        -webkit-backdrop-filter: blur(28px) saturate(1.5);
        border: 1px solid rgba(255, 255, 255, 0.10);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.12),
          0 24px 80px rgba(3, 5, 14, 0.28);
      }

      .page-chip {
        width: fit-content;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.72);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .page-chip ha-icon {
        --mdc-icon-size: 14px;
      }

      .page-title {
        margin: 14px 0 4px;
        font-size: clamp(2rem, 6vw, 3.35rem);
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 0.98;
      }

      .page-subtitle {
        margin: 0;
        max-width: 40rem;
        color: rgba(255, 255, 255, 0.62);
        font-size: 14px;
        line-height: 1.5;
      }

      .cards-slot {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    `}constructor(){super(),this._userConfig=null}setConfig(t){this._config=t,this._cards=void 0}set hass(t){this._hass=t,this._cards&&this._cards.forEach(e=>{e.hass=t}),!this._userConfig&&t&&this._loadUserConfig()}get hass(){return this._hass}async _buildCards(){if(!this._config||!this._config.cards)return;if(this._cards)return;const t=await(window.loadCardHelpers?.());if(t){this._cards=[];for(const e of this._config.cards){const i=await t.createCardElement(e);i.hass=this._hass,this._cards.push(i)}this.requestUpdate()}}async _loadUserConfig(){try{this._userConfig=await(t=this._hass,t.callWS({type:"glace/config/get"}))}catch(t){console.error("Glace: failed to load user config",t),this._userConfig={}}var t}_getViewId(){return this._config?.path||"home"}_getPageMeta(){const t=this._getViewId(),e=function(t={},e="home"){return _t(t).find(t=>t.id===e)||vt(e)}(this._userConfig||{},t);return{...e,title:e.title||this._config?.title||t,subtitle:e.subtitle,icon:this._config?.icon||e.icon}}updated(){if(this._buildCards(),this._cards){const t=this.shadowRoot?.querySelector(".cards-slot");t&&(t.childElementCount!==this._cards.length||this._cards.some((e,i)=>t.children[i]!==e))&&t.replaceChildren(...this._cards)}}render(){const t=this._getPageMeta(),e=_t(this._userConfig||{}),i=wt(this._userConfig||{},t.id,this._config?.background),a="home"!==t.id;return B`
      <div class="shell">
        <div class="backdrop" style=${pt(i)}></div>
        <div class="backdrop-glow"></div>
        <div class="backdrop-noise"></div>
        <div class="backdrop-vignette"></div>

        <div class="layout-wrapper">
          ${a?B`
                <header class="page-chrome">
                  <div class="page-chip">
                    <ha-icon icon=${t.icon}></ha-icon>
                    <span>Glace</span>
                  </div>
                  <h1 class="page-title">${t.title}</h1>
                  ${t.subtitle?B`<p class="page-subtitle">${t.subtitle}</p>`:""}
                </header>
              `:""}

          <div class="cards-slot"></div>
        </div>

        <glace-nav-bar .active=${t.id} .tabs=${e}></glace-nav-bar>
      </div>
    `}});const $t=n`
  :host {
    /* ── iOS System Colors ── */
    --glace-blue: #0a84ff;
    --glace-green: #30d158;
    --glace-orange: #ff9f0a;
    --glace-red: #ff453a;
    --glace-teal: #64d2ff;
    --glace-purple: #bf5af2;
    --glace-yellow: #ffd60a;
    --glace-indigo: #5e5ce6;

    /* ── Glass Surface Tokens ── */
    --glace-glass-bg: rgba(255, 255, 255, 0.08);
    --glace-glass-bg-hover: rgba(255, 255, 255, 0.12);
    --glace-glass-bg-active: rgba(255, 255, 255, 0.16);
    --glace-glass-blur: 32px;
    --glace-glass-saturate: 1.65;
    --glace-glass-brightness: 1.08;
    --glace-glass-radius: 24px;
    --glace-glass-radius-sm: 18px;
    --glace-glass-radius-xs: 12px;

    /* ── Text ── */
    --glace-text-primary: rgba(255, 255, 255, 0.92);
    --glace-text-secondary: rgba(255, 255, 255, 0.55);
    --glace-text-tertiary: rgba(255, 255, 255, 0.30);

    /* ── Elevation ── */
    --glace-shadow-sm: 0 10px 24px rgba(2, 5, 14, 0.12);
    --glace-shadow-md: 0 16px 40px rgba(2, 5, 14, 0.18), 0 4px 12px rgba(2, 5, 14, 0.10);
    --glace-shadow-lg: 0 28px 80px rgba(2, 5, 14, 0.26), 0 10px 28px rgba(2, 5, 14, 0.12);

    /* ── Motion ── */
    --glace-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --glace-ease: cubic-bezier(0.4, 0, 0.2, 1);

    /* ── Nav ── */
    --glace-nav-height: 82px;

    font-family: -apple-system, "SF Pro Display", "SF Pro Text",
      BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, sans-serif;
    color: var(--glace-text-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* ═══════════════════════════════════════════
     Glass Surface — the core liquid-glass card
     ═══════════════════════════════════════════ */

  .glass {
    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.16) 0%,
        rgba(255, 255, 255, 0.08) 42%,
        rgba(255, 255, 255, 0.04) 100%
      ),
      var(--glace-glass-bg);
    backdrop-filter: blur(var(--glace-glass-blur))
      saturate(var(--glace-glass-saturate))
      brightness(var(--glace-glass-brightness));
    -webkit-backdrop-filter: blur(var(--glace-glass-blur))
      saturate(var(--glace-glass-saturate))
      brightness(var(--glace-glass-brightness));
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: var(--glace-glass-radius);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.16),
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.02),
      var(--glace-shadow-md);
    position: relative;
    overflow: hidden;
    transition: transform 0.35s var(--glace-spring),
      background 0.2s var(--glace-ease),
      box-shadow 0.3s var(--glace-ease),
      border-color 0.3s var(--glace-ease);
  }

  /* Top specular highlight — key liquid glass effect */
  .glass::before {
    content: "";
    position: absolute;
    top: 0;
    left: 7%;
    right: 7%;
    height: 1.5px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.18) 18%,
      rgba(255, 255, 255, 0.42) 50%,
      rgba(255, 255, 255, 0.18) 82%,
      transparent
    );
    pointer-events: none;
    z-index: 2;
    border-radius: 1px;
  }

  .glass::after {
    content: "";
    position: absolute;
    inset: auto -10% -25% auto;
    width: 72%;
    height: 68%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.02) 48%,
      transparent 70%
    );
    opacity: 0.55;
    pointer-events: none;
    mix-blend-mode: screen;
  }

  .glass:hover {
    transform: translateY(-2px);
    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.18) 0%,
        rgba(255, 255, 255, 0.10) 42%,
        rgba(255, 255, 255, 0.05) 100%
      ),
      var(--glace-glass-bg-hover);
    border-color: rgba(255, 255, 255, 0.13);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.18),
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.03),
      var(--glace-shadow-lg);
  }

  .glass:active {
    transform: scale(0.975);
    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.20) 0%,
        rgba(255, 255, 255, 0.10) 40%,
        rgba(255, 255, 255, 0.06) 100%
      ),
      var(--glace-glass-bg-active);
  }

  /* Subtle variant — less prominent glass */
  .glass-subtle {
    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.10) 0%,
        rgba(255, 255, 255, 0.04) 100%
      );
    backdrop-filter: blur(24px) saturate(1.35);
    -webkit-backdrop-filter: blur(24px) saturate(1.35);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--glace-glass-radius-sm);
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.10),
      var(--glace-shadow-sm);
    position: relative;
    overflow: hidden;
    transition: transform 0.35s var(--glace-spring),
      background 0.2s var(--glace-ease);
  }

  .glass-subtle::before {
    content: "";
    position: absolute;
    top: 0;
    left: 12%;
    right: 12%;
    height: 0.5px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2) 30%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0.2) 70%,
      transparent
    );
    pointer-events: none;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════
     Typography — SF Pro inspired scale
     ═══════════════════════════════════════════ */

  .text-title {
    font-size: 34px;
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.02em;
  }

  .text-headline {
    font-size: 22px;
    font-weight: 600;
    line-height: 1.27;
    letter-spacing: -0.01em;
  }

  .text-body {
    font-size: 17px;
    font-weight: 400;
    line-height: 1.41;
    letter-spacing: -0.01em;
  }

  .text-callout {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.38;
  }

  .text-subhead {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.33;
    letter-spacing: -0.01em;
  }

  .text-footnote {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.38;
  }

  .text-caption {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.33;
  }

  .text-caption2 {
    font-size: 11px;
    font-weight: 400;
    line-height: 1.27;
  }

  .weight-bold { font-weight: 700; }
  .weight-semibold { font-weight: 600; }
  .weight-medium { font-weight: 500; }
  .weight-regular { font-weight: 400; }
  .weight-light { font-weight: 300; }

  /* ═══════════════════════════════════════════
     Color Utility
     ═══════════════════════════════════════════ */

  .color-secondary { color: var(--glace-text-secondary); }
  .color-tertiary { color: var(--glace-text-tertiary); }
  .color-blue { color: var(--glace-blue); }
  .color-green { color: var(--glace-green); }
  .color-orange { color: var(--glace-orange); }
  .color-red { color: var(--glace-red); }
  .color-teal { color: var(--glace-teal); }

  /* ═══════════════════════════════════════════
     Icon Button — frosted circle
     ═══════════════════════════════════════════ */

  .icon-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    border: 0.5px solid rgba(255, 255, 255, 0.15);
    box-shadow: inset 0 0.5px 0 0 rgba(255, 255, 255, 0.15),
      var(--glace-shadow-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s var(--glace-spring),
      background 0.2s var(--glace-ease);
    color: var(--glace-text-primary);
    padding: 0;
  }

  .icon-btn:active {
    transform: scale(0.88);
    background: rgba(255, 255, 255, 0.18);
  }

  /* ═══════════════════════════════════════════
     iOS Toggle Switch
     ═══════════════════════════════════════════ */

  .toggle {
    width: 51px;
    height: 31px;
    border-radius: 15.5px;
    position: relative;
    cursor: pointer;
    border: none;
    padding: 0;
    flex-shrink: 0;
    transition: background 0.3s var(--glace-ease);
  }

  .toggle.on {
    background: var(--glace-green);
    box-shadow: 0 0 8px rgba(48, 209, 88, 0.3);
  }

  .toggle.off {
    background: rgba(255, 255, 255, 0.16);
    box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.10);
  }

  .toggle .knob {
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15),
      0 0 1px rgba(0, 0, 0, 0.1);
    transition: left 0.25s var(--glace-spring);
  }

  .toggle.on .knob {
    left: 22px;
  }

  .toggle.off .knob {
    left: 2px;
  }

  /* ═══════════════════════════════════════════
     Pill / Chip — frosted compact button
     ═══════════════════════════════════════════ */

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 100px;
    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.16) 0%,
        rgba(255, 255, 255, 0.08) 100%
      );
    backdrop-filter: blur(20px) saturate(1.5);
    -webkit-backdrop-filter: blur(20px) saturate(1.5);
    border: 1px solid rgba(255, 255, 255, 0.10);
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.10);
    color: var(--glace-text-primary);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.3s var(--glace-spring),
      background 0.2s var(--glace-ease);
    white-space: nowrap;
  }

  .pill:active {
    transform: scale(0.94);
    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.20) 0%,
        rgba(255, 255, 255, 0.10) 100%
      );
  }

  .pill ha-icon {
    --mdc-icon-size: 16px;
  }

  .pill.accent {
    background: rgba(10, 132, 255, 0.18);
    border-color: rgba(10, 132, 255, 0.25);
    color: var(--glace-blue);
  }

  .pill.danger {
    background: rgba(255, 69, 58, 0.15);
    border-color: rgba(255, 69, 58, 0.20);
    color: var(--glace-red);
  }

  /* ═══════════════════════════════════════════
     Section Heading
     ═══════════════════════════════════════════ */

  .section-label {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--glace-text-secondary);
    margin: 0 0 10px 4px;
    padding: 0;
  }

  /* ═══════════════════════════════════════════
     Animations
     ═══════════════════════════════════════════ */

  @keyframes glace-fade-in {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes glace-slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-in {
    animation: glace-fade-in 0.4s var(--glace-ease) both;
  }

  /* ═══════════════════════════════════════════
     Utility
     ═══════════════════════════════════════════ */

  .hidden {
    display: none !important;
  }

  .separator {
    height: 0.5px;
    background: rgba(255, 255, 255, 0.08);
    margin: 0;
  }
`;function kt(t,e){return t.area_id?t.area_id:t.device_id&&e[t.device_id]&&e[t.device_id].area_id||null}function At(t,e){const i=[];for(const a of Object.values(t))for(const t of a.entities)t.domain===e&&i.push({...t,area_id:a.id,area_name:a.name});return i}function Et(t){return function(t,e){const i={light:["on"],switch:["on"],fan:["on"],media_player:["playing","paused","on","buffering","idle"],climate:["heat","cool","heat_cool","auto","dry","fan_only"],cover:["open","opening","closing"],vacuum:["cleaning","returning"],binary_sensor:["on"]}[e]||["on"];return At(t,e).filter(t=>i.includes(t.state))}(t,"light")}customElements.define("glace-homepage-card",class extends rt{static get properties(){return{hass:{type:Object},_config:{type:Object},_glaceData:{type:Object},_time:{type:String},_selectedArea:{type:String},mode:{type:String}}}static get styles(){return[$t,n`
        :host {
          display: block;
          padding: 0 20px;
        }

        .welcome {
          padding: 56px 0 8px 4px;
        }

        .welcome .greeting {
          font-size: 16px;
          font-weight: 400;
          color: var(--glace-text-secondary);
          margin: 0 0 2px 0;
        }

        .welcome .time {
          font-size: 54px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--glace-text-primary);
          margin: 0;
        }

        .section {
          margin-top: 24px;
          animation: glace-fade-in 0.5s var(--glace-ease) both;
        }

        .section:nth-child(2) { animation-delay: 0.05s; }
        .section:nth-child(3) { animation-delay: 0.1s; }
        .section:nth-child(4) { animation-delay: 0.15s; }
        .section:nth-child(5) { animation-delay: 0.2s; }

        .quick-actions {
          display: flex;
          gap: 8px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .weather-card {
          padding: 18px 18px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .weather-main {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        .weather-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(137, 206, 255, 0.12);
          color: var(--glace-blue);
          flex-shrink: 0;
        }

        .weather-icon ha-icon {
          --mdc-icon-size: 24px;
        }

        .weather-label {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .weather-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--glace-text-primary);
        }

        .weather-subtitle {
          font-size: 13px;
          color: var(--glace-text-secondary);
          text-transform: capitalize;
        }

        .weather-temp {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--glace-text-primary);
          text-align: right;
          white-space: nowrap;
        }

        .weather-meta {
          margin-top: 6px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .weather-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: var(--glace-text-secondary);
          font-size: 12px;
          font-weight: 500;
        }

        .weather-chip ha-icon {
          --mdc-icon-size: 14px;
        }

        .room-detail {
          animation: glace-slide-up 0.35s var(--glace-ease) both;
        }

        @keyframes glace-slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .room-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 56px 0 20px 0;
        }

        .back-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 0.5px solid rgba(255, 255, 255, 0.12);
          box-shadow: inset 0 0.5px 0 0 rgba(255, 255, 255, 0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--glace-text-primary);
          transition: transform 0.3s var(--glace-spring);
          padding: 0;
          flex-shrink: 0;
        }

        .back-btn:active {
          transform: scale(0.85);
        }

        .back-btn ha-icon {
          --mdc-icon-size: 20px;
        }

        .room-title {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .domain-section {
          margin-bottom: 20px;
          animation: glace-fade-in 0.4s var(--glace-ease) both;
        }

        .domain-section:nth-child(2) { animation-delay: 0.06s; }
        .domain-section:nth-child(3) { animation-delay: 0.12s; }
        .domain-section:nth-child(4) { animation-delay: 0.18s; }

        .domain-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          padding: 0 4px;
          gap: 8px;
        }

        .domain-label-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .domain-label {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--glace-text-secondary);
        }

        .domain-count {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.48);
        }

        .domain-action {
          font-size: 13px;
          font-weight: 500;
          color: var(--glace-blue);
          cursor: pointer;
          background: none;
          border: none;
          padding: 6px 10px;
          border-radius: 8px;
          transition: opacity 0.2s;
          white-space: nowrap;
        }

        .domain-action:active {
          opacity: 0.5;
        }

        .entity-list {
          display: flex;
          flex-direction: column;
        }

        .entity-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          cursor: pointer;
          transition: background 0.15s;
          gap: 12px;
        }

        .entity-row:not(:last-child) {
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.06);
        }

        .entity-row:active {
          background: rgba(255, 255, 255, 0.06);
        }

        .entity-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .entity-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.06);
        }

        .entity-icon-wrap.active {
          background: rgba(255, 159, 10, 0.14);
        }

        .entity-icon-wrap ha-icon {
          --mdc-icon-size: 18px;
          color: var(--glace-text-secondary);
        }

        .entity-icon-wrap.active ha-icon {
          color: var(--glace-orange);
        }

        .entity-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }

        .entity-name {
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .entity-state-text {
          font-size: 12px;
          color: var(--glace-text-secondary);
        }

        .entity-value {
          font-size: 14px;
          font-weight: 500;
          color: var(--glace-text-secondary);
          white-space: nowrap;
          margin-left: 4px;
        }

        .page-hero {
          padding: 4px 4px 8px;
        }

        .hero-kicker {
          margin: 0 0 10px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.58);
        }

        .hero-title {
          margin: 0;
          font-size: clamp(2rem, 9vw, 3.4rem);
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -0.05em;
        }

        .hero-copy {
          margin: 10px 0 0;
          color: rgba(255, 255, 255, 0.62);
          font-size: 14px;
          line-height: 1.5;
          max-width: 34rem;
        }

        .hero-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(118px, 1fr));
          gap: 10px;
          margin-top: 18px;
        }

        .metric {
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.06);
          border: 0.5px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0.5px 0 rgba(255, 255, 255, 0.10);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .metric-value {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--glace-text-primary);
        }

        .metric-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.52);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .scene-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .scene-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--glace-text-primary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .scene-pill ha-icon {
          --mdc-icon-size: 16px;
          color: var(--glace-blue);
        }

        .ambient-empty {
          padding: 18px 18px 20px;
        }

        .ambient-empty h3 {
          margin: 0 0 4px;
          font-size: 16px;
          font-weight: 600;
        }

        .ambient-empty p {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          line-height: 1.5;
        }
      `]}constructor(){super(),this._glaceData=null,this._time=ut(),this._timer=null,this._selectedArea=null,this.mode="home",this._onHashChange=this._onHashChange.bind(this)}setConfig(t){this._config=t,this.mode=t.mode||"home"}connectedCallback(){super.connectedCallback(),this._timer=setInterval(()=>{this._time=ut()},3e4),window.addEventListener("location-changed",this._onHashChange),window.addEventListener("popstate",this._onHashChange),this._onHashChange()}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer),window.removeEventListener("location-changed",this._onHashChange),window.removeEventListener("popstate",this._onHashChange)}_onHashChange(){const t=window.location.hash.substring(1);this._selectedArea=t||null}async _fetchData(){var t;if(this.hass)try{this._glaceData=await(t=this.hass,t.callWS({type:"glace/configuration/get"}))}catch(t){console.error("Glace: failed to fetch configuration",t)}}willUpdate(t){t.has("hass")&&this.hass&&!this._glaceData&&this._fetchData()}_getAreaMap(){return this._glaceData&&this.hass?function(t,e,i,a,s={}){const n={};for(const[e,i]of Object.entries(t))n[e]={...i,id:e,entities:[]};const r=new Set(s.excluded_entities||[]),o=new Set(s.excluded_areas||[]);for(const[t,s]of Object.entries(e)){if(s.disabled||s.hidden)continue;if(r.has(t))continue;const e=kt(s,i);if(!e||o.has(e))continue;if(!n[e])continue;const c=a[t];n[e].entities.push({entity_id:t,...s,state:c?c.state:"unavailable",attributes:c?c.attributes:{}})}const c=s.area_order||[];if(c.length){const t={};for(const e of c)n[e]&&(t[e]=n[e]);for(const[e,i]of Object.entries(n))t[e]||(t[e]=i);return t}return n}(this._glaceData.areas,this._glaceData.entities,this._glaceData.devices,this.hass.states,this._glaceData.user_config):{}}_selectArea(t){window.location.hash=t,this._selectedArea=t,window.scrollTo({top:0,behavior:"smooth"})}_goBack(){window.location.hash="",this._selectedArea=null}_handleAllLightsOff(){const t=Et(this._getAreaMap());0!==t.length&&gt(this.hass,t.map(t=>t.entity_id))}_turnOffEntities(t){const e=t.filter(t=>this._isActive(this.hass.states[t.entity_id]?.state||t.state)).map(t=>t.entity_id);0!==e.length&&gt(this.hass,e)}_toggleEntity(t){const e=t.split(".")[0];["light","switch","fan","input_boolean","cover"].includes(e)?this.hass.callService(e,"toggle",{entity_id:t}):"media_player"===e?this.hass.callService("media_player","media_play_pause",{entity_id:t}):this._fireMoreInfo(t)}_activateScene(t){this.hass.callService("scene","turn_on",{entity_id:t})}_fireMoreInfo(t){const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}});this.dispatchEvent(e)}_groupByDomain(t){const e=["light","switch","media_player","climate","fan","cover","sensor","binary_sensor","camera"],i={};for(const e of t)i[e.domain]||(i[e.domain]=[]),i[e.domain].push(e);const a={};for(const t of e)i[t]&&(a[t]=i[t]);for(const[t,e]of Object.entries(i))a[t]||(a[t]=e);return a}_getDomainEntities(t){return At(this._getAreaMap(),t)}_groupEntitiesByArea(t){const e=new Map;for(const i of t){const t=i.area_id||i.area_name||"ungrouped";e.has(t)||e.set(t,{id:i.area_id||null,name:i.area_name||"Unassigned",entities:[]}),e.get(t).entities.push(i)}return Array.from(e.values()).map(t=>({...t,entities:t.entities.sort((t,e)=>(t.attributes?.friendly_name||t.name||t.entity_id).localeCompare(e.attributes?.friendly_name||e.name||e.entity_id))})).sort((t,e)=>t.name.localeCompare(e.name))}_getEnergyEntity(){if(!this.hass)return null;const t=["sensor.electricity_price","sensor.energy_price","sensor.nordpool","sensor.tibber_prices","sensor.amber_general_price","sensor.octopus_energy_electricity_current_rate"];for(const e of t)if(this.hass.states[e])return this.hass.states[e];for(const[t,e]of Object.entries(this.hass.states))if(t.startsWith("sensor.")&&(t.includes("price")||t.includes("tariff"))&&(t.includes("energy")||t.includes("electric")))return e;return null}_getWeatherState(){if(!this.hass)return null;const t=Object.entries(this.hass.states).find(([t])=>t.startsWith("weather."));if(!t)return null;const[e,i]=t;return{entityId:e,state:i}}_getWeatherIcon(t){return{clear_night:"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:weather-lightning-rainy",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning",lightning_rainy:"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy",snowy_rainy:"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy",windy_variant:"mdi:weather-windy-variant"}[t]||"mdi:weather-partly-cloudy"}_getScenes(){if(!this.hass)return[];const t=new Set(this._glaceData?.user_config?.excluded_entities||[]);return Object.entries(this.hass.states).filter(([e,i])=>e.startsWith("scene.")&&!t.has(e)&&!this._glaceData?.entities?.[e]?.hidden&&!this._glaceData?.entities?.[e]?.disabled&&"unavailable"!==i.state).map(([t,e])=>({entity_id:t,name:e.attributes?.friendly_name||t,icon:e.attributes?.icon||"mdi:palette-outline"})).sort((t,e)=>t.name.localeCompare(e.name))}_isToggleable(t){return["light","switch","fan","input_boolean","cover"].includes(t)}_supportsTurnOff(t){return["light","switch","fan","input_boolean"].includes(t)}_isActive(t){return["on","playing","paused","heat","cool","heat_cool","auto","open","cleaning"].includes(t)}_getDomainIcon(t){return{light:"mdi:lightbulb-group",switch:"mdi:toggle-switch",media_player:"mdi:cast",climate:"mdi:thermostat",fan:"mdi:fan",cover:"mdi:blinds",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-marked-circle",camera:"mdi:cctv",vacuum:"mdi:robot-vacuum"}[t]||"mdi:puzzle"}_getEntityDisplayState(t){const e=this.hass.states[t.entity_id];return e?"light"===t.domain&&e.attributes?.brightness?`${Math.round(e.attributes.brightness/255*100)}%`:"climate"===t.domain&&e.attributes?.current_temperature?`${e.attributes.current_temperature}° → ${e.attributes.temperature||"?"}°`:"sensor"===t.domain?`${e.state}${e.attributes?.unit_of_measurement?` ${e.attributes.unit_of_measurement}`:""}`:"media_player"===t.domain&&e.attributes?.media_title?e.attributes.media_title:e.state:"unavailable"}_supportsAreaDrilldown(){return"home"===this.mode}_renderPageHero({kicker:t,title:e,copy:i,metrics:a=[]}){return B`
      <section class="page-hero animate-in">
        <p class="hero-kicker">${t}</p>
        <h2 class="hero-title">${e}</h2>
        ${i?B`<p class="hero-copy">${i}</p>`:""}
        ${a.length?B`
              <div class="hero-metrics">
                ${a.map(t=>B`
                    <div class="metric">
                      <span class="metric-value">${t.value}</span>
                      <span class="metric-label">${t.label}</span>
                    </div>
                  `)}
              </div>
            `:""}
      </section>
    `}_renderEmptyState(t,e){return B`
      <div class="glass ambient-empty">
        <h3>${t}</h3>
        <p>${e}</p>
      </div>
    `}_renderWeatherCard(){const t=this._getWeatherState();if(!t)return B``;const{state:e}=t,i=e.state||"unknown",a=e.attributes?.temperature,s=e.attributes?.temperature_unit||"°",n=e.attributes?.humidity,r=e.attributes?.wind_speed,o=e.attributes?.wind_speed_unit||"",c=e.attributes?.friendly_name||"Weather";return B`
      <div class="glass weather-card">
        <div class="weather-main">
          <div class="weather-icon">
            <ha-icon icon=${this._getWeatherIcon(i)}></ha-icon>
          </div>
          <div class="weather-label">
            <span class="weather-title">${c}</span>
            <span class="weather-subtitle">${i.replace(/_/g," ")}</span>
            <div class="weather-meta">
              ${void 0!==n?B`
                    <span class="weather-chip">
                      <ha-icon icon="mdi:water-percent"></ha-icon>
                      ${n}%
                    </span>
                  `:""}
              ${void 0!==r?B`
                    <span class="weather-chip">
                      <ha-icon icon="mdi:weather-windy"></ha-icon>
                      ${r}${o?` ${o}`:""}
                    </span>
                  `:""}
            </div>
          </div>
        </div>
        <div class="weather-temp">
          ${void 0!==a?`${a}${s}`:"--"}
        </div>
      </div>
    `}_renderSceneGrid(t){return 0===t.length?this._renderEmptyState("No scenes found","Add Home Assistant scenes to get one-tap lighting presets here."):B`
      <div class="scene-grid">
        ${t.map(t=>B`
            <button
              class="scene-pill"
              @click=${()=>this._activateScene(t.entity_id)}
            >
              <ha-icon icon=${t.icon}></ha-icon>
              <span>${t.name}</span>
            </button>
          `)}
      </div>
    `}_renderGroupedEntities(t,e,i,a){return 0===e.length?this._renderEmptyState(i,a):B`
      <div class="section">
        <p class="section-label">${t}</p>
        ${e.map(t=>{const e=t.entities.filter(t=>this._isActive(this.hass.states[t.entity_id]?.state||t.state)),i=e.length>0&&this._supportsTurnOff(e[0].domain);return B`
            <div class="domain-section">
              <div class="domain-header">
                <div class="domain-label-wrap">
                  <span class="domain-label">${t.name}</span>
                  <span class="domain-count">${t.entities.length}</span>
                </div>
                ${i?B`
                      <button
                        class="domain-action"
                        @click=${()=>this._turnOffEntities(e)}
                      >
                        All Off
                      </button>
                    `:""}
              </div>
              <div class="glass entity-list">
                ${t.entities.map(t=>{const e=this._isActive(this.hass.states[t.entity_id]?.state||t.state);return B`
                    <div
                      class="entity-row"
                      @click=${()=>this._fireMoreInfo(t.entity_id)}
                    >
                      <div class="entity-left">
                        <div class="entity-icon-wrap ${e?"active":""}">
                          <ha-icon
                            icon=${t.attributes?.icon||this._getDomainIcon(t.domain)}
                          ></ha-icon>
                        </div>
                        <div class="entity-info">
                          <span class="entity-name">
                            ${t.attributes?.friendly_name||t.name||t.entity_id}
                          </span>
                          <span class="entity-state-text">
                            ${this._getEntityDisplayState(t)}
                          </span>
                        </div>
                      </div>
                      ${this._isToggleable(t.domain)?B`
                            <button
                              class="toggle ${e?"on":"off"}"
                              @click=${e=>{e.stopPropagation(),this._toggleEntity(t.entity_id)}}
                            >
                              <div class="knob"></div>
                            </button>
                          `:B`
                            <span class="entity-value">
                              ${this._getEntityDisplayState(t)}
                            </span>
                          `}
                    </div>
                  `})}
              </div>
            </div>
          `})}
      </div>
    `}render(){return this.hass?this._selectedArea&&this._supportsAreaDrilldown()?this._renderRoomDetail():"lighting"===this.mode?this._renderLightingPage():"switches"===this.mode?this._renderSwitchesPage():this._renderOverview():B``}_renderOverview(){const t=this._getAreaMap(),e=Et(t),i=function(t){return At(t,"media_player").filter(t=>["playing","paused","buffering"].includes(t.state))}(t),a=!!this._getWeatherState(),s=!!this._getEnergyEntity();return B`
      <div class="welcome">
        <p class="greeting">${function(){const t=(new Date).getHours();return t<5?"Good Night":t<12?"Good Morning":t<17?"Good Afternoon":t<21?"Good Evening":"Good Night"}()}</p>
        <p class="time">${this._time}</p>
      </div>

      ${a?B`
            <div class="section">
              ${this._renderWeatherCard()}
            </div>
          `:""}

      ${e.length>0?B`
            <div class="quick-actions">
              <button class="pill accent" @click=${this._handleAllLightsOff}>
                <ha-icon icon="mdi:lightbulb-off-outline"></ha-icon>
                Turn Off ${e.length} Light${1!==e.length?"s":""}
              </button>
            </div>
          `:""}

      ${e.length>0?B`
            <div class="section">
              <glace-light-summary .hass=${this.hass} .lights=${e}></glace-light-summary>
            </div>
          `:""}

      ${i.length>0?B`
            <div class="section">
              <p class="section-label">Now playing</p>
              ${i.map(t=>B`
                  <glace-media-card .hass=${this.hass} .entity=${t}></glace-media-card>
                `)}
            </div>
          `:""}

      ${s?B`
            <div class="section">
              <p class="section-label">Energy</p>
              <glace-energy-card .hass=${this.hass}></glace-energy-card>
            </div>
          `:""}

      ${a||s||0!==e.length||0!==i.length?"":this._renderEmptyState("Nothing urgent right now","Home stays intentionally quiet until weather, lights, media, or energy need attention.")}
    `}_renderLightingPage(){const t=this._getAreaMap(),e=this._getDomainEntities("light"),i=Et(t),a=this._getScenes();return B`
      ${this._renderPageHero({kicker:"Controls",title:"Lighting",copy:"One place for your lights, quick off actions, and scene presets.",metrics:[{label:"Lights",value:e.length},{label:"On",value:i.length},{label:"Scenes",value:a.length}]})}

      ${i.length>0?B`
            <div class="quick-actions">
              <button class="pill accent" @click=${this._handleAllLightsOff}>
                <ha-icon icon="mdi:lightbulb-off-outline"></ha-icon>
                Turn Off ${i.length} Light${1!==i.length?"s":""}
              </button>
            </div>
          `:""}

      <div class="section">
        <p class="section-label">Scenes</p>
        ${this._renderSceneGrid(a)}
      </div>

      ${i.length>0?B`
            <div class="section">
              <p class="section-label">Active lights</p>
              <glace-light-summary .hass=${this.hass} .lights=${i}></glace-light-summary>
            </div>
          `:""}

      ${this._renderGroupedEntities("All lights",this._groupEntitiesByArea(e),"No lights available","Glace did not find any light entities after applying your current exclusions.")}
    `}_renderSwitchesPage(){const t=this._getDomainEntities("switch"),e=t.filter(t=>this._isActive(this.hass.states[t.entity_id]?.state||t.state)),i=this._groupEntitiesByArea(t);return B`
      ${this._renderPageHero({kicker:"Controls",title:"Switches",copy:"A focused list of useful switches, grouped by room and stripped of the clutter.",metrics:[{label:"Switches",value:t.length},{label:"On",value:e.length},{label:"Rooms",value:i.length}]})}

      ${e.length>0?B`
            <div class="quick-actions">
              <button
                class="pill accent"
                @click=${()=>this._turnOffEntities(e)}
              >
                <ha-icon icon="mdi:power-plug-off-outline"></ha-icon>
                Turn Off ${e.length} Switch${1!==e.length?"es":""}
              </button>
            </div>
          `:""}

      ${this._renderGroupedEntities("All switches",i,"No switches available","No switch entities were found after applying the current room and entity exclusions.")}
    `}_renderRoomDetail(){const t=this._getAreaMap()[this._selectedArea];if(!t)return B`
        <div class="room-header">
          <button class="back-btn" @click=${this._goBack}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>
          <span class="room-title">Not found</span>
        </div>
      `;const e=this._groupByDomain(t.entities);return B`
      <div class="room-detail">
        <div class="room-header">
          <button class="back-btn" @click=${this._goBack}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>
          <span class="room-title">${t.name}</span>
        </div>

        ${Object.entries(e).map(([t,e])=>B`
          <div class="domain-section">
            <div class="domain-header">
              <div class="domain-label-wrap">
                <span class="domain-label">${t.replace(/_/g," ")}</span>
                <span class="domain-count">${e.length}</span>
              </div>
              ${this._supportsTurnOff(t)?B`
                    <button
                      class="domain-action"
                      @click=${()=>this._turnOffEntities(e)}
                    >
                      All Off
                    </button>
                  `:""}
            </div>
            <div class="glass entity-list">
              ${e.map(e=>{const i=this._isActive(e.state);return B`
                  <div class="entity-row" @click=${()=>this._fireMoreInfo(e.entity_id)}>
                    <div class="entity-left">
                      <div class="entity-icon-wrap ${i?"active":""}">
                        <ha-icon
                          icon=${e.attributes?.icon||this._getDomainIcon(t)}
                        ></ha-icon>
                      </div>
                      <div class="entity-info">
                        <span class="entity-name">
                          ${e.attributes?.friendly_name||e.name||e.entity_id}
                        </span>
                        <span class="entity-state-text">${this._getEntityDisplayState(e)}</span>
                      </div>
                    </div>
                    ${this._isToggleable(t)?B`
                          <button
                            class="toggle ${i?"on":"off"}"
                            @click=${t=>{t.stopPropagation(),this._toggleEntity(e.entity_id)}}
                          >
                            <div class="knob"></div>
                          </button>
                        `:B`
                          <span class="entity-value">${this._getEntityDisplayState(e)}</span>
                        `}
                  </div>
                `})}
            </div>
          </div>
        `)}
      </div>
    `}});customElements.define("glace-room-card",class extends rt{static get properties(){return{hass:{type:Object},room:{type:Object}}}static get styles(){return[$t,n`
        :host {
          display: block;
        }

        .card {
          padding: 18px 20px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .card:hover {
          background: var(--glace-glass-bg-hover);
        }

        /* Room icon — frosted circle */
        .room-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 0.5px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .room-icon ha-icon {
          --mdc-icon-size: 20px;
          color: var(--glace-text-secondary);
        }

        .room-icon.has-active ha-icon {
          color: var(--glace-blue);
        }

        .room-icon.has-active {
          background: rgba(10, 132, 255, 0.12);
          border-color: rgba(10, 132, 255, 0.15);
        }

        /* Room info — name + stats */
        .room-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .room-name {
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .room-status {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .status-item {
          font-size: 13px;
          color: var(--glace-text-secondary);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .status-item.active {
          color: var(--glace-orange);
          font-weight: 500;
        }

        .status-item ha-icon {
          --mdc-icon-size: 13px;
        }

        /* Right side — temp + chevron */
        .room-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .temp {
          font-size: 15px;
          font-weight: 500;
          color: var(--glace-text-secondary);
        }

        .chevron {
          color: var(--glace-text-tertiary);
        }

        .chevron ha-icon {
          --mdc-icon-size: 16px;
        }
      `]}_handleTap(){}render(){if(!this.room)return B``;const t=this.room.icon||"mdi:door",e=this.room.lightsOn>0||this.room.mediaActive>0;return B`
      <div class="glass card" @click=${this._handleTap}>
        <div class="room-icon ${e?"has-active":""}">
          <ha-icon icon=${t}></ha-icon>
        </div>
        <div class="room-info">
          <span class="room-name">${this.room.name}</span>
          <div class="room-status">
            ${this.room.lightsOn>0?B`
              <span class="status-item active">
                <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                ${this.room.lightsOn}
              </span>
            `:""}
            ${this.room.mediaActive>0?B`
              <span class="status-item active">
                <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                Playing
              </span>
            `:""}
            ${e?"":B`
              <span class="status-item">${this.room.entityCount} devices</span>
            `}
          </div>
        </div>
        <div class="room-right">
          ${this.room.temperature?B`<span class="temp">${this.room.temperature}</span>`:""}
          <span class="chevron">
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </span>
        </div>
      </div>
    `}});customElements.define("glace-room-view-card",class extends rt{static get properties(){return{hass:{type:Object},_config:{type:Object}}}static get styles(){return[$t,n`
        :host {
          display: block;
          padding: 20px;
        }

        .room-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .room-header ha-icon {
          --mdc-icon-size: 28px;
        }

        .room-header .name {
          font-size: 24px;
          font-weight: 600;
        }

        .domain-section {
          margin-bottom: 16px;
        }

        .domain-title {
          font-size: 14px;
          font-weight: 600;
          text-transform: capitalize;
          color: var(--glace-on-surface-dim);
          margin-bottom: 8px;
        }

        .entity-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: var(--glace-radius-sm);
          background: rgba(255, 255, 255, 0.04);
          margin-bottom: 6px;
          transition: var(--glace-transition);
        }

        .entity-name {
          font-size: 14px;
          font-weight: 500;
          flex: 1;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .entity-state {
          font-size: 13px;
          color: var(--glace-on-surface-dim);
          margin-right: 12px;
        }
      `]}setConfig(t){this._config=t}_getEntities(){if(!this.hass||!this._config?.area_id)return[];const t=this._config.area_id,e=[];for(const[i,a]of Object.entries(this.hass.states)){const s=this.hass.entities?.[i];if(!s)continue;(s.area_id||s.device_id&&this.hass.devices?.[s.device_id]?.area_id)===t&&e.push({entity_id:i,domain:i.split(".")[0],name:a.attributes?.friendly_name||s.name||i,state:a.state,attributes:a.attributes||{}})}return e}_groupByDomain(t){const e={},i=["light","switch","media_player","climate","fan","cover","sensor","binary_sensor"];for(const i of t)e[i.domain]||(e[i.domain]=[]),e[i.domain].push(i);const a={};for(const t of i)e[t]&&(a[t]=e[t]);for(const[t,i]of Object.entries(e))a[t]||(a[t]=i);return a}_toggleEntity(t){const e=t.split(".")[0];["light","switch","fan","input_boolean"].includes(e)&&this.hass.callService(e,"toggle",{entity_id:t})}_isToggleable(t){return["light","switch","fan","input_boolean","cover"].includes(t)}render(){if(!this.hass||!this._config?.area_id)return B`<p class="dim">No area configured.</p>`;const t=this._getEntities(),e=this._groupByDomain(t),i=this._config.area_name||this._config.area_id,a=this._config.area_icon||"mdi:door";return B`
      <div class="room-header">
        <ha-icon icon=${a}></ha-icon>
        <span class="name">${i}</span>
      </div>

      ${Object.entries(e).map(([t,e])=>B`
          <div class="domain-section">
            <div class="domain-title">${t.replace("_"," ")}</div>
            ${e.map(e=>B`
                <div class="entity-row">
                  <span class="entity-name">${e.name}</span>
                  <span class="entity-state">${e.state}</span>
                  ${this._isToggleable(t)?B`
                        <button
                          class="toggle ${"on"===e.state?"on":"off"}"
                          @click=${()=>this._toggleEntity(e.entity_id)}
                        >
                          <div class="knob"></div>
                        </button>
                      `:""}
                </div>
              `)}
          </div>
        `)}
    `}});customElements.define("glace-light-summary",class extends rt{static get properties(){return{hass:{type:Object},lights:{type:Array}}}static get styles(){return[$t,n`
        :host {
          display: block;
        }

        .container {
          padding: 16px 0 8px 0;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 16px 14px 16px;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.06);
        }

        .header-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 159, 10, 0.14);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-icon ha-icon {
          --mdc-icon-size: 18px;
          color: var(--glace-orange);
        }

        .header-text {
          font-size: 15px;
          font-weight: 600;
        }

        .light-list {
          display: flex;
          flex-direction: column;
        }

        .light-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          gap: 12px;
        }

        .light-row:not(:last-child) {
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.06);
        }

        .light-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
          flex: 1;
        }

        .light-name {
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .light-area {
          font-size: 12px;
          color: var(--glace-text-secondary);
        }

        .light-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .brightness {
          font-size: 14px;
          font-weight: 500;
          color: var(--glace-text-secondary);
          min-width: 32px;
          text-align: right;
        }
      `]}_toggle(t){this.hass.callService("light","toggle",{entity_id:t})}render(){return this.lights&&0!==this.lights.length?B`
      <div class="glass container">
        <div class="header">
          <div class="header-icon">
            <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
          </div>
          <span class="header-text">${this.lights.length} Light${1!==this.lights.length?"s":""} On</span>
        </div>
        <div class="light-list">
          ${this.lights.map(t=>B`
              <div class="light-row">
                <div class="light-info">
                  <span class="light-name">
                    ${t.attributes?.friendly_name||t.name||t.entity_id}
                  </span>
                  <span class="light-area">${t.area_name}</span>
                </div>
                <div class="light-right">
                  ${t.attributes?.brightness?B`<span class="brightness">
                        ${Math.round(t.attributes.brightness/255*100)}%
                      </span>`:""}
                  <button
                    class="toggle ${"on"===t.state?"on":"off"}"
                    @click=${()=>this._toggle(t.entity_id)}
                  >
                    <div class="knob"></div>
                  </button>
                </div>
              </div>
            `)}
        </div>
      </div>
    `:B``}});customElements.define("glace-media-card",class extends rt{static get properties(){return{hass:{type:Object},entity:{type:Object}}}static get styles(){return[$t,n`
        :host {
          display: block;
        }

        .container {
          padding: 16px 18px;
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .artwork {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          flex-shrink: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .artwork img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .artwork ha-icon {
          --mdc-icon-size: 24px;
          color: var(--glace-text-tertiary);
        }

        .info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .title {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .artist {
          font-size: 13px;
          color: var(--glace-text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .source {
          font-size: 11px;
          color: var(--glace-text-tertiary);
          margin-top: 1px;
        }

        .controls {
          display: flex;
          gap: 4px;
          align-items: center;
          flex-shrink: 0;
        }

        .ctrl-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 0.5px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--glace-text-primary);
          padding: 0;
          transition: transform 0.3s var(--glace-spring);
        }

        .ctrl-btn:active {
          transform: scale(0.85);
        }

        .ctrl-btn ha-icon {
          --mdc-icon-size: 18px;
        }

        .play-btn {
          width: 40px;
          height: 40px;
          background: var(--glace-blue);
          border-color: rgba(10, 132, 255, 0.3);
          box-shadow: 0 2px 12px rgba(10, 132, 255, 0.25);
        }

        .play-btn ha-icon {
          --mdc-icon-size: 20px;
          color: #fff;
        }
      `]}_playPause(){this.hass.callService("media_player","media_play_pause",{entity_id:this.entity.entity_id})}_prev(){this.hass.callService("media_player","media_previous_track",{entity_id:this.entity.entity_id})}_next(){this.hass.callService("media_player","media_next_track",{entity_id:this.entity.entity_id})}render(){if(!this.entity||!this.hass)return B``;const t=this.hass.states[this.entity.entity_id];if(!t)return B``;const e=t.attributes||{},i=e.media_title||e.friendly_name||this.entity.entity_id,a=e.media_artist||"",s=e.entity_picture?this.hass.hassUrl(e.entity_picture):null,n=e.source||e.app_name||"",r="playing"===t.state;return B`
      <div class="glass container">
        <div class="artwork">
          ${s?B`<img src=${s} alt="" />`:B`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="info">
          <span class="title">${i}</span>
          ${a?B`<span class="artist">${a}</span>`:""}
          ${n?B`<span class="source">${n}</span>`:""}
        </div>
        <div class="controls">
          <button class="ctrl-btn" @click=${this._prev}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="ctrl-btn play-btn" @click=${this._playPause}>
            <ha-icon icon=${r?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="ctrl-btn" @click=${this._next}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}});customElements.define("glace-energy-card",class extends rt{static get properties(){return{hass:{type:Object}}}static get styles(){return[$t,n`
        :host {
          display: block;
        }

        .container {
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-wrap.high {
          background: rgba(255, 69, 58, 0.14);
        }

        .icon-wrap.high ha-icon {
          color: var(--glace-red);
        }

        .icon-wrap.normal {
          background: rgba(48, 209, 88, 0.12);
        }

        .icon-wrap.normal ha-icon {
          color: var(--glace-green);
        }

        .icon-wrap ha-icon {
          --mdc-icon-size: 20px;
        }

        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .title {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .subtitle {
          font-size: 13px;
          color: var(--glace-text-secondary);
        }

        .price {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          text-align: right;
          flex-shrink: 0;
        }

        .price.high {
          color: var(--glace-red);
        }

        .price.normal {
          color: var(--glace-text-primary);
        }

        .unit {
          font-size: 13px;
          font-weight: 400;
          color: var(--glace-text-secondary);
          margin-left: 2px;
        }
      `]}_findEnergyEntity(){if(!this.hass)return null;const t=["sensor.electricity_price","sensor.energy_price","sensor.nordpool","sensor.tibber_prices","sensor.amber_general_price","sensor.octopus_energy_electricity_current_rate"];for(const e of t)if(this.hass.states[e])return this.hass.states[e];for(const[t,e]of Object.entries(this.hass.states))if(t.startsWith("sensor.")&&(t.includes("price")||t.includes("tariff"))&&(t.includes("energy")||t.includes("electric")))return e;return null}render(){const t=this._findEnergyEntity();if(!t)return B``;const e=parseFloat(t.state);if(isNaN(e))return B``;const i=t.attributes?.unit_of_measurement||"",a=t.attributes?.friendly_name||"Energy Price",s=t.attributes?.glace_high_threshold||null,n=!!s&&e>s;return B`
      <div class="glass container">
        <div class="icon-wrap ${n?"high":"normal"}">
          <ha-icon icon=${n?"mdi:flash-alert":"mdi:flash"}></ha-icon>
        </div>
        <div class="info">
          <span class="title">${a}</span>
          <span class="subtitle">${n?"Price is high":"Current rate"}</span>
        </div>
        <span class="price ${n?"high":"normal"}">
          ${e}<span class="unit">${i}</span>
        </span>
      </div>
    `}});customElements.define("glace-nav-bar",class extends rt{static get properties(){return{hass:{type:Object},active:{type:String},tabs:{type:Array}}}static get styles(){return[$t,n`
        :host {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        nav {
          margin: 0 14px calc(10px + env(safe-area-inset-bottom, 0px));
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 48%, rgba(255, 255, 255, 0.04) 100%);
          backdrop-filter: blur(32px) saturate(1.65);
          -webkit-backdrop-filter: blur(32px) saturate(1.65);
          border: 1px solid rgba(255, 255, 255, 0.10);
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 8px 12px;
          min-height: var(--glace-nav-height, 82px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 20px 60px rgba(2, 5, 12, 0.32);
        }

        .tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px 16px;
          border-radius: 14px;
          cursor: pointer;
          transition: transform 0.3s var(--glace-spring),
            background 0.2s var(--glace-ease);
          background: transparent;
          border: none;
          color: var(--glace-text-tertiary);
          min-width: 84px;
        }

        .tab:active {
          transform: scale(0.88);
        }

        .tab.active {
          color: var(--glace-text-primary);
          background: rgba(255, 255, 255, 0.12);
          border: 0.5px solid rgba(255, 255, 255, 0.10);
          box-shadow:
            inset 0 0.5px 0 0 rgba(255, 255, 255, 0.12),
            0 10px 24px rgba(4, 7, 18, 0.18);
        }

        .tab ha-icon {
          --mdc-icon-size: 24px;
        }

        .tab-label {
          font-size: 10px;
          font-weight: 500;
          margin-top: 3px;
          letter-spacing: 0.02em;
        }
      `]}constructor(){super(),this.active="home",this.tabs=[]}setConfig(t){t.active&&(this.active=t.active),t.tabs&&(this.tabs=t.tabs)}_navigate(t){t&&(window.history.pushState(null,"",`/glace-dashboard/${t}`),window.dispatchEvent(new Event("location-changed")))}render(){const t=this.tabs||[];return t.length<2?B``:B`
      <nav>
        ${t.map(t=>B`
            <button
              class="tab ${this.active===t.id?"active":""}"
              @click=${()=>this._navigate(t.path||t.id)}
            >
              <ha-icon icon=${t.icon}></ha-icon>
              <span class="tab-label">${t.title||t.label||t.id}</span>
            </button>
          `)}
      </nav>
    `}});console.info("%c GLACE %c v0.1.0 ","color: #89ceff; font-weight: bold; background: #101415; padding: 4px 8px; border-radius: 4px 0 0 4px;","color: #e0e3e5; background: #272a2c; padding: 4px 8px; border-radius: 0 4px 4px 0;");
//# sourceMappingURL=glace-dashboard.js.map
