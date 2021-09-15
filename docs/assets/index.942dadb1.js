var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,l=(t,r,i)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[r]=i,s=(e,t)=>{for(var r in t||(t={}))a.call(t,r)&&l(e,r,t[r]);if(i)for(var r of i(t))o.call(t,r)&&l(e,r,t[r]);return e},n=(e,i)=>t(e,r(i));import{c,j as d,m as p,R as f,a as h,b as u,r as m,G as g,d as y,B as v}from"./vendor.df2115e3.js";function b({children:e,className:t}){return d("div",{css:x.container,className:t},e)}!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const x={container:c`
    max-width: 920px;
    margin: 0 auto;
    padding: 0 16px;
  `};function _({className:e}){return d("div",{className:e},d("svg",{viewBox:"0 0 16.93 16.93"},d("defs",null,d("linearGradient",{id:"a"},d("stop",{offset:"0",stopColor:"#8983d9"}),d("stop",{offset:"1",stopColor:"#a19aff"})),d("linearGradient",{id:"b"},d("stop",{offset:"0",stopColor:"#a19aff"}),d("stop",{offset:".5",stopColor:"#a19aff"}),d("stop",{offset:"1",stopColor:"#918beb"})),d("linearGradient",{id:"d",x1:"15.44",x2:"20.64",y1:"3.95",y2:"3.95",gradientTransform:"matrix(1.06875 0 0 1.425 2.28 -1.12)",gradientUnits:"userSpaceOnUse",xlinkHref:"#a"}),d("linearGradient",{id:"c",x1:"0",x2:"17.54",y1:"20.35",y2:"20.35",gradientTransform:"translate(7.94 2.65) scale(.37703)",gradientUnits:"userSpaceOnUse",xlinkHref:"#b"}),d("linearGradient",{id:"e",x1:"15.33",x2:"19.98",y1:"4.06",y2:"4.06",gradientTransform:"matrix(.855 0 0 1.425 5.68 4.53)",gradientUnits:"userSpaceOnUse",xlinkHref:"#a"}),d("path",{id:"p1",d:"M7.94 2.65v14.81h6.61v-4.23h-2.9V2.65z"}),d("path",{id:"p2",d:"M6.88 0v3.7h3.7V0zm3.7 5.82h-3.7v9h3.7z"}),d("path",{id:"p3",d:"M18.79 2.65h5.55v3.7H18.8z"}),d("path",{id:"p4",d:"M18.79 8.47h3.96v3.7H18.8z"}),d("clipPath",{id:"cp1"},d("use",{xlinkHref:"#p1",style:{overflow:"visible"}})),d("clipPath",{id:"cp2"},d("use",{xlinkHref:"#p2",style:{overflow:"visible"}})),d("clipPath",{id:"cp3"},d("use",{xlinkHref:"#p3",style:{overflow:"visible"}})),d("clipPath",{id:"cp4"},d("use",{xlinkHref:"#p4",style:{overflow:"visible"}}))),d("g",null,d(p.path,n(s({},k(0)),{clipPath:"url(#cp1)",fill:"url(#c)",d:"M7.94 2.65v14.81h6.61v-4.23h-2.9V2.65z",transform:"translate(-7.94 -2.65)"})),d(p.path,n(s({},k(1)),{clipPath:"url(#cp2)",fill:"#a19aff",d:"M6.88 0v3.7h3.7V0zm3.7 5.82h-3.7v9h3.7z"})),d(p.path,n(s({},k(2)),{clipPath:"url(#cp3)",fill:"url(#d)",d:"M18.79 2.65h5.55v3.7H18.8z",transform:"translate(-7.94 -2.65)"})),d(p.path,n(s({},k(3)),{clipPath:"url(#cp4)",fill:"url(#e)",d:"M18.79 8.47h3.96v3.7H18.8z",transform:"translate(-7.94 -2.65)"})))))}const k=e=>({strokeOpacity:0,fillOpacity:0,animate:{pathLength:[0,1,1],fillOpacity:[0,.4,1],strokeOpacity:[1,1,0],transition:{duration:6,delay:.5*e}},strokeWidth:".3",stroke:"#cac6ff"});function w(){return d("div",{css:O.benefits},[{label:"Small bundle size",value:"Size matters. Only 5 KB (and 2 KB gzipped)."},{label:"Written in TypeScript",value:"Best experience among libraries for forms."},{label:"Simple",value:"Simplest API."}].map(((e,t)=>d("div",{key:t,css:O.item},d("div",{css:O.item__label},e.label),d("div",{css:O.item__value},e.value)))))}const O={benefits:c`
    display: flex;
    margin: 0 auto;
  `,item:c``,item__label:c``,item__value:c``};function z(){return d("div",null,d(_,{css:P.logo}),d("div",{css:P.intro},d("div",{css:P.home__prefix},"@mc-petry/"),d("div",{css:P.home__use},d("div",{css:P.home__colored},"u"),"se",d("div",{css:P.home__colored},"f"),"orm")),d(w,null))}const P={logo:c`
    width: 192px;
    height: 192px;
    margin: 100px auto;
  `,intro:c`
    max-width: 600px;
    /* padding: 100px 0; */
    margin: 0 auto;
    color: #ddd;
    font-size: 32px;
    text-align: center;
  `,home__use:c`
    display: inline;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 28px;
  `,home__prefix:c`
    display: inline;
    color: #594e6a;
  `,home__colored:c`
    display: inline;
    /* color: #a19aff; */
  `,content:c`
    color: #eee;
    max-width: 1000px;
    margin: 0 auto;
  `};function H(){return d(f.Fragment,null,d("header",{css:S.header},d(b,{css:S.header__container},d(_,{css:S.header__logo}),d("div",{css:S.header__links},d("a",{css:S.header__link,href:"#"},"Guide"),d("a",{css:S.header__link,href:"https://github.com/mc-petry/useform"},"Github")))),d(h,null,d(u,{path:"/",element:d(z,null)})))}const S={header:c`
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    color: #fff;
  `,header__container:c`
    display: flex;
    align-items: center;
    height: 60px;
  `,header__logo:c`
    width: 32px;
    height: 32px;
  `,header__links:c`
    display: flex;
    margin: 0 0 0 auto;
  `,header__link:c`
    color: #fff;
  `,header__content:c`
    width: 100%;
  `};function M(){return d(m.exports.StrictMode,null,d(g,{styles:j.global}),d(H,null))}const j={global:c`
    @import url('https://fonts.googleapis.com/css2?family=Overpass:wght@400;700&display=swap');

    html,
    body {
      margin: 0;
      font-family: 'Overpass';
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      min-height: 100%;
      background: #2a2631;
    }

    * {
      box-sizing: border-box;
    }
  `};y.hydrate(d(v,null,d(M,null)),document.getElementById("root"));
