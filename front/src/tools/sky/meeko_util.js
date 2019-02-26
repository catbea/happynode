/* eslint-disable */

import $ from './meeko_cp_ori'

$.Util = {}
$.Util.ajax = function (v) { // 使用发送ajax请求来获取数据
  var _u, _p, _f, _c, _m, _ifcc, _ifCross = $.global.ifCross, _onSuc, _onErr, _args = arguments[0]
  _u = _args['url']; _p = _args['args']; _f = _args['cbFn']; _c = _args['ifCache']; _m = _args['method']; _ifcc = _args['ifCheckCookie']; _onSuc = _args['onSuccess']; _onErr = _args['onError']
  _u = _u || $.global.imgPath + 'meeko.aspx'; _p = _p || ''; _f = _f || {}; _c = _c || 0; _m = _m || 'POST'; _ifcc = (_ifcc == null ? true : _ifcc)
  if ($.global.ifCheckCookie && _ifcc && !$.ck.get('SESSIONID')) { MTips.show('操作超时, 请重新登陆!', 'warn'); setTimeout(function () { window.location.href = 'index.html' }, 2000); return }
  _p = $.Util.toArgsString(_p)
  _onSuc = _onSuc || _f.onSuccess || function () { }
  _onErr = _onErr || _f.onError || function () { }
  if (!_p) { return }
  var url = _u, p = _p, _cu = _u + _p, _v = $.aCache.get(_cu) // _ct: 缓存时间, 默认是0不缓存; _cu: 缓存地址值
  var _info = { 'url': _u, 'param': _p, 'method': _m, 'ifCross': _ifCross, 'cacheKey': _cu, 'cacheTime': _c, 'cacheUrl': _cu, 'startTime': $.time() }
  if (_v) { _onSuc({ data: _v, info: _info }); return }
  var _now = new Date(), _rand = _now.date8() + _now.getHours() + _now.getMinutes() + _now.getSeconds()
  p += '&clienttime=' + _rand + '&clientkey=' + $.ck.get('SESSIONID') || ''
  if (_ifCross) { url = $.global.imgPath + 'script/ajaxCross.asp'; p = 'url=' + escape(_u + '?' + p) }
  if (!$.global.ajaxObjPool) { $.global.ajaxObjPool = new $.Util.XHRObjPool() }
  $.global.ajaxObjPool.getXHR().request(url, p, {
    onSuccess: function (data) {
      data = data.replaceAll('\u0000', '&').replaceAll('"[', '[').replaceAll(']"', ']')
      var _dataAry = data.split('\u0003'), _rStr = _dataAry[0]
      _info['endTime'] = $.time()
      if (_rStr.toLow() == 'errorinfo=0') {
        _dataAry.shift()
        if (_c) { _info['cacheData'] = _dataAry; $.aCache.push(_cu, _dataAry, _c) }
        _onSuc({ data: _dataAry, info: _info, get: function (idx) { return _dataAry[idx] } })
      } else {
        _onErr({ data: data.split('=')[1], info: _info })
      }
    },
    onError: function (d) { _onErr({ data: d, info: _info }) }
  }, _m)
}

$.Math = {}
$.Math.toDecimal = function (x) {
  // 保留两位小数
  // 功能：将浮点数四舍五入，取小数点后2位
  var f = parseFloat(x)
  if (isNaN(f)) { return }
  f = Math.round(x * 100) / 100
  return f
}
$.Math.toDecimal2 = function (x) {
  // 制保留2位小数，如：2，会在2后面补上00.即2.00
  var f = parseFloat(x)
  if (isNaN(f)) { return false }
  var f = Math.round(x * 100) / 100
  var s = f.toString()
  var rs = s.indexOf('.')
  if (rs < 0) { rs = s.length; s += '.' }
  while (s.length <= rs + 2) { s += '0' }
  return s
}
$.Math.fomatFloat = function (src, pos) { return Math.round(+src * Math.pow(10, pos)) / Math.pow(10, pos) }

