var t, e;
(t = self),
  (e = () =>
    (() => {
      var t = {
        d: (e, s) => {
          for (var i in s)
            t.o(s, i) &&
              !t.o(e, i) &&
              Object.defineProperty(e, i, { enumerable: !0, get: s[i] });
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
          HttpError: () => i,
          HttpResponse: () => u,
          HttpTransportType: () => W,
          HubConnection: () => N,
          HubConnectionBuilder: () => Y,
          HubConnectionState: () => A,
          JsonHubProtocol: () => K,
          LogLevel: () => e,
          MessageType: () => R,
          NullLogger: () => p,
          Subject: () => U,
          TimeoutError: () => n,
          TransferFormat: () => O,
          VERSION: () => f,
        });
      class i extends Error {
        constructor(t, e) {
          const s = new.target.prototype;
          super(`${t}: Status code '${e}'`),
            (this.statusCode = e),
            (this.__proto__ = s);
        }
      }
      class n extends Error {
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
      class p {
        constructor() {}
        log(t, e) {}
      }
      p.instance = new p();
      const f = "7.0.7";
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
          return (
            "object" == typeof window && "object" == typeof window.document
          );
        }
        static get isWebWorker() {
          return "object" == typeof self && "importScripts" in self;
        }
        static get isReactNative() {
          return "object" == typeof window && void 0 === window.document;
        }
        static get isNode() {
          return !this.isBrowser && !this.isWebWorker && !this.isReactNative;
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
      async function b(t, s, i, n, r, o) {
        const h = {},
          [c, a] = E();
        (h[c] = a),
          t.log(
            e.Trace,
            `(${s} transport) sending data. ${m(r, o.logMessageContent)}.`
          );
        const l = y(r) ? "arraybuffer" : "text",
          u = await i.post(n, {
            content: r,
            headers: { ...h, ...o.headers },
            responseType: l,
            timeout: o.timeout,
            withCredentials: o.withCredentials,
          });
        t.log(
          e.Trace,
          `(${s} transport) request complete. Response status: ${u.statusCode}.`
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
      class $ {
        constructor(t) {
          (this.l = t), (this.out = console);
        }
        log(t, s) {
          if (t >= this.l) {
            const i = `[${new Date().toISOString()}] ${e[t]}: ${s}`;
            switch (t) {
              case e.Critical:
              case e.Error:
                this.out.error(i);
                break;
              case e.Warning:
                this.out.warn(i);
                break;
              case e.Information:
                this.out.info(i);
                break;
              default:
                this.out.log(i);
            }
          }
        }
      }
      function E() {
        let t = "X-SignalR-User-Agent";
        return (
          g.isNode && (t = "User-Agent"),
          [t, C(f, S(), g.isNode ? "NodeJS" : "Browser", k())]
        );
      }
      function C(t, e, s, i) {
        let n = "Microsoft SignalR/";
        const r = t.split(".");
        return (
          (n += `${r[0]}.${r[1]}`),
          (n += ` (${t}; `),
          (n += e && "" !== e ? `${e}; ` : "Unknown OS; "),
          (n += `${s}`),
          (n += i ? `; ${i}` : "; Unknown Runtime Version"),
          (n += ")"),
          n
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
            const i = t.timeout;
            c = setTimeout(() => {
              s.abort(),
                this.u.log(e.Warning, "Timeout from HTTP request."),
                (o = new n());
            }, i);
          }
          "" === t.content && (t.content = void 0),
            t.content &&
              ((t.headers = t.headers || {}),
              y(t.content)
                ? (t.headers["Content-Type"] = "application/octet-stream")
                : (t.headers["Content-Type"] = "text/plain;charset=UTF-8"));
          try {
            h = await this.m(t.url, {
              body: t.content,
              cache: "no-cache",
              credentials: !0 === t.withCredentials ? "include" : "same-origin",
              headers: { "X-Requested-With": "XMLHttpRequest", ...t.headers },
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
            throw new i(t || h.statusText, h.status);
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
          default:
            s = t.text();
            break;
          case "blob":
          case "document":
          case "json":
            throw new Error(`${e} is not supported.`);
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
                    "" === t.content && (t.content = void 0),
                    t.content &&
                      (y(t.content)
                        ? h.setRequestHeader(
                            "Content-Type",
                            "application/octet-stream"
                          )
                        : h.setRequestHeader(
                            "Content-Type",
                            "text/plain;charset=UTF-8"
                          ));
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
                              new i(
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
                        o(new i(h.statusText, h.status));
                    }),
                    (h.ontimeout = () => {
                      this.u.log(e.Warning, "Timeout from HTTP request."),
                        o(new n());
                    }),
                    h.send(t.content);
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
            const i = new Uint8Array(t),
              n = i.indexOf(D.RecordSeparatorCode);
            if (-1 === n) throw new Error("Message is incomplete.");
            const r = n + 1;
            (e = String.fromCharCode.apply(
              null,
              Array.prototype.slice.call(i.slice(0, r))
            )),
              (s = i.byteLength > r ? i.slice(r).buffer : null);
          } else {
            const i = t,
              n = i.indexOf(D.RecordSeparator);
            if (-1 === n) throw new Error("Message is incomplete.");
            const r = n + 1;
            (e = i.substring(0, r)), (s = i.length > r ? i.substring(r) : null);
          }
          const i = D.parse(e),
            n = JSON.parse(i[0]);
          if (n.type)
            throw new Error("Expected a handshake response from the server.");
          return [s, n];
        }
      }
      var R, A;
      !(function (t) {
        (t[(t.Invocation = 1)] = "Invocation"),
          (t[(t.StreamItem = 2)] = "StreamItem"),
          (t[(t.Completion = 3)] = "Completion"),
          (t[(t.StreamInvocation = 4)] = "StreamInvocation"),
          (t[(t.CancelInvocation = 5)] = "CancelInvocation"),
          (t[(t.Ping = 6)] = "Ping"),
          (t[(t.Close = 7)] = "Close");
      })(R || (R = {}));
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
      })(A || (A = {}));
      class N {
        constructor(t, s, i, n) {
          (this.C = 0),
            (this.S = () => {
              this.u.log(
                e.Warning,
                "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://docs.microsoft.com/aspnet/core/signalr/javascript-client#bsleep"
              );
            }),
            w.isRequired(t, "connection"),
            w.isRequired(s, "logger"),
            w.isRequired(i, "protocol"),
            (this.serverTimeoutInMilliseconds = 3e4),
            (this.keepAliveIntervalInMilliseconds = 15e3),
            (this.u = s),
            (this.k = i),
            (this.connection = t),
            (this.P = n),
            (this.T = new x()),
            (this.connection.onreceive = (t) => this.I(t)),
            (this.connection.onclose = (t) => this._(t)),
            (this.H = {}),
            (this.D = {}),
            (this.R = []),
            (this.A = []),
            (this.U = []),
            (this.N = 0),
            (this.L = !1),
            (this.M = A.Disconnected),
            (this.j = !1),
            (this.q = this.k.writeMessage({ type: R.Ping }));
        }
        static create(t, e, s, i) {
          return new N(t, e, s, i);
        }
        get state() {
          return this.M;
        }
        get connectionId() {
          return (this.connection && this.connection.connectionId) || null;
        }
        get baseUrl() {
          return this.connection.baseUrl || "";
        }
        set baseUrl(t) {
          if (this.M !== A.Disconnected && this.M !== A.Reconnecting)
            throw new Error(
              "The HubConnection must be in the Disconnected or Reconnecting state to change the url."
            );
          if (!t) throw new Error("The HubConnection url must be a valid url.");
          this.connection.baseUrl = t;
        }
        start() {
          return (this.W = this.O()), this.W;
        }
        async O() {
          if (this.M !== A.Disconnected)
            return Promise.reject(
              new Error(
                "Cannot start a HubConnection that is not in the 'Disconnected' state."
              )
            );
          (this.M = A.Connecting),
            this.u.log(e.Debug, "Starting HubConnection.");
          try {
            await this.F(),
              g.isBrowser && window.document.addEventListener("freeze", this.S),
              (this.M = A.Connected),
              (this.j = !0),
              this.u.log(e.Debug, "HubConnection connected successfully.");
          } catch (t) {
            return (
              (this.M = A.Disconnected),
              this.u.log(
                e.Debug,
                `HubConnection failed to start successfully because of error '${t}'.`
              ),
              Promise.reject(t)
            );
          }
        }
        async F() {
          (this.B = void 0), (this.L = !1);
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
            this.connection.features.inherentKeepAlive ||
              (await this.V(this.q));
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
          const t = this.W;
          (this.tt = this.et()), await this.tt;
          try {
            await t;
          } catch (t) {}
        }
        et(t) {
          return this.M === A.Disconnected
            ? (this.u.log(
                e.Debug,
                `Call to HubConnection.stop(${t}) ignored because it is already in the disconnected state.`
              ),
              Promise.resolve())
            : this.M === A.Disconnecting
            ? (this.u.log(
                e.Debug,
                `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnecting state.`
              ),
              this.tt)
            : ((this.M = A.Disconnecting),
              this.u.log(e.Debug, "Stopping HubConnection."),
              this.st
                ? (this.u.log(
                    e.Debug,
                    "Connection stopped during reconnect delay. Done reconnecting."
                  ),
                  clearTimeout(this.st),
                  (this.st = void 0),
                  this.it(),
                  Promise.resolve())
                : (this.G(),
                  this.Z(),
                  (this.B =
                    t ||
                    new r(
                      "The connection was stopped before the hub handshake could complete."
                    )),
                  this.connection.stop(t)));
        }
        stream(t, ...e) {
          const [s, i] = this.nt(e),
            n = this.rt(t, e, i);
          let r;
          const o = new U();
          return (
            (o.cancelCallback = () => {
              const t = this.ot(n.invocationId);
              return delete this.H[n.invocationId], r.then(() => this.ht(t));
            }),
            (this.H[n.invocationId] = (t, e) => {
              e
                ? o.error(e)
                : t &&
                  (t.type === R.Completion
                    ? t.error
                      ? o.error(new Error(t.error))
                      : o.complete()
                    : o.next(t.item));
            }),
            (r = this.ht(n).catch((t) => {
              o.error(t), delete this.H[n.invocationId];
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
          const [s, i] = this.nt(e),
            n = this.ht(this.lt(t, e, !0, i));
          return this.ct(s, n), n;
        }
        invoke(t, ...e) {
          const [s, i] = this.nt(e),
            n = this.lt(t, e, !1, i);
          return new Promise((t, e) => {
            this.H[n.invocationId] = (s, i) => {
              i
                ? e(i)
                : s &&
                  (s.type === R.Completion
                    ? s.error
                      ? e(new Error(s.error))
                      : t(s.result)
                    : e(new Error(`Unexpected message type: ${s.type}`)));
            };
            const i = this.ht(n).catch((t) => {
              e(t), delete this.H[n.invocationId];
            });
            this.ct(s, i);
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
              const i = s.indexOf(e);
              -1 !== i && (s.splice(i, 1), 0 === s.length && delete this.D[t]);
            } else delete this.D[t];
        }
        onclose(t) {
          t && this.R.push(t);
        }
        onreconnecting(t) {
          t && this.A.push(t);
        }
        onreconnected(t) {
          t && this.U.push(t);
        }
        I(t) {
          if ((this.G(), this.L || ((t = this.ut(t)), (this.L = !0)), t)) {
            const s = this.k.parseMessages(t, this.u);
            for (const t of s)
              switch (t.type) {
                case R.Invocation:
                  this.dt(t);
                  break;
                case R.StreamItem:
                case R.Completion: {
                  const s = this.H[t.invocationId];
                  if (s) {
                    t.type === R.Completion && delete this.H[t.invocationId];
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
                case R.Ping:
                  break;
                case R.Close: {
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
        ut(t) {
          let s, i;
          try {
            [i, s] = this.T.parseHandshakeResponse(t);
          } catch (t) {
            const s = "Error parsing handshake response: " + t;
            this.u.log(e.Error, s);
            const i = new Error(s);
            throw (this.J(i), i);
          }
          if (s.error) {
            const t = "Server returned handshake error: " + s.error;
            this.u.log(e.Error, t);
            const i = new Error(t);
            throw (this.J(i), i);
          }
          return this.u.log(e.Debug, "Server handshake complete."), this.X(), i;
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
              ((this.ft = setTimeout(
                () => this.serverTimeout(),
                this.serverTimeoutInMilliseconds
              )),
              void 0 !== this.wt)
            )
          ) {
            let t = this.C - new Date().getTime();
            t < 0 && (t = 0),
              (this.wt = setTimeout(async () => {
                if (this.M === A.Connected)
                  try {
                    await this.V(this.q);
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
        async dt(t) {
          const s = t.target.toLowerCase(),
            i = this.D[s];
          if (!i)
            return (
              this.u.log(
                e.Warning,
                `No client method with the name '${s}' found.`
              ),
              void (
                t.invocationId &&
                (this.u.log(
                  e.Warning,
                  `No result given for '${s}' method and invocation ID '${t.invocationId}'.`
                ),
                await this.ht(
                  this.gt(
                    t.invocationId,
                    "Client didn't provide a result.",
                    null
                  )
                ))
              )
            );
          const n = i.slice(),
            r = !!t.invocationId;
          let o, h, c;
          for (const i of n)
            try {
              const n = o;
              (o = await i.apply(this, t.arguments)),
                r &&
                  o &&
                  n &&
                  (this.u.log(
                    e.Error,
                    `Multiple results provided for '${s}'. Sending error to server.`
                  ),
                  (c = this.gt(
                    t.invocationId,
                    "Client provided multiple results.",
                    null
                  ))),
                (h = void 0);
            } catch (t) {
              (h = t),
                this.u.log(
                  e.Error,
                  `A callback for the method '${s}' threw error '${t}'.`
                );
            }
          c
            ? await this.ht(c)
            : r
            ? (h
                ? (c = this.gt(t.invocationId, `${h}`, null))
                : void 0 !== o
                ? (c = this.gt(t.invocationId, null, o))
                : (this.u.log(
                    e.Warning,
                    `No result given for '${s}' method and invocation ID '${t.invocationId}'.`
                  ),
                  (c = this.gt(
                    t.invocationId,
                    "Client didn't provide a result.",
                    null
                  ))),
              await this.ht(c))
            : o &&
              this.u.log(
                e.Error,
                `Result given for '${s}' method but server is not expecting a result.`
              );
        }
        _(t) {
          this.u.log(
            e.Debug,
            `HubConnection.connectionClosed(${t}) called while in state ${this.M}.`
          ),
            (this.B =
              this.B ||
              t ||
              new r(
                "The underlying connection was closed before the hub handshake could complete."
              )),
            this.X && this.X(),
            this.yt(
              t ||
                new Error(
                  "Invocation canceled due to the underlying connection being closed."
                )
            ),
            this.G(),
            this.Z(),
            this.M === A.Disconnecting
              ? this.it(t)
              : this.M === A.Connected && this.P
              ? this.bt(t)
              : this.M === A.Connected && this.it(t);
        }
        it(t) {
          if (this.j) {
            (this.M = A.Disconnected),
              (this.j = !1),
              g.isBrowser &&
                window.document.removeEventListener("freeze", this.S);
            try {
              this.R.forEach((e) => e.apply(this, [t]));
            } catch (s) {
              this.u.log(
                e.Error,
                `An onclose callback called with error '${t}' threw error '${s}'.`
              );
            }
          }
        }
        async bt(t) {
          const s = Date.now();
          let i = 0,
            n =
              void 0 !== t
                ? t
                : new Error("Attempting to reconnect due to a unknown error."),
            r = this.vt(i++, 0, n);
          if (null === r)
            return (
              this.u.log(
                e.Debug,
                "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."
              ),
              void this.it(t)
            );
          if (
            ((this.M = A.Reconnecting),
            t
              ? this.u.log(
                  e.Information,
                  `Connection reconnecting because of error '${t}'.`
                )
              : this.u.log(e.Information, "Connection reconnecting."),
            0 !== this.A.length)
          ) {
            try {
              this.A.forEach((e) => e.apply(this, [t]));
            } catch (s) {
              this.u.log(
                e.Error,
                `An onreconnecting callback called with error '${t}' threw error '${s}'.`
              );
            }
            if (this.M !== A.Reconnecting)
              return void this.u.log(
                e.Debug,
                "Connection left the reconnecting state in onreconnecting callback. Done reconnecting."
              );
          }
          for (; null !== r; ) {
            if (
              (this.u.log(
                e.Information,
                `Reconnect attempt number ${i} will start in ${r} ms.`
              ),
              await new Promise((t) => {
                this.st = setTimeout(t, r);
              }),
              (this.st = void 0),
              this.M !== A.Reconnecting)
            )
              return void this.u.log(
                e.Debug,
                "Connection left the reconnecting state during reconnect delay. Done reconnecting."
              );
            try {
              if (
                (await this.F(),
                (this.M = A.Connected),
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
                this.M !== A.Reconnecting)
              )
                return (
                  this.u.log(
                    e.Debug,
                    `Connection moved to the '${this.M}' from the reconnecting state during reconnect attempt. Done reconnecting.`
                  ),
                  void (this.M === A.Disconnecting && this.it())
                );
              (n = t instanceof Error ? t : new Error(t.toString())),
                (r = this.vt(i++, Date.now() - s, n));
            }
          }
          this.u.log(
            e.Information,
            `Reconnect retries have been exhausted after ${
              Date.now() - s
            } ms and ${i} failed attempts. Connection disconnecting.`
          ),
            this.it();
        }
        vt(t, s, i) {
          try {
            return this.P.nextRetryDelayInMilliseconds({
              elapsedMilliseconds: s,
              previousRetryCount: t,
              retryReason: i,
            });
          } catch (i) {
            return (
              this.u.log(
                e.Error,
                `IRetryPolicy.nextRetryDelayInMilliseconds(${t}, ${s}) threw error '${i}'.`
              ),
              null
            );
          }
        }
        yt(t) {
          const s = this.H;
          (this.H = {}),
            Object.keys(s).forEach((i) => {
              const n = s[i];
              try {
                n(null, t);
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
          this.wt && (clearTimeout(this.wt), (this.wt = void 0));
        }
        G() {
          this.ft && clearTimeout(this.ft);
        }
        lt(t, e, s, i) {
          if (s)
            return 0 !== i.length
              ? { arguments: e, streamIds: i, target: t, type: R.Invocation }
              : { arguments: e, target: t, type: R.Invocation };
          {
            const s = this.N;
            return (
              this.N++,
              0 !== i.length
                ? {
                    arguments: e,
                    invocationId: s.toString(),
                    streamIds: i,
                    target: t,
                    type: R.Invocation,
                  }
                : {
                    arguments: e,
                    invocationId: s.toString(),
                    target: t,
                    type: R.Invocation,
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
                  e = e.then(() => this.ht(this.gt(s)));
                },
                error: (t) => {
                  let i;
                  (i =
                    t instanceof Error
                      ? t.message
                      : t && t.toString
                      ? t.toString()
                      : "Unknown error"),
                    (e = e.then(() => this.ht(this.gt(s, i))));
                },
                next: (t) => {
                  e = e.then(() => this.ht(this.$t(s, t)));
                },
              });
          }
        }
        nt(t) {
          const e = [],
            s = [];
          for (let i = 0; i < t.length; i++) {
            const n = t[i];
            if (this.Et(n)) {
              const r = this.N;
              this.N++, (e[r] = n), s.push(r.toString()), t.splice(i, 1);
            }
          }
          return [e, s];
        }
        Et(t) {
          return t && t.subscribe && "function" == typeof t.subscribe;
        }
        rt(t, e, s) {
          const i = this.N;
          return (
            this.N++,
            0 !== s.length
              ? {
                  arguments: e,
                  invocationId: i.toString(),
                  streamIds: s,
                  target: t,
                  type: R.StreamInvocation,
                }
              : {
                  arguments: e,
                  invocationId: i.toString(),
                  target: t,
                  type: R.StreamInvocation,
                }
          );
        }
        ot(t) {
          return { invocationId: t, type: R.CancelInvocation };
        }
        $t(t, e) {
          return { invocationId: t, item: e, type: R.StreamItem };
        }
        gt(t, e, s) {
          return e
            ? { error: e, invocationId: t, type: R.Completion }
            : { invocationId: t, result: s, type: R.Completion };
        }
      }
      const L = [0, 2e3, 1e4, 3e4, null];
      class M {
        constructor(t) {
          this.Ct = void 0 !== t ? [...t, null] : L;
        }
        nextRetryDelayInMilliseconds(t) {
          return this.Ct[t.previousRetryCount];
        }
      }
      class j {}
      (j.Authorization = "Authorization"), (j.Cookie = "Cookie");
      class q extends d {
        constructor(t, e) {
          super(), (this.St = t), (this.kt = e);
        }
        async send(t) {
          let e = !0;
          this.kt &&
            (!this.Pt || (t.url && t.url.indexOf("/negotiate?") > 0)) &&
            ((e = !1), (this.Pt = await this.kt())),
            this.Tt(t);
          const s = await this.St.send(t);
          return e && 401 === s.statusCode && this.kt
            ? ((this.Pt = await this.kt()), this.Tt(t), await this.St.send(t))
            : s;
        }
        Tt(t) {
          t.headers || (t.headers = {}),
            this.Pt
              ? (t.headers[j.Authorization] = `Bearer ${this.Pt}`)
              : this.kt &&
                t.headers[j.Authorization] &&
                delete t.headers[j.Authorization];
        }
        getCookieString(t) {
          return this.St.getCookieString(t);
        }
      }
      var W, O;
      !(function (t) {
        (t[(t.None = 0)] = "None"),
          (t[(t.WebSockets = 1)] = "WebSockets"),
          (t[(t.ServerSentEvents = 2)] = "ServerSentEvents"),
          (t[(t.LongPolling = 4)] = "LongPolling");
      })(W || (W = {})),
        (function (t) {
          (t[(t.Text = 1)] = "Text"), (t[(t.Binary = 2)] = "Binary");
        })(O || (O = {}));
      class F {
        constructor() {
          (this.It = !1), (this.onabort = null);
        }
        abort() {
          this.It || ((this.It = !0), this.onabort && this.onabort());
        }
        get signal() {
          return this;
        }
        get aborted() {
          return this.It;
        }
      }
      class B {
        constructor(t, e, s) {
          (this.$ = t),
            (this.u = e),
            (this._t = new F()),
            (this.Ht = s),
            (this.Dt = !1),
            (this.onreceive = null),
            (this.onclose = null);
        }
        get pollAborted() {
          return this._t.aborted;
        }
        async connect(t, s) {
          if (
            (w.isRequired(t, "url"),
            w.isRequired(s, "transferFormat"),
            w.isIn(s, O, "transferFormat"),
            (this.xt = t),
            this.u.log(e.Trace, "(LongPolling transport) Connecting."),
            s === O.Binary &&
              "undefined" != typeof XMLHttpRequest &&
              "string" != typeof new XMLHttpRequest().responseType)
          )
            throw new Error(
              "Binary protocols over XmlHttpRequest not implementing advanced features are not supported."
            );
          const [n, r] = E(),
            o = { [n]: r, ...this.Ht.headers },
            h = {
              abortSignal: this._t.signal,
              headers: o,
              timeout: 1e5,
              withCredentials: this.Ht.withCredentials,
            };
          s === O.Binary && (h.responseType = "arraybuffer");
          const c = `${t}&_=${Date.now()}`;
          this.u.log(e.Trace, `(LongPolling transport) polling: ${c}.`);
          const a = await this.$.get(c, h);
          200 !== a.statusCode
            ? (this.u.log(
                e.Error,
                `(LongPolling transport) Unexpected response code: ${a.statusCode}.`
              ),
              (this.Rt = new i(a.statusText || "", a.statusCode)),
              (this.Dt = !1))
            : (this.Dt = !0),
            (this.At = this.Ut(this.xt, h));
        }
        async Ut(t, s) {
          try {
            for (; this.Dt; )
              try {
                const n = `${t}&_=${Date.now()}`;
                this.u.log(e.Trace, `(LongPolling transport) polling: ${n}.`);
                const r = await this.$.get(n, s);
                204 === r.statusCode
                  ? (this.u.log(
                      e.Information,
                      "(LongPolling transport) Poll terminated by server."
                    ),
                    (this.Dt = !1))
                  : 200 !== r.statusCode
                  ? (this.u.log(
                      e.Error,
                      `(LongPolling transport) Unexpected response code: ${r.statusCode}.`
                    ),
                    (this.Rt = new i(r.statusText || "", r.statusCode)),
                    (this.Dt = !1))
                  : r.content
                  ? (this.u.log(
                      e.Trace,
                      `(LongPolling transport) data received. ${m(
                        r.content,
                        this.Ht.logMessageContent
                      )}.`
                    ),
                    this.onreceive && this.onreceive(r.content))
                  : this.u.log(
                      e.Trace,
                      "(LongPolling transport) Poll timed out, reissuing."
                    );
              } catch (t) {
                this.Dt
                  ? t instanceof n
                    ? this.u.log(
                        e.Trace,
                        "(LongPolling transport) Poll timed out, reissuing."
                      )
                    : ((this.Rt = t), (this.Dt = !1))
                  : this.u.log(
                      e.Trace,
                      `(LongPolling transport) Poll errored after shutdown: ${t.message}`
                    );
              }
          } finally {
            this.u.log(e.Trace, "(LongPolling transport) Polling complete."),
              this.pollAborted || this.Nt();
          }
        }
        async send(t) {
          return this.Dt
            ? b(this.u, "LongPolling", this.$, this.xt, t, this.Ht)
            : Promise.reject(
                new Error("Cannot send until the transport is connected")
              );
        }
        async stop() {
          this.u.log(e.Trace, "(LongPolling transport) Stopping polling."),
            (this.Dt = !1),
            this._t.abort();
          try {
            await this.At,
              this.u.log(
                e.Trace,
                `(LongPolling transport) sending DELETE request to ${this.xt}.`
              );
            const t = {},
              [s, i] = E();
            t[s] = i;
            const n = {
              headers: { ...t, ...this.Ht.headers },
              timeout: this.Ht.timeout,
              withCredentials: this.Ht.withCredentials,
            };
            await this.$.delete(this.xt, n),
              this.u.log(
                e.Trace,
                "(LongPolling transport) DELETE request sent."
              );
          } finally {
            this.u.log(e.Trace, "(LongPolling transport) Stop finished."),
              this.Nt();
          }
        }
        Nt() {
          if (this.onclose) {
            let t = "(LongPolling transport) Firing onclose event.";
            this.Rt && (t += " Error: " + this.Rt),
              this.u.log(e.Trace, t),
              this.onclose(this.Rt);
          }
        }
      }
      class X {
        constructor(t, e, s, i) {
          (this.$ = t),
            (this.Pt = e),
            (this.u = s),
            (this.Ht = i),
            (this.onreceive = null),
            (this.onclose = null);
        }
        async connect(t, s) {
          return (
            w.isRequired(t, "url"),
            w.isRequired(s, "transferFormat"),
            w.isIn(s, O, "transferFormat"),
            this.u.log(e.Trace, "(SSE transport) Connecting."),
            (this.xt = t),
            this.Pt &&
              (t +=
                (t.indexOf("?") < 0 ? "?" : "&") +
                `access_token=${encodeURIComponent(this.Pt)}`),
            new Promise((i, n) => {
              let r,
                o = !1;
              if (s === O.Text) {
                if (g.isBrowser || g.isWebWorker)
                  r = new this.Ht.EventSource(t, {
                    withCredentials: this.Ht.withCredentials,
                  });
                else {
                  const e = this.$.getCookieString(t),
                    s = {};
                  s.Cookie = e;
                  const [i, n] = E();
                  (s[i] = n),
                    (r = new this.Ht.EventSource(t, {
                      withCredentials: this.Ht.withCredentials,
                      headers: { ...s, ...this.Ht.headers },
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
                            this.Ht.logMessageContent
                          )}.`
                        ),
                          this.onreceive(t.data);
                      } catch (t) {
                        return void this.Lt(t);
                      }
                  }),
                    (r.onerror = (t) => {
                      o
                        ? this.Lt()
                        : n(
                            new Error(
                              "EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."
                            )
                          );
                    }),
                    (r.onopen = () => {
                      this.u.log(e.Information, `SSE connected to ${this.xt}`),
                        (this.Mt = r),
                        (o = !0),
                        i();
                    });
                } catch (t) {
                  return void n(t);
                }
              } else
                n(
                  new Error(
                    "The Server-Sent Events transport only supports the 'Text' transfer format"
                  )
                );
            })
          );
        }
        async send(t) {
          return this.Mt
            ? b(this.u, "SSE", this.$, this.xt, t, this.Ht)
            : Promise.reject(
                new Error("Cannot send until the transport is connected")
              );
        }
        stop() {
          return this.Lt(), Promise.resolve();
        }
        Lt(t) {
          this.Mt &&
            (this.Mt.close(),
            (this.Mt = void 0),
            this.onclose && this.onclose(t));
        }
      }
      class J {
        constructor(t, e, s, i, n, r) {
          (this.u = s),
            (this.kt = e),
            (this.jt = i),
            (this.qt = n),
            (this.$ = t),
            (this.onreceive = null),
            (this.onclose = null),
            (this.Wt = r);
        }
        async connect(t, s) {
          let i;
          return (
            w.isRequired(t, "url"),
            w.isRequired(s, "transferFormat"),
            w.isIn(s, O, "transferFormat"),
            this.u.log(e.Trace, "(WebSockets transport) Connecting."),
            this.kt && (i = await this.kt()),
            new Promise((n, r) => {
              let o;
              t = t.replace(/^http/, "ws");
              const h = this.$.getCookieString(t);
              let c = !1;
              if (g.isNode || g.isReactNative) {
                const e = {},
                  [s, n] = E();
                (e[s] = n),
                  i && (e[j.Authorization] = `Bearer ${i}`),
                  h && (e[j.Cookie] = h),
                  (o = new this.qt(t, void 0, {
                    headers: { ...e, ...this.Wt },
                  }));
              } else
                i &&
                  (t +=
                    (t.indexOf("?") < 0 ? "?" : "&") +
                    `access_token=${encodeURIComponent(i)}`);
              o || (o = new this.qt(t)),
                s === O.Binary && (o.binaryType = "arraybuffer"),
                (o.onopen = (s) => {
                  this.u.log(e.Information, `WebSocket connected to ${t}.`),
                    (this.Ot = o),
                    (c = !0),
                    n();
                }),
                (o.onerror = (t) => {
                  let s = null;
                  (s =
                    "undefined" != typeof ErrorEvent && t instanceof ErrorEvent
                      ? t.error
                      : "There was an error with the transport"),
                    this.u.log(e.Information, `(WebSockets transport) ${s}.`);
                }),
                (o.onmessage = (t) => {
                  if (
                    (this.u.log(
                      e.Trace,
                      `(WebSockets transport) data received. ${m(
                        t.data,
                        this.jt
                      )}.`
                    ),
                    this.onreceive)
                  )
                    try {
                      this.onreceive(t.data);
                    } catch (t) {
                      return void this.Lt(t);
                    }
                }),
                (o.onclose = (t) => {
                  if (c) this.Lt(t);
                  else {
                    let e = null;
                    (e =
                      "undefined" != typeof ErrorEvent &&
                      t instanceof ErrorEvent
                        ? t.error
                        : "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled."),
                      r(new Error(e));
                  }
                });
            })
          );
        }
        send(t) {
          return this.Ot && this.Ot.readyState === this.qt.OPEN
            ? (this.u.log(
                e.Trace,
                `(WebSockets transport) sending data. ${m(t, this.jt)}.`
              ),
              this.Ot.send(t),
              Promise.resolve())
            : Promise.reject("WebSocket is not in the OPEN state");
        }
        stop() {
          return this.Ot && this.Lt(void 0), Promise.resolve();
        }
        Lt(t) {
          this.Ot &&
            ((this.Ot.onclose = () => {}),
            (this.Ot.onmessage = () => {}),
            (this.Ot.onerror = () => {}),
            this.Ot.close(),
            (this.Ot = void 0)),
            this.u.log(e.Trace, "(WebSockets transport) socket closed."),
            this.onclose &&
              (!this.Ft(t) || (!1 !== t.wasClean && 1e3 === t.code)
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
        Ft(t) {
          return (
            t && "boolean" == typeof t.wasClean && "number" == typeof t.code
          );
        }
      }
      class z {
        constructor(t, s = {}) {
          var i;
          if (
            ((this.Bt = () => {}),
            (this.features = {}),
            (this.Xt = 1),
            w.isRequired(t, "url"),
            (this.u =
              void 0 === (i = s.logger)
                ? new $(e.Information)
                : null === i
                ? p.instance
                : void 0 !== i.log
                ? i
                : new $(i)),
            (this.baseUrl = this.Jt(t)),
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
          let n = null,
            r = null;
          if (g.isNode) {
            const t = require;
            (n = t("ws")), (r = t("eventsource"));
          }
          g.isNode || "undefined" == typeof WebSocket || s.WebSocket
            ? g.isNode && !s.WebSocket && n && (s.WebSocket = n)
            : (s.WebSocket = WebSocket),
            g.isNode || "undefined" == typeof EventSource || s.EventSource
              ? g.isNode &&
                !s.EventSource &&
                void 0 !== r &&
                (s.EventSource = r)
              : (s.EventSource = EventSource),
            (this.$ = new q(
              s.httpClient || new H(this.u),
              s.accessTokenFactory
            )),
            (this.M = "Disconnected"),
            (this.j = !1),
            (this.Ht = s),
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
            "Disconnected" !== this.M)
          )
            return Promise.reject(
              new Error(
                "Cannot start an HttpConnection that is not in the 'Disconnected' state."
              )
            );
          if (
            ((this.M = "Connecting"),
            (this.zt = this.F(t)),
            await this.zt,
            "Disconnecting" === this.M)
          ) {
            const t =
              "Failed to start the HttpConnection before stop() was called.";
            return (
              this.u.log(e.Error, t), await this.tt, Promise.reject(new r(t))
            );
          }
          if ("Connected" !== this.M) {
            const t =
              "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
            return this.u.log(e.Error, t), Promise.reject(new r(t));
          }
          this.j = !0;
        }
        send(t) {
          return "Connected" !== this.M
            ? Promise.reject(
                new Error(
                  "Cannot send data if the connection is not in the 'Connected' State."
                )
              )
            : (this.Vt || (this.Vt = new V(this.transport)), this.Vt.send(t));
        }
        async stop(t) {
          return "Disconnected" === this.M
            ? (this.u.log(
                e.Debug,
                `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnected state.`
              ),
              Promise.resolve())
            : "Disconnecting" === this.M
            ? (this.u.log(
                e.Debug,
                `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnecting state.`
              ),
              this.tt)
            : ((this.M = "Disconnecting"),
              (this.tt = new Promise((t) => {
                this.Bt = t;
              })),
              await this.et(t),
              void (await this.tt));
        }
        async et(t) {
          this.Gt = t;
          try {
            await this.zt;
          } catch (t) {}
          if (this.transport) {
            try {
              await this.transport.stop();
            } catch (t) {
              this.u.log(
                e.Error,
                `HttpConnection.transport.stop() threw error '${t}'.`
              ),
                this.Kt();
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
          (this.kt = this.Ht.accessTokenFactory), (this.$.kt = this.kt);
          try {
            if (this.Ht.skipNegotiation) {
              if (this.Ht.transport !== W.WebSockets)
                throw new Error(
                  "Negotiation can only be skipped when using the WebSocket transport directly."
                );
              (this.transport = this.Qt(W.WebSockets)), await this.Yt(s, t);
            } else {
              let e = null,
                i = 0;
              do {
                if (
                  ((e = await this.Zt(s)),
                  "Disconnecting" === this.M || "Disconnected" === this.M)
                )
                  throw new r("The connection was stopped during negotiation.");
                if (e.error) throw new Error(e.error);
                if (e.ProtocolVersion)
                  throw new Error(
                    "Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details."
                  );
                if ((e.url && (s = e.url), e.accessToken)) {
                  const t = e.accessToken;
                  (this.kt = () => t), (this.$.Pt = t), (this.$.kt = void 0);
                }
                i++;
              } while (e.url && i < 100);
              if (100 === i && e.url)
                throw new Error("Negotiate redirection limit exceeded.");
              await this.te(s, this.Ht.transport, e, t);
            }
            this.transport instanceof B &&
              (this.features.inherentKeepAlive = !0),
              "Connecting" === this.M &&
                (this.u.log(
                  e.Debug,
                  "The HttpConnection connected successfully."
                ),
                (this.M = "Connected"));
          } catch (t) {
            return (
              this.u.log(e.Error, "Failed to start the connection: " + t),
              (this.M = "Disconnected"),
              (this.transport = void 0),
              this.Bt(),
              Promise.reject(t)
            );
          }
        }
        async Zt(t) {
          const s = {},
            [n, r] = E();
          s[n] = r;
          const o = this.ee(t);
          this.u.log(e.Debug, `Sending negotiation request: ${o}.`);
          try {
            const t = await this.$.post(o, {
              content: "",
              headers: { ...s, ...this.Ht.headers },
              timeout: this.Ht.timeout,
              withCredentials: this.Ht.withCredentials,
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
              t instanceof i &&
                404 === t.statusCode &&
                (s +=
                  " Either this is not a SignalR endpoint or there is a proxy blocking the connection."),
              this.u.log(e.Error, s),
              Promise.reject(new a(s))
            );
          }
        }
        se(t, e) {
          return e ? t + (-1 === t.indexOf("?") ? "?" : "&") + `id=${e}` : t;
        }
        async te(t, s, i, n) {
          let o = this.se(t, i.connectionToken);
          if (this.ie(s))
            return (
              this.u.log(
                e.Debug,
                "Connection was provided an instance of ITransport, using that directly."
              ),
              (this.transport = s),
              await this.Yt(o, n),
              void (this.connectionId = i.connectionId)
            );
          const h = [],
            a = i.availableTransports || [];
          let u = i;
          for (const i of a) {
            const a = this.ne(i, s, n);
            if (a instanceof Error) h.push(`${i.transport} failed:`), h.push(a);
            else if (this.ie(a)) {
              if (((this.transport = a), !u)) {
                try {
                  u = await this.Zt(t);
                } catch (t) {
                  return Promise.reject(t);
                }
                o = this.se(t, u.connectionToken);
              }
              try {
                return (
                  await this.Yt(o, n), void (this.connectionId = u.connectionId)
                );
              } catch (t) {
                if (
                  (this.u.log(
                    e.Error,
                    `Failed to start the transport '${i.transport}': ${t}`
                  ),
                  (u = void 0),
                  h.push(new c(`${i.transport} failed: ${t}`, W[i.transport])),
                  "Connecting" !== this.M)
                ) {
                  const t =
                    "Failed to select transport before stop() was called.";
                  return this.u.log(e.Debug, t), Promise.reject(new r(t));
                }
              }
            }
          }
          return h.length > 0
            ? Promise.reject(
                new l(
                  `Unable to connect to the server with any of the available transports. ${h.join(
                    " "
                  )}`,
                  h
                )
              )
            : Promise.reject(
                new Error(
                  "None of the transports supported by the client are supported by the server."
                )
              );
        }
        Qt(t) {
          switch (t) {
            case W.WebSockets:
              if (!this.Ht.WebSocket)
                throw new Error(
                  "'WebSocket' is not supported in your environment."
                );
              return new J(
                this.$,
                this.kt,
                this.u,
                this.Ht.logMessageContent,
                this.Ht.WebSocket,
                this.Ht.headers || {}
              );
            case W.ServerSentEvents:
              if (!this.Ht.EventSource)
                throw new Error(
                  "'EventSource' is not supported in your environment."
                );
              return new X(this.$, this.$.Pt, this.u, this.Ht);
            case W.LongPolling:
              return new B(this.$, this.u, this.Ht);
            default:
              throw new Error(`Unknown transport: ${t}.`);
          }
        }
        Yt(t, e) {
          return (
            (this.transport.onreceive = this.onreceive),
            (this.transport.onclose = (t) => this.Kt(t)),
            this.transport.connect(t, e)
          );
        }
        ne(t, s, i) {
          const n = W[t.transport];
          if (null == n)
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
            })(s, n)
          )
            return (
              this.u.log(
                e.Debug,
                `Skipping transport '${W[n]}' because it was disabled by the client.`
              ),
              new h(`'${W[n]}' is disabled by the client.`, n)
            );
          if (!(t.transferFormats.map((t) => O[t]).indexOf(i) >= 0))
            return (
              this.u.log(
                e.Debug,
                `Skipping transport '${W[n]}' because it does not support the requested transfer format '${O[i]}'.`
              ),
              new Error(`'${W[n]}' does not support ${O[i]}.`)
            );
          if (
            (n === W.WebSockets && !this.Ht.WebSocket) ||
            (n === W.ServerSentEvents && !this.Ht.EventSource)
          )
            return (
              this.u.log(
                e.Debug,
                `Skipping transport '${W[n]}' because it is not supported in your environment.'`
              ),
              new o(`'${W[n]}' is not supported in your environment.`, n)
            );
          this.u.log(e.Debug, `Selecting transport '${W[n]}'.`);
          try {
            return this.Qt(n);
          } catch (t) {
            return t;
          }
        }
        ie(t) {
          return t && "object" == typeof t && "connect" in t;
        }
        Kt(t) {
          if (
            (this.u.log(
              e.Debug,
              `HttpConnection.stopConnection(${t}) called while in state ${this.M}.`
            ),
            (this.transport = void 0),
            (t = this.Gt || t),
            (this.Gt = void 0),
            "Disconnected" !== this.M)
          ) {
            if ("Connecting" === this.M)
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
              ("Disconnecting" === this.M && this.Bt(),
              t
                ? this.u.log(
                    e.Error,
                    `Connection disconnected with error '${t}'.`
                  )
                : this.u.log(e.Information, "Connection disconnected."),
              this.Vt &&
                (this.Vt.stop().catch((t) => {
                  this.u.log(
                    e.Error,
                    `TransportSendQueue.stop() threw error '${t}'.`
                  );
                }),
                (this.Vt = void 0)),
              (this.connectionId = void 0),
              (this.M = "Disconnected"),
              this.j)
            ) {
              this.j = !1;
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
        Jt(t) {
          if (
            0 === t.lastIndexOf("https://", 0) ||
            0 === t.lastIndexOf("http://", 0)
          )
            return t;
          if (!g.isBrowser) throw new Error(`Cannot resolve '${t}'.`);
          const s = window.document.createElement("a");
          return (
            (s.href = t),
            this.u.log(e.Information, `Normalizing '${t}' to '${s.href}'.`),
            s.href
          );
        }
        ee(t) {
          const e = t.indexOf("?");
          let s = t.substring(0, -1 === e ? t.length : e);
          return (
            "/" !== s[s.length - 1] && (s += "/"),
            (s += "negotiate"),
            (s += -1 === e ? "" : t.substring(e)),
            -1 === s.indexOf("negotiateVersion") &&
              ((s += -1 === e ? "?" : "&"),
              (s += "negotiateVersion=" + this.Xt)),
            s
          );
        }
      }
      class V {
        constructor(t) {
          (this.re = t),
            (this.oe = []),
            (this.he = !0),
            (this.ce = new G()),
            (this.ae = new G()),
            (this.le = this.ue());
        }
        send(t) {
          return this.de(t), this.ae || (this.ae = new G()), this.ae.promise;
        }
        stop() {
          return (this.he = !1), this.ce.resolve(), this.le;
        }
        de(t) {
          if (this.oe.length && typeof this.oe[0] != typeof t)
            throw new Error(
              `Expected data to be of type ${typeof this
                .oe} but was of type ${typeof t}`
            );
          this.oe.push(t), this.ce.resolve();
        }
        async ue() {
          for (;;) {
            if ((await this.ce.promise, !this.he)) {
              this.ae && this.ae.reject("Connection stopped.");
              break;
            }
            this.ce = new G();
            const t = this.ae;
            this.ae = void 0;
            const e =
              "string" == typeof this.oe[0] ? this.oe.join("") : V.pe(this.oe);
            this.oe.length = 0;
            try {
              await this.re.send(e), t.resolve();
            } catch (e) {
              t.reject(e);
            }
          }
        }
        static pe(t) {
          const e = t.map((t) => t.byteLength).reduce((t, e) => t + e),
            s = new Uint8Array(e);
          let i = 0;
          for (const e of t) s.set(new Uint8Array(e), i), (i += e.byteLength);
          return s.buffer;
        }
      }
      class G {
        constructor() {
          this.promise = new Promise((t, e) => ([this.fe, this.we] = [t, e]));
        }
        resolve() {
          this.fe();
        }
        reject(t) {
          this.we(t);
        }
      }
      class K {
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
          null === s && (s = p.instance);
          const i = D.parse(t),
            n = [];
          for (const t of i) {
            const i = JSON.parse(t);
            if ("number" != typeof i.type) throw new Error("Invalid payload.");
            switch (i.type) {
              case R.Invocation:
                this.ge(i);
                break;
              case R.StreamItem:
                this.me(i);
                break;
              case R.Completion:
                this.ye(i);
                break;
              case R.Ping:
              case R.Close:
                break;
              default:
                s.log(
                  e.Information,
                  "Unknown message type '" + i.type + "' ignored."
                );
                continue;
            }
            n.push(i);
          }
          return n;
        }
        writeMessage(t) {
          return D.write(JSON.stringify(t));
        }
        ge(t) {
          this.be(t.target, "Invalid payload for Invocation message."),
            void 0 !== t.invocationId &&
              this.be(
                t.invocationId,
                "Invalid payload for Invocation message."
              );
        }
        me(t) {
          if (
            (this.be(t.invocationId, "Invalid payload for StreamItem message."),
            void 0 === t.item)
          )
            throw new Error("Invalid payload for StreamItem message.");
        }
        ye(t) {
          if (t.result && t.error)
            throw new Error("Invalid payload for Completion message.");
          !t.result &&
            t.error &&
            this.be(t.error, "Invalid payload for Completion message."),
            this.be(t.invocationId, "Invalid payload for Completion message.");
        }
        be(t, e) {
          if ("string" != typeof t || "" === t) throw new Error(e);
        }
      }
      const Q = {
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
      class Y {
        configureLogging(t) {
          if ((w.isRequired(t, "logging"), void 0 !== t.log)) this.logger = t;
          else if ("string" == typeof t) {
            const e = (function (t) {
              const e = Q[t.toLowerCase()];
              if (void 0 !== e) return e;
              throw new Error(`Unknown log level: ${t}`);
            })(t);
            this.logger = new $(e);
          } else this.logger = new $(t);
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
                ? (this.reconnectPolicy = new M(t))
                : (this.reconnectPolicy = t)
              : (this.reconnectPolicy = new M()),
            this
          );
        }
        build() {
          const t = this.httpConnectionOptions || {};
          if ((void 0 === t.logger && (t.logger = this.logger), !this.url))
            throw new Error(
              "The 'HubConnectionBuilder.withUrl' method must be called before building the connection."
            );
          const e = new z(this.url, t);
          return N.create(
            e,
            this.logger || p.instance,
            this.protocol || new K(),
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
    })()),
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.signalR = e())
    : (t.signalR = e());
//# sourceMappingURL=signalr.min.js.map
