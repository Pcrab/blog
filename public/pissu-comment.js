const $e = (e, t) => e === t,
    Ae = Symbol("solid-track"),
    B = {
        equals: $e,
    };
let ue = ge;
const O = 1,
    U = 2,
    ce = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null,
    };
var g = null;
let Q = null,
    m = null,
    C = null,
    E = null,
    D = 0;
function q(e, t) {
    const n = m,
        r = g,
        s = e.length === 0,
        o = t === void 0 ? r : t,
        l = s
            ? ce
            : {
                  owned: null,
                  cleanups: null,
                  context: o ? o.context : null,
                  owner: o,
              },
        i = s ? e : () => e(() => P(() => J(l)));
    (g = l), (m = null);
    try {
        return R(i, !0);
    } finally {
        (m = n), (g = r);
    }
}
function k(e, t) {
    t = t ? Object.assign({}, B, t) : B;
    const n = {
            value: e,
            observers: null,
            observerSlots: null,
            comparator: t.equals || void 0,
        },
        r = (s) => (typeof s == "function" && (s = s(n.value)), de(n, s));
    return [fe.bind(n), r];
}
function A(e, t, n) {
    const r = ee(e, t, !1, O);
    L(r);
}
function re(e, t, n) {
    ue = je;
    const r = ee(e, t, !1, O);
    (!n || !n.render) && (r.user = !0), E ? E.push(r) : L(r);
}
function j(e, t, n) {
    n = n ? Object.assign({}, B, n) : B;
    const r = ee(e, t, !0, 0);
    return (
        (r.observers = null),
        (r.observerSlots = null),
        (r.comparator = n.equals || void 0),
        L(r),
        fe.bind(r)
    );
}
function P(e) {
    if (m === null) return e();
    const t = m;
    m = null;
    try {
        return e();
    } finally {
        m = t;
    }
}
function Se(e) {
    return (
        g === null ||
            (g.cleanups === null ? (g.cleanups = [e]) : g.cleanups.push(e)),
        e
    );
}
function Ee(e, t) {
    const n = Symbol("context");
    return {
        id: n,
        Provider: Ne(n),
        defaultValue: e,
    };
}
function ze(e) {
    return g && g.context && g.context[e.id] !== void 0
        ? g.context[e.id]
        : e.defaultValue;
}
function Pe(e) {
    const t = j(e),
        n = j(() => X(t()));
    return (
        (n.toArray = () => {
            const r = n();
            return Array.isArray(r) ? r : r != null ? [r] : [];
        }),
        n
    );
}
function fe() {
    if (this.sources && this.state)
        if (this.state === O) L(this);
        else {
            const e = C;
            (C = null), R(() => H(this), !1), (C = e);
        }
    if (m) {
        const e = this.observers ? this.observers.length : 0;
        m.sources
            ? (m.sources.push(this), m.sourceSlots.push(e))
            : ((m.sources = [this]), (m.sourceSlots = [e])),
            this.observers
                ? (this.observers.push(m),
                  this.observerSlots.push(m.sources.length - 1))
                : ((this.observers = [m]),
                  (this.observerSlots = [m.sources.length - 1]));
    }
    return this.value;
}
function de(e, t, n) {
    const r = e.value;
    return (
        (!e.comparator || !e.comparator(r, t)) &&
            ((e.value = t),
            e.observers &&
                e.observers.length &&
                R(() => {
                    for (let s = 0; s < e.observers.length; s += 1) {
                        const o = e.observers[s],
                            l = Q && Q.running;
                        l && Q.disposed.has(o),
                            (l ? !o.tState : !o.state) &&
                                (o.pure ? C.push(o) : E.push(o),
                                o.observers && pe(o)),
                            l || (o.state = O);
                    }
                    if (C.length > 1e6) throw ((C = []), new Error());
                }, !1)),
        t
    );
}
function L(e) {
    if (!e.fn) return;
    J(e);
    const t = D;
    Oe(e, e.value, t);
}
function Oe(e, t, n) {
    let r;
    const s = g,
        o = m;
    m = g = e;
    try {
        r = e.fn(t);
    } catch (l) {
        return (
            e.pure &&
                ((e.state = O),
                e.owned && e.owned.forEach(J),
                (e.owned = null)),
            (e.updatedAt = n + 1),
            he(l)
        );
    } finally {
        (m = o), (g = s);
    }
    (!e.updatedAt || e.updatedAt <= n) &&
        (e.updatedAt != null && "observers" in e ? de(e, r) : (e.value = r),
        (e.updatedAt = n));
}
function ee(e, t, n, r = O, s) {
    const o = {
        fn: e,
        state: r,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: t,
        owner: g,
        context: g ? g.context : null,
        pure: n,
    };
    return (
        g === null ||
            (g !== ce && (g.owned ? g.owned.push(o) : (g.owned = [o]))),
        o
    );
}
function F(e) {
    if (e.state === 0) return;
    if (e.state === U) return H(e);
    if (e.suspense && P(e.suspense.inFallback))
        return e.suspense.effects.push(e);
    const t = [e];
    while ((e = e.owner) && (!e.updatedAt || e.updatedAt < D))
        e.state && t.push(e);
    for (let n = t.length - 1; n >= 0; n--)
        if (((e = t[n]), e.state === O)) L(e);
        else if (e.state === U) {
            const r = C;
            (C = null), R(() => H(e, t[0]), !1), (C = r);
        }
}
function R(e, t) {
    if (C) return e();
    let n = !1;
    t || (C = []), E ? (n = !0) : (E = []), D++;
    try {
        const r = e();
        return Te(n), r;
    } catch (r) {
        n || (E = null), (C = null), he(r);
    }
}
function Te(e) {
    if ((C && (ge(C), (C = null)), e)) return;
    const t = E;
    (E = null), t.length && R(() => ue(t), !1);
}
function ge(e) {
    for (let t = 0; t < e.length; t++) F(e[t]);
}
function je(e) {
    let t,
        n = 0;
    for (t = 0; t < e.length; t++) {
        const r = e[t];
        r.user ? (e[n++] = r) : F(r);
    }
    for (t = 0; t < n; t++) F(e[t]);
}
function H(e, t) {
    e.state = 0;
    for (let n = 0; n < e.sources.length; n += 1) {
        const r = e.sources[n];
        if (r.sources) {
            const s = r.state;
            s === O
                ? r !== t && (!r.updatedAt || r.updatedAt < D) && F(r)
                : s === U && H(r, t);
        }
    }
}
function pe(e) {
    for (let t = 0; t < e.observers.length; t += 1) {
        const n = e.observers[t];
        n.state ||
            ((n.state = U),
            n.pure ? C.push(n) : E.push(n),
            n.observers && pe(n));
    }
}
function J(e) {
    let t;
    if (e.sources)
        while (e.sources.length) {
            const n = e.sources.pop(),
                r = e.sourceSlots.pop(),
                s = n.observers;
            if (s && s.length) {
                const o = s.pop(),
                    l = n.observerSlots.pop();
                r < s.length &&
                    ((o.sourceSlots[l] = r),
                    (s[r] = o),
                    (n.observerSlots[r] = l));
            }
        }
    if (e.owned) {
        for (t = e.owned.length - 1; t >= 0; t--) J(e.owned[t]);
        e.owned = null;
    }
    if (e.cleanups) {
        for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
        e.cleanups = null;
    }
    e.state = 0;
}
function Ie(e) {
    return e instanceof Error
        ? e
        : new Error(typeof e == "string" ? e : "Unknown error", {
              cause: e,
          });
}
function he(e, t = g) {
    throw Ie(e);
}
function X(e) {
    if (typeof e == "function" && !e.length) return X(e());
    if (Array.isArray(e)) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
            const r = X(e[n]);
            Array.isArray(r) ? t.push.apply(t, r) : t.push(r);
        }
        return t;
    }
    return e;
}
function Ne(e, t) {
    return (r) => {
        let s;
        return (
            A(
                () =>
                    (s = P(
                        () => (
                            (g.context = {
                                ...g.context,
                                [e]: r.value,
                            }),
                            Pe(() => r.children)
                        ),
                    )),
                void 0,
            ),
            s
        );
    };
}
const Le = Symbol("fallback");
function se(e) {
    for (let t = 0; t < e.length; t++) e[t]();
}
function Re(e, t, n = {}) {
    let r = [],
        s = [],
        o = [],
        l = 0,
        i = t.length > 1 ? [] : null;
    return (
        Se(() => se(o)),
        () => {
            let u = e() || [],
                c,
                a;
            return (
                u[Ae],
                P(() => {
                    let d = u.length,
                        b,
                        p,
                        v,
                        z,
                        y,
                        h,
                        f,
                        w,
                        _;
                    if (d === 0)
                        l !== 0 &&
                            (se(o),
                            (o = []),
                            (r = []),
                            (s = []),
                            (l = 0),
                            i && (i = [])),
                            n.fallback &&
                                ((r = [Le]),
                                (s[0] = q((K) => ((o[0] = K), n.fallback()))),
                                (l = 1));
                    else if (l === 0) {
                        for (s = new Array(d), a = 0; a < d; a++)
                            (r[a] = u[a]), (s[a] = q(x));
                        l = d;
                    } else {
                        for (
                            v = new Array(d),
                                z = new Array(d),
                                i && (y = new Array(d)),
                                h = 0,
                                f = Math.min(l, d);
                            h < f && r[h] === u[h];
                            h++
                        );
                        for (
                            f = l - 1, w = d - 1;
                            f >= h && w >= h && r[f] === u[w];
                            f--, w--
                        )
                            (v[w] = s[f]), (z[w] = o[f]), i && (y[w] = i[f]);
                        for (
                            b = /* @__PURE__ */ new Map(),
                                p = new Array(w + 1),
                                a = w;
                            a >= h;
                            a--
                        )
                            (_ = u[a]),
                                (c = b.get(_)),
                                (p[a] = c === void 0 ? -1 : c),
                                b.set(_, a);
                        for (c = h; c <= f; c++)
                            (_ = r[c]),
                                (a = b.get(_)),
                                a !== void 0 && a !== -1
                                    ? ((v[a] = s[c]),
                                      (z[a] = o[c]),
                                      i && (y[a] = i[c]),
                                      (a = p[a]),
                                      b.set(_, a))
                                    : o[c]();
                        for (a = h; a < d; a++)
                            a in v
                                ? ((s[a] = v[a]),
                                  (o[a] = z[a]),
                                  i && ((i[a] = y[a]), i[a](a)))
                                : (s[a] = q(x));
                        (s = s.slice(0, (l = d))), (r = u.slice(0));
                    }
                    return s;
                })
            );
            function x(d) {
                if (((o[a] = d), i)) {
                    const [b, p] = k(a);
                    return (i[a] = p), t(u[a], b);
                }
                return t(u[a]);
            }
        }
    );
}
function S(e, t) {
    return P(() => e(t || {}));
}
const Ke = (e) => `Stale read from <${e}>.`;
function Me(e) {
    const t = "fallback" in e && {
        fallback: () => e.fallback,
    };
    return j(Re(() => e.each, e.children, t || void 0));
}
function Y(e) {
    const t = e.keyed,
        n = j(() => e.when, void 0, {
            equals: (r, s) => (t ? r === s : !r == !s),
        });
    return j(
        () => {
            const r = n();
            if (r) {
                const s = e.children;
                return typeof s == "function" && s.length > 0
                    ? P(() =>
                          s(
                              t
                                  ? r
                                  : () => {
                                        if (!P(n)) throw Ke("Show");
                                        return e.when;
                                    },
                          ),
                      )
                    : s;
            }
            return e.fallback;
        },
        void 0,
        void 0,
    );
}
function qe(e, t, n) {
    let r = n.length,
        s = t.length,
        o = r,
        l = 0,
        i = 0,
        u = t[s - 1].nextSibling,
        c = null;
    while (l < s || i < o) {
        if (t[l] === n[i]) {
            l++, i++;
            continue;
        }
        while (t[s - 1] === n[o - 1]) s--, o--;
        if (s === l) {
            const a = o < r ? (i ? n[i - 1].nextSibling : n[o - i]) : u;
            while (i < o) e.insertBefore(n[i++], a);
        } else if (o === i)
            while (l < s) (!c || !c.has(t[l])) && t[l].remove(), l++;
        else if (t[l] === n[o - 1] && n[i] === t[s - 1]) {
            const a = t[--s].nextSibling;
            e.insertBefore(n[i++], t[l++].nextSibling),
                e.insertBefore(n[--o], a),
                (t[s] = n[o]);
        } else {
            if (!c) {
                c = /* @__PURE__ */ new Map();
                let x = i;
                while (x < o) c.set(n[x], x++);
            }
            const a = c.get(t[l]);
            if (a != null)
                if (i < a && a < o) {
                    let x = l,
                        d = 1,
                        b;
                    while (
                        ++x < s &&
                        x < o &&
                        !((b = c.get(t[x])) == null || b !== a + d)
                    )
                        d++;
                    if (d > a - i) {
                        const p = t[l];
                        while (i < a) e.insertBefore(n[i++], p);
                    } else e.replaceChild(n[i++], t[l++]);
                } else l++;
            else t[l++].remove();
        }
    }
}
const oe = "_$DX_DELEGATE";
function I(e, t, n) {
    let r;
    const s = () => {
            const l = document.createElement("template");
            return (
                (l.innerHTML = e),
                n ? l.content.firstChild.firstChild : l.content.firstChild
            );
        },
        o = t
            ? () => P(() => document.importNode(r || (r = s()), !0))
            : () => (r || (r = s())).cloneNode(!0);
    return (o.cloneNode = o), o;
}
function be(e, t = window.document) {
    const n = t[oe] || (t[oe] = /* @__PURE__ */ new Set());
    for (let r = 0, s = e.length; r < s; r++) {
        const o = e[r];
        n.has(o) || (n.add(o), t.addEventListener(o, Ue));
    }
}
function Be(e, t, n) {
    n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function M(e, t, n, r) {
    if (r)
        Array.isArray(n)
            ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1]))
            : (e[`$$${t}`] = n);
    else if (Array.isArray(n)) {
        const s = n[0];
        e.addEventListener(t, (n[0] = (o) => s.call(e, n[1], o)));
    } else e.addEventListener(t, n);
}
function ye(e, t, n = {}) {
    const r = Object.keys(t || {}),
        s = Object.keys(n);
    let o, l;
    for (o = 0, l = s.length; o < l; o++) {
        const i = s[o];
        !i || i === "undefined" || t[i] || (ie(e, i, !1), delete n[i]);
    }
    for (o = 0, l = r.length; o < l; o++) {
        const i = r[o],
            u = !!t[i];
        !i ||
            i === "undefined" ||
            n[i] === u ||
            !u ||
            (ie(e, i, !0), (n[i] = u));
    }
    return n;
}
function $(e, t, n, r) {
    if ((n !== void 0 && !r && (r = []), typeof t != "function"))
        return V(e, t, r, n);
    A((s) => V(e, t(), s, n), r);
}
function ie(e, t, n) {
    const r = t.trim().split(/\s+/);
    for (let s = 0, o = r.length; s < o; s++) e.classList.toggle(r[s], n);
}
function Ue(e) {
    const t = `$$${e.type}`;
    let n = (e.composedPath && e.composedPath()[0]) || e.target;
    for (
        e.target !== n &&
            Object.defineProperty(e, "target", {
                configurable: !0,
                value: n,
            }),
            Object.defineProperty(e, "currentTarget", {
                configurable: !0,
                get() {
                    return n || document;
                },
            });
        n;
    ) {
        const r = n[t];
        if (r && !n.disabled) {
            const s = n[`${t}Data`];
            if ((s !== void 0 ? r.call(n, s, e) : r.call(n, e), e.cancelBubble))
                return;
        }
        n = n._$host || n.parentNode || n.host;
    }
}
function V(e, t, n, r, s) {
    while (typeof n == "function") n = n();
    if (t === n) return n;
    const o = typeof t,
        l = r !== void 0;
    if (
        ((e = (l && n[0] && n[0].parentNode) || e),
        o === "string" || o === "number")
    )
        if ((o === "number" && (t = t.toString()), l)) {
            let i = n[0];
            i && i.nodeType === 3
                ? (i.data = t)
                : (i = document.createTextNode(t)),
                (n = T(e, n, r, i));
        } else
            n !== "" && typeof n == "string"
                ? (n = e.firstChild.data = t)
                : (n = e.textContent = t);
    else if (t == null || o === "boolean") n = T(e, n, r);
    else {
        if (o === "function")
            return (
                A(() => {
                    let i = t();
                    while (typeof i == "function") i = i();
                    n = V(e, i, n, r);
                }),
                () => n
            );
        if (Array.isArray(t)) {
            const i = [],
                u = n && Array.isArray(n);
            if (Z(i, t, n, s)) return A(() => (n = V(e, i, n, r, !0))), () => n;
            if (i.length === 0) {
                if (((n = T(e, n, r)), l)) return n;
            } else
                u
                    ? n.length === 0
                        ? le(e, i, r)
                        : qe(e, n, i)
                    : (n && T(e), le(e, i));
            n = i;
        } else if (t.nodeType) {
            if (Array.isArray(n)) {
                if (l) return (n = T(e, n, r, t));
                T(e, n, null, t);
            } else
                n == null || n === "" || !e.firstChild
                    ? e.appendChild(t)
                    : e.replaceChild(t, e.firstChild);
            n = t;
        }
    }
    return n;
}
function Z(e, t, n, r) {
    let s = !1;
    for (let o = 0, l = t.length; o < l; o++) {
        let i = t[o],
            u = n && n[o],
            c;
        if (!(i == null || i === !0 || i === !1))
            if ((c = typeof i) == "object" && i.nodeType) e.push(i);
            else if (Array.isArray(i)) s = Z(e, i, u) || s;
            else if (c === "function")
                if (r) {
                    while (typeof i == "function") i = i();
                    s =
                        Z(
                            e,
                            Array.isArray(i) ? i : [i],
                            Array.isArray(u) ? u : [u],
                        ) || s;
                } else e.push(i), (s = !0);
            else {
                const a = String(i);
                u && u.nodeType === 3 && u.data === a
                    ? e.push(u)
                    : e.push(document.createTextNode(a));
            }
    }
    return s;
}
function le(e, t, n = null) {
    for (let r = 0, s = t.length; r < s; r++) e.insertBefore(t[r], n);
}
function T(e, t, n, r) {
    if (n === void 0) return (e.textContent = "");
    const s = r || document.createTextNode("");
    if (t.length) {
        let o = !1;
        for (let l = t.length - 1; l >= 0; l--) {
            const i = t[l];
            if (s !== i) {
                const u = i.parentNode === e;
                !o && !l
                    ? u
                        ? e.replaceChild(s, i)
                        : e.insertBefore(s, n)
                    : u && i.remove();
            } else o = !0;
        }
    } else e.insertBefore(s, n);
    return [s];
}
function Fe(e) {
    return Object.keys(e).reduce((n, r) => {
        const s = e[r];
        return (
            (n[r] = Object.assign({}, s)),
            xe(s.value) &&
                !Ge(s.value) &&
                !Array.isArray(s.value) &&
                (n[r].value = Object.assign({}, s.value)),
            Array.isArray(s.value) && (n[r].value = s.value.slice(0)),
            n
        );
    }, {});
}
function He(e) {
    return e
        ? Object.keys(e).reduce((n, r) => {
              const s = e[r];
              return (
                  (n[r] =
                      xe(s) && "value" in s
                          ? s
                          : {
                                value: s,
                            }),
                  n[r].attribute || (n[r].attribute = Je(r)),
                  (n[r].parse =
                      "parse" in n[r]
                          ? n[r].parse
                          : typeof n[r].value != "string"),
                  n
              );
          }, {})
        : {};
}
function Ve(e) {
    return Object.keys(e).reduce((n, r) => ((n[r] = e[r].value), n), {});
}
function De(e, t) {
    const n = Fe(t);
    return (
        Object.keys(t).forEach((s) => {
            const o = n[s],
                l = e.getAttribute(o.attribute),
                i = e[s];
            l && (o.value = o.parse ? me(l) : l),
                i != null && (o.value = Array.isArray(i) ? i.slice(0) : i),
                o.reflect && ae(e, o.attribute, o.value),
                Object.defineProperty(e, s, {
                    get() {
                        return o.value;
                    },
                    set(u) {
                        const c = o.value;
                        (o.value = u),
                            o.reflect && ae(this, o.attribute, o.value);
                        for (
                            let a = 0,
                                x = this.__propertyChangedCallbacks.length;
                            a < x;
                            a++
                        )
                            this.__propertyChangedCallbacks[a](s, u, c);
                    },
                    enumerable: !0,
                    configurable: !0,
                });
        }),
        n
    );
}
function me(e) {
    if (e)
        try {
            return JSON.parse(e);
        } catch {
            return e;
        }
}
function ae(e, t, n) {
    if (n == null || n === !1) return e.removeAttribute(t);
    let r = JSON.stringify(n);
    (e.__updating[t] = !0),
        r === "true" && (r = ""),
        e.setAttribute(t, r),
        Promise.resolve().then(() => delete e.__updating[t]);
}
function Je(e) {
    return e
        .replace(/\.?([A-Z]+)/g, (t, n) => "-" + n.toLowerCase())
        .replace("_", "-")
        .replace(/^-/, "");
}
function xe(e) {
    return e != null && (typeof e == "object" || typeof e == "function");
}
function Ge(e) {
    return Object.prototype.toString.call(e) === "[object Function]";
}
function Qe(e) {
    return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let W;
function We(e, t) {
    const n = Object.keys(t);
    return class extends e {
        static get observedAttributes() {
            return n.map((s) => t[s].attribute);
        }
        constructor() {
            super(),
                (this.__initialized = !1),
                (this.__released = !1),
                (this.__releaseCallbacks = []),
                (this.__propertyChangedCallbacks = []),
                (this.__updating = {}),
                (this.props = {});
        }
        connectedCallback() {
            if (this.__initialized) return;
            (this.__releaseCallbacks = []),
                (this.__propertyChangedCallbacks = []),
                (this.__updating = {}),
                (this.props = De(this, t));
            const s = Ve(this.props),
                o = this.Component,
                l = W;
            try {
                (W = this),
                    (this.__initialized = !0),
                    Qe(o)
                        ? new o(s, {
                              element: this,
                          })
                        : o(s, {
                              element: this,
                          });
            } finally {
                W = l;
            }
        }
        async disconnectedCallback() {
            if ((await Promise.resolve(), this.isConnected)) return;
            this.__propertyChangedCallbacks.length = 0;
            let s = null;
            while ((s = this.__releaseCallbacks.pop())) s(this);
            delete this.__initialized, (this.__released = !0);
        }
        attributeChangedCallback(s, o, l) {
            if (
                this.__initialized &&
                !this.__updating[s] &&
                ((s = this.lookupProp(s)), s in t)
            ) {
                if (l == null && !this[s]) return;
                this[s] = t[s].parse ? me(l) : l;
            }
        }
        lookupProp(s) {
            if (t) return n.find((o) => s === o || s === t[o].attribute);
        }
        get renderRoot() {
            return (
                this.shadowRoot ||
                this.attachShadow({
                    mode: "open",
                })
            );
        }
        addReleaseCallback(s) {
            this.__releaseCallbacks.push(s);
        }
        addPropertyChangedCallback(s) {
            this.__propertyChangedCallbacks.push(s);
        }
    };
}
function Xe(e, t = {}, n = {}) {
    const { BaseElement: r = HTMLElement, extension: s } = n;
    return (o) => {
        if (!e) throw new Error("tag is required to register a Component");
        let l = customElements.get(e);
        return l
            ? ((l.prototype.Component = o), l)
            : ((l = We(r, He(t))),
              (l.prototype.Component = o),
              (l.prototype.registeredTag = e),
              customElements.define(e, l, s),
              l);
    };
}
function Ye(e) {
    const t = Object.keys(e),
        n = {};
    for (let r = 0; r < t.length; r++) {
        const [s, o] = k(e[t[r]]);
        Object.defineProperty(n, t[r], {
            get: s,
            set(l) {
                o(() => l);
            },
        });
    }
    return n;
}
function Ze(e) {
    if (e.assignedSlot && e.assignedSlot._$owner) return e.assignedSlot._$owner;
    let t = e.parentNode;
    while (t && !t._$owner && !(t.assignedSlot && t.assignedSlot._$owner))
        t = t.parentNode;
    return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner;
}
function et(e) {
    return (t, n) => {
        const { element: r } = n;
        return q((s) => {
            const o = Ye(t);
            r.addPropertyChangedCallback((i, u) => (o[i] = u)),
                r.addReleaseCallback(() => {
                    (r.renderRoot.textContent = ""), s();
                });
            const l = e(o, n);
            return $(r.renderRoot, l);
        }, Ze(r));
    };
}
function tt(e, t, n) {
    return arguments.length === 2 && ((n = t), (t = {})), Xe(e, t)(et(n));
}
const nt =
        "*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.m-0{margin:0}.mb-0\\.5rem{margin-bottom:.5rem}.mb-1rem{margin-bottom:1rem}.ml-1rem{margin-left:1rem}.mt-0\\.5rem{margin-top:.5rem}.h-4rem{height:4rem}.min-h-2rem{min-height:2rem}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-row-reverse{flex-direction:row-reverse}.flex-col{flex-direction:column}.cursor-pointer{cursor:pointer}.cursor-not-allowed{cursor:not-allowed}.resize-y{resize:vertical}.gap-2{gap:.5rem}.break-words{overflow-wrap:break-word}.border,.border-1px{border-width:1px}.b-l-gray-500{--un-border-opacity:1;--un-border-left-opacity:var(--un-border-opacity);border-left-color:rgb(107 114 128 / var(--un-border-left-opacity))}.rounded-0\\.25rem{border-radius:.25rem}.rounded-0\\.5rem{border-radius:.5rem}.border-none{border-style:none}.b-l-solid{border-left-style:solid}.bg-gray-200{--un-bg-opacity:1;background-color:rgb(229 231 235 / var(--un-bg-opacity))}.bg-gray-300{--un-bg-opacity:1;background-color:rgb(209 213 219 / var(--un-bg-opacity))}.p-0\\.5rem{padding:.5rem}.px-1rem{padding-left:1rem;padding-right:1rem}.py-0\\.5rem{padding-top:.5rem;padding-bottom:.5rem}.pl-0\\.5rem{padding-left:.5rem}.text-center{text-align:center}.font-size-0\\.9rem{font-size:.9rem}.font-size-1\\.2rem{font-size:1.2rem}.font-size-1rem{font-size:1rem}.text-gray-300{--un-text-opacity:1;color:rgb(209 213 219 / var(--un-text-opacity))}.text-gray-500{--un-text-opacity:1;color:rgb(107 114 128 / var(--un-text-opacity))}.text-gray-700{--un-text-opacity:1;color:rgb(55 65 81 / var(--un-text-opacity))}.text-gray-800{--un-text-opacity:1;color:rgb(31 41 55 / var(--un-text-opacity))}.font-bold{font-weight:700}.font-light{font-weight:300}.font-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.outline{outline-style:solid}.outline-none{outline:2px solid transparent;outline-offset:2px}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-300{transition-duration:.3s}@media (hover: hover) and (pointer: fine){.\\@hover\\:bg-gray-200:hover{--un-bg-opacity:1;background-color:rgb(229 231 235 / var(--un-bg-opacity))}}@media (prefers-color-scheme: dark){.dark\\:bg-gray-600{--un-bg-opacity:1;background-color:rgb(75 85 99 / var(--un-bg-opacity))}.dark\\:bg-gray-700{--un-bg-opacity:1;background-color:rgb(55 65 81 / var(--un-bg-opacity))}.dark\\:bg-gray-800{--un-bg-opacity:1;background-color:rgb(31 41 55 / var(--un-bg-opacity))}.dark\\:text-gray-200{--un-text-opacity:1;color:rgb(229 231 235 / var(--un-text-opacity))}.dark\\:text-gray-300{--un-text-opacity:1;color:rgb(209 213 219 / var(--un-text-opacity))}.dark\\:text-gray-600{--un-text-opacity:1;color:rgb(75 85 99 / var(--un-text-opacity))}}@media (prefers-color-scheme: dark){@media (hover: hover) and (pointer: fine){.\\@hover\\:dark\\:bg-gray-700:hover{--un-bg-opacity:1;background-color:rgb(55 65 81 / var(--un-bg-opacity))}}}@media (min-width: 640px){.sm\\:flex-row{flex-direction:row}}",
    rt = () => 0,
    st = () => 0,
    we = Ee({
        id: "",
        url: "",
        username: "",
        email: "",
        site: "",
        displayEditorAt: rt,
        highlightAt: st,
        setDisplayEditorAt: (e) => {},
        setHighlightAt: (e) => {},
        setNeedReq: (e) => {},
    }),
    ve = () => ze(we);
async function ot(e) {
    const t = location.pathname;
    return await (await fetch(`${e}/api/details?pathname=${t}`)).json();
}
function it(e) {
    const t = new Date(Number.parseInt(e, 10));
    return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}`;
}
const lt = /* @__PURE__ */ I(
        '<div class="text-gray-800 dark:text-gray-200"><div class="flex gap-2 mb-1rem flex-col sm:flex-row"><input class="flex-1 font-mono p-0.5rem border-1px rounded-0.25rem outline-none bg-gray-200 dark:bg-gray-700"placeholder=昵称><input class="flex-1 font-mono p-0.5rem border-1px rounded-0.25rem outline-none bg-gray-200 dark:bg-gray-700"type=email placeholder=邮箱（可选）><input class="flex-1 font-mono p-0.5rem border-1px rounded-0.25rem outline-none bg-gray-200 dark:bg-gray-700"type=url placeholder=个人站点（可选）></div><div class=flex><textarea class="bg-gray-200 dark:bg-gray-700 flex-1 min-h-2rem h-4rem font-size-1rem font-weight-400 p-0.5rem resize-y rounded-0.5rem"placeholder=说点什么...></textarea></div><div class="flex flex-row-reverse mt-0.5rem"><button class="font-size-1rem border-none m-0 px-1rem py-0.5rem rounded-0.5rem duration-300">回复',
    ),
    Ce = (e) => {
        const { url: t, setNeedReq: n } = ve(),
            [r, s] = k(localStorage.getItem("pissu-username") ?? ""),
            [o, l] = k(localStorage.getItem("pissu-email") ?? ""),
            [i, u] = k(localStorage.getItem("pissu-site") ?? ""),
            [c, a] = k(localStorage.getItem("pissu-content") ?? ""),
            [x, d] = k(!1),
            b = j(() => !!r() && !!c() && !x()),
            p = (y, h, f) => {
                localStorage.setItem(`pissu-${y}`, f), h(f);
            },
            v = (y, h) => (f) => p(y, h, f.target.value),
            z = () => {
                b() &&
                    (d(!0),
                    fetch(`${t}/api/comment`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            content: c(),
                            username: r(),
                            email: o(),
                            site: i(),
                            reply: e.reply ?? 0,
                            referer: location.href,
                        }),
                    }).finally(() => {
                        p("content", a, ""), d(!1), n(!0);
                    }));
            };
        return (() => {
            const y = lt(),
                h = y.firstChild,
                f = h.firstChild,
                w = f.nextSibling,
                _ = w.nextSibling,
                K = h.nextSibling,
                te = K.firstChild,
                _e = K.nextSibling,
                G = _e.firstChild;
            return (
                M(f, "input", v("username", s), !0),
                M(w, "input", v("email", l), !0),
                M(_, "input", v("site", u), !0),
                M(te, "input", v("content", a), !0),
                (G.$$click = z),
                A(
                    (N) => {
                        const ne = !b(),
                            ke = {
                                "@hover:bg-gray-200 @hover:dark:bg-gray-700 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 cursor-pointer":
                                    b(),
                                "bg-gray-200 dark:bg-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed":
                                    !b(),
                            };
                        return (
                            ne !== N._v$ && (G.disabled = N._v$ = ne),
                            (N._v$2 = ye(G, ke, N._v$2)),
                            N
                        );
                    },
                    {
                        _v$: void 0,
                        _v$2: void 0,
                    },
                ),
                A(() => (f.value = r())),
                A(() => (w.value = o())),
                A(() => (_.value = i())),
                A(() => (te.value = c())),
                y
            );
        })();
    };
be(["input", "click"]);
const at = /* @__PURE__ */ I(
        '<div class="pl-0.5rem b-l-solid b-l-gray-500 text-gray-500 break-words"><span class="ml-1rem text-gray-500 font-size-0.9rem cursor-pointer">原文',
    ),
    ut = /* @__PURE__ */ I(
        '<div class=transition><div><p class="m-0 font-size-1.2rem font-bold"></p><p class="m-0 font-size-0.9rem font-light text-gray-700 dark:text-gray-200"></p></div><div class=mb-0.5rem><p class="m-0 break-words"></p><span class="mb-0.5rem text-gray-500 font-size-0.9rem cursor-pointer">回复',
    ),
    ct = (e) => {
        const {
                displayEditorAt: t,
                setDisplayEditorAt: n,
                highlightAt: r,
                setHighlightAt: s,
                id: o,
            } = ve(),
            { comment: l, replyContent: i, reply: u } = e;
        return (() => {
            const c = ut(),
                a = c.firstChild,
                x = a.firstChild,
                d = x.nextSibling,
                b = a.nextSibling,
                p = b.firstChild,
                v = p.nextSibling,
                z = v.firstChild;
            return (
                $(x, () => l.Username),
                $(d, () => it(l.CreateAt)),
                $(
                    b,
                    S(Y, {
                        when: i,
                        get children() {
                            const y = at(),
                                h = y.firstChild;
                            return (
                                $(y, i, h),
                                (h.$$click = () => {
                                    var _;
                                    s(u);
                                    const f = document.querySelector(`#${o}`),
                                        w =
                                            (_ =
                                                f == null
                                                    ? void 0
                                                    : f.shadowRoot) == null
                                                ? void 0
                                                : _.querySelector(
                                                      `[data-comment-id="${u}"]`,
                                                  );
                                    w == null ||
                                        w.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                }),
                                y
                            );
                        },
                    }),
                    p,
                ),
                $(p, () => l.Content),
                (v.$$click = () =>
                    l.CommentId === t() ? n(0) : n(l.CommentId)),
                $(v, () => (t() === l.CommentId ? "收起" : "展开"), z),
                $(
                    c,
                    S(Y, {
                        get when() {
                            return t() === l.CommentId;
                        },
                        get children() {
                            return S(Ce, {
                                get reply() {
                                    return l.CommentId;
                                },
                            });
                        },
                    }),
                    null,
                ),
                A(
                    (y) => {
                        const h = {
                                "bg-gray-200 dark:bg-gray-800":
                                    r() === l.CommentId,
                            },
                            f = l.CommentId;
                        return (
                            (y._v$ = ye(c, h, y._v$)),
                            f !== y._v$2 &&
                                Be(c, "data-comment-id", (y._v$2 = f)),
                            y
                        );
                    },
                    {
                        _v$: void 0,
                        _v$2: void 0,
                    },
                ),
                c
            );
        })();
    };
