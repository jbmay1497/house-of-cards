function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function r(){return Object.create(null)}function o(t){t.forEach(n)}function s(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,n,r,o){return t[1]&&o?e(r.ctx.slice(),t[1](o(n))):r.ctx}function i(t,e){t.appendChild(e)}function l(t,e,n){t.insertBefore(e,n||null)}function u(t){t.parentNode.removeChild(t)}function f(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function p(t){return document.createElement(t)}function h(t){return document.createTextNode(t)}function d(){return h(" ")}function m(){return h("")}function g(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function $(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function y(t){return Array.from(t.childNodes)}function v(t,e,n,r){for(let r=0;r<t.length;r+=1){const o=t[r];if(o.nodeName===e){let e=0;for(;e<o.attributes.length;){const t=o.attributes[e];n[t.name]?e++:o.removeAttribute(t.name)}return t.splice(r,1)[0]}}return r?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(e):p(e)}function b(t,e){for(let n=0;n<t.length;n+=1){const r=t[n];if(3===r.nodeType)return r.data=""+e,t.splice(n,1)[0]}return h(e)}function _(t){return b(t," ")}function E(t,e){e=""+e,t.data!==e&&(t.data=e)}function w(t,e,n){t.classList[n?"add":"remove"](e)}function x(t,e=document.body){return Array.from(e.querySelectorAll(t))}let S;function A(t){S=t}function P(t,e){(function(){if(!S)throw new Error("Function called outside component initialization");return S})().$$.context.set(t,e)}const R=[],L=[],j=[],C=[],N=Promise.resolve();let k=!1;function q(t){j.push(t)}const O=new Set;function U(){do{for(;R.length;){const t=R.shift();A(t),I(t.$$)}for(;L.length;)L.pop()();for(let t=0;t<j.length;t+=1){const e=j[t];O.has(e)||(O.add(e),e())}j.length=0}while(R.length);for(;C.length;)C.pop()();k=!1,O.clear()}function I(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(q)}}const D=new Set;let H;function T(){H={r:0,c:[],p:H}}function B(){H.r||o(H.c),H=H.p}function J(t,e){t&&t.i&&(D.delete(t),t.i(e))}function V(t,e,n,r){if(t&&t.o){if(D.has(t))return;D.add(t),H.c.push(()=>{D.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}function K(t,e){const n={},r={},o={$$scope:1};let s=t.length;for(;s--;){const a=t[s],c=e[s];if(c){for(const t in a)t in c||(r[t]=1);for(const t in c)o[t]||(n[t]=c[t],o[t]=1);t[s]=c}else for(const t in a)o[t]=1}for(const t in r)t in n||(n[t]=void 0);return n}function M(t){return"object"==typeof t&&null!==t?t:{}}function z(t){t&&t.c()}function F(t,e){t&&t.l(e)}function G(t,e,r){const{fragment:a,on_mount:c,on_destroy:i,after_update:l}=t.$$;a&&a.m(e,r),q(()=>{const e=c.map(n).filter(s);i?i.push(...e):o(e),t.$$.on_mount=[]}),l.forEach(q)}function W(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function X(t,e){-1===t.$$.dirty[0]&&(R.push(t),k||(k=!0,N.then(U)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(e,n,s,a,c,i,l=[-1]){const u=S;A(e);const f=n.props||{},p=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:c,bound:r(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:r(),dirty:l};let h=!1;p.ctx=s?s(e,f,(t,n,...r)=>{const o=r.length?r[0]:n;return p.ctx&&c(p.ctx[t],p.ctx[t]=o)&&(p.bound[t]&&p.bound[t](o),h&&X(e,t)),n}):[],p.update(),h=!0,o(p.before_update),p.fragment=!!a&&a(p.ctx),n.target&&(n.hydrate?p.fragment&&p.fragment.l(y(n.target)):p.fragment&&p.fragment.c(),n.intro&&J(e.$$.fragment),G(e,n.target,n.anchor),U()),A(u)}class Q{$destroy(){W(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const Z=[];function tt(e,n=t){let r;const o=[];function s(t){if(a(e,t)&&(e=t,r)){const t=!Z.length;for(let t=0;t<o.length;t+=1){const n=o[t];n[1](),Z.push(n,e)}if(t){for(let t=0;t<Z.length;t+=2)Z[t][0](Z[t+1]);Z.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(a,c=t){const i=[a,c];return o.push(i),1===o.length&&(r=n(s)||t),a(e),()=>{const t=o.indexOf(i);-1!==t&&o.splice(t,1),0===o.length&&(r(),r=null)}}}}const et={},nt=()=>({});function rt(e){let n,r,o,s,a;return{c(){n=p("nav"),r=p("ul"),o=p("li"),s=p("a"),a=h("home"),this.h()},l(t){n=v(t,"NAV",{class:!0});var e=y(n);r=v(e,"UL",{class:!0});var c=y(r);o=v(c,"LI",{class:!0});var i=y(o);s=v(i,"A",{href:!0,class:!0});var l=y(s);a=b(l,"home"),l.forEach(u),i.forEach(u),c.forEach(u),e.forEach(u),this.h()},h(){$(s,"href","."),$(s,"class","svelte-11kwxiv"),w(s,"selected",void 0===e[0]),$(o,"class","svelte-11kwxiv"),$(r,"class","svelte-11kwxiv"),$(n,"class","svelte-11kwxiv")},m(t,e){l(t,n,e),i(n,r),i(r,o),i(o,s),i(s,a)},p(t,[e]){1&e&&w(s,"selected",void 0===t[0])},i:t,o:t,d(t){t&&u(n)}}}function ot(t,e,n){let{segment:r}=e;return t.$set=t=>{"segment"in t&&n(0,r=t.segment)},[r]}class st extends Q{constructor(t){super(),Y(this,t,ot,rt,a,{segment:0})}}function at(t){let e,n,r;const o=new st({props:{segment:t[0]}}),s=t[2].default,a=function(t,e,n,r){if(t){const o=c(t,e,n,r);return t[0](o)}}(s,t,t[1],null);return{c(){z(o.$$.fragment),e=d(),n=p("main"),a&&a.c(),this.h()},l(t){F(o.$$.fragment,t),e=_(t),n=v(t,"MAIN",{class:!0});var r=y(n);a&&a.l(r),r.forEach(u),this.h()},h(){$(n,"class","svelte-1uhnsl8")},m(t,s){G(o,t,s),l(t,e,s),l(t,n,s),a&&a.m(n,null),r=!0},p(t,[e]){const n={};1&e&&(n.segment=t[0]),o.$set(n),a&&a.p&&2&e&&a.p(c(s,t,t[1],null),function(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if("object"==typeof e.dirty){const t=[],n=Math.max(e.dirty.length,o.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|o[r];return t}return e.dirty|o}return e.dirty}(s,t[1],e,null))},i(t){r||(J(o.$$.fragment,t),J(a,t),r=!0)},o(t){V(o.$$.fragment,t),V(a,t),r=!1},d(t){W(o,t),t&&u(e),t&&u(n),a&&a.d(t)}}}function ct(t,e,n){let{segment:r}=e,{$$slots:o={},$$scope:s}=e;return t.$set=t=>{"segment"in t&&n(0,r=t.segment),"$$scope"in t&&n(1,s=t.$$scope)},[r,s,o]}class it extends Q{constructor(t){super(),Y(this,t,ct,at,a,{segment:0})}}function lt(t){let e,n,r=t[1].stack+"";return{c(){e=p("pre"),n=h(r)},l(t){e=v(t,"PRE",{});var o=y(e);n=b(o,r),o.forEach(u)},m(t,r){l(t,e,r),i(e,n)},p(t,e){2&e&&r!==(r=t[1].stack+"")&&E(n,r)},d(t){t&&u(e)}}}function ut(e){let n,r,o,s,a,c,f,g,w,S=e[1].message+"";document.title=n=e[0];let A=e[2]&&e[1].stack&&lt(e);return{c(){r=d(),o=p("h1"),s=h(e[0]),a=d(),c=p("p"),f=h(S),g=d(),A&&A.c(),w=m(),this.h()},l(t){x('[data-svelte="svelte-1o9r2ue"]',document.head).forEach(u),r=_(t),o=v(t,"H1",{class:!0});var n=y(o);s=b(n,e[0]),n.forEach(u),a=_(t),c=v(t,"P",{class:!0});var i=y(c);f=b(i,S),i.forEach(u),g=_(t),A&&A.l(t),w=m(),this.h()},h(){$(o,"class","svelte-8od9u6"),$(c,"class","svelte-8od9u6")},m(t,e){l(t,r,e),l(t,o,e),i(o,s),l(t,a,e),l(t,c,e),i(c,f),l(t,g,e),A&&A.m(t,e),l(t,w,e)},p(t,[e]){1&e&&n!==(n=t[0])&&(document.title=n),1&e&&E(s,t[0]),2&e&&S!==(S=t[1].message+"")&&E(f,S),t[2]&&t[1].stack?A?A.p(t,e):(A=lt(t),A.c(),A.m(w.parentNode,w)):A&&(A.d(1),A=null)},i:t,o:t,d(t){t&&u(r),t&&u(o),t&&u(a),t&&u(c),t&&u(g),A&&A.d(t),t&&u(w)}}}function ft(t,e,n){let{status:r}=e,{error:o}=e;return t.$set=t=>{"status"in t&&n(0,r=t.status),"error"in t&&n(1,o=t.error)},[r,o,!1]}class pt extends Q{constructor(t){super(),Y(this,t,ft,ut,a,{status:0,error:1})}}function ht(t){let n,r;const o=[t[4].props];var s=t[4].component;function a(t){let n={};for(let t=0;t<o.length;t+=1)n=e(n,o[t]);return{props:n}}if(s)var c=new s(a());return{c(){c&&z(c.$$.fragment),n=m()},l(t){c&&F(c.$$.fragment,t),n=m()},m(t,e){c&&G(c,t,e),l(t,n,e),r=!0},p(t,e){const r=16&e?K(o,[M(t[4].props)]):{};if(s!==(s=t[4].component)){if(c){T();const t=c;V(t.$$.fragment,1,0,()=>{W(t,1)}),B()}s?(z((c=new s(a())).$$.fragment),J(c.$$.fragment,1),G(c,n.parentNode,n)):c=null}else s&&c.$set(r)},i(t){r||(c&&J(c.$$.fragment,t),r=!0)},o(t){c&&V(c.$$.fragment,t),r=!1},d(t){t&&u(n),c&&W(c,t)}}}function dt(t){let e;const n=new pt({props:{error:t[0],status:t[1]}});return{c(){z(n.$$.fragment)},l(t){F(n.$$.fragment,t)},m(t,r){G(n,t,r),e=!0},p(t,e){const r={};1&e&&(r.error=t[0]),2&e&&(r.status=t[1]),n.$set(r)},i(t){e||(J(n.$$.fragment,t),e=!0)},o(t){V(n.$$.fragment,t),e=!1},d(t){W(n,t)}}}function mt(t){let e,n,r,o;const s=[dt,ht],a=[];function c(t,e){return t[0]?0:1}return e=c(t),n=a[e]=s[e](t),{c(){n.c(),r=m()},l(t){n.l(t),r=m()},m(t,n){a[e].m(t,n),l(t,r,n),o=!0},p(t,o){let i=e;e=c(t),e===i?a[e].p(t,o):(T(),V(a[i],1,1,()=>{a[i]=null}),B(),n=a[e],n||(n=a[e]=s[e](t),n.c()),J(n,1),n.m(r.parentNode,r))},i(t){o||(J(n),o=!0)},o(t){V(n),o=!1},d(t){a[e].d(t),t&&u(r)}}}function gt(t){let n;const r=[{segment:t[2][0]},t[3].props];let o={$$slots:{default:[mt]},$$scope:{ctx:t}};for(let t=0;t<r.length;t+=1)o=e(o,r[t]);const s=new it({props:o});return{c(){z(s.$$.fragment)},l(t){F(s.$$.fragment,t)},m(t,e){G(s,t,e),n=!0},p(t,[e]){const n=12&e?K(r,[4&e&&{segment:t[2][0]},8&e&&M(t[3].props)]):{};83&e&&(n.$$scope={dirty:e,ctx:t}),s.$set(n)},i(t){n||(J(s.$$.fragment,t),n=!0)},o(t){V(s.$$.fragment,t),n=!1},d(t){W(s,t)}}}function $t(t,e,n){let{stores:r}=e,{error:o}=e,{status:s}=e,{segments:a}=e,{level0:c}=e,{level1:i=null}=e;return P(et,r),t.$set=t=>{"stores"in t&&n(5,r=t.stores),"error"in t&&n(0,o=t.error),"status"in t&&n(1,s=t.status),"segments"in t&&n(2,a=t.segments),"level0"in t&&n(3,c=t.level0),"level1"in t&&n(4,i=t.level1)},[o,s,a,c,i,r]}class yt extends Q{constructor(t){super(),Y(this,t,$t,gt,a,{stores:5,error:0,status:1,segments:2,level0:3,level1:4})}}const vt=[/^\/blog.json$/,/^\/blog\/([^\/]+?).json$/],bt=[{js:()=>import("./index.386200c6.js"),css:["index.386200c6.css","client.5703ed42.css"]},{js:()=>import("./about.9054802a.js"),css:["client.5703ed42.css"]},{js:()=>import("./index.1e8a03b4.js"),css:["index.1e8a03b4.css","client.5703ed42.css"]},{js:()=>import("./[slug].05f37ae6.js"),css:["[slug].05f37ae6.css","client.5703ed42.css"]}],_t=(Et=decodeURIComponent,[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/about\/?$/,parts:[{i:1}]},{pattern:/^\/blog\/?$/,parts:[{i:2}]},{pattern:/^\/blog\/([^\/]+?)\/?$/,parts:[null,{i:3,params:t=>({slug:Et(t[1])})}]}]);var Et;const wt="undefined"!=typeof __SAPPER__&&__SAPPER__;let xt,St,At,Pt=!1,Rt=[],Lt="{}";const jt={page:tt({}),preloading:tt(null),session:tt(wt&&wt.session)};let Ct,Nt;jt.session.subscribe(async t=>{if(Ct=t,!Pt)return;Nt=!0;const e=Tt(new URL(location.href)),n=St={},{redirect:r,props:o,branch:s}=await Kt(e);n===St&&await Vt(r,s,o,e.page)});let kt,qt=null;let Ot,Ut=1;const It="undefined"!=typeof history?history:{pushState:(t,e,n)=>{},replaceState:(t,e,n)=>{},scrollRestoration:""},Dt={};function Ht(t){const e=Object.create(null);return t.length>0&&t.slice(1).split("&").forEach(t=>{let[,n,r=""]=/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(t.replace(/\+/g," ")));"string"==typeof e[n]&&(e[n]=[e[n]]),"object"==typeof e[n]?e[n].push(r):e[n]=r}),e}function Tt(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(wt.baseUrl))return null;let e=t.pathname.slice(wt.baseUrl.length);if(""===e&&(e="/"),!vt.some(t=>t.test(e)))for(let n=0;n<_t.length;n+=1){const r=_t[n],o=r.pattern.exec(e);if(o){const n=Ht(t.search),s=r.parts[r.parts.length-1],a=s.params?s.params(o):{},c={host:location.host,path:e,query:n,params:a};return{href:t.href,route:r,match:o,page:c}}}}function Bt(){return{x:pageXOffset,y:pageYOffset}}async function Jt(t,e,n,r){if(e)Ot=e;else{const t=Bt();Dt[Ot]=t,e=Ot=++Ut,Dt[Ot]=n?t:{x:0,y:0}}Ot=e,xt&&jt.preloading.set(!0);const o=qt&&qt.href===t.href?qt.promise:Kt(t);qt=null;const s=St={},{redirect:a,props:c,branch:i}=await o;if(s===St&&(await Vt(a,i,c,t.page),document.activeElement&&document.activeElement.blur(),!n)){let t=Dt[e];if(r){const e=document.getElementById(r.slice(1));e&&(t={x:0,y:e.getBoundingClientRect().top})}Dt[Ot]=t,t&&scrollTo(t.x,t.y)}}async function Vt(t,e,n,r){if(t)return function(t,e={replaceState:!1}){const n=Tt(new URL(t,document.baseURI));return n?(It[e.replaceState?"replaceState":"pushState"]({id:Ot},"",t),Jt(n,null).then(()=>{})):(location.href=t,new Promise(t=>{}))}(t.location,{replaceState:!0});if(jt.page.set(r),jt.preloading.set(!1),xt)xt.$set(n);else{n.stores={page:{subscribe:jt.page.subscribe},preloading:{subscribe:jt.preloading.subscribe},session:jt.session},n.level0={props:await At};const t=document.querySelector("#sapper-head-start"),e=document.querySelector("#sapper-head-end");if(t&&e){for(;t.nextSibling!==e;)zt(t.nextSibling);zt(t),zt(e)}xt=new yt({target:kt,props:n,hydrate:!0})}Rt=e,Lt=JSON.stringify(r.query),Pt=!0,Nt=!1}async function Kt(t){const{route:e,page:n}=t,r=n.path.split("/").filter(Boolean);let o=null;const s={error:null,status:200,segments:[r[0]]},a={fetch:(t,e)=>fetch(t,e),redirect:(t,e)=>{if(o&&(o.statusCode!==t||o.location!==e))throw new Error("Conflicting redirects");o={statusCode:t,location:e}},error:(t,e)=>{s.error="string"==typeof e?new Error(e):e,s.status=t}};let c;At||(At=wt.preloaded[0]||nt.call(a,{host:n.host,path:n.path,query:n.query,params:{}},Ct));let i=1;try{const o=JSON.stringify(n.query),l=e.pattern.exec(n.path);let u=!1;c=await Promise.all(e.parts.map(async(e,c)=>{const f=r[c];if(function(t,e,n,r){if(r!==Lt)return!0;const o=Rt[t];return!!o&&(e!==o.segment||(!(!o.match||JSON.stringify(o.match.slice(1,t+2))===JSON.stringify(n.slice(1,t+2)))||void 0))}(c,f,l,o)&&(u=!0),s.segments[i]=r[c+1],!e)return{segment:f};const p=i++;if(!Nt&&!u&&Rt[c]&&Rt[c].part===e.i)return Rt[c];u=!1;const{default:h,preload:d}=await function(t){const e="string"==typeof t.css?[]:t.css.map(Mt);return e.unshift(t.js()),Promise.all(e).then(t=>t[0])}(bt[e.i]);let m;return m=Pt||!wt.preloaded[c+1]?d?await d.call(a,{host:n.host,path:n.path,query:n.query,params:e.params?e.params(t.match):{}},Ct):{}:wt.preloaded[c+1],s[`level${p}`]={component:h,props:m,segment:f,match:l,part:e.i}}))}catch(t){s.error=t,s.status=500,c=[]}return{redirect:o,props:s,branch:c}}function Mt(t){const e=`client/${t}`;if(!document.querySelector(`link[href="${e}"]`))return new Promise((t,n)=>{const r=document.createElement("link");r.rel="stylesheet",r.href=e,r.onload=()=>t(),r.onerror=n,document.head.appendChild(r)})}function zt(t){t.parentNode.removeChild(t)}function Ft(t){const e=Tt(new URL(t,document.baseURI));if(e)return qt&&t===qt.href||function(t,e){qt={href:t,promise:e}}(t,Kt(e)),qt.promise}let Gt;function Wt(t){clearTimeout(Gt),Gt=setTimeout(()=>{Xt(t)},20)}function Xt(t){const e=Qt(t.target);e&&"prefetch"===e.rel&&Ft(e.href)}function Yt(t){if(1!==function(t){return null===t.which?t.button:t.which}(t))return;if(t.metaKey||t.ctrlKey||t.shiftKey)return;if(t.defaultPrevented)return;const e=Qt(t.target);if(!e)return;if(!e.href)return;const n="object"==typeof e.href&&"SVGAnimatedString"===e.href.constructor.name,r=String(n?e.href.baseVal:e.href);if(r===location.href)return void(location.hash||t.preventDefault());if(e.hasAttribute("download")||"external"===e.getAttribute("rel"))return;if(n?e.target.baseVal:e.target)return;const o=new URL(r);if(o.pathname===location.pathname&&o.search===location.search)return;const s=Tt(o);if(s){Jt(s,null,e.hasAttribute("sapper-noscroll"),o.hash),t.preventDefault(),It.pushState({id:Ot},"",o.href)}}function Qt(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}function Zt(t){if(Dt[Ot]=Bt(),t.state){const e=Tt(new URL(location.href));e?Jt(e,t.state.id):location.href=location.href}else Ut=Ut+1,function(t){Ot=t}(Ut),It.replaceState({id:Ot},"",location.href)}var te;te={target:document.querySelector("#sapper")},"scrollRestoration"in It&&(It.scrollRestoration="manual"),function(t){kt=t}(te.target),addEventListener("click",Yt),addEventListener("popstate",Zt),addEventListener("touchstart",Xt),addEventListener("mousemove",Wt),Promise.resolve().then(()=>{const{hash:t,href:e}=location;It.replaceState({id:Ut},"",e);const n=new URL(location.href);if(wt.error)return function(t){const{host:e,pathname:n,search:r}=location,{session:o,preloaded:s,status:a,error:c}=wt;At||(At=s&&s[0]),Vt(null,[],{error:c,status:a,session:o,level0:{props:At},level1:{props:{status:a,error:c},component:pt},segments:s},{host:e,path:n,query:Ht(r),params:{}})}();const r=Tt(n);return r?Jt(r,Ut,!0,t):void 0});export{Q as S,d as a,v as b,_ as c,u as d,p as e,y as f,b as g,$ as h,Y as i,l as j,i as k,g as l,E as m,t as n,f as o,x as q,o as r,a as s,h as t};