$.Util.XHRObjPool = function (j) {
  var me = this, _j = j || {}
  var _ary = [], _max = _j.max || 5
  function addXHR () {
    var _xhr = new $.Util.XHR()
    _ary.push(_xhr)

    return _xhr
  }
  me.getXHR = function () {
    var _xhr = null
    for (var i = 0; i < _ary.length; i++) {
      var _xhrTemp = _ary[i], _ifRun = _xhrTemp.getState()
      if (!_ifRun) { _xhr = _xhrTemp; break }
    }
    if (!_xhr) { _xhr = addXHR() }
    return _xhr
  }
  me.getLength = function () { return _ary.length }
}

$.Util.XHR = function (url, args, cbFn, method) {
  var me = this, XHR, ifRun = false
  me.getR = function () {
    if (!window.ActiveXObject) return new XMLHttpRequest()
    var e = 'MSXML2.XMLHTTP', t = ['Microsoft.XMLHTTP', e, e + '.3.0', e + '.4.0', e + '.5.0', e + '.6.0'], _len = t.length
    for (var n = _len - 1; n > -1; n--) {
      try { return new ActiveXObject(t[n]) } catch (r) { continue }
    }
  }
  XHR = me.getR()
  me.bindFn = function (f, args) { return function () { return f.apply(me, args) } }
  me.stateChange = function () {
    if (XHR.readyState == 4) {
      var e = XHR.status, t = XHR.responseText
      var _onSucc = arguments[0], _onErr = arguments[1], _timeoutID = arguments[2]
      if (e >= 400 && e < 500) { _onErr('Clinet Error,' + e); return }
      if (e >= 500) { _onErr('Server Error,' + e); return }
      if (e == 200) { _onSucc(t) } else { _onErr(t) }
      clearInterval(_timeoutID)
      ifRun = false
      return t
    }
  }
  me.getState = function () { return ifRun }
  me.request = function (url, args, cbFn, method) {
    if (ifRun) { return }
    ifRun = true
    var _url = url || '', _args = args || '', _f = cbFn || {}, _m = method || 'POST'
    var _onSucc = _f.onSuccess || function () { }, _onErr = _f.onError || function () { }, _onTO = _f.onTimeout || function () { }
    var _timeoutFn = setTimeout(function () { XHR.abort(); clearInterval(_timeoutFn); _onErr('Timeout'); _onTO() }, 2e4)
    if (_m == 'POST') {
      XHR.open('POST', _url, 1)
      XHR.onreadystatechange = me.bindFn(me.stateChange, [_onSucc, _onErr, _timeoutFn])
      XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      XHR.send(_args)
    } else {
      XHR.open('GET', _url + '?' + _args, 1)
      XHR.onreadystatechange = me.bindFn(me.stateChange, [_onSucc, _onErr, _timeoutFn])
      XHR.send(null)
    }
  }
  if (arguments.length) { me.request(url, args, cbFn, method) }
  return me
}

$.Util.initArgs = function (oArgs, nArgs) {
  var _args = oArgs || {}
  for (var i in nArgs) {
    if (_args[i] == null) {
      _args[i] = nArgs[i]
    } else {
      if (i == 'p' || i == 'pBody') {
        _args[i] = $(_args[i])
      }
    }
  }
  return _args
}

