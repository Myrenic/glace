/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,g=globalThis,u=g.trustedTypes,f=u?u.emptyScript:"",m=g.reactiveElementPolyfillSupport,b=(t,e)=>t,x={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!o(t,e),y={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);a?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:x;this._$Em=s;const n=a.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const n=this.constructor;if(!1===s&&(a=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??_)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==a||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[b("elementProperties")]=new Map,v[b("finalized")]=new Map,m?.({ReactiveElement:v}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,w=t=>t,A=$.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,O=`<${C}>`,z=document,P=()=>z.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,H="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,D=/>/g,R=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,V=z.createTreeWalker(z,129);function F(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let a,n=2===e?"<svg>":3===e?"<math>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let o,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===U?"!--"===c[1]?r=M:void 0!==c[1]?r=D:void 0!==c[2]?(B.test(c[2])&&(a=RegExp("</"+c[2],"g")),r=R):void 0!==c[3]&&(r=R):r===R?">"===c[0]?(r=a??U,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,o=c[1],r=void 0===c[3]?R:'"'===c[3]?L:N):r===L||r===N?r=R:r===M||r===D?r=U:(r=R,a=void 0);const d=r===R&&t[e+1].startsWith("/>")?" ":"";n+=r===U?i+O:l>=0?(s.push(o),i.slice(0,l)+E+i.slice(l)+S+d):i+S+(-2===l?e:d)}return[F(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,n=0;const r=t.length-1,o=this.parts,[c,l]=Y(t,e);if(this.el=J.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&o.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[n++],i=s.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:X}),s.removeAttribute(t)}else t.startsWith(S)&&(o.push({type:6,index:a}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),V.nextNode(),o.push({type:2,index:++a});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===C)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)o.push({type:7,index:a}),t+=S.length-1}a++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===W)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const n=j(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=K(t,a._$AS(t,e.values),a,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);V.currentNode=s;let a=V.nextNode(),n=0,r=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new Q(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new st(a,this,t)),this._$AV.push(e),o=i[++r]}n!==o?.index&&(a=V.nextNode(),n++)}return V.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),j(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new J(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const a=this.strings;let n=!1;if(void 0===a)t=K(this,t,e,0),n=!j(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const s=t;let r,o;for(t=a[0],r=0;r<a.length-1;r++)o=K(this,s[i+r],e,r),o===W&&(o=this._$AH[r]),n||=!j(o)||o!==this._$AH[r],o===q?t=q:t!==q&&(t+=(o??"")+a[r+1]),this._$AH[r]=o}n&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends X{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??q)===W)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const at=$.litHtmlPolyfillSupport;at?.(J,Q),($.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new Q(e.insertBefore(P(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const ot=nt.litElementPolyfillSupport;ot?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.2");customElements.define("glace-layout",class extends rt{static get properties(){return{hass:{type:Object},_cards:{type:Array},_config:{type:Object}}}static get styles(){return n`
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
      }

      .layout-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        min-height: 100dvh;
        padding: 0 0 var(--glace-nav-height, 82px) 0;
        position: relative;
        z-index: 1;
      }
    `}setConfig(t){this._config=t}set hass(t){this._hass=t,this._cards&&this._cards.forEach(e=>{e.hass=t})}get hass(){return this._hass}async _buildCards(){if(!this._config||!this._config.cards)return;if(this._cards)return;const t=await(window.loadCardHelpers?.());if(t){this._cards=[];for(const e of this._config.cards){const i=await t.createCardElement(e);i.hass=this._hass,this._cards.push(i)}this.requestUpdate()}}updated(){if(this._buildCards(),this._cards){const t=this.shadowRoot?.querySelector(".layout-wrapper");t&&0===t.children.length&&this._cards.forEach(e=>t.appendChild(e))}}render(){return I`<div class="layout-wrapper"></div>`}});const ct=n`
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
    --glace-glass-bg: rgba(255, 255, 255, 0.07);
    --glace-glass-bg-hover: rgba(255, 255, 255, 0.11);
    --glace-glass-bg-active: rgba(255, 255, 255, 0.15);
    --glace-glass-blur: 40px;
    --glace-glass-saturate: 1.8;
    --glace-glass-brightness: 1.12;
    --glace-glass-radius: 20px;
    --glace-glass-radius-sm: 14px;
    --glace-glass-radius-xs: 10px;

    /* ── Text ── */
    --glace-text-primary: rgba(255, 255, 255, 0.92);
    --glace-text-secondary: rgba(255, 255, 255, 0.55);
    --glace-text-tertiary: rgba(255, 255, 255, 0.30);

    /* ── Elevation ── */
    --glace-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
    --glace-shadow-md: 0 4px 16px rgba(0, 0, 0, 0.10), 0 1px 4px rgba(0, 0, 0, 0.06);
    --glace-shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.14), 0 2px 10px rgba(0, 0, 0, 0.08);

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
    background: var(--glace-glass-bg);
    backdrop-filter: blur(var(--glace-glass-blur))
      saturate(var(--glace-glass-saturate))
      brightness(var(--glace-glass-brightness));
    -webkit-backdrop-filter: blur(var(--glace-glass-blur))
      saturate(var(--glace-glass-saturate))
      brightness(var(--glace-glass-brightness));
    border: 0.5px solid rgba(255, 255, 255, 0.18);
    border-radius: var(--glace-glass-radius);
    box-shadow:
      inset 0 0.5px 0 0 rgba(255, 255, 255, 0.20),
      inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.05),
      var(--glace-shadow-md);
    position: relative;
    overflow: hidden;
    transition: transform 0.35s var(--glace-spring),
      background 0.2s var(--glace-ease),
      box-shadow 0.3s var(--glace-ease);
  }

  /* Top specular highlight — key liquid glass effect */
  .glass::before {
    content: "";
    position: absolute;
    top: 0;
    left: 8%;
    right: 8%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.35) 20%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.35) 80%,
      transparent
    );
    pointer-events: none;
    z-index: 2;
    border-radius: 1px;
  }

  .glass:active {
    transform: scale(0.975);
    background: var(--glace-glass-bg-active);
  }

  /* Subtle variant — less prominent glass */
  .glass-subtle {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(24px) saturate(1.4);
    -webkit-backdrop-filter: blur(24px) saturate(1.4);
    border: 0.5px solid rgba(255, 255, 255, 0.10);
    border-radius: var(--glace-glass-radius-sm);
    box-shadow: inset 0 0.5px 0 0 rgba(255, 255, 255, 0.12),
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
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    border: 0.5px solid rgba(255, 255, 255, 0.14);
    box-shadow: inset 0 0.5px 0 0 rgba(255, 255, 255, 0.12);
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
    background: rgba(255, 255, 255, 0.14);
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
`;function lt(t,e){return t.area_id?t.area_id:t.device_id&&e[t.device_id]&&e[t.device_id].area_id||null}function ht(t,e){const i=[];for(const s of Object.values(t))for(const t of s.entities)t.domain===e&&i.push({...t,area_name:s.name});return i}function dt(t){return function(t,e){const i={light:["on"],switch:["on"],fan:["on"],media_player:["playing","paused","on","buffering","idle"],climate:["heat","cool","heat_cool","auto","dry","fan_only"],cover:["open","opening","closing"],vacuum:["cleaning","returning"],binary_sensor:["on"]}[e]||["on"];return ht(t,e).filter(t=>i.includes(t.state))}(t,"light")}function pt(){return(new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}customElements.define("glace-homepage-card",class extends rt{static get properties(){return{hass:{type:Object},_config:{type:Object},_glaceData:{type:Object},_time:{type:String},_selectedArea:{type:String}}}static get styles(){return[ct,n`
        :host {
          display: block;
          padding: 0 20px;
        }

        /* ── Welcome Header ── */
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

        /* ── Section Spacing ── */
        .section {
          margin-top: 24px;
          animation: glace-fade-in 0.5s var(--glace-ease) both;
        }

        .section:nth-child(2) { animation-delay: 0.05s; }
        .section:nth-child(3) { animation-delay: 0.1s; }
        .section:nth-child(4) { animation-delay: 0.15s; }
        .section:nth-child(5) { animation-delay: 0.2s; }

        /* ── Quick Actions ── */
        .quick-actions {
          display: flex;
          gap: 8px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        /* ── Rooms Grid ── */
        .rooms-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* ── Room Detail View ── */
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

        /* ── Domain Sections ── */
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
        }

        .domain-label {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--glace-text-secondary);
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
        }

        .domain-action:active {
          opacity: 0.5;
        }

        /* ── Entity List (glass container) ── */
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
      `]}constructor(){super(),this._glaceData=null,this._time=pt(),this._timer=null,this._selectedArea=null,this._onHashChange=this._onHashChange.bind(this)}setConfig(t){this._config=t}connectedCallback(){super.connectedCallback(),this._timer=setInterval(()=>{this._time=pt()},3e4),window.addEventListener("location-changed",this._onHashChange),window.addEventListener("popstate",this._onHashChange),this._onHashChange()}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer),window.removeEventListener("location-changed",this._onHashChange),window.removeEventListener("popstate",this._onHashChange)}_onHashChange(){const t=window.location.hash.substring(1);this._selectedArea=t||null}async _fetchData(){var t;if(this.hass)try{this._glaceData=await(t=this.hass,t.callWS({type:"glace/configuration/get"}))}catch(t){console.error("Glace: failed to fetch configuration",t)}}willUpdate(t){t.has("hass")&&this.hass&&!this._glaceData&&this._fetchData()}_getAreaMap(){return this._glaceData&&this.hass?function(t,e,i,s,a={}){const n={};for(const[e,i]of Object.entries(t))n[e]={...i,id:e,entities:[]};const r=new Set(a.excluded_entities||[]),o=new Set(a.excluded_areas||[]);for(const[t,a]of Object.entries(e)){if(a.disabled||a.hidden)continue;if(r.has(t))continue;const e=lt(a,i);if(!e||o.has(e))continue;if(!n[e])continue;const c=s[t];n[e].entities.push({entity_id:t,...a,state:c?c.state:"unavailable",attributes:c?c.attributes:{}})}const c=a.area_order||[];if(c.length){const t={};for(const e of c)n[e]&&(t[e]=n[e]);for(const[e,i]of Object.entries(n))t[e]||(t[e]=i);return t}return n}(this._glaceData.areas,this._glaceData.entities,this._glaceData.devices,this.hass.states,this._glaceData.user_config):{}}_selectArea(t){window.location.hash=t,this._selectedArea=t,window.scrollTo({top:0,behavior:"smooth"})}_goBack(){window.location.hash="",this._selectedArea=null}_handleAllLightsOff(){const t=dt(this._getAreaMap());for(const e of t)this.hass.callService("light","turn_off",{entity_id:e.entity_id})}_toggleEntity(t){const e=t.split(".")[0];["light","switch","fan","input_boolean","cover"].includes(e)?this.hass.callService(e,"toggle",{entity_id:t}):"media_player"===e?this.hass.callService("media_player","media_play_pause",{entity_id:t}):this._fireMoreInfo(t)}_turnOffDomain(t,e){this.hass.callService(e,"turn_off",{},{area_id:[t]})}_fireMoreInfo(t){const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}});this.dispatchEvent(e)}_getAreaEntities(t){const e=this._getAreaMap()[t];return e?e.entities:[]}_groupByDomain(t){const e=["light","switch","media_player","climate","fan","cover","sensor","binary_sensor","camera"],i={};for(const e of t)i[e.domain]||(i[e.domain]=[]),i[e.domain].push(e);const s={};for(const t of e)i[t]&&(s[t]=i[t]);for(const[t,e]of Object.entries(i))s[t]||(s[t]=e);return s}_isToggleable(t){return["light","switch","fan","input_boolean","cover"].includes(t)}_isActive(t){return["on","playing","paused","heat","cool","heat_cool","auto","open","cleaning"].includes(t)}_getDomainIcon(t){return{light:"mdi:lightbulb-group",switch:"mdi:toggle-switch",media_player:"mdi:cast",climate:"mdi:thermostat",fan:"mdi:fan",cover:"mdi:blinds",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-marked-circle",camera:"mdi:cctv",vacuum:"mdi:robot-vacuum"}[t]||"mdi:puzzle"}_getEntityDisplayState(t){const e=this.hass.states[t.entity_id];return e?"light"===t.domain&&e.attributes?.brightness?`${Math.round(e.attributes.brightness/255*100)}%`:"climate"===t.domain&&e.attributes?.current_temperature?`${e.attributes.current_temperature}° → ${e.attributes.temperature||"?"}°`:"sensor"===t.domain?`${e.state}${e.attributes?.unit_of_measurement?" "+e.attributes.unit_of_measurement:""}`:"media_player"===t.domain&&e.attributes?.media_title?e.attributes.media_title:e.state:"unavailable"}render(){return this.hass?this._selectedArea?this._renderRoomDetail():this._renderOverview():I``}_renderOverview(){const t=this._getAreaMap(),e=dt(t),i=function(t){return ht(t,"media_player").filter(t=>["playing","paused","buffering"].includes(t.state))}(t),s=Object.keys(t).map(e=>function(t,e){const i=e[t];if(!i)return null;const s=i.entities.filter(t=>"light"===t.domain),a=s.filter(t=>"on"===t.state),n=i.entities.filter(t=>"media_player"===t.domain),r=n.filter(t=>["playing","paused"].includes(t.state));i.entities.filter(t=>"climate"===t.domain);const o=i.entities.filter(t=>"sensor"===t.domain&&t.attributes&&"temperature"===t.attributes.device_class),c=o.length>0&&"unavailable"!==o[0].state?`${o[0].state}${o[0].attributes.unit_of_measurement||"°"}`:null;return{id:t,name:i.name,icon:i.icon,lightsTotal:s.length,lightsOn:a.length,mediaActive:r.length,temperature:c,entityCount:i.entities.length}}(e,t)).filter(Boolean);return I`
      <div class="welcome">
        <p class="greeting">${function(){const t=(new Date).getHours();return t<5?"Good Night":t<12?"Good Morning":t<17?"Good Afternoon":t<21?"Good Evening":"Good Night"}()}</p>
        <p class="time">${this._time}</p>
      </div>

      ${e.length>0?I`
        <div class="quick-actions">
          <button class="pill accent" @click=${this._handleAllLightsOff}>
            <ha-icon icon="mdi:lightbulb-off-outline"></ha-icon>
            Turn Off ${e.length} Light${1!==e.length?"s":""}
          </button>
        </div>
      `:""}

      ${e.length>0?I`
        <div class="section">
          <glace-light-summary .hass=${this.hass} .lights=${e}></glace-light-summary>
        </div>
      `:""}

      ${i.length>0?I`
        <div class="section">
          ${i.map(t=>I`
            <glace-media-card .hass=${this.hass} .entity=${t}></glace-media-card>
          `)}
        </div>
      `:""}

      <div class="section">
        <glace-energy-card .hass=${this.hass}></glace-energy-card>
      </div>

      ${s.length>0?I`
        <div class="section">
          <p class="section-label">Rooms</p>
          <div class="rooms-grid">
            ${s.map(t=>I`
              <glace-room-card
                .hass=${this.hass}
                .room=${t}
                @click=${()=>this._selectArea(t.id)}
              ></glace-room-card>
            `)}
          </div>
        </div>
      `:""}
    `}_renderRoomDetail(){const t=this._getAreaMap()[this._selectedArea];if(!t)return I`
        <div class="room-header">
          <button class="back-btn" @click=${this._goBack}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>
          <span class="room-title">Not found</span>
        </div>
      `;const e=t.entities,i=this._groupByDomain(e);return I`
      <div class="room-detail">
        <div class="room-header">
          <button class="back-btn" @click=${this._goBack}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>
          <span class="room-title">${t.name}</span>
        </div>

        ${Object.entries(i).map(([t,e])=>I`
          <div class="domain-section">
            <div class="domain-header">
              <span class="domain-label">${t.replace(/_/g," ")}</span>
              ${this._isToggleable(t)?I`
                <button class="domain-action" @click=${()=>this._turnOffDomain(this._selectedArea,t)}>
                  All Off
                </button>
              `:""}
            </div>
            <div class="glass entity-list">
              ${e.map(e=>{const i=this._isActive(e.state);return I`
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
                    ${this._isToggleable(t)?I`
                      <button
                        class="toggle ${i?"on":"off"}"
                        @click=${t=>{t.stopPropagation(),this._toggleEntity(e.entity_id)}}
                      >
                        <div class="knob"></div>
                      </button>
                    `:I`
                      <span class="entity-value">${this._getEntityDisplayState(e)}</span>
                    `}
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
      `]}_handleTap(){}render(){if(!this.room)return I``;const t=this.room.icon||"mdi:door",e=this.room.lightsOn>0||this.room.mediaActive>0;return I`
      <div class="glass card" @click=${this._handleTap}>
        <div class="room-icon ${e?"has-active":""}">
          <ha-icon icon=${t}></ha-icon>
        </div>
        <div class="room-info">
          <span class="room-name">${this.room.name}</span>
          <div class="room-status">
            ${this.room.lightsOn>0?I`
              <span class="status-item active">
                <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                ${this.room.lightsOn}
              </span>
            `:""}
            ${this.room.mediaActive>0?I`
              <span class="status-item active">
                <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                Playing
              </span>
            `:""}
            ${e?"":I`
              <span class="status-item">${this.room.entityCount} devices</span>
            `}
          </div>
        </div>
        <div class="room-right">
          ${this.room.temperature?I`<span class="temp">${this.room.temperature}</span>`:""}
          <span class="chevron">
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </span>
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
      `]}setConfig(t){this._config=t}_getEntities(){if(!this.hass||!this._config?.area_id)return[];const t=this._config.area_id,e=[];for(const[i,s]of Object.entries(this.hass.states)){const a=this.hass.entities?.[i];if(!a)continue;(a.area_id||a.device_id&&this.hass.devices?.[a.device_id]?.area_id)===t&&e.push({entity_id:i,domain:i.split(".")[0],name:s.attributes?.friendly_name||a.name||i,state:s.state,attributes:s.attributes||{}})}return e}_groupByDomain(t){const e={},i=["light","switch","media_player","climate","fan","cover","sensor","binary_sensor"];for(const i of t)e[i.domain]||(e[i.domain]=[]),e[i.domain].push(i);const s={};for(const t of i)e[t]&&(s[t]=e[t]);for(const[t,i]of Object.entries(e))s[t]||(s[t]=i);return s}_toggleEntity(t){const e=t.split(".")[0];["light","switch","fan","input_boolean"].includes(e)&&this.hass.callService(e,"toggle",{entity_id:t})}_isToggleable(t){return["light","switch","fan","input_boolean","cover"].includes(t)}render(){if(!this.hass||!this._config?.area_id)return I`<p class="dim">No area configured.</p>`;const t=this._getEntities(),e=this._groupByDomain(t),i=this._config.area_name||this._config.area_id,s=this._config.area_icon||"mdi:door";return I`
      <div class="room-header">
        <ha-icon icon=${s}></ha-icon>
        <span class="name">${i}</span>
      </div>

      ${Object.entries(e).map(([t,e])=>I`
          <div class="domain-section">
            <div class="domain-title">${t.replace("_"," ")}</div>
            ${e.map(e=>I`
                <div class="entity-row">
                  <span class="entity-name">${e.name}</span>
                  <span class="entity-state">${e.state}</span>
                  ${this._isToggleable(t)?I`
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
      `]}_toggle(t){this.hass.callService("light","toggle",{entity_id:t})}render(){return this.lights&&0!==this.lights.length?I`
      <div class="glass container">
        <div class="header">
          <div class="header-icon">
            <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
          </div>
          <span class="header-text">${this.lights.length} Light${1!==this.lights.length?"s":""} On</span>
        </div>
        <div class="light-list">
          ${this.lights.map(t=>I`
              <div class="light-row">
                <div class="light-info">
                  <span class="light-name">
                    ${t.attributes?.friendly_name||t.name||t.entity_id}
                  </span>
                  <span class="light-area">${t.area_name}</span>
                </div>
                <div class="light-right">
                  ${t.attributes?.brightness?I`<span class="brightness">
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
    `:I``}});customElements.define("glace-media-card",class extends rt{static get properties(){return{hass:{type:Object},entity:{type:Object}}}static get styles(){return[ct,n`
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
      `]}_playPause(){this.hass.callService("media_player","media_play_pause",{entity_id:this.entity.entity_id})}_prev(){this.hass.callService("media_player","media_previous_track",{entity_id:this.entity.entity_id})}_next(){this.hass.callService("media_player","media_next_track",{entity_id:this.entity.entity_id})}render(){if(!this.entity||!this.hass)return I``;const t=this.hass.states[this.entity.entity_id];if(!t)return I``;const e=t.attributes||{},i=e.media_title||e.friendly_name||this.entity.entity_id,s=e.media_artist||"",a=e.entity_picture?this.hass.hassUrl(e.entity_picture):null,n=e.source||e.app_name||"",r="playing"===t.state;return I`
      <div class="glass container">
        <div class="artwork">
          ${a?I`<img src=${a} alt="" />`:I`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="info">
          <span class="title">${i}</span>
          ${s?I`<span class="artist">${s}</span>`:""}
          ${n?I`<span class="source">${n}</span>`:""}
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
    `}});customElements.define("glace-energy-card",class extends rt{static get properties(){return{hass:{type:Object}}}static get styles(){return[ct,n`
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
      `]}_findEnergyEntity(){if(!this.hass)return null;const t=["sensor.electricity_price","sensor.energy_price","sensor.nordpool","sensor.tibber_prices","sensor.amber_general_price","sensor.octopus_energy_electricity_current_rate"];for(const e of t)if(this.hass.states[e])return this.hass.states[e];for(const[t,e]of Object.entries(this.hass.states))if(t.startsWith("sensor.")&&(t.includes("price")||t.includes("tariff"))&&(t.includes("energy")||t.includes("electric")))return e;return null}render(){const t=this._findEnergyEntity();if(!t)return I``;const e=parseFloat(t.state);if(isNaN(e))return I``;const i=t.attributes?.unit_of_measurement||"",s=t.attributes?.friendly_name||"Energy Price",a=t.attributes?.glace_high_threshold||null,n=!!a&&e>a;return I`
      <div class="glass container">
        <div class="icon-wrap ${n?"high":"normal"}">
          <ha-icon icon=${n?"mdi:flash-alert":"mdi:flash"}></ha-icon>
        </div>
        <div class="info">
          <span class="title">${s}</span>
          <span class="subtitle">${n?"Price is high":"Current rate"}</span>
        </div>
        <span class="price ${n?"high":"normal"}">
          ${e}<span class="unit">${i}</span>
        </span>
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
          background: rgba(20, 20, 28, 0.65);
          backdrop-filter: blur(40px) saturate(1.8);
          -webkit-backdrop-filter: blur(40px) saturate(1.8);
          border-top: 0.5px solid rgba(255, 255, 255, 0.10);
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 24px;
          height: var(--glace-nav-height, 82px);
          padding-bottom: env(safe-area-inset-bottom, 0px);
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
        }

        .tab:active {
          transform: scale(0.88);
        }

        .tab.active {
          color: var(--glace-text-primary);
          background: rgba(255, 255, 255, 0.10);
          border: 0.5px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0.5px 0 0 rgba(255, 255, 255, 0.10);
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
      `]}constructor(){super(),this.active="home"}setConfig(t){t.active&&(this.active=t.active)}_navigate(t){window.history.pushState(null,"",`/glace-dashboard/${t}`),window.dispatchEvent(new Event("location-changed"))}render(){return I`
      <nav>
        ${[{id:"home",icon:"mdi:home",label:"Home",path:"home"},{id:"rooms",icon:"mdi:door",label:"Rooms",path:"rooms"},{id:"settings",icon:"mdi:cog",label:"Settings",path:"settings"}].map(t=>I`
            <button
              class="tab ${this.active===t.id?"active":""}"
              @click=${()=>this._navigate(t.path)}
            >
              <ha-icon icon=${t.icon}></ha-icon>
              <span class="tab-label">${t.label}</span>
            </button>
          `)}
      </nav>
    `}});console.info("%c GLACE %c v0.1.0 ","color: #89ceff; font-weight: bold; background: #101415; padding: 4px 8px; border-radius: 4px 0 0 4px;","color: #e0e3e5; background: #272a2c; padding: 4px 8px; border-radius: 0 4px 4px 0;");
//# sourceMappingURL=glace-dashboard.js.map
