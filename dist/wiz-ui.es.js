import { defineComponent as v, toRefs as b, onMounted as $ } from "vue";
const y = /* @__PURE__ */ v({
  __name: "Button",
  props: {
    logText: null
  },
  setup(n) {
    const e = n, { logText: r } = b(e), a = (s) => {
      s.preventDefault(), console.log("clicked"), console.log(r);
    };
    return $(() => {
      console.log("mounted");
    }), { __sfc: !0, props: e, logText: r, handleClick: a };
  }
});
function m(n, e, r, a, s, u, f, h) {
  var o = typeof n == "function" ? n.options : n;
  e && (o.render = e, o.staticRenderFns = r, o._compiled = !0), a && (o.functional = !0), u && (o._scopeId = "data-v-" + u);
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
      var g = o.render;
      o.render = function(C, p) {
        return _.call(p), g(C, p);
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
var P = function() {
  var e = this, r = e._self._c, a = e._self._setupProxy;
  return r("button", { staticClass: "button", on: { click: a.handleClick } }, [e._v("button")]);
}, R = [], w = /* @__PURE__ */ m(
  y,
  P,
  R,
  !1,
  null,
  "e694243f",
  null,
  null
);
const i = w.exports;
i.install = (n) => {
  n.component(i.name, i);
};
const T = /* @__PURE__ */ v({
  __name: "Paragraph",
  setup(n) {
    return { __sfc: !0 };
  }
});
var z = function() {
  var e = this, r = e._self._c;
  return e._self._setupProxy, r("p", [e._v("paragraph")]);
}, k = [], B = /* @__PURE__ */ m(
  T,
  z,
  k,
  !1,
  null,
  "7e4bb773",
  null,
  null
);
const l = B.exports;
l.install = (n) => {
  n.component(l.name, l);
};
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WizButton: i,
  WizParagraph: l
}, Symbol.toStringTag, { value: "Module" })), W = (n) => {
  for (const e in d)
    n.component(e, d[e]);
};
typeof window < "u" && window.Vue && W(window.Vue);
export {
  i as WizButton,
  l as WizParagraph,
  W as default
};
