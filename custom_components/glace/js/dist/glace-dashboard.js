/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,g=globalThis,u=g.trustedTypes,f=u?u.emptyScript:"",m=g.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!o(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);a?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const n=a.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const n=this.constructor;if(!1===s&&(a=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??b)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==a||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,m?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=t=>t,A=x.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,O=`<${C}>`,z=document,j=()=>z.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,T="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,D=/>/g,N=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,L=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),G=new WeakMap,V=z.createTreeWalker(z,129);function F(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let a,n=2===e?"<svg>":3===e?"<math>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let o,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===U?"!--"===c[1]?r=M:void 0!==c[1]?r=D:void 0!==c[2]?(I.test(c[2])&&(a=RegExp("</"+c[2],"g")),r=N):void 0!==c[3]&&(r=N):r===N?">"===c[0]?(r=a??U,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,o=c[1],r=void 0===c[3]?N:'"'===c[3]?L:R):r===L||r===R?r=N:r===M||r===D?r=U:(r=N,a=void 0);const h=r===N&&t[e+1].startsWith("/>")?" ":"";n+=r===U?i+O:l>=0?(s.push(o),i.slice(0,l)+E+i.slice(l)+S+h):i+S+(-2===l?e:h)}return[F(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,n=0;const r=t.length-1,o=this.parts,[c,l]=J(t,e);if(this.el=K.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&o.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[n++],i=s.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:X}),s.removeAttribute(t)}else t.startsWith(S)&&(o.push({type:6,index:a}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],j()),V.nextNode(),o.push({type:2,index:++a});s.append(t[e],j())}}}else if(8===s.nodeType)if(s.data===C)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)o.push({type:7,index:a}),t+=S.length-1}a++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===q)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const n=P(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=Y(t,a._$AS(t,e.values),a,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);V.currentNode=s;let a=V.nextNode(),n=0,r=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new Q(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new st(a,this,t)),this._$AV.push(e),o=i[++r]}n!==o?.index&&(a=V.nextNode(),n++)}return V.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),P(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new K(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new Q(this.O(j()),this.O(j()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const a=this.strings;let n=!1;if(void 0===a)t=Y(this,t,e,0),n=!P(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const s=t;let r,o;for(t=a[0],r=0;r<a.length-1;r++)o=Y(this,s[i+r],e,r),o===q&&(o=this._$AH[r]),n||=!P(o)||o!==this._$AH[r],o===W?t=W:t!==W&&(t+=(o??"")+a[r+1]),this._$AH[r]=o}n&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends X{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??W)===q)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(K,Q),(x.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new Q(e.insertBefore(j(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const ot=nt.litElementPolyfillSupport;ot?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.2");customElements.define("glace-layout",class extends rt{static get properties(){return{hass:{type:Object},_cards:{type:Array},_config:{type:Object}}}static get styles(){return n`
      :host {
        display: block;
        min-height: 100vh;
        background: linear-gradient(
          160deg,
          #0a0e12 0%,
          #101820 25%,
          #0c1418 50%,
          #111a20 75%,
          #0a1015 100%
        );
        background-attachment: fixed;
        padding: 0;
        margin: 0;
        position: relative;
      }

      /* Subtle ambient glow spots */
      :host::before {
        content: "";
        position: fixed;
        top: -20%;
        right: -10%;
        width: 60%;
        height: 50%;
        background: radial-gradient(
          ellipse at center,
          rgba(137, 206, 255, 0.06) 0%,
          transparent 70%
        );
        pointer-events: none;
        z-index: 0;
      }

      :host::after {
        content: "";
        position: fixed;
        bottom: -10%;
        left: -15%;
        width: 50%;
        height: 45%;
        background: radial-gradient(
          ellipse at center,
          rgba(78, 222, 163, 0.04) 0%,
          transparent 70%
        );
        pointer-events: none;
        z-index: 0;
      }

      .layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        padding: 0 0 100px 0;
        position: relative;
        z-index: 1;
      }
    `}setConfig(t){this._config=t}set hass(t){this._hass=t,this._cards&&this._cards.forEach(e=>{e.hass=t})}get hass(){return this._hass}async _buildCards(){if(!this._config||!this._config.cards)return;if(this._cards)return;const t=await(window.loadCardHelpers?.());if(t){this._cards=[];for(const e of this._config.cards){const i=await t.createCardElement(e);i.hass=this._hass,this._cards.push(i)}this.requestUpdate()}}updated(){if(this._buildCards(),this._cards){const t=this.shadowRoot?.querySelector(".layout");t&&0===t.children.length&&this._cards.forEach(e=>t.appendChild(e))}}render(){return B`<div class="layout"></div>`}});const ct=n`
  :host {
    --glace-surface: var(--glace-surface, rgba(255, 255, 255, 0.05));
    --glace-surface-hover: var(--glace-surface-hover, rgba(255, 255, 255, 0.10));
    --glace-surface-active: var(--glace-surface-active, rgba(255, 255, 255, 0.14));
    --glace-blur: var(--glace-blur, 20px);
    --glace-saturate: var(--glace-saturate, 180%);
    --glace-border: var(--glace-border, 1px solid rgba(255, 255, 255, 0.10));
    --glace-radius-sm: var(--glace-radius-sm, 12px);
    --glace-radius-md: var(--glace-radius-md, 16px);
    --glace-radius-lg: var(--glace-radius-lg, 24px);
    --glace-shadow: var(--glace-shadow, 0 8px 32px rgba(0, 0, 0, 0.37));
    --glace-transition: var(--glace-transition, all 300ms cubic-bezier(0.4, 0, 0.2, 1));
    --glace-shimmer-duration: var(--glace-shimmer-duration, 8s);
    --glace-primary: var(--glace-primary, #89ceff);
    --glace-secondary: var(--glace-secondary, #4edea3);
    --glace-tertiary: var(--glace-tertiary, #ffb95f);
    --glace-error: var(--glace-error, #ffb4ab);
    --glace-on-surface: var(--glace-on-surface, #e0e3e5);
    --glace-on-surface-dim: var(--glace-on-surface-dim, rgba(224, 227, 229, 0.7));
    --glace-on-surface-faint: var(--glace-on-surface-faint, rgba(224, 227, 229, 0.4));
    --glace-nav-height: var(--glace-nav-height, 80px);

    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI",
      Roboto, Helvetica, Arial, sans-serif;
    color: var(--glace-on-surface);
    -webkit-font-smoothing: antialiased;
  }

  /* ---- Glass card surface ---- */

  .glass {
    background: var(--glace-surface);
    backdrop-filter: blur(var(--glace-blur)) saturate(var(--glace-saturate));
    -webkit-backdrop-filter: blur(var(--glace-blur)) saturate(var(--glace-saturate));
    border: var(--glace-border);
    border-radius: var(--glace-radius-md);
    box-shadow: var(--glace-shadow);
    transition: var(--glace-transition);
    position: relative;
    overflow: hidden;
  }

  .glass:active {
    transform: scale(0.97);
    background: var(--glace-surface-active);
  }

  /* Shimmer overlay */
  .glass::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 200%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.04) 50%,
      transparent
    );
    animation: glace-shimmer var(--glace-shimmer-duration) infinite linear;
    pointer-events: none;
  }

  @keyframes glace-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* ---- Typography ---- */

  .headline-lg {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .headline-md {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.3;
  }

  .body-lg {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
  }

  .body-md {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
  }

  .label-md {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 0.05em;
  }

  .label-sm {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
  }

  /* ---- Utility ---- */

  .dim { color: var(--glace-on-surface-dim); }
  .faint { color: var(--glace-on-surface-faint); }
  .primary { color: var(--glace-primary); }
  .secondary { color: var(--glace-secondary); }
  .tertiary { color: var(--glace-tertiary); }

  .icon-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.10);
    border: 1px solid rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--glace-transition);
    color: var(--glace-on-surface);
    padding: 0;
  }

  .icon-btn:hover {
    background: rgba(255, 255, 255, 0.18);
  }

  .icon-btn:active {
    transform: scale(0.9);
  }

  /* Toggle pill */
  .toggle {
    width: 44px;
    height: 24px;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    transition: var(--glace-transition);
    border: none;
    padding: 0;
  }

  .toggle.on {
    background: var(--glace-secondary);
  }

  .toggle.off {
    background: rgba(255, 255, 255, 0.20);
  }

  .toggle .knob {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: 3px;
    transition: var(--glace-transition);
  }

  .toggle.on .knob {
    left: 23px;
  }

  .toggle.off .knob {
    left: 3px;
    opacity: 0.6;
  }

  /* Section heading */
  .section-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 12px 0;
    padding: 0;
    color: var(--glace-on-surface);
  }

  /* Hide when empty */
  .hidden {
    display: none !important;
  }
`;function lt(t,e){return t.area_id?t.area_id:t.device_id&&e[t.device_id]&&e[t.device_id].area_id||null}function dt(t,e){const i=[];for(const s of Object.values(t))for(const t of s.entities)t.domain===e&&i.push({...t,area_name:s.name});return i}function ht(t){return function(t,e){const i={light:["on"],switch:["on"],fan:["on"],media_player:["playing","paused","on","buffering","idle"],climate:["heat","cool","heat_cool","auto","dry","fan_only"],cover:["open","opening","closing"],vacuum:["cleaning","returning"],binary_sensor:["on"]}[e]||["on"];return dt(t,e).filter(t=>i.includes(t.state))}(t,"light")}function pt(){return(new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}customElements.define("glace-homepage-card",class extends rt{static get properties(){return{hass:{type:Object},_config:{type:Object},_glaceData:{type:Object},_time:{type:String},_selectedArea:{type:String}}}static get styles(){return[ct,n`
        :host {
          display: block;
          padding: 16px 20px;
        }

        /* ---- Welcome header ---- */
        .welcome {
          padding: 16px 0 8px 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .welcome .greeting {
          font-size: 20px;
          font-weight: 400;
          color: var(--glace-on-surface-dim);
          margin: 0 0 4px 0;
        }

        .welcome .time {
          font-size: 48px;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--glace-on-surface);
        }

        .section {
          margin-top: 20px;
        }

        .rooms-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ---- Quick action bar ---- */
        .quick-actions {
          display: flex;
          gap: 10px;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        .quick-action {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: var(--glace-radius-sm);
          background: var(--glace-surface);
          backdrop-filter: blur(var(--glace-blur));
          border: var(--glace-border);
          color: var(--glace-on-surface);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--glace-transition);
          white-space: nowrap;
        }

        .quick-action:active {
          transform: scale(0.95);
          background: var(--glace-surface-active);
        }

        .quick-action ha-icon {
          --mdc-icon-size: 18px;
        }

        /* ---- Room detail view ---- */
        .room-detail {
          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .room-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0 16px 0;
        }

        .back-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--glace-on-surface);
          transition: var(--glace-transition);
          padding: 0;
          flex-shrink: 0;
        }

        .back-btn:active {
          transform: scale(0.9);
        }

        .back-btn ha-icon {
          --mdc-icon-size: 20px;
        }

        .room-title {
          font-size: 24px;
          font-weight: 600;
        }

        .domain-section {
          margin-bottom: 16px;
        }

        .domain-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          padding: 0 4px;
        }

        .domain-title {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--glace-on-surface-dim);
        }

        .domain-action {
          font-size: 12px;
          color: var(--glace-primary);
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px 8px;
          border-radius: 8px;
          transition: var(--glace-transition);
        }

        .domain-action:active {
          opacity: 0.7;
        }

        .entity-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .entity-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: var(--glace-radius-sm);
          background: rgba(255, 255, 255, 0.04);
          transition: var(--glace-transition);
          cursor: pointer;
        }

        .entity-row:active {
          background: rgba(255, 255, 255, 0.08);
        }

        .entity-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .entity-icon {
          --mdc-icon-size: 20px;
          color: var(--glace-on-surface-dim);
          flex-shrink: 0;
        }

        .entity-icon.active {
          color: var(--glace-tertiary);
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .entity-state-text {
          font-size: 12px;
          color: var(--glace-on-surface-dim);
        }

        .entity-value {
          font-size: 14px;
          font-weight: 500;
          color: var(--glace-on-surface-dim);
          white-space: nowrap;
          margin-left: 8px;
        }
      `]}constructor(){super(),this._glaceData=null,this._time=pt(),this._timer=null,this._selectedArea=null,this._onHashChange=this._onHashChange.bind(this)}setConfig(t){this._config=t}connectedCallback(){super.connectedCallback(),this._timer=setInterval(()=>{this._time=pt()},3e4),window.addEventListener("location-changed",this._onHashChange),window.addEventListener("popstate",this._onHashChange),this._onHashChange()}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer),window.removeEventListener("location-changed",this._onHashChange),window.removeEventListener("popstate",this._onHashChange)}_onHashChange(){const t=window.location.hash.substring(1);this._selectedArea=t||null}async _fetchData(){var t;if(this.hass)try{this._glaceData=await(t=this.hass,t.callWS({type:"glace/configuration/get"}))}catch(t){console.error("Glace: failed to fetch configuration",t)}}willUpdate(t){t.has("hass")&&this.hass&&!this._glaceData&&this._fetchData()}_getAreaMap(){return this._glaceData&&this.hass?function(t,e,i,s,a={}){const n={};for(const[e,i]of Object.entries(t))n[e]={...i,id:e,entities:[]};const r=new Set(a.excluded_entities||[]),o=new Set(a.excluded_areas||[]);for(const[t,a]of Object.entries(e)){if(a.disabled||a.hidden)continue;if(r.has(t))continue;const e=lt(a,i);if(!e||o.has(e))continue;if(!n[e])continue;const c=s[t];n[e].entities.push({entity_id:t,...a,state:c?c.state:"unavailable",attributes:c?c.attributes:{}})}const c=a.area_order||[];if(c.length){const t={};for(const e of c)n[e]&&(t[e]=n[e]);for(const[e,i]of Object.entries(n))t[e]||(t[e]=i);return t}return n}(this._glaceData.areas,this._glaceData.entities,this._glaceData.devices,this.hass.states,this._glaceData.user_config):{}}_selectArea(t){window.location.hash=t,this._selectedArea=t,window.scrollTo(0,0)}_goBack(){window.location.hash="",this._selectedArea=null}_handleAllLightsOff(){const t=ht(this._getAreaMap());for(const e of t)this.hass.callService("light","turn_off",{entity_id:e.entity_id})}_toggleEntity(t){const e=t.split(".")[0];["light","switch","fan","input_boolean","cover"].includes(e)?this.hass.callService(e,"toggle",{entity_id:t}):"media_player"===e?this.hass.callService("media_player","media_play_pause",{entity_id:t}):this._fireMoreInfo(t)}_turnOffDomain(t,e){this.hass.callService(e,"turn_off",{},{area_id:[t]})}_turnOnDomain(t,e){this.hass.callService(e,"turn_on",{},{area_id:[t]})}_fireMoreInfo(t){const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}});this.dispatchEvent(e)}_getAreaEntities(t){const e=this._getAreaMap()[t];return e?e.entities:[]}_groupByDomain(t){const e=["light","switch","media_player","climate","fan","cover","sensor","binary_sensor","camera"],i={};for(const e of t)i[e.domain]||(i[e.domain]=[]),i[e.domain].push(e);const s={};for(const t of e)i[t]&&(s[t]=i[t]);for(const[t,e]of Object.entries(i))s[t]||(s[t]=e);return s}_isToggleable(t){return["light","switch","fan","input_boolean","cover"].includes(t)}_isActive(t){return["on","playing","paused","heat","cool","heat_cool","auto","open","cleaning"].includes(t)}_getDomainIcon(t){return{light:"mdi:lightbulb-group",switch:"mdi:toggle-switch",media_player:"mdi:cast",climate:"mdi:thermostat",fan:"mdi:fan",cover:"mdi:blinds",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-marked-circle",camera:"mdi:cctv",vacuum:"mdi:robot-vacuum"}[t]||"mdi:puzzle"}_getEntityDisplayState(t){const e=this.hass.states[t.entity_id];return e?"light"===t.domain&&e.attributes?.brightness?`${Math.round(e.attributes.brightness/255*100)}%`:"climate"===t.domain&&e.attributes?.current_temperature?`${e.attributes.current_temperature}° → ${e.attributes.temperature||"?"}°`:"sensor"===t.domain?`${e.state}${e.attributes?.unit_of_measurement?" "+e.attributes.unit_of_measurement:""}`:"media_player"===t.domain&&e.attributes?.media_title?e.attributes.media_title:e.state:"unavailable"}render(){return this.hass?this._selectedArea?this._renderRoomDetail():this._renderOverview():B``}_renderOverview(){const t=this._getAreaMap(),e=ht(t),i=function(t){return dt(t,"media_player").filter(t=>["playing","paused","buffering"].includes(t.state))}(t),s=Object.keys(t).map(e=>function(t,e){const i=e[t];if(!i)return null;const s=i.entities.filter(t=>"light"===t.domain),a=s.filter(t=>"on"===t.state),n=i.entities.filter(t=>"media_player"===t.domain),r=n.filter(t=>["playing","paused"].includes(t.state));i.entities.filter(t=>"climate"===t.domain);const o=i.entities.filter(t=>"sensor"===t.domain&&t.attributes&&"temperature"===t.attributes.device_class),c=o.length>0&&"unavailable"!==o[0].state?`${o[0].state}${o[0].attributes.unit_of_measurement||"°"}`:null;return{id:t,name:i.name,icon:i.icon,lightsTotal:s.length,lightsOn:a.length,mediaActive:r.length,temperature:c,entityCount:i.entities.length}}(e,t)).filter(Boolean);return B`
      <div class="welcome">
        <div>
          <p class="greeting">${function(){const t=(new Date).getHours();return t<5?"Good Night":t<12?"Good Morning":t<17?"Good Afternoon":t<21?"Good Evening":"Good Night"}()}</p>
          <p class="time">${this._time}</p>
        </div>
      </div>

      ${e.length>0?B`
        <div class="quick-actions">
          <button class="quick-action" @click=${this._handleAllLightsOff}>
            <ha-icon icon="mdi:lightbulb-off-outline"></ha-icon>
            All Lights Off (${e.length})
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
          ${i.map(t=>B`
            <glace-media-card .hass=${this.hass} .entity=${t}></glace-media-card>
          `)}
        </div>
      `:""}

      <div class="section">
        <glace-energy-card .hass=${this.hass}></glace-energy-card>
      </div>

      ${s.length>0?B`
        <div class="section">
          <h3 class="section-title">Rooms</h3>
          <div class="rooms-grid">
            ${s.map(t=>B`
              <glace-room-card
                .hass=${this.hass}
                .room=${t}
                @click=${()=>this._selectArea(t.id)}
              ></glace-room-card>
            `)}
          </div>
        </div>
      `:""}
    `}_renderRoomDetail(){const t=this._getAreaMap()[this._selectedArea];if(!t)return B`
        <div class="room-header">
          <button class="back-btn" @click=${this._goBack}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <span class="room-title">Room not found</span>
        </div>
      `;const e=t.entities,i=this._groupByDomain(e),s=t.name;return t.icon,B`
      <div class="room-detail">
        <div class="room-header">
          <button class="back-btn" @click=${this._goBack}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <span class="room-title">${s}</span>
        </div>

        ${Object.entries(i).map(([t,e])=>B`
          <div class="domain-section">
            <div class="domain-header">
              <span class="domain-title">${t.replace(/_/g," ")}</span>
              ${this._isToggleable(t)?B`
                <button class="domain-action" @click=${()=>this._turnOffDomain(this._selectedArea,t)}>
                  All Off
                </button>
              `:""}
            </div>
            <div class="glass entity-list">
              ${e.map(e=>{const i=this._isActive(e.state);return B`
                  <div class="entity-row" @click=${()=>this._toggleEntity(e.entity_id)}>
                    <div class="entity-left">
                      <ha-icon
                        class="entity-icon ${i?"active":""}"
                        icon=${e.attributes?.icon||this._getDomainIcon(t)}
                      ></ha-icon>
                      <div class="entity-info">
                        <span class="entity-name">
                          ${e.attributes?.friendly_name||e.name||e.entity_id}
                        </span>
                        <span class="entity-state-text">${e.state}</span>
                      </div>
                    </div>
                    <span class="entity-value">${this._getEntityDisplayState(e)}</span>
                    ${this._isToggleable(t)?B`
                      <button
                        class="toggle ${i?"on":"off"}"
                        @click=${t=>{t.stopPropagation(),this._toggleEntity(e.entity_id)}}
                      >
                        <div class="knob"></div>
                      </button>
                    `:""}
                  </div>
                `})}
            </div>
          </div>
        `)}
      </div>
    `}});customElements.define("glace-room-card",class extends rt{static get properties(){return{hass:{type:Object},room:{type:Object}}}static get styles(){return[ct,n`
        :host {
          display: block;
        }

        .card {
          padding: 20px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .card:hover {
          background: var(--glace-surface-hover);
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .top-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(137, 206, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-circle ha-icon {
          --mdc-icon-size: 18px;
          color: var(--glace-primary);
        }

        .room-name {
          font-size: 16px;
          font-weight: 600;
        }

        .temp {
          font-size: 14px;
          font-weight: 500;
          color: var(--glace-on-surface-dim);
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 12px;
        }

        .stats {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .stat {
          font-size: 12px;
          color: var(--glace-on-surface-faint);
        }

        .stat.active {
          color: var(--glace-tertiary);
          font-weight: 500;
        }

        .chevron {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--glace-on-surface-dim);
        }

        .chevron ha-icon {
          --mdc-icon-size: 18px;
        }
      `]}_handleTap(){}render(){if(!this.room)return B``;const t=this.room.icon||"mdi:door",e=this.room.lightsOn>0?`${this.room.lightsOn} Light${1!==this.room.lightsOn?"s":""} On`:this.room.lightsTotal>0?"All Lights Off":null,i=this.room.mediaActive>0?"Media Playing":null;return B`
      <div class="glass card" @click=${this._handleTap}>
        <div class="top">
          <div class="top-left">
            <div class="icon-circle">
              <ha-icon icon=${t}></ha-icon>
            </div>
            <span class="room-name">${this.room.name}</span>
          </div>
          ${this.room.temperature?B`<span class="temp">${this.room.temperature}</span>`:""}
        </div>
        <div class="bottom">
          <div class="stats">
            ${e?B`<span class="stat ${this.room.lightsOn>0?"active":""}">${e}</span>`:""}
            ${i?B`<span class="stat active">${i}</span>`:""}
            ${e||i?"":B`<span class="stat">${this.room.entityCount} entities</span>`}
          </div>
          <div class="chevron">
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </div>
        </div>
      </div>
    `}});customElements.define("glace-room-view-card",class extends rt{static get properties(){return{hass:{type:Object},_config:{type:Object}}}static get styles(){return[ct,n`
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
      `]}setConfig(t){this._config=t}_getEntities(){if(!this.hass||!this._config?.area_id)return[];const t=this._config.area_id,e=[];for(const[i,s]of Object.entries(this.hass.states)){const a=this.hass.entities?.[i];if(!a)continue;(a.area_id||a.device_id&&this.hass.devices?.[a.device_id]?.area_id)===t&&e.push({entity_id:i,domain:i.split(".")[0],name:s.attributes?.friendly_name||a.name||i,state:s.state,attributes:s.attributes||{}})}return e}_groupByDomain(t){const e={},i=["light","switch","media_player","climate","fan","cover","sensor","binary_sensor"];for(const i of t)e[i.domain]||(e[i.domain]=[]),e[i.domain].push(i);const s={};for(const t of i)e[t]&&(s[t]=e[t]);for(const[t,i]of Object.entries(e))s[t]||(s[t]=i);return s}_toggleEntity(t){const e=t.split(".")[0];["light","switch","fan","input_boolean"].includes(e)&&this.hass.callService(e,"toggle",{entity_id:t})}_isToggleable(t){return["light","switch","fan","input_boolean","cover"].includes(t)}render(){if(!this.hass||!this._config?.area_id)return B`<p class="dim">No area configured.</p>`;const t=this._getEntities(),e=this._groupByDomain(t),i=this._config.area_name||this._config.area_id,s=this._config.area_icon||"mdi:door";return B`
      <div class="room-header">
        <ha-icon icon=${s}></ha-icon>
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
    `}});customElements.define("glace-light-summary",class extends rt{static get properties(){return{hass:{type:Object},lights:{type:Array}}}static get styles(){return[ct,n`
        :host {
          display: block;
        }

        .container {
          padding: 16px;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-left ha-icon {
          color: var(--glace-tertiary);
          --mdc-icon-size: 22px;
        }

        .count {
          font-size: 14px;
          font-weight: 600;
          color: var(--glace-on-surface);
        }

        .light-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .light-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: var(--glace-radius-sm);
          background: rgba(255, 255, 255, 0.04);
          transition: var(--glace-transition);
        }

        .light-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          flex: 1;
        }

        .light-name {
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .light-area {
          font-size: 12px;
          color: var(--glace-on-surface-dim);
        }

        .brightness {
          font-size: 12px;
          color: var(--glace-on-surface-dim);
          margin-right: 12px;
        }
      `]}_toggle(t){this.hass.callService("light","toggle",{entity_id:t})}render(){return this.lights&&0!==this.lights.length?B`
      <div class="glass container">
        <div class="header">
          <div class="header-left">
            <ha-icon icon="mdi:lightbulb-group"></ha-icon>
            <span class="count">${this.lights.length} Light${1!==this.lights.length?"s":""} On</span>
          </div>
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
            `)}
        </div>
      </div>
    `:B``}});customElements.define("glace-media-card",class extends rt{static get properties(){return{hass:{type:Object},entity:{type:Object}}}static get styles(){return[ct,n`
        :host {
          display: block;
        }

        .container {
          padding: 16px;
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .artwork {
          width: 64px;
          height: 64px;
          border-radius: var(--glace-radius-sm);
          background: rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
          object-fit: cover;
          overflow: hidden;
        }

        .artwork img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .artist {
          font-size: 13px;
          color: var(--glace-on-surface-dim);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .source {
          font-size: 11px;
          color: var(--glace-on-surface-faint);
          margin-top: 2px;
        }

        .controls {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .controls .icon-btn {
          width: 36px;
          height: 36px;
        }

        .controls .play-btn {
          width: 42px;
          height: 42px;
          background: var(--glace-primary);
          color: #101415;
        }

        .controls .play-btn:hover {
          background: var(--glace-primary);
          opacity: 0.85;
        }

        .controls ha-icon {
          --mdc-icon-size: 20px;
        }
      `]}_playPause(){this.hass.callService("media_player","media_play_pause",{entity_id:this.entity.entity_id})}_prev(){this.hass.callService("media_player","media_previous_track",{entity_id:this.entity.entity_id})}_next(){this.hass.callService("media_player","media_next_track",{entity_id:this.entity.entity_id})}render(){if(!this.entity||!this.hass)return B``;const t=this.hass.states[this.entity.entity_id];if(!t)return B``;const e=t.attributes||{},i=e.media_title||e.friendly_name||this.entity.entity_id,s=e.media_artist||"",a=e.entity_picture?this.hass.hassUrl(e.entity_picture):null,n=e.source||e.app_name||"",r="playing"===t.state;return B`
      <div class="glass container">
        <div class="artwork">
          ${a?B`<img src=${a} alt="" />`:B`<ha-icon icon="mdi:music" style="padding:18px; opacity:0.4;"></ha-icon>`}
        </div>
        <div class="info">
          <span class="title">${i}</span>
          ${s?B`<span class="artist">${s}</span>`:""}
          ${n?B`<span class="source">${n}</span>`:""}
        </div>
        <div class="controls">
          <button class="icon-btn" @click=${this._prev}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn play-btn" @click=${this._playPause}>
            <ha-icon icon=${r?"mdi:pause":"mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${this._next}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}});customElements.define("glace-energy-card",class extends rt{static get properties(){return{hass:{type:Object}}}static get styles(){return[ct,n`
        :host {
          display: block;
        }

        .container {
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-wrap.high {
          background: rgba(255, 180, 171, 0.18);
          color: var(--glace-error);
        }

        .icon-wrap.normal {
          background: rgba(78, 222, 163, 0.14);
          color: var(--glace-secondary);
        }

        .icon-wrap ha-icon {
          --mdc-icon-size: 22px;
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
        }

        .subtitle {
          font-size: 13px;
          color: var(--glace-on-surface-dim);
        }

        .price {
          font-size: 18px;
          font-weight: 700;
          text-align: right;
        }
      `]}_findEnergyEntity(){if(!this.hass)return null;const t=["sensor.electricity_price","sensor.energy_price","sensor.nordpool","sensor.tibber_prices","sensor.amber_general_price","sensor.octopus_energy_electricity_current_rate"];for(const e of t)if(this.hass.states[e])return this.hass.states[e];for(const[t,e]of Object.entries(this.hass.states))if(t.startsWith("sensor.")&&(t.includes("price")||t.includes("tariff"))&&(t.includes("energy")||t.includes("electric")))return e;return null}render(){const t=this._findEnergyEntity();if(!t)return B``;const e=parseFloat(t.state);if(isNaN(e))return B``;const i=t.attributes?.unit_of_measurement||"",s=t.attributes?.friendly_name||"Energy Price",a=t.attributes?.glace_high_threshold||null,n=!!a&&e>a;return B`
      <div class="glass container">
        <div class="icon-wrap ${n?"high":"normal"}">
          <ha-icon icon=${n?"mdi:flash-alert":"mdi:flash"}></ha-icon>
        </div>
        <div class="info">
          <span class="title">${s}</span>
          <span class="subtitle">${n?"Price is high":"Current rate"}</span>
        </div>
        <span class="price ${n?"tertiary":""}">${e} ${i}</span>
      </div>
    `}});customElements.define("glace-nav-bar",class extends rt{static get properties(){return{hass:{type:Object},active:{type:String}}}static get styles(){return[ct,n`
        :host {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        nav {
          background: rgba(0, 0, 0, 0.30);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.3);
          border-radius: 16px 16px 0 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 20px;
          height: var(--glace-nav-height, 80px);
        }

        .tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          transition: var(--glace-transition);
          background: transparent;
          border: none;
          color: var(--glace-on-surface-dim);
        }

        .tab:active {
          transform: scale(0.9);
        }

        .tab.active {
          color: var(--glace-on-surface);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .tab ha-icon {
          --mdc-icon-size: 24px;
        }
      `]}constructor(){super(),this.active="home"}setConfig(t){t.active&&(this.active=t.active)}_navigate(t){window.history.pushState(null,"",`/glace-dashboard/${t}`),window.dispatchEvent(new Event("location-changed"))}render(){return B`
      <nav>
        ${[{id:"home",icon:"mdi:home",path:"home"},{id:"rooms",icon:"mdi:door",path:"rooms"},{id:"settings",icon:"mdi:cog",path:"settings"}].map(t=>B`
            <button
              class="tab ${this.active===t.id?"active":""}"
              @click=${()=>this._navigate(t.path)}
            >
              <ha-icon icon=${t.icon}></ha-icon>
            </button>
          `)}
      </nav>
    `}});console.info("%c GLACE %c v0.1.0 ","color: #89ceff; font-weight: bold; background: #101415; padding: 4px 8px; border-radius: 4px 0 0 4px;","color: #e0e3e5; background: #272a2c; padding: 4px 8px; border-radius: 0 4px 4px 0;");
//# sourceMappingURL=glace-dashboard.js.map
