/* eslint-disable */
var $ = (function () {
  'use strict'
  var u = navigator.userAgent.toLowerCase(),
    isIE = u.indexOf('msie') > 0,
    isFF = u.indexOf('firefox') > 0,
    bsVer = (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    $D = document,
    $DB = document.body,
    $LS = window.localStorage,
    $W = window,
    $M = Math,
    $DE = $D.documentElement,
    isPad = 'createTouch' in $D,
    $ = function (s) {
      if (s === '') return $.getType()
      var t = typeof s
      return t != 'function' ? t == 'string' ? s.charAt(0) == '{' ? eval('(' + s + ')') : $.Ext($D.getElementById(s), _x) : $.Ext(s, _x) : ($.onReady(s), void 0)
    }
  if (
    $.UI = {},
    $.ver = 'Meeko 0.2 by KongNet',
    $.Ext = function (a, b) {
      if (a) {
        for (var c in b) a[c] || (a[c] = b[c])
        return a
      }
    },
    $.ajax = function (a, b, c, d, e) {
      var f = this,
        h = (new Date(), setTimeout(function () {
          f.r.abort(),
          clearInterval(h),
          f.onError('Timeout')
        }, 2e4))
      c = c || {},
      c.onSuccess = c.onSuccess ||
        function () {},
      c.onError = c.onError ||
        function () {},
      f.onSuccess = function (a) {
        c.onSuccess(a),
        f.r = null
      },
      f.onError = function (a) {
        c.onError(a),
        f.r = null
      },
      f.bindFn = function (a, b) {
        return function () {
          return a.apply(b, [b])
        }
      },
      f.stateChange = function () {
        if (f.r.readyState == 4) {
          var a = f.r.status
          if (a >= 400 && a < 500) {
            return f.onError('Clinet Error,' + a),
            void 0
          }
          if (a >= 500) {
            return f.onError('Server Error,' + a),
            void 0
          }
          if (a == 200) {
            var b = f.r.responseText
            return clearInterval(h),
            f.onSuccess(b),
            e && e.sat === 0 && e.go(),
            b
          }
          return f.onError(),
          void 0
        }
      },
      f.getR = function () {
        if (!$W.ActiveXObject) return new XMLHttpRequest()
        for (var a = 'MSXML2.XMLHTTP', b = ['Microsoft.XMLHTTP', a, a + '.3.0', a + '.4.0', a + '.5.0', a + '.6.0'], c = b.length - 1; c > -1; c--) {
          try {
            return new ActiveXObject(b[c])
          } catch (d) {}
        }
      },
      b = b || '',
      f.r = f.getR()
      var i = f.r
      d != 'GET' ? (i.open('POST', a, 1), i.onreadystatechange = f.bindFn(f.stateChange, f), i.setRequestHeader('X-Requested-With', 'XMLHttpRequest'), i.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'), i.send(b)) : (i.open('GET', a + '?' + b, 1), i.onreadystatechange = f.bindFn(f.stateChange, f), i.send(null)),
      clearInterval(h)
    },
    $.get = $.ajax, $.Q = function () {
      var a = this,
        b = null
      return a.q = [],
      a.sat = 0,
      a.qType = '_QB',
      a.push = function (b) {
        if ($.getType(b) == 'array') {
          for (var c = 0; c < b.length; c++) {
            oj = b[c],
            a.q.push({
              qType: oj.o,
              fn: oj.f,
              arg: oj.p,
              delay: oj.t
            })
          }
        } else {
          a.q.push({
            qType: b.o,
            fn: b.f,
            arg: b.p,
            delay: b.t
          })
        }
        return a
      },
      a.wait = function (b) {
        return a.q.push({
          qType: '_QB',
          fn: function () {},
          arg: null,
          delay: b
        }),
        a
      },
      a.getLen = function () {
        return a.q.length
      },
      a.getRefObj = function () {
        return b
      },
      a.go = function () {
        a.sat = 1
        var c = a.q[0]
        if (c) {
          var d = c.qType
          c.arg = $A(c.arg || [])
          var e = c.delay
          if (e == -1 && c.arg.push(a), d ? (d == '_QB' && (d = b), b = c.fn.apply(d, c.arg)) : b = c.fn.apply(null, c.arg), e > 0) {
            setTimeout(function () {
              a.q.shift(),
              a.go()
            }, e)
          } else {
            if (a.q.shift(), a.getLen() === 0 || e == -1) {
              return a.sat = 0,
              a
            }
            a.go()
          }
        }
      },
      a
    }, isIE
  ) {
    try {
      $D.execCommand('BackgroundImageCache', !1, !0)
    } catch (e) {}
  }
  isIE || (HTMLElement.prototype.insertAdjacentElement = function (a, b) {
    switch (a) {
      case 'beforeBegin':
        return $(this.parentNode.insertBefore(b, this))
      case 'afterBegin':
        return $(this.insertBefore(b, this.firstChild))
      case 'beforeEnd':
        return $(this.appendChild(b))
      case 'afterEnd':
        return this.nextSibling ? $(this.parentNode.insertBefore(b, this.nextSibling)) : $(this.parentNode.appendChild(b))
    }
  })
  var _s = {
      toLow: function () {
        return this.toLowerCase()
      },
      toUp: function () {
        return this.toUpperCase()
      },
      cn2css: function () {
        for (var a = this.replace(/\s{2,}/g, ' ').split(' '), b = [], c = 0; c < a.length; c++) b[c] = $.skin.classObj[a[c]]
        return b.join(';') + ';'
      },
      esHtml: function () {
        return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      },
      toHtml: function () {
        return this.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
      },
      reHtml: function () {
        return this.replace(/<\/?[^>]+>/gi, '')
      },
      times: function (a) {
        return a ? new Array(a + 1).join(this) : ''
      },
      format: function () {
        for (var a = this, b = [], c = 0, d = arguments.length; d > c; c++) b.push(arguments[c])
        return a.replace(/\{(\d+)\}/g, function (a, c) {
          return b[c]
        })
      },
      len: function () {
        return this.replace(/[^\x00-\xff]/g, '**').length
      },
      toInt: function () {
        return $.m.p(this)
      },
      toElm: function (a) {
        return o = $(a),
        o.h(this),
        o
      },
      isDate: function () {
        var a = this.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
        if (a == null) return !1
        var b = new Date(a[1], a[3] - 1, a[4])
        return b.getFullYear() == a[1] && b.getMonth() + 1 == a[3] && b.getDate() == a[4]
      },
      isTime: function () {
        var a = this.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/)
        if (a == null) return !1
        var b = new Date(a[1], a[3] - 1, a[4], a[5], a[6], a[7])
        return b.getFullYear() == a[1] && b.getMonth() + 1 == a[3] && b.getDate() == a[4] && b.getHours() == a[5] && b.getMinutes() == a[6] && b.getSeconds() == a[7]
      },
      replaceAll: function (a, b) {
        var c = this.split(a)
        return c.join(b)
      },
      test: function (a) {
        return a.test(this)
      },
      trim: function () {
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
      },
      camelize: function () {
        return this.replace(/(-[a-z])/g, function (a) {
          return a.substring(1).toUpperCase()
        })
      },
      ec: function (a) {
        return new RegExp('(^' + a + '\\s)|(\\s' + a + '$)|(\\s' + a + '\\s)|(^' + a + '$)', 'g').test(this)
      },
      tc: function (a) {
        return this.ec(a) ? this.dc(a) : this.ac(a)
      },
      dc: function (a) {
        return this.ec(a) ? this.replace(new RegExp('(^' + a + '\\s)|(\\s' + a + '$)|(\\s' + a + '\\s)|(^' + a + '$)', 'g'), '').replace(/\s{2,}/g, ' ') : this
      },
      ac: function (a) {
        return this.dc(a) + ' ' + a
      }
    },
    _a = {
      max: function () {
        return $M.max.apply({}, this)
      },
      min: function () {
        return $M.min.apply({}, this)
      },
      copy: function () {
        return [].concat(this)
      },
      clear: function () {
        return this.length = 0,
        this
      },
      re: function (a) {
        for (;;) {
          var b = this.idxOf(a)
          if (!(b >= 0)) return this
          this.reAt(b)
        }
      },
      reAt: function (a) {
        return this.splice(a, 1),
        this
      },
      unique: function () {
        for (var a = {}, b = 0, c = this.length; c > b;) a[this[b++]] = 1
        this.length = 0
        for (var b in a) this[this.length] = b
        return this
      },
      combine: function () {
        return [].concat.apply(this, arguments).unique()
      },
      ec: function (a) {
        try {
          for (var b = 0, c = this.length; c > b;) a.call(this, b++)
        } catch (d) {
          return this
        }
        return this
      },
      filter: function (a) {
        var b = []
        return this.ec(function (c) {
          a(this[c]) && b.push(this[c])
        }),
        b
      },
      idxOf: function (a) {
        var b = this
        if ([].indexOf) return b.indexOf(a)
        for (var c = 0, d = b.length; d > c; c++) if (b[c] === a) return c
        return -1
      }
    },
    _d = {
      date8: function (a) {
        var b = this.getMonth() + 1,
          c = this.getDate(),
          b = b <= 9 ? '0' + b : b,
          c = c <= 9 ? '0' + c : c,
          a = a || ''
        return [this.getFullYear(), b, c].join(a)
      },
      date2Str: function () {
        return this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate() + ' ' + this.getHours() + ':' + this.getMinutes() + ':' + this.getSeconds()
      },
      str2Date: function (a) {
        if (!a) return !1
        var b = a.match(/[0-9]+/g)
        return this.setFullYear($.m.p(b[0] || 1900), $.m.p(b[1] || 1) - 1, $.m.p(b[2] || 1)),
        this.setHours($.m.p(b[3] || 0)),
        this.setMinutes($.m.p(b[4] || 0)),
        this.setSeconds($.m.p(b[5] || 0)),
        this
      }
    },
    _f = {
      help: function (a, b) {
        var c = '' + this,
          a = a || '/*',
          b = b || '*/'
        return c = c.substring(c.indexOf(a) + 3, c.lastIndexOf(b)),
        c.trim()
      }
    },
    _w = {
      timeIntervalArray: [],
      isIE: isIE,
      isPad: isPad,
      qWait: function (a) {
        var b = _q(this, a)
        return b.qType == '_QB' ? b : this
      },
      $D: $D,
      $DB: $DB,
      $B: $DB,
      $Q: $.Q,
      $Get: $.get,
      $ajax: function (a, b, c, d, e) {
        new $.ajax(a, b, c, d, e)
      },
      $Ef: function (a) {
        return $(a)
      },
      $DBf: function () {
        return $DB
      },
      $Fg: function () {
        return $($D.createDocumentFragment())
      },
      $C: function (a, b) {
        var c = $D.createElement(b)
        return a != '' && a != null && c.setAttribute('id', a),
        $(c)
      },
      $$: function () {
        return this.$A(Sizzle(str))
      },
      $A: function (a) {
        if (!a) return []
        if (a.toArray) return a.toArray()
        for (var c = a.length || 0, d = new Array(c); c--;) d[c] = a[c]
        return d
      },
      $S: function (a) {
        return a ? typeof a === 'string' ? $(a).style : a.style : null
      }
    },
    _x = {
      alpha: function (a) {
        return a || a == '' ? (isIE && +bsVer < 10 ? (this.alp = a / 100, $S(this).filter = 'alpha(opacity=' + a + ')') : $S(this).opacity = a / 100, this) : isIE ? $S(this).filter == '' ? 0 : $.m.p(this.filters.alpha.opacity) : $S(this).opacity == '' ? 0 : $.m.p(100 * $S(this).opacity)
      },
      ease: function (propArray, endProp, during, type, backFun, ifQ, ifPx) {
        function anitime () {
          var tAdjust = during - step,
            t = n / tAdjust
          if (n += 2 * step, n >= during) {
            for (var k = 0; l > k; k++)pAry[k] == 'alpha' ? me.alpha(eAry[k]) : $S(me)[pAry[k]] = eAry[k] + ifPx
            var fun = backFun.e || ''
            return typeof fun === 'string' ? eval(fun) : fun(),
            clearTimeout(time),
            void 0
          }
          for (var i = 0; l > i; i++) {
            sAry[i] = $.Tween[type](n, bAry[i], dt[i], during),
            pAry[i] == 'alpha' ? me.alpha(sAry[i]) : $S(me)[pAry[i]] = $M.ceil(sAry[i]) + ifPx
          }
          var t = setTimeout(anitime, step),
            ff = backFun.f || ''
          typeof ff === 'string' ? eval(ff) : ff()
        }
        var ifPx = ifPx || 'px'
        ifPx == '' && (ifPx = 0),
        type = type == 1 || void 0 === $.Tween[type] ? 'easeNone' : type
        for (var me = this, dt = [], pAry = [], bAry = [], eAry = [], sAry = [], l = propArray.length, i = 0; l > i; i++) {
          pAry.push(propArray[i].camelize()),
          eAry.push(endProp[i])
          var _s = $S(me)[pAry[i]] || '0'
          pAry[i] == 'alpha' && (_s = me.alpha()),
          _s = $.m.p(_s),
          sAry.push(_s),
          dt.push(eAry[i] - _s),
          bAry.push(_s)
        }
        var n = 0,
          step = 16,
          time = setTimeout(anitime, step)
        return timeIntervalArray.push(time),
        this
      },
      adElm: function (a, b) {
        var c = $C(a, b)
        return this.appendChild(c),
        $(c)
      },
      appendTo: function (a) {
        return a.appendChild(this),
        this
      },
      bbElm: function (a, b) {
        var c = $C(a, b)
        return this.insertAdjacentElement('beforeBegin', c),
        $(c)
      },
      abElm: function (a, b) {
        var c = $C(a, b)
        return this.insertAdjacentElement('afterBegin', c),
        $(c)
      },
      aeElm: function (a, b) {
        var c = $C(a, b)
        return this.insertAdjacentElement('afterEnd', c),
        $(c)
      },
      beElm: function (a, b) {
        var c = $C(a, b)
        return this.insertAdjacentElement('beforeEnd', c),
        $(c)
      },
      attr: function (a, b) {
        if (arguments.length == 1) return this.getAttribute(a)
        if (isIE && this.tagName == 'INPUT' && a == 'type') {
          var c = this.outerHTML.split(a + '=' + this.attr(a))
          this.outerHTML = c.length > 1 ? c.join(a + '=' + b) : this.outerHTML.replace('>', ' ' + a + '=' + b + '>')
        } else this.setAttribute(a, b)
        return this.id == '' ? this : $(this.id)
      },
      ac: function (a) {
        return this.cn(this.cn().ac(a)),
        this
      },
      dc: function (a) {
        var b = this,
          c = this.cn()
        return b.cn(c.dc(a)),
        b
      },
      tc: function (a) {
        return this.cn(this.cn().tc(a)),
        this
      },
      chn: function (a) {
        return $(this.childNodes[a])
      },
      chr: function (a) {
        return $(this.children[a])
      },
      // classname 修改class或者获取class
      cn: function (a) {
        return a || a == '' ? (this.className = a, this) : this.className
      },
      cs: function (a) {
        return isIE ? a == 'top' ? this.offsetTop : a == 'left' ? this.offsetLeft : a == 'width' ? this.offsetWidth : a == 'height' ? this.offsetHeight : a == 'background-position' && +$('').split(',')[1] < 9 ? this.currentStyle.backgroundPositionX + ' ' + this.currentStyle.backgroundPositionY : this.currentStyle[a.camelize()] : window.getComputedStyle(this, null).getPropertyValue(a)
      },
      csn: function (a) {
        return $.m.p(this.cs(a))
      },
      css: function (a) {
        var b = this,
          c = a.split(';')
        return c.ec(function (a) {
          var d, c = this[a].split(':')
          d = c[2] ? c[1] + ':' + c[2] : c[1],
          c[0] == 'float' && (c[0] = isIE ? 'style-float' : 'css-float'),
          c[0] && ($S(b)[c[0].camelize()] = d)
        }),
        b
      },
      evt: function (a, b, c) {
        return void 0 == c && (c = !1),
        isFF && a == 'mousewheel' && (a = 'DOMMouseScroll'),
        isIE ? this.attachEvent('on' + a, b, c) : this.addEventListener(a, b, c),
        this
      },
      revt: function (a, b, c) {
        return void 0 == c && (c = !1),
        isIE ? this.detachEvent('on' + a, b, c) : this.removeEventListener(a, b, c),
        this
      },
      fevt: function (a) {
        if ($D.createEventObject) {
          var b = $D.createEventObject()
          this.fireEvent('on' + a, b)
        } else {
          var b = $D.createEvent('HTMLEvents')
          b.initEvent(a, !0, !0),
          this.dispatchEvent(b)
        }
        return this
      },

      // firstChild 找到它的第一个子元素
      fc: function () {
        return $(this.firstChild)
      },
      insertA: function (a) {
        return a.insertAdjacentElement('afterEnd', this.cloneNode(!0))
      },
      insertB: function (a) {
        return a.insertAdjacentElement('beforeBegin', this.cloneNode(!0))
      },
      moveA: function (a) {
        var b = this.insertA(a)
        return this.r(),
        b
      },
      moveB: function (a) {
        var b = this.insertB(a)
        return this.r(),
        b
      },
      ps: function () {
        return $(this.previousSibling)
      },

      // 找到下一个兄弟元素
      ns: function () {
        return $(this.nextSibling)
      },
      fcs: function () {
        return this.focus(),
        this
      },
      find: function (a, b) {
        return (function c (a, b, d) {
          var e = RegExp,
            b = b || $D,
            a = a && a != '.' ? a : '*'
          if (b.length === 0) return []
          if (/^(\w+|\*)$/.test(a)) return b.getElementsByTagName(a)
          if (/^#(\w+)(?:[\s>]?(.*))?$/.test(a)) return e.$2 ? c(e.$2, b.getElementById(e.$1)) : b.getElementById(e.$1)
          if (/^\.(.*)$/.test(a)) {
            d = (d ? e.$1 : 'class=' + e.$1).split('=')
            for (var f, h, g = 0, i = [], b = b.length ? b : b.getElementsByTagName('*'); h = b[g++];)
              (f = h.getAttributeNode(d[0])) && (d[1] ? f.value == d[1] : 1) && i.push(h)
            return i
          }
          return /^(\w+)(\..*)$/.test(a) ? c(e.$2, c(e.$1, b)) : /^(\w+):(.*)$/.test(a) ? c('.' + e.$2, c(e.$1, b), 1) : []
        }(a, this, b))
      },
      replaceHtml: function (a) {
        var b = this.cloneNode(!1),
          c = this.parentNode ? this.parentNode : $D
        return b.innerHTML = a,
        c.replaceChild(b, this),
        this
      },

      // 相当于 jq的 html
      h: function (a) {
        return a || a == '' ? (this.innerHTML = a, this) : this.innerHTML
      },
      ht: function (a) {
        return this.innerText ? a || a == '' ? (this.innerText = a, this) : this.innerText || '' : a || a == '' ? (this.textContent = a, this) : this.textContent || ''
      },
      hide: function () {
        return this.css('display:none')
      },
      pos: function (a) {
        var b = 0,
          c = 0,
          d = 0,
          e = 0
        if (a = a || $DB, this.getBoundingClientRect) {
          var f = this.getBoundingClientRect()
          b = f.left + Math.max($DE.scrollLeft, $DB.scrollLeft) - $DE.clientLeft,
          c = f.top + Math.max($DE.scrollTop, $DB.scrollTop) - $DE.clientTop
        } else for (; obj != a; b += obj.offsetLeft, c += obj.offsetTop, obj = obj.offsetParent);
        return d = this.offsetWidth,
        e = this.offsetHeight,
        {
          x: b,
          y: c,
          w: d,
          h: e
        }
      },
      posFix: function () {
        return {
          x: this.getBoundingClientRect().left,
          y: this.getBoundingClientRect().top,
          w: this.offsetWidth,
          h: this.offsetHeight
        }
      },
      pn: function (a) {
        if (!a) return $(this.parentNode)
        for (var b = this; a;) {
          b = b.parentNode,
          a--
        }
        return $(b)
      },
      r: function () {
        this && this.parentNode && this.parentNode.removeChild(this)
      },
      val: function (a) {
        return a || a == '' ? (this.value = a, this) : this.value
      },
      show: function () {
        return this.css('display:block')
      },
      meeko: ''
    }
  if ($.Ext(Number.prototype, {
    round: function (a) {
      return a = $M.pow(10, a || 0),
      $M.round(this * a) / a
    }
  }), $.Ext(String.prototype, _s), $.Ext(Array.prototype, _a), $.Ext(Date.prototype, _d), $.Ext(Function.prototype, _f), $.Ext($W, _w), $.Ext($D, _x), $.Ext($DB, _x), $.Ext($Q.prototype, _s), $.Ext($Q.prototype, _w), $.Ext($Q.prototype, _x), $.m = {}, $.m.p = function () {
    return parseInt(arguments[0], 10)
  }, $.m.pf = parseFloat, $.e = {
    fix: function (a) {
      const e = a || $W.event
      e.stop = function () {
        isIE ? e.cancelBubble = !0 : e.stopPropagation(),
          e.pDefault()
      }
      e.pDefault = function () {
        isIE ? e.returnValue = !1 : e.preventDefault()
      }
      e.keycode = e.keyCode || e.which || e.charCode || e.button
      isIE && (e.target = e.srcElement)
      e.target.nodeType == 3 && (e.target = e.target.parentNode)
      !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement == e.target ? e.toElement : e.fromElement)
      if (!e.pageX && e.clientX) {
        var b = $DE
        e.pageX = e.clientX + (b && b.scrollLeft || $DB && $DB.scrollLeft || 0) - (b.clientLeft || 0)
        e.pageY = e.clientY + (b && b.scrollTop || $DB && $DB.scrollTop || 0) - (b.clientTop || 0)
      }
      return isFF && (e.wheelDelta = 40 * -e.detail),
      e.t = $(e.target),
      e
    },
    setInterval: function (a, b) {
      var c = [].slice.call(arguments, 2),
        d = a
      return c.length > 0 && (d = function () {
        a.apply(this, c)
      }),
      $W.setInterval(d, b)
    },
    setTimeout: function (a, b) {
      var c = [].slice.call(arguments, 2),
        d = a
      return c.length > 0 && (d = function () {
        a.apply(this, c)
      }),
      $W.setTimeout(d, b)
    }
  }, $.drag = {
    init: function (a, b, c, d, e, f, g, h, i, j) {
      return a.onmousedown = $.drag.start,
      a.ih = g ? !1 : !0,
      a.v = h ? !1 : !0,
      a.rt = b && b != null ? b : a,
      a.s = a.rt.style,
      a.minX = c || 0,
      a.minY = e || 0,
      a.maxX = d || null,
      a.maxY = f || null,
      a.xFn = i || null,
      a.yFn = j || null,
      a.p = $.m.p,
      a.rt.onDragStart = a.rt.onDragEnd = a.rt.onDrag = function () {},
      a
    },
    start: function (a, b) {
      var b = $.drag.obj = b || this,
        c = b.p(b.v ? b.s.top : b.s.bottom),
        d = b.p(b.ih ? b.s.left : b.s.right)
      return b.s.display = 'block',
      a = a || $W.event,
      b.rt.onDragStart(d, c, a),
      b.lx = a.clientX,
      b.ly = a.clientY,
      b.ih ? (b.iMX = b.lx - d + b.minX, b.maxX && (b.xMX = b.iMX + b.maxX - b.minX)) : (b.xMX = -b.minX + b.lx + d, b.maxX && (b.iMX = -b.maxX + b.lx + d)),
      b.v ? (b.iMY = b.ly - c + b.minY, b.maxY && (b.xMY = b.iMY + b.maxY - b.minY)) : (b.xMY = -b.minY + b.ly + c, b.maxY && (b.iMY = -b.maxY + b.ly + c)),
      $D.onmousemove = $.drag.drag,
      $D.onmouseup = $.drag.end,
      !1
    },
    drag: function (a) {
      var a = $.e.fix(a)
      a.stop()
      var b = $.drag.obj,
        c = a.clientY,
        d = a.clientX,
        e = $M.min,
        f = $M.max,
        g = b.p(b.v ? b.s.top : b.s.bottom),
        h = b.p(b.ih ? b.s.left : b.s.right)
      if (b.dragable != 0) {
        d = b.ih ? f(d, b.iMX) : e(d, b.xMX)
        b.maxX && (d = b.ih ? e(d, b.xMX) : f(d, b.iMX))
        c = b.v ? f(c, b.iMY) : e(c, b.xMY)
        b.maxY && (c = b.v ? e(c, b.xMY) : f(c, b.iMY))
        var i = h + (d - b.lx) * (b.ih ? 1 : -1),
          j = g + (c - b.ly) * (b.v ? 1 : -1)
        return b.xFn ? i = b.xFn(g) : b.yFn && (j = b.yFn(h)),
        b.s.left = (i || 0) + 'px',
        b.s[b.v ? 'top' : 'bottom'] = (j || 0) + 'px',
        b.lx = d,
        b.ly = c,
        b.rt.onDrag(i, j),
        !1
      }
    },
    end: function () {
      var a = $.drag.obj
      $D.onmousemove = $D.onmouseup = null,
      a.rt.onDragEnd(a.p(a.s[a.ih ? 'left' : 'right']), a.p(a.s[a.v ? 'top' : 'bottom'])),
      a = null
    }
  }, $.ck = {
    set: function (a, b, c) {
      var d = a + '=' + encodeURIComponent(b)
      if (c) {
        var e = new Date($.time() + 36e5 * c)
        d += '; expires=' + e.toGMTString()
      }
      document.cookie = d
    },
    get: function (a) {
      var b = new RegExp('(?:; )?' + a + '=([^;]*);?')
      return b.test($D.cookie) ? decodeURIComponent(RegExp.$1) : null
    },
    remove: function (a) {
      this.set(a, null, -9999)
    },
    clear: function () {
      $D.cookie = null
    }
  }, $.getType = function () {
    if (arguments.length > 0) {
      var a, b = arguments[0]
      return ((a = typeof b) == 'object' ? b == null && 'null' || Object.prototype.toString.call(b).slice(8, -1) : a).toLow()
    }
    var c = navigator.userAgent.toLow(),
      d = (c.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]
    return c.indexOf('applewebkit/') > -1 ? 'safari,' + d : $W.opera ? 'opera,' + d : c.indexOf('msie') > -1 ? 'msie,' + d : c.indexOf('firefox') !== -1 ? 'mozilla,' + d : c.indexOf('chrome') !== -1 ? 'chrome,' + d : void 0
  }, $.ls = {
    set: function (a, b) {
      this.get(a) !== null && this.remove(a),
      $LS.setItem(a, b)
    },
    get: function (a) {
      var b = $LS.getItem(a)
      return void 0 === b ? null : b
    },
    remove: function (a) {
      $LS.removeItem(a)
    },
    clear: function () {
      $LS.clear()
    },
    each: function (a) {
      for (var d, b = $LS.length, c = 0, a = a ||
        function () {}; b > c && (d = $LS.key(c), a.call(this, d, this.get(d)) !== !1); c++) $LS.length < b && (b--, c--)
    }
  }, isIE && +$('').split(','[1]) < 8) {
    var UserData = function (a) {
      a || (a = 'user_data_default')
      var b = $D.createElement('input')
      return b.type = 'hidden',
      b.addBehavior('#default#userData'),
      $DB.appendChild(b),
      b.save(a),
      this.file_name = a,
      this.dom = b,
      this
    }
    UserData.prototype = {
      set: function (a, b) {
        this.dom.setAttribute(a, b),
        this.dom.save(this.file_name)
      },
      get: function (a) {
        return this.dom.load(this.file_name),
        this.dom.getAttribute(a)
      },
      remove: function (a) {
        this.dom.removeAttribute(a),
        this.dom.save(this.file_name)
      },
      clear: function () {
        this.dom.load(this.file_name)
        var a = new Date()
        a = new Date(a.getTime() - 1),
        this.dom.expires = a.toUTCString(),
        this.dom.save(this.file_name)
      }
    },
    $.ls = UserData('rui10')
  }
  return $.Tween = {
    easeNone: function (a, b, c, d) {
      return c * a / d + b
    }
  },
  $.JSON = new
  function () {
    var _1 = {}.hasOwnProperty ? !0 : !1,
      m = {
        '\b': '\\b',
        '	': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
      },
      _5 = function (a) {
        return /["\\\x00-\x1f]/.test(a) ? '"' + a.replace(/([\x00-\x1f\\"])/g, function (a, b) {
          var c = m[b]
          return c || (c = b.charCodeAt(), '\\u00' + $M.floor(c / 16).toString(16) + (c % 16).toString(16))
        }) + '"' : '"' + a + '"'
      },
      _a = function (a) {
        var c, d, f, b = ['['],
          e = a.length
        for (d = 0; e > d; d += 1) {
          switch (f = a[d], typeof f) {
            case 'undefined':
            case 'function':
            case 'unknown':
              break
            default:
              c && b.push(','),
              b.push(f === null ? 'null' : $.JSON.encode(f)),
              c = !0
          }
        }
        return b.push(']'),
        b.join('')
      }
    this.encode = function (a) {
      if (typeof a === 'undefined' || a === null) return 'null'
      if (a instanceof Array) return _a(a)
      if (a instanceof Date) return a.date2Str()
      if (typeof a === 'string') return _5(a)
      if (typeof a === 'number') return isFinite(a) ? String(a) : 'null'
      if (typeof a === 'boolean') return String(a)
      var c, d, e, b = ['{']
      for (d in a) {
        if (!_1 || a.hasOwnProperty(d)) {
          switch (e = a[d], typeof e) {
            case 'undefined':
            case 'function':
            case 'unknown':
              break
            default:
              c && b.push(','),
              b.push(this.encode(d), ':', e === null ? 'null' : this.encode(e)),
              c = !0
          }
        }
      }
      return b.push('}'),
      b.join('')
    },
    this.decode = function (_18) {
      return eval('(' + _18 + ')')
    }
  }(),
  $.onReady = function (a) {
    if (isIE) {
      var b = setInterval(function () {
        try {
          $DB.doScroll('left'),
          clearInterval(b),
          setTimeout(a, 48)
        } catch (c) {}
      }, 48)
    } else _x.evt.call($D, 'DOMContentLoaded', a, !1)
  },
  $.noSel = function () {
    if ($D.selection) $D.selection.empty ? $D.selection.empty() : $D.selection = null
    else if (getSelection) {
      try {
        getSelection().removeAllRanges()
      } catch (a) {}
    }
  },
  $.time = function () {
    return +new Date() || Date.now
  },
  $.rnd = function (a, b) {
    return $M.round($M.random($.time) * (b - a)) + a
  },
  $.clone = function (a) {
    var c = {}
    for (var d in a) {
      var e = a[d]
      c !== e && (c[d] = typeof e === 'object' ? $.clone(e || {}) : e)
    }
    return c
  },
  $.nCount = function () {
    var a = this
    a.i = -1,
    a.getN = function () {
      return a.i++,
      a.i
    },
    a.setN = function (b) {
      a.i = b
    }
  },
  $.wh = function () {
    var a, b = 0
    return typeof $W.innerWidth === 'number' ? (a = $W.innerWidth, b = $W.innerHeight) : $DE && ($DE.clientWidth || $DE.clientHeight) ? (a = $DE.clientWidth, b = $DE.clientHeight) : $DB && ($DB.clientWidth || $DB.clientHeight) && (a = $DB.clientWidth, b = $DB.clientHeight),
    [a / 2 + ($DE.scrollLeft || $DB.scrollLeft), b / 2 + ($DE.scrollTop || $DB.scrollTop)]
  },

  $.box = function (a) {
    var a = a.split(',')
    return (a[0].length ? 'left:' + a[0] + 'px;' : '')
      + (a[1].length ? 'top:' + a[1] + 'px;' : '')
      + (a[2].length ? 'width:' + a[2] + 'px;' : '')
      + (a[3].length ? 'height:' + a[3] + 'px;' : '')
  },
  $.setAtomStyle = function (a) {
    classObj = a
  },
  $.skin = {
    classObj: {},
    setAtomStyle: function (a) {
      this.classObj = a
    },
    getStyle: function () {
      var a = null
      try {
        if (a = $D.styleSheets[0], !a) {
          var b = $D.getElementsByTagName('head').item(0)
          b.appendChild($C('style')),
          a = $D.styleSheets[0]
        }
      } catch (c) {
        a = $D.createStyleSheet('styles.css')
      }
      return a
    },
    setStyle: function (a, b, c) {
      if (a.insertRule) a.insertRule('' + b + '{' + c + '}', a.cssRules.length)
      else if (a.addRule) {
        try {
          a.addRule(b, c)
        } catch (d) {}
      }
    },
    setCssItem: function (a, b) {
      return this.setStyle(this.getStyle(), a, b),
      this
    },
    setCss: function (a) {
      if ($.getType(a) == 'object') {
        var b = this.getStyle()
        for (i in a) this.setStyle(b, i, a[i])
      }
      return b
    }
  },
  $.key = {},
  $.key.stat = [],
  $.key.kd = function (e) {
    const keycode = e.keyCode || e.which || e.charCode || e.button
    $.key.stat[keycode] = 1
  },
  $.key.ku = function (e) {
    const keycode = e.keyCode || e.which || e.charCode || e.button
    $.key.stat[keycode] = 0
  },
  $.key.bind = function (a) {
    var b = this
    return b.o = a || $D,
    b.o.revt('keydown', $.key.kd),
    b.o.revt('keyup', $.key.ku),
    b.o.evt('keydown', $.key.kd),
    b.o.evt('keyup', $.key.ku),
    b.addKey = function (a, c, d, e) {
      var f = function (evt) {
        const keycode = evt.keyCode || evt.which || evt.charCode || evt.button
        $.key.stat[16] = evt.shiftKey ? 1 : 0
        $.key.stat[17] = evt.ctrlKey ? 1 : 0
        $.key.stat[18] = evt.altKey ? 1 : 0
        if (keycode == c) {
          for (var d = 1, f = 0; f < a.length; f++) a[f] != c && (d *= $.key.stat[a[f]])
          d == 1 && e()
        }
      }
      b.o.evt(d ? 'keydown' : 'keyup', f)
    },
    b
  },
  $.aCache = {
    num: 0,
    size: 0,
    hash: [],
    get: function (a) {
      var b = this.hash[a]
      return b ? b ? b.t + b.e < $.time() ? null : b.d : null : null
    },
    set: function (a, b, c) {
      var d = this.hash
      return d[a] ? (d[a].d = b, d[a].t = c, void 0) : -1
    },
    push: function (a, b, c) {
      var d = this.hash
      d[a] = {},
      d[a].d = b,
      d[a].t = $.time(),
      d[a].e = 1e3 * c || 1e4,
      this.size += b.length,
      this.num++
    },
    diff: function (a) {
      var b = this.hash
      if (!b[a]) return -1
      var c = $.time() - b[a].t
      return c > b[a].e ? (this.size -= b[a].d.length, this.num--, b[a] = null, -1) : c
    }
  },
  $.draw = function (a) {
    var d = this,
      e = a.p || $DB,
      f = function () {
        var a = e.adElm('', 'canvas').cn('pa').css($.box('0,0,0,0'))
        return a.height = 0,
        a.width = 0,
        a.getContext || (a = $W.G_vmlCanvasManager.initElement(a)),
        d.mc2d = a.getContext('2d'),
        a.setPos = function (a, b, c, d) {
          return this.dc('pa'),
          this.css($.box(a + ',' + b + ',' + c + ',' + d)),
          this.width = 0,
          this.height = 0,
          this.width = c,
          this.height = d,
          this
        },
        a.beginPath = function () {
          return d.mc2d.beginPath(),
          this
        },
        a.stroke = function () {
          return d.mc2d.stroke(),
          this
        },
        a.mTo = function (b, c) {
          return d.mc2d.moveTo(b, c),
          a.nowX = b,
          a.nowY = c,
          this
        },
        a.lineStyle = function (a, b, c) {
          return d.mc2d.strokeStyle = b || '#000',
          d.mc2d.lineWidth = a || 1,
          d.mc2d.lineJoin = c || 'round',
          this
        },
        a.lTo = function (b, c) {
          return d.mc2d.lineTo(b, c),
          a.nowX = b,
          a.nowY = c,
          this
        },
        a.dTo = function (a, b, c, d) {
          c = c || 2,
          d = d || 2
          var e = a - this.nowX,
            f = b - this.nowY,
            g = $M.sqrt(e * e + f * f),
            h = g / (c + d),
            i = c / (c + d),
            j = e / h * i,
            k = e / h - j,
            l = f / h * i,
            m = f / h - l
          for (this.mTo(this.nowX, this.nowY); g > 0;) {
            this.nowX += j,
            this.nowY += l,
            g -= c,
            g < 0 && (this.nowX = a, this.nowY = b),
            this.lTo(this.nowX, this.nowY),
            this.nowX += k,
            this.nowY += m,
            this.mTo(this.nowX, this.nowY),
            g -= d
          }
          return this.mTo(a, b),
          this
        },
        a.aTo = function (a, b, c, e, f) {
          return d.mc2d.arc(a, b, c, e, f),
          this
        },
        a.bTo = function (b, c, e, f, g, h) {
          return d.mc2d.bezierCurveTo(b, c, e, f, g, h),
          a.nowX = g,
          a.nowY = h,
          this
        },
        a.cTo = function (b, c, e, f) {
          return d.mc2d.quadraticCurveTo(b, c, e, f),
          a.nowX = e,
          a.nowY = f,
          this
        },
        a.fillStyle = function (a) {
          return d.mc2d.fillStyle = a,
          this
        },
        a.fill = function () {
          return d.mc2d.fill(),
          this
        },
        a.fillText = function (a, b, c, e) {
          return d.mc2d.fillText(a, b, c, e),
          this
        },
        a.textStyle = function (a) {
          return d.mc2d.font = a || '12px sans-serif',
          this
        },
        a.clearRect = function (a, b, c, e) {
          return d.mc2d.clearRect(a, b, c, e),
          this
        },
        a.clear = function () {
          return d.mc2d.clearRect(0, 0, this.width, this.height),
          this
        },
        a.save = function () {
          return d.mc2d.save(),
          this
        },
        a.restore = function () {
          return d.mc2d.restore(),
          this
        },
        a.drawImage = function (a, b, c) {
          d.mc2d.drawImage(a, b, c)
        },
        a.getImageData = function (a, b, c, e) {
          return d.mc2d.getImageData(a, b, c, e)
        },
        a.drawRect = function (b, c, e, f, g, h, i, j) {
          var k = d.mc2d.createLinearGradient(0, 0, 0, f)
          if (k.addColorStop(0, 'rgba(255,255,255,' + (j || 1) + ')'), k.addColorStop(1, h), d.mc2d.fillStyle = i ? h : k, g > 0) {
            var l, m, n, o, p, q
            g > $M.min(e, f) / 2 && (g = $M.min(e, f) / 2),
            l = 0.7853982,
            a.beginPath(),
            a.mTo(b + g, c),
            a.lTo(b + e - g, c),
            m = -1.570796,
            n = b + e - g + $M.cos(m + l / 2) * g / $M.cos(l / 2),
            o = c + g + $M.sin(m + l / 2) * g / $M.cos(l / 2),
            p = b + e - g + $M.cos(m + l) * g,
            q = c + g + $M.sin(m + l) * g,
            a.cTo(n, o, p, q),
            m += l,
            n = b + e - g + $M.cos(m + l / 2) * g / $M.cos(l / 2),
            o = c + g + $M.sin(m + l / 2) * g / $M.cos(l / 2),
            p = b + e - g + $M.cos(m + l) * g,
            q = c + g + $M.sin(m + l) * g,
            a.cTo(n, o, p, q),
            a.lTo(b + e, c + f - g),
            m += l,
            n = b + e - g + $M.cos(m + l / 2) * g / $M.cos(l / 2),
            o = c + f - g + $M.sin(m + l / 2) * g / $M.cos(l / 2),
            p = b + e - g + $M.cos(m + l) * g,
            q = c + f - g + $M.sin(m + l) * g,
            a.cTo(n, o, p, q),
            m += l,
            n = b + e - g + $M.cos(m + l / 2) * g / $M.cos(l / 2),
            o = c + f - g + $M.sin(m + l / 2) * g / $M.cos(l / 2),
            p = b + e - g + $M.cos(m + l) * g,
            q = c + f - g + $M.sin(m + l) * g,
            a.cTo(n, o, p, q),
            a.lTo(b + g, c + f),
            m += l,
            n = b + g + $M.cos(m + l / 2) * g / $M.cos(l / 2),
            o = c + f - g + $M.sin(m + l / 2) * g / $M.cos(l / 2),
            p = b + g + $M.cos(m + l) * g,
            q = c + f - g + $M.sin(m + l) * g,
            a.cTo(n, o, p, q),
            m += l,
            n = b + g + $M.cos(m + l / 2) * g / $M.cos(l / 2),
            o = c + f - g + $M.sin(m + l / 2) * g / $M.cos(l / 2),
            p = b + g + $M.cos(m + l) * g,
            q = c + f - g + $M.sin(m + l) * g,
            a.cTo(n, o, p, q),
            a.lTo(b, c + g),
            m += l,
            n = b + g + $M.cos(m + l / 2) * g / $M.cos(l / 2),
            o = c + g + $M.sin(m + l / 2) * g / $M.cos(l / 2),
            p = b + g + $M.cos(m + l) * g,
            q = c + g + $M.sin(m + l) * g,
            a.cTo(n, o, p, q),
            m += l,
            n = b + g + $M.cos(m + l / 2) * g / $M.cos(l / 2),
            o = c + g + $M.sin(m + l / 2) * g / $M.cos(l / 2),
            p = b + g + $M.cos(m + l) * g,
            q = c + g + $M.sin(m + l) * g,
            a.cTo(n, o, p, q),
            d.mc2d.fill(),
            a.stroke()
          } else a.beginPath().mTo(b, c).lTo(b + e, c).lTo(b + e, c + f).lTo(b, c + f).lTo(b, c).fill().stroke()
          return this
        },
        a.beginPath().mTo(0, 0).stroke(),
        d.mc = a,
        a
      }
    return f()
  },
  $
}())

export default $