$.Util.initUI = function (j) {
  var _sObj = $.Util.initArgs(j, { args: {}, struct: {} }),
    _coms = {},
    _args = _sObj.args,
    _p = j.p || _sObj.struct.p
  var _initCom = function (p, obj) {
    obj = obj || {}
    var _name = obj.name,
      _cArgs = _args[_name],
      _comType = obj.type
    if (!_name || !_cArgs || !_comType) { return }
    if (_comType == 'Container') {
      _coms[_name] = p.adElm('', 'div').cn(_cArgs.cn || '').css(_cArgs.css || '').h(_cArgs.html || '');
      return
    }
    _cArgs.p = p
    var _com = new $.UI[_comType](_cArgs)
    _coms[_name] = _com
    switch (_comType) {
      case 'Tab':
        if (obj.items) {
          var _items = obj.items, _iLen = _items.length
          for (var _ii = 0; _ii < _iLen; _ii++) { _initCom(_com.items[_ii].Body, _items[_ii]) }
        }
        break
      case 'Accordion':
        if (obj.items) {
          var _items = obj.items, _iLen = _items.length
          for (var _ii = 0; _ii < _iLen; _ii++) { _initCom(_com.items[_ii].owner, _items[_ii]) }
        }
        break
      default:
        for (var k in obj) {
          var _val = obj[k], _vType = $.getType(_val), _pTemp = _com[k]
          if (_vType == 'object' && !_val.h) { _initCom(_pTemp, _val) }
          if (_vType == 'array') { for (var _ci = 0, _cLen = _val.length; _ci < _cLen; _ci++) { _initCom(_pTemp, _val[_ci]) } }
        }
        break
    }
  }
  _initCom(_p, _sObj.struct)
  return _coms
}

$.Util.filter = function (str, filterObj) {
  var _specialChar = [
    // ['"', '&quot;'],
    ['\r\n', '<br>'],
    ['&', '\u0000'],
    ['\r', '<br>'],
    ['\n', '<br>']
  ]
  var _fObj = filterObj || _specialChar, _str = str
  if (_str == null) { return '' }
  if (!_str.replaceAll) { return _str }
  if ($.getType(_fObj) == 'array') {
    for (var i = 0, _iLen = _fObj.length; i < _iLen; i++) {
      var _char = _fObj[i]
      _str = _str.replaceAll(_char[0], _char[1])
    }
  } else {
    for (var i in _fObj) { _str = _str.replaceAll(i, _fObj[i]) }
  }
  return _str
}

$.Util.objClone = function (source) {
  if ($.getType(source) == 'object' && source.h == null) {
    return $.JSON.decode($.JSON.encode(source))
  }
}

$.Util.toArgsObj = function (argsStr) {
  if (typeof argsStr === 'object') { return argsStr }
  var _kvAry = argsStr.split('&'), _len = _kvAry.length, _kv = {}
  for (var i = 0; i < _len; i++) { var _sAry = _kvAry[i].split('='); _kv[_sAry[0]] = _sAry[1] }
  return _kv
}

$.Util.toArgsString = function (argsObj) {
  var _type = $.getType(argsObj), _kvAry = [], _sArgs = ''
  switch (_type) {
    case 'string':
      _sArgs = argsObj
      break
    case 'object':
      for (var k in argsObj) { _kvAry.push(k + '=' + argsObj[k]) };
      _sArgs = _kvAry.join('&')
      break
    case 'array':
      _sArgs = argsObj.join('&')
      break
  }
  return _sArgs
}

$.Util.url2Obj = function () {
  var _location = window.location, _obj = {}, _pathAry = _location.pathname.split('/'), _search = _location.search, _args = _search.substring(1, _search.length).split('&'), _paraObj = {}
  for (var i = 0, _len = _args.length; i < _len; i++) { var _kv = _args[i].split('='); _paraObj[_kv[0]] = _kv[1] }
  _obj['host'] = _location.host
  _obj['hostname'] = _location.hostname
  _obj['filename'] = _pathAry.pop()
  _obj['path'] = _location.host + _pathAry.join('/')
  _obj['location'] = _location
  _obj['parameters'] = _paraObj
  _obj['getParameter'] = function (key) { return _paraObj[key] }
  return _obj
}

$.Util.uniqueArray = function (ary) {
  var _a = [], _b = {}, _l = ary.length, i, _c = 0
  for (i = 0; i < _l; i++) { var _d = ary[i]; if (_d) { _b[_d] = 1 } }
  for (var e in _b) { _a[_c] = e; _c++ }
  return _a
}

