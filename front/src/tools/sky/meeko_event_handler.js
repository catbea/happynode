/* eslint-disable */
/* "use strict"; */

import $ from './meeko_ui'

$.UI.FormItem.EventHandler = function (owner, args) {
  var me = this, attr = {}
  var type, args, self, owner, eInput, eBody, eMark, eCheckIcon, eCheckText, isNonN, popTips
  var regTemplateObj = {
    'default': '^[a-zA-Z]{1,20}([a-zA-Z0-9]|[._]){1,20}$', // 5-20个字符
    'normal': '^[a-zA-Z]{5,20}([a-zA-Z0-9]|[._]){5,19}$', // 5-20个字符
    'email': '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+', // 邮箱
    'integer': '^[0-9]*$', // 整数
    'decimal': '^\d*\.?\d{0,2}$', // 小数
    'chinese': '[\u4E00-\u9FA5\uf900-\ufa2d]', // 中文
    'string': '',
    'month': '', // 月份
    'ip': '^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$', // IP
    'startNow': '\.\d{1,3}$', // 起始时间必须大于现在时间
    'price': '^(\d*\.\d{0,2}|\d+).*$', // 价格
    'IDCard': '^(\d{14}|\d{17})(\d|[xX])$', // 身份证     ^(\d{18,18}|\d{15,15}|\d{17,17}x)$
    'date': '^\d{4}-\d{1,2}-\d{1,2}$', // 日期
    'link': '<a href=".+?">.+?<\/a>', // 链接
    'fullWidthChar': '[^\uFF00-\uFFFF]]', // 全角字符
    'EnglishAddress': '^[a-zA-Z][\.a-zA-Z\s,0-9]*?[a-zA-Z]+$', // 英文地址
    'username': '^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$', // 用户名只 能用 中文、英文、数字、下划线、4-16个字符
    'mobileNumber': '^0*(13|15)\d{9}$',
    'phoneNumber': '^\d{3,4}-\d{7,8}(-\d{3,4})?$',
    'creditCard': '^[1-9][0-9]{3} [0-9]{4} [0-9]{4} [0-9]{4}$' // 信用卡
  }
  function setDefault (owner, args) {
    args = args; owner = owner
    type = args.comType; isNonN = args.noInput; self = args.self
    me.doms = ownerToJSON()
    setStyle()
  }
  function doEvent () {
    if (isNonN) {
      if (type == 'Label' && args.type == 'image') {
        eBody.evt('click', function (e) {
          var e = $.e.fix(e), _e = e.t
          if (_e.tagName == 'IMG') { args.onClick({ FormItem: self, _E: _e }) }
        })
      }
      return
    }
    eInput.evt('click', function (e) { if (args.readonly) { var e = $.e.fix(e); e.stop() }; me.fireClick() })
      .evt('focus', function (e) { if (args.readonly) { eInput.blur(); return false } })

      // 失去焦点
      .evt('blur', function (e) {
        var e = $.e.fix(e), _e = e.t, _r = true, _val = _e.value
        if (_val == args.defText) {
          onReset()
        } else {
          _r = me.checkItem()
        }
        args.onBlur({ FormItem: self, eInput: _e, Value: _val })
        e.stop()
      }).evt('keyup', function (e) {
        var e = $.e.fix(e), _e = e.t
        var _val = _e.value
        self.set('isChange', true).set('value', _val).set('text', _val)
        var _cVal = me.checkItem()
        args.onKeyUp({ FormItem: self, eInput: _e, Value: _val, CheckValue: _cVal })
        if (e.keyCode == 13 && self.get('ifEnterSubmit')) {
          args.onEnterPress({ FormItem: self, eInput: _e, Value: _val })
          $.UI.DestroyPopElm('pageIndex--EnterPress')
        }
        if (args.comType.trim() == 'AutoComplete') { onAutoCompleteKeyUp() };
        args.onChange({ FormItem: self, Value: _val, Text: _val, Args: args, Name: args.name })
        e.stop()
      })
    if (eMark) { eMark.evt('click', function (e) { var e = $.e.fix(e); e.stop(); self.get('onClickBefore')({ FormItem: self, Args: args }); if (type == 'NumUpDown') { clickNumUpDown(e.t) } else { me.fireClick() }; return; self.get('onClick')({ FormItem: self, Args: args }) }) }
  }

  function getPopTips (width) {
    if ($.global.popTips) { $.global.popTips.remove() }
    var _w = width || args.popWidth, _h = args.popHeight, _whCss = '', _bW = eBody.csn('width'), _pdArgs = { p: args.popOwner, ifFixedHeight: false }
    if (_w) { _bW = _w }
    if (_h) {
      if (args.ifAutoPopHeight) { _whCss += 'max-height:' + _h + 'px;' } else { _pdArgs.ifFixedHeight = true; _whCss += 'height:' + _h + 'px;' }
    } else {
      _whCss += 'height:auto;'
    }
    _whCss += 'width:' + (_bW - 2) + 'px;'
    $.global.popTips = new $.UI.PopDialog(_pdArgs)
    var _pTips = $.global.popTips
    _pTips.hide().set('ePop', eBody).css(_whCss)
    return _pTips
  }

  function clickNumUpDown (_e) {
    var _cn = _e.className, _origVal = +eInput.value || 1, _newVal = ''
    if (isNaN(_origVal)) { onCheckErr('Illegal Default Value'); return }
    var _s = +args.step, _min = +args.min, _max = +args.max, _ifLoop = args.ifLoop
    switch (_cn) {
      case 'FI-NumUpDown-Up':
        _newVal = _origVal + _s
        if (_newVal > _max) {
          if (_ifLoop) { _newVal = _min } else { _newVal = _max }
        }
        break
      case 'FI-NumUpDown-Down':
        _newVal = _origVal - _s
        if (_newVal < _min) {
          if (_ifLoop) { _newVal = _max } else { _newVal = _min }
        }
        break
    }
    onCheckSucc()
    if (args.ifFillZero && _newVal < 10) { _newVal = '0' + _newVal }
    self.setData(_newVal, _newVal)
    args.onUpDown(args.self, _newVal, _e)
  }

  function onAutoCompleteKeyUp () {
    var _val = eInput.value, _tips = getPopTips()
    if (!args.key || !args.table || _val.length < 2) { return }
    var _api = 'm=SYS_TABLE_BASE&table=' + args.table + '&action=likeQueryKey&key=' + args.key + '&value=' + _val + '&keyFields=id,' + args.key
    _tips.init({
      type: 'Menu',
      loadApi: _api,
      textKey: args.key,
      valueKey: 'id',
      ifShowIcon: false,
      onSuccess: function () { _tips.show() },
      onClick: function (obj) { self.setData(obj.Text, obj.Text); self.set('id', obj.Value); _tips.hide(); args.onSelect(obj) }
    })
  }

  function clickDate (value) {
    var _tips = getPopTips()
    _tips.init({ type: 'Calendar', nowD: value }).evt('onClick', function (obj) { var _val = obj.Value; self.setData(_val, _val); _tips.hide() }).show()
  }

  function clickKeyInput () {
    var _tips = getPopTips()
    _tips.init({ type: 'KeyPanel' })
      .evt('onKeyClick', function (obj) {
        var _e = obj._e, _key = _e.h(), _val = eInput.value, _newVal
        if (_e.tagName != 'A') { return }
        switch (_key) {
          case '-':
            if (_val.indexOf('-') != -1) { _newVal = _val.substring(1) } else { _newVal = '-' + _val }
            break
          case '←':
            _newVal = _val.substring(0, _val.length - 1); break
          case 'C':
            _newVal = ''; break
          case '.':
            if (_val.indexOf('.') != -1) { _key = '' }
            _newVal = _val + _key; break
          default:
            _newVal = _val + _key; break
        }
        self.setData(_newVal, _newVal)
      }).show()
  }

  function clickPopTips () {

  }

  function clickSelect () {
    var _tips = getPopTips()
    if (!args.gtID && !args.loadApi && !args.items.length) { MTips.show('数据为空', 'warn'); return }
    _tips.init({
      type: 'Menu',
      gtID: args.gtID,
      items: args.items,
      checkedValue: self.getValue(),
      loadApi: args.loadApi,
      textKey: args.textKey,
      valueKey: args.valueKey,
      extFields: args.extFields,
      hidden: args.hidden,
      ifShowIcon: args.ifShowIcon,
      onSuccess: function () { _tips.show() },
      onLoadOver: function () { _tips.show() },
      onClick: function (obj) { self.set('MenuArgs', obj.Item.Args).setData(obj.Value, obj.Text); if (obj.Style) { eInput.css(obj.Style) }; _tips.hide(); args.onSelect() }
    })
  }

  function clickTreeList () {
    var _tips = getPopTips(), _tlArgs = args
    _tlArgs.type = 'TreeList'
    _tlArgs.onSuccess = function () { _tips.resize().show() }
    _tlArgs.onClick = function (obj) { self.setData(obj.Value, obj.Text); _tips.hide(); args.onSelect() }
    _tips.init(_tlArgs).show()
  }

  function clickTree () {
    var _tips = getPopTips(), _tlArgs = args
    _tlArgs.type = 'List'; _tlArgs.cn = null; _tlArgs.css = null
    _tlArgs.onSuccess = function () { _tips.resize().show() }
    _tlArgs.onExpandNodeSuccess = function () { _tips.resize() }
    _tlArgs.onTDClickBefore = function (obj) { return args.onListTDClickBefore(obj, self) }
    _tips.init(_tlArgs)
  }

  function clickCheckBoxs (cbAry) {
    var _tAry = [], _vAry = []
    for (var i = 0, _len = cbAry.length; i < _len; i++) {
      var _cb = cbAry[i]
      if (_cb.getChecked()) { _tAry.push(_cb.getText()); _vAry.push(_cb.getValue()) }
    }
    self.setData(_vAry.join(','), _tAry.join(',')); me.checkItem(true)
  }

  function onFileUploaderClick (obj) {
    popTips = new $.UI.Tips({ comMode: 'x-auto', width: 500, height: 400, y: 100, head_h: 30, ifMask: true, ifClose: true, title: '文件上传', icon: 'icon-glyph-arrow-up' })
    new $.UI.FileUploader({ p: popTips.body, specialFiles: args.specialFiles, mId: args.mId, catelogId: args.catelogId, catelog: args.catelog, uploadApi: args.uploadApi, onSuccess: onUploadSuccess, onComplete: function (objs) { args.onComplete({ FormItem: self, Objs: objs }) } })
  }

  function onUploadSuccess (obj) {
    var _fObj = obj.File, _fName = _fObj.nodeName || _fObj.title, _txt = _fName, _val = self.getValue() || ','
    self.set('value', _val + _fObj.id + ',').set('text', _val + _fObj.id + ',').set('isChange', true)
    if (_txt.length > 25) { _txt = _txt.substr(0, 15) + '...' }
    if (obj.State.ifSpecial && obj.State.fid) { args.onSuccess({ FormItem: self, File: _fObj, ValueObject: obj }); return }
    var _eFile = args.eFiles.adElm('', 'a').h('<span class="download"></span><span MTips=' + _fName + '>' + _txt + '</span><span class="del" MTips="删除文件" fid="' + _fObj.id + '"></span>').attr('target', '_self').attr('href', 'Module/SYS_CM_FILES.aspx?action=downloadFile&id=' + _fObj.id)
    $(_eFile.lastChild).evt('click', function (e) { var e = $.e.fix(e), _e = e.t; e.stop(); if (_e.tagName == 'SPAN' && _e.className == 'del') { self.delFile(_e) } })
    args.onSuccess({ FormItem: self, File: _fObj, ValueObject: obj })
  }

  function ownerToJSON () {
    var _o = owner, _eH, _eB, _eF
    if (!_o.fc()) { return {} }
    if (args.ifHead) { _eH = _o.fc(); _eB = _eH.ns() }
    if (args.ifFoot) { _eF = $(_o.lastChild); if (!_eB) { _eB = _eF.ps() }; eCheckIcon = _eF.fc(); eCheckText = _eCI.ns() }
    if (!_eB) { _eB = _o.fc() }
    if (!isNonN) { eInput = _eB.fc(); eMark = eInput.ns() }
    eBody = _eB
    return { eHead: _eH, eBody: _eB, eFoot: _eF, eInput: eInput, eMark: eMark, eCheckIcon: eCheckIcon, eCheckText: eCheckText }
  }

  function onReset () {
    var _eF = me.doms.eFoot
    if (_eF) { _eF.ac('dn').dc('checkSucc checkErr') }
    if (eInput) { eInput.ac('input-normal').dc('input-ok input-focus input-error') }
    ValidateTips.hide()
  }

  function onCheckSucc (sOK) {
    var _eF = me.doms.eFoot
    if (_eF) { _eF.ac('checkSucc').dc('dn checkErr'); eCheckText.h(sOK) } else { ValidateTips.hide() }
    if (eInput) {
      eInput.dc('input-error').ac('input-ok')
      setTimeout(function () { eInput.dc('input-ok').ac('input-normal') }, 10)
    } else {

    }
  }

  function onCheckErr (sErr) {
    var _eF = me.doms.eFoot, _sErr = sErr || '非法数据'
    if (_eF) {
      _eF.ac('checkErr').dc('dn checkSucc')
      eCheckText.h(_sErr)
    } else {
      var _pos = eBody.pos()
      ValidateTips.setText(_sErr).setPos(_pos.x, _pos.y + _pos.h + 10).show()
    }
    if (eInput) {
      eInput.ac('input-error').dc('input-normal input-focus input-ok')
    } else {

    }
  }

  function check () {
    var _val = self.getValue(), _req = args.req, _sR = args.sReg, _rTemp = regTemplateObj[args.regTemplate] || ''
    if (!_req && _val.length == 0) { return true }
    if (type == 'RePwd' || type == 'EndDate') {
      var _matItem = self.form.items[args.matchItem]
      if (!_matItem) { args.sErr = '要进行匹配的FormItem项不存在'; return false }
      var _matVal = _matItem.getValue()
      if (args.onMatchVal({ FormItem: self, MatchValue: _matVal, Value: _val }) != false) {
        if (_matVal == '') { return true }
        switch (type) {
          case 'RePwd':
            if (_val == _matVal) { return true } else { args.sErr = '密码不匹配'; return false }
            break
          case 'EndDate':
            var _d1 = new Date().str2Date(_matVal)
            var _d2 = new Date().str2Date(_val), _dv = _d2 - _d1
            if (_dv > 1) { return true } else { args.sErr = '结束时间必须大于开始时间'; return false }
            break
        }
      }
    }
    if (!_sR) { if (_rTemp) { _sR = _rTemp } else { if (_val) { return true } else { return false } } }
    if (!_val || _val == args.defText) { return false }
    if ((new RegExp(_sR)).test(_val)) { return true } else { return false }
  }

  function setStyle () {
    var _body = eBody
    switch (type) {
      case 'IconSelector':
        _body.fc().evt('click', function () {
          popTips = new $.UI.Tips({ comMode: 'x-auto', width: 1024, height: 560, y: 100, head_h: 30, ifMask: true, ifClose: true, title: '图标选择器', icon: 'icon-glyph-picture' })
          new $.UI.View({ p: popTips.body, url: 'View/meeko/IconSelector.js', onItemClick: function (obj) { var _val = obj.Value; self.setData(_val, _val); popTips.remove(); popTips = null } })
        })
        break
      case 'FileUploader':
        args.Button = new $.UI.Button({ p: _body, text: '上传文件', css: 'margin-left: 0px;margin-top: 0px;', icon: 'icon-glyph-upload', onClick: onFileUploaderClick })
        args.eFiles = _body.adElm('', 'div').cn('file-list')
        break
      case 'TextArea':
        eInput.evt('focus', function (e) {
          var e = $.e.fix(e), _e = e.t
          _e.ns().css('height:24px;'); _e.removeAttribute('readonly')
        }).evt('blur', function (e) {
          var e = $.e.fix(e), _e = e.t
          _e.ns().css('height:0px;')
        }).evt('keyup', function (e) {
          var _e = $(e.target),
            _len = _e.value.length,
            _val = args.limit - _len
          if (_val < 0) {
            _e.attr('readonly', 'readonly');
            e.preventDefault();
            return false
          }
          _e.ns().fc().h(_val)
        }).evt('scroll', function (e) {
          var e = $.e.fix(e), _e = e.t
          _e.css('height:' + (+_e.csn('height') + 30) + 'px;')
        })
        break
      case 'Button':
        args.p = _body
        args.Button = new $.UI.Button(args)
        break
      case 'ButtonSet':
        args.ButtonSet = new $.UI.ButtonSet({ p: _body, items: args.items })
        break
      case 'ScanCode':
        args.ScanCode = new $.UI.BarCode({ p: owner })
        break
      case 'Json':
        args.Json = new $.UI.Json({ p: owner, title: args.title, ifEdit: args.ifEdit, onClick: function (obj) { obj.FormItem = self; args.onClick(obj) } })
        break
      case 'RichText':
        var defObj = {
          resizeType: 1,
          basePath: $.global.imgPath + 'script/kindEditor/',
          allowPreviewEmoticons: false,
          allowImageUpload: false,
          afterChange: function (obj) { if (!args.RichText) { return }; var _val = args.RichText.html(); self.set('isChange', true); args.onChange({ FormItem: self, Text: _val, Value: _val, Args: args, Name: args.name }) },
          items: [
				        'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
				        'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist', '|', 'emoticons', 'image', 'link'
				    ]
        }
        var keObj = args.keObj || {}
        for (var i in defObj) { if (keObj[i] == null) { keObj[i] = defObj[i] } }
        args.RichText = KindEditor.create(eInput, keObj)
        break
      case 'CheckBoxs':
        var _sons = args.sons, _len = _sons.length, _cbAry = [], _cb, _cbObj = {}
        for (var i = 0; i < _len; i++) {
          var _obj = _sons[i]
          if (args.itemCn) { _obj.cn = args.itemCn }
          if (args.itemCss) { _obj.css = args.itemCss }
          _obj.p = _body
          _obj.type = 'CheckBox'
          _obj.value = (_obj.value == null) ? i : _obj.value
          _obj.onClick = function (radio) { clickCheckBoxs(_cbAry) }
          _cb = new $.UI.Select(_obj)
          _cbObj[_obj.value] = _cb
          _cbAry.push(_cb)
        }
        args.CheckBoxAry = _cbAry; args.CheckBoxs = _cbObj
        if (args.value) { clickCheckBoxs(_cbAry) }
        break
      case 'Radios':
        var _sons = args.sons, _len = _sons.length, _radioAry = [], _radio, _cItem
        for (var i = 0; i < _len; i++) {
          var _obj = _sons[i], _ifc = _obj.checked
          if (args.itemCn) { _obj.cn = args.itemCn }
          if (args.itemCss) { _obj.css = args.itemCss }
          _obj.p = _body
          _obj.type = 'Radio'
          _obj.value = (_obj.value == null) ? i : _obj.value
          _obj.onClick = function (radio) { me.fireClickRadio(radio) }
          _radio = new $.UI.Select(_obj)
          if (_ifc) { _cItem = _radio }
          _radioAry.push(_radio)
        }
        args.RadioAry = _radioAry
        me.fireClickRadio(_cItem)
        break
      case 'SingleUserSelector':
        _body.evt('click', function (e) {
          var e = $.e.fix(e), _e = e.t
          if (_e.tagName != 'A') { return }
          if (args.onClickBefore({ Self: self }) == false) { return }
          popTips = new $.UI.Tips({ comMode: 'x-auto', width: 500, height: 400, y: 100, head_h: 30, ifMask: true, ifClose: true, title: '人员选择', icon: 'icon-glyph-user' })
          popTips.SingleUserSelector = new $.UI.SingleUserSelector({ p: popTips.body, id: self.getValue(), onSelect: function (obj) { self.setData(obj.Value, obj.Text) } })
          e.stop()
        })
        break
      case 'UserSelector':
      case 'MultiSelect':
        _body.evt('click', function (e) {
          var e = $.e.fix(e), _e = e.t
          if (_e.tagName != 'A') { return }
          if (args.onClickBefore({ Self: self }) == false) { return }
          switch (_e.className.trim()) {
            case 'MultiSelect-select':
              _e.cn('MultiSelect-loading')
              if (args.loadApi.indexOf('keyFields') == -1) { args.loadApi += '&keyFields=id,nodeName' }
              $.Util.ajax({
                args: args.loadApi + '&dataType=json',
                onSuccess: function (data) {
                  var _dAry = eval(data.get(0) || '[]'), _dLen = _dAry.length, _allAry = []
                  if (!_dLen) { _e.cn('MultiSelect-select'); MTips.show('数据为空', 'error'); return }
                  var _tips = getPopTips(), _son, _vAry = self.getValue().split(','), _vLen = _vAry.length, _count = 0
                  args.JIDS = {}; args.IDS = []; args.TXTS = []
                  args.SelAll = _tips.init({ type: 'Select', cn: 'ml3', text: '全选', value: 'selAll', onCheck: function (obj) { clickMulitSelectCheckBox(obj, _allAry, _dLen) } }, true)
                  for (var v = 0; v < _vLen; v++) { if (_vAry[v]) { args.JIDS[_vAry[v]] = true } }
                  for (var i = 0; i < _dLen; i++) {
                    var _dObj = _dAry[i], _id = _dObj.id, _txt = _dObj.nodeName || _dObj.uid, _checked = false
                    if (args.JIDS[_id]) { _checked = true; args.IDS.push(_id); args.TXTS.push(_txt); _count++ }
                    _allAry.push(_tips.init({ type: 'Select', cn: 'ml3', checked: _checked, text: _txt, value: _id, onCheck: function (obj) { clickMulitSelectCheckBox(obj, _allAry, _dLen) } }, true))
                  }
                  if (_count == _dLen) { args.SelAll.setChecked(true, false) }
                  _e.cn('MultiSelect-select')
                  _tips.show()
                }
              })
              break
            case 'MultiSelect-user':
              popTips = new $.UI.Tips({
                comMode: 'x-auto',
                width: 500,
                height: 400,
                y: 100,
                head_h: 30,
                ifMask: true,
                ifClose: true,
                title: '人员选择',
                icon: 'icon-glyph-user',
                onClose: function (obj) {
                  var users = popTips.UserSelector.getUsers(), _val = $.Util.uniqueArray(users[0]).join(','), _txt = $.Util.uniqueArray(users[1]).join(',')
                  if (_val.length) { _val = ',' + _val + ',' } else { _val = ',' }
                  if (_txt.length) { _txt = ',' + _txt + ',' } else { _txt = ',' }
                  self.setData(_val, _txt)
                }
              })
              popTips.UserSelector = new $.UI.UserSelector({ p: popTips.body, ids: self.getValue().split(',') })
              break
          }
        })
        break
      case 'Timer':
        _body.evt('click', function (e) {
          var e = $.e.fix(e), _e = e.t
          if (_e.className.indexOf('_select_s') != -1) { _e = _e.pn() }
          if (_e.tagName == 'DIV' && _e.className == 'mac_select') {
            var _iAry = [{ name: 'same', text: '同一天' }, { name: 'custom', text: '指定日期'}]
            popMYTips(_e, _iAry, _e.attr('cval'), function (obj) {
              if (obj.Name == 'custom') { _e.ns().dc('dn') } else { _e.ns().ac('dn') }
              _e.fc().h(obj.Text); _e.attr('cVal', obj.Name)
            }, 120)
          }
          if (!args.lockDate && _e.tagName == 'SPAN' && _e.attr('value')) {
            var _tips = getPopTips()
            _tips.set('ePop', _e).init({ type: 'Calendar', nowD: _e.attr('value') }).evt('onClick', function (obj) { var _val = obj.Value; _e.attr('value', _val); _e.h(_val); self.set('isChange', true); _tips.hide() }).show()
          }
          if (_e.tagName == 'INPUT') {
            switch (_e.attr('pk')) {
              case 'date':
                var _tips = getPopTips()
                _tips.set('ePop', _e).init({ type: 'Calendar', nowD: _e.value }).evt('onClick', function (obj) { var _val = obj.Value; _e.value = _val; self.set('isChange', true); _tips.hide() }).show()
                break
              case 'h':
                var _iAry = []
                for (var i = 0; i < 24; i++) { _iAry.push({ name: i, text: i }) }
                var _tips = getPopTips(40)
                _tips.set('ePop', _e).init({ type: 'Menu', items: _iAry, checkedValue: _e.value }).evt('onClick', function (obj) { var _val = +obj.Text; if (_val < 10) { _val = '0' + _val }; _e.value = _val; _e.pn().attr('hh', obj.Text); self.set('isChange', true); _tips.hide() }).show()
                break
                break
              case 'm':
                var _iAry = []
                for (var i = 0; i < 6; i++) { _iAry.push({ name: i + '0', text: i + '0' }) }
                var _tips = getPopTips(40)
                _tips.set('ePop', _e).init({ type: 'Menu', items: _iAry, checkedValue: _e.value }).evt('onClick', function (obj) { var _val = +obj.Text; if (_val < 10) { _val = '0' + _val }; _e.value = _val; _e.pn().attr('mm', obj.Text); self.set('isChange', true); _tips.hide() }).show()
                break
            }
          }
          e.stop()
        })
        break
    }
  }

  function clickMulitSelectCheckBox (obj, allAry, count) {
    var _value = obj.Value, _txt = obj.Text, _ifCheck = obj.IfChecked
    if (_value == 'selAll') {
      for (var i = 0; i < count; i++) { allAry[i].setChecked(_ifCheck) }
    } else {
      if (_ifCheck) {
        if (!args.JIDS[_value]) { args.IDS.push(_value); args.TXTS.push(_txt) }
        args.JIDS[_value] = true
      } else {
        if (args.JIDS[_value]) { args.IDS.re(_value); args.TXTS.re(_txt) }
        args.JIDS[_value] = false
      }
      var _val = args.IDS.join(','), _txt = args.TXTS.join(',')
      if (_val.length) { _val = ',' + _val + ',' } else { _val = ',' }
      if (_txt.length) { _txt = ',' + _txt + ',' } else { _txt = ',' }
      if (args.IDS.length == count) { args.SelAll.setChecked(true, false) } else { args.SelAll.setChecked(false, false) }
      self.setData(_val, _txt)
      args.JIDS[_value] = _ifCheck
    }
  }

  me.checkItem = function (ifExecSucc) {
    var _enabled = self.getEnabled(), _iec = ifExecSucc == null ? true : ifExecSucc
    if (!_enabled) { return true }
    var _val = check()
    if (_val) { if (_iec) { onCheckSucc(args.sOk) } } else { onCheckErr(args.sErr) }
    return _val
  }

  me.fireClickRadio = function (radio, ifExecChange) {
    if (!radio) { return }
    var _cItem = args.checkedItem
    if (_cItem) { if (_cItem == radio) { return } _cItem.setChecked(false) }
    args.checkedItem = radio
    radio.setChecked(true)
    if (ifExecChange != false) { self.setData(radio.getValue(), radio.getText()) }
    me.checkItem(true)
  }

  me.fireClick = function () {
    switch (type) {
      case 'EndDate':
      case 'Date':
        clickDate(eInput.value); break
      case 'KeyInput':
        clickKeyInput(); break
      case 'PopTips':
        clickPopTips(); break
      case 'Select':
        clickSelect(); break
      case 'TreeList':
        clickTreeList(); break
      case 'Tree':
        clickTree(); break
    }
  }
  me.init = function (owner, args) { setDefault(owner, args); doEvent() }
  if (arguments.length) { me.init(owner, args) }
  return me
}

