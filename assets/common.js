/* 工具箱公共小函数。经典脚本，挂在 window.TB 上，不依赖任何库。 */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  // localStorage 在隐私模式、预览里可能抛异常，这里统一兜住
  var store = {
    get: function (k, d) {
      try {
        var v = localStorage.getItem('tb:' + k);
        return v == null ? d : JSON.parse(v);
      } catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem('tb:' + k, JSON.stringify(v)); } catch (e) { /* ignore */ }
    },
    del: function (k) {
      try { localStorage.removeItem('tb:' + k); } catch (e) { /* ignore */ }
    }
  };

  var vibrate = function (p) {
    try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) { /* ignore */ }
  };

  // 0 .. n-1 的均匀随机整数（无模偏差）
  var rand = function (n) {
    if (n <= 1) return 0;
    var c = window.crypto || window.msCrypto;
    if (!c || !c.getRandomValues) return Math.floor(Math.random() * n);
    var lim = Math.floor(4294967296 / n) * n;
    var buf = new Uint32Array(1), x;
    do { c.getRandomValues(buf); x = buf[0]; } while (x >= lim);
    return x % n;
  };

  var shuffle = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = rand(i + 1), t = arr[i];
      arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  };

  var safeUrl = function (u) {
    return /^\s*(javascript|data|vbscript):/i.test(u || '') ? '#' : (u || '#');
  };

  window.TB = { $: $, $$: $$, esc: esc, store: store, vibrate: vibrate, rand: rand, shuffle: shuffle, safeUrl: safeUrl };
})();