$.Util.Q = function (j) {
  var me = this, _j = j || {}, _fn = function () { }
  var a = [], sat = 0, delay = _j.delay
  var _onFinish = _j.onFinish || function () { console.log('end') }
  var ifStop = false
  if (delay == null) { delay = 2000 }
  function exec (cbFn) {
    var obj = a.shift(), _cf = cbFn || _fn
    if (!obj) { return }
    var _f = obj.f || _fn, _args = obj.args || []
    _f.apply(_f, _args)
    if (_cf() != false) { me.next() }
  }
  me.push = function (o) { a.push(o); return me }
  me.go = function (cbFn) {
    if (sat == 1 || !a.length) { return me }
    sat = 1; exec(cbFn); return me
  }
  me.remove = function (v) { a.re(v); return me }
  me.next = function (cbFn, ifRestart) {
    var _irs = ifRestart || false
    if (_irs) { sat = 1 }
    if (ifStop || !sat) { return me }
    if (!a.length) { sat = 0; _onFinish(me); return me }
    if (delay) { setTimeout(function () { exec(cbFn) }, delay) } else { exec(cbFn) }
    return me
  }
  me.stop = function () { ifStop = true; return me }
  me.start = function () { ifStop = false; me.next(); return me }
  me.len = function () { return a.length }
  me.clear = function () { a.clear(); return me }
  return me
}

$.Util.code = {
  intval: function (val) {
    var type = typeof (val)
    if (type == 'string') {
      val = val.replace(/[^0-9-.]/g, '')
      val = parseInt(val * 1, 10)
      return isNaN(val) || !isFinite(val) ? 0 : val
    }
    return type == 'number' && isFinite(val) ? Math.floor(val) : 0
  },
  code128: {
    encoding: ['11011001100', '11001101100', '11001100110', '10010011000', '10010001100', '10001001100', '10011001000', '10011000100', '10001100100', '11001001000', '11001000100', '11000100100', '10110011100', '10011011100', '10011001110', '10111001100', '10011101100', '10011100110', '11001110010', '11001011100', '11001001110', '11011100100', '11001110100', '11101101110', '11101001100', '11100101100', '11100100110', '11101100100', '11100110100', '11100110010', '11011011000', '11011000110', '11000110110', '10100011000', '10001011000', '10001000110', '10110001000', '10001101000', '10001100010', '11010001000', '11000101000', '11000100010', '10110111000', '10110001110', '10001101110', '10111011000', '10111000110', '10001110110', '11101110110', '11010001110', '11000101110', '11011101000', '11011100010', '11011101110', '11101011000', '11101000110', '11100010110', '11101101000', '11101100010', '11100011010', '11101111010', '11001000010', '11110001010', '10100110000', '10100001100', '10010110000', '10010000110', '10000101100', '10000100110', '10110010000', '10110000100', '10011010000', '10011000010', '10000110100', '10000110010', '11000010010', '11001010000', '11110111010', '11000010100', '10001111010', '10100111100', '10010111100', '10010011110', '10111100100', '10011110100', '10011110010', '11110100100', '11110010100', '11110010010', '11011011110', '11011110110', '11110110110', '10101111000', '10100011110', '10001011110', '10111101000', '10111100010', '11110101000', '11110100010', '10111011110', '10111101110', '11101011110', '11110101110', '11010000100', '11010010000', '11010011100', '11000111010'],
    getDigit: function (code) {
      var tableB = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"
      var result = ''
      var sum = 0
      var isum = 0
      var i = 0
      var j = 0
      var value = 0
      for (i = 0; i < code.length; i++) {
        if (tableB.indexOf(code.charAt(i)) == -1) return ('')
      }
      var tableCActivated = code.length > 1
      var c = ''
      for (i = 0; i < 3 && i < code.length; i++) {
        c = code.charAt(i)
        tableCActivated &= c >= '0' && c <= '9'
      }
      sum = tableCActivated ? 105 : 104
      result = this.encoding[sum]
      i = 0
      while (i < code.length) {
        if (!tableCActivated) {
          j = 0
          while ((i + j < code.length) && (code.charAt(i + j) >= '0') && (code.charAt(i + j) <= '9')) j++
          tableCActivated = (j > 5) || ((i + j - 1 == code.length) && (j > 3))
          if (tableCActivated) {
            result += this.encoding[99]
            sum += ++isum * 99
          }
        } else if ((i == code.length) || (code.charAt(i) < '0') || (code.charAt(i) > '9') || (code.charAt(i + 1) < '0') || (code.charAt(i + 1) > '9')) {
          tableCActivated = false
          result += this.encoding[100]
          sum += ++isum * 100
        }
        if (tableCActivated) {
          value = $.Util.code.intval(code.charAt(i) + code.charAt(i + 1))
          i += 2
        } else {
          value = tableB.indexOf(code.charAt(i))
          i += 1
        }
        result += this.encoding[value]
        sum += ++isum * value
      }
      result += this.encoding[sum % 103]
      result += this.encoding[106]
      result += '11'
      return (result)
    }
  },
  FullDate: function () {
    var _val = '', _now = new Date(), _h = _now.getHours(), _m = _now.getMinutes(), _s = _now.getSeconds()
    _h = _h < 10 ? ('0' + _h) : _h
    _m = _m < 10 ? ('0' + _m) : _m
    _s = _s < 10 ? ('0' + _s) : _s
    _val = _now.date8() + _h + _m + _s
    return _val
  }
}

