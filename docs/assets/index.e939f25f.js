var Oe=Object.defineProperty,Ae=Object.defineProperties;var Ve=Object.getOwnPropertyDescriptors;var G=Object.getOwnPropertySymbols;var de=Object.prototype.hasOwnProperty,ue=Object.prototype.propertyIsEnumerable;var fe=(t,n,o)=>n in t?Oe(t,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[n]=o,y=(t,n)=>{for(var o in n||(n={}))de.call(n,o)&&fe(t,o,n[o]);if(G)for(var o of G(n))ue.call(n,o)&&fe(t,o,n[o]);return t},F=(t,n)=>Ae(t,Ve(n));var pe=(t,n)=>{var o={};for(var r in t)de.call(t,r)&&n.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&G)for(var r of G(t))n.indexOf(r)<0&&ue.call(t,r)&&(o[r]=t[r]);return o};import{c as a,j as e,m,u as Se,r as h,A as j,a as $e,R as P,P as he,b as Ee,d as U,T as Pe,G as Ie,e as He,B as Te}from"./vendor.1c826dad.js";const Ne=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const d of l)if(d.type==="childList")for(const c of d.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(l){const d={};return l.integrity&&(d.integrity=l.integrity),l.referrerpolicy&&(d.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?d.credentials="include":l.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function r(l){if(l.ep)return;l.ep=!0;const d=o(l);fetch(l.href,d)}};Ne();const _={phone:"@media (max-width:767px)"},Le={container:a`
    width: 920px;
    margin-left: auto;
    margin-right: auto;
  `};function $({children:t,className:n}){return e("div",{css:Re.container,className:n},t)}const Re={container:a`
    max-width: 920px;
    margin: 0 auto;
    padding: 0 16px;
    color: #eee;

    ${_.phone} {
      padding-left: 24px;
      padding-right: 24px;
    }
  `};function Ge(){return e(m.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0,transition:{delay:3.8,duration:1.2,ease:"easeOut"}}},e($,{css:je.views__footer},"MIT Licensed | Copyright \xA9 2018-present Petryshyn Sergii"))}const je={views__footer:a`
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 auto;
    padding: 40px 0;
    text-align: center;
    color: #6a6375;
    font-size: 15px;
  `};function me({className:t,onClick:n}){return e("div",{className:t,onClick:n},e("svg",{viewBox:"0 0 16.93 16.93"},e("defs",null,e("linearGradient",{id:"a"},e("stop",{offset:"0",stopColor:"#8983d9"}),e("stop",{offset:"1",stopColor:"#a19aff"})),e("linearGradient",{id:"b"},e("stop",{offset:"0",stopColor:"#a19aff"}),e("stop",{offset:".5",stopColor:"#a19aff"}),e("stop",{offset:"1",stopColor:"#918beb"})),e("linearGradient",{id:"d",x1:"15.44",x2:"20.64",y1:"3.95",y2:"3.95",gradientTransform:"matrix(1.06875 0 0 1.425 2.28 -1.12)",gradientUnits:"userSpaceOnUse",xlinkHref:"#a"}),e("linearGradient",{id:"c",x1:"0",x2:"17.54",y1:"20.35",y2:"20.35",gradientTransform:"translate(7.94 2.65) scale(.37703)",gradientUnits:"userSpaceOnUse",xlinkHref:"#b"}),e("linearGradient",{id:"e",x1:"15.33",x2:"19.98",y1:"4.06",y2:"4.06",gradientTransform:"matrix(.855 0 0 1.425 5.68 4.53)",gradientUnits:"userSpaceOnUse",xlinkHref:"#a"}),e("path",{id:"p1",d:"M7.94 2.65v14.81h6.61v-4.23h-2.9V2.65z"}),e("path",{id:"p2",d:"M6.88 0v3.7h3.7V0zm3.7 5.82h-3.7v9h3.7z"}),e("path",{id:"p3",d:"M18.79 2.65h5.55v3.7H18.8z"}),e("path",{id:"p4",d:"M18.79 8.47h3.96v3.7H18.8z"}),e("clipPath",{id:"cp1"},e("use",{xlinkHref:"#p1",style:{overflow:"visible"}})),e("clipPath",{id:"cp2"},e("use",{xlinkHref:"#p2",style:{overflow:"visible"}})),e("clipPath",{id:"cp3"},e("use",{xlinkHref:"#p3",style:{overflow:"visible"}})),e("clipPath",{id:"cp4"},e("use",{xlinkHref:"#p4",style:{overflow:"visible"}}))),e("g",null,e(m.path,F(y({},q(0)),{clipPath:"url(#cp1)",fill:"url(#c)",d:"M7.94 2.65v14.81h6.61v-4.23h-2.9V2.65z",transform:"translate(-7.94 -2.65)"})),e(m.path,F(y({},q(1)),{clipPath:"url(#cp2)",fill:"#a19aff",d:"M6.88 0v3.7h3.7V0zm3.7 5.82h-3.7v9h3.7z"})),e(m.path,F(y({},q(2)),{clipPath:"url(#cp3)",fill:"url(#d)",d:"M18.79 2.65h5.55v3.7H18.8z",transform:"translate(-7.94 -2.65)"})),e(m.path,F(y({},q(3)),{clipPath:"url(#cp4)",fill:"url(#e)",d:"M18.79 8.47h3.96v3.7H18.8z",transform:"translate(-7.94 -2.65)"})))))}const q=t=>({strokeOpacity:0,fillOpacity:0,animate:{pathLength:[0,1,1],fillOpacity:[0,.4,1],strokeOpacity:[1,1,0],transition:{duration:6,delay:t*.35}},strokeWidth:".3",stroke:"#cac6ff"});function Ue(){const t=Se();return e("header",{css:C.header},e($,{css:C.header__container},e(me,{css:C.header__logo,onClick:()=>t("/")}),e("div",{css:C.header__links},e("a",{css:C.header__link,onClick:()=>t("/guide")},"Guide"),e("a",{css:C.header__link,onClick:()=>t("/showcase")},"Showcase"),e("a",{css:C.header__link,onClick:()=>t("/examples")},"Examples"),e("a",{css:C.header__link,href:"https://github.com/mc-petry/useform"},"Github"))))}const C={header:a`
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    color: #fff;
  `,header__container:a`
    display: flex;
    align-items: center;
    height: 60px;
  `,header__logo:a`
    width: 32px;
    height: 32px;
    cursor: pointer;
  `,header__links:a`
    display: flex;
    margin: 0 0 0 auto;
  `,header__link:a`
    margin-left: 10px;
    color: #ada7b7;
    text-decoration: none;
    transition: all 0.15s;

    &:hover {
      color: #fff;
      cursor: pointer;
    }
  `,header__content:a`
    width: 100%;
  `};function qe({items:t}){return e("div",{css:W.sidebar},e("div",{css:W.sidebar__content},t.map((n,o)=>e("div",{key:o,css:[W.sidebar__item,n.children&&W.sidebar__item_children],onClick:()=>{console.log(document.getElementById(`example-${o}`)),document.getElementById(`example-${o}`).scrollIntoView({behavior:"smooth",block:"start"})}},n.header))))}const W={sidebar:a`
    flex: 0 0 240px;
    top: 20px;
    margin: 0 32px 0 0;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 32px;

    ${_.phone} {
      margin: 0 0 20px;
      display: block;
    }
  `,sidebar__content:a`
    position: sticky;
    top: 24px;

    ${_.phone} {
      position: static;
    }
  `,sidebar__item:a`
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 32px;
    height: 64px;
    border-radius: 24px;
    transition: all 0.15s;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.15s;

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
    }

    ${_.phone} {
      font-size: 18px;
      padding-top: 12px;
      padding-bottom: 12px;
      background: none !important;

      &::after {
        display: none;
      }
    }
  `,sidebar__item_children:a`
    font-weight: normal;
    padding-left: 48px;
  `};function I({children:t}){return e("h2",{css:We.h2},t)}const We={h2:a`
    margin: 1.5em 0 1em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  `};function B({children:t}){return e("span",{css:De.quote},t)}const De={quote:a`
    color: #dac3ff;

    &::before,
    &::after {
      content: '\`';
      color: #a694c4;
    }
  `};function O({children:t}){return e("p",{css:Ze.text},t)}const Ze={text:a`
    margin: 1em 0;
    line-height: 1.6;
  `};function ge(t,n,o){const r=V(o,[t]);return h.exports.useEffect(()=>(t.addForm(r),()=>t.removeForm(r)),[r]),{fields:h.exports.useMemo(()=>{var d;return((d=t.value)==null?void 0:d[n])!==void 0&&r.setValues(t.value[n]),new Proxy({},{get(c,p){if(!c[p]){const g=r.fields[p];c[p]=g;const M=g.onChange;g.onChange=async R=>{await M(R);const z=[...t.value];z[n]=F(y({},z[n]),{[p]:R}),await t.onChange(z)};const S=g.onFocus;g.onFocus=()=>{S(),t.onFocus()};const Q=g.onBlur;g.onBlur=async()=>{await Q(),await t.onBlur()}}return c[p]}})},[t])}}function Ke(t,n,o=t.value.length){const r=t.value;r.splice(o,0,n),t.onChange(r),t.onBlur()}function Je(t){const[n,o]=h.exports.useState(!1);return h.exports.useEffect(()=>{const r=t.onFocus,l=t.onBlur;return t.onFocus=()=>{r(),o(!0)},t.onBlur=async()=>{await l(),o(!1)},()=>{t.onFocus=r,t.onBlur=l}},[t]),n}function xe(t,n){const o=V(n,[t]);return h.exports.useEffect(()=>(t.addForm(o),()=>t.removeForm(o)),[o]),{fields:h.exports.useMemo(()=>(t.value&&o.setValues(t.value),new Proxy({},{get(l,d){if(!l[d]){const c=o.fields[d];l[d]=c;const p=c.onChange;c.onChange=async S=>{await p(S),await t.onChange(F(y({},t.value||{}),{[d]:S}))};const g=c.onFocus;c.onFocus=()=>{g(),t.onFocus()};const M=c.onBlur;c.onBlur=async()=>{await M(),await t.onBlur()}}return l[d]}})),[t])}}function Qe(t){const[,n]=h.exports.useReducer(o=>o+1,0);h.exports.useEffect(()=>{const o=t.onChange;return t.onChange=async r=>{await o(r),n()},()=>{t.onChange=o}},[t])}const ve={dirty:!1,touched:!1,error:null,warn:null,value:void 0};function H(t){return Array.isArray(t)?t:[t]}async function be(t,n,o){const r=H(t);for(const l of r){const d=await l(n,o);if(d)return d}}function V(t={},n=[]){const[,o]=h.exports.useReducer(l=>l+1,0);return h.exports.useMemo(()=>{const l=t.fields||{},d=y({validateOnBlur:!0,validateOnChange:!1},t),c={},p=()=>Object.keys(z),g=(i,s)=>{var u,f;return s&&((f=(u=d.transformers)==null?void 0:u.error)==null?void 0:f.call(u,s,i))||s||null},M=async i=>{var f;const s=c[i],u=l[i];if(s.forms)for(const x of s.forms)await x.validate(void 0,!0);else{const x=u.validate||((f=d.validationSchema)==null?void 0:f[i]),k=u.warn;if(s.error=x?g(s,await be(x,s.value,c)):null,s.warn=k?g(s,await be(k,s.value,c)):null,u.dependent)for(const ce of H(u.dependent))c[ce].touched&&await M(ce)}},S=async(i,s)=>{const u=c[i];u.value=s,u.dirty=!0;const f=l[i];(f.validateOnChange!=null?f.validateOnChange:d.validateOnChange)&&await M(i)},Q=i=>{const s=c[i];s.touched||(s.touched=!0,o())},R=async i=>{const s=c[i];if(s.forms){o();return}if(!s.dirty)return;const u=l[i];(u.validateOnBlur!=null?u.validateOnBlur:d.validateOnBlur)&&await M(i),o()},ne=i=>{var s;return((s=d.initialValues)==null?void 0:s[i])||ve.value},z=new Proxy(c,{get(i,s){var u,f,x;return i[s]||(l[s]||(l[s]=((u=d.dynamic)==null?void 0:u.call(d,s))||{}),i[s]=F(y({},ve),{ref:h.exports.createRef(),name:s,label:((x=(f=d.transformers)==null?void 0:f.label)==null?void 0:x.call(f,s))||void 0,value:ne(s),onChange:k=>S(s,k),onFocus:()=>Q(s),onBlur:()=>R(s),addForm:function(k){this.forms||(this.forms=[]),this.forms.push(k)},removeForm:function(k){!this.forms||(this.forms.splice(this.forms.indexOf(k),1),this.forms.length===0&&(this.forms=void 0))}})),i[s]}}),oe=i=>{if(i)for(const s of Object.keys(i))z[s]};oe(d.validationSchema),oe(d.initialValues);const _e=i=>async s=>{s.preventDefault(),await Y()&&i(ie())},ae=(i,s)=>{s=H(s);for(const u of s){const f=c[u];if(f.forms){for(const x of f.forms)if((i==="error"?x.hasError:x.hasWarn)())return!0}else if(f[i])return!0}return!1},se=(i=p())=>ae("error",i),we=(i=p())=>ae("warn",i),Y=async(i=p(),s=!1)=>{i=H(i);for(const f of i)await M(f);const u=se(i);return s||(u&&le(),o()),!u},ze=()=>{for(const i of p())if(c[i].touched)return!0;return!1},ke=()=>{for(const i of p())if(c[i].dirty)return!0;return!1},ie=()=>{const i={};for(const s of p())i[s]=c[s].value;return i},Me=(i,s)=>{for(const[u,f]of Object.entries(i)){const x=z[u];x.value=f}s?Y():o()};function re(i,s){for(const u of Object.keys(s)){const f=z[u];f[i]=g(f,s[u])}o()}const Fe=i=>{re("error",i)},Ce=i=>{re("warn",i)},Be=(i=p())=>{for(const s of H(i))c[s],delete c[s];o()},le=()=>{var i;for(const s of p()){const u=c[s];if(u.forms){for(const f of u.forms)if(f.hasError()){f.focusInvalidField();return}}else if(u.error){(i=u.ref.current)==null||i.focus();return}}};return{fields:z,validate:Y,handleSubmit:_e,hasError:se,hasWarn:we,touched:ze,dirty:ke,getValues:ie,setValues:Me,setErrors:Fe,setWarns:Ce,reset:Be,focusInvalidField:le}},n)}function w({type:t="button",intent:n,icon:o,children:r,onClick:l,disabled:d}){return e("button",{css:[D.btn,n==="primary"&&D.btn_primary,!r&&D.btn_icon],type:t,onClick:l,disabled:d},o&&e("div",{css:D.btn__icon}),r)}const D={btn:a`
    flex: 1;
    height: 64px;
    background: none;
    border-radius: 24px;
    border: none;
    width: 100%;
    color: #fff;
    padding: 2px 32px 0;
    transition: all 0.15s;
    font-size: 16px;
    font-family: 'Overpass';
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);

    &:hover {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.2);
    }

    &:focus {
      outline: none;
    }

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      opacity: 0.4;
    }
  `,btn_primary:a`
    flex: unset;
    background: #0071ff;
    box-shadow: none;

    &:hover {
      background: #0053b9;
    }
  `,btn_icon:a`
    width: 64px;
    flex: 0 0 64px;
  `,btn__icon:a``};function Ye({form:t}){return e("div",{css:T.state},e("div",{css:T.state__content},e(ye,{title:"Form",content:{touched:t.touched(),dirty:t.dirty(),hasError:t.hasError()}}),e(ye,{title:"Values",content:t.getValues()})))}function ye({title:t,content:n}){return e("div",{css:T.state__section},e("div",{css:T.state__sectionTitle},t,":"),e("div",{css:T.state__sectionContent},JSON.stringify(n,(o,r)=>r===void 0?"undefined":r,2).replaceAll('": "undefined"','": undefined')))}const T={state:a`
    flex: 0.6;
    overflow: hidden;
    padding: 24px 32px;

    ${_.phone} {
      padding-left: 24px;
      padding-right: 24px;
    }
  `,state__content:a`
    overflow: auto;
  `,state__section:a`
    font-size: 14px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 16px;

    &:not(:last-of-type) {
      margin-bottom: 16px;
    }
  `,state__sectionTitle:a`
    /* margin-bottom: 8px; */
    color: #9486ad;
    font-size: 16px;
    padding: 16px 24px 10px;
  `,state__sectionContent:a`
    font-family: 'Inconsolata', monospace;
    /* color: #0cf; */
    white-space: pre;
    font-size: 14px;
    padding: 13px 24px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 16px;
  `};function b({children:t,form:n}){const[o,r]=h.exports.useState();return e("div",{css:X.form},e(j,null,e(m.div,{css:X.form__form},e("form",{onSubmit:n.handleSubmit(l=>r(l)),onReset:()=>n.reset()},t))),e(Ye,{form:n}))}b.Actions=function({children:t}){return e("div",{css:X.form__actions},t)};const X={form:a`
    display: flex;
    border-radius: 32px;
    background: rgba(0, 0, 0, 0.1);

    ${_.phone} {
      display: block;
    }
  `,form__form:a`
    flex: 1;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    padding: 24px 28px;
  `,form__actions:a`
    display: flex;

    & > *:not(:first-of-type) {
      margin-left: 24px;
    }

    &:not(:last-of-type) {
      margin-bottom: 24px;
    }
  `};function Xe({field:t}){const n=t.error||t.warn;return e(j,null,n&&e(m.div,{css:[Z.message,t.error&&Z.message_error||t.warn&&Z.message_warn],initial:{height:0},animate:{height:"auto"},exit:{height:0},transition:{duration:.2,ease:"easeOut"}},e(m.div,{css:Z.message__content,initial:{y:-20,opacity:0},animate:{y:0,opacity:1},exit:{y:-20,opacity:0}},n)))}const Z={message:a`
    font-size: 13px;
  `,message_error:a`
    color: #c0887d;
  `,message_warn:a`
    color: #d19d36;
  `,message__content:a`
    padding: 8px 0 0 24px;
  `};function v({field:t,label:n}){Qe(t);const o=Je(t),r=!t.value&&!o,l=$e();return h.exports.useEffect(()=>{t.error&&l.start({x:[16,-16,12,-12,8,-8,0],transition:{duration:.7,ease:"easeOut"}})},[t.error]),e("div",{css:A.wrapper},e(m.div,{css:[A.field,o&&A.field_focused,t.error&&A.field_error],animate:l,onClick:()=>{var d;return(d=t.ref.current)==null?void 0:d.focus()}},e("div",{css:[A.field__label,r&&A.field__label_hasPlaceholder,o&&A.field__label_focused]},n),e("input",{css:A.field__input,ref:t.ref,value:t.value||"",onChange:d=>t.onChange(d.target.value),onFocus:()=>t.onFocus(),onBlur:()=>t.onBlur(),type:"text"})),e(Xe,{field:t}))}const A={wrapper:a`
    margin: 0 0 24px;
  `,field:a`
    position: relative;
    z-index: 1;
    padding: 38px 24px 0;
    height: 80px;
    background: #0c0b0e;
    box-shadow: inset 0 0 0 2px #0000;
    border-radius: 24px;
    transition: all 0.15s;
    cursor: text;
  `,field_focused:a`
    box-shadow: inset 0 0 0 2px #5290f7;
    background: #000;
  `,field_error:a`
    box-shadow: inset 0 0 0 2px #912e16;
  `,field__label:a`
    position: absolute;
    left: 24px;
    top: 18px;
    font-size: 15px;
    color: #888;
    transform-origin: 0 50%;
    transition: all 0.3s cubic-bezier(0.18, 0.9, 0.55, 1.28);
    pointer-events: none;
  `,field__label_hasPlaceholder:a`
    transform: translateY(15px) scale(1.5);
    color: #797581;
  `,field__label_focused:a`
    color: #82a8eb;
  `,field__input:a`
    width: 100%;
    padding: 0;
    line-height: 1.5;
    background: none;
    border: none;
    color: #efecf1;
    outline: none;
    font-family: 'Overpass';
    font-size: 20px;
  `};function et(){const[t,n]=h.exports.useReducer(c=>c+1,0),[o,r]=h.exports.useState(["name"]),l=V({dynamic:()=>({validate:c=>!c&&"required"||c.length<2&&"min-length"}),transformers:{label:c=>c[0].toUpperCase()+c.substr(1)}},[t]),{fields:d}=l;return e(b,{form:l},e(j,null,o.map(c=>{const p=d[c];return e(m.div,{key:c,initial:{height:0,overflow:"hidden"},animate:{height:"auto"},exit:{height:0}},e(v,{field:p,label:p.label}))})),e(b.Actions,null,e(w,{intent:"primary",onClick:()=>r(c=>[...c,`name ${c.length+1}`])},"Add"),e(w,{disabled:Object.keys(l.fields).length===1,onClick:()=>{r(["rebuilded"]),n()}},"Rebuild")))}function ee(){return e("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},e("path",{d:"M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"}))}function tt(){const t=V({initialValues:{group:"Mammal",animals:[{name:"Kangaroo"}]}}),{fields:n}=t;return e(b,{form:t},e(v,{field:n.group,label:"Group"}),"Animals:",e(j,null,n.animals.value.map((o,r)=>e(m.div,{key:r,css:ot,initial:{height:0,overflow:"hidden"},animate:{height:"auto"},exit:{height:0}},e(nt,{field:n.animals,index:r})))),e(b.Actions,null,e(w,{intent:"primary",onClick:()=>Ke(n.animals,{name:""})},"Add animal"),e(w,{type:"reset",icon:"reset",disabled:!t.touched()},e(ee,null))))}function nt({field:t,index:n}){const{fields:o}=ge(t,n);return e("div",null,e(v,{field:o.name,label:"Name"}))}const ot={fieldArray__item:a``};function at(){const t=V({initialValues:{user:{firstName:"Adeline"}}}),{fields:n}=t;return e(b,{form:t},e(st,{field:n.user}),e(b.Actions,null,e(w,{type:"submit",intent:"primary"},"Submit"),e(w,{type:"reset",icon:"reset",disabled:!t.touched()},e(ee,null))))}function st({field:t}){const{fields:n}=xe(t);return e(P.Fragment,null,e(v,{field:n.firstName,label:"First name"}),e(v,{field:n.lastName,label:"Last name"}))}function it(){const t=V({fields:{name:{validate:o=>!o&&"Name is required"||o.length<2&&"Name too short"},age:{validate:o=>o==null&&"Age is required"}}}),{fields:n}=t;return e(b,{form:t},e(v,{field:n.name,label:"Name"}),e(v,{field:n.email,label:"Email"}),e(b.Actions,null,e(w,{type:"submit",intent:"primary"},"Submit"),e(w,{type:"reset",icon:"reset",disabled:!t.touched()},e(ee,null))))}function rt(){const t=[{header:"Simple",content:e(it,null)},{header:"Dynamic",desc:e(O,null,"Fields can be created dynamically. This is useful when you get the list of available fields from the API."),content:e(et,null)},{header:"Nested",desc:e(O,null,"Nested fields in object can be used with ",e(B,null,"useFieldNested")," hook."),content:e(at,null)},{header:"Field array",content:e(tt,null)}];return e($,{css:N.examples},e(qe,{items:t}),e("div",{css:N.examples__content},t.map((n,o)=>e("div",{key:o,id:`example-${o}`,css:N.examples__example},e("div",{css:N.examples__exampleTitle},e(I,null,n.header)),n.desc&&e("div",{css:N.examples__exampleDesc},n.desc),n.content))))}const N={examples:a`
    display: flex;
    padding: 48px 16px;

    ${_.phone} {
      display: block;
    }
  `,examples__content:a`
    flex: 1;
    min-width: 0;
  `,examples__example:a`
    margin: 0 0 48px;
  `,examples__exampleTitle:a`
    margin: 0 32px 20px;
  `,examples__exampleDesc:a`
    font-size: 16px;
    margin: 0 32px 20px;
  `};function lt({children:t}){return e("div",{css:ct.box},t)}const ct={box:a`
    /* background: #171319;
    border-radius: 24px;
    padding: 24px; */
  `};var L;(function(t){t.TS="tsx",t.Markup="markup"})(L||(L={}));function K(r){var l=r,{children:t,lang:n=L.TS}=l,o=pe(l,["children","lang"]);const[d,c]=h.exports.useState("");return h.exports.useEffect(()=>{t&&c(he.highlight(t,he.languages[n],n))},[t]),e("div",y({css:[te.code,n===L.Markup&&te.code_markup]},o),e("pre",{css:te.code__pre},e("code",{className:"language-ts",dangerouslySetInnerHTML:{__html:d}})))}const te={code:a`
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    overflow: auto;
    margin: 0 0 20px;

    ${_.phone} {
      margin: 0 -32px;
      border-radius: 0;
      border-left: 0;
      border-right: 0;
    }
  `,code_markup:a`
    /* color: #fff; */
  `,code__pre:a`
    margin: 0;
    padding: 16px;

    ${_.phone} {
      padding: 16px 32px;
    }
  `};function dt({children:t}){return e("h1",null,t)}function ut(){return e($,{css:ft.guide},e(lt,null,e(dt,null,"Guide"),e(O,null,"Install ",e(B,null,"useform")," with package manager you likes:"),e(K,{lang:L.Markup},"npm i @mc-petry/useform"),e(I,null,"Create a custom field"),e(O,null,"Create component wrapper for each field. Track changes with ",e(B,null,"useFieldWatch")," hook.",e("br",null),"Always pass anonymous functions to ",e(B,null,"onChange"),", ",e(B,null,"onFocus")," and"," ",e(B,null,"onBlur"),"."),e(O,null,"Bad:"),e(K,null,"\u274C <input onFocus={field.onFocus} />"),e(O,null,"Good:"),e(K,null,"\u2714\uFE0F <input onFocus={() => field.onFocus()} />"),e(O,null,"Example with text input:"),e(K,null,`import { Field, useFieldWatch } from '@mc-petry/useform'

interface Props {
  field: Field<string> | Field<string | undefined>
}

export function TextField({ field }: Props) {
  // Watch changes
  useFieldWatch(field)

  return (
    <input
      // Allows to focus invalid field
      ref={field.ref as React.RefObject<HTMLInputElement>}
      value={field.value || ''}
      onChange={e => field.onChange(e.target.value)}
      onFocus={() => field.onFocus()}
      onBlur={() => field.onBlur()}
      type="text"
    />
  )
}`),e(I,null,"Form state"),e(O,null,e(B,null,"useform")," uses ",e(B,null,"Proxy")," for fields.")))}const ft={guide:a`
    padding: 20px 16px;
  `};function pt(){const t=[{icon:e("svg",{viewBox:"0 0 32 32"},e("g",{fillRule:"evenodd"},e("path",{d:"M13 18.050v-1.050h1v1.049c1.147 0.231 2 1.24 2 2.451 0 1.39-1.119 2.5-2.5 2.5-1.39 0-2.5-1.119-2.5-2.5 0-1.218 0.859-2.22 2-2.45v0zM19 3h-9.991c-1.109 0-2.009 0.898-2.009 2.007v22.985c0 1.109 0.891 2.007 1.997 2.007h15.005c1.103 0 1.997-0.891 1.997-1.997v-17.003h-4.994c-1.108 0-2.006-0.887-2.006-1.998v-6.002zM20 3v5.997c0 0.554 0.451 1.003 0.991 1.003h5.009l-6-7zM12 4v1h2v-1h-2zM13 3v1h2v-1h-2zM13 5v1h2v-1h-2zM12 6v1h2v-1h-2zM13 7v1h2v-1h-2zM12 8v1h2v-1h-2zM13 9v1h2v-1h-2zM12 10v1h2v-1h-2zM13 11v1h2v-1h-2zM12 12v1h2v-1h-2zM13 13v1h2v-1h-2zM12 14v1h2v-1h-2zM13 15v1h2v-1h-2zM12 16v1h2v-1h-2zM13.5 19c-0.828 0-1.5 0.666-1.5 1.5 0 0.828 0.666 1.5 1.5 1.5 0.828 0 1.5-0.666 1.5-1.5 0-0.828-0.666-1.5-1.5-1.5z"}))),label:"Lightweight",value:e(P.Fragment,null,"Library size only 5 KB (2 KB gzipped).")},{icon:e("svg",{viewBox:"0 0 32 32"},e("path",{d:"M3 0C0 0 0 3 0 3v26c0 3 3 3 3 3h26s3 0 3-3V3c0-3-3-3-3-3Zm22.86 16.21c.68 0 1.28.05 1.8.13.53.08 1.02.2 1.46.38v2.72a5.13 5.13 0 0 0-2.33-.86 5.67 5.67 0 0 0-.76-.05c-.34 0-.64.03-.92.1-.27.06-.5.15-.69.26-.19.12-.33.26-.44.42a1.06 1.06 0 0 0 .02 1.13c.12.18.28.34.5.5.2.15.46.3.77.45.3.15.65.3 1.03.46.52.22.99.45 1.4.7.42.24.78.52 1.08.83.3.3.52.66.68 1.07.16.39.24.85.24 1.38a3.38 3.38 0 0 1-1.54 3.04c-.48.3-1.03.53-1.66.66a11.15 11.15 0 0 1-4.04.02c-.64-.12-1.2-.3-1.68-.55V26.1a5.68 5.68 0 0 0 3.6 1.33c.38 0 .7-.04.97-.1.28-.07.51-.16.7-.28.18-.12.32-.26.41-.42a1.13 1.13 0 0 0-.08-1.21c-.14-.2-.35-.38-.6-.55a6.03 6.03 0 0 0-.9-.5c-.34-.15-.72-.32-1.12-.48a5.76 5.76 0 0 1-2.28-1.56 3.42 3.42 0 0 1-.75-2.22c0-.68.14-1.27.4-1.75.28-.5.65-.9 1.12-1.21a4.99 4.99 0 0 1 1.64-.7 8.25 8.25 0 0 1 1.97-.23zm-16.62.22h10.39v2.4H15.9V29.5h-2.95V18.83H9.24Z"})),label:"TypeScript",value:"Get intellisense with fully typed APIs."},{icon:e("svg",{viewBox:"0 0 512 512"},e("path",{d:"M223.87 241.02a15 15 0 0 0-14.23 10.25c-3.37 10.1-32.9 99.68-32.9 133.28 0 26 21.14 47.14 47.13 47.14S271 410.54 271 384.55c0-33.6-29.53-123.17-32.9-133.27a15 15 0 0 0-14.23-10.26zM208.87 84.7a255.8 255.8 0 0 0-91.82 36.66l55.46 96.02c11.56-5 23.81-8.28 36.36-9.74zM238.87 80.9v126.74a129.55 129.55 0 0 1 36.36 9.74L345.1 96.32A255.51 255.51 0 0 0 238.87 80.9zM372.72 108.48 301.2 232.4a130.54 130.54 0 0 1 26.6 26.61l132.7-76.63a256.16 256.16 0 0 0-87.78-73.9zM33.77 209.28l73.16 42.23 13 7.5a130.5 130.5 0 0 1 26.61-26.6l-53.8-93.17a258.57 258.57 0 0 0-58.97 70.05zM0 336.35a15 15 0 0 0 15 15h64.27a15 15 0 0 0 15-15c0-17.74 3.66-35.25 10.63-51.38L20.37 236.2A253.3 253.3 0 0 0 0 336.35zM477.16 207.4l-134.32 77.58a129.57 129.57 0 0 1 10.63 51.37 15 15 0 0 0 15 15H497a15 15 0 0 0 15-15c0-45.64-12-89.89-34.84-128.94z"})),label:"Performance",value:"Easily build a complex forms with minimum rerenders."},{icon:e("svg",{viewBox:"0 0 418.03 418.03"},e("path",{d:"m275.4 228.1 38.06 7.54a38.8 38.8 0 1 0 3.94-19.6l-39.38-7.82a62.25 62.25 0 0 0-16.27-40.2l53.09-74.99a48.51 48.51 0 1 0-16.32-11.57l-52.45 74.1a62.33 62.33 0 0 0-76.16 11.93l-68.74-53.39a38.88 38.88 0 1 0-12.84 15.35l70.42 54.69a62.35 62.35 0 0 0 14.8 72.15l-42.18 59.65a51.62 51.62 0 1 0 15.3 13l43.65-61.73a62.27 62.27 0 0 0 47.98 1.05l52.18 77.08a43.79 43.79 0 1 0 16.28-11.62l-51.22-75.66a62.66 62.66 0 0 0 19.86-29.97zm76.76-13.67a18.78 18.78 0 1 1 0 37.57 18.78 18.78 0 0 1 0-37.57zM334 20.23a28.38 28.38 0 1 1 0 56.77 28.38 28.38 0 0 1 0-56.76zm-268 96.31a18.78 18.78 0 1 1 0-37.57 18.78 18.78 0 0 1 0 37.57zm40.35 275.86a31.48 31.48 0 1 1 0-62.97 31.48 31.48 0 0 1 0 62.97zm217.01-41.95a23.86 23.86 0 1 1 0 47.73 23.86 23.86 0 0 1 0-47.73zm-107.8-97.89a42.49 42.49 0 1 1 0-84.98 42.49 42.49 0 0 1 0 84.98z"})),label:"Zero dependencies",value:"Requires only React as a peer dependency."},{icon:e("svg",{viewBox:"0 0 64 64"},e("path",{d:"m27.89 49.35-8.56-15.42c-.44.04-.88.07-1.33.07-.4 0-.79-.03-1.19-.06l9.5 16.99a6.97 6.97 0 0 1 1.58-1.58zM46.39 23.72a10.15 10.15 0 0 1 2.13-1.08l-15.09-8.8a16.04 16.04 0 0 1 .49 2.61z"}),e("path",{d:"M18 4a14 14 0 1 0 14 14A14.02 14.02 0 0 0 18 4zm0 26a12 12 0 1 1 12-12 12.01 12.01 0 0 1-12 12zM52 24a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8zm0 14a6 6 0 1 1 6-6 6 6 0 0 1-6 6z"}),e("circle",{cx:"52",cy:"32",r:"4"}),e("path",{d:"M37.73 51a7.04 7.04 0 0 1 .94 1.88l11.54-11.05a10.09 10.09 0 0 1-2.19-.66z"}),e("circle",{cx:"32",cy:"55",r:"2"}),e("path",{d:"M32 49a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 9a3 3 0 1 1 3-3 3 3 0 0 1-3 3zM37 12h2a5 5 0 0 0-5-5v2a3 3 0 0 1 3 3z"}),e("path",{d:"M41 12h2a9.01 9.01 0 0 0-9-9v2a7 7 0 0 1 7 7zM11 34H9a5 5 0 0 0 5 5v-2a3 3 0 0 1-3-3z"}),e("path",{d:"M7 34H5a9.01 9.01 0 0 0 9 9v-2a7 7 0 0 1-7-7zM22.91 17.41l-4 9A1 1 0 0 1 18 27a1.5 1.5 0 0 1-.21-.02A1 1 0 0 1 17 26v-6h-3a1 1 0 0 1-.91-1.41l4-9A1 1 0 0 1 19 10v6h3a1 1 0 0 1 .91 1.41z"})),label:"Hybrid package",value:"Supports ESM and CommonJS."},{icon:e("svg",{viewBox:"0 0 512 512"},e("path",{d:"M0 362v15a45 45 0 0 0 45 45h191v-60H0zM150 182a25 25 0 1 0 0 50 25 25 0 0 0 0-50zM97.1 222H90v40h40v-3.8A55.2 55.2 0 0 1 97.1 222z"}),e("path",{d:"M45 87a45 45 0 0 0-45 45v200h236V87H45zm115 174v31H60V192h37.1a55 55 0 1 1 62.9 69zM365 256h-9v30h30v-6.2a45.2 45.2 0 0 1-21-23.8zM349 41v55a5 5 0 0 0 5 5h70a5 5 0 0 0 5-5V41h-80zM407 225a15 15 0 1 0 0 30 15 15 0 0 0 0-30z"}),e("path",{d:"M477 41h-18v55a35 35 0 0 1-35 35h-70a35 35 0 0 1-35-35V41h-18a35 35 0 0 0-35 35v360a35 35 0 0 0 35 35h176a35 35 0 0 0 35-35V76a35 35 0 0 0-35-35zm-61 243v32h-90v-90h38.2a45 45 0 1 1 51.8 58z"})),label:"Universal",value:"Use with react and react native."}];return e($,{css:E.benefits},t.map((n,o)=>e(m.div,{key:o,css:E.benefits__item,initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:o*.4+1.3,duration:1.2,ease:"easeOut"}},e("div",{css:E.benefits__itemIcon},n.icon),e("div",{css:E.benefits__itemContent},e("div",{css:E.benefits__itemLabel},n.label),e("div",{css:E.benefits__itemValue},n.value)))))}const E={benefits:a`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-top: 60px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);

    ${_.phone} {
      flex-direction: column;
      padding-left: 40px;
    }
  `,benefits__item:a`
    flex: 1;
    display: flex;
    color: #fff;
    opacity: 0;
    flex: 0 0 33%;
    margin-bottom: 40px;

    &:not(:nth-of-type(3n)) {
      padding-right: 40px;
    }
  `,benefits__itemIcon:a`
    margin: 0 16px 0 0;
    flex: 0 0 48px;
    width: 48px;
    height: 48px;
    fill: #fff;
    opacity: 0.8;
  `,benefits__itemContent:a``,benefits__itemLabel:a`
    font-size: 22px;
  `,benefits__itemValue:a`
    font-size: 16px;
    color: #6a6375;
  `};function ht(){const t="@mc-petry/",n="useform",o=.07;return e("div",null,e(me,{css:J.home__logo}),e("div",{css:J.home__intro},e("div",{css:J.home__prefix},t.split("").map((r,l)=>e(m.div,{key:l,style:{display:"inline-block"},initial:{opacity:0,scale:1.5},animate:{opacity:1,scale:1},transition:{delay:l*o}},r))),e("div",{css:J.home__use},n.split("").map((r,l)=>e(m.div,{key:l,style:{display:"inline-block"},initial:{opacity:0,scale:1.5},animate:{opacity:1,scale:1},transition:{delay:(l+t.length)*o}},r)))),e(pt,null))}const J={home__logo:a`
    width: 192px;
    height: 192px;
    margin: 100px auto;
  `,home__intro:a`
    margin: 0 auto 60px;
    color: #ddd;
    font-size: 32px;
    text-align: center;
  `,home__use:a`
    display: inline;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 28px;
  `,home__prefix:a`
    display: inline;
    color: #594e6a;
  `};function mt(){const t=V({initialValues:{account:{},contact:[{address:"",city:"",phone:[]}]},validationSchema:{firstName:o=>!o&&"First name required",lastName:o=>!o&&"Last name required"}}),{fields:n}=t;return e($,{css:vt.showcase},e(b,{form:t},e(v,{field:n.firstName,label:"First name"}),e(v,{field:n.lastName,label:"Last name"}),e(I,null,"Account information"),e(gt,{field:n.account}),e(I,null,"Contact information"),n.contact.value.map((o,r)=>e(xt,{key:r,field:n.contact,index:r})),e(b.Actions,null,e(w,{type:"submit",intent:"primary"},"Submit"),e(w,{type:"reset",icon:"reset",disabled:!t.touched()},"Reset"))))}function gt({field:t}){const{fields:n}=xe(t,{fields:{password:{dependent:"password2"}},validationSchema:{email:o=>!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(o)&&"Invalid email address",password:[o=>!o||o.length<8&&"Password too short",o=>o.search(/[!@#$%^&*]/)<0&&"Password must contain at least one special character"],password2:(o,{password:r})=>o!==r.value&&"Passwords should match"}});return e(P.Fragment,null,e(v,{field:n.email,label:"Email"}),e(v,{field:n.password,label:"Password"}),e(v,{field:n.password2,label:"Repeat password"}))}function xt({field:t,index:n}){const{fields:o}=ge(t,n,{validationSchema:{address:[]}});return e(P.Fragment,null,e(v,{field:o.address,label:"Address"}))}const vt={showcase:a`
    padding-top: 48px;
    padding-bottom: 48px;
    color: #ccc;
  `};function bt(){return e(P.Fragment,null,e(Ue,null),e(Ee,null,e(U,{path:"/",element:e(ht,null)}),e(U,{path:"/guide",element:e(ut,null)}),e(U,{path:"/showcase",element:e(mt,null)}),e(U,{path:"/examples",element:e(rt,null)})),e(Ge,null))}function yt(){return e(h.exports.StrictMode,null,e(Pe,{theme:Le},e(Ie,{styles:_t.global}),e(bt,null)))}const _t={global:a`
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code&family=Overpass:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');

    html,
    body {
      margin: 0;
      font-family: 'Overpass';
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      min-height: 100%;
      background: #2a2631;
    }

    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    ::-webkit-scrollbar-thumb {
      width: 2px;
      height: 2px;
      background: rgba(255, 255, 255, 0.2);
    }

    * {
      box-sizing: border-box;
      scrollbar-width: 2px;
    }
  `};He.hydrate(e(Te,{basename:"/useform/"},e(yt,null)),document.getElementById("root"));
