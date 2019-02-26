/* eslint-disable */
/* "use strict"; */

import $ from './meeko_cp_ori'

$.UI = {}
$.View = {}
/** ******************************框架全局变量 ---- Begin **********************************************/
$.global = {
  popElm: null,
  resizeToolDiv: null,
  popTips: null,
  arrowTips: null,
  ifDebug: true,
  ifCross: false,
  origTitle: $D.title,
  imgPath: '../',
  serverUrl: '../meeko.aspx',
  rSplit: '\u0001',
  cSplit: '\u0002',
  reSplit: '\u0003',
  ifCtrl: false,
  ifCheckCookie: true,
  dbType: 'MSSQL',
  setServerUrl: function (url) { $.global.serverUrl = url; return $.global },
  setImgPath: function (path) {
    $.global.imgPath = path
    return path
  },
  getImgPath: function () { return $.global.imgPath },
  getDBType: function () { return $.global.dbType },
  setIfDebug: function (v) {
    if (v) {
      $D.title = $.global.origTitle + ':' + $('') + '(' + $.wh()[0] * 2 + '*' + $.wh()[1] * 2 + ')'
    } else {
      $D.title = $.global.origTitle
    }
    $.global.ifDebug = v
  },
  setDBType: function (v) { $.global.dbType = v; return $.global },
  setIfCross: function (v) { $.global.ifCross = v; return $.global }
}

// 等本文件执行完
setTimeout(function () {
  if (!window.KeyBinder) {
    window.KeyBinder = new $.key.bind($D)
    window.KeyBinder.addKey([17, 18, 77], 77, 1, function () {
      if (!window.debug) { $.global.setImgPath('../') }
      var debug = window.debug, _vis = debug.visible
      if (_vis) { debug.hide() } else { debug.show() };
    })
  }
  if (!window.MConfirm) { window.MConfirm = new $.UI.PopTips({ type: 'confirm', y: 120, icon: 'icon-glyph-question-sign', ifShow: false, ifMask: true }) }
  if (!window.MTips) { window.MTips = new $.UI.PopTips({ type: 'tips', ifShow: false }) }
  if (!window.MiniTips) { window.MiniTips = new $.UI.MiniTips({ ifShow: false, dir: 'top', css: 'padding:3px 5px;border:1px solid #FFC97C;background-color:#FFFEC9;z-index:25;max-width:320px;' }) }
  if (!window.ValidateTips) {
    window.ValidateTips = new $.UI.MiniTips({
      ifShow: false,
      css: 'padding:3px 5px;border:1px solid #FFC97C;color:#E52C01;background-color:#FFFEC9;z-index:2500;'
    })
  }
  if (!window.trace) { window.trace = function (v) { if (isIE) { alert(v) } else { console.log(v) } } }
  // $.global.setIfDebug(true);
  $D.evt('click', function (e) {
    $.UI.DestroyPopElm('body--click')
  }).evt('mousemove', function (e) {
    var e = $.e.fix(e), _e = e.t, _sMTips = _e.attr('MTips') || ''
    if (+_sMTips == 1) { _sMTips = _e.h() || _e.value }
    if (_sMTips) {
      MiniTips.setText(_sMTips).setPos(e.clientX - 15, e.clientY + 25).show()
    } else {
      MiniTips.hide()
    }
  })
  $(window).evt('resize', function () { $.UI.DestroyPopElm('window--resize'); if ($.global.arrowTips) { $.global.arrowTips.remove(); $.global.arrowTips = null }; if (ValidateTips) { ValidateTips.hide() } })
  if (isIE) {
    if (!window.debug) { $.global.setImgPath('../') }
    window.console = window.debug
  } else {
    // window.console
  }
})
/** ******************************框架全局变量 ---- End **********************************************/
/** ******************************lxw ---- Begin **********************************************/
$.NameSpace = function (S) {
  var A = S.split('.'), A1 = A[0], obj = window[A1]
  if (!obj) { obj = {}; window[A1] = obj }
  for (var i = 1, _iLen = A.length; i < _iLen; i++) { var T = A[i]; if (!obj[T]) { obj[T] = {}; obj = obj[T] }; }
  return obj
}
$.initArrowTips = function (obj, css) {
  if ($.global.arrowTips) { $.global.arrowTips.remove(); $.global.arrowTips = null } // F1F3F4
  var _css = css || 'width:915px;height:520px;padding:5px 10px 5px 10px;'
  $.global.arrowTips = new $.UI.PopDialog({ p: $DB, ePop: obj.Owner, ifClose: true, arrowBBC: '#FFF', css: _css })
  $.global.arrowTips.get('owner').dc('oh')
  return $.global.arrowTips
}
Function.prototype.extend = function (superClass) {
  switch (typeof superClass) {
    case 'function': // 类式继承
      this.prototype = superClass.prototype // 设置原型对象
      this.prototype.constructor = this // 设置构造函数指向自己
      this.SuperClass = superClass // 同时，添加一个指向父类构造函数的引用，方便调用父类方法或者调用父类构造函数
      break
    case 'object': // 方法的扩充, 如果原型对象不存在这个属性，则复制
      var attr = this.prototype
      for (var k in superClass) { if (attr[k] == null) { attr[k] = superClass[k] } }
      break
    default:
      // throw new Error('fatal error:"Function.prototype.extend" expects a function or object');
      break
  }
  return this
}
/** ******************************lxw ---- End **********************************************/
$.UI.bgPic = function (s) {
  return 'background:url(' + s + ") no-repeat center fixed;-moz-background-size:cover;background-size:cover;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + s + "',sizingMethod='scale');"
}

$.UI.gra = function (a, b, w, t) {
  var ie, webkit, ff
  if (t == 1) {
    ie = '1'; webkit = 'left top,right top'; ff = '0'
  } else {
    ie = '0'; webkit = 'left top,left bottom'; ff = '-90'
  }
  return 'border:' + (w || 0) + 'px solid ' + a + ';background:' + a + ';' + (isIE ? 'filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=' + ie + ", StartColorStr='" + a + "', EndColorStr='" + b + "');" : 'background-image: linear-gradient(bottom, ' + a + ' 0%, ' + b + ' 100%);background-image: -o-linear-gradient(top,' + a + ', ' + b + ');background-image: -moz-linear-gradient(' + ff + 'deg, ' + a + ',' + b + ');background-image: -webkit-gradient(linear,' + webkit + ', from(' + a + '), to(' + b + ') );background-image: -ms-linear-gradient(top, ' + a + ' 0%, ' + b + ' 100%);')
}

/** ****$.UI组件 begin******/
$.UI.Select = function (j) {
  /*
    {
    type: "Select",
    desc: "选择项组件, 分单选(Radio)和多选(CheckBox)",
    args: {
    name: { desc: '在Select组中唯一标识的名称', defVal: '', dataType:'string' },
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    enabled: { desc: '是否启用', defVal: true, dataType: 'bool' },
    checked: { desc: '是否选中', defVal: false, dataType: 'bool' },
    type: { desc: 'Select类型: CheckBox, Radio', defVal: 'CheckBox', dataType: 'string', comType: 'Radios', sons: [{ value: 'CheckBox', text: 'CheckBox' },{ value: 'Radio', text: 'Radio' }] },
    text: { desc: '显示文本', defVal:'', dataType: 'string' },
    value: { desc: '真正的Value值', defVal: '', dataType: 'string' },
    cn: { desc:'Select结构最外一层的类名(Class-Name)',defVal: '', dataType: 'string' },
    css: { desc:'Select结构最外一层的样式(Style)',defVal: '', dataType: 'string' },
    onCheck:{ desc: '回调选中事件', defVal: function (){}, dataType: 'function' },
    onClick:{ desc: '回调单机事件', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _fn = function () { }
  var owner, eText, eImg, eCheck
  var args = { p: $DB, name: 'select', enabled: true, cn: '', css: '', type: 'CheckBox', text: '', value: '', checked: false, onCheck: _fn, onClick: _fn }
  var argsDesc = {}
  function setDefault (j) { args = $.Util.initArgs(j, args); if (args.type != 'CheckBox' && args.type != 'Radio') { args.type = 'CheckBox' } }
  function layout () {
    owner = args.p.adElm('', 'div').cn('Select ' + args.type + ' ' + args.cn).css(args.css).h('<a><span class="normal"></span></a><span></span>')
    owner.onselectstart = function () { return false }
    eCheck = owner.fc(); eText = eCheck.ns(); eImg = eCheck.fc()
    me.setEnabled(args.enabled)
    me.setText(args.text)
    me.setValue(args.value)
    if (args.checked) { me.setChecked(args.checked) }
  }
  function bindEvent () {
    owner.evt('mousedown', function (e) {
      var e = $.e.fix(e), _e = e.t; e.stop()
      eCheck.dc('select-checked select-normal select-disabled').ac('select-focus')
    }).evt('mouseup', function (e) {
      var e = $.e.fix(e), _e = e.t; e.stop()
      if (!me.getEnabled()) { return }
      if (args.type == 'CheckBox') { me.setChecked(!me.getChecked()) }
      args.onClick(me)
    })
  }
  me.getText = function () { return args.text }
  me.setText = function (v) { eText.h(v); args.text = v; return me }
  me.getValue = function () { return args.value }
  me.setValue = function (v) { args.value = v; return me }
  me.getEnabled = function () { return args.enabled }
  me.setEnabled = function (v) {
    if (v == null) { v = true }
    if (v) { eImg.dc('select-disabled').ac('select-normal') } else { eImg.dc('select-normal').ac('select-disabled') }
    eCheck.dc('select-focus select-checked')
    args.enabled = v
  }
  me.getChecked = function () { return args.checked }
  me.setChecked = function (v, ifExec) {
    if (!args.enabled) { return }
    if (v == null) { v = true }
    if (v) { eImg.dc('select-normal').ac('select-checked') } else { eImg.dc('select-checked').ac('select-normal') }
    eCheck.dc('select-focus select-disabled')
    args.checked = v
    if (ifExec != false) { args.onCheck({ Self: me, IfChecked: v, Type: args.type, Text: args.text, Value: args.value }) }
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.ColorSelector = function (j) {
  var me = this, _fn = function () { }
  var owner
  var args = { p: $DB, value: '#76f317', onChange: _fn }
  var eventListeners = [], rgb, hsv
  var preP, inputP, allP, allColorImg, allSelectorImg, satP, satValImg, crossImg
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    myAddEventListener(window, 'unload', cleanupEventListeners)
    owner = args.p.adElm('', 'div').cn('ColorSelector')
    owner.h('<div class="scolor1"><img class="img1" src="images/color/sv.png" /><img class="img2" src="images/color/crosshairs.png" /></div><div class="scolor2"><img class="img1" src="images/color/h.png" /><img class="img2" src="images/color/position.png" /></div><div class="scolor3"><span></span><input type="text" class="color-value" value="#FFFF00" /></div>')
    satP = owner.fc(); satValImg = satP.fc(); crossImg = satValImg.ns()
    allP = satP.ns(); allColorImg = allP.fc(); allSelectorImg = allColorImg.ns()
    preP = allP.ns().fc(); inputP = preP.ns()
    trackDrag(satP, satValDragged); trackDrag(allP, allDragged)
    me.setValue(args.value)
  }
  function bindEvent () { }
  function colorChanged () {
    var hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    var hueRgb = hsvToRgb(hsv.h, 1, 1)
    var hueHex = rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b)
    preP.css('background-color:' + hex + ';')
    inputP.value = hex
    satP.css('background-color:' + hex + ';')
    crossImg.css('left:' + ((hsv.v * 199) - 10).toString() + 'px;top:' + (((1 - hsv.s) * 199) - 10).toString() + 'px;')
    allSelectorImg.css('top:' + ((hsv.h * 199) - 5).toString() + 'px;')
    args.onChange({ ColorSelector: me, value: hex })
  }
  function rgbChanged () { hsv = rgbToHsv(rgb.r, rgb.g, rgb.b); colorChanged() }
  function hsvChanged () { rgb = hsvToRgb(hsv.h, hsv.s, hsv.v); colorChanged() }
  function satValDragged (x, y) { hsv.s = 1 - (y / 199); hsv.v = (x / 199); hsvChanged() }
  function allDragged (x, y) { hsv.h = y / 199; hsvChanged() }
  me.setValue = function (value) { rgb = hexToRgb(value, { r: 0, g: 0, b: 0 }); rgbChanged() }
  function hexToRgb (hex_string, default_) {
    if (default_ == undefined) { default_ = null };
    if (hex_string.substr(0, 1) == '#') { hex_string = hex_string.substr(1) };
    var r, g, b
    if (hex_string.length == 3) {
      r = hex_string.substr(0, 1); r += r
      g = hex_string.substr(1, 1); g += g
      b = hex_string.substr(2, 1); b += b
    } else if (hex_string.length == 6) {
      r = hex_string.substr(0, 2)
      g = hex_string.substr(2, 2)
      b = hex_string.substr(4, 2)
    } else {
      return default_
    }
    r = parseInt(r, 16); g = parseInt(g, 16); b = parseInt(b, 16)
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return default_
    } else {
      return { r: r / 255, g: g / 255, b: b / 255 }
    }
  }

  function rgbToHex (r, g, b, includeHash) {
    if (includeHash == undefined) { includeHash = true }
    r = Math.round(r * 255).toString(16)
    g = Math.round(g * 255).toString(16)
    b = Math.round(b * 255).toString(16)
    if (r.length == 1) { r = '0' + r }
    if (g.length == 1) { g = '0' + g }
    if (b.length == 1) { b = '0' + b }
    return ((includeHash ? '#' : '') + r + g + b).toUpperCase()
  }

  function hsvToRgb (hue, saturation, value) {
    var red, green, blue
    if (value == 0.0) {
      red = 0; green = 0; blue = 0
    } else {
      var i = Math.floor(hue * 6)
      var f = (hue * 6) - i
      var p = value * (1 - saturation)
      var q = value * (1 - (saturation * f))
      var t = value * (1 - (saturation * (1 - f)))
      switch (i) {
        case 1: red = q; green = value; blue = p; break
        case 2: red = p; green = value; blue = t; break
        case 3: red = p; green = q; blue = value; break
        case 4: red = t; green = p; blue = value; break
        case 5: red = value; green = p; blue = q; break
        case 6: // fall through
        case 0: red = value; green = t; blue = p; break
      }
    }
    return { r: red, g: green, b: blue }
  }

  function rgbToHsv (red, green, blue) {
    var max = Math.max(Math.max(red, green), blue)
    var min = Math.min(Math.min(red, green), blue)
    var hue
    var saturation
    var value = max
    if (min == max) {
      hue = 0; saturation = 0
    } else {
      var delta = (max - min)
      saturation = delta / max
      if (red == max) {
        hue = (green - blue) / delta
      } else if (green == max) {
        hue = 2 + ((blue - red) / delta)
      } else {
        hue = 4 + ((red - green) / delta)
      }
      hue /= 6
      if (hue < 0) { hue += 1 }
      if (hue > 1) { hue -= 1 }
    }
    return { h: hue, s: saturation, v: value }
  }

  function fixPNG (myImage) {
    var arVersion = navigator.appVersion.split('MSIE')
    var version = parseFloat(arVersion[1])
    if ((version >= 5.5) && (version < 7) && (document.body.filters)) {
      var _css = myImage.style.cssText + ';fontSize:0;width:' + myImage.width.toString() + 'px;height:' + myImage.height.toString() + 'px;display:inline-block'
      return $DB.adElm(myImage.id, 'span').cn(myImage.className).attr('title', myImage.title).css().attr('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader' +
                                        "(src=\'" + myImage.src + "\', sizingMethod='scale')")
    } else {
      return myImage.cloneNode(false)
    }
  }

  function pageCoords (node) {
    var x = node.offsetLeft
    var y = node.offsetTop
    var parent = node.offsetParent
    while (parent != null) {
      x += parent.offsetLeft
      y += parent.offsetTop
      parent = parent.offsetParent
    }
    return { x: x, y: y }
  }

  function trackDrag (node, handler) {
    function fixCoords (x, y) {
      var nodePageCoords = pageCoords(node)
      x = (x - nodePageCoords.x) + document.documentElement.scrollLeft
      y = (y - nodePageCoords.y) + document.documentElement.scrollTop
      if (x < 0) x = 0
      if (y < 0) y = 0
      if (x > node.offsetWidth - 1) x = node.offsetWidth - 1
      if (y > node.offsetHeight - 1) y = node.offsetHeight - 1
      return { x: x, y: y }
    }
    function mouseDown (ev) {
      var coords = fixCoords(ev.clientX, ev.clientY)
      var lastX = coords.x
      var lastY = coords.y
      handler(coords.x, coords.y)

      function moveHandler (ev) {
        var coords = fixCoords(ev.clientX, ev.clientY)
        if (coords.x != lastX || coords.y != lastY) {
          lastX = coords.x
          lastY = coords.y
          handler(coords.x, coords.y)
        }
      }
      function upHandler (ev) {
        myRemoveEventListener(document, 'mouseup', upHandler)
        myRemoveEventListener(document, 'mousemove', moveHandler)
        myAddEventListener(node, 'mousedown', mouseDown)
      }
      myAddEventListener(document, 'mouseup', upHandler)
      myAddEventListener(document, 'mousemove', moveHandler)
      myRemoveEventListener(node, 'mousedown', mouseDown)
      if (ev.preventDefault) ev.preventDefault()
    }
    myAddEventListener(node, 'mousedown', mouseDown)
    node.onmousedown = function (e) { return false }
    node.onselectstart = function (e) { return false }
    node.ondragstart = function (e) { return false }
  }
  function findEventListener (node, event, handler) {
    var i
    for (i in eventListeners) {
      if (eventListeners[i].node == node && eventListeners[i].event == event &&
         eventListeners[i].handler == handler) {
        return i
      }
    }
    return null
  }
  function myAddEventListener (node, event, handler) {
    if (findEventListener(node, event, handler) != null) {
      return
    }

    if (!node.addEventListener) {
      node.attachEvent('on' + event, handler)
    } else {
      node.addEventListener(event, handler, false)
    }

    eventListeners.push({ node: node, event: event, handler: handler })
  }

  function removeEventListenerIndex (index) {
    var eventListener = eventListeners[index]
    delete eventListeners[index]

    if (!eventListener.node.removeEventListener) {
      eventListener.node.detachEvent('on' + eventListener.event,
        eventListener.handler)
    } else {
      eventListener.node.removeEventListener(eventListener.event,
        eventListener.handler, false)
    }
  }

  function myRemoveEventListener (node, event, handler) {
    removeEventListenerIndex(findEventListener(node, event, handler))
  }

  function cleanupEventListeners () {
    var i
    for (i = eventListeners.length; i > 0; i--) {
      if (eventListeners[i] != undefined) {
        removeEventListenerIndex(i)
      }
    }
  }

  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.RoleSelector = function (j) {
  /*
    {
    type: "RoleSelector",
    desc: "用户选择组件",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    ids: { desc: '当前角色的id数组集合', defVal: [], dataType:'array' },
    uids: { desc: '当前角色的角色名数组集合', defVal: [], dataType: 'array' }
    }
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, ids: [], pid: 3, whereSql: null }
  var owner, roles = [], ids = [], rids = [], _selAll
  function setDefault (j) { args = $.Util.initArgs(j, args); ids = args.ids }
  function layout () { owner = args.p.adElm('', 'div'); loadRoles(owner) }
  function loadRoles (p) {
    var _wSql = args.whereSql || ''
    if (!_wSql) { _wSql = '{"pid": ' + args.pid + '}' }
    $.Util.ajax({
      args: 'm=SYS_CM_USERS&action=getAllDepts&dataType=json&keyFields=id as value,nodeName as text&jsonCondition=' + _wSql,
      onSuccess: function (obj) {
        var _dAry = eval(obj.get(0) || '[]')
        p.h(''); roles = []
        _selAll = new $.UI.Select({ p: p, text: '全选', value: 0, type: 'CheckBox', cn: 'ml3', onCheck: onAllCheck })
        for (var i = 0, _dLen = _dAry.length; i < _dLen; i++) {
          var _d = _dAry[i]; _d.p = p; _d.type = 'CheckBox'; _d.cn = 'ml3'; _d.onCheck = onAllCheck
          roles.push(new $.UI.Select(_d))
        }
        me.setRoles(ids)
      }
    })
  }

  function onAllCheck (obj) {
    var _ifChecked = obj.IfChecked
    if (+obj.Value) {
      if (_ifChecked) { ids.push(obj.Value); rids.push(obj.Text) } else { ids.re(obj.Value); rids.re(obj.Text) }
    } else {
      ids = []; rids = []
      for (var i = 0, _len = roles.length; i < _len; i++) {
        var _r = roles[i]; _r.setChecked(_ifChecked, false)
        if (_ifChecked) { ids.push(_r.getValue()); rids.push(_r.getText()) }
      }
    }
  }
  me.setRoles = function (roleids) {
    var _ids = {}, _count = 0, _rLen = roles.length
    ids = []; rids = []
    for (var i = 0, _len = roleids.length; i < _len; i++) { if (roleids[i]) { _ids[roleids[i]] = true } }
    for (var i = 0; i < _rLen; i++) {
      var _r = roles[i], _val = _r.getValue()
      if (_ids[_val]) { _r.setChecked(true); _count++ } else { _r.setChecked(false) }
    }
    if (!_selAll) { return }
    if (_count && _count == _rLen) { _selAll.setChecked(true, false) } else { _selAll.setChecked(false, false) }
  }
  me.getRoles = function () { return [ids, rids] }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.SingleUserSelector = function (j) {
  var me = this, _fn = function () { }
  var args = { p: $DB, id: null, onSelect: _fn }
  var owner, currA
  var _tHtml = '<div class="fl wp ha"></div><div class="SingleUserPanel"></div>'
  var _iAry = [
    { name: 'letter', text: '按字母', icon: 'icon-glyph-font', content: _tHtml },
    { name: 'dept', text: '按部门', icon: 'icon-glyph-inbox', content: _tHtml }
  ]
  var _letAry = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], _LBtnAry = []
  function setDefault (j) {
    args = $.Util.initArgs(j, args)
    for (var i = 0, _lLen = _letAry.length; i < _lLen; i++) { var _l = _letAry[i]; _LBtnAry.push({ name: _l, text: _l, type: 'tab' }) }
  }
  function layout () {
    owner = new $.UI.Tab({ p: args.p, items: _iAry, ifFixedBodyHeight: false })
    var _eLet = owner.items['letter'].Body, _eDept = owner.items['dept'].Body
    var _eLBtn = _eLet.fc(), _eLUser = _eLBtn.ns()
    var _eDBtn = _eDept.fc(), _eDUser = _eDBtn.ns()
    loadBtn(_eLBtn, _eLUser, _LBtnAry, 'letter'); loadDept(_eDBtn, _eDUser)
  }
  function loadDept (_eDBtn, _eDUser) {
    $.Util.ajax({
      args: 'm=SYS_CM_USERS&action=getAllDepts&keyFields=id as name,nodeName as text,uids as uids, \'tab\' as type&dataType=json',
      onSuccess: function (data) {
        var _dAry = eval(data.get(0) || '[]')
        loadBtn(_eDBtn, _eDUser, _dAry, 'dept')
      }
    })
  }
  function loadBtn (_eBtn, _eUser, _items, _tab) {
    var _bs = new $.UI.ButtonSet({ p: _eBtn, items: _items, itemSkin: 'Button-letter', onClick: function (obj) { onBtnClick(obj, _eUser, _tab) } })
    if (_tab == 'letter') { _bs.fireClick(0) }
  }
  function onBtnClick (obj, eUser, tab) {
    var _name = obj.Name, _args = 'm=SYS_CM_USERS&action=getUsersNoPaging&keyFields=id,uid&dataType=json', _sWhere = ''
    if (isNaN(+_name)) {
      if (_name == 'selAll') {
        var _tAry, _ifCheck = obj.Button.get('ifPress')
        if (tab == 'dept') { _tAry = _uDept } else { _tAry = _uLetter }
        for (var _u = 0, _uLen = _tAry.length; _u < _uLen; _u++) { _tAry[_u].setChecked(_ifCheck) }
        return
      }
      if (_name != 'ALL') { _sWhere = '&jsonCondition={"pinYin":"' + _name + '"}' }
    } else {
      _sWhere = '&jsonCondition={"id,in":"0' + obj.Button.get('uids') + '0"}'
    }
    $.Util.ajax({
      args: _args += _sWhere,
      onSuccess: function (data) {
        var _dAry = eval(data.get(0) || '[]'), _dLen = _dAry.length, _u, _eU
        eUser.h('')
        for (var i = 0; i < _dLen; i++) {
          _u = _dAry[i]
          _eU = eUser.adElm('', 'A').h(_u.uid).attr('v', _u.id).attr('t', _u.uid)
          _eU.evt('click', function (e) {
            var e = $.e.fix(e), _e = e.t
            if (currA == _e) { return }
            if (currA) { currA.dc('sel') }
            currA = _e; _e.ac('sel')
            args.id = _e.attr('v')
            args.onSelect({ Self: me, Value: _e.attr('v'), Text: _e.attr('t') })
            e.stop()
          })
          if (args.id && +args.id == +_u.id) {
            if (currA) { currA.dc('sel') }
            currA = _eU; _eU.ac('sel')
            args.onSelect({ Self: me, Value: _u.id, Text: _u.uid })
          }
        }
      }
    })
  }
  me.getUser = function () { return args.id }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.UserSelector = function (j) {
  /*
    {
    type: "UserSelector",
    desc: "用户选择组件",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    ids: { desc: '当前用户的id数组集合', defVal: [], dataType:'array' }
    }
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, ids: [] }
  var owner
  var _tHtml = '<div class="fl wp ha"></div><div class="fl wp ha"></div>'
  var _iAry = [
    { name: 'letter', text: '按字母', icon: 'icon-glyph-font', content: _tHtml },
    { name: 'dept', text: '按部门', icon: 'icon-glyph-inbox', content: _tHtml }
  ]
  var _letAry = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  var _LBtnAry = [], users = [], currBtnSet, ids = [], uids = [], _uLetter = [], _uDept = []
  function setDefault (j) {
    args = $.Util.initArgs(j, args); ids = args.ids
    for (var i = 0, _lLen = _letAry.length; i < _lLen; i++) { var _l = _letAry[i]; _LBtnAry.push({ name: _l, text: _l, type: 'tab' }) }
    _LBtnAry.push({ name: 'selAll', text: '全选', type: 'toggle' })
  }
  function layout () {
    owner = new $.UI.Tab({ p: args.p, items: _iAry, ifFixedBodyHeight: false })
    var _eLet = owner.items['letter'].Body, _eDept = owner.items['dept'].Body
    var _eLBtn = _eLet.fc(), _eLUser = _eLBtn.ns()
    var _eDBtn = _eDept.fc(), _eDUser = _eDBtn.ns()
    loadBtn(_eLBtn, _eLUser, _LBtnAry, 'letter'); loadDept(_eDBtn, _eDUser)
  }
  function loadDept (_eDBtn, _eDUser) {
    $.Util.ajax({
      args: 'm=SYS_CM_USERS&action=getAllDepts&keyFields=id as name,nodeName as text,uids as uids, \'tab\' as type&dataType=json',
      onSuccess: function (data) {
        var _dAry = eval(data.get(0) || '[]')
        _dAry.push({ name: 'selAll', text: '全选', type: 'toggle' })
        loadBtn(_eDBtn, _eDUser, _dAry, 'dept')
      }
    })
  }
  function loadBtn (_eBtn, _eUser, _items, _tab) {
    var _bs = new $.UI.ButtonSet({ p: _eBtn, items: _items, itemSkin: 'Button-letter', onClick: function (obj) { onBtnClick(obj, _eUser, _tab) } })
    if (_tab == 'letter') { _bs.fireClick(0) }
  }
  function onBtnClick (obj, eUser, tab) {
    var _name = obj.Name, _args = 'm=SYS_CM_USERS&action=getUsersNoPaging&keyFields=id,uid&dataType=json', _sWhere = ''
    if (isNaN(+_name)) {
      if (_name == 'selAll') {
        var _tAry, _ifCheck = obj.Button.get('ifPress')
        if (tab == 'dept') { _tAry = _uDept } else { _tAry = _uLetter }
        for (var _u = 0, _uLen = _tAry.length; _u < _uLen; _u++) { _tAry[_u].setChecked(_ifCheck) }
        return
      }
      if (_name != 'ALL') { _sWhere = '&jsonCondition={"pinYin":"' + _name + '"}' }
    } else {
      _sWhere = '&jsonCondition={"id,in":"0' + obj.Button.get('uids') + '0"}'
    }
    $.Util.ajax({
      args: _args += _sWhere,
      onSuccess: function (data) {
        var _dAry = eval(data.get(0) || '[]'), _dLen = _dAry.length
        users = []; eUser.h(''); currBtnSet = obj.ButtonSet
        for (var i = 0; i < _dLen; i++) {
          var _user = _dAry[i]
          users.push(new $.UI.Select({ p: eUser, type: 'CheckBox', cn: 'ml3', css: 'min-width:75px;', text: _user.uid, value: _user.id, onCheck: onCheckBoxClick }))
        }
        if (tab == 'dept') { _uDept = users } else { _uLetter = users }
        me.setUsers(ids)
      }
    })
  }

  function onCheckBoxClick (o) {
    var _check = o.IfChecked, _cId = o.Value, _cUid = o.Text
    if (_check) { ids.push(_cId); uids.push(_cUid) } else { ids.re(_cId); uids.re(_cUid) }
  }

  me.setUsers = function (ids) {
    var _ids = {}, _count = 0, _uLen = users.length
    for (var i = 0, _len = ids.length; i < _len; i++) { if (ids[i]) { _ids[ids[i]] = true } }
    for (var l = 0; l < _uLen; l++) {
      var _u = users[l], _val = +_u.getValue()
      if (_ids[_val]) { _u.setChecked(true); _count++ } else { _u.setChecked(false) }
    }
    if (!currBtnSet) { return me }
    if (_count && _count == _uLen) { currBtnSet.setChecked('selAll', true) } else { currBtnSet.setChecked('selAll', false) }
  }
  me.getUsers = function () { return [ids, uids] }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.PopDialog = function (j) {
  /*
    {
    type: "PopDialog",
    desc: "弹出对话框组件",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    ifFixedHeight: { desc: '弹出容器是否固定高度', defVal: false, dataType: 'bool' },
    skin: { desc: '皮肤样式(类名)', defVal: 'PopTips-default', dataType:'string' },
    ePop: { desc: '弹出框依附的元素', defVal: null, dataType: 'DOM' },
    ifClose: { desc: '是否可关闭', defVal: false, dataType: 'bool' },
    cn: { desc:'PopDialog结构最外一层的类名(Class-Name)',defVal: '', dataType: 'string' },
    css: { desc:'PopDialog结构最外一层的样式(Style)',defVal: '', dataType: 'string' }
    }
    }
    */
  var me = this, _fn = function () { }
  var owner, scrollBar, com, temp, _dx = 16, mask
  var args = { p: $DB, ifFixedHeight: false, skin: 'PopTips-default', arrowBC: '#CCC', ifMask: false, arrowBBC: '#FFF', ePop: null, cn: '', css: '', ifClose: false }
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    owner = args.p.adElm('', 'div').cn(args.skin + ' ' + args.cn).css('left:0px;top:0px;' + args.css).evt('click', function (e) { var e = $.e.fix(e); e.stop() })
    owner.onselectstart = function () { return false }
    scrollBar = new $.UI.ScrollBar({ p: owner, ifFixedHeight: args.ifFixedHeight })
    scrollBar.evt('onResize', function (obj) {
      var _ePop = args.ePop, h = obj.pH, w = obj.pW
      if (_ePop && h) {
        var _pos = _ePop.pos(), _x = _pos.x, _y = _pos.y, _h = _pos.h
        var _popOwnerP = args.p.pos()
        var _newX = _x - _popOwnerP.x + 1, _newY = _y - _popOwnerP.y + _h
        var _w_wh = $.wh(), _ww = _w_wh[0] * 2, _wh = _w_wh[1] * 2
        var _aw = w + _x, _ah = h + _y + _h + 5
        if (_ah > _wh) { _newY = _y - h - _h + 11 }
        if (_aw > _ww) { _newX = _x - w + _pos.w - 22; _dx = owner.csn('width') - 25 }
        if (_newY < 0) { _newY = 0 }
        if (_newX < 0) { _newX = 0 }
        me.setPos(_newX, _newY, _pos)
      }
    })
    args.owner = owner
    if (args.ifClose) { owner.adElm('', 'a').cn('pt-close').attr('title', '关闭').evt('click', function () { me.hide(); $.UI.DestroyPopElm('--PopTips-Close') }) }
    if (args.ifMask) { mask = new $.UI.Mask({ p: $DB, alpha: 10, onClick: function () { mask.remove(); mask = null; me.remove() } }); owner.css('z-index:11;') }
  }
  function _init (j) { setDefault(j); layout(); return me }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { com.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.show = function () { owner.dc('vh'); return me }
  me.hide = function () { owner.ac('vh'); if (temp) { temp.r() }; args.p.ac('zm').dc('zm'); me.clearHTML(false); return me }
  me.remove = function () { owner.r(); if (temp) { temp.r() }; me = null }
  me.init = function (j, ifReturnCom) { com = scrollBar.addElm(j); if (ifReturnCom) { return com } return me }
  me.html = function (sHtml) { scrollBar.html(sHtml); return me }
  me.clearHTML = function (ifClearStyle) { if ((ifClearStyle == null ? true : ifClearStyle)) { owner.style.cssText = '' } scrollBar.html(''); if (temp) { temp.r() }; return me }
  me.resize = function (j) { if (temp) { temp.r() }; scrollBar.initBar(); return me }
  me.setPos = function (x, y, pos) {
    var _dir = 'top'
    if (!temp) { temp = args.p.adElm('', 'div').cn('w16 h16 pa').css('z-index: 1001;') }
    if (y > pos.y) {
      _dir = 'top'
      y += owner.csn('padding-top')
      temp.css('top:' + (y - 14) + 'px;left:' + (x + (+_dx)) + 'px;')
    } else {
      _dir = 'bottom'
      y -= owner.csn('padding-bottom')
      temp.css('top:' + (y + owner.csn('height') + 13) + 'px;left:' + (x + (+_dx)) + 'px;')
    }
    owner.css('left:' + x + 'px;top:' + y + 'px;')
    new $.UI.Arrow({ p: temp, diff: 1, comMode: 'border', borderColor: args.arrowBC, backgroundColor: args.arrowBBC, cn: 'cp', css: 'padding:3px 5px;border:1px solid #FFC97C;background-color:#FFFEC9;z-index:25;max-width:320px;', dir: _dir })
    return me
  }
  me.css = function (css) { owner.css(css); return me }
  me.getPos = function () { return owner.pos() }
  _init(j)
  return me
}

