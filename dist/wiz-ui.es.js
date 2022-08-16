import { defineComponent as p, toRefs as g, onMounted as b } from "vue";
const C = /* @__PURE__ */ p({
  __name: "Button",
  props: {
    logText: null
  },
  setup(o) {
    const e = o, { logText: r } = g(e), a = (s) => {
      s.preventDefault(), console.log("clicked"), console.log(r.value);
    };
    return b(() => {
      console.log("mounted");
    }), { __sfc: !0, props: e, logText: r, handleClick: a };
  }
});
function d(o, e, r, a, s, i, l, v) {
  var n = typeof o == "function" ? o.options : o;
  e && (n.render = e, n.staticRenderFns = r, n._compiled = !0), a && (n.functional = !0), i && (n._scopeId = "data-v-" + i);
  var _;
  if (l ? (_ = function(t) {
    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), s && s.call(this, t), t && t._registeredComponents && t._registeredComponents.add(l);
  }, n._ssrRegister = _) : s && (_ = v ? function() {
    s.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), _)
    if (n.functional) {
      n._injectStyles = _;
      var h = n.render;
      n.render = function(m, c) {
        return _.call(c), h(m, c);
      };
    } else {
      var u = n.beforeCreate;
      n.beforeCreate = u ? [].concat(u, _) : [_];
    }
  return {
    exports: o,
    options: n
  };
}
var $ = function() {
  var e = this, r = e._self._c, a = e._self._setupProxy;
  return r("button", { staticClass: "button", on: { click: a.handleClick } }, [e._v("button")]);
}, y = [], P = /* @__PURE__ */ d(
  C,
  $,
  y,
  !1,
  null,
  "d6d34b2b",
  null,
  null
);
const R = P.exports, w = /* @__PURE__ */ p({
  __name: "Paragraph",
  setup(o) {
    return { __sfc: !0 };
  }
});
var T = function() {
  var e = this, r = e._self._c;
  return e._self._setupProxy, r("p", [e._v("paragraph")]);
}, z = [], k = /* @__PURE__ */ d(
  w,
  T,
  z,
  !1,
  null,
  "7e4bb773",
  null,
  null
);
const B = k.exports, f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WizButton: R,
  WizParagraph: B
}, Symbol.toStringTag, { value: "Module" })), W = (o) => {
  for (const e in f)
    o.component(e, f[e]);
};
typeof window < "u" && window.Vue && W(window.Vue);
export {
  R as WizButton,
  B as WizParagraph,
  W as default
};
