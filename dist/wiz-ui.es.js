import { defineComponent as v, onMounted as g } from "vue";
const $ = /* @__PURE__ */ v({
  __name: "Button",
  setup(n) {
    const e = (r) => {
      r.preventDefault(), console.log("clicked");
    };
    return g(() => {
      console.log("mounted");
    }), { __sfc: !0, handleClick: e };
  }
});
function m(n, e, r, l, s, u, f, h) {
  var o = typeof n == "function" ? n.options : n;
  e && (o.render = e, o.staticRenderFns = r, o._compiled = !0), l && (o.functional = !0), u && (o._scopeId = "data-v-" + u);
  var _;
  if (f ? (_ = function(t) {
    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), s && s.call(this, t), t && t._registeredComponents && t._registeredComponents.add(f);
  }, o._ssrRegister = _) : s && (_ = h ? function() {
    s.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), _)
    if (o.functional) {
      o._injectStyles = _;
      var b = o.render;
      o.render = function(C, p) {
        return _.call(p), b(C, p);
      };
    } else {
      var c = o.beforeCreate;
      o.beforeCreate = c ? [].concat(c, _) : [_];
    }
  return {
    exports: n,
    options: o
  };
}
var y = function() {
  var e = this, r = e._self._c, l = e._self._setupProxy;
  return r("button", { staticClass: "button", on: { click: l.handleClick } }, [e._v("button")]);
}, w = [], R = /* @__PURE__ */ m(
  $,
  y,
  w,
  !1,
  null,
  "7eeb8095",
  null,
  null
);
const a = R.exports;
a.install = (n) => {
  n.component(a.name, a);
};
const P = /* @__PURE__ */ v({
  __name: "Paragraph",
  setup(n) {
    return { __sfc: !0 };
  }
});
var k = function() {
  var e = this, r = e._self._c;
  return e._self._setupProxy, r("p", [e._v("paragraph")]);
}, T = [], O = /* @__PURE__ */ m(
  P,
  k,
  T,
  !1,
  null,
  "7e4bb773",
  null,
  null
);
const i = O.exports;
i.install = (n) => {
  n.component(i.name, i);
};
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: a,
  Paragraph: i
}, Symbol.toStringTag, { value: "Module" })), S = (n) => {
  for (const e in d)
    n.component(e, d[e]);
};
typeof window < "u" && window.Vue && S(window.Vue);
export {
  a as Button,
  i as Paragraph,
  S as default
};