$.UI.KeyPanel = function (j) {
  /*
    {
        type: "KeyPanel",
        desc: "键盘面板",
        args: {
            p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
            keys: { desc: '键值', defVal: '1,2,3,C,4,5,6,←,7,8,9,-,0,.', dataType:'string' },
            disabledKeys: { desc: '不启用的键', defVal: '', dataType: 'DOM' },
            onKeyClick: { desc: '回调每个键的Click事件', defVal: function (){}, dataType: 'function' }
        }
    }
    */
  var me = this, _fn = function () { }
  var owner
  var args = { p: $DB, keys: '1,2,3,C,4,5,6,←,7,8,9,-,0,.', disabledKeys: '', onKeyClick: _fn }
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    owner = args.p.adElm('', 'div').cn('KeyPanel')
    owner.appendChild(toHtml())
    owner.evt('mousedown', function (e) { var e = $.e.fix(e), _e = e.t; e.stop(); if (!_e.attr('title')) { args.onKeyClick({KeyPanel: me, _e: _e}) } })
    owner.onselectstart = function () { return false }
  }
  function toHtml () {
    var aNum = args.keys.split(','), _nNum = $.m.p(Math.sqrt(aNum.length) + 1)
    var sObj = {}, _dKeys = args.disabledKeys.split(',')
    for (var i = 0, _len = _dKeys.length; i < _len; i++) { sObj[_dKeys[i]] = 1 }
    var _w = args.p.csn('width') / _nNum - 10, _h = args.p.csn('height') / _nNum - 5
    var fg = $Fg(), _css = 'height:{0}px;line-height:{0}px;width:{1}px;'
    aNum.ec(function (i) {
      var _v = this[i]
      var _key = fg.adElm('', 'a').h(_v).css(_css.format(_h, _w))
      if (sObj[_v]) { _key.ac('disabled').attr('title', 'disabled') }
    })
    return fg
  }
  me.resize = function () { owner.h('').appendChild(toHtml()); return me }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.FormItem = function (j) {
  var me = this, owner, args, evtHandler, eInput, eHead, eBody
  me.next = null
  me.pre = null
  me.doms = null
  function setDefault (j) { args = $.UI.FormItem.initArgs(j.comType, j); args.self = me; me.type = args.comType; me.name = args.name }
  function layout () {
    var _h = $.UI.FormItem.getHtml(args), _p = args.p, _domType = 'div'
    var _idx = (args.index == null ? -1 : args.index)
    switch (_idx) {
      case -1:
        owner = _p.adElm('', _domType)
        break
      case 0:
        owner = _p.abElm('', _domType)
        break
      default:
        var _et = _p.chn(_idx)
        if (_et) { owner = _et.bbElm('', _domType) } else { owner = _p.adElm('', _domType) }
    }
    owner.cn('FormItem ' + args.cn).css(args.css).h(_h)
    evtHandler = new $.UI.FormItem.EventHandler(owner, args)
    me.doms = evtHandler.doms
    eHead = me.doms.eHead; eBody = me.doms.eBody
    eInput = me.doms.eInput
    me.setVisibled(args.visibled)
    me.setEnabled(args.enabled)
    setValue(args.value); setText(args.text)
    me.setTitle(args.title)
    me.setIfReq(args.req)
  }
  me.focus = function () {
    if (me.type == 'RichText') { args.RichText.focus() }
    if (eInput && !args.readonly) { eInput.focus() } else { evtHandler.fireClick() }
    return me
  }
  me.blur = function () {
    if (me.type == 'RichText') { args.RichText.blur() };
    if (eInput) { eInput.blur() }
    return me
  }
  me.select = function (start, end) {
    if (!eInput) { return me }
    var _len = eInput.value.length
    if (start == null) { start = 0 };
    if (end == null) { end = _len }
    if (isIE) {
      var range = document.selection.createRange()
      range.moveStart('character', start)
      range.moveEnd('character', end)
      range.select()
    } else {
      eInput.selectionStart = start
      eInput.selectionEnd = end
    }
    return me
  }
  me.check = function () { return evtHandler.checkItem() }
  me.reset = function (b) {
    var _dT = args.defText
    switch (me.type) {
      case 'RichText': me.setData(_dT, _dT); break
      case 'Label': me.setData(_dT, _dT); break
      case 'FileUploader': args.eFiles.h(''); args.text = ','; args.value = ','; break
      case 'MultiSelect':
      case 'UserSelector': eBody.fc().h(','); break
      case 'SingleUserSelector': eBody.fc().h(''); break
      case 'Select': me.setValue(_dT); break
      case 'Radios':
      case 'CheckBox': me.setValue(_dT); break
      case 'ScanCode': args.ScanCode.setValue(_dT); break
    }
    if (eInput) { eInput.dc('input-error input-ok input-disabled').ac('input-normal'); eInput.value = args.defText }
    return me
  }
  me.setTitle = function (v) { if (eHead) { eHead.attr('title', v); if (v.length > 6) { v = v.substr(0, 6) + '..' }; eHead.h(v) } }
  me.setEnabled = function (v) {
    if (v != null && v == args.enabled) { return me }
    args.enabled = v
  }
  me.getEnabled = function () { return args.enabled }
  me.getVisibled = function () { return args.visibled }
  me.setVisibled = function (v) {
    if (v == null) { v = true }
    if (v) { owner.show() } else { owner.hide() }
    args.visibled = v
    return me
  }
  me.setIfReq = function (v) {
    if (eHead) { if (v) { eHead.abElm('', 'span').cn('req').attr('title', '必填').h('*') } else { eHead.dc('c_6').css('') } }
    // if (eBody) { if (v) { eBody.ac('req'); } else { eBody.dc('req'); } }
    args.req = v
  }
  function setValue (v) {
    if (v == null) { return me }
    args.value = v
    if (eInput && !args.ifSpecial) { eInput.value = v }
    if (!v) { v = args.defValue }
    switch (me.type) {
      case 'Radios':
        for (var i = 0, _rLen = args.RadioAry.length; i < _rLen; i++) {
          var _radio = args.RadioAry[i], _rVal = _radio.getValue()
          if (_rVal == v || +_rVal == +v) { evtHandler.fireClickRadio(_radio, false); break }
        }
        break
      case 'CheckBox':
        var _sAry = v.split(',')
        for (var i = 0, _cLen = _sAry.length; i < _cLen; i++) {
          var _sVal = _sAry[i]
          if (_sVal) { args.CheckBoxs[_sVal].setChecked(true) }
        }
        break
    }
    return me
  }

  function setText (v) {
    if (v == null) { return me }
    args.text = v
    switch (me.type) {
      case 'Label':
        switch (args.type) {
          case 'image':
            var _eImg = eBody.fc()
            if (v.indexOf('/') == -1 && v.indexOf('/') == -1) { v = 'images/avatar/' + v }
            _eImg.src = v
            _eImg.attr('alt', v)
            break
          case 'text':
            if (args.ifShowAll) { eBody.h('<div class="label">' + v + '</div>'); return me }
            if (v.len() > 20) {
              var _sAry = v.split(args.splitChar)
              for (var _s = 0, _sLen = _sAry.length; _s < _sLen; _s++) { _sAry[_s] = _sAry[_s] + '\n' }
              v = v.substr(0, 20).trim() + '...<span class="label-help" title="' + _sAry.join('') + '"></span>'
            }
            eBody.h('<div class="label">' + v + '</div>')
            break
        }
        break
      case 'SingleUserSelector':
      case 'UserSelector':
      case 'MultiSelect':
        eBody.fc().h(v)
        break
      case 'IconSelector':
        eBody.fc().cn(v + ' FI-IconSelector')
        break
      case 'RichText':
        args.RichText.html(v)
        break
      case 'Json':
        args.Json.load(v)
        break
      case 'ScanCode':
        args.ScanCode.setValue(v)
        break
      case 'FileUploader':
        args.instanceId = v
        var _eFiles = args.eFiles; _eFiles.h('')
        $.Util.ajax({
          args: { m: 'SYS_CM_FILES', action: 'getFilesByLink', link: v, dataType: 'json', jsonCondition: '{"type": 1}' },
          onSuccess: function (obj) {
            var _aVal = eval(obj.get(0) || '[]'), _aLen = _aVal.length
            for (var i = 0; i < _aLen; i++) {
              var _fObj = _aVal[i], _fName = _fObj.nodeName, _txt = _fName
              if (_txt.length > 25) { _txt = _txt.substr(0, 25) + '...' }
              var _eFile = _eFiles.adElm('', 'a').h('<span class="download"></span><span MTips=' + _fName + '>' + _txt + '</span><span class="del" MTips="删除文件" fid="' + _fObj.id + '"></span>').attr('target', '_self').attr('href', 'Module/SYS_CM_FILES.aspx?action=downloadFile&id=' + _fObj.id)
              $(_eFile.lastChild).evt('click', function (e) { var e = $.e.fix(e), _e = e.t; e.stop(); if (_e.tagName == 'SPAN' && _e.className == 'del') { me.delFile(_e) } })
            }
          }
        })
        break
      case 'Radios':
        for (var i = 0, _rLen = args.RadioAry.length; i < _rLen; i++) {
          var _radio = args.RadioAry[i], _rVal = _radio.getText()
          if (_rVal == v || +_rVal == +v) { evtHandler.fireClickRadio(_radio, false); break }
        }
        break
      default:
        if (eInput) { eInput.value = v.toString() }
        break
    }
  }

  me.delFile = function (_e) {
    MConfirm.setWidth(350).show('确定删除该文件?').evt('onOk', function () { args.value = args.value.replaceAll(_e.attr('fid') + ',', ''); _e.pn().r(); me.set('isChange', true) })
  }
  me.setData = function (value, text, ifSetChange) {
    setValue(value); setText(text)
    if (ifSetChange != false) {
      if (args.readonly && eInput) {
        var _eDel = eBody.chn(2)
        if (!_eDel) { _eDel = eBody.adElm('', 'a').attr('title', '清空').cn('select-clear').evt('click', function () { setValue(''); setText(''); _eDel.hide() }) }
        _eDel.show()
      }
      ifSetChange = true
      args.onChange({ FormItem: me, Value: value, Text: text, Args: args, Name: args.name })
    }
    me.set('isChange', ifSetChange)
    return me
  }
  me.getValue = function () {
    switch (me.type) {
      case 'RichText':
        return args.RichText.html().replaceAll('\\', '\\\\')
      case 'Json':
        return $.JSON.encode(args.Json.getValue())
      case 'Timer':
        var _eLast = $(eBody.lastChild)
        return _eLast.ps().attr('value') + ' ' + _eLast.attr('hh') + ':' + _eLast.attr('mm') + ':00'
      default:
        if (args.ifSpecial || !eInput) { return (args.value == null ? '' : args.value) } else { return eInput.value }
    }
  }
  me.getText = function () {
    switch (me.type) {
      case 'RichText':
        return args.RichText.html().replaceAll('\\', '\\\\')
      case 'Json':
        return $.JSON.encode(args.Json.getValue())
      case 'Timer':
        var _eLast = $(eBody.lastChild)
        return _eLast.ps().value + ' ' + _eLast.attr('hh') + ':' + _eLast.attr('mm') + ':00'
      default:
        if (eInput) { return eInput.value } else { return args.text || '' }
    }
  }
  me.setValue = setValue; me.setText = setText
  me.toLabel = function (displayText) { }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { return me.setVisibled(true) }
  me.hide = function () { return me.setVisibled(false) }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.FormGroup = function (j) {
  /*
    {
    type: "FormGroup",
    desc: "Form中以组形式存在的一组FormItem的集合",
    args: {
    name: { desc: 'FormGroup在Form中唯一标识的名称', defVal: '', dataType:'string' },
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    width: { desc: 'FormGroup的宽度, 如果为null表示FormGroup的宽度将100%填充父容器', defVal: null, dataType: 'int' },
    items: { desc: 'FormItem项集合的数组', defVal: [], dataType: 'array' },
    idx: { desc: '在Form中FormGroup项的索引值', defVal: 0, dataType: 'int' },
    visibled: { desc: 'FormGroup是否可见', defVal: true, dataType: 'bool' },
    ifShowHead: { desc: '是否显示标题', defVal: true, dataType: 'bool' },
    skin: { desc: '皮肤样式class名', defVal:'FormGroup-gray', dataType: 'string' },
    icon: { desc: '标题上的图片名(对应icon.css中的图片样式类名-ClassName)', defVal: 'icon-glyph-list', dataType: 'string', comType:'IconSelector' },
    title:{ desc: '标题上的文字', defVal: 'FormGroup-Title', dataType: 'string' },
    cn: { desc:'FormGroup结构最外一层的类名(Class-Name)',defVal: '', dataType: 'string' },
    css: { desc:'FormGroup结构最外一层的样式(Style)',defVal: '', dataType: 'string' }
    }
    }
    */
  var me = this
  var owner, eTitle, eFI, count = new $.nCount()
  me.items = {}
  me.aItem = []
  var args = { p: $DB, width: null, items: [], name: '', idx: 0, visibled: true, ifShowHead: false, skin: 'FormGroup-gray', icon: '', title: 'FormGroup-Title', cn: '', css: '' }
  function setDefault (j) { args = $.Util.initArgs(j, args); me.name = args.name; me.idx = args.idx }
  function layout () {
    var _html = '<fieldset class="{0}"><legend><a class="{1} m3"></a><span class="fs12">{2}</span><a class="icon-glyph-chevron-down" expand="meeko" style="float:right; padding-right:5px;cursor:pointer;"></a></legend><div></div></fieldset>'
    _html = _html.format(args.skin, args.icon, args.title) // <a class="FG-icon-expand"></a>
    if (args.width) { args.css += 'width:' + args.width + 'px;' } else { args.css += 'width:100%;' }
    owner = args.p.adElm('', 'div').cn('FormGroup fl ' + args.cn).css(args.css).h(_html)
    eTitle = owner.fc().fc(); eFI = eTitle.ns()
    me.showHead(args.ifShowHead)
    me.setVisibled(args.visibled)
    for (var i = 0, _len = args.items.length; i < _len; i++) { me.addItem(args.items[i]) }
  }
  function bindEvent () {
    eTitle.evt('click', function (e) {
      var e = $.e.fix(e), _e = e.t
      if (_e.tagName == 'A' && _e.attr('expand')) {
        if (_e.className.trim() == 'icon-glyph-chevron-down') { _e.cn('icon-glyph-chevron-right'); eFI.hide() } else { _e.cn('icon-glyph-chevron-down'); eFI.show() }
      }
    })
  }
  me.addItem = function (j) {
    var _obj = j || {}, _item, _idx = count.getN()
    _obj.p = eFI
    if (_obj.comType == 'Select' && _obj.items) {
      var _v_t = {}, _iLen = _obj.items.length, _vObj
      for (var i = 0; i < _iLen; i++) { _vObj = _obj.items[i] || {}; _v_t[_vObj.value] = _vObj.text }
      _obj.VT = _v_t
    }
    _item = new $.UI.FormItem(_obj)
    _item.group = me
    me.items[_obj.name] = me.items[_idx] = _item
    me.aItem.push(_item)
    return _item
  }

  me.reLoad = function (ary) {
    me.items = {}; me.aItem = []
    var i, _iLen = ary.length
    for (i = 0; i < _iLen; i++) { me.addItem(ary[i]) }
  }

  me.collapse = function () { }
  me.expand = function () { }
  me.getVisibled = function () { return args.visibled }
  me.setVisibled = function (v) { if (v != null) { if (v) { owner.show() } else { owner.hide() }; args.visibled = v } return me }
  me.showHead = function (v) { if (v) { eTitle.show() } else { eTitle.hide() } return me }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { return me.setVisibled(true) }
  me.hide = function () { return me.setVisibled(false) }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.Form = function (j) {
  /*
    {
    type: "Form",
    desc: "From表单对象",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    icon: { desc: '标题上的图片名(对应icon.css中的图片样式类名-ClassName)', defVal: 'icon-glyph-list', dataType: 'string', comType:'IconSelector' },
    title:{ desc: '标题上的文字', defVal: 'FormGroup-Title', dataType: 'string' },
    items: { desc: 'FormItem项集合的数组', defVal: [], dataType: 'array' },
    enabled: { desc: 'From是否可用', defVal: true, dataType: 'bool' },
    head_h: { desc: 'Form标题部分的高度', defVal: 0, dataType: 'int' },
    foot_h: { desc: 'Form提交按钮部分的高度', defVal: 0, dataType: 'int' },
    skin: { desc: '皮肤样式class名', defVal:'', dataType: 'string' },
    cn: { desc:'Form结构最外一层的类名(Class-Name)',defVal: '', dataType: 'string' },
    css: { desc:'Form结构最外一层的样式(Style)',defVal: '', dataType: 'string' },
    submitApi: { desc: 'Form提交Api接口', defVal: '', dataType:'string' },
    insertApi: { desc: 'Form执行Insert插入Api接口', defVal: '', dataType:'string' },
    updateApi: { desc: 'Form执行Update更行Api接口', defVal: '', dataType:'string' },
    loadApi: { desc: 'Form执行加载数据Api接口', defVal: '', dataType:'string' },
    loadFormApi: { desc: '执行加载FromItems的API接口', defVal: '', dataType:'string' },
    state: { desc: 'Form当前操作的状态--Update:执行更新操作, Insert:执行插入操作', defVal: 'Insert', dataType:'string', comType:'Radios', sons:[{text:'插入',value:'Insert'},{text:'更新',value:'Update'}] },
    btnItems: { desc: '一组Button定义JSON对象的数组', defVal: [{ name: 'FORM-SYS-SUBMIT', text: '提交', icon: 'icon-glyph-ok', css: 'margin-left:102px;'}], dataType: 'array' },
    ifSubmitOriVal: { desc: '是否提交表单原始值(如: key=value&key1=value1), 如果false则是提交json字符串', defVal: false, dataType: 'bool' },
    ifFixedHeight: { desc: '是否固定表单体Body的高度(经典三分结构)', defVal: true, dataType: 'bool' },
    extSubmitVal: { desc: '表单扩展提交的key-value形式的JSON对象', defVal: {}, dataType: 'json', comType: 'Json' },
    hidden: { desc: '表单提交的Hidden对象', defVal: {}, dataType: 'json' },
    onItemClick: { desc: '回调每个FormItem触发Click的事件', defVal: function (){}, dataType: 'function' },
    onItemClickBefore: { desc: '回调每个FormItem触发Click之前的事件', defVal: function (){}, dataType: 'function' },
    onClick: { desc: '回调Form触发操作按钮的Click事件', defVal: function (){}, dataType: 'function' },
    onFinishInit: { desc: '回调Form加载完所有FormItem的事件', defVal: function (){}, dataType: 'function' },
    onClose: { desc: '回调Form关闭时间', defVal: function (){}, dataType: 'function' },
    onChange: { desc: '回调每个FormItem触发Change事件', defVal: function (){}, dataType: 'function' },
    onCheck: { desc: '回调每个FormItem触发Check的事件', defVal: function (){}, dataType: 'function' },
    onSubmit: { desc: '回调Form提交之前的事件', defVal: function (){}, dataType: 'function' },
    onAjax: { desc: '回调Form提交时进行Ajax请求时的事件', defVal: function (){}, dataType: 'function' },
    onSubmitSuccess: { desc: '回调Form提交成功时的事件', defVal: function (){}, dataType: 'function' },
    onSubmitError: { desc: '回调Form提交失败的事件', defVal: function (){}, dataType: 'function' },
    onLoadFormError: { desc: '回调Form加载Form失败时的事件', defVal: function (){}, dataType: 'function' },
    onLoadFormSuccess: { desc: '回调Form加载Form成功时的事件', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _fn = function () { }
  var FICount = new $.nCount(), FGCount = new $.nCount()
  me.aItem = []
  me.items = {}
  me.groups = {}
  me.aGroup = []
  me.btnSet = null
  var owner, data
  var firstFI, lastFI
  var eIcon, eText, eBody
  var args = {
    p: $DB,
    icon: '',
    title: '',
    items: [],
    enabled: true,
    head_h: 0,
    foot_h: 38,
    skin: '',
    css: '',
    cn: '',
    submitApi: '',
    insertApi: '',
    updateApi: '',
    loadApi: '',
    loadFormApi: '',
    state: 'Insert',
    extLoadFields: [],
    btnItems: [{ name: 'FORM-SYS-SUBMIT', text: '提交', skin: 'Button-blue', css: 'margin-left:100px;'}],
    ifSubmitOriVal: false,
    ifFixedHeight: true,
    ifFocus: false,
    extSubmitVal: {},
    hidden: {},
    onItemClick: _fn,
    onItemClickBefore: _fn,
    onClick: _fn,
    onFinishInit: _fn,
    onClose: _fn,
    onChange: _fn,
    onCheck: _fn,
    onSubmit: _fn,
    onAjax: _fn,
    onEnterSubmit: _fn,
    onSubmitSuccess: _fn,
    onSubmitError: _fn,
    onLoadFormError: _fn,
    onLoadFormSuccess: _fn
  }
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    var eHead, eFoot
    owner = args.p.adElm('', 'div').cn('Form ' + args.skin + ' ' + args.cn).css(args.css)
    if (args.ifFixedHeight) {
      var _bd = new $.UI.BaseDiv({ p: owner, head_h: args.head_h, foot_h: args.foot_h })
      eHead = _bd.head; eBody = _bd.body; eFoot = _bd.foot
      eHead.h('<a></a><span style="line-height:30px;"></span>')
    } else {
      var _hCss = 'height:' + args.head_h + 'px;line-height:' + args.head_h + 'px;'
      var _fCss = 'height:' + args.foot_h + 'px;line-height:' + args.foot_h + 'px;'
      owner.h('<div class="Form-head"  style="' + _hCss + '"><a></a><span class="fl"></span></div><div class="Form-body"></div><div class="Form-foot" style="' + _fCss + '"></div>')
      eHead = owner.fc(); eBody = eHead.ns(); eFoot = eBody.ns()
    }
    eIcon = eHead.fc(); eText = eIcon.ns()
    me.setIcon(args.icon).setTitle(args.title); args.owner = owner
    me.btnSet = new $.UI.ButtonSet({ p: eFoot, items: args.btnItems, onClick: onClick })
    me.reLoadItems(args.items, { onSuccess: function () { bindEvent() } })
  }

  function bindEvent () {
    owner.evt('click', function (e) {
      var e = $.e.fix(e), _e = e.t
      $.UI.DestroyPopElm('formbody--click')
    })
  }

  function onClick (obj) {
    if (obj.Name == 'FORM-SYS-SUBMIT') { if (me.check() != false) { me.submit() } }
    obj.Form = me
    args.onClick(obj)
  }

  function checkItem (beginFI) {
    if (beginFI) {
      if (beginFI.get('ifSubmit') == '0') { return checkItem(beginFI.next) }
      if (beginFI.get('ifSubmit') && beginFI.getVisibled() && beginFI.group.getVisibled()) {
        var _cVal = beginFI.check()
        if (_cVal) {
          var _name = beginFI.name, _text = beginFI.getText().toString().trim(), _value = beginFI.getValue()
          var _origVal = _name + '=' + _text, _dType = beginFI.get('dataType')
          switch (_dType) {
            case 'int':
              _value = parseInt(_value)
              if (isNaN(_value)) { _value = 0 }
              break
            case 'double':
              _value = parseFloat(_value)
              if (isNaN(_value)) { _value = 0.00 }
              break
            case 'string':
              _value = _value.toString().trim()
              _value = $.Util.filter(_value)
              break
          }
          _text = $.Util.filter(_text)
          data.IText[_name] = _text
          data.IValue[_name] = _value
          data.IOrigVal.push(_origVal)
          if (beginFI.get('isChange')) { data.UText[_name] = _text; data.UValue[_name] = _value; data.UOrigVal.push(_origVal) }
          return checkItem(beginFI.next)
        } else {
          beginFI.focus()
          return _cVal
        }
        args.onCheck({ Form: me, FormItem: beginFI, CheckResult: _cVal })
      } else {
        return checkItem(beginFI.next)
      }
    }
  }

  me.check = function (ifReturn) {
    data = { IText: {}, IValue: {}, IOrigVal: [], UText: {}, UValue: {}, UOrigVal: [] }
    var _checkValue = checkItem(firstFI), _rValue = _checkValue
    if (ifReturn) { _rValue = [_checkValue, data] }
    return _rValue
  }

  me.getButton = function (v) { return me.btnSet.items[v] }

  me.submit = function () {
    if (args.onSubmit({ Form: me, Data: data }) == false) { return }
    var _val, _action = args.submitApi, _aAry = [], _hVal = $.Util.toArgsString(args.hidden), _sArgs = '', _infoText = '添加'
    switch (args.state) {
      case 'Insert':
        if (args.insertApi) { _action = args.insertApi }
        if (args.ifSubmitOriVal) { _val = data.IOrigVal.join('&') } else { _val = data.IValue }
        break
      case 'Update':
        _infoText = '修改'
        if (args.updateApi) { _action = args.updateApi }
        if (args.ifSubmitOriVal) { _val = data.UOrigVal.join('&') } else { _val = data.UValue }
        break
    }
    if (!_action) { MTips.show('Form提交的请求API为空', 'warn'); return } else { _action = $.Util.toArgsString(_action); _aAry.push(_action) }
    if (_hVal) { _aAry.push(_hVal) }
    if (typeof _val === 'object') {
      for (var k in args.extSubmitVal) { _val[k] = args.extSubmitVal[k] }
      var _sVal = $.JSON.encode(_val)
      if (_sVal == '{}') { args.onSubmitSuccess({ Form: me, Data: data }); return }
      _val = 'json=' + _sVal
    }
    _aAry.push(_val)
    _sArgs = _aAry.join('&')
    if (args.onAjax({ Form: me, Data: data, Args: _sArgs }) == false) { return }
    $.Util.ajax({
      args: _sArgs,
      onSuccess: function (obj) { if (args.onSubmitSuccess({ Form: me, Data: data, Args: _sArgs, ReturnValue: obj }) != false) { MTips.show(_infoText + '成功', 'ok') } },
      onError: function (obj) { if (args.onSubmitError({ Form: me, Data: data, Args: _sArgs, ReturnValue: obj }) != false) { MTips.show(obj.data.split('=')[1] || (_infoText + '失败'), 'error') } }
    })
  }

  function getKeyFields () {
    var _items = me.aItem, _iLen = _items.length, _kAry = []
    for (var i = 0; i < _iLen; i++) {
      var _args = _items[i].getArgs(), _name = _args.name, _trans = _args.trans, _alias = _args.alias || _name
      if (_args.comType == 'Date' || _args.comType == 'EndDate') { _alias = 'dbo.SYS_FORMAT_TIME(' + _name + ')' }
      if (_args.comType == 'UserSelector') { _trans = 'SYS_TRANS_USERS' }
      if (_args.comType == 'SingleUserSelector') { _trans = 'SYS_TRANS_USER' }
      _kAry.push(_alias + ' as ' + _name)
      if (_args.gtID || _args.ifTrans) { _trans = 'SYS_TRANS_GT' }
      _trans = args.trans || _trans
      if (_trans) { _kAry.push('dbo.' + _trans + '(' + _name + ') as ' + _name + '_trans') }
    }
    _kAry = _kAry.concat(args.extLoadFields)
    return _kAry.join(',')
  }

  me.loadDataByID = function (id, onSucc, ifChange) { if (!id || !args.loadApi) { return }; return loadApi(args.loadApi + '&id=' + id, onSucc, ifChange) }
  me.loadDataByWhereCondition = function (api, onSucc, ifChange) { return loadApi(api, onSucc, ifChange) }
  function loadApi (api, onSucc, ifChange) {
    var _succ = onSucc || _fn, _ifChange = ifChange || false
    $.Util.ajax({
      args: api + '&dataType=json&keyFields=id,' + getKeyFields(),
      cbFn: {
        onSuccess: function (d) {
          var _sVal = d.get(0)
          if (_sVal) {
            var _jVal = eval(_sVal)[0]
            var _items = me.aItem, _iLen = _items.length
            for (var i = 0; i < _iLen; i++) {
              var _item = _items[i], _name = _item.get('name'), _tKey = _name + '_trans'
              var _val = _jVal[_name], _txt = _val, _vt = _item.get('VT')
              if (_jVal[_tKey] != null) { _txt = _jVal[_tKey] }
              if (_vt) { _txt = _vt[+_val] }
              _item.reset().setData(_val, _txt, _ifChange)
            }
            me.setHidden('id', _jVal.id)
            _sVal = _jVal
          }
          _succ({ Form: me, Value: _sVal })
        }
      }
    })
    me.set('state', 'Update')
    return me
  }

  me.addItem = function (j) {
    var _obj = j || {}, _item, _idx = FICount.getN(), _group = _obj.group || {}, _name = _obj.name
    if (typeof _group === 'string') { _group = { name: _group } }
    if (!_name) { _name = 'FormItem_' + _idx; _obj.name = _name }
    var _gn = _group.name || 'FORM-SYS-GROUP-DEFAULT', _fg = me.groups[_gn]
    var _onCG = _obj.onChange || _fn, _onCK = _obj.onClick || _fn
    var _onCB = _obj.onClickBefore || _fn, _onEP = _obj.onEnterPress || _fn
    if (!_fg) { _fg = me.addGroup(_group) }
    _obj.group = _fg
    _item = _fg.addItem(_obj)
    _item.evt('onChange', function (obj) { obj.Form = me; _onCG(obj); args.onChange(obj) })
      .evt('onClick', function (obj) { obj.Form = me; _onCK(obj); args.onItemClick(obj) })
      .evt('onClickBefore', function (obj) { obj.Form = me; _onCB(obj); args.onItemClickBefore(obj) })
      .evt('onEnterPress', function (obj) { obj.Form = me; _onEP(obj); if (me.check() != false) { me.submit(); args.onEnterSubmit(obj) } })
    _item.form = me
    if (lastFI) { lastFI.next = _item; _item.pre = lastFI }
    if (!firstFI) { firstFI = _item }
    lastFI = _item
    me.items[_name] = me.items[_idx] = _item
    me.aItem.push(_item)
    return _item
  }

  me.addGroup = function (group) {
    var _g = group || {}, _gn = _g.name
    var _fg = me.groups[_gn]
    if (!_fg) {
      var _gIdx = FGCount.getN()
      _g.p = eBody
      _g.name = _gn
      _g.idx = _gIdx
      _fg = new $.UI.FormGroup(_g)
      me.groups[_gn] = me.groups[_gIdx] = _fg
      me.aGroup.push(_fg)
    }
    return _fg
  }

  me.reLoadItems = function (items, cbFn) {
    eBody.h(''); me.aItem = []; me.items = {}; me.groups = {}; me.aGroup = []; firstFI = null; lastFI = null; data = null
    var _len = items.length, _ids = [], _idx = [], _f = cbFn || {}, _onSucc = _f.onSuccess || _fn, _onErr = _f.onError || args.onLoadFormError
    for (var i = 0; i < _len; i++) {
      var _obj = items[i] || {}, _type = _obj.comType, _gtID = _obj.gtID
      if (_type == 'CheckBox' || _type == 'Radios') { if (_gtID) { _ids.push(_gtID); _idx.push(i) } }
    }
    if (!_ids.length) { initItems(items); _onSucc(); return }
    $.Util.ajax({
      args: 'm=SYS_TABLE_TREE&table=SYS_CM_GLOBAL_TABLE&action=getNodesByPids&dataType=json&keyFields=id as name, id as value, nodeName as text&pids=' + _ids.join(','),
      onSuccess: function (obj) {
        for (var i = 0; i < _ids.length; i++) {
          var _sVal = obj.get(i), _sAry = []
          if (_sVal) { _sAry = eval(_sVal) }
          items[_idx[i]]['sons'] = _sAry
        }
        var _cbObj = { Items: items, Form: me }
        initItems(items); _onSucc(_cbObj); args.onLoadFormSuccess(_cbObj)
      },
      onError: function (d) { MTips.show('加载CheckBox或Radios中的数据出错!', 'error'); _onErr() }
    })
    return me
  }

  function initItems (items) { for (var i = 0, _len = items.length; i < _len; i++) { me.addItem(items[i]) }; if (args.ifFocus) { me.focus() }; args.onFinishInit({ Form: me }) }
  me.focus = function (FormItem) {
    var _fi = FormItem || firstFI
    if (_fi) { if (!_fi.get('noInput')) { _fi.focus() } else { if (_fi.next) { me.focus(_fi.next) } } }
    return me
  }
  me.reset = function () { for (var i = 0, _iLen = me.aItem.length; i < _iLen; i++) { me.aItem[i].reset() } return me }
  me.setIcon = function (v) { eIcon.cn(v + ' m3 fl'); return me }
  me.setTitle = function (v) { eText.h(v); return me }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.setExt = function (key, value) { args.extSubmitVal[key] = value; return me }
  me.setHidden = function (key, value) { args.hidden[key] = value; return me }
  me.getHidden = function (key) { return args.hidden[key] }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.Paging = function (j) {
  /*
    {
    type: "Paging",
    desc: "数据分页组件",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    skin: { desc: '皮肤样式class名', defVal:'Paging-default', dataType: 'string' },
    buttonSkin: { desc: '组件的Button样式class名', defVal:'Button-paging', dataType: 'string' },
    cn: { desc:'Paging结构最外一层的类名(Class-Name)',defVal: '', dataType: 'string' },
    css: { desc:'Paging结构最外一层的样式(Style)',defVal: '', dataType: 'string' },
    pageSizeAry: { desc: '每页大小定义数组', defVal: [5, 10, 20, 30, 40], dataType: 'array' },
    pageSize: { desc: '当前每页条数', defVal: 10, dataType: 'int' },
    pageIndex: { desc: '当前第几页', defVal: 1, dataType: 'int' },
    totalCount: { desc: '所有记录条数', defVal: 0, dataType: 'int' },
    pages: { desc: '初始化Paging的Button数', defVal: 5, dataType: 'int'},
    onClick:{ desc: '回调Button的Click事件', defVal: function (){}, dataType: 'function' },
    onSelect:{ desc: '回调选择PageSize时的时间', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, buttonSkin: 'Button-paging', skin: 'Paging-default', cn: '', css: '', pageSizeAry: [5, 10, 20, 30, 40], pageSize: 20, pageIndex: 1, totalCount: 250, pages: 5, onClick: _fn, onSelect: _fn }
  var btnAry = []
  var owner, attr = {}, btn, _pLen, _dAry = [], btnIdx = 1
  function setDefault (j) {
    args = $.Util.initArgs(j, args); _pLen = args.pages + 1
    var _bSkin = args.buttonSkin, _psa = args.pageSizeAry
    for (var j = 0, _jLen = _psa.length; j < _jLen; j++) { var _d = _psa[j]; _dAry.push({ name: _d, value: _d, text: _d }) }
    btnAry.push({ name: 'First', title: '首页', icon: 'icon-glyph-fast-backward', skin: _bSkin })
    btnAry.push({ name: 'Pre', title: '上一页', icon: 'icon-glyph-backward', skin: _bSkin })
    for (var i = 1; i < _pLen; i++) { btnAry.push({ type: 'tab', visibled: false, name: i + '_btn', skin: _bSkin }) }
    btnAry.push({ name: 'Next', title: '下一页', icon: 'icon-glyph-forward', skin: _bSkin })
    btnAry.push({ name: 'Last', title: '尾页', icon: 'icon-glyph-fast-forward', skin: _bSkin })
    btnAry.push({ name: 'Refresh', title: '刷新', icon: 'icon-glyph-refresh', skin: _bSkin })
  }
  function layout () {
    owner = args.p.adElm('', 'div').cn(args.skin + ' fl ' + args.cn).css(args.css)
    var _eBtn = owner.adElm('', 'div').cn('fl wa hp')
    btn = new $.UI.ButtonSet({ p: _eBtn, items: btnAry, onClick: onBtnClick })
    var _eExt = owner.adElm('', 'div').cn('ext').h('<input type="text" ><span></span><input type="text" readonly="true" ><a class="change-record"></a><span></span>')
    var _d1 = _eExt.fc(), _d2 = _d1.ns(), _d3 = _d2.ns(), _d4 = _d3.ns(), _d5 = _d4.ns()
    _d4.evt('click', function (e) { onChangeClick(e) })
    _d1.evt('keyup', function (e) { var e = $.e.fix(e), _e = e.t; if (e.code == 13) { me.forwardPage(_e.value) }; })
    attr.eInputIdx = _d1; attr.eIdx = _d2; attr.eInputSize = _d3; attr.eSize = _d5
  }

  function getPageIdx () { return args.pageIndex }
  function setPageIdx (v) {
    var _tIdx = v % args.pages
    if (!_tIdx) { _tIdx = args.pages }
    btnIdx = _tIdx
    btn.setSelTabItem(_tIdx + '_btn')
    attr.eInputIdx.value = v; args.pageIndex = v
    return me
  }
  function getPageSize () { return args.pageSize }
  function setPageSize (v) { attr.eInputSize.value = v; args.pageSize = v; return me }
  function onChangeClick (e) {
    var e = $.e.fix(e), _e = e.t; e.stop()
    if ($.global.popTips) { $.global.popTips.remove() }
    $.global.popTips = new $.UI.PopDialog({ p: $DB })
    $.global.popTips.clearHTML().set('ePop', _e).init({ type: 'Menu', checkedValue: _e.ps().value, items: _dAry }).show()
      .evt('onClick', function (obj) {
        var _size = +obj.Value
        setPageSize(_size)
        $.global.popTips.hide()
        args.onSelect({ Paging: me, Attr: attr, Size: _size })
      })
  }

  function onBtnClick (obj) {
    var _name = obj.Name, _txt, _pIdx
    switch (_name) {
      case 'First':
        attr.ifChange = true
        _pIdx = 0
        break
      case 'Pre':
        args.pageIndex--
        if (args.pageIndex < 1) { args.pageIndex++; return }
        _pIdx = args.pageIndex
        if (btnIdx == 1) { btnIdx = args.pages; attr.ifChange = true } else { btnIdx-- }
        break
      case 'Next':
        args.pageIndex++
        if (args.pageIndex > attr.pageCount) { args.pageIndex--; return }
        _pIdx = args.pageIndex
        if (btnIdx == args.pages) { attr.ifChange = true; btnIdx = 1 } else { btnIdx++ }
        break
      case 'Last':
        attr.ifChange = true
        _pIdx = attr.pageCount
        break
      case 'Refresh':
        _pIdx = args.pageIndex
        break
      default:
        _pIdx = obj.Button.getText()
        break
    }
    me.forwardPage(_pIdx)
  }

  me.forwardPage = function (v, ifExecFn) {
    var _ifexec = (ifExecFn == null ? true : ifExecFn)
    if (v == null) { return }
    if (v > attr.pageCount) { v = attr.pageCount }
    if (v < 1) { v = 1 }
    if (attr.ifChange) {
      var _dVal = $.m.p((v - 1) / args.pages), _tVal = (_dVal + 1) * args.pages, _rSize = args.pages
      if (_tVal > attr.pageCount) { _rSize = attr.pageCount - _dVal * args.pages }
      setBtnText(_dVal, _rSize)
      attr.ifChange = false
    }
    setPageIdx(v)
    if (_ifexec) { args.onClick({ Paging: me, Attr: attr }) }
  }

  function setBtnText (dVal, _rSize) {
    var _dVal = dVal * args.pages
    for (var i = 1; i < _pLen; i++) {
      var _name = i + '_btn'
      btn.setText(_name, _dVal + i)
      if (i < _rSize + 1) { btn.setVisibled(_name, true) } else { btn.setVisibled(_name, false) }
    }
  }

  me.setTotal = function (v) {
    if (v == null) { return }
    var _pSize = args.pageSize, _pCount = Math.ceil(v / _pSize)
    attr.eIdx.h('/' + _pCount + '页'); attr.eSize.h('/' + v + '条')
    attr.pageCount = _pCount; attr.total = v
    setPageSize(_pSize); attr.ifChange = true
    me.forwardPage(args.pageIndex, false)
    return me
  }

  function bindEvent () { owner.evt('click', function (e) { $.UI.DestroyPopElm('Paging--Click') }) }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.Button = function (j) {
  /*
    {
    type: "Button",
    desc: "Button-最常用的组件",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    name: { desc: '在ButtonSet中name可以作为每个Button的唯一性的标识', defVal:'Btn', dataType: 'string' },
    type: { desc: 'Button的类型', defVal:'normal', dataType: 'string', comType:'Radios', sons: [{text:'Normal',value:'normal'},{text:'Toggle',value:'toggle'},{text:'Separator',value:'separator'},{text:'Container',value:'container'},{text:'Tab',value:'tab'},{text:'Menu',value:'menu'}] },
    text: { desc: '显示的文本', defVal:'', dataType: 'string' },
    skin: { desc: '皮肤样式class名', defVal:'Button-default', dataType: 'string' },
    title: { desc: '提示文字', defVal:'', dataType: 'string' },
    align: { desc: 'Button的对齐方式', defVal:'left', dataType: 'string', comType:'Radios', sons: [{text:'左对齐',value:'left'},{text:'右对齐',value:'right'}] },
    width: { desc: '整体宽度, 如果为null, Button的宽度则是根据文字的多少进行撑开', defVal:null, dataType: 'int' },
    visibled: { desc: '是否显示', defVal: true, dataType: 'bool' },
    enabled: { desc: '是否启用', defVal: true, dataType: 'bool' },
    tab: { desc:'Paging结构最外一层的类名(Class-Name)',defVal: '0', dataType: 'string' },
    icon: { desc:'Button上的图标, 对应icon.css中的class名',defVal: '', dataType: 'string' },
    cn: { desc:'Button结构最外一层的类名(Class-Name)',defVal: '', dataType: 'string' },
    css: { desc:'Button结构最外一层的样式(Style)',defVal: '', dataType: 'string' },
    ifPress: { desc: '是否被按下', defVal: false, dataType: 'bool' },
    ifClose: { desc: '是否有关闭', defVal: false, dataType: 'bool' },
    ifFocus: { desc: '是否获得焦点', defVal: false, dataType: 'bool'},
    onClick:{ desc: '回调Button的Click事件', defVal: function (){}, dataType: 'function' },
    onMouseDown:{ desc: '回调Button的mousedown事件', defVal: function (){}, dataType: 'function' },
    onClose:{ desc: '回调Button的Close(关闭)事件', defVal: function (){}, dataType: 'function' },
    onPress:{ desc: '回调Button的按下事件', defVal: function (){}, dataType: 'function' },
    onMenuClick:{ desc: '回调类型是Menu的Button中Menu的Click事件', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _fn = function () { }
  var css, cn, _skin
  var owner, eIcon, eText
  var args = {
    p: $DB,
    name: 'Btn',
    type: 'normal',
    text: '',
    skin: 'Button-default',
    title: '',
    align: 'left',
    width: null,
    visibled: true,
    enabled: true,
    tab: 1,
    icon: '',
    cn: '',
    css: '',
    ifPress: false,
    ifClose: false,
    ifFocus: false,
    isMenu: false,
    ifVertical: false,
    onMouseDown: _fn,
    onClick: _fn,
    onClose: _fn,
    onPress: _fn,
    onMenuClick: _fn
  }
  var hObj = {
    icon: '<span class="icon {0}" ></span>',
    text: '<span class="text">{0}</span>',
    close: '<a class="close" title="关闭"></a>',
    menu: '<a class="menu"><span></span></a>'
  }
  function setDefault (j) {
    args = $.Util.initArgs(j, args)
    _skin = args.skin
    cn = _skin + ' ' + _skin + '-normal  ' + args.cn; css = args.css
    if (args.type == 'menu' || args.isMenu) { args.ifClose = false }
    if (args.width) { css += ';width:' + args.width + 'px;' }
    if (args.align == 'right') { cn += ' fr' } else { cn += ' fl' }
  }
  function layout () {
    var _html = '<a class="detail">'
    _html += hObj['icon'].format(args.icon) + hObj['text'].format(args.text) + '</a>'
    if (args.type == 'menu' || args.isMenu) { _html += hObj['menu'] }
    if (args.ifClose) { _html += hObj['close'] }
    owner = args.p.adElm('', 'LI').cn('Button ' + cn).css(css).attr('title', args.title)
    owner.innerHTML = _html
    owner.onselectstart = function () { return false }
    eIcon = owner.fc().fc(); eText = eIcon.ns()
    if (args.ifVertical) { eText.css('width: 16px;word-wrap: break-word;') }
    me.setFocus(args.ifFocus)
    me.setPress(args.ifPress)
    me.setEnabled(args.enabled)
    me.setVisibled(args.visibled)
  }

  function findTarget (_e) {
    if (!_e) { return }
    if (_e.tagName == 'FONT') { _e = _e.pn() }
    var _t = _e.className.trim(), _eLi, _tn = _e.tagName
    if (_tn == 'SPAN') { return findTarget(_e.pn()) }
    if (_tn == 'A') { return { target: _t, eLi: _e.pn() } }
    if (_tn == 'LI') { return findTarget(_e.fc()) }
  }

  function bindEvent () {
    owner.evt('click', function (e) {
      if (!args.enabled) { return }
      var e = $.e.fix(e), _e = e.t, _type = args.type
      var _obj = findTarget(_e), cbArgs = { Button: me, Args: args, name: args.name, text: args.text, Name: args.name, Text: args.text, E: e, _E: _e, Owner: owner }
      if (!_obj) { return }
      switch (_obj.target) {
        case 'close':
          args.onClose(cbArgs)
          me.remove()
          break
        default:
          if (_type == _obj.target) { clickMenu(_obj.eLi) } else { $.UI.DestroyPopElm('Button-Click') }
          if (_type == 'toggle') { var _ifPress = !args.ifPress; me.setPress(_ifPress) }
          args.onClick(cbArgs)
          break
      }
      e.stop()
    }).evt('mousedown', function (e) { var e = $.e.fix(e), _e = e.t; args.onMouseDown({ Button: me, Args: args, name: args.name, text: args.text, Name: args.name, Text: args.text, E: e }) })
  }

  function clickMenu (eLi) {
    if ($.global.popTips) { $.global.popTips.remove() }
    $.global.popTips = new $.UI.PopDialog({ p: $DB })
    var _mArgs = args.MArgs || {}, _pTips = $.global.popTips
    _mArgs.type = 'Menu'
    _mArgs.items = args.items
    _mArgs.checkedValue = me.get('value')
    _pTips.set('ePop', eLi).show().init(_mArgs, true)
      .evt('onClick', function (obj) {
        obj.Button = me; obj.BtnName = args.name; obj.BtnArgs = args; obj.PopTips = _pTips
        if (args.onMenuClick(obj) != false) { _pTips.hide() }
      })
  }

  me.fireClick = function (cbFn, ifPress) {
    var _f = cbFn || args.onClick, _ifPress = ifPress == null ? true : ifPress
    if (!args.enabled) { return me }
    if (args.type == 'toggle') { _ifPress = !args.ifPress }
    if (args.type == 'normal') { _ifPress = false }
    me.setPress(_ifPress)
    _f({ Button: me, Args: args, name: args.name, text: args.text, Name: args.name, Text: args.text })
    return me
  }

  me.setIcon = function (v) {
    if (v != null && args.enabled) { args.icon = v; eIcon.cn('icon ' + v) }
    return me
  }
  me.setEnabled = function (v) {
    if (v != null) {
      args.enabled = v
      if (v) { owner.dc('disabled') } else { owner.ac('disabled') }
    }
    return me
  }
  me.getEnabled = function () { return args.enabled }
  me.setVisibled = function (v) {
    if (v != null && args.enabled) {
      if (v) { me.show() } else { me.hide() }
    }
    return me
  }
  me.getVisibled = function () { return args.visibled }
  me.setText = function (v) {
    if (v != null && args.enabled) { args.text = v; eText.h(v) }
    return me
  }
  me.getText = function () { return args.text }
  me.setFocus = function (v) {
    if (v != null && args.enabled) {
      args.ifFocus = v
      if (v) { owner.dc(_skin + '-normal').ac(_skin + '-focus') } else { owner.dc(_skin + '-press btn-focus').ac(_skin + '-normal') }
    }
    return me
  }
  me.setPress = function (v) {
    if (v != null && args.enabled) {
      args.ifPress = v
      if (v) { owner.dc(_skin + '-normal').ac(_skin + '-press'); args.onPress({ Button: me }) } else { owner.dc(_skin + '-press').ac(_skin + '-normal') }
    }
    return me
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); args.visibled = true; return me }
  me.hide = function () { owner.hide(); args.visibled = false; return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.ButtonSet = function (j) {
  /*
    {
    type: "ButtonSet",
    desc: "一组Button的集合",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    items: { desc: 'ButtonJSON对象的一组集合数组', defVal:[], dataType: 'array' },
    skin: { desc: '皮肤样式class名', defVal:'ButtonSet-default', dataType: 'string' },
    itemSkin: { desc: '每一个ButtonItem的皮肤样式class名', defVal:'Button-default', dataType: 'string' },
    itemAlign: { desc: 'Button的对齐方式', defVal:'left', dataType: 'string', comType:'Radios', sons: [{text:'左对齐',value:'left'},{text:'右对齐',value:'right'}] },
    cn: { desc:'ButtonSet结构最外一层的类名(Class-Name)',defVal: '', dataType: 'string' },
    css: { desc:'ButtonSet结构最外一层的样式(Style)',defVal: '', dataType: 'string' },
    onClick:{ desc: '回调Button的Click事件', defVal: function (){}, dataType: 'function' },
    onMouseDown:{ desc: '回调Button的mousedown事件', defVal: function (){}, dataType: 'function' },
    onClose:{ desc: '回调Button的Close(关闭)事件', defVal: function (){}, dataType: 'function' },
    onSuccess:{ desc: '回调Button的Close(关闭)事件', defVal: function (){}, dataType: 'function' },
    onMenuClick:{ desc: '回调类型是Menu的Button中Menu的Click事件', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _fn = function () { }, count = new $.nCount()
  var args = { p: $DB, items: [], skin: 'ButtonSet-default', gtID: null, gtType: 'normal', gbsID: null, gbsType: 'normal', ifRights: false, loadApi: '', btnType: 'normal', itemSkin: 'Button-default', itemAlign: 'left', cn: '', css: '', onClick: _fn, onClose: _fn, onMouseDown: _fn, onMenuClick: _fn, onSuccess: _fn }
  var owner
  me.items = {}
  me.aItem = []
  me.selTabItem = {}
  me.focusItem = null
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    owner = args.p.adElm('', 'UL').cn(args.skin + ' ' + args.cn).css(args.css)
    me.loadItems(args.items)
    loadApi(function () { loadGT(function () { loadGBS(null) }) })
  }
  function loadApi (succ) { if (args.loadApi) { me.loadApi(args.loadApi, false, args.btnType, succ) } else { succ() }; }
  function loadGT (succ) { if (args.gtID != null) { me.loadApi('m=SYS_TABLE_BASE&table=SYS_CM_GLOBAL_TABLE&action=getRightsListByPid&pid=' + args.gtID, false, args.gtType, succ, 'nodeName as text, nodeName as nn, id as name, icon') } else { succ() } }
  function loadGBS (succ) { if (args.gbsID != null) { me.loadApi('m=SYS_CM_USERS&action=getRightsToolBars&pid=' + args.gbsID, false, args.gbsType, succ, 'nodeName as text, nodeName as nn, id as name, icon, btnType as type') } else { var _succ = succ || args.onSuccess; _succ({ ButtonSet: me, items: me.aItem }) } }
  me.getItem = function (v) {
    if (v == null) { return }
    if ($.getType(v) == 'object') { return v }
    return me.items[v]
  }
  me.addItem = function (j, ifReturn) {
    var _j = j || {}, _ifR = ifReturn || false, _onClick = _j.onClick || _fn
    _j.p = owner
    _j.onClick = function (obj) { obj.ButtonSet = me; if (obj.Args.type == 'tab') { me.setSelTabItem(obj.Button) }; _onClick(obj); args.onClick(obj) }
    _j.onMenuClick = function (obj) { obj.ButtonSet = me; return args.onMenuClick(obj) }
    _j.onMouseDown = function (obj) { obj.ButtonSet = me; return args.onMouseDown(obj) }
    if (!_j.skin) { _j.skin = args.itemSkin }
    if (!_j.align) { _j.align = args.itemAlign }
    var _btn = new $.UI.Button(_j)
    _btn.evt('onClose', function (obj) { obj.ButtonSet = me; return args.onClose(obj) })
    me.items[_btn.get('name')] = me.items[count.getN()] = _btn
    me.aItem.push(_btn)
    if (_ifR) { return _btn }
    return me
  }

  me.deleteItem = function (v) {
    var _item = me.getItem(v)
    if (_item) { _item.remove(); _item = null }
  }

  me.setAllEnabled = function (v) {
    if (v == undefined) { v = true }
    for (var i = 0, _len = me.aItem.length; i < _len; i++) { me.aItem[i].setEnabled(v) }
  }

  me.setSelTabItem = function (v) {
    var _item = me.getItem(v)
    if (_item) {
      var _tab = _item.getArgs().tab, _selItem = me.selTabItem[_tab]
      if (_selItem == _item) { return me }
      if (_selItem) { _selItem.setPress(false) }
      _item.setPress(true)
      me.selTabItem[_tab] = _item
    }
    return me
  }

  me.setChecked = function (k, v) {
    if (v == null) { return me }
    var _item = me.getItem(k)
    if (_item) { _item.setPress(v) }
    return me
  }

  me.setVisibled = function (k, v) {
    if (v == null) { return me }
    var _item = me.getItem(k)
    if (_item) { _item.setVisibled(v) }
    return me
  }
  me.loadApi = function (api, ifReLoad, type, onSucc, fields) {
    if (!api) { return me }
    if (args.ifRights) { api += '&ifRights=1' }
    $.Util.ajax({
      args: api + '&dataType=json&keyFields=' + (fields || 'nodeName as text, nodeName as nn, id as name'),
      onSuccess: function (data) {
        var _sAry = data.get(0), _iAry = [], _onSucc = onSucc || args.onSuccess
        if (_sAry) { _iAry = eval(_sAry) }
        if (ifReLoad != false) { me.clear() }
        me.loadItems(_iAry, type)
        _onSucc({ ButtonSet: me, items: _iAry })
      }
    })
    return me
  }

  me.fireClick = function (k, f, ifPress) {
    var _item = me.getItem(k)
    if (_item) { _item.fireClick(f, ifPress) }
    return me
  }
  me.loadItems = function (items, type) { for (var i = 0, _iLen = items.length; i < _iLen; i++) { var _iObj = items[i]; _iObj.type = type || _iObj.type; me.addItem(_iObj) }; return me }
  me.reLoadItems = function (items) { me.clear(); return me.loadItems(items) }
  me.setIcon = function (k, v) { var _item = me.getItem(k); if (_item) { _item.setIcon(v) } return me }
  me.getText = function (v) { var _item = me.getItem(v); if (_item) { return _item.getText() } }
  me.setText = function (k, v) { var _item = me.getItem(k); if (_item) { _item.setText(v) } return me }
  me.setAllEnabled = function (v) { for (var i = 0, _iLen = me.aItem.length; i < _iLen; i++) { me.aItem[i].setEnabled(v) } return me }
  me.setEnabled = function (k, v) { var _item = me.getItem(k); if (_item) { _item.setEnabled(v) } return me }
  me.clear = function () { owner.h(''); me.selTabItem = {}; me.focusItem = null; me.items = {}; me.aItem = []; count.setN(-1); return me }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); args.visibled = true; return me }
  me.hide = function () { owner.hide(); args.visibled = false; return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.TreeMenu = function (j) {

}

$.UI.Menu = function (j) {
  /*
    {
    type: "Menu",
    desc: "用于单列数据的承载",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    items: { desc: '静态数据源', defVal:[], dataType: 'array' },
    skin: { desc: '皮肤样式class名', defVal:'Button-default', dataType: 'string' },
    loadApi: { desc: '加载数据的API接口', defVal:'', dataType: 'string' },
    hidden: { desc: 'ajax请求附加的隐藏JSON对象', defVal:{}, dataType: 'json', comType:'Json' },
    cn: { desc:'Menu结构最外一层的类名(Class-Name)',defVal: '', dataType: 'string' },
    css: { desc:'Menu结构最外一层的样式(Style)',defVal: '', dataType: 'string' },
    textKey: { desc:'对应数据库的字段值作为显示值',defVal: 'nodeName', dataType: 'string' },
    valueKey: { desc:'对应数据库的字段值作为value值',defVal: 'id', dataType: 'string' },
    onClick:{ desc: '回调MenuItem的Click事件', defVal: function (){}, dataType: 'function' },
    onAjax:{ desc: '回调ajax请求的事件', defVal: function (){}, dataType: 'function' },
    onSuccess:{ desc: '回调加载成功的事件', defVal: function (){}, dataType: 'function' },
    onError:{ desc: '回调加载失败的事件', defVal: function (){}, dataType: 'function' }
    },
    itemArgs: {
    text: { desc: '显示的文本', defVal:'', dataType: 'string' },
    name: { desc: '可作为items中唯一标识', defVal:'', dataType: 'string' },
    value: { desc: '真正的Value值', defVal:'', dataType: 'string' },
    type: { desc: 'MenuItem的类型', defVal:'item', dataType: 'string', comType: 'Radios', sons: [{ value: 'item', text: '基本类型' },{ value: 'delimiter', text:'分隔符' }] },
    icon: { desc:'Button上的图标, 对应icon.css中的class名',defVal: '', dataType: 'string' },
    disabled: { desc: '是否启用', defVal:false, dataType: 'bool' }
    }
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, items: [], skin: '', loadApi: '', checkedValue: null, hidden: {}, extFields: [], css: '', cn: '', textKey: 'nodeName', valueKey: 'id', ifShowIcon: false, onAjax: _fn, onClick: _fn, onSuccess: _fn, onLoadOver: _fn, onError: _fn }
  var iArgs = { text: '', name: '', value: '', type: 'item', icon: '', disabled: false }
  var owner, count = new $.nCount(), itemsObj = {}
  me.items = {}
  me.aItem = []
  me.selLi
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    owner = args.p.adElm('', 'ul').cn('Menu ' + args.cn).css(args.css)
    owner.onselectstart = function () { return false }
    for (var i = 0, _iLen = args.items.length; i < _iLen; i++) { addItem(args.items[i]) }
    if (args.gtID) { args.loadApi = 'm=SYS_TABLE_BASE&table=SYS_CM_GLOBAL_TABLE&action=getRightsListByPid&pid=' + args.gtID }
    if (args.loadApi) { me.loadAjax({ args: args.loadApi }) } else { onLoadOver() }
  }
  function addItem (j) {
    var _obj = $.Util.initArgs(j, iArgs), _idx = count.getN(), _name = _obj.name || 'MENU_' + _idx
    var _eLI = owner.adElm('', 'li'), _iType = (_obj.type || 'item').trim()
    if (_iType == 'item') {
      _eLI.attr('_name', _name).attr('_value', _obj.value).h('<a class="checked"></a><span class="icon ' + _obj.icon + '"></span><span>' + _obj.text + '</span>')
    } else {
      _eLI.cn(_iType)
    }
    var _item = { eLi: _eLI, Args: _obj }
    me.items[_name] = me.items[_idx] = _item
    itemsObj[_name] = _item
    me.aItem.push(_item)
    return _item
  }

  function bindEvent () {
    owner.evt('click', function (e) {
      var e = $.e.fix(e), _e = e.t
      var _tag = _e.tagName, _eLi
      if (_tag == 'LI') { _eLi = _e }
      if (_tag == 'FONT' || _tag == 'COLOR') { _eLi = _e.pn().pn() }
      if (_tag == 'SPAN' || _tag == 'A') { _eLi = _e.pn() }
      if (_eLi) {
        var _val = _eLi.attr('_value'), _eTxt = _eLi.chn(2), _txt = _eTxt.ht(), _name = _eLi.attr('_name'), _style = '', _temp = _eTxt.fc()
        if (me.selLi) { me.selLi.dc('selected') }
        _eLi.ac('selected')
        me.selLi = _eLi
        if (_temp.tagName == 'FONT' || _temp.tagName == 'COLOR') {
          if (_temp.attr('color')) { _style += 'color:' + _temp.attr('color') + ';' };
          if (_temp.attr('style')) { _style += _temp.attr('style') };
        }
        args.onClick({ Menu: me, Item: me.items[_name], Value: _val, Name: _name, Text: _txt, Style: _style })
      }
      e.stop()
    })
  }

  function getItem (key) { if (typeof key === 'object') { return key } else { return me.items[key] } }
  me.loadAjax = function (obj) {
    var _obj = obj || {}, _args = _obj.args || '', _f = _obj.cbFn || {}
    if (_args && args.onAjax({ Menu: me, Args: _args }) != false) {
      var _onSuc = _f.onSuccess || args.onSuccess, _onErr = _f.onError || args.onError
      var _tK = args.textKey, _vK = args.valueKey, _kv = _vK + ' as value, ' + _tK + ' as text'
      if (args.extFields.length) { _kv += ',' + args.extFields.join(',') }
      if (args.ifShowIcon) { _kv += ',icon' }
      $.Util.ajax({
        args: $.Util.toArgsString(_args) + '&dataType=json&keyFields=' + _kv + '&' + $.Util.toArgsString(args.hidden),
        onSuccess: function (d) {
          var _sData = d.get(0)
          if (_sData) {
            var _dAry = eval(_sData), _dLen = _dAry.length
            for (var i = 0; i < _dLen; i++) {
              var _dObj = _dAry[i]
              addItem({ text: _dObj['text'], name: _dObj['value'], icon: _dObj['icon'], value: _dObj['value'], type: 'item', data: _dObj })
            }
            _onSuc({ Menu: me }); onLoadOver()
          }
        },
        onError: function (d) { _onErr(d) }
      })
    }
  }

  function onLoadOver () {
    if (args.checkedValue) { var sel = itemsObj[args.checkedValue]; if (sel) { me.setSelected(sel) } }
    args.onLoadOver({ Menu: me })
  }

  me.loadAjaxForTree = function () {

  }
  me.setSelected = function (key) {
    var _item = getItem(key)
    if (_item) {
      var _eLi = _item.eLi
      if (me.selLi) { me.selLi.dc('selected') }
      _eLi.ac('selected')
      me.selLi = _eLi
    }
    return me
  }
  me.fireClick = function (key) {
    me.setSelected(key)
    if (me.selLi) {
      var _iItem = getItem(key), _iArgs = _iItem.Args
      args.onClick({ Menu: me, Item: _iItem, Value: _iArgs.value, Name: _iArgs.name, Text: _iArgs.text })
    }
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.TreeList = function (j) {
  /*
    {
    type: "TreeList",
    desc: "用于树状表结构的展开和操作",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    dataSource: { desc: '数据源', defVal:null, dataType: 'array' },
    lockLevel: { desc: '要锁住的层', defVal:0, dataType: 'int' },
    currLevel: { desc: '当前层', defVal:1, dataType: 'int' },
    aHeader: { desc: 'TreeList中List的aHeader参数值', defVal:[], dataType: 'array' },
    x: { desc: '相对于父容器x坐标', defVal:0, dataType: 'int' },
    y: { desc: '相对于父容器y坐标', defVal:0, dataType: 'int' },
    depth: { desc: '深度', defVal:0, dataType: 'int' },
    updateApi: { desc: '修改的API', defVal:'', dataType: 'string' },
    loadApi: { desc: '加载数据的API', defVal:'', dataType: 'string' },
    skin: { desc: '皮肤样式class名', defVal:'', dataType: 'string' },
    cn: { desc:'TreeList结构最外一层的类名(Class-Name)',defVal: '', dataType: 'string' },
    css: { desc:'TreeList结构最外一层的样式(Style)',defVal: '', dataType: 'string' },
    style: { desc:'展现数据的样式类型',defVal: 'menu', dataType: 'string', comType:'Radios', sons: [{value:'menu',text:'菜单模式'},{value:'tree',text:'树状模式'},{value:'bingxing',text:'并行模式'}] },
    onTDClick:{ desc: '回调TreeList中List的TDClick事件', defVal: function (){}, dataType: 'function' },
    onCheckBoxClick:{ desc: '回调TreeList中List的CheckBoxClick事件', defVal: function (){}, dataType: 'function' },
    onTDClickBefore:{ desc: '回调TreeList中List的TDClickBefore事件', defVal: function (){}, dataType: 'function' },
    onSuccess:{ desc: '回调加载成功的事件', defVal: function (){}, dataType: 'function' },
    onError:{ desc: '回调加载失败的事件', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _fn = function () { }, attr = {}
  var args = {
    p: $DB,
    dataSource: null,
    lockLevel: 0,
    currLevel: 1,
    ifExpandAll: false,
    aHeader: [],
    x: 0,
    y: 0,
    depth: 0,
    loadApi: '',
    updateApi: '',
    css: 'border-top:1px solid #E4E2E2;',
    cn: '',
    skin: '',
    style: 'tree:nodeName',
    onSuccess: _fn,
    onError: _fn,
    onTDClick: _fn,
    onCheckBoxClick: _fn,
    onTDClickBefore: _fn
  }
  function setDefault (j) { args = $.Util.initArgs(j, args); me.pre = args.pre }
  function layout () {
    owner = args.p.adElm('', 'div').cn('pa ' + args.cn).css('left:' + args.x + 'px;top:' + args.y + 'px;' + args.css)
    owner.onselectstart = function () { return false }
    me.owner = owner
    attr.loadApi = $.Util.toArgsObj(args.loadApi)
    var _lArgs = $.Util.initArgs({ p: owner, loadApi: attr.loadApi, onSuccess: onListSuccess }, args)
    _lArgs.css = null; _lArgs.cn = null
    me.List = new $.UI.List(_lArgs)
  }
  function bindEvent () {
    me.List.evt('onTDClick', function (obj) {
      obj.TreeList = me
      disposeChild(me.next); if (me.next) { me.next.remove(); me.next = null }
      if (args.lockLevel == args.currLevel) { args.onTDClick(obj); return }
      if (args.style.indexOf('tree') == -1) {
        var _eTR = obj.Target.eTr, _pid = _eTR.attr('rowId') || _eTR.attr('id'), _sons = +_eTR.attr('sons')
        if (!_sons) { args.onTDClick(obj); return }
        var _pPos = args.p.pos(), _trPos = _eTR.pos()
        var _x = _trPos.x - _pPos.x + _trPos.w, _y = 0, _loadApi = $.JSON.decode($.JSON.encode(attr.loadApi))
        if (args.style == 'menu') { _y = _trPos.y - args.p.pos().y }
        _loadApi.pid = _pid
        var _nArgs = $.Util.initArgs({ loadApi: _loadApi, x: _x, y: _y, currLevel: args.currLevel + 1 }, args)
        var _child = new $.UI.TreeList(_nArgs)
        me.next = _child
        _child.pre = me
      }
      args.onTDClick(obj)
    }).evt('onTDClickBefore', function (obj) { if (args.onTDClickBefore(obj) == false) { return false } })
  }

  me.getChild = function (v) {
    var currList = me, n = 0
    while (currList.next) { n++; currList = currList.next; if (n == v) { return currList } }
    return currList
  }
  function onListSuccess (obj) {
    obj.TreeList = me; obj.List = me.List
    if (args.ifExpandAll) { obj.List.fireClick(0) }
    args.onSuccess(obj)
  }
  function disposeChild (child) { if (child) { var _n = child.next; child.owner.r(); child = null; disposeChild(_n) } }
  me.insertRow = function () { }
  me.deleteRow = function () { }
  me.refresh = function (cbFn, ifCheckSel, idc) { if (!ifCheckSel) { ifCheckSel = false }; me.List.refresh(cbFn, ifCheckSel); if (idc) { disposeChild(me.next) } } // idc: ifDisposeChilds的简称
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

/**
  {
  type: "Layout",
  desc: "布局组件, 可以通过组合可以组成任何形式的高级布局组件",
  args: {
  p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
  barWidth: { desc: 'bar的宽度值', defVal:5, dataType: 'int' },
  start: { desc: 'bar初始化值', defVal:200, dataType: 'int' },
  min: { desc: 'bar能拖动的最小值', defVal:20, dataType: 'int' },
  max: { desc: 'bar能拖动的最大值', defVal:300, dataType: 'int' },
  cn: { desc:'Layout结构最外一层的类名(Class-Name)',defVal: '', dataType: 'string' },
  css: { desc:'Layout结构最外一层的样式(Style)',defVal: '', dataType: 'string' },
  dirLock: { desc: '要固定的方向, 1表示上和左, 2表示下和右', defVal:1, dataType: 'int', comType: 'Radios', sons: [{value:1,text:'上, 左'},{value:2,text:'下, 右'}] },
  dir: { desc: 'Layout方向, we表示上下方向, ns表示左右方向', defVal:'we', dataType: 'string', comType: 'Radios', sons: [{value:'we',text:'上下'},{value:'ns',text:'左右'}] },
  ifDrag: { desc:'Bar是否可拖动',defVal: true, dataType: 'bool' },
  isRoot: { desc:'是否是最外层的布局器',defVal: false, dataType: 'bool' },
  ifCover: { desc:'是否有方向箭头',defVal: true, dataType: 'bool' },
  onDrag:{ desc: '回调Layout的Bar拖动事件', defVal: function (){}, dataType: 'function' },
  onResize:{ desc: '回调组件的Resize事件', defVal: function (){}, dataType: 'function' }
  },
  containerAry: ['eHead','eFoot']
  }
  */
$.UI.Layout = function (j) {
  var me = this,
    _fn = function () { }
  var owner, eHead, eBar, eFoot, eDirFlag, barDragFlag, barVal
  var args = {
    p: $DB,
    barWidth: 3,
    start: 200,
    min: 20,
    max: 300,
    cn: '',
    css: '',
    dir: 'we',
    dirLock: 1,
    ifDrag: true,
    isRoot: false,
    ifCover: true,
    onDrag: _fn,
    onResize: _fn
  }
  var _html =
    '<div class="layout-head scroll-webkit"></div>' +
    '<div class="layout-bar"><a state="0" class="cover dn"></a></div>' +
    '<div class="layout-foot scroll-webkit"></div>'
  var p, start, barW, dirLock, dir, max, min, ifDrag, _ddir
  function setDefault (j) {
    args = $.Util.initArgs(j, args)
    p = args.p
    start = +args.start
    barW = +args.barWidth
    dirLock = args.dirLock
    dir = args.dir
    max = +args.max
    min = +args.min
    ifDrag = args.ifDrag
  }

  // 生成一个三栏布局，并设置每个栏的大小，甚至位置也不一定固定
  function layout () {
    owner = p.adElm('', 'div').cn('Layout-' + dir).attr('mType', dir.toUpperCase()).h(_html)
    owner.onselectstart = function () { return false }
    eHead = owner.fc() // .layout-head
    eBar = eHead.ns() // .layout-bar
    eDirFlag = eBar.fc() // .layout-bar a
    eFoot = eBar.ns() // .layout-foot
    me.eHead = eHead
    me.eFoot = eFoot
    if (dir == 'ns') {
      var pH = $.m.p(p.offsetHeight)
      if (dirLock == 1) {
        _ddir = 'n'
        eHead.css($.box(',,,' + start))
        eBar.css($.box(',' + start + ',,' + barW))
        eFoot.css($.box(',' + (start + barW) + ',,' + (pH - start - barW)))
        if (ifDrag) { $.drag.init(eBar, null, null, null, min, max, 1) }
      } else {
        _ddir = 's'
        eHead.css($.box(',,,' + (pH - start - barW)))
        eBar.css($.box(',' + (pH - start - barW) + ',,' + barW))
        eFoot.css($.box(',' + (pH - start) + ',,' + start))
        if (ifDrag) { $.drag.init(eBar, null, null, null, pH - max, pH - min, 1) }
      }
    } else {
      var pW = $.m.p(p.offsetWidth)
      if (dirLock == 1) {
        _ddir = 'w'
        eHead.css($.box(',,' + start + ','))
        eBar.css($.box(start + ',0,' + barW + ','))
        eFoot.css($.box((start + barW) + ',0,' + (pW - start - barW) + ','))
        if (ifDrag) { $.drag.init(eBar, null, min, max, null, null, null, 1) }
      } else {
        _ddir = 'e'
        eHead.css($.box('0,0,' + (pW - start - barW) + ','))
        eBar.css($.box((pW - start - barW) + ',0,' + barW + ','))
        eFoot.css($.box((pW - start) + ',0,' + start + ','))
        if (ifDrag) { $.drag.init(eBar, null, pW - max, pW - min, null, null, null, 1) }
      }
    }
    if (args.ifCover) { eDirFlag.dc('dn').ac('dir-' + _ddir).attr('dir', _ddir) }
  }
  function bindEvent () {
    if (args.isRoot) { $(window).evt('resize', function () { me.resize(0) }, true) }
    if (ifDrag) {
      var _mask = null
      eBar.onDragStart = function () { }
      eBar.onDrag = function () {
        if (_mask == null) {
          barDragFlag = true
          var _dir = 'ce'
          if (dir == 'ns') { _dir = 'cn' }
          _mask = new $.UI.Mask({ alpha: 2, cn: _dir })
          $S(this).zIndex = 10000
          $.UI.DestroyPopElm('Layout-drag')
        }
        me.resize(true)
        // setTimeout(function(){me.resize(1);},16);
      }
      eBar.onDragEnd = function () {
        barDragFlag = false
        $S(this).zIndex = ''
        if (_mask) { _mask.remove(); _mask = null };
        me.resize(1)
      }
      eBar.resize = function () { me.resize(1) }
      eBar.evt('click', function (e) {
        var e = $.e.fix(e), _e = e.t; e.stop()
        var _barDir = _e.attr('dir')
        if (_barDir) { me.cover4Dir(_barDir, +_e.attr('state')) }
      })
    }
    owner.evt('click', function (e) { var e = $.e.fix(e), _e = e.t; $.UI.DestroyPopElm('Layout-owner-click') })
  }

  function resizeScrollBar (p) {
    var owner = p.fc(), hRate, vRate
    var eHBar = owner.ns(), eVBar = eHBar.ns(), hBar = eHBar.fc(), vBar = eVBar.fc()
    if (!owner.h()) { return }
    hRate = $.m.p(p.csn('width') / owner.csn('width') * 100)
    vRate = $.m.p(p.csn('height') / owner.csn('height') * 100)
    if (hRate < 100) { hBar.css('width:' + hRate + '%;'); eHBar.dc('dn') } else { eHBar.ac('dn') }
    if (vRate < 100) { vBar.css('height:' + vRate + '%;'); eVBar.dc('dn') } else { eVBar.ac('dn') }
  }

  // type: n, s, w, e 四个值， v：0,1   0--表示展开,  1--表示收缩
  me.cover4Dir = function (dir, v) {
    var _ph = $.m.p(p.offsetHeight), _pw = $.m.p(p.offsetWidth)
    switch (dir) {
      case 'n':
        if (v) {
          eHead.css('height:' + barVal + 'px;').show()
          eBar.css('top:' + barVal + 'px;')
          eBar.dragable = true
          eFoot.css('top:' + (barVal + barW) + 'px;height:' + (_ph - barVal - barW) + 'px;')
          eDirFlag.dc('dir-s').ac('dir-n').attr('state', '0')
        } else {
          barVal = eBar.csn('top')
          eHead.css('height:0px;').hide()
          eBar.dragable = false
          eBar.css('top:0px;')
          eFoot.css('top:' + barW + 'px;height:' + (_ph - barW) + 'px;')
          eDirFlag.dc('dir-n').ac('dir-s').attr('state', '1')
        }
        break
      case 's':
        if (v) {
          eHead.css('height:' + barVal + 'px;')
          eBar.css('top:' + barVal + 'px;')
          eFoot.css('top:' + (barVal + barW) + 'px;height:' + (_ph - barVal - barW) + 'px;')
          eDirFlag.dc('dir-n').ac('dir-s').attr('state', '0')
        } else {
          barVal = eBar.csn('top')
          eHead.css('height:' + (_ph - barW) + 'px;')
          eBar.css('top:' + (_ph - barW) + 'px;')
          eFoot.css('top:' + _ph + 'px;height:0px;')
          eDirFlag.dc('dir-s').ac('dir-n').attr('state', '1')
        }
        break
      case 'w':
        if (v) {
          eHead.css('width:' + barVal + 'px;').show()
          eBar.dragable = true
          eBar.css('left:' + barVal + 'px;')
          eFoot.css('left:' + (barVal + barW) + 'px;width:' + (_pw - barVal - barW) + 'px;')
          eDirFlag.dc('dir-e').ac('dir-w').attr('state', '0')
        } else {
          barVal = eBar.csn('left')
          eHead.css('width:0px;').hide()
          eBar.dragable = false
          eBar.css('left:0px;')
          eFoot.css('left:' + barW + 'px;width:' + (_pw - barW) + 'px;')
          eDirFlag.dc('dir-w').ac('dir-e').attr('state', '1')
        }
        break
      case 'e':
        if (v) {
          eHead.css('width:' + barVal + 'px;')
          eBar.css('left:' + barVal + 'px;')
          eFoot.css('left:' + (barVal + barW) + 'px;width:' + (_pw - barVal - barW) + 'px;').show()
          eDirFlag.dc('dir-w').ac('dir-e').attr('state', '0')
        } else {
          barVal = eBar.csn('left')
          eHead.css('width:' + (_pw - barW) + 'px;')
          eBar.css('left:' + (_pw - barW) + 'px;')
          eFoot.css('width:0px;left:' + _pw + 'px;').hide()
          eDirFlag.dc('dir-e').ac('dir-w').attr('state', '1')
        }
        break
    }
    me.resize()
  }
  me.setValue = function (v) {
    if (dir == 'ns') {
      if (dirLock == 1) {
        eBar.css('top:' + v + 'px;')
      } else {
        eBar.css('top:' + (owner.offsetHeight - barW - v) + 'px;')
      }
    } else {
      if (dirLock == 1) {
        eBar.css('left:' + v + 'px;')
      } else {
        eBar.css('left:' + (owner.offsetWidth - v - barW) + 'px;')
      }
    }
    barDragFlag = true
    me.resize()
  }
  me.setBarWidth = function (v) {
    if (dir == 'ns') { eBar.css('height:' + v + 'px;') } else { eBar.css('width:' + v + 'px;') }
    barDragFlag = true
    me.resize()
  }
  me.resize = function (f) {
    var _pH = $.m.p(p.offsetHeight), _pW = $.m.p(p.offsetWidth)
    if (dir == 'ns') {
      if (dirLock == 2 && !barDragFlag) {
        // 底部固定
        var _h = eFoot.csn('height')
        if (_h < start && barDragFlag) { return }
        eHead.css('height:' + (_pH - barW - _h) + 'px')
        // eHead.style.height = (_pH - barW - _h) + 'px';
        eBar.css('top:' + (_pH - barW - _h) + 'px;')
        eFoot.css('top:' + (_pH - _h) + 'px;')
        eBar.minY = _pH - max
        eBar.maxY = _pH - min
      } else {
        // 上部固定
        var t = +eBar.csn('top'), _h = _pH - t - barW - 1
        eHead.style.height = t + 'px'
        eFoot.style.top = (t + barW) + 'px'
        eFoot.style.height = (_h <= 0 ? 0 : _h) + 'px'
      }
      me.resizeInter(eHead, f)
      me.resizeInter(eFoot, f)
    } else {
      if (dirLock == 2 && !barDragFlag) {
        // 右部固定
        var _w = eFoot.csn('width')
        if (_w < start && barDragFlag) { return }
        eHead.css($.box('0,0,' + (_pW - _w - barW) + ','))
        eBar.css($.box((_pW - _w - barW) + ',0,' + barW + ','))
        eFoot.css($.box((_pW - _w) + ',0,' + _w + ','))
        eBar.minX = _pW - max
        eBar.maxX = _pW - min
      } else {
        // 左部固定
        var t = +eBar.csn('left'), _w = _pW - t - barW
        eHead.style.width = t + 'px'
        eFoot.css('left:' + (t + barW) + 'px;width:' + (_w < 0 ? min : _w) + 'px;')
      }
      me.resizeInter(eHead, f)
      me.resizeInter(eFoot, f)
    }
    var _hAry = eHead.find('div:com=ScrollBar'), _fAry = eFoot.find('div:com=ScrollBar')
    for (var i = 0, _len = _hAry.length; i < _len; i++) { resizeScrollBar(_hAry[i]) }
    for (var i = 0, _len = _fAry.length; i < _len; i++) { resizeScrollBar(_fAry[i]) }
  }

  me.resizeInter = function (s, f) {
    var _nsAry = $(s).find('div:mType=NS'), _weAry = $(s).find('div:mType=WE')
    for (var i = 0, _len = _nsAry.length; i < _len; i++) {
      try {
        var _ns = _nsAry[i], _nsP = _ns.pn()
        _ns.style.height = _nsP.offsetHeight + 'px'
        _ns.chn(1).resize(f)
      } catch (e) { }
    }
    for (var i = 0, _len = _weAry.length; i < _len; i++) {
      try {
        var _we = _weAry[i], _weP = _we.pn()
        _we.style.width = _weP.offsetWidth + 'px'
        _we.chn(1).resize(f)
      } catch (e) { }
    }
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) {
    setDefault(j);
    layout();
    bindEvent();
    me.resize(1);
    return me
  }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.BaseDiv = function (j) {
  /*
    {
    type: "BaseDiv",
    desc: "经典上下三分结构, head-body-foot",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    head_h: { desc: 'head的高度', defVal:0, dataType: 'int' },
    foot_h: { desc: 'foot的高度', defVal:0, dataType: 'int' },
    skin: { desc: '皮肤样式的class-name', defVal:'BaseDiv-Gray', dataType: 'string' },
    cn: { desc:'BaseDiv结构最外一层的类名(Class-Name)',defVal: '', dataType: 'string' },
    css: { desc:'BaseDiv结构最外一层的样式(Style)',defVal: '', dataType: 'string' },
    onChange:{ desc: '回调组件的Change事件', defVal: function (){}, dataType: 'function' }
    },
    containerAry: ['head','body','foot']
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, head_h: 0, foot_h: 0, ifFixedHeight: true, cn: '', css: '', skin: 'BaseDiv-Gray', onChange: _fn }
  var _hh, _fh, ver = $('').split(','), _ver1 = ver[0], _ver2 = +ver[1]

  function setDefault (j) { args = $.Util.initArgs(j, args); _hh = args.head_h; _fh = args.foot_h }
  function layout () {
    var htmlTemp
    if (args.ifFixedHeight) {
      htmlTemp = '<div class="BaseDiv-Head" style="{0}"></div><div class="BaseDiv-Body scroll-webkit" style="{1}"><div></div></div><div class="BaseDiv-Foot" style="{2}"></div>'
      htmlTemp = htmlTemp.format('height:' + _hh + 'px;', 'top:' + _hh + 'px;bottom:' + _fh + 'px;', 'height:' + _fh + 'px;line-height:' + _fh + 'px;')
    } else {
      htmlTemp = '<div style="{0}"></div><div class="scroll-webkit" style="{1}"></div><div style="{2}"></div>'
      htmlTemp = htmlTemp.format('height:' + _hh + 'px;line-height:' + _hh + 'px;', 'height:auto;', 'height:' + _fh + 'px;line-height:' + _fh + 'px;')
    }
    me.base = args.p.adElm('', 'div').cn('BaseDiv-Base ' + args.skin + ' ' + args.cn).css(args.css).h(htmlTemp)
    me.head = me.base.fc(); me._body = me.head.ns(); me.foot = me._body.ns()
    if (args.ifFixedHeight) { me.body = me._body.fc() } else { me.body = me._body; me.base.dc('BaseDiv-Base') }
  }
  me.setHead = function (v) {
    me.head.css('height:' + v + 'px;')
    me.body.css('top:' + v + 'px;')
    if (_ver1 == 'msie' && _ver2 < 7) { me._body.css('bottom:' + (_fh + v) + 'px;') }
    args.onChange(me, v, 'head')
  }
  me.setFoot = function (v) {
    me.foot.css('height:' + v + 'px;'); me.body.css('bottom:' + v + 'px;')
    if (_ver1 == 'msie' && _ver2 < 7) { me._body.css('bottom:' + (v + _hh) + 'px;') }
    body.css('bottom:' + v + 'px;')
    args.onChange(me, v, 'foot')
  }
  me.setBody = function (v, slip, cbFn) {
    var _h = head_h + v, _s = slip || 0, _f = cbFn || function () { }
    if (_s) { _base.ease(['height'], [_h], 600, 1, {}) } else { ; _base.css('height:' + _h + 'px;') }
    _f(me, _base)
    args.onChange(me, v, 'body')
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.BaseDivH = function (j) {
  /*
    {
        type: "BaseDivH",
        desc: "经典左中右三分结构, head-body-foot",
        args: {
            p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
            head_h: { desc: 'head的高度', defVal:0, dataType: 'int' },
            foot_h: { desc: 'foot的高度', defVal:0, dataType: 'int' },
            skin: { desc: '皮肤样式的class-name', defVal:'BaseDiv-Gray', dataType: 'string' },
            cn: { desc:'BaseDivH结构最外一层的类名(Class-Name)',defVal: '', dataType: 'string' },
            css: { desc:'BaseDivH结构最外一层的样式(Style)',defVal: '', dataType: 'string' },
            onChange:{ desc: '回调组件的Change事件', defVal: function (){}, dataType: 'function' }
        },
        containerAry: ['head','body','foot']
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, head_h: 0, foot_h: 0, cn: '', css: '', skin: { base: { cn: 'wp hp', css: '' }, head: { cn: '', css: '' }, body: { cn: '', css: '' }, foot: { cn: '', css: ''} }, onChange: _fn }
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    var _oBase = args.skin.base, _oHead = args.skin.head, _oBody = args.skin.body, _oFoot = args.skin.foot
    var baseCn = _oBase.cn || '', baseCss = _oBase.css || '',
	    headCn = _oHead.cn, headCss = $.box(',,' + args.head_h + ',') + _oHead.css,
	    bodyCn = _oBody.cn, bodyCss = _oBody.css,
	    footCn = _oFoot.cn, footCss = $.box(',,' + args.foot_h + ',') + _oFoot.css
    var base = args.p.adElm('', 'div').cn(baseCn).css(baseCss)
    me.base = base
    me.head = base.adElm('', 'div').cn('pa hp ' + headCn).css('top:0px;left:0px;' + headCss)
    me.body = base.adElm('', 'div').cn('pr hp ' + bodyCn).css('margin-right:' + args.foot_h + 'px;margin-left:' + args.head_h + 'px;')
    me.foot = base.adElm('', 'div').cn('pa hp ' + footCn).css('top:0px;right:0px;' + footCss)
  }
  me.init = function (j) { setDefault(j); layout() }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.Arrow = function (j) {
  // border:1px solid #FFC97C;background-color:#FFFEC9;
  var j = j || {}, cn = j.cn || '', css = j.css || '', comMode = j.comMode || 'normal', diff = j.diff || 3
  var p = $(j.p || $DB), dir = j.dir || 'bottom' // top, left, right, bottom
  var bc = j.borderColor || '#bbbbbb', bgc = j.backgroundColor || '#ffffff', _w = j.w || 10
  var box = j.box || {blw: _w, btw: _w, brw: _w, bbw: _w, blc: '#999999', btc: '#999999', brc: '#999999', bbc: '#999999'}
  var _blw = box.blw || box.w1, _btw = box.btw || box.w2, _brw = box.brw || box.w3, _bbw = box.bbw || box.w4
  var _blc = box.blc || box.c1, _btc = box.btc || box.c2, _brc = box.brc || box.c3, _bbc = box.bbc || box.c4
  var _bls = _blc ? 'solid' : 'dashed', _bts = _btc ? 'solid' : 'dashed'
  var _brs = _brc ? 'solid' : 'dashed', _bbs = _bbc ? 'solid' : 'dashed'
  var html = ''
  switch (comMode) {
	    case 'normal':
	        var _blCss = ';border-left:' + (_blw || 0) + 'px ' + (_blc || 'transparent') + ' ' + _bls + ';'
	        var _btCss = 'border-top:' + (_btw || 0) + 'px ' + (_btc || 'transparent') + ' ' + _bts + ';'
	        var _brCss = 'border-right:' + (_brw || 0) + 'px ' + (_brc || 'transparent') + ' ' + _brs + ';'
	        var _bbCss = 'border-bottom:' + (_bbw || 0) + 'px ' + (_bbc || 'transparent') + ' ' + _bbs + ';'
	        var _bCss = _blCss + _btCss + _brCss + _bbCss
	        html = '<div class="arrow ' + cn + '" style="' + css + _bCss + ';+overflow:hidden;"></div>'
	        break
	    case 'border':
	        var bw = 0
	        if (dir == 'bottom' || dir == 'top') { bw = $.m.p(p.csn('width') / 2) }
	        if (dir == 'left' || dir == 'right') { bw = $.m.p(p.csn('height') / 2) }
	        var _cCss = ';+overflow:hidden;border-width:' + bw + 'px;', _s1 = '', _s2 = ''
	        switch (dir) {
	            case 'bottom':
	                _cCss += 'border-style:solid dashed dashed dashed;border-color:' + bc + ' transparent transparent transparent;'
	                _s2 += 'top:-' + diff + 'px;border-color:' + bgc + ' transparent transparent transparent;'
	                break
	            case 'top':
	                _cCss += 'border-style:dashed dashed solid dashed;border-color:transparent transparent ' + bc + ' transparent;'
	                _s2 += 'bottom:-' + diff + 'px;border-color:transparent transparent ' + bgc + ' transparent;'
	                break
	            case 'right':
	                _cCss += 'border-style:dashed dashed dashed solid;border-color:transparent transparent transparent ' + bc + ';'
	                _s2 += 'top:0px;right:' + diff + 'px;border-color:transparent transparent transparent ' + bgc + ';'
	                break
	            case 'left':
	                _cCss += 'border-style:dashed solid dashed dashed;border-color:transparent ' + bc + ' transparent transparent;'
	                _s2 += 'top:0px;left:' + diff + 'px;border-color:transparent ' + bgc + ' transparent transparent'
	                break
	        }
	        html = '<div class="arrow" style="' + _cCss + '" ></div><div class="pa arrow" style="' + _cCss + _s2 + ';" ></div>'
	        break
  }
  p.h(html)
}

$.UI.ArrowTips = function (j) {
  var me = this
  var p, dir, pos, x, y, w, h, comMode, arrowBC, arrSize, cn, css, ifClose
  var owner, eClose, eDir
  me.body
  me.onClose
  function setDef (j) {
    p = $(j.p || $DB)
    dir = j.dir || 'top'
    pos = j.pos || 10
    x = j.x || 50
    y = j.y || 50
    w = j.w || 100
    h = j.h || 80
    arrowBC = j.arrowBC || '#BBBBBB'
    arrSize = j.arrSize || 20
    cn = j.cn || ''
    css = j.css || ''
    comMode = j.comMode || 'border'
    ifClose = j.ifClose
    if (ifClose == null) { ifClose = true }
    me.onClose = j.onClose || function () {}
  }

  function layout () {
    owner = p.adElm('', 'div').cn('pa z10 r5 b_15 ' + cn).css('left:' + x + 'px;top:' + y + 'px;padding:8px 20px 8px 8px;width:' + w + 'px;height:' + h + 'px;' + css)
    if (ifClose) {
      eClose = owner.adElm('', 'div').cn('pa w15 h15 cp')
        .css($.UI.ico16_xy(5, 8) + ';right:3px;top:2px;').attr('title', '关闭')
    }
    if (pos < 0) { pos = 0 }
    if (pos > h) { pos = h - arrSize }
    if (pos > w) { pos = w - arrSize }
    me.body = owner.adElm('', 'div').cn('oa hp')
    var _dirCss = 'width:' + arrSize + 'px;height:' + arrSize + 'px;', _dirH = ''
    switch (dir) {
      case 'top':
        _dirCss += 'top:-' + arrSize + 'px;left:' + pos + 'px;'
        break
      case 'bottom':
        _dirCss += 'bottom:-' + arrSize + 'px;left:' + pos + 'px;'
        break
      case 'right':
        _dirCss += 'right:-' + arrSize + 'px;top:' + pos + 'px;'
        break
      case 'left':
        _dirCss += 'left:-' + arrSize + 'px;top:' + pos + 'px;'
        break
    }
    eDir = owner.adElm('', 'div').cn('pa oh ').css(_dirCss)
    var _aBC = $S(owner).borderColor, _aBGC = $S(owner).backgroundColor
    if (!_aBC) { _aBC = owner.cs('border-color') }
    if (_aBGC) { _aBGC = owner.cs('borderground-color') }
    new $.UI.Arrow({
      p: eDir,
      diff: 2,
      comMode: comMode,
      borderColor: _aBC,
      backgroundColor: _aBGC,
      cn: 'cp',
      css: css,
      dir: dir
    })
  }
  function bindEvent () {
    if (eClose) {
      eClose.evt('click', function (e) { var e = $.e.fix(e); e.stop(); me.onClose(); me.remove() })
    }
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); me.resize(1); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.MiniTips = function (j) {
  var me = this, _fn = function () { }
  var args = {
    p: $DB,
    dir: 'top',
    pos: 10,
    x: 20,
    y: 20,
    minWidth: 25,
    minHeight: 18,
    ifShow: true,
    ifClose: false,
    text: '',
    comMode: 'border',
    arrowSize: 13,
    cn: 'r3 fs12',
    css: 'padding:3px 5px;border:1px solid #FFC97C;background-color:#FFFEC9;'
  }
  var p, dir, pos, minW, minH, arrSize
  var owner, eDir, body
  function setDefault (j) {
    args = $.Util.initArgs(j, args)
    dir = args.dir; pos = args.pos; minW = args.minWidth; minH = args.minHeight; arrSize = args.arrowSize
  }
  function layout () {
    owner = args.p.adElm('', 'div').cn('pa z10 ' + args.cn).css(args.css)
    if (pos < 0) { pos = 0 }
    if (pos > minH) { pos = minH - arrSize }
    if (pos > minW) { pos = minW - arrSize }
    if (args.ifClose) {
      owner.css('padding:18px;')
      owner.adElm('', 'div').cn('w15 h15 fr cp').css('margin-top:-15px;margin-right:-15px;' + $.UI.ico24_xy(13, 0)).attr('title', '关闭')
        .evt('click', function () { me.remove() })
    }
    body = owner.adElm('', 'div').cn('oh tac hp').css('min-width:' + minW + 'px;min-height:' + minH + 'px;line-height:18px;')
    me.body = body
    var _dirCss = 'width:' + arrSize + 'px;height:' + arrSize + 'px;', _dirH = ''
    switch (dir) {
      case 'top':
        _dirCss += 'top:-' + arrSize + 'px;left:' + pos + 'px;'
        break
      case 'bottom':
        _dirCss += 'bottom:-' + arrSize + 'px;left:' + pos + 'px;'
        break
      case 'right':
        _dirCss += 'right:-' + arrSize + 'px;top:' + pos + 'px;'
        break
      case 'left':
        _dirCss += 'left:-' + arrSize + 'px;top:' + pos + 'px;'
        break
    }
    eDir = owner.adElm('', 'div').cn('pa oh').css(_dirCss)
    var _aBC = $S(owner).borderColor, _aBGC = $S(owner).backgroundColor
    if (!_aBC) { _aBC = owner.cs('border-color') }
    if (!_aBGC) { _aBGC = owner.cs('borderground-color') }
    new $.UI.Arrow({ p: eDir, diff: 1, comMode: args.comMode, borderColor: _aBC, backgroundColor: _aBGC, cn: 'cp', css: args.css, dir: dir })
    me.setText(args.text); me.setPos(args.x, args.y)
    if (!args.ifShow) { me.hide() }
  }
  me.setPos = function (x, y) { args.x = x; args.y = y; owner.css('left:' + x + 'px;top:' + y + 'px;'); return me }
  me.setText = function (txt) { body.h(txt); return me }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.ResizeTool = function (p) {
  var me = this
  var dragFlag
  var p_e_mouseover = function () {
    if ($.global.resizeToolDiv) { return }
    var _pos = p.pos()
    var pDx = _pos.x + _pos.w
    var pDy = _pos.y + _pos.h
    dragFlag = $DB.adElm('', 'div').cn('pa cnw b_1')
      .css($.box((pDx - 16) + ',' + (pDy - 16) + ',15,15') + $.UI.ico16_xy(4, 14))
      .evt('mousedown', resizeDiv_e_mousedown)
    $.global.resizeToolDiv = dragFlag
  }
  var resizeDiv_e_mousedown = function (e) {
    var e = $.e.fix(e), _e = e.t; e.stop()
    var _pPos = p.pos(), _pX = _pPos.x, _pY = _pPos.y
    $.drag.init(dragFlag)
    dragFlag.onDragStart = function () { }
    dragFlag.onDrag = function (a) {
      var _newPos = dragFlag.pos()
      var _newW = _newPos.x - _pX + 12, _newH = _newPos.y - _pY + 12
      p.css('width:' + _newW + 'px;height:' + _newH + 'px;')
    }
    dragFlag.onDragEnd = function () {}
    $.drag.start(e, dragFlag)
  }
  /*
    var p_e_mouseout=function(e){
        var e = $.e.fix(e), _e = e.t;
        //alert('xx');
        var x = e.x, y = e.y;
        //alert([x, y]);
        var _eles = $D.elementFromPoint(x,y);
        //alert(_eles.innerHTML);

        if(_eles!=$.global.resizeToolDiv){

            var _newPos = p.pos();
            //alert([x, y, _newPos.x, _newPos.y, _newPos.w, _newPos.h]);
            if($.global.resizeToolDiv){
                $.global.resizeToolDiv.r();
                $.global.resizeToolDiv=null;
            }
        }else {
            //alert('isDragFlag');
        }
        e.stop();
    }
    */
  var p_e_mousemove = function (e) {
    var e = $.e.fix(e), _e = e.t; e.stop()
    // var x = e.x, y = e.y;
    // var _eles = $D.elementFromPoint(x,y);

    /*
        if(_eles!=$.global.resizeToolDiv){

            var _newPos = p.pos();
            //alert([x, y, _newPos.x, _newPos.y, _newPos.w, _newPos.h]);
            if($.global.resizeToolDiv){
                $.global.resizeToolDiv.r();
                $.global.resizeToolDiv=null;
            }
        }else {
            //alert('isDragFlag');
        } */
  }
  p.evt('mouseover', p_e_mouseover).evt('mousemove', p_e_mousemove)
  return me
}

$.UI.Resizer = function (j) {
  var me = this, _fn = function () { }
  var args = { p: $DB, skin: 'Resizer-default', icon: '', minWidth: 50, minHeight: 50, onDragStart: _fn, onDrag: _fn, onDragEnd: _fn }
  args = $.Util.initArgs(j, args)
  var p = args.p, _ePn = p.pn(), _w = p.csn('width'), _h = p.csn('height'), _z_index, _selfMask
  var minW = args.minWidth, minH = args.minHeight
  var owner = p.adElm('', 'div').cn('Resizer ' + args.skin).css('left:' + (_w - 14) + 'px;top:' + (_h - 14) + 'px;')
  owner.evt('mousedown', function (e) {
    var e = $.e.fix(e), _e = e.t; e.stop()
    var _pp = p.pos(), _pnp = _ePn.pos()
    me.x = _pp.x - _pnp.x
    me.y = _pp.y - _pnp.y
    me.w = _pp.w - 2
    me.h = _pp.h - 2
    $.drag.init(owner, null, minW, null, minH, null, null, null)
    owner.onDragStart = function () {
      _z_index = $S(p).zIndex
      $S(p).zIndex = 10000
      if (!_selfMask) { _selfMask = new $.UI.Mask({ p: p, alpha: 0, cn: 'cnw' }) }
      args.onDragStart(me)
    }
    owner.onDrag = function (a) {
      if (!$.global.dragMask) { $.global.dragMask = new $.UI.Mask({ p: $DB, alpha: 0, cn: 'cnw' }) } else { $.global.dragMask.show() }
      var _flagPos = owner.pos(), _pPos = p.pos()
      var _newW = _flagPos.x - _pPos.x + 14, _newH = _flagPos.y - _pPos.y + 14
      if (_newW < minW) { _newW = minW }
      if (_newH < minH) { _newH = minH }
      p.css($.box(me.x + ',' + me.y + ',' + _newW + ',' + _newH))
      args.onDrag(me, _newW, _newH)
    }
    owner.onDragEnd = function () {
      $S(p).zIndex = _z_index
      if ($.global.dragMask != null) { $.global.dragMask.hide() }
      if (_selfMask) { _selfMask.remove(); _selfMask = null }
      args.onDragEnd(me)
    }
    $.drag.start(e, owner)
  })
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  return me
}

$.UI.Tips = function (j) {
  /*
    {
    type: "Tips",
    desc: "经典左中右三分结构, head-body-foot",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    maskOwner: { desc: 'mask父容器', defVal: 'body', dataType: 'DOM', comType:'Label' },
    maskAlpha: { desc: 'mask的透明度', defVal: 10, dataType: 'int' },
    head_h: { desc: 'head高度', defVal:0, dataType: 'int' },
    foot_h: { desc: 'foot高度', defVal:0, dataType: 'int' },
    icon_h: { desc: 'head图片的高度', defVal:14, dataType: 'int' },
    x: { desc: '相对于父容器的横坐标', defVal:0, dataType: 'int' },
    y: { desc: '相对于父容器的纵坐标', defVal:0, dataType: 'int' },
    lifeTime: { desc: '生命周期, 过了这个时间tips自动消失', defVal:0, dataType: 'int' },
    width: { desc: '组件的宽度', defVal:0, dataType: 'int' },
    height: { desc: '组件的高度', defVal:0, dataType: 'int' },
    comMode: { desc: '组件的模式', defVal:0, dataType: 'int' },
    title: { desc: 'head上的标题文字', defVal:'', dataType: 'string' },
    content: { desc: 'body部分的内容', defVal:'', dataType: 'string' },
    icon: { desc: 'head上的标题图标', defVal:'', dataType: 'string' },
    skin: { desc: '皮肤样式的class-name', defVal:'Tips-default', dataType: 'string' },
    cn: { desc:'BaseDivH结构最外一层的类名(Class-Name)',defVal: 'b_16 bc_7 z4', dataType: 'string' },
    css: { desc:'BaseDivH结构最外一层的样式(Style)',defVal: '', dataType: 'string' },
    toolBarSkin: { desc: 'head的ToolBar的皮肤', defVal:'Button-toolbar-icon', dataType: 'string' },
    toolBarAry:  { desc:'toolBar子项对象集合数组',defVal: [], dataType: 'array' },
    ifDrag: { desc: '是否可拖动', defVal:false, dataType: 'bool' },
    ifFixedHeight: { desc: '是否固定body部分的高度', defVal:true, dataType: 'bool' },
    ifMask: { desc: '是否有遮罩阴影', defVal:false, dataType: 'bool' },
    ifClose: { desc: '是否有关闭按钮', defVal:false, dataType: 'bool' },
    ifExpand: { desc: '是否有展开按钮', defVal:false, dataType: 'bool' },
    ifResize: { desc: '是否可以Resize', defVal:false, dataType: 'bool' },
    ifMax: { desc: '是否有最大化按钮', defVal:false, dataType: 'bool' },
    ifMin: { desc: '是否有最小化按钮', defVal:false, dataType: 'bool' },
    ifFullScreen: { desc: '是否有全屏按钮', defVal:false, dataType: 'bool' },
    onToolBarMouseDown:{ desc: '回调ToolBar鼠标按下的事件', defVal: function (){}, dataType: 'function' },
    onToolBarMenuClick:{ desc: '回调ToolBar菜单点击事件', defVal: function (){}, dataType: 'function' },
    onToolBarClick:{ desc: '回调ToolBar点击事件', defVal: function (){}, dataType: 'function' },
    onClose:{ desc: '回调组件的关闭事件', defVal: function (){}, dataType: 'function' },
    onClick:{ desc: '回调组件的点击事件', defVal: function (){}, dataType: 'function' },
    onResize:{ desc: '回调组件的Resize事件', defVal: function (){}, dataType: 'function' },
    onResizeEnd:{ desc: '回调组件的Resize结束的事件', defVal: function (){}, dataType: 'function' },
    onDrag:{ desc: '回调组件的拖动事件', defVal: function (){}, dataType: 'function' },
    onDragEnd:{ desc: '回调组拖动结束的事件', defVal: function (){}, dataType: 'function' }
    },
    containerAry: ['head','body','foot']
    }
    */
  var me = this, _fn = function () { }
  var args = {
    p: $DB,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    title: '',
    icon: '',
    css: '',
    cn: 'b_16 bc_7 z4',
    comMode: 0,
    skin: 'Tips-default',
    toolBarSkin: 'Button-toolbar-icon',
    lifeTime: 0,
    toolBarAry: [],
    ifDrag: false,
    ifFixedHeight: true,
    ifMask: false,
    ifClose: false,
    ifExpand: false,
    ifResize: false,
    ifMax: false,
    ifMin: false,
    ifFullScreen: false,
    head_h: 0,
    foot_h: 0,
    content: '',
    icon_h: 14,
    maskOwner: null,
    maskAlpha: 10,
    onToolBarMouseDown: _fn,
    onToolBarMenuClick: _fn,
    onClose: _fn,
    onClick: _fn,
    onResize: _fn,
    onResizeEnd: _fn,
    onDrag: _fn,
    onDragEnd: _fn,
    onToolBarClick: _fn,
    onLoadToolBarSuccess: _fn
  }
  var owner, mask
  var eBody, eIcon, eTitle
  function setDefault (j) { args = $.Util.initArgs(j, args); if (!args.maskOwner) { args.maskOwner = args.p } }
  function layout () {
    var eHead, eFoot, _pos = getXY(args.comMode), _hHtml = '<a style="float:left;margin:' + (args.head_h - args.icon_h) / 2.5 + 'px 3px;"></a><span style="float:left;line-height:30px;"></span>'
    if (args.ifFixedHeight) {
      var _bd = new $.UI.BaseDiv({ p: args.p, head_h: args.head_h, foot_h: args.foot_h, cn: args.skin + ' ' + args.cn })
      owner = _bd.base; eHead = _bd.head; eBody = _bd.body; eFoot = _bd.foot
      eHead.ac('Tips-head').h(_hHtml); eBody.ac('Tips-body'); eFoot.ac('Tips-foot')
    } else {
      var _sCss = 'height:{0}px;line-height:{0}px;', _sHtml = '<div class="Tips-head oh" style="{0}">{1}</div><div class="Tips-body"></div><div class="Tips-foot" style="{2}"></div>'
      owner = args.p.adElm('', 'div').cn('pa ' + args.skin + ' ' + args.cn).h(_sHtml.format(_sCss.format(args.head_h), _hHtml, _sCss.format(args.foot_h)))
      eHead = owner.fc(); eBody = eHead.ns(); eFoot = eBody.ns()
    }
    var _sCss = args.css
    if (args.width) { _sCss += 'width:' + args.width + 'px;' }
    if (_sCss) { owner.css(_sCss) }
    me.base = owner; me.body = eBody; me.head = eHead; me.foot = eFoot
    eIcon = eHead.fc(); eTitle = eIcon.ns()
    toolBarLayout(eHead)
    me.setTitle(args.title)
    me.setIcon(args.icon)
    me.setWH(args.width, args.height)
    me.setPos(_pos[0], _pos[1])
    me.setContent(args.content)
    if (args.ifDrag) {
      eHead.ac('cm')
      var _z_index
      $.drag.init(eHead, owner, null, null, null, null, null)
      owner.onDragStart = function () {
        _z_index = $S(this).zIndex
        $S(this).zIndex = 10000
      }
      owner.onDrag = function () { args.onDrag(me) }
      owner.onDragEnd = function () {
        $S(this).zIndex = _z_index
        owner.alpha(10000)
        owner.style.filter = ''
        args.onDragEnd(me)
      }
    }
    if (args.ifResize) { resizeDiv = new $.UI.Resizer({ p: owner, onDrag: function () { args.onResize({ Tips: me }) }, onDragEnd: function (_m, _a, _b) { args.onResizeEnd(me, _m, _a, _b) } }) };
    owner.onselectstart = function () { return false }
    if (args.ifMask) { mask = new $.UI.Mask({ p: args.maskOwner, alpha: args.maskAlpha, onClick: onMaskClick }); owner.css('z-index:11;') }
    if (args.lifeTime > 0) { setTimeout(function () { if (me) { me.removeAni() } }, args.lifeTime) }
    if (args.ifClose) { owner.abElm('', 'a').cn('tips-close').attr('title', '关闭').evt('click', function () { if (args.onClose(me) != false) { me.removeAni() }; }) }
  }
  function bindEvent () {
    $(window).evt('resize', function () {

    })
  }

  function onMaskClick () {
    if ($('').split(',')[0].toLow() == 'safari') {
      var _nC = new $.nCount()
      var _a = setInterval(function () { setRotateVal(_nC.getN()) }, 10)
      function setRotateVal (val) {
        switch (val % 4) {
          case 0:
            owner.css('-webkit-transform: rotate(-1deg);')
            break
          case 1:
            owner.css('-webkit-transform: rotate(0deg);')
            break
          case 2:
            owner.css('-webkit-transform: rotate(1deg);')
            break
          case 3:
            owner.css('-webkit-transform: rotate(0deg);')
            break
        }
      }
      setTimeout(function () { clearInterval(_a) }, 400)
    } else {
      var _a = setInterval(function () { if (me && me.base) { me.base.ac('tips_focus') } }, 10)
      setTimeout(function () { clearInterval(_a); if (me && me.base) { me.base.dc('tips_focus') } }, 400)
    }
  }

  function toolBarLayout (p) {
    var _ary = []
    if (args.ifExpand) { _ary.push({ name: 'TIPS-SYS-EXPAND', icon: 'icon-compact-bold-b', title: '展开' }) }
    if (args.ifFullScreen) { _ary.push({ name: 'TIPS-SYS-FULLSCREEN', icon: 'icon-glyph-zoom-in', title: '全屏' }) }
    _ary = _ary.concat(args.toolBarAry)
    me.toolBar = new $.UI.ButtonSet({ p: p, loadApi: args.toolBarLoadApi, gtID: args.gtID, gtType: args.gtType, gbsID: args.gbsID, gbsType: args.gbsType, ifRights: args.ifRights, items: _ary, onClick: onToolBarClick, onSuccess: args.onLoadToolBarSuccess, onMouseDown: args.onToolBarMouseDown, onMenuClick: args.onToolBarMenuClick, itemAlign: 'right', itemSkin: args.toolBarSkin, skin: args.btnSetSkin })
  }

  function onToolBarClick (obj) {
    obj.Tips = me
    args.onToolBarClick(obj)
  }

  function getXY (comMode) {
    var x, y, w = args.width, h = args.height
    switch (comMode) {
      case 1:
        x = $.wh()[0] - w / 2; y = 120; break
      case 2:
        var _eMO = args.maskOwner, _mW = _eMO.csn('width') / 2, _mH = _eMO.csn('height') / 2
        x = _mW - w / 2; y = $.m.p(_mH - h / 1.5)
        break
      case 3:
        var _wh = $.wh()
        x = $.m.p(_wh[0] - w / 2); y = $.m.p(_wh[1] - h / 2)
        break
      case 4:
        x = $.wh()[0] - w / 2; y = 30; break
      case 'auto':
        x = 'auto'; y = 'auto'; break
      case 'x-auto':
        x = 'auto'; y = args.y; break
      case 'y-auto':
        x = args.x; y = 'auto'; break
      default:
        x = args.x; y = args.y; break
    }
    return [x, y]
  }
  me.setWH = function (width, height) { if (width && height) { args.width = width; args.height = height; owner.css('width:' + width + 'px;height:' + height + 'px;border:1px solid #cccccc;') } return me }
  me.setPos = function (x, y) {
    var _pos = ''
    if (x == 'auto') { _pos += 'left:50%;margin-left:-' + args.width / 2 + 'px;' } else { _pos += 'left:' + x + 'px;' }
    if (y == 'auto') { _pos += 'top:50%;margin-top:-' + args.height / 2 + 'px;' } else { _pos += 'top:' + y + 'px;' }
    owner.css(_pos)
    return me
  }
  me.setTitle = function (v) { eTitle.h(v); return me }
  me.setIcon = function (v) { eIcon.cn(v); return me }
  me.setContent = function (v) { eBody.h(v); if (!args.width && v) { owner.css('margin-left:-' + (eBody.csn('width') / 2) + 'px;') } return me }
  me.setZIndex = function (v) { if (v != null || v) { owner.css('z-index:' + v) } return me }
  me.setFullScreen = function () { }
  me.reStoreScreen = function () { }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); if (mask) { mask.show() } return me }
  me.hide = function () { owner.hide(); if (mask) { mask.hide() } return me }
  me.remove = function () { owner.r(); if (mask) { mask.remove(); mask = null } me = null }
  me.removeAni = function (t) {
    owner.alpha(100).ease(['alpha', 'top'], [0, owner.csn('top') - 20], t || 400, 1, { e: function () { if (me && me.remove) { me.remove() } } })
  }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.PopTips = function (j) {
  /*
    {
    type: "PopTips",
    desc: "弹出的提示框, 有文字提示类型, 确认类型, 模式提示类型",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    width: { desc: '组件的宽度', defVal:150, dataType: 'int' },
    height: { desc: '组件的高度', defVal:120, dataType: 'int' },
    comMode: { desc: '组件的模式', defVal:'auto', dataType: 'int' },
    type: { desc: '类型', defVal:'alert', dataType: 'string' },
    content: { desc: 'body部分的内容', defVal:'', dataType: 'string' },
    ifClose: { desc: '是否有关闭按钮', defVal:true, dataType: 'bool' },
    ifShow: { desc: '是否显示', defVal:true, dataType: 'bool' },
    onOk:{ desc: '回调确认的事件', defVal: function (){}, dataType: 'function' },
    onCancle:{ desc: '回调取消的事件', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, ifShow: true, ifClose: true, width: 150, ifFixedHeight: false, height: 150, comMode: 'auto', type: 'alert', content: '', onOk: _fn, onCancle: _fn }
  var tips
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    switch (args.type) {
      case 'alert':
        tips = new $.UI.Tips({ ifFixedHeight: args.ifFixedHeight, width: args.width, content: args.content })
        break
      case 'tips':
        tips = new $.UI.Tips({ ifFixedHeight: args.ifFixedHeight, ifMask: args.ifMask, comMode: 'x-auto', y: 10, css: 'padding: 8px 15px;font-size: 14px;color: #fff;text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.2);z-index: 1001;' })
        break
      case 'confirm':
        args.head_h = 30; args.foot_h = 40; args.css = 'z-index:1100;'; args.title = '确认对话框'; args.comMode = 'x-auto'; args.y = 250; args.ifFixedHeight = true
        args.content = '<div class="fl wp fs12 hh" style="height:54px;line-height:54px;" ><div class="fl hp wa quest_40 m5" style="width:40px;"></div><div style="width:' + (args.width - 84) + 'px;" class="fl p5 hp">' + args.content + '</div></div>'
        args.onClose = function () { me.hide(); return false }
        tips = new $.UI.Tips(args)
        me.button = new $.UI.ButtonSet({ p: tips.foot, itemAlign: 'right', items: [{ text: '确定', name: 'confirm', skin: 'Button-blue', css: 'margin-top:7px;', cn: 'mr10' }, { text: '取消', name: 'cancle', skin: 'Button-danger', css: 'margin-top:7px;', cn: 'mr10'}], onClick: onBtnClick })
        break
      case 'arrow':

        break
    }
    if (!args.ifShow) { me.hide() }
  }
  function onBtnClick (obj) {
    obj.PopTips = me
    switch (obj.name) {
      case 'confirm': args.onOk(obj); break
      case 'cancle': args.onCancle(obj); break
    }
    me.remove()
  }
  function setTipsContent (text, state) {
    tips.setContent(text)
    var _sCss = ''
    switch (state) {
      case 'ok': case 'pass': _sCss = 'background-color: #00cc33;border:1px solid #00CC33;'; break
      case 'error': _sCss = 'background-color: #f00;border:1px solid #FC0808;'; break
      case 'warn': _sCss = 'background-color: #ff7800;border:1px solid #FF7800;'; break
      case 'loading': _sCss = 'background-color: #3EABFF;border:1px solid #3EABFF;'; break
      default: _sCss = 'background-color: #3EABFF;border:1px solid #3EABFF;'; break
    }
    if (_sCss) { tips.base.css(_sCss) }
  }

  me.setWidth = function (width) {
    if (width != null) {
      tips.base.css('width:' + width + 'px;')
      tips.body.fc().chn(1).css('width:' + (width - 84) + 'px;')
    }
    return me
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function (text, state) {
    args.ifShow = true
    if (text != null) {
      switch (args.type) {
        case 'alert':

          break
        case 'tips':
          tips.show(); setTipsContent(text, state); setTimeout(function () { me.hide() }, 2000); break
        case 'confirm':
          tips.body.fc().chn(1).h(text); tips.base.css('z-index:1100;'); tips.base.ns().css('z-index:1009;'); tips.show(); break
      }
    }
    return me
  }
  me.hide = function () { args.ifShow = false; tips.hide(); return me }
  me.remove = function () { return me.hide() }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.Json = function (j) {
  /*
    {
        type: "Json",
        desc: "Json视图和编辑器的整合",
        args: {
            p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
            title: { desc: '标题', defVal:'', dataType: 'string' },
            value: { desc: 'json值', defVal:{}, dataType: 'json' },
            ifClose: { desc: '是否可以关闭', defVal: false, dataType: 'bool' },
            ifEdit: { desc: '是否可以编辑', defVal: false, dataType: 'bool' },
            onClick:{ desc: '回调Click事件', defVal: function (){}, dataType: 'function' }
        }
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, title: '', value: {}, ifClose: false, ifEdit: false, onClick: _fn }
  var owner, eContent, jValue
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    owner = args.p.adElm('', 'div').cn('wp ha')
    var panel = new $.UI.Panel({ p: owner, title: args.title, ifClose: args.ifClose, ifEdit: args.ifEdit, onClick: function (obj) { obj.Json = me; args.onClick(obj) }})
    eContent = panel.eContent
    me.load(args.value)
  }
  me.load = function (value) {
    var _val = value || {}; eContent.h('')
    jValue = _val
    switch ($.getType(_val)) {
      case 'string':
        _val = $(_val); return me.load(_val)
      case 'object':
        for (var k in _val) {
          var _v = _val[k], _eI = eContent.adElm('', 'div').cn('fl wp')
          switch (typeof _v) {
            case 'object':
              new $.UI.Json({ p: _eI, title: k, value: _v })
              break
            default:
              _eI.h('<li class="h20 lh20 fs13"><div class="fl hp" style="width:21px;"></div><span class="fl fwb" style="max-width:120px;">' + k + ':</span><span class="fl ml5" style="max-width:120px;" MTips="1">' + _v + '</span></li>')
              break
          }
        }
        break
      case 'array':
        for (var i = 0; i < _val.length; i++) {
          var _v = _val[i], _eI = eContent.adElm('', 'div').cn('fl wp')
          switch (typeof _v) {
            case 'object':
              new $.UI.Json({ p: _eI, title: i, value: _v })
              break
            default:
              _eI.h('<li class="h20 lh20 fs13"><div class="fl hp" style="width:21px;"></div><span class="fl fwb" style="max-width:120px;" MTips="1">' + _v + '</span></li>')
              break
          }
        }
        break
    }
    return me
  }

  function onClick () {

  }
  me.setValue = function (v) { me.load(v); return me }
  me.getValue = function (v) { return jValue }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.Panel = function (j) {
  /*
    {
        type: "Panel",
        desc: "面板组件",
        args: {
            p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
            width: { desc: '宽度, 默认是null, 表示100%填充父容器', defVal:null, dataType: 'int' },
            height: { desc: '高度, 默认是null, 表示100%填充父容器', defVal:null, dataType: 'int' },
            ifFold: { desc: '是否可以关闭', defVal: false, dataType: 'bool' },
            ifFixedHeight: { desc: '是否可以编辑', defVal: false, dataType: 'bool' },
            ifEdit: { desc: '是否可以编辑', defVal: false, dataType: 'bool' },
            ifClose: { desc: '是否可以编辑', defVal: false, dataType: 'bool' },
            cn: { desc: 'classname样式', defVal: '', dataType: 'string' },
            css: { desc: 'css样式', defVal: '', dataType: 'string' },
            skin: { desc: '皮肤样式', defVal: 'Panel-json', dataType: 'string' },
            fieldSetCn: { desc: 'fieldset元素的样式', defVal: '', dataType: 'string' },
            title: { desc: '标题', defVal: '', dataType: 'string' },
            content: { desc: '显示的内容', defVal: '', dataType: 'string' },
            onExpand:{ desc: '回调展开(Expand)事件', defVal: function (){}, dataType: 'function' },
            onClose:{ desc: '回调关闭(Close)事件', defVal: function (){}, dataType: 'function' },
            onClick:{ desc: '回调Click事件', defVal: function (){}, dataType: 'function' }
        }
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, width: null, height: null, ifFold: false, ifFixedHeight: false, ifEdit: false, ifClose: false, cn: '', css: '', skin: 'Panel-json', fieldSetCn: '', title: '', content: '', onExpand: _fn, onClose: _fn, onClick: _fn }
  var owner, eIcon, eTitle, eContent
  var sHtml = '<fieldset><legend><a class="expand unfold"></a><span class="fwb"></span><a title="close" class="close"></a><a title="edit" class="edit"></a></legend><div></div></fieldset>'
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    var _cn = args.skin + ' ' + args.cn, _css = args.css
    if (args.width) { _css += 'width:' + args.width + 'px;' }
    if (args.height) { _css += 'height:' + args.height + 'px;' }
    if (args.ifFixedHeight) { _cn += ' hp' } else { _cn += ' ha' }
    owner = args.p.adElm('', 'div').cn('wp ' + _cn).css(_css).h(sHtml)
    var _eLeg = owner.fc().fc()
    eIcon = _eLeg.fc(); eTitle = eIcon.ns(); eContent = _eLeg.ns(); me.eContent = me.body = eContent
    me.setTitle(args.title)
    me.setContent(args.content)
    if (args.ifFold) { me.expand() }
    _eLeg.evt('click', function (e) {
      var e = $.e.fix(e), _e = e.t
      switch (_e.className) {
        case 'close':
          if (args.onClose({ Panel: me }) != false) { me.remove() }; break
        case 'edit':
          args.onClick({ Panel: me }); break
        default:
          me.expand(); break
      }
    })
    if (!args.ifEdit) { $(_eLeg.lastChild).r() }
    if (!args.ifClose) { eTitle.ns().r() }
  }
  me.expand = function () {
    var _cs = eIcon.className.trim()
    if (_cs.indexOf('unfold') != -1) { eIcon.dc('unfold').ac('fold'); eContent.hide() } else { eIcon.dc('fold').ac('unfold'); eContent.show() }
    args.onExpand(me, _cs)
    return me
  }
  me.setTitle = function (v) { eTitle.h(v); return me }
  me.setContent = function (v) { eContent.h(v); return me }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.AttrPanel = function (j) {
  /*
    {
    type: "AttrPanel",
    desc: "属性面板组件",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    width: { desc: '宽度, 默认是null, 表示100%填充父容器', defVal:null, dataType: 'int' },
    height: { desc: '高度, 默认是null, 表示100%填充父容器', defVal:null, dataType: 'int' },
    titleHeight: { desc: '标题高度', defVal: 25, dataType: 'int' },
    ifFold: { desc: '是否可以关闭', defVal: false, dataType: 'bool' },
    ifFixedHeight: { desc: '是否可以编辑', defVal: false, dataType: 'bool' },
    ifEdit: { desc: '是否可以编辑', defVal: false, dataType: 'bool' },
    ifClose: { desc: '是否可以关闭', defVal: false, dataType: 'bool' },
    icon: { desc: '标题上的图标', defVal: '', dataType: 'string' },
    cn: { desc: 'classname样式', defVal: '', dataType: 'string' },
    css: { desc: 'css样式', defVal: '', dataType: 'string' },
    skin: { desc: '皮肤样式', defVal: 'AttrPanel-default', dataType: 'string' },
    title: { desc: '标题', defVal: '', dataType: 'string' },
    toolBarAry: { desc: '工具栏的Button数组', defVal: '', dataType: 'string' },
    onExpand:{ desc: '回调展开(Expand)事件', defVal: function (){}, dataType: 'function' },
    onToolBarClick:{ desc: '回调工具栏上的Click事件', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, width: null, height: null, titleHeight: 25, skin: 'AttrPanel-default', ifFold: true, ifClose: false, ifExpand: true, ifFixedHeight: false, cn: '', css: '', title: '', icon: '', toolBarAry: [], onToolBarClick: _fn, onExpand: _fn }
  var owner, eIcon, eTitle, eContent
  var sI = '<a class="ToolBar {0}" title="{1}" key="{2}" ></a>'
  var sHtml = '<fieldset><legend><a></a><span></span>{0}</legend><div></div></fieldset>'
  var scrollBar, _expandIdx = 1
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    var _cn = args.skin + ' ' + args.cn, _css = args.css, _iAry = args.toolBarAry, _siAry = []
    if (args.width) { _css += 'width:' + args.width + 'px;' }
    if (args.height) { _css += 'height:' + args.height + 'px;' }
    if (args.ifFixedHeight) { _cn += ' hp' }
    if (args.ifExpand) { _expandIdx++; _iAry.unshift({ name: 'ATTRPANEL-SYS-EXPAND', icon: 'icon-glyph-chevron-right', title: '收起' }) }
    if (args.ifClose) { _expandIdx++; _iAry.unshift({ name: 'ATTRPANEL-SYS-CLOSE', icon: 'icon-glyph-remove', title: '关闭' }) }
    for (var i = 0, _len = _iAry.length; i < _len; i++) {
      var _iObj = _iAry[i] || {}
      _siAry.push(sI.format(_iObj.icon, _iObj.title, _iObj.name))
    }
    owner = args.p.adElm('', 'div').cn('AttrPanel ' + _cn).css(_css).h(sHtml.format(_siAry.join('')))
    var _eLeg = owner.fc().fc().css('height: ' + args.titleHeight + 'px;line-height: ' + args.titleHeight + 'px;').evt('click', function (e) { clickHead(e) })
    eIcon = _eLeg.fc(); eTitle = eIcon.ns(); eContent = _eLeg.ns()
    me.owner = me.body = eContent
    me.setTitle(args.title)
    me.setIcon(args.icon)
    me.setFold(args.ifFold)
  }

  function clickHead (e) {
    var e = $.e.fix(e), _e = e.t
    var _key = _e.attr('key')
    if (!_key) { return }
    switch (_key) {
      case 'ATTRPANEL-SYS-EXPAND': me.setFold(+_e.attr('state'), _e); break
      case 'ATTRPANEL-SYS-CLOSE': me.hide(); break
    }
    args.onToolBarClick({ AttrPanel: me, Key: _key, E: e, _E: _e, Args: args })
    e.stop()
  }

  me.html = function (v) {
    if (!scrollBar) { scrollBar = new $.UI.ScrollBar({ p: me.owner }) }
    scrollBar.html(v); return me
  }
  me.setFold = function (v, _e, ifExec) {
    if (!_e) { if (_expandIdx != 1) { _e = eIcon.pn().chn(_expandIdx) } else { return me } }
    if (v) {
      _e.dc('icon-glyph-chevron-down').ac('icon-glyph-chevron-right').attr('state', 0); eContent.show()
    } else {
      _e.dc('icon-glyph-chevron-right').ac('icon-glyph-chevron-down').attr('state', 1); eContent.hide()
    }
    if (ifExec != false) { args.onExpand({ AttrPanel: me, _E: _e, Args: args }) }
    return me
  }
  me.setTitle = function (title) { eTitle.h(title); return me }
  me.setIcon = function (icon) { eIcon.cn(icon); return me }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.Mask = function (j) {
  /*
    {
    type: "Mask",
    desc: "遮罩层",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    alpha: { desc: '透明度(百分百%)', defVal: 50, dataType: 'int' },
    cn: { desc: 'classname样式', defVal: '', dataType: 'string' },
    css: { desc: 'css样式', defVal: '', dataType: 'string' },
    onClick:{ desc: '回调Mask上Click事件', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _owner
  var args = { p: $DB, alpha: 50, cn: '', css: '', onClick: function () { } }
  function setDefault (j) { args = $.Util.initArgs(j, args); args.p = args.p || $DB }
  function layout () {
    _owner = args.p.adElm('', 'div').cn('Mask ' + args.cn).css(args.css).alpha(args.alpha)
    _owner.evt('click', function (e) { var e = $.e.fix(e); e.stop(); args.onClick(me); $.UI.DestroyPopElm('Mask--Click') })
    if (isIE) { _owner.h('<iframe frameBorder=0 frameBorder="no" allowTransparency="true" border="0" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" style="border-style: none" class="pa bc_0 z-1 dn" srclayout="blank.html"></iframe>') }
    me.maskDiv = _owner
    me.eContent = args.p.adElm('', 'div')
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { _owner.show(); return me }
  me.hide = function () { _owner.hide(); return me }
  me.remove = function () { _owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

// 日历测试
$.UI.Calendar = function (j) {
  /*
    {
    type: "Calendar",
    desc: "日历组件",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    head_h: { desc: 'head的高度', defVal: 26, dataType: 'int' },
    foot_h: { desc: 'foot的高度', defVal: 30, dataType: 'int' },
    dStyleAry: { desc: '日期样式数组', defVal: [], dataType: 'array' },
    hStyle: { desc: '星期样式', defVal: ['S','M','T','W','T','F','S'], dataType: 'array' },
    disabledDate: { desc: '不启用的日期数组', defVal: [], dataType: 'array' },
    enabledDate: { desc: '启用的日期数组', defVal: [], dataType: 'array' },
    minYear: { desc: '最小年份', defVal: 1910, dataType: 'int' },
    maxYear: { desc: '最大年份', defVal: 2200, dataType: 'int' },
    skin: { desc: '皮肤样式', defVal: 'Calendar-default', dataType: 'string' },
    selCn: { desc: '日期选中样式', defVal: 'td-select', dataType: 'string' },
    nowCn: { desc: '当天选中样式', defVal: 'td-now', dataType: 'string' },
    disabledCn: { desc: '日期不能选的样式', defVal: 'td-disabled', dataType: 'string' },
    nowD: { desc: '当天时间', defVal: '', dataType: 'string' },
    selDate: { desc: '选中时间', defVal: '', dataType: 'string' },
    ifLockYM: { desc: '是否锁住年月', defVal: false, dataType: 'bool' },
    ifLockDay: { desc: '是否锁住日期', defVal: false, dataType: 'bool' },
    ifClose: { desc: '是否有关闭按钮', defVal: false, dataType: 'bool' },
    onClick:{ desc: '回调Click事件', defVal: function (){}, dataType: 'function' },
    onClickBefore:{ desc: '回调Click之前的事件', defVal: function (){}, dataType: 'function' },
    onClose:{ desc: '回调关闭的事件', defVal: function (){}, dataType: 'function' },
    onYMClick:{ desc: '回调年月的Click事件', defVal: function (){}, dataType: 'function' },
    onHMSClose:{ desc: '回调时分秒的Click事件', defVal: function (){}, dataType: 'function' },
    onBtnClick:{ desc: '回调Button的Click事件', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _fn = function () { }
  var args = {
    p: $DB,
    dStyleAry: [],
    hStyle: 'SMTWTFS'.split(''),
    head_h: 26,
    foot_h: 0,
    ifLockYM: false,
    ifLockDay: false,
    ifClose: false,
    disabledDate: [],
    enabledDate: [],
    minYear: 1910,
    maxYear: 2200,
    skin: 'Calendar-default',
    selCn: 'td-select',
    nowCn: 'td-now',
    disabledCn: 'td-disabled',
    nowD: '',
    selDate: '',
    onClick: _fn,
    onClickBefore: _fn,
    onClose: _fn,
    onYMClick: _fn,
    onHMSClose: _fn,
    onBtnClick: _fn
  }
  var owner, eBody, eTable, _eY, _eM, selDate
  me.eSelTD
  var attr = {}, tdIdxAry = [], _ifEnPart = false
  function setDefault (j) {
    args = $.Util.initArgs(j, args)
    selDate = args.nowD; args.disabledObj = {}; args.abledObj = {}
    for (var di = 0, _diLen = args.disabledDate.length; di < _diLen; di++) { args.disabledObj[args.disabledDate[di]] = true }
    for (var ai = 0, _aiLen = args.enabledDate.length; ai < _aiLen; ai++) { args.abledObj[args.enabledDate[ai]] = true; _ifEnPart = true }
  }
  function layout () {
    var _base = new $.UI.BaseDiv({ p: args.p, ifFixedHeight: true, head_h: args.head_h, foot_h: args.foot_h, skin: 'BaseDiv-Calendar' })
    eBody = _base.body; fillBody(args.nowD); fillHead(_base.head); fillFoot(_base.foot)
    if (args.ifLockDay) { eBody.adElm('', 'div').cn('lockDay').h('<span>日期已被锁定, 请选择时分秒!</span><div></div>') }
  }
  function bindEvent () {
    eBody.evt('click', function (e) {
      var e = $.e.fix(e), _e = e.t
      if (_e.pn().tagName == 'TD') {
        _e = _e.pn()
      } else if (_e.pn().pn().tagName == 'TD') {
        _e = _e.pn().pn()
      }
      var _tag = _e.tagName, _cn = _e.className
      if (_tag == 'TD' && _cn.indexOf(args.disabledCn) == -1) {
        var _val = _e.attr('dvalue')
        if (args.onClickBefore({ Calendar: me, Value: _val, _E: _e }) == false) { return }
        if (me.eSelTD) { me.eSelTD.dc(args.selCn) }
        _e.ac(args.selCn)
        me.eSelTD = _e; selDate = _val
        args.onClick({ Calendar: me, Value: _val })
      }
    })
    args.p.evt('click', function (e) { var e = $.e.fix(e); hidePopMYTips(); e.stop() })
  }

  function getHtmlByDate (date) {
    var nowD = new Date(), nowM, dAry, fD = new Date(), sD = new Date(), _now_D = new Date(), fDWeek, i, d, s1 = [], s2 = []
    var _initTDH = $.m.p((args.p.csn('height') - (args.head_h + args.foot_h + 35)) / 6), _initTDW = $.m.p((args.p.csn('width') / 7)), isC = false
    var dStyleAry = args.dStyleAry
    if (args.skin == 'Calendar-container') { isC = true }
    nowD = date ? nowD.str2Date(date) : nowD
    me.nowD = nowD
    nowM = nowD.getMonth(); dAry = nowD.date2Str().split(' ')[0].split('-')
    dAry[2] = 1
    fD.str2Date(dAry.join('-'))
    fDWeek = fD.getDay() + 1
    sD = fD
    sD.setDate(sD.getDate() - fDWeek)
    for (d = 0; d < 6; d++) {
      var colAry = []
      for (i = 0; i < 7; i++) {
        sD.setDate(sD.getDate() + 1)
        var _d = sD.date8('-'), c = (dStyleAry[_d] ? dStyleAry[_d] : 'cp'), cNowDStyle = '', cSelDStyle = ''
        if (sD.getMonth() != nowM) {
          c = args.disabledCn + ' cna'
        } else {
          if (selDate && sD.date8('-') == selDate) { cSelDStyle = ' ' + args.selCn }
        }
        if (_ifEnPart) {
          if (args.abledObj[_d]) { c = '' } else { c = args.disabledCn + ' cna' }
        } else {
          if (args.disabledObj[_d]) { c = args.disabledCn + ' cna' }
        }
        var _nowDate = _now_D.date2Str().split(' ')
        var _selectDate = sD.getFullYear() + '-' + ((+sD.getMonth()) + 1) + '-' + sD.getDate()
        if (_selectDate == _nowDate[0]) {
          if (nowD.getMonth() == sD.getMonth()) { cNowDStyle = ' ' + args.nowCn + ' ' }
        }
        var _tdHtml = '<td style="' + (i == 6 ? '' : 'border-right:1px solid #cccccc;') + 'border-top:1px solid #cccccc;' + (isC ? 'height:' + _initTDH + 'px;width:' + _initTDW + 'px;' : '') + '" class=" ' + c + ' ' + cNowDStyle + cSelDStyle + ' fs12" dValue="' + _d + '">'
        if (isC) {
          _tdHtml += '<div class="month-date">' + sD.getDate() + '</div><UL></UL><div></div>'
        } else {
          _tdHtml += sD.getDate()
        }
        _tdHtml += '</td>'
        tdIdxAry[_d] = [d, i]
        colAry.push(_tdHtml)
      }
      s1.push(colAry.join(''))
    }
    for (i = 0; i < 7; i++) { s2.push('<tr>' + (i == 0 ? '<th>' + args.hStyle.join('</th><th>') + '</th>' : s1[i - 1]) + '</tr>') }
    var st = '<div class="Calendar ' + args.skin + '"><table>' + s2.join('') + '</table></div>'
    return st
  }

  function hidePopMYTips () { if ($.global.popMYTips) { $.global.popMYTips.hide() } }
  function popMYTips (_e, items, fn) {
    if ($.global.popMYTips) { $.global.popMYTips.remove() }
    $.global.popMYTips = new $.UI.PopDialog({ p: $DB, css: 'min-width:60px;max-height:180px;' })
    var _pTips = $.global.popMYTips, _f = fn || _fn
    _pTips.set('ePop', _e).hide().init({ type: 'Menu', items: items }).show().evt('onClick', function (obj) { _f(obj, _pTips); _pTips.hide() })
  }

  function fillHead (eHead) {
    var _iconCn = 'cal-icon', _year = me.nowD.getFullYear(), _month = me.nowD.getMonth() + 1
    if (args.ifLockYM) { _iconCn = 'cal-icon-hidden' }
    eHead.h('<div><a class="yLeft {2}"></a><a class="yCenter cal-text" year="{0}">{0}年</a><a class="yRight {2}"></a><a class="mLeft {2}"></a><a class="mCenter cal-text" month="{1}">{1}月</a><a class="mRight {2}"></a></div>'.format(_year, _month, _iconCn))
    var _eIconPn = eHead.fc(); _eY = _eIconPn.chn(1); _eM = _eIconPn.chn(4)
    if (args.ifLockYM) { return false }
    eHead.evt('click', function (e) {
      var e = $.e.fix(e), _e = e.t, _rCn = _e.className.split(' ')[0]; hidePopMYTips()
      if (_e.tagName != 'A') { return }
      switch (_rCn.trim()) {
        case 'yLeft':
          me.setYM((+_eY.attr('year')) + 1)
          break
        case 'yCenter':
          if (!attr.yearItems) {
            attr.yearItems = []
            for (var i = _year + 3; i > _year - 3; i--) { attr.yearItems.push({ name: i, text: i }) }
          }
          popMYTips(_e, attr.yearItems, function (obj) { me.setYM(obj.Name) })
          break
        case 'yRight':
          me.setYM((+_eY.attr('year')) - 1)
          break
        case 'mLeft':
          var _m = +_eM.attr('month') - 1, _y = +_eY.attr('year')
          if (_m < 1) { _y = _y - 1; _m = 12 }
          if (_m < 10) { _m = '0' + _m }
          me.setYM(_y, _m)
          break
        case 'mCenter':
          if (!attr.monthItems) {
            attr.monthItems = []
            for (var i = 1; i < 13; i++) { attr.monthItems.push({ name: i, text: i }) }
          }
          popMYTips(_e, attr.monthItems, function (obj) { me.setYM(null, obj.Name) })
          break
        case 'mRight':
          var _m = +_eM.attr('month') + 1, _y = +_eY.attr('year')
          if (_m > 12) { _y = _y + 1; _m = 1 }
          if (_m < 10) { _m = '0' + _m }
          me.setYM(_y, _m)
          break
      }
      e.stop()
    })
  }
  function fillBody (date) { var _sData = date || me.nowD; eBody.h(getHtmlByDate(_sData)); eTable = eBody.fc().fc() }
  function fillFoot (p) {
    p.h('<div><a>12</a><a>12</a><a>12</a></div>')
  }
  me.setYM = function (year, month, day) {
    var _y = year || me.nowD.getFullYear(), _m = month || me.nowD.getMonth() + 1, _d = day || me.nowD.getDate()
    var _ymdStr = _y + '-' + _m + '-' + _d
    _eY.attr('year', _y).h(_y + '&nbsp;年'); _eM.attr('month', _m).h(_m + '&nbsp;月')
    fillBody(_ymdStr)
    args.onYMClick(_ymdStr)
  }
  me.getCurrYM = function () { var _y = _eY.attr('year'), _m = _eM.attr('month'); return [_y, _m] }
  me.resize = function () {
    var _pH = me.p.csn('height'), _tdH = $.m.p((_pH - _foot_h - 61) / 6)
    var _pW = me.p.csn('width'), _tdW = $.m.p(_pW / 7)
    var _tds = _body.find('td'), _len = _tds.length, i
    for (i = 0; i < _len; i++) {
      var _eTD = _tds[i]
      if (_eTD && _eTD.tagName == 'TD') { $(_eTD).css('height:' + _tdH + 'px;width:' + _tdW + 'px;') }
    }
  }
  me.getTDByDate = function (v) {
    var _idx = tdIdxAry[v]
    if (_idx) {
      var rId = _idx[0] + 1, cId = _idx[1]
      return $(eTable.rows[rId].cells[cId])
    }
  }
  me.setToday = function () {
    var _nd = new Date(), _y = _nd.getFullYear(), _m = _nd.getMonth() + 1
    eYObj.innerHTML = _y; eMObj.innerHTML = _m; layout()
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.Box = function (j) {
  var me = this, p = j.p || $DB, gaps = j.gaps || 10, cn = j.cn || '',
		 css3Box = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-ms-box-sizing:border-box;',
		 d = $(p),
		 ver = $('').split(',')
  me.resize = function () {
    var _d, _c, m = me
    if (!me.body) {
      _d = d.adElm('', 'div')
      _c = _d.adElm('', 'div')
      me.body = _c
    }
    _d.cn('pr').css('padding:' + gaps + 'px;' + $.box(',,' + (_d.pn().csn('width') - gaps * 2 - 2) + ',' + (_d.pn().csn('height') - gaps * 2 - 2)))
    _c.cn('pr hh ' + cn).css($.box('0,0,' + (_d.csn('width') - gaps * 2 - 4) + ',' + (_d.csn('height') - gaps * 2 - 4)))
  }
  if (ver[0] == 'msie' && +ver[1] < 8) { // fix ie6-7
    me.resize()
    $.UI.resizeArray.push(me)
  } else {
    me.body = d.adElm('', 'div').cn('pr wp hp').css('padding:' + gaps + 'px;' + $.box('0,0,,') + css3Box).adElm('', 'div').cn('wp hp hh ' + cn).css(css3Box)
  }
  return me
}

$.UI.Tab = function (j) {
  /*
    {
    type: "Tab",
    desc: "可以进行切换的Tab",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    head_h: { desc: 'head的高度', defVal: 35, dataType: 'int' },
    items: { desc: '每一个元素TabItemJSON对象的数组', defVal: [], dataType: 'array' },
    toolBarAry: { desc: '工具栏项数组', defVal: [], dataType: 'array' },
    skin: { desc: '皮肤样式', defVal: 'BaseDiv-Gray', dataType: 'string' },
    cn: { desc: 'classname样式', defVal: '', dataType: 'string' },
    css: { desc: 'css样式', defVal: '', dataType: 'string' },
    btnSkin: { desc: '工具栏的皮肤样式', defVal: 'Button-tab', dataType: 'string' },
    loadMode: { desc: '加载模式', defVal: 'auto', dataType: 'string', comType:'Radios', sons:[{value:'auto',text:'自动加载'},{value:'click',text:'单机加载'}] },
    ifFixedBodyHeight: { desc: '是否固定TabBody的高度', defVal: true, dataType: 'bool' },
    onClose:{ desc: '回调每个Item的关闭事件', defVal: function (){}, dataType: 'function' },
    onTabClick:{ desc: '回调Tab上Item的Click事件', defVal: function (){}, dataType: 'function' },
    onToolBarClick:{ desc: '回调工具栏上Click事件', defVal: function (){}, dataType: 'function' }
    },
    itemArgs:{
    name: { desc: '可作为items中唯一标示的名称', defVal: 'button', dataType: 'string' },
    type: { desc: 'item类型', defVal: 'tab', dataType: 'string' },
    text: { desc: '显示文字', defVal: 'auto', dataType: 'string' },
    content: { desc: 'body上显示的内容', defVal: 'auto', dataType: 'string' },
    icon: { desc: '显示的图标', defVal: 'auto', dataType: 'string' },
    visibled: { desc: '是否可见', defVal: true, dataType: 'bool' },
    disabled: { desc: '是否启用', defVal: false, dataType: 'bool' },
    ifPress: { desc: '是否选中', defVal: false, dataType: 'bool' },
    ifClose: { desc: '是否可关闭', defVal: false, dataType: 'bool' },
    onClick: { desc: '回调Click事件', defVal: function (){}, dataType: 'function' },
    onClose: { desc: '回调Close关闭事件', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _fn = function () { }
  var owner, eHead, eBody
  var args = { p: $DB, items: [], head_h: 35, toolBarAry: [], skin: 'BaseDiv-tab', cn: '', css: '', ifFixedBodyHeight: true, btnSkin: 'Button-tab', loadMode: 'auto', onClose: _fn, onTabClick: _fn, onToolBarClick: _fn }
  var iArgs = { name: 'button', type: 'tab', text: '', js: '', url: '', visibled: true, disabled: false, content: '', icon: '', ifPress: false, ifClose: false, onClick: _fn, onClose: _fn }
  var btnSet, toolSet, nCounter = new $.nCount()
  me.items = {}
  me.aItems = []
  me.selItem
  function setDefault (j) {
    args = $.Util.initArgs(j, args)
    var _eBase
    if (!args.pHead || !args.pBody) {
      if (args.ifFixedBodyHeight) {
        _eBase = new $.UI.BaseDiv({ p: args.p, head_h: args.head_h, foot_h: 0, skin: args.skin, cn: args.cn, css: args.css })
        eHead = _eBase.head; eBody = _eBase.body
      } else {
        _eBase = args.p.adElm('', 'div').cn('Tab ' + args.skin + ' ' + args.cn).css(args.css).h('<div class="Tab-Head" style="height:' + args.head_h + 'px;line-height:' + args.head_h + 'px;"></div><div class="Tab-Body"></div>')
        eHead = _eBase.fc(); eBody = eHead.ns()
      }
    } else {
      eHead = args.pHead; eBody = args.pBody
    }
  }

  function layout () {
    btnSet = new $.UI.ButtonSet({ p: eHead, skin: 'ButtonSet-tab', onClick: function (obj) { clickTab(obj.Name) }, onClose: function (obj) { me.closeTab(obj.Name) } })
    toolSet = new $.UI.ButtonSet({ p: eHead, itemAlign: 'right', items: args.toolBarAry, onClick: function (obj) { obj.Tab = me; args.onToolBarClick(obj) } })
    var _selName = 0
    for (var i = 0, _len = args.items.length; i < _len; i++) {
      var _iObj = args.items[i]
      if (_iObj.ifPress) { _selName = _iObj.name }
      _iObj.ifPress = false
      me.addTabItem(_iObj, 0)
    }
    me.setSelTab(_selName); me.BtnSet = btnSet
  }
  function bindEvent () {
    btnSet.onClose = function (j) {
      var _jBtn = j.jAttr, _len = me.items.length, _name = _jBtn.name, _idx = _jBtn.idx
      me.deleteTabItem(_name)
      while (_idx > 0 && _idx < _len) {
        var _item
        if (_idx == 0) { _idx++ } else { _idx-- }
        _item = me.items[_idx]
        if (_item) {
          me.setSelItem(_item)
          break
        } else {
          _idx--
        }
      }
    }
  }
  me.getItem = function (v) {
    if (v == null) { return }
    if ($.getType(v) == 'object') { return v }
    return me.items[v]
  }
  me.getLenth = function () { return me.aItems.length }
  me.closeTab = function (v) {
    var _item = me.getItem(v)
    if (_item) { _item.Body.r(); args.onClose(_item); _item = null }
    me.setSelTab(0)
    return me
  }

  function clickTab (v) {
    var _item = me.getItem(v)
    if (_item) {
      var _name = _item.Name
      if (me.selItem) { if (me.selItem.Name == _name) { } me.selItem.Body.hide() }
      if (args.loadMode == 'click') {
        var _eBody = _item.Body, _cStr = _item.Args.content, _js = _item.Args.js, _url = _item.Args.url
        if (_cStr) {
          _eBody.h(_cStr)
        } else if (_js) {
          new $.UI.View({ p: _eBody, url: _js, onLoad: function (view) { _item.View = view } })
        } else if (_url) {

        }
      }
      _item.Body.show()
      me.selItem = _item
      $.UI.DestroyPopElm('tab')
      _item.Tab = me
      args.onTabClick(_item)
    }
    return _item
  }
  me.getTabBtn = function (v) { return btnSet.getItem(v) }
  me.setSelTab = function (v) { btnSet.fireClick(v, null, true); return me }
  me.clear = function () {
    for (var i = 0, _len = me.aItem.length; i < _len; i++) { me.closeTab(i) }
    me.items = {}
    me.aItems = []
    me.selItem = null
  }
  me.addTabItem = function (j, ifShow) {
    for (var i in iArgs) { if (j[i] == null) { j[i] = iArgs[i] } }
    j.type = 'tab'
    if (!j.skin) { j.skin = args.btnSkin }
    var _id = nCounter.getN(), _name = j.name, _content = j.content, _ifPress = j.ifPress
    if (_ifPress) { j.ifPress = false }
    var _btn = btnSet.addItem(j, true), _body = eBody.adElm('', 'div').hide()
    var _item = { Button: _btn, Body: _body, Args: j, Name: j.name, Idx: _id, set: _btn.set, get: _btn.get }
    if (args.ifFixedBodyHeight) { _body.ac('wp hp') }
    if (args.loadMode == 'auto') {
      if (_content) {
        _body.h(_content)
      } else if (j.js) {
        new $.UI.View({ p: _body, url: j.js, onLoad: function (view) { _item.View = view } })
      } else if (j.url) {

      }
    }
    me.items[_id] = me.items[_name] = _item
    me.aItems.push(_item)
    if (_ifPress || ifShow) { me.setSelTab(_name) }
    return _item
  }
  me.setTabText = function (k, v) { btnSet.setText(k, v); return me }
  me.setTabIcon = function (k, v) { btnSet.setIcon(k, v); return me }
  me.setTabContent = function () { }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { if (owner) { owner.r() }; me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.Slider = function (j) {
  var me = this
  var a_items, dir, delay, ifShowOrder, ifMoveOverStop, currCn, defCn, pHead, pBody, pText, html
  var aIndex = [], IntervalID, _pW, _pH, _ifInit = true, orig_pBody, ifArrow
  var eNext, ePre
  me.items = []
  me.currItem = null
  me.aItems = []
  me.length = 0
  var counter = new $.nCount()
  function setDef (j) {
    pHead = j.pHead
    pBody = $(j.pBody || $DB)
    orig_pBody = pBody
    delay = j.delay || 2000
    ifShowOrder = j.ifShowOrder || false
    ifArrow = j.ifArrow || true
    dir = j.dir || 'left' // dir:  fade, top, bottom, left, right, none;
    currCn = j.currCn || ''
    defCn = j.defCn || ''
    html = j.html || ''
    ifMoveOverStop = j.ifMoveOverStop
    if (ifMoveOverStop == null) { ifMoveOverStop = true }
    if (!pHead) {
      var root_BaseDiv = new $.UI.BaseDiv({
        p: pBody,
        head_h: 0,
        foot_h: 25,
        skin: {
          base: { cn: 'pr oh', css: ''},
          head: { cn: 'oh rt5', css: ''},
          body: { cn: 'oh FFsn', css: ''},
          foot: { cn: 'oh FFsn slider_nav', css: ''}
        }
      })
      pBody = root_BaseDiv.body; pHead = root_BaseDiv.foot
      pBody.ac('oh').dc('oa')
    }
    pText = pBody.adElm('', 'div').cn('pa wp z1 oh tac dn l0').css('bottom:0px;height:35px;font:bold 14px/35px "微软雅黑";background:rgba(0,0,0,0.4);')
    if (ifArrow) {
      ePre = pBody.adElm('', 'a').cn('pa fl w80 hp z1 slider_pre slider_pre_0 dn')
      eNext = pBody.adElm('', 'a').cn('pa fr w80 hp z1 slider_next slider_next_0 tr0 dn')
    }
    _pW = pBody.csn('width'); _pH = pBody.csn('height')
    pBody = pBody.adElm('', 'div').cn('pa wp hp oh')
    if (dir != 'none' && dir != 'fade') { pBody = pBody.adElm('', 'div').cn('pa oh') }
    a_items = j.items || j.aItems || []
  }
  function layout () {
    var _len = a_items.length
    for (var i = 0; i < _len; i++) { me.addItem(a_items[i]) }
    if (!me.currItem) { me.setSelItem(0) }
    me.start()
  }
  function bindEvent () {
    pHead.evt('click', function (e) {
      var e = $.e.fix(e), _e = e.t
      var _tn = _e.tagName, _idx = +_e.attr('index')
      if (_tn == 'A' && _idx != null) { me.setSelItem(_idx) }
    })
    orig_pBody.evt('mouseover', function (e) {
      var e = $.e.fix(e)
      // pText.alpha(20).ease(["alpha", 'bottom'], [100, 0], 600, 1, {});
      ePre.dc('dn'); eNext.dc('dn')
      if (ifMoveOverStop) { me.stop() }
      e.stop()
    }).evt('mouseout', function (e) {
      var e = $.e.fix(e)
      // pText.alpha(100).ease(["alpha", 'bottom'], [20, -35], 600, 1, {});
      ePre.ac('dn'); eNext.ac('dn')
      if (ifMoveOverStop) { me.start() }
      e.stop()
    })
    ePre.evt('click', function (e) { var e = $.e.fix(e); me.pre() })
    eNext.evt('click', function (e) { var e = $.e.fix(e); me.next() })
  }
  me.addItem = function (j) {
    var _j = j || {}, _cont = _j.content || '', _text = _j.text || '', _bodyCn = '', _textCn = ''
    var _currC = counter.getN()
    var _name = _j.name || ('slider_' + _currC), _title = _j.title, _link = _j.link || 'javascript:void(0);'
    var _cn = _j.cn || 'fr tac fs10 mr5 mt5 w15 h15 lh15 r15', _css = _j.css || '', _press = _j.press || false
    if (_press) { _cn += ' ' + currCn } else { _bodyCn += ' dn'; _textCn = ' dn' }
    var h = pHead.adElm('', 'a').cn('cp r5 ' + _cn + ' ' + defCn).css(_css).attr('index', _currC).attr('name', _name)
    var b = null
    if (dir == 'bottom' || dir == 'right') { b = pBody.abElm('', 'div') } else { b = pBody.adElm('', 'div') }
    b.h(_cont)
    switch (dir) {
      case 'top':
        b.css('height:' + _pH + 'px;')
        pBody.css('height:' + _pH * (_currC + 1) + 'px;')
        break
      case 'bottom':
        b.css('height:' + _pH + 'px;')
        pBody.css('height:' + _pH * (_currC + 1) + 'px;top:-' + _pH * _currC + 'px;')
        break
      case 'left':
        b.css('width:' + _pW + 'px;').cn('fl')
        pBody.css('width:' + _pW * (_currC + 1) + 'px;')
        break
      case 'right':
        b.css('width:' + _pW + 'px;').cn('fl')
        pBody.css('width:' + _pW * (_currC + 1) + 'px;left:-' + _pW * _currC + 'px;')
        break
      case 'fade':
      case 'none':
        b.cn('pa wp hp' + _bodyCn).css('top:0px;left:0px;')
        break
    }
    var a = pText.adElm('', 'a').cn('pa wp cp c_1 hp' + _textCn).css('top:0px;left:0px;').attr('href', _link).h(_text)
    if (_text && pText.className.ec('dn')) { pText.dc('dn') }
    var _items = {body: b, head: h, obj: _j, index: _currC, name: _name, text: a}
    me.items[_currC] = me.items[_name] = _items
    me.aItems.push(_items)
    me.length++
    aIndex.push(_currC)
    if (_press) { me.currItem = _items }
    if (_title) { h.attr('title', _title) }
    ifShowOrder = true
    if (ifShowOrder) { h.h(_currC + 1) }
  }
  me.start = function (dly) {
    var _dt = dly || delay
    IntervalID = setInterval(function () {
      var _index = -1
      if (me.currItem) { _index = me.currItem.index }
      _index++
      if (_index == aIndex.length) { _index = 0 }
      me.setSelItem(_index)
    }, _dt)
  }
  me.stop = function () { if (IntervalID) { clearInterval(IntervalID); IntervalID = null } }
  me.next = function () {
    var _index = -1
    if (me.currItem) { _index = me.currItem.index }
    _index++
    if (_index == aIndex.length) { _index = 0 }
    me.setSelItem(_index)
  }
  me.pre = function () {
    var _aLen = aIndex.length - 1, _index = _aLen
    if (me.currItem) { _index = me.currItem.index }
    _index--
    if (_index == -1) { _index = _aLen }
    me.setSelItem(_index)
  }
  me.setSelItem = function (v, dirction, t, cbFn) {
    var _item = me.items[v], currI = me.currItem, _d = dirction || dir
    if (!_item || _item == currI) { return }
    var b = _item.body, h = _item.head, a = _item.text, _idx = _item.index, changeVal
    switch (_d) {
      case 'fade':
        if (currI) {
          var currB = currI.body, currH = currI.head, currA = currI.text
          b.dc('dn').alpha(0)
          currB.alpha(100).ease(['alpha'], [20], t || 200, 1, {
            e: function () {
              currB.ac('dn'); currH.dc(currCn); currA.ac('dn')
              h.ac(currCn); a.dc('dn')
              me.currItem = _item
              b.alpha(20).ease(['alpha'], [100], t || 1200, 1, {})
            }
          })
        } else {
          b.dc('dn'); h.ac(currCn); a.dc('dn')
          me.currItem = _item
        }
        break
      case 'top':
        changeVal = -_pH * _idx
        if (_idx == 0 && !_ifInit) {
          me.aItems[0].body.css('position:relative;top:' + _pH * me.length + 'px;height:' + _pH + 'px;')
          changeVal = -_pH * me.length
          pBody.css('height:' + _pH * (me.length + 1) + 'px;')
        }
        if (_idx == 1) {
          me.aItems[0].body.style.cssText = 'height:' + _pH + 'px;'
          pBody.css('height:' + _pH * me.length + 'px;top:0px;')
        }
        pBody.ease([_d], [changeVal], 600, 'easeOutQuart', {e: function () {}})
        if (currI) {
          var currH = currI.head, currA = currI.text
          currH.dc(currCn); currA.ac('dn')
        }
        h.ac(currCn); a.dc('dn')
        me.currItem = _item
        _ifInit = false
        break
      case 'bottom':
        var _fIdx = me.length - 1
        changeVal = _pH * _idx - _pH * _fIdx
        if (_idx == 0 && !_ifInit) {
          me.aItems[_fIdx].body.style.cssText = 'position:relative;top:-' + _pH * (me.length - 1) + 'px;height:' + _pH + 'px;'
          changeVal = -_pH * (me.length - 1)

          pBody.css('height:' + _pH * (me.length + 1) + 'px;')
        }
        if (_idx == 1) {
          me.aItems[_fIdx].body.style.cssText = 'height:' + _pH + 'px;'
          pBody.css('height:' + _pH * me.length + 'px;top:-' + (me.length - 1) * _pH + 'px;')
        }
        pBody.ease(['top'], [changeVal], 600, 'easeOutQuart', {e: function () {}})
        if (currI) {
          var currH = currI.head, currA = currI.text
          currH.dc(currCn); currA.ac('dn')
        }
        h.ac(currCn); a.dc('dn')
        me.currItem = _item
        _ifInit = false
        break
      case 'right':
        var _fIdx = me.length - 1
        if (_ifInit) {
          changeVal = _pW * _idx - _pW * _fIdx
          pBody.ease(['left'], [changeVal], 600, 'easeOutQuart', {e: function () {}})
        } else {
          var _lc = $(pBody.lastChild), _fc = $(pBody.firstChild)
          _lc.moveB(_fc)
          pBody.ease(['left'], [0], 600, 'easeOutQuart', {e: function () {}})
        }
        if (_idx == _fIdx) { _ifInit = false }
        /*
                if(_idx==0&&!_ifInit){
                    me.aItems[_fIdx].body.css('position:relative;left:-'+_pW*(me.length-1)+'px;width:'+_pW+'px;');
                    changeVal = -_pW*(me.length-1);
                    pBody.css('width:'+_pW*(me.length+1)+'px;');
                }
                if(_idx==1){
                    me.aItems[_fIdx].body.style.cssText = 'width:'+_pW+'px;';
                    pBody.css('width:'+_pW*me.length+'px;left:-'+(me.length-1)*_pW+'px;');
                } */

        if (currI) {
          var currH = currI.head, currA = currI.text
          currH.dc(currCn); currA.ac('dn')
        }
        h.ac(currCn); a.dc('dn')
        me.currItem = _item
        break
      case 'left':
        changeVal = -_pW * _idx
        if (_idx == 0 && !_ifInit) {
          me.aItems[0].body.css('position:relative;left:' + _pW * me.length + 'px;width:' + _pW + 'px;')
          changeVal = -_pW * me.length
          pBody.css('width:' + _pW * (me.length + 1) + 'px;')
        }
        if (_idx == 1) {
          me.aItems[0].body.style.cssText = 'width:' + _pW + 'px;'
          pBody.css('width:' + _pW * me.length + 'px;left:0px;')
        }
        pBody.ease([_d], [changeVal], 600, 'easeOutQuart', {})
        if (currI) {
          var currH = currI.head, currA = currI.text
          currH.dc(currCn); currA.ac('dn')
        }
        h.ac(currCn); a.dc('dn')
        me.currItem = _item
        _ifInit = false
        break
      case 'none':
        if (currI) {
          var currB = currI.body, currH = currI.head, currA = currI.text
          currB.ac('dn'); currH.dc(currCn); currA.ac('dn')
        }
        b.dc('dn'); h.ac(currCn); a.dc('dn')
        me.currItem = _item
        break
    }
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.ScrollBar = function (j) {
  /*
    {
    type: "ScrollBar",
    desc: "自定义的滚动Bar",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    barWidth: { desc: 'bar的宽度', defVal: 5, dataType: 'int' },
    skin: { desc: '皮肤样式', defVal: 'ScrollBar-default', dataType: 'string' },
    ifFixedHeight: { desc: '是否固定高度', defVal: false, dataType: 'bool' },
    onResize:{ desc: '回调Resize事件', defVal: function (){}, dataType: 'function' },
    onDragStart:{ desc: '回调开始拖动事件', defVal: function (){}, dataType: 'function' },
    onDrag:{ desc: '回调正在拖动事件', defVal: function (){}, dataType: 'function' },
    onDragEnd:{ desc: '回调拖动结束时间', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, skin: 'ScrollBar-default', ifFixedHeight: false, barWidth: 5, onResize: _fn, onDragStart: _fn, onDrag: _fn, onDragEnd: _fn }
  var hRate, vRate
  var owner, p, hBar, vBar
  var sMoveDis = 100, _cH, _bH, _ppH
  function setDefault (j) { args = $.Util.initArgs(j, args); p = args.p }
  function layout () {
    p.dc('oa').ac('oh').attr('COM', 'ScrollBar')
    owner = p.adElm('', 'div').cn('fl oh hh wp')
    if (!args.ifFixedHeight) { owner.ac('hp') }
    me.owner = owner
    var _eHBar = p.adElm('', 'div').cn('pa wp ' + args.skin).css('height:' + args.barWidth + 'px;bottom:0px;')
    var _eVBar = p.adElm('', 'div').cn('fr pa hp ' + args.skin).css('width:' + args.barWidth + 'px;right:0px;')
    hBar = _eHBar.adElm('', 'a').cn('pa hp').css('left:0px;bottom:0px;top:0px;')
    vBar = _eVBar.adElm('', 'a').cn('pa wp').css('left:0px;top:0px;')
  }

  function fnChangePos (data) {
    if (data > 0) { data = 0 }
    if (-data > (_cH - _ppH)) { data = _ppH - _cH }
    owner.css('margin-top:' + data + 'px;')
    vBar.css('top:' + (-data / vRate) + 'px;')
  }
  function bindEvent () {
    /*
        {
        e: 事件源,
        t: e元素的父节点,
        n: minX, 横坐标最小值, 如果没有默认是0,
        r: maxX, 横坐标最大值,
        i: minY, 纵坐标最小值, 如果没有默认是0,
        s: maxY, 纵坐标最大值,
        o: 如果不是null, 则是0, 如果是null  则是1, 如果是1则只能在纵坐标上拖 垂直拖
        u: 如果不是null, 则是0, 如果是null  则是1, 如果是1则只能在横坐标上拖 水平拖
        a: xFn,
        f: yFn
        }
        */
    hBar.evt('mousedown', function (e) {
      var e = $.e.fix(e), _e = e.t
      $.drag.init(_e, null, 0, p.csn('width') - _e.csn('width'), null, 0, null, 1)
      _e.onDragStart = function () { args.onDragStart() }
      _e.onDrag = function (diff, b) { owner.css('margin-left:-' + (diff / hRate * 100) + 'px;'); args.onDrag() }
      _e.onDragEnd = function () { args.onDragEnd() }
      $.drag.start(e, _e)
      e.stop()
    })
    vBar.evt('mousedown', function (e) {
      var e = $.e.fix(e), _e = e.t
      $.drag.init(_e, null, null, null, 0, p.csn('height') - _e.csn('height'), 1, 0)
      _e.onDragStart = function () { args.onDragStart() }
      _e.onDrag = function (a, diff) {
        var _val = (diff / vRate * 100)
        if (_val > (_cH - _ppH)) { _val = _cH - _ppH }
        owner.css('margin-top:-' + _val + 'px;'); args.onDrag()
      }
      _e.onDragEnd = function () { args.onDragEnd() }
      $.drag.start(e, _e)
      e.stop()
    })
    owner.evt('mousewheel', function (e) {
      var e = $.e.fix(e)
      var wheelDelta = e.wheelDelta || e.detail // 鼠标滚动值，可由此判断鼠标滚动方向
      if (wheelDelta == -120 || wheelDelta == 3) {
        fnChangePos(owner.csn('margin-top') - sMoveDis) // 向上
      } else if (wheelDelta == 120 || wheelDelta == -3) {
        fnChangePos(owner.csn('margin-top') + sMoveDis) // 向下
      }
    })
  }
  me.addElm = function (obj) {
    var _obj = obj || {}, _type = _obj.type, _onSuc = _obj.onSuccess || _fn
    _obj.p = owner
    _obj.onSuccess = function () { me.initBar(); _onSuc({ ScrollBar: me, Args: obj }) }
    var _elm = new $.UI[_type](_obj)
    me.initBar()
    return _elm
  }
  me.html = function (html) { owner.h(html); me.initBar(); return me }
  me.initBar = function () {
    if (!owner.h()) { return }
    var _pW = p.csn('width'), _pH = p.csn('height'), _pW1 = owner.csn('width'), _pH1 = owner.csn('height')
    // var _pW = owner.csn('width'), _pH = owner.csn('height'), _pW1 = owner.fc().csn('width'), _pH1 = owner.fc().csn('height');
    hRate = $.m.p(_pW / _pW1 * 100)
    vRate = $.m.p(_pH / _pH1 * 100)
    if (hRate < 100) { hBar.css('width:' + hRate + '%;'); hBar.pn().dc('dn') } else { hBar.pn().ac('dn') }
    if (vRate < 100) { vBar.css('height:' + vRate + '%;'); vBar.pn().dc('dn') } else { vBar.pn().ac('dn') }
    _cH = _pH1; _bH = vRate * _pH1 / 100; _ppH = _pH
    args.onResize({ ScrollBar: me, pW: _pW, pH: _pH })
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.ProgressBar = function (j) {
  /*
    {
        type: "ProgressBar",
        desc: "自定义的进度条",
        args: {
            p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
            barHeight: { desc: 'bar的高度', defVal: 18, dataType: 'int' },
            defValue: { desc: '初始化默认值', defVal: 0, dataType: 'int' },
            skin: { desc: '皮肤样式', defVal: '', dataType: 'string' },
            cn: { desc: 'cn样式', defVal: '', dataType: 'string' },
            css: { desc: 'css样式', defVal: '', dataType: 'string' }
        }
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, barHeight: 18, defValue: 0, cn: '', css: '', skin: '' }
  var owner, eBar, val
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    var _barH = args.barHeight
    if (_barH > 14) { _barH = 14 }
    owner = args.p.adElm('', 'div').cn('ProgressBar ' + args.skin + ' ' + args.cn).css('height:' + _barH + 'px;' + args.css)
    eBar = owner.adElm('', 'div').css('line-height:' + _barH + 'px;')
    me.setVal(args.defValue)
  }
  me.setVal = function (v, ease) {
    if (v == undefined || v == null) { return }
    v = +v
    if (v > 100) { v = 100 }
    if (v < 0) { v = 0 }
    args.defValue = v
    eBar.attr('title', v + '%')
    if (eBar.ease) {
      eBar.ease(['width'], [v], 1000, 1, {}, 1, '%')
    } else {
      eBar.css('width:' + v + '%;')
    }
  }
  me.getVal = function () { return args.defValue }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.Accordion = function (j) {
  /*
    {
    type: "ProgressBar",
    desc: "自定义的进度条",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    width: { desc: '宽度, 默认是null, 表示100%填充父容器', defVal: null, dataType: 'int' },
    height: { desc: '高度, 默认是null, 表示100%填充父容器', defVal: null, dataType: 'int' },
    ifFixedHeight: { desc: '是否固定高度', defVal: true, dataType: 'bool' },
    titleHeight: { desc: '标题高度', defVal: 26, dataType: 'int' },
    skin: { desc: '皮肤样式', defVal: '', dataType: 'string' },
    cn: { desc: 'cn样式', defVal: '', dataType: 'string' },
    css: { desc: 'css样式', defVal: '', dataType: 'string' },
    items: { desc: 'item项数组', defVal: [], dataType: 'array' },
    onItemExpand: { desc: '回调每个Item的展开事件', defVal: function (){}, dataType: 'function' },
    onItemToolBarClick: { desc: '回调每个Item右上角工具栏的Click事件', defVal: function (){}, dataType: 'function' }
    },
    itemArgs: {
    name: { desc: '可通过name作为索引获取每个Item项', defVal: '', dataType: 'string' },
    title: { desc: '标题文字', defVal: '', dataType: 'string' },
    icon: { desc: '标题图片', defVal: '', dataType: 'string' },
    ifClose: { desc: '是否可以关闭', defVal: false, dataType: 'bool' }
    }
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, width: null, height: null, ifFixedHeight: true, titleHeight: 26, skin: '', cn: '', css: '', items: [], onItemExpand: _fn, onItemToolBarClick: _fn }, iArgs
  var owner, count, ifInit = true, curr, sumHeight = 0
  me.items = {}
  me.aItem = []
  me.selItem = null
  function setDefault (j) {
    args = $.Util.initArgs(j, args); count = new $.nCount()
    if (args.width != null) { args.css += ';width:' + w + 'px;' } else { args.cn += ' wp' }
    if (args.height != null) { args.css += ';height:' + h + 'px;' } else { args.cn += ' hp' }
    if (args.ifFixedHeight) { args.cn += ' oh' }
  }
  function layout () {
    owner = args.p.adElm('', 'div').cn(args.cn).css(args.css)
    iArgs = { p: owner, name: '', title: '', icon: '', ifClose: false }
    for (var i = 0, _iLen = args.items.length; i < _iLen; i++) { me.addItem(args.items[i]) }
    me.setSelItem(0)
    $(window).evt('resize', function () { var _val = args.p.csn('height') - sumHeight; for (var i = 0, _len = me.aItem.length; i < _len; i++) { me.aItem[i].owner.css('height:' + _val + 'px;') } })
  }
  function onItemExpand (obj) {
    if (args.ifFixedHeight) {
      if (ifInit) { me.resize(); ifInit = false }
      if (me.selItem && me.selItem != obj) { me.selItem.setFold(false, null, false) }
      me.selItem = obj
    }
    args.onItemExpand({ Accordion: me, AttrPanel: obj })
  }
  function onItemToolBarClick (obj) { obj.Accordion = me; args.onItemToolBarClick(obj) }
  me.addItem = function (j) {
    var _iArgs = $.Util.initArgs(j, iArgs), _name = _iArgs.name; _iArgs.ifUnfold = false; _iArgs.titleHeight = args.titleHeight; sumHeight += (args.titleHeight || 0) + 2
    var _item = new $.UI.AttrPanel(_iArgs), _idx = count.getN()
    _item.evt('onExpand', function (obj) { onItemExpand(obj.AttrPanel) }).evt('onToolBarClick', onItemToolBarClick)
    me.items[_name] = me.items[_idx] = _item
    me.aItem.push(_item)
    return _item
  }
  me.setSelItem = function (v) {
    var _item
    if (typeof v === 'object') { _item = v } else { _item = me.items[v] }
    if (_item) { curr = _item; _item.setFold(true) }
    return me
  }
  me.resize = function () {
    var _allH = owner.csn('height'), _itemH = _allH - (me.aItem.length * (args.titleHeight + 1.5))
    for (var i = 0, _iLen = me.aItem.length; i < _iLen; i++) { me.aItem[i].owner.css('height:' + _itemH + 'px;') }
    return me
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.ImageView = function (j) {
  var me = this
  var p, a_items, dir
  var body, _body, pre, next, imgW, imgH, loading
  var _pW, _pH
  function setDef (j) {
    p = (j.p || $DB)
    _pW = p.csn('width'); _pH = p.csn('height')
    a_items = j.items || j.aItems || []
    imgH = j.imgH || (_pH - 20); imgW = j.imgW || 120
    dir = j.dir || 'h' // dir: v(vertical)垂直, h(horizontal)水平;
  }
  function layout () {
    body = p.adElm('', 'div').cn('pr FFsn wp hp oh')
    pre = p.adElm('', 'div').cn('pr cp fl hp w100 slide_pre').css('margin-top:-' + _pH + 'px;').attr('part', 'pre')
    next = p.adElm('', 'div').cn('pr cp fr hp w100 slide_next').css('margin-top:-' + _pH + 'px;').attr('part', 'next')
    loading = p.adElm('', 'div').cn('pa bc_c2 r5 w48 h48 imageLoading')
      .css('top:' + (_pH / 2 - 24) + 'px;left:' + (_pW / 2 - 24) + 'px;').alpha(50)
    imgW = 150
    var _len = a_items.length, _allW = _len * imgW
    _body = body.adElm('', 'div').cn('pr hp').css('width:' + _allW + 'px;background-color:#EDEEEF;')
    for (var i = 0; i < _len; i++) { addItem(a_items[i]) }
  }
  function bindEvent () {
    var _isOver = false
    p.evt('mouseover', function (e) {
      var e = $.e.fix(e)
      pre.alpha(0).ease(['alpha'], [100], 600, 1, {})
      next.alpha(0).ease(['alpha'], [100], 600, 1, {})
      e.stop()
    }, 0).evt('mouseout', function (e) {
      var e = $.e.fix(e), _e = e.t
      pre.alpha(100).ease(['alpha'], [0], 600, 1, {})
      next.alpha(100).ease(['alpha'], [0], 600, 1, {})
      e.stop()
    }, 0).evt('click', function (e) {
      var e = $.e.fix(e), _e = e.t
      var _part = _e.attr('part')
      if (_part) {
        switch (_part) {
          case 'next':

            break
          case 'pre':

            break
        }
      }
    })
    _body.evt('mouseover', function (e) {
      var e = $.e.fix(e)
    }).evt('mouseout', function (e) {
      var e = $.e.fix(e)
    })
  }
  function addItem (j) {
    var _j = j || {}, _src = _j.src || '', _text = _j.text || '', _title = _j.title || ''
    var imgB = _body.adElm('', 'div').cn('fl m8 ha tac p10 r5').css('width:' + imgW + 'px;height:' + (imgH - 16) + 'px;background-position: 0 50%;')
    imgB.h('<img src="' + _src + '" >')
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.BarCode = function (j) {
  /*
    {
        type: "BarCode",
        desc: "条形码",
        args: {
            p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
            itemHeight: { desc: '条形码每一帧的高度', defVal: 'FileBrowser-default', dataType: 'string' },
            itemWidth: { desc: '条形码每一帧的宽度', defVal: '', dataType: 'string' },
            code: { desc: '条形码字符串', defVal: '', dataType: 'string' },
            color0: { desc: '颜色0', defVal: '#fff', dataType: 'string' },
            color1: { desc: '颜色1', defVal: '#000', dataType: 'string' },
            onScan: { desc: '扫描枪扫描时执行的回调函数', defVal: function (){}, dataType: 'function' }
        },
        method: {
            setCode: { desc: '动态设置扫描码', args: { cArgs: '扫描码对象', ifSetDefault: '是否初始化扫描码对象' }, return: '$.UI.BarCode' },
            getHelper: { desc: "获取组件帮助信息", args: {}, return: "帮助对象" },
            evt: { desc: "给组件绑定该组件允许绑定的事件", args: { name: "事件名", fn: "事件" }, return: '$.UI.BarCode' },
            getAttr: { desc: "获取属性", args: { "key": "属性名" }, 'return': "属性值" },
            setAttr: { desc: "动态设置属性值", args: { key: "属性名", value: "属性值" }, return: '$.UI.BarCode' },
            init: { desc: "初始化组件", args: { "j": "组件对象" }, return: '$.UI.BarCode' }
        }
    }
    */
  var me = this, _fn = function () { }
  var args = { p: $DB, itemHeight: 50, itemWidth: 1, code: '', value: '', onScan: _fn, color0: '#fff', color1: '#000' }
  var itemHtml = '<a class="dib w0" style="height:{0}px;border-left:{1}px solid {2};"></a>'
  var owner, eGraph, eStr
  function setDefault (j) { args = $.Util.initArgs(j, args); return args }
  function layout () {
    owner = args.p.adElm('', 'div').h('<div class="ma wp tac" style="margin: 5px 0px;"></div><div class="tac"></div>')
    eGraph = owner.fc(); eStr = eGraph.ns()
    if (args.value != null) { me.setValue(args.value) } else { me.setCode(args) }
  }
  function bindEvent () { }
  function toCodeHtml (cArgs, ifSetDefault) {
    if (ifSetDefault) { cArgs = setDefault(cArgs || {}) }
    var _str = cArgs.code
    if (!_str) { return }
    var _ary = _str.split(''), _len = _ary.length, _hAry = []
    for (var i = 0; i < _len; i++) {
      var _val = +_ary[i], _bc = cArgs.color0
      if (_val) { _bc = cArgs.color1 }
      _hAry.push(itemHtml.format(cArgs.itemHeight, cArgs.itemWidth, _bc))
    }
    return _hAry.join('')
  }
  me.setCode = function (cArgs, ifSetDefault) {
    var _str = cArgs.code
    if (!_str) { return me }
    eGraph.h(toCodeHtml(cArgs, ifSetDefault))
    return me
  }
  me.setValue = function (value) {
    if (value == null) { return me }
    var _obj = { code: $.Util.code.code128.getDigit(value) }
    eStr.h(value)
    return me.setCode(_obj, true)
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.FileBrowser = function (j) {
  /*
    {
        type: "FileBrowser",
        desc: "web版的文件浏览器, 可以查看服务器中每个路径的文件",
        args: {
            p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
            skin: { desc: '皮肤样式', defVal: 'FileBrowser-default', dataType: 'string' },
            cn: { desc: 'cn样式', defVal: '', dataType: 'string' },
            css: { desc: 'css样式', defVal: '', dataType: 'string' },
            fileType: { desc: '文件类型', defVal: '*', dataType: 'string' },
            dir: { desc: '相符服务器目录路径', defVal: 'View', dataType: 'string' },
            layout: { desc: '文件浏览布局形式', defVal: 'list', dataType: 'string', comType: 'Radios', sons: [{value:'list',text:'列表形式'},{value:'block',text:'块状形式'}] },
            onFileClick: { desc: '回调单机文件的事件', defVal: function (){}, dataType: 'function' },
            onFoldClick: { desc: '回调单机文件夹的事件', defVal: function (){}, dataType: 'function' },
            onClick: { desc: '回调单机事件', defVal: function (){}, dataType: 'function' },
            onExpand: { desc: '回调文件夹展开的事件', defVal: function (){}, dataType: 'function' }
        }
    }
    */
  var me = this, _fn = function () { }
  var owner, ePath, eBody
  var args = { p: $DB, skin: 'FileBrowser-default', fileType: '*', cn: '', css: '', dir: 'View', layout: 'list', onFileClick: _fn, onFoldClick: _fn, onClick: _fn, onExpand: _fn }
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    var _temp = new $.UI.BaseDiv({ p: args.p, head_h: 30 })
    owner = _temp.base; ePath = _temp.head; eBody = _temp.body.cn(args.skin + ' ' + args.cn).css(args.css).h('<ul></ul>').fc()
    switch (args.layout) {
      case 'list':
        loadListDirFiles(args.dir, null)
        break
      case 'block':
        loadBlockDirFiles(args.dir)
        break
      case '':

        break
    }
  }

  function loadBlockDirFiles (dir, eStart, cbFn) {
    var _ePre = eStart, _fn = cbFn || function () { }
    loadData(dir, function (obj) {

    })
  }

  function loadListDirFiles (dir, eStart, cbFn) {
    var _ePre = eStart, _fn = cbFn || function () { }
    loadData(dir, function (obj) {
      var _sAry = obj.get(0), _len = 0
      if (_sAry.length > 1) {
        var _oAry = eval(_sAry), _eLI, _spaces = '', _depth = 1
        _len = _oAry.length
        if (_ePre) {
          _depth = +_ePre.attr('_depth')
          for (var _d = 0; _d < _depth; _d++) { _spaces += '<a></a>' }
          _depth++
        }
        for (var i = 0; i < _len; i++) {
          var _file = _oAry[i], _type = _file.type, _dir = _file.currPath || '', _fcn = ''
          if (+_file.count) { _fcn = 'flag-close' }
          if (_ePre) { _eLI = _ePre.aeElm('', 'li'); _ePre = _eLI } else { _eLI = eBody.adElm('', 'li') }
          _eLI.cn(_type).h(_spaces + '<a class="' + _fcn + '" _dir="' + _dir + '" ></a><a class="icon-close"></a><span>' + _file.name + '</span><a class="update"></a><a class="del"></a>').attr('_depth', _depth).attr('name', _file.name).attr('fullName', _file.fullName || '')
        }
      }
      _fn(_len)
    })
  }

  function loadData (dir, cbFn) {
    var _fn = cbFn || function () { }
    $.Util.ajax({ args: { m: 'SYS_CM_FILES', action: 'getDirFiles', dir: dir, fileType: args.fileType }, onSuccess: function (obj) { _fn(obj) } })
  }

  function bindEvent () {
    eBody.evt('click', function (e) {
      var e = $.e.fix(e), _e = e.t
      var _obj = findTarget(_e), _dir = _e.attr('_dir'), _eLi = _obj.eLi
      _obj.FileBrowser = me
      if (_obj.tag == 'flag' && _dir) {
        var _cn = _obj.cn, _eIcon = _e.ns()
        switch (_cn) {
          case 'flag-close':
            loadDirFiles(_dir, _eLi, function (len) { if (len) { _e.cn('flag-open') } else { _e.cn('') } _eIcon.cn('icon-open') })
            break
          case 'flag-open':
            disposeChild(_eLi); _e.cn('flag-close'); _eIcon.cn('icon-close')
        }
        args.onExpand(_obj)
      } else {
        if (_eLi.className == 'dir') { args.onFoldClick() } else { args.onFileClick(_obj) }
        args.onClick(_obj)
      }
      e.stop()
    })
  }

  function disposeChild (eStart) { if (eStart) { removeChild(eStart.ns(), eStart.attr('_depth')) } }
  function removeChild (child, depth) { if (child && child.attr('_depth') != depth) { removeChild(child.ns(), depth); child.r(); child = null } }
  function findTarget (_e) {
    var _tn = _e.tagName, _tag = { _e: _e }
    switch (_tn) {
      case 'A':
        var _cn = _e.className
        _tag['eLi'] = _e.pn(); _tag['tag'] = _cn.split('-')[0]; _tag['cn'] = _cn
        break
      case 'SPAN':
        _tag['eLi'] = _e.pn(); _tag['tag'] = 'text'
        break
      case 'LI':
        _tag['eLi'] = _e; _tag['tag'] = 'li'
        break
    }
    return _tag
  }

  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.FileUploader = function (j) {
  /*
    {
    type: "FileUploader",
    desc: "文件上传组件",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    skin: { desc: '皮肤样式', defVal: 'FileUploader-default', dataType: 'string' },
    cn: { desc: 'cn样式', defVal: '', dataType: 'string' },
    css: { desc: 'css样式', defVal: '', dataType: 'string' },
    dataType: { desc: '请求文件信息的格式', defVal: 'json', dataType: 'string', comType: 'Radios', sons: [{value:'json',text:'JSON'},{value:'html',text:'HTML'}] },
    timeout: { desc: '每个文件上传成功延迟的时间', defVal: 1000, dataType: 'int' },
    mId: { desc: '模块ID', defVal: 4, dataType: 'int' },
    catelogId: { desc: '上传文件目录ID', defVal: 0, dataType: 'int' },
    catelog: { desc: '应用实例ID', defVal: '', dataType: 'int' },
    maxSize: { desc: '文件最大值', defVal: 20 * 1024 * 1024, dataType: 'int' },
    denyFileFormat: { desc: '不允许上传文件格式列表', defVal: ['exe', 'bat'], dataType: 'array' },
    allowFileFormat: { desc: '允许上传文件格式列表', defVal: [], dataType: 'array' },
    specialFiles: { desc: '特殊文件列表', defVal: [], dataType: 'array' },
    onTimeout: { desc: '回调上传文件超时的事件', defVal: function (){}, dataType: 'function' },
    onComplete: { desc: '回调上传文件完成的事件', defVal: function (){}, dataType: 'function' },
    onSuccess: { desc: '回调上传成功的事件', defVal: function (){}, dataType: 'function' },
    onError: { desc: '回调上传失败的事件', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var me = this, _fn = function () { }
  var args = {
    p: $DB,
    ifMultiFile: false,
    dataType: 'json',
    timeout: 1000,
    cn: '',
    css: '',
    skin: 'FileUploader-default',
    uploadApi: null,
    mId: 4,
    catelogId: 0,
    catelog: '',
    denyFileFormat: ['bat'],
    specialFiles: [],
    allowFileFormat: [],
    maxSize: 20 * 1024 * 1024,
    onSuccess: _fn,
    onTimeout: _fn,
    onError: _fn,
    onComplete: _fn
  }
  var owner, eIframe, eHead, eBody, eFileName
  var counter = new $.nCount(), xml, htmlTemp, queue
  var proBar, toolBar
  var _ifInit = true, currIdx = 0, currObj
  var errorFnAry = [], denyFileAry = [], inputAry = {}, fileCount = 0
  var currSuccFileAry = [], succFileAry = [], currIds = []
  function setDefault (j) {
    args = $.Util.initArgs(j, args)
    queue = new $.Util.Q({ delay: 0, onFinish: onUploadFinish })
    htmlTemp = {
      title: '<div class="title"><span class="fwb" >正在上传文件:</span><span class="ml10"></span><span class="fr dib"></span></div>',
      processbar: '<div class="processbar"><div style="width:70%;"></div><div class="fl hp oh" style="width:30%;"></div>',
      chain: '<form target="upload" method="post" enctype="multipart/form-data" ><div class="detail" ></div><div><a class="close" title="删除"></a><a><span>选择文件</span><input type="file" name="Uploader_{0}" /></a></div></form>',
      detail: '<div class="fl hp" style="width:60px;"><div class="{0}" style="margin:8px auto;width:54px;height:54px;display: block;" ></div></div><div  class="fl hp" ><p class="mt5 fwb">{1}</p><p>Size： {2}</p></div>',
      special: '<form target="upload" method="post" enctype="multipart/form-data" ><div class="detail" ></div><div><a><span>选择文件</span><input type="file" name="Uploader_{0}" /></a><a title="正在上传" class="state uploading dn"></a></div></form>',
      spDetail: '<div class="fl hp" style="width:60px;"><div class="{0}" style="margin:8px auto;width:54px;height:54px;display: block;" ></div></div><div  class="fl hp" ><p class="mt5 fwb">{1}</p><p>Size： </p><p>状态：<span title="检查中..." class="check-state checking"></span></p></div>'
    }
  }
  function layout () {
    owner = args.p.adElm('', 'div').cn(args.skin + ' ' + args.cn).css(args.css).h('<iframe name="upload" style="display:none;"></iframe>')
    eIframe = owner.fc()
    eHead = owner.adElm('', 'div').cn('FU-head').h(htmlTemp.title + htmlTemp.processbar)
    eFileName = eHead.fc().chn(1)
    eBody = owner.adElm('', 'div').cn('FU-body')
    var _eBarP = eHead.chn(1).fc(), _spAry = args.specialFiles, _spLen = _spAry.length
    toolBar = new $.UI.ButtonSet({
      p: _eBarP.ns(),
      itemAlign: 'right',
      onClick: onOperClick,
      items: [
        { name: 'add', text: '添加', icon: 'icon-glyph-plus-sign' },
        { name: 'start', text: '开始', state: 'stop', icon: 'icon-glyph-circle-arrow-up' }
      ]
    })
    proBar = new $.UI.ProgressBar({ p: _eBarP, css: 'margin-top:10px;' })
    if (_spLen) {
      var _fileAry = [], _eCheckObj = {}, _checkObj = {}
      for (var i = 0; i < _spLen; i++) {
        var _fAry = me.addSpecialFile(_spAry[i]), _name = _fAry[0], _fName = "'" + _name + "'"
        _eCheckObj[_name] = _fAry[2]
        _checkObj[_name] = false
        _fileAry.push(_fName)
      }
      getSpeciFilesState(_fileAry, function (d) {
        var _data = d.data[0]
        if (_data) {
          var _rAry = eval(_data), _rLen = _rAry.length
          for (var _r = 0; _r < _rLen; _r++) { var _rn = _rAry[_r]['origName']; _checkObj[_rn] = _rAry[_r]['id'] }
        }
        for (var _idx in _eCheckObj) {
          var _eImg = _eCheckObj[_idx], _val = _checkObj[_idx] || 0
          _eImg.dc('checking').attr('fid', _val)
          if (_val) {
            _eImg.ac('check-exist').attr('title', '已经上传过了')
            _eImg.bbElm('', 'a').cn('download').attr('title', '下载').attr('href', 'Module/SYS_CM_FILES.aspx?action=downloadFile&id=' + _val)
          } else {
            _eImg.ac('check-not-exist').attr('title', '还没上传哦')
          }
        }
      })
    } else {
      me.addNormalFile()
    }
  }

  function onOperClick (obj) {
    switch (obj.Name) {
      case 'start':
        var _btn = obj.Button
        if (_btn.get('state') == 'stop') {
          if (me.submit() != false) {
            _btn.set('state', 'run').setIcon('icon-glyph-pause').setText('暂停')
            toolBar.items['add'].setEnabled(false)
          } else {

          }
        } else {
          _btn.set('state', 'stop').setIcon('icon-glyph-upload').setText('续传')
        }
        break
      case 'add':
        me.addNormalFile()
        break
    }
  }

  function setUploadState (filename) {
    currIdx++
    var _len = filename.length, _bv = $.m.p(currIdx / fileCount * 100, 2)
    if (_len > 40) { filename = filename.substr(0, 30) + '.....' }
    eFileName.h(filename)
    eFileName.ns().h('第' + currIdx + '个文件/共' + fileCount + '个文件')
    proBar.setVal(_bv, 1)
  }

  function getUploadUrl () {
    var _url = $.global.getImgPath() + 'Module/SYS_CM_FILES.aspx?', _api = args.uploadApi || ('action=uploadFile&mId=' + args.mId + '&catelogId=' + args.catelogId + '&catelog=' + args.catelog)
    return _url + _api
  }
  function getSpeciFilesState (fileAry, onSucFn) {
    var _fn = onSucFn || function () { }
    $.Util.ajax({
      url: $.global.getImgPath() + 'Module/SYS_CM_FILES.aspx',
      args: { action: 'getFiles', fileNames: fileAry.join(','), dataType: 'json', ifSpecialFile: 1 },
      cbFn: { onSuccess: function (d) { _fn(d) } }
    })
  }

  function checkFileType (type, extFile) {
    if (!type) { return false }
    if (extFile == 'default') { return true }
    if (!extFile) { extFile = args.denyFileFormat }
    var _strReg = '', _type = $.getType(extFile)
    if (_type == 'string') { _strReg = extFile };
    if (_type == 'array') { _strReg = extFile.join('|') }
    var _fTReg = new RegExp('(' + _strReg + ')$')
    if (_fTReg.test(type)) { return true } else { return false }
  }
  function uploadCallback (isTimeout) {
    var io = eIframe, status = isTimeout, _str
    try {
      xml = {}
      if (io.contentWindow) {
        _str = xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null
        xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document
      } else if (io.contentDocument) {
        _str = xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null
        xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document
      }
      if (status == 'timeout') { onTimeout(xml, status) } else { status = 'success' }
    } catch (e) {
      status = 'error'
    }
    _str = _str.toHtml().replaceAll('\\', '\/')
    var _dAry = _str.split('\u0003'), _fObj
    if (_dAry[0] == 'errorInfo=0') {
      _dAry = eval(_dAry.pop())
      _fObj = _dAry[0]
      status = 'success'
    } else {
      _str = _str.split('=')[1]
      status = 'error'
    }
    if (currObj) {
      var _tipStr = '上传成功'
      if (status == 'error') { _tipStr = _str }
      if (currObj['eDel']) { currObj['eDel'].r() }
      currObj['eImg'].dc('uploading').ac(status).attr('title', _tipStr)
      if (status == 'success') {
        setUploadState(currObj.fileName)
        if (currObj['eState']) { currObj['eState'].dc('error_16').dc('check-not-exist').ac('ok_16').attr('title', '已经上传过了') }
        currSuccFileAry.push(_fObj); succFileAry.push(_fObj); currIds.push(_fObj.id)
        args.onSuccess({ FileUploader: me, File: _fObj, State: currObj })
      } else {
        args.onError({ FileUploader: me, Message: _str })
      }
    }
    queue.next(function () { return false })
  }

  function onUploadFinish () {
    eFileName.h('')
    fileCount = currIdx = 0
    for (var i = 0; i < errorFnAry.length; i++) { queue.push(errorFnAry[i]) }
    var _obj = {
      responseText: xml,
      status: status,
      allSuccFiles: succFileAry,
      currSuccFiles: currSuccFileAry,
      currIds: currIds
    }
    toolBar.items['start'].setText('开始').setIcon('icon-glyph-circle-arrow-up')
    toolBar.items['add'].setEnabled(true)
    args.onComplete(_obj)
    currSuccFileAry = []; currIds = []
  }

  function bindEvent () {
    if (window.attachEvent) {
      eIframe.attachEvent('onload', uploadCallback)
    } else {
      eIframe.addEventListener('load', uploadCallback, false)
    }
  }

  me.submit = function () {
    if (_ifInit) {
      if (denyFileAry.length || !fileCount) { return false }
      itemCount = queue.len()
      proBar.setVal(0)
      queue.go(function () { return false })
      _ifInit = false
    } else {
      queue.go(function () { return false })
    }
  }

  me.addSpecialFile = function (j) {
    var _name = counter.getN() + (new Date()).getTime(), _j = j || {}
    var _ext = _j.ext || '*', _name = _j.name || 'test', _file = _name + '.' + _ext
    if (_ext == '*') { _ext = 'default' }
    var _eItem = eBody.abElm('', 'li').cn('special-file').h(htmlTemp.special.format(counter.getN() + (new Date()).getTime()))
    var _eForm = _eItem.fc(), _eDetail = _eForm.fc().h(htmlTemp.spDetail.format('icon-filetype-' + _ext, _file)), _eOper = _eDetail.ns()
    var _eInput = _eOper.fc().chn(1).alpha(0), _eState = _eDetail.chn(1).chn(2).chn(1)
    var _obj = {
      f: function () {
        if (_eDetail.chn(1)) {
          if (!_eInput.value) { errorFnAry.push(_obj); queue.next(function () { return false }, true); return }
          var _eD = _eDetail.chn(1), _strFN = _eD.fc().h(), _fid = +_eState.attr('fid')
          _eOper.fc().ac('dn'); $(_eOper.lastChild).dc('dn')
          currObj = { eImg: $(_eOper.lastChild), eState: _eState, fileName: _strFN, ifSpecial: true, fid: _fid }
          _eForm.action = getUploadUrl() + '&specialFileName=' + _file + '.' + _fid
          _eForm.submit()
        } else {
          errorFnAry.push(_obj)
          queue.next()
        }
      },
      args: []
    }
    queue.push(_obj)
    _eInput.evt('change', function (e) {
      var e = $.e.fix(e), _e = e.t; proBar.setVal(0, 1)
      var _obj = urlToObj(_e), _fType = _obj['fileType'].toLow()
      if (checkFileType(_fType, _ext)) {
        if (!inputAry[_name]) { fileCount++; inputAry[_name] = true }
        if (_ext == 'default') { _eDetail.fc().fc().className = 'icon-filetype-' + _fType }
        _eDetail.chn(1).chn(1).h('Size：' + _obj['size'])
        _eItem.dc('bc_c27')
        denyFileAry.re(_eItem)
        _eItem.attr('title', '当前特殊文件原始名：' + _obj['fullName'])
      } else {
        _eItem.ac('bc_c27')
        denyFileAry.push(_eItem)
        _eItem.attr('title', _obj['fullName'] + '的格式(只允许' + _ext + '文件)不对, 请重新选择文件!')
      }
      e.stop()
    })
    return [_name, _file, _eState]
  }

  me.addNormalFile = function () {
    var _name = counter.getN() + (new Date()).getTime()
    var _eItem = eBody.adElm('', 'li').h(htmlTemp.chain.format(_name))
    eBody.scrollTop = eBody.csn('height')
    var _eForm = _eItem.fc(), _eDetail = _eForm.fc(), _eOper = _eDetail.ns(), _eDel = _eOper.fc(), _eState = _eDel.ns(), _eInput = _eState.chn(1)
    var _obj = {
      f: function () {
        if (_eDetail.chn(1)) {
          var _eD = _eDetail.chn(1), _strFN = _eD.fc().h()
          _eState.hide()
          _eOper.adElm('', 'div').cn('wp hp').h('<a title="正在上传" class="state uploading"></a>')
          currObj = { eImg: _eState.ns().fc(), eDel: _eDel, fileName: _strFN }
          _eForm.action = getUploadUrl()
          _eForm.submit()
        } else {
          errorFnAry.push(_obj)
          queue.next()
        }
      },
      args: []
    }
    queue.push(_obj)
    _eInput.evt('change', function (e) {
      var e = $.e.fix(e), _e = e.t; proBar.setVal(0, 1)
      var _obj = urlToObj(_e), _fType = _obj['fileType'].toLow()
      if (!checkFileType(_fType)) {
        if (!inputAry[_name]) { fileCount++; inputAry[_name] = true }
        _eDetail.h(htmlTemp.detail.format('icon-filetype-' + _fType, _obj['fullName'], _obj['size']))
        _eItem.dc('bc_c27')
        denyFileAry.re(_eItem)
      } else {
        _eDetail.h('<div class="lh30 wp">文件名：' + _obj['fullName'] + '</div><div class="c_6 lh30">详细错误：' + _fType + '格式文件不允许上传，请重新选择文件!</div>')
        _eItem.ac('bc_c27')
        denyFileAry.push(_eItem)
      }
      e.stop()
    }).alpha(0)
    _eDel.evt('click', function (e) {
      var e = $.e.fix(e), _e = e.t, _n = _e.ns().chn(1).name
      if (inputAry[_n]) { fileCount--; inputAry[_n] = null }
      denyFileAry.re(_eItem); _eItem.r(); _eItem = null
      queue.remove(_obj)
    })
  }

  function urlToObj (_e) {
    if (!_e) { return }
    var _name, _fileType, _fullName, _size, _location, _strSize = ''
    if (_e.files) {
      var _file = _e.files[0]
      _fullName = _file.name; _ary = _fullName.split('.')
      _name = _ary[0]; _fileType = _ary.pop(); _size = _file.size
    } else {
      var url = _e.value
      var _ary = url.split('\\'), _last = _ary.pop()
      var _dAry = _last.split('.')
      _name = _dAry[0]; _fullName = _last
      _fileType = _dAry.pop(); _location = _ary.join('\\'); _size = _e.size
    }
    if (isIE) {
      try {
        var fso = new ActiveXObject('Scripting.FileSystemObject')
        _size = fso.GetFile(_e.value).size
      } catch (e) {
        _size = '需要您手动降低IE浏览器的安全级别'
      }
    }
    if (_size > 1024 * 1024) {
      _size = (_size / (1024 * 1024)).toFixed(2) + 'M'
    } else if (_size > 1024) {
      _size = (_size / 1024).toFixed(2) + 'KB'
    } else {
      if (typeof _size === 'number') { _size = _size + '字节' }
    }
    return { 'location': _location, 'fileType': _fileType, 'name': _name, 'fullName': _fullName, 'size': _size }
  }

  function fireClick (p) {
    if (!p) { return }
    p = $(p)
    if (p.click) {
      p.click()
    } else {
      var evt = document.createEvent('MouseEvents')
      evt.initEvent('click', true, true)
      p.dispatchEvent(evt)
    }
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  me.show = function () { owner.show(); return me }
  me.hide = function () { owner.hide(); return me }
  me.remove = function () { owner.r(); me = null }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.FlowChart = function (j) {
  // console.error('有调用吗？？？？')
  // console.log('皮肤是：',j.skin)
  /*
    {
    type: "FlowChart",
    desc: "流程图工具",
    args: {
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    skin: { desc: '皮肤样式', defVal: 'FlowChart-default', dataType: 'string' },
    cn: { desc: 'cn样式', defVal: '', dataType: 'string' },
    css: { desc: 'css样式', defVal: '', dataType: 'string' },
    pointSize: { desc: '点的大小', defVal: 30, dataType: 'int' },
    ifDragCreate: { desc: '是否是通过拖动来创建节点', defVal: true, dataType: 'bool' },
    onPointClick: { desc: '回调点的Click事件', defVal: function (){}, dataType: 'function' },
    onPointDrag: { desc: '回调点的拖动事件', defVal: function (){}, dataType: 'function' },
    onLineClick: { desc: '回调线的Click事件', defVal: function (){}, dataType: 'function' },
    onOwnerClick: { desc: '回调容器的Click事件', defVal: function (){}, dataType: 'function' },
    onLinkEnd: { desc: '回调线结束的事件', defVal: function (){}, dataType: 'function' },
    onPressDrag: { desc: '回调按下拖动事件', defVal: function (){}, dataType: 'function' }
    }
    }
    */
  var wf_me = this, _fn = function () { }
  var owner
  var args = {
    p: $DB,
    skin: 'FlowChart-default',
    cn: '',
    css: '',
    ifDragCreate: true,
    pointSize: 30,
    onPointClick: _fn,
    onPointDrag: _fn,
    onLineClick: _fn,
    onOwnerClick: _fn,
    onLinkEnd: _fn,
    onPressDrag: _fn
  }
  //* ************************全局变量*******************
  wf_me.hashPoint = [] 		// 节点hash集合
  wf_me.selElm = null 		// 当前选中那个元素
  wf_me.nodeAry = [] 		// 存放节点的数组
  wf_me.firstPoint 		// 第一个(开始)节点
  var nCount = new $.nCount() // 节点递增
  var downKey = 0 			// 按下的key是否是ctrl
  var downX, downY, downFlag // 按下的xy 是否按下标记
  var downMc, downPoint 				// 存储按下后产生的虚线
  var overElm 				// 当前over的元素
  var lineMask
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () { owner = args.p.ac(args.skin + ' ' + args.cn).css(args.css) }
  function bindEvent () {
    $D.evt('keydown', function (e) {
      // 在任意地方都可以把这个值设为true
      if($.disabledKeyBoard){
        return
      }
      // console.log('按下了：',e.keyCode,e.code)
      if (e.keyCode == 17 || e.keyCode == 91) {
        downKey = 17;
        $D.title = 'ctrl press'
      }
      if (e.keyCode == 46 && wf_me.selElm) {
        deletePoint(wf_me.selElm.id); wf_me.selElm = null; wf_me.selPoint = null
      }
    }).evt('keyup', function (e) {
      downKey = 0; $D.title = 'ctrl up'
      if (downMc) {
        downMc.clear(); downMc.r(); downMc = null
      }
    }).evt('mousemove', function (e) {
      var e = $.e.fix(e)
      if (downKey != 17) { return }
      if (downFlag && downMc) {
        var x = downX, y = downY
        var docX = $D.documentElement.scrollLeft + e.clientX
        var docY = $D.documentElement.scrollTop + e.clientY
        var dx = Math.abs(docX - x), dy = Math.abs(docY - y)
        var sx, sy, ddx, ddy, ex, ey
        var size = 5
        switch (checkDir(downX, downY, docX, docY)) {
          case 1:
            sx = 0; sy = 0
            ddx = downX; ddy = downY
            ex = dx; ey = dy
            dx -= size; dy -= size
            break
          case 2:
            sx = dx; sy = 0
            ddx = downX - dx; ddy = downY
            ex = 0; ey = dy
            ddx += size; ddy -= size
            break
          case 3:
            sx = dx; sy = dy
            ddx = downX - dx; ddy = downY - dy
            ex = 0; ey = 0
            ddx += size; ddy += size
            break
          case 4:
            sx = 0; sy = dy
            ddx = downX; ddy = downY - dy
            ex = dx; ey = 0
            ddx -= size; ddy += size
            break
        }
        downMc.setPos(ddx - owner.pos().x, ddy - owner.pos().y, dx, dy).lineStyle(2, '#060', 'round')
          .beginPath().mTo(sx, sy).dTo(ex, ey, 10, 3).stroke().css('zIndex:100').cn('pa')
        if (!lineMask) { lineMask = owner.adElm('', 'div').cn('pa bc_10 wp hp z3').alpha(0) }
        var elm = $($D.elementFromPoint(e.clientX, e.clientY))
        args.onPressDrag({ FlowChart: wf_me, CurrElm: elm, DownPoint: downPoint, DownMC: downMc, SX: sx, SY: sy, EX: ex, EY: ey })
      }
    })

    owner.evt('click', function (e) {
      if (downKey == 17) { return }
      var e = $.e.fix(e), _e = e.t, _tn = _e.tagName
      if (_e == owner) {
        if (wf_me.selElm) { wf_me.selElm.dc('node-sel').ac('node-normal') }
        wf_me.selElm = null; wf_me.selPoint = null
        args.onOwnerClick({ FlowChart: wf_me, _e: _e })
      } else {
        if (_tn == 'CANVAS' || _tn == 'A') { _e = _e.pn() }
        if (wf_me.selElm && (wf_me.selElm.className.indexOf('node-normal') == -1)) { wf_me.selElm.dc('node-sel').ac('node-normal') }
        var _node = wf_me.hashPoint[_e.id], _ecn = _e.className
        var _cbReturn = { FlowChart: wf_me, _e: _e, eTxt: $(_e.lastChild) }
        if (_ecn == 'line') {
          wf_me.selPoint = null
          _cbReturn.Line = _node;
          args.onLineClick(_cbReturn)
        } else {
          wf_me.selElm = _e; wf_me.selPoint = _node
          if (_ecn.indexOf('node-sel') == -1) { _e.dc('node-normal').ac('node-sel') }
          _cbReturn.Point = _node;
          args.onPointClick(_cbReturn)
        }
      }
    }).evt('mouseup', function (e) {
      var e = $.e.fix(e), _e = e.t
      if (downKey == 17 && downFlag == true) {
        if (downMc) { downMc.clear(); downMc.r(); downMc = null }
        if (wf_me.selElm) {
          var _selID = wf_me.selElm.id, _selPoint = wf_me.hashPoint[_selID]
          if (overElm) { // 连接一个已经存在的节点
            var _overPoint = wf_me.hashPoint[overElm.id]
            if (_selPoint.next.indexOf(overElm.id) >= 0) { return }
            // console.log()
            if (args.onLinkEnd({ FlowChart: wf_me, Start: _selPoint, End: _overPoint }) != false) {
              var lineMc = new createLine({
                id: _selID + '#' + overElm.id,
                x: _selPoint.x,
                y: _selPoint.y,
                x1: _overPoint.x,
                y1: _overPoint.y,
                next: overElm.id,
                pre: _selID,
                type: 'line'
              })
            }
          } else { // 连接未存在的节点
            var _de = $D.documentElement, _oPos = owner.pos()
            var sX = _selPoint.x, sY = _selPoint.y
            var eX = _de.scrollLeft + e.clientX - _oPos.x, eY = _de.scrollTop + e.clientY - _oPos.y
            if (args.ifDragCreate && args.onLinkEnd({ FlowChart: wf_me, Start: _selPoint, SX: sX, SY: sY, EX: eX, EY: eY }) != false) {
              var mc = new createPoint({ x: eX, y: eY, type: 'point' })
              var lineMc = new createLine({ id: _selID + '#' + mc.id, type: 'line', x: sX, y: sY, x1: eX, y1: eY, next: mc.id, pre: _selID })
            }
          }
          if (lineMask) { lineMask.r(); lineMask = null }
        }
      }
      downFlag = false
    }).evt('mousemove', function () { $.noSel() })
  }

  // 返回鼠标象限方向标志
  function checkDir (x, y, x1, y1) {
    var flag = 0
    var x = ((x - x1) <= 0) ? x : x1
    var y = ((y - y1) <= 0) ? y : y1
    if (x != x1 && y != y1) { flag = 1 }
    if (x == x1 && y != y1) { flag = 2 }
    if (x == x1 && y == y1) { flag = 3 }
    if (x != x1 && y == y1) { flag = 4 }
    return flag
  }

  // 画线+节点 方法
  function drawLineNode (x, y, x1, y1, lineObj) {
    var pointSize = args.pointSize
    x = x + pointSize / 2
    y = y + pointSize / 2
    x1 = x1 + pointSize / 2
    y1 = y1 + pointSize / 2
    var dx = Math.abs(x - x1) + 3, dy = Math.abs(y - y1) + 3
    var flag = checkDir(x, y, x1, y1)
    switch (flag) {
      case 1:
        break
      case 2:
        x = x - dx
        break
      case 3:
        x = x - dx
        y = y - dy
        break
      case 4:
        y = y - dy
        break
    }
    if (lineObj.id) { $(lineObj.id).css($.box(x + ',' + y + ',' + dx + ',' + dy)) }
    var _l = 10
    var cp = 0.55
    var ct = Math.PI / 16
    var x = ((x - x1) <= 0) ? x : x1
    var y = ((y - y1) <= 0) ? y : y1
    var _pxOld = dx / 2 							// t=0.5的坐标
    var _pyOld = dy / 2
    var _px = dx * (Math.pow(cp, 3) - 1.5 * Math.pow(cp, 2) + 1.5 * cp) 	// t=0.6时的坐标
    var _py = dy * (3 * Math.pow(cp, 2) - 2 * Math.pow(cp, 3))
    var _dpx = Math.abs(_px - _pxOld) 								// 两点的x,y相差距离
    var _dpy = Math.abs(_py - _pyOld)
    var _deg = Math.atan(_dpy / _dpx) 							// 两点连接的线段的角度（斜率）
    _deg = Math.PI - _deg
    var _dx1 = _px + _l * Math.cos(_deg + ct) 							// 箭头的一个方向点x,y坐标
    var _dy1 = _py - _l * Math.sin(_deg + ct)
    var cx = _px + _l * 2 * Math.cos(_deg)
    var cy = _py - _l * 2 * Math.sin(_deg)
    var _dx2 = _px + _l * Math.cos(_deg - ct) 							// 箭头的另一个方向点坐标
    var _dy2 = _py - _l * Math.sin(_deg - ct)
    var sx, sy, ex, ey
    switch (flag) {
      case 1:
        sx = 0; sy = 0; ex = dx; ey = dy
        break
      case 2:
        sx = dx; sy = 0; ex = 0; ey = dy
        _px = dx - _px; _dx1 = dx - _dx1; _dx2 = dx - _dx2
        cx = dx - cx
        break
      case 3:
        sx = 0; sy = 0; ex = dx; ey = dy; _px = dx - _px; _dx1 = dx - _dx1
        _dx2 = dx - _dx2; _py = dy - _py; _dy1 = dy - _dy1; _dy2 = dy - _dy2
        cx = dx - cx; cy = dy - cy
        break
      case 4:
        sx = dx; sy = 0; ex = 0; ey = dy; _py = dy - _py
        _dy1 = dy - _dy1; _dy2 = dy - _dy2
        cy = dy - cy
        break
    }
    lineObj.setPos(0, 0, dx < 10 ? 10 : dx, dy < 10 ? 10 : dy).ac('').lineStyle(1, '#ccc').beginPath().mTo(sx, sy).bTo(dx / 2, 0, dx / 2, dy, ex, ey).stroke().beginPath().lineStyle(1, 'red', 'round').mTo(_dx1, _dy1).lTo(_px, _py).mTo(_dx2, _dy2).lTo(_px, _py).lTo(cx, cy).stroke().ac('z1')
    return lineObj
  }

  function joinNode (obj) {
    var _j = obj || {}, _pre = _j.pre, _next = _j.next
    var _pNode = wf_me.hashPoint[_pre], _nNode = wf_me.hashPoint[_next]
    var mc = new createLine({
      id: _j.id,
      txt: _j.txt,
      x: _pNode.x,
      y: _pNode.y,
      x1: _nNode.x,
      y1: _nNode.y,
      lineObj: new $.draw({ p: owner })
    })
    mc.next = _next
    mc.pre = _pre
    wf_me.hashPoint[_pre].next = _pNode.next.ac(_next)
    wf_me.hashPoint[_next].pre = _nNode.pre.ac(_pre)
  }

  // 给两个node创建一条连线
  function createLine (j) {
    var line = this, pointSize = args.pointSize
    var x = j.x || 0, y = j.y || 0
    var x1 = j.x1 || 0, y1 = j.y1 || 0, _next = j.next || '', _pre = j.pre || ''
    var lineObj = j.lineObj || new $.draw({ p: owner })
    var _txt = j.txt || '', _id = j.id
    var dx = Math.abs(x1 - x), dy = Math.abs(y1 - y)
    drawLineNode(x, y, x1, y1, lineObj)
    switch (checkDir(x, y, x1, y1)) {
      case 1:

        break
      case 2:
        x = x - dx
        break
      case 3:
        x = x - dx
        y = y - dy
        break
      case 4:
        y = y - dy
        break
    }
    var elm = owner.adElm(_id, 'div').cn('line').css($.box((x + pointSize / 2) + ',' + (y + pointSize / 2) + ',' + dx + ',' + dy))
    lineObj.appendTo(elm)
    var eTxt = elm.adElm('', 'A').cn('line-text').h(_txt)
    lineObj.id = _id
    line.type = 'line'
    line.id = _id
    line.mc = lineObj
    line.elm = elm
    line.next = _next
    line.pre = _pre
    line.txt = _txt
    if (_next && _pre) {
      wf_me.hashPoint[_pre].next = wf_me.hashPoint[_pre].next.ac(_next)
      wf_me.hashPoint[_next].pre = wf_me.hashPoint[_next].pre.ac(_pre)
    }
    line.set = function (key, value) { if (!key) { return } if (key == 'txt') { eTxt.h(value) } line[key] = value; return line }
    line.remove = function () { elm.r(); line = null }
    line.getJson = function () { return { id: line.id, type: line.type, next: line.next, pre: line.pre, txt: line.txt } }
    wf_me.hashPoint[_id] = line
    return line
  }

  function createPoint (j) {
    var point = this, pointSize = args.pointSize
    var x = j.x || 0, y = j.y || 0
    var sTxt = 'Node_' + nCount.getN()
    var _txt = j.txt || sTxt, _id = j.id || sTxt, _col = j.color || '#18f'
    x = x < 0 ? 0 : x
    y = y < 0 ? 0 : y
    var elm = owner.adElm(_id, 'div').cn('point node-normal').css($.box(x + ',' + y + ',' + pointSize + ',' + pointSize))
    var mc = new $.draw({ p: owner })
    mc.setPos(0, 0, pointSize, pointSize).lineStyle(1, '#999', 'round').drawRect(0, 0, pointSize, pointSize, 6, _col).appendTo(elm)
    var eTxt = elm.adElm('', 'A').cn('point-text').css('left:' + (pointSize + 5) + 'px;top:0px;').h(_txt)
    $.drag.init(elm)
    mc.evt('mouseover', function (e) { overElm = elm }).evt('mouseout', function (e) { overElm = null })
    elm.onDragStart = function (x, y, e) {
      var e = $.e.fix(e), _e = e.t
      if (_e.tagName == 'CANVAS' || _e.tagName == 'shape') {
        if (wf_me.selElm) { wf_me.selElm.dc('node-sel').ac('node-normal') }
        elm.dc('node-normal').ac('node-sel')
        if (downKey == 17) {
          downX = elm.pos().x + pointSize / 2
          downY = elm.pos().y + pointSize / 2
          downFlag = true; downPoint = point
          downMc = new $.draw({ p: owner })
        }
      }
      wf_me.selElm = elm; wf_me.selPoint = point
      if (downKey == 17) { elm.dragable = false } else { elm.dragable = true }
    }
    elm.onDragEnd = function () { }
    elm.onDrag = function () {
      var _x = this.csn('left'), _y = this.csn('top')
      resetLines(_x, _y)
      point.x = _x; point.y = _y
      args.onPointDrag({ FlowChart: wf_me, Point: point, X: _x, Y: _y })
    }
    point.id = _id
    point.type = 'point'
    point.ext = j.ext || {}
    point.mc = mc
    point.elm = elm
    point.next = ''
    point.pre = ''
    point.x = x
    point.y = y
    point.color = _col
    point.txt = _txt
    point.getJson = function () { return { id: point.id, type: 'point', next: point.next, pre: point.pre, txt: point.txt, x: point.x, y: point.y, color: point.color, ext: point.ext } }
    point.getExtJson = function () { return point.ext }
    point.set = function (key, value) {
      if (!key) { return }
      switch (key) {
        case 'color':
          mc.drawRect(0, 0, pointSize, pointSize, 6, value)
          break
        case 'txt':
          eTxt.h(value)
          break
        case 'x':
          val = +value
          elm.css('left:' + value + 'px;')
          resetLines(value, point.y)
          break
        case 'y':
          val = +value
          elm.css('top:' + value + 'px;')
          resetLines(point.x, value)
          break
      }
      point[key] = value
      return point
    }
    point.setExt = function (key, value) { if (!key) { return } point.ext[key] = value; return point }
    point.getExt = function (key) { return point.ext[key] }
    function resetLines (_x, _y) {
      var _preAry = point.pre.split(' '), _p_len = _preAry.length
      var _nextAry = point.next.split(' '), _n_len = _nextAry.length
      // 父亲连线
      for (var i = 0; i < _p_len; i++) {
        var _pre = _preAry[i], _key = _pre + '#' + _id, _pNode = wf_me.hashPoint[_pre]
        if (!wf_me.hashPoint[_key]) { continue }
        drawLineNode(_pNode.x, _pNode.y, _x, _y, wf_me.hashPoint[_key].mc)
      }
      // 儿子连线
      for (var i = 0; i < _n_len; i++) {
        var _next = _nextAry[i], _key = _id + '#' + _next, _pNext = wf_me.hashPoint[_next]
        if (!wf_me.hashPoint[_key]) { continue }
        drawLineNode(_x, _y, _pNext.x, _pNext.y, wf_me.hashPoint[_key].mc)
      }
    }
    if (!wf_me.firstPoint) { wf_me.firstPoint = point }
    wf_me.hashPoint[_id] = point
    return point
  }

  function deletePoint (key) {
    var _point = wf_me.hashPoint[key], _type
    if (!_point) { return }
    _type = _point.type || ''
    switch (_type) {
      case 'point':
        var aPre = _point.pre.split(' '), _p_len = aPre.length
        var aNext = _point.next.split(' '), _n_len = aNext.length
        for (var i = 0; i < _p_len; i++) {
          var _pre = aPre[i], _prePoint = wf_me.hashPoint[_pre]
          if (_prePoint) {
            wf_me.hashPoint[_pre].next = _prePoint.next.dc(key)
            $(_prePoint.id + '#' + key).r()
            wf_me.hashPoint[_prePoint.id + '#' + key] = null
          }
        }
        for (var i = 0; i < _n_len; i++) {
          var _next = aNext[i], _nextPoint = wf_me.hashPoint[_next]
          if (_nextPoint) {
            wf_me.hashPoint[aNext[i]].pre = _nextPoint.pre.dc(key)
            $(wf_me.hashPoint[key + '#' + _next].id).r()
            wf_me.hashPoint[wf_me.hashPoint[key + '#' + _next].id] = null
          }
        }
        $(key).r()
        wf_me.hashPoint[key] = null
        break
      case 'line':
        var pre = _point.pre, next = _point.next
        if (wf_me.hashPoint[pre]) {
          wf_me.hashPoint[pre].next = wf_me.hashPoint[pre].next.dc(next)
        }
        if (wf_me.hashPoint[next]) {
          wf_me.hashPoint[next].pre = wf_me.hashPoint[next].pre.dc(pre)
        }
        $(key).r()
        wf_me.hashPoint[key] = null
        break
    }
  }
  wf_me.load = function (obj) {
    if (!obj) { return wf_me }
    var maxId = 0, _len = obj.length
    for (var i = 0; i < _len; i++) {
      var _j = obj[i] || {}, _type = _j.type
      switch (_type) {
        case 'point':
          var objId = _j.id, _currIdx = (+objId.split('_')[1])
          maxId = maxId < _currIdx ? _currIdx : maxId
          new createPoint(_j)
          break
        case 'line':
          var _pre = _j.pre, _next = _j.next
          var _pNode = wf_me.hashPoint[_pre], _nNode = wf_me.hashPoint[_next]
          _j.x = _pNode.x; _j.y = _pNode.y; _j.x1 = _nNode.x; _j.y1 = _nNode.y
          new createLine(_j)
          break
      }
    }
    nCount.setN(maxId)
    return wf_me
  }

  wf_me.firePointClick = function (id, fn) {
    var _point = wf_me.hashPoint[id], _f = fn || args.onPointClick
    if (!_point) { _point = wf_me.firstPoint }
    if (_point) {
      var elm = _point.elm
      if (wf_me.selElm) { wf_me.selElm.dc('node-sel').ac('node-normal') }
      elm.dc('node-normal').ac('node-sel')
      wf_me.selElm = elm; wf_me.selPoint = _point
      _f({ FlowChart: wf_me, Point: _point })
    }
  }

  wf_me.reLoad = function (dataAry) {
    owner.h('')
    wf_me.hashPoint = [] 		// 节点hash集合
    wf_me.selElm = null 		// 当前选中那个元素
    wf_me.nodeAry = [] 		// 存放节点的数组
    wf_me.selPoint = null
    wf_me.firstPoint = null
    nCount.setN(0)
    wf_me.load(dataAry)
  }
  // 对外公共方法
  wf_me.setNodeAttr = function (id, key, value) {
    var _node = hashPoint[id], _val = value || ''
    if (!_node || !key) { return }
    _node.set(key, _val)
    return wf_me
  }
  wf_me.getCurrIdx = function () { return nCount.getN() }
  wf_me.addNode = function (j, ifReturn) { // 创建一个节点
    var point
    if (j.type == 'point') { point = new createPoint(j) } else { point = new createLine(j) }
    if (ifReturn) { return point }
    return wf_me
  }
  wf_me.joinNode = joinNode 									// 画线连接2个id
  wf_me.deleteNode = deletePoint 								// 删除一个节点
  wf_me.getNode = function (key) { if (typeof key === 'string') { return wf_me.hashPoint[key] } else { return key } }
  wf_me.init = function (j) {
    setDefault(j);
    layout();
    bindEvent();
    return wf_me
  }
  wf_me.show = function () { owner.show(); return wf_me }
  wf_me.hide = function () { owner.hide(); return wf_me }
  wf_me.remove = function () { owner.r(); wf_me = null }
  if (arguments.length) { wf_me.init(j) }
  return wf_me
}

$.UI.Chat = function (j) {
  var me = this, _fn = function () { }
  var socket, _dialogs = {}, _userHash = {}, _currUserId = $.ck.get('SESSIONID'), _socketId, _socketHash = {}
  var owner, args = { p: $DB, cn: '', css: '', socketServer: 'http://127.0.0.1:8081' }
  function setDefault (j) { args = $.Util.initArgs(j, args) }
  function layout () {
    owner = args.p.adElm('', 'ul').cn('chat-user-list').css(args.css)
    socket = io.connect(args.socketServer)
    loadUsers()
  }

  function loadUsers () {
    $.Util.ajax({
      args: 'm=SYS_CM_USERS&action=getAllUsers&keyFields=id,uid,avatar&dataType=json',
      onSuccess: function (d) {
        var _uAry = eval(d.get(0) || '[]')
        for (var i = 0, _len = _uAry.length; i < _len; i++) {
          var _user = _uAry[i], _id = _user.id
          _userHash[_id] = _user
          if (+_currUserId == +_user.id) { continue }
          _userHash[_id].eLi = owner.adElm('', 'li').cn('gray').h('<img class="avatar" src="images/avatar/' + _user.avatar + '" /><span>' + _user.uid + '</span><a class="talk" uName="' + _user.uid + '" uid="' + _id + '" title="单击聊天"></a>')
        }
      },
      onError: function (d) { MTips.show(d.data, '加载用户失败') }
    })
  }

  function bindEvent () {
    owner.evt('click', function (e) {
      var e = $.e.fix(e), _e = e.t
      if (_e.tagName == 'A' && _e.className == 'talk') {
        if (_e.pn().className.ec('gray')) { return }
        var _uid = +_e.attr('uid')
        if (!_dialogs[_uid]) { _dialogs[_uid] = new $.UI.ChatDialog({ socket: socket, userName: _e.attr('uName'), userId: _uid }) }
        _dialogs[_uid].show()
      }
    })
    socket.on('connect', function (data, a, b) {
      console.log('socket-connect-success')
      _socketId = socket.socket.sessionid
      _socketHash[_socketId] = socket.socket
      socket.emit('login', { loginId: $.ck.get('SESSIONID'), socketId: _socketId })
    })
    socket.on('disconnect', function (data) {
      console.log('socket--disconnect')
      socket.emit('quit', { loginId: $.ck.get('SESSIONID'), socketId: _socketId })
    })
    socket.on('quit', function (data) {
      console.log('socket--quit')
      console.log(data)
    })
    socket.on('pushOnLineUsers', function (data) {
      console.log('pushOnLineUsers')
      var _hash = data.socketHash, _sId = socket.socket.sessionid
      for (var k in _hash) {
        var _userObj = _userHash[+_hash[k].loginId]
        if (k != _sId && _userObj && _userObj.eLi) { _userObj.eLi.dc('gray') }
      }
    })
    socket.on('notice', function (data) {
      var _cId = +_currUserId, _fId = +data.from, _tId = +data.to
      data.fromValue = _userHash[_fId]; data.toValue = _userHash[_tId]
      if (_cId == _fId) { data.ifSelf = true } else { data.ifSelf = false }
      if (_cId == _fId || _cId == _tId) {
        var _dialog = _dialogs[_fId]
        if (_dialog) {
          _dialog.show()
        } else {
          _dialog = _dialogs[_fId] = new $.UI.ChatDialog({ socket: socket, userName: data.fromValue.uid, userId: data.from })
        }
        _dialog.addMsg(data)
      }
    })
  }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.ChatDialog = function (j) {
  var me = this, _fn = function () { }
  var owner, dialog, eInput, eMsg, socket, args = { p: $DB, socket: null, userName: '', userId: 0 }
  function setDefault (j) { args = $.Util.initArgs(j, args); socket = args.socket }
  function layout () {
    dialog = new $.UI.Tips({ head_h: 30, icon: 'icon-vector-chats', x: 200, y: 200, ifDrag: true, width: 550, height: 500, onResize: function () { mainLayout.resize() }, ifResize: true, title: args.userName, ifClose: true, onClose: function () { me.hide(); return false } })
    var mainLayout = new $.UI.Layout({ p: dialog.body, min: 100, max: 200, isRoot: 1, ifCover: false, ifDrag: false, start: 150, dir: 'we', dirLock: 2, barWidth: 1 })
    var contentLayout = new $.UI.Layout({ p: mainLayout.eHead, min: 150, max: 250, ifCover: false, start: 150, dir: 'ns', dirLock: 2 })
    var baseDiv = new $.UI.Tips({ p: contentLayout.eFoot, cn: 'b0', head_h: 0, foot_h: 38 })
    new $.UI.ButtonSet({ p: baseDiv.foot, itemAlign: 'right', items: [{ text: '发送', name: 'sendMsg', tab: 'menu', skin: 'Button-blue', css: 'margin-top:5px;', cn: 'mr10' }, { text: '关闭', name: 'cancle', skin: 'Button-danger', css: 'margin-top:5px;', cn: 'mr10'}], onClick: onToolBarClick })
    baseDiv.body.h('<textarea placeholder="请输入..." style="width:100%;height:100%;border:none;padding:0px;resize:none;"></textarea>')
    eInput = baseDiv.body.fc(); eMsg = contentLayout.eHead.ac('Waterfall').css('overflow: auto;').h('<ul class="ListItem" style="margin: 10px 25px;"></ul>').fc(); loadUser(args.userId, mainLayout.eFoot.ac('chat-user-info'))
  }

  function onToolBarClick (obj) {
    switch (obj.Name) {
      case 'sendMsg':
        sendMsg()
        break
      case 'cancle':
        me.hide()
        break
    }
  }

  function bindEvent () {
    eInput.evt('keyup', function (e) { var e = $.e.fix(e), _e = e.t; if (e.code == 13) { sendMsg() } })
  }

  function sendMsg () {
    var _val = eInput.value.trim()
    if (!_val) { return }
    eInput.value = ''; eInput.focus()
    socket.emit('say', { from: +$.ck.get('SESSIONID'), to: args.userId, msg: _val })
    addMsgItem({ ifSelf: true, name: args.userName, msg: _val })
  }

  function loadUser (uid, p) {
    $.Util.ajax({
      args: 'm=SYS_CM_USERS&action=getUserInfo&dataType=json&id=' + uid,
      onSuccess: function (data) {
        var _user = eval(data.get(0) || '[]')[0]
        p.h('<div class="avatar"><img src="images/avatar/' + _user.avatar + '" /></div><div class="info">' + _user.uid + '</div><div class="info">' + _user.email + '</div>')
      }
    })
  }
  function addMsgItem (obj) {
    var _dir = 'left', _bc = '#E2E2E2', _bbc = '#D9F0F7', _arrowH = '<div class="pa w16 h16 fl" style="margin-left:-16px;padding:0px;margin-top:5px;"></div>'
    if (obj.ifSelf) {
      _dir = 'right'; _arrowH = '<div class="pa w16 h16 fr" style="padding:0px;margin-top:5px;right:10px;"></div>'; _bbc = '#FFFFCA'
    }
    var _temp = eMsg.adElm('', 'li').h(_arrowH + '<div class="content" style="background-color:' + _bbc + ';">' + obj.msg + '</div><div>' + obj.name + '     ' + (new Date()).date2Str() + '</div>')
    if (obj.ifSelf) { _temp.css('text-align: right;') }
    new $.UI.Arrow({ p: _temp.fc(), diff: 1, comMode: 'border', borderColor: _bc, backgroundColor: _bbc, cn: 'cp', dir: _dir })
    eMsg.scrollTop = eMsg.offsetHeight - eMsg.clientHeight // Chrome
  }
  me.addMsg = function (obj) { addMsgItem({ ifSelf: false, name: obj.toValue.uid, msg: obj.msg }) }
  me.getArgs = function () { return args }
  me.evt = function (key, fn) { me.set(key, fn); return me }
  me.set = function (key, value) { args[key] = value; return me }
  me.get = function (key) { return args[key] }
  me.show = function () { dialog.show(); return me }
  me.hide = function () { dialog.hide(); return me }
  me.init = function (j) { setDefault(j); layout(); bindEvent(); return me }
  if (arguments.length) { me.init(j) }
  return me
}

$.UI.View = function (j) {
  var me = this
  var args = { p: $DB, url: '', onLoad: function () { } },
    view

  function setDefault (j) { args = $.Util.initArgs(j, args) }

  // View/workflow/TemplateManager.js
  function urlToNS (URL) {
    var _ary = URL.toString().split('/'), _iLen = _ary.length, _ns
    _ary[_iLen - 1] = _ary[_iLen - 1].split('.')[0]
    for (var i = 0; i < _iLen; i++) {
      var _name = _ary[i];
      if (_name.toLow() == 'view') {
        _ns = $View
      } else {
        if ($.getType(_ns) == 'object') {
          _ns = _ns[_name]
        } else {
          continue
        }
      }
    }
    return _ns
  }
  function init (j) { setDefault(j); me.loadView(args) }

  // 加载指定页面
  me.loadView = function (_args) {
    if ($.global.ifCheckCookie && !$.ck.get('SESSIONID')) { MTips.show('您已经很长时间未操作了哦，请重新登录！', 'warn'); window.location.href = 'index.html'; return }
    var _args = _args || {},
      _url = _args.url || '',
      _f = args.onLoad || args.onLoad,
      _comArgs = _args || _args.args
    if (!_url) { return }
    if (!_comArgs) { _comArgs = args }
    for (var k in args) { _comArgs[k] = args[k] }
    args.p.h('<div class="loading32" style="width:320px;height:240px;margin:60px auto;"></div>')

    $.Util.loadJS(
      _url,
      function () {
        args.p.h('')
        var _ns = urlToNS(_url)
        _comArgs.p = args.p
        if (!_ns) {
          me.loadView({ url: 'View/error/Error404.js', href: _url })
          return
        }
        view = new _ns(_comArgs);
        _f(view, me)
      }
    )
  }
  init(j)
  return me
}

$.UI.ViewClass = function () { this.owner = null; this.args = {}; this.self = null }
$.UI.ViewClass.prototype = {
  setArgsObj: function (v) { this.args = v },
  setOwner: function (v) { this.owner = v },
  setSelf: function (v) { this.self = v },
  getArgsObj: function () { return this.args },
  evt: function (key, fn) { this.set(key, fn); return this.self },
  set: function (key, value) { this.args[key] = value; return this.self },
  get: function (key) { return this.args[key] },
  show: function () { this.owner.show(); return this.self },
  hide: function () { this.owner.hide(); return this.self },
  remove: function () { this.owner.r(); this.self = null }
}
$.UI.DestroyPopElm = function (pos) {
  if ($.global.popTips) { $.global.popTips.hide() }
  if ($.global.popMYTips) { $.global.popMYTips.hide() }
}

export default $