be(["click"]);
const ft = /* @__PURE__ */ I("<div>"),
    dt = (e) => {
        const { comments: t } = e;
        return (() => {
            const n = ft();
            return (
                $(
                    n,
                    S(Me, {
                        get each() {
                            return t();
                        },
                        children: (r) =>
                            S(ct, {
                                comment: r,
                                get reply() {
                                    return r.Reply;
                                },
                                get replyContent() {
                                    var s;
                                    return (s = t().find(
                                        (o) => o.CommentId === r.Reply,
                                    )) == null
                                        ? void 0
                                        : s.Content;
                                },
                            }),
                    }),
                ),
                n
            );
        })();
    },
    gt = /* @__PURE__ */ I(`<style>input,textarea {
                border: none;
                outline: none;
                color: inherit;
            }`),
    pt = /* @__PURE__ */ I(
        '<div class="text-center text-gray-500 dark:text-gray-200">加载中...',
    ),
    ht = (e) => {
        const { url: t, id: n } = e,
            [r, s] = k(0),
            [o, l] = k(0),
            [i, u] = k([]),
            [c, a] = k(!0),
            [x, d] = k(!1);
        re(async () => {
            if (c()) {
                a(!1), d(!0);
                try {
                    const p = await ot(t);
                    u(p);
                } finally {
                    d(!1);
                }
            }
        });
        let b;
        return (
            re(() => {
                const p = o();
                p !== 0 &&
                    (clearTimeout(b),
                    (b = setTimeout(() => {
                        p === o() && l(0);
                    }, 500)));
            }),
            [
                (() => {
                    const p = gt(),
                        v = p.firstChild;
                    return $(p, nt, v), p;
                })(),
                S(we.Provider, {
                    value: {
                        id: n,
                        username: "",
                        email: "",
                        site: "",
                        url: t,
                        displayEditorAt: r,
                        setDisplayEditorAt: s,
                        highlightAt: o,
                        setHighlightAt: l,
                        setNeedReq: a,
                    },
                    get children() {
                        return [
                            S(Ce, {}),
                            S(Y, {
                                get when() {
                                    return !x();
                                },
                                get fallback() {
                                    return pt();
                                },
                                get children() {
                                    return S(dt, {
                                        comments: i,
                                    });
                                },
                            }),
                        ];
                    },
                }),
            ]
        );
    },
    bt = {
        id: "",
        url: "",
    };
tt("pissu-comment", bt, ht);