$.UI.FormItem.onInputClick = function (eInput, args) {
  var _cType = eInput.attr('comType').toLow(), _onChange = args.onChange || function () { }
  switch (_cType) {
    case 'enddate':
    case 'date':
      clickDate(eInput.value); break
    case 'keyinput':
      clickKeyInput(); break
    case 'poptips':
      clickPopTips(); break
    case 'select':
      clickSelect(eInput); break
    case 'treelist':
      clickTreeList(); break
  }

  function getPopTips (width) {
    if ($.global.popTips) { $.global.popTips.remove() }
    $.global.popTips = new $.UI.PopDialog({ p: $DB })
    var _pTips = $.global.popTips, _whCss = 'height:200px;', _bW = width || args.popWidth || eInput.csn('width')
    if (_cType == 'select') { _whCss = 'max-height:180px;' }
    if (_cType == 'date') { _bW = 240 }
    _whCss += 'width:' + (_bW - 2) + 'px;'
    _pTips.set('ePop', eInput).hide().css(_whCss)
    return _pTips
  }

  function clickKeyInput () {
    var _tips = getPopTips()
    _tips.init({ type: 'KeyPanel', keys: args.keys })
      .evt('onKeyClick', function (obj) {
        var _e = obj._e, _key = _e.h(), _val = eInput.value, _newVal
        if (_e.tagName != 'A') { return }
        switch (_key) {
          case '-':
            if (_val.indexOf('-') != -1) { _newVal = _val.substring(1) } else { _newVal = '-' + _val }
            break
          case '←':
            _newVal = _val.substring(0, _val.length - 1); break
          case 'C':
            _newVal = ''; break
          case '.':
            if (_val.indexOf('.') != -1) { _key = '' }
            _newVal = _val + _key; break
          default:
            _newVal = _val + _key; break
        }
        setData(_newVal, _newVal)
      }).show()
  }
  function clickDate (value) {
    var _tips = getPopTips()
    _tips.init({ type: 'Calendar', nowD: value }).evt('onClick', function (obj) { var _val = obj.Value; setData(_val, _val); _tips.hide() }).show()
  }

  function clickPopTips () {

  }

  function clickSelect (eInput) {
    var _tips = getPopTips(), _items = args.items || {}
    if (args.gtID) { args.loadApi = 'm=SYS_TABLE_TREE&table=SYS_CM_GLOBAL_TABLE&action=getNodesByPid&pid=' + args.gtID; args.items = null }
    if (!args.loadApi && !_items.length) { MTips.show('数据为空', 'warn'); return }
    _tips.init({
      type: 'Menu',
      items: _items,
      loadApi: args.loadApi,
      textKey: args.textKey,
      valueKey: args.valueKey,
      hidden: args.hidden,
      checkedValue: eInput.attr('v'),
      onSuccess: function () { _tips.show() },
      onClick: function (obj) { setData(obj.Value, obj.Text); eInput.attr('v', obj.Value).css(obj.Style); _tips.hide() }
    })
  }

  function setData (value, text) { eInput.value = text; eInput.attr('v', value); _onChange({ Value: value, Text: text, eInput: eInput }) }
}

