!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";function o(e,t){var n,o,r,i,l=O;for(i=arguments.length;i-- >2;)M.push(arguments[i]);for(t&&null!=t.children&&(M.length||M.push(t.children),delete t.children);M.length;)if((o=M.pop())&&void 0!==o.pop)for(i=o.length;i--;)M.push(o[i]);else"boolean"==typeof o&&(o=null),(r="function"!=typeof e)&&(null==o?o="":"number"==typeof o?o=String(o):"string"!=typeof o&&(r=!1)),r&&n?l[l.length-1]+=o:l===O?l=[o]:l.push(o),n=r;var a=new function(){};return a.nodeName=e,a.children=l,a.attributes=null==t?void 0:t,a.key=null==t?void 0:t.key,void 0!==P.vnode&&P.vnode(a),a}function r(e,t){for(var n in t)e[n]=t[n];return e}function i(e,t){return o(e.nodeName,r(r({},e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}function l(e){!e._dirty&&(e._dirty=!0)&&1==j.push(e)&&(P.debounceRendering||U)(a)}function a(){var e,t=j;for(j=[];e=t.pop();)e._dirty&&x(e)}function u(e,t,n){return"string"==typeof t||"number"==typeof t?void 0!==e.splitText:"string"==typeof t.nodeName?!e._componentConstructor&&p(e,t.nodeName):n||e._componentConstructor===t.nodeName}function p(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function c(e){var t=r({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function s(e){var t=e.parentNode;t&&t.removeChild(e)}function f(e,t,n,o,r){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)n&&n(null),o&&o(e);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof n||(e.style.cssText=o||""),o&&"object"===(void 0===o?"undefined":S(o))){if("string"!=typeof n)for(var i in n)i in o||(e.style[i]="");for(var i in o)e.style[i]="number"==typeof o[i]&&!1===T.test(i)?o[i]+"px":o[i]}}else if("dangerouslySetInnerHTML"===t)o&&(e.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1]){var l=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),o?n||e.addEventListener(t,d,l):e.removeEventListener(t,d,l),(e._listeners||(e._listeners={}))[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e)!function(e,t,n){try{e[t]=n}catch(e){}}(e,t,null==o?"":o),null!=o&&!1!==o||e.removeAttribute(t);else{var a=r&&t!==(t=t.replace(/^xlink\:?/,""));null==o||!1===o?a?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof o&&(a?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):e.setAttribute(t,o))}else e.className=o||""}function d(e){return this._listeners[e.type](P.event&&P.event(e)||e)}function _(){for(var e;e=E.pop();)P.afterMount&&P.afterMount(e),e.componentDidMount&&e.componentDidMount()}function v(e,t,n,o,r,i){L++||(B=null!=r&&void 0!==r.ownerSVGElement,W=null!=e&&!("__preactattr_"in e));var l=m(e,t,n,o,i);return r&&l.parentNode!==r&&r.appendChild(l),--L||(W=!1,i||_()),l}function m(e,t,n,o,r){var i=e,l=B;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||r)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),h(e,!0))),i.__preactattr_=!0,i;var a=t.nodeName;if("function"==typeof a)return function(e,t,n,o){var r=e&&e._component,i=r,l=e,a=r&&e._componentConstructor===t.nodeName,u=a,p=c(t);for(;r&&!u&&(r=r._parentComponent);)u=r.constructor===t.nodeName;r&&u&&(!o||r._component)?(g(r,p,3,n,o),e=r.base):(i&&!a&&(w(i),e=l=null),r=b(t.nodeName,p,n),e&&!r.nextBase&&(r.nextBase=e,l=null),g(r,p,1,n,o),e=r.base,l&&e!==l&&(l._component=null,h(l,!1)));return e}(e,t,n,o);if(B="svg"===a||"foreignObject"!==a&&B,a=String(a),(!e||!p(e,a))&&(i=function(e,t){var n=t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e);return n.normalizedNodeName=e,n}(a,B),e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),h(e,!0)}var d=i.firstChild,_=i.__preactattr_,v=t.children;if(null==_){_=i.__preactattr_={};for(var y=i.attributes,C=y.length;C--;)_[y[C].name]=y[C].value}return!W&&v&&1===v.length&&"string"==typeof v[0]&&null!=d&&void 0!==d.splitText&&null==d.nextSibling?d.nodeValue!=v[0]&&(d.nodeValue=v[0]):(v&&v.length||null!=d)&&function(e,t,n,o,r){var i,l,a,p,c,f=e.childNodes,d=[],_={},v=0,y=0,b=f.length,C=0,g=t?t.length:0;if(0!==b)for(var x=0;x<b;x++){var w=f[x],N=w.__preactattr_,k=g&&N?w._component?w._component.__key:N.key:null;null!=k?(v++,_[k]=w):(N||(void 0!==w.splitText?!r||w.nodeValue.trim():r))&&(d[C++]=w)}if(0!==g)for(var x=0;x<g;x++){p=t[x],c=null;var k=p.key;if(null!=k)v&&void 0!==_[k]&&(c=_[k],_[k]=void 0,v--);else if(!c&&y<C)for(i=y;i<C;i++)if(void 0!==d[i]&&u(l=d[i],p,r)){c=l,d[i]=void 0,i===C-1&&C--,i===y&&y++;break}c=m(c,p,n,o),a=f[x],c&&c!==e&&c!==a&&(null==a?e.appendChild(c):c===a.nextSibling?s(a):e.insertBefore(c,a))}if(v)for(var x in _)void 0!==_[x]&&h(_[x],!1);for(;y<=C;)void 0!==(c=d[C--])&&h(c,!1)}(i,v,n,o,W||null!=_.dangerouslySetInnerHTML),function(e,t,n){var o;for(o in n)t&&null!=t[o]||null==n[o]||f(e,o,n[o],n[o]=void 0,B);for(o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||f(e,o,n[o],n[o]=t[o],B)}(i,t.attributes,_),B=l,i}function h(e,t){var n=e._component;n?w(n):(null!=e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),!1!==t&&null!=e.__preactattr_||s(e),y(e))}function y(e){for(e=e.lastChild;e;){var t=e.previousSibling;h(e,!0),e=t}}function b(e,t,n){var o,r=V[e.name];if(e.prototype&&e.prototype.render?(o=new e(t,n),N.call(o,t,n)):((o=new N(t,n)).constructor=e,o.render=C),r)for(var i=r.length;i--;)if(r[i].constructor===e){o.nextBase=r[i].nextBase,r.splice(i,1);break}return o}function C(e,t,n){return this.constructor(e,n)}function g(e,t,n,o,r){e._disable||(e._disable=!0,(e.__ref=t.ref)&&delete t.ref,(e.__key=t.key)&&delete t.key,!e.base||r?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,o),o&&o!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=o),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&!1===P.syncComponentUpdates&&e.base?l(e):x(e,1,r)),e.__ref&&e.__ref(e))}function x(e,t,n,o){if(!e._disable){var i,l,a,u=e.props,p=e.state,s=e.context,f=e.prevProps||u,d=e.prevState||p,m=e.prevContext||s,y=e.base,C=e.nextBase,N=y||C,k=e._component,S=!1;if(y&&(e.props=f,e.state=d,e.context=m,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(u,p,s)?S=!0:e.componentWillUpdate&&e.componentWillUpdate(u,p,s),e.props=u,e.state=p,e.context=s),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!S){i=e.render(u,p,s),e.getChildContext&&(s=r(r({},s),e.getChildContext()));var M,O,U=i&&i.nodeName;if("function"==typeof U){var T=c(i);(l=k)&&l.constructor===U&&T.key==l.__key?g(l,T,1,s,!1):(M=l,e._component=l=b(U,T,s),l.nextBase=l.nextBase||C,l._parentComponent=e,g(l,T,0,s,!1),x(l,1,n,!0)),O=l.base}else a=N,(M=k)&&(a=e._component=null),(N||1===t)&&(a&&(a._component=null),O=v(a,i,s,n||!y,N&&N.parentNode,!0));if(N&&O!==N&&l!==k){var j=N.parentNode;j&&O!==j&&(j.replaceChild(O,N),M||(N._component=null,h(N,!1)))}if(M&&w(M),e.base=O,O&&!o){for(var B=e,W=e;W=W._parentComponent;)(B=W).base=O;O._component=B,O._componentConstructor=B.constructor}}if(!y||n?E.unshift(e):S||(e.componentDidUpdate&&e.componentDidUpdate(f,d,m),P.afterUpdate&&P.afterUpdate(e)),null!=e._renderCallbacks)for(;e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);L||o||_()}}function w(e){P.beforeUnmount&&P.beforeUnmount(e);var t=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?w(n):t&&(t.__preactattr_&&t.__preactattr_.ref&&t.__preactattr_.ref(null),e.nextBase=t,s(t),function(e){var t=e.constructor.name;(V[t]||(V[t]=[])).push(e)}(e),y(t)),e.__ref&&e.__ref(null)}function N(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{}}function k(e,t,n){return v(n,e,{},!1,t,!1)}Object.defineProperty(t,"__esModule",{value:!0});var S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P={},M=[],O=[],U="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,T=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,j=[],E=[],L=0,B=!1,W=!1,V={};r(N.prototype,{setState:function(e,t){var n=this.state;this.prevState||(this.prevState=r({},n)),r(n,"function"==typeof e?e(n,this.props):e),t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),l(this)},forceUpdate:function(e){e&&(this._renderCallbacks=this._renderCallbacks||[]).push(e),x(this,2)},render:function(){}});var A={h:o,createElement:o,cloneElement:i,Component:N,render:k,rerender:a,options:P};t.h=o,t.createElement=o,t.cloneElement=i,t.Component=N,t.render=k,t.rerender=a,t.options=P,t.default=A},function(e,t,n){"use strict";var o=n(0),r=function(e){return e&&e.__esModule?e:{default:e}}(n(2));(0,o.render)((0,o.h)(r.default,null),document.body)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n(0),i=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),o(t,[{key:"render",value:function(){return(0,r.h)("span",null,"Hello World")}}]),t}();t.default=i}]);