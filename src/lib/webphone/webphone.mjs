const Wr = "0.21.1";
class _e extends Error {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, new.target.prototype);
  }
}
class kt extends _e {
  constructor(e) {
    super(e || "Unsupported content type.");
  }
}
class et extends _e {
  /** @internal */
  constructor(e) {
    super(e || "Request pending.");
  }
}
class Yr extends _e {
  constructor(e) {
    super(e || "Unspecified session description handler error.");
  }
}
class At extends _e {
  constructor() {
    super("The session has terminated.");
  }
}
class Ge extends _e {
  constructor(e) {
    super(e || "An error occurred during state transition.");
  }
}
class Jr {
  /** @internal */
  constructor(e) {
    this.incomingAckRequest = e;
  }
  /** Incoming ACK request message. */
  get request() {
    return this.incomingAckRequest.message;
  }
}
class Zr {
  /** @internal */
  constructor(e) {
    this.incomingByeRequest = e;
  }
  /** Incoming BYE request message. */
  get request() {
    return this.incomingByeRequest.message;
  }
  /** Accept the request. */
  accept(e) {
    return this.incomingByeRequest.accept(e), Promise.resolve();
  }
  /** Reject the request. */
  reject(e) {
    return this.incomingByeRequest.reject(e), Promise.resolve();
  }
}
class zr {
  /** @internal */
  constructor(e) {
    this.incomingCancelRequest = e;
  }
  /** Incoming CANCEL request message. */
  get request() {
    return this.incomingCancelRequest;
  }
}
class tt {
  constructor() {
    this.listeners = new Array();
  }
  /**
   * Sets up a function that will be called whenever the target changes.
   * @param listener - Callback function.
   * @param options - An options object that specifies characteristics about the listener.
   *                  If once true, indicates that the listener should be invoked at most once after being added.
   *                  If once true, the listener would be automatically removed when invoked.
   */
  addListener(e, t) {
    const r = (i) => {
      this.removeListener(r), e(i);
    };
    (t == null ? void 0 : t.once) === !0 ? this.listeners.push(r) : this.listeners.push(e);
  }
  /**
   * Emit change.
   * @param data - Data to emit.
   */
  emit(e) {
    this.listeners.slice().forEach((t) => t(e));
  }
  /**
   * Removes all listeners previously registered with addListener.
   */
  removeAllListeners() {
    this.listeners = [];
  }
  /**
   * Removes a listener previously registered with addListener.
   * @param listener - Callback function.
   */
  removeListener(e) {
    this.listeners = this.listeners.filter((t) => t !== e);
  }
  /**
   * Registers a listener.
   * @param listener - Callback function.
   * @deprecated Use addListener.
   */
  on(e) {
    return this.addListener(e);
  }
  /**
   * Unregisters a listener.
   * @param listener - Callback function.
   * @deprecated Use removeListener.
   */
  off(e) {
    return this.removeListener(e);
  }
  /**
   * Registers a listener then unregisters the listener after one event emission.
   * @param listener - Callback function.
   * @deprecated Use addListener.
   */
  once(e) {
    return this.addListener(e, { once: !0 });
  }
}
class Xr {
  /** @internal */
  constructor(e) {
    this.incomingInfoRequest = e;
  }
  /** Incoming MESSAGE request message. */
  get request() {
    return this.incomingInfoRequest.message;
  }
  /** Accept the request. */
  accept(e) {
    return this.incomingInfoRequest.accept(e), Promise.resolve();
  }
  /** Reject the request. */
  reject(e) {
    return this.incomingInfoRequest.reject(e), Promise.resolve();
  }
}
class pr {
  constructor(e) {
    this.parameters = {};
    for (const t in e)
      e.hasOwnProperty(t) && this.setParam(t, e[t]);
  }
  setParam(e, t) {
    e && (this.parameters[e.toLowerCase()] = typeof t > "u" || t === null ? null : t.toString());
  }
  getParam(e) {
    if (e)
      return this.parameters[e.toLowerCase()];
  }
  hasParam(e) {
    return !!(e && this.parameters[e.toLowerCase()] !== void 0);
  }
  deleteParam(e) {
    if (e = e.toLowerCase(), this.hasParam(e)) {
      const t = this.parameters[e];
      return delete this.parameters[e], t;
    }
  }
  clearParams() {
    this.parameters = {};
  }
}
class se extends pr {
  /**
   * Constructor
   * @param uri -
   * @param displayName -
   * @param parameters -
   */
  constructor(e, t, r) {
    super(r), this.uri = e, this._displayName = t;
  }
  get friendlyName() {
    return this.displayName || this.uri.aor;
  }
  get displayName() {
    return this._displayName;
  }
  set displayName(e) {
    this._displayName = e;
  }
  clone() {
    return new se(this.uri.clone(), this._displayName, JSON.parse(JSON.stringify(this.parameters)));
  }
  toString() {
    let e = this.displayName || this.displayName === "0" ? '"' + this.displayName + '" ' : "";
    e += "<" + this.uri.toString() + ">";
    for (const t in this.parameters)
      this.parameters.hasOwnProperty(t) && (e += ";" + t, this.parameters[t] !== null && (e += "=" + this.parameters[t]));
    return e;
  }
}
class we extends pr {
  /**
   * Constructor
   * @param scheme -
   * @param user -
   * @param host -
   * @param port -
   * @param parameters -
   * @param headers -
   */
  constructor(e = "sip", t, r, i, n, a) {
    if (super(n || {}), this.headers = {}, !r)
      throw new TypeError('missing or invalid "host" parameter');
    for (const o in a)
      a.hasOwnProperty(o) && this.setHeader(o, a[o]);
    this.raw = {
      scheme: e,
      user: t,
      host: r,
      port: i
    }, this.normal = {
      scheme: e.toLowerCase(),
      user: t,
      host: r.toLowerCase(),
      port: i
    };
  }
  get scheme() {
    return this.normal.scheme;
  }
  set scheme(e) {
    this.raw.scheme = e, this.normal.scheme = e.toLowerCase();
  }
  get user() {
    return this.normal.user;
  }
  set user(e) {
    this.normal.user = this.raw.user = e;
  }
  get host() {
    return this.normal.host;
  }
  set host(e) {
    this.raw.host = e, this.normal.host = e.toLowerCase();
  }
  get aor() {
    return this.normal.user + "@" + this.normal.host;
  }
  get port() {
    return this.normal.port;
  }
  set port(e) {
    this.normal.port = this.raw.port = e;
  }
  setHeader(e, t) {
    this.headers[this.headerize(e)] = t instanceof Array ? t : [t];
  }
  getHeader(e) {
    if (e)
      return this.headers[this.headerize(e)];
  }
  hasHeader(e) {
    return !!e && !!this.headers.hasOwnProperty(this.headerize(e));
  }
  deleteHeader(e) {
    if (e = this.headerize(e), this.headers.hasOwnProperty(e)) {
      const t = this.headers[e];
      return delete this.headers[e], t;
    }
  }
  clearHeaders() {
    this.headers = {};
  }
  clone() {
    return new we(this._raw.scheme, this._raw.user || "", this._raw.host, this._raw.port, JSON.parse(JSON.stringify(this.parameters)), JSON.parse(JSON.stringify(this.headers)));
  }
  toRaw() {
    return this._toString(this._raw);
  }
  toString() {
    return this._toString(this._normal);
  }
  get _normal() {
    return this.normal;
  }
  get _raw() {
    return this.raw;
  }
  _toString(e) {
    let t = e.scheme + ":";
    e.scheme.toLowerCase().match("^sips?$") || (t += "//"), e.user && (t += this.escapeUser(e.user) + "@"), t += e.host, (e.port || e.port === 0) && (t += ":" + e.port);
    for (const i in this.parameters)
      this.parameters.hasOwnProperty(i) && (t += ";" + i, this.parameters[i] !== null && (t += "=" + this.parameters[i]));
    const r = [];
    for (const i in this.headers)
      if (this.headers.hasOwnProperty(i))
        for (const n in this.headers[i])
          this.headers[i].hasOwnProperty(n) && r.push(i + "=" + this.headers[i][n]);
    return r.length > 0 && (t += "?" + r.join("&")), t;
  }
  /*
   * Hex-escape a SIP URI user.
   * @private
   * @param {String} user
   */
  escapeUser(e) {
    let t;
    try {
      t = decodeURIComponent(e);
    } catch (r) {
      throw r;
    }
    return encodeURIComponent(t).replace(/%3A/ig, ":").replace(/%2B/ig, "+").replace(/%3F/ig, "?").replace(/%2F/ig, "/");
  }
  headerize(e) {
    const t = {
      "Call-Id": "Call-ID",
      Cseq: "CSeq",
      "Min-Se": "Min-SE",
      Rack: "RAck",
      Rseq: "RSeq",
      "Www-Authenticate": "WWW-Authenticate"
    }, r = e.toLowerCase().replace(/_/g, "-").split("-"), i = r.length;
    let n = "";
    for (let a = 0; a < i; a++)
      a !== 0 && (n += "-"), n += r[a].charAt(0).toUpperCase() + r[a].substring(1);
    return t[n] && (n = t[n]), n;
  }
}
function er(s, e) {
  if (s.scheme !== e.scheme || s.user !== e.user || s.host !== e.host || s.port !== e.port)
    return !1;
  function t(n, a) {
    const o = Object.keys(n.parameters), d = Object.keys(a.parameters);
    return !(!o.filter((u) => d.includes(u)).every((u) => n.parameters[u] === a.parameters[u]) || !["user", "ttl", "method", "transport"].every((u) => n.hasParam(u) && a.hasParam(u) || !n.hasParam(u) && !a.hasParam(u)) || !["maddr"].every((u) => n.hasParam(u) && a.hasParam(u) || !n.hasParam(u) && !a.hasParam(u)));
  }
  if (!t(s, e))
    return !1;
  const r = Object.keys(s.headers), i = Object.keys(e.headers);
  if (r.length !== 0 || i.length !== 0) {
    if (r.length !== i.length)
      return !1;
    const n = r.filter((a) => i.includes(a));
    if (n.length !== i.length || !n.every((a) => s.headers[a].length && e.headers[a].length && s.headers[a][0] === e.headers[a][0]))
      return !1;
  }
  return !0;
}
function Dt(s, e, t) {
  return t = t || " ", s.length > e ? s : (e -= s.length, t += t.repeat(e), s + t.slice(0, e));
}
class Ue extends Error {
  constructor(e, t, r, i) {
    super(), this.message = e, this.expected = t, this.found = r, this.location = i, this.name = "SyntaxError", typeof Object.setPrototypeOf == "function" ? Object.setPrototypeOf(this, Ue.prototype) : this.__proto__ = Ue.prototype, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Ue);
  }
  static buildMessage(e, t) {
    function r(h) {
      return h.charCodeAt(0).toString(16).toUpperCase();
    }
    function i(h) {
      return h.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (u) => "\\x0" + r(u)).replace(/[\x10-\x1F\x7F-\x9F]/g, (u) => "\\x" + r(u));
    }
    function n(h) {
      return h.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (u) => "\\x0" + r(u)).replace(/[\x10-\x1F\x7F-\x9F]/g, (u) => "\\x" + r(u));
    }
    function a(h) {
      switch (h.type) {
        case "literal":
          return '"' + i(h.text) + '"';
        case "class":
          const u = h.parts.map((f) => Array.isArray(f) ? n(f[0]) + "-" + n(f[1]) : n(f));
          return "[" + (h.inverted ? "^" : "") + u + "]";
        case "any":
          return "any character";
        case "end":
          return "end of input";
        case "other":
          return h.description;
      }
    }
    function o(h) {
      const u = h.map(a);
      let f, w;
      if (u.sort(), u.length > 0) {
        for (f = 1, w = 1; f < u.length; f++)
          u[f - 1] !== u[f] && (u[w] = u[f], w++);
        u.length = w;
      }
      switch (u.length) {
        case 1:
          return u[0];
        case 2:
          return u[0] + " or " + u[1];
        default:
          return u.slice(0, -1).join(", ") + ", or " + u[u.length - 1];
      }
    }
    function d(h) {
      return h ? '"' + i(h) + '"' : "end of input";
    }
    return "Expected " + o(e) + " but " + d(t) + " found.";
  }
  format(e) {
    let t = "Error: " + this.message;
    if (this.location) {
      let r = null, i;
      for (i = 0; i < e.length; i++)
        if (e[i].source === this.location.source) {
          r = e[i].text.split(/\r\n|\n|\r/g);
          break;
        }
      let n = this.location.start, a = this.location.source + ":" + n.line + ":" + n.column;
      if (r) {
        let o = this.location.end, d = Dt("", n.line.toString().length, " "), h = r[n.line - 1], u = n.line === o.line ? o.column : h.length + 1;
        t += `
 --> ` + a + `
` + d + ` |
` + n.line + " | " + h + `
` + d + " | " + Dt("", n.column - 1, " ") + Dt("", u - n.column, "^");
      } else
        t += `
 at ` + a;
    }
    return t;
  }
}
function Qr(s, e) {
  e = e !== void 0 ? e : {};
  const t = {}, r = e.grammarSource, i = { Contact: 119, Name_Addr_Header: 156, Record_Route: 176, Request_Response: 81, SIP_URI: 45, Subscription_State: 186, Supported: 191, Require: 182, Via: 194, absoluteURI: 84, Call_ID: 118, Content_Disposition: 130, Content_Length: 135, Content_Type: 136, CSeq: 146, displayName: 122, Event: 149, From: 151, host: 52, Max_Forwards: 154, Min_SE: 213, Proxy_Authenticate: 157, quoted_string: 40, Refer_To: 178, Replaces: 179, Session_Expires: 210, stun_URI: 217, To: 192, turn_URI: 223, uuid: 226, WWW_Authenticate: 209, challenge: 158, sipfrag: 230, Referred_By: 231 };
  let n = 119;
  const a = [
    `\r
`,
    g(`\r
`, !1),
    /^[0-9]/,
    E([["0", "9"]], !1, !1),
    /^[a-zA-Z]/,
    E([["a", "z"], ["A", "Z"]], !1, !1),
    /^[0-9a-fA-F]/,
    E([["0", "9"], ["a", "f"], ["A", "F"]], !1, !1),
    /^[\0-\xFF]/,
    E([["\0", "ÿ"]], !1, !1),
    /^["]/,
    E(['"'], !1, !1),
    " ",
    g(" ", !1),
    "	",
    g("	", !1),
    /^[a-zA-Z0-9]/,
    E([["a", "z"], ["A", "Z"], ["0", "9"]], !1, !1),
    ";",
    g(";", !1),
    "/",
    g("/", !1),
    "?",
    g("?", !1),
    ":",
    g(":", !1),
    "@",
    g("@", !1),
    "&",
    g("&", !1),
    "=",
    g("=", !1),
    "+",
    g("+", !1),
    "$",
    g("$", !1),
    ",",
    g(",", !1),
    "-",
    g("-", !1),
    "_",
    g("_", !1),
    ".",
    g(".", !1),
    "!",
    g("!", !1),
    "~",
    g("~", !1),
    "*",
    g("*", !1),
    "'",
    g("'", !1),
    "(",
    g("(", !1),
    ")",
    g(")", !1),
    "%",
    g("%", !1),
    function() {
      return " ";
    },
    function() {
      return ":";
    },
    /^[!-~]/,
    E([["!", "~"]], !1, !1),
    /^[\x80-\uFFFF]/,
    E([["", "￿"]], !1, !1),
    /^[\x80-\xBF]/,
    E([["", "¿"]], !1, !1),
    /^[a-f]/,
    E([["a", "f"]], !1, !1),
    "`",
    g("`", !1),
    "<",
    g("<", !1),
    ">",
    g(">", !1),
    "\\",
    g("\\", !1),
    "[",
    g("[", !1),
    "]",
    g("]", !1),
    "{",
    g("{", !1),
    "}",
    g("}", !1),
    function() {
      return "*";
    },
    function() {
      return "/";
    },
    function() {
      return "=";
    },
    function() {
      return "(";
    },
    function() {
      return ")";
    },
    function() {
      return ">";
    },
    function() {
      return "<";
    },
    function() {
      return ",";
    },
    function() {
      return ";";
    },
    function() {
      return ":";
    },
    function() {
      return '"';
    },
    /^[!-']/,
    E([["!", "'"]], !1, !1),
    /^[*-[]/,
    E([["*", "["]], !1, !1),
    /^[\]-~]/,
    E([["]", "~"]], !1, !1),
    function(l) {
      return l;
    },
    /^[#-[]/,
    E([["#", "["]], !1, !1),
    /^[\0-\t]/,
    E([["\0", "	"]], !1, !1),
    /^[\v-\f]/,
    E([["\v", "\f"]], !1, !1),
    /^[\x0E-\x7F]/,
    E([["", ""]], !1, !1),
    function() {
      e = e || { data: {} }, e.data.uri = new we(e.data.scheme, e.data.user, e.data.host, e.data.port), delete e.data.scheme, delete e.data.user, delete e.data.host, delete e.data.host_type, delete e.data.port;
    },
    function() {
      e = e || { data: {} }, e.data.uri = new we(e.data.scheme, e.data.user, e.data.host, e.data.port, e.data.uri_params, e.data.uri_headers), delete e.data.scheme, delete e.data.user, delete e.data.host, delete e.data.host_type, delete e.data.port, delete e.data.uri_params, e.startRule === "SIP_URI" && (e.data = e.data.uri);
    },
    "sips",
    g("sips", !0),
    "sip",
    g("sip", !0),
    function(l) {
      e = e || { data: {} }, e.data.scheme = l;
    },
    function() {
      e = e || { data: {} }, e.data.user = decodeURIComponent(S().slice(0, -1));
    },
    function() {
      e = e || { data: {} }, e.data.password = S();
    },
    function() {
      return e = e || { data: {} }, e.data.host = S(), e.data.host;
    },
    function() {
      return e = e || { data: {} }, e.data.host_type = "domain", S();
    },
    /^[a-zA-Z0-9_\-]/,
    E([["a", "z"], ["A", "Z"], ["0", "9"], "_", "-"], !1, !1),
    /^[a-zA-Z0-9\-]/,
    E([["a", "z"], ["A", "Z"], ["0", "9"], "-"], !1, !1),
    function() {
      return e = e || { data: {} }, e.data.host_type = "IPv6", S();
    },
    "::",
    g("::", !1),
    function() {
      return e = e || { data: {} }, e.data.host_type = "IPv6", S();
    },
    function() {
      return e = e || { data: {} }, e.data.host_type = "IPv4", S();
    },
    "25",
    g("25", !1),
    /^[0-5]/,
    E([["0", "5"]], !1, !1),
    "2",
    g("2", !1),
    /^[0-4]/,
    E([["0", "4"]], !1, !1),
    "1",
    g("1", !1),
    /^[1-9]/,
    E([["1", "9"]], !1, !1),
    function(l) {
      return e = e || { data: {} }, l = parseInt(l.join("")), e.data.port = l, l;
    },
    "transport=",
    g("transport=", !0),
    "udp",
    g("udp", !0),
    "tcp",
    g("tcp", !0),
    "sctp",
    g("sctp", !0),
    "tls",
    g("tls", !0),
    function(l) {
      e = e || { data: {} }, e.data.uri_params || (e.data.uri_params = {}), e.data.uri_params.transport = l.toLowerCase();
    },
    "user=",
    g("user=", !0),
    "phone",
    g("phone", !0),
    "ip",
    g("ip", !0),
    function(l) {
      e = e || { data: {} }, e.data.uri_params || (e.data.uri_params = {}), e.data.uri_params.user = l.toLowerCase();
    },
    "method=",
    g("method=", !0),
    function(l) {
      e = e || { data: {} }, e.data.uri_params || (e.data.uri_params = {}), e.data.uri_params.method = l;
    },
    "ttl=",
    g("ttl=", !0),
    function(l) {
      e = e || { data: {} }, e.data.params || (e.data.params = {}), e.data.params.ttl = l;
    },
    "maddr=",
    g("maddr=", !0),
    function(l) {
      e = e || { data: {} }, e.data.uri_params || (e.data.uri_params = {}), e.data.uri_params.maddr = l;
    },
    "lr",
    g("lr", !0),
    function() {
      e = e || { data: {} }, e.data.uri_params || (e.data.uri_params = {}), e.data.uri_params.lr = void 0;
    },
    function(l, m) {
      e = e || { data: {} }, e.data.uri_params || (e.data.uri_params = {}), m === null ? m = void 0 : m = m[1], e.data.uri_params[l.toLowerCase()] = m;
    },
    function(l, m) {
      l = l.join("").toLowerCase(), m = m.join(""), e = e || { data: {} }, e.data.uri_headers || (e.data.uri_headers = {}), e.data.uri_headers[l] ? e.data.uri_headers[l].push(m) : e.data.uri_headers[l] = [m];
    },
    function() {
      e = e || { data: {} }, e.startRule === "Refer_To" && (e.data.uri = new we(e.data.scheme, e.data.user, e.data.host, e.data.port, e.data.uri_params, e.data.uri_headers), delete e.data.scheme, delete e.data.user, delete e.data.host, delete e.data.host_type, delete e.data.port, delete e.data.uri_params);
    },
    "//",
    g("//", !1),
    function() {
      e = e || { data: {} }, e.data.scheme = S();
    },
    g("SIP", !0),
    function() {
      e = e || { data: {} }, e.data.sip_version = S();
    },
    "INVITE",
    g("INVITE", !1),
    "ACK",
    g("ACK", !1),
    "VXACH",
    g("VXACH", !1),
    "OPTIONS",
    g("OPTIONS", !1),
    "BYE",
    g("BYE", !1),
    "CANCEL",
    g("CANCEL", !1),
    "REGISTER",
    g("REGISTER", !1),
    "SUBSCRIBE",
    g("SUBSCRIBE", !1),
    "NOTIFY",
    g("NOTIFY", !1),
    "REFER",
    g("REFER", !1),
    "PUBLISH",
    g("PUBLISH", !1),
    function() {
      return e = e || { data: {} }, e.data.method = S(), e.data.method;
    },
    function(l) {
      e = e || { data: {} }, e.data.status_code = parseInt(l.join(""));
    },
    function() {
      e = e || { data: {} }, e.data.reason_phrase = S();
    },
    function() {
      e = e || { data: {} }, e.data = S();
    },
    function() {
      var l, m;
      for (e = e || { data: {} }, m = e.data.multi_header.length, l = 0; l < m; l++)
        if (e.data.multi_header[l].parsed === null) {
          e.data = null;
          break;
        }
      e.data !== null ? e.data = e.data.multi_header : e.data = -1;
    },
    function() {
      var l;
      e = e || { data: {} }, e.data.multi_header || (e.data.multi_header = []);
      try {
        l = new se(e.data.uri, e.data.displayName, e.data.params), delete e.data.uri, delete e.data.displayName, delete e.data.params;
      } catch {
        l = null;
      }
      e.data.multi_header.push({
        position: d,
        offset: D().start.offset,
        parsed: l
      });
    },
    function(l) {
      l = S().trim(), l[0] === '"' && (l = l.substring(1, l.length - 1)), e = e || { data: {} }, e.data.displayName = l;
    },
    "q",
    g("q", !0),
    function(l) {
      e = e || { data: {} }, e.data.params || (e.data.params = {}), e.data.params.q = l;
    },
    "expires",
    g("expires", !0),
    function(l) {
      e = e || { data: {} }, e.data.params || (e.data.params = {}), e.data.params.expires = l;
    },
    function(l) {
      return parseInt(l.join(""));
    },
    "0",
    g("0", !1),
    function() {
      return parseFloat(S());
    },
    function(l, m) {
      e = e || { data: {} }, e.data.params || (e.data.params = {}), m === null ? m = void 0 : m = m[1], e.data.params[l.toLowerCase()] = m;
    },
    "render",
    g("render", !0),
    "session",
    g("session", !0),
    "icon",
    g("icon", !0),
    "alert",
    g("alert", !0),
    function() {
      e = e || { data: {} }, e.startRule === "Content_Disposition" && (e.data.type = S().toLowerCase());
    },
    "handling",
    g("handling", !0),
    "optional",
    g("optional", !0),
    "required",
    g("required", !0),
    function(l) {
      e = e || { data: {} }, e.data = parseInt(l.join(""));
    },
    function() {
      e = e || { data: {} }, e.data = S();
    },
    "text",
    g("text", !0),
    "image",
    g("image", !0),
    "audio",
    g("audio", !0),
    "video",
    g("video", !0),
    "application",
    g("application", !0),
    "message",
    g("message", !0),
    "multipart",
    g("multipart", !0),
    "x-",
    g("x-", !0),
    function(l) {
      e = e || { data: {} }, e.data.value = parseInt(l.join(""));
    },
    function(l) {
      e = e || { data: {} }, e.data = l;
    },
    function(l) {
      e = e || { data: {} }, e.data.event = l.toLowerCase();
    },
    function() {
      e = e || { data: {} };
      var l = e.data.tag;
      e.data = new se(e.data.uri, e.data.displayName, e.data.params), l && e.data.setParam("tag", l);
    },
    "tag",
    g("tag", !0),
    function(l) {
      e = e || { data: {} }, e.data.tag = l;
    },
    function(l) {
      e = e || { data: {} }, e.data = parseInt(l.join(""));
    },
    function(l) {
      e = e || { data: {} }, e.data = l;
    },
    function() {
      e = e || { data: {} }, e.data = new se(e.data.uri, e.data.displayName, e.data.params);
    },
    "digest",
    g("Digest", !0),
    "realm",
    g("realm", !0),
    function(l) {
      e = e || { data: {} }, e.data.realm = l;
    },
    "domain",
    g("domain", !0),
    "nonce",
    g("nonce", !0),
    function(l) {
      e = e || { data: {} }, e.data.nonce = l;
    },
    "opaque",
    g("opaque", !0),
    function(l) {
      e = e || { data: {} }, e.data.opaque = l;
    },
    "stale",
    g("stale", !0),
    "true",
    g("true", !0),
    function() {
      e = e || { data: {} }, e.data.stale = !0;
    },
    "false",
    g("false", !0),
    function() {
      e = e || { data: {} }, e.data.stale = !1;
    },
    "algorithm",
    g("algorithm", !0),
    "md5",
    g("MD5", !0),
    "md5-sess",
    g("MD5-sess", !0),
    function(l) {
      e = e || { data: {} }, e.data.algorithm = l.toUpperCase();
    },
    "qop",
    g("qop", !0),
    "auth-int",
    g("auth-int", !0),
    "auth",
    g("auth", !0),
    function(l) {
      e = e || { data: {} }, e.data.qop || (e.data.qop = []), e.data.qop.push(l.toLowerCase());
    },
    function(l) {
      e = e || { data: {} }, e.data.value = parseInt(l.join(""));
    },
    function() {
      var l, m;
      for (e = e || { data: {} }, m = e.data.multi_header.length, l = 0; l < m; l++)
        if (e.data.multi_header[l].parsed === null) {
          e.data = null;
          break;
        }
      e.data !== null ? e.data = e.data.multi_header : e.data = -1;
    },
    function() {
      var l;
      e = e || { data: {} }, e.data.multi_header || (e.data.multi_header = []);
      try {
        l = new se(e.data.uri, e.data.displayName, e.data.params), delete e.data.uri, delete e.data.displayName, delete e.data.params;
      } catch {
        l = null;
      }
      e.data.multi_header.push({
        position: d,
        offset: D().start.offset,
        parsed: l
      });
    },
    function() {
      e = e || { data: {} }, e.data = new se(e.data.uri, e.data.displayName, e.data.params);
    },
    function() {
      e = e || { data: {} }, e.data.replaces_from_tag && e.data.replaces_to_tag || (e.data = -1);
    },
    function() {
      e = e || { data: {} }, e.data = {
        call_id: e.data
      };
    },
    "from-tag",
    g("from-tag", !0),
    function(l) {
      e = e || { data: {} }, e.data.replaces_from_tag = l;
    },
    "to-tag",
    g("to-tag", !0),
    function(l) {
      e = e || { data: {} }, e.data.replaces_to_tag = l;
    },
    "early-only",
    g("early-only", !0),
    function() {
      e = e || { data: {} }, e.data.early_only = !0;
    },
    function(l, m) {
      return m;
    },
    function(l, m) {
      return $(l, m);
    },
    function(l) {
      e = e || { data: {} }, e.startRule === "Require" && (e.data = l || []);
    },
    function(l) {
      e = e || { data: {} }, e.data.value = parseInt(l.join(""));
    },
    "active",
    g("active", !0),
    "pending",
    g("pending", !0),
    "terminated",
    g("terminated", !0),
    function() {
      e = e || { data: {} }, e.data.state = S();
    },
    "reason",
    g("reason", !0),
    function(l) {
      e = e || { data: {} }, typeof l < "u" && (e.data.reason = l);
    },
    function(l) {
      e = e || { data: {} }, typeof l < "u" && (e.data.expires = l);
    },
    "retry_after",
    g("retry_after", !0),
    function(l) {
      e = e || { data: {} }, typeof l < "u" && (e.data.retry_after = l);
    },
    "deactivated",
    g("deactivated", !0),
    "probation",
    g("probation", !0),
    "rejected",
    g("rejected", !0),
    "timeout",
    g("timeout", !0),
    "giveup",
    g("giveup", !0),
    "noresource",
    g("noresource", !0),
    "invariant",
    g("invariant", !0),
    function(l) {
      e = e || { data: {} }, e.startRule === "Supported" && (e.data = l || []);
    },
    function() {
      e = e || { data: {} };
      var l = e.data.tag;
      e.data = new se(e.data.uri, e.data.displayName, e.data.params), l && e.data.setParam("tag", l);
    },
    "ttl",
    g("ttl", !0),
    function(l) {
      e = e || { data: {} }, e.data.ttl = l;
    },
    "maddr",
    g("maddr", !0),
    function(l) {
      e = e || { data: {} }, e.data.maddr = l;
    },
    "received",
    g("received", !0),
    function(l) {
      e = e || { data: {} }, e.data.received = l;
    },
    "branch",
    g("branch", !0),
    function(l) {
      e = e || { data: {} }, e.data.branch = l;
    },
    "rport",
    g("rport", !0),
    function(l) {
      e = e || { data: {} }, typeof l < "u" && (e.data.rport = l.join(""));
    },
    function(l) {
      e = e || { data: {} }, e.data.protocol = l;
    },
    g("UDP", !0),
    g("TCP", !0),
    g("TLS", !0),
    g("SCTP", !0),
    function(l) {
      e = e || { data: {} }, e.data.transport = l;
    },
    function() {
      e = e || { data: {} }, e.data.host = S();
    },
    function(l) {
      e = e || { data: {} }, e.data.port = parseInt(l.join(""));
    },
    function(l) {
      return parseInt(l.join(""));
    },
    function(l) {
      e = e || { data: {} }, e.startRule === "Session_Expires" && (e.data.deltaSeconds = l);
    },
    "refresher",
    g("refresher", !1),
    "uas",
    g("uas", !1),
    "uac",
    g("uac", !1),
    function(l) {
      e = e || { data: {} }, e.startRule === "Session_Expires" && (e.data.refresher = l);
    },
    function(l) {
      e = e || { data: {} }, e.startRule === "Min_SE" && (e.data = l);
    },
    "stuns",
    g("stuns", !0),
    "stun",
    g("stun", !0),
    function(l) {
      e = e || { data: {} }, e.data.scheme = l;
    },
    function(l) {
      e = e || { data: {} }, e.data.host = l;
    },
    "?transport=",
    g("?transport=", !1),
    "turns",
    g("turns", !0),
    "turn",
    g("turn", !0),
    function(l) {
      e = e || { data: {} }, e.data.transport = l;
    },
    function() {
      e = e || { data: {} }, e.data = S();
    },
    "Referred-By",
    g("Referred-By", !1),
    "b",
    g("b", !1),
    "cid",
    g("cid", !1)
  ], o = [
    c('2 ""6 7!'),
    c('4"""5!7#'),
    c('4$""5!7%'),
    c(`4&""5!7'`),
    c(";'.# &;("),
    c('4(""5!7)'),
    c('4*""5!7+'),
    c('2,""6,7-'),
    c('2.""6.7/'),
    c('40""5!71'),
    c('22""6273. &24""6475.} &26""6677.q &28""6879.e &2:""6:7;.Y &2<""6<7=.M &2>""6>7?.A &2@""6@7A.5 &2B""6B7C.) &2D""6D7E'),
    c(";).# &;,"),
    c('2F""6F7G.} &2H""6H7I.q &2J""6J7K.e &2L""6L7M.Y &2N""6N7O.M &2P""6P7Q.A &2R""6R7S.5 &2T""6T7U.) &2V""6V7W'),
    c(`%%2X""6X7Y/5#;#/,$;#/#$+#)(#'#("'#&'#/"!&,)`),
    c(`%%$;$0#*;$&/,#; /#$+")("'#&'#." &"/=#$;$/&#0#*;$&&&#/'$8":Z" )("'#&'#`),
    c(';.." &"'),
    c(`%$;'.# &;(0)*;'.# &;(&/?#28""6879/0$;//'$8#:[# )(#'#("'#&'#`),
    c(`%%$;2/&#0#*;2&&&#/g#$%$;.0#*;.&/,#;2/#$+")("'#&'#0=*%$;.0#*;.&/,#;2/#$+")("'#&'#&/#$+")("'#&'#/"!&,)`),
    c('4\\""5!7].# &;3'),
    c('4^""5!7_'),
    c('4`""5!7a'),
    c(';!.) &4b""5!7c'),
    c('%$;). &2F""6F7G. &2J""6J7K.} &2L""6L7M.q &2X""6X7Y.e &2P""6P7Q.Y &2H""6H7I.M &2@""6@7A.A &2d""6d7e.5 &2R""6R7S.) &2N""6N7O/#0*;). &2F""6F7G. &2J""6J7K.} &2L""6L7M.q &2X""6X7Y.e &2P""6P7Q.Y &2H""6H7I.M &2@""6@7A.A &2d""6d7e.5 &2R""6R7S.) &2N""6N7O&&&#/"!&,)'),
    c('%$;). &2F""6F7G.} &2L""6L7M.q &2X""6X7Y.e &2P""6P7Q.Y &2H""6H7I.M &2@""6@7A.A &2d""6d7e.5 &2R""6R7S.) &2N""6N7O/#0*;). &2F""6F7G.} &2L""6L7M.q &2X""6X7Y.e &2P""6P7Q.Y &2H""6H7I.M &2@""6@7A.A &2d""6d7e.5 &2R""6R7S.) &2N""6N7O&&&#/"!&,)'),
    c(`2T""6T7U.ã &2V""6V7W.× &2f""6f7g.Ë &2h""6h7i.¿ &2:""6:7;.³ &2D""6D7E.§ &22""6273. &28""6879. &2j""6j7k. &;&.} &24""6475.q &2l""6l7m.e &2n""6n7o.Y &26""6677.M &2>""6>7?.A &2p""6p7q.5 &2r""6r7s.) &;'.# &;(`),
    c('%$;).ī &2F""6F7G.ğ &2J""6J7K.ē &2L""6L7M.ć &2X""6X7Y.û &2P""6P7Q.ï &2H""6H7I.ã &2@""6@7A.× &2d""6d7e.Ë &2R""6R7S.¿ &2N""6N7O.³ &2T""6T7U.§ &2V""6V7W. &2f""6f7g. &2h""6h7i. &28""6879.w &2j""6j7k.k &;&.e &24""6475.Y &2l""6l7m.M &2n""6n7o.A &26""6677.5 &2p""6p7q.) &2r""6r7s/Ĵ#0ı*;).ī &2F""6F7G.ğ &2J""6J7K.ē &2L""6L7M.ć &2X""6X7Y.û &2P""6P7Q.ï &2H""6H7I.ã &2@""6@7A.× &2d""6d7e.Ë &2R""6R7S.¿ &2N""6N7O.³ &2T""6T7U.§ &2V""6V7W. &2f""6f7g. &2h""6h7i. &28""6879.w &2j""6j7k.k &;&.e &24""6475.Y &2l""6l7m.M &2n""6n7o.A &26""6677.5 &2p""6p7q.) &2r""6r7s&&&#/"!&,)'),
    c(`%;//?#2P""6P7Q/0$;//'$8#:t# )(#'#("'#&'#`),
    c(`%;//?#24""6475/0$;//'$8#:u# )(#'#("'#&'#`),
    c(`%;//?#2>""6>7?/0$;//'$8#:v# )(#'#("'#&'#`),
    c(`%;//?#2T""6T7U/0$;//'$8#:w# )(#'#("'#&'#`),
    c(`%;//?#2V""6V7W/0$;//'$8#:x# )(#'#("'#&'#`),
    c(`%2h""6h7i/0#;//'$8":y" )("'#&'#`),
    c(`%;//6#2f""6f7g/'$8":z" )("'#&'#`),
    c(`%;//?#2D""6D7E/0$;//'$8#:{# )(#'#("'#&'#`),
    c(`%;//?#22""6273/0$;//'$8#:|# )(#'#("'#&'#`),
    c(`%;//?#28""6879/0$;//'$8#:}# )(#'#("'#&'#`),
    c(`%;//0#;&/'$8":~" )("'#&'#`),
    c(`%;&/0#;//'$8":~" )("'#&'#`),
    c(`%;=/T#$;G.) &;K.# &;F0/*;G.) &;K.# &;F&/,$;>/#$+#)(#'#("'#&'#`),
    c('4""5!7.A &4""5!7.5 &4""5!7.) &;3.# &;.'),
    c(`%%;//Q#;&/H$$;J.# &;K0)*;J.# &;K&/,$;&/#$+$)($'#(#'#("'#&'#/"!&,)`),
    c(`%;//]#;&/T$%$;J.# &;K0)*;J.# &;K&/"!&,)/1$;&/($8$:$!!)($'#(#'#("'#&'#`),
    c(';..G &2L""6L7M.; &4""5!7./ &4""5!7.# &;3'),
    c(`%2j""6j7k/J#4""5!7.5 &4""5!7.) &4""5!7/#$+")("'#&'#`),
    c(`%;N/M#28""6879/>$;O." &"/0$;S/'$8$:$ )($'#(#'#("'#&'#`),
    c(`%;N/d#28""6879/U$;O." &"/G$;S/>$;_/5$;l." &"/'$8&:& )(&'#(%'#($'#(#'#("'#&'#`),
    c(`%3""5$7.) &3""5#7/' 8!:!! )`),
    c(`%;P/]#%28""6879/,#;R/#$+")("'#&'#." &"/6$2:""6:7;/'$8#:# )(#'#("'#&'#`),
    c("$;+.) &;-.# &;Q/2#0/*;+.) &;-.# &;Q&&&#"),
    c('2<""6<7=.q &2>""6>7?.e &2@""6@7A.Y &2B""6B7C.M &2D""6D7E.A &22""6273.5 &26""6677.) &24""6475'),
    c('%$;+._ &;-.Y &2<""6<7=.M &2>""6>7?.A &2@""6@7A.5 &2B""6B7C.) &2D""6D7E0e*;+._ &;-.Y &2<""6<7=.M &2>""6>7?.A &2@""6@7A.5 &2B""6B7C.) &2D""6D7E&/& 8!:! )'),
    c(`%;T/J#%28""6879/,#;^/#$+")("'#&'#." &"/#$+")("'#&'#`),
    c("%;U.) &;\\.# &;X/& 8!:! )"),
    c(`%$%;V/2#2J""6J7K/#$+")("'#&'#0<*%;V/2#2J""6J7K/#$+")("'#&'#&/D#;W/;$2J""6J7K." &"/'$8#:# )(#'#("'#&'#`),
    c('$4""5!7/,#0)*4""5!7&&&#'),
    c(`%4$""5!7%/?#$4""5!70)*4""5!7&/#$+")("'#&'#`),
    c(`%2l""6l7m/?#;Y/6$2n""6n7o/'$8#:# )(#'#("'#&'#`),
    c(`%%;Z/³#28""6879/¤$;Z/$28""6879/$;Z/$28""6879/t$;Z/k$28""6879/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+-)(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#.ސ &%2""67/¤#;Z/$28""6879/$;Z/$28""6879/t$;Z/k$28""6879/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+,)(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#.۹ &%2""67/#;Z/$28""6879/t$;Z/k$28""6879/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+*)(*'#()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#.ٺ &%2""67/t#;Z/k$28""6879/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+()(('#(''#(&'#(%'#($'#(#'#("'#&'#.ؓ &%2""67/\\#;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+&)(&'#(%'#($'#(#'#("'#&'#.ׄ &%2""67/D#;Z/;$28""6879/,$;[/#$+$)($'#(#'#("'#&'#.֍ &%2""67/,#;[/#$+")("'#&'#.ծ &%2""67/,#;Z/#$+")("'#&'#.Տ &%;Z/#2""67/$;Z/$28""6879/t$;Z/k$28""6879/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$++)(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#.Ӈ &%;Z/ª#%28""6879/,#;Z/#$+")("'#&'#." &"/$2""67/t$;Z/k$28""6879/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+*)(*'#()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#.а &%;Z/¹#%28""6879/,#;Z/#$+")("'#&'#." &"/$%28""6879/,#;Z/#$+")("'#&'#." &"/k$2""67/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+))()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#.Ί &%;Z/È#%28""6879/,#;Z/#$+")("'#&'#." &"/¡$%28""6879/,#;Z/#$+")("'#&'#." &"/z$%28""6879/,#;Z/#$+")("'#&'#." &"/S$2""67/D$;Z/;$28""6879/,$;[/#$+()(('#(''#(&'#(%'#($'#(#'#("'#&'#.˕ &%;Z/×#%28""6879/,#;Z/#$+")("'#&'#." &"/°$%28""6879/,#;Z/#$+")("'#&'#." &"/$%28""6879/,#;Z/#$+")("'#&'#." &"/b$%28""6879/,#;Z/#$+")("'#&'#." &"/;$2""67/,$;[/#$+')(''#(&'#(%'#($'#(#'#("'#&'#.ȑ &%;Z/þ#%28""6879/,#;Z/#$+")("'#&'#." &"/×$%28""6879/,#;Z/#$+")("'#&'#." &"/°$%28""6879/,#;Z/#$+")("'#&'#." &"/$%28""6879/,#;Z/#$+")("'#&'#." &"/b$%28""6879/,#;Z/#$+")("'#&'#." &"/;$2""67/,$;Z/#$+()(('#(''#(&'#(%'#($'#(#'#("'#&'#.Ħ &%;Z/Ĝ#%28""6879/,#;Z/#$+")("'#&'#." &"/õ$%28""6879/,#;Z/#$+")("'#&'#." &"/Î$%28""6879/,#;Z/#$+")("'#&'#." &"/§$%28""6879/,#;Z/#$+")("'#&'#." &"/$%28""6879/,#;Z/#$+")("'#&'#." &"/Y$%28""6879/,#;Z/#$+")("'#&'#." &"/2$2""67/#$+()(('#(''#(&'#(%'#($'#(#'#("'#&'#/& 8!: ! )`),
    c(`%;#/M#;#." &"/?$;#." &"/1$;#." &"/#$+$)($'#(#'#("'#&'#`),
    c(`%;Z/;#28""6879/,$;Z/#$+#)(#'#("'#&'#.# &;\\`),
    c(`%;]/o#2J""6J7K/\`$;]/W$2J""6J7K/H$;]/?$2J""6J7K/0$;]/'$8':¡' )(''#(&'#(%'#($'#(#'#("'#&'#`),
    c(`%2¢""6¢7£/2#4¤""5!7¥/#$+")("'#&'#. &%2¦""6¦7§/;#4¨""5!7©/,$;!/#$+#)(#'#("'#&'#.j &%2ª""6ª7«/5#;!/,$;!/#$+#)(#'#("'#&'#.B &%4¬""5!7­/,#;!/#$+")("'#&'#.# &;!`),
    c(`%%;!." &"/[#;!." &"/M$;!." &"/?$;!." &"/1$;!." &"/#$+%)(%'#($'#(#'#("'#&'#/' 8!:®!! )`),
    c(`$%22""6273/,#;\`/#$+")("'#&'#0<*%22""6273/,#;\`/#$+")("'#&'#&`),
    c(";a.A &;b.; &;c.5 &;d./ &;e.) &;f.# &;g"),
    c(`%3¯""5*7°/a#3±""5#7².G &3³""5#7´.; &3µ""5$7¶./ &3·""5#7¸.# &;6/($8":¹"! )("'#&'#`),
    c(`%3º""5%7»/I#3¼""5%7½./ &3¾""5"7¿.# &;6/($8":À"! )("'#&'#`),
    c(`%3Á""5'7Â/1#;/($8":Ã"! )("'#&'#`),
    c(`%3Ä""5$7Å/1#;ð/($8":Æ"! )("'#&'#`),
    c(`%3Ç""5&7È/1#;T/($8":É"! )("'#&'#`),
    c(`%3Ê""5"7Ë/N#%2>""6>7?/,#;6/#$+")("'#&'#." &"/'$8":Ì" )("'#&'#`),
    c(`%;h/P#%2>""6>7?/,#;i/#$+")("'#&'#." &"/)$8":Í""! )("'#&'#`),
    c('%$;j/&#0#*;j&&&#/"!&,)'),
    c('%$;j/&#0#*;j&&&#/"!&,)'),
    c(";k.) &;+.# &;-"),
    c('2l""6l7m.e &2n""6n7o.Y &24""6475.M &28""6879.A &2<""6<7=.5 &2@""6@7A.) &2B""6B7C'),
    c(`%26""6677/n#;m/e$$%2<""6<7=/,#;m/#$+")("'#&'#0<*%2<""6<7=/,#;m/#$+")("'#&'#&/#$+#)(#'#("'#&'#`),
    c(`%;n/A#2>""6>7?/2$;o/)$8#:Î#"" )(#'#("'#&'#`),
    c("$;p.) &;+.# &;-/2#0/*;p.) &;+.# &;-&&&#"),
    c("$;p.) &;+.# &;-0/*;p.) &;+.# &;-&"),
    c('2l""6l7m.e &2n""6n7o.Y &24""6475.M &26""6677.A &28""6879.5 &2@""6@7A.) &2B""6B7C'),
    c(";.# &;r"),
    c(`%;/G#;'/>$;s/5$;'/,$;/#$+%)(%'#($'#(#'#("'#&'#`),
    c(";M.# &;t"),
    c(`%;/E#28""6879/6$;u.# &;x/'$8#:Ï# )(#'#("'#&'#`),
    c(`%;v.# &;w/J#%26""6677/,#;/#$+")("'#&'#." &"/#$+")("'#&'#`),
    c(`%2Ð""6Ð7Ñ/:#;/1$;w." &"/#$+#)(#'#("'#&'#`),
    c(`%24""6475/,#;{/#$+")("'#&'#`),
    c(`%;z/3#$;y0#*;y&/#$+")("'#&'#`),
    c(";*.) &;+.# &;-"),
    c(';+. &;-. &22""6273.} &26""6677.q &28""6879.e &2:""6:7;.Y &2<""6<7=.M &2>""6>7?.A &2@""6@7A.5 &2B""6B7C.) &2D""6D7E'),
    c(`%;|/e#$%24""6475/,#;|/#$+")("'#&'#0<*%24""6475/,#;|/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%$;~0#*;~&/e#$%22""6273/,#;}/#$+")("'#&'#0<*%22""6273/,#;}/#$+")("'#&'#&/#$+")("'#&'#`),
    c("$;~0#*;~&"),
    c(';+.w &;-.q &28""6879.e &2:""6:7;.Y &2<""6<7=.M &2>""6>7?.A &2@""6@7A.5 &2B""6B7C.) &2D""6D7E'),
    c(`%%;"/#$;".G &;!.A &2@""6@7A.5 &2F""6F7G.) &2J""6J7K0M*;".G &;!.A &2@""6@7A.5 &2F""6F7G.) &2J""6J7K&/#$+")("'#&'#/& 8!:Ò! )`),
    c(";.# &;"),
    c(`%%;O/2#2:""6:7;/#$+")("'#&'#." &"/,#;S/#$+")("'#&'#." &"`),
    c('$;+. &;-.} &2B""6B7C.q &2D""6D7E.e &22""6273.Y &28""6879.M &2:""6:7;.A &2<""6<7=.5 &2>""6>7?.) &2@""6@7A/#0*;+. &;-.} &2B""6B7C.q &2D""6D7E.e &22""6273.Y &28""6879.M &2:""6:7;.A &2<""6<7=.5 &2>""6>7?.) &2@""6@7A&&&#'),
    c("$;y0#*;y&"),
    c(`%3""5#7Ó/q#24""6475/b$$;!/&#0#*;!&&&#/L$2J""6J7K/=$$;!/&#0#*;!&&&#/'$8%:Ô% )(%'#($'#(#'#("'#&'#`),
    c('2Õ""6Õ7Ö'),
    c('2×""6×7Ø'),
    c('2Ù""6Ù7Ú'),
    c('2Û""6Û7Ü'),
    c('2Ý""6Ý7Þ'),
    c('2ß""6ß7à'),
    c('2á""6á7â'),
    c('2ã""6ã7ä'),
    c('2å""6å7æ'),
    c('2ç""6ç7è'),
    c('2é""6é7ê'),
    c("%;.Y &;.S &;.M &;.G &;.A &;.; &;.5 &;./ &;.) &;.# &;6/& 8!:ë! )"),
    c(`%;/G#;'/>$;/5$;'/,$;/#$+%)(%'#($'#(#'#("'#&'#`),
    c("%;/' 8!:ì!! )"),
    c(`%;!/5#;!/,$;!/#$+#)(#'#("'#&'#`),
    c("%$;*.A &;+.; &;-.5 &;3./ &;4.) &;'.# &;(0G*;*.A &;+.; &;-.5 &;3./ &;4.) &;'.# &;(&/& 8!:í! )"),
    c(`%;¶/Y#$%;A/,#;¶/#$+")("'#&'#06*%;A/,#;¶/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%;9/N#%2:""6:7;/,#;9/#$+")("'#&'#." &"/'$8":î" )("'#&'#`),
    c(`%;:.c &%;/Y#$%;A/,#;/#$+")("'#&'#06*%;A/,#;/#$+")("'#&'#&/#$+")("'#&'#/& 8!:ï! )`),
    c(`%;L.# &;/]#$%;B/,#;/#$+")("'#&'#06*%;B/,#;/#$+")("'#&'#&/'$8":ð" )("'#&'#`),
    c(`%;." &"/>#;@/5$;M/,$;?/#$+$)($'#(#'#("'#&'#`),
    c(`%%;6/Y#$%;./,#;6/#$+")("'#&'#06*%;./,#;6/#$+")("'#&'#&/#$+")("'#&'#.# &;H/' 8!:ñ!! )`),
    c(";.) &;.# &; "),
    c(`%3ò""5!7ó/:#;</1$;/($8#:ô#! )(#'#("'#&'#`),
    c(`%3õ""5'7ö/:#;</1$;/($8#:÷#! )(#'#("'#&'#`),
    c("%$;!/&#0#*;!&&&#/' 8!:ø!! )"),
    c(`%2ù""6ù7ú/o#%2J""6J7K/M#;!." &"/?$;!." &"/1$;!." &"/#$+$)($'#(#'#("'#&'#." &"/'$8":û" )("'#&'#`),
    c(`%;6/J#%;</,#;¡/#$+")("'#&'#." &"/)$8":ü""! )("'#&'#`),
    c(";6.) &;T.# &;H"),
    c(`%;£/Y#$%;B/,#;¤/#$+")("'#&'#06*%;B/,#;¤/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%3ý""5&7þ.G &3ÿ""5'7Ā.; &3ā""5$7Ă./ &3ă""5%7Ą.# &;6/& 8!:ą! )`),
    c(";¥.# &; "),
    c(`%3Ć""5(7ć/M#;</D$3Ĉ""5(7ĉ./ &3Ċ""5(7ċ.# &;6/#$+#)(#'#("'#&'#`),
    c(`%;6/Y#$%;A/,#;6/#$+")("'#&'#06*%;A/,#;6/#$+")("'#&'#&/#$+")("'#&'#`),
    c("%$;!/&#0#*;!&&&#/' 8!:Č!! )"),
    c("%;©/& 8!:č! )"),
    c(`%;ª/k#;;/b$;¯/Y$$%;B/,#;°/#$+")("'#&'#06*%;B/,#;°/#$+")("'#&'#&/#$+$)($'#(#'#("'#&'#`),
    c(";«.# &;¬"),
    c('3Ď""5$7ď.S &3Đ""5%7đ.G &3Ē""5%7ē.; &3Ĕ""5%7ĕ./ &3Ė""5+7ė.# &;­'),
    c(`3Ę""5'7ę./ &3Ě""5)7ě.# &;­`),
    c(";6.# &;®"),
    c(`%3Ĝ""5"7ĝ/,#;6/#$+")("'#&'#`),
    c(";­.# &;6"),
    c(`%;6/5#;</,$;±/#$+#)(#'#("'#&'#`),
    c(";6.# &;H"),
    c(`%;³/5#;./,$;/#$+#)(#'#("'#&'#`),
    c("%$;!/&#0#*;!&&&#/' 8!:Ğ!! )"),
    c("%;/' 8!:ğ!! )"),
    c(`%;¶/^#$%;B/,#; /#$+")("'#&'#06*%;B/,#; /#$+")("'#&'#&/($8":Ġ"!!)("'#&'#`),
    c(`%%;7/e#$%2J""6J7K/,#;7/#$+")("'#&'#0<*%2J""6J7K/,#;7/#$+")("'#&'#&/#$+")("'#&'#/"!&,)`),
    c(`%;L.# &;/]#$%;B/,#;¸/#$+")("'#&'#06*%;B/,#;¸/#$+")("'#&'#&/'$8":ġ" )("'#&'#`),
    c(";¹.# &; "),
    c(`%3Ģ""5#7ģ/:#;</1$;6/($8#:Ĥ#! )(#'#("'#&'#`),
    c("%$;!/&#0#*;!&&&#/' 8!:ĥ!! )"),
    c("%;/' 8!:Ħ!! )"),
    c(`%$;0#*;&/x#;@/o$;M/f$;?/]$$%;B/,#; /#$+")("'#&'#06*%;B/,#; /#$+")("'#&'#&/'$8%:ħ% )(%'#($'#(#'#("'#&'#`),
    c(";¾"),
    c(`%3Ĩ""5&7ĩ/k#;./b$;Á/Y$$%;A/,#;Á/#$+")("'#&'#06*%;A/,#;Á/#$+")("'#&'#&/#$+$)($'#(#'#("'#&'#.# &;¿`),
    c(`%;6/k#;./b$;À/Y$$%;A/,#;À/#$+")("'#&'#06*%;A/,#;À/#$+")("'#&'#&/#$+$)($'#(#'#("'#&'#`),
    c(`%;6/;#;</2$;6.# &;H/#$+#)(#'#("'#&'#`),
    c(";Â.G &;Ä.A &;Æ.; &;È.5 &;É./ &;Ê.) &;Ë.# &;À"),
    c(`%3Ī""5%7ī/5#;</,$;Ã/#$+#)(#'#("'#&'#`),
    c("%;I/' 8!:Ĭ!! )"),
    c(`%3ĭ""5&7Į/#;</$;D/$;Å/|$$%$;'/&#0#*;'&&&#/,#;Å/#$+")("'#&'#0C*%$;'/&#0#*;'&&&#/,#;Å/#$+")("'#&'#&/,$;E/#$+&)(&'#(%'#($'#(#'#("'#&'#`),
    c(";t.# &;w"),
    c(`%3į""5%7İ/5#;</,$;Ç/#$+#)(#'#("'#&'#`),
    c("%;I/' 8!:ı!! )"),
    c(`%3Ĳ""5&7ĳ/:#;</1$;I/($8#:Ĵ#! )(#'#("'#&'#`),
    c(`%3ĵ""5%7Ķ/]#;</T$%3ķ""5$7ĸ/& 8!:Ĺ! ).4 &%3ĺ""5%7Ļ/& 8!:ļ! )/#$+#)(#'#("'#&'#`),
    c(`%3Ľ""5)7ľ/R#;</I$3Ŀ""5#7ŀ./ &3Ł""5(7ł.# &;6/($8#:Ń#! )(#'#("'#&'#`),
    c(`%3ń""5#7Ņ/#;</$;D/$%;Ì/e#$%2D""6D7E/,#;Ì/#$+")("'#&'#0<*%2D""6D7E/,#;Ì/#$+")("'#&'#&/#$+")("'#&'#/,$;E/#$+%)(%'#($'#(#'#("'#&'#`),
    c(`%3ņ""5(7Ň./ &3ň""5$7ŉ.# &;6/' 8!:Ŋ!! )`),
    c(`%;6/Y#$%;A/,#;6/#$+")("'#&'#06*%;A/,#;6/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%;Ï/G#;./>$;Ï/5$;./,$;/#$+%)(%'#($'#(#'#("'#&'#`),
    c("%$;!/&#0#*;!&&&#/' 8!:ŋ!! )"),
    c(`%;Ñ/]#$%;A/,#;Ñ/#$+")("'#&'#06*%;A/,#;Ñ/#$+")("'#&'#&/'$8":Ō" )("'#&'#`),
    c(`%;/]#$%;B/,#; /#$+")("'#&'#06*%;B/,#; /#$+")("'#&'#&/'$8":ō" )("'#&'#`),
    c(`%;L.O &;.I &%;@." &"/:#;t/1$;?." &"/#$+#)(#'#("'#&'#/]#$%;B/,#; /#$+")("'#&'#06*%;B/,#; /#$+")("'#&'#&/'$8":Ŏ" )("'#&'#`),
    c(`%;Ô/]#$%;B/,#;Õ/#$+")("'#&'#06*%;B/,#;Õ/#$+")("'#&'#&/'$8":ŏ" )("'#&'#`),
    c("%;/& 8!:Ő! )"),
    c(`%3ő""5(7Œ/:#;</1$;6/($8#:œ#! )(#'#("'#&'#.g &%3Ŕ""5&7ŕ/:#;</1$;6/($8#:Ŗ#! )(#'#("'#&'#.: &%3ŗ""5*7Ř/& 8!:ř! ).# &; `),
    c(`%%;6/k#$%;A/2#;6/)$8":Ś""$ )("'#&'#0<*%;A/2#;6/)$8":Ś""$ )("'#&'#&/)$8":ś""! )("'#&'#." &"/' 8!:Ŝ!! )`),
    c(`%;Ø/Y#$%;A/,#;Ø/#$+")("'#&'#06*%;A/,#;Ø/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%;/Y#$%;B/,#; /#$+")("'#&'#06*%;B/,#; /#$+")("'#&'#&/#$+")("'#&'#`),
    c("%$;!/&#0#*;!&&&#/' 8!:ŝ!! )"),
    c(`%;Û/Y#$%;B/,#;Ü/#$+")("'#&'#06*%;B/,#;Ü/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%3Ş""5&7ş.; &3Š""5'7š./ &3Ţ""5*7ţ.# &;6/& 8!:Ť! )`),
    c(`%3ť""5&7Ŧ/:#;</1$;Ý/($8#:ŧ#! )(#'#("'#&'#.} &%3õ""5'7ö/:#;</1$;/($8#:Ũ#! )(#'#("'#&'#.P &%3ũ""5+7Ū/:#;</1$;/($8#:ū#! )(#'#("'#&'#.# &; `),
    c(`3Ŭ""5+7ŭ.k &3Ů""5)7ů._ &3Ű""5(7ű.S &3Ų""5'7ų.G &3Ŵ""5&7ŵ.; &3Ŷ""5*7ŷ./ &3Ÿ""5)7Ź.# &;6`),
    c(';1." &"'),
    c(`%%;6/k#$%;A/2#;6/)$8":Ś""$ )("'#&'#0<*%;A/2#;6/)$8":Ś""$ )("'#&'#&/)$8":ś""! )("'#&'#." &"/' 8!:ź!! )`),
    c(`%;L.# &;/]#$%;B/,#;á/#$+")("'#&'#06*%;B/,#;á/#$+")("'#&'#&/'$8":Ż" )("'#&'#`),
    c(";¹.# &; "),
    c(`%;ã/Y#$%;A/,#;ã/#$+")("'#&'#06*%;A/,#;ã/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%;ê/k#;./b$;í/Y$$%;B/,#;ä/#$+")("'#&'#06*%;B/,#;ä/#$+")("'#&'#&/#$+$)($'#(#'#("'#&'#`),
    c(";å.; &;æ.5 &;ç./ &;è.) &;é.# &; "),
    c(`%3ż""5#7Ž/:#;</1$;ð/($8#:ž#! )(#'#("'#&'#`),
    c(`%3ſ""5%7ƀ/:#;</1$;T/($8#:Ɓ#! )(#'#("'#&'#`),
    c(`%3Ƃ""5(7ƃ/F#;</=$;\\.) &;Y.# &;X/($8#:Ƅ#! )(#'#("'#&'#`),
    c(`%3ƅ""5&7Ɔ/:#;</1$;6/($8#:Ƈ#! )(#'#("'#&'#`),
    c(`%3ƈ""5%7Ɖ/A#;</8$$;!0#*;!&/($8#:Ɗ#! )(#'#("'#&'#`),
    c(`%;ë/G#;;/>$;6/5$;;/,$;ì/#$+%)(%'#($'#(#'#("'#&'#`),
    c(`%3""5#7Ó.# &;6/' 8!:Ƌ!! )`),
    c(`%3±""5#7ƌ.G &3³""5#7ƍ.; &3·""5#7Ǝ./ &3µ""5$7Ə.# &;6/' 8!:Ɛ!! )`),
    c(`%;î/D#%;C/,#;ï/#$+")("'#&'#." &"/#$+")("'#&'#`),
    c("%;U.) &;\\.# &;X/& 8!:Ƒ! )"),
    c(`%%;!." &"/[#;!." &"/M$;!." &"/?$;!." &"/1$;!." &"/#$+%)(%'#($'#(#'#("'#&'#/' 8!:ƒ!! )`),
    c(`%%;!/?#;!." &"/1$;!." &"/#$+#)(#'#("'#&'#/' 8!:Ɠ!! )`),
    c(";¾"),
    c(`%;/^#$%;B/,#;ó/#$+")("'#&'#06*%;B/,#;ó/#$+")("'#&'#&/($8":Ɣ"!!)("'#&'#`),
    c(";ô.# &; "),
    c(`%2ƕ""6ƕ7Ɩ/L#;</C$2Ɨ""6Ɨ7Ƙ.) &2ƙ""6ƙ7ƚ/($8#:ƛ#! )(#'#("'#&'#`),
    c(`%;/^#$%;B/,#; /#$+")("'#&'#06*%;B/,#; /#$+")("'#&'#&/($8":Ɯ"!!)("'#&'#`),
    c(`%;6/5#;0/,$;÷/#$+#)(#'#("'#&'#`),
    c("$;2.) &;4.# &;.0/*;2.) &;4.# &;.&"),
    c("$;%0#*;%&"),
    c(`%;ú/;#28""6879/,$;û/#$+#)(#'#("'#&'#`),
    c(`%3Ɲ""5%7ƞ.) &3Ɵ""5$7Ơ/' 8!:ơ!! )`),
    c(`%;ü/J#%28""6879/,#;^/#$+")("'#&'#." &"/#$+")("'#&'#`),
    c("%;\\.) &;X.# &;/' 8!:Ƣ!! )"),
    c(';".S &;!.M &2F""6F7G.A &2J""6J7K.5 &2H""6H7I.) &2N""6N7O'),
    c('2L""6L7M. &2B""6B7C. &2<""6<7=.} &2R""6R7S.q &2T""6T7U.e &2V""6V7W.Y &2P""6P7Q.M &2@""6@7A.A &2D""6D7E.5 &22""6273.) &2>""6>7?'),
    c(`%;Ā/b#28""6879/S$;û/J$%2ƣ""6ƣ7Ƥ/,#;ì/#$+")("'#&'#." &"/#$+$)($'#(#'#("'#&'#`),
    c(`%3ƥ""5%7Ʀ.) &3Ƨ""5$7ƨ/' 8!:ơ!! )`),
    c(`%3±""5#7².6 &3³""5#7´.* &$;+0#*;+&/' 8!:Ʃ!! )`),
    c(`%;Ą/#2F""6F7G/x$;ă/o$2F""6F7G/\`$;ă/W$2F""6F7G/H$;ă/?$2F""6F7G/0$;ą/'$8):ƪ) )()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#`),
    c(`%;#/>#;#/5$;#/,$;#/#$+$)($'#(#'#("'#&'#`),
    c(`%;ă/,#;ă/#$+")("'#&'#`),
    c(`%;ă/5#;ă/,$;ă/#$+#)(#'#("'#&'#`),
    c(`%;q/T#$;m0#*;m&/D$%; /,#;ø/#$+")("'#&'#." &"/#$+#)(#'#("'#&'#`),
    c(`%2ƫ""6ƫ7Ƭ.) &2ƭ""6ƭ7Ʈ/w#;0/n$;Ĉ/e$$%;B/2#;ĉ.# &; /#$+")("'#&'#0<*%;B/2#;ĉ.# &; /#$+")("'#&'#&/#$+$)($'#(#'#("'#&'#`),
    c(";.# &;L"),
    c(`%2Ư""6Ư7ư/5#;</,$;Ċ/#$+#)(#'#("'#&'#`),
    c(`%;D/S#;,/J$2:""6:7;/;$;,.# &;T/,$;E/#$+%)(%'#($'#(#'#("'#&'#`)
  ];
  let d = 0, h = 0;
  const u = [{ line: 1, column: 1 }];
  let f = 0, w = [], T = 0, R;
  if (e.startRule !== void 0) {
    if (!(e.startRule in i))
      throw new Error(`Can't start parsing from rule "` + e.startRule + '".');
    n = i[e.startRule];
  }
  function S() {
    return s.substring(h, d);
  }
  function D() {
    return Z(h, d);
  }
  function g(l, m) {
    return { type: "literal", text: l, ignoreCase: m };
  }
  function E(l, m, p) {
    return { type: "class", parts: l, inverted: m, ignoreCase: p };
  }
  function _() {
    return { type: "end" };
  }
  function q(l) {
    let m = u[l], p;
    if (m)
      return m;
    for (p = l - 1; !u[p]; )
      p--;
    for (m = u[p], m = {
      line: m.line,
      column: m.column
    }; p < l; )
      s.charCodeAt(p) === 10 ? (m.line++, m.column = 1) : m.column++, p++;
    return u[l] = m, m;
  }
  function Z(l, m) {
    const p = q(l), M = q(m);
    return {
      source: r,
      start: {
        offset: l,
        line: p.line,
        column: p.column
      },
      end: {
        offset: m,
        line: M.line,
        column: M.column
      }
    };
  }
  function U(l) {
    d < f || (d > f && (f = d, w = []), w.push(l));
  }
  function b(l, m, p) {
    return new Ue(Ue.buildMessage(l, m), l, m, p);
  }
  function c(l) {
    return l.split("").map((m) => m.charCodeAt(0) - 32);
  }
  function I(l) {
    const m = o[l];
    let p = 0;
    const M = [];
    let k = m.length;
    const Q = [], P = [];
    let he;
    for (; ; ) {
      for (; p < k; )
        switch (m[p]) {
          case 0:
            P.push(a[m[p + 1]]), p += 2;
            break;
          case 1:
            P.push(void 0), p++;
            break;
          case 2:
            P.push(null), p++;
            break;
          case 3:
            P.push(t), p++;
            break;
          case 4:
            P.push([]), p++;
            break;
          case 5:
            P.push(d), p++;
            break;
          case 6:
            P.pop(), p++;
            break;
          case 7:
            d = P.pop(), p++;
            break;
          case 8:
            P.length -= m[p + 1], p += 2;
            break;
          case 9:
            P.splice(-2, 1), p++;
            break;
          case 10:
            P[P.length - 2].push(P.pop()), p++;
            break;
          case 11:
            P.push(P.splice(P.length - m[p + 1], m[p + 1])), p += 2;
            break;
          case 12:
            P.push(s.substring(P.pop(), d)), p++;
            break;
          case 13:
            Q.push(k), M.push(p + 3 + m[p + 1] + m[p + 2]), P[P.length - 1] ? (k = p + 3 + m[p + 1], p += 3) : (k = p + 3 + m[p + 1] + m[p + 2], p += 3 + m[p + 1]);
            break;
          case 14:
            Q.push(k), M.push(p + 3 + m[p + 1] + m[p + 2]), P[P.length - 1] === t ? (k = p + 3 + m[p + 1], p += 3) : (k = p + 3 + m[p + 1] + m[p + 2], p += 3 + m[p + 1]);
            break;
          case 15:
            Q.push(k), M.push(p + 3 + m[p + 1] + m[p + 2]), P[P.length - 1] !== t ? (k = p + 3 + m[p + 1], p += 3) : (k = p + 3 + m[p + 1] + m[p + 2], p += 3 + m[p + 1]);
            break;
          case 16:
            P[P.length - 1] !== t ? (Q.push(k), M.push(p), k = p + 2 + m[p + 1], p += 2) : p += 2 + m[p + 1];
            break;
          case 17:
            Q.push(k), M.push(p + 3 + m[p + 1] + m[p + 2]), s.length > d ? (k = p + 3 + m[p + 1], p += 3) : (k = p + 3 + m[p + 1] + m[p + 2], p += 3 + m[p + 1]);
            break;
          case 18:
            Q.push(k), M.push(p + 4 + m[p + 2] + m[p + 3]), s.substr(d, a[m[p + 1]].length) === a[m[p + 1]] ? (k = p + 4 + m[p + 2], p += 4) : (k = p + 4 + m[p + 2] + m[p + 3], p += 4 + m[p + 2]);
            break;
          case 19:
            Q.push(k), M.push(p + 4 + m[p + 2] + m[p + 3]), s.substr(d, a[m[p + 1]].length).toLowerCase() === a[m[p + 1]] ? (k = p + 4 + m[p + 2], p += 4) : (k = p + 4 + m[p + 2] + m[p + 3], p += 4 + m[p + 2]);
            break;
          case 20:
            Q.push(k), M.push(p + 4 + m[p + 2] + m[p + 3]), a[m[p + 1]].test(s.charAt(d)) ? (k = p + 4 + m[p + 2], p += 4) : (k = p + 4 + m[p + 2] + m[p + 3], p += 4 + m[p + 2]);
            break;
          case 21:
            P.push(s.substr(d, m[p + 1])), d += m[p + 1], p += 2;
            break;
          case 22:
            P.push(a[m[p + 1]]), d += a[m[p + 1]].length, p += 2;
            break;
          case 23:
            P.push(t), T === 0 && U(a[m[p + 1]]), p += 2;
            break;
          case 24:
            h = P[P.length - 1 - m[p + 1]], p += 2;
            break;
          case 25:
            h = d, p++;
            break;
          case 26:
            he = m.slice(p + 4, p + 4 + m[p + 3]).map(function(ae) {
              return P[P.length - 1 - ae];
            }), P.splice(P.length - m[p + 2], m[p + 2], a[m[p + 1]].apply(null, he)), p += 4 + m[p + 3];
            break;
          case 27:
            P.push(I(m[p + 1])), p += 2;
            break;
          case 28:
            T++, p++;
            break;
          case 29:
            T--, p++;
            break;
          default:
            throw new Error("Invalid opcode: " + m[p] + ".");
        }
      if (Q.length > 0)
        k = Q.pop(), p = M.pop();
      else
        break;
    }
    return P[0];
  }
  e.data = {};
  function $(l, m) {
    return [l].concat(m);
  }
  if (R = I(n), R !== t && d === s.length)
    return R;
  throw R !== t && d < s.length && U(_()), b(w, f < s.length ? s.charAt(f) : null, f < s.length ? Z(f, f + 1) : Z(f, f));
}
const ei = Qr;
var J;
(function(s) {
  function e(i, n) {
    const a = { startRule: n };
    try {
      ei(i, a);
    } catch {
      a.data = -1;
    }
    return a.data;
  }
  s.parse = e;
  function t(i) {
    const n = s.parse(i, "Name_Addr_Header");
    return n !== -1 ? n : void 0;
  }
  s.nameAddrHeaderParse = t;
  function r(i) {
    const n = s.parse(i, "SIP_URI");
    return n !== -1 ? n : void 0;
  }
  s.URIParse = r;
})(J = J || (J = {}));
const ti = {
  100: "Trying",
  180: "Ringing",
  181: "Call Is Being Forwarded",
  182: "Queued",
  183: "Session Progress",
  199: "Early Dialog Terminated",
  200: "OK",
  202: "Accepted",
  204: "No Notification",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Moved Temporarily",
  305: "Use Proxy",
  380: "Alternative Service",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  410: "Gone",
  412: "Conditional Request Failed",
  413: "Request Entity Too Large",
  414: "Request-URI Too Long",
  415: "Unsupported Media Type",
  416: "Unsupported URI Scheme",
  417: "Unknown Resource-Priority",
  420: "Bad Extension",
  421: "Extension Required",
  422: "Session Interval Too Small",
  423: "Interval Too Brief",
  428: "Use Identity Header",
  429: "Provide Referrer Identity",
  430: "Flow Failed",
  433: "Anonymity Disallowed",
  436: "Bad Identity-Info",
  437: "Unsupported Certificate",
  438: "Invalid Identity Header",
  439: "First Hop Lacks Outbound Support",
  440: "Max-Breadth Exceeded",
  469: "Bad Info Package",
  470: "Consent Needed",
  478: "Unresolvable Destination",
  480: "Temporarily Unavailable",
  481: "Call/Transaction Does Not Exist",
  482: "Loop Detected",
  483: "Too Many Hops",
  484: "Address Incomplete",
  485: "Ambiguous",
  486: "Busy Here",
  487: "Request Terminated",
  488: "Not Acceptable Here",
  489: "Bad Event",
  491: "Request Pending",
  493: "Undecipherable",
  494: "Security Agreement Required",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Server Time-out",
  505: "Version Not Supported",
  513: "Message Too Large",
  580: "Precondition Failure",
  600: "Busy Everywhere",
  603: "Decline",
  604: "Does Not Exist Anywhere",
  606: "Not Acceptable"
};
function Pe(s, e = 32) {
  let t = "";
  for (let r = 0; r < s; r++) {
    const i = Math.floor(Math.random() * e);
    t += i.toString(e);
  }
  return t;
}
function Ct(s) {
  return ti[s] || "";
}
function Rt() {
  return Pe(10);
}
function ve(s) {
  const e = {
    "Call-Id": "Call-ID",
    Cseq: "CSeq",
    "Min-Se": "Min-SE",
    Rack: "RAck",
    Rseq: "RSeq",
    "Www-Authenticate": "WWW-Authenticate"
  }, t = s.toLowerCase().replace(/_/g, "-").split("-"), r = t.length;
  let i = "";
  for (let n = 0; n < r; n++)
    n !== 0 && (i += "-"), i += t[n].charAt(0).toUpperCase() + t[n].substring(1);
  return e[i] && (i = e[i]), i;
}
function rt(s) {
  return encodeURIComponent(s).replace(/%[A-F\d]{2}/g, "U").length;
}
class mr {
  constructor() {
    this.headers = {};
  }
  /**
   * Insert a header of the given name and value into the last position of the
   * header array.
   * @param name - header name
   * @param value - header value
   */
  addHeader(e, t) {
    const r = { raw: t };
    e = ve(e), this.headers[e] ? this.headers[e].push(r) : this.headers[e] = [r];
  }
  /**
   * Get the value of the given header name at the given position.
   * @param name - header name
   * @returns Returns the specified header, undefined if header doesn't exist.
   */
  getHeader(e) {
    const t = this.headers[ve(e)];
    if (t) {
      if (t[0])
        return t[0].raw;
    } else
      return;
  }
  /**
   * Get the header/s of the given name.
   * @param name - header name
   * @returns Array - with all the headers of the specified name.
   */
  getHeaders(e) {
    const t = this.headers[ve(e)], r = [];
    if (!t)
      return [];
    for (const i of t)
      r.push(i.raw);
    return r;
  }
  /**
   * Verify the existence of the given header.
   * @param name - header name
   * @returns true if header with given name exists, false otherwise
   */
  hasHeader(e) {
    return !!this.headers[ve(e)];
  }
  /**
   * Parse the given header on the given index.
   * @param name - header name
   * @param idx - header index
   * @returns Parsed header object, undefined if the
   *   header is not present or in case of a parsing error.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseHeader(e, t = 0) {
    if (e = ve(e), this.headers[e]) {
      if (t >= this.headers[e].length)
        return;
    } else return;
    const r = this.headers[e][t], i = r.raw;
    if (r.parsed)
      return r.parsed;
    const n = J.parse(i, e.replace(/-/g, "_"));
    if (n === -1) {
      this.headers[e].splice(t, 1);
      return;
    } else
      return r.parsed = n, n;
  }
  /**
   * Message Header attribute selector. Alias of parseHeader.
   * @param name - header name
   * @param idx - header index
   * @returns Parsed header object, undefined if the
   *   header is not present or in case of a parsing error.
   *
   * @example
   * message.s('via',3).port
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  s(e, t = 0) {
    return this.parseHeader(e, t);
  }
  /**
   * Replace the value of the given header by the value.
   * @param name - header name
   * @param value - header value
   */
  setHeader(e, t) {
    this.headers[ve(e)] = [{ raw: t }];
  }
  toString() {
    return this.data;
  }
}
class Be extends mr {
  constructor() {
    super();
  }
}
class Ie extends mr {
  constructor() {
    super();
  }
}
class He {
  constructor(e, t, r, i, n, a, o) {
    this.headers = {}, this.extraHeaders = [], this.options = He.getDefaultOptions(), n && (this.options = Object.assign(Object.assign({}, this.options), n), this.options.optionTags && this.options.optionTags.length && (this.options.optionTags = this.options.optionTags.slice()), this.options.routeSet && this.options.routeSet.length && (this.options.routeSet = this.options.routeSet.slice())), a && a.length && (this.extraHeaders = a.slice()), o && (this.body = {
      body: o.content,
      contentType: o.contentType
    }), this.method = e, this.ruri = t.clone(), this.fromURI = r.clone(), this.fromTag = this.options.fromTag ? this.options.fromTag : Rt(), this.from = He.makeNameAddrHeader(this.fromURI, this.options.fromDisplayName, this.fromTag), this.toURI = i.clone(), this.toTag = this.options.toTag, this.to = He.makeNameAddrHeader(this.toURI, this.options.toDisplayName, this.toTag), this.callId = this.options.callId ? this.options.callId : this.options.callIdPrefix + Pe(15), this.cseq = this.options.cseq, this.setHeader("route", this.options.routeSet), this.setHeader("via", ""), this.setHeader("to", this.to.toString()), this.setHeader("from", this.from.toString()), this.setHeader("cseq", this.cseq + " " + this.method), this.setHeader("call-id", this.callId), this.setHeader("max-forwards", "70");
  }
  /** Get a copy of the default options. */
  static getDefaultOptions() {
    return {
      callId: "",
      callIdPrefix: "",
      cseq: 1,
      toDisplayName: "",
      toTag: "",
      fromDisplayName: "",
      fromTag: "",
      forceRport: !1,
      hackViaTcp: !1,
      optionTags: ["outbound"],
      routeSet: [],
      userAgentString: "sip.js",
      viaHost: ""
    };
  }
  static makeNameAddrHeader(e, t, r) {
    const i = {};
    return r && (i.tag = r), new se(e, t, i);
  }
  /**
   * Get the value of the given header name at the given position.
   * @param name - header name
   * @returns Returns the specified header, undefined if header doesn't exist.
   */
  getHeader(e) {
    const t = this.headers[ve(e)];
    if (t) {
      if (t[0])
        return t[0];
    } else {
      const r = new RegExp("^\\s*" + e + "\\s*:", "i");
      for (const i of this.extraHeaders)
        if (r.test(i))
          return i.substring(i.indexOf(":") + 1).trim();
    }
  }
  /**
   * Get the header/s of the given name.
   * @param name - header name
   * @returns Array with all the headers of the specified name.
   */
  getHeaders(e) {
    const t = [], r = this.headers[ve(e)];
    if (r)
      for (const i of r)
        t.push(i);
    else {
      const i = new RegExp("^\\s*" + e + "\\s*:", "i");
      for (const n of this.extraHeaders)
        i.test(n) && t.push(n.substring(n.indexOf(":") + 1).trim());
    }
    return t;
  }
  /**
   * Verify the existence of the given header.
   * @param name - header name
   * @returns true if header with given name exists, false otherwise
   */
  hasHeader(e) {
    if (this.headers[ve(e)])
      return !0;
    {
      const t = new RegExp("^\\s*" + e + "\\s*:", "i");
      for (const r of this.extraHeaders)
        if (t.test(r))
          return !0;
    }
    return !1;
  }
  /**
   * Replace the the given header by the given value.
   * @param name - header name
   * @param value - header value
   */
  setHeader(e, t) {
    this.headers[ve(e)] = t instanceof Array ? t : [t];
  }
  /**
   * The Via header field indicates the transport used for the transaction
   * and identifies the location where the response is to be sent.  A Via
   * header field value is added only after the transport that will be
   * used to reach the next hop has been selected (which may involve the
   * usage of the procedures in [4]).
   *
   * When the UAC creates a request, it MUST insert a Via into that
   * request.  The protocol name and protocol version in the header field
   * MUST be SIP and 2.0, respectively.  The Via header field value MUST
   * contain a branch parameter.  This parameter is used to identify the
   * transaction created by that request.  This parameter is used by both
   * the client and the server.
   * https://tools.ietf.org/html/rfc3261#section-8.1.1.7
   * @param branchParameter - The branch parameter.
   * @param transport - The sent protocol transport.
   */
  setViaHeader(e, t) {
    this.options.hackViaTcp && (t = "TCP");
    let r = "SIP/2.0/" + t;
    r += " " + this.options.viaHost + ";branch=" + e, this.options.forceRport && (r += ";rport"), this.setHeader("via", r), this.branch = e;
  }
  toString() {
    let e = "";
    e += this.method + " " + this.ruri.toRaw() + ` SIP/2.0\r
`;
    for (const t in this.headers)
      if (this.headers[t])
        for (const r of this.headers[t])
          e += t + ": " + r + `\r
`;
    for (const t of this.extraHeaders)
      e += t.trim() + `\r
`;
    return e += "Supported: " + this.options.optionTags.join(", ") + `\r
`, e += "User-Agent: " + this.options.userAgentString + `\r
`, this.body ? typeof this.body == "string" ? (e += "Content-Length: " + rt(this.body) + `\r
\r
`, e += this.body) : this.body.body && this.body.contentType ? (e += "Content-Type: " + this.body.contentType + `\r
`, e += "Content-Length: " + rt(this.body.body) + `\r
\r
`, e += this.body.body) : e += `Content-Length: 0\r
\r
` : e += `Content-Length: 0\r
\r
`, e;
  }
}
function vr(s) {
  return s === "application/sdp" ? "session" : "render";
}
function wt(s) {
  const e = typeof s == "string" ? s : s.body, t = typeof s == "string" ? "application/sdp" : s.contentType;
  return { contentDisposition: vr(t), contentType: t, content: e };
}
function yr(s) {
  return s && typeof s.content == "string" && typeof s.contentType == "string" && s.contentDisposition === void 0 ? !0 : typeof s.contentDisposition == "string";
}
function Xe(s) {
  let e, t, r;
  if (s instanceof Be && s.body) {
    const i = s.parseHeader("Content-Disposition");
    e = i ? i.type : void 0, t = s.parseHeader("Content-Type"), r = s.body;
  }
  if (s instanceof Ie && s.body) {
    const i = s.parseHeader("Content-Disposition");
    e = i ? i.type : void 0, t = s.parseHeader("Content-Type"), r = s.body;
  }
  if (s instanceof He && s.body)
    if (e = s.getHeader("Content-Disposition"), t = s.getHeader("Content-Type"), typeof s.body == "string") {
      if (!t)
        throw new Error("Header content type header does not equal body content type.");
      r = s.body;
    } else {
      if (t && t !== s.body.contentType)
        throw new Error("Header content type header does not equal body content type.");
      t = s.body.contentType, r = s.body.body;
    }
  if (yr(s) && (e = s.contentDisposition, t = s.contentType, r = s.content), !!r) {
    if (t && !e && (e = vr(t)), !e)
      throw new Error("Content disposition undefined.");
    if (!t)
      throw new Error("Content type undefined.");
    return {
      contentDisposition: e,
      contentType: t,
      content: r
    };
  }
}
var de;
(function(s) {
  s.Initial = "Initial", s.Early = "Early", s.AckWait = "AckWait", s.Confirmed = "Confirmed", s.Terminated = "Terminated";
})(de = de || (de = {}));
var x;
(function(s) {
  s.Initial = "Initial", s.HaveLocalOffer = "HaveLocalOffer", s.HaveRemoteOffer = "HaveRemoteOffer", s.Stable = "Stable", s.Closed = "Closed";
})(x = x || (x = {}));
const Se = 500, ri = 4e3, tr = 5e3, te = {
  T1: Se,
  T2: ri,
  TIMER_B: 64 * Se,
  TIMER_D: 0 * Se,
  TIMER_F: 64 * Se,
  TIMER_H: 64 * Se,
  TIMER_I: 0 * tr,
  TIMER_J: 0 * Se,
  TIMER_K: 0 * tr,
  TIMER_L: 64 * Se,
  TIMER_M: 64 * Se,
  TIMER_N: 64 * Se,
  PROVISIONAL_RESPONSE_INTERVAL: 6e4
  // See RFC 3261 Section 13.3.1.1
};
class Ce extends _e {
  constructor(e) {
    super(e || "Transaction state error.");
  }
}
var C;
(function(s) {
  s.ACK = "ACK", s.BYE = "BYE", s.CANCEL = "CANCEL", s.INFO = "INFO", s.INVITE = "INVITE", s.MESSAGE = "MESSAGE", s.NOTIFY = "NOTIFY", s.OPTIONS = "OPTIONS", s.REGISTER = "REGISTER", s.UPDATE = "UPDATE", s.SUBSCRIBE = "SUBSCRIBE", s.PUBLISH = "PUBLISH", s.REFER = "REFER", s.PRACK = "PRACK";
})(C = C || (C = {}));
const Re = [
  C.ACK,
  C.BYE,
  C.CANCEL,
  C.INFO,
  C.INVITE,
  C.MESSAGE,
  C.NOTIFY,
  C.OPTIONS,
  C.PRACK,
  C.REFER,
  C.REGISTER,
  C.SUBSCRIBE
];
class wr {
  /** @internal */
  constructor(e) {
    this.incomingMessageRequest = e;
  }
  /** Incoming MESSAGE request message. */
  get request() {
    return this.incomingMessageRequest.message;
  }
  /** Accept the request. */
  accept(e) {
    return this.incomingMessageRequest.accept(e), Promise.resolve();
  }
  /** Reject the request. */
  reject(e) {
    return this.incomingMessageRequest.reject(e), Promise.resolve();
  }
}
class qt {
  /** @internal */
  constructor(e) {
    this.incomingNotifyRequest = e;
  }
  /** Incoming NOTIFY request message. */
  get request() {
    return this.incomingNotifyRequest.message;
  }
  /** Accept the request. */
  accept(e) {
    return this.incomingNotifyRequest.accept(e), Promise.resolve();
  }
  /** Reject the request. */
  reject(e) {
    return this.incomingNotifyRequest.reject(e), Promise.resolve();
  }
}
class ii {
  /** @internal */
  constructor(e, t) {
    this.incomingReferRequest = e, this.session = t;
  }
  get referTo() {
    const e = this.incomingReferRequest.message.parseHeader("refer-to");
    if (!(e instanceof se))
      throw new Error("Failed to parse Refer-To header.");
    return e;
  }
  get referredBy() {
    return this.incomingReferRequest.message.getHeader("referred-by");
  }
  get replaces() {
    const e = this.referTo.uri.getHeader("replaces");
    return e instanceof Array ? e[0] : e;
  }
  /** Incoming REFER request message. */
  get request() {
    return this.incomingReferRequest.message;
  }
  /** Accept the request. */
  accept(e = { statusCode: 202 }) {
    return this.incomingReferRequest.accept(e), Promise.resolve();
  }
  /** Reject the request. */
  reject(e) {
    return this.incomingReferRequest.reject(e), Promise.resolve();
  }
  /**
   * Creates an inviter which may be used to send an out of dialog INVITE request.
   *
   * @remarks
   * This a helper method to create an Inviter which will execute the referral
   * of the `Session` which was referred. The appropriate headers are set and
   * the referred `Session` is linked to the new `Session`. Note that only a
   * single instance of the `Inviter` will be created and returned (if called
   * more than once a reference to the same `Inviter` will be returned every time).
   *
   * @param options - Options bucket.
   * @param modifiers - Session description handler modifiers.
   */
  makeInviter(e) {
    if (this.inviter)
      return this.inviter;
    const t = this.referTo.uri.clone();
    t.clearHeaders(), e = e || {};
    const r = (e.extraHeaders || []).slice(), i = this.replaces;
    i && r.push("Replaces: " + decodeURIComponent(i));
    const n = this.referredBy;
    return n && r.push("Referred-By: " + n), e.extraHeaders = r, this.inviter = this.session.userAgent._makeInviter(t, e), this.inviter._referred = this.session, this.session._referral = this.inviter, this.inviter;
  }
}
var y;
(function(s) {
  s.Initial = "Initial", s.Establishing = "Establishing", s.Established = "Established", s.Terminating = "Terminating", s.Terminated = "Terminated";
})(y = y || (y = {}));
class Le {
  /**
   * Constructor.
   * @param userAgent - User agent. See {@link UserAgent} for details.
   * @internal
   */
  constructor(e, t = {}) {
    this.pendingReinvite = !1, this.pendingReinviteAck = !1, this._state = y.Initial, this.delegate = t.delegate, this._stateEventEmitter = new tt(), this._userAgent = e;
  }
  /**
   * Destructor.
   */
  dispose() {
    switch (this.logger.log(`Session ${this.id} in state ${this._state} is being disposed`), delete this.userAgent._sessions[this.id], this._sessionDescriptionHandler && this._sessionDescriptionHandler.close(), this.state) {
      case y.Initial:
        break;
      // the Inviter/Invitation sub class dispose method handles this case
      case y.Establishing:
        break;
      // the Inviter/Invitation sub class dispose method handles this case
      case y.Established:
        return new Promise((e) => {
          this._bye({
            // wait for the response to the BYE before resolving
            onAccept: () => e(),
            onRedirect: () => e(),
            onReject: () => e()
          });
        });
      case y.Terminating:
        break;
      // nothing to be done
      case y.Terminated:
        break;
      // nothing to be done
      default:
        throw new Error("Unknown state.");
    }
    return Promise.resolve();
  }
  /**
   * The asserted identity of the remote user.
   */
  get assertedIdentity() {
    return this._assertedIdentity;
  }
  /**
   * The confirmed session dialog.
   */
  get dialog() {
    return this._dialog;
  }
  /**
   * A unique identifier for this session.
   */
  get id() {
    return this._id;
  }
  /**
   * The session being replace by this one.
   */
  get replacee() {
    return this._replacee;
  }
  /**
   * Session description handler.
   * @remarks
   * If `this` is an instance of `Invitation`,
   * `sessionDescriptionHandler` will be defined when the session state changes to "established".
   * If `this` is an instance of `Inviter` and an offer was sent in the INVITE,
   * `sessionDescriptionHandler` will be defined when the session state changes to "establishing".
   * If `this` is an instance of `Inviter` and an offer was not sent in the INVITE,
   * `sessionDescriptionHandler` will be defined when the session state changes to "established".
   * Otherwise `undefined`.
   */
  get sessionDescriptionHandler() {
    return this._sessionDescriptionHandler;
  }
  /**
   * Session description handler factory.
   */
  get sessionDescriptionHandlerFactory() {
    return this.userAgent.configuration.sessionDescriptionHandlerFactory;
  }
  /**
   * SDH modifiers for the initial INVITE transaction.
   * @remarks
   * Used in all cases when handling the initial INVITE transaction as either UAC or UAS.
   * May be set directly at anytime.
   * May optionally be set via constructor option.
   * May optionally be set via options passed to Inviter.invite() or Invitation.accept().
   */
  get sessionDescriptionHandlerModifiers() {
    return this._sessionDescriptionHandlerModifiers || [];
  }
  set sessionDescriptionHandlerModifiers(e) {
    this._sessionDescriptionHandlerModifiers = e.slice();
  }
  /**
   * SDH options for the initial INVITE transaction.
   * @remarks
   * Used in all cases when handling the initial INVITE transaction as either UAC or UAS.
   * May be set directly at anytime.
   * May optionally be set via constructor option.
   * May optionally be set via options passed to Inviter.invite() or Invitation.accept().
   */
  get sessionDescriptionHandlerOptions() {
    return this._sessionDescriptionHandlerOptions || {};
  }
  set sessionDescriptionHandlerOptions(e) {
    this._sessionDescriptionHandlerOptions = Object.assign({}, e);
  }
  /**
   * SDH modifiers for re-INVITE transactions.
   * @remarks
   * Used in all cases when handling a re-INVITE transaction as either UAC or UAS.
   * May be set directly at anytime.
   * May optionally be set via constructor option.
   * May optionally be set via options passed to Session.invite().
   */
  get sessionDescriptionHandlerModifiersReInvite() {
    return this._sessionDescriptionHandlerModifiersReInvite || [];
  }
  set sessionDescriptionHandlerModifiersReInvite(e) {
    this._sessionDescriptionHandlerModifiersReInvite = e.slice();
  }
  /**
   * SDH options for re-INVITE transactions.
   * @remarks
   * Used in all cases when handling a re-INVITE transaction as either UAC or UAS.
   * May be set directly at anytime.
   * May optionally be set via constructor option.
   * May optionally be set via options passed to Session.invite().
   */
  get sessionDescriptionHandlerOptionsReInvite() {
    return this._sessionDescriptionHandlerOptionsReInvite || {};
  }
  set sessionDescriptionHandlerOptionsReInvite(e) {
    this._sessionDescriptionHandlerOptionsReInvite = Object.assign({}, e);
  }
  /**
   * Session state.
   */
  get state() {
    return this._state;
  }
  /**
   * Session state change emitter.
   */
  get stateChange() {
    return this._stateEventEmitter;
  }
  /**
   * The user agent.
   */
  get userAgent() {
    return this._userAgent;
  }
  /**
   * End the {@link Session}. Sends a BYE.
   * @param options - Options bucket. See {@link SessionByeOptions} for details.
   */
  bye(e = {}) {
    let t = "Session.bye() may only be called if established session.";
    switch (this.state) {
      case y.Initial:
        typeof this.cancel == "function" ? (t += " However Inviter.invite() has not yet been called.", t += " Perhaps you should have called Inviter.cancel()?") : typeof this.reject == "function" && (t += " However Invitation.accept() has not yet been called.", t += " Perhaps you should have called Invitation.reject()?");
        break;
      case y.Establishing:
        typeof this.cancel == "function" ? (t += " However a dialog does not yet exist.", t += " Perhaps you should have called Inviter.cancel()?") : typeof this.reject == "function" && (t += " However Invitation.accept() has not yet been called (or not yet resolved).", t += " Perhaps you should have called Invitation.reject()?");
        break;
      case y.Established: {
        const r = e.requestDelegate, i = this.copyRequestOptions(e.requestOptions);
        return this._bye(r, i);
      }
      case y.Terminating:
        t += " However this session is already terminating.", typeof this.cancel == "function" ? t += " Perhaps you have already called Inviter.cancel()?" : typeof this.reject == "function" && (t += " Perhaps you have already called Session.bye()?");
        break;
      case y.Terminated:
        t += " However this session is already terminated.";
        break;
      default:
        throw new Error("Unknown state");
    }
    return this.logger.error(t), Promise.reject(new Error(`Invalid session state ${this.state}`));
  }
  /**
   * Share {@link Info} with peer. Sends an INFO.
   * @param options - Options bucket. See {@link SessionInfoOptions} for details.
   */
  info(e = {}) {
    if (this.state !== y.Established)
      return this.logger.error("Session.info() may only be called if established session."), Promise.reject(new Error(`Invalid session state ${this.state}`));
    const t = e.requestDelegate, r = this.copyRequestOptions(e.requestOptions);
    return this._info(t, r);
  }
  /**
   * Renegotiate the session. Sends a re-INVITE.
   * @param options - Options bucket. See {@link SessionInviteOptions} for details.
   */
  invite(e = {}) {
    if (this.logger.log("Session.invite"), this.state !== y.Established)
      return Promise.reject(new Error(`Invalid session state ${this.state}`));
    if (this.pendingReinvite)
      return Promise.reject(new et("Reinvite in progress. Please wait until complete, then try again."));
    this.pendingReinvite = !0, e.sessionDescriptionHandlerModifiers && (this.sessionDescriptionHandlerModifiersReInvite = e.sessionDescriptionHandlerModifiers), e.sessionDescriptionHandlerOptions && (this.sessionDescriptionHandlerOptionsReInvite = e.sessionDescriptionHandlerOptions);
    const t = {
      onAccept: (n) => {
        const a = Xe(n.message);
        if (!a) {
          this.logger.error("Received 2xx response to re-INVITE without a session description"), this.ackAndBye(n, 400, "Missing session description"), this.stateTransition(y.Terminated), this.pendingReinvite = !1;
          return;
        }
        if (e.withoutSdp) {
          const o = {
            sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptionsReInvite,
            sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiersReInvite
          };
          this.setOfferAndGetAnswer(a, o).then((d) => {
            n.ack({ body: d });
          }).catch((d) => {
            this.logger.error("Failed to handle offer in 2xx response to re-INVITE"), this.logger.error(d.message), this.state === y.Terminated ? n.ack() : (this.ackAndBye(n, 488, "Bad Media Description"), this.stateTransition(y.Terminated));
          }).then(() => {
            this.pendingReinvite = !1, e.requestDelegate && e.requestDelegate.onAccept && e.requestDelegate.onAccept(n);
          });
        } else {
          const o = {
            sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptionsReInvite,
            sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiersReInvite
          };
          this.setAnswer(a, o).then(() => {
            n.ack();
          }).catch((d) => {
            this.logger.error("Failed to handle answer in 2xx response to re-INVITE"), this.logger.error(d.message), this.state !== y.Terminated ? (this.ackAndBye(n, 488, "Bad Media Description"), this.stateTransition(y.Terminated)) : n.ack();
          }).then(() => {
            this.pendingReinvite = !1, e.requestDelegate && e.requestDelegate.onAccept && e.requestDelegate.onAccept(n);
          });
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onProgress: (n) => {
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onRedirect: (n) => {
      },
      onReject: (n) => {
        this.logger.warn("Received a non-2xx response to re-INVITE"), this.pendingReinvite = !1, e.withoutSdp ? e.requestDelegate && e.requestDelegate.onReject && e.requestDelegate.onReject(n) : this.rollbackOffer().catch((a) => {
          if (this.logger.error("Failed to rollback offer on non-2xx response to re-INVITE"), this.logger.error(a.message), this.state !== y.Terminated) {
            if (!this.dialog)
              throw new Error("Dialog undefined.");
            const o = [];
            o.push("Reason: " + this.getReasonHeaderValue(500, "Internal Server Error")), this.dialog.bye(void 0, { extraHeaders: o }), this.stateTransition(y.Terminated);
          }
        }).then(() => {
          e.requestDelegate && e.requestDelegate.onReject && e.requestDelegate.onReject(n);
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onTrying: (n) => {
      }
    }, r = e.requestOptions || {};
    if (r.extraHeaders = (r.extraHeaders || []).slice(), r.extraHeaders.push("Allow: " + Re.toString()), r.extraHeaders.push("Contact: " + this._contact), e.withoutSdp) {
      if (!this.dialog)
        throw this.pendingReinvite = !1, new Error("Dialog undefined.");
      return Promise.resolve(this.dialog.invite(t, r));
    }
    const i = {
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptionsReInvite,
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiersReInvite
    };
    return this.getOffer(i).then((n) => {
      if (!this.dialog)
        throw this.pendingReinvite = !1, new Error("Dialog undefined.");
      return r.body = n, this.dialog.invite(t, r);
    }).catch((n) => {
      throw this.logger.error(n.message), this.logger.error("Failed to send re-INVITE"), this.pendingReinvite = !1, n;
    });
  }
  /**
   * Deliver a {@link Message}. Sends a MESSAGE.
   * @param options - Options bucket. See {@link SessionMessageOptions} for details.
   */
  message(e = {}) {
    if (this.state !== y.Established)
      return this.logger.error("Session.message() may only be called if established session."), Promise.reject(new Error(`Invalid session state ${this.state}`));
    const t = e.requestDelegate, r = this.copyRequestOptions(e.requestOptions);
    return this._message(t, r);
  }
  /**
   * Proffer a {@link Referral}. Send a REFER.
   * @param referTo - The referral target. If a `Session`, a REFER w/Replaces is sent.
   * @param options - Options bucket. See {@link SessionReferOptions} for details.
   */
  refer(e, t = {}) {
    if (this.state !== y.Established)
      return this.logger.error("Session.refer() may only be called if established session."), Promise.reject(new Error(`Invalid session state ${this.state}`));
    if (e instanceof Le && !e.dialog)
      return this.logger.error("Session.refer() may only be called with session which is established. You are perhaps attempting to attended transfer to a target for which there is not dialog yet established. Perhaps you are attempting a 'semi-attended' tansfer? Regardless, this is not supported. The recommended approached is to check to see if the target Session is in the Established state before calling refer(); if the state is not Established you may proceed by falling back using a URI as the target (blind transfer)."), Promise.reject(new Error(`Invalid session state ${this.state}`));
    const r = t.requestDelegate, i = this.copyRequestOptions(t.requestOptions);
    return i.extraHeaders = i.extraHeaders ? i.extraHeaders.concat(this.referExtraHeaders(this.referToString(e))) : this.referExtraHeaders(this.referToString(e)), this._refer(t.onNotify, r, i);
  }
  /**
   * Send BYE.
   * @param delegate - Request delegate.
   * @param options - Request options bucket.
   * @internal
   */
  _bye(e, t) {
    if (!this.dialog)
      return Promise.reject(new Error("Session dialog undefined."));
    const r = this.dialog;
    switch (r.sessionState) {
      case de.Initial:
        throw new Error(`Invalid dialog state ${r.sessionState}`);
      case de.Early:
        throw new Error(`Invalid dialog state ${r.sessionState}`);
      case de.AckWait:
        return this.stateTransition(y.Terminating), new Promise((i) => {
          r.delegate = {
            // When ACK shows up, say BYE.
            onAck: () => {
              const n = r.bye(e, t);
              return this.stateTransition(y.Terminated), i(n), Promise.resolve();
            },
            // Or the server transaction times out before the ACK arrives.
            onAckTimeout: () => {
              const n = r.bye(e, t);
              this.stateTransition(y.Terminated), i(n);
            }
          };
        });
      case de.Confirmed: {
        const i = r.bye(e, t);
        return this.stateTransition(y.Terminated), Promise.resolve(i);
      }
      case de.Terminated:
        throw new Error(`Invalid dialog state ${r.sessionState}`);
      default:
        throw new Error("Unrecognized state.");
    }
  }
  /**
   * Send INFO.
   * @param delegate - Request delegate.
   * @param options - Request options bucket.
   * @internal
   */
  _info(e, t) {
    return this.dialog ? Promise.resolve(this.dialog.info(e, t)) : Promise.reject(new Error("Session dialog undefined."));
  }
  /**
   * Send MESSAGE.
   * @param delegate - Request delegate.
   * @param options - Request options bucket.
   * @internal
   */
  _message(e, t) {
    return this.dialog ? Promise.resolve(this.dialog.message(e, t)) : Promise.reject(new Error("Session dialog undefined."));
  }
  /**
   * Send REFER.
   * @param onNotify - Notification callback.
   * @param delegate - Request delegate.
   * @param options - Request options bucket.
   * @internal
   */
  _refer(e, t, r) {
    return this.dialog ? (this.onNotify = e, Promise.resolve(this.dialog.refer(t, r))) : Promise.reject(new Error("Session dialog undefined."));
  }
  /**
   * Send ACK and then BYE. There are unrecoverable errors which can occur
   * while handling dialog forming and in-dialog INVITE responses and when
   * they occur we ACK the response and send a BYE.
   * Note that the BYE is sent in the dialog associated with the response
   * which is not necessarily `this.dialog`. And, accordingly, the
   * session state is not transitioned to terminated and session is not closed.
   * @param inviteResponse - The response causing the error.
   * @param statusCode - Status code for he reason phrase.
   * @param reasonPhrase - Reason phrase for the BYE.
   * @internal
   */
  ackAndBye(e, t, r) {
    e.ack();
    const i = [];
    t && i.push("Reason: " + this.getReasonHeaderValue(t, r)), e.session.bye(void 0, { extraHeaders: i });
  }
  /**
   * Handle in dialog ACK request.
   * @internal
   */
  onAckRequest(e) {
    if (this.logger.log("Session.onAckRequest"), this.state !== y.Established && this.state !== y.Terminating)
      return this.logger.error(`ACK received while in state ${this.state}, dropping request`), Promise.resolve();
    const t = this.dialog;
    if (!t)
      throw new Error("Dialog undefined.");
    const r = {
      sessionDescriptionHandlerOptions: this.pendingReinviteAck ? this.sessionDescriptionHandlerOptionsReInvite : this.sessionDescriptionHandlerOptions,
      sessionDescriptionHandlerModifiers: this.pendingReinviteAck ? this._sessionDescriptionHandlerModifiersReInvite : this._sessionDescriptionHandlerModifiers
    };
    if (this.delegate && this.delegate.onAck) {
      const i = new Jr(e);
      this.delegate.onAck(i);
    }
    switch (this.pendingReinviteAck = !1, t.signalingState) {
      case x.Initial: {
        this.logger.error(`Invalid signaling state ${t.signalingState}.`);
        const i = ["Reason: " + this.getReasonHeaderValue(488, "Bad Media Description")];
        return t.bye(void 0, { extraHeaders: i }), this.stateTransition(y.Terminated), Promise.resolve();
      }
      case x.Stable: {
        const i = Xe(e.message);
        return i ? i.contentDisposition === "render" ? (this._renderbody = i.content, this._rendertype = i.contentType, Promise.resolve()) : i.contentDisposition !== "session" ? Promise.resolve() : this.setAnswer(i, r).catch((n) => {
          this.logger.error(n.message);
          const a = ["Reason: " + this.getReasonHeaderValue(488, "Bad Media Description")];
          t.bye(void 0, { extraHeaders: a }), this.stateTransition(y.Terminated);
        }) : Promise.resolve();
      }
      case x.HaveLocalOffer: {
        this.logger.error(`Invalid signaling state ${t.signalingState}.`);
        const i = ["Reason: " + this.getReasonHeaderValue(488, "Bad Media Description")];
        return t.bye(void 0, { extraHeaders: i }), this.stateTransition(y.Terminated), Promise.resolve();
      }
      case x.HaveRemoteOffer: {
        this.logger.error(`Invalid signaling state ${t.signalingState}.`);
        const i = ["Reason: " + this.getReasonHeaderValue(488, "Bad Media Description")];
        return t.bye(void 0, { extraHeaders: i }), this.stateTransition(y.Terminated), Promise.resolve();
      }
      case x.Closed:
        throw new Error(`Invalid signaling state ${t.signalingState}.`);
      default:
        throw new Error(`Invalid signaling state ${t.signalingState}.`);
    }
  }
  /**
   * Handle in dialog BYE request.
   * @internal
   */
  onByeRequest(e) {
    if (this.logger.log("Session.onByeRequest"), this.state !== y.Established) {
      this.logger.error(`BYE received while in state ${this.state}, dropping request`);
      return;
    }
    if (this.delegate && this.delegate.onBye) {
      const t = new Zr(e);
      this.delegate.onBye(t);
    } else
      e.accept();
    this.stateTransition(y.Terminated);
  }
  /**
   * Handle in dialog INFO request.
   * @internal
   */
  onInfoRequest(e) {
    if (this.logger.log("Session.onInfoRequest"), this.state !== y.Established) {
      this.logger.error(`INFO received while in state ${this.state}, dropping request`);
      return;
    }
    if (this.delegate && this.delegate.onInfo) {
      const t = new Xr(e);
      this.delegate.onInfo(t);
    } else
      e.accept();
  }
  /**
   * Handle in dialog INVITE request.
   * @internal
   */
  onInviteRequest(e) {
    if (this.logger.log("Session.onInviteRequest"), this.state !== y.Established) {
      this.logger.error(`INVITE received while in state ${this.state}, dropping request`);
      return;
    }
    this.pendingReinviteAck = !0;
    const t = ["Contact: " + this._contact];
    if (e.message.hasHeader("P-Asserted-Identity")) {
      const i = e.message.getHeader("P-Asserted-Identity");
      if (!i)
        throw new Error("Header undefined.");
      this._assertedIdentity = J.nameAddrHeaderParse(i);
    }
    const r = {
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptionsReInvite,
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiersReInvite
    };
    this.generateResponseOfferAnswerInDialog(r).then((i) => {
      const n = e.accept({ statusCode: 200, extraHeaders: t, body: i });
      this.delegate && this.delegate.onInvite && this.delegate.onInvite(e.message, n.message, 200);
    }).catch((i) => {
      if (this.logger.error(i.message), this.logger.error("Failed to handle to re-INVITE request"), !this.dialog)
        throw new Error("Dialog undefined.");
      if (this.logger.error(this.dialog.signalingState), this.dialog.signalingState === x.Stable) {
        const n = e.reject({ statusCode: 488 });
        this.delegate && this.delegate.onInvite && this.delegate.onInvite(e.message, n.message, 488);
        return;
      }
      this.rollbackOffer().then(() => {
        const n = e.reject({ statusCode: 488 });
        this.delegate && this.delegate.onInvite && this.delegate.onInvite(e.message, n.message, 488);
      }).catch((n) => {
        this.logger.error(n.message), this.logger.error("Failed to rollback offer on re-INVITE request");
        const a = e.reject({ statusCode: 488 });
        if (this.state !== y.Terminated) {
          if (!this.dialog)
            throw new Error("Dialog undefined.");
          const o = [];
          o.push("Reason: " + this.getReasonHeaderValue(500, "Internal Server Error")), this.dialog.bye(void 0, { extraHeaders: o }), this.stateTransition(y.Terminated);
        }
        this.delegate && this.delegate.onInvite && this.delegate.onInvite(e.message, a.message, 488);
      });
    });
  }
  /**
   * Handle in dialog MESSAGE request.
   * @internal
   */
  onMessageRequest(e) {
    if (this.logger.log("Session.onMessageRequest"), this.state !== y.Established) {
      this.logger.error(`MESSAGE received while in state ${this.state}, dropping request`);
      return;
    }
    if (this.delegate && this.delegate.onMessage) {
      const t = new wr(e);
      this.delegate.onMessage(t);
    } else
      e.accept();
  }
  /**
   * Handle in dialog NOTIFY request.
   * @internal
   */
  onNotifyRequest(e) {
    if (this.logger.log("Session.onNotifyRequest"), this.state !== y.Established) {
      this.logger.error(`NOTIFY received while in state ${this.state}, dropping request`);
      return;
    }
    if (this.onNotify) {
      const t = new qt(e);
      this.onNotify(t);
      return;
    }
    if (this.delegate && this.delegate.onNotify) {
      const t = new qt(e);
      this.delegate.onNotify(t);
    } else
      e.accept();
  }
  /**
   * Handle in dialog PRACK request.
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPrackRequest(e) {
    if (this.logger.log("Session.onPrackRequest"), this.state !== y.Established) {
      this.logger.error(`PRACK received while in state ${this.state}, dropping request`);
      return;
    }
    throw new Error("Unimplemented.");
  }
  /**
   * Handle in dialog REFER request.
   * @internal
   */
  onReferRequest(e) {
    if (this.logger.log("Session.onReferRequest"), this.state !== y.Established) {
      this.logger.error(`REFER received while in state ${this.state}, dropping request`);
      return;
    }
    if (!e.message.hasHeader("refer-to")) {
      this.logger.warn("Invalid REFER packet. A refer-to header is required. Rejecting."), e.reject();
      return;
    }
    const t = new ii(e, this);
    this.delegate && this.delegate.onRefer ? this.delegate.onRefer(t) : (this.logger.log("No delegate available to handle REFER, automatically accepting and following."), t.accept().then(() => t.makeInviter(this._referralInviterOptions).invite()).catch((r) => {
      this.logger.error(r.message);
    }));
  }
  /**
   * Generate an offer or answer for a response to an INVITE request.
   * If a remote offer was provided in the request, set the remote
   * description and get a local answer. If a remote offer was not
   * provided, generates a local offer.
   * @internal
   */
  generateResponseOfferAnswer(e, t) {
    if (this.dialog)
      return this.generateResponseOfferAnswerInDialog(t);
    const r = Xe(e.message);
    return !r || r.contentDisposition !== "session" ? this.getOffer(t) : this.setOfferAndGetAnswer(r, t);
  }
  /**
   * Generate an offer or answer for a response to an INVITE request
   * when a dialog (early or otherwise) has already been established.
   * This method may NOT be called if a dialog has yet to be established.
   * @internal
   */
  generateResponseOfferAnswerInDialog(e) {
    if (!this.dialog)
      throw new Error("Dialog undefined.");
    switch (this.dialog.signalingState) {
      case x.Initial:
        return this.getOffer(e);
      case x.HaveLocalOffer:
        return Promise.resolve(void 0);
      case x.HaveRemoteOffer:
        if (!this.dialog.offer)
          throw new Error(`Session offer undefined in signaling state ${this.dialog.signalingState}.`);
        return this.setOfferAndGetAnswer(this.dialog.offer, e);
      case x.Stable:
        return this.state !== y.Established ? Promise.resolve(void 0) : this.getOffer(e);
      case x.Closed:
        throw new Error(`Invalid signaling state ${this.dialog.signalingState}.`);
      default:
        throw new Error(`Invalid signaling state ${this.dialog.signalingState}.`);
    }
  }
  /**
   * Get local offer.
   * @internal
   */
  getOffer(e) {
    const t = this.setupSessionDescriptionHandler(), r = e.sessionDescriptionHandlerOptions, i = e.sessionDescriptionHandlerModifiers;
    try {
      return t.getDescription(r, i).then((n) => wt(n)).catch((n) => {
        this.logger.error("Session.getOffer: SDH getDescription rejected...");
        const a = n instanceof Error ? n : new Error("Session.getOffer unknown error.");
        throw this.logger.error(a.message), a;
      });
    } catch (n) {
      this.logger.error("Session.getOffer: SDH getDescription threw...");
      const a = n instanceof Error ? n : new Error(n);
      return this.logger.error(a.message), Promise.reject(a);
    }
  }
  /**
   * Rollback local/remote offer.
   * @internal
   */
  rollbackOffer() {
    const e = this.setupSessionDescriptionHandler();
    if (e.rollbackDescription === void 0)
      return Promise.resolve();
    try {
      return e.rollbackDescription().catch((t) => {
        this.logger.error("Session.rollbackOffer: SDH rollbackDescription rejected...");
        const r = t instanceof Error ? t : new Error("Session.rollbackOffer unknown error.");
        throw this.logger.error(r.message), r;
      });
    } catch (t) {
      this.logger.error("Session.rollbackOffer: SDH rollbackDescription threw...");
      const r = t instanceof Error ? t : new Error(t);
      return this.logger.error(r.message), Promise.reject(r);
    }
  }
  /**
   * Set remote answer.
   * @internal
   */
  setAnswer(e, t) {
    const r = this.setupSessionDescriptionHandler(), i = t.sessionDescriptionHandlerOptions, n = t.sessionDescriptionHandlerModifiers;
    try {
      if (!r.hasDescription(e.contentType))
        return Promise.reject(new kt());
    } catch (a) {
      this.logger.error("Session.setAnswer: SDH hasDescription threw...");
      const o = a instanceof Error ? a : new Error(a);
      return this.logger.error(o.message), Promise.reject(o);
    }
    try {
      return r.setDescription(e.content, i, n).catch((a) => {
        this.logger.error("Session.setAnswer: SDH setDescription rejected...");
        const o = a instanceof Error ? a : new Error("Session.setAnswer unknown error.");
        throw this.logger.error(o.message), o;
      });
    } catch (a) {
      this.logger.error("Session.setAnswer: SDH setDescription threw...");
      const o = a instanceof Error ? a : new Error(a);
      return this.logger.error(o.message), Promise.reject(o);
    }
  }
  /**
   * Set remote offer and get local answer.
   * @internal
   */
  setOfferAndGetAnswer(e, t) {
    const r = this.setupSessionDescriptionHandler(), i = t.sessionDescriptionHandlerOptions, n = t.sessionDescriptionHandlerModifiers;
    try {
      if (!r.hasDescription(e.contentType))
        return Promise.reject(new kt());
    } catch (a) {
      this.logger.error("Session.setOfferAndGetAnswer: SDH hasDescription threw...");
      const o = a instanceof Error ? a : new Error(a);
      return this.logger.error(o.message), Promise.reject(o);
    }
    try {
      return r.setDescription(e.content, i, n).then(() => r.getDescription(i, n)).then((a) => wt(a)).catch((a) => {
        this.logger.error("Session.setOfferAndGetAnswer: SDH setDescription or getDescription rejected...");
        const o = a instanceof Error ? a : new Error("Session.setOfferAndGetAnswer unknown error.");
        throw this.logger.error(o.message), o;
      });
    } catch (a) {
      this.logger.error("Session.setOfferAndGetAnswer: SDH setDescription or getDescription threw...");
      const o = a instanceof Error ? a : new Error(a);
      return this.logger.error(o.message), Promise.reject(o);
    }
  }
  /**
   * SDH for confirmed dialog.
   * @internal
   */
  setSessionDescriptionHandler(e) {
    if (this._sessionDescriptionHandler)
      throw new Error("Session description handler defined.");
    this._sessionDescriptionHandler = e;
  }
  /**
   * SDH for confirmed dialog.
   * @internal
   */
  setupSessionDescriptionHandler() {
    var e;
    return this._sessionDescriptionHandler ? this._sessionDescriptionHandler : (this._sessionDescriptionHandler = this.sessionDescriptionHandlerFactory(this, this.userAgent.configuration.sessionDescriptionHandlerFactoryOptions), !((e = this.delegate) === null || e === void 0) && e.onSessionDescriptionHandler && this.delegate.onSessionDescriptionHandler(this._sessionDescriptionHandler, !1), this._sessionDescriptionHandler);
  }
  /**
   * Transition session state.
   * @internal
   */
  stateTransition(e) {
    const t = () => {
      throw new Error(`Invalid state transition from ${this._state} to ${e}`);
    };
    switch (this._state) {
      case y.Initial:
        e !== y.Establishing && e !== y.Established && e !== y.Terminating && e !== y.Terminated && t();
        break;
      case y.Establishing:
        e !== y.Established && e !== y.Terminating && e !== y.Terminated && t();
        break;
      case y.Established:
        e !== y.Terminating && e !== y.Terminated && t();
        break;
      case y.Terminating:
        e !== y.Terminated && t();
        break;
      case y.Terminated:
        t();
        break;
      default:
        throw new Error("Unrecognized state.");
    }
    this._state = e, this.logger.log(`Session ${this.id} transitioned to state ${this._state}`), this._stateEventEmitter.emit(this._state), e === y.Terminated && this.dispose();
  }
  copyRequestOptions(e = {}) {
    const t = e.extraHeaders ? e.extraHeaders.slice() : void 0, r = e.body ? {
      contentDisposition: e.body.contentDisposition || "render",
      contentType: e.body.contentType || "text/plain",
      content: e.body.content || ""
    } : void 0;
    return {
      extraHeaders: t,
      body: r
    };
  }
  getReasonHeaderValue(e, t) {
    const r = e;
    let i = Ct(e);
    return !i && t && (i = t), "SIP;cause=" + r + ';text="' + i + '"';
  }
  referExtraHeaders(e) {
    const t = [];
    return t.push("Referred-By: <" + this.userAgent.configuration.uri + ">"), t.push("Contact: " + this._contact), t.push("Allow: " + ["ACK", "CANCEL", "INVITE", "MESSAGE", "BYE", "OPTIONS", "INFO", "NOTIFY", "REFER"].toString()), t.push("Refer-To: " + e), t;
  }
  referToString(e) {
    let t;
    if (e instanceof we)
      t = e.toString();
    else {
      if (!e.dialog)
        throw new Error("Dialog undefined.");
      const r = e.remoteIdentity.friendlyName, i = e.dialog.remoteTarget.toString(), n = e.dialog.callId, a = e.dialog.remoteTag, o = e.dialog.localTag, d = encodeURIComponent(`${n};to-tag=${a};from-tag=${o}`);
      t = `"${r}" <${i}?Replaces=${d}>`;
    }
    return t;
  }
}
var me;
(function(s) {
  s.Required = "Required", s.Supported = "Supported", s.Unsupported = "Unsupported";
})(me = me || (me = {}));
const si = {
  "100rel": !0,
  199: !0,
  answermode: !0,
  "early-session": !0,
  eventlist: !0,
  explicitsub: !0,
  "from-change": !0,
  "geolocation-http": !0,
  "geolocation-sip": !0,
  gin: !0,
  gruu: !0,
  histinfo: !0,
  ice: !0,
  join: !0,
  "multiple-refer": !0,
  norefersub: !0,
  nosub: !0,
  outbound: !0,
  path: !0,
  policy: !0,
  precondition: !0,
  pref: !0,
  privacy: !0,
  "recipient-list-invite": !0,
  "recipient-list-message": !0,
  "recipient-list-subscribe": !0,
  replaces: !0,
  "resource-priority": !0,
  "sdp-anat": !0,
  "sec-agree": !0,
  tdialog: !0,
  timer: !0,
  uui: !0
  // RFC 7433
};
class Ye extends Le {
  /** @internal */
  constructor(e, t) {
    super(e), this.incomingInviteRequest = t, this.disposed = !1, this.expiresTimer = void 0, this.isCanceled = !1, this.rel100 = "none", this.rseq = Math.floor(Math.random() * 1e4), this.userNoAnswerTimer = void 0, this.waitingForPrack = !1, this.logger = e.getLogger("sip.Invitation");
    const r = this.incomingInviteRequest.message, i = r.getHeader("require");
    i && i.toLowerCase().includes("100rel") && (this.rel100 = "required");
    const n = r.getHeader("supported");
    if (n && n.toLowerCase().includes("100rel") && (this.rel100 = "supported"), r.toTag = t.toTag, typeof r.toTag != "string")
      throw new TypeError("toTag should have been a string.");
    if (this.userNoAnswerTimer = setTimeout(() => {
      t.reject({ statusCode: 480 }), this.stateTransition(y.Terminated);
    }, this.userAgent.configuration.noAnswerTimeout ? this.userAgent.configuration.noAnswerTimeout * 1e3 : 6e4), r.hasHeader("expires")) {
      const d = Number(r.getHeader("expires") || 0) * 1e3;
      this.expiresTimer = setTimeout(() => {
        this.state === y.Initial && (t.reject({ statusCode: 487 }), this.stateTransition(y.Terminated));
      }, d);
    }
    const a = this.request.getHeader("P-Asserted-Identity");
    a && (this._assertedIdentity = J.nameAddrHeaderParse(a)), this._contact = this.userAgent.contact.toString();
    const o = r.parseHeader("Content-Disposition");
    o && o.type === "render" && (this._renderbody = r.body, this._rendertype = r.getHeader("Content-Type")), this._id = r.callId + r.fromTag, this.userAgent._sessions[this._id] = this;
  }
  /**
   * Destructor.
   */
  dispose() {
    if (this.disposed)
      return Promise.resolve();
    switch (this.disposed = !0, this.expiresTimer && (clearTimeout(this.expiresTimer), this.expiresTimer = void 0), this.userNoAnswerTimer && (clearTimeout(this.userNoAnswerTimer), this.userNoAnswerTimer = void 0), this.prackNeverArrived(), this.state) {
      case y.Initial:
        return this.reject().then(() => super.dispose());
      case y.Establishing:
        return this.reject().then(() => super.dispose());
      case y.Established:
        return super.dispose();
      case y.Terminating:
        return super.dispose();
      case y.Terminated:
        return super.dispose();
      default:
        throw new Error("Unknown state.");
    }
  }
  /**
   * If true, a first provisional response after the 100 Trying
   * will be sent automatically. This is false it the UAC required
   * reliable provisional responses (100rel in Require header) or
   * the user agent configuration has specified to not send an
   * initial response, otherwise it is true. The provisional is sent by
   * calling `progress()` without any options.
   */
  get autoSendAnInitialProvisionalResponse() {
    return this.rel100 !== "required" && this.userAgent.configuration.sendInitialProvisionalResponse;
  }
  /**
   * Initial incoming INVITE request message body.
   */
  get body() {
    return this.incomingInviteRequest.message.body;
  }
  /**
   * The identity of the local user.
   */
  get localIdentity() {
    return this.request.to;
  }
  /**
   * The identity of the remote user.
   */
  get remoteIdentity() {
    return this.request.from;
  }
  /**
   * Initial incoming INVITE request message.
   */
  get request() {
    return this.incomingInviteRequest.message;
  }
  /**
   * Accept the invitation.
   *
   * @remarks
   * Accept the incoming INVITE request to start a Session.
   * Replies to the INVITE request with a 200 Ok response.
   * Resolves once the response sent, otherwise rejects.
   *
   * This method may reject for a variety of reasons including
   * the receipt of a CANCEL request before `accept` is able
   * to construct a response.
   * @param options - Options bucket.
   */
  accept(e = {}) {
    if (this.logger.log("Invitation.accept"), this.state !== y.Initial) {
      const t = new Error(`Invalid session state ${this.state}`);
      return this.logger.error(t.message), Promise.reject(t);
    }
    return e.sessionDescriptionHandlerModifiers && (this.sessionDescriptionHandlerModifiers = e.sessionDescriptionHandlerModifiers), e.sessionDescriptionHandlerOptions && (this.sessionDescriptionHandlerOptions = e.sessionDescriptionHandlerOptions), this.stateTransition(y.Establishing), this.sendAccept(e).then(({ message: t, session: r }) => {
      r.delegate = {
        onAck: (i) => this.onAckRequest(i),
        onAckTimeout: () => this.onAckTimeout(),
        onBye: (i) => this.onByeRequest(i),
        onInfo: (i) => this.onInfoRequest(i),
        onInvite: (i) => this.onInviteRequest(i),
        onMessage: (i) => this.onMessageRequest(i),
        onNotify: (i) => this.onNotifyRequest(i),
        onPrack: (i) => this.onPrackRequest(i),
        onRefer: (i) => this.onReferRequest(i)
      }, this._dialog = r, this.stateTransition(y.Established), this._replacee && this._replacee._bye();
    }).catch((t) => this.handleResponseError(t));
  }
  /**
   * Indicate progress processing the invitation.
   *
   * @remarks
   * Report progress to the the caller.
   * Replies to the INVITE request with a 1xx provisional response.
   * Resolves once the response sent, otherwise rejects.
   * @param options - Options bucket.
   */
  progress(e = {}) {
    if (this.logger.log("Invitation.progress"), this.state !== y.Initial) {
      const r = new Error(`Invalid session state ${this.state}`);
      return this.logger.error(r.message), Promise.reject(r);
    }
    const t = e.statusCode || 180;
    if (t < 100 || t > 199)
      throw new TypeError("Invalid statusCode: " + t);
    return e.sessionDescriptionHandlerModifiers && (this.sessionDescriptionHandlerModifiers = e.sessionDescriptionHandlerModifiers), e.sessionDescriptionHandlerOptions && (this.sessionDescriptionHandlerOptions = e.sessionDescriptionHandlerOptions), this.waitingForPrack ? (this.logger.warn("Unexpected call for progress while waiting for prack, ignoring"), Promise.resolve()) : e.statusCode === 100 ? this.sendProgressTrying().then(() => {
    }).catch((r) => this.handleResponseError(r)) : this.rel100 !== "required" && !(this.rel100 === "supported" && e.rel100) && !(this.rel100 === "supported" && this.userAgent.configuration.sipExtension100rel === me.Required) ? this.sendProgress(e).then(() => {
    }).catch((r) => this.handleResponseError(r)) : this.sendProgressReliableWaitForPrack(e).then(() => {
    }).catch((r) => this.handleResponseError(r));
  }
  /**
   * Reject the invitation.
   *
   * @remarks
   * Replies to the INVITE request with a 4xx, 5xx, or 6xx final response.
   * Resolves once the response sent, otherwise rejects.
   *
   * The expectation is that this method is used to reject an INVITE request.
   * That is indeed the case - a call to `progress` followed by `reject` is
   * a typical way to "decline" an incoming INVITE request. However it may
   * also be called after calling `accept` (but only before it completes)
   * which will reject the call and cause `accept` to reject.
   * @param options - Options bucket.
   */
  reject(e = {}) {
    if (this.logger.log("Invitation.reject"), this.state !== y.Initial && this.state !== y.Establishing) {
      const a = new Error(`Invalid session state ${this.state}`);
      return this.logger.error(a.message), Promise.reject(a);
    }
    const t = e.statusCode || 480, r = e.reasonPhrase ? e.reasonPhrase : Ct(t), i = e.extraHeaders || [];
    if (t < 300 || t > 699)
      throw new TypeError("Invalid statusCode: " + t);
    const n = e.body ? wt(e.body) : void 0;
    return t < 400 ? this.incomingInviteRequest.redirect([], { statusCode: t, reasonPhrase: r, extraHeaders: i, body: n }) : this.incomingInviteRequest.reject({ statusCode: t, reasonPhrase: r, extraHeaders: i, body: n }), this.stateTransition(y.Terminated), Promise.resolve();
  }
  /**
   * Handle CANCEL request.
   *
   * @param message - CANCEL message.
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onCancel(e) {
    if (this.logger.log("Invitation._onCancel"), this.state !== y.Initial && this.state !== y.Establishing) {
      this.logger.error(`CANCEL received while in state ${this.state}, dropping request`);
      return;
    }
    if (this.delegate && this.delegate.onCancel) {
      const t = new zr(e);
      this.delegate.onCancel(t);
    }
    this.isCanceled = !0, this.incomingInviteRequest.reject({ statusCode: 487 }), this.stateTransition(y.Terminated);
  }
  /**
   * Helper function to handle offer/answer in a PRACK.
   */
  handlePrackOfferAnswer(e) {
    if (!this.dialog)
      throw new Error("Dialog undefined.");
    const t = Xe(e.message);
    if (!t || t.contentDisposition !== "session")
      return Promise.resolve(void 0);
    const r = {
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions,
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers
    };
    switch (this.dialog.signalingState) {
      case x.Initial:
        throw new Error(`Invalid signaling state ${this.dialog.signalingState}.`);
      case x.Stable:
        return this.setAnswer(t, r).then(() => {
        });
      case x.HaveLocalOffer:
        throw new Error(`Invalid signaling state ${this.dialog.signalingState}.`);
      case x.HaveRemoteOffer:
        return this.setOfferAndGetAnswer(t, r);
      case x.Closed:
        throw new Error(`Invalid signaling state ${this.dialog.signalingState}.`);
      default:
        throw new Error(`Invalid signaling state ${this.dialog.signalingState}.`);
    }
  }
  /**
   * A handler for errors which occur while attempting to send 1xx and 2xx responses.
   * In all cases, an attempt is made to reject the request if it is still outstanding.
   * And while there are a variety of things which can go wrong and we log something here
   * for all errors, there are a handful of common exceptions we pay some extra attention to.
   * @param error - The error which occurred.
   */
  handleResponseError(e) {
    let t = 480;
    if (e instanceof Error ? this.logger.error(e.message) : this.logger.error(e), e instanceof kt ? (this.logger.error("A session description handler occurred while sending response (content type unsupported"), t = 415) : e instanceof Yr ? this.logger.error("A session description handler occurred while sending response") : e instanceof At ? this.logger.error("Session ended before response could be formulated and sent (while waiting for PRACK)") : e instanceof Ce && this.logger.error("Session changed state before response could be formulated and sent"), this.state === y.Initial || this.state === y.Establishing)
      try {
        this.incomingInviteRequest.reject({ statusCode: t }), this.stateTransition(y.Terminated);
      } catch (r) {
        throw this.logger.error("An error occurred attempting to reject the request while handling another error"), r;
      }
    if (this.isCanceled) {
      this.logger.warn("An error occurred while attempting to formulate and send a response to an incoming INVITE. However a CANCEL was received and processed while doing so which can (and often does) result in errors occurring as the session terminates in the meantime. Said error is being ignored.");
      return;
    }
    throw e;
  }
  /**
   * Callback for when ACK for a 2xx response is never received.
   * @param session - Session the ACK never arrived for.
   */
  onAckTimeout() {
    if (this.logger.log("Invitation.onAckTimeout"), !this.dialog)
      throw new Error("Dialog undefined.");
    this.logger.log("No ACK received for an extended period of time, terminating session"), this.dialog.bye(), this.stateTransition(y.Terminated);
  }
  /**
   * A version of `accept` which resolves a session when the 200 Ok response is sent.
   * @param options - Options bucket.
   */
  sendAccept(e = {}) {
    const t = {
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions,
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers
    }, r = e.extraHeaders || [];
    return this.waitingForPrack ? this.waitForArrivalOfPrack().then(() => clearTimeout(this.userNoAnswerTimer)).then(() => this.generateResponseOfferAnswer(this.incomingInviteRequest, t)).then((i) => this.incomingInviteRequest.accept({ statusCode: 200, body: i, extraHeaders: r })) : (clearTimeout(this.userNoAnswerTimer), this.generateResponseOfferAnswer(this.incomingInviteRequest, t).then((i) => this.incomingInviteRequest.accept({ statusCode: 200, body: i, extraHeaders: r })));
  }
  /**
   * A version of `progress` which resolves when the provisional response is sent.
   * @param options - Options bucket.
   */
  sendProgress(e = {}) {
    const t = e.statusCode || 180, r = e.reasonPhrase, i = (e.extraHeaders || []).slice(), n = e.body ? wt(e.body) : void 0;
    if (t === 183 && !n)
      return this.sendProgressWithSDP(e);
    try {
      const a = this.incomingInviteRequest.progress({ statusCode: t, reasonPhrase: r, extraHeaders: i, body: n });
      return this._dialog = a.session, Promise.resolve(a);
    } catch (a) {
      return Promise.reject(a);
    }
  }
  /**
   * A version of `progress` which resolves when the provisional response with sdp is sent.
   * @param options - Options bucket.
   */
  sendProgressWithSDP(e = {}) {
    const t = {
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions,
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers
    }, r = e.statusCode || 183, i = e.reasonPhrase, n = (e.extraHeaders || []).slice();
    return this.generateResponseOfferAnswer(this.incomingInviteRequest, t).then((a) => this.incomingInviteRequest.progress({ statusCode: r, reasonPhrase: i, extraHeaders: n, body: a })).then((a) => (this._dialog = a.session, a));
  }
  /**
   * A version of `progress` which resolves when the reliable provisional response is sent.
   * @param options - Options bucket.
   */
  sendProgressReliable(e = {}) {
    return e.extraHeaders = (e.extraHeaders || []).slice(), e.extraHeaders.push("Require: 100rel"), e.extraHeaders.push("RSeq: " + Math.floor(Math.random() * 1e4)), this.sendProgressWithSDP(e);
  }
  /**
   * A version of `progress` which resolves when the reliable provisional response is acknowledged.
   * @param options - Options bucket.
   */
  sendProgressReliableWaitForPrack(e = {}) {
    const t = {
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions,
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers
    }, r = e.statusCode || 183, i = e.reasonPhrase, n = (e.extraHeaders || []).slice();
    n.push("Require: 100rel"), n.push("RSeq: " + this.rseq++);
    let a;
    return new Promise((o, d) => {
      this.waitingForPrack = !0, this.generateResponseOfferAnswer(this.incomingInviteRequest, t).then((h) => (a = h, this.incomingInviteRequest.progress({ statusCode: r, reasonPhrase: i, extraHeaders: n, body: a }))).then((h) => {
        this._dialog = h.session;
        let u, f;
        h.session.delegate = {
          onPrack: (g) => {
            u = g, clearTimeout(T), clearTimeout(D), this.waitingForPrack && (this.waitingForPrack = !1, this.handlePrackOfferAnswer(u).then((E) => {
              try {
                f = u.accept({ statusCode: 200, body: E }), this.prackArrived(), o({ prackRequest: u, prackResponse: f, progressResponse: h });
              } catch (_) {
                d(_);
              }
            }).catch((E) => d(E)));
          }
        };
        const T = setTimeout(() => {
          this.waitingForPrack && (this.waitingForPrack = !1, this.logger.warn("No PRACK received, rejecting INVITE."), clearTimeout(D), this.reject({ statusCode: 504 }).then(() => d(new At())).catch((g) => d(g)));
        }, te.T1 * 64), R = () => {
          try {
            this.incomingInviteRequest.progress({ statusCode: r, reasonPhrase: i, extraHeaders: n, body: a });
          } catch (g) {
            this.waitingForPrack = !1, d(g);
            return;
          }
          D = setTimeout(R, S *= 2);
        };
        let S = te.T1, D = setTimeout(R, S);
      }).catch((h) => {
        this.waitingForPrack = !1, d(h);
      });
    });
  }
  /**
   * A version of `progress` which resolves when a 100 Trying provisional response is sent.
   */
  sendProgressTrying() {
    try {
      const e = this.incomingInviteRequest.trying();
      return Promise.resolve(e);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * When attempting to accept the INVITE, an invitation waits
   * for any outstanding PRACK to arrive before sending the 200 Ok.
   * It will be waiting on this Promise to resolve which lets it know
   * the PRACK has arrived and it may proceed to send the 200 Ok.
   */
  waitForArrivalOfPrack() {
    if (this.waitingForPrackPromise)
      throw new Error("Already waiting for PRACK");
    return this.waitingForPrackPromise = new Promise((e, t) => {
      this.waitingForPrackResolve = e, this.waitingForPrackReject = t;
    }), this.waitingForPrackPromise;
  }
  /**
   * Here we are resolving the promise which in turn will cause
   * the accept to proceed (it may still fail for other reasons, but...).
   */
  prackArrived() {
    this.waitingForPrackResolve && this.waitingForPrackResolve(), this.waitingForPrackPromise = void 0, this.waitingForPrackResolve = void 0, this.waitingForPrackReject = void 0;
  }
  /**
   * Here we are rejecting the promise which in turn will cause
   * the accept to fail and the session to transition to "terminated".
   */
  prackNeverArrived() {
    this.waitingForPrackReject && this.waitingForPrackReject(new At()), this.waitingForPrackPromise = void 0, this.waitingForPrackResolve = void 0, this.waitingForPrackReject = void 0;
  }
}
class pt extends Le {
  /**
   * Constructs a new instance of the `Inviter` class.
   * @param userAgent - User agent. See {@link UserAgent} for details.
   * @param targetURI - Request URI identifying the target of the message.
   * @param options - Options bucket. See {@link InviterOptions} for details.
   */
  constructor(e, t, r = {}) {
    super(e, r), this.disposed = !1, this.earlyMedia = !1, this.earlyMediaSessionDescriptionHandlers = /* @__PURE__ */ new Map(), this.isCanceled = !1, this.inviteWithoutSdp = !1, this.logger = e.getLogger("sip.Inviter"), this.earlyMedia = r.earlyMedia !== void 0 ? r.earlyMedia : this.earlyMedia, this.fromTag = Rt(), this.inviteWithoutSdp = r.inviteWithoutSdp !== void 0 ? r.inviteWithoutSdp : this.inviteWithoutSdp;
    const i = Object.assign({}, r);
    i.params = Object.assign({}, r.params);
    const n = r.anonymous || !1, a = e.contact.toString({
      anonymous: n,
      // Do not add ;ob in initial forming dialog requests if the
      // registration over the current connection got a GRUU URI.
      outbound: n ? !e.contact.tempGruu : !e.contact.pubGruu
    });
    n && e.configuration.uri && (i.params.fromDisplayName = "Anonymous", i.params.fromUri = "sip:anonymous@anonymous.invalid");
    let o = e.userAgentCore.configuration.aor;
    if (i.params.fromUri && (o = typeof i.params.fromUri == "string" ? J.URIParse(i.params.fromUri) : i.params.fromUri), !o)
      throw new TypeError("Invalid from URI: " + i.params.fromUri);
    let d = t;
    if (i.params.toUri && (d = typeof i.params.toUri == "string" ? J.URIParse(i.params.toUri) : i.params.toUri), !d)
      throw new TypeError("Invalid to URI: " + i.params.toUri);
    const h = Object.assign({}, i.params);
    h.fromTag = this.fromTag;
    const u = (i.extraHeaders || []).slice();
    n && e.configuration.uri && (u.push("P-Preferred-Identity: " + e.configuration.uri.toString()), u.push("Privacy: id")), u.push("Contact: " + a), u.push("Allow: " + ["ACK", "CANCEL", "INVITE", "MESSAGE", "BYE", "OPTIONS", "INFO", "NOTIFY", "REFER"].toString()), e.configuration.sipExtension100rel === me.Required && u.push("Require: 100rel"), e.configuration.sipExtensionReplaces === me.Required && u.push("Require: replaces"), i.extraHeaders = u;
    const f = void 0;
    this.outgoingRequestMessage = e.userAgentCore.makeOutgoingRequestMessage(C.INVITE, t, o, d, h, u, f), this._contact = a, this._referralInviterOptions = i, this._renderbody = r.renderbody, this._rendertype = r.rendertype, r.sessionDescriptionHandlerModifiers && (this.sessionDescriptionHandlerModifiers = r.sessionDescriptionHandlerModifiers), r.sessionDescriptionHandlerOptions && (this.sessionDescriptionHandlerOptions = r.sessionDescriptionHandlerOptions), r.sessionDescriptionHandlerModifiersReInvite && (this.sessionDescriptionHandlerModifiersReInvite = r.sessionDescriptionHandlerModifiersReInvite), r.sessionDescriptionHandlerOptionsReInvite && (this.sessionDescriptionHandlerOptionsReInvite = r.sessionDescriptionHandlerOptionsReInvite), this._id = this.outgoingRequestMessage.callId + this.fromTag, this.userAgent._sessions[this._id] = this;
  }
  /**
   * Destructor.
   */
  dispose() {
    if (this.disposed)
      return Promise.resolve();
    switch (this.disposed = !0, this.disposeEarlyMedia(), this.state) {
      case y.Initial:
        return this.cancel().then(() => super.dispose());
      case y.Establishing:
        return this.cancel().then(() => super.dispose());
      case y.Established:
        return super.dispose();
      case y.Terminating:
        return super.dispose();
      case y.Terminated:
        return super.dispose();
      default:
        throw new Error("Unknown state.");
    }
  }
  /**
   * Initial outgoing INVITE request message body.
   */
  get body() {
    return this.outgoingRequestMessage.body;
  }
  /**
   * The identity of the local user.
   */
  get localIdentity() {
    return this.outgoingRequestMessage.from;
  }
  /**
   * The identity of the remote user.
   */
  get remoteIdentity() {
    return this.outgoingRequestMessage.to;
  }
  /**
   * Initial outgoing INVITE request message.
   */
  get request() {
    return this.outgoingRequestMessage;
  }
  /**
   * Cancels the INVITE request.
   *
   * @remarks
   * Sends a CANCEL request.
   * Resolves once the response sent, otherwise rejects.
   *
   * After sending a CANCEL request the expectation is that a 487 final response
   * will be received for the INVITE. However a 200 final response to the INVITE
   * may nonetheless arrive (it's a race between the CANCEL reaching the UAS before
   * the UAS sends a 200) in which case an ACK & BYE will be sent. The net effect
   * is that this method will terminate the session regardless of the race.
   * @param options - Options bucket.
   */
  cancel(e = {}) {
    if (this.logger.log("Inviter.cancel"), this.state !== y.Initial && this.state !== y.Establishing) {
      const r = new Error(`Invalid session state ${this.state}`);
      return this.logger.error(r.message), Promise.reject(r);
    }
    this.isCanceled = !0, this.stateTransition(y.Terminating);
    function t(r, i) {
      if (r && r < 200 || r > 699)
        throw new TypeError("Invalid statusCode: " + r);
      if (r) {
        const n = r, a = Ct(r) || i;
        return "SIP;cause=" + n + ';text="' + a + '"';
      }
    }
    if (this.outgoingInviteRequest) {
      let r;
      e.statusCode && e.reasonPhrase && (r = t(e.statusCode, e.reasonPhrase)), this.outgoingInviteRequest.cancel(r, e);
    } else
      this.logger.warn("Canceled session before INVITE was sent"), this.stateTransition(y.Terminated);
    return Promise.resolve();
  }
  /**
   * Sends the INVITE request.
   *
   * @remarks
   * TLDR...
   *  1) Only one offer/answer exchange permitted during initial INVITE.
   *  2) No "early media" if the initial offer is in an INVITE (default behavior).
   *  3) If "early media" and the initial offer is in an INVITE, no INVITE forking.
   *
   * 1) Only one offer/answer exchange permitted during initial INVITE.
   *
   * Our implementation replaces the following bullet point...
   *
   * o  After having sent or received an answer to the first offer, the
   *    UAC MAY generate subsequent offers in requests based on rules
   *    specified for that method, but only if it has received answers
   *    to any previous offers, and has not sent any offers to which it
   *    hasn't gotten an answer.
   * https://tools.ietf.org/html/rfc3261#section-13.2.1
   *
   * ...with...
   *
   * o  After having sent or received an answer to the first offer, the
   *    UAC MUST NOT generate subsequent offers in requests based on rules
   *    specified for that method.
   *
   * ...which in combination with this bullet point...
   *
   * o  Once the UAS has sent or received an answer to the initial
   *    offer, it MUST NOT generate subsequent offers in any responses
   *    to the initial INVITE.  This means that a UAS based on this
   *    specification alone can never generate subsequent offers until
   *    completion of the initial transaction.
   * https://tools.ietf.org/html/rfc3261#section-13.2.1
   *
   * ...ensures that EXACTLY ONE offer/answer exchange will occur
   * during an initial out of dialog INVITE request made by our UAC.
   *
   *
   * 2) No "early media" if the initial offer is in an INVITE (default behavior).
   *
   * While our implementation adheres to the following bullet point...
   *
   * o  If the initial offer is in an INVITE, the answer MUST be in a
   *    reliable non-failure message from UAS back to UAC which is
   *    correlated to that INVITE.  For this specification, that is
   *    only the final 2xx response to that INVITE.  That same exact
   *    answer MAY also be placed in any provisional responses sent
   *    prior to the answer.  The UAC MUST treat the first session
   *    description it receives as the answer, and MUST ignore any
   *    session descriptions in subsequent responses to the initial
   *    INVITE.
   * https://tools.ietf.org/html/rfc3261#section-13.2.1
   *
   * We have made the following implementation decision with regard to early media...
   *
   * o  If the initial offer is in the INVITE, the answer from the
   *    UAS back to the UAC will establish a media session only
   *    only after the final 2xx response to that INVITE is received.
   *
   * The reason for this decision is rooted in a restriction currently
   * inherent in WebRTC. Specifically, while a SIP INVITE request with an
   * initial offer may fork resulting in more than one provisional answer,
   * there is currently no easy/good way to to "fork" an offer generated
   * by a peer connection. In particular, a WebRTC offer currently may only
   * be matched with one answer and we have no good way to know which
   * "provisional answer" is going to be the "final answer". So we have
   * decided to punt and not create any "early media" sessions in this case.
   *
   * The upshot is that if you want "early media", you must not put the
   * initial offer in the INVITE. Instead, force the UAS to provide the
   * initial offer by sending an INVITE without an offer. In the WebRTC
   * case this allows us to create a unique peer connection with a unique
   * answer for every provisional offer with "early media" on all of them.
   *
   *
   * 3) If "early media" and the initial offer is in an INVITE, no INVITE forking.
   *
   * The default behavior may be altered and "early media" utilized if the
   * initial offer is in the an INVITE by setting the `earlyMedia` options.
   * However in that case the INVITE request MUST NOT fork. This allows for
   * "early media" in environments where the forking behavior of the SIP
   * servers being utilized is configured to disallow forking.
   */
  invite(e = {}) {
    if (this.logger.log("Inviter.invite"), this.state !== y.Initial)
      return super.invite(e);
    if (e.sessionDescriptionHandlerModifiers && (this.sessionDescriptionHandlerModifiers = e.sessionDescriptionHandlerModifiers), e.sessionDescriptionHandlerOptions && (this.sessionDescriptionHandlerOptions = e.sessionDescriptionHandlerOptions), e.withoutSdp || this.inviteWithoutSdp)
      return this._renderbody && this._rendertype && (this.outgoingRequestMessage.body = { contentType: this._rendertype, body: this._renderbody }), this.stateTransition(y.Establishing), Promise.resolve(this.sendInvite(e));
    const t = {
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers,
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions
    };
    return this.getOffer(t).then((r) => (this.outgoingRequestMessage.body = { body: r.content, contentType: r.contentType }, this.stateTransition(y.Establishing), this.sendInvite(e))).catch((r) => {
      throw this.logger.log(r.message), this.state !== y.Terminated && this.stateTransition(y.Terminated), r;
    });
  }
  /**
   * 13.2.1 Creating the Initial INVITE
   *
   * Since the initial INVITE represents a request outside of a dialog,
   * its construction follows the procedures of Section 8.1.1.  Additional
   * processing is required for the specific case of INVITE.
   *
   * An Allow header field (Section 20.5) SHOULD be present in the INVITE.
   * It indicates what methods can be invoked within a dialog, on the UA
   * sending the INVITE, for the duration of the dialog.  For example, a
   * UA capable of receiving INFO requests within a dialog [34] SHOULD
   * include an Allow header field listing the INFO method.
   *
   * A Supported header field (Section 20.37) SHOULD be present in the
   * INVITE.  It enumerates all the extensions understood by the UAC.
   *
   * An Accept (Section 20.1) header field MAY be present in the INVITE.
   * It indicates which Content-Types are acceptable to the UA, in both
   * the response received by it, and in any subsequent requests sent to
   * it within dialogs established by the INVITE.  The Accept header field
   * is especially useful for indicating support of various session
   * description formats.
   *
   * The UAC MAY add an Expires header field (Section 20.19) to limit the
   * validity of the invitation.  If the time indicated in the Expires
   * header field is reached and no final answer for the INVITE has been
   * received, the UAC core SHOULD generate a CANCEL request for the
   * INVITE, as per Section 9.
   *
   * A UAC MAY also find it useful to add, among others, Subject (Section
   * 20.36), Organization (Section 20.25) and User-Agent (Section 20.41)
   * header fields.  They all contain information related to the INVITE.
   *
   * The UAC MAY choose to add a message body to the INVITE.  Section
   * 8.1.1.10 deals with how to construct the header fields -- Content-
   * Type among others -- needed to describe the message body.
   *
   * https://tools.ietf.org/html/rfc3261#section-13.2.1
   */
  sendInvite(e = {}) {
    return this.outgoingInviteRequest = this.userAgent.userAgentCore.invite(this.outgoingRequestMessage, {
      onAccept: (t) => {
        if (this.dialog) {
          this.logger.log("Additional confirmed dialog, sending ACK and BYE"), this.ackAndBye(t);
          return;
        }
        if (this.isCanceled) {
          this.logger.log("Canceled session accepted, sending ACK and BYE"), this.ackAndBye(t), this.stateTransition(y.Terminated);
          return;
        }
        this.notifyReferer(t), this.onAccept(t).then(() => {
          this.disposeEarlyMedia();
        }).catch(() => {
          this.disposeEarlyMedia();
        }).then(() => {
          e.requestDelegate && e.requestDelegate.onAccept && e.requestDelegate.onAccept(t);
        });
      },
      onProgress: (t) => {
        this.isCanceled || (this.notifyReferer(t), this.onProgress(t).catch(() => {
          this.disposeEarlyMedia();
        }).then(() => {
          e.requestDelegate && e.requestDelegate.onProgress && e.requestDelegate.onProgress(t);
        }));
      },
      onRedirect: (t) => {
        this.notifyReferer(t), this.onRedirect(t), e.requestDelegate && e.requestDelegate.onRedirect && e.requestDelegate.onRedirect(t);
      },
      onReject: (t) => {
        this.notifyReferer(t), this.onReject(t), e.requestDelegate && e.requestDelegate.onReject && e.requestDelegate.onReject(t);
      },
      onTrying: (t) => {
        this.notifyReferer(t), this.onTrying(t), e.requestDelegate && e.requestDelegate.onTrying && e.requestDelegate.onTrying(t);
      }
    }), this.outgoingInviteRequest;
  }
  disposeEarlyMedia() {
    this.earlyMediaSessionDescriptionHandlers.forEach((e) => {
      e.close();
    }), this.earlyMediaSessionDescriptionHandlers.clear();
  }
  notifyReferer(e) {
    if (!this._referred)
      return;
    if (!(this._referred instanceof Le))
      throw new Error("Referred session not instance of session");
    if (!this._referred.dialog)
      return;
    if (!e.message.statusCode)
      throw new Error("Status code undefined.");
    if (!e.message.reasonPhrase)
      throw new Error("Reason phrase undefined.");
    const t = e.message.statusCode, r = e.message.reasonPhrase, i = `SIP/2.0 ${t} ${r}`.trim(), n = this._referred.dialog.notify(void 0, {
      extraHeaders: ["Event: refer", "Subscription-State: terminated"],
      body: {
        contentDisposition: "render",
        contentType: "message/sipfrag",
        content: i
      }
    });
    n.delegate = {
      onReject: () => {
        this._referred = void 0;
      }
    };
  }
  /**
   * Handle final response to initial INVITE.
   * @param inviteResponse - 2xx response.
   */
  onAccept(e) {
    if (this.logger.log("Inviter.onAccept"), this.state !== y.Establishing)
      return this.logger.error(`Accept received while in state ${this.state}, dropping response`), Promise.reject(new Error(`Invalid session state ${this.state}`));
    const t = e.message, r = e.session;
    switch (t.hasHeader("P-Asserted-Identity") && (this._assertedIdentity = J.nameAddrHeaderParse(t.getHeader("P-Asserted-Identity"))), r.delegate = {
      onAck: (i) => this.onAckRequest(i),
      onBye: (i) => this.onByeRequest(i),
      onInfo: (i) => this.onInfoRequest(i),
      onInvite: (i) => this.onInviteRequest(i),
      onMessage: (i) => this.onMessageRequest(i),
      onNotify: (i) => this.onNotifyRequest(i),
      onPrack: (i) => this.onPrackRequest(i),
      onRefer: (i) => this.onReferRequest(i)
    }, this._dialog = r, r.signalingState) {
      case x.Initial:
        return this.logger.error("Received 2xx response to INVITE without a session description"), this.ackAndBye(e, 400, "Missing session description"), this.stateTransition(y.Terminated), Promise.reject(new Error("Bad Media Description"));
      case x.HaveLocalOffer:
        return this.logger.error("Received 2xx response to INVITE without a session description"), this.ackAndBye(e, 400, "Missing session description"), this.stateTransition(y.Terminated), Promise.reject(new Error("Bad Media Description"));
      case x.HaveRemoteOffer: {
        if (!this._dialog.offer)
          throw new Error(`Session offer undefined in signaling state ${this._dialog.signalingState}.`);
        const i = {
          sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers,
          sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions
        };
        return this.setOfferAndGetAnswer(this._dialog.offer, i).then((n) => {
          e.ack({ body: n }), this.stateTransition(y.Established);
        }).catch((n) => {
          throw this.ackAndBye(e, 488, "Invalid session description"), this.stateTransition(y.Terminated), n;
        });
      }
      case x.Stable: {
        if (this.earlyMediaSessionDescriptionHandlers.size > 0) {
          const a = this.earlyMediaSessionDescriptionHandlers.get(r.id);
          if (!a)
            throw new Error("Session description handler undefined.");
          return this.setSessionDescriptionHandler(a), this.earlyMediaSessionDescriptionHandlers.delete(r.id), e.ack(), this.stateTransition(y.Established), Promise.resolve();
        }
        if (this.earlyMediaDialog) {
          if (this.earlyMediaDialog !== r) {
            this.earlyMedia && this.logger.error("You have set the 'earlyMedia' option to 'true' which requires that your INVITE requests do not fork and yet this INVITE request did in fact fork. Consequentially and not surprisingly the end point which accepted the INVITE (confirmed dialog) does not match the end point with which early media has been setup (early dialog) and thus this session is unable to proceed. In accordance with the SIP specifications, the SIP servers your end point is connected to determine if an INVITE forks and the forking behavior of those servers cannot be controlled by this library. If you wish to use early media with this library you must configure those servers accordingly. Alternatively you may set the 'earlyMedia' to 'false' which will allow this library to function with any INVITE requests which do fork.");
            const a = new Error("Early media dialog does not equal confirmed dialog, terminating session");
            return this.logger.error(a.message), this.ackAndBye(e, 488, "Not Acceptable Here"), this.stateTransition(y.Terminated), Promise.reject(a);
          }
          return e.ack(), this.stateTransition(y.Established), Promise.resolve();
        }
        const i = r.answer;
        if (!i)
          throw new Error("Answer is undefined.");
        const n = {
          sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers,
          sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions
        };
        return this.setAnswer(i, n).then(() => {
          let a;
          this._renderbody && this._rendertype && (a = {
            body: { contentDisposition: "render", contentType: this._rendertype, content: this._renderbody }
          }), e.ack(a), this.stateTransition(y.Established);
        }).catch((a) => {
          throw this.logger.error(a.message), this.ackAndBye(e, 488, "Not Acceptable Here"), this.stateTransition(y.Terminated), a;
        });
      }
      case x.Closed:
        return Promise.reject(new Error("Terminated."));
      default:
        throw new Error("Unknown session signaling state.");
    }
  }
  /**
   * Handle provisional response to initial INVITE.
   * @param inviteResponse - 1xx response.
   */
  onProgress(e) {
    var t;
    if (this.logger.log("Inviter.onProgress"), this.state !== y.Establishing)
      return this.logger.error(`Progress received while in state ${this.state}, dropping response`), Promise.reject(new Error(`Invalid session state ${this.state}`));
    if (!this.outgoingInviteRequest)
      throw new Error("Outgoing INVITE request undefined.");
    const r = e.message, i = e.session;
    r.hasHeader("P-Asserted-Identity") && (this._assertedIdentity = J.nameAddrHeaderParse(r.getHeader("P-Asserted-Identity")));
    const n = r.getHeader("require"), a = r.getHeader("rseq"), d = !!(n && n.includes("100rel") && a ? Number(a) : void 0), h = [];
    switch (d && h.push("RAck: " + r.getHeader("rseq") + " " + r.getHeader("cseq")), i.signalingState) {
      case x.Initial:
        return d && (this.logger.warn("First reliable provisional response received MUST contain an offer when INVITE does not contain an offer."), e.prack({ extraHeaders: h })), Promise.resolve();
      case x.HaveLocalOffer:
        return d && e.prack({ extraHeaders: h }), Promise.resolve();
      case x.HaveRemoteOffer:
        if (!d)
          return this.logger.warn("Non-reliable provisional response MUST NOT contain an initial offer, discarding response."), Promise.resolve();
        {
          const u = this.sessionDescriptionHandlerFactory(this, this.userAgent.configuration.sessionDescriptionHandlerFactoryOptions || {});
          return !((t = this.delegate) === null || t === void 0) && t.onSessionDescriptionHandler && this.delegate.onSessionDescriptionHandler(u, !0), this.earlyMediaSessionDescriptionHandlers.set(i.id, u), u.setDescription(r.body, this.sessionDescriptionHandlerOptions, this.sessionDescriptionHandlerModifiers).then(() => u.getDescription(this.sessionDescriptionHandlerOptions, this.sessionDescriptionHandlerModifiers)).then((f) => {
            const w = {
              contentDisposition: "session",
              contentType: f.contentType,
              content: f.body
            };
            e.prack({ extraHeaders: h, body: w });
          }).catch((f) => {
            throw this.stateTransition(y.Terminated), f;
          });
        }
      case x.Stable:
        if (d && e.prack({ extraHeaders: h }), this.earlyMedia && !this.earlyMediaDialog) {
          this.earlyMediaDialog = i;
          const u = i.answer;
          if (!u)
            throw new Error("Answer is undefined.");
          const f = {
            sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers,
            sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions
          };
          return this.setAnswer(u, f).catch((w) => {
            throw this.stateTransition(y.Terminated), w;
          });
        }
        return Promise.resolve();
      case x.Closed:
        return Promise.reject(new Error("Terminated."));
      default:
        throw new Error("Unknown session signaling state.");
    }
  }
  /**
   * Handle final response to initial INVITE.
   * @param inviteResponse - 3xx response.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRedirect(e) {
    if (this.logger.log("Inviter.onRedirect"), this.state !== y.Establishing && this.state !== y.Terminating) {
      this.logger.error(`Redirect received while in state ${this.state}, dropping response`);
      return;
    }
    this.stateTransition(y.Terminated);
  }
  /**
   * Handle final response to initial INVITE.
   * @param inviteResponse - 4xx, 5xx, or 6xx response.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onReject(e) {
    if (this.logger.log("Inviter.onReject"), this.state !== y.Establishing && this.state !== y.Terminating) {
      this.logger.error(`Reject received while in state ${this.state}, dropping response`);
      return;
    }
    this.stateTransition(y.Terminated);
  }
  /**
   * Handle final response to initial INVITE.
   * @param inviteResponse - 100 response.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTrying(e) {
    if (this.logger.log("Inviter.onTrying"), this.state !== y.Establishing) {
      this.logger.error(`Trying received while in state ${this.state}, dropping response`);
      return;
    }
  }
}
class ni {
  /**
   * Constructs a new instance of the `Messager` class.
   * @param userAgent - User agent. See {@link UserAgent} for details.
   * @param targetURI - Request URI identifying the target of the message.
   * @param content - Content for the body of the message.
   * @param contentType - Content type of the body of the message.
   * @param options - Options bucket. See {@link MessagerOptions} for details.
   */
  constructor(e, t, r, i = "text/plain", n = {}) {
    this.logger = e.getLogger("sip.Messager"), n.params = n.params || {};
    let a = e.userAgentCore.configuration.aor;
    if (n.params.fromUri && (a = typeof n.params.fromUri == "string" ? J.URIParse(n.params.fromUri) : n.params.fromUri), !a)
      throw new TypeError("Invalid from URI: " + n.params.fromUri);
    let o = t;
    if (n.params.toUri && (o = typeof n.params.toUri == "string" ? J.URIParse(n.params.toUri) : n.params.toUri), !o)
      throw new TypeError("Invalid to URI: " + n.params.toUri);
    const d = n.params ? Object.assign({}, n.params) : {}, h = (n.extraHeaders || []).slice(), f = {
      contentDisposition: "render",
      contentType: i,
      content: r
    };
    this.request = e.userAgentCore.makeOutgoingRequestMessage(C.MESSAGE, t, a, o, d, h, f), this.userAgent = e;
  }
  /**
   * Send the message.
   */
  message(e = {}) {
    return this.userAgent.userAgentCore.request(this.request, e.requestDelegate), Promise.resolve();
  }
}
var N;
(function(s) {
  s.Initial = "Initial", s.Registered = "Registered", s.Unregistered = "Unregistered", s.Terminated = "Terminated";
})(N = N || (N = {}));
class ye {
  /**
   * Constructs a new instance of the `Registerer` class.
   * @param userAgent - User agent. See {@link UserAgent} for details.
   * @param options - Options bucket. See {@link RegistererOptions} for details.
   */
  constructor(e, t = {}) {
    this.disposed = !1, this._contacts = [], this._retryAfter = void 0, this._state = N.Initial, this._waiting = !1, this._stateEventEmitter = new tt(), this._waitingEventEmitter = new tt(), this.userAgent = e;
    const r = e.configuration.uri.clone();
    if (r.user = void 0, this.options = Object.assign(Object.assign(Object.assign({}, ye.defaultOptions()), { registrar: r }), ye.stripUndefinedProperties(t)), this.options.extraContactHeaderParams = (this.options.extraContactHeaderParams || []).slice(), this.options.extraHeaders = (this.options.extraHeaders || []).slice(), !this.options.registrar)
      throw new Error("Registrar undefined.");
    if (this.options.registrar = this.options.registrar.clone(), this.options.regId && !this.options.instanceId ? this.options.instanceId = this.userAgent.instanceId : !this.options.regId && this.options.instanceId && (this.options.regId = 1), this.options.instanceId && J.parse(this.options.instanceId, "uuid") === -1)
      throw new Error("Invalid instanceId.");
    if (this.options.regId && this.options.regId < 0)
      throw new Error("Invalid regId.");
    const i = this.options.registrar, n = this.options.params && this.options.params.fromUri || e.userAgentCore.configuration.aor, a = this.options.params && this.options.params.toUri || e.configuration.uri, o = this.options.params || {}, d = (t.extraHeaders || []).slice();
    if (this.request = e.userAgentCore.makeOutgoingRequestMessage(C.REGISTER, i, n, a, o, d, void 0), this.expires = this.options.expires || ye.defaultExpires, this.expires < 0)
      throw new Error("Invalid expires.");
    if (this.refreshFrequency = this.options.refreshFrequency || ye.defaultRefreshFrequency, this.refreshFrequency < 50 || this.refreshFrequency > 99)
      throw new Error("Invalid refresh frequency. The value represents a percentage of the expiration time and should be between 50 and 99.");
    this.logger = e.getLogger("sip.Registerer"), this.options.logConfiguration && (this.logger.log("Configuration:"), Object.keys(this.options).forEach((h) => {
      const u = this.options[h];
      switch (h) {
        case "registrar":
          this.logger.log("· " + h + ": " + u);
          break;
        default:
          this.logger.log("· " + h + ": " + JSON.stringify(u));
      }
    })), this.id = this.request.callId + this.request.from.parameters.tag, this.userAgent._registerers[this.id] = this;
  }
  /** Default registerer options. */
  static defaultOptions() {
    return {
      expires: ye.defaultExpires,
      extraContactHeaderParams: [],
      extraHeaders: [],
      logConfiguration: !0,
      instanceId: "",
      params: {},
      regId: 0,
      registrar: new we("sip", "anonymous", "anonymous.invalid"),
      refreshFrequency: ye.defaultRefreshFrequency
    };
  }
  /**
   * Strip properties with undefined values from options.
   * This is a work around while waiting for missing vs undefined to be addressed (or not)...
   * https://github.com/Microsoft/TypeScript/issues/13195
   * @param options - Options to reduce
   */
  static stripUndefinedProperties(e) {
    return Object.keys(e).reduce((t, r) => (e[r] !== void 0 && (t[r] = e[r]), t), {});
  }
  /** The registered contacts. */
  get contacts() {
    return this._contacts.slice();
  }
  /**
   * The number of seconds to wait before retrying to register.
   * @defaultValue `undefined`
   * @remarks
   * When the server rejects a registration request, if it provides a suggested
   * duration to wait before retrying, that value is available here when and if
   * the state transitions to `Unsubscribed`. It is also available during the
   * callback to `onReject` after a call to `register`. (Note that if the state
   * if already `Unsubscribed`, a rejected request created by `register` will
   * not cause the state to transition to `Unsubscribed`. One way to avoid this
   * case is to dispose of `Registerer` when unregistered and create a new
   * `Registerer` for any attempts to retry registering.)
   * @example
   * ```ts
   * // Checking for retry after on state change
   * registerer.stateChange.addListener((newState) => {
   *   switch (newState) {
   *     case RegistererState.Unregistered:
   *       const retryAfter = registerer.retryAfter;
   *       break;
   *   }
   * });
   *
   * // Checking for retry after on request rejection
   * registerer.register({
   *   requestDelegate: {
   *     onReject: () => {
   *       const retryAfter = registerer.retryAfter;
   *     }
   *   }
   * });
   * ```
   */
  get retryAfter() {
    return this._retryAfter;
  }
  /** The registration state. */
  get state() {
    return this._state;
  }
  /** Emits when the registerer state changes. */
  get stateChange() {
    return this._stateEventEmitter;
  }
  /** Destructor. */
  dispose() {
    return this.disposed ? Promise.resolve() : (this.disposed = !0, this.logger.log(`Registerer ${this.id} in state ${this.state} is being disposed`), delete this.userAgent._registerers[this.id], new Promise((e) => {
      const t = () => {
        if (!this.waiting && this._state === N.Registered) {
          this.stateChange.addListener(() => {
            this.terminated(), e();
          }, { once: !0 }), this.unregister();
          return;
        }
        this.terminated(), e();
      };
      this.waiting ? this.waitingChange.addListener(() => {
        t();
      }, { once: !0 }) : t();
    }));
  }
  /**
   * Sends the REGISTER request.
   * @remarks
   * If successful, sends re-REGISTER requests prior to registration expiration until `unsubscribe()` is called.
   * Rejects with `RequestPendingError` if a REGISTER request is already in progress.
   */
  register(e = {}) {
    if (this.state === N.Terminated)
      throw this.stateError(), new Error("Registerer terminated. Unable to register.");
    if (this.disposed)
      throw this.stateError(), new Error("Registerer disposed. Unable to register.");
    if (this.waiting) {
      this.waitingWarning();
      const i = new et("REGISTER request already in progress, waiting for final response");
      return Promise.reject(i);
    }
    e.requestOptions && (this.options = Object.assign(Object.assign({}, this.options), e.requestOptions));
    const t = (this.options.extraHeaders || []).slice();
    t.push("Contact: " + this.generateContactHeader(this.expires)), t.push("Allow: " + ["ACK", "CANCEL", "INVITE", "MESSAGE", "BYE", "OPTIONS", "INFO", "NOTIFY", "REFER"].toString()), this.request.cseq++, this.request.setHeader("cseq", this.request.cseq + " REGISTER"), this.request.extraHeaders = t, this.waitingToggle(!0);
    const r = this.userAgent.userAgentCore.register(this.request, {
      onAccept: (i) => {
        let n;
        i.message.hasHeader("expires") && (n = Number(i.message.getHeader("expires"))), this._contacts = i.message.getHeaders("contact");
        let a = this._contacts.length;
        if (!a) {
          this.logger.error("No Contact header in response to REGISTER, dropping response."), this.unregistered();
          return;
        }
        let o;
        for (; a--; ) {
          if (o = i.message.parseHeader("contact", a), !o)
            throw new Error("Contact undefined");
          if (this.userAgent.contact.pubGruu && er(o.uri, this.userAgent.contact.pubGruu)) {
            n = Number(o.getParam("expires"));
            break;
          }
          if (this.userAgent.configuration.contactName === "") {
            if (o.uri.user === this.userAgent.contact.uri.user) {
              n = Number(o.getParam("expires"));
              break;
            }
          } else if (er(o.uri, this.userAgent.contact.uri)) {
            n = Number(o.getParam("expires"));
            break;
          }
          o = void 0;
        }
        if (o === void 0) {
          this.logger.error("No Contact header pointing to us, dropping response"), this.unregistered(), this.waitingToggle(!1);
          return;
        }
        if (n === void 0) {
          this.logger.error("Contact pointing to us is missing expires parameter, dropping response"), this.unregistered(), this.waitingToggle(!1);
          return;
        }
        if (o.hasParam("temp-gruu")) {
          const d = o.getParam("temp-gruu");
          d && (this.userAgent.contact.tempGruu = J.URIParse(d.replace(/"/g, "")));
        }
        if (o.hasParam("pub-gruu")) {
          const d = o.getParam("pub-gruu");
          d && (this.userAgent.contact.pubGruu = J.URIParse(d.replace(/"/g, "")));
        }
        this.registered(n), e.requestDelegate && e.requestDelegate.onAccept && e.requestDelegate.onAccept(i), this.waitingToggle(!1);
      },
      onProgress: (i) => {
        e.requestDelegate && e.requestDelegate.onProgress && e.requestDelegate.onProgress(i);
      },
      onRedirect: (i) => {
        this.logger.error("Redirect received. Not supported."), this.unregistered(), e.requestDelegate && e.requestDelegate.onRedirect && e.requestDelegate.onRedirect(i), this.waitingToggle(!1);
      },
      onReject: (i) => {
        if (i.message.statusCode === 423) {
          if (!i.message.hasHeader("min-expires")) {
            this.logger.error("423 response received for REGISTER without Min-Expires, dropping response"), this.unregistered(), this.waitingToggle(!1);
            return;
          }
          this.expires = Number(i.message.getHeader("min-expires")), this.waitingToggle(!1), this.register();
          return;
        }
        this.logger.warn(`Failed to register, status code ${i.message.statusCode}`);
        let n = NaN;
        if (i.message.statusCode === 500 || i.message.statusCode === 503) {
          const a = i.message.getHeader("retry-after");
          a && (n = Number.parseInt(a, void 0));
        }
        this._retryAfter = isNaN(n) ? void 0 : n, this.unregistered(), e.requestDelegate && e.requestDelegate.onReject && e.requestDelegate.onReject(i), this._retryAfter = void 0, this.waitingToggle(!1);
      },
      onTrying: (i) => {
        e.requestDelegate && e.requestDelegate.onTrying && e.requestDelegate.onTrying(i);
      }
    });
    return Promise.resolve(r);
  }
  /**
   * Sends the REGISTER request with expires equal to zero.
   * @remarks
   * Rejects with `RequestPendingError` if a REGISTER request is already in progress.
   */
  unregister(e = {}) {
    if (this.state === N.Terminated)
      throw this.stateError(), new Error("Registerer terminated. Unable to register.");
    if (this.disposed && this.state !== N.Registered)
      throw this.stateError(), new Error("Registerer disposed. Unable to register.");
    if (this.waiting) {
      this.waitingWarning();
      const i = new et("REGISTER request already in progress, waiting for final response");
      return Promise.reject(i);
    }
    this._state !== N.Registered && !e.all && this.logger.warn("Not currently registered, but sending an unregister anyway.");
    const t = (e.requestOptions && e.requestOptions.extraHeaders || []).slice();
    this.request.extraHeaders = t, e.all ? (t.push("Contact: *"), t.push("Expires: 0")) : t.push("Contact: " + this.generateContactHeader(0)), this.request.cseq++, this.request.setHeader("cseq", this.request.cseq + " REGISTER"), this.registrationTimer !== void 0 && (clearTimeout(this.registrationTimer), this.registrationTimer = void 0), this.waitingToggle(!0);
    const r = this.userAgent.userAgentCore.register(this.request, {
      onAccept: (i) => {
        this._contacts = i.message.getHeaders("contact"), this.unregistered(), e.requestDelegate && e.requestDelegate.onAccept && e.requestDelegate.onAccept(i), this.waitingToggle(!1);
      },
      onProgress: (i) => {
        e.requestDelegate && e.requestDelegate.onProgress && e.requestDelegate.onProgress(i);
      },
      onRedirect: (i) => {
        this.logger.error("Unregister redirected. Not currently supported."), this.unregistered(), e.requestDelegate && e.requestDelegate.onRedirect && e.requestDelegate.onRedirect(i), this.waitingToggle(!1);
      },
      onReject: (i) => {
        this.logger.error(`Unregister rejected with status code ${i.message.statusCode}`), this.unregistered(), e.requestDelegate && e.requestDelegate.onReject && e.requestDelegate.onReject(i), this.waitingToggle(!1);
      },
      onTrying: (i) => {
        e.requestDelegate && e.requestDelegate.onTrying && e.requestDelegate.onTrying(i);
      }
    });
    return Promise.resolve(r);
  }
  /**
   * Clear registration timers.
   */
  clearTimers() {
    this.registrationTimer !== void 0 && (clearTimeout(this.registrationTimer), this.registrationTimer = void 0), this.registrationExpiredTimer !== void 0 && (clearTimeout(this.registrationExpiredTimer), this.registrationExpiredTimer = void 0);
  }
  /**
   * Generate Contact Header
   */
  generateContactHeader(e) {
    let t = this.userAgent.contact.toString({ register: !0 });
    return this.options.regId && this.options.instanceId && (t += ";reg-id=" + this.options.regId, t += ';+sip.instance="<urn:uuid:' + this.options.instanceId + '>"'), this.options.extraContactHeaderParams && this.options.extraContactHeaderParams.forEach((r) => {
      t += ";" + r;
    }), t += ";expires=" + e, t;
  }
  /**
   * Helper function, called when registered.
   */
  registered(e) {
    this.clearTimers(), this.registrationTimer = setTimeout(() => {
      this.registrationTimer = void 0, this.register();
    }, this.refreshFrequency / 100 * e * 1e3), this.registrationExpiredTimer = setTimeout(() => {
      this.logger.warn("Registration expired"), this.unregistered();
    }, e * 1e3), this._state !== N.Registered && this.stateTransition(N.Registered);
  }
  /**
   * Helper function, called when unregistered.
   */
  unregistered() {
    this.clearTimers(), this._state !== N.Unregistered && this.stateTransition(N.Unregistered);
  }
  /**
   * Helper function, called when terminated.
   */
  terminated() {
    this.clearTimers(), this._state !== N.Terminated && this.stateTransition(N.Terminated);
  }
  /**
   * Transition registration state.
   */
  stateTransition(e) {
    const t = () => {
      throw new Error(`Invalid state transition from ${this._state} to ${e}`);
    };
    switch (this._state) {
      case N.Initial:
        e !== N.Registered && e !== N.Unregistered && e !== N.Terminated && t();
        break;
      case N.Registered:
        e !== N.Unregistered && e !== N.Terminated && t();
        break;
      case N.Unregistered:
        e !== N.Registered && e !== N.Terminated && t();
        break;
      case N.Terminated:
        t();
        break;
      default:
        throw new Error("Unrecognized state.");
    }
    this._state = e, this.logger.log(`Registration transitioned to state ${this._state}`), this._stateEventEmitter.emit(this._state), e === N.Terminated && this.dispose();
  }
  /** True if the registerer is currently waiting for final response to a REGISTER request. */
  get waiting() {
    return this._waiting;
  }
  /** Emits when the registerer waiting state changes. */
  get waitingChange() {
    return this._waitingEventEmitter;
  }
  /**
   * Toggle waiting.
   */
  waitingToggle(e) {
    if (this._waiting === e)
      throw new Error(`Invalid waiting transition from ${this._waiting} to ${e}`);
    this._waiting = e, this.logger.log(`Waiting toggled to ${this._waiting}`), this._waitingEventEmitter.emit(this._waiting);
  }
  /** Hopefully helpful as the standard behavior has been found to be unexpected. */
  waitingWarning() {
    let e = "An attempt was made to send a REGISTER request while a prior one was still in progress.";
    e += " RFC 3261 requires UAs MUST NOT send a new registration until they have received a final response", e += " from the registrar for the previous one or the previous REGISTER request has timed out.", e += " Note that if the transport disconnects, you still must wait for the prior request to time out before", e += " sending a new REGISTER request or alternatively dispose of the current Registerer and create a new Registerer.", this.logger.warn(e);
  }
  /** Hopefully helpful as the standard behavior has been found to be unexpected. */
  stateError() {
    let t = `An attempt was made to send a REGISTER request when the Registerer ${this.state === N.Terminated ? "is in 'Terminated' state" : "has been disposed"}.`;
    t += " The Registerer transitions to 'Terminated' when Registerer.dispose() is called.", t += " Perhaps you called UserAgent.stop() which dipsoses of all Registerers?", this.logger.error(t);
  }
}
ye.defaultExpires = 600;
ye.defaultRefreshFrequency = 99;
var O;
(function(s) {
  s.Initial = "Initial", s.NotifyWait = "NotifyWait", s.Pending = "Pending", s.Active = "Active", s.Terminated = "Terminated";
})(O = O || (O = {}));
var H;
(function(s) {
  s.Connecting = "Connecting", s.Connected = "Connected", s.Disconnecting = "Disconnecting", s.Disconnected = "Disconnected";
})(H = H || (H = {}));
var Y;
(function(s) {
  s.Started = "Started", s.Stopped = "Stopped";
})(Y = Y || (Y = {}));
class z {
  constructor() {
    this._dataLength = 0, this._bufferLength = 0, this._state = new Int32Array(4), this._buffer = new ArrayBuffer(68), this._buffer8 = new Uint8Array(this._buffer, 0, 68), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
  }
  static hashStr(e, t = !1) {
    return this.onePassHasher.start().appendStr(e).end(t);
  }
  static hashAsciiStr(e, t = !1) {
    return this.onePassHasher.start().appendAsciiStr(e).end(t);
  }
  static _hex(e) {
    const t = z.hexChars, r = z.hexOut;
    let i, n, a, o;
    for (o = 0; o < 4; o += 1)
      for (n = o * 8, i = e[o], a = 0; a < 8; a += 2)
        r[n + 1 + a] = t.charAt(i & 15), i >>>= 4, r[n + 0 + a] = t.charAt(i & 15), i >>>= 4;
    return r.join("");
  }
  static _md5cycle(e, t) {
    let r = e[0], i = e[1], n = e[2], a = e[3];
    r += (i & n | ~i & a) + t[0] - 680876936 | 0, r = (r << 7 | r >>> 25) + i | 0, a += (r & i | ~r & n) + t[1] - 389564586 | 0, a = (a << 12 | a >>> 20) + r | 0, n += (a & r | ~a & i) + t[2] + 606105819 | 0, n = (n << 17 | n >>> 15) + a | 0, i += (n & a | ~n & r) + t[3] - 1044525330 | 0, i = (i << 22 | i >>> 10) + n | 0, r += (i & n | ~i & a) + t[4] - 176418897 | 0, r = (r << 7 | r >>> 25) + i | 0, a += (r & i | ~r & n) + t[5] + 1200080426 | 0, a = (a << 12 | a >>> 20) + r | 0, n += (a & r | ~a & i) + t[6] - 1473231341 | 0, n = (n << 17 | n >>> 15) + a | 0, i += (n & a | ~n & r) + t[7] - 45705983 | 0, i = (i << 22 | i >>> 10) + n | 0, r += (i & n | ~i & a) + t[8] + 1770035416 | 0, r = (r << 7 | r >>> 25) + i | 0, a += (r & i | ~r & n) + t[9] - 1958414417 | 0, a = (a << 12 | a >>> 20) + r | 0, n += (a & r | ~a & i) + t[10] - 42063 | 0, n = (n << 17 | n >>> 15) + a | 0, i += (n & a | ~n & r) + t[11] - 1990404162 | 0, i = (i << 22 | i >>> 10) + n | 0, r += (i & n | ~i & a) + t[12] + 1804603682 | 0, r = (r << 7 | r >>> 25) + i | 0, a += (r & i | ~r & n) + t[13] - 40341101 | 0, a = (a << 12 | a >>> 20) + r | 0, n += (a & r | ~a & i) + t[14] - 1502002290 | 0, n = (n << 17 | n >>> 15) + a | 0, i += (n & a | ~n & r) + t[15] + 1236535329 | 0, i = (i << 22 | i >>> 10) + n | 0, r += (i & a | n & ~a) + t[1] - 165796510 | 0, r = (r << 5 | r >>> 27) + i | 0, a += (r & n | i & ~n) + t[6] - 1069501632 | 0, a = (a << 9 | a >>> 23) + r | 0, n += (a & i | r & ~i) + t[11] + 643717713 | 0, n = (n << 14 | n >>> 18) + a | 0, i += (n & r | a & ~r) + t[0] - 373897302 | 0, i = (i << 20 | i >>> 12) + n | 0, r += (i & a | n & ~a) + t[5] - 701558691 | 0, r = (r << 5 | r >>> 27) + i | 0, a += (r & n | i & ~n) + t[10] + 38016083 | 0, a = (a << 9 | a >>> 23) + r | 0, n += (a & i | r & ~i) + t[15] - 660478335 | 0, n = (n << 14 | n >>> 18) + a | 0, i += (n & r | a & ~r) + t[4] - 405537848 | 0, i = (i << 20 | i >>> 12) + n | 0, r += (i & a | n & ~a) + t[9] + 568446438 | 0, r = (r << 5 | r >>> 27) + i | 0, a += (r & n | i & ~n) + t[14] - 1019803690 | 0, a = (a << 9 | a >>> 23) + r | 0, n += (a & i | r & ~i) + t[3] - 187363961 | 0, n = (n << 14 | n >>> 18) + a | 0, i += (n & r | a & ~r) + t[8] + 1163531501 | 0, i = (i << 20 | i >>> 12) + n | 0, r += (i & a | n & ~a) + t[13] - 1444681467 | 0, r = (r << 5 | r >>> 27) + i | 0, a += (r & n | i & ~n) + t[2] - 51403784 | 0, a = (a << 9 | a >>> 23) + r | 0, n += (a & i | r & ~i) + t[7] + 1735328473 | 0, n = (n << 14 | n >>> 18) + a | 0, i += (n & r | a & ~r) + t[12] - 1926607734 | 0, i = (i << 20 | i >>> 12) + n | 0, r += (i ^ n ^ a) + t[5] - 378558 | 0, r = (r << 4 | r >>> 28) + i | 0, a += (r ^ i ^ n) + t[8] - 2022574463 | 0, a = (a << 11 | a >>> 21) + r | 0, n += (a ^ r ^ i) + t[11] + 1839030562 | 0, n = (n << 16 | n >>> 16) + a | 0, i += (n ^ a ^ r) + t[14] - 35309556 | 0, i = (i << 23 | i >>> 9) + n | 0, r += (i ^ n ^ a) + t[1] - 1530992060 | 0, r = (r << 4 | r >>> 28) + i | 0, a += (r ^ i ^ n) + t[4] + 1272893353 | 0, a = (a << 11 | a >>> 21) + r | 0, n += (a ^ r ^ i) + t[7] - 155497632 | 0, n = (n << 16 | n >>> 16) + a | 0, i += (n ^ a ^ r) + t[10] - 1094730640 | 0, i = (i << 23 | i >>> 9) + n | 0, r += (i ^ n ^ a) + t[13] + 681279174 | 0, r = (r << 4 | r >>> 28) + i | 0, a += (r ^ i ^ n) + t[0] - 358537222 | 0, a = (a << 11 | a >>> 21) + r | 0, n += (a ^ r ^ i) + t[3] - 722521979 | 0, n = (n << 16 | n >>> 16) + a | 0, i += (n ^ a ^ r) + t[6] + 76029189 | 0, i = (i << 23 | i >>> 9) + n | 0, r += (i ^ n ^ a) + t[9] - 640364487 | 0, r = (r << 4 | r >>> 28) + i | 0, a += (r ^ i ^ n) + t[12] - 421815835 | 0, a = (a << 11 | a >>> 21) + r | 0, n += (a ^ r ^ i) + t[15] + 530742520 | 0, n = (n << 16 | n >>> 16) + a | 0, i += (n ^ a ^ r) + t[2] - 995338651 | 0, i = (i << 23 | i >>> 9) + n | 0, r += (n ^ (i | ~a)) + t[0] - 198630844 | 0, r = (r << 6 | r >>> 26) + i | 0, a += (i ^ (r | ~n)) + t[7] + 1126891415 | 0, a = (a << 10 | a >>> 22) + r | 0, n += (r ^ (a | ~i)) + t[14] - 1416354905 | 0, n = (n << 15 | n >>> 17) + a | 0, i += (a ^ (n | ~r)) + t[5] - 57434055 | 0, i = (i << 21 | i >>> 11) + n | 0, r += (n ^ (i | ~a)) + t[12] + 1700485571 | 0, r = (r << 6 | r >>> 26) + i | 0, a += (i ^ (r | ~n)) + t[3] - 1894986606 | 0, a = (a << 10 | a >>> 22) + r | 0, n += (r ^ (a | ~i)) + t[10] - 1051523 | 0, n = (n << 15 | n >>> 17) + a | 0, i += (a ^ (n | ~r)) + t[1] - 2054922799 | 0, i = (i << 21 | i >>> 11) + n | 0, r += (n ^ (i | ~a)) + t[8] + 1873313359 | 0, r = (r << 6 | r >>> 26) + i | 0, a += (i ^ (r | ~n)) + t[15] - 30611744 | 0, a = (a << 10 | a >>> 22) + r | 0, n += (r ^ (a | ~i)) + t[6] - 1560198380 | 0, n = (n << 15 | n >>> 17) + a | 0, i += (a ^ (n | ~r)) + t[13] + 1309151649 | 0, i = (i << 21 | i >>> 11) + n | 0, r += (n ^ (i | ~a)) + t[4] - 145523070 | 0, r = (r << 6 | r >>> 26) + i | 0, a += (i ^ (r | ~n)) + t[11] - 1120210379 | 0, a = (a << 10 | a >>> 22) + r | 0, n += (r ^ (a | ~i)) + t[2] + 718787259 | 0, n = (n << 15 | n >>> 17) + a | 0, i += (a ^ (n | ~r)) + t[9] - 343485551 | 0, i = (i << 21 | i >>> 11) + n | 0, e[0] = r + e[0] | 0, e[1] = i + e[1] | 0, e[2] = n + e[2] | 0, e[3] = a + e[3] | 0;
  }
  start() {
    return this._dataLength = 0, this._bufferLength = 0, this._state.set(z.stateIdentity), this;
  }
  // Char to code point to to array conversion:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
  // #Example.3A_Fixing_charCodeAt_to_handle_non-Basic-Multilingual-Plane_characters_if_their_presence_earlier_in_the_string_is_unknown
  appendStr(e) {
    const t = this._buffer8, r = this._buffer32;
    let i = this._bufferLength, n, a;
    for (a = 0; a < e.length; a += 1) {
      if (n = e.charCodeAt(a), n < 128)
        t[i++] = n;
      else if (n < 2048)
        t[i++] = (n >>> 6) + 192, t[i++] = n & 63 | 128;
      else if (n < 55296 || n > 56319)
        t[i++] = (n >>> 12) + 224, t[i++] = n >>> 6 & 63 | 128, t[i++] = n & 63 | 128;
      else {
        if (n = (n - 55296) * 1024 + (e.charCodeAt(++a) - 56320) + 65536, n > 1114111)
          throw new Error("Unicode standard supports code points up to U+10FFFF");
        t[i++] = (n >>> 18) + 240, t[i++] = n >>> 12 & 63 | 128, t[i++] = n >>> 6 & 63 | 128, t[i++] = n & 63 | 128;
      }
      i >= 64 && (this._dataLength += 64, z._md5cycle(this._state, r), i -= 64, r[0] = r[16]);
    }
    return this._bufferLength = i, this;
  }
  appendAsciiStr(e) {
    const t = this._buffer8, r = this._buffer32;
    let i = this._bufferLength, n, a = 0;
    for (; ; ) {
      for (n = Math.min(e.length - a, 64 - i); n--; )
        t[i++] = e.charCodeAt(a++);
      if (i < 64)
        break;
      this._dataLength += 64, z._md5cycle(this._state, r), i = 0;
    }
    return this._bufferLength = i, this;
  }
  appendByteArray(e) {
    const t = this._buffer8, r = this._buffer32;
    let i = this._bufferLength, n, a = 0;
    for (; ; ) {
      for (n = Math.min(e.length - a, 64 - i); n--; )
        t[i++] = e[a++];
      if (i < 64)
        break;
      this._dataLength += 64, z._md5cycle(this._state, r), i = 0;
    }
    return this._bufferLength = i, this;
  }
  getState() {
    const e = this, t = e._state;
    return {
      buffer: String.fromCharCode.apply(null, e._buffer8),
      buflen: e._bufferLength,
      length: e._dataLength,
      state: [t[0], t[1], t[2], t[3]]
    };
  }
  setState(e) {
    const t = e.buffer, r = e.state, i = this._state;
    let n;
    for (this._dataLength = e.length, this._bufferLength = e.buflen, i[0] = r[0], i[1] = r[1], i[2] = r[2], i[3] = r[3], n = 0; n < t.length; n += 1)
      this._buffer8[n] = t.charCodeAt(n);
  }
  end(e = !1) {
    const t = this._bufferLength, r = this._buffer8, i = this._buffer32, n = (t >> 2) + 1;
    let a;
    if (this._dataLength += t, r[t] = 128, r[t + 1] = r[t + 2] = r[t + 3] = 0, i.set(z.buffer32Identity.subarray(n), n), t > 55 && (z._md5cycle(this._state, i), i.set(z.buffer32Identity)), a = this._dataLength * 8, a <= 4294967295)
      i[14] = a;
    else {
      const o = a.toString(16).match(/(.*?)(.{0,8})$/);
      if (o === null)
        return;
      const d = parseInt(o[2], 16), h = parseInt(o[1], 16) || 0;
      i[14] = d, i[15] = h;
    }
    return z._md5cycle(this._state, i), e ? this._state : z._hex(this._state);
  }
}
z.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
z.buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
z.hexChars = "0123456789abcdef";
z.hexOut = [];
z.onePassHasher = new z();
z.hashStr("hello") !== "5d41402abc4b2a76b9719d911017c592" && console.error("Md5 self test failed.");
function xe(s) {
  return z.hashStr(s);
}
class ai {
  /**
   * Constructor.
   * @param loggerFactory - LoggerFactory.
   * @param username - Username.
   * @param password - Password.
   */
  constructor(e, t, r, i) {
    this.logger = e.getLogger("sipjs.digestauthentication"), this.username = r, this.password = i, this.ha1 = t, this.nc = 0, this.ncHex = "00000000";
  }
  /**
   * Performs Digest authentication given a SIP request and the challenge
   * received in a response to that request.
   * @param request -
   * @param challenge -
   * @returns true if credentials were successfully generated, false otherwise.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authenticate(e, t, r) {
    if (this.algorithm = t.algorithm, this.realm = t.realm, this.nonce = t.nonce, this.opaque = t.opaque, this.stale = t.stale, this.algorithm) {
      if (this.algorithm !== "MD5")
        return this.logger.warn("challenge with Digest algorithm different than 'MD5', authentication aborted"), !1;
    } else
      this.algorithm = "MD5";
    if (!this.realm)
      return this.logger.warn("challenge without Digest realm, authentication aborted"), !1;
    if (!this.nonce)
      return this.logger.warn("challenge without Digest nonce, authentication aborted"), !1;
    if (t.qop)
      if (t.qop.indexOf("auth") > -1)
        this.qop = "auth";
      else if (t.qop.indexOf("auth-int") > -1)
        this.qop = "auth-int";
      else
        return this.logger.warn("challenge without Digest qop different than 'auth' or 'auth-int', authentication aborted"), !1;
    else
      this.qop = void 0;
    return this.method = e.method, this.uri = e.ruri, this.cnonce = Pe(12), this.nc += 1, this.updateNcHex(), this.nc === 4294967296 && (this.nc = 1, this.ncHex = "00000001"), this.calculateResponse(r), !0;
  }
  /**
   * Return the Proxy-Authorization or WWW-Authorization header value.
   */
  toString() {
    const e = [];
    if (!this.response)
      throw new Error("response field does not exist, cannot generate Authorization header");
    return e.push("algorithm=" + this.algorithm), e.push('username="' + this.username + '"'), e.push('realm="' + this.realm + '"'), e.push('nonce="' + this.nonce + '"'), e.push('uri="' + this.uri + '"'), e.push('response="' + this.response + '"'), this.opaque && e.push('opaque="' + this.opaque + '"'), this.qop && (e.push("qop=" + this.qop), e.push('cnonce="' + this.cnonce + '"'), e.push("nc=" + this.ncHex)), "Digest " + e.join(", ");
  }
  /**
   * Generate the 'nc' value as required by Digest in this.ncHex by reading this.nc.
   */
  updateNcHex() {
    const e = Number(this.nc).toString(16);
    this.ncHex = "00000000".substr(0, 8 - e.length) + e;
  }
  /**
   * Generate Digest 'response' value.
   */
  calculateResponse(e) {
    let t, r;
    t = this.ha1, (t === "" || t === void 0) && (t = xe(this.username + ":" + this.realm + ":" + this.password)), this.qop === "auth" ? (r = xe(this.method + ":" + this.uri), this.response = xe(t + ":" + this.nonce + ":" + this.ncHex + ":" + this.cnonce + ":auth:" + r)) : this.qop === "auth-int" ? (r = xe(this.method + ":" + this.uri + ":" + xe(e || "")), this.response = xe(t + ":" + this.nonce + ":" + this.ncHex + ":" + this.cnonce + ":auth-int:" + r)) : this.qop === void 0 && (r = xe(this.method + ":" + this.uri), this.response = xe(t + ":" + this.nonce + ":" + r));
  }
}
var ee;
(function(s) {
  s[s.error = 0] = "error", s[s.warn = 1] = "warn", s[s.log = 2] = "log", s[s.debug = 3] = "debug";
})(ee = ee || (ee = {}));
class rr {
  constructor(e, t, r) {
    this.logger = e, this.category = t, this.label = r;
  }
  error(e) {
    this.genericLog(ee.error, e);
  }
  warn(e) {
    this.genericLog(ee.warn, e);
  }
  log(e) {
    this.genericLog(ee.log, e);
  }
  debug(e) {
    this.genericLog(ee.debug, e);
  }
  genericLog(e, t) {
    this.logger.genericLog(e, this.category, this.label, t);
  }
  get level() {
    return this.logger.level;
  }
  set level(e) {
    this.logger.level = e;
  }
}
class oi {
  constructor() {
    this.builtinEnabled = !0, this._level = ee.log, this.loggers = {}, this.logger = this.getLogger("sip:loggerfactory");
  }
  get level() {
    return this._level;
  }
  set level(e) {
    e >= 0 && e <= 3 ? this._level = e : e > 3 ? this._level = 3 : ee.hasOwnProperty(e) ? this._level = e : this.logger.error("invalid 'level' parameter value: " + JSON.stringify(e));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get connector() {
    return this._connector;
  }
  set connector(e) {
    e ? typeof e == "function" ? this._connector = e : this.logger.error("invalid 'connector' parameter value: " + JSON.stringify(e)) : this._connector = void 0;
  }
  getLogger(e, t) {
    if (t && this.level === 3)
      return new rr(this, e, t);
    if (this.loggers[e])
      return this.loggers[e];
    {
      const r = new rr(this, e);
      return this.loggers[e] = r, r;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genericLog(e, t, r, i) {
    this.level >= e && this.builtinEnabled && this.print(e, t, r, i), this.connector && this.connector(ee[e], t, r, i);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  print(e, t, r, i) {
    if (typeof i == "string") {
      const n = [/* @__PURE__ */ new Date(), t];
      r && n.push(r), i = n.concat(i).join(" | ");
    }
    switch (e) {
      case ee.error:
        console.error(i);
        break;
      case ee.warn:
        console.warn(i);
        break;
      case ee.log:
        console.log(i);
        break;
      case ee.debug:
        console.debug(i);
        break;
    }
  }
}
var mt;
(function(s) {
  function e(i, n) {
    let a = n, o = 0, d = 0;
    if (i.substring(a, a + 2).match(/(^\r\n)/))
      return -2;
    for (; o === 0; ) {
      if (d = i.indexOf(`\r
`, a), d === -1)
        return d;
      !i.substring(d + 2, d + 4).match(/(^\r\n)/) && i.charAt(d + 2).match(/(^\s+)/) ? a = d + 2 : o = d;
    }
    return o;
  }
  s.getHeader = e;
  function t(i, n, a, o) {
    const d = n.indexOf(":", a), h = n.substring(a, d).trim(), u = n.substring(d + 1, o).trim();
    let f;
    switch (h.toLowerCase()) {
      case "via":
      case "v":
        i.addHeader("via", u), i.getHeaders("via").length === 1 ? (f = i.parseHeader("Via"), f && (i.via = f, i.viaBranch = f.branch)) : f = 0;
        break;
      case "from":
      case "f":
        i.setHeader("from", u), f = i.parseHeader("from"), f && (i.from = f, i.fromTag = f.getParam("tag"));
        break;
      case "to":
      case "t":
        i.setHeader("to", u), f = i.parseHeader("to"), f && (i.to = f, i.toTag = f.getParam("tag"));
        break;
      case "record-route":
        if (f = J.parse(u, "Record_Route"), f === -1) {
          f = void 0;
          break;
        }
        if (!(f instanceof Array)) {
          f = void 0;
          break;
        }
        f.forEach((w) => {
          i.addHeader("record-route", u.substring(w.position, w.offset)), i.headers["Record-Route"][i.getHeaders("record-route").length - 1].parsed = w.parsed;
        });
        break;
      case "call-id":
      case "i":
        i.setHeader("call-id", u), f = i.parseHeader("call-id"), f && (i.callId = u);
        break;
      case "contact":
      case "m":
        if (f = J.parse(u, "Contact"), f === -1) {
          f = void 0;
          break;
        }
        if (!(f instanceof Array)) {
          f = void 0;
          break;
        }
        f.forEach((w) => {
          i.addHeader("contact", u.substring(w.position, w.offset)), i.headers.Contact[i.getHeaders("contact").length - 1].parsed = w.parsed;
        });
        break;
      case "content-length":
      case "l":
        i.setHeader("content-length", u), f = i.parseHeader("content-length");
        break;
      case "content-type":
      case "c":
        i.setHeader("content-type", u), f = i.parseHeader("content-type");
        break;
      case "cseq":
        i.setHeader("cseq", u), f = i.parseHeader("cseq"), f && (i.cseq = f.value), i instanceof Ie && (i.method = f.method);
        break;
      case "max-forwards":
        i.setHeader("max-forwards", u), f = i.parseHeader("max-forwards");
        break;
      case "www-authenticate":
        i.setHeader("www-authenticate", u), f = i.parseHeader("www-authenticate");
        break;
      case "proxy-authenticate":
        i.setHeader("proxy-authenticate", u), f = i.parseHeader("proxy-authenticate");
        break;
      case "refer-to":
      case "r":
        i.setHeader("refer-to", u), f = i.parseHeader("refer-to"), f && (i.referTo = f);
        break;
      default:
        i.addHeader(h.toLowerCase(), u), f = 0;
    }
    return f === void 0 ? {
      error: "error parsing header '" + h + "'"
    } : !0;
  }
  s.parseHeader = t;
  function r(i, n) {
    let a = 0, o = i.indexOf(`\r
`);
    if (o === -1) {
      n.warn("no CRLF found, not a SIP message, discarded");
      return;
    }
    const d = i.substring(0, o), h = J.parse(d, "Request_Response");
    let u;
    if (h === -1) {
      n.warn('error parsing first line of SIP message: "' + d + '"');
      return;
    } else h.status_code ? (u = new Ie(), u.statusCode = h.status_code, u.reasonPhrase = h.reason_phrase) : (u = new Be(), u.method = h.method, u.ruri = h.uri);
    u.data = i, a = o + 2;
    let f;
    for (; ; ) {
      if (o = e(i, a), o === -2) {
        f = a + 2;
        break;
      } else if (o === -1) {
        n.error("malformed message");
        return;
      }
      const w = t(u, i, a, o);
      if (w && w !== !0) {
        n.error(w.error);
        return;
      }
      a = o + 2;
    }
    return u.hasHeader("content-length") ? u.body = i.substr(f, Number(u.getHeader("content-length"))) : u.body = i.substring(f), u;
  }
  s.parseMessage = r;
})(mt = mt || (mt = {}));
function br(s, e) {
  const t = `\r
`;
  if (e.statusCode < 100 || e.statusCode > 699)
    throw new TypeError("Invalid statusCode: " + e.statusCode);
  const r = e.reasonPhrase ? e.reasonPhrase : Ct(e.statusCode);
  let i = "SIP/2.0 " + e.statusCode + " " + r + t;
  e.statusCode >= 100 && e.statusCode < 200, e.statusCode;
  const n = "From: " + s.getHeader("From") + t, a = "Call-ID: " + s.callId + t, o = "CSeq: " + s.cseq + " " + s.method + t, d = s.getHeaders("via").reduce((T, R) => T + "Via: " + R + t, "");
  let h = "To: " + s.getHeader("to");
  if (e.statusCode > 100 && !s.parseHeader("to").hasParam("tag")) {
    let T = e.toTag;
    T || (T = Rt()), h += ";tag=" + T;
  }
  h += t;
  let u = "";
  e.supported && (u = "Supported: " + e.supported.join(", ") + t);
  let f = "";
  e.userAgent && (f = "User-Agent: " + e.userAgent + t);
  let w = "";
  return e.extraHeaders && (w = e.extraHeaders.reduce((T, R) => T + R.trim() + t, "")), i += d, i += n, i += h, i += o, i += a, i += u, i += f, i += w, e.body ? (i += "Content-Type: " + e.body.contentType + t, i += "Content-Length: " + rt(e.body.content) + t + t, i += e.body.content) : i += "Content-Length: 0" + t + t, { message: i };
}
class Pt extends _e {
  constructor(e) {
    super(e || "Unspecified transport error.");
  }
}
class Sr {
  constructor(e, t, r, i, n) {
    this._transport = e, this._user = t, this._id = r, this._state = i, this.listeners = new Array(), this.logger = t.loggerFactory.getLogger(n, r), this.logger.debug(`Constructing ${this.typeToString()} with id ${this.id}.`);
  }
  /**
   * Destructor.
   * Once the transaction is in the "terminated" state, it is destroyed
   * immediately and there is no need to call `dispose`. However, if a
   * transaction needs to be ended prematurely, the transaction user may
   * do so by calling this method (for example, perhaps the UA is shutting down).
   * No state transition will occur upon calling this method, all outstanding
   * transmission timers will be cancelled, and use of the transaction after
   * calling `dispose` is undefined.
   */
  dispose() {
    this.logger.debug(`Destroyed ${this.typeToString()} with id ${this.id}.`);
  }
  /** Transaction id. */
  get id() {
    return this._id;
  }
  /** Transaction kind. Deprecated. */
  get kind() {
    throw new Error("Invalid kind.");
  }
  /** Transaction state. */
  get state() {
    return this._state;
  }
  /** Transaction transport. */
  get transport() {
    return this._transport;
  }
  /**
   * Sets up a function that will be called whenever the transaction state changes.
   * @param listener - Callback function.
   * @param options - An options object that specifies characteristics about the listener.
   *                  If once true, indicates that the listener should be invoked at most once after being added.
   *                  If once true, the listener would be automatically removed when invoked.
   */
  addStateChangeListener(e, t) {
    const r = () => {
      this.removeStateChangeListener(r), e();
    };
    (t == null ? void 0 : t.once) === !0 ? this.listeners.push(r) : this.listeners.push(e);
  }
  /**
   * This is currently public so tests may spy on it.
   * @internal
   */
  notifyStateChangeListeners() {
    this.listeners.slice().forEach((e) => e());
  }
  /**
   * Removes a listener previously registered with addStateListener.
   * @param listener - Callback function.
   */
  removeStateChangeListener(e) {
    this.listeners = this.listeners.filter((t) => t !== e);
  }
  logTransportError(e, t) {
    this.logger.error(e.message), this.logger.error(`Transport error occurred in ${this.typeToString()} with id ${this.id}.`), this.logger.error(t);
  }
  /**
   * Pass message to transport for transmission. If transport fails,
   * the transaction user is notified by callback to onTransportError().
   * @returns
   * Rejects with `TransportError` if transport fails.
   */
  send(e) {
    return this.transport.send(e).catch((t) => {
      if (t instanceof Pt)
        throw this.onTransportError(t), t;
      let r;
      throw t && typeof t.message == "string" ? r = new Pt(t.message) : r = new Pt(), this.onTransportError(r), r;
    });
  }
  setState(e) {
    this.logger.debug(`State change to "${e}" on ${this.typeToString()} with id ${this.id}.`), this._state = e, this._user.onStateChange && this._user.onStateChange(e), this.notifyStateChangeListeners();
  }
  typeToString() {
    return "UnknownType";
  }
}
class Tr extends Sr {
  constructor(e, t, r, i, n) {
    super(t, r, e.viaBranch, i, n), this._request = e, this.user = r;
  }
  /** The incoming request the transaction handling. */
  get request() {
    return this._request;
  }
}
var v;
(function(s) {
  s.Accepted = "Accepted", s.Calling = "Calling", s.Completed = "Completed", s.Confirmed = "Confirmed", s.Proceeding = "Proceeding", s.Terminated = "Terminated", s.Trying = "Trying";
})(v = v || (v = {}));
class ne extends Tr {
  /**
   * Constructor.
   * Upon construction, a "100 Trying" reply will be immediately sent.
   * After construction the transaction will be in the "proceeding" state and the transaction
   * `id` will equal the branch parameter set in the Via header of the incoming request.
   * https://tools.ietf.org/html/rfc3261#section-17.2.1
   * @param request - Incoming INVITE request from the transport.
   * @param transport - The transport.
   * @param user - The transaction user.
   */
  constructor(e, t, r) {
    super(e, t, r, v.Proceeding, "sip.transaction.ist");
  }
  /**
   * Destructor.
   */
  dispose() {
    this.stopProgressExtensionTimer(), this.H && (clearTimeout(this.H), this.H = void 0), this.I && (clearTimeout(this.I), this.I = void 0), this.L && (clearTimeout(this.L), this.L = void 0), super.dispose();
  }
  /** Transaction kind. Deprecated. */
  get kind() {
    return "ist";
  }
  /**
   * Receive requests from transport matching this transaction.
   * @param request - Request matching this transaction.
   */
  receiveRequest(e) {
    switch (this.state) {
      case v.Proceeding:
        if (e.method === C.INVITE) {
          this.lastProvisionalResponse && this.send(this.lastProvisionalResponse).catch((r) => {
            this.logTransportError(r, "Failed to send retransmission of provisional response.");
          });
          return;
        }
        break;
      case v.Accepted:
        if (e.method === C.INVITE)
          return;
        break;
      case v.Completed:
        if (e.method === C.INVITE) {
          if (!this.lastFinalResponse)
            throw new Error("Last final response undefined.");
          this.send(this.lastFinalResponse).catch((r) => {
            this.logTransportError(r, "Failed to send retransmission of final response.");
          });
          return;
        }
        if (e.method === C.ACK) {
          this.stateTransition(v.Confirmed);
          return;
        }
        break;
      case v.Confirmed:
        if (e.method === C.INVITE || e.method === C.ACK)
          return;
        break;
      case v.Terminated:
        if (e.method === C.INVITE || e.method === C.ACK)
          return;
        break;
      default:
        throw new Error(`Invalid state ${this.state}`);
    }
    const t = `INVITE server transaction received unexpected ${e.method} request while in state ${this.state}.`;
    this.logger.warn(t);
  }
  /**
   * Receive responses from TU for this transaction.
   * @param statusCode - Status code of response.
   * @param response - Response.
   */
  receiveResponse(e, t) {
    if (e < 100 || e > 699)
      throw new Error(`Invalid status code ${e}`);
    switch (this.state) {
      case v.Proceeding:
        if (e >= 100 && e <= 199) {
          this.lastProvisionalResponse = t, e > 100 && this.startProgressExtensionTimer(), this.send(t).catch((i) => {
            this.logTransportError(i, "Failed to send 1xx response.");
          });
          return;
        }
        if (e >= 200 && e <= 299) {
          this.lastFinalResponse = t, this.stateTransition(v.Accepted), this.send(t).catch((i) => {
            this.logTransportError(i, "Failed to send 2xx response.");
          });
          return;
        }
        if (e >= 300 && e <= 699) {
          this.lastFinalResponse = t, this.stateTransition(v.Completed), this.send(t).catch((i) => {
            this.logTransportError(i, "Failed to send non-2xx final response.");
          });
          return;
        }
        break;
      case v.Accepted:
        if (e >= 200 && e <= 299) {
          this.send(t).catch((i) => {
            this.logTransportError(i, "Failed to send 2xx response.");
          });
          return;
        }
        break;
      case v.Completed:
        break;
      case v.Confirmed:
        break;
      case v.Terminated:
        break;
      default:
        throw new Error(`Invalid state ${this.state}`);
    }
    const r = `INVITE server transaction received unexpected ${e} response from TU while in state ${this.state}.`;
    throw this.logger.error(r), new Error(r);
  }
  /**
   * Retransmit the last 2xx response. This is a noop if not in the "accepted" state.
   */
  retransmitAcceptedResponse() {
    this.state === v.Accepted && this.lastFinalResponse && this.send(this.lastFinalResponse).catch((e) => {
      this.logTransportError(e, "Failed to send 2xx response.");
    });
  }
  /**
   * First, the procedures in [4] are followed, which attempt to deliver the response to a backup.
   * If those should all fail, based on the definition of failure in [4], the server transaction SHOULD
   * inform the TU that a failure has occurred, and MUST remain in the current state.
   * https://tools.ietf.org/html/rfc6026#section-8.8
   */
  onTransportError(e) {
    this.user.onTransportError && this.user.onTransportError(e);
  }
  /** For logging. */
  typeToString() {
    return "INVITE server transaction";
  }
  /**
   * Execute a state transition.
   * @param newState - New state.
   */
  stateTransition(e) {
    const t = () => {
      throw new Error(`Invalid state transition from ${this.state} to ${e}`);
    };
    switch (e) {
      case v.Proceeding:
        t();
        break;
      case v.Accepted:
      case v.Completed:
        this.state !== v.Proceeding && t();
        break;
      case v.Confirmed:
        this.state !== v.Completed && t();
        break;
      case v.Terminated:
        this.state !== v.Accepted && this.state !== v.Completed && this.state !== v.Confirmed && t();
        break;
      default:
        t();
    }
    this.stopProgressExtensionTimer(), e === v.Accepted && (this.L = setTimeout(() => this.timerL(), te.TIMER_L)), e === v.Completed && (this.H = setTimeout(() => this.timerH(), te.TIMER_H)), e === v.Confirmed && (this.I = setTimeout(() => this.timerI(), te.TIMER_I)), e === v.Terminated && this.dispose(), this.setState(e);
  }
  /**
   * FIXME: UAS Provisional Retransmission Timer. See RFC 3261 Section 13.3.1.1
   * This is in the wrong place. This is not a transaction level thing. It's a UAS level thing.
   */
  startProgressExtensionTimer() {
    this.progressExtensionTimer === void 0 && (this.progressExtensionTimer = setInterval(() => {
      if (this.logger.debug(`Progress extension timer expired for INVITE server transaction ${this.id}.`), !this.lastProvisionalResponse)
        throw new Error("Last provisional response undefined.");
      this.send(this.lastProvisionalResponse).catch((e) => {
        this.logTransportError(e, "Failed to send retransmission of provisional response.");
      });
    }, te.PROVISIONAL_RESPONSE_INTERVAL));
  }
  /**
   * FIXME: UAS Provisional Retransmission Timer id. See RFC 3261 Section 13.3.1.1
   * This is in the wrong place. This is not a transaction level thing. It's a UAS level thing.
   */
  stopProgressExtensionTimer() {
    this.progressExtensionTimer !== void 0 && (clearInterval(this.progressExtensionTimer), this.progressExtensionTimer = void 0);
  }
  /**
   * While in the "Proceeding" state, if the TU passes a response with status code
   * from 300 to 699 to the server transaction, the response MUST be passed to the
   * transport layer for transmission, and the state machine MUST enter the "Completed" state.
   * For unreliable transports, timer G is set to fire in T1 seconds, and is not set to fire for
   * reliable transports. If timer G fires, the response is passed to the transport layer once
   * more for retransmission, and timer G is set to fire in MIN(2*T1, T2) seconds. From then on,
   * when timer G fires, the response is passed to the transport again for transmission, and
   * timer G is reset with a value that doubles, unless that value exceeds T2, in which case
   * it is reset with the value of T2.
   * https://tools.ietf.org/html/rfc3261#section-17.2.1
   */
  timerG() {
  }
  /**
   * If timer H fires while in the "Completed" state, it implies that the ACK was never received.
   * In this case, the server transaction MUST transition to the "Terminated" state, and MUST
   * indicate to the TU that a transaction failure has occurred.
   * https://tools.ietf.org/html/rfc3261#section-17.2.1
   */
  timerH() {
    this.logger.debug(`Timer H expired for INVITE server transaction ${this.id}.`), this.state === v.Completed && (this.logger.warn("ACK to negative final response was never received, terminating transaction."), this.stateTransition(v.Terminated));
  }
  /**
   * Once timer I fires, the server MUST transition to the "Terminated" state.
   * https://tools.ietf.org/html/rfc3261#section-17.2.1
   */
  timerI() {
    this.logger.debug(`Timer I expired for INVITE server transaction ${this.id}.`), this.stateTransition(v.Terminated);
  }
  /**
   * When Timer L fires and the state machine is in the "Accepted" state, the machine MUST
   * transition to the "Terminated" state. Once the transaction is in the "Terminated" state,
   * it MUST be destroyed immediately. Timer L reflects the amount of time the server
   * transaction could receive 2xx responses for retransmission from the
   * TU while it is waiting to receive an ACK.
   * https://tools.ietf.org/html/rfc6026#section-7.1
   * https://tools.ietf.org/html/rfc6026#section-8.7
   */
  timerL() {
    this.logger.debug(`Timer L expired for INVITE server transaction ${this.id}.`), this.state === v.Accepted && this.stateTransition(v.Terminated);
  }
}
class $t extends Sr {
  constructor(e, t, r, i, n) {
    super(t, r, $t.makeId(e), i, n), this._request = e, this.user = r, e.setViaHeader(this.id, t.protocol);
  }
  static makeId(e) {
    if (e.method === "CANCEL") {
      if (!e.branch)
        throw new Error("Outgoing CANCEL request without a branch.");
      return e.branch;
    } else
      return "z9hG4bK" + Math.floor(Math.random() * 1e7);
  }
  /** The outgoing request the transaction handling. */
  get request() {
    return this._request;
  }
  /**
   * A 408 to non-INVITE will always arrive too late to be useful ([3]),
   * The client already has full knowledge of the timeout. The only
   * information this message would convey is whether or not the server
   * believed the transaction timed out. However, with the current design
   * of the NIT, a client cannot do anything with this knowledge. Thus,
   * the 408 is simply wasting network resources and contributes to the
   * response bombardment illustrated in [3].
   * https://tools.ietf.org/html/rfc4320#section-4.1
   */
  onRequestTimeout() {
    this.user.onRequestTimeout && this.user.onRequestTimeout();
  }
}
class ce extends $t {
  /**
   * Constructor
   * Upon construction, the outgoing request's Via header is updated by calling `setViaHeader`.
   * Then `toString` is called on the outgoing request and the message is sent via the transport.
   * After construction the transaction will be in the "calling" state and the transaction id
   * will equal the branch parameter set in the Via header of the outgoing request.
   * https://tools.ietf.org/html/rfc3261#section-17.1.2
   * @param request - The outgoing Non-INVITE request.
   * @param transport - The transport.
   * @param user - The transaction user.
   */
  constructor(e, t, r) {
    super(e, t, r, v.Trying, "sip.transaction.nict"), this.F = setTimeout(() => this.timerF(), te.TIMER_F), this.send(e.toString()).catch((i) => {
      this.logTransportError(i, "Failed to send initial outgoing request.");
    });
  }
  /**
   * Destructor.
   */
  dispose() {
    this.F && (clearTimeout(this.F), this.F = void 0), this.K && (clearTimeout(this.K), this.K = void 0), super.dispose();
  }
  /** Transaction kind. Deprecated. */
  get kind() {
    return "nict";
  }
  /**
   * Handler for incoming responses from the transport which match this transaction.
   * @param response - The incoming response.
   */
  receiveResponse(e) {
    const t = e.statusCode;
    if (!t || t < 100 || t > 699)
      throw new Error(`Invalid status code ${t}`);
    switch (this.state) {
      case v.Trying:
        if (t >= 100 && t <= 199) {
          this.stateTransition(v.Proceeding), this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        if (t >= 200 && t <= 699) {
          if (this.stateTransition(v.Completed), t === 408) {
            this.onRequestTimeout();
            return;
          }
          this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        break;
      case v.Proceeding:
        if (t >= 100 && t <= 199 && this.user.receiveResponse)
          return this.user.receiveResponse(e);
        if (t >= 200 && t <= 699) {
          if (this.stateTransition(v.Completed), t === 408) {
            this.onRequestTimeout();
            return;
          }
          this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        break;
      case v.Completed:
        return;
      case v.Terminated:
        return;
      default:
        throw new Error(`Invalid state ${this.state}`);
    }
    const r = `Non-INVITE client transaction received unexpected ${t} response while in state ${this.state}.`;
    this.logger.warn(r);
  }
  /**
   * The client transaction SHOULD inform the TU that a transport failure has occurred,
   * and the client transaction SHOULD transition directly to the "Terminated" state.
   * The TU will handle the fail over mechanisms described in [4].
   * https://tools.ietf.org/html/rfc3261#section-17.1.4
   * @param error - Transport error
   */
  onTransportError(e) {
    this.user.onTransportError && this.user.onTransportError(e), this.stateTransition(v.Terminated, !0);
  }
  /** For logging. */
  typeToString() {
    return "non-INVITE client transaction";
  }
  /**
   * Execute a state transition.
   * @param newState - New state.
   */
  stateTransition(e, t = !1) {
    const r = () => {
      throw new Error(`Invalid state transition from ${this.state} to ${e}`);
    };
    switch (e) {
      case v.Trying:
        r();
        break;
      case v.Proceeding:
        this.state !== v.Trying && r();
        break;
      case v.Completed:
        this.state !== v.Trying && this.state !== v.Proceeding && r();
        break;
      case v.Terminated:
        this.state !== v.Trying && this.state !== v.Proceeding && this.state !== v.Completed && (t || r());
        break;
      default:
        r();
    }
    e === v.Completed && (this.F && (clearTimeout(this.F), this.F = void 0), this.K = setTimeout(() => this.timerK(), te.TIMER_K)), e === v.Terminated && this.dispose(), this.setState(e);
  }
  /**
   * If Timer F fires while the client transaction is still in the
   * "Trying" state, the client transaction SHOULD inform the TU about the
   * timeout, and then it SHOULD enter the "Terminated" state.
   * If timer F fires while in the "Proceeding" state, the TU MUST be informed of
   * a timeout, and the client transaction MUST transition to the terminated state.
   * https://tools.ietf.org/html/rfc3261#section-17.1.2.2
   */
  timerF() {
    this.logger.debug(`Timer F expired for non-INVITE client transaction ${this.id}.`), (this.state === v.Trying || this.state === v.Proceeding) && (this.onRequestTimeout(), this.stateTransition(v.Terminated));
  }
  /**
   * If Timer K fires while in this (COMPLETED) state, the client transaction
   * MUST transition to the "Terminated" state.
   * https://tools.ietf.org/html/rfc3261#section-17.1.2.2
   */
  timerK() {
    this.state === v.Completed && this.stateTransition(v.Terminated);
  }
}
class Ve {
  /**
   * Dialog constructor.
   * @param core - User agent core.
   * @param dialogState - Initial dialog state.
   */
  constructor(e, t) {
    this.core = e, this.dialogState = t, this.core.dialogs.set(this.id, this);
  }
  /**
   * When a UAC receives a response that establishes a dialog, it
   * constructs the state of the dialog.  This state MUST be maintained
   * for the duration of the dialog.
   * https://tools.ietf.org/html/rfc3261#section-12.1.2
   * @param outgoingRequestMessage - Outgoing request message for dialog.
   * @param incomingResponseMessage - Incoming response message creating dialog.
   */
  static initialDialogStateForUserAgentClient(e, t) {
    const i = t.getHeaders("record-route").reverse(), n = t.parseHeader("contact");
    if (!n)
      throw new Error("Contact undefined.");
    if (!(n instanceof se))
      throw new Error("Contact not instance of NameAddrHeader.");
    const a = n.uri, o = e.cseq, d = void 0, h = e.callId, u = e.fromTag, f = t.toTag;
    if (!h)
      throw new Error("Call id undefined.");
    if (!u)
      throw new Error("From tag undefined.");
    if (!f)
      throw new Error("To tag undefined.");
    if (!e.from)
      throw new Error("From undefined.");
    if (!e.to)
      throw new Error("To undefined.");
    const w = e.from.uri, T = e.to.uri;
    if (!t.statusCode)
      throw new Error("Incoming response status code undefined.");
    const R = t.statusCode < 200;
    return {
      id: h + u + f,
      early: R,
      callId: h,
      localTag: u,
      remoteTag: f,
      localSequenceNumber: o,
      remoteSequenceNumber: d,
      localURI: w,
      remoteURI: T,
      remoteTarget: a,
      routeSet: i,
      secure: !1
    };
  }
  /**
   * The UAS then constructs the state of the dialog.  This state MUST be
   * maintained for the duration of the dialog.
   * https://tools.ietf.org/html/rfc3261#section-12.1.1
   * @param incomingRequestMessage - Incoming request message creating dialog.
   * @param toTag - Tag in the To field in the response to the incoming request.
   */
  static initialDialogStateForUserAgentServer(e, t, r = !1) {
    const n = e.getHeaders("record-route"), a = e.parseHeader("contact");
    if (!a)
      throw new Error("Contact undefined.");
    if (!(a instanceof se))
      throw new Error("Contact not instance of NameAddrHeader.");
    const o = a.uri, d = e.cseq, h = void 0, u = e.callId, f = t, w = e.fromTag, T = e.from.uri, R = e.to.uri;
    return {
      id: u + f + w,
      early: r,
      callId: u,
      localTag: f,
      remoteTag: w,
      localSequenceNumber: h,
      remoteSequenceNumber: d,
      localURI: R,
      remoteURI: T,
      remoteTarget: o,
      routeSet: n,
      secure: !1
    };
  }
  /** Destructor. */
  dispose() {
    this.core.dialogs.delete(this.id);
  }
  /**
   * A dialog is identified at each UA with a dialog ID, which consists of
   * a Call-ID value, a local tag and a remote tag.  The dialog ID at each
   * UA involved in the dialog is not the same.  Specifically, the local
   * tag at one UA is identical to the remote tag at the peer UA.  The
   * tags are opaque tokens that facilitate the generation of unique
   * dialog IDs.
   * https://tools.ietf.org/html/rfc3261#section-12
   */
  get id() {
    return this.dialogState.id;
  }
  /**
   * A dialog can also be in the "early" state, which occurs when it is
   * created with a provisional response, and then it transition to the
   * "confirmed" state when a 2xx final response received or is sent.
   *
   * Note: RFC 3261 is concise on when a dialog is "confirmed", but it
   * can be a point of confusion if an INVITE dialog is "confirmed" after
   * a 2xx is sent or after receiving the ACK for the 2xx response.
   * With careful reading it can be inferred a dialog is always is
   * "confirmed" when the 2xx is sent (regardless of type of dialog).
   * However a INVITE dialog does have additional considerations
   * when it is confirmed but an ACK has not yet been received (in
   * particular with regard to a callee sending BYE requests).
   */
  get early() {
    return this.dialogState.early;
  }
  /** Call identifier component of the dialog id. */
  get callId() {
    return this.dialogState.callId;
  }
  /** Local tag component of the dialog id. */
  get localTag() {
    return this.dialogState.localTag;
  }
  /** Remote tag component of the dialog id. */
  get remoteTag() {
    return this.dialogState.remoteTag;
  }
  /** Local sequence number (used to order requests from the UA to its peer). */
  get localSequenceNumber() {
    return this.dialogState.localSequenceNumber;
  }
  /** Remote sequence number (used to order requests from its peer to the UA). */
  get remoteSequenceNumber() {
    return this.dialogState.remoteSequenceNumber;
  }
  /** Local URI. */
  get localURI() {
    return this.dialogState.localURI;
  }
  /** Remote URI. */
  get remoteURI() {
    return this.dialogState.remoteURI;
  }
  /** Remote target. */
  get remoteTarget() {
    return this.dialogState.remoteTarget;
  }
  /**
   * Route set, which is an ordered list of URIs. The route set is the
   * list of servers that need to be traversed to send a request to the peer.
   */
  get routeSet() {
    return this.dialogState.routeSet;
  }
  /**
   * If the request was sent over TLS, and the Request-URI contained
   * a SIPS URI, the "secure" flag is set to true. *NOT IMPLEMENTED*
   */
  get secure() {
    return this.dialogState.secure;
  }
  /** The user agent core servicing this dialog. */
  get userAgentCore() {
    return this.core;
  }
  /** Confirm the dialog. Only matters if dialog is currently early. */
  confirm() {
    this.dialogState.early = !1;
  }
  /**
   * Requests sent within a dialog, as any other requests, are atomic.  If
   * a particular request is accepted by the UAS, all the state changes
   * associated with it are performed.  If the request is rejected, none
   * of the state changes are performed.
   *
   *    Note that some requests, such as INVITEs, affect several pieces of
   *    state.
   *
   * https://tools.ietf.org/html/rfc3261#section-12.2.2
   * @param message - Incoming request message within this dialog.
   */
  receiveRequest(e) {
    if (e.method !== C.ACK) {
      if (this.remoteSequenceNumber) {
        if (e.cseq <= this.remoteSequenceNumber)
          throw new Error("Out of sequence in dialog request. Did you forget to call sequenceGuard()?");
        this.dialogState.remoteSequenceNumber = e.cseq;
      }
      this.remoteSequenceNumber || (this.dialogState.remoteSequenceNumber = e.cseq);
    }
  }
  /**
   * If the dialog identifier in the 2xx response matches the dialog
   * identifier of an existing dialog, the dialog MUST be transitioned to
   * the "confirmed" state, and the route set for the dialog MUST be
   * recomputed based on the 2xx response using the procedures of Section
   * 12.2.1.2.  Otherwise, a new dialog in the "confirmed" state MUST be
   * constructed using the procedures of Section 12.1.2.
   *
   * Note that the only piece of state that is recomputed is the route
   * set.  Other pieces of state such as the highest sequence numbers
   * (remote and local) sent within the dialog are not recomputed.  The
   * route set only is recomputed for backwards compatibility.  RFC
   * 2543 did not mandate mirroring of the Record-Route header field in
   * a 1xx, only 2xx.  However, we cannot update the entire state of
   * the dialog, since mid-dialog requests may have been sent within
   * the early dialog, modifying the sequence numbers, for example.
   *
   *  https://tools.ietf.org/html/rfc3261#section-13.2.2.4
   */
  recomputeRouteSet(e) {
    this.dialogState.routeSet = e.getHeaders("record-route").reverse();
  }
  /**
   * A request within a dialog is constructed by using many of the
   * components of the state stored as part of the dialog.
   * https://tools.ietf.org/html/rfc3261#section-12.2.1.1
   * @param method - Outgoing request method.
   */
  createOutgoingRequestMessage(e, t) {
    const r = this.remoteURI, i = this.remoteTag, n = this.localURI, a = this.localTag, o = this.callId;
    let d;
    t && t.cseq ? d = t.cseq : this.dialogState.localSequenceNumber ? d = this.dialogState.localSequenceNumber += 1 : d = this.dialogState.localSequenceNumber = 1;
    const h = this.remoteTarget, u = this.routeSet, f = t && t.extraHeaders, w = t && t.body;
    return this.userAgentCore.makeOutgoingRequestMessage(e, h, n, r, {
      callId: o,
      cseq: d,
      fromTag: a,
      toTag: i,
      routeSet: u
    }, f, w);
  }
  /**
   * Increment the local sequence number by one.
   * It feels like this should be protected, but the current authentication handling currently
   * needs this to keep the dialog in sync when "auto re-sends" request messages.
   * @internal
   */
  incrementLocalSequenceNumber() {
    if (!this.dialogState.localSequenceNumber)
      throw new Error("Local sequence number undefined.");
    this.dialogState.localSequenceNumber += 1;
  }
  /**
   * If the remote sequence number was not empty, but the sequence number
   * of the request is lower than the remote sequence number, the request
   * is out of order and MUST be rejected with a 500 (Server Internal
   * Error) response.
   * https://tools.ietf.org/html/rfc3261#section-12.2.2
   * @param request - Incoming request to guard.
   * @returns True if the program execution is to continue in the branch in question.
   *          Otherwise a 500 Server Internal Error was stateless sent and request processing must stop.
   */
  sequenceGuard(e) {
    return e.method === C.ACK ? !0 : this.remoteSequenceNumber && e.cseq <= this.remoteSequenceNumber ? (this.core.replyStateless(e, { statusCode: 500 }), !1) : !0;
  }
}
class $e extends $t {
  /**
   * Constructor.
   * Upon construction, the outgoing request's Via header is updated by calling `setViaHeader`.
   * Then `toString` is called on the outgoing request and the message is sent via the transport.
   * After construction the transaction will be in the "calling" state and the transaction id
   * will equal the branch parameter set in the Via header of the outgoing request.
   * https://tools.ietf.org/html/rfc3261#section-17.1.1
   * @param request - The outgoing INVITE request.
   * @param transport - The transport.
   * @param user - The transaction user.
   */
  constructor(e, t, r) {
    super(e, t, r, v.Calling, "sip.transaction.ict"), this.ackRetransmissionCache = /* @__PURE__ */ new Map(), this.B = setTimeout(() => this.timerB(), te.TIMER_B), this.send(e.toString()).catch((i) => {
      this.logTransportError(i, "Failed to send initial outgoing request.");
    });
  }
  /**
   * Destructor.
   */
  dispose() {
    this.B && (clearTimeout(this.B), this.B = void 0), this.D && (clearTimeout(this.D), this.D = void 0), this.M && (clearTimeout(this.M), this.M = void 0), super.dispose();
  }
  /** Transaction kind. Deprecated. */
  get kind() {
    return "ict";
  }
  /**
   * ACK a 2xx final response.
   *
   * The transaction includes the ACK only if the final response was not a 2xx response (the
   * transaction will generate and send the ACK to the transport automagically). If the
   * final response was a 2xx, the ACK is not considered part of the transaction (the
   * transaction user needs to generate and send the ACK).
   *
   * This library is not strictly RFC compliant with regard to ACK handling for 2xx final
   * responses. Specifically, retransmissions of ACKs to a 2xx final responses is handled
   * by the transaction layer (instead of the UAC core). The "standard" approach is for
   * the UAC core to receive all 2xx responses and manage sending ACK retransmissions to
   * the transport directly. Herein the transaction layer manages sending ACKs to 2xx responses
   * and any retransmissions of those ACKs as needed.
   *
   * @param ack - The outgoing ACK request.
   */
  ackResponse(e) {
    const t = e.toTag;
    if (!t)
      throw new Error("To tag undefined.");
    const r = "z9hG4bK" + Math.floor(Math.random() * 1e7);
    e.setViaHeader(r, this.transport.protocol), this.ackRetransmissionCache.set(t, e), this.send(e.toString()).catch((i) => {
      this.logTransportError(i, "Failed to send ACK to 2xx response.");
    });
  }
  /**
   * Handler for incoming responses from the transport which match this transaction.
   * @param response - The incoming response.
   */
  receiveResponse(e) {
    const t = e.statusCode;
    if (!t || t < 100 || t > 699)
      throw new Error(`Invalid status code ${t}`);
    switch (this.state) {
      case v.Calling:
        if (t >= 100 && t <= 199) {
          this.stateTransition(v.Proceeding), this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        if (t >= 200 && t <= 299) {
          this.ackRetransmissionCache.set(e.toTag, void 0), this.stateTransition(v.Accepted), this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        if (t >= 300 && t <= 699) {
          this.stateTransition(v.Completed), this.ack(e), this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        break;
      case v.Proceeding:
        if (t >= 100 && t <= 199) {
          this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        if (t >= 200 && t <= 299) {
          this.ackRetransmissionCache.set(e.toTag, void 0), this.stateTransition(v.Accepted), this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        if (t >= 300 && t <= 699) {
          this.stateTransition(v.Completed), this.ack(e), this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        break;
      case v.Accepted:
        if (t >= 200 && t <= 299) {
          if (!this.ackRetransmissionCache.has(e.toTag)) {
            this.ackRetransmissionCache.set(e.toTag, void 0), this.user.receiveResponse && this.user.receiveResponse(e);
            return;
          }
          const i = this.ackRetransmissionCache.get(e.toTag);
          if (i) {
            this.send(i.toString()).catch((n) => {
              this.logTransportError(n, "Failed to send retransmission of ACK to 2xx response.");
            });
            return;
          }
          return;
        }
        break;
      case v.Completed:
        if (t >= 300 && t <= 699) {
          this.ack(e);
          return;
        }
        break;
      case v.Terminated:
        break;
      default:
        throw new Error(`Invalid state ${this.state}`);
    }
    const r = `Received unexpected ${t} response while in state ${this.state}.`;
    this.logger.warn(r);
  }
  /**
   * The client transaction SHOULD inform the TU that a transport failure
   * has occurred, and the client transaction SHOULD transition directly
   * to the "Terminated" state.  The TU will handle the failover
   * mechanisms described in [4].
   * https://tools.ietf.org/html/rfc3261#section-17.1.4
   * @param error - The error.
   */
  onTransportError(e) {
    this.user.onTransportError && this.user.onTransportError(e), this.stateTransition(v.Terminated, !0);
  }
  /** For logging. */
  typeToString() {
    return "INVITE client transaction";
  }
  ack(e) {
    const t = this.request.ruri, r = this.request.callId, i = this.request.cseq, n = this.request.getHeader("from"), a = e.getHeader("to"), o = this.request.getHeader("via"), d = this.request.getHeader("route");
    if (!n)
      throw new Error("From undefined.");
    if (!a)
      throw new Error("To undefined.");
    if (!o)
      throw new Error("Via undefined.");
    let h = `ACK ${t} SIP/2.0\r
`;
    d && (h += `Route: ${d}\r
`), h += `Via: ${o}\r
`, h += `To: ${a}\r
`, h += `From: ${n}\r
`, h += `Call-ID: ${r}\r
`, h += `CSeq: ${i} ACK\r
`, h += `Max-Forwards: 70\r
`, h += `Content-Length: 0\r
\r
`, this.send(h).catch((u) => {
      this.logTransportError(u, "Failed to send ACK to non-2xx response.");
    });
  }
  /**
   * Execute a state transition.
   * @param newState - New state.
   */
  stateTransition(e, t = !1) {
    const r = () => {
      throw new Error(`Invalid state transition from ${this.state} to ${e}`);
    };
    switch (e) {
      case v.Calling:
        r();
        break;
      case v.Proceeding:
        this.state !== v.Calling && r();
        break;
      case v.Accepted:
      case v.Completed:
        this.state !== v.Calling && this.state !== v.Proceeding && r();
        break;
      case v.Terminated:
        this.state !== v.Calling && this.state !== v.Accepted && this.state !== v.Completed && (t || r());
        break;
      default:
        r();
    }
    this.B && (clearTimeout(this.B), this.B = void 0), v.Proceeding, e === v.Completed && (this.D = setTimeout(() => this.timerD(), te.TIMER_D)), e === v.Accepted && (this.M = setTimeout(() => this.timerM(), te.TIMER_M)), e === v.Terminated && this.dispose(), this.setState(e);
  }
  /**
   * When timer A fires, the client transaction MUST retransmit the
   * request by passing it to the transport layer, and MUST reset the
   * timer with a value of 2*T1.
   * When timer A fires 2*T1 seconds later, the request MUST be
   * retransmitted again (assuming the client transaction is still in this
   * state). This process MUST continue so that the request is
   * retransmitted with intervals that double after each transmission.
   * These retransmissions SHOULD only be done while the client
   * transaction is in the "Calling" state.
   * https://tools.ietf.org/html/rfc3261#section-17.1.1.2
   */
  timerA() {
  }
  /**
   * If the client transaction is still in the "Calling" state when timer
   * B fires, the client transaction SHOULD inform the TU that a timeout
   * has occurred.  The client transaction MUST NOT generate an ACK.
   * https://tools.ietf.org/html/rfc3261#section-17.1.1.2
   */
  timerB() {
    this.logger.debug(`Timer B expired for INVITE client transaction ${this.id}.`), this.state === v.Calling && (this.onRequestTimeout(), this.stateTransition(v.Terminated));
  }
  /**
   * If Timer D fires while the client transaction is in the "Completed" state,
   * the client transaction MUST move to the "Terminated" state.
   * https://tools.ietf.org/html/rfc6026#section-8.4
   */
  timerD() {
    this.logger.debug(`Timer D expired for INVITE client transaction ${this.id}.`), this.state === v.Completed && this.stateTransition(v.Terminated);
  }
  /**
   * If Timer M fires while the client transaction is in the "Accepted"
   * state, the client transaction MUST move to the "Terminated" state.
   * https://tools.ietf.org/html/rfc6026#section-8.4
   */
  timerM() {
    this.logger.debug(`Timer M expired for INVITE client transaction ${this.id}.`), this.state === v.Accepted && this.stateTransition(v.Terminated);
  }
}
class ie {
  constructor(e, t, r, i) {
    this.transactionConstructor = e, this.core = t, this.message = r, this.delegate = i, this.challenged = !1, this.stale = !1, this.logger = this.loggerFactory.getLogger("sip.user-agent-client"), this.init();
  }
  dispose() {
    this.transaction.dispose();
  }
  get loggerFactory() {
    return this.core.loggerFactory;
  }
  /** The transaction associated with this request. */
  get transaction() {
    if (!this._transaction)
      throw new Error("Transaction undefined.");
    return this._transaction;
  }
  /**
   * Since requests other than INVITE are responded to immediately, sending a
   * CANCEL for a non-INVITE request would always create a race condition.
   * A CANCEL request SHOULD NOT be sent to cancel a request other than INVITE.
   * https://tools.ietf.org/html/rfc3261#section-9.1
   * @param options - Cancel options bucket.
   */
  cancel(e, t = {}) {
    if (!this.transaction)
      throw new Error("Transaction undefined.");
    if (!this.message.to)
      throw new Error("To undefined.");
    if (!this.message.from)
      throw new Error("From undefined.");
    const r = this.core.makeOutgoingRequestMessage(C.CANCEL, this.message.ruri, this.message.from.uri, this.message.to.uri, {
      toTag: this.message.toTag,
      fromTag: this.message.fromTag,
      callId: this.message.callId,
      cseq: this.message.cseq
    }, t.extraHeaders);
    return r.branch = this.message.branch, this.message.headers.Route && (r.headers.Route = this.message.headers.Route), e && r.setHeader("Reason", e), this.transaction.state === v.Proceeding ? new ie(ce, this.core, r) : this.transaction.addStateChangeListener(() => {
      this.transaction && this.transaction.state === v.Proceeding && new ie(ce, this.core, r);
    }, { once: !0 }), r;
  }
  /**
   * If a 401 (Unauthorized) or 407 (Proxy Authentication Required)
   * response is received, the UAC SHOULD follow the authorization
   * procedures of Section 22.2 and Section 22.3 to retry the request with
   * credentials.
   * https://tools.ietf.org/html/rfc3261#section-8.1.3.5
   * 22 Usage of HTTP Authentication
   * https://tools.ietf.org/html/rfc3261#section-22
   * 22.1 Framework
   * https://tools.ietf.org/html/rfc3261#section-22.1
   * 22.2 User-to-User Authentication
   * https://tools.ietf.org/html/rfc3261#section-22.2
   * 22.3 Proxy-to-User Authentication
   * https://tools.ietf.org/html/rfc3261#section-22.3
   *
   * FIXME: This "guard for and retry the request with credentials"
   * implementation is not complete and at best minimally passable.
   * @param response - The incoming response to guard.
   * @param dialog - If defined, the dialog within which the response was received.
   * @returns True if the program execution is to continue in the branch in question.
   *          Otherwise the request is retried with credentials and current request processing must stop.
   */
  authenticationGuard(e, t) {
    const r = e.statusCode;
    if (!r)
      throw new Error("Response status code undefined.");
    if (r !== 401 && r !== 407)
      return !0;
    let i, n;
    if (r === 401 ? (i = e.parseHeader("www-authenticate"), n = "authorization") : (i = e.parseHeader("proxy-authenticate"), n = "proxy-authorization"), !i)
      return this.logger.warn(r + " with wrong or missing challenge, cannot authenticate"), !0;
    if (this.challenged && (this.stale || i.stale !== !0))
      return this.logger.warn(r + " apparently in authentication loop, cannot authenticate"), !0;
    if (!this.credentials && (this.credentials = this.core.configuration.authenticationFactory(), !this.credentials))
      return this.logger.warn("Unable to obtain credentials, cannot authenticate"), !0;
    if (!this.credentials.authenticate(this.message, i))
      return !0;
    this.challenged = !0, i.stale && (this.stale = !0);
    let a = this.message.cseq += 1;
    return t && t.localSequenceNumber && (t.incrementLocalSequenceNumber(), a = this.message.cseq = t.localSequenceNumber), this.message.setHeader("cseq", a + " " + this.message.method), this.message.setHeader(n, this.credentials.toString()), this.init(), !1;
  }
  /**
   * 8.1.3.1 Transaction Layer Errors
   * In some cases, the response returned by the transaction layer will
   * not be a SIP message, but rather a transaction layer error.  When a
   * timeout error is received from the transaction layer, it MUST be
   * treated as if a 408 (Request Timeout) status code has been received.
   * If a fatal transport error is reported by the transport layer
   * (generally, due to fatal ICMP errors in UDP or connection failures in
   * TCP), the condition MUST be treated as a 503 (Service Unavailable)
   * status code.
   * https://tools.ietf.org/html/rfc3261#section-8.1.3.1
   */
  onRequestTimeout() {
    this.logger.warn("User agent client request timed out. Generating internal 408 Request Timeout.");
    const e = new Ie();
    e.statusCode = 408, e.reasonPhrase = "Request Timeout", this.receiveResponse(e);
  }
  /**
   * 8.1.3.1 Transaction Layer Errors
   * In some cases, the response returned by the transaction layer will
   * not be a SIP message, but rather a transaction layer error.  When a
   * timeout error is received from the transaction layer, it MUST be
   * treated as if a 408 (Request Timeout) status code has been received.
   * If a fatal transport error is reported by the transport layer
   * (generally, due to fatal ICMP errors in UDP or connection failures in
   * TCP), the condition MUST be treated as a 503 (Service Unavailable)
   * status code.
   * https://tools.ietf.org/html/rfc3261#section-8.1.3.1
   * @param error - Transport error
   */
  onTransportError(e) {
    this.logger.error(e.message), this.logger.error("User agent client request transport error. Generating internal 503 Service Unavailable.");
    const t = new Ie();
    t.statusCode = 503, t.reasonPhrase = "Service Unavailable", this.receiveResponse(t);
  }
  /**
   * Receive a response from the transaction layer.
   * @param message - Incoming response message.
   */
  receiveResponse(e) {
    if (!this.authenticationGuard(e))
      return;
    const t = e.statusCode ? e.statusCode.toString() : "";
    if (!t)
      throw new Error("Response status code undefined.");
    switch (!0) {
      case /^100$/.test(t):
        this.delegate && this.delegate.onTrying && this.delegate.onTrying({ message: e });
        break;
      case /^1[0-9]{2}$/.test(t):
        this.delegate && this.delegate.onProgress && this.delegate.onProgress({ message: e });
        break;
      case /^2[0-9]{2}$/.test(t):
        this.delegate && this.delegate.onAccept && this.delegate.onAccept({ message: e });
        break;
      case /^3[0-9]{2}$/.test(t):
        this.delegate && this.delegate.onRedirect && this.delegate.onRedirect({ message: e });
        break;
      case /^[4-6][0-9]{2}$/.test(t):
        this.delegate && this.delegate.onReject && this.delegate.onReject({ message: e });
        break;
      default:
        throw new Error(`Invalid status code ${t}`);
    }
  }
  init() {
    const e = {
      loggerFactory: this.loggerFactory,
      onRequestTimeout: () => this.onRequestTimeout(),
      onStateChange: (i) => {
        i === v.Terminated && (this.core.userAgentClients.delete(r), t === this._transaction && this.dispose());
      },
      onTransportError: (i) => this.onTransportError(i),
      receiveResponse: (i) => this.receiveResponse(i)
    }, t = new this.transactionConstructor(this.message, this.core.transport, e);
    this._transaction = t;
    const r = t.id + t.request.method;
    this.core.userAgentClients.set(r, this);
  }
}
class ci extends ie {
  constructor(e, t, r) {
    const i = e.createOutgoingRequestMessage(C.BYE, r);
    super(ce, e.userAgentCore, i, t), e.dispose();
  }
}
class oe extends Tr {
  /**
   * Constructor.
   * After construction the transaction will be in the "trying": state and the transaction
   * `id` will equal the branch parameter set in the Via header of the incoming request.
   * https://tools.ietf.org/html/rfc3261#section-17.2.2
   * @param request - Incoming Non-INVITE request from the transport.
   * @param transport - The transport.
   * @param user - The transaction user.
   */
  constructor(e, t, r) {
    super(e, t, r, v.Trying, "sip.transaction.nist");
  }
  /**
   * Destructor.
   */
  dispose() {
    this.J && (clearTimeout(this.J), this.J = void 0), super.dispose();
  }
  /** Transaction kind. Deprecated. */
  get kind() {
    return "nist";
  }
  /**
   * Receive requests from transport matching this transaction.
   * @param request - Request matching this transaction.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  receiveRequest(e) {
    switch (this.state) {
      case v.Trying:
        break;
      case v.Proceeding:
        if (!this.lastResponse)
          throw new Error("Last response undefined.");
        this.send(this.lastResponse).catch((t) => {
          this.logTransportError(t, "Failed to send retransmission of provisional response.");
        });
        break;
      case v.Completed:
        if (!this.lastResponse)
          throw new Error("Last response undefined.");
        this.send(this.lastResponse).catch((t) => {
          this.logTransportError(t, "Failed to send retransmission of final response.");
        });
        break;
      case v.Terminated:
        break;
      default:
        throw new Error(`Invalid state ${this.state}`);
    }
  }
  /**
   * Receive responses from TU for this transaction.
   * @param statusCode - Status code of response. 101-199 not allowed per RFC 4320.
   * @param response - Response to send.
   */
  receiveResponse(e, t) {
    if (e < 100 || e > 699)
      throw new Error(`Invalid status code ${e}`);
    if (e > 100 && e <= 199)
      throw new Error("Provisional response other than 100 not allowed.");
    switch (this.state) {
      case v.Trying:
        if (this.lastResponse = t, e >= 100 && e < 200) {
          this.stateTransition(v.Proceeding), this.send(t).catch((i) => {
            this.logTransportError(i, "Failed to send provisional response.");
          });
          return;
        }
        if (e >= 200 && e <= 699) {
          this.stateTransition(v.Completed), this.send(t).catch((i) => {
            this.logTransportError(i, "Failed to send final response.");
          });
          return;
        }
        break;
      case v.Proceeding:
        if (this.lastResponse = t, e >= 200 && e <= 699) {
          this.stateTransition(v.Completed), this.send(t).catch((i) => {
            this.logTransportError(i, "Failed to send final response.");
          });
          return;
        }
        break;
      case v.Completed:
        return;
      case v.Terminated:
        break;
      default:
        throw new Error(`Invalid state ${this.state}`);
    }
    const r = `Non-INVITE server transaction received unexpected ${e} response from TU while in state ${this.state}.`;
    throw this.logger.error(r), new Error(r);
  }
  /**
   * First, the procedures in [4] are followed, which attempt to deliver the response to a backup.
   * If those should all fail, based on the definition of failure in [4], the server transaction SHOULD
   * inform the TU that a failure has occurred, and SHOULD transition to the terminated state.
   * https://tools.ietf.org/html/rfc3261#section-17.2.4
   */
  onTransportError(e) {
    this.user.onTransportError && this.user.onTransportError(e), this.stateTransition(v.Terminated, !0);
  }
  /** For logging. */
  typeToString() {
    return "non-INVITE server transaction";
  }
  stateTransition(e, t = !1) {
    const r = () => {
      throw new Error(`Invalid state transition from ${this.state} to ${e}`);
    };
    switch (e) {
      case v.Trying:
        r();
        break;
      case v.Proceeding:
        this.state !== v.Trying && r();
        break;
      case v.Completed:
        this.state !== v.Trying && this.state !== v.Proceeding && r();
        break;
      case v.Terminated:
        this.state !== v.Proceeding && this.state !== v.Completed && (t || r());
        break;
      default:
        r();
    }
    e === v.Completed && (this.J = setTimeout(() => this.timerJ(), te.TIMER_J)), e === v.Terminated && this.dispose(), this.setState(e);
  }
  /**
   * The server transaction remains in this state until Timer J fires,
   * at which point it MUST transition to the "Terminated" state.
   * https://tools.ietf.org/html/rfc3261#section-17.2.2
   */
  timerJ() {
    this.logger.debug(`Timer J expired for NON-INVITE server transaction ${this.id}.`), this.state === v.Completed && this.stateTransition(v.Terminated);
  }
}
class be {
  constructor(e, t, r, i) {
    this.transactionConstructor = e, this.core = t, this.message = r, this.delegate = i, this.logger = this.loggerFactory.getLogger("sip.user-agent-server"), this.toTag = r.toTag ? r.toTag : Rt(), this.init();
  }
  dispose() {
    this.transaction.dispose();
  }
  get loggerFactory() {
    return this.core.loggerFactory;
  }
  /** The transaction associated with this request. */
  get transaction() {
    if (!this._transaction)
      throw new Error("Transaction undefined.");
    return this._transaction;
  }
  accept(e = { statusCode: 200 }) {
    if (!this.acceptable)
      throw new Ce(`${this.message.method} not acceptable in state ${this.transaction.state}.`);
    const t = e.statusCode;
    if (t < 200 || t > 299)
      throw new TypeError(`Invalid statusCode: ${t}`);
    return this.reply(e);
  }
  progress(e = { statusCode: 180 }) {
    if (!this.progressable)
      throw new Ce(`${this.message.method} not progressable in state ${this.transaction.state}.`);
    const t = e.statusCode;
    if (t < 101 || t > 199)
      throw new TypeError(`Invalid statusCode: ${t}`);
    return this.reply(e);
  }
  redirect(e, t = { statusCode: 302 }) {
    if (!this.redirectable)
      throw new Ce(`${this.message.method} not redirectable in state ${this.transaction.state}.`);
    const r = t.statusCode;
    if (r < 300 || r > 399)
      throw new TypeError(`Invalid statusCode: ${r}`);
    const i = new Array();
    return e.forEach((a) => i.push(`Contact: ${a.toString()}`)), t.extraHeaders = (t.extraHeaders || []).concat(i), this.reply(t);
  }
  reject(e = { statusCode: 480 }) {
    if (!this.rejectable)
      throw new Ce(`${this.message.method} not rejectable in state ${this.transaction.state}.`);
    const t = e.statusCode;
    if (t < 400 || t > 699)
      throw new TypeError(`Invalid statusCode: ${t}`);
    return this.reply(e);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trying(e) {
    if (!this.tryingable)
      throw new Ce(`${this.message.method} not tryingable in state ${this.transaction.state}.`);
    return this.reply({ statusCode: 100 });
  }
  /**
   * If the UAS did not find a matching transaction for the CANCEL
   * according to the procedure above, it SHOULD respond to the CANCEL
   * with a 481 (Call Leg/Transaction Does Not Exist).  If the transaction
   * for the original request still exists, the behavior of the UAS on
   * receiving a CANCEL request depends on whether it has already sent a
   * final response for the original request.  If it has, the CANCEL
   * request has no effect on the processing of the original request, no
   * effect on any session state, and no effect on the responses generated
   * for the original request.  If the UAS has not issued a final response
   * for the original request, its behavior depends on the method of the
   * original request.  If the original request was an INVITE, the UAS
   * SHOULD immediately respond to the INVITE with a 487 (Request
   * Terminated).  A CANCEL request has no impact on the processing of
   * transactions with any other method defined in this specification.
   * https://tools.ietf.org/html/rfc3261#section-9.2
   * @param request - Incoming CANCEL request.
   */
  receiveCancel(e) {
    this.delegate && this.delegate.onCancel && this.delegate.onCancel(e);
  }
  get acceptable() {
    if (this.transaction instanceof ne)
      return this.transaction.state === v.Proceeding || this.transaction.state === v.Accepted;
    if (this.transaction instanceof oe)
      return this.transaction.state === v.Trying || this.transaction.state === v.Proceeding;
    throw new Error("Unknown transaction type.");
  }
  get progressable() {
    if (this.transaction instanceof ne)
      return this.transaction.state === v.Proceeding;
    if (this.transaction instanceof oe)
      return !1;
    throw new Error("Unknown transaction type.");
  }
  get redirectable() {
    if (this.transaction instanceof ne)
      return this.transaction.state === v.Proceeding;
    if (this.transaction instanceof oe)
      return this.transaction.state === v.Trying || this.transaction.state === v.Proceeding;
    throw new Error("Unknown transaction type.");
  }
  get rejectable() {
    if (this.transaction instanceof ne)
      return this.transaction.state === v.Proceeding;
    if (this.transaction instanceof oe)
      return this.transaction.state === v.Trying || this.transaction.state === v.Proceeding;
    throw new Error("Unknown transaction type.");
  }
  get tryingable() {
    if (this.transaction instanceof ne)
      return this.transaction.state === v.Proceeding;
    if (this.transaction instanceof oe)
      return this.transaction.state === v.Trying;
    throw new Error("Unknown transaction type.");
  }
  /**
   * When a UAS wishes to construct a response to a request, it follows
   * the general procedures detailed in the following subsections.
   * Additional behaviors specific to the response code in question, which
   * are not detailed in this section, may also be required.
   *
   * Once all procedures associated with the creation of a response have
   * been completed, the UAS hands the response back to the server
   * transaction from which it received the request.
   * https://tools.ietf.org/html/rfc3261#section-8.2.6
   * @param statusCode - Status code to reply with.
   * @param options - Reply options bucket.
   */
  reply(e) {
    !e.toTag && e.statusCode !== 100 && (e.toTag = this.toTag), e.userAgent = e.userAgent || this.core.configuration.userAgentHeaderFieldValue, e.supported = e.supported || this.core.configuration.supportedOptionTagsResponse;
    const t = br(this.message, e);
    return this.transaction.receiveResponse(e.statusCode, t.message), t;
  }
  init() {
    const e = {
      loggerFactory: this.loggerFactory,
      onStateChange: (i) => {
        i === v.Terminated && (this.core.userAgentServers.delete(r), this.dispose());
      },
      onTransportError: (i) => {
        this.logger.error(i.message), this.delegate && this.delegate.onTransportError ? this.delegate.onTransportError(i) : this.logger.error("User agent server response transport error.");
      }
    }, t = new this.transactionConstructor(this.message, this.core.transport, e);
    this._transaction = t;
    const r = t.id;
    this.core.userAgentServers.set(t.id, this);
  }
}
class di extends be {
  constructor(e, t, r) {
    super(oe, e.userAgentCore, t, r);
  }
}
class hi extends ie {
  constructor(e, t, r) {
    const i = e.createOutgoingRequestMessage(C.INFO, r);
    super(ce, e.userAgentCore, i, t);
  }
}
class li extends be {
  constructor(e, t, r) {
    super(oe, e.userAgentCore, t, r);
  }
}
class xr extends ie {
  constructor(e, t, r) {
    super(ce, e, t, r);
  }
}
class Er extends be {
  constructor(e, t, r) {
    super(oe, e, t, r);
  }
}
class ui extends ie {
  constructor(e, t, r) {
    const i = e.createOutgoingRequestMessage(C.NOTIFY, r);
    super(ce, e.userAgentCore, i, t);
  }
}
function gi(s) {
  return s.userAgentCore !== void 0;
}
class bt extends be {
  /**
   * NOTIFY UAS constructor.
   * @param dialogOrCore - Dialog for in dialog NOTIFY, UserAgentCore for out of dialog NOTIFY (deprecated).
   * @param message - Incoming NOTIFY request message.
   */
  constructor(e, t, r) {
    const i = gi(e) ? e.userAgentCore : e;
    super(oe, i, t, r);
  }
}
class fi extends ie {
  constructor(e, t, r) {
    const i = e.createOutgoingRequestMessage(C.PRACK, r);
    super(ce, e.userAgentCore, i, t), e.signalingStateTransition(i);
  }
}
class pi extends be {
  constructor(e, t, r) {
    super(oe, e.userAgentCore, t, r), e.signalingStateTransition(t), this.dialog = e;
  }
  /**
   * Update the dialog signaling state on a 2xx response.
   * @param options - Options bucket.
   */
  accept(e = { statusCode: 200 }) {
    return e.body && this.dialog.signalingStateTransition(e.body), super.accept(e);
  }
}
class mi extends ie {
  constructor(e, t, r) {
    const i = e.createOutgoingRequestMessage(C.INVITE, r);
    super($e, e.userAgentCore, i, t), this.delegate = t, e.signalingStateTransition(i), e.reinviteUserAgentClient = this, this.dialog = e;
  }
  receiveResponse(e) {
    if (!this.authenticationGuard(e, this.dialog))
      return;
    const t = e.statusCode ? e.statusCode.toString() : "";
    if (!t)
      throw new Error("Response status code undefined.");
    switch (!0) {
      case /^100$/.test(t):
        this.delegate && this.delegate.onTrying && this.delegate.onTrying({ message: e });
        break;
      case /^1[0-9]{2}$/.test(t):
        this.delegate && this.delegate.onProgress && this.delegate.onProgress({
          message: e,
          session: this.dialog,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          prack: (r) => {
            throw new Error("Unimplemented.");
          }
        });
        break;
      case /^2[0-9]{2}$/.test(t):
        this.dialog.signalingStateTransition(e), this.delegate && this.delegate.onAccept && this.delegate.onAccept({
          message: e,
          session: this.dialog,
          ack: (r) => this.dialog.ack(r)
        });
        break;
      case /^3[0-9]{2}$/.test(t):
        this.dialog.signalingStateRollback(), this.dialog.reinviteUserAgentClient = void 0, this.delegate && this.delegate.onRedirect && this.delegate.onRedirect({ message: e });
        break;
      case /^[4-6][0-9]{2}$/.test(t):
        this.dialog.signalingStateRollback(), this.dialog.reinviteUserAgentClient = void 0, this.delegate && this.delegate.onReject && this.delegate.onReject({ message: e });
        break;
      default:
        throw new Error(`Invalid status code ${t}`);
    }
  }
}
class vi extends be {
  constructor(e, t, r) {
    super(ne, e.userAgentCore, t, r), e.reinviteUserAgentServer = this, this.dialog = e;
  }
  /**
   * Update the dialog signaling state on a 2xx response.
   * @param options - Options bucket.
   */
  accept(e = { statusCode: 200 }) {
    e.extraHeaders = e.extraHeaders || [], e.extraHeaders = e.extraHeaders.concat(this.dialog.routeSet.map((n) => `Record-Route: ${n}`));
    const t = super.accept(e), r = this.dialog, i = Object.assign(Object.assign({}, t), { session: r });
    return e.body && this.dialog.signalingStateTransition(e.body), this.dialog.reConfirm(), i;
  }
  /**
   * Update the dialog signaling state on a 1xx response.
   * @param options - Progress options bucket.
   */
  progress(e = { statusCode: 180 }) {
    const t = super.progress(e), r = this.dialog, i = Object.assign(Object.assign({}, t), { session: r });
    return e.body && this.dialog.signalingStateTransition(e.body), i;
  }
  /**
   * TODO: Not Yet Supported
   * @param contacts - Contacts to redirect to.
   * @param options - Redirect options bucket.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  redirect(e, t = { statusCode: 302 }) {
    throw this.dialog.signalingStateRollback(), this.dialog.reinviteUserAgentServer = void 0, new Error("Unimplemented.");
  }
  /**
   * 3.1 Background on Re-INVITE Handling by UASs
   * An error response to a re-INVITE has the following semantics.  As
   * specified in Section 12.2.2 of RFC 3261 [RFC3261], if a re-INVITE is
   * rejected, no state changes are performed.
   * https://tools.ietf.org/html/rfc6141#section-3.1
   * @param options - Reject options bucket.
   */
  reject(e = { statusCode: 488 }) {
    return this.dialog.signalingStateRollback(), this.dialog.reinviteUserAgentServer = void 0, super.reject(e);
  }
}
class yi extends ie {
  constructor(e, t, r) {
    const i = e.createOutgoingRequestMessage(C.REFER, r);
    super(ce, e.userAgentCore, i, t);
  }
}
function wi(s) {
  return s.userAgentCore !== void 0;
}
class Cr extends be {
  /**
   * REFER UAS constructor.
   * @param dialogOrCore - Dialog for in dialog REFER, UserAgentCore for out of dialog REFER.
   * @param message - Incoming REFER request message.
   */
  constructor(e, t, r) {
    const i = wi(e) ? e.userAgentCore : e;
    super(oe, i, t, r);
  }
}
class St extends Ve {
  constructor(e, t, r, i) {
    super(t, r), this.initialTransaction = e, this._signalingState = x.Initial, this.ackWait = !1, this.ackProcessing = !1, this.delegate = i, e instanceof ne && (this.ackWait = !0), this.early || this.start2xxRetransmissionTimer(), this.signalingStateTransition(e.request), this.logger = t.loggerFactory.getLogger("sip.invite-dialog"), this.logger.log(`INVITE dialog ${this.id} constructed`);
  }
  dispose() {
    super.dispose(), this._signalingState = x.Closed, this._offer = void 0, this._answer = void 0, this.invite2xxTimer && (clearTimeout(this.invite2xxTimer), this.invite2xxTimer = void 0), this.logger.log(`INVITE dialog ${this.id} destroyed`);
  }
  // FIXME: Need real state machine
  get sessionState() {
    return this.early ? de.Early : this.ackWait ? de.AckWait : this._signalingState === x.Closed ? de.Terminated : de.Confirmed;
  }
  /** The state of the offer/answer exchange. */
  get signalingState() {
    return this._signalingState;
  }
  /** The current offer. Undefined unless signaling state HaveLocalOffer, HaveRemoteOffer, of Stable. */
  get offer() {
    return this._offer;
  }
  /** The current answer. Undefined unless signaling state Stable. */
  get answer() {
    return this._answer;
  }
  /** Confirm the dialog. Only matters if dialog is currently early. */
  confirm() {
    this.early && this.start2xxRetransmissionTimer(), super.confirm();
  }
  /** Re-confirm the dialog. Only matters if handling re-INVITE request. */
  reConfirm() {
    this.reinviteUserAgentServer && this.startReInvite2xxRetransmissionTimer();
  }
  /**
   * The UAC core MUST generate an ACK request for each 2xx received from
   * the transaction layer.  The header fields of the ACK are constructed
   * in the same way as for any request sent within a dialog (see Section
   * 12) with the exception of the CSeq and the header fields related to
   * authentication.  The sequence number of the CSeq header field MUST be
   * the same as the INVITE being acknowledged, but the CSeq method MUST
   * be ACK.  The ACK MUST contain the same credentials as the INVITE.  If
   * the 2xx contains an offer (based on the rules above), the ACK MUST
   * carry an answer in its body.  If the offer in the 2xx response is not
   * acceptable, the UAC core MUST generate a valid answer in the ACK and
   * then send a BYE immediately.
   * https://tools.ietf.org/html/rfc3261#section-13.2.2.4
   * @param options - ACK options bucket.
   */
  ack(e = {}) {
    this.logger.log(`INVITE dialog ${this.id} sending ACK request`);
    let t;
    if (this.reinviteUserAgentClient) {
      if (!(this.reinviteUserAgentClient.transaction instanceof $e))
        throw new Error("Transaction not instance of InviteClientTransaction.");
      t = this.reinviteUserAgentClient.transaction, this.reinviteUserAgentClient = void 0;
    } else {
      if (!(this.initialTransaction instanceof $e))
        throw new Error("Initial transaction not instance of InviteClientTransaction.");
      t = this.initialTransaction;
    }
    const r = this.createOutgoingRequestMessage(C.ACK, {
      cseq: t.request.cseq,
      extraHeaders: e.extraHeaders,
      body: e.body
    });
    return t.ackResponse(r), this.signalingStateTransition(r), { message: r };
  }
  /**
   * Terminating a Session
   *
   * This section describes the procedures for terminating a session
   * established by SIP.  The state of the session and the state of the
   * dialog are very closely related.  When a session is initiated with an
   * INVITE, each 1xx or 2xx response from a distinct UAS creates a
   * dialog, and if that response completes the offer/answer exchange, it
   * also creates a session.  As a result, each session is "associated"
   * with a single dialog - the one which resulted in its creation.  If an
   * initial INVITE generates a non-2xx final response, that terminates
   * all sessions (if any) and all dialogs (if any) that were created
   * through responses to the request.  By virtue of completing the
   * transaction, a non-2xx final response also prevents further sessions
   * from being created as a result of the INVITE.  The BYE request is
   * used to terminate a specific session or attempted session.  In this
   * case, the specific session is the one with the peer UA on the other
   * side of the dialog.  When a BYE is received on a dialog, any session
   * associated with that dialog SHOULD terminate.  A UA MUST NOT send a
   * BYE outside of a dialog.  The caller's UA MAY send a BYE for either
   * confirmed or early dialogs, and the callee's UA MAY send a BYE on
   * confirmed dialogs, but MUST NOT send a BYE on early dialogs.
   *
   * However, the callee's UA MUST NOT send a BYE on a confirmed dialog
   * until it has received an ACK for its 2xx response or until the server
   * transaction times out.  If no SIP extensions have defined other
   * application layer states associated with the dialog, the BYE also
   * terminates the dialog.
   *
   * https://tools.ietf.org/html/rfc3261#section-15
   * FIXME: Make these proper Exceptions...
   * @param options - BYE options bucket.
   * @returns
   * Throws `Error` if callee's UA attempts a BYE on an early dialog.
   * Throws `Error` if callee's UA attempts a BYE on a confirmed dialog
   *                while it's waiting on the ACK for its 2xx response.
   */
  bye(e, t) {
    if (this.logger.log(`INVITE dialog ${this.id} sending BYE request`), this.initialTransaction instanceof ne) {
      if (this.early)
        throw new Error("UAS MUST NOT send a BYE on early dialogs.");
      if (this.ackWait && this.initialTransaction.state !== v.Terminated)
        throw new Error("UAS MUST NOT send a BYE on a confirmed dialog until it has received an ACK for its 2xx response or until the server transaction times out.");
    }
    return new ci(this, e, t);
  }
  /**
   * An INFO request can be associated with an Info Package (see
   * Section 5), or associated with a legacy INFO usage (see Section 2).
   *
   * The construction of the INFO request is the same as any other
   * non-target refresh request within an existing invite dialog usage as
   * described in Section 12.2 of RFC 3261.
   * https://tools.ietf.org/html/rfc6086#section-4.2.1
   * @param options - Options bucket.
   */
  info(e, t) {
    if (this.logger.log(`INVITE dialog ${this.id} sending INFO request`), this.early)
      throw new Error("Dialog not confirmed.");
    return new hi(this, e, t);
  }
  /**
   * Modifying an Existing Session
   *
   * A successful INVITE request (see Section 13) establishes both a
   * dialog between two user agents and a session using the offer-answer
   * model.  Section 12 explains how to modify an existing dialog using a
   * target refresh request (for example, changing the remote target URI
   * of the dialog).  This section describes how to modify the actual
   * session.  This modification can involve changing addresses or ports,
   * adding a media stream, deleting a media stream, and so on.  This is
   * accomplished by sending a new INVITE request within the same dialog
   * that established the session.  An INVITE request sent within an
   * existing dialog is known as a re-INVITE.
   *
   *    Note that a single re-INVITE can modify the dialog and the
   *    parameters of the session at the same time.
   *
   * Either the caller or callee can modify an existing session.
   * https://tools.ietf.org/html/rfc3261#section-14
   * @param options - Options bucket
   */
  invite(e, t) {
    if (this.logger.log(`INVITE dialog ${this.id} sending INVITE request`), this.early)
      throw new Error("Dialog not confirmed.");
    if (this.reinviteUserAgentClient)
      throw new Error("There is an ongoing re-INVITE client transaction.");
    if (this.reinviteUserAgentServer)
      throw new Error("There is an ongoing re-INVITE server transaction.");
    return new mi(this, e, t);
  }
  /**
   * A UAC MAY associate a MESSAGE request with an existing dialog.  If a
   * MESSAGE request is sent within a dialog, it is "associated" with any
   * media session or sessions associated with that dialog.
   * https://tools.ietf.org/html/rfc3428#section-4
   * @param options - Options bucket.
   */
  message(e, t) {
    if (this.logger.log(`INVITE dialog ${this.id} sending MESSAGE request`), this.early)
      throw new Error("Dialog not confirmed.");
    const r = this.createOutgoingRequestMessage(C.MESSAGE, t);
    return new xr(this.core, r, e);
  }
  /**
   * The NOTIFY mechanism defined in [2] MUST be used to inform the agent
   * sending the REFER of the status of the reference.
   * https://tools.ietf.org/html/rfc3515#section-2.4.4
   * @param options - Options bucket.
   */
  notify(e, t) {
    if (this.logger.log(`INVITE dialog ${this.id} sending NOTIFY request`), this.early)
      throw new Error("Dialog not confirmed.");
    return new ui(this, e, t);
  }
  /**
   * Assuming the response is to be transmitted reliably, the UAC MUST
   * create a new request with method PRACK.  This request is sent within
   * the dialog associated with the provisional response (indeed, the
   * provisional response may have created the dialog).  PRACK requests
   * MAY contain bodies, which are interpreted according to their type and
   * disposition.
   * https://tools.ietf.org/html/rfc3262#section-4
   * @param options - Options bucket.
   */
  prack(e, t) {
    return this.logger.log(`INVITE dialog ${this.id} sending PRACK request`), new fi(this, e, t);
  }
  /**
   * REFER is a SIP request and is constructed as defined in [1].  A REFER
   * request MUST contain exactly one Refer-To header field value.
   * https://tools.ietf.org/html/rfc3515#section-2.4.1
   * @param options - Options bucket.
   */
  refer(e, t) {
    if (this.logger.log(`INVITE dialog ${this.id} sending REFER request`), this.early)
      throw new Error("Dialog not confirmed.");
    return new yi(this, e, t);
  }
  /**
   * Requests sent within a dialog, as any other requests, are atomic.  If
   * a particular request is accepted by the UAS, all the state changes
   * associated with it are performed.  If the request is rejected, none
   * of the state changes are performed.
   * https://tools.ietf.org/html/rfc3261#section-12.2.2
   * @param message - Incoming request message within this dialog.
   */
  receiveRequest(e) {
    if (this.logger.log(`INVITE dialog ${this.id} received ${e.method} request`), e.method === C.ACK) {
      if (this.ackWait) {
        if (this.initialTransaction instanceof $e) {
          this.logger.warn(`INVITE dialog ${this.id} received unexpected ${e.method} request, dropping.`);
          return;
        }
        if (this.initialTransaction.request.cseq !== e.cseq) {
          this.logger.warn(`INVITE dialog ${this.id} received unexpected ${e.method} request, dropping.`);
          return;
        }
        this.ackWait = !1;
      } else {
        if (!this.reinviteUserAgentServer) {
          this.logger.warn(`INVITE dialog ${this.id} received unexpected ${e.method} request, dropping.`);
          return;
        }
        if (this.reinviteUserAgentServer.transaction.request.cseq !== e.cseq) {
          this.logger.warn(`INVITE dialog ${this.id} received unexpected ${e.method} request, dropping.`);
          return;
        }
        this.reinviteUserAgentServer = void 0;
      }
      if (this.signalingStateTransition(e), this.delegate && this.delegate.onAck) {
        const t = this.delegate.onAck({ message: e });
        t instanceof Promise && (this.ackProcessing = !0, t.then(() => this.ackProcessing = !1).catch(() => this.ackProcessing = !1));
      }
      return;
    }
    if (!this.sequenceGuard(e)) {
      this.logger.log(`INVITE dialog ${this.id} rejected out of order ${e.method} request.`);
      return;
    }
    if (super.receiveRequest(e), e.method === C.INVITE) {
      const t = () => {
        const n = this.ackWait ? "waiting for initial ACK" : "processing initial ACK";
        this.logger.warn(`INVITE dialog ${this.id} received re-INVITE while ${n}`);
        let a = "RFC 5407 suggests the following to avoid this race condition... ";
        a += " Note: Implementation issues are outside the scope of this document,", a += " but the following tip is provided for avoiding race conditions of", a += " this type.  The caller can delay sending re-INVITE F6 for some period", a += " of time (2 seconds, perhaps), after which the caller can reasonably", a += " assume that its ACK has been received.  Implementors can decouple the", a += " actions of the user (e.g., pressing the hold button) from the actions", a += " of the protocol (the sending of re-INVITE F6), so that the UA can", a += " behave like this.  In this case, it is the implementor's choice as to", a += " how long to wait.  In most cases, such an implementation may be", a += " useful to prevent the type of race condition shown in this section.", a += " This document expresses no preference about whether or not they", a += " should wait for an ACK to be delivered.  After considering the impact", a += " on user experience, implementors should decide whether or not to wait", a += " for a while, because the user experience depends on the", a += " implementation and has no direct bearing on protocol behavior.", this.logger.warn(a);
      }, i = [`Retry-After: ${Math.floor(Math.random() * 10) + 1}`];
      if (this.ackProcessing) {
        this.core.replyStateless(e, { statusCode: 500, extraHeaders: i }), t();
        return;
      }
      if (this.ackWait && this.signalingState !== x.Stable) {
        this.core.replyStateless(e, { statusCode: 500, extraHeaders: i }), t();
        return;
      }
      if (this.reinviteUserAgentServer) {
        this.core.replyStateless(e, { statusCode: 500, extraHeaders: i });
        return;
      }
      if (this.reinviteUserAgentClient) {
        this.core.replyStateless(e, { statusCode: 491 });
        return;
      }
    }
    if (e.method === C.INVITE) {
      const t = e.parseHeader("contact");
      if (!t)
        throw new Error("Contact undefined.");
      if (!(t instanceof se))
        throw new Error("Contact not instance of NameAddrHeader.");
      this.dialogState.remoteTarget = t.uri;
    }
    switch (e.method) {
      case C.BYE:
        {
          const t = new di(this, e);
          this.delegate && this.delegate.onBye ? this.delegate.onBye(t) : t.accept(), this.dispose();
        }
        break;
      case C.INFO:
        {
          const t = new li(this, e);
          this.delegate && this.delegate.onInfo ? this.delegate.onInfo(t) : t.reject({
            statusCode: 469,
            extraHeaders: ["Recv-Info:"]
          });
        }
        break;
      case C.INVITE:
        {
          const t = new vi(this, e);
          this.signalingStateTransition(e), this.delegate && this.delegate.onInvite ? this.delegate.onInvite(t) : t.reject({ statusCode: 488 });
        }
        break;
      case C.MESSAGE:
        {
          const t = new Er(this.core, e);
          this.delegate && this.delegate.onMessage ? this.delegate.onMessage(t) : t.accept();
        }
        break;
      case C.NOTIFY:
        {
          const t = new bt(this, e);
          this.delegate && this.delegate.onNotify ? this.delegate.onNotify(t) : t.accept();
        }
        break;
      case C.PRACK:
        {
          const t = new pi(this, e);
          this.delegate && this.delegate.onPrack ? this.delegate.onPrack(t) : t.accept();
        }
        break;
      case C.REFER:
        {
          const t = new Cr(this, e);
          this.delegate && this.delegate.onRefer ? this.delegate.onRefer(t) : t.reject();
        }
        break;
      default:
        this.logger.log(`INVITE dialog ${this.id} received unimplemented ${e.method} request`), this.core.replyStateless(e, { statusCode: 501 });
        break;
    }
  }
  /**
   * Guard against out of order reliable provisional responses and retransmissions.
   * Returns false if the response should be discarded, otherwise true.
   * @param message - Incoming response message within this dialog.
   */
  reliableSequenceGuard(e) {
    const t = e.statusCode;
    if (!t)
      throw new Error("Status code undefined");
    if (t > 100 && t < 200) {
      const r = e.getHeader("require"), i = e.getHeader("rseq"), n = r && r.includes("100rel") && i ? Number(i) : void 0;
      if (n) {
        if (this.rseq && this.rseq + 1 !== n)
          return !1;
        this.rseq = this.rseq ? this.rseq + 1 : n;
      }
    }
    return !0;
  }
  /**
   * If not in a stable signaling state, rollback to prior stable signaling state.
   */
  signalingStateRollback() {
    (this._signalingState === x.HaveLocalOffer || this.signalingState === x.HaveRemoteOffer) && this._rollbackOffer && this._rollbackAnswer && (this._signalingState = x.Stable, this._offer = this._rollbackOffer, this._answer = this._rollbackAnswer);
  }
  /**
   * Update the signaling state of the dialog.
   * @param message - The message to base the update off of.
   */
  signalingStateTransition(e) {
    const t = Xe(e);
    if (!(!t || t.contentDisposition !== "session")) {
      if (this._signalingState === x.Stable && (this._rollbackOffer = this._offer, this._rollbackAnswer = this._answer), e instanceof Be)
        switch (this._signalingState) {
          case x.Initial:
          case x.Stable:
            this._signalingState = x.HaveRemoteOffer, this._offer = t, this._answer = void 0;
            break;
          case x.HaveLocalOffer:
            this._signalingState = x.Stable, this._answer = t;
            break;
          case x.HaveRemoteOffer:
            break;
          case x.Closed:
            break;
          default:
            throw new Error("Unexpected signaling state.");
        }
      if (e instanceof Ie)
        switch (this._signalingState) {
          case x.Initial:
          case x.Stable:
            this._signalingState = x.HaveRemoteOffer, this._offer = t, this._answer = void 0;
            break;
          case x.HaveLocalOffer:
            this._signalingState = x.Stable, this._answer = t;
            break;
          case x.HaveRemoteOffer:
            break;
          case x.Closed:
            break;
          default:
            throw new Error("Unexpected signaling state.");
        }
      if (e instanceof He)
        switch (this._signalingState) {
          case x.Initial:
          case x.Stable:
            this._signalingState = x.HaveLocalOffer, this._offer = t, this._answer = void 0;
            break;
          case x.HaveLocalOffer:
            break;
          case x.HaveRemoteOffer:
            this._signalingState = x.Stable, this._answer = t;
            break;
          case x.Closed:
            break;
          default:
            throw new Error("Unexpected signaling state.");
        }
      if (yr(e))
        switch (this._signalingState) {
          case x.Initial:
          case x.Stable:
            this._signalingState = x.HaveLocalOffer, this._offer = t, this._answer = void 0;
            break;
          case x.HaveLocalOffer:
            break;
          case x.HaveRemoteOffer:
            this._signalingState = x.Stable, this._answer = t;
            break;
          case x.Closed:
            break;
          default:
            throw new Error("Unexpected signaling state.");
        }
    }
  }
  start2xxRetransmissionTimer() {
    if (this.initialTransaction instanceof ne) {
      const e = this.initialTransaction;
      let t = te.T1;
      const r = () => {
        if (!this.ackWait) {
          this.invite2xxTimer = void 0;
          return;
        }
        this.logger.log("No ACK for 2xx response received, attempting retransmission"), e.retransmitAcceptedResponse(), t = Math.min(t * 2, te.T2), this.invite2xxTimer = setTimeout(r, t);
      };
      this.invite2xxTimer = setTimeout(r, t);
      const i = () => {
        e.state === v.Terminated && (e.removeStateChangeListener(i), this.invite2xxTimer && (clearTimeout(this.invite2xxTimer), this.invite2xxTimer = void 0), this.ackWait && (this.delegate && this.delegate.onAckTimeout ? this.delegate.onAckTimeout() : this.bye()));
      };
      e.addStateChangeListener(i);
    }
  }
  // FIXME: Refactor
  startReInvite2xxRetransmissionTimer() {
    if (this.reinviteUserAgentServer && this.reinviteUserAgentServer.transaction instanceof ne) {
      const e = this.reinviteUserAgentServer.transaction;
      let t = te.T1;
      const r = () => {
        if (!this.reinviteUserAgentServer) {
          this.invite2xxTimer = void 0;
          return;
        }
        this.logger.log("No ACK for 2xx response received, attempting retransmission"), e.retransmitAcceptedResponse(), t = Math.min(t * 2, te.T2), this.invite2xxTimer = setTimeout(r, t);
      };
      this.invite2xxTimer = setTimeout(r, t);
      const i = () => {
        e.state === v.Terminated && (e.removeStateChangeListener(i), this.invite2xxTimer && (clearTimeout(this.invite2xxTimer), this.invite2xxTimer = void 0), this.reinviteUserAgentServer);
      };
      e.addStateChangeListener(i);
    }
  }
}
class bi extends ie {
  constructor(e, t, r) {
    super($e, e, t, r), this.confirmedDialogAcks = /* @__PURE__ */ new Map(), this.confirmedDialogs = /* @__PURE__ */ new Map(), this.earlyDialogs = /* @__PURE__ */ new Map(), this.delegate = r;
  }
  dispose() {
    this.earlyDialogs.forEach((e) => e.dispose()), this.earlyDialogs.clear(), super.dispose();
  }
  /**
   * Special case for transport error while sending ACK.
   * @param error - Transport error
   */
  onTransportError(e) {
    if (this.transaction.state === v.Calling)
      return super.onTransportError(e);
    this.logger.error(e.message), this.logger.error("User agent client request transport error while sending ACK.");
  }
  /**
   * Once the INVITE has been passed to the INVITE client transaction, the
   * UAC waits for responses for the INVITE.
   * https://tools.ietf.org/html/rfc3261#section-13.2.2
   * @param incomingResponse - Incoming response to INVITE request.
   */
  receiveResponse(e) {
    if (!this.authenticationGuard(e))
      return;
    const t = e.statusCode ? e.statusCode.toString() : "";
    if (!t)
      throw new Error("Response status code undefined.");
    switch (!0) {
      case /^100$/.test(t):
        this.delegate && this.delegate.onTrying && this.delegate.onTrying({ message: e });
        return;
      case /^1[0-9]{2}$/.test(t):
        {
          if (!e.toTag) {
            this.logger.warn("Non-100 1xx INVITE response received without a to tag, dropping.");
            return;
          }
          if (!e.parseHeader("contact")) {
            this.logger.error("Non-100 1xx INVITE response received without a Contact header field, dropping.");
            return;
          }
          const i = Ve.initialDialogStateForUserAgentClient(this.message, e);
          let n = this.earlyDialogs.get(i.id);
          if (!n) {
            const o = this.transaction;
            if (!(o instanceof $e))
              throw new Error("Transaction not instance of InviteClientTransaction.");
            n = new St(o, this.core, i), this.earlyDialogs.set(n.id, n);
          }
          if (!n.reliableSequenceGuard(e)) {
            this.logger.warn("1xx INVITE reliable response received out of order or is a retransmission, dropping.");
            return;
          }
          (n.signalingState === x.Initial || n.signalingState === x.HaveLocalOffer) && n.signalingStateTransition(e);
          const a = n;
          this.delegate && this.delegate.onProgress && this.delegate.onProgress({
            message: e,
            session: a,
            prack: (o) => a.prack(void 0, o)
          });
        }
        return;
      case /^2[0-9]{2}$/.test(t):
        {
          if (!e.toTag) {
            this.logger.error("2xx INVITE response received without a to tag, dropping.");
            return;
          }
          if (!e.parseHeader("contact")) {
            this.logger.error("2xx INVITE response received without a Contact header field, dropping.");
            return;
          }
          const i = Ve.initialDialogStateForUserAgentClient(this.message, e);
          let n = this.confirmedDialogs.get(i.id);
          if (n) {
            const o = this.confirmedDialogAcks.get(i.id);
            if (o) {
              const d = this.transaction;
              if (!(d instanceof $e))
                throw new Error("Client transaction not instance of InviteClientTransaction.");
              d.ackResponse(o.message);
            }
            return;
          }
          if (n = this.earlyDialogs.get(i.id), n)
            n.confirm(), n.recomputeRouteSet(e), this.earlyDialogs.delete(n.id), this.confirmedDialogs.set(n.id, n);
          else {
            const o = this.transaction;
            if (!(o instanceof $e))
              throw new Error("Transaction not instance of InviteClientTransaction.");
            n = new St(o, this.core, i), this.confirmedDialogs.set(n.id, n);
          }
          (n.signalingState === x.Initial || n.signalingState === x.HaveLocalOffer) && n.signalingStateTransition(e);
          const a = n;
          if (this.delegate && this.delegate.onAccept)
            this.delegate.onAccept({
              message: e,
              session: a,
              ack: (o) => {
                const d = a.ack(o);
                return this.confirmedDialogAcks.set(a.id, d), d;
              }
            });
          else {
            const o = a.ack();
            this.confirmedDialogAcks.set(a.id, o);
          }
        }
        return;
      case /^3[0-9]{2}$/.test(t):
        this.earlyDialogs.forEach((r) => r.dispose()), this.earlyDialogs.clear(), this.delegate && this.delegate.onRedirect && this.delegate.onRedirect({ message: e });
        return;
      case /^[4-6][0-9]{2}$/.test(t):
        this.earlyDialogs.forEach((r) => r.dispose()), this.earlyDialogs.clear(), this.delegate && this.delegate.onReject && this.delegate.onReject({ message: e });
        return;
      default:
        throw new Error(`Invalid status code ${t}`);
    }
  }
}
class Ht extends be {
  constructor(e, t, r) {
    super(ne, e, t, r), this.core = e;
  }
  dispose() {
    this.earlyDialog && this.earlyDialog.dispose(), super.dispose();
  }
  /**
   * 13.3.1.4 The INVITE is Accepted
   * The UAS core generates a 2xx response.  This response establishes a
   * dialog, and therefore follows the procedures of Section 12.1.1 in
   * addition to those of Section 8.2.6.
   * https://tools.ietf.org/html/rfc3261#section-13.3.1.4
   * @param options - Accept options bucket.
   */
  accept(e = { statusCode: 200 }) {
    if (!this.acceptable)
      throw new Ce(`${this.message.method} not acceptable in state ${this.transaction.state}.`);
    if (!this.confirmedDialog)
      if (this.earlyDialog)
        this.earlyDialog.confirm(), this.confirmedDialog = this.earlyDialog, this.earlyDialog = void 0;
      else {
        const d = this.transaction;
        if (!(d instanceof ne))
          throw new Error("Transaction not instance of InviteClientTransaction.");
        const h = Ve.initialDialogStateForUserAgentServer(this.message, this.toTag);
        this.confirmedDialog = new St(d, this.core, h);
      }
    const t = this.message.getHeaders("record-route").map((d) => `Record-Route: ${d}`), r = `Contact: ${this.core.configuration.contact.toString()}`, i = "Allow: " + Re.toString();
    if (!e.body) {
      if (this.confirmedDialog.signalingState === x.Stable)
        e.body = this.confirmedDialog.answer;
      else if (this.confirmedDialog.signalingState === x.Initial || this.confirmedDialog.signalingState === x.HaveRemoteOffer)
        throw new Error("Response must have a body.");
    }
    e.statusCode = e.statusCode || 200, e.extraHeaders = e.extraHeaders || [], e.extraHeaders = e.extraHeaders.concat(t), e.extraHeaders.push(i), e.extraHeaders.push(r);
    const n = super.accept(e), a = this.confirmedDialog, o = Object.assign(Object.assign({}, n), { session: a });
    return e.body && this.confirmedDialog.signalingState !== x.Stable && this.confirmedDialog.signalingStateTransition(e.body), o;
  }
  /**
   * 13.3.1.1 Progress
   * If the UAS is not able to answer the invitation immediately, it can
   * choose to indicate some kind of progress to the UAC (for example, an
   * indication that a phone is ringing).  This is accomplished with a
   * provisional response between 101 and 199.  These provisional
   * responses establish early dialogs and therefore follow the procedures
   * of Section 12.1.1 in addition to those of Section 8.2.6.  A UAS MAY
   * send as many provisional responses as it likes.  Each of these MUST
   * indicate the same dialog ID.  However, these will not be delivered
   * reliably.
   *
   * If the UAS desires an extended period of time to answer the INVITE,
   * it will need to ask for an "extension" in order to prevent proxies
   * from canceling the transaction.  A proxy has the option of canceling
   * a transaction when there is a gap of 3 minutes between responses in a
   * transaction.  To prevent cancellation, the UAS MUST send a non-100
   * provisional response at every minute, to handle the possibility of
   * lost provisional responses.
   * https://tools.ietf.org/html/rfc3261#section-13.3.1.1
   * @param options - Progress options bucket.
   */
  progress(e = { statusCode: 180 }) {
    if (!this.progressable)
      throw new Ce(`${this.message.method} not progressable in state ${this.transaction.state}.`);
    if (!this.earlyDialog) {
      const o = this.transaction;
      if (!(o instanceof ne))
        throw new Error("Transaction not instance of InviteClientTransaction.");
      const d = Ve.initialDialogStateForUserAgentServer(this.message, this.toTag, !0);
      this.earlyDialog = new St(o, this.core, d);
    }
    const t = this.message.getHeaders("record-route").map((o) => `Record-Route: ${o}`), r = `Contact: ${this.core.configuration.contact}`;
    e.extraHeaders = e.extraHeaders || [], e.extraHeaders = e.extraHeaders.concat(t), e.extraHeaders.push(r);
    const i = super.progress(e), n = this.earlyDialog, a = Object.assign(Object.assign({}, i), { session: n });
    return e.body && this.earlyDialog.signalingState !== x.Stable && this.earlyDialog.signalingStateTransition(e.body), a;
  }
  /**
   * 13.3.1.2 The INVITE is Redirected
   * If the UAS decides to redirect the call, a 3xx response is sent.  A
   * 300 (Multiple Choices), 301 (Moved Permanently) or 302 (Moved
   * Temporarily) response SHOULD contain a Contact header field
   * containing one or more URIs of new addresses to be tried.  The
   * response is passed to the INVITE server transaction, which will deal
   * with its retransmissions.
   * https://tools.ietf.org/html/rfc3261#section-13.3.1.2
   * @param contacts - Contacts to redirect to.
   * @param options - Redirect options bucket.
   */
  redirect(e, t = { statusCode: 302 }) {
    return super.redirect(e, t);
  }
  /**
   * 13.3.1.3 The INVITE is Rejected
   * A common scenario occurs when the callee is currently not willing or
   * able to take additional calls at this end system.  A 486 (Busy Here)
   * SHOULD be returned in such a scenario.
   * https://tools.ietf.org/html/rfc3261#section-13.3.1.3
   * @param options - Reject options bucket.
   */
  reject(e = { statusCode: 486 }) {
    return super.reject(e);
  }
}
class Si extends ie {
  constructor(e, t, r) {
    super(ce, e, t, r);
  }
}
class Ti extends ie {
  constructor(e, t, r) {
    super(ce, e, t, r);
  }
}
class xi extends be {
  constructor(e, t, r) {
    super(oe, e, t, r), this.core = e;
  }
}
class Ei extends ie {
  constructor(e, t, r) {
    const i = e.createOutgoingRequestMessage(C.SUBSCRIBE, r);
    super(ce, e.userAgentCore, i, t), this.dialog = e;
  }
  waitNotifyStop() {
  }
  /**
   * Receive a response from the transaction layer.
   * @param message - Incoming response message.
   */
  receiveResponse(e) {
    if (e.statusCode && e.statusCode >= 200 && e.statusCode < 300) {
      const t = e.getHeader("Expires");
      if (!t)
        this.logger.warn("Expires header missing in a 200-class response to SUBSCRIBE");
      else {
        const r = Number(t);
        this.dialog.subscriptionExpires > r && (this.dialog.subscriptionExpires = r);
      }
    }
    e.statusCode && e.statusCode >= 400 && e.statusCode < 700 && [404, 405, 410, 416, 480, 481, 482, 483, 484, 485, 489, 501, 604].includes(e.statusCode) && this.dialog.terminate(), super.receiveResponse(e);
  }
}
class ir extends Ve {
  constructor(e, t, r, i, n, a) {
    super(i, n), this.delegate = a, this._autoRefresh = !1, this._subscriptionEvent = e, this._subscriptionExpires = t, this._subscriptionExpiresInitial = t, this._subscriptionExpiresLastSet = Math.floor(Date.now() / 1e3), this._subscriptionRefresh = void 0, this._subscriptionRefreshLastSet = void 0, this._subscriptionState = r, this.logger = i.loggerFactory.getLogger("sip.subscribe-dialog"), this.logger.log(`SUBSCRIBE dialog ${this.id} constructed`);
  }
  /**
   * When a UAC receives a response that establishes a dialog, it
   * constructs the state of the dialog.  This state MUST be maintained
   * for the duration of the dialog.
   * https://tools.ietf.org/html/rfc3261#section-12.1.2
   * @param outgoingRequestMessage - Outgoing request message for dialog.
   * @param incomingResponseMessage - Incoming response message creating dialog.
   */
  static initialDialogStateForSubscription(e, t) {
    const i = t.getHeaders("record-route"), n = t.parseHeader("contact");
    if (!n)
      throw new Error("Contact undefined.");
    if (!(n instanceof se))
      throw new Error("Contact not instance of NameAddrHeader.");
    const a = n.uri, o = e.cseq, d = void 0, h = e.callId, u = e.fromTag, f = t.fromTag;
    if (!h)
      throw new Error("Call id undefined.");
    if (!u)
      throw new Error("From tag undefined.");
    if (!f)
      throw new Error("To tag undefined.");
    if (!e.from)
      throw new Error("From undefined.");
    if (!e.to)
      throw new Error("To undefined.");
    const w = e.from.uri, T = e.to.uri;
    return {
      id: h + u + f,
      early: !1,
      callId: h,
      localTag: u,
      remoteTag: f,
      localSequenceNumber: o,
      remoteSequenceNumber: d,
      localURI: w,
      remoteURI: T,
      remoteTarget: a,
      routeSet: i,
      secure: !1
    };
  }
  dispose() {
    super.dispose(), this.N && (clearTimeout(this.N), this.N = void 0), this.refreshTimerClear(), this.logger.log(`SUBSCRIBE dialog ${this.id} destroyed`);
  }
  get autoRefresh() {
    return this._autoRefresh;
  }
  set autoRefresh(e) {
    this._autoRefresh = !0, this.refreshTimerSet();
  }
  get subscriptionEvent() {
    return this._subscriptionEvent;
  }
  /** Number of seconds until subscription expires. */
  get subscriptionExpires() {
    const e = Math.floor(Date.now() / 1e3) - this._subscriptionExpiresLastSet, t = this._subscriptionExpires - e;
    return Math.max(t, 0);
  }
  set subscriptionExpires(e) {
    if (e < 0)
      throw new Error("Expires must be greater than or equal to zero.");
    if (this._subscriptionExpires = e, this._subscriptionExpiresLastSet = Math.floor(Date.now() / 1e3), this.autoRefresh) {
      const t = this.subscriptionRefresh;
      (t === void 0 || t >= e) && this.refreshTimerSet();
    }
  }
  get subscriptionExpiresInitial() {
    return this._subscriptionExpiresInitial;
  }
  /** Number of seconds until subscription auto refresh. */
  get subscriptionRefresh() {
    if (this._subscriptionRefresh === void 0 || this._subscriptionRefreshLastSet === void 0)
      return;
    const e = Math.floor(Date.now() / 1e3) - this._subscriptionRefreshLastSet, t = this._subscriptionRefresh - e;
    return Math.max(t, 0);
  }
  get subscriptionState() {
    return this._subscriptionState;
  }
  /**
   * Receive in dialog request message from transport.
   * @param message -  The incoming request message.
   */
  receiveRequest(e) {
    if (this.logger.log(`SUBSCRIBE dialog ${this.id} received ${e.method} request`), !this.sequenceGuard(e)) {
      this.logger.log(`SUBSCRIBE dialog ${this.id} rejected out of order ${e.method} request.`);
      return;
    }
    switch (super.receiveRequest(e), e.method) {
      case C.NOTIFY:
        this.onNotify(e);
        break;
      default:
        this.logger.log(`SUBSCRIBE dialog ${this.id} received unimplemented ${e.method} request`), this.core.replyStateless(e, { statusCode: 501 });
        break;
    }
  }
  /**
   * 4.1.2.2.  Refreshing of Subscriptions
   * https://tools.ietf.org/html/rfc6665#section-4.1.2.2
   */
  refresh() {
    const e = "Allow: " + Re.toString(), t = {};
    return t.extraHeaders = (t.extraHeaders || []).slice(), t.extraHeaders.push(e), t.extraHeaders.push("Event: " + this.subscriptionEvent), t.extraHeaders.push("Expires: " + this.subscriptionExpiresInitial), t.extraHeaders.push("Contact: " + this.core.configuration.contact.toString()), this.subscribe(void 0, t);
  }
  /**
   * 4.1.2.2.  Refreshing of Subscriptions
   * https://tools.ietf.org/html/rfc6665#section-4.1.2.2
   * @param delegate - Delegate to handle responses.
   * @param options - Options bucket.
   */
  subscribe(e, t = {}) {
    var r;
    if (this.subscriptionState !== O.Pending && this.subscriptionState !== O.Active)
      throw new Error(`Invalid state ${this.subscriptionState}. May only re-subscribe while in state "pending" or "active".`);
    this.logger.log(`SUBSCRIBE dialog ${this.id} sending SUBSCRIBE request`);
    const i = new Ei(this, e, t);
    return this.N && (clearTimeout(this.N), this.N = void 0), !((r = t.extraHeaders) === null || r === void 0) && r.includes("Expires: 0") || (this.N = setTimeout(() => this.timerN(), te.TIMER_N)), i;
  }
  /**
   * 4.4.1.  Dialog Creation and Termination
   * A subscription is destroyed after a notifier sends a NOTIFY request
   * with a "Subscription-State" of "terminated", or in certain error
   * situations described elsewhere in this document.
   * https://tools.ietf.org/html/rfc6665#section-4.4.1
   */
  terminate() {
    this.stateTransition(O.Terminated), this.onTerminated();
  }
  /**
   * 4.1.2.3.  Unsubscribing
   * https://tools.ietf.org/html/rfc6665#section-4.1.2.3
   */
  unsubscribe() {
    const e = "Allow: " + Re.toString(), t = {};
    return t.extraHeaders = (t.extraHeaders || []).slice(), t.extraHeaders.push(e), t.extraHeaders.push("Event: " + this.subscriptionEvent), t.extraHeaders.push("Expires: 0"), t.extraHeaders.push("Contact: " + this.core.configuration.contact.toString()), this.subscribe(void 0, t);
  }
  /**
   * Handle in dialog NOTIFY requests.
   * This does not include the first NOTIFY which created the dialog.
   * @param message - The incoming NOTIFY request message.
   */
  onNotify(e) {
    const t = e.parseHeader("Event").event;
    if (!t || t !== this.subscriptionEvent) {
      this.core.replyStateless(e, { statusCode: 489 });
      return;
    }
    this.N && (clearTimeout(this.N), this.N = void 0);
    const r = e.parseHeader("Subscription-State");
    if (!r || !r.state) {
      this.core.replyStateless(e, { statusCode: 489 });
      return;
    }
    const i = r.state, n = r.expires ? Math.max(r.expires, 0) : void 0;
    switch (i) {
      case "pending":
        this.stateTransition(O.Pending, n);
        break;
      case "active":
        this.stateTransition(O.Active, n);
        break;
      case "terminated":
        this.stateTransition(O.Terminated, n);
        break;
      default:
        this.logger.warn("Unrecognized subscription state.");
        break;
    }
    const a = new bt(this, e);
    this.delegate && this.delegate.onNotify ? this.delegate.onNotify(a) : a.accept();
  }
  onRefresh(e) {
    this.delegate && this.delegate.onRefresh && this.delegate.onRefresh(e);
  }
  onTerminated() {
    this.delegate && this.delegate.onTerminated && this.delegate.onTerminated();
  }
  refreshTimerClear() {
    this.refreshTimer && (clearTimeout(this.refreshTimer), this.refreshTimer = void 0);
  }
  refreshTimerSet() {
    if (this.refreshTimerClear(), this.autoRefresh && this.subscriptionExpires > 0) {
      const e = this.subscriptionExpires * 900;
      this._subscriptionRefresh = Math.floor(e / 1e3), this._subscriptionRefreshLastSet = Math.floor(Date.now() / 1e3), this.refreshTimer = setTimeout(() => {
        this.refreshTimer = void 0, this._subscriptionRefresh = void 0, this._subscriptionRefreshLastSet = void 0, this.onRefresh(this.refresh());
      }, e);
    }
  }
  stateTransition(e, t) {
    const r = () => {
      this.logger.warn(`Invalid subscription state transition from ${this.subscriptionState} to ${e}`);
    };
    switch (e) {
      case O.Initial:
        r();
        return;
      case O.NotifyWait:
        r();
        return;
      case O.Pending:
        if (this.subscriptionState !== O.NotifyWait && this.subscriptionState !== O.Pending) {
          r();
          return;
        }
        break;
      case O.Active:
        if (this.subscriptionState !== O.NotifyWait && this.subscriptionState !== O.Pending && this.subscriptionState !== O.Active) {
          r();
          return;
        }
        break;
      case O.Terminated:
        if (this.subscriptionState !== O.NotifyWait && this.subscriptionState !== O.Pending && this.subscriptionState !== O.Active) {
          r();
          return;
        }
        break;
      default:
        r();
        return;
    }
    e === O.Pending && t && (this.subscriptionExpires = t), e === O.Active && t && (this.subscriptionExpires = t), e === O.Terminated && this.dispose(), this._subscriptionState = e;
  }
  /**
   * When refreshing a subscription, a subscriber starts Timer N, set to
   * 64*T1, when it sends the SUBSCRIBE request.  If this Timer N expires
   * prior to the receipt of a NOTIFY request, the subscriber considers
   * the subscription terminated.  If the subscriber receives a success
   * response to the SUBSCRIBE request that indicates that no NOTIFY
   * request will be generated -- such as the 204 response defined for use
   * with the optional extension described in [RFC5839] -- then it MUST
   * cancel Timer N.
   * https://tools.ietf.org/html/rfc6665#section-4.1.2.2
   */
  timerN() {
    this.logger.warn("Timer N expired for SUBSCRIBE dialog. Timed out waiting for NOTIFY."), this.subscriptionState !== O.Terminated && (this.stateTransition(O.Terminated), this.onTerminated());
  }
}
class Ci extends ie {
  constructor(e, t, r) {
    const i = t.getHeader("Event");
    if (!i)
      throw new Error("Event undefined");
    const n = t.getHeader("Expires");
    if (!n)
      throw new Error("Expires undefined");
    super(ce, e, t, r), this.delegate = r, this.subscriberId = t.callId + t.fromTag + i, this.subscriptionExpiresRequested = this.subscriptionExpires = Number(n), this.subscriptionEvent = i, this.subscriptionState = O.NotifyWait, this.waitNotifyStart();
  }
  /**
   * Destructor.
   * Note that Timer N may live on waiting for an initial NOTIFY and
   * the delegate may still receive that NOTIFY. If you don't want
   * that behavior then either clear the delegate so the delegate
   * doesn't get called (a 200 will be sent in response to the NOTIFY)
   * or call `waitNotifyStop` which will clear Timer N and remove this
   * UAC from the core (a 481 will be sent in response to the NOTIFY).
   */
  dispose() {
    super.dispose();
  }
  /**
   * Handle out of dialog NOTIFY associated with SUBSCRIBE request.
   * This is the first NOTIFY received after the SUBSCRIBE request.
   * @param uas - User agent server handling the subscription creating NOTIFY.
   */
  onNotify(e) {
    const t = e.message.parseHeader("Event").event;
    if (!t || t !== this.subscriptionEvent) {
      this.logger.warn("Failed to parse event."), e.reject({ statusCode: 489 });
      return;
    }
    const r = e.message.parseHeader("Subscription-State");
    if (!r || !r.state) {
      this.logger.warn("Failed to parse subscription state."), e.reject({ statusCode: 489 });
      return;
    }
    const i = r.state;
    switch (i) {
      case "pending":
        break;
      case "active":
        break;
      case "terminated":
        break;
      default:
        this.logger.warn(`Invalid subscription state ${i}`), e.reject({ statusCode: 489 });
        return;
    }
    if (i !== "terminated" && !e.message.parseHeader("contact")) {
      this.logger.warn("Failed to parse contact."), e.reject({ statusCode: 489 });
      return;
    }
    if (this.dialog)
      throw new Error("Dialog already created. This implementation only supports install of single subscriptions.");
    switch (this.waitNotifyStop(), this.subscriptionExpires = r.expires ? Math.min(this.subscriptionExpires, Math.max(r.expires, 0)) : this.subscriptionExpires, i) {
      case "pending":
        this.subscriptionState = O.Pending;
        break;
      case "active":
        this.subscriptionState = O.Active;
        break;
      case "terminated":
        this.subscriptionState = O.Terminated;
        break;
      default:
        throw new Error(`Unrecognized state ${i}.`);
    }
    if (this.subscriptionState !== O.Terminated) {
      const n = ir.initialDialogStateForSubscription(this.message, e.message);
      this.dialog = new ir(this.subscriptionEvent, this.subscriptionExpires, this.subscriptionState, this.core, n);
    }
    if (this.delegate && this.delegate.onNotify) {
      const n = e, a = this.dialog;
      this.delegate.onNotify({ request: n, subscription: a });
    } else
      e.accept();
  }
  waitNotifyStart() {
    this.N || (this.core.subscribers.set(this.subscriberId, this), this.N = setTimeout(() => this.timerN(), te.TIMER_N));
  }
  waitNotifyStop() {
    this.N && (this.core.subscribers.delete(this.subscriberId), clearTimeout(this.N), this.N = void 0);
  }
  /**
   * Receive a response from the transaction layer.
   * @param message - Incoming response message.
   */
  receiveResponse(e) {
    if (this.authenticationGuard(e)) {
      if (e.statusCode && e.statusCode >= 200 && e.statusCode < 300) {
        const t = e.getHeader("Expires");
        if (!t)
          this.logger.warn("Expires header missing in a 200-class response to SUBSCRIBE");
        else {
          const r = Number(t);
          r > this.subscriptionExpiresRequested && this.logger.warn("Expires header in a 200-class response to SUBSCRIBE with a higher value than the one in the request"), r < this.subscriptionExpires && (this.subscriptionExpires = r);
        }
        this.dialog && this.dialog.subscriptionExpires > this.subscriptionExpires && (this.dialog.subscriptionExpires = this.subscriptionExpires);
      }
      e.statusCode && e.statusCode >= 300 && e.statusCode < 700 && this.waitNotifyStop(), super.receiveResponse(e);
    }
  }
  /**
   * To ensure that subscribers do not wait indefinitely for a
   * subscription to be established, a subscriber starts a Timer N, set to
   * 64*T1, when it sends a SUBSCRIBE request.  If this Timer N expires
   * prior to the receipt of a NOTIFY request, the subscriber considers
   * the subscription failed, and cleans up any state associated with the
   * subscription attempt.
   * https://tools.ietf.org/html/rfc6665#section-4.1.2.4
   */
  timerN() {
    this.logger.warn("Timer N expired for SUBSCRIBE user agent client. Timed out waiting for NOTIFY."), this.waitNotifyStop(), this.delegate && this.delegate.onNotifyTimeout && this.delegate.onNotifyTimeout();
  }
}
class Ri extends be {
  constructor(e, t, r) {
    super(oe, e, t, r), this.core = e;
  }
}
const sr = ["application/sdp", "application/dtmf-relay"];
class $i {
  /**
   * Constructor.
   * @param configuration - Configuration.
   * @param delegate - Delegate.
   */
  constructor(e, t = {}) {
    this.userAgentClients = /* @__PURE__ */ new Map(), this.userAgentServers = /* @__PURE__ */ new Map(), this.configuration = e, this.delegate = t, this.dialogs = /* @__PURE__ */ new Map(), this.subscribers = /* @__PURE__ */ new Map(), this.logger = e.loggerFactory.getLogger("sip.user-agent-core");
  }
  /** Destructor. */
  dispose() {
    this.reset();
  }
  /** Reset. */
  reset() {
    this.dialogs.forEach((e) => e.dispose()), this.dialogs.clear(), this.subscribers.forEach((e) => e.dispose()), this.subscribers.clear(), this.userAgentClients.forEach((e) => e.dispose()), this.userAgentClients.clear(), this.userAgentServers.forEach((e) => e.dispose()), this.userAgentServers.clear();
  }
  /** Logger factory. */
  get loggerFactory() {
    return this.configuration.loggerFactory;
  }
  /** Transport. */
  get transport() {
    const e = this.configuration.transportAccessor();
    if (!e)
      throw new Error("Transport undefined.");
    return e;
  }
  /**
   * Send INVITE.
   * @param request - Outgoing request.
   * @param delegate - Request delegate.
   */
  invite(e, t) {
    return new bi(this, e, t);
  }
  /**
   * Send MESSAGE.
   * @param request - Outgoing request.
   * @param delegate - Request delegate.
   */
  message(e, t) {
    return new xr(this, e, t);
  }
  /**
   * Send PUBLISH.
   * @param request - Outgoing request.
   * @param delegate - Request delegate.
   */
  publish(e, t) {
    return new Si(this, e, t);
  }
  /**
   * Send REGISTER.
   * @param request - Outgoing request.
   * @param delegate - Request delegate.
   */
  register(e, t) {
    return new Ti(this, e, t);
  }
  /**
   * Send SUBSCRIBE.
   * @param request - Outgoing request.
   * @param delegate - Request delegate.
   */
  subscribe(e, t) {
    return new Ci(this, e, t);
  }
  /**
   * Send a request.
   * @param request - Outgoing request.
   * @param delegate - Request delegate.
   */
  request(e, t) {
    return new ie(ce, this, e, t);
  }
  /**
   * Outgoing request message factory function.
   * @param method - Method.
   * @param requestURI - Request-URI.
   * @param fromURI - From URI.
   * @param toURI - To URI.
   * @param options - Request options.
   * @param extraHeaders - Extra headers to add.
   * @param body - Message body.
   */
  makeOutgoingRequestMessage(e, t, r, i, n, a, o) {
    const d = this.configuration.sipjsId, h = this.configuration.displayName, u = this.configuration.viaForceRport, f = this.configuration.hackViaTcp, w = this.configuration.supportedOptionTags.slice();
    e === C.REGISTER && w.push("path", "gruu"), e === C.INVITE && (this.configuration.contact.pubGruu || this.configuration.contact.tempGruu) && w.push("gruu");
    const T = this.configuration.routeSet, R = this.configuration.userAgentHeaderFieldValue, S = this.configuration.viaHost, g = Object.assign(Object.assign({}, {
      callIdPrefix: d,
      forceRport: u,
      fromDisplayName: h,
      hackViaTcp: f,
      optionTags: w,
      routeSet: T,
      userAgentString: R,
      viaHost: S
    }), n);
    return new He(e, t, r, i, g, a, o);
  }
  /**
   * Handle an incoming request message from the transport.
   * @param message - Incoming request message from transport layer.
   */
  receiveIncomingRequestFromTransport(e) {
    this.receiveRequestFromTransport(e);
  }
  /**
   * Handle an incoming response message from the transport.
   * @param message - Incoming response message from transport layer.
   */
  receiveIncomingResponseFromTransport(e) {
    this.receiveResponseFromTransport(e);
  }
  /**
   * A stateless UAS is a UAS that does not maintain transaction state.
   * It replies to requests normally, but discards any state that would
   * ordinarily be retained by a UAS after a response has been sent.  If a
   * stateless UAS receives a retransmission of a request, it regenerates
   * the response and re-sends it, just as if it were replying to the first
   * instance of the request. A UAS cannot be stateless unless the request
   * processing for that method would always result in the same response
   * if the requests are identical. This rules out stateless registrars,
   * for example.  Stateless UASs do not use a transaction layer; they
   * receive requests directly from the transport layer and send responses
   * directly to the transport layer.
   * https://tools.ietf.org/html/rfc3261#section-8.2.7
   * @param message - Incoming request message to reply to.
   * @param statusCode - Status code to reply with.
   */
  replyStateless(e, t) {
    const r = this.configuration.userAgentHeaderFieldValue, i = this.configuration.supportedOptionTagsResponse;
    t = Object.assign(Object.assign({}, t), { userAgent: r, supported: i });
    const n = br(e, t);
    return this.transport.send(n.message).catch((a) => {
      a instanceof Error && this.logger.error(a.message), this.logger.error(`Transport error occurred sending stateless reply to ${e.method} request.`);
    }), n;
  }
  /**
   * In Section 18.2.1, replace the last paragraph with:
   *
   * Next, the server transport attempts to match the request to a
   * server transaction.  It does so using the matching rules described
   * in Section 17.2.3.  If a matching server transaction is found, the
   * request is passed to that transaction for processing.  If no match
   * is found, the request is passed to the core, which may decide to
   * construct a new server transaction for that request.
   * https://tools.ietf.org/html/rfc6026#section-8.10
   * @param message - Incoming request message from transport layer.
   */
  receiveRequestFromTransport(e) {
    const t = e.viaBranch, r = this.userAgentServers.get(t);
    if (e.method === C.ACK && r && r.transaction.state === v.Accepted && r instanceof Ht) {
      this.logger.warn(`Discarding out of dialog ACK after 2xx response sent on transaction ${t}.`);
      return;
    }
    if (e.method === C.CANCEL) {
      r ? (this.replyStateless(e, { statusCode: 200 }), r.transaction instanceof ne && r.transaction.state === v.Proceeding && r instanceof Ht && r.receiveCancel(e)) : this.replyStateless(e, { statusCode: 481 });
      return;
    }
    if (r) {
      r.transaction.receiveRequest(e);
      return;
    }
    this.receiveRequest(e);
  }
  /**
   * UAC and UAS procedures depend strongly on two factors.  First, based
   * on whether the request or response is inside or outside of a dialog,
   * and second, based on the method of a request.  Dialogs are discussed
   * thoroughly in Section 12; they represent a peer-to-peer relationship
   * between user agents and are established by specific SIP methods, such
   * as INVITE.
   * @param message - Incoming request message.
   */
  receiveRequest(e) {
    if (!Re.includes(e.method)) {
      const i = "Allow: " + Re.toString();
      this.replyStateless(e, {
        statusCode: 405,
        extraHeaders: [i]
      });
      return;
    }
    if (!e.ruri)
      throw new Error("Request-URI undefined.");
    if (e.ruri.scheme !== "sip") {
      this.replyStateless(e, { statusCode: 416 });
      return;
    }
    const t = e.ruri, r = (i) => !!i && i.user === t.user;
    if (!r(this.configuration.aor) && !(r(this.configuration.contact.uri) || r(this.configuration.contact.pubGruu) || r(this.configuration.contact.tempGruu))) {
      this.logger.warn("Request-URI does not point to us."), e.method !== C.ACK && this.replyStateless(e, { statusCode: 404 });
      return;
    }
    if (e.method === C.INVITE && !e.hasHeader("Contact")) {
      this.replyStateless(e, {
        statusCode: 400,
        reasonPhrase: "Missing Contact Header"
      });
      return;
    }
    if (!e.toTag) {
      const i = e.viaBranch;
      if (!this.userAgentServers.has(i) && Array.from(this.userAgentServers.values()).some((a) => a.transaction.request.fromTag === e.fromTag && a.transaction.request.callId === e.callId && a.transaction.request.cseq === e.cseq)) {
        this.replyStateless(e, { statusCode: 482 });
        return;
      }
    }
    e.toTag ? this.receiveInsideDialogRequest(e) : this.receiveOutsideDialogRequest(e);
  }
  /**
   * Once a dialog has been established between two UAs, either of them
   * MAY initiate new transactions as needed within the dialog.  The UA
   * sending the request will take the UAC role for the transaction.  The
   * UA receiving the request will take the UAS role.  Note that these may
   * be different roles than the UAs held during the transaction that
   * established the dialog.
   * https://tools.ietf.org/html/rfc3261#section-12.2
   * @param message - Incoming request message.
   */
  receiveInsideDialogRequest(e) {
    if (e.method === C.NOTIFY) {
      const i = e.parseHeader("Event");
      if (!i || !i.event) {
        this.replyStateless(e, { statusCode: 489 });
        return;
      }
      const n = e.callId + e.toTag + i.event, a = this.subscribers.get(n);
      if (a) {
        const o = new bt(this, e);
        a.onNotify(o);
        return;
      }
    }
    const t = e.callId + e.toTag + e.fromTag, r = this.dialogs.get(t);
    if (r) {
      if (e.method === C.OPTIONS) {
        const i = "Allow: " + Re.toString(), n = "Accept: " + sr.toString();
        this.replyStateless(e, {
          statusCode: 200,
          extraHeaders: [i, n]
        });
        return;
      }
      r.receiveRequest(e);
      return;
    }
    e.method !== C.ACK && this.replyStateless(e, { statusCode: 481 });
  }
  /**
   * Assuming all of the checks in the previous subsections are passed,
   * the UAS processing becomes method-specific.
   *  https://tools.ietf.org/html/rfc3261#section-8.2.5
   * @param message - Incoming request message.
   */
  receiveOutsideDialogRequest(e) {
    switch (e.method) {
      case C.ACK:
        break;
      case C.BYE:
        this.replyStateless(e, { statusCode: 481 });
        break;
      case C.CANCEL:
        throw new Error(`Unexpected out of dialog request method ${e.method}.`);
      case C.INFO:
        this.replyStateless(e, { statusCode: 405 });
        break;
      case C.INVITE:
        {
          const t = new Ht(this, e);
          this.delegate.onInvite ? this.delegate.onInvite(t) : t.reject();
        }
        break;
      case C.MESSAGE:
        {
          const t = new Er(this, e);
          this.delegate.onMessage ? this.delegate.onMessage(t) : t.accept();
        }
        break;
      case C.NOTIFY:
        {
          const t = new bt(this, e);
          this.delegate.onNotify ? this.delegate.onNotify(t) : t.reject({ statusCode: 405 });
        }
        break;
      case C.OPTIONS:
        {
          const t = "Allow: " + Re.toString(), r = "Accept: " + sr.toString();
          this.replyStateless(e, {
            statusCode: 200,
            extraHeaders: [t, r]
          });
        }
        break;
      case C.REFER:
        {
          const t = new Cr(this, e);
          this.delegate.onRefer ? this.delegate.onRefer(t) : t.reject({ statusCode: 405 });
        }
        break;
      case C.REGISTER:
        {
          const t = new xi(this, e);
          this.delegate.onRegister ? this.delegate.onRegister(t) : t.reject({ statusCode: 405 });
        }
        break;
      case C.SUBSCRIBE:
        {
          const t = new Ri(this, e);
          this.delegate.onSubscribe ? this.delegate.onSubscribe(t) : t.reject({ statusCode: 480 });
        }
        break;
      default:
        throw new Error(`Unexpected out of dialog request method ${e.method}.`);
    }
  }
  /**
   * Responses are first processed by the transport layer and then passed
   * up to the transaction layer.  The transaction layer performs its
   * processing and then passes the response up to the TU.  The majority
   * of response processing in the TU is method specific.  However, there
   * are some general behaviors independent of the method.
   * https://tools.ietf.org/html/rfc3261#section-8.1.3
   * @param message - Incoming response message from transport layer.
   */
  receiveResponseFromTransport(e) {
    if (e.getHeaders("via").length > 1) {
      this.logger.warn("More than one Via header field present in the response, dropping");
      return;
    }
    const t = e.viaBranch + e.method, r = this.userAgentClients.get(t);
    r ? r.transaction.receiveResponse(e) : this.logger.warn(`Discarding unmatched ${e.statusCode} response to ${e.method} ${t}.`);
  }
}
function Rr() {
  return (s) => !s.audio && !s.video ? Promise.resolve(new MediaStream()) : navigator.mediaDevices === void 0 ? Promise.reject(new Error("Media devices not available in insecure contexts.")) : navigator.mediaDevices.getUserMedia.call(navigator.mediaDevices, s);
}
function $r() {
  return {
    bundlePolicy: "balanced",
    certificates: void 0,
    iceCandidatePoolSize: 0,
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    iceTransportPolicy: "all",
    rtcpMuxPolicy: "require"
  };
}
class re {
  /**
   * Constructor
   * @param logger - A logger
   * @param mediaStreamFactory - A factory to provide a MediaStream
   * @param options - Options passed from the SessionDescriptionHandleFactory
   */
  constructor(e, t, r) {
    e.debug("SessionDescriptionHandler.constructor"), this.logger = e, this.mediaStreamFactory = t, this.sessionDescriptionHandlerConfiguration = r, this._localMediaStream = new MediaStream(), this._remoteMediaStream = new MediaStream(), this._peerConnection = new RTCPeerConnection(r == null ? void 0 : r.peerConnectionConfiguration), this.initPeerConnectionEventHandlers();
  }
  /**
   * The local media stream currently being sent.
   *
   * @remarks
   * The local media stream initially has no tracks, so the presence of tracks
   * should not be assumed. Furthermore, tracks may be added or removed if the
   * local media changes - for example, on upgrade from audio only to a video session.
   * At any given time there will be at most one audio track and one video track
   * (it's possible that this restriction may not apply to sub-classes).
   * Use `MediaStream.onaddtrack` or add a listener for the `addtrack` event
   * to detect when a new track becomes available:
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/onaddtrack
   */
  get localMediaStream() {
    return this._localMediaStream;
  }
  /**
   * The remote media stream currently being received.
   *
   * @remarks
   * The remote media stream initially has no tracks, so the presence of tracks
   * should not be assumed. Furthermore, tracks may be added or removed if the
   * remote media changes - for example, on upgrade from audio only to a video session.
   * At any given time there will be at most one audio track and one video track
   * (it's possible that this restriction may not apply to sub-classes).
   * Use `MediaStream.onaddtrack` or add a listener for the `addtrack` event
   * to detect when a new track becomes available:
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/onaddtrack
   */
  get remoteMediaStream() {
    return this._remoteMediaStream;
  }
  /**
   * The data channel. Undefined before it is created.
   */
  get dataChannel() {
    return this._dataChannel;
  }
  /**
   * The peer connection. Undefined if peer connection has closed.
   *
   * @remarks
   * Use the peerConnectionDelegate to get access to the events associated
   * with the RTCPeerConnection. For example...
   *
   * Do NOT do this...
   * ```ts
   * peerConnection.onicecandidate = (event) => {
   *   // do something
   * };
   * ```
   * Instead, do this...
   * ```ts
   * peerConnection.peerConnectionDelegate = {
   *   onicecandidate: (event) => {
   *     // do something
   *   }
   * };
   * ```
   * While access to the underlying `RTCPeerConnection` is provided, note that
   * using methods which modify it may break the operation of this class.
   * In particular, this class depends on exclusive access to the
   * event handler properties. If you need access to the peer connection
   * events, either register for events using `addEventListener()` on
   * the `RTCPeerConnection` or set the `peerConnectionDelegate` on
   * this `SessionDescriptionHandler`.
   */
  get peerConnection() {
    return this._peerConnection;
  }
  /**
   * A delegate which provides access to the peer connection event handlers.
   *
   * @remarks
   * Use the peerConnectionDelegate to get access to the events associated
   * with the RTCPeerConnection. For example...
   *
   * Do NOT do this...
   * ```ts
   * peerConnection.onicecandidate = (event) => {
   *   // do something
   * };
   * ```
   * Instead, do this...
   * ```
   * peerConnection.peerConnectionDelegate = {
   *   onicecandidate: (event) => {
   *     // do something
   *   }
   * };
   * ```
   * Setting the peer connection event handlers directly is not supported
   * and may break this class. As this class depends on exclusive access
   * to them. This delegate is intended to provide access to the
   * RTCPeerConnection events in a fashion which is supported.
   */
  get peerConnectionDelegate() {
    return this._peerConnectionDelegate;
  }
  set peerConnectionDelegate(e) {
    this._peerConnectionDelegate = e;
  }
  // The addtrack event does not get fired when JavaScript code explicitly adds tracks to the stream (by calling addTrack()).
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/onaddtrack
  static dispatchAddTrackEvent(e, t) {
    e.dispatchEvent(new MediaStreamTrackEvent("addtrack", { track: t }));
  }
  // The removetrack event does not get fired when JavaScript code explicitly removes tracks from the stream (by calling removeTrack()).
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/onremovetrack
  static dispatchRemoveTrackEvent(e, t) {
    e.dispatchEvent(new MediaStreamTrackEvent("removetrack", { track: t }));
  }
  /**
   * Stop tracks and close peer connection.
   */
  close() {
    this.logger.debug("SessionDescriptionHandler.close"), this._peerConnection !== void 0 && (this._peerConnection.getReceivers().forEach((e) => {
      e.track && e.track.stop();
    }), this._peerConnection.getSenders().forEach((e) => {
      e.track && e.track.stop();
    }), this._dataChannel && this._dataChannel.close(), this._peerConnection.close(), this._peerConnection = void 0);
  }
  /**
   * Helper function to enable/disable media tracks.
   * @param enable - If true enable tracks, otherwise disable tracks.
   */
  enableReceiverTracks(e) {
    const t = this.peerConnection;
    if (!t)
      throw new Error("Peer connection closed.");
    t.getReceivers().forEach((r) => {
      r.track && (r.track.enabled = e);
    });
  }
  /**
   * Helper function to enable/disable media tracks.
   * @param enable - If true enable tracks, otherwise disable tracks.
   */
  enableSenderTracks(e) {
    const t = this.peerConnection;
    if (!t)
      throw new Error("Peer connection closed.");
    t.getSenders().forEach((r) => {
      r.track && (r.track.enabled = e);
    });
  }
  /**
   * Creates an offer or answer.
   * @param options - Options bucket.
   * @param modifiers - Modifiers.
   */
  getDescription(e, t) {
    var r, i;
    if (this.logger.debug("SessionDescriptionHandler.getDescription"), this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    this.onDataChannel = e == null ? void 0 : e.onDataChannel;
    const n = (r = e == null ? void 0 : e.offerOptions) === null || r === void 0 ? void 0 : r.iceRestart, a = (e == null ? void 0 : e.iceGatheringTimeout) === void 0 ? (i = this.sessionDescriptionHandlerConfiguration) === null || i === void 0 ? void 0 : i.iceGatheringTimeout : e == null ? void 0 : e.iceGatheringTimeout;
    return this.getLocalMediaStream(e).then(() => this.updateDirection(e)).then(() => this.createDataChannel(e)).then(() => this.createLocalOfferOrAnswer(e)).then((o) => this.applyModifiers(o, t)).then((o) => this.setLocalSessionDescription(o)).then(() => this.waitForIceGatheringComplete(n, a)).then(() => this.getLocalSessionDescription()).then((o) => ({
      body: o.sdp,
      contentType: "application/sdp"
    })).catch((o) => {
      throw this.logger.error("SessionDescriptionHandler.getDescription failed - " + o), o;
    });
  }
  /**
   * Returns true if the SessionDescriptionHandler can handle the Content-Type described by a SIP message.
   * @param contentType - The content type that is in the SIP Message.
   */
  hasDescription(e) {
    return this.logger.debug("SessionDescriptionHandler.hasDescription"), e === "application/sdp";
  }
  /**
   * Called when ICE gathering completes and resolves any waiting promise.
   * @remarks
   * May be called prior to ICE gathering actually completing to allow the
   * session descirption handler proceed with whatever candidates have been
   * gathered up to this point in time. Use this to stop waiting on ICE to
   * complete if you are implementing your own ICE gathering completion strategy.
   */
  iceGatheringComplete() {
    this.logger.debug("SessionDescriptionHandler.iceGatheringComplete"), this.iceGatheringCompleteTimeoutId !== void 0 && (this.logger.debug("SessionDescriptionHandler.iceGatheringComplete - clearing timeout"), clearTimeout(this.iceGatheringCompleteTimeoutId), this.iceGatheringCompleteTimeoutId = void 0), this.iceGatheringCompletePromise !== void 0 && (this.logger.debug("SessionDescriptionHandler.iceGatheringComplete - resolving promise"), this.iceGatheringCompleteResolve && this.iceGatheringCompleteResolve(), this.iceGatheringCompletePromise = void 0, this.iceGatheringCompleteResolve = void 0, this.iceGatheringCompleteReject = void 0);
  }
  /**
   * Send DTMF via RTP (RFC 4733).
   * Returns true if DTMF send is successful, false otherwise.
   * @param tones - A string containing DTMF digits.
   * @param options - Options object to be used by sendDtmf.
   */
  sendDtmf(e, t) {
    if (this.logger.debug("SessionDescriptionHandler.sendDtmf"), this._peerConnection === void 0)
      return this.logger.error("SessionDescriptionHandler.sendDtmf failed - peer connection closed"), !1;
    const r = this._peerConnection.getSenders();
    if (r.length === 0)
      return this.logger.error("SessionDescriptionHandler.sendDtmf failed - no senders"), !1;
    const i = r[0].dtmf;
    if (!i)
      return this.logger.error("SessionDescriptionHandler.sendDtmf failed - no DTMF sender"), !1;
    const n = t == null ? void 0 : t.duration, a = t == null ? void 0 : t.interToneGap;
    try {
      i.insertDTMF(e, n, a);
    } catch (o) {
      return this.logger.error(o.toString()), !1;
    }
    return this.logger.log("SessionDescriptionHandler.sendDtmf sent via RTP: " + e.toString()), !0;
  }
  /**
   * Sets an offer or answer.
   * @param sdp - The session description.
   * @param options - Options bucket.
   * @param modifiers - Modifiers.
   */
  setDescription(e, t, r) {
    if (this.logger.debug("SessionDescriptionHandler.setDescription"), this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    this.onDataChannel = t == null ? void 0 : t.onDataChannel;
    const i = this._peerConnection.signalingState === "have-local-offer" ? "answer" : "offer";
    return this.getLocalMediaStream(t).then(() => this.applyModifiers({ sdp: e, type: i }, r)).then((n) => this.setRemoteSessionDescription(n)).catch((n) => {
      throw this.logger.error("SessionDescriptionHandler.setDescription failed - " + n), n;
    });
  }
  /**
   * Applies modifiers to SDP prior to setting the local or remote description.
   * @param sdp - SDP to modify.
   * @param modifiers - Modifiers to apply.
   */
  applyModifiers(e, t) {
    return this.logger.debug("SessionDescriptionHandler.applyModifiers"), !t || t.length === 0 ? Promise.resolve(e) : t.reduce((r, i) => r.then(i), Promise.resolve(e)).then((r) => {
      if (this.logger.debug("SessionDescriptionHandler.applyModifiers - modified sdp"), !r.sdp || !r.type)
        throw new Error("Invalid SDP.");
      return { sdp: r.sdp, type: r.type };
    });
  }
  /**
   * Create a data channel.
   * @remarks
   * Only creates a data channel if SessionDescriptionHandlerOptions.dataChannel is true.
   * Only creates a data channel if creating a local offer.
   * Only if one does not already exist.
   * @param options - Session description handler options.
   */
  createDataChannel(e) {
    if (this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    if ((e == null ? void 0 : e.dataChannel) !== !0 || this._dataChannel)
      return Promise.resolve();
    switch (this._peerConnection.signalingState) {
      case "stable":
        this.logger.debug("SessionDescriptionHandler.createDataChannel - creating data channel");
        try {
          return this._dataChannel = this._peerConnection.createDataChannel((e == null ? void 0 : e.dataChannelLabel) || "", e == null ? void 0 : e.dataChannelOptions), this.onDataChannel && this.onDataChannel(this._dataChannel), Promise.resolve();
        } catch (t) {
          return Promise.reject(t);
        }
      case "have-remote-offer":
        return Promise.resolve();
      case "have-local-offer":
      case "have-local-pranswer":
      case "have-remote-pranswer":
      case "closed":
      default:
        return Promise.reject(new Error("Invalid signaling state " + this._peerConnection.signalingState));
    }
  }
  /**
   * Depending on current signaling state, create a local offer or answer.
   * @param options - Session description handler options.
   */
  createLocalOfferOrAnswer(e) {
    if (this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    switch (this._peerConnection.signalingState) {
      case "stable":
        return this.logger.debug("SessionDescriptionHandler.createLocalOfferOrAnswer - creating SDP offer"), this._peerConnection.createOffer(e == null ? void 0 : e.offerOptions);
      case "have-remote-offer":
        return this.logger.debug("SessionDescriptionHandler.createLocalOfferOrAnswer - creating SDP answer"), this._peerConnection.createAnswer(e == null ? void 0 : e.answerOptions);
      case "have-local-offer":
      case "have-local-pranswer":
      case "have-remote-pranswer":
      case "closed":
      default:
        return Promise.reject(new Error("Invalid signaling state " + this._peerConnection.signalingState));
    }
  }
  /**
   * Get a media stream from the media stream factory and set the local media stream.
   * @param options - Session description handler options.
   */
  getLocalMediaStream(e) {
    if (this.logger.debug("SessionDescriptionHandler.getLocalMediaStream"), this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    let t = Object.assign({}, e == null ? void 0 : e.constraints);
    if (this.localMediaStreamConstraints) {
      if (t.audio = t.audio || this.localMediaStreamConstraints.audio, t.video = t.video || this.localMediaStreamConstraints.video, JSON.stringify(this.localMediaStreamConstraints.audio) === JSON.stringify(t.audio) && JSON.stringify(this.localMediaStreamConstraints.video) === JSON.stringify(t.video))
        return Promise.resolve();
    } else
      t.audio === void 0 && t.video === void 0 && (t = { audio: !0 });
    return this.localMediaStreamConstraints = t, this.mediaStreamFactory(t, this, e).then((r) => this.setLocalMediaStream(r));
  }
  /**
   * Sets the peer connection's sender tracks and local media stream tracks.
   *
   * @remarks
   * Only the first audio and video tracks of the provided MediaStream are utilized.
   * Adds tracks if audio and/or video tracks are not already present, otherwise replaces tracks.
   *
   * @param stream - Media stream containing tracks to be utilized.
   */
  setLocalMediaStream(e) {
    if (this.logger.debug("SessionDescriptionHandler.setLocalMediaStream"), !this._peerConnection)
      throw new Error("Peer connection undefined.");
    const t = this._peerConnection, r = this._localMediaStream, i = [], n = (d) => {
      const h = d.kind;
      if (h !== "audio" && h !== "video")
        throw new Error(`Unknown new track kind ${h}.`);
      const u = t.getSenders().find((f) => f.track && f.track.kind === h);
      u ? i.push(new Promise((f) => {
        this.logger.debug(`SessionDescriptionHandler.setLocalMediaStream - replacing sender ${h} track`), f();
      }).then(() => u.replaceTrack(d).then(() => {
        const f = r.getTracks().find((w) => w.kind === h);
        f && (f.stop(), r.removeTrack(f), re.dispatchRemoveTrackEvent(r, f)), r.addTrack(d), re.dispatchAddTrackEvent(r, d);
      }).catch((f) => {
        throw this.logger.error(`SessionDescriptionHandler.setLocalMediaStream - failed to replace sender ${h} track`), f;
      }))) : i.push(new Promise((f) => {
        this.logger.debug(`SessionDescriptionHandler.setLocalMediaStream - adding sender ${h} track`), f();
      }).then(() => {
        try {
          t.addTrack(d, r);
        } catch (f) {
          throw this.logger.error(`SessionDescriptionHandler.setLocalMediaStream - failed to add sender ${h} track`), f;
        }
        r.addTrack(d), re.dispatchAddTrackEvent(r, d);
      }));
    }, a = e.getAudioTracks();
    a.length && n(a[0]);
    const o = e.getVideoTracks();
    return o.length && n(o[0]), i.reduce((d, h) => d.then(() => h), Promise.resolve());
  }
  /**
   * Gets the peer connection's local session description.
   */
  getLocalSessionDescription() {
    if (this.logger.debug("SessionDescriptionHandler.getLocalSessionDescription"), this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    const e = this._peerConnection.localDescription;
    return e ? Promise.resolve(e) : Promise.reject(new Error("Failed to get local session description"));
  }
  /**
   * Sets the peer connection's local session description.
   * @param sessionDescription - sessionDescription The session description.
   */
  setLocalSessionDescription(e) {
    return this.logger.debug("SessionDescriptionHandler.setLocalSessionDescription"), this._peerConnection === void 0 ? Promise.reject(new Error("Peer connection closed.")) : this._peerConnection.setLocalDescription(e);
  }
  /**
   * Sets the peer connection's remote session description.
   * @param sessionDescription - The session description.
   */
  setRemoteSessionDescription(e) {
    if (this.logger.debug("SessionDescriptionHandler.setRemoteSessionDescription"), this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    const t = e.sdp;
    let r;
    switch (this._peerConnection.signalingState) {
      case "stable":
        r = "offer";
        break;
      case "have-local-offer":
        r = "answer";
        break;
      case "have-local-pranswer":
      case "have-remote-offer":
      case "have-remote-pranswer":
      case "closed":
      default:
        return Promise.reject(new Error("Invalid signaling state " + this._peerConnection.signalingState));
    }
    return t ? this._peerConnection.setRemoteDescription({ sdp: t, type: r }) : (this.logger.error("SessionDescriptionHandler.setRemoteSessionDescription failed - cannot set null sdp"), Promise.reject(new Error("SDP is undefined")));
  }
  /**
   * Sets a remote media stream track.
   *
   * @remarks
   * Adds tracks if audio and/or video tracks are not already present, otherwise replaces tracks.
   *
   * @param track - Media stream track to be utilized.
   */
  setRemoteTrack(e) {
    this.logger.debug("SessionDescriptionHandler.setRemoteTrack");
    const t = this._remoteMediaStream;
    t.getTrackById(e.id) ? this.logger.debug(`SessionDescriptionHandler.setRemoteTrack - have remote ${e.kind} track`) : e.kind === "audio" ? (this.logger.debug(`SessionDescriptionHandler.setRemoteTrack - adding remote ${e.kind} track`), t.getAudioTracks().forEach((r) => {
      r.stop(), t.removeTrack(r), re.dispatchRemoveTrackEvent(t, r);
    }), t.addTrack(e), re.dispatchAddTrackEvent(t, e)) : e.kind === "video" && (this.logger.debug(`SessionDescriptionHandler.setRemoteTrack - adding remote ${e.kind} track`), t.getVideoTracks().forEach((r) => {
      r.stop(), t.removeTrack(r), re.dispatchRemoveTrackEvent(t, r);
    }), t.addTrack(e), re.dispatchAddTrackEvent(t, e));
  }
  /**
   * Depending on the current signaling state and the session hold state, update transceiver direction.
   * @param options - Session description handler options.
   */
  updateDirection(e) {
    if (this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    switch (this._peerConnection.signalingState) {
      case "stable":
        this.logger.debug("SessionDescriptionHandler.updateDirection - setting offer direction");
        {
          const t = (r) => {
            switch (r) {
              case "inactive":
                return e != null && e.hold ? "inactive" : "recvonly";
              case "recvonly":
                return e != null && e.hold ? "inactive" : "recvonly";
              case "sendonly":
                return e != null && e.hold ? "sendonly" : "sendrecv";
              case "sendrecv":
                return e != null && e.hold ? "sendonly" : "sendrecv";
              case "stopped":
                return "stopped";
              default:
                throw new Error("Should never happen");
            }
          };
          this._peerConnection.getTransceivers().forEach((r) => {
            if (r.direction) {
              const i = t(r.direction);
              r.direction !== i && (r.direction = i);
            }
          });
        }
        break;
      case "have-remote-offer":
        this.logger.debug("SessionDescriptionHandler.updateDirection - setting answer direction");
        {
          const t = (() => {
            const i = this._peerConnection.remoteDescription;
            if (!i)
              throw new Error("Failed to read remote offer");
            const n = /a=sendrecv\r\n|a=sendonly\r\n|a=recvonly\r\n|a=inactive\r\n/.exec(i.sdp);
            if (n)
              switch (n[0]) {
                case `a=inactive\r
`:
                  return "inactive";
                case `a=recvonly\r
`:
                  return "recvonly";
                case `a=sendonly\r
`:
                  return "sendonly";
                case `a=sendrecv\r
`:
                  return "sendrecv";
                default:
                  throw new Error("Should never happen");
              }
            return "sendrecv";
          })(), r = (() => {
            switch (t) {
              case "inactive":
                return "inactive";
              case "recvonly":
                return "sendonly";
              case "sendonly":
                return e != null && e.hold ? "inactive" : "recvonly";
              case "sendrecv":
                return e != null && e.hold ? "sendonly" : "sendrecv";
              default:
                throw new Error("Should never happen");
            }
          })();
          this._peerConnection.getTransceivers().forEach((i) => {
            i.direction && i.direction !== "stopped" && i.direction !== r && (i.direction = r);
          });
        }
        break;
      case "have-local-offer":
      case "have-local-pranswer":
      case "have-remote-pranswer":
      case "closed":
      default:
        return Promise.reject(new Error("Invalid signaling state " + this._peerConnection.signalingState));
    }
    return Promise.resolve();
  }
  /**
   * Wait for ICE gathering to complete.
   * @param restart - If true, waits if current state is "complete" (waits for transition to "complete").
   * @param timeout - Milliseconds after which waiting times out. No timeout if 0.
   */
  waitForIceGatheringComplete(e = !1, t = 0) {
    return this.logger.debug("SessionDescriptionHandler.waitForIceGatheringToComplete"), this._peerConnection === void 0 ? Promise.reject("Peer connection closed.") : !e && this._peerConnection.iceGatheringState === "complete" ? (this.logger.debug("SessionDescriptionHandler.waitForIceGatheringToComplete - already complete"), Promise.resolve()) : (this.iceGatheringCompletePromise !== void 0 && (this.logger.debug("SessionDescriptionHandler.waitForIceGatheringToComplete - rejecting prior waiting promise"), this.iceGatheringCompleteReject && this.iceGatheringCompleteReject(new Error("Promise superseded.")), this.iceGatheringCompletePromise = void 0, this.iceGatheringCompleteResolve = void 0, this.iceGatheringCompleteReject = void 0), this.iceGatheringCompletePromise = new Promise((r, i) => {
      this.iceGatheringCompleteResolve = r, this.iceGatheringCompleteReject = i, t > 0 && (this.logger.debug("SessionDescriptionHandler.waitForIceGatheringToComplete - timeout in " + t), this.iceGatheringCompleteTimeoutId = setTimeout(() => {
        this.logger.debug("SessionDescriptionHandler.waitForIceGatheringToComplete - timeout"), this.iceGatheringComplete();
      }, t));
    }), this.iceGatheringCompletePromise);
  }
  /**
   * Initializes the peer connection event handlers
   */
  initPeerConnectionEventHandlers() {
    if (this.logger.debug("SessionDescriptionHandler.initPeerConnectionEventHandlers"), !this._peerConnection)
      throw new Error("Peer connection undefined.");
    const e = this._peerConnection;
    e.onconnectionstatechange = (t) => {
      var r;
      const i = e.connectionState;
      this.logger.debug(`SessionDescriptionHandler.onconnectionstatechange ${i}`), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.onconnectionstatechange && this._peerConnectionDelegate.onconnectionstatechange(t);
    }, e.ondatachannel = (t) => {
      var r;
      this.logger.debug("SessionDescriptionHandler.ondatachannel"), this._dataChannel = t.channel, this.onDataChannel && this.onDataChannel(this._dataChannel), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.ondatachannel && this._peerConnectionDelegate.ondatachannel(t);
    }, e.onicecandidate = (t) => {
      var r;
      this.logger.debug("SessionDescriptionHandler.onicecandidate"), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.onicecandidate && this._peerConnectionDelegate.onicecandidate(t);
    }, e.onicecandidateerror = (t) => {
      var r;
      this.logger.debug("SessionDescriptionHandler.onicecandidateerror"), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.onicecandidateerror && this._peerConnectionDelegate.onicecandidateerror(t);
    }, e.oniceconnectionstatechange = (t) => {
      var r;
      const i = e.iceConnectionState;
      this.logger.debug(`SessionDescriptionHandler.oniceconnectionstatechange ${i}`), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.oniceconnectionstatechange && this._peerConnectionDelegate.oniceconnectionstatechange(t);
    }, e.onicegatheringstatechange = (t) => {
      var r;
      const i = e.iceGatheringState;
      this.logger.debug(`SessionDescriptionHandler.onicegatheringstatechange ${i}`), i === "complete" && this.iceGatheringComplete(), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.onicegatheringstatechange && this._peerConnectionDelegate.onicegatheringstatechange(t);
    }, e.onnegotiationneeded = (t) => {
      var r;
      this.logger.debug("SessionDescriptionHandler.onnegotiationneeded"), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.onnegotiationneeded && this._peerConnectionDelegate.onnegotiationneeded(t);
    }, e.onsignalingstatechange = (t) => {
      var r;
      const i = e.signalingState;
      this.logger.debug(`SessionDescriptionHandler.onsignalingstatechange ${i}`), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.onsignalingstatechange && this._peerConnectionDelegate.onsignalingstatechange(t);
    }, e.ontrack = (t) => {
      var r;
      const i = t.track.kind, n = t.track.enabled ? "enabled" : "disabled";
      this.logger.debug(`SessionDescriptionHandler.ontrack ${i} ${n}`), this.setRemoteTrack(t.track), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.ontrack && this._peerConnectionDelegate.ontrack(t);
    };
  }
}
function Ii(s) {
  return (e, t) => {
    s === void 0 && (s = Rr());
    const i = {
      iceGatheringTimeout: (t == null ? void 0 : t.iceGatheringTimeout) !== void 0 ? t == null ? void 0 : t.iceGatheringTimeout : 5e3,
      peerConnectionConfiguration: Object.assign(Object.assign({}, $r()), t == null ? void 0 : t.peerConnectionConfiguration)
    }, n = e.userAgent.getLogger("sip.SessionDescriptionHandler");
    return new re(n, s, i);
  };
}
class ot {
  constructor(e, t) {
    if (this._state = H.Disconnected, this.transitioningState = !1, this._stateEventEmitter = new tt(), this.logger = e, t) {
      const n = t, a = n == null ? void 0 : n.wsServers, o = n == null ? void 0 : n.maxReconnectionAttempts;
      a !== void 0 && this.logger.warn('The transport option "wsServers" as has apparently been specified and has been deprecated. It will no longer be available starting with SIP.js release 0.16.0. Please update accordingly.'), o !== void 0 && this.logger.warn('The transport option "maxReconnectionAttempts" as has apparently been specified and has been deprecated. It will no longer be available starting with SIP.js release 0.16.0. Please update accordingly.'), a && !t.server && (typeof a == "string" && (t.server = a), a instanceof Array && (t.server = a[0]));
    }
    this.configuration = Object.assign(Object.assign({}, ot.defaultOptions), t);
    const r = this.configuration.server, i = J.parse(r, "absoluteURI");
    if (i === -1)
      throw this.logger.error(`Invalid WebSocket Server URL "${r}"`), new Error("Invalid WebSocket Server URL");
    if (!["wss", "ws", "udp"].includes(i.scheme))
      throw this.logger.error(`Invalid scheme in WebSocket Server URL "${r}"`), new Error("Invalid scheme in WebSocket Server URL");
    this._protocol = i.scheme.toUpperCase();
  }
  dispose() {
    return this.disconnect();
  }
  /**
   * The protocol.
   *
   * @remarks
   * Formatted as defined for the Via header sent-protocol transport.
   * https://tools.ietf.org/html/rfc3261#section-20.42
   */
  get protocol() {
    return this._protocol;
  }
  /**
   * The URL of the WebSocket Server.
   */
  get server() {
    return this.configuration.server;
  }
  /**
   * Transport state.
   */
  get state() {
    return this._state;
  }
  /**
   * Transport state change emitter.
   */
  get stateChange() {
    return this._stateEventEmitter;
  }
  /**
   * The WebSocket.
   */
  get ws() {
    return this._ws;
  }
  /**
   * Connect to network.
   * Resolves once connected. Otherwise rejects with an Error.
   */
  connect() {
    return this._connect();
  }
  /**
   * Disconnect from network.
   * Resolves once disconnected. Otherwise rejects with an Error.
   */
  disconnect() {
    return this._disconnect();
  }
  /**
   * Returns true if the `state` equals "Connected".
   * @remarks
   * This is equivalent to `state === TransportState.Connected`.
   */
  isConnected() {
    return this.state === H.Connected;
  }
  /**
   * Sends a message.
   * Resolves once message is sent. Otherwise rejects with an Error.
   * @param message - Message to send.
   */
  send(e) {
    return this._send(e);
  }
  _connect() {
    switch (this.logger.log(`Connecting ${this.server}`), this.state) {
      case H.Connecting:
        if (this.transitioningState)
          return Promise.reject(this.transitionLoopDetectedError(H.Connecting));
        if (!this.connectPromise)
          throw new Error("Connect promise must be defined.");
        return this.connectPromise;
      // Already connecting
      case H.Connected:
        if (this.transitioningState)
          return Promise.reject(this.transitionLoopDetectedError(H.Connecting));
        if (this.connectPromise)
          throw new Error("Connect promise must not be defined.");
        return Promise.resolve();
      // Already connected
      case H.Disconnecting:
        if (this.connectPromise)
          throw new Error("Connect promise must not be defined.");
        try {
          this.transitionState(H.Connecting);
        } catch (t) {
          if (t instanceof Ge)
            return Promise.reject(t);
          throw t;
        }
        break;
      case H.Disconnected:
        if (this.connectPromise)
          throw new Error("Connect promise must not be defined.");
        try {
          this.transitionState(H.Connecting);
        } catch (t) {
          if (t instanceof Ge)
            return Promise.reject(t);
          throw t;
        }
        break;
      default:
        throw new Error("Unknown state");
    }
    let e;
    try {
      e = new WebSocket(this.server, "sip"), e.binaryType = "arraybuffer", e.addEventListener("close", (t) => this.onWebSocketClose(t, e)), e.addEventListener("error", (t) => this.onWebSocketError(t, e)), e.addEventListener("open", (t) => this.onWebSocketOpen(t, e)), e.addEventListener("message", (t) => this.onWebSocketMessage(t, e)), this._ws = e;
    } catch (t) {
      return this._ws = void 0, this.logger.error("WebSocket construction failed."), this.logger.error(t.toString()), new Promise((r, i) => {
        this.connectResolve = r, this.connectReject = i, this.transitionState(H.Disconnected, t);
      });
    }
    return this.connectPromise = new Promise((t, r) => {
      this.connectResolve = t, this.connectReject = r, this.connectTimeout = setTimeout(() => {
        this.logger.warn("Connect timed out. Exceeded time set in configuration.connectionTimeout: " + this.configuration.connectionTimeout + "s."), e.close(1e3);
      }, this.configuration.connectionTimeout * 1e3);
    }), this.connectPromise;
  }
  _disconnect() {
    switch (this.logger.log(`Disconnecting ${this.server}`), this.state) {
      case H.Connecting:
        if (this.disconnectPromise)
          throw new Error("Disconnect promise must not be defined.");
        try {
          this.transitionState(H.Disconnecting);
        } catch (t) {
          if (t instanceof Ge)
            return Promise.reject(t);
          throw t;
        }
        break;
      case H.Connected:
        if (this.disconnectPromise)
          throw new Error("Disconnect promise must not be defined.");
        try {
          this.transitionState(H.Disconnecting);
        } catch (t) {
          if (t instanceof Ge)
            return Promise.reject(t);
          throw t;
        }
        break;
      case H.Disconnecting:
        if (this.transitioningState)
          return Promise.reject(this.transitionLoopDetectedError(H.Disconnecting));
        if (!this.disconnectPromise)
          throw new Error("Disconnect promise must be defined.");
        return this.disconnectPromise;
      // Already disconnecting
      case H.Disconnected:
        if (this.transitioningState)
          return Promise.reject(this.transitionLoopDetectedError(H.Disconnecting));
        if (this.disconnectPromise)
          throw new Error("Disconnect promise must not be defined.");
        return Promise.resolve();
      // Already disconnected
      default:
        throw new Error("Unknown state");
    }
    if (!this._ws)
      throw new Error("WebSocket must be defined.");
    const e = this._ws;
    return this.disconnectPromise = new Promise((t, r) => {
      this.disconnectResolve = t, this.disconnectReject = r;
      try {
        e.close(1e3);
      } catch (i) {
        throw this.logger.error("WebSocket close failed."), this.logger.error(i.toString()), i;
      }
    }), this.disconnectPromise;
  }
  _send(e) {
    if (this.configuration.traceSip === !0 && this.logger.log(`Sending WebSocket message:

` + e + `
`), this._state !== H.Connected)
      return Promise.reject(new Error("Not connected."));
    if (!this._ws)
      throw new Error("WebSocket undefined.");
    try {
      this._ws.send(e);
    } catch (t) {
      return t instanceof Error ? Promise.reject(t) : Promise.reject(new Error("WebSocket send failed."));
    }
    return Promise.resolve();
  }
  /**
   * WebSocket "onclose" event handler.
   * @param ev - Event.
   */
  onWebSocketClose(e, t) {
    if (t !== this._ws)
      return;
    const r = `WebSocket closed ${this.server} (code: ${e.code})`, i = this.disconnectPromise ? void 0 : new Error(r);
    i && this.logger.warn("WebSocket closed unexpectedly"), this.logger.log(r), this._ws = void 0, this.transitionState(H.Disconnected, i);
  }
  /**
   * WebSocket "onerror" event handler.
   * @param ev - Event.
   */
  onWebSocketError(e, t) {
    t === this._ws && this.logger.error("WebSocket error occurred.");
  }
  /**
   * WebSocket "onmessage" event handler.
   * @param ev - Event.
   */
  onWebSocketMessage(e, t) {
    if (t !== this._ws)
      return;
    const r = e.data;
    let i;
    if (/^(\r\n)+$/.test(r)) {
      this.clearKeepAliveTimeout(), this.configuration.traceSip === !0 && this.logger.log("Received WebSocket message with CRLF Keep Alive response");
      return;
    }
    if (!r) {
      this.logger.warn("Received empty message, discarding...");
      return;
    }
    if (typeof r != "string") {
      try {
        i = new TextDecoder().decode(new Uint8Array(r));
      } catch (n) {
        this.logger.error(n.toString()), this.logger.error("Received WebSocket binary message failed to be converted into string, message discarded");
        return;
      }
      this.configuration.traceSip === !0 && this.logger.log(`Received WebSocket binary message:

` + i + `
`);
    } else
      i = r, this.configuration.traceSip === !0 && this.logger.log(`Received WebSocket text message:

` + i + `
`);
    if (this.state !== H.Connected) {
      this.logger.warn("Received message while not connected, discarding...");
      return;
    }
    if (this.onMessage)
      try {
        this.onMessage(i);
      } catch (n) {
        throw this.logger.error(n.toString()), this.logger.error("Exception thrown by onMessage callback"), n;
      }
  }
  /**
   * WebSocket "onopen" event handler.
   * @param ev - Event.
   */
  onWebSocketOpen(e, t) {
    t === this._ws && this._state === H.Connecting && (this.logger.log(`WebSocket opened ${this.server}`), this.transitionState(H.Connected));
  }
  /**
   * Helper function to generate an Error.
   * @param state - State transitioning to.
   */
  transitionLoopDetectedError(e) {
    let t = "A state transition loop has been detected.";
    return t += ` An attempt to transition from ${this._state} to ${e} before the prior transition completed.`, t += " Perhaps you are synchronously calling connect() or disconnect() from a callback or state change handler?", this.logger.error(t), new Ge("Loop detected.");
  }
  /**
   * Transition transport state.
   * @internal
   */
  transitionState(e, t) {
    const r = () => {
      throw new Error(`Invalid state transition from ${this._state} to ${e}`);
    };
    if (this.transitioningState)
      throw this.transitionLoopDetectedError(e);
    switch (this.transitioningState = !0, this._state) {
      case H.Connecting:
        e !== H.Connected && e !== H.Disconnecting && e !== H.Disconnected && r();
        break;
      case H.Connected:
        e !== H.Disconnecting && e !== H.Disconnected && r();
        break;
      case H.Disconnecting:
        e !== H.Connecting && e !== H.Disconnected && r();
        break;
      case H.Disconnected:
        e !== H.Connecting && r();
        break;
      default:
        throw new Error("Unknown state.");
    }
    const i = this._state;
    this._state = e;
    const n = this.connectResolve, a = this.connectReject;
    i === H.Connecting && (this.connectPromise = void 0, this.connectResolve = void 0, this.connectReject = void 0);
    const o = this.disconnectResolve, d = this.disconnectReject;
    if (i === H.Disconnecting && (this.disconnectPromise = void 0, this.disconnectResolve = void 0, this.disconnectReject = void 0), this.connectTimeout && (clearTimeout(this.connectTimeout), this.connectTimeout = void 0), this.logger.log(`Transitioned from ${i} to ${this._state}`), this._stateEventEmitter.emit(this._state), e === H.Connected && (this.startSendingKeepAlives(), this.onConnect))
      try {
        this.onConnect();
      } catch (h) {
        throw this.logger.error(h.toString()), this.logger.error("Exception thrown by onConnect callback"), h;
      }
    if (i === H.Connected && (this.stopSendingKeepAlives(), this.onDisconnect))
      try {
        t ? this.onDisconnect(t) : this.onDisconnect();
      } catch (h) {
        throw this.logger.error(h.toString()), this.logger.error("Exception thrown by onDisconnect callback"), h;
      }
    if (i === H.Connecting) {
      if (!n)
        throw new Error("Connect resolve undefined.");
      if (!a)
        throw new Error("Connect reject undefined.");
      e === H.Connected ? n() : a(t || new Error("Connect aborted."));
    }
    if (i === H.Disconnecting) {
      if (!o)
        throw new Error("Disconnect resolve undefined.");
      if (!d)
        throw new Error("Disconnect reject undefined.");
      e === H.Disconnected ? o() : d(t || new Error("Disconnect aborted."));
    }
    this.transitioningState = !1;
  }
  // TODO: Review "KeepAlive Stuff".
  // It is not clear if it works and there are no tests for it.
  // It was blindly lifted the keep alive code unchanged from earlier transport code.
  //
  // From the RFC...
  //
  // SIP WebSocket Clients and Servers may keep their WebSocket
  // connections open by sending periodic WebSocket "Ping" frames as
  // described in [RFC6455], Section 5.5.2.
  // ...
  // The indication and use of the CRLF NAT keep-alive mechanism defined
  // for SIP connection-oriented transports in [RFC5626], Section 3.5.1 or
  // [RFC6223] are, of course, usable over the transport defined in this
  // specification.
  // https://tools.ietf.org/html/rfc7118#section-6
  //
  // and...
  //
  // The Ping frame contains an opcode of 0x9.
  // https://tools.ietf.org/html/rfc6455#section-5.5.2
  //
  // ==============================
  // KeepAlive Stuff
  // ==============================
  clearKeepAliveTimeout() {
    this.keepAliveDebounceTimeout && clearTimeout(this.keepAliveDebounceTimeout), this.keepAliveDebounceTimeout = void 0;
  }
  /**
   * Send a keep-alive (a double-CRLF sequence).
   */
  sendKeepAlive() {
    return this.keepAliveDebounceTimeout ? Promise.resolve() : (this.keepAliveDebounceTimeout = setTimeout(() => {
      this.clearKeepAliveTimeout();
    }, this.configuration.keepAliveDebounce * 1e3), this.send(`\r
\r
`));
  }
  /**
   * Start sending keep-alives.
   */
  startSendingKeepAlives() {
    const e = (t) => {
      const r = t * 0.8;
      return 1e3 * (Math.random() * (t - r) + r);
    };
    this.configuration.keepAliveInterval && !this.keepAliveInterval && (this.keepAliveInterval = setInterval(() => {
      this.sendKeepAlive(), this.startSendingKeepAlives();
    }, e(this.configuration.keepAliveInterval)));
  }
  /**
   * Stop sending keep-alives.
   */
  stopSendingKeepAlives() {
    this.keepAliveInterval && clearInterval(this.keepAliveInterval), this.keepAliveDebounceTimeout && clearTimeout(this.keepAliveDebounceTimeout), this.keepAliveInterval = void 0, this.keepAliveDebounceTimeout = void 0;
  }
}
ot.defaultOptions = {
  server: "",
  connectionTimeout: 5,
  keepAliveInterval: 0,
  keepAliveDebounce: 10,
  traceSip: !0
};
class fe {
  /**
   * Constructs a new instance of the `UserAgent` class.
   * @param options - Options bucket. See {@link UserAgentOptions} for details.
   */
  constructor(e = {}) {
    if (this._publishers = {}, this._registerers = {}, this._sessions = {}, this._subscriptions = {}, this._state = Y.Stopped, this._stateEventEmitter = new tt(), this.delegate = e.delegate, this.options = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, fe.defaultOptions()), { sipjsId: Pe(5) }), { uri: new we("sip", "anonymous." + Pe(6), "anonymous.invalid") }), { viaHost: Pe(12) + ".invalid" }), fe.stripUndefinedProperties(e)), this.options.hackIpInContact)
      if (typeof this.options.hackIpInContact == "boolean" && this.options.hackIpInContact) {
        const i = Math.floor(Math.random() * 254 + 1);
        this.options.viaHost = "192.0.2." + i;
      } else this.options.hackIpInContact && (this.options.viaHost = this.options.hackIpInContact);
    switch (this.loggerFactory = new oi(), this.logger = this.loggerFactory.getLogger("sip.UserAgent"), this.loggerFactory.builtinEnabled = this.options.logBuiltinEnabled, this.loggerFactory.connector = this.options.logConnector, this.options.logLevel) {
      case "error":
        this.loggerFactory.level = ee.error;
        break;
      case "warn":
        this.loggerFactory.level = ee.warn;
        break;
      case "log":
        this.loggerFactory.level = ee.log;
        break;
      case "debug":
        this.loggerFactory.level = ee.debug;
        break;
    }
    if (this.options.logConfiguration && (this.logger.log("Configuration:"), Object.keys(this.options).forEach((t) => {
      const r = this.options[t];
      switch (t) {
        case "uri":
        case "sessionDescriptionHandlerFactory":
          this.logger.log("· " + t + ": " + r);
          break;
        case "authorizationPassword":
          this.logger.log("· " + t + ": NOT SHOWN");
          break;
        case "transportConstructor":
          this.logger.log("· " + t + ": " + r.name);
          break;
        default:
          this.logger.log("· " + t + ": " + JSON.stringify(r));
      }
    })), this.options.transportOptions) {
      const t = this.options.transportOptions, r = t.maxReconnectionAttempts, i = t.reconnectionTimeout;
      r !== void 0 && this.logger.warn('The transport option "maxReconnectionAttempts" as has apparently been specified and has been deprecated. It will no longer be available starting with SIP.js release 0.16.0. Please update accordingly.'), i !== void 0 && this.logger.warn('The transport option "reconnectionTimeout" as has apparently been specified and has been deprecated. It will no longer be available starting with SIP.js release 0.16.0. Please update accordingly.'), e.reconnectionDelay === void 0 && i !== void 0 && (this.options.reconnectionDelay = i), e.reconnectionAttempts === void 0 && r !== void 0 && (this.options.reconnectionAttempts = r);
    }
    if (e.reconnectionDelay !== void 0 && this.logger.warn('The user agent option "reconnectionDelay" as has apparently been specified and has been deprecated. It will no longer be available starting with SIP.js release 0.16.0. Please update accordingly.'), e.reconnectionAttempts !== void 0 && this.logger.warn('The user agent option "reconnectionAttempts" as has apparently been specified and has been deprecated. It will no longer be available starting with SIP.js release 0.16.0. Please update accordingly.'), this._transport = new this.options.transportConstructor(this.getLogger("sip.Transport"), this.options.transportOptions), this.initTransportCallbacks(), this._contact = this.initContact(), this._instanceId = this.options.instanceId ? this.options.instanceId : fe.newUUID(), J.parse(this._instanceId, "uuid") === -1)
      throw new Error("Invalid instanceId.");
    this._userAgentCore = this.initCore();
  }
  /**
   * Create a URI instance from a string.
   * @param uri - The string to parse.
   *
   * @remarks
   * Returns undefined if the syntax of the URI is invalid.
   * The syntax must conform to a SIP URI as defined in the RFC.
   * 25 Augmented BNF for the SIP Protocol
   * https://tools.ietf.org/html/rfc3261#section-25
   *
   * @example
   * ```ts
   * const uri = UserAgent.makeURI("sip:edgar@example.com");
   * ```
   */
  static makeURI(e) {
    return J.URIParse(e);
  }
  /** Default user agent options. */
  static defaultOptions() {
    return {
      allowLegacyNotifications: !1,
      authorizationHa1: "",
      authorizationPassword: "",
      authorizationUsername: "",
      delegate: {},
      contactName: "",
      contactParams: { transport: "ws" },
      displayName: "",
      forceRport: !1,
      gracefulShutdown: !0,
      hackAllowUnregisteredOptionTags: !1,
      hackIpInContact: !1,
      hackViaTcp: !1,
      instanceId: "",
      instanceIdAlwaysAdded: !1,
      logBuiltinEnabled: !0,
      logConfiguration: !0,
      logConnector: () => {
      },
      logLevel: "log",
      noAnswerTimeout: 60,
      preloadedRouteSet: [],
      reconnectionAttempts: 0,
      reconnectionDelay: 4,
      sendInitialProvisionalResponse: !0,
      sessionDescriptionHandlerFactory: Ii(),
      sessionDescriptionHandlerFactoryOptions: {},
      sipExtension100rel: me.Unsupported,
      sipExtensionReplaces: me.Unsupported,
      sipExtensionExtraSupported: [],
      sipjsId: "",
      transportConstructor: ot,
      transportOptions: {},
      uri: new we("sip", "anonymous", "anonymous.invalid"),
      userAgentString: "SIP.js/" + Wr,
      viaHost: ""
    };
  }
  // http://stackoverflow.com/users/109538/broofa
  static newUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
      const r = Math.floor(Math.random() * 16);
      return (t === "x" ? r : r % 4 + 8).toString(16);
    });
  }
  /**
   * Strip properties with undefined values from options.
   * This is a work around while waiting for missing vs undefined to be addressed (or not)...
   * https://github.com/Microsoft/TypeScript/issues/13195
   * @param options - Options to reduce
   */
  static stripUndefinedProperties(e) {
    return Object.keys(e).reduce((t, r) => (e[r] !== void 0 && (t[r] = e[r]), t), {});
  }
  /**
   * User agent configuration.
   */
  get configuration() {
    return this.options;
  }
  /**
   * User agent contact.
   */
  get contact() {
    return this._contact;
  }
  /**
   * User agent instance id.
   */
  get instanceId() {
    return this._instanceId;
  }
  /**
   * User agent state.
   */
  get state() {
    return this._state;
  }
  /**
   * User agent state change emitter.
   */
  get stateChange() {
    return this._stateEventEmitter;
  }
  /**
   * User agent transport.
   */
  get transport() {
    return this._transport;
  }
  /**
   * User agent core.
   */
  get userAgentCore() {
    return this._userAgentCore;
  }
  /**
   * The logger.
   */
  getLogger(e, t) {
    return this.loggerFactory.getLogger(e, t);
  }
  /**
   * The logger factory.
   */
  getLoggerFactory() {
    return this.loggerFactory;
  }
  /**
   * True if transport is connected.
   */
  isConnected() {
    return this.transport.isConnected();
  }
  /**
   * Reconnect the transport.
   */
  reconnect() {
    return this.state === Y.Stopped ? Promise.reject(new Error("User agent stopped.")) : Promise.resolve().then(() => this.transport.connect());
  }
  /**
   * Start the user agent.
   *
   * @remarks
   * Resolves if transport connects, otherwise rejects.
   * Calling `start()` after calling `stop()` will fail if `stop()` has yet to resolve.
   *
   * @example
   * ```ts
   * userAgent.start()
   *   .then(() => {
   *     // userAgent.isConnected() === true
   *   })
   *   .catch((error: Error) => {
   *     // userAgent.isConnected() === false
   *   });
   * ```
   */
  start() {
    return this.state === Y.Started ? (this.logger.warn("User agent already started"), Promise.resolve()) : (this.logger.log(`Starting ${this.configuration.uri}`), this.transitionState(Y.Started), this.transport.connect());
  }
  /**
   * Stop the user agent.
   *
   * @remarks
   * Resolves when the user agent has completed a graceful shutdown.
   * ```txt
   * 1) Sessions terminate.
   * 2) Registerers unregister.
   * 3) Subscribers unsubscribe.
   * 4) Publishers unpublish.
   * 5) Transport disconnects.
   * 6) User Agent Core resets.
   * ```
   * The user agent state transistions to stopped once these steps have been completed.
   * Calling `start()` after calling `stop()` will fail if `stop()` has yet to resolve.
   *
   * NOTE: While this is a "graceful shutdown", it can also be very slow one if you
   * are waiting for the returned Promise to resolve. The disposal of the clients and
   * dialogs is done serially - waiting on one to finish before moving on to the next.
   * This can be slow if there are lot of subscriptions to unsubscribe for example.
   *
   * THE SLOW PACE IS INTENTIONAL!
   * While one could spin them all down in parallel, this could slam the remote server.
   * It is bad practice to denial of service attack (DoS attack) servers!!!
   * Moreover, production servers will automatically blacklist clients which send too
   * many requests in too short a period of time - dropping any additional requests.
   *
   * If a different approach to disposing is needed, one can implement whatever is
   * needed and execute that prior to calling `stop()`. Alternatively one may simply
   * not wait for the Promise returned by `stop()` to complete.
   */
  async stop() {
    if (this.state === Y.Stopped)
      return this.logger.warn("User agent already stopped"), Promise.resolve();
    if (this.logger.log(`Stopping ${this.configuration.uri}`), !this.options.gracefulShutdown)
      return this.logger.log("Dispose of transport"), this.transport.dispose().catch((o) => {
        throw this.logger.error(o.message), o;
      }), this.logger.log("Dispose of core"), this.userAgentCore.dispose(), this._publishers = {}, this._registerers = {}, this._sessions = {}, this._subscriptions = {}, this.transitionState(Y.Stopped), Promise.resolve();
    const e = Object.assign({}, this._publishers), t = Object.assign({}, this._registerers), r = Object.assign({}, this._sessions), i = Object.assign({}, this._subscriptions), n = this.transport, a = this.userAgentCore;
    this.logger.log("Dispose of registerers");
    for (const o in t)
      t[o] && await t[o].dispose().catch((d) => {
        throw this.logger.error(d.message), delete this._registerers[o], d;
      });
    this.logger.log("Dispose of sessions");
    for (const o in r)
      r[o] && await r[o].dispose().catch((d) => {
        throw this.logger.error(d.message), delete this._sessions[o], d;
      });
    this.logger.log("Dispose of subscriptions");
    for (const o in i)
      i[o] && await i[o].dispose().catch((d) => {
        throw this.logger.error(d.message), delete this._subscriptions[o], d;
      });
    this.logger.log("Dispose of publishers");
    for (const o in e)
      e[o] && await e[o].dispose().catch((d) => {
        throw this.logger.error(d.message), delete this._publishers[o], d;
      });
    this.logger.log("Dispose of transport"), await n.dispose().catch((o) => {
      throw this.logger.error(o.message), o;
    }), this.logger.log("Dispose of core"), a.dispose(), this.transitionState(Y.Stopped);
  }
  /**
   * Used to avoid circular references.
   * @internal
   */
  _makeInviter(e, t) {
    return new pt(this, e, t);
  }
  /**
   * Attempt reconnection up to `maxReconnectionAttempts` times.
   * @param reconnectionAttempt - Current attempt number.
   */
  attemptReconnection(e = 1) {
    const t = this.options.reconnectionAttempts, r = this.options.reconnectionDelay;
    if (e > t) {
      this.logger.log("Maximum reconnection attempts reached");
      return;
    }
    this.logger.log(`Reconnection attempt ${e} of ${t} - trying`), setTimeout(() => {
      this.reconnect().then(() => {
        this.logger.log(`Reconnection attempt ${e} of ${t} - succeeded`);
      }).catch((i) => {
        this.logger.error(i.message), this.logger.log(`Reconnection attempt ${e} of ${t} - failed`), this.attemptReconnection(++e);
      });
    }, e === 1 ? 0 : r * 1e3);
  }
  /**
   * Initialize contact.
   */
  initContact() {
    const e = this.options.contactName !== "" ? this.options.contactName : Pe(8), t = this.options.contactParams;
    return {
      pubGruu: void 0,
      tempGruu: void 0,
      uri: new we("sip", e, this.options.viaHost, void 0, t),
      toString: (i = {}) => {
        const n = i.anonymous || !1, a = i.outbound || !1, o = i.register || !1;
        let d = "<";
        return n ? d += this.contact.tempGruu || `sip:anonymous@anonymous.invalid;transport=${t.transport ? t.transport : "ws"}` : o ? d += this.contact.uri : d += this.contact.pubGruu || this.contact.uri, a && (d += ";ob"), d += ">", this.options.instanceIdAlwaysAdded && (d += ';+sip.instance="<urn:uuid:' + this._instanceId + '>"'), d;
      }
    };
  }
  /**
   * Initialize user agent core.
   */
  initCore() {
    let e = [];
    e.push("outbound"), this.options.sipExtension100rel === me.Supported && e.push("100rel"), this.options.sipExtensionReplaces === me.Supported && e.push("replaces"), this.options.sipExtensionExtraSupported && e.push(...this.options.sipExtensionExtraSupported), this.options.hackAllowUnregisteredOptionTags || (e = e.filter((n) => si[n])), e = Array.from(new Set(e));
    const t = e.slice();
    (this.contact.pubGruu || this.contact.tempGruu) && t.push("gruu");
    const r = {
      aor: this.options.uri,
      contact: this.contact,
      displayName: this.options.displayName,
      loggerFactory: this.loggerFactory,
      hackViaTcp: this.options.hackViaTcp,
      routeSet: this.options.preloadedRouteSet,
      supportedOptionTags: e,
      supportedOptionTagsResponse: t,
      sipjsId: this.options.sipjsId,
      userAgentHeaderFieldValue: this.options.userAgentString,
      viaForceRport: this.options.forceRport,
      viaHost: this.options.viaHost,
      authenticationFactory: () => {
        const n = this.options.authorizationUsername ? this.options.authorizationUsername : this.options.uri.user, a = this.options.authorizationPassword ? this.options.authorizationPassword : void 0, o = this.options.authorizationHa1 ? this.options.authorizationHa1 : void 0;
        return new ai(this.getLoggerFactory(), o, n, a);
      },
      transportAccessor: () => this.transport
    }, i = {
      onInvite: (n) => {
        var a;
        const o = new Ye(this, n);
        if (n.delegate = {
          onCancel: (d) => {
            o._onCancel(d);
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onTransportError: (d) => {
            this.logger.error("A transport error has occurred while handling an incoming INVITE request.");
          }
        }, n.trying(), this.options.sipExtensionReplaces !== me.Unsupported) {
          const h = n.message.parseHeader("replaces");
          if (h) {
            const u = h.call_id;
            if (typeof u != "string")
              throw new Error("Type of call id is not string");
            const f = h.replaces_to_tag;
            if (typeof f != "string")
              throw new Error("Type of to tag is not string");
            const w = h.replaces_from_tag;
            if (typeof w != "string")
              throw new Error("type of from tag is not string");
            const T = u + f + w, R = this.userAgentCore.dialogs.get(T);
            if (!R) {
              o.reject({ statusCode: 481 });
              return;
            }
            if (!R.early && h.early_only === !0) {
              o.reject({ statusCode: 486 });
              return;
            }
            const S = this._sessions[u + w] || this._sessions[u + f] || void 0;
            if (!S)
              throw new Error("Session does not exist.");
            o._replacee = S;
          }
        }
        if (!((a = this.delegate) === null || a === void 0) && a.onInvite) {
          if (o.autoSendAnInitialProvisionalResponse) {
            o.progress().then(() => {
              var d;
              if (((d = this.delegate) === null || d === void 0 ? void 0 : d.onInvite) === void 0)
                throw new Error("onInvite undefined.");
              this.delegate.onInvite(o);
            });
            return;
          }
          this.delegate.onInvite(o);
          return;
        }
        o.reject({ statusCode: 486 });
      },
      onMessage: (n) => {
        if (this.delegate && this.delegate.onMessage) {
          const a = new wr(n);
          this.delegate.onMessage(a);
        } else
          n.accept();
      },
      onNotify: (n) => {
        if (this.delegate && this.delegate.onNotify) {
          const a = new qt(n);
          this.delegate.onNotify(a);
        } else
          this.options.allowLegacyNotifications ? n.accept() : n.reject({ statusCode: 481 });
      },
      onRefer: (n) => {
        this.logger.warn("Received an out of dialog REFER request"), this.delegate && this.delegate.onReferRequest ? this.delegate.onReferRequest(n) : n.reject({ statusCode: 405 });
      },
      onRegister: (n) => {
        this.logger.warn("Received an out of dialog REGISTER request"), this.delegate && this.delegate.onRegisterRequest ? this.delegate.onRegisterRequest(n) : n.reject({ statusCode: 405 });
      },
      onSubscribe: (n) => {
        this.logger.warn("Received an out of dialog SUBSCRIBE request"), this.delegate && this.delegate.onSubscribeRequest ? this.delegate.onSubscribeRequest(n) : n.reject({ statusCode: 405 });
      }
    };
    return new $i(r, i);
  }
  initTransportCallbacks() {
    this.transport.onConnect = () => this.onTransportConnect(), this.transport.onDisconnect = (e) => this.onTransportDisconnect(e), this.transport.onMessage = (e) => this.onTransportMessage(e);
  }
  onTransportConnect() {
    this.state !== Y.Stopped && this.delegate && this.delegate.onConnect && this.delegate.onConnect();
  }
  onTransportDisconnect(e) {
    this.state !== Y.Stopped && (this.delegate && this.delegate.onDisconnect && this.delegate.onDisconnect(e), e && this.options.reconnectionAttempts > 0 && this.attemptReconnection());
  }
  onTransportMessage(e) {
    const t = mt.parseMessage(e, this.getLogger("sip.Parser"));
    if (!t) {
      this.logger.warn("Failed to parse incoming message. Dropping.");
      return;
    }
    if (this.state === Y.Stopped && t instanceof Be) {
      this.logger.warn(`Received ${t.method} request while stopped. Dropping.`);
      return;
    }
    const r = () => {
      const i = ["from", "to", "call_id", "cseq", "via"];
      for (const n of i)
        if (!t.hasHeader(n))
          return this.logger.warn(`Missing mandatory header field : ${n}.`), !1;
      return !0;
    };
    if (t instanceof Be) {
      if (!r()) {
        this.logger.warn("Request missing mandatory header field. Dropping.");
        return;
      }
      if (!t.toTag && t.callId.substr(0, 5) === this.options.sipjsId) {
        this.userAgentCore.replyStateless(t, { statusCode: 482 });
        return;
      }
      const i = rt(t.body), n = t.getHeader("content-length");
      if (n && i < Number(n)) {
        this.userAgentCore.replyStateless(t, { statusCode: 400 });
        return;
      }
    }
    if (t instanceof Ie) {
      if (!r()) {
        this.logger.warn("Response missing mandatory header field. Dropping.");
        return;
      }
      if (t.getHeaders("via").length > 1) {
        this.logger.warn("More than one Via header field present in the response. Dropping.");
        return;
      }
      if (t.via.host !== this.options.viaHost || t.via.port !== void 0) {
        this.logger.warn("Via sent-by in the response does not match UA Via host value. Dropping.");
        return;
      }
      const i = rt(t.body), n = t.getHeader("content-length");
      if (n && i < Number(n)) {
        this.logger.warn("Message body length is lower than the value in Content-Length header field. Dropping.");
        return;
      }
    }
    if (t instanceof Be) {
      this.userAgentCore.receiveIncomingRequestFromTransport(t);
      return;
    }
    if (t instanceof Ie) {
      this.userAgentCore.receiveIncomingResponseFromTransport(t);
      return;
    }
    throw new Error("Invalid message type.");
  }
  /**
   * Transition state.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transitionState(e, t) {
    const r = () => {
      throw new Error(`Invalid state transition from ${this._state} to ${e}`);
    };
    switch (this._state) {
      case Y.Started:
        e !== Y.Stopped && r();
        break;
      case Y.Stopped:
        e !== Y.Started && r();
        break;
      default:
        throw new Error("Unknown state.");
    }
    this.logger.log(`Transitioned from ${this._state} to ${e}`), this._state = e, this._stateEventEmitter.emit(this._state);
  }
}
class Ir extends re {
  constructor(e, t, r) {
    super(e, t, r);
  }
  enableTrack(e, t, r) {
    const i = this.peerConnection;
    if (!i)
      throw new Error("Peer connection closed.");
    switch (e) {
      case "sender":
        i.getSenders().forEach((n) => {
          n.track && n.track.kind == t && (n.track.enabled = r);
        });
        break;
      case "receiver":
        i.getReceivers().forEach((n) => {
          n.track && n.track.kind == e && (n.track.enabled = r);
        });
        break;
      default:
        console.error("invalid track type");
    }
  }
}
function Ai(s) {
  return (e, t) => {
    s === void 0 && (s = Rr());
    const i = {
      iceGatheringTimeout: (t == null ? void 0 : t.iceGatheringTimeout) !== void 0 ? t == null ? void 0 : t.iceGatheringTimeout : 5e3,
      peerConnectionConfiguration: {
        ...$r(),
        ...t == null ? void 0 : t.peerConnectionConfiguration
      }
    }, n = e.userAgent.getLogger("sip.SessionDescriptionHandler");
    return new Ir(n, s, i);
  };
}
var Di = function(s, e, t) {
  if (t || arguments.length === 2) for (var r = 0, i = e.length, n; r < i; r++)
    (n || !(r in e)) && (n || (n = Array.prototype.slice.call(e, 0, r)), n[r] = e[r]);
  return s.concat(n || Array.prototype.slice.call(e));
}, Pi = function(s) {
  return s._tag === "Some";
}, ct = { _tag: "None" }, dt = function(s) {
  return { _tag: "Some", value: s };
}, Hi = function(s) {
  return s.length > 0;
}, _i = function(s) {
  return s[0];
}, ki = function(s) {
  return Di([s[0]], s.slice(1), !0);
}, Vt = ct, Gt = dt, qi = function(s) {
  return function(e) {
    return Kt(e) ? Vt : Gt(s(e.value));
  };
}, G = Pi, Kt = function(s) {
  return s._tag === "None";
}, Ni = function(s) {
  return function(e) {
    return Kt(e) ? s() : e.value;
  };
}, Oi = Ni, Fi = Hi, Mi = _i, ji = Mi, nr = function(s, e, t) {
  if (t || arguments.length === 2) for (var r = 0, i = e.length, n; r < i; r++)
    (n || !(r in e)) && (n || (n = Array.prototype.slice.call(e, 0, r)), n[r] = e[r]);
  return s.concat(n || Array.prototype.slice.call(e));
}, Ui = function(s) {
  return s.length > 0;
}, Bi = function(s, e) {
  return s < 0 || s >= e.length;
}, Li = function(s) {
  return function(e) {
    return nr(nr([], e, !0), [s], !1);
  };
}, Vi = Li, Gi = function(s, e, t) {
  var r = Ki(t);
  return r[s] = e, r;
}, Ki = ki, Wi = Fi, Yi = function(s) {
  return Wi(s) ? dt(ji(s)) : ct;
}, Ji = function(s) {
  return function(e) {
    for (var t = 0; t < e.length; t++)
      if (s(e[t]))
        return dt(t);
    return ct;
  };
};
function Zi(s) {
  return function(e) {
    for (var t = 0; t < e.length; t++)
      if (s(e[t]))
        return dt(e[t]);
    return ct;
  };
}
var zi = Ui, Xi = Vi, Qi = Bi, es = Yi, ts = Ji;
function rs(s) {
  return Zi(s);
}
var is = function(s, e) {
  return ss(s, function() {
    return e;
  });
}, ss = function(s, e) {
  return function(t) {
    return Qi(s, t) ? ct : dt(ns(s, e(t[s]), t));
  };
}, Nt = function(s) {
  return function(e) {
    return e.filter(s);
  };
}, ns = function(s, e, t) {
  return zi(t) ? Gi(s, e, t) : [];
}, Ke = {}, ar;
function as() {
  return ar || (ar = 1, function(s) {
    var e = Ke && Ke.__spreadArray || function(b, c, I) {
      if (I || arguments.length === 2) for (var $ = 0, l = c.length, m; $ < l; $++)
        (m || !($ in c)) && (m || (m = Array.prototype.slice.call(c, 0, $)), m[$] = c[$]);
      return b.concat(m || Array.prototype.slice.call(c));
    };
    Object.defineProperty(s, "__esModule", { value: !0 }), s.dual = s.getEndomorphismMonoid = s.SK = s.hole = s.constVoid = s.constUndefined = s.constNull = s.constFalse = s.constTrue = s.unsafeCoerce = s.apply = s.getRing = s.getSemiring = s.getMonoid = s.getSemigroup = s.getBooleanAlgebra = void 0, s.identity = d, s.constant = h, s.flip = u, s.flow = f, s.tuple = w, s.increment = T, s.decrement = R, s.absurd = S, s.tupled = D, s.untupled = g, s.pipe = E, s.not = q;
    var t = function(b) {
      return function() {
        return {
          meet: function(c, I) {
            return function($) {
              return b.meet(c($), I($));
            };
          },
          join: function(c, I) {
            return function($) {
              return b.join(c($), I($));
            };
          },
          zero: function() {
            return b.zero;
          },
          one: function() {
            return b.one;
          },
          implies: function(c, I) {
            return function($) {
              return b.implies(c($), I($));
            };
          },
          not: function(c) {
            return function(I) {
              return b.not(c(I));
            };
          }
        };
      };
    };
    s.getBooleanAlgebra = t;
    var r = function(b) {
      return function() {
        return {
          concat: function(c, I) {
            return function($) {
              return b.concat(c($), I($));
            };
          }
        };
      };
    };
    s.getSemigroup = r;
    var i = function(b) {
      var c = (0, s.getSemigroup)(b);
      return function() {
        return {
          concat: c().concat,
          empty: function() {
            return b.empty;
          }
        };
      };
    };
    s.getMonoid = i;
    var n = function(b) {
      return {
        add: function(c, I) {
          return function($) {
            return b.add(c($), I($));
          };
        },
        zero: function() {
          return b.zero;
        },
        mul: function(c, I) {
          return function($) {
            return b.mul(c($), I($));
          };
        },
        one: function() {
          return b.one;
        }
      };
    };
    s.getSemiring = n;
    var a = function(b) {
      var c = (0, s.getSemiring)(b);
      return {
        add: c.add,
        mul: c.mul,
        one: c.one,
        zero: c.zero,
        sub: function(I, $) {
          return function(l) {
            return b.sub(I(l), $(l));
          };
        }
      };
    };
    s.getRing = a;
    var o = function(b) {
      return function(c) {
        return c(b);
      };
    };
    s.apply = o;
    function d(b) {
      return b;
    }
    s.unsafeCoerce = d;
    function h(b) {
      return function() {
        return b;
      };
    }
    s.constTrue = h(!0), s.constFalse = h(!1), s.constNull = h(null), s.constUndefined = h(void 0), s.constVoid = s.constUndefined;
    function u(b) {
      return function() {
        for (var c = [], I = 0; I < arguments.length; I++)
          c[I] = arguments[I];
        return c.length > 1 ? b(c[1], c[0]) : function($) {
          return b($)(c[0]);
        };
      };
    }
    function f(b, c, I, $, l, m, p, M, k) {
      switch (arguments.length) {
        case 1:
          return b;
        case 2:
          return function() {
            return c(b.apply(this, arguments));
          };
        case 3:
          return function() {
            return I(c(b.apply(this, arguments)));
          };
        case 4:
          return function() {
            return $(I(c(b.apply(this, arguments))));
          };
        case 5:
          return function() {
            return l($(I(c(b.apply(this, arguments)))));
          };
        case 6:
          return function() {
            return m(l($(I(c(b.apply(this, arguments))))));
          };
        case 7:
          return function() {
            return p(m(l($(I(c(b.apply(this, arguments)))))));
          };
        case 8:
          return function() {
            return M(p(m(l($(I(c(b.apply(this, arguments))))))));
          };
        case 9:
          return function() {
            return k(M(p(m(l($(I(c(b.apply(this, arguments)))))))));
          };
      }
    }
    function w() {
      for (var b = [], c = 0; c < arguments.length; c++)
        b[c] = arguments[c];
      return b;
    }
    function T(b) {
      return b + 1;
    }
    function R(b) {
      return b - 1;
    }
    function S(b) {
      throw new Error("Called `absurd` function which should be uncallable");
    }
    function D(b) {
      return function(c) {
        return b.apply(void 0, c);
      };
    }
    function g(b) {
      return function() {
        for (var c = [], I = 0; I < arguments.length; I++)
          c[I] = arguments[I];
        return b(c);
      };
    }
    function E(b, c, I, $, l, m, p, M, k) {
      switch (arguments.length) {
        case 1:
          return b;
        case 2:
          return c(b);
        case 3:
          return I(c(b));
        case 4:
          return $(I(c(b)));
        case 5:
          return l($(I(c(b))));
        case 6:
          return m(l($(I(c(b)))));
        case 7:
          return p(m(l($(I(c(b))))));
        case 8:
          return M(p(m(l($(I(c(b)))))));
        case 9:
          return k(M(p(m(l($(I(c(b))))))));
        default: {
          for (var Q = arguments[0], P = 1; P < arguments.length; P++)
            Q = arguments[P](Q);
          return Q;
        }
      }
    }
    s.hole = S;
    var _ = function(b, c) {
      return c;
    };
    s.SK = _;
    function q(b) {
      return function(c) {
        return !b(c);
      };
    }
    var Z = function() {
      return {
        concat: function(b, c) {
          return f(b, c);
        },
        empty: d
      };
    };
    s.getEndomorphismMonoid = Z;
    var U = function(b, c) {
      var I = typeof b == "number" ? function($) {
        return $.length >= b;
      } : b;
      return function() {
        var $ = Array.from(arguments);
        return I(arguments) ? c.apply(this, $) : function(l) {
          return c.apply(void 0, e([l], $, !1));
        };
      };
    };
    s.dual = U;
  }(Ke)), Ke;
}
var je = /* @__PURE__ */ as();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var A = function() {
  return A = Object.assign || function(e) {
    for (var t, r = 1, i = arguments.length; r < i; r++) {
      t = arguments[r];
      for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }, A.apply(this, arguments);
};
function Wt(s, e) {
  var t = {};
  for (var r in s) Object.prototype.hasOwnProperty.call(s, r) && e.indexOf(r) < 0 && (t[r] = s[r]);
  if (s != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(s); i < r.length; i++)
      e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, r[i]) && (t[r[i]] = s[r[i]]);
  return t;
}
function V(s) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && s[e], r = 0;
  if (t) return t.call(s);
  if (s && typeof s.length == "number") return {
    next: function() {
      return s && r >= s.length && (s = void 0), { value: s && s[r++], done: !s };
    }
  };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function j(s, e) {
  var t = typeof Symbol == "function" && s[Symbol.iterator];
  if (!t) return s;
  var r = t.call(s), i, n = [], a;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = r.next()).done; ) n.push(i.value);
  } catch (o) {
    a = { error: o };
  } finally {
    try {
      i && !i.done && (t = r.return) && t.call(r);
    } finally {
      if (a) throw a.error;
    }
  }
  return n;
}
function L(s, e, t) {
  if (arguments.length === 2) for (var r = 0, i = e.length, n; r < i; r++)
    (n || !(r in e)) && (n || (n = Array.prototype.slice.call(e, 0, r)), n[r] = e[r]);
  return s.concat(n || Array.prototype.slice.call(e));
}
var B;
(function(s) {
  s.Start = "xstate.start", s.Stop = "xstate.stop", s.Raise = "xstate.raise", s.Send = "xstate.send", s.Cancel = "xstate.cancel", s.NullEvent = "", s.Assign = "xstate.assign", s.After = "xstate.after", s.DoneState = "done.state", s.DoneInvoke = "done.invoke", s.Log = "xstate.log", s.Init = "xstate.init", s.Invoke = "xstate.invoke", s.ErrorExecution = "error.execution", s.ErrorCommunication = "error.communication", s.ErrorPlatform = "error.platform", s.ErrorCustom = "xstate.error", s.Update = "xstate.update", s.Pure = "xstate.pure", s.Choose = "xstate.choose";
})(B || (B = {}));
var Tt;
(function(s) {
  s.Parent = "#_parent", s.Internal = "#_internal";
})(Tt || (Tt = {}));
var or = B.Start, Ar = B.Stop, It = B.Raise, Yt = B.Send, os = B.Cancel, cs = B.NullEvent, Dr = B.Assign;
B.After;
B.DoneState;
var ds = B.Log, hs = B.Init, Ot = B.Invoke;
B.ErrorExecution;
B.ErrorPlatform;
B.ErrorCustom;
var ls = B.Update, us = B.Choose, gs = B.Pure, Pr = ".", cr = {}, Ft = "xstate.guard", fs = "", pe = process.env.NODE_ENV === "production", lt;
function Jt(s, e, t) {
  t === void 0 && (t = Pr);
  var r = Qe(s, t), i = Qe(e, t);
  return F(i) ? F(r) ? i === r : !1 : F(r) ? r in i : Object.keys(r).every(function(n) {
    return n in i ? Jt(r[n], i[n]) : !1;
  });
}
function Hr(s) {
  try {
    return F(s) || typeof s == "number" ? "".concat(s) : s.type;
  } catch {
    throw new Error("Events must be strings or objects with a string event.type property.");
  }
}
function Mt(s, e) {
  try {
    return ht(s) ? s : s.toString().split(e);
  } catch {
    throw new Error("'".concat(s, "' is not a valid state path."));
  }
}
function ps(s) {
  return typeof s == "object" && "value" in s && "context" in s && "event" in s && "_event" in s;
}
function Qe(s, e) {
  if (ps(s))
    return s.value;
  if (ht(s))
    return xt(s);
  if (typeof s != "string")
    return s;
  var t = Mt(s, e);
  return xt(t);
}
function xt(s) {
  if (s.length === 1)
    return s[0];
  for (var e = {}, t = e, r = 0; r < s.length - 1; r++)
    r === s.length - 2 ? t[s[r]] = s[r + 1] : (t[s[r]] = {}, t = t[s[r]]);
  return e;
}
function Je(s, e) {
  for (var t = {}, r = Object.keys(s), i = 0; i < r.length; i++) {
    var n = r[i];
    t[n] = e(s[n], n, s, i);
  }
  return t;
}
function dr(s, e, t) {
  var r, i, n = {};
  try {
    for (var a = V(Object.keys(s)), o = a.next(); !o.done; o = a.next()) {
      var d = o.value, h = s[d];
      t(h) && (n[d] = e(h, d, s));
    }
  } catch (u) {
    r = {
      error: u
    };
  } finally {
    try {
      o && !o.done && (i = a.return) && i.call(a);
    } finally {
      if (r) throw r.error;
    }
  }
  return n;
}
var ms = function(s) {
  return function(e) {
    var t, r, i = e;
    try {
      for (var n = V(s), a = n.next(); !a.done; a = n.next()) {
        var o = a.value;
        i = i[o];
      }
    } catch (d) {
      t = {
        error: d
      };
    } finally {
      try {
        a && !a.done && (r = n.return) && r.call(n);
      } finally {
        if (t) throw t.error;
      }
    }
    return i;
  };
};
function vs(s, e) {
  return function(t) {
    var r, i, n = t;
    try {
      for (var a = V(s), o = a.next(); !o.done; o = a.next()) {
        var d = o.value;
        n = n[e][d];
      }
    } catch (h) {
      r = {
        error: h
      };
    } finally {
      try {
        o && !o.done && (i = a.return) && i.call(a);
      } finally {
        if (r) throw r.error;
      }
    }
    return n;
  };
}
function vt(s) {
  if (!s)
    return [[]];
  if (F(s))
    return [[s]];
  var e = K(Object.keys(s).map(function(t) {
    var r = s[t];
    return typeof r != "string" && (!r || !Object.keys(r).length) ? [[t]] : vt(s[t]).map(function(i) {
      return [t].concat(i);
    });
  }));
  return e;
}
function K(s) {
  var e;
  return (e = []).concat.apply(e, L([], j(s), !1));
}
function _r(s) {
  return ht(s) ? s : [s];
}
function ge(s) {
  return s === void 0 ? [] : _r(s);
}
function kr(s, e, t) {
  var r, i;
  if (W(s))
    return s(e, t.data);
  var n = {};
  try {
    for (var a = V(Object.keys(s)), o = a.next(); !o.done; o = a.next()) {
      var d = o.value, h = s[d];
      W(h) ? n[d] = h(e, t.data) : n[d] = h;
    }
  } catch (u) {
    r = {
      error: u
    };
  } finally {
    try {
      o && !o.done && (i = a.return) && i.call(a);
    } finally {
      if (r) throw r.error;
    }
  }
  return n;
}
function ys(s) {
  return /^(done|error)\./.test(s);
}
function ws(s, e) {
  var t, r, i = j([[], []], 2), n = i[0], a = i[1];
  try {
    for (var o = V(s), d = o.next(); !d.done; d = o.next()) {
      var h = d.value;
      e(h) ? n.push(h) : a.push(h);
    }
  } catch (u) {
    t = {
      error: u
    };
  } finally {
    try {
      d && !d.done && (r = o.return) && r.call(o);
    } finally {
      if (t) throw t.error;
    }
  }
  return [n, a];
}
function qr(s, e) {
  return Je(s.states, function(t, r) {
    if (t) {
      var i = (F(e) ? void 0 : e[r]) || (t ? t.current : void 0);
      if (i)
        return {
          current: i,
          states: qr(t, i)
        };
    }
  });
}
function bs(s, e) {
  return {
    current: e,
    states: qr(s, e)
  };
}
function hr(s, e, t, r) {
  pe || Te(!!s, "Attempting to update undefined context");
  var i = s && t.reduce(function(n, a) {
    var o, d, h = a.assignment, u = {
      state: r,
      action: a,
      _event: e
    }, f = {};
    if (W(h))
      f = h(n, e.data, u);
    else
      try {
        for (var w = V(Object.keys(h)), T = w.next(); !T.done; T = w.next()) {
          var R = T.value, S = h[R];
          f[R] = W(S) ? S(n, e.data, u) : S;
        }
      } catch (D) {
        o = {
          error: D
        };
      } finally {
        try {
          T && !T.done && (d = w.return) && d.call(w);
        } finally {
          if (o) throw o.error;
        }
      }
    return Object.assign({}, n, f);
  }, s);
  return i;
}
var Te = function() {
};
pe || (Te = function(s, e) {
  var t = s instanceof Error ? s : void 0;
  if (!(!t && s) && console !== void 0) {
    var r = ["Warning: ".concat(e)];
    t && r.push(t), console.warn.apply(console, r);
  }
});
function ht(s) {
  return Array.isArray(s);
}
function W(s) {
  return typeof s == "function";
}
function F(s) {
  return typeof s == "string";
}
function Nr(s, e) {
  if (s)
    return F(s) ? {
      type: Ft,
      name: s,
      predicate: e ? e[s] : void 0
    } : W(s) ? {
      type: Ft,
      name: s.name,
      predicate: s
    } : s;
}
var Or = /* @__PURE__ */ function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
lt = {}, lt[Or] = function() {
  return this;
}, lt[Symbol.observable] = function() {
  return this;
};
function it(s) {
  return !!s && "__xstatenode" in s;
}
function Zt(s, e) {
  return F(s) || typeof s == "number" ? A({
    type: s
  }, e) : s;
}
function st(s, e) {
  if (!F(s) && "$$type" in s && s.$$type === "scxml")
    return s;
  var t = Zt(s);
  return A({
    name: t.type,
    data: t,
    $$type: "scxml",
    type: "external"
  }, e);
}
function qe(s, e) {
  var t = _r(e).map(function(r) {
    return typeof r > "u" || typeof r == "string" || it(r) ? {
      target: r,
      event: s
    } : A(A({}, r), {
      event: s
    });
  });
  return t;
}
function Ss(s) {
  if (!(s === void 0 || s === fs))
    return ge(s);
}
function Fr(s, e, t, r, i) {
  var n = s.options.guards, a = {
    state: i,
    cond: e,
    _event: r
  };
  if (e.type === Ft)
    return ((n == null ? void 0 : n[e.name]) || e.predicate)(t, r.data, a);
  var o = n == null ? void 0 : n[e.type];
  if (!o)
    throw new Error("Guard '".concat(e.type, "' is not implemented on machine '").concat(s.id, "'."));
  return o(t, r.data, a);
}
function Ts(s) {
  return typeof s == "string" ? {
    type: s
  } : s;
}
function ut(s, e) {
  return "".concat(s, ":invocation[").concat(e, "]");
}
function lr(s) {
  return (s.type === It || s.type === Yt && s.to === Tt.Internal) && typeof s.delay != "number";
}
var jt = /* @__PURE__ */ st({
  type: hs
});
function ur(s, e) {
  return e && e[s] || void 0;
}
function nt(s, e) {
  var t;
  if (F(s) || typeof s == "number") {
    var r = ur(s, e);
    W(r) ? t = {
      type: s,
      exec: r
    } : r ? t = r : t = {
      type: s,
      exec: void 0
    };
  } else if (W(s))
    t = {
      // Convert action to string if unnamed
      type: s.name || s.toString(),
      exec: s
    };
  else {
    var r = ur(s.type, e);
    if (W(r))
      t = A(A({}, s), {
        exec: r
      });
    else if (r) {
      var i = r.type || s.type;
      t = A(A(A({}, r), s), {
        type: i
      });
    } else
      t = s;
  }
  return t;
}
var De = function(s, e) {
  if (!s)
    return [];
  var t = ht(s) ? s : [s];
  return t.map(function(r) {
    return nt(r, e);
  });
};
function zt(s) {
  var e = nt(s);
  return A(A({
    id: F(s) ? s : e.id
  }, e), {
    type: e.type
  });
}
function xs(s, e) {
  return {
    type: It,
    event: typeof s == "function" ? s : Zt(s),
    delay: e ? e.delay : void 0,
    id: e == null ? void 0 : e.id
  };
}
function Es(s, e, t, r) {
  var i = {
    _event: t
  }, n = st(W(s.event) ? s.event(e, t.data, i) : s.event), a;
  if (F(s.delay)) {
    var o = r && r[s.delay];
    a = W(o) ? o(e, t.data, i) : o;
  } else
    a = W(s.delay) ? s.delay(e, t.data, i) : s.delay;
  return A(A({}, s), {
    type: It,
    _event: n,
    delay: a
  });
}
function Cs(s, e) {
  return {
    to: e ? e.to : void 0,
    type: Yt,
    event: W(s) ? s : Zt(s),
    delay: e ? e.delay : void 0,
    // TODO: don't auto-generate IDs here like that
    // there is too big chance of the ID collision
    id: e && e.id !== void 0 ? e.id : W(s) ? s.name : Hr(s)
  };
}
function Rs(s, e, t, r) {
  var i = {
    _event: t
  }, n = st(W(s.event) ? s.event(e, t.data, i) : s.event), a;
  if (F(s.delay)) {
    var o = r && r[s.delay];
    a = W(o) ? o(e, t.data, i) : o;
  } else
    a = W(s.delay) ? s.delay(e, t.data, i) : s.delay;
  var d = W(s.to) ? s.to(e, t.data, i) : s.to;
  return A(A({}, s), {
    to: d,
    _event: n,
    event: n.data,
    delay: a
  });
}
var $s = function(s, e, t) {
  return A(A({}, s), {
    value: F(s.expr) ? s.expr : s.expr(e, t.data, {
      _event: t
    })
  });
}, Is = function(s) {
  return {
    type: os,
    sendId: s
  };
};
function As(s) {
  var e = zt(s);
  return {
    type: B.Start,
    activity: e,
    exec: void 0
  };
}
function Ds(s) {
  var e = W(s) ? s : zt(s);
  return {
    type: B.Stop,
    activity: e,
    exec: void 0
  };
}
function Ps(s, e, t) {
  var r = W(s.activity) ? s.activity(e, t.data) : s.activity, i = typeof r == "string" ? {
    id: r
  } : r, n = {
    type: B.Stop,
    activity: i
  };
  return n;
}
function Hs(s, e) {
  var t = e ? "#".concat(e) : "";
  return "".concat(B.After, "(").concat(s, ")").concat(t);
}
function gt(s, e) {
  var t = "".concat(B.DoneState, ".").concat(s), r = {
    type: t,
    data: e
  };
  return r.toString = function() {
    return t;
  }, r;
}
function _s(s, e) {
  var t = "".concat(B.DoneInvoke, ".").concat(s), r = {
    type: t,
    data: e
  };
  return r.toString = function() {
    return t;
  }, r;
}
function ks(s, e) {
  var t = "".concat(B.ErrorPlatform, ".").concat(s), r = {
    type: t,
    data: e
  };
  return r.toString = function() {
    return t;
  }, r;
}
var qs = function(s) {
  var e, t, r = [];
  try {
    for (var i = V(s), n = i.next(); !n.done; n = i.next())
      for (var a = n.value, o = 0; o < a.actions.length; ) {
        if (a.actions[o].type === Dr) {
          r.push(a.actions[o]), a.actions.splice(o, 1);
          continue;
        }
        o++;
      }
  } catch (d) {
    e = {
      error: d
    };
  } finally {
    try {
      n && !n.done && (t = i.return) && t.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return r;
};
function Ut(s, e, t, r, i, n, a) {
  a === void 0 && (a = !1);
  var o = a ? [] : qs(i), d = o.length ? hr(t, r, o, e) : t, h = a ? [t] : void 0, u = [];
  function f(R, S) {
    var D;
    switch (S.type) {
      case It: {
        var g = Es(S, d, r, s.options.delays);
        return n && typeof g.delay == "number" && n(g, d, r), g;
      }
      case Yt:
        var E = Rs(S, d, r, s.options.delays);
        if (!pe) {
          var _ = S.delay;
          Te(
            !F(_) || typeof E.delay == "number",
            // tslint:disable-next-line:max-line-length
            "No delay reference for delay expression '".concat(_, "' was found on machine '").concat(s.id, "'")
          );
        }
        return n && E.to !== Tt.Internal && (R === "entry" ? u.push(E) : n(E, d, r)), E;
      case ds: {
        var q = $s(S, d, r);
        return n == null || n(q, d, r), q;
      }
      case us: {
        var Z = S, U = (D = Z.conds.find(function(P) {
          var he = Nr(P.cond, s.options.guards);
          return !he || Fr(s, he, d, r, n ? void 0 : e);
        })) === null || D === void 0 ? void 0 : D.actions;
        if (!U)
          return [];
        var b = j(Ut(s, e, d, r, [{
          type: R,
          actions: De(ge(U), s.options.actions)
        }], n, a), 2), c = b[0], I = b[1];
        return d = I, h == null || h.push(d), c;
      }
      case gs: {
        var U = S.get(d, r.data);
        if (!U)
          return [];
        var $ = j(Ut(s, e, d, r, [{
          type: R,
          actions: De(ge(U), s.options.actions)
        }], n, a), 2), l = $[0], m = $[1];
        return d = m, h == null || h.push(d), l;
      }
      case Ar: {
        var q = Ps(S, d, r);
        return n == null || n(q, t, r), q;
      }
      case Dr: {
        d = hr(d, r, [S], n ? void 0 : e), h == null || h.push(d);
        break;
      }
      default:
        var p = nt(S, s.options.actions), M = p.exec;
        if (n)
          n(p, d, r);
        else if (M && h) {
          var k = h.length - 1, Q = A(A({}, p), {
            exec: function(P) {
              for (var he = [], ae = 1; ae < arguments.length; ae++)
                he[ae - 1] = arguments[ae];
              M.apply(void 0, L([h[k]], j(he), !1));
            }
          });
          p = Q;
        }
        return p;
    }
  }
  function w(R) {
    var S, D, g = [];
    try {
      for (var E = V(R.actions), _ = E.next(); !_.done; _ = E.next()) {
        var q = _.value, Z = f(R.type, q);
        Z && (g = g.concat(Z));
      }
    } catch (U) {
      S = {
        error: U
      };
    } finally {
      try {
        _ && !_.done && (D = E.return) && D.call(E);
      } finally {
        if (S) throw S.error;
      }
    }
    return u.forEach(function(U) {
      n(U, d, r);
    }), u.length = 0, g;
  }
  var T = K(i.map(w));
  return [T, d];
}
var Ns = function(s, e) {
  var t = e(s);
  return t;
};
function Mr(s) {
  var e;
  return e = {
    id: s,
    send: function() {
    },
    subscribe: function() {
      return {
        unsubscribe: function() {
        }
      };
    },
    getSnapshot: function() {
    },
    toJSON: function() {
      return {
        id: s
      };
    }
  }, e[Or] = function() {
    return this;
  }, e;
}
function Os(s, e, t, r) {
  var i, n = Ts(s.src), a = (i = e == null ? void 0 : e.options.services) === null || i === void 0 ? void 0 : i[n.type], o = s.data ? kr(s.data, t, r) : void 0, d = a ? Fs(a, s.id, o) : Mr(s.id);
  return d.meta = s, d;
}
function Fs(s, e, t) {
  var r = Mr(e);
  if (r.deferred = !0, it(s)) {
    var i = r.state = Ns(void 0, function() {
      return (t ? s.withContext(t) : s).initialState;
    });
    r.getSnapshot = function() {
      return i;
    };
  }
  return r;
}
var Et = function(s) {
  return s.type === "atomic" || s.type === "final";
};
function jr(s) {
  return Object.keys(s.states).map(function(e) {
    return s.states[e];
  });
}
function at(s) {
  return jr(s).filter(function(e) {
    return e.type !== "history";
  });
}
function Ur(s) {
  var e = [s];
  return Et(s) ? e : e.concat(K(at(s).map(Ur)));
}
function Ze(s, e) {
  var t, r, i, n, a, o, d, h, u = new Set(s), f = Bt(u), w = new Set(e);
  try {
    for (var T = V(w), R = T.next(); !R.done; R = T.next())
      for (var S = R.value, D = S.parent; D && !w.has(D); )
        w.add(D), D = D.parent;
  } catch (I) {
    t = {
      error: I
    };
  } finally {
    try {
      R && !R.done && (r = T.return) && r.call(T);
    } finally {
      if (t) throw t.error;
    }
  }
  var g = Bt(w);
  try {
    for (var E = V(w), _ = E.next(); !_.done; _ = E.next()) {
      var S = _.value;
      if (S.type === "compound" && (!g.get(S) || !g.get(S).length))
        f.get(S) ? f.get(S).forEach(function($) {
          return w.add($);
        }) : S.initialStateNodes.forEach(function($) {
          return w.add($);
        });
      else if (S.type === "parallel")
        try {
          for (var q = (a = void 0, V(at(S))), Z = q.next(); !Z.done; Z = q.next()) {
            var U = Z.value;
            w.has(U) || (w.add(U), f.get(U) ? f.get(U).forEach(function($) {
              return w.add($);
            }) : U.initialStateNodes.forEach(function($) {
              return w.add($);
            }));
          }
        } catch ($) {
          a = {
            error: $
          };
        } finally {
          try {
            Z && !Z.done && (o = q.return) && o.call(q);
          } finally {
            if (a) throw a.error;
          }
        }
    }
  } catch (I) {
    i = {
      error: I
    };
  } finally {
    try {
      _ && !_.done && (n = E.return) && n.call(E);
    } finally {
      if (i) throw i.error;
    }
  }
  try {
    for (var b = V(w), c = b.next(); !c.done; c = b.next())
      for (var S = c.value, D = S.parent; D && !w.has(D); )
        w.add(D), D = D.parent;
  } catch (I) {
    d = {
      error: I
    };
  } finally {
    try {
      c && !c.done && (h = b.return) && h.call(b);
    } finally {
      if (d) throw d.error;
    }
  }
  return w;
}
function Br(s, e) {
  var t = e.get(s);
  if (!t)
    return {};
  if (s.type === "compound") {
    var r = t[0];
    if (r) {
      if (Et(r))
        return r.key;
    } else
      return {};
  }
  var i = {};
  return t.forEach(function(n) {
    i[n.key] = Br(n, e);
  }), i;
}
function Bt(s) {
  var e, t, r = /* @__PURE__ */ new Map();
  try {
    for (var i = V(s), n = i.next(); !n.done; n = i.next()) {
      var a = n.value;
      r.has(a) || r.set(a, []), a.parent && (r.has(a.parent) || r.set(a.parent, []), r.get(a.parent).push(a));
    }
  } catch (o) {
    e = {
      error: o
    };
  } finally {
    try {
      n && !n.done && (t = i.return) && t.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return r;
}
function Ms(s, e) {
  var t = Ze([s], e);
  return Br(s, Bt(t));
}
function ze(s, e) {
  return Array.isArray(s) ? s.some(function(t) {
    return t === e;
  }) : s instanceof Set ? s.has(e) : !1;
}
function js(s) {
  return L([], j(new Set(K(L([], j(s.map(function(e) {
    return e.ownEvents;
  })), !1)))), !1);
}
function yt(s, e) {
  return e.type === "compound" ? at(e).some(function(t) {
    return t.type === "final" && ze(s, t);
  }) : e.type === "parallel" ? at(e).every(function(t) {
    return yt(s, t);
  }) : !1;
}
function Us(s) {
  return s === void 0 && (s = []), s.reduce(function(e, t) {
    return t.meta !== void 0 && (e[t.id] = t.meta), e;
  }, {});
}
function gr(s) {
  return new Set(K(s.map(function(e) {
    return e.tags;
  })));
}
function Lr(s, e) {
  if (s === e)
    return !0;
  if (s === void 0 || e === void 0)
    return !1;
  if (F(s) || F(e))
    return s === e;
  var t = Object.keys(s), r = Object.keys(e);
  return t.length === r.length && t.every(function(i) {
    return Lr(s[i], e[i]);
  });
}
var Ee = (
  /** @class */
  /* @__PURE__ */ function() {
    function s(e) {
      var t = this, r;
      this.actions = [], this.activities = cr, this.meta = {}, this.events = [], this.value = e.value, this.context = e.context, this._event = e._event, this._sessionid = e._sessionid, this.event = this._event.data, this.historyValue = e.historyValue, this.history = e.history, this.actions = e.actions || [], this.activities = e.activities || cr, this.meta = Us(e.configuration), this.events = e.events || [], this.matches = this.matches.bind(this), this.toStrings = this.toStrings.bind(this), this.configuration = e.configuration, this.transitions = e.transitions, this.children = e.children, this.done = !!e.done, this.tags = (r = Array.isArray(e.tags) ? new Set(e.tags) : e.tags) !== null && r !== void 0 ? r : /* @__PURE__ */ new Set(), this.machine = e.machine, Object.defineProperty(this, "nextEvents", {
        get: function() {
          return js(t.configuration);
        }
      });
    }
    return s.from = function(e, t) {
      if (e instanceof s)
        return e.context !== t ? new s({
          value: e.value,
          context: t,
          _event: e._event,
          _sessionid: null,
          historyValue: e.historyValue,
          history: e.history,
          actions: [],
          activities: e.activities,
          events: [],
          configuration: [],
          transitions: [],
          children: {}
        }) : e;
      var r = jt;
      return new s({
        value: e,
        context: t,
        _event: r,
        _sessionid: null,
        historyValue: void 0,
        history: void 0,
        actions: [],
        activities: void 0,
        events: [],
        configuration: [],
        transitions: [],
        children: {}
      });
    }, s.create = function(e) {
      return new s(e);
    }, s.inert = function(e, t) {
      if (e instanceof s) {
        if (!e.actions.length)
          return e;
        var r = jt;
        return new s({
          value: e.value,
          context: t,
          _event: r,
          _sessionid: null,
          historyValue: e.historyValue,
          history: e.history,
          activities: e.activities,
          configuration: e.configuration,
          transitions: [],
          children: {}
        });
      }
      return s.from(e, t);
    }, s.prototype.toStrings = function(e, t) {
      var r = this;
      if (e === void 0 && (e = this.value), t === void 0 && (t = "."), F(e))
        return [e];
      var i = Object.keys(e);
      return i.concat.apply(i, L([], j(i.map(function(n) {
        return r.toStrings(e[n], t).map(function(a) {
          return n + t + a;
        });
      })), !1));
    }, s.prototype.toJSON = function() {
      var e = this;
      e.configuration, e.transitions;
      var t = e.tags;
      e.machine;
      var r = Wt(e, ["configuration", "transitions", "tags", "machine"]);
      return A(A({}, r), {
        tags: Array.from(t)
      });
    }, s.prototype.matches = function(e) {
      return Jt(e, this.value);
    }, s.prototype.hasTag = function(e) {
      return this.tags.has(e);
    }, s.prototype.can = function(e) {
      var t;
      pe && Te(!!this.machine, "state.can(...) used outside of a machine-created State object; this will always return false.");
      var r = (t = this.machine) === null || t === void 0 ? void 0 : t.getTransitionData(this, e);
      return !!(r != null && r.transitions.length) && // Check that at least one transition is not forbidden
      r.transitions.some(function(i) {
        return i.target !== void 0 || i.actions.length;
      });
    }, s;
  }()
);
function Bs(s) {
  if (typeof s == "string") {
    var e = {
      type: s
    };
    return e.toString = function() {
      return s;
    }, e;
  }
  return s;
}
function ft(s) {
  return A(A({
    type: Ot
  }, s), {
    toJSON: function() {
      s.onDone, s.onError;
      var e = Wt(s, ["onDone", "onError"]);
      return A(A({}, e), {
        type: Ot,
        src: Bs(s.src)
      });
    }
  });
}
var Me = "", Lt = "#", We = "*", Ne = {}, Oe = function(s) {
  return s[0] === Lt;
}, Ls = function() {
  return {
    actions: {},
    guards: {},
    services: {},
    activities: {},
    delays: {}
  };
}, Vs = function(s, e, t) {
  var r = t.slice(0, -1).some(function(n) {
    return !("cond" in n) && !("in" in n) && (F(n.target) || it(n.target));
  }), i = e === Me ? "the transient event" : "event '".concat(e, "'");
  Te(!r, "One or more transitions for ".concat(i, " on state '").concat(s.id, "' are unreachable. ") + "Make sure that the default transition is the last one defined.");
}, Gs = (
  /** @class */
  /* @__PURE__ */ function() {
    function s(e, t, r, i) {
      r === void 0 && (r = "context" in e ? e.context : void 0);
      var n = this, a;
      this.config = e, this._context = r, this.order = -1, this.__xstatenode = !0, this.__cache = {
        events: void 0,
        relativeValue: /* @__PURE__ */ new Map(),
        initialStateValue: void 0,
        initialState: void 0,
        on: void 0,
        transitions: void 0,
        candidates: {},
        delayedTransitions: void 0
      }, this.idMap = {}, this.tags = [], this.options = Object.assign(Ls(), t), this.parent = i == null ? void 0 : i.parent, this.key = this.config.key || (i == null ? void 0 : i.key) || this.config.id || "(machine)", this.machine = this.parent ? this.parent.machine : this, this.path = this.parent ? this.parent.path.concat(this.key) : [], this.delimiter = this.config.delimiter || (this.parent ? this.parent.delimiter : Pr), this.id = this.config.id || L([this.machine.key], j(this.path), !1).join(this.delimiter), this.version = this.parent ? this.parent.version : this.config.version, this.type = this.config.type || (this.config.parallel ? "parallel" : this.config.states && Object.keys(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic"), this.schema = this.parent ? this.machine.schema : (a = this.config.schema) !== null && a !== void 0 ? a : {}, this.description = this.config.description, pe || Te(!("parallel" in this.config), 'The "parallel" property is deprecated and will be removed in version 4.1. '.concat(this.config.parallel ? "Replace with `type: 'parallel'`" : "Use `type: '".concat(this.type, "'`"), " in the config for state node '").concat(this.id, "' instead.")), this.initial = this.config.initial, this.states = this.config.states ? Je(this.config.states, function(h, u) {
        var f, w = new s(h, {}, void 0, {
          parent: n,
          key: u
        });
        return Object.assign(n.idMap, A((f = {}, f[w.id] = w, f), w.idMap)), w;
      }) : Ne;
      var o = 0;
      function d(h) {
        var u, f;
        h.order = o++;
        try {
          for (var w = V(jr(h)), T = w.next(); !T.done; T = w.next()) {
            var R = T.value;
            d(R);
          }
        } catch (S) {
          u = {
            error: S
          };
        } finally {
          try {
            T && !T.done && (f = w.return) && f.call(w);
          } finally {
            if (u) throw u.error;
          }
        }
      }
      d(this), this.history = this.config.history === !0 ? "shallow" : this.config.history || !1, this._transient = !!this.config.always || (this.config.on ? Array.isArray(this.config.on) ? this.config.on.some(function(h) {
        var u = h.event;
        return u === Me;
      }) : Me in this.config.on : !1), this.strict = !!this.config.strict, this.onEntry = ge(this.config.entry || this.config.onEntry).map(function(h) {
        return nt(h);
      }), this.onExit = ge(this.config.exit || this.config.onExit).map(function(h) {
        return nt(h);
      }), this.meta = this.config.meta, this.doneData = this.type === "final" ? this.config.data : void 0, this.invoke = ge(this.config.invoke).map(function(h, u) {
        var f, w;
        if (it(h)) {
          var T = ut(n.id, u);
          return n.machine.options.services = A((f = {}, f[T] = h, f), n.machine.options.services), ft({
            src: T,
            id: T
          });
        } else if (F(h.src)) {
          var T = h.id || ut(n.id, u);
          return ft(A(A({}, h), {
            id: T,
            src: h.src
          }));
        } else if (it(h.src) || W(h.src)) {
          var T = h.id || ut(n.id, u);
          return n.machine.options.services = A((w = {}, w[T] = h.src, w), n.machine.options.services), ft(A(A({
            id: T
          }, h), {
            src: T
          }));
        } else {
          var R = h.src;
          return ft(A(A({
            id: ut(n.id, u)
          }, h), {
            src: R
          }));
        }
      }), this.activities = ge(this.config.activities).concat(this.invoke).map(function(h) {
        return zt(h);
      }), this.transition = this.transition.bind(this), this.tags = ge(this.config.tags);
    }
    return s.prototype._init = function() {
      this.__cache.transitions || Ur(this).forEach(function(e) {
        return e.on;
      });
    }, s.prototype.withConfig = function(e, t) {
      var r = this.options, i = r.actions, n = r.activities, a = r.guards, o = r.services, d = r.delays;
      return new s(this.config, {
        actions: A(A({}, i), e.actions),
        activities: A(A({}, n), e.activities),
        guards: A(A({}, a), e.guards),
        services: A(A({}, o), e.services),
        delays: A(A({}, d), e.delays)
      }, t ?? this.context);
    }, s.prototype.withContext = function(e) {
      return new s(this.config, this.options, e);
    }, Object.defineProperty(s.prototype, "context", {
      get: function() {
        return W(this._context) ? this._context() : this._context;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(s.prototype, "definition", {
      /**
       * The well-structured state node definition.
       */
      get: function() {
        return {
          id: this.id,
          key: this.key,
          version: this.version,
          context: this.context,
          type: this.type,
          initial: this.initial,
          history: this.history,
          states: Je(this.states, function(e) {
            return e.definition;
          }),
          on: this.on,
          transitions: this.transitions,
          entry: this.onEntry,
          exit: this.onExit,
          activities: this.activities || [],
          meta: this.meta,
          order: this.order || -1,
          data: this.doneData,
          invoke: this.invoke,
          description: this.description,
          tags: this.tags
        };
      },
      enumerable: !1,
      configurable: !0
    }), s.prototype.toJSON = function() {
      return this.definition;
    }, Object.defineProperty(s.prototype, "on", {
      /**
       * The mapping of events to transitions.
       */
      get: function() {
        if (this.__cache.on)
          return this.__cache.on;
        var e = this.transitions;
        return this.__cache.on = e.reduce(function(t, r) {
          return t[r.eventType] = t[r.eventType] || [], t[r.eventType].push(r), t;
        }, {});
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(s.prototype, "after", {
      get: function() {
        return this.__cache.delayedTransitions || (this.__cache.delayedTransitions = this.getDelayedTransitions(), this.__cache.delayedTransitions);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(s.prototype, "transitions", {
      /**
       * All the transitions that can be taken from this state node.
       */
      get: function() {
        return this.__cache.transitions || (this.__cache.transitions = this.formatTransitions(), this.__cache.transitions);
      },
      enumerable: !1,
      configurable: !0
    }), s.prototype.getCandidates = function(e) {
      if (this.__cache.candidates[e])
        return this.__cache.candidates[e];
      var t = e === Me, r = this.transitions.filter(function(i) {
        var n = i.eventType === e;
        return t ? n : n || i.eventType === We;
      });
      return this.__cache.candidates[e] = r, r;
    }, s.prototype.getDelayedTransitions = function() {
      var e = this, t = this.config.after;
      if (!t)
        return [];
      var r = function(n, a) {
        var o = W(n) ? "".concat(e.id, ":delay[").concat(a, "]") : n, d = Hs(o, e.id);
        return e.onEntry.push(Cs(d, {
          delay: n
        })), e.onExit.push(Is(d)), d;
      }, i = ht(t) ? t.map(function(n, a) {
        var o = r(n.delay, a);
        return A(A({}, n), {
          event: o
        });
      }) : K(Object.keys(t).map(function(n, a) {
        var o = t[n], d = F(o) ? {
          target: o
        } : o, h = isNaN(+n) ? n : +n, u = r(h, a);
        return ge(d).map(function(f) {
          return A(A({}, f), {
            event: u,
            delay: h
          });
        });
      }));
      return i.map(function(n) {
        var a = n.delay;
        return A(A({}, e.formatTransition(n)), {
          delay: a
        });
      });
    }, s.prototype.getStateNodes = function(e) {
      var t, r = this;
      if (!e)
        return [];
      var i = e instanceof Ee ? e.value : Qe(e, this.delimiter);
      if (F(i)) {
        var n = this.getStateNode(i).initial;
        return n !== void 0 ? this.getStateNodes((t = {}, t[i] = n, t)) : [this, this.states[i]];
      }
      var a = Object.keys(i), o = [this];
      return o.push.apply(o, L([], j(K(a.map(function(d) {
        return r.getStateNode(d).getStateNodes(i[d]);
      }))), !1)), o;
    }, s.prototype.handles = function(e) {
      var t = Hr(e);
      return this.events.includes(t);
    }, s.prototype.resolveState = function(e) {
      var t = e instanceof Ee ? e : Ee.create(e), r = Array.from(Ze([], this.getStateNodes(t.value)));
      return new Ee(A(A({}, t), {
        value: this.resolve(t.value),
        configuration: r,
        done: yt(r, this),
        tags: gr(r),
        machine: this.machine
      }));
    }, s.prototype.transitionLeafNode = function(e, t, r) {
      var i = this.getStateNode(e), n = i.next(t, r);
      return !n || !n.transitions.length ? this.next(t, r) : n;
    }, s.prototype.transitionCompoundNode = function(e, t, r) {
      var i = Object.keys(e), n = this.getStateNode(i[0]), a = n._transition(e[i[0]], t, r);
      return !a || !a.transitions.length ? this.next(t, r) : a;
    }, s.prototype.transitionParallelNode = function(e, t, r) {
      var i, n, a = {};
      try {
        for (var o = V(Object.keys(e)), d = o.next(); !d.done; d = o.next()) {
          var h = d.value, u = e[h];
          if (u) {
            var f = this.getStateNode(h), w = f._transition(u, t, r);
            w && (a[h] = w);
          }
        }
      } catch (g) {
        i = {
          error: g
        };
      } finally {
        try {
          d && !d.done && (n = o.return) && n.call(o);
        } finally {
          if (i) throw i.error;
        }
      }
      var T = Object.keys(a).map(function(g) {
        return a[g];
      }), R = K(T.map(function(g) {
        return g.transitions;
      })), S = T.some(function(g) {
        return g.transitions.length > 0;
      });
      if (!S)
        return this.next(t, r);
      var D = K(Object.keys(a).map(function(g) {
        return a[g].configuration;
      }));
      return {
        transitions: R,
        exitSet: K(T.map(function(g) {
          return g.exitSet;
        })),
        configuration: D,
        source: t,
        actions: K(Object.keys(a).map(function(g) {
          return a[g].actions;
        }))
      };
    }, s.prototype._transition = function(e, t, r) {
      return F(e) ? this.transitionLeafNode(e, t, r) : Object.keys(e).length === 1 ? this.transitionCompoundNode(e, t, r) : this.transitionParallelNode(e, t, r);
    }, s.prototype.getTransitionData = function(e, t) {
      return this._transition(e.value, e, st(t));
    }, s.prototype.next = function(e, t) {
      var r, i, n = this, a = t.name, o = [], d = [], h;
      try {
        for (var u = V(this.getCandidates(a)), f = u.next(); !f.done; f = u.next()) {
          var w = f.value, T = w.cond, R = w.in, S = e.context, D = R ? F(R) && Oe(R) ? (
            // Check if in state by ID
            e.matches(Qe(this.getStateNodeById(R).path, this.delimiter))
          ) : (
            // Check if in state by relative grandparent
            Jt(Qe(R, this.delimiter), ms(this.path.slice(0, -2))(e.value))
          ) : !0, g = !1;
          try {
            g = !T || Fr(this.machine, T, S, t, e);
          } catch (q) {
            throw new Error("Unable to evaluate guard '".concat(T.name || T.type, "' in transition for event '").concat(a, "' in state node '").concat(this.id, `':
`).concat(q.message));
          }
          if (g && D) {
            w.target !== void 0 && (d = w.target), o.push.apply(o, L([], j(w.actions), !1)), h = w;
            break;
          }
        }
      } catch (q) {
        r = {
          error: q
        };
      } finally {
        try {
          f && !f.done && (i = u.return) && i.call(u);
        } finally {
          if (r) throw r.error;
        }
      }
      if (h) {
        if (!d.length)
          return {
            transitions: [h],
            exitSet: [],
            configuration: e.value ? [this] : [],
            source: e,
            actions: o
          };
        var E = K(d.map(function(q) {
          return n.getRelativeStateNodes(q, e.historyValue);
        })), _ = !!h.internal;
        return {
          transitions: [h],
          exitSet: _ ? [] : K(d.map(function(q) {
            return n.getPotentiallyReenteringNodes(q);
          })),
          configuration: E,
          source: e,
          actions: o
        };
      }
    }, s.prototype.getPotentiallyReenteringNodes = function(e) {
      if (this.order < e.order)
        return [this];
      for (var t = [], r = this, i = e; r && r !== i; )
        t.push(r), r = r.parent;
      return r !== i ? [] : (t.push(i), t);
    }, s.prototype.getActions = function(e, t, r, i, n, a, o) {
      var d, h, u, f, w = this, T = a ? Ze([], this.getStateNodes(a.value)) : [], R = /* @__PURE__ */ new Set();
      try {
        for (var S = V(Array.from(e).sort(function(l, m) {
          return l.order - m.order;
        })), D = S.next(); !D.done; D = S.next()) {
          var g = D.value;
          (!ze(T, g) || ze(r.exitSet, g) || g.parent && R.has(g.parent)) && R.add(g);
        }
      } catch (l) {
        d = {
          error: l
        };
      } finally {
        try {
          D && !D.done && (h = S.return) && h.call(S);
        } finally {
          if (d) throw d.error;
        }
      }
      try {
        for (var E = V(T), _ = E.next(); !_.done; _ = E.next()) {
          var g = _.value;
          (!ze(e, g) || ze(r.exitSet, g.parent)) && r.exitSet.push(g);
        }
      } catch (l) {
        u = {
          error: l
        };
      } finally {
        try {
          _ && !_.done && (f = E.return) && f.call(E);
        } finally {
          if (u) throw u.error;
        }
      }
      r.exitSet.sort(function(l, m) {
        return m.order - l.order;
      });
      var q = Array.from(R).sort(function(l, m) {
        return l.order - m.order;
      }), Z = new Set(r.exitSet), U = K(q.map(function(l) {
        var m = [];
        if (l.type !== "final")
          return m;
        var p = l.parent;
        if (!p.parent)
          return m;
        m.push(
          gt(l.id, l.doneData),
          // TODO: deprecate - final states should not emit done events for their own state.
          gt(p.id, l.doneData ? kr(l.doneData, i, n) : void 0)
        );
        var M = p.parent;
        return M.type === "parallel" && at(M).every(function(k) {
          return yt(r.configuration, k);
        }) && m.push(gt(M.id)), m;
      })), b = q.map(function(l) {
        var m = l.onEntry, p = l.activities.map(function(M) {
          return As(M);
        });
        return {
          type: "entry",
          actions: De(o ? L(L([], j(m), !1), j(p), !1) : L(L([], j(p), !1), j(m), !1), w.machine.options.actions)
        };
      }).concat({
        type: "state_done",
        actions: U.map(function(l) {
          return xs(l);
        })
      }), c = Array.from(Z).map(function(l) {
        return {
          type: "exit",
          actions: De(L(L([], j(l.onExit), !1), j(l.activities.map(function(m) {
            return Ds(m);
          })), !1), w.machine.options.actions)
        };
      }), I = c.concat({
        type: "transition",
        actions: De(r.actions, this.machine.options.actions)
      }).concat(b);
      if (t) {
        var $ = De(K(L([], j(e), !1).sort(function(l, m) {
          return m.order - l.order;
        }).map(function(l) {
          return l.onExit;
        })), this.machine.options.actions).filter(function(l) {
          return !lr(l);
        });
        return I.concat({
          type: "stop",
          actions: $
        });
      }
      return I;
    }, s.prototype.transition = function(e, t, r, i) {
      e === void 0 && (e = this.initialState);
      var n = st(t), a;
      if (e instanceof Ee)
        a = r === void 0 ? e : this.resolveState(Ee.from(e, r));
      else {
        var o = F(e) ? this.resolve(xt(this.getResolvedPath(e))) : this.resolve(e), d = r ?? this.machine.context;
        a = this.resolveState(Ee.from(o, d));
      }
      if (!pe && n.name === We)
        throw new Error("An event cannot have the wildcard type ('".concat(We, "')"));
      if (this.strict && !this.events.includes(n.name) && !ys(n.name))
        throw new Error("Machine '".concat(this.id, "' does not accept event '").concat(n.name, "'"));
      var h = this._transition(a.value, a, n) || {
        transitions: [],
        configuration: [],
        exitSet: [],
        source: a,
        actions: []
      }, u = Ze([], this.getStateNodes(a.value)), f = h.configuration.length ? Ze(u, h.configuration) : u;
      return h.configuration = L([], j(f), !1), this.resolveTransition(h, a, a.context, i, n);
    }, s.prototype.resolveRaisedTransition = function(e, t, r, i) {
      var n, a = e.actions;
      return e = this.transition(e, t, void 0, i), e._event = r, e.event = r.data, (n = e.actions).unshift.apply(n, L([], j(a), !1)), e;
    }, s.prototype.resolveTransition = function(e, t, r, i, n) {
      var a, o, d, h, u = this;
      n === void 0 && (n = jt);
      var f = e.configuration, w = !t || e.transitions.length > 0, T = w ? e.configuration : t ? t.configuration : [], R = yt(T, this), S = w ? Ms(this.machine, f) : void 0, D = t ? t.historyValue ? t.historyValue : e.source ? this.machine.historyValue(t.value) : void 0 : void 0, g = this.getActions(new Set(T), R, e, r, n, t, i), E = t ? A({}, t.activities) : {};
      try {
        for (var _ = V(g), q = _.next(); !q.done; q = _.next()) {
          var Z = q.value;
          try {
            for (var U = (d = void 0, V(Z.actions)), b = U.next(); !b.done; b = U.next()) {
              var c = b.value;
              c.type === or ? E[c.activity.id || c.activity.type] = c : c.type === Ar && (E[c.activity.id || c.activity.type] = !1);
            }
          } catch (ue) {
            d = {
              error: ue
            };
          } finally {
            try {
              b && !b.done && (h = U.return) && h.call(U);
            } finally {
              if (d) throw d.error;
            }
          }
        }
      } catch (ue) {
        a = {
          error: ue
        };
      } finally {
        try {
          q && !q.done && (o = _.return) && o.call(_);
        } finally {
          if (a) throw a.error;
        }
      }
      var I = j(Ut(this, t, r, n, g, i, this.machine.config.predictableActionArguments || this.machine.config.preserveActionOrder), 2), $ = I[0], l = I[1], m = j(ws($, lr), 2), p = m[0], M = m[1], k = $.filter(function(ue) {
        var ke;
        return ue.type === or && ((ke = ue.activity) === null || ke === void 0 ? void 0 : ke.type) === Ot;
      }), Q = k.reduce(function(ue, ke) {
        return ue[ke.activity.id] = Os(ke.activity, u.machine, l, n), ue;
      }, t ? A({}, t.children) : {}), P = new Ee({
        value: S || t.value,
        context: l,
        _event: n,
        // Persist _sessionid between states
        _sessionid: t ? t._sessionid : null,
        historyValue: S ? D ? bs(D, S) : void 0 : t ? t.historyValue : void 0,
        history: !S || e.source ? t : void 0,
        actions: S ? M : [],
        activities: S ? E : t ? t.activities : {},
        events: [],
        configuration: T,
        transitions: e.transitions,
        children: Q,
        done: R,
        tags: gr(T),
        machine: this
      }), he = r !== l;
      P.changed = n.name === ls || he;
      var ae = P.history;
      ae && delete ae.history;
      var Qt = !R && (this._transient || f.some(function(ue) {
        return ue._transient;
      }));
      if (!w && (!Qt || n.name === Me))
        return P;
      var le = P;
      if (!R)
        for (Qt && (le = this.resolveRaisedTransition(le, {
          type: cs
        }, n, i)); p.length; ) {
          var Gr = p.shift();
          le = this.resolveRaisedTransition(le, Gr._event, n, i);
        }
      var Kr = le.changed || (ae ? !!le.actions.length || he || typeof ae.value != typeof le.value || !Lr(le.value, ae.value) : void 0);
      return le.changed = Kr, le.history = ae, le;
    }, s.prototype.getStateNode = function(e) {
      if (Oe(e))
        return this.machine.getStateNodeById(e);
      if (!this.states)
        throw new Error("Unable to retrieve child state '".concat(e, "' from '").concat(this.id, "'; no child states exist."));
      var t = this.states[e];
      if (!t)
        throw new Error("Child state '".concat(e, "' does not exist on '").concat(this.id, "'"));
      return t;
    }, s.prototype.getStateNodeById = function(e) {
      var t = Oe(e) ? e.slice(Lt.length) : e;
      if (t === this.id)
        return this;
      var r = this.machine.idMap[t];
      if (!r)
        throw new Error("Child state node '#".concat(t, "' does not exist on machine '").concat(this.id, "'"));
      return r;
    }, s.prototype.getStateNodeByPath = function(e) {
      if (typeof e == "string" && Oe(e))
        try {
          return this.getStateNodeById(e.slice(1));
        } catch {
        }
      for (var t = Mt(e, this.delimiter).slice(), r = this; t.length; ) {
        var i = t.shift();
        if (!i.length)
          break;
        r = r.getStateNode(i);
      }
      return r;
    }, s.prototype.resolve = function(e) {
      var t, r = this;
      if (!e)
        return this.initialStateValue || Ne;
      switch (this.type) {
        case "parallel":
          return Je(this.initialStateValue, function(n, a) {
            return n ? r.getStateNode(a).resolve(e[a] || n) : Ne;
          });
        case "compound":
          if (F(e)) {
            var i = this.getStateNode(e);
            return i.type === "parallel" || i.type === "compound" ? (t = {}, t[e] = i.initialStateValue, t) : e;
          }
          return Object.keys(e).length ? Je(e, function(n, a) {
            return n ? r.getStateNode(a).resolve(n) : Ne;
          }) : this.initialStateValue || {};
        default:
          return e || Ne;
      }
    }, s.prototype.getResolvedPath = function(e) {
      if (Oe(e)) {
        var t = this.machine.idMap[e.slice(Lt.length)];
        if (!t)
          throw new Error("Unable to find state node '".concat(e, "'"));
        return t.path;
      }
      return Mt(e, this.delimiter);
    }, Object.defineProperty(s.prototype, "initialStateValue", {
      get: function() {
        var e;
        if (this.__cache.initialStateValue)
          return this.__cache.initialStateValue;
        var t;
        if (this.type === "parallel")
          t = dr(this.states, function(r) {
            return r.initialStateValue || Ne;
          }, function(r) {
            return r.type !== "history";
          });
        else if (this.initial !== void 0) {
          if (!this.states[this.initial])
            throw new Error("Initial state '".concat(this.initial, "' not found on '").concat(this.key, "'"));
          t = Et(this.states[this.initial]) ? this.initial : (e = {}, e[this.initial] = this.states[this.initial].initialStateValue, e);
        } else
          t = {};
        return this.__cache.initialStateValue = t, this.__cache.initialStateValue;
      },
      enumerable: !1,
      configurable: !0
    }), s.prototype.getInitialState = function(e, t) {
      this._init();
      var r = this.getStateNodes(e);
      return this.resolveTransition({
        configuration: r,
        exitSet: [],
        transitions: [],
        source: void 0,
        actions: []
      }, void 0, t ?? this.machine.context, void 0);
    }, Object.defineProperty(s.prototype, "initialState", {
      /**
       * The initial State instance, which includes all actions to be executed from
       * entering the initial state.
       */
      get: function() {
        var e = this.initialStateValue;
        if (!e)
          throw new Error("Cannot retrieve initial state from simple state '".concat(this.id, "'."));
        return this.getInitialState(e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(s.prototype, "target", {
      /**
       * The target state value of the history state node, if it exists. This represents the
       * default state value to transition to if no history value exists yet.
       */
      get: function() {
        var e;
        if (this.type === "history") {
          var t = this.config;
          F(t.target) ? e = Oe(t.target) ? xt(this.machine.getStateNodeById(t.target).path.slice(this.path.length - 1)) : t.target : e = t.target;
        }
        return e;
      },
      enumerable: !1,
      configurable: !0
    }), s.prototype.getRelativeStateNodes = function(e, t, r) {
      return r === void 0 && (r = !0), r ? e.type === "history" ? e.resolveHistory(t) : e.initialStateNodes : [e];
    }, Object.defineProperty(s.prototype, "initialStateNodes", {
      get: function() {
        var e = this;
        if (Et(this))
          return [this];
        if (this.type === "compound" && !this.initial)
          return pe || Te(!1, "Compound state node '".concat(this.id, "' has no initial state.")), [this];
        var t = vt(this.initialStateValue);
        return K(t.map(function(r) {
          return e.getFromRelativePath(r);
        }));
      },
      enumerable: !1,
      configurable: !0
    }), s.prototype.getFromRelativePath = function(e) {
      if (!e.length)
        return [this];
      var t = j(e), r = t[0], i = t.slice(1);
      if (!this.states)
        throw new Error("Cannot retrieve subPath '".concat(r, "' from node with no states"));
      var n = this.getStateNode(r);
      if (n.type === "history")
        return n.resolveHistory();
      if (!this.states[r])
        throw new Error("Child state '".concat(r, "' does not exist on '").concat(this.id, "'"));
      return this.states[r].getFromRelativePath(i);
    }, s.prototype.historyValue = function(e) {
      if (Object.keys(this.states).length)
        return {
          current: e || this.initialStateValue,
          states: dr(this.states, function(t, r) {
            if (!e)
              return t.historyValue();
            var i = F(e) ? void 0 : e[r];
            return t.historyValue(i || t.initialStateValue);
          }, function(t) {
            return !t.history;
          })
        };
    }, s.prototype.resolveHistory = function(e) {
      var t = this;
      if (this.type !== "history")
        return [this];
      var r = this.parent;
      if (!e) {
        var i = this.target;
        return i ? K(vt(i).map(function(a) {
          return r.getFromRelativePath(a);
        })) : r.initialStateNodes;
      }
      var n = vs(r.path, "states")(e).current;
      return F(n) ? [r.getStateNode(n)] : K(vt(n).map(function(a) {
        return t.history === "deep" ? r.getFromRelativePath(a) : [r.states[a[0]]];
      }));
    }, Object.defineProperty(s.prototype, "stateIds", {
      /**
       * All the state node IDs of this state node and its descendant state nodes.
       */
      get: function() {
        var e = this, t = K(Object.keys(this.states).map(function(r) {
          return e.states[r].stateIds;
        }));
        return [this.id].concat(t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(s.prototype, "events", {
      /**
       * All the event types accepted by this state node and its descendants.
       */
      get: function() {
        var e, t, r, i;
        if (this.__cache.events)
          return this.__cache.events;
        var n = this.states, a = new Set(this.ownEvents);
        if (n)
          try {
            for (var o = V(Object.keys(n)), d = o.next(); !d.done; d = o.next()) {
              var h = d.value, u = n[h];
              if (u.states)
                try {
                  for (var f = (r = void 0, V(u.events)), w = f.next(); !w.done; w = f.next()) {
                    var T = w.value;
                    a.add("".concat(T));
                  }
                } catch (R) {
                  r = {
                    error: R
                  };
                } finally {
                  try {
                    w && !w.done && (i = f.return) && i.call(f);
                  } finally {
                    if (r) throw r.error;
                  }
                }
            }
          } catch (R) {
            e = {
              error: R
            };
          } finally {
            try {
              d && !d.done && (t = o.return) && t.call(o);
            } finally {
              if (e) throw e.error;
            }
          }
        return this.__cache.events = Array.from(a);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(s.prototype, "ownEvents", {
      /**
       * All the events that have transitions directly from this state node.
       *
       * Excludes any inert events.
       */
      get: function() {
        var e = new Set(this.transitions.filter(function(t) {
          return !(!t.target && !t.actions.length && t.internal);
        }).map(function(t) {
          return t.eventType;
        }));
        return Array.from(e);
      },
      enumerable: !1,
      configurable: !0
    }), s.prototype.resolveTarget = function(e) {
      var t = this;
      if (e !== void 0)
        return e.map(function(r) {
          if (!F(r))
            return r;
          var i = r[0] === t.delimiter;
          if (i && !t.parent)
            return t.getStateNodeByPath(r.slice(1));
          var n = i ? t.key + r : r;
          if (t.parent)
            try {
              var a = t.parent.getStateNodeByPath(n);
              return a;
            } catch (o) {
              throw new Error("Invalid transition definition for state node '".concat(t.id, `':
`).concat(o.message));
            }
          else
            return t.getStateNodeByPath(n);
        });
    }, s.prototype.formatTransition = function(e) {
      var t = this, r = Ss(e.target), i = "internal" in e ? e.internal : r ? r.some(function(d) {
        return F(d) && d[0] === t.delimiter;
      }) : !0, n = this.machine.options.guards, a = this.resolveTarget(r), o = A(A({}, e), {
        actions: De(ge(e.actions)),
        cond: Nr(e.cond, n),
        target: a,
        source: this,
        internal: i,
        eventType: e.event,
        toJSON: function() {
          return A(A({}, o), {
            target: o.target ? o.target.map(function(d) {
              return "#".concat(d.id);
            }) : void 0,
            source: "#".concat(t.id)
          });
        }
      });
      return o;
    }, s.prototype.formatTransitions = function() {
      var e, t, r = this, i;
      if (!this.config.on)
        i = [];
      else if (Array.isArray(this.config.on))
        i = this.config.on;
      else {
        var n = this.config.on, a = We, o = n[a], d = o === void 0 ? [] : o, h = Wt(n, [typeof a == "symbol" ? a : a + ""]);
        i = K(Object.keys(h).map(function(E) {
          !pe && E === Me && Te(!1, "Empty string transition configs (e.g., `{ on: { '': ... }}`) for transient transitions are deprecated. Specify the transition in the `{ always: ... }` property instead. " + 'Please check the `on` configuration for "#'.concat(r.id, '".'));
          var _ = qe(E, h[E]);
          return pe || Vs(r, E, _), _;
        }).concat(qe(We, d)));
      }
      var u = this.config.always ? qe("", this.config.always) : [], f = this.config.onDone ? qe(String(gt(this.id)), this.config.onDone) : [];
      pe || Te(!(this.config.onDone && !this.parent), 'Root nodes cannot have an ".onDone" transition. Please check the config of "'.concat(this.id, '".'));
      var w = K(this.invoke.map(function(E) {
        var _ = [];
        return E.onDone && _.push.apply(_, L([], j(qe(String(_s(E.id)), E.onDone)), !1)), E.onError && _.push.apply(_, L([], j(qe(String(ks(E.id)), E.onError)), !1)), _;
      })), T = this.after, R = K(L(L(L(L([], j(f), !1), j(w), !1), j(i), !1), j(u), !1).map(function(E) {
        return ge(E).map(function(_) {
          return r.formatTransition(_);
        });
      }));
      try {
        for (var S = V(T), D = S.next(); !D.done; D = S.next()) {
          var g = D.value;
          R.push(g);
        }
      } catch (E) {
        e = {
          error: E
        };
      } finally {
        try {
          D && !D.done && (t = S.return) && t.call(S);
        } finally {
          if (e) throw e.error;
        }
      }
      return R;
    }, s;
  }()
), fr = !1;
function Ks(s, e) {
  return !pe && !("predictableActionArguments" in s) && !fr && (fr = !0, console.warn("It is highly recommended to set `predictableActionArguments` to `true` when using `createMachine`. https://xstate.js.org/docs/guides/actions.html")), new Gs(s, e);
}
function Ws() {
  return Ks({
    id: "phone",
    initial: "idle",
    states: {
      idle: {
        on: {
          ring: "ringing",
          hangup: "idle"
        }
      },
      connecting: {
        on: {
          connected: "ringing",
          answer: "call",
          hangup: "hangup"
        }
      },
      ringing: {
        on: {
          hangup: "hangup",
          answer: "call"
        }
      },
      call: {
        on: {
          hangup: "hangup",
          transfer: "transfer"
        }
      },
      transfer: {
        // move to this only when the call is in 'call' state (answered)
        on: {
          hangup: "idle",
          call: "call"
        }
      },
      background: {
        on: {
          hangup: "idle",
          call: "call"
        }
      },
      hangup: {
        after: {
          3e3: { target: "idle" }
        }
      }
    }
  });
}
function Ys() {
  return (s, e) => ({ session: e, held: !1, muted: !1, videoMuted: !1 });
}
class Xt {
  constructor(e, t = {}) {
    this.managedSessions = [], this.attemptingReconnection = !1, this.optionsPingFailure = !1, this.optionsPingRunning = !1, this.shouldBeConnected = !1, this.shouldBeRegistered = !1, this.delegate = t.delegate, this.options = {
      aor: "",
      autoStop: !0,
      delegate: {},
      iceStopWaitingOnServerReflexive: !1,
      managedSessionFactory: Ys(),
      maxSimultaneousSessions: 2,
      media: {},
      optionsPingInterval: -1,
      optionsPingRequestURI: "",
      reconnectionAttempts: 3,
      reconnectionDelay: 4,
      registrationRetry: !0,
      registrationRetryInterval: 3,
      registerGuard: null,
      registererOptions: {},
      registererRegisterOptions: {},
      sendDTMFUsingSessionDescriptionHandler: !1,
      userAgentOptions: {},
      ...Xt.stripUndefinedProperties(t)
    };
    const r = {
      ...t.userAgentOptions
    };
    if (r.transportConstructor || (r.transportConstructor = ot), r.transportOptions || (r.transportOptions = {
      server: e
    }), !r.uri && t.aor) {
      const i = fe.makeURI(t.aor);
      if (!i)
        throw new Error(`Failed to create valid URI from ${t.aor}`);
      r.uri = i;
    }
    if (this.userAgent = new fe(r), this.userAgent.delegate = {
      // Handle connection with server established
      onConnect: () => {
        this.logger.log("Connected"), this.delegate && this.delegate.onServerConnect && this.delegate.onServerConnect(), this.shouldBeRegistered && this.register(), this.options.optionsPingInterval > 0 && this.optionsPingStart();
      },
      // Handle connection with server lost
      onDisconnect: async (i) => {
        this.logger.log("Disconnected");
        let n = !1;
        this.options.optionsPingInterval > 0 && (n = this.optionsPingFailure, this.optionsPingFailure = !1, this.optionsPingStop()), this.delegate && this.delegate.onServerDisconnect && this.delegate.onServerDisconnect(i), (i || n) && (this.registerer && (this.logger.log("Disposing of registerer..."), this.registerer.dispose().catch((a) => {
          this.logger.debug("Error occurred disposing of registerer after connection with server was lost."), this.logger.debug(a.toString());
        }), this.registerer = void 0), this.managedSessions.slice().map((a) => a.session).forEach(async (a) => {
          this.logger.log("Disposing of session..."), a.dispose().catch((o) => {
            this.logger.debug("Error occurred disposing of a session after connection with server was lost."), this.logger.debug(o.toString());
          });
        }), this.shouldBeConnected && this.attemptReconnection());
      },
      // Handle incoming invitations
      onInvite: (i) => {
        this.logger.log(`[${i.id}] Received INVITE`);
        const n = this.options.maxSimultaneousSessions;
        if (n !== 0 && this.managedSessions.length > n) {
          this.logger.warn(`[${i.id}] Session already in progress, rejecting INVITE...`), i.reject().then(() => {
            this.logger.log(`[${i.id}] Rejected INVITE`);
          }).catch((o) => {
            this.logger.error(`[${i.id}] Failed to reject INVITE`), this.logger.error(o.toString());
          });
          return;
        }
        const a = {
          sessionDescriptionHandlerOptions: { constraints: this.constraints }
        };
        this.initSession(i, a), this.delegate && this.delegate.onCallReceived ? this.delegate.onCallReceived(i) : (this.logger.warn(`[${i.id}] No handler available, rejecting INVITE...`), i.reject().then(() => {
          this.logger.log(`[${i.id}] Rejected INVITE`);
        }).catch((o) => {
          this.logger.error(`[${i.id}] Failed to reject INVITE`), this.logger.error(o.toString());
        }));
      },
      // Handle incoming messages
      onMessage: (i) => {
        i.accept().then(() => {
          this.delegate && this.delegate.onMessageReceived && this.delegate.onMessageReceived(i);
        });
      },
      // Handle incoming notifications
      onNotify: (i) => {
        i.accept().then(() => {
          this.delegate && this.delegate.onNotificationReceived && this.delegate.onNotificationReceived(i);
        });
      }
    }, this.registererOptions = {
      ...t.registererOptions
    }, this.registererRegisterOptions = {
      ...t.registererRegisterOptions
    }, this.options.registrationRetry) {
      this.registererRegisterOptions.requestDelegate = this.registererRegisterOptions.requestDelegate || {};
      const i = this.registererRegisterOptions.requestDelegate.onReject;
      this.registererRegisterOptions.requestDelegate.onReject = (n) => {
        i && i(n), this.attemptRegistration();
      };
    }
    this.logger = this.userAgent.getLogger("sip.SessionManager"), window.addEventListener("online", () => {
      this.logger.log("Online"), this.shouldBeConnected && this.connect();
    }), this.options.autoStop && window.addEventListener("beforeunload", async () => {
      this.shouldBeConnected = !1, this.shouldBeRegistered = !1, this.userAgent.state !== Y.Stopped && await this.userAgent.stop();
    });
  }
  /**
   * Strip properties with undefined values from options.
   * This is a work around while waiting for missing vs undefined to be addressed (or not)...
   * https://github.com/Microsoft/TypeScript/issues/13195
   * @param options - Options to reduce
   */
  static stripUndefinedProperties(e) {
    return Object.keys(e).reduce((t, r) => (e[r] !== void 0 && (t[r] = e[r]), t), {});
  }
  /**
   * The local media stream. Undefined if call not answered.
   * @param session - Session to get the media stream from.
   */
  getLocalMediaStream(e) {
    const t = e.sessionDescriptionHandler;
    if (t) {
      if (!(t instanceof re))
        throw new Error("Session description handler not instance of web SessionDescriptionHandler");
      return t.localMediaStream;
    }
  }
  /**
   * The remote media stream. Undefined if call not answered.
   * @param session - Session to get the media stream from.
   */
  getRemoteMediaStream(e) {
    const t = e.sessionDescriptionHandler;
    if (t) {
      if (!(t instanceof re))
        throw new Error("Session description handler not instance of web SessionDescriptionHandler");
      return t.remoteMediaStream;
    }
  }
  /**
   * The local audio track, if available.
   * @param session - Session to get track from.
   * @deprecated Use localMediaStream and get track from the stream.
   */
  getLocalAudioTrack(e) {
    var t;
    return (t = this.getLocalMediaStream(e)) == null ? void 0 : t.getTracks().find((r) => r.kind === "audio");
  }
  /**
   * The local video track, if available.
   * @param session - Session to get track from.
   * @deprecated Use localMediaStream and get track from the stream.
   */
  getLocalVideoTrack(e) {
    var t;
    return (t = this.getLocalMediaStream(e)) == null ? void 0 : t.getTracks().find((r) => r.kind === "video");
  }
  /**
   * The remote audio track, if available.
   * @param session - Session to get track from.
   * @deprecated Use remoteMediaStream and get track from the stream.
   */
  getRemoteAudioTrack(e) {
    var t;
    return (t = this.getRemoteMediaStream(e)) == null ? void 0 : t.getTracks().find((r) => r.kind === "audio");
  }
  /**
   * The remote video track, if available.
   * @param session - Session to get track from.
   * @deprecated Use remoteMediaStream and get track from the stream.
   */
  getRemoteVideoTrack(e) {
    var t;
    return (t = this.getRemoteMediaStream(e)) == null ? void 0 : t.getTracks().find((r) => r.kind === "video");
  }
  /**
   * Connect.
   * @remarks
   * If not started, starts the UserAgent connecting the WebSocket Transport.
   * Otherwise reconnects the UserAgent's WebSocket Transport.
   * Attempts will be made to reconnect as needed.
   */
  async connect() {
    return this.logger.log("Connecting UserAgent..."), this.shouldBeConnected = !0, this.userAgent.state !== Y.Started ? this.userAgent.start() : this.userAgent.reconnect();
  }
  /**
   * Disconnect.
   * @remarks
   * If not stopped, stops the UserAgent disconnecting the WebSocket Transport.
   */
  async disconnect() {
    return this.logger.log("Disconnecting UserAgent..."), this.userAgent.state === Y.Stopped ? Promise.resolve() : (this.shouldBeConnected = !1, this.shouldBeRegistered = !1, this.registerer = void 0, this.userAgent.stop());
  }
  /**
   * Return true if transport is connected.
   */
  isConnected() {
    return this.userAgent.isConnected();
  }
  /**
   * Start receiving incoming calls.
   * @remarks
   * Send a REGISTER request for the UserAgent's AOR.
   * Resolves when the REGISTER request is sent, otherwise rejects.
   * Attempts will be made to re-register as needed.
   */
  async register(e) {
    return this.logger.log("Registering UserAgent..."), this.shouldBeRegistered = !0, e !== void 0 && (this.registererRegisterOptions = {
      ...e
    }), this.registerer || (this.registerer = new ye(this.userAgent, this.registererOptions), this.registerer.stateChange.addListener((t) => {
      switch (t) {
        case N.Initial:
          break;
        case N.Registered:
          this.delegate && this.delegate.onRegistered && this.delegate.onRegistered();
          break;
        case N.Unregistered:
          this.delegate && this.delegate.onUnregistered && this.delegate.onUnregistered(), this.shouldBeRegistered && this.attemptRegistration();
          break;
        case N.Terminated:
          break;
        default:
          throw new Error("Unknown registerer state.");
      }
    })), this.attemptRegistration(!0);
  }
  /**
   * Stop receiving incoming calls.
   * @remarks
   * Send an un-REGISTER request for the UserAgent's AOR.
   * Resolves when the un-REGISTER request is sent, otherwise rejects.
   */
  async unregister(e) {
    return this.logger.log("Unregistering UserAgent..."), this.shouldBeRegistered = !1, this.registerer ? this.registerer.unregister(e).then(() => {
    }) : (this.logger.warn("No registerer to unregister."), Promise.resolve());
  }
  /**
   * Make an outgoing call.
   * @remarks
   * Send an INVITE request to create a new Session.
   * Resolves when the INVITE request is sent, otherwise rejects.
   * Use `onCallAnswered` delegate method to determine if Session is established.
   * @param destination - The target destination to call. A SIP address to send the INVITE to.
   * @param inviterOptions - Optional options for Inviter constructor.
   * @param inviterInviteOptions - Optional options for Inviter.invite().
   */
  async call(e, t, r) {
    this.logger.log("Beginning Session...");
    const i = this.options.maxSimultaneousSessions;
    if (i !== 0 && this.managedSessions.length > i)
      return Promise.reject(new Error("Maximum number of sessions already exists."));
    const n = fe.makeURI(e);
    if (!n)
      return Promise.reject(new Error(`Failed to create a valid URI from "${e}"`));
    if (t || (t = {}), t.sessionDescriptionHandlerOptions || (t.sessionDescriptionHandlerOptions = {}), t.sessionDescriptionHandlerOptions.constraints || (t.sessionDescriptionHandlerOptions.constraints = this.constraints), t.earlyMedia) {
      r = r || {}, r.requestDelegate = r.requestDelegate || {};
      const o = r.requestDelegate.onProgress;
      r.requestDelegate.onProgress = (d) => {
        d.message.statusCode === 183 && this.setupRemoteMedia(a), o && o(d);
      };
    }
    this.options.iceStopWaitingOnServerReflexive && (t.delegate = t.delegate || {}, t.delegate.onSessionDescriptionHandler = (o) => {
      if (!(o instanceof re))
        throw new Error("Session description handler not instance of SessionDescriptionHandler");
      o.peerConnectionDelegate = {
        onicecandidate: (d) => {
          var h;
          ((h = d.candidate) == null ? void 0 : h.type) === "srflx" && (this.logger.log(`[${a.id}] Found srflx ICE candidate, stop waiting...`), o.iceGatheringComplete());
        }
      };
    });
    const a = new pt(this.userAgent, n, t);
    return this.sendInvite(a, t, r).then(() => a);
  }
  /**
   * Hangup a call.
   * @param session - Session to hangup.
   * @remarks
   * Send a BYE request, CANCEL request or reject response to end the current Session.
   * Resolves when the request/response is sent, otherwise rejects.
   * Use `onCallHangup` delegate method to determine if and when call is ended.
   */
  async hangup(e) {
    return this.logger.log(`[${e.id}] Hangup...`), this.sessionExists(e) ? this.terminate(e) : Promise.reject(new Error("Session does not exist."));
  }
  /**
   * Answer an incoming call.
   * @param session - Session to answer.
   * @remarks
   * Accept an incoming INVITE request creating a new Session.
   * Resolves with the response is sent, otherwise rejects.
   * Use `onCallAnswered` delegate method to determine if and when call is established.
   * @param invitationAcceptOptions - Optional options for Inviter.accept().
   */
  async answer(e, t) {
    return this.logger.log(`[${e.id}] Accepting Invitation...`), this.sessionExists(e) ? e instanceof Ye ? (t || (t = {}), t.sessionDescriptionHandlerOptions || (t.sessionDescriptionHandlerOptions = {}), t.sessionDescriptionHandlerOptions.constraints || (t.sessionDescriptionHandlerOptions.constraints = this.constraints), e.accept(t)) : Promise.reject(new Error("Session not instance of Invitation.")) : Promise.reject(new Error("Session does not exist."));
  }
  /**
   * Decline an incoming call.
   * @param session - Session to decline.
   * @remarks
   * Reject an incoming INVITE request.
   * Resolves with the response is sent, otherwise rejects.
   * Use `onCallHangup` delegate method to determine if and when call is ended.
   */
  async decline(e) {
    return this.logger.log(`[${e.id}] Rejecting Invitation...`), this.sessionExists(e) ? e instanceof Ye ? e.reject() : Promise.reject(new Error("Session not instance of Invitation.")) : Promise.reject(new Error("Session does not exist."));
  }
  /**
   * Hold call
   * @param session - Session to hold.
   * @remarks
   * Send a re-INVITE with new offer indicating "hold".
   * Resolves when the re-INVITE request is sent, otherwise rejects.
   * Use `onCallHold` delegate method to determine if request is accepted or rejected.
   * See: https://tools.ietf.org/html/rfc6337
   */
  async hold(e) {
    return this.logger.log(`[${e.id}] Holding session...`), this.setHold(e, !0);
  }
  /**
   * Unhold call.
   * @param session - Session to unhold.
   * @remarks
   * Send a re-INVITE with new offer indicating "unhold".
   * Resolves when the re-INVITE request is sent, otherwise rejects.
   * Use `onCallHold` delegate method to determine if request is accepted or rejected.
   * See: https://tools.ietf.org/html/rfc6337
   */
  async unhold(e) {
    return this.logger.log(`[${e.id}] Unholding session...`), this.setHold(e, !1);
  }
  /**
   * Hold state.
   * @param session - Session to check.
   * @remarks
   * True if session is on hold.
   */
  isHeld(e) {
    const t = this.sessionManaged(e);
    return t ? t.held : !1;
  }
  /**
   * Mute call.
   * @param session - Session to mute.
   * @remarks
   * Disable sender's media tracks.
   */
  mute(e) {
    this.logger.log(`[${e.id}] Disabling media tracks...`), this.setMute(e, !0);
  }
  /**
   * Unmute call.
   * @param session - Session to unmute.
   * @remarks
   * Enable sender's media tracks.
   */
  unmute(e) {
    this.logger.log(`[${e.id}] Enabling media tracks...`), this.setMute(e, !1);
  }
  /**
   * Mute state.
   * @param session - Session to check.
   * @remarks
   * True if sender's media track is disabled.
   */
  isMuted(e) {
    const t = this.sessionManaged(e);
    return t ? t.muted : !1;
  }
  isVideoMuted(e) {
    const t = this.sessionManaged(e);
    return t ? t.videoMuted : !1;
  }
  /**
   * Send DTMF.
   * @param session - Session to send on.
   * @remarks
   * Send an INFO request with content type application/dtmf-relay.
   * @param tone - Tone to send.
   */
  async sendDTMF(e, t) {
    if (this.logger.log(`[${e.id}] Sending DTMF...`), !/^[0-9A-D#*,]$/.exec(t))
      return Promise.reject(new Error("Invalid DTMF tone."));
    if (!this.sessionExists(e))
      return Promise.reject(new Error("Session does not exist."));
    if (this.logger.log(`[${e.id}] Sending DTMF tone: ${t}`), this.options.sendDTMFUsingSessionDescriptionHandler)
      return e.sessionDescriptionHandler ? e.sessionDescriptionHandler.sendDtmf(t) ? Promise.resolve() : Promise.reject(new Error("Failed to send DTMF")) : Promise.reject(new Error("Session desciption handler undefined."));
    {
      const a = { body: {
        contentDisposition: "render",
        contentType: "application/dtmf-relay",
        content: "Signal=" + t + `\r
Duration=` + 2e3
      } };
      return e.info({ requestOptions: a }).then(() => {
      });
    }
  }
  /**
   * Transfer.
   * @param session - Session with the transferee to transfer.
   * @param target - The referral target.
   * @remarks
   * If target is a Session this is an attended transfer completion (REFER with Replaces),
   * otherwise this is a blind transfer (REFER). Attempting an attended transfer
   * completion on a call that has not been answered will be rejected. To implement
   * an attended transfer with early completion, hangup the call with the target
   * and execute a blind transfer to the target.
   */
  async transfer(e, t, r) {
    if (this.logger.log(`[${e.id}] Referring session...`), t instanceof Le)
      return e.refer(t, r).then(() => {
      });
    const i = fe.makeURI(t);
    return i ? e.refer(i, r).then(() => {
    }) : Promise.reject(new Error(`Failed to create a valid URI from "${t}"`));
  }
  /**
   * Send a message.
   * @remarks
   * Send a MESSAGE request.
   * @param destination - The target destination for the message. A SIP address to send the MESSAGE to.
   */
  async message(e, t) {
    this.logger.log("Sending message...");
    const r = fe.makeURI(e);
    return r ? new ni(this.userAgent, r, t).message() : Promise.reject(new Error(`Failed to create a valid URI from "${e}"`));
  }
  /** Media constraints. */
  get constraints() {
    let e = { audio: !0, video: !1 };
    return this.options.media.constraints && (e = { ...this.options.media.constraints }), e;
  }
  /**
   * Attempt reconnection up to `reconnectionAttempts` times.
   * @param reconnectionAttempt - Current attempt number.
   */
  attemptReconnection(e = 1) {
    const t = this.options.reconnectionAttempts, r = this.options.reconnectionDelay;
    if (!this.shouldBeConnected) {
      this.logger.log("Should not be connected currently");
      return;
    }
    if (this.attemptingReconnection && this.logger.log("Reconnection attempt already in progress"), e > t) {
      this.logger.log("Reconnection maximum attempts reached");
      return;
    }
    e === 1 ? this.logger.log(`Reconnection attempt ${e} of ${t} - trying`) : this.logger.log(
      `Reconnection attempt ${e} of ${t} - trying in ${r} seconds`
    ), this.attemptingReconnection = !0, setTimeout(
      () => {
        if (!this.shouldBeConnected) {
          this.logger.log(`Reconnection attempt ${e} of ${t} - aborted`), this.attemptingReconnection = !1;
          return;
        }
        this.userAgent.reconnect().then(() => {
          this.logger.log(`Reconnection attempt ${e} of ${t} - succeeded`), this.attemptingReconnection = !1;
        }).catch((i) => {
          this.logger.log(`Reconnection attempt ${e} of ${t} - failed`), this.logger.error(i.message), this.attemptingReconnection = !1, this.attemptReconnection(++e);
        });
      },
      e === 1 ? 0 : r * 1e3
    );
  }
  /**
   * Register to receive calls.
   * @param withoutDelay - If true attempt immediately, otherwise wait `registrationRetryInterval`.
   */
  attemptRegistration(e = !1) {
    if (this.logger.log(`Registration attempt ${e ? "without delay" : ""}`), !this.shouldBeRegistered)
      return this.logger.log("Should not be registered currently"), Promise.resolve();
    if (this.registrationAttemptTimeout !== void 0)
      return this.logger.log("Registration attempt already in progress"), Promise.resolve();
    const t = () => this.registerer ? this.isConnected() ? this.userAgent.state === Y.Stopped ? (this.logger.log("User agent stopped"), Promise.resolve()) : this.options.registerGuard ? this.options.registerGuard().catch((i) => {
      throw this.logger.log("Register guard rejected will making registration attempt"), i;
    }).then((i) => i || !this.registerer ? Promise.resolve() : this.registerer.register(this.registererRegisterOptions).then(() => {
    })) : this.registerer.register(this.registererRegisterOptions).then(() => {
    }) : (this.logger.log("User agent not connected"), Promise.resolve()) : (this.logger.log("Registerer undefined"), Promise.resolve()), r = (i) => {
      const n = i * 2;
      return 1e3 * (Math.random() * (n - i) + i);
    };
    return new Promise((i, n) => {
      this.registrationAttemptTimeout = setTimeout(
        () => {
          t().then(() => {
            this.registrationAttemptTimeout = void 0, i();
          }).catch((a) => {
            this.registrationAttemptTimeout = void 0, a instanceof et ? i() : n(a);
          });
        },
        e ? 0 : r(this.options.registrationRetryInterval)
      );
    });
  }
  /** Helper function to remove media from html elements. */
  cleanupMedia(e) {
    const t = this.sessionManaged(e);
    if (!t)
      throw new Error("Managed session does not exist.");
    t.mediaLocal && t.mediaLocal.video && (t.mediaLocal.video.srcObject = null, t.mediaLocal.video.pause()), t.mediaRemote && (t.mediaRemote.audio && (t.mediaRemote.audio.srcObject = null, t.mediaRemote.audio.pause()), t.mediaRemote.video && (t.mediaRemote.video.srcObject = null, t.mediaRemote.video.pause()));
  }
  /** Helper function to enable/disable media tracks. */
  enableReceiverTracks(e, t) {
    if (!this.sessionExists(e))
      throw new Error("Session does not exist.");
    const r = e.sessionDescriptionHandler;
    if (!(r instanceof re))
      throw new Error("Session's session description handler not instance of SessionDescriptionHandler.");
    r.enableReceiverTracks(t);
  }
  /** Helper function to enable/disable media tracks. */
  enableSenderTracks(e, t) {
    if (!this.sessionExists(e))
      throw new Error("Session does not exist.");
    const r = e.sessionDescriptionHandler;
    if (!(r instanceof re))
      throw new Error("Session's session description handler not instance of SessionDescriptionHandler.");
    r.enableSenderTracks(t);
  }
  enableTrack(e, t, r, i) {
    const n = e.sessionDescriptionHandler;
    if (!(n instanceof Ir))
      throw new Error("Session's session description handler not instance of WebPhoneSDH.");
    n.enableTrack(t, r, i);
  }
  enableSenderVideoTrack(e, t) {
    this.enableTrack(e, "sender", "video", t);
  }
  enableSenderAudioTrack(e, t) {
    this.enableTrack(e, "sender", "audio", t);
  }
  muteVideo(e) {
  }
  unmuteVideo(e) {
  }
  muteMedia(e, t) {
    if (!this.sessionExists(e)) {
      this.logger.warn(`[${e.id}] A session is required to enabled/disable media tracks`);
      return;
    }
    if (e.state !== y.Established) {
      this.logger.warn(`[${e.id}] An established session is required to enable/disable media tracks`);
      return;
    }
    const r = this.sessionManaged(e);
    r !== void 0 && (t == "audio" ? (r.muted = !0, this.enableSenderAudioTrack(e, !r.held && !r.muted)) : t == "video" && (r.videoMuted = !0, this.enableSenderVideoTrack(e, !1)));
  }
  unmuteMedia(e, t) {
    if (!this.sessionExists(e)) {
      this.logger.warn(`[${e.id}] A session is required to enabled/disable media tracks`);
      return;
    }
    if (e.state !== y.Established) {
      this.logger.warn(`[${e.id}] An established session is required to enable/disable media tracks`);
      return;
    }
    const r = this.sessionManaged(e);
    r !== void 0 && (t == "audio" ? (r.muted = !1, this.enableSenderAudioTrack(e, !r.held && !r.muted)) : t == "video" && (r.videoMuted = !1, this.enableSenderVideoTrack(e, !0)));
  }
  /**
   * Setup session delegate and state change handler.
   * @param session - Session to setup.
   * @param referralInviterOptions - Options for any Inviter created as result of a REFER.
   */
  initSession(e, t) {
    this.sessionAdd(e), this.delegate && this.delegate.onCallCreated && this.delegate.onCallCreated(e), e.stateChange.addListener((r) => {
      switch (this.logger.log(`[${e.id}] Session state changed to ${r}`), r) {
        case y.Initial:
          break;
        case y.Establishing:
          break;
        case y.Established:
          this.setupLocalMedia(e), this.setupRemoteMedia(e), this.delegate && this.delegate.onCallAnswered && this.delegate.onCallAnswered(e);
          break;
        case y.Terminating:
        // fall through
        case y.Terminated:
          this.sessionExists(e) && (this.cleanupMedia(e), this.sessionRemove(e), this.delegate && this.delegate.onCallHangup && this.delegate.onCallHangup(e));
          break;
        default:
          throw new Error("Unknown session state.");
      }
    }), e.delegate = e.delegate || {}, e.delegate.onInfo = (r) => {
      var u;
      if (((u = this.delegate) == null ? void 0 : u.onCallDTMFReceived) === void 0) {
        r.reject();
        return;
      }
      const i = r.request.getHeader("content-type");
      if (!i || !/^application\/dtmf-relay/i.exec(i)) {
        r.reject();
        return;
      }
      const n = r.request.body.split(`\r
`, 2);
      if (n.length !== 2) {
        r.reject();
        return;
      }
      let a;
      const o = /^(Signal\s*?=\s*?)([0-9A-D#*]{1})(\s)?.*/;
      if (n[0] !== void 0 && o.test(n[0]) && (a = n[0].replace(o, "$2")), !a) {
        r.reject();
        return;
      }
      let d;
      const h = /^(Duration\s?=\s?)([0-9]{1,4})(\s)?.*/;
      if (n[1] !== void 0 && h.test(n[1]) && (d = parseInt(n[1].replace(h, "$2"), 10)), !d) {
        r.reject();
        return;
      }
      r.accept().then(() => {
        if (this.delegate && this.delegate.onCallDTMFReceived) {
          if (!a || !d)
            throw new Error("Tone or duration undefined.");
          this.delegate.onCallDTMFReceived(e, a, d);
        }
      }).catch((f) => {
        this.logger.error(f.message);
      });
    }, e.delegate.onRefer = (r) => {
      r.accept().then(() => this.sendInvite(r.makeInviter(t), t)).catch((i) => {
        this.logger.error(i.message);
      });
    };
  }
  /**
   * Periodically send OPTIONS pings and disconnect when a ping fails.
   * @param requestURI - Request URI to target
   * @param fromURI - From URI
   * @param toURI - To URI
   */
  optionsPingRun(e, t, r) {
    if (this.options.optionsPingInterval < 1)
      throw new Error("Invalid options ping interval.");
    this.optionsPingRunning || (this.optionsPingRunning = !0, this.optionsPingTimeout = setTimeout(() => {
      this.optionsPingTimeout = void 0;
      const i = () => {
        this.optionsPingFailure = !1, this.optionsPingRunning && (this.optionsPingRunning = !1, this.optionsPingRun(e, t, r));
      }, n = () => {
        this.logger.error("OPTIONS ping failed"), this.optionsPingFailure = !0, this.optionsPingRunning = !1, this.userAgent.transport.disconnect().catch((d) => this.logger.error(d));
      }, a = this.userAgent.userAgentCore, o = a.makeOutgoingRequestMessage("OPTIONS", e, t, r, {});
      this.optionsPingRequest = a.request(o, {
        onAccept: () => {
          this.optionsPingRequest = void 0, i();
        },
        onReject: (d) => {
          this.optionsPingRequest = void 0, d.message.statusCode === 408 || d.message.statusCode === 503 ? n() : i();
        }
      });
    }, this.options.optionsPingInterval * 1e3));
  }
  /**
   * Start sending OPTIONS pings.
   */
  optionsPingStart() {
    this.logger.log("OPTIONS pings started");
    let e, t, r;
    if (this.options.optionsPingRequestURI) {
      if (e = fe.makeURI(this.options.optionsPingRequestURI), !e)
        throw new Error("Failed to create Request URI.");
      t = this.userAgent.contact.uri.clone(), r = this.userAgent.contact.uri.clone();
    } else if (this.options.aor) {
      const i = fe.makeURI(this.options.aor);
      if (!i)
        throw new Error("Failed to create URI.");
      e = i.clone(), e.user = void 0, t = i.clone(), r = i.clone();
    } else {
      this.logger.error(
        "You have enabled sending OPTIONS pings and as such you must provide either a) an AOR to register, or b) an RURI to use for the target of the OPTIONS ping requests. "
      );
      return;
    }
    this.optionsPingRun(e, t, r);
  }
  /**
   * Stop sending OPTIONS pings.
   */
  optionsPingStop() {
    this.logger.log("OPTIONS pings stopped"), this.optionsPingRunning = !1, this.optionsPingFailure = !1, this.optionsPingRequest && (this.optionsPingRequest.dispose(), this.optionsPingRequest = void 0), this.optionsPingTimeout && (clearTimeout(this.optionsPingTimeout), this.optionsPingTimeout = void 0);
  }
  /** Helper function to init send then send invite. */
  async sendInvite(e, t, r) {
    return this.initSession(e, t), e.invite(r).then(() => {
      this.logger.log(`[${e.id}] Sent INVITE`);
    });
  }
  /** Helper function to add a session to the ones we are managing. */
  sessionAdd(e) {
    const t = this.options.managedSessionFactory(this, e);
    this.managedSessions.push(t);
  }
  /** Helper function to check if the session is one we are managing. */
  sessionExists(e) {
    return this.sessionManaged(e) !== void 0;
  }
  /** Helper function to check if the session is one we are managing. */
  sessionManaged(e) {
    return this.managedSessions.find((t) => t.session.id === e.id);
  }
  /** Helper function to remoce a session from the ones we are managing. */
  sessionRemove(e) {
    this.managedSessions = this.managedSessions.filter((t) => t.session.id !== e.id);
  }
  /**
   * Puts Session on hold.
   * @param session - The session to set.
   * @param hold - Hold on if true, off if false.
   */
  async setHold(e, t) {
    if (!this.sessionExists(e))
      return Promise.reject(new Error("Session does not exist."));
    if (this.isHeld(e) === t)
      return Promise.resolve();
    if (!(e.sessionDescriptionHandler instanceof re))
      throw new Error("Session's session description handler not instance of SessionDescriptionHandler.");
    const i = {
      requestDelegate: {
        onAccept: () => {
          const o = this.sessionManaged(e);
          o !== void 0 && (o.held = t, this.enableReceiverTracks(e, !o.held), this.enableSenderTracks(e, !o.held && !o.muted), this.delegate && this.delegate.onCallHold && this.delegate.onCallHold(e, o.held));
        },
        onReject: () => {
          this.logger.warn(`[${e.id}] Re-invite request was rejected`);
          const o = this.sessionManaged(e);
          o !== void 0 && (o.held = !t, this.enableReceiverTracks(e, !o.held), this.enableSenderTracks(e, !o.held && !o.muted), this.delegate && this.delegate.onCallHold && this.delegate.onCallHold(e, o.held));
        }
      }
    }, n = e.sessionDescriptionHandlerOptionsReInvite;
    n.hold = t, e.sessionDescriptionHandlerOptionsReInvite = n;
    const a = this.sessionManaged(e);
    if (!a)
      throw new Error("Managed session is undefiend.");
    return a.held = t, e.invite(i).then(() => {
      const o = this.sessionManaged(e);
      o !== void 0 && (this.enableReceiverTracks(e, !o.held), this.enableSenderTracks(e, !o.held && !o.muted));
    }).catch((o) => {
      throw a.held = !t, o instanceof et && this.logger.error(`[${e.id}] A hold request is already in progress.`), o;
    });
  }
  /**
   * Puts Session on mute.
   * @param session - The session to mute.
   * @param mute - Mute on if true, off if false.
   */
  setMute(e, t) {
    if (!this.sessionExists(e)) {
      this.logger.warn(`[${e.id}] A session is required to enabled/disable media tracks`);
      return;
    }
    if (e.state !== y.Established) {
      this.logger.warn(`[${e.id}] An established session is required to enable/disable media tracks`);
      return;
    }
    const r = this.sessionManaged(e);
    r !== void 0 && (r.muted = t, this.enableSenderTracks(e, !r.held && !r.muted));
  }
  /** Helper function to attach local media to html elements. */
  setupLocalMedia(e) {
    const t = this.sessionManaged(e);
    if (!t)
      throw new Error("Managed session does not exist.");
    const r = typeof this.options.media.local == "function" ? this.options.media.local(e) : this.options.media.local;
    t.mediaLocal = r;
    const i = r == null ? void 0 : r.video;
    if (i) {
      const n = this.getLocalMediaStream(e);
      if (!n)
        throw new Error("Local media stream undefiend.");
      i.srcObject = n, i.volume = 0, i.play().catch((a) => {
        this.logger.error(`[${e.id}] Failed to play local media`), this.logger.error(a.message);
      });
    }
  }
  /** Helper function to attach remote media to html elements. */
  setupRemoteMedia(e) {
    const t = this.sessionManaged(e);
    if (!t)
      throw new Error("Managed session does not exist.");
    const r = typeof this.options.media.remote == "function" ? this.options.media.remote(e) : this.options.media.remote;
    t.mediaRemote = r;
    const i = (r == null ? void 0 : r.video) || (r == null ? void 0 : r.audio);
    if (i) {
      const n = this.getRemoteMediaStream(e);
      if (!n)
        throw new Error("Remote media stream undefiend.");
      i.autoplay = !0, i.srcObject = n, i.play().catch((a) => {
        this.logger.error(`[${e.id}] Failed to play remote media`), this.logger.error(a.message);
      }), n.onaddtrack = () => {
        this.logger.log("Remote media onaddtrack"), i.load(), i.play().catch((a) => {
          this.logger.error(`[${e.id}] Failed to play remote media`), this.logger.error(a.message);
        });
      };
    }
  }
  /**
   * End a session.
   * @param session - The session to terminate.
   * @remarks
   * Send a BYE request, CANCEL request or reject response to end the current Session.
   * Resolves when the request/response is sent, otherwise rejects.
   * Use `onCallHangup` delegate method to determine if and when Session is terminated.
   */
  async terminate(e) {
    switch (this.logger.log(`[${e.id}] Terminating...`), e.state) {
      case y.Initial:
        if (e instanceof pt)
          return e.cancel().then(() => {
            this.logger.log(`[${e.id}] Inviter never sent INVITE (canceled)`);
          });
        if (e instanceof Ye)
          return e.reject().then(() => {
            this.logger.log(`[${e.id}] Invitation rejected (sent 480)`);
          });
        throw new Error("Unknown session type.");
      case y.Establishing:
        if (e instanceof pt)
          return e.cancel().then(() => {
            this.logger.log(`[${e.id}] Inviter canceled (sent CANCEL)`);
          });
        if (e instanceof Ye)
          return e.reject().then(() => {
            this.logger.log(`[${e.id}] Invitation rejected (sent 480)`);
          });
        throw new Error("Unknown session type.");
      case y.Established:
        return e.bye().then(() => {
          this.logger.log(`[${e.id}] Session ended (sent BYE)`);
        });
      case y.Terminating:
        break;
      case y.Terminated:
        break;
      default:
        throw new Error("Unknown state");
    }
    return this.logger.log(`[${e.id}] Terminating in state ${e.state}, no action taken`), Promise.resolve();
  }
}
var Vr = /* @__PURE__ */ ((s) => (s.Incoming = "incoming", s.Outgoing = "outgoing", s.OutgoingTransfer = "outgoing-transfer", s))(Vr || {});
const Ae = Ws(), Js = () => (s) => !s.audio && !s.video ? Promise.resolve(new MediaStream()) : navigator.mediaDevices === void 0 ? Promise.reject(new Error("Media devices not available in insecure contexts.")) : typeof s.video == "object" && !Array.isArray(s.video) && s.video !== null && "mediaSource" in s.video && s.video.mediaSource == "screen" ? navigator.mediaDevices.getDisplayMedia.call(navigator.mediaDevices, s) : navigator.mediaDevices.getUserMedia.call(navigator.mediaDevices, s), Zs = (s, e, t, r) => {
  let i = [{ urls: "stun:stun.l.google.com:19302" }];
  s.iceServers && s.iceServers.length > 0 && (i = s.iceServers);
  const n = {
    authorizationUsername: e.name,
    authorizationPassword: e.password,
    logBuiltinEnabled: !1,
    sessionDescriptionHandlerFactory: Ai(Js()),
    sessionDescriptionHandlerFactoryOptions: {
      iceGatheringTimeout: 1e3,
      peerConnectionConfiguration: {
        bundlePolicy: "balanced",
        certificates: void 0,
        iceCandidatePoolSize: 2,
        iceServers: i,
        iceTransportPolicy: "all",
        rtcpMuxPolicy: "require"
      }
    }
  }, a = {
    maxSimultaneousSessions: 3,
    sendDTMFUsingSessionDescriptionHandler: !0,
    aor: `sip:${e.name}@${s.host}`,
    delegate: {
      onCallHold: (d, h) => {
        var f;
        const u = d.id;
        (f = r == null ? void 0 : r.onCallHold) == null || f.call(r, u, h);
      },
      onCallReceived: (d) => {
        var u;
        const h = zs(d);
        (u = r == null ? void 0 : r.onIncomingCall) == null || u.call(r, h);
      },
      onCallHangup: (d) => {
        var u;
        const h = d.id;
        (u = r == null ? void 0 : r.onCallHangup) == null || u.call(r, h);
      },
      onServerConnect: () => {
        var d;
        (d = r == null ? void 0 : r.onServerConnected) == null || d.call(r);
      },
      onRegistered: () => {
        var d;
        (d = r == null ? void 0 : r.onRegister) == null || d.call(r);
      },
      onCallAnswered: (d) => {
        var u;
        const h = d.id;
        (u = r == null ? void 0 : r.onCallAnswered) == null || u.call(r, h);
      },
      onCallDTMFReceived(d, h, u) {
        var f;
        console.log(`DTMF received: ${h} for ${u}ms`), (f = r == null ? void 0 : r.onDTMF) == null || f.call(r, d.id, h, u);
      },
      onServerDisconnect: (d) => {
        var h;
        d && console.error(`Server disconnected: ${d.message}`), (h = r == null ? void 0 : r.onServerDisconnect) == null || h.call(r);
      },
      onUnregistered: () => {
        var d;
        (d = r == null ? void 0 : r.onUnregistered) == null || d.call(r);
      },
      onMessageReceived(d) {
        var h;
        console.log("onMessageReceived"), (h = r == null ? void 0 : r.onSIPMessage) == null || h.call(r, d.request.callId, d.request.body);
      }
    },
    media: {
      constraints: t.constraints,
      remote: {
        audio: t.containers.remote.audio,
        video: t.containers.remote.video
      },
      local: {
        video: t.containers.local.video
      }
    },
    userAgentOptions: n
  };
  return new Xt(
    `wss://${s.host}:${s.port}`,
    a
  );
}, zs = (s) => {
  const { initialState: e } = Ae;
  return {
    id: s.id,
    type: "incoming",
    state: Ae.transition(e, "ring"),
    remoteDisplayName: s.remoteIdentity.friendlyName,
    _sdh: s.sessionDescriptionHandler
  };
};
function Xs(s) {
  return {
    connect: rn(s),
    register: an(s),
    call: hn(s),
    toggleMute: pn(s),
    toggleHold: mn(s),
    accept: vn(s),
    hangup: wn(s),
    decline: bn(s),
    transfer: Sn(s),
    waitForAnswered: xn(s),
    waitForTerminated: En(s),
    triggerCallStateTransition: Cn,
    isMuted: cn(s),
    isHeld: dn(s),
    mute: ln(s),
    unmute: un(s),
    hold: gn(s),
    unhold: fn(s),
    sendDTMF: Rn(s),
    unregister: on(s),
    disconnect: sn(s),
    isConnected: nn(s),
    getLocalMediaStream: en(s),
    getRemoteMediaStream: tn(s),
    transitionToHangup: Tn,
    renegotiate: $n(s),
    sendSIPMessage: yn(s)
  };
}
function Qs(s, e) {
  return je.pipe(
    Zs(
      e.server,
      e.user,
      s.mediaConfig,
      s.callEventHandlers
    ),
    Xs
  );
}
const X = (s) => (e) => je.pipe(
  Nt((r) => r.session.id === e)(
    s.managedSessions
  ),
  es,
  qi((r) => r.session)
), en = (s) => (e) => {
  try {
    const t = X(s)(e.id);
    if (G(t)) {
      const r = s.getLocalMediaStream(t.value);
      if (r)
        return Gt(r);
    } else
      console.log("getLocalMediaStream: session not defined");
  } catch (t) {
    console.log("getLocalMediaStream: ", t);
  }
  return Vt;
}, tn = (s) => (e) => {
  try {
    const t = X(s)(e.id);
    if (G(t)) {
      const r = s.getRemoteMediaStream(t.value);
      if (r)
        return Gt(r);
    } else
      console.log("getRemoteMediaStream: session not defined");
  } catch (t) {
    console.log("getRemoteMediaStream: ", t);
  }
  return Vt;
}, rn = (s) => async () => {
  try {
    await s.connect();
  } catch (e) {
    console.log(e);
  }
}, sn = (s) => async () => {
  try {
    await s.disconnect();
  } catch (e) {
    console.log(e);
  }
}, nn = (s) => () => {
  try {
    return s.isConnected();
  } catch (e) {
    console.log(e);
  }
  return !1;
}, an = (s) => async () => {
  try {
    await s.register();
  } catch (e) {
    console.log(e);
  }
}, on = (s) => async () => {
  try {
    await s.unregister();
  } catch (e) {
    console.log(e);
  }
}, cn = (s) => (e, t) => {
  const r = X(s)(e.id);
  if (G(r))
    switch (t) {
      case "audio":
        return s.isMuted(r.value);
      case "video":
        return s.isVideoMuted(r.value);
    }
  else
    return !1;
}, dn = (s) => (e) => {
  const t = X(s)(e.id);
  return G(t) ? s.isHeld(t.value) : !1;
}, hn = (s) => async (e, t, r) => {
  try {
    if (r) {
      const i = await s.call(e, {
        sessionDescriptionHandlerOptions: {
          constraints: r
          // ...sessionDescriptionHandlerOptions
        }
      }), { initialState: n } = Ae, a = i.sessionDescriptionHandler;
      return {
        id: i.id,
        type: t,
        state: Ae.transition(n, "ring"),
        remoteDisplayName: i.remoteIdentity.friendlyName,
        _sdh: a
      };
    }
  } catch (i) {
    console.log(i);
  }
}, ln = (s) => (e) => {
  const t = X(s)(e.id);
  if (G(t))
    try {
      s.mute(t.value);
    } catch (r) {
      console.log(r);
    }
}, un = (s) => (e) => {
  const t = X(s)(e.id);
  if (G(t))
    try {
      s.unmute(t.value);
    } catch (r) {
      console.log(r);
    }
}, gn = (s) => async (e) => {
  const t = X(s)(e.id);
  if (G(t))
    try {
      await s.hold(t.value);
    } catch (r) {
      console.log(r);
    }
}, fn = (s) => async (e) => {
  const t = X(s)(e.id);
  if (G(t))
    try {
      await s.unhold(t.value);
    } catch (r) {
      console.log(r);
    }
}, pn = (s) => (e, t) => {
  const r = X(s)(e.id);
  if (G(r))
    try {
      t == "audio" ? s.isMuted(r.value) ? s.unmuteMedia(r.value, "audio") : s.muteMedia(r.value, "audio") : t == "video" && (s.isVideoMuted(r.value) ? s.unmuteMedia(r.value, "video") : s.muteMedia(r.value, "video"));
    } catch (i) {
      console.log(i);
    }
  return e;
}, mn = (s) => async (e) => {
  const t = X(s)(e.id);
  if (G(t))
    try {
      return s.isHeld(t.value) ? await s.unhold(t.value) : await s.hold(t.value), e;
    } catch (r) {
      console.log(r);
    }
}, vn = (s) => async (e, t, r) => {
  const i = X(s)(e.id);
  if (G(i))
    try {
      if (t)
        return await s.answer(i.value, {
          sessionDescriptionHandlerOptions: {
            constraints: t
            // ...sessionDescriptionHandlerOptions
          }
        }), {
          ...e,
          state: Ae.transition(e.state, "answer"),
          _sdh: i.value.sessionDescriptionHandler
        };
    } catch (n) {
      console.log(n);
    }
  return e;
}, yn = (s) => async (e, t) => {
  const r = X(s)(e.id);
  if (G(r)) {
    console.log("remote identity", r.value.remoteIdentity);
    try {
      console.log("URI: ", r.value.remoteIdentity.uri.toString()), console.log(`URI 2: sip:${r.value.remoteIdentity.uri.user}@143.244.141.108`), await s.message(
        `sip:${r.value.remoteIdentity.uri.user}@143.244.141.108`,
        t
      );
    } catch (i) {
      console.log(i);
    }
  }
}, wn = (s) => async (e) => {
  const t = X(s)(e.id);
  if (G(t))
    try {
      await s.hangup(t.value);
    } catch (r) {
      console.log(r);
    }
}, bn = (s) => async (e) => {
  const t = X(s)(e.id);
  if (G(t))
    try {
      await s.decline(t.value);
    } catch (r) {
      console.log(r);
    }
}, Sn = (s) => async (e, t) => {
  const r = (n) => {
    n.request.body.startsWith("SIP/2.0 200 OK") && s.managedSessions.forEach((a) => {
      a.session.id.startsWith(n.request.callId) && s.hangup(a.session);
    });
  }, i = X(s)(e.id);
  if (G(i)) {
    const n = X(s)(t.id);
    if (G(n))
      try {
        return await s.transfer(i.value, n.value, {
          onNotify: r
        }), !0;
      } catch (a) {
        console.log(a);
      }
  }
  return !1;
}, Tn = (s) => ({
  ...s,
  state: Ae.transition(s.state, "hangup")
}), xn = (s) => (e) => new Promise((t, r) => {
  const i = X(s)(e.id);
  G(i) ? i.value.stateChange.addListener(
    (n) => {
      if (n == y.Established) {
        const a = {
          ...e,
          state: Ae.transition(e.state, "answer")
        };
        t(a);
      } else n == y.Terminated, t(e);
    },
    { once: !0 }
  ) : t(e);
}), En = (s) => (e) => new Promise((t, r) => {
  const i = X(s)(e.id);
  G(i) ? i.value.stateChange.addListener(
    (n) => {
      n == y.Terminated && t(void 0);
    },
    { once: !0 }
  ) : t(void 0);
}), Cn = (s, e) => {
  try {
    return {
      ...s,
      state: Ae.transition(s.state, e)
    };
  } catch (t) {
    console.log(t);
  }
}, Rn = (s) => async (e, t) => {
  const r = X(s)(e.id);
  if (G(r))
    try {
      await s.sendDTMF(r.value, t);
    } catch (i) {
      console.log(i);
    }
}, $n = (s) => async (e, t, r) => {
  if (t) {
    const i = X(s)(e.id);
    if (G(i))
      try {
        await i.value.invite({
          requestDelegate: {
            onAccept: (n) => {
              console.log("reinvite accepted"), r({ event_name: "renegotiation", status: "successful" });
            },
            onReject: (n) => {
              console.log("reinvite rejected"), r({ event_name: "renegotiation", status: "failed" });
            }
          },
          sessionDescriptionHandlerOptions: {
            constraints: t
          }
        });
      } catch (n) {
        console.log("error while renegotiation"), console.log(n);
      }
  }
};
class In {
  constructor(e) {
    var r;
    this.calls = [], this.webPhone = void 0, this.registerConfig = void 0, this.remoteAudioElement = (r = e.mediaConfig) == null ? void 0 : r.remoteAudioElement;
    let t = {
      mediaConfig: {
        containers: {
          local: {
            video: e.mediaConfig.localVideoElement
          },
          remote: {
            audio: e.mediaConfig.remoteAudioElement,
            video: e.mediaConfig.remoteVideoElement
          }
        },
        constraints: {
          audio: !0,
          video: !1
        }
      },
      eventSubscription: e.eventSubscription
    };
    this.configuration = {
      ...t,
      callEventHandlers: {
        onCallHold(i, n) {
          var o, d;
          let a = { event_name: "call_hold", call_id: i, held: n };
          (d = (o = t.eventSubscription) == null ? void 0 : o.onCallEvent) == null || d.call(o, a);
        },
        onIncomingCall: async (i) => {
          var a, o;
          if (this.calls.length > 0) {
            console.log("Incoming call while already on a call"), await this.declineCall(i);
            return;
          }
          this.calls = this.pushToCallList(this.calls, i);
          let n = { event_name: "incoming_call", call_id: i.id };
          (o = (a = t.eventSubscription) == null ? void 0 : a.onCallEvent) == null || o.call(a, n);
        },
        onCallAnswered: (i) => {
          var a, o;
          let n = { event_name: "answered", call_id: i };
          (o = (a = t.eventSubscription) == null ? void 0 : a.onCallEvent) == null || o.call(a, n);
        },
        onCallHangup: (i) => {
          var a;
          const n = this.getCallById(this.calls, i);
          if (G(n)) {
            const o = (a = this.webPhone) == null ? void 0 : a.transitionToHangup(n.value);
            this.calls = this.updateCallList(this.calls, o);
          } else
            console.log("onCallHangup: call not found");
          setTimeout(() => {
            var d, h;
            this.calls = this.cleanUp(this.calls, i);
            for (const u of this.calls)
              this.isHeld(u) || this.reloadRemoteAudio(u);
            let o = { event_name: "hangup", call_id: i };
            (h = (d = t.eventSubscription) == null ? void 0 : d.onCallEvent) == null || h.call(d, o);
          }, 1e3);
        },
        onServerConnected: () => {
          var n, a;
          let i = { event_name: "connected" };
          (a = (n = t.eventSubscription) == null ? void 0 : n.onConnectionEvent) == null || a.call(n, i);
        },
        onRegister: () => {
          var n, a;
          let i = { event_name: "registered" };
          (a = (n = t.eventSubscription) == null ? void 0 : n.onConnectionEvent) == null || a.call(n, i);
        },
        onDTMF: (i, n, a) => {
          var d, h;
          let o = { event_name: "dtmf", call_id: i, tone: n, duration: a };
          (h = (d = t.eventSubscription) == null ? void 0 : d.onCallEvent) == null || h.call(d, o);
        },
        onServerDisconnect: () => {
          var n, a;
          let i = { event_name: "disconnected" };
          (a = (n = t.eventSubscription) == null ? void 0 : n.onConnectionEvent) == null || a.call(n, i);
        },
        onUnregistered: () => {
          var n, a;
          let i = { event_name: "unregistered" };
          (a = (n = t.eventSubscription) == null ? void 0 : n.onConnectionEvent) == null || a.call(n, i);
        },
        onSIPMessage: (i, n) => {
          var o, d;
          let a = { event_name: "message", call_id: i, message: n };
          (d = (o = t.eventSubscription).onCallEvent) == null || d.call(o, a);
        }
      }
    };
  }
  setDataChannel(e) {
    const t = e.id, r = e._sdh.dataChannel;
    r && (r.onclose = (i) => {
      console.log(`${t} data channel onClose`);
    }, r.onerror = (i) => {
      console.error(`${t} data channel onError`);
    }, r.onmessage = (i) => {
      var a, o;
      console.log(`${t} data channel onMessage`);
      let n = { event_name: "message", call_id: t, message: i.data };
      (o = (a = this.configuration.eventSubscription) == null ? void 0 : a.onCallEvent) == null || o.call(a, n);
    }, r.onopen = (i) => {
      console.log(`${t} data channel onOpen`);
    }, this.calls = this.updateCallList(this.calls, e));
  }
  // private removeDataChannel(call_id: string) {
  //     delete this.dataChannels[call_id]
  // }
  sendMessage(e, t) {
    const r = e._sdh.dataChannel;
    if (!r) {
      const i = "No data channel";
      console.error("failed to send message"), console.error(i);
      return;
    }
    switch (r.readyState) {
      case "connecting":
        console.error("Attempted to send message while data channel connecting.");
        break;
      case "open":
        try {
          r.send(t);
        } catch (i) {
          alert(`${e.id} Failed to send message.
` + i);
        }
        break;
      case "closing":
        console.error("Attempted to send message while data channel closing.");
        break;
      case "closed":
        console.error("Attempted to send while data channel connection closed.");
        break;
    }
  }
  pushToCallList(e, t) {
    return t ? e = je.pipe(
      e,
      Xi(t)
    ) : console.log("Call is undefined"), e;
  }
  getCallById(e, t) {
    return je.pipe(
      e,
      rs((i) => i.id == t)
    );
  }
  updateCallList(e, t) {
    if (t) {
      const r = ts((i) => i.id == t.id)(e);
      Kt(r) ? console.log("Call not found") : e = je.pipe(
        e,
        is(r.value, t),
        Oi(() => e)
      );
    } else
      console.log("Call is undefined");
    return e;
  }
  cleanUp(e, t) {
    const r = typeof t == "string" ? t : t.id;
    return je.pipe(
      e,
      Nt((n) => n.id != r)
    );
  }
  reloadRemoteAudio(e) {
    if (this.remoteAudioElement) {
      const t = this.getRemoteMediaStream(e);
      this.reloadAudioElement(t);
    }
  }
  reloadAudioElement(e) {
    e ? (this.remoteAudioElement.autoplay = !0, this.remoteAudioElement.srcObject = e, this.remoteAudioElement.play().catch((t) => {
      console.error("refreshAudioElement: Failed to play media"), console.error(t);
    })) : console.log("reloadAudioElement: remote media not defined");
  }
  formatAddress(e) {
    var t;
    return e.startsWith("sip:") || (e = `sip:${e}@${(t = this.registerConfig) == null ? void 0 : t.server.host}`), e;
  }
  async updateCall(e, t) {
    t ? this.calls = this.updateCallList(this.calls, await e(t)) : console.log("no call to update");
  }
  async holdCalls(e) {
    var t;
    for (const r of e)
      this.isHeld(r) || await ((t = this.webPhone) == null ? void 0 : t.hold(r));
  }
  getLocalMediaStream(e) {
    if (this.webPhone && e.state.value == "call") {
      const t = this.webPhone.getLocalMediaStream(e);
      if (G(t))
        return t.value;
    }
  }
  getRemoteMediaStream(e) {
    if (this.webPhone && e.state.value == "call") {
      const t = this.webPhone.getRemoteMediaStream(e);
      if (G(t))
        return t.value;
    }
  }
  async register(e) {
    this.registerConfig = e, this.webPhone = Qs(this.configuration, e), this.isConnected() || await this.webPhone.connect(), await this.webPhone.register();
  }
  async unregister() {
    this.webPhone && await this.webPhone.unregister();
  }
  async connect() {
    this.webPhone && await this.webPhone.connect();
  }
  async disconnect() {
    this.webPhone && await this.webPhone.disconnect();
  }
  isConnected() {
    var e;
    return (e = this.webPhone) == null ? void 0 : e.isConnected();
  }
  async makeCall(e, t) {
    if (this.areAllCallsAnswered(this.calls)) {
      let r = Vr.Outgoing;
      if (e = this.formatAddress(e), await this.holdCalls(this.calls), this.webPhone) {
        const i = await this.webPhone.call(e, r, t);
        if (i) {
          this.calls = this.pushToCallList(this.calls, i);
          const n = await this.webPhone.waitForAnswered(i);
          this.calls = this.updateCallList(this.calls, n), this.setDataChannel(n);
        }
      }
    }
  }
  async acceptCall(e, t) {
    this.webPhone && (e ? this.calls = this.updateCallList(this.calls, await this.webPhone.accept(e, t, this.setDataChannel)) : console.log("acceptCall: no call to update"));
  }
  async renegotiate(e, t) {
    this.webPhone && (e ? await this.webPhone.renegotiate(e, t, this.configuration.eventSubscription.onCallEvent) : console.log("acceptCall: no call to update"));
  }
  isHeld(e) {
    var t;
    if (e)
      return (t = this.webPhone) == null ? void 0 : t.isHeld(e);
    console.log("no call to hold");
  }
  isMuted(e, t) {
    var r;
    if (e)
      return (r = this.webPhone) == null ? void 0 : r.isMuted(e, t);
    console.log("no call to mute");
  }
  mute(e) {
    this.webPhone && this.webPhone.mute(e);
  }
  unmute(e) {
    this.webPhone && this.webPhone.unmute(e);
  }
  toggleMute(e, t) {
    this.webPhone ? this.calls = this.updateCallList(this.calls, this.webPhone.toggleMute(e, t)) : console.log("toggleMute: webPhone not defined");
  }
  async hold(e) {
    this.webPhone && await this.webPhone.hold(e);
  }
  async unhold(e) {
    var r;
    const t = Nt((i) => i.id != e.id)(this.calls);
    this.isHeld(e) && (t.length > 0 && await this.holdCalls(t), await ((r = this.webPhone) == null ? void 0 : r.unhold(e)), this.reloadRemoteAudio(e));
  }
  async toggleHold(e) {
    var t;
    this.isHeld(e) ? await this.unhold(e) : await ((t = this.webPhone) == null ? void 0 : t.hold(e)), this.webPhone && this.updateCall((r) => r, e);
  }
  async hangupCall(e) {
    var t;
    e ? await ((t = this.webPhone) == null ? void 0 : t.hangup(e)) : console.log("no call to hangup");
  }
  async declineCall(e) {
    this.webPhone && (e ? await this.webPhone.decline(e) : console.log("no call to decline"));
  }
  async transferCalls(e, t) {
    var r;
    await ((r = this.webPhone) == null ? void 0 : r.transfer(e, t));
  }
  areAllCallsAnswered(e) {
    for (const t of e)
      if (t.state.value != "call")
        return !1;
    return !0;
  }
  async sendSIPMessage(e, t) {
    this.webPhone && await this.webPhone.sendSIPMessage(e, t);
  }
}
const _t = () => {
};
function An(s, e) {
  return s != s ? e == e : s !== e || s !== null && typeof s == "object" || typeof s == "function";
}
const Fe = [];
function Dn(s, e = _t) {
  let t = null;
  const r = /* @__PURE__ */ new Set();
  function i(o) {
    if (An(s, o) && (s = o, t)) {
      const d = !Fe.length;
      for (const h of r)
        h[1](), Fe.push(h, s);
      if (d) {
        for (let h = 0; h < Fe.length; h += 2)
          Fe[h][0](Fe[h + 1]);
        Fe.length = 0;
      }
    }
  }
  function n(o) {
    i(o(
      /** @type {T} */
      s
    ));
  }
  function a(o, d = _t) {
    const h = [o, d];
    return r.add(h), r.size === 1 && (t = e(i, n) || _t), o(
      /** @type {T} */
      s
    ), () => {
      r.delete(h), r.size === 0 && t && (t(), t = null);
    };
  }
  return { set: i, update: n, subscribe: a };
}
class Pn extends In {
  constructor(e) {
    super(e), this.callList = Dn([]);
  }
  pushToCallList(e, t) {
    const r = super.pushToCallList(e, t);
    return t && this.callList.set(r), r;
  }
  updateCallList(e, t) {
    const r = super.updateCallList(e, t);
    return this.callList.set(r), r;
  }
  cleanUp(e, t) {
    const r = super.cleanUp(e, t);
    return this.callList.set(r), r;
  }
}
export {
  In as WebPhone,
  Pn as WebPhoneSvelte
};
