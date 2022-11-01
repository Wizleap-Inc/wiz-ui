import { defineComponent as C, useCssVars as p } from "vue";
const F = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}, v = {
  brand: {
    900: "#3db783",
    800: "#51CB97",
    700: "#66DFAB",
    600: "#70E9C0",
    500: "#7BF2D4",
    400: "#86FCE8",
    300: "#9BFCF3",
    200: "#AFFCF3",
    100: "#C4FBF4",
    50: "#D9FBF4",
    0: "#E4FBF4"
  },
  blue: {
    900: "#1d68a7",
    400: "#66b1ff"
  },
  gradient: {
    900: "linear-gradient(90deg, #3db783 0%, #099ec3 100%)"
  },
  error: {
    900: "#da0076",
    600: "#FCAFCF",
    300: "#FBE4EF"
  },
  mono: {
    900: "#000000",
    800: "#1A1A1A",
    700: "#333333",
    600: "#4D4D4D",
    500: "#666666",
    400: "#808080",
    300: "#999999",
    200: "#B3B3B3",
    100: "#CCCCCC",
    50: "#E6E6E6",
    0: "#FFFFFF"
  },
  transparent: "transparent"
}, b = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  xl2: "1.5rem",
  xl3: "1.75rem",
  xl4: "2rem"
}, E = {
  no: "0",
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
  xl2: "2rem",
  xl3: "2.5rem",
  xl4: "3rem",
  at: "auto"
}, A = {
  color: v,
  spacing: E,
  fontSize: b,
  breakpoint: F
}, B = /* @__PURE__ */ C({
  __name: "Gradient",
  props: {
    disabled: { type: Boolean }
  },
  emits: ["click"],
  setup(o, { emit: n }) {
    const a = o;
    p((d, _) => ({
      cc143878: _.GRADIENT_COLOR
    }));
    const i = () => {
      a.disabled || n("click");
    }, s = A.color.gradient[900];
    return { __sfc: !0, props: a, emit: n, onClick: i, GRADIENT_COLOR: s };
  }
});
function g(o, n, a, i, s, d, _, f) {
  var e = typeof o == "function" ? o.options : o;
  n && (e.render = n, e.staticRenderFns = a, e._compiled = !0), i && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
  var t;
  if (_ ? (t = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), s && s.call(this, r), r && r._registeredComponents && r._registeredComponents.add(_);
  }, e._ssrRegister = t) : s && (t = f ? function() {
    s.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), t)
    if (e.functional) {
      e._injectStyles = t;
      var m = e.render;
      e.render = function(u, c) {
        return t.call(c), m(u, c);
      };
    } else {
      var l = e.beforeCreate;
      e.beforeCreate = l ? [].concat(l, t) : [t];
    }
  return {
    exports: o,
    options: e
  };
}
var h = function() {
  var n = this, a = n._self._c, i = n._self._setupProxy;
  return a("button", { class: {
    "gradient-btn": !0,
    "gradient-btn--disabled": n.disabled
  }, on: { click: i.onClick } }, [n._t("default")], 2);
}, R = [], O = /* @__PURE__ */ g(
  B,
  h,
  R,
  !1,
  null,
  "7f35d9b6",
  null,
  null
);
const D = O.exports, k = "0.1.0";
export {
  A as THEME,
  D as WizGradientButton,
  k as version
};