$.UI.FormItem.getHtml = function (m) {
  var _type = m.comType, _w = +m.width, _h = +m.height, _sBody = '', _sMark = '', _bcss = ''
  if (m.ifMark) { _sMark = '<div class="mark">{1}</div>'; _w -= 20 }
  var _sInput = '<input autocomplete="off" name="' + m.name + '" placeholder="' + m.placeholder + '" class="input-normal" type="{0}" style="width:' + _w + 'px;height:' + _h + 'px;" />' + _sMark
  var _markHtml = '<a title="' + _type + '" class="FI-' + _type + ' ' + m.icon + '" "></a>'
  switch (_type) {
    case 'NumUpDown':
      var _numH = _h / 2 + 4
      _sBody = _sInput.format('text', '<div class="FI-NumUpDown-Up"></div><div class="FI-NumUpDown-Down"></div>')
      break
    case 'RichText':
    case 'TextArea':
      _sBody = '<textarea limit="' + m.limit + '" style="width:' + _w + 'px;height:' + _h + 'px;" class="input-normal"></textarea><span class="textarea-info"><em class="c_6">0</em>/<em>' + m.limit + '</em></span>'
      break
    case 'Pwd':
    case 'RePwd':
      _sBody = _sInput.format('password', _markHtml)
      break
    case 'Label':
      if (m.type == 'image') {
        var _whCss = 'style="width:' + m.imgWidth + 'px;height:' + m.imgHeight + 'px;"', _mtips = ''
        if (m.size == 'auto') { _whCss = '' }
        if (m.ifEdit) { _mtips = '单击图片可以上传图片' }
        _sBody = '<img MTips="' + _mtips + '" class="r5" onerror="javascript:this.src=\'images/avatar/default.jpg\'" src="images/avatar/default.jpg" ' + _whCss + ' >'
      }
      break
    case 'IconSelector':
      _sBody = '<a class="icon-glyph-picture FI-IconSelector" title="单击可以重新选择图标"></a>'
      break
    case 'UserSelector':
      _sBody = '<div class="MultiSelect-body" MTips="1"></div><a class="MultiSelect-user"></a>'
      break
    case 'SingleUserSelector':
      _sBody = '<div class="MultiSelect-body" MTips="1"></div><a class="MultiSelect-user"></a>'
      break
    case 'MultiSelect':
      _sBody = '<div class="MultiSelect-body" MTips="1"></div><a class="MultiSelect-select"></a>'
      break
    case 'ScanCode':
    case 'Json':
      return ''
    case 'Timer':
      var _now = new Date(), _y = _now.getFullYear(), _m = _now.getMonth() + 1, _d = _now.getDate(), _hh = _now.getHours(), _mm = _now.getMinutes()
      if (_m < 10) { _m = '0' + _m }
      if (_d < 10) { _d = '0' + _d }
      var _currDate = m.lockDate || (_y + '-' + _m + '-' + _d)
      _sBody = '<span class="mutil_input set_time_hm input_l" value="' + _currDate + '">' + _currDate + '</span><span class="mutil_input set_time_hm" hh="' + _hh + '" mm="' + _mm + '"><input class="input_text set_time_h" pk="h" value="' + _hh + '" />：<input class="input_text set_time_m" pk="m" value="' + _mm + '"/></span>'
      break
    default:
      if (m.noInput) { _sBody = '' } else { _sBody = _sInput.format('input', _markHtml) }
      break
  }
  if (m.noInput && m.width) { _bcss = 'style="width:' + (m.width + 9) + 'px;"' }
  var _html = '<div class="body" ' + _bcss + '>' + _sBody + '</div>'
  if (m.ifHead) { _html = '<div class="head"></div>' + _html }
  if (m.ifFoot) { _html += '<div class="foot"><a></a><span></span></div>' }
  return _html
}

