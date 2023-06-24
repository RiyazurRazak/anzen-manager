var t, e;
(t = self),
  (e = function () {
    return (() => {
      var t = {
        d: (e, s) => {
          for (var n in s)
            t.o(s, n) &&
              !t.o(e, n) &&
              Object.defineProperty(e, n, { enumerable: !0, get: s[n] });
        },
      };
      (t.g = (function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || new Function("return this")();
        } catch (t) {
          if ("object" == typeof window) return window;
        }
      })()),
        (t.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
        (t.r = (t) => {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(t, "t", { value: !0 });
        });
      var e,
        s = {};
      t.r(s),
        t.d(s, {
          AbortError: () => r,
          DefaultHttpClient: () => H,
          HttpClient: () => d,
          HttpError: () => n,
          HttpResponse: () => u,
          HttpTransportType: () => W,
          HubConnection: () => L,
          HubConnectionBuilder: () => Q,
          HubConnectionState: () => R,
          JsonHubProtocol: () => G,
          LogLevel: () => e,
          MessageType: () => A,
          NullLogger: () => f,
          Subject: () => U,
          TimeoutError: () => i,
          TransferFormat: () => O,
          VERSION: () => p,
        });
      class n extends Error {
        constructor(t, e) {
          const s = new.target.prototype;
          super(`${t}: Status code '${e}'`),
            (this.statusCode = e),
            (this.__proto__ = s);
        }
      }
      class i extends Error {
        constructor(t = "A timeout occurred.") {
          const e = new.target.prototype;
          super(t), (this.__proto__ = e);
        }
      }
      class r extends Error {
        constructor(t = "An abort occurred.") {
          const e = new.target.prototype;
          super(t), (this.__proto__ = e);
        }
      }
      class o extends Error {
        constructor(t, e) {
          const s = new.target.prototype;
          super(t),
            (this.transport = e),
            (this.errorType = "UnsupportedTransportError"),
            (this.__proto__ = s);
        }
      }
      class h extends Error {
        constructor(t, e) {
          const s = new.target.prototype;
          super(t),
            (this.transport = e),
            (this.errorType = "DisabledTransportError"),
            (this.__proto__ = s);
        }
      }
      class c extends Error {
        constructor(t, e) {
          const s = new.target.prototype;
          super(t),
            (this.transport = e),
            (this.errorType = "FailedToStartTransportError"),
            (this.__proto__ = s);
        }
      }
      class a extends Error {
        constructor(t) {
          const e = new.target.prototype;
          super(t),
            (this.errorType = "FailedToNegotiateWithServerError"),
            (this.__proto__ = e);
        }
      }
      class l extends Error {
        constructor(t, e) {
          const s = new.target.prototype;
          super(t), (this.innerErrors = e), (this.__proto__ = s);
        }
      }
      class u {
        constructor(t, e, s) {
          (this.statusCode = t), (this.statusText = e), (this.content = s);
        }
      }
      class d {
        get(t, e) {
          return this.send({ ...e, method: "GET", url: t });
        }
        post(t, e) {
          return this.send({ ...e, method: "POST", url: t });
        }
        delete(t, e) {
          return this.send({ ...e, method: "DELETE", url: t });
        }
        getCookieString(t) {
          return "";
        }
      }
      !(function (t) {
        (t[(t.Trace = 0)] = "Trace"),
          (t[(t.Debug = 1)] = "Debug"),
          (t[(t.Information = 2)] = "Information"),
          (t[(t.Warning = 3)] = "Warning"),
          (t[(t.Error = 4)] = "Error"),
          (t[(t.Critical = 5)] = "Critical"),
          (t[(t.None = 6)] = "None");
      })(e || (e = {}));
      class f {
        constructor() {}
        log(t, e) {}
      }
      f.instance = new f();
      const p = "6.0.1";
      class w {
        static isRequired(t, e) {
          if (null == t) throw new Error(`The '${e}' argument is required.`);
        }
        static isNotEmpty(t, e) {
          if (!t || t.match(/^\s*$/))
            throw new Error(`The '${e}' argument should not be empty.`);
        }
        static isIn(t, e, s) {
          if (!(t in e)) throw new Error(`Unknown ${s} value: ${t}.`);
        }
      }
      class g {
        static get isBrowser() {
          return "object" == typeof window;
        }
        static get isWebWorker() {
          return "object" == typeof self && "importScripts" in self;
        }
        static get isNode() {
          return !this.isBrowser && !this.isWebWorker;
        }
      }
      function m(t, e) {
        let s = "";
        return (
          y(t)
            ? ((s = `Binary data of length ${t.byteLength}`),
              e &&
                (s += `. Content: '${(function (t) {
                  const e = new Uint8Array(t);
                  let s = "";
                  return (
                    e.forEach((t) => {
                      s += `0x${t < 16 ? "0" : ""}${t.toString(16)} `;
                    }),
                    s.substr(0, s.length - 1)
                  );
                })(t)}'`))
            : "string" == typeof t &&
              ((s = `String data of length ${t.length}`),
              e && (s += `. Content: '${t}'`)),
          s
        );
      }
      function y(t) {
        return (
          t &&
          "undefined" != typeof ArrayBuffer &&
          (t instanceof ArrayBuffer ||
            (t.constructor && "ArrayBuffer" === t.constructor.name))
        );
      }
      async function b(t, s, n, i, r, o, h) {
        let c = {};
        if (r) {
          const t = await r();
          t && (c = { Authorization: `Bearer ${t}` });
        }
        const [a, l] = $();
        (c[a] = l),
          t.log(
            e.Trace,
            `(${s} transport) sending data. ${m(o, h.logMessageContent)}.`
          );
        const u = y(o) ? "arraybuffer" : "text",
          d = await n.post(i, {
            content: o,
            headers: { ...c, ...h.headers },
            responseType: u,
            timeout: h.timeout,
            withCredentials: h.withCredentials,
          });
        t.log(
          e.Trace,
          `(${s} transport) request complete. Response status: ${d.statusCode}.`
        );
      }
      class v {
        constructor(t, e) {
          (this.i = t), (this.h = e);
        }
        dispose() {
          const t = this.i.observers.indexOf(this.h);
          t > -1 && this.i.observers.splice(t, 1),
            0 === this.i.observers.length &&
              this.i.cancelCallback &&
              this.i.cancelCallback().catch((t) => {});
        }
      }
      class E {
        constructor(t) {
          (this.l = t), (this.out = console);
        }
        log(t, s) {
          if (t >= this.l) {
            const n = `[${new Date().toISOString()}] ${e[t]}: ${s}`;
            switch (t) {
              case e.Critical:
              case e.Error:
                this.out.error(n);
                break;
              case e.Warning:
                this.out.warn(n);
                break;
              case e.Information:
                this.out.info(n);
                break;
              default:
                this.out.log(n);
            }
          }
        }
      }
      function $() {
        let t = "X-SignalR-User-Agent";
        return (
          g.isNode && (t = "User-Agent"),
          [t, C(p, S(), g.isNode ? "NodeJS" : "Browser", k())]
        );
      }
      function C(t, e, s, n) {
        let i = "Microsoft SignalR/";
        const r = t.split(".");
        return (
          (i += `${r[0]}.${r[1]}`),
          (i += ` (${t}; `),
          (i += e && "" !== e ? `${e}; ` : "Unknown OS; "),
          (i += `${s}`),
          (i += n ? `; ${n}` : "; Unknown Runtime Version"),
          (i += ")"),
          i
        );
      }
      function S() {
        if (!g.isNode) return "";
        switch (process.platform) {
          case "win32":
            return "Windows NT";
          case "darwin":
            return "macOS";
          case "linux":
            return "Linux";
          default:
            return process.platform;
        }
      }
      function k() {
        if (g.isNode) return process.versions.node;
      }
      function P(t) {
        return t.stack ? t.stack : t.message ? t.message : `${t}`;
      }
      class T extends d {
        constructor(e) {
          if ((super(), (this.u = e), "undefined" == typeof fetch)) {
            const t = require;
            (this.p = new (t("tough-cookie").CookieJar)()),
              (this.m = t("node-fetch")),
              (this.m = t("fetch-cookie")(this.m, this.p));
          } else
            this.m = fetch.bind(
              (function () {
                if ("undefined" != typeof globalThis) return globalThis;
                if ("undefined" != typeof self) return self;
                if ("undefined" != typeof window) return window;
                if (void 0 !== t.g) return t.g;
                throw new Error("could not find global");
              })()
            );
          if ("undefined" == typeof AbortController) {
            const t = require;
            this.v = t("abort-controller");
          } else this.v = AbortController;
        }
        async send(t) {
          if (t.abortSignal && t.abortSignal.aborted) throw new r();
          if (!t.method) throw new Error("No method defined.");
          if (!t.url) throw new Error("No url defined.");
          const s = new this.v();
          let o;
          t.abortSignal &&
            (t.abortSignal.onabort = () => {
              s.abort(), (o = new r());
            });
          let h,
            c = null;
          if (t.timeout) {
            const n = t.timeout;
            c = setTimeout(() => {
              s.abort(),
                this.u.log(e.Warning, "Timeout from HTTP request."),
                (o = new i());
            }, n);
          }
          try {
            h = await this.m(t.url, {
              body: t.content,
              cache: "no-cache",
              credentials: !0 === t.withCredentials ? "include" : "same-origin",
              headers: {
                "Content-Type": "text/plain;charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                ...t.headers,
              },
              method: t.method,
              mode: "cors",
              redirect: "follow",
              signal: s.signal,
            });
          } catch (t) {
            if (o) throw o;
            throw (this.u.log(e.Warning, `Error from HTTP request. ${t}.`), t);
          } finally {
            c && clearTimeout(c),
              t.abortSignal && (t.abortSignal.onabort = null);
          }
          if (!h.ok) {
            const t = await I(h, "text");
            throw new n(t || h.statusText, h.status);
          }
          const a = I(h, t.responseType),
            l = await a;
          return new u(h.status, h.statusText, l);
        }
        getCookieString(t) {
          let e = "";
          return (
            g.isNode &&
              this.p &&
              this.p.getCookies(t, (t, s) => (e = s.join("; "))),
            e
          );
        }
      }
      function I(t, e) {
        let s;
        switch (e) {
          case "arraybuffer":
            s = t.arrayBuffer();
            break;
          case "text":
            s = t.text();
            break;
          case "blob":
          case "document":
          case "json":
            throw new Error(`${e} is not supported.`);
          default:
            s = t.text();
        }
        return s;
      }
      class _ extends d {
        constructor(t) {
          super(), (this.u = t);
        }
        send(t) {
          return t.abortSignal && t.abortSignal.aborted
            ? Promise.reject(new r())
            : t.method
            ? t.url
              ? new Promise((s, o) => {
                  const h = new XMLHttpRequest();
                  h.open(t.method, t.url, !0),
                    (h.withCredentials =
                      void 0 === t.withCredentials || t.withCredentials),
                    h.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                    h.setRequestHeader(
                      "Content-Type",
                      "text/plain;charset=UTF-8"
                    );
                  const c = t.headers;
                  c &&
                    Object.keys(c).forEach((t) => {
                      h.setRequestHeader(t, c[t]);
                    }),
                    t.responseType && (h.responseType = t.responseType),
                    t.abortSignal &&
                      (t.abortSignal.onabort = () => {
                        h.abort(), o(new r());
                      }),
                    t.timeout && (h.timeout = t.timeout),
                    (h.onload = () => {
                      t.abortSignal && (t.abortSignal.onabort = null),
                        h.status >= 200 && h.status < 300
                          ? s(
                              new u(
                                h.status,
                                h.statusText,
                                h.response || h.responseText
                              )
                            )
                          : o(
                              new n(
                                h.response || h.responseText || h.statusText,
                                h.status
                              )
                            );
                    }),
                    (h.onerror = () => {
                      this.u.log(
                        e.Warning,
                        `Error from HTTP request. ${h.status}: ${h.statusText}.`
                      ),
                        o(new n(h.statusText, h.status));
                    }),
                    (h.ontimeout = () => {
                      this.u.log(e.Warning, "Timeout from HTTP request."),
                        o(new i());
                    }),
                    h.send(t.content || "");
                })
              : Promise.reject(new Error("No url defined."))
            : Promise.reject(new Error("No method defined."));
        }
      }
      class H extends d {
        constructor(t) {
          if ((super(), "undefined" != typeof fetch || g.isNode))
            this.$ = new T(t);
          else {
            if ("undefined" == typeof XMLHttpRequest)
              throw new Error("No usable HttpClient found.");
            this.$ = new _(t);
          }
        }
        send(t) {
          return t.abortSignal && t.abortSignal.aborted
            ? Promise.reject(new r())
            : t.method
            ? t.url
              ? this.$.send(t)
              : Promise.reject(new Error("No url defined."))
            : Promise.reject(new Error("No method defined."));
        }
        getCookieString(t) {
          return this.$.getCookieString(t);
        }
      }
      class D {
        static write(t) {
          return `${t}${D.RecordSeparator}`;
        }
        static parse(t) {
          if (t[t.length - 1] !== D.RecordSeparator)
            throw new Error("Message is incomplete.");
          const e = t.split(D.RecordSeparator);
          return e.pop(), e;
        }
      }
      (D.RecordSeparatorCode = 30),
        (D.RecordSeparator = String.fromCharCode(D.RecordSeparatorCode));
      class x {
        writeHandshakeRequest(t) {
          return D.write(JSON.stringify(t));
        }
        parseHandshakeResponse(t) {
          let e, s;
          if (y(t)) {
            const n = new Uint8Array(t),
              i = n.indexOf(D.RecordSeparatorCode);
            if (-1 === i) throw new Error("Message is incomplete.");
            const r = i + 1;
            (e = String.fromCharCode.apply(
              null,
              Array.prototype.slice.call(n.slice(0, r))
            )),
              (s = n.byteLength > r ? n.slice(r).buffer : null);
          } else {
            const n = t,
              i = n.indexOf(D.RecordSeparator);
            if (-1 === i) throw new Error("Message is incomplete.");
            const r = i + 1;
            (e = n.substring(0, r)), (s = n.length > r ? n.substring(r) : null);
          }
          const n = D.parse(e),
            i = JSON.parse(n[0]);
          if (i.type)
            throw new Error("Expected a handshake response from the server.");
          return [s, i];
        }
      }
      var A, R;
      !(function (t) {
        (t[(t.Invocation = 1)] = "Invocation"),
          (t[(t.StreamItem = 2)] = "StreamItem"),
          (t[(t.Completion = 3)] = "Completion"),
          (t[(t.StreamInvocation = 4)] = "StreamInvocation"),
          (t[(t.CancelInvocation = 5)] = "CancelInvocation"),
          (t[(t.Ping = 6)] = "Ping"),
          (t[(t.Close = 7)] = "Close");
      })(A || (A = {}));
      class U {
        constructor() {
          this.observers = [];
        }
        next(t) {
          for (const e of this.observers) e.next(t);
        }
        error(t) {
          for (const e of this.observers) e.error && e.error(t);
        }
        complete() {
          for (const t of this.observers) t.complete && t.complete();
        }
        subscribe(t) {
          return this.observers.push(t), new v(this, t);
        }
      }
      !(function (t) {
        (t.Disconnected = "Disconnected"),
          (t.Connecting = "Connecting"),
          (t.Connected = "Connected"),
          (t.Disconnecting = "Disconnecting"),
          (t.Reconnecting = "Reconnecting");
      })(R || (R = {}));
      class L {
        constructor(t, s, n, i) {
          (this.C = 0),
            (this.S = () => {
              this.u.log(
                e.Warning,
                "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://docs.microsoft.com/aspnet/core/signalr/javascript-client#bsleep"
              );
            }),
            w.isRequired(t, "connection"),
            w.isRequired(s, "logger"),
            w.isRequired(n, "protocol"),
            (this.serverTimeoutInMilliseconds = 3e4),
            (this.keepAliveIntervalInMilliseconds = 15e3),
            (this.u = s),
            (this.k = n),
            (this.connection = t),
            (this.P = i),
            (this.T = new x()),
            (this.connection.onreceive = (t) => this.I(t)),
            (this.connection.onclose = (t) => this._(t)),
            (this.H = {}),
            (this.D = {}),
            (this.A = []),
            (this.R = []),
            (this.U = []),
            (this.L = 0),
            (this.N = !1),
            (this.q = R.Disconnected),
            (this.M = !1),
            (this.W = this.k.writeMessage({ type: A.Ping }));
        }
        static create(t, e, s, n) {
          return new L(t, e, s, n);
        }
        get state() {
          return this.q;
        }
        get connectionId() {
          return (this.connection && this.connection.connectionId) || null;
        }
        get baseUrl() {
          return this.connection.baseUrl || "";
        }
        set baseUrl(t) {
          if (this.q !== R.Disconnected && this.q !== R.Reconnecting)
            throw new Error(
              "The HubConnection must be in the Disconnected or Reconnecting state to change the url."
            );
          if (!t) throw new Error("The HubConnection url must be a valid url.");
          this.connection.baseUrl = t;
        }
        start() {
          return (this.O = this.j()), this.O;
        }
        async j() {
          if (this.q !== R.Disconnected)
            return Promise.reject(
              new Error(
                "Cannot start a HubConnection that is not in the 'Disconnected' state."
              )
            );
          (this.q = R.Connecting),
            this.u.log(e.Debug, "Starting HubConnection.");
          try {
            await this.F(),
              g.isBrowser &&
                document &&
                document.addEventListener("freeze", this.S),
              (this.q = R.Connected),
              (this.M = !0),
              this.u.log(e.Debug, "HubConnection connected successfully.");
          } catch (t) {
            return (
              (this.q = R.Disconnected),
              this.u.log(
                e.Debug,
                `HubConnection failed to start successfully because of error '${t}'.`
              ),
              Promise.reject(t)
            );
          }
        }
        async F() {
          (this.B = void 0), (this.N = !1);
          const t = new Promise((t, e) => {
            (this.X = t), (this.J = e);
          });
          await this.connection.start(this.k.transferFormat);
          try {
            const s = { protocol: this.k.name, version: this.k.version };
            if (
              (this.u.log(e.Debug, "Sending handshake request."),
              await this.V(this.T.writeHandshakeRequest(s)),
              this.u.log(e.Information, `Using HubProtocol '${this.k.name}'.`),
              this.G(),
              this.K(),
              this.Y(),
              await t,
              this.B)
            )
              throw this.B;
          } catch (t) {
            throw (
              (this.u.log(
                e.Debug,
                `Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`
              ),
              this.G(),
              this.Z(),
              await this.connection.stop(t),
              t)
            );
          }
        }
        async stop() {
          const t = this.O;
          (this.tt = this.et()), await this.tt;
          try {
            await t;
          } catch (t) {}
        }
        et(t) {
          return this.q === R.Disconnected
            ? (this.u.log(
                e.Debug,
                `Call to HubConnection.stop(${t}) ignored because it is already in the disconnected state.`
              ),
              Promise.resolve())
            : this.q === R.Disconnecting
            ? (this.u.log(
                e.Debug,
                `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnecting state.`
              ),
              this.tt)
            : ((this.q = R.Disconnecting),
              this.u.log(e.Debug, "Stopping HubConnection."),
              this.st
                ? (this.u.log(
                    e.Debug,
                    "Connection stopped during reconnect delay. Done reconnecting."
                  ),
                  clearTimeout(this.st),
                  (this.st = void 0),
                  this.nt(),
                  Promise.resolve())
                : (this.G(),
                  this.Z(),
                  (this.B =
                    t ||
                    new Error(
                      "The connection was stopped before the hub handshake could complete."
                    )),
                  this.connection.stop(t)));
        }
        stream(t, ...e) {
          const [s, n] = this.it(e),
            i = this.rt(t, e, n);
          let r;
          const o = new U();
          return (
            (o.cancelCallback = () => {
              const t = this.ot(i.invocationId);
              return delete this.H[i.invocationId], r.then(() => this.ht(t));
            }),
            (this.H[i.invocationId] = (t, e) => {
              e
                ? o.error(e)
                : t &&
                  (t.type === A.Completion
                    ? t.error
                      ? o.error(new Error(t.error))
                      : o.complete()
                    : o.next(t.item));
            }),
            (r = this.ht(i).catch((t) => {
              o.error(t), delete this.H[i.invocationId];
            })),
            this.ct(s, r),
            o
          );
        }
        V(t) {
          return this.Y(), this.connection.send(t);
        }
        ht(t) {
          return this.V(this.k.writeMessage(t));
        }
        send(t, ...e) {
          const [s, n] = this.it(e),
            i = this.ht(this.at(t, e, !0, n));
          return this.ct(s, i), i;
        }
        invoke(t, ...e) {
          const [s, n] = this.it(e),
            i = this.at(t, e, !1, n);
          return new Promise((t, e) => {
            this.H[i.invocationId] = (s, n) => {
              n
                ? e(n)
                : s &&
                  (s.type === A.Completion
                    ? s.error
                      ? e(new Error(s.error))
                      : t(s.result)
                    : e(new Error(`Unexpected message type: ${s.type}`)));
            };
            const n = this.ht(i).catch((t) => {
              e(t), delete this.H[i.invocationId];
            });
            this.ct(s, n);
          });
        }
        on(t, e) {
          t &&
            e &&
            ((t = t.toLowerCase()),
            this.D[t] || (this.D[t] = []),
            -1 === this.D[t].indexOf(e) && this.D[t].push(e));
        }
        off(t, e) {
          if (!t) return;
          t = t.toLowerCase();
          const s = this.D[t];
          if (s)
            if (e) {
              const n = s.indexOf(e);
              -1 !== n && (s.splice(n, 1), 0 === s.length && delete this.D[t]);
            } else delete this.D[t];
        }
        onclose(t) {
          t && this.A.push(t);
        }
        onreconnecting(t) {
          t && this.R.push(t);
        }
        onreconnected(t) {
          t && this.U.push(t);
        }
        I(t) {
          if ((this.G(), this.N || ((t = this.lt(t)), (this.N = !0)), t)) {
            const s = this.k.parseMessages(t, this.u);
            for (const t of s)
              switch (t.type) {
                case A.Invocation:
                  this.ut(t);
                  break;
                case A.StreamItem:
                case A.Completion: {
                  const s = this.H[t.invocationId];
                  if (s) {
                    t.type === A.Completion && delete this.H[t.invocationId];
                    try {
                      s(t);
                    } catch (t) {
                      this.u.log(
                        e.Error,
                        `Stream callback threw error: ${P(t)}`
                      );
                    }
                  }
                  break;
                }
                case A.Ping:
                  break;
                case A.Close: {
                  this.u.log(
                    e.Information,
                    "Close message received from server."
                  );
                  const s = t.error
                    ? new Error("Server returned an error on close: " + t.error)
                    : void 0;
                  !0 === t.allowReconnect
                    ? this.connection.stop(s)
                    : (this.tt = this.et(s));
                  break;
                }
                default:
                  this.u.log(e.Warning, `Invalid message type: ${t.type}.`);
              }
          }
          this.K();
        }
        lt(t) {
          let s, n;
          try {
            [n, s] = this.T.parseHandshakeResponse(t);
          } catch (t) {
            const s = "Error parsing handshake response: " + t;
            this.u.log(e.Error, s);
            const n = new Error(s);
            throw (this.J(n), n);
          }
          if (s.error) {
            const t = "Server returned handshake error: " + s.error;
            this.u.log(e.Error, t);
            const n = new Error(t);
            throw (this.J(n), n);
          }
          return this.u.log(e.Debug, "Server handshake complete."), this.X(), n;
        }
        Y() {
          this.connection.features.inherentKeepAlive ||
            ((this.C =
              new Date().getTime() + this.keepAliveIntervalInMilliseconds),
            this.Z());
        }
        K() {
          if (
            !(
              (this.connection.features &&
                this.connection.features.inherentKeepAlive) ||
              ((this.dt = setTimeout(
                () => this.serverTimeout(),
                this.serverTimeoutInMilliseconds
              )),
              void 0 !== this.ft)
            )
          ) {
            let t = this.C - new Date().getTime();
            t < 0 && (t = 0),
              (this.ft = setTimeout(async () => {
                if (this.q === R.Connected)
                  try {
                    await this.V(this.W);
                  } catch {
                    this.Z();
                  }
              }, t));
          }
        }
        serverTimeout() {
          this.connection.stop(
            new Error(
              "Server timeout elapsed without receiving a message from the server."
            )
          );
        }
        ut(t) {
          const s = this.D[t.target.toLowerCase()];
          if (s) {
            try {
              s.forEach((e) => e.apply(this, t.arguments));
            } catch (s) {
              this.u.log(
                e.Error,
                `A callback for the method ${t.target.toLowerCase()} threw error '${s}'.`
              );
            }
            if (t.invocationId) {
              const t =
                "Server requested a response, which is not supported in this version of the client.";
              this.u.log(e.Error, t), (this.tt = this.et(new Error(t)));
            }
          } else
            this.u.log(
              e.Warning,
              `No client method with the name '${t.target}' found.`
            );
        }
        _(t) {
          this.u.log(
            e.Debug,
            `HubConnection.connectionClosed(${t}) called while in state ${this.q}.`
          ),
            (this.B =
              this.B ||
              t ||
              new Error(
                "The underlying connection was closed before the hub handshake could complete."
              )),
            this.X && this.X(),
            this.wt(
              t ||
                new Error(
                  "Invocation canceled due to the underlying connection being closed."
                )
            ),
            this.G(),
            this.Z(),
            this.q === R.Disconnecting
              ? this.nt(t)
              : this.q === R.Connected && this.P
              ? this.gt(t)
              : this.q === R.Connected && this.nt(t);
        }
        nt(t) {
          if (this.M) {
            (this.q = R.Disconnected),
              (this.M = !1),
              g.isBrowser &&
                document &&
                document.removeEventListener("freeze", this.S);
            try {
              this.A.forEach((e) => e.apply(this, [t]));
            } catch (s) {
              this.u.log(
                e.Error,
                `An onclose callback called with error '${t}' threw error '${s}'.`
              );
            }
          }
        }
        async gt(t) {
          const s = Date.now();
          let n = 0,
            i =
              void 0 !== t
                ? t
                : new Error("Attempting to reconnect due to a unknown error."),
            r = this.yt(n++, 0, i);
          if (null === r)
            return (
              this.u.log(
                e.Debug,
                "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."
              ),
              void this.nt(t)
            );
          if (
            ((this.q = R.Reconnecting),
            t
              ? this.u.log(
                  e.Information,
                  `Connection reconnecting because of error '${t}'.`
                )
              : this.u.log(e.Information, "Connection reconnecting."),
            0 !== this.R.length)
          ) {
            try {
              this.R.forEach((e) => e.apply(this, [t]));
            } catch (s) {
              this.u.log(
                e.Error,
                `An onreconnecting callback called with error '${t}' threw error '${s}'.`
              );
            }
            if (this.q !== R.Reconnecting)
              return void this.u.log(
                e.Debug,
                "Connection left the reconnecting state in onreconnecting callback. Done reconnecting."
              );
          }
          for (; null !== r; ) {
            if (
              (this.u.log(
                e.Information,
                `Reconnect attempt number ${n} will start in ${r} ms.`
              ),
              await new Promise((t) => {
                this.st = setTimeout(t, r);
              }),
              (this.st = void 0),
              this.q !== R.Reconnecting)
            )
              return void this.u.log(
                e.Debug,
                "Connection left the reconnecting state during reconnect delay. Done reconnecting."
              );
            try {
              if (
                (await this.F(),
                (this.q = R.Connected),
                this.u.log(
                  e.Information,
                  "HubConnection reconnected successfully."
                ),
                0 !== this.U.length)
              )
                try {
                  this.U.forEach((t) =>
                    t.apply(this, [this.connection.connectionId])
                  );
                } catch (t) {
                  this.u.log(
                    e.Error,
                    `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${t}'.`
                  );
                }
              return;
            } catch (t) {
              if (
                (this.u.log(
                  e.Information,
                  `Reconnect attempt failed because of error '${t}'.`
                ),
                this.q !== R.Reconnecting)
              )
                return (
                  this.u.log(
                    e.Debug,
                    `Connection moved to the '${this.q}' from the reconnecting state during reconnect attempt. Done reconnecting.`
                  ),
                  void (this.q === R.Disconnecting && this.nt())
                );
              (i = t instanceof Error ? t : new Error(t.toString())),
                (r = this.yt(n++, Date.now() - s, i));
            }
          }
          this.u.log(
            e.Information,
            `Reconnect retries have been exhausted after ${
              Date.now() - s
            } ms and ${n} failed attempts. Connection disconnecting.`
          ),
            this.nt();
        }
        yt(t, s, n) {
          try {
            return this.P.nextRetryDelayInMilliseconds({
              elapsedMilliseconds: s,
              previousRetryCount: t,
              retryReason: n,
            });
          } catch (n) {
            return (
              this.u.log(
                e.Error,
                `IRetryPolicy.nextRetryDelayInMilliseconds(${t}, ${s}) threw error '${n}'.`
              ),
              null
            );
          }
        }
        wt(t) {
          const s = this.H;
          (this.H = {}),
            Object.keys(s).forEach((n) => {
              const i = s[n];
              try {
                i(null, t);
              } catch (s) {
                this.u.log(
                  e.Error,
                  `Stream 'error' callback called with '${t}' threw error: ${P(
                    s
                  )}`
                );
              }
            });
        }
        Z() {
          this.ft && (clearTimeout(this.ft), (this.ft = void 0));
        }
        G() {
          this.dt && clearTimeout(this.dt);
        }
        at(t, e, s, n) {
          if (s)
            return 0 !== n.length
              ? { arguments: e, streamIds: n, target: t, type: A.Invocation }
              : { arguments: e, target: t, type: A.Invocation };
          {
            const s = this.L;
            return (
              this.L++,
              0 !== n.length
                ? {
                    arguments: e,
                    invocationId: s.toString(),
                    streamIds: n,
                    target: t,
                    type: A.Invocation,
                  }
                : {
                    arguments: e,
                    invocationId: s.toString(),
                    target: t,
                    type: A.Invocation,
                  }
            );
          }
        }
        ct(t, e) {
          if (0 !== t.length) {
            e || (e = Promise.resolve());
            for (const s in t)
              t[s].subscribe({
                complete: () => {
                  e = e.then(() => this.ht(this.bt(s)));
                },
                error: (t) => {
                  let n;
                  (n =
                    t instanceof Error
                      ? t.message
                      : t && t.toString
                      ? t.toString()
                      : "Unknown error"),
                    (e = e.then(() => this.ht(this.bt(s, n))));
                },
                next: (t) => {
                  e = e.then(() => this.ht(this.vt(s, t)));
                },
              });
          }
        }
        it(t) {
          const e = [],
            s = [];
          for (let n = 0; n < t.length; n++) {
            const i = t[n];
            if (this.Et(i)) {
              const r = this.L;
              this.L++, (e[r] = i), s.push(r.toString()), t.splice(n, 1);
            }
          }
          return [e, s];
        }
        Et(t) {
          return t && t.subscribe && "function" == typeof t.subscribe;
        }
        rt(t, e, s) {
          const n = this.L;
          return (
            this.L++,
            0 !== s.length
              ? {
                  arguments: e,
                  invocationId: n.toString(),
                  streamIds: s,
                  target: t,
                  type: A.StreamInvocation,
                }
              : {
                  arguments: e,
                  invocationId: n.toString(),
                  target: t,
                  type: A.StreamInvocation,
                }
          );
        }
        ot(t) {
          return { invocationId: t, type: A.CancelInvocation };
        }
        vt(t, e) {
          return { invocationId: t, item: e, type: A.StreamItem };
        }
        bt(t, e, s) {
          return e
            ? { error: e, invocationId: t, type: A.Completion }
            : { invocationId: t, result: s, type: A.Completion };
        }
      }
      const N = [0, 2e3, 1e4, 3e4, null];
      class q {
        constructor(t) {
          this.$t = void 0 !== t ? [...t, null] : N;
        }
        nextRetryDelayInMilliseconds(t) {
          return this.$t[t.previousRetryCount];
        }
      }
      class M {}
      var W, O;
      (M.Authorization = "Authorization"),
        (M.Cookie = "Cookie"),
        (function (t) {
          (t[(t.None = 0)] = "None"),
            (t[(t.WebSockets = 1)] = "WebSockets"),
            (t[(t.ServerSentEvents = 2)] = "ServerSentEvents"),
            (t[(t.LongPolling = 4)] = "LongPolling");
        })(W || (W = {})),
        (function (t) {
          (t[(t.Text = 1)] = "Text"), (t[(t.Binary = 2)] = "Binary");
        })(O || (O = {}));
      class j {
        constructor() {
          (this.Ct = !1), (this.onabort = null);
        }
        abort() {
          this.Ct || ((this.Ct = !0), this.onabort && this.onabort());
        }
        get signal() {
          return this;
        }
        get aborted() {
          return this.Ct;
        }
      }
      class F {
        constructor(t, e, s, n) {
          (this.$ = t),
            (this.St = e),
            (this.u = s),
            (this.kt = new j()),
            (this.Pt = n),
            (this.Tt = !1),
            (this.onreceive = null),
            (this.onclose = null);
        }
        get pollAborted() {
          return this.kt.aborted;
        }
        async connect(t, s) {
          if (
            (w.isRequired(t, "url"),
            w.isRequired(s, "transferFormat"),
            w.isIn(s, O, "transferFormat"),
            (this.It = t),
            this.u.log(e.Trace, "(LongPolling transport) Connecting."),
            s === O.Binary &&
              "undefined" != typeof XMLHttpRequest &&
              "string" != typeof new XMLHttpRequest().responseType)
          )
            throw new Error(
              "Binary protocols over XmlHttpRequest not implementing advanced features are not supported."
            );
          const [i, r] = $(),
            o = { [i]: r, ...this.Pt.headers },
            h = {
              abortSignal: this.kt.signal,
              headers: o,
              timeout: 1e5,
              withCredentials: this.Pt.withCredentials,
            };
          s === O.Binary && (h.responseType = "arraybuffer");
          const c = await this._t();
          this.Ht(h, c);
          const a = `${t}&_=${Date.now()}`;
          this.u.log(e.Trace, `(LongPolling transport) polling: ${a}.`);
          const l = await this.$.get(a, h);
          200 !== l.statusCode
            ? (this.u.log(
                e.Error,
                `(LongPolling transport) Unexpected response code: ${l.statusCode}.`
              ),
              (this.Dt = new n(l.statusText || "", l.statusCode)),
              (this.Tt = !1))
            : (this.Tt = !0),
            (this.xt = this.At(this.It, h));
        }
        async _t() {
          return this.St ? await this.St() : null;
        }
        Ht(t, e) {
          t.headers || (t.headers = {}),
            e
              ? (t.headers[M.Authorization] = `Bearer ${e}`)
              : t.headers[M.Authorization] && delete t.headers[M.Authorization];
        }
        async At(t, s) {
          try {
            for (; this.Tt; ) {
              const r = await this._t();
              this.Ht(s, r);
              try {
                const i = `${t}&_=${Date.now()}`;
                this.u.log(e.Trace, `(LongPolling transport) polling: ${i}.`);
                const r = await this.$.get(i, s);
                204 === r.statusCode
                  ? (this.u.log(
                      e.Information,
                      "(LongPolling transport) Poll terminated by server."
                    ),
                    (this.Tt = !1))
                  : 200 !== r.statusCode
                  ? (this.u.log(
                      e.Error,
                      `(LongPolling transport) Unexpected response code: ${r.statusCode}.`
                    ),
                    (this.Dt = new n(r.statusText || "", r.statusCode)),
                    (this.Tt = !1))
                  : r.content
                  ? (this.u.log(
                      e.Trace,
                      `(LongPolling transport) data received. ${m(
                        r.content,
                        this.Pt.logMessageContent
                      )}.`
                    ),
                    this.onreceive && this.onreceive(r.content))
                  : this.u.log(
                      e.Trace,
                      "(LongPolling transport) Poll timed out, reissuing."
                    );
              } catch (t) {
                this.Tt
                  ? t instanceof i
                    ? this.u.log(
                        e.Trace,
                        "(LongPolling transport) Poll timed out, reissuing."
                      )
                    : ((this.Dt = t), (this.Tt = !1))
                  : this.u.log(
                      e.Trace,
                      `(LongPolling transport) Poll errored after shutdown: ${t.message}`
                    );
              }
            }
          } finally {
            this.u.log(e.Trace, "(LongPolling transport) Polling complete."),
              this.pollAborted || this.Rt();
          }
        }
        async send(t) {
          return this.Tt
            ? b(this.u, "LongPolling", this.$, this.It, this.St, t, this.Pt)
            : Promise.reject(
                new Error("Cannot send until the transport is connected")
              );
        }
        async stop() {
          this.u.log(e.Trace, "(LongPolling transport) Stopping polling."),
            (this.Tt = !1),
            this.kt.abort();
          try {
            await this.xt,
              this.u.log(
                e.Trace,
                `(LongPolling transport) sending DELETE request to ${this.It}.`
              );
            const t = {},
              [s, n] = $();
            t[s] = n;
            const i = {
                headers: { ...t, ...this.Pt.headers },
                timeout: this.Pt.timeout,
                withCredentials: this.Pt.withCredentials,
              },
              r = await this._t();
            this.Ht(i, r),
              await this.$.delete(this.It, i),
              this.u.log(
                e.Trace,
                "(LongPolling transport) DELETE request sent."
              );
          } finally {
            this.u.log(e.Trace, "(LongPolling transport) Stop finished."),
              this.Rt();
          }
        }
        Rt() {
          if (this.onclose) {
            let t = "(LongPolling transport) Firing onclose event.";
            this.Dt && (t += " Error: " + this.Dt),
              this.u.log(e.Trace, t),
              this.onclose(this.Dt);
          }
        }
      }
      class B {
        constructor(t, e, s, n) {
          (this.$ = t),
            (this.St = e),
            (this.u = s),
            (this.Pt = n),
            (this.onreceive = null),
            (this.onclose = null);
        }
        async connect(t, s) {
          if (
            (w.isRequired(t, "url"),
            w.isRequired(s, "transferFormat"),
            w.isIn(s, O, "transferFormat"),
            this.u.log(e.Trace, "(SSE transport) Connecting."),
            (this.It = t),
            this.St)
          ) {
            const e = await this.St();
            e &&
              (t +=
                (t.indexOf("?") < 0 ? "?" : "&") +
                `access_token=${encodeURIComponent(e)}`);
          }
          return new Promise((n, i) => {
            let r,
              o = !1;
            if (s === O.Text) {
              if (g.isBrowser || g.isWebWorker)
                r = new this.Pt.EventSource(t, {
                  withCredentials: this.Pt.withCredentials,
                });
              else {
                const e = this.$.getCookieString(t),
                  s = {};
                s.Cookie = e;
                const [n, i] = $();
                (s[n] = i),
                  (r = new this.Pt.EventSource(t, {
                    withCredentials: this.Pt.withCredentials,
                    headers: { ...s, ...this.Pt.headers },
                  }));
              }
              try {
                (r.onmessage = (t) => {
                  if (this.onreceive)
                    try {
                      this.u.log(
                        e.Trace,
                        `(SSE transport) data received. ${m(
                          t.data,
                          this.Pt.logMessageContent
                        )}.`
                      ),
                        this.onreceive(t.data);
                    } catch (t) {
                      return void this.Ut(t);
                    }
                }),
                  (r.onerror = (t) => {
                    o
                      ? this.Ut()
                      : i(
                          new Error(
                            "EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."
                          )
                        );
                  }),
                  (r.onopen = () => {
                    this.u.log(e.Information, `SSE connected to ${this.It}`),
                      (this.Lt = r),
                      (o = !0),
                      n();
                  });
              } catch (t) {
                return void i(t);
              }
            } else
              i(
                new Error(
                  "The Server-Sent Events transport only supports the 'Text' transfer format"
                )
              );
          });
        }
        async send(t) {
          return this.Lt
            ? b(this.u, "SSE", this.$, this.It, this.St, t, this.Pt)
            : Promise.reject(
                new Error("Cannot send until the transport is connected")
              );
        }
        stop() {
          return this.Ut(), Promise.resolve();
        }
        Ut(t) {
          this.Lt &&
            (this.Lt.close(),
            (this.Lt = void 0),
            this.onclose && this.onclose(t));
        }
      }
      class X {
        constructor(t, e, s, n, i, r) {
          (this.u = s),
            (this.St = e),
            (this.Nt = n),
            (this.qt = i),
            (this.$ = t),
            (this.onreceive = null),
            (this.onclose = null),
            (this.Mt = r);
        }
        async connect(t, s) {
          if (
            (w.isRequired(t, "url"),
            w.isRequired(s, "transferFormat"),
            w.isIn(s, O, "transferFormat"),
            this.u.log(e.Trace, "(WebSockets transport) Connecting."),
            this.St)
          ) {
            const e = await this.St();
            e &&
              (t +=
                (t.indexOf("?") < 0 ? "?" : "&") +
                `access_token=${encodeURIComponent(e)}`);
          }
          return new Promise((n, i) => {
            let r;
            t = t.replace(/^http/, "ws");
            const o = this.$.getCookieString(t);
            let h = !1;
            if (g.isNode) {
              const e = {},
                [s, n] = $();
              (e[s] = n),
                o && (e[M.Cookie] = `${o}`),
                (r = new this.qt(t, void 0, { headers: { ...e, ...this.Mt } }));
            }
            r || (r = new this.qt(t)),
              s === O.Binary && (r.binaryType = "arraybuffer"),
              (r.onopen = (s) => {
                this.u.log(e.Information, `WebSocket connected to ${t}.`),
                  (this.Wt = r),
                  (h = !0),
                  n();
              }),
              (r.onerror = (t) => {
                let s = null;
                (s =
                  "undefined" != typeof ErrorEvent && t instanceof ErrorEvent
                    ? t.error
                    : "There was an error with the transport"),
                  this.u.log(e.Information, `(WebSockets transport) ${s}.`);
              }),
              (r.onmessage = (t) => {
                if (
                  (this.u.log(
                    e.Trace,
                    `(WebSockets transport) data received. ${m(
                      t.data,
                      this.Nt
                    )}.`
                  ),
                  this.onreceive)
                )
                  try {
                    this.onreceive(t.data);
                  } catch (t) {
                    return void this.Ut(t);
                  }
              }),
              (r.onclose = (t) => {
                if (h) this.Ut(t);
                else {
                  let e = null;
                  (e =
                    "undefined" != typeof ErrorEvent && t instanceof ErrorEvent
                      ? t.error
                      : "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled."),
                    i(new Error(e));
                }
              });
          });
        }
        send(t) {
          return this.Wt && this.Wt.readyState === this.qt.OPEN
            ? (this.u.log(
                e.Trace,
                `(WebSockets transport) sending data. ${m(t, this.Nt)}.`
              ),
              this.Wt.send(t),
              Promise.resolve())
            : Promise.reject("WebSocket is not in the OPEN state");
        }
        stop() {
          return this.Wt && this.Ut(void 0), Promise.resolve();
        }
        Ut(t) {
          this.Wt &&
            ((this.Wt.onclose = () => {}),
            (this.Wt.onmessage = () => {}),
            (this.Wt.onerror = () => {}),
            this.Wt.close(),
            (this.Wt = void 0)),
            this.u.log(e.Trace, "(WebSockets transport) socket closed."),
            this.onclose &&
              (!this.Ot(t) || (!1 !== t.wasClean && 1e3 === t.code)
                ? t instanceof Error
                  ? this.onclose(t)
                  : this.onclose()
                : this.onclose(
                    new Error(
                      `WebSocket closed with status code: ${t.code} (${
                        t.reason || "no reason given"
                      }).`
                    )
                  ));
        }
        Ot(t) {
          return (
            t && "boolean" == typeof t.wasClean && "number" == typeof t.code
          );
        }
      }
      class J {
        constructor(t, s = {}) {
          var n;
          if (
            ((this.jt = () => {}),
            (this.features = {}),
            (this.Ft = 1),
            w.isRequired(t, "url"),
            (this.u =
              void 0 === (n = s.logger)
                ? new E(e.Information)
                : null === n
                ? f.instance
                : void 0 !== n.log
                ? n
                : new E(n)),
            (this.baseUrl = this.Bt(t)),
            ((s = s || {}).logMessageContent =
              void 0 !== s.logMessageContent && s.logMessageContent),
            "boolean" != typeof s.withCredentials &&
              void 0 !== s.withCredentials)
          )
            throw new Error(
              "withCredentials option was not a 'boolean' or 'undefined' value"
            );
          (s.withCredentials =
            void 0 === s.withCredentials || s.withCredentials),
            (s.timeout = void 0 === s.timeout ? 1e5 : s.timeout);
          let i = null,
            r = null;
          if (g.isNode) {
            const t = require;
            (i = t("ws")), (r = t("eventsource"));
          }
          g.isNode || "undefined" == typeof WebSocket || s.WebSocket
            ? g.isNode && !s.WebSocket && i && (s.WebSocket = i)
            : (s.WebSocket = WebSocket),
            g.isNode || "undefined" == typeof EventSource || s.EventSource
              ? g.isNode &&
                !s.EventSource &&
                void 0 !== r &&
                (s.EventSource = r)
              : (s.EventSource = EventSource),
            (this.$ = s.httpClient || new H(this.u)),
            (this.q = "Disconnected"),
            (this.M = !1),
            (this.Pt = s),
            (this.onreceive = null),
            (this.onclose = null);
        }
        async start(t) {
          if (
            ((t = t || O.Binary),
            w.isIn(t, O, "transferFormat"),
            this.u.log(
              e.Debug,
              `Starting connection with transfer format '${O[t]}'.`
            ),
            "Disconnected" !== this.q)
          )
            return Promise.reject(
              new Error(
                "Cannot start an HttpConnection that is not in the 'Disconnected' state."
              )
            );
          if (
            ((this.q = "Connecting"),
            (this.Xt = this.F(t)),
            await this.Xt,
            "Disconnecting" === this.q)
          ) {
            const t =
              "Failed to start the HttpConnection before stop() was called.";
            return (
              this.u.log(e.Error, t),
              await this.tt,
              Promise.reject(new Error(t))
            );
          }
          if ("Connected" !== this.q) {
            const t =
              "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
            return this.u.log(e.Error, t), Promise.reject(new Error(t));
          }
          this.M = !0;
        }
        send(t) {
          return "Connected" !== this.q
            ? Promise.reject(
                new Error(
                  "Cannot send data if the connection is not in the 'Connected' State."
                )
              )
            : (this.Jt || (this.Jt = new z(this.transport)), this.Jt.send(t));
        }
        async stop(t) {
          return "Disconnected" === this.q
            ? (this.u.log(
                e.Debug,
                `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnected state.`
              ),
              Promise.resolve())
            : "Disconnecting" === this.q
            ? (this.u.log(
                e.Debug,
                `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnecting state.`
              ),
              this.tt)
            : ((this.q = "Disconnecting"),
              (this.tt = new Promise((t) => {
                this.jt = t;
              })),
              await this.et(t),
              void (await this.tt));
        }
        async et(t) {
          this.zt = t;
          try {
            await this.Xt;
          } catch (t) {}
          if (this.transport) {
            try {
              await this.transport.stop();
            } catch (t) {
              this.u.log(
                e.Error,
                `HttpConnection.transport.stop() threw error '${t}'.`
              ),
                this.Vt();
            }
            this.transport = void 0;
          } else
            this.u.log(
              e.Debug,
              "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed."
            );
        }
        async F(t) {
          let s = this.baseUrl;
          this.St = this.Pt.accessTokenFactory;
          try {
            if (this.Pt.skipNegotiation) {
              if (this.Pt.transport !== W.WebSockets)
                throw new Error(
                  "Negotiation can only be skipped when using the WebSocket transport directly."
                );
              (this.transport = this.Gt(W.WebSockets)), await this.Kt(s, t);
            } else {
              let e = null,
                n = 0;
              do {
                if (
                  ((e = await this.Qt(s)),
                  "Disconnecting" === this.q || "Disconnected" === this.q)
                )
                  throw new Error(
                    "The connection was stopped during negotiation."
                  );
                if (e.error) throw new Error(e.error);
                if (e.ProtocolVersion)
                  throw new Error(
                    "Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details."
                  );
                if ((e.url && (s = e.url), e.accessToken)) {
                  const t = e.accessToken;
                  this.St = () => t;
                }
                n++;
              } while (e.url && n < 100);
              if (100 === n && e.url)
                throw new Error("Negotiate redirection limit exceeded.");
              await this.Yt(s, this.Pt.transport, e, t);
            }
            this.transport instanceof F &&
              (this.features.inherentKeepAlive = !0),
              "Connecting" === this.q &&
                (this.u.log(
                  e.Debug,
                  "The HttpConnection connected successfully."
                ),
                (this.q = "Connected"));
          } catch (t) {
            return (
              this.u.log(e.Error, "Failed to start the connection: " + t),
              (this.q = "Disconnected"),
              (this.transport = void 0),
              this.jt(),
              Promise.reject(t)
            );
          }
        }
        async Qt(t) {
          const s = {};
          if (this.St) {
            const t = await this.St();
            t && (s[M.Authorization] = `Bearer ${t}`);
          }
          const [i, r] = $();
          s[i] = r;
          const o = this.Zt(t);
          this.u.log(e.Debug, `Sending negotiation request: ${o}.`);
          try {
            const t = await this.$.post(o, {
              content: "",
              headers: { ...s, ...this.Pt.headers },
              timeout: this.Pt.timeout,
              withCredentials: this.Pt.withCredentials,
            });
            if (200 !== t.statusCode)
              return Promise.reject(
                new Error(
                  `Unexpected status code returned from negotiate '${t.statusCode}'`
                )
              );
            const e = JSON.parse(t.content);
            return (
              (!e.negotiateVersion || e.negotiateVersion < 1) &&
                (e.connectionToken = e.connectionId),
              e
            );
          } catch (t) {
            let s = "Failed to complete negotiation with the server: " + t;
            return (
              t instanceof n &&
                404 === t.statusCode &&
                (s +=
                  " Either this is not a SignalR endpoint or there is a proxy blocking the connection."),
              this.u.log(e.Error, s),
              Promise.reject(new a(s))
            );
          }
        }
        te(t, e) {
          return e ? t + (-1 === t.indexOf("?") ? "?" : "&") + `id=${e}` : t;
        }
        async Yt(t, s, n, i) {
          let r = this.te(t, n.connectionToken);
          if (this.ee(s))
            return (
              this.u.log(
                e.Debug,
                "Connection was provided an instance of ITransport, using that directly."
              ),
              (this.transport = s),
              await this.Kt(r, i),
              void (this.connectionId = n.connectionId)
            );
          const o = [],
            h = n.availableTransports || [];
          let a = n;
          for (const n of h) {
            const h = this.se(n, s, i);
            if (h instanceof Error) o.push(`${n.transport} failed:`), o.push(h);
            else if (this.ee(h)) {
              if (((this.transport = h), !a)) {
                try {
                  a = await this.Qt(t);
                } catch (t) {
                  return Promise.reject(t);
                }
                r = this.te(t, a.connectionToken);
              }
              try {
                return (
                  await this.Kt(r, i), void (this.connectionId = a.connectionId)
                );
              } catch (t) {
                if (
                  (this.u.log(
                    e.Error,
                    `Failed to start the transport '${n.transport}': ${t}`
                  ),
                  (a = void 0),
                  o.push(new c(`${n.transport} failed: ${t}`, W[n.transport])),
                  "Connecting" !== this.q)
                ) {
                  const t =
                    "Failed to select transport before stop() was called.";
                  return this.u.log(e.Debug, t), Promise.reject(new Error(t));
                }
              }
            }
          }
          return o.length > 0
            ? Promise.reject(
                new l(
                  `Unable to connect to the server with any of the available transports. ${o.join(
                    " "
                  )}`,
                  o
                )
              )
            : Promise.reject(
                new Error(
                  "None of the transports supported by the client are supported by the server."
                )
              );
        }
        Gt(t) {
          switch (t) {
            case W.WebSockets:
              if (!this.Pt.WebSocket)
                throw new Error(
                  "'WebSocket' is not supported in your environment."
                );
              return new X(
                this.$,
                this.St,
                this.u,
                this.Pt.logMessageContent,
                this.Pt.WebSocket,
                this.Pt.headers || {}
              );
            case W.ServerSentEvents:
              if (!this.Pt.EventSource)
                throw new Error(
                  "'EventSource' is not supported in your environment."
                );
              return new B(this.$, this.St, this.u, this.Pt);
            case W.LongPolling:
              return new F(this.$, this.St, this.u, this.Pt);
            default:
              throw new Error(`Unknown transport: ${t}.`);
          }
        }
        Kt(t, e) {
          return (
            (this.transport.onreceive = this.onreceive),
            (this.transport.onclose = (t) => this.Vt(t)),
            this.transport.connect(t, e)
          );
        }
        se(t, s, n) {
          const i = W[t.transport];
          if (null == i)
            return (
              this.u.log(
                e.Debug,
                `Skipping transport '${t.transport}' because it is not supported by this client.`
              ),
              new Error(
                `Skipping transport '${t.transport}' because it is not supported by this client.`
              )
            );
          if (
            !(function (t, e) {
              return !t || 0 != (e & t);
            })(s, i)
          )
            return (
              this.u.log(
                e.Debug,
                `Skipping transport '${W[i]}' because it was disabled by the client.`
              ),
              new h(`'${W[i]}' is disabled by the client.`, i)
            );
          if (!(t.transferFormats.map((t) => O[t]).indexOf(n) >= 0))
            return (
              this.u.log(
                e.Debug,
                `Skipping transport '${W[i]}' because it does not support the requested transfer format '${O[n]}'.`
              ),
              new Error(`'${W[i]}' does not support ${O[n]}.`)
            );
          if (
            (i === W.WebSockets && !this.Pt.WebSocket) ||
            (i === W.ServerSentEvents && !this.Pt.EventSource)
          )
            return (
              this.u.log(
                e.Debug,
                `Skipping transport '${W[i]}' because it is not supported in your environment.'`
              ),
              new o(`'${W[i]}' is not supported in your environment.`, i)
            );
          this.u.log(e.Debug, `Selecting transport '${W[i]}'.`);
          try {
            return this.Gt(i);
          } catch (t) {
            return t;
          }
        }
        ee(t) {
          return t && "object" == typeof t && "connect" in t;
        }
        Vt(t) {
          if (
            (this.u.log(
              e.Debug,
              `HttpConnection.stopConnection(${t}) called while in state ${this.q}.`
            ),
            (this.transport = void 0),
            (t = this.zt || t),
            (this.zt = void 0),
            "Disconnected" !== this.q)
          ) {
            if ("Connecting" === this.q)
              throw (
                (this.u.log(
                  e.Warning,
                  `Call to HttpConnection.stopConnection(${t}) was ignored because the connection is still in the connecting state.`
                ),
                new Error(
                  `HttpConnection.stopConnection(${t}) was called while the connection is still in the connecting state.`
                ))
              );
            if (
              ("Disconnecting" === this.q && this.jt(),
              t
                ? this.u.log(
                    e.Error,
                    `Connection disconnected with error '${t}'.`
                  )
                : this.u.log(e.Information, "Connection disconnected."),
              this.Jt &&
                (this.Jt.stop().catch((t) => {
                  this.u.log(
                    e.Error,
                    `TransportSendQueue.stop() threw error '${t}'.`
                  );
                }),
                (this.Jt = void 0)),
              (this.connectionId = void 0),
              (this.q = "Disconnected"),
              this.M)
            ) {
              this.M = !1;
              try {
                this.onclose && this.onclose(t);
              } catch (s) {
                this.u.log(
                  e.Error,
                  `HttpConnection.onclose(${t}) threw error '${s}'.`
                );
              }
            }
          } else
            this.u.log(
              e.Debug,
              `Call to HttpConnection.stopConnection(${t}) was ignored because the connection is already in the disconnected state.`
            );
        }
        Bt(t) {
          if (
            0 === t.lastIndexOf("https://", 0) ||
            0 === t.lastIndexOf("http://", 0)
          )
            return t;
          if (!g.isBrowser || !window.document)
            throw new Error(`Cannot resolve '${t}'.`);
          const s = window.document.createElement("a");
          return (
            (s.href = t),
            this.u.log(e.Information, `Normalizing '${t}' to '${s.href}'.`),
            s.href
          );
        }
        Zt(t) {
          const e = t.indexOf("?");
          let s = t.substring(0, -1 === e ? t.length : e);
          return (
            "/" !== s[s.length - 1] && (s += "/"),
            (s += "negotiate"),
            (s += -1 === e ? "" : t.substring(e)),
            -1 === s.indexOf("negotiateVersion") &&
              ((s += -1 === e ? "?" : "&"),
              (s += "negotiateVersion=" + this.Ft)),
            s
          );
        }
      }
      class z {
        constructor(t) {
          (this.ne = t),
            (this.ie = []),
            (this.re = !0),
            (this.oe = new V()),
            (this.he = new V()),
            (this.ce = this.ae());
        }
        send(t) {
          return this.le(t), this.he || (this.he = new V()), this.he.promise;
        }
        stop() {
          return (this.re = !1), this.oe.resolve(), this.ce;
        }
        le(t) {
          if (this.ie.length && typeof this.ie[0] != typeof t)
            throw new Error(
              `Expected data to be of type ${typeof this
                .ie} but was of type ${typeof t}`
            );
          this.ie.push(t), this.oe.resolve();
        }
        async ae() {
          for (;;) {
            if ((await this.oe.promise, !this.re)) {
              this.he && this.he.reject("Connection stopped.");
              break;
            }
            this.oe = new V();
            const t = this.he;
            this.he = void 0;
            const e =
              "string" == typeof this.ie[0] ? this.ie.join("") : z.ue(this.ie);
            this.ie.length = 0;
            try {
              await this.ne.send(e), t.resolve();
            } catch (e) {
              t.reject(e);
            }
          }
        }
        static ue(t) {
          const e = t.map((t) => t.byteLength).reduce((t, e) => t + e),
            s = new Uint8Array(e);
          let n = 0;
          for (const e of t) s.set(new Uint8Array(e), n), (n += e.byteLength);
          return s.buffer;
        }
      }
      class V {
        constructor() {
          this.promise = new Promise((t, e) => ([this.de, this.fe] = [t, e]));
        }
        resolve() {
          this.de();
        }
        reject(t) {
          this.fe(t);
        }
      }
      class G {
        constructor() {
          (this.name = "json"),
            (this.version = 1),
            (this.transferFormat = O.Text);
        }
        parseMessages(t, s) {
          if ("string" != typeof t)
            throw new Error(
              "Invalid input for JSON hub protocol. Expected a string."
            );
          if (!t) return [];
          null === s && (s = f.instance);
          const n = D.parse(t),
            i = [];
          for (const t of n) {
            const n = JSON.parse(t);
            if ("number" != typeof n.type) throw new Error("Invalid payload.");
            switch (n.type) {
              case A.Invocation:
                this.pe(n);
                break;
              case A.StreamItem:
                this.we(n);
                break;
              case A.Completion:
                this.ge(n);
                break;
              case A.Ping:
              case A.Close:
                break;
              default:
                s.log(
                  e.Information,
                  "Unknown message type '" + n.type + "' ignored."
                );
                continue;
            }
            i.push(n);
          }
          return i;
        }
        writeMessage(t) {
          return D.write(JSON.stringify(t));
        }
        pe(t) {
          this.me(t.target, "Invalid payload for Invocation message."),
            void 0 !== t.invocationId &&
              this.me(
                t.invocationId,
                "Invalid payload for Invocation message."
              );
        }
        we(t) {
          if (
            (this.me(t.invocationId, "Invalid payload for StreamItem message."),
            void 0 === t.item)
          )
            throw new Error("Invalid payload for StreamItem message.");
        }
        ge(t) {
          if (t.result && t.error)
            throw new Error("Invalid payload for Completion message.");
          !t.result &&
            t.error &&
            this.me(t.error, "Invalid payload for Completion message."),
            this.me(t.invocationId, "Invalid payload for Completion message.");
        }
        me(t, e) {
          if ("string" != typeof t || "" === t) throw new Error(e);
        }
      }
      const K = {
        trace: e.Trace,
        debug: e.Debug,
        info: e.Information,
        information: e.Information,
        warn: e.Warning,
        warning: e.Warning,
        error: e.Error,
        critical: e.Critical,
        none: e.None,
      };
      class Q {
        configureLogging(t) {
          if ((w.isRequired(t, "logging"), void 0 !== t.log)) this.logger = t;
          else if ("string" == typeof t) {
            const e = (function (t) {
              const e = K[t.toLowerCase()];
              if (void 0 !== e) return e;
              throw new Error(`Unknown log level: ${t}`);
            })(t);
            this.logger = new E(e);
          } else this.logger = new E(t);
          return this;
        }
        withUrl(t, e) {
          return (
            w.isRequired(t, "url"),
            w.isNotEmpty(t, "url"),
            (this.url = t),
            (this.httpConnectionOptions =
              "object" == typeof e
                ? { ...this.httpConnectionOptions, ...e }
                : { ...this.httpConnectionOptions, transport: e }),
            this
          );
        }
        withHubProtocol(t) {
          return w.isRequired(t, "protocol"), (this.protocol = t), this;
        }
        withAutomaticReconnect(t) {
          if (this.reconnectPolicy)
            throw new Error("A reconnectPolicy has already been set.");
          return (
            t
              ? Array.isArray(t)
                ? (this.reconnectPolicy = new q(t))
                : (this.reconnectPolicy = t)
              : (this.reconnectPolicy = new q()),
            this
          );
        }
        build() {
          const t = this.httpConnectionOptions || {};
          if ((void 0 === t.logger && (t.logger = this.logger), !this.url))
            throw new Error(
              "The 'HubConnectionBuilder.withUrl' method must be called before building the connection."
            );
          const e = new J(this.url, t);
          return L.create(
            e,
            this.logger || f.instance,
            this.protocol || new G(),
            this.reconnectPolicy
          );
        }
      }
      return (
        Uint8Array.prototype.indexOf ||
          Object.defineProperty(Uint8Array.prototype, "indexOf", {
            value: Array.prototype.indexOf,
            writable: !0,
          }),
        Uint8Array.prototype.slice ||
          Object.defineProperty(Uint8Array.prototype, "slice", {
            value: function (t, e) {
              return new Uint8Array(Array.prototype.slice.call(this, t, e));
            },
            writable: !0,
          }),
        Uint8Array.prototype.forEach ||
          Object.defineProperty(Uint8Array.prototype, "forEach", {
            value: Array.prototype.forEach,
            writable: !0,
          }),
        s
      );
    })();
  }),
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.signalR = e())
    : (t.signalR = e());
//# sourceMappingURL=signalr.js.map