$.Util.formatImage = function (img, w, h) {
  var image = new Image()
  image.src = img.src
  var _width = image.width, _height = image.height
  image.width = w
  image.height = h
  return
  if (_width > 0 && _height > 0) {
    var _r1 = _width / _height, _r2 = w / h
    console.log([_r1, _r2])
    if (_r1 >= _r2) {
      if (_width > w) {
        img.width = w
        img.height = (_height * w) / _width
      }
    } else {
      img.width = _width
      img.height = _height
    }
  } else {
    if (_height > h) {
      img.height = h
      img.width = (_width * h) / _height
    } else {
      img.width = _width
      img.height = _height
    }
  }
}

$.Util.loadJS = function (url, callback, part) {
  var _part = part || 'body', _fn = callback || function () { }
  var _stAry = document.getElementsByTagName('script')
  for (var i = 0, _sLen = _stAry.length; i < _sLen; i++) { if (_stAry[i].src == url) { _fn(); return } }
  var eDom = document.getElementsByTagName(_part).item(0)
  var script = document.createElement('script')
  script.onload = script.onreadystatechange = script.onerror = function () {
    if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) { return }
    script.onload = script.onreadystatechange = script.onerror = null
    script.src = ''
    // if (script) { script.parentNode.removeChild(script); }
    script = null
    _fn()
  }
  /*
    if (script.readyState) {
        script.onreadystatechange = function () { if (script.readyState == "loaded" || script.readyState == "complete") { script.onreadystatechange = null; _fn(); } };
    } else {
        script.onload = _fn;
    } */
  script.type = 'text/javascript'
  script.charset = 'utf-8'
  script.src = url
  try { eDom.appendChild(script) } catch (e) { }
}

$.Util.include = function (url, callback) {
  if (!url) { return }
  var _fn = callback || function () { }
  switch ($.getType(url)) {
    case 'array':
      var _suc = 0, _len = url.length
      for (var i = 0; i < _len; i++) { $.Util.loadJS(url[i], function () { _suc++; if (_suc == _len) { try { _fn() } catch (e) { }; } }) }
      break
    case 'string':
      $.Util.loadJS(url, _fn)
      break
  }
}

$.Util.loadCSS = function (url, fn) {
  var eDom = document.getElementsByTagName('head').item(0), _fn = fn || function () { }
  var link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'Stylesheet'
  link.href = url
  if (link.readyState) {
    link.onreadystatechange = function () {
      if (link.readyState == 'loaded' || link.readyState == 'complete') { link.onreadystatechange = null; _fn() }
    }
  } else {
    link.onload = _fn
  }
  eDom.appendChild(link)
}