$.UI.FormItem.initArgs = function (args) {
  if (!arguments.length) { return }
  var _args = arguments, _t = _args[0] || 'Input', _defArgs = _args[1], _selfObj
  var _aHeader = [{ text: 'id', name: 'id', type: 'attr' }, { text: 'nodeNode', name: 'nodeName', type: 'none'}]
  var _imgPath = $.global.imgPath + 'images/', _f = function () { }
  var attrObj = {
    AutoComplete: { ifAutoPopHeight: true, table: null, key: null, readonly: false, ifSpecial: true, onSelect: _f },
    Date: { popHeight: 200, popWidth: 220, titleSkin: 'arrow', ifLockDay: 0, ifHMS: 1, ifMark: true, readonly: true },
    EndDate: { popHeight: 200, popWidth: 220, titleSkin: 'arrow', ifLockDay: 0, ifHMS: 0, ifMark: true, matchItem: '', readonly: true, onMatchVal: _f, onKeyUp: _f },
    Timer: { noInput: true, popWidth: 250, popHeight: 165, ifAutoPopHeight: false },
    Label: { path: _imgPath, ifEdit: false, ifShowAll: false, size: 'fixed', type: 'text', value: '', suffix: 'png', title: null, splitChar: '/', imgWidth: 96, imgHeight: 96, readonly: true, noInput: true },
    NumUpDown: { ifFillZero: 0, step: 1, max: 100, min: 0, ifMark: true, ifLoop: false, readonly: true, onUpDown: _f },
    KeyInput: { popHeight: 150, keys: '-,←,C,.,0,1,2,3,4,5,6,7,8,9', ifMark: true, disabledKeys: '', readonly: true, onKeyClick: _f },
    PopTips: { src: '', popWidth: 320, popHeight: 240, ifMark: true, readonly: true, onClose: _f },
    FileUploader: { noInput: true, readonly: true, mId: 4, catelogId: 0, catelog: '', uploadApi: null, specialFiles: [], onClose: _f, onComplete: _f, onError: _f, onSuccess: _f },
    Input: { readonly: false },
    ScanCode: { readonly: true, type: 'BarCode', noInput: true },
    CheckBoxs: { sons: [], defValue: 0, itemCn: 'mt3', itemCss: '', readonly: false, noInput: true },
    Radios: { sons: [], defValue: 0, itemCn: 'mt3', itemCss: '', readonly: false, noInput: true },
    RichText: { keObj: {}, height: 250, width: 300, readonly: false},
    TextArea: { height: 60, width: 160, limit: 500, readonly: false },
    Search: { key: '', ifMark: true, readonly: false, onSearch: _f },
    Button: { text: 'Btn', icon: '', type: 'normal', name: 'Btn', readonly: true, noInput: true, onClick: _f },
    ButtonSet: { items: [{ text: '提交', type: 'normal', name: 'button', icon: ''}], readonly: true, noInput: true, onClick: _f },
    RePwd: { readonly: false, sTips: '', ifMark: true, matchItem: '', onMatchVal: _f },
    Pwd: { readonly: false, ifMark: true, sTips: '' },
    Json: { readonly: false, noInput: true, ifEdit: false },
    IconSelector: { value: '', readonly: true, noInput: true },
    UserSelector: { value: '', readonly: true, noInput: true },
    SingleUserSelector: { value: '', readonly: true, noInput: true },
    Select: { ifAutoPopHeight: true, ifShowIcon: false, items: [], loadApi: '', textKey: 'nodeName', ifMark: true, valueKey: 'id', extFields: [], hidden: {}, ifSpecial: true, readonly: true, onSelect: _f },
    MultiSelect: { ifAutoPopHeight: true, items: [], loadApi: '', ifSpecial: true, readonly: true, noInput: true, onSelect: _f },
    Tree: {
      table: null,
      rootID: 0,
      ifSpecial: true,
      ifMark: true,
      readonly: true,
      style: 'tree:nodeName',
      onListTDClickBefore: _f,
      onListCheckBoxClick: _f,
      onListTDClick: _f
    },
    TreeList: {
      dataSource: null,
      aHeader: _aHeader,
      hasHead: 0,
      hasCB: _hasCB,
      style: 'abreast',
      ifSpecial: true,
      ifMark: true,
      lockLevel: null,
      searchKey: null,
      key: '',
      ifCache: 1,
      readonly: true,
      onSelect: _f,
      onListTDClickBefore: _f,
      onListCheckBoxClick: _f,
      onListTDClick: _f
    },
    common: {
      p: $DB,
      popOwner: $DB,
      comType: 'Input',
      skin: '',
      isChange: false,
      alias: '',
      name: 'FormItem',
      title: '',
      defText: '',
      value: null,
      text: null,
      icon: '',
      width: 160,
      height: 16,
      css: '',
      cn: '',
      dyAttr: [],
      popWidth: null,
      popHeight: 200,
      dataType: 'string',
      labelAlign: 'right', // Auto, left, center, right, top
      req: false,
      sReg: '',
      sOk: '',
      sErr: '',
      regTemplate: '',
      placeholder: '',
      ifEnterSubmit: false,
      ifSubmit: true,
      ifHead: true,
      ifFoot: false,
      group: null,
      enabled: true,
      visibled: true,
      onEnterSubmit: _f,
      onChange: _f,
      onCheck: _f,
      onClickBefore: _f,
      onClick: _f,
      onClickBefore: _f
    },
    event: { onKeyUp: _f, onKeyDown: _f, onFocus: _f, onBlur: _f, onEnterPress: _f }
  }
  var _comObj = attrObj.common, _evtObj = attrObj.event, _selfObj = attrObj[_t]
  if (!_selfObj) { /* console.log('comType类型是' + _t + '的组件不存在!'); */ return }
  if (_defArgs) {
    var _hasCB = 0, _AH = _defArgs.aHeader || _aHeader, _len = _AH.lenght
    for (var i = 0; i < _len; i++) { if (!_AH[i]) { continue }; if (_AH[i].type.toLow() == 'checkbox') { _hasCB = 1; break }; }
    for (var _s in _selfObj) { if (_defArgs[_s] == null) { _defArgs[_s] = _selfObj[_s] }; }
    for (var _c in _comObj) { if (_defArgs[_c] == null) { _defArgs[_c] = _comObj[_c] }; }
    if (!_selfObj.noInput) { for (var _e in _evtObj) { if (_defArgs[_e] == null) { _defArgs[_e] = _evtObj[_e] }; } }
    return _defArgs
  } else {
    for (var _c in _comObj) { _selfObj[_c] = _comObj[_c] }
    if (!_selfObj.noInput) { for (var _e in _evtObj) { _selfObj[_e] = _evtObj[_e] } }
    return _selfObj
  }
}

export default $
