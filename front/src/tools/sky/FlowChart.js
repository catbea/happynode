/* eslint-disable */

// import './icon.css'
import './normal.css'
import './meeko.css'
import $ from './meeko_event_handler'
import './meeko_util'

$.NameSpace('$View.workflow');
$View.workflow.FlowChart = function (j) {
    var me = this, _fn = function () { };
    var owner;
    var args = { p: $DB, id: 0 };
    var coms = {};
    var attrs = {}, flowChart, infoF, extF, currNode, popTips, idObj = {}, currID, startFI, newBtn, rolesFI;
    var id_nodeType = { 10: '开始(Start)', 11: '结束(End)', 12: '普通节点(Normal)', 13: '并行(Parallel)', 20: '子流程(Sub-Process)' };

    // 创建新节点时弹出的菜单 onFCLinkEnd 负责把此菜单显示出来
    var actionForDBAry = [
        { name: 'normal_node', text: '普通节点' },
        { name: 'parallel_node', text: '并行节点' },
        { name: 'sub_process_node', text: '子流程节点' }
    ];

    // 操作按钮，各个按钮的作用在 onToolBarClick 可以看到
    var toolAry = [
        { name: 'newChart', text: '创建', icon: 'icon-glyph-plus-sign' },
        // { name: 'newChartTest', text: '创建test', icon: 'icon-glyph-plus-sign' },
        { name: 'rePaint', text: '重画', icon: 'icon-glyph-repeat' },
        { name: 'toJSON', text: '输出成JSON', icon: 'icon-compact-tree-list' },
        { name: 'save', text: '保存', icon: 'icon-compact-save' },
        // { name: 'toDefinition', text: '生成定义', icon: 'icon-glyph-random' },
        // { name: 'reToDefinition', text: '重新生成定义', icon: 'icon-glyph-repeat' },
        // { name: 'refresh', text: '刷新结构', icon: 'icon-glyph-refresh' }
    ];
    var loginT = { 0: '不显示, 只走选择用户与角色', 1: '显示选择用户与角色', 2: '显示所有用户与角色', 3: '不显示, 只转给发起人', 4: '走前一步所有Owner' };
    var logicItems = [
        { text: '不显示选择用户与角色', value: 0 },
        { text: '显示选择用户与角色', value: 1 },
        { text: '显示所有用户与角色', value: 2 },
        { text: '不显示, 只转给发起人', value: 3 },
        { text: '上一步参与人', value: 4 },
        { text: '前面所有参与人', value: 5 },
        { text: '只包含创建人', value: 6 },
        { text: '只包含所在部门负责人', value: 7 },
        { text: '包含部门负责人', value: 8},
        { text: '自动节点(AutoNode)', value: 10 }
    ];
    var fcAry = [
        { name: 'nodeType', comType: 'Label', title: '节点类型' },
        { name: 'txt', comType: 'Input', title: '名称' },
        { name: 'color', comType: 'Input', title: '颜色' },
        { name: 'subProcessIdxID', title: '子流程', visibled: false, comType: 'Select', items: logicItems },
        { name: 'ruleType', title: '规则模版', visibled: false, comType: 'Select', loadApi: 'm=SYS_CM_WF&action=getWFRuleTemplate' },
        { name: 'logicState', title: '逻辑状态', visibled: false, comType: 'Select', items: logicItems },
        { name: 'users', title: '权限用户', visibled: false, comType: 'UserSelector' },
        { name: 'roles', title: '权限角色', visibled: false, comType: 'MultiSelect', loadApi: 'm=SYS_CM_USERS&action=getAllDepts' }
    ];
    function setDefault(j) { args = $.Util.initArgs(j, args); }
    function layout() {
        owner = args.p.adElm('', 'div').cn('wp hp');
        var comArgs = {
            'root': { head_h: 30, foot_h: 0 },
            'toolBar': { items: toolAry, itemSkin: 'Button-toolbar', onClick: onToolBarClick },
            'rootLayout': { min: 200, max: 500, isRoot: 1, start: 320, dir: 'we', dirLock: 2 },
            'flowChart': { onPointClick: onFCPointClick, onOwnerClick: function () { }, onLinkEnd: onFCLinkEnd, onLineClick: onFCLineClick },
            'infoForm': { head_h: 22, foot_h: 0, ifFixedHeight: false, title: '基本属性', icon: 'icon-glyph-list', items: fcAry, onChange: onInfoChange },
            'extForm': { head_h: 22, foot_h: 0, ifFixedHeight: false, title: '规则属性', icon: 'icon-glyph-align-justify', css: 'border-top:1px solid #EEEEEE;', onChange: onExtChange },
            'tableMenu': { loadApi: 'm=SYS_DBHELPER&action=getAllTables', textKey: 'Name', valueKey: 'Name', onClick: onTableClick }
        }
        var struct = {
            p: owner,
            skin: 'FlowChart-default disabledEditLineName',
            type: 'BaseDiv',
            name: 'root',
            head: { type: 'ButtonSet', name: 'toolBar' },
            body: {
                type: 'Layout',
                name: 'rootLayout',
                eHead: { type: 'FlowChart', name: 'flowChart' },
                eFoot: [
                    { type: 'Form', name: 'infoForm' },
                    { type: 'Form', name: 'extForm' }
                ]
            }
        }
        coms = $.Util.initUI({ args: comArgs, struct: struct });
        flowChart = coms.flowChart; infoF = coms.infoForm; extF = coms.extForm;
        startFI = infoF.items['ruleType']; rolesFI = infoF.items['roles'];
        newBtn = coms.toolBar.items['newChart'];
    }
    function onInfoChange(obj) {
        var _fiName = obj.Name;
        switch (_fiName) {
            case 'ruleType':
                if (currID) {
                    $.Util.ajax({
                        args: { m: 'SYS_CM_WF', action: 'bindRuleForNode', tempID: obj.Value, nodeID: currID, keyFields: 'id, nodeName, itemKey, itemValue, ext', dataType: 'json' },
                        onSuccess: function (obj) {
                            var _sData = obj.get(0), _fiAry = [];
                            if (_sData) {
                                var _dAry = eval(_sData), _dLen = _dAry.length;
                                for (var i = 0; i < _dLen; i++) {
                                    var _rObj = _dAry[i], _ext = $(_rObj.ext.replaceAll('\\', ''));
                                    _ext.name = _rObj.id;
                                    _ext.itemKey = _rObj.itemKey;
                                    _ext.title = _rObj.nodeName;
                                    _ext.value = _rObj.itemValue || _ext.value;
                                    _fiAry.push(_ext);
                                }
                            }
                            extF.reLoadItems(_fiAry);
                        },
                        onError: function () { MTips.show('加载失败', 'error'); }
                    });
                    return;
                }
                break;
            case 'users':
            case 'roles':
            case 'link':
            case 'logicState':
                var _val = '"' + obj.Value + '"';
                if (_fiName == 'logicState') { _val = obj.Value; }
                $.Util.ajax({
                    args: 'm=SYS_CM_WF&action=updateDefinitedNodeById&json={"' + _fiName + '":' + _val + '}&id=' + currID,
                    onSuccess: function () { MTips.show('提交成功', 'ok'); },
                    onError: function () { MTips.show('提交失败', 'error'); }
                });
                return;
            default:
                if (currNode) { currNode.set(obj.Name, obj.Text); }
                break;
        }
    }

    function onExtChange(obj) {
        $.Util.ajax({
            args: { m: 'SYS_CM_WF', action: 'updateRuleItemValue', id: obj.Name, itemValue: obj.Value },
            onSuccess: function () { MTips.show('修改成功', 'ok'); },
            onError: function () { MTips.show('修改失败', 'error'); }
        });
    }

    function onToolBarClick(obj) {
        switch (obj.Name) {
            case 'newChart':
                flowChart.addNode({ id: 'Node_start', type: 'point', x: 50, y: 50, pre: '', next: '', txt: '开始', color: '#0f0', ext: { nodeType: 10} });
                flowChart.addNode({ id: 'Node_end', type: 'point', x: 500, y: 50, pre: '', next: '', txt: '结束', color: '#f00', ext: { nodeType: 11} });
                newBtn.setEnabled(false);
                break;
            case 'toJSON':
                console.log(toUIJSON());
                break;
            case 'rePaint':
                flowChart.reLoad([]);
                attrs = {};
                idObj = {};
                resetForm();
                newBtn.setEnabled(true);
                break;
            case 'save':
                args.onSave && args.onSave()
                // saveJSON();
                break;
            case 'toDefinition':
                $.Util.ajax({
                    args: { m: 'SYS_CM_WF', action: 'toWFDefinition', idxId: args.id, definitionJson: toWFString() },
                    onSuccess: function () { MTips.show('生成定义成功', 'ok'); }
                });
                break;
            case 'reToDefinition':
                $.Util.ajax({
                    args: { m: 'SYS_CM_WF', action: 'reToWFDefinition', idxId: args.id, definitionJson: toWFString() },
                    onSuccess: function () { me.refresh(); MTips.show('提交成功', 'ok'); }
                });
                break;
            case 'refresh':
                me.refresh();
                break;
          default :
            console.log('此按钮未定义事件：' + obj.Name)
        }
    }

    function toWFString() {
        var _ary = [], _hash = flowChart.hashPoint;
        for (var i in _hash) {
            if ($.getType(_hash[i]) == "object" && $.m.p(i) + '' == 'NaN') {
                var o = _hash[i], _t = {};
                if (o.type == "point") {
                    _t.idx = o.id;
                    _t.next = formatStr(o.next);
                    _t.pre = formatStr(o.pre);
                    _t.nodeName = o.txt || '';
                    _t.type = o.getExt('nodeType') || '12';
                    _ary.push($.JSON.encode(_t));
                }
            }
        }
        return _ary.join("※");
    }

    function toUIJSON() {
        var _ary = [], _hash = flowChart.hashPoint;
        for (var i in _hash) {
            var _hObj = _hash[i];
            if ($.getType(_hObj) == "object" && $.m.p(i) + '' == 'NaN') {
                _ary.push($.JSON.encode(_hObj.getJson()));
            }
        }
        return "[" + _ary.join(",") + "]";
    }

    function formatStr(str) {
        str = str.trim().split(' ').join(',');
        if (!str) { str = '0'; }
        return ',' + str + ',';
    }

    // 按住 ctrl 鼠标拖拽一个节点，然后松开后执行此方法，但在执行这方法之前，会先判断是在一个空白处还是节点上松开
    // 如果是在一个节点上松开，就不会显示菜单了
    function onFCLinkEnd(obj) {
      var _sPoint = obj.Start, _ePoint = obj.End;

      // 有结束节点的话就算了，不用显示菜单
      if (_ePoint) { return true; }
      switch (+_sPoint.getExt('nodeType')) {
        case 11:
            break;
        case 10:
        default:
          if ($.global.popTips) { $.global.popTips.remove(); }
          $.global.popTips = new $.UI.PopDialog({ p: $DB });
          var _mArgs = {
              type: 'Menu',
              items: actionForDBAry
            },
            _pTips = $.global.popTips;
          _pTips.set('ePop', _sPoint.elm).hide().init(_mArgs).show()
          .evt('onClick', function (tObj) {
              var _color = '#18f', _nType = 12;
              switch (tObj.Name) {
                  case 'parallel_node':
                      _color = '#180'; _nType = 13;
                      break;
                  case 'sub_process_node':
                      _color = '#189'; _nType = 20;
                      break;
              }
              var _cId = _sPoint.id, _nID = 'Node_' + flowChart.getCurrIdx();
              flowChart.addNode({ id: _nID, type: 'point', color: _color, txt: _nID, x: obj.EX, y: obj.EY, ext: { nodeType: _nType} });
              flowChart.addNode({ id: _cId + '#' + _nID, x: obj.SX, y: obj.SY, x1: obj.EX, y1: obj.EY, type: 'line', pre: _cId, next: _nID });
              _pTips.hide();
          });
          break;
      }
      return false;
    }

    function onFCLineClick(obj) {
      if(args.disabledEditLineName){
        return
      }
        var _line = obj.Line;
        if (popTips) { popTips.remove(); }
        popTips = new $.UI.PopDialog({ p: $DB, ifClose: true, css: 'max-width:165px;padding:10px;' });
        popTips.clearHTML(false).set('ePop', obj.eTxt).init({
            type: 'Form', ifFixedHeight: false, state: 'Insert',
            btnItems: [{ name: 'FORM-SYS-SUBMIT', text: '编辑(Edit)', icon: 'icon-glyph-edit', align: 'right'}],
            items: [{ name: 'txt', comType: 'TextArea', ifHead: false, req: true}]
        }).evt('onSubmit', function (j) { var _dObj = j.Data.IText; _line.set('txt', _dObj['txt']); popTips.hide(); return false; }).show();
    }

    function onFCPointClick(obj) {
        var _point = obj.Point;
        currNode = _point;
        currID = idObj[_point.id];
        if (currID) {
            setItemsVisibled(startFI, true);
            var _nType = +_point.getExt('nodeType');
            //if (_nType == 13) { rolesFI.hide(); } else { rolesFI.show(); }
            if (_nType == 20) { infoF.items['subProcessIdxID'].show(); } else { infoF.items['subProcessIdxID'].hide(); }
        } else {
            setItemsVisibled(startFI, false);
            extF.reLoadItems([]);
        }
        for (var i = 0, _iLen = infoF.aItem.length; i < _iLen; i++) {
            var _item = infoF.aItem[i], _iName = _item.get('name'), _val = _point[_iName];
            if (_iName == 'ruleType' && currID) {
                $.Util.ajax({
                    args: { m: 'SYS_CM_WF', action: 'getDefinitionNodeRuleById', id: currID, dataType: 'json' },
                    onSuccess: function (d) {
                        var _dStr = d.get(0), _urStr = d.get(1), _fiAry = [], _text;
                        if (_dStr) {
                            var _dAry = eval(_dStr), _dLen = _dAry.length;
                            for (var i = 0; i < _dLen; i++) {
                                var _rObj = _dAry[i], _ext = $(_rObj.ext.replaceAll('\\', ''));
                                _ext.name = _rObj.id;
                                _ext.itemKey = _rObj.itemKey;
                                _ext.title = _rObj.nodeName;
                                if (_rObj.itemValue) { _ext.value = _rObj.itemValue; }
                                if (!_text) { _text = _rObj.pid; _val = _rObj.pid; }
                                _fiAry.push(_ext);
                            }
                            if (d.get(2)) { _text = eval(d.get(2))[0].nodeName; }
                        } else {
                            _val = 0;
                            _text = '请选择规则';
                        }
                        if (_urStr) {
                            var _urObj = eval(_urStr)[0], _ls = _urObj.logicState, _lsTxt = loginT[_urObj.logicState] || '';
                            infoF.items['users'].setData(_urObj.uValue, _urObj.uText, false);
                            infoF.items['roles'].setData(_urObj.rValue, _urObj.rText, false);
                            infoF.items['logicState'].setData(_ls, _lsTxt, false);
                        }
                        _item.setData(_val, _text, false);
                        extF.reLoadItems(_fiAry);
                    }
                });
                return;
            }
            if (_iName == 'nodeType' && _val == null) { _val = id_nodeType[+_point.getExt(_iName)] || '普通节点'; }
            _item.setData(_val, _val, false);
        }
    }

    function setItemsVisibled(start, ifVisibled) {
        if (start) { start.setVisibled(ifVisibled); setItemsVisibled(start.next, ifVisibled); }
    }

    function onTableClick(obj) {

    }

    function resetForm() { setItemsVisibled(startFI, false); infoF.reset(); extF.reLoadItems([]); }

    function bindEvent() {
        //--**--Codeing here--**--//
    }

    function saveJSON() {
        if (args.id == null) { return; }
        $.Util.ajax({
            args: { m: 'SYS_CM_WF', action: 'updateIndexJsonById', id: args.id, json: toUIJSON() },
            onSuccess: function (d) { MTips.show('保存成功', 'ok'); }
        });
    }

    function keyFiledsToJSON(ary) {
        var _json = {}, _len = ary.length, _tObj;
        for (var i = 0; i < _len; i++) { _tObj = ary[i]; _json[_tObj.idx] = _tObj.id; }
        return _json;
    }

    // 用 me.getJson() 的数据重置当前的画板，
    // 以下是一个原服务端来的数据，带了第二条数据，暂不知道有什么用，目前认为有第一条数据就够了。
    // [{"id":"Node_start","type":"point","next":" Node_3","pre":"","txt":"发起会议","x":78,"y":53,"color":"#0f0","ext":{"nodeType":10}},{"id":"Node_end","type":"point","next":"","pre":" Node_5","txt":"会议结束","x":519,"y":55,"color":"#f00","ext":{"nodeType":11}},{"id":"Node_3","type":"point","next":" Node_5","pre":" Node_start","txt":"选择会议参与人","x":175,"y":258,"color":"#180","ext":{"nodeType":13}},{"id":"Node_start#Node_3","type":"line","next":"Node_3","pre":"Node_start","txt":""},{"id":"Node_5","type":"point","next":" Node_end","pre":" Node_3","txt":"参与人会签","x":448,"y":258,"color":"#18f","ext":{"nodeType":12}},{"id":"Node_3#Node_5","type":"line","next":"Node_5","pre":"Node_3","txt":""},{"id":"Node_5#Node_end","type":"line","next":"Node_end","pre":"Node_5","txt":""}]
    // [{"id":"1","idx":"Node_start"},{"id":"2","idx":"Node_end"},{"id":"3","idx":"Node_3"},{"id":"4","idx":"Node_5"}]
    me.reloadJson = function (data,idObject){
      attrs = {}

      const newBtnEnabled = !(data && data.length)

      data = newBtnEnabled ? [] : data

      idObj = idObject&&idObject.length ? keyFiledsToJSON(idObject) : {}

      newBtn.setEnabled(newBtnEnabled);
      flowChart.reLoad(data)

      resetForm();
    }

    me.getJson = function(){
      return toUIJSON()
    }

    me.refresh = function () { me.loadById(args.id); }

    // 根据id获取一个模板
    me.loadById = function (id) {
        if (id == null) { return; }
        $.Util.ajax({
            args: { m: 'SYS_CM_WF', action: 'getDefinitionById', dataType: 'json', keyFields: 'id,idx', id: id },
            onSuccess: function (d) {
                var _str = d.get(0),
                  _dAry = [];
                attrs = {};
                idObj = {};
                args.id = id;
                if (d.get(1)) {
                  idObj = keyFiledsToJSON(eval(d.get(1)));
                }
                if (_str) {
                  _dAry = eval(_str);
                  newBtn.setEnabled(false);
                } else {
                  newBtn.setEnabled(true);
                }
                flowChart.reLoad(_dAry);
                resetForm();
            }
        });
    }

    me.getArgs = function () { return args; }
    me.evt = function (key, fn) { me.set(key, fn); return me; }
    me.set = function (key, value) { args[key] = value; return me; }
    me.get = function (key) { return args[key]; }
    me.show = function () { owner.show(); return me; }
    me.hide = function () { owner.hide(); return me; }
    me.remove = function () { owner.r(); me = null;}
    me.init = function (j) {
      setDefault(j);

      $.disabledKeyBoard = !!args.disabledKeyBoard

      layout();
      return me;
    }
    if (arguments.length) { me.init(j); }
    return me;
}

export default $View.workflow.FlowChart