$.Util.unloadJS = function () {

}

$.Util.unloadCSS = function () {

}

$.Util.HashTree = function (j) {
  var me = this, hash = {}
  var rootAry = []
  var key
  var STATE = {
    'not_exist': '不存在',
    'exist': '已经存在',
    'key_error': 'key数据类型错误',
    'args_error': '参数类型错误',
    'delete_error': '删除未知错误',
    'delete_succ': '删除成功',
    'append_args_error': '追加对象方法参数错误'
  }
  me.hashObjs = hash
  me.rootAry = rootAry
  me.id_name = {}
  function init (j) {
    var _j = j || {}, _ds = _j.dataSrc || []
    key = _j.key
    if (_ds.length) { me.arrayToTree(_ds, key) }
  }
  me.isExist = function (o) { // 返回值: 存在 object, 不存在  not_exist  参数错误  args_error
    var d, _type = typeof o
    if (_type == 'string') {
      d = hash[o]
      if (d) { return d } else { return STATE.not_exist }
    }
    if (_type == 'object') {
      var _name = o[key]
      d = hash[_name]
      if (d) { return d } else { return STATE.not_exist }
    }
    debug.error('$.Util.HashTree -- args_error')
    return STATE.args_error
  }
  me.push = function (o) {
    var d = me.isExist(o)
    if (d == STATE.not_exist) {
      var _name = o[key]
      hash[_name] = { pre: '', next: '', obj: o, key: _name }
      return hash[_name]
    }
    return d
  }
  /* --------old version--------
    me.arrayToTree = function (dataSrc, KEY) {
        var _ds = dataSrc || [], _len = _ds.length, _k = KEY || 'name';
        if (!_len) { return; }
        me.reset();
        key = _k;
        for (var i = 0; i < _len; i++) {
            var obj = _ds[i];
            me.push(obj);
            me.id_name[obj.id] = obj[_k];
        }
        for (var h in hash) {
            var hObj = hash[h], _obj = hObj.obj, _pid = +_obj.pid;
            var _name = me.id_name[_pid];
            if (_name) {
                hash[h].pre = _name.trim();
                hash[_name].next = hash[_name].next.trim().ac(_obj[_k]);
            } else {
                rootAry.push(_obj[_k]);
            }
        }
        return { hashObjs: hash, rootAry: rootAry };
    } */

  me.arrayToTree = function (dataSrc, KEY) {
    var _ds = dataSrc || [], _len = _ds.length, _k = KEY || 'name', rootID
    if (!_len) { return }
    me.reset()
    key = _k
    for (var i = 0; i < _len; i++) {
      var obj = _ds[i]
      if (!rootID) { rootID = obj.pid }
      if (obj.pid < rootID) { rootID = obj.pid }
      me.push(obj)
      me.id_name[obj.id] = obj[_k]
    }
    for (var i = 0; i < _len; i++) { var obj = _ds[i]; if (rootID == obj.pid) { rootAry.push(obj[_k]) } }
    for (var h in hash) {
      var hObj = hash[h], _obj = hObj.obj, _pid = +_obj.pid
      var _name = me.id_name[_pid]
      if (_name) {
        hash[h].pre = _name.trim()
        hash[_name].next = hash[_name].next.trim().ac(_obj[_k])
      }
    }
    return { hashObjs: hash, rootAry: rootAry }
  }

  me.hashObjToTree = function (rootAry, hashObj) {
    var _rAry = rootAry || [], _hash = hashObj || {}
    var _treeObj = {}
    var traveTree = function (obj, preObj) {
      var _next = obj.next
      if (_next) {
        var _nextAry = _next.split(' '), _len = _nextAry.length
        for (var ii = 0; ii < _len; ii++) {
          var _strNext = _nextAry[ii], _nextObj = _hash[_strNext]
          if (!_nextObj) { continue }
          if (_nextObj.next) {
            preObj[_strNext] = { obj: _nextObj, next: {} }
            traveTree(_nextObj, preObj[_strNext].next)
          } else {
            preObj[_strNext] = _nextObj
          }
        }
      }
    }
    for (var i = 0; i < _rAry.length; i++) {
      var _idx = _rAry[i], _obj = _hash[_idx]
      _treeObj[_idx] = { obj: _obj, next: {} }
      traveTree(_obj, _treeObj[_idx].next)
    }
    return _treeObj
  }

  me.reset = function () {
    me.hashObjs = hash = {}
    me.rootAry = rootAry = []
    me.id_name = {}
  }

  me.appendTo = function (o1, o2) {
    var d1 = me.push(o1)
    switch (d1) {
      case STATE.exist:
        var _d2 = me.isExist(o2) // 树形操作
        if (_d2 != STATE.not_exist && _d2 != args_error) {
          var _name1 = o1.obj[key], _name2 = _d2[key]
          hash[_name1].pre = _name2
          hash[_name2].next = hash[_name2].next.ac(_name1)
        }
        break
      case STATE.args_error:
        break
      default:
        var _d2 = me.isExist(o2)
        if (_d2 != STATE.not_exist && _d2 != args_error) {
          var _name2 = _d2[key]
          d1.pre = _name2
          hash[_name2].next = hash[_name2].next.ac(d1.obj[key])
        }
        break
    }
    return d1
  }

  me.remove = function (o) {
    var b = me.isExist(o)
    if (b == STATE.not_exist) {
      return '删除项' + STATE.not_exist
    } else {
      var _obj = b.obj, _name = _obj[key], _pre = b.pre, _next = b.next
      if (_pre) {
        var _aPre = _pre.split(' '), _preLen = _aPre.length
        for (var i = 0; i < _preLen; i++) {
          var _preName = _aPre[i], _hObj = hash[_preName]
          if (_hObj) {
            _hObj.next = _hObj.next.dc(_preName).toString()
          }
        }
      }
      if (_next) {
        console.log(_next + ' :next')
      }
      hash[_name] = null
      return STATE.delete_succ
    }
    return b
  }
  init(j)
  return me
}

$.Util.printer = function (objs) {
  var me = this
  me.printObj = null
  me.print = function () {
    var objs = me.printObj, _chs = objs.childNodes, _chsLen = _chs.length
    var title = $D.title || '表格打印'
    var html = "<!DOCTYPE html><html><head charset='gb2312'><title>" + title + '</title>'
    var style = $D.getElementsByTagName('style'), _len = style.length
    for (var i = 0; i < _len; i++) {
      html += "<style type='text/css'>" + style[i].innerHTML + '</style>'
    }
    var link = $D.getElementsByTagName('link'), _len = link.length
    for (var i = 0; i < _len; i++) {
      html += link[i].outerHTML
    }
    html += "<style media=print>.Noprint{display:none;}.PageNext{page-break-after: always;}</style></head><body><div class='wp hp'>"
    for (var k = 0; k < _chsLen; k++) {
      var _node = _chs[k], _nodeType = _node.nodeType
      if (_nodeType == 3) {
        html += _node.nodeValue
      } else {
        html += _node.outerHTML
      }
    }
    html += "</div><input type='button' class='Noprint' style='position:absolute;top:10px;right:50px;width:80px;' value='打印' onclick='window.print();'></body></html>"
    var _screenWH = $.wh(), _w = _screenWH[0] * 2, _h = _screenWH[1] * 2
    var s = window.open('about:blank', '', 'height=' + _w + ', width=' + _w + ', top=50, left=30, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no')
    var sd = s.document
    sd.open()
    sd.write(html)
    sd.close()
  }
  function init (objs) {
    me.printObj = objs
    if (window.HTMLElement) {
      HTMLElement.prototype.__defineSetter__('outerHTML', function (sHTML) {
        var r = this.ownerDocument.createRange()
        r.setStartBefore(this)
        var df = r.createContextualFragment(sHTML)
        this.parentNode.replaceChild(df, this)
        return sHTML
      })
      HTMLElement.prototype.__defineGetter__('outerHTML', function () {
        var attr
        var attrs = this.attributes
        var str = '<' + this.tagName.toLowerCase()
        for (var i = 0; i < attrs.length; i++) {
          attr = attrs[i]
          if (attr.specified) { str += ' ' + attr.name + '="' + attr.value + '"' }
        }
        if (!this.canHaveChildren) { return str + '>' }
        return str + '>' + this.innerHTML + '</' + this.tagName.toLowerCase() + '>'
      })
      HTMLElement.prototype.__defineGetter__('canHaveChildren', function () {
        switch (this.tagName.toLowerCase()) {
          case 'area':
          case 'base':
          case 'basefont':
          case 'col':
          case 'frame':
          case 'hr':
          case 'img':
          case 'br':
          case 'input':
          case 'isindex':
          case 'link':
          case 'meta':
          case 'param':
            return false
        }
        return true
      })
    }
  }
  init(objs)
}

$.Util.namespace = function () {
  var A = arguments, E = null, C, B, D
  for (C = 0; C < A.length; C = C + 1) {
    D = A[C].split('.')
    E = {}
    for (B = 0; B < D.length; B = B + 1) {
      E[D[B]] = E[D[B]] || {}
      E = E[D[B]]
    }
  }
  return E
}

$.Util.layerManager = function () {

}

$.Util.locationFix = function () {

}

$.Util.Date = function () {
  var me = this
  var now = new Date() // 当前日期
  var nowDayOfWeek = (now.getDay() == 0) ? 7 : now.getDay() - 1 // 今天是本周的第几天。周一=0，周日=6
  var nowDay = now.getDate() // 当前日
  var nowMonth = now.getMonth() // 当前月值（1月=0，12月=11）
  var nowMonReal = now.getMonth() + 1 // 当前月实际数字
  var nowYear = now.getFullYear() // 当前年
  // 日期+天
  function AddDays (d, n) {
    var t = new Date(d) // 复制并操作新对象，避免改动原对象
    t.setDate(t.getDate() + n)
    return t
  }

  // 日期+月。日对日，若目标月份不存在该日期，则置为最后一日
  function AddMonths (d, n) {
    var t = new Date(d)
    t.setMonth(t.getMonth() + n)
    if (t.getDate() != d.getDate()) { t.setDate(0) }
    return t
  }

  // 日期+年。月对月日对日，若目标年月不存在该日期，则置为最后一日
  function AddYears (d, n) {
    var t = new Date(d)
    t.setFullYear(t.getFullYear() + n)
    if (t.getDate() != d.getDate()) { t.setDate(0) }
    return t
  }

  // 获得本季度的开始月份
  me.getQuarterStartMonth = function () {
    if (nowMonth <= 2) { return 0 } else if (nowMonth <= 5) { return 3 } else if (nowMonth <= 8) { return 6 } else { return 9 }
  }

  // 周一
  me.getWeekStartDate = function () {
    return AddDays(now, -nowDayOfWeek)
  }

  // 周日。本周一+6天
  me.getWeekEndDate = function () {
    return AddDays(me.getWeekStartDate(), 6)
  }

  // 月初
  me.getMonthStartDate = function () {
    return new Date(nowYear, nowMonth, 1)
  }

  // 月末。下月初-1天
  me.getMonthEndDate = function () {
    return AddDays(AddMonths(me.getMonthStartDate(), 1), -1)
  }

  // 季度初
  me.getQuarterStartDate = function () {
    return new Date(nowYear, me.getQuarterStartMonth(), 1)
  }

  // 季度末。下季初-1天
  me.getQuarterEndDate = function () {
    return AddDays(AddMonths(me.getQuarterStartDate(), 3), -1)
  }
}

export default $
