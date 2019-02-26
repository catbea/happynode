/*"use strict";*/
$.UI.List = function (j) {
    /* 
    { 
    type: "List", 
    desc: "数据列表承载组件", 
    args: { 
    p: { desc: '父容器', defVal: $DB, dataType: 'DOM' },
    dataSource: { desc: '数据源', defVal: null, dataType: 'array' },
    aHeader: { desc: '表头定义的json数组', defVal: [{ title: 'id', name: 'id', type: 'attr' }, { title: 'nodeName', name: 'nodeName', type: 'none'}], dataType: 'array' },
    loadApi: { desc: '加载数据API', defVal: '', dataType: 'string' },
    insertApi: { desc: '添加数据API', defVal: '', dataType: 'string' },
    updateApi: { desc: '更新数据API', defVal: '', dataType: 'string' },
    deleteApi: { desc: '删除数据API', defVal: '', dataType: 'string' },
    orderApi: { desc: '数据排序API', defVal: '', dataType: 'string' },
    ifProc: { desc: '是否是使用存储过程来加载数据', defVal: false, dataType: 'bool' },
    ifRowDargabled: { desc: 'List中的行是否可拖动', defVal: false, dataType: 'bool' },
    ifShowIcon: { desc: '是否显示当前记录的图标', defVal: false, dataType: 'bool' },
    varName: { desc: '声明的List变量', defVal: 'list', dataType: 'string' },
    style: { desc: 'List的结构样式', defVal: 'normal', dataType: 'string', comType: 'Radios', sons: [{value:'normal',text:'NormalList'},{value:'tree:nodeName',text:'TreeList'}] },
    css: { desc: 'css样式', defVal: '', dataType: 'string' },
    cn: { desc: 'cn样式', defVal: 'gridV2Table c_11 fs12', dataType: 'string' },
    skin: { desc: '皮肤样式', defVal: 'List-default', dataType: 'string' },
    initText: { desc: '初始化文本', defVal: '', dataType: 'string' },
    expandMode: { desc: 'TreeList展开模式', defVal: 'delete', dataType: 'string', comType: 'Radios', sons: [{value:'delete',text:'删除模式'},{value:'hidden',text:'隐藏模式'}] },
    selCn: { desc: '行选中样式', defVal: 'gridV2Table_selected', dataType: 'string' },
    onLoadFinish: { desc: '加载数据完成的事件', defVal: function (){}, dataType: 'function' },
    onLoadAjax: { desc: '请求ajax事件', defVal: function (){}, dataType: 'function' },
    onCheckBoxClick: { desc: 'CheckBox选中事件', defVal: function (){}, dataType: 'function' },
    onTableScoll: { desc: 'List鼠标轮滚动事件', defVal: function (){}, dataType: 'function' },
    onTRDrag: { desc: 'TR拖动事件', defVal: function (){}, dataType: 'function' },
    onOperateClick: { desc: '操作列的Click回调', defVal: function (){}, dataType: 'function' },
    onTDClick: { desc: '单机TD的回调', defVal: function (){}, dataType: 'function' },
    onTDClickBefore: { desc: '单机TD之前的回调', defVal: function (){}, dataType: 'function' },
    onTDDoubleClickBefore: { desc: '双击TD之前的回调', defVal: function (){}, dataType: 'function' },
    onTDDoubleClick: { desc: '双击TD的回调', defVal: function (){}, dataType: 'function' },
    onTDMouseDown: { desc: '在TD上鼠标按下的回调', defVal: function (){}, dataType: 'function' },
    onTDUpdate: { desc: '修改节点的回调', defVal: function (){}, dataType: 'function' },
    onTDUpdateSuccess: { desc: '修改节点成功的回调', defVal: function (){}, dataType: 'function' },
    onTDUpdateError: { desc: '修改节点失败的回调', defVal: function (){}, dataType: 'function' },
    onContextMenu: { desc: '节点邮件的回调', defVal: function (){}, dataType: 'function' },
    onExpandNodeSuccess: { desc: '展开节点成功的回调', defVal: function (){}, dataType: 'function' },
    onExpandNodeError: { desc: '展开节点失败的回调', defVal: function (){}, dataType: 'function' },
    onSuccess: { desc: '请求成功的回调', defVal: function (){}, dataType: 'function' },
    onError: { desc: '请求失败的回调', defVal: function (){}, dataType: 'function' }
    },
    headerArgs: {
    name: { desc: '对应数据库表字段的字段名', defVal: 'id', dataType: 'string' },
    type: { desc: '列的类型', defVal: 'none', dataType: 'string' },
    title: { desc: '显示当前列的标题文字', defVal: 'ID', dataType: 'string' },
    width: { desc: '列的宽度, 默认值是null, 表示该列100%填充容器', defVal: null, dataType: 'int' },
    ifEdit: { desc: '当前列是否可编辑', defVal: true, dataType: 'bool' },
    ifDrag: { desc: '当前列是否可拖动表头', defVal: false, dataType: 'bool' },
    ifSort: { desc: '当前列是否可排序', defVal: true, dataType: 'bool' },
    ifFilter: { desc: '当前列是否可过滤', defVal: true, dataType: 'bool' },
    ifTrans: { desc: '当前列是否可进行trans函数', defVal: false, dataType: 'bool' },
    isLocalAttr: { desc: '当前列是否是本地属性列', defVal: false, dataType: 'bool' },
    isLinkAttr: { desc: '当前列是否是链接属性列', defVal: false, dataType: 'bool' }
    }
    } 
    */
    var me = this, _fn = function () { };
    var args = {
        pBody: $DB, p: $DB, dataSource: null, aHeader: [{ title: 'id', name: 'id', type: 'attr' }, { title: 'nodeName', name: 'nodeName', type: 'none'}], table: null, rootID: null,
        loadApi: '', insertApi: '', updateApi: '', deleteApi: '', orderApi: '', ifProc: false, ifRowDargabled: false, ifShowIcon: false, ifFixedHeight: true, ifEnabledTips: false, ifBindID: true, ifEnabledFilter: false,
        varName: 'list', colControls: {}, style: 'normal', css: '', cn: 'gridV2Table c_11 fs12', skin: 'List-default', initText: '', expandMode: 'delete', selCn: 'gridV2Table_selected', filter: [],
        sonsKey: 'sons', pidKey: 'pid',
        onLoadFinish: _fn, onLoadAjax: _fn, onCheckBoxClick: _fn, onTableScoll: _fn, onTRDrag: _fn, onOperateClick: _fn,
        onTDClick: _fn, onTDClickBefore: _fn, onTDDoubleClickBefore: _fn, onTDDoubleClick: _fn, onTDMouseDown: _fn, onTDUpdate: _fn, onTDUpdateSuccess: _fn, onTDUpdateError: _fn,
        onContextMenu: _fn, onExpandNodeSuccess: _fn, onExpandNodeError: _fn, onSuccess: _fn, onError: _fn
    }
    var iArgs = { name: 'id', type: 'none', title: 'id', width: null, ifEdit: false, ifDrag: false, ifSort: false, ifFilter: false, ifTrans: false, isLocalAttr: false, isLinkAttr: false };
    var attr = {};
    var eBody, scrollBar, editTips;
    var filter_table = {
        'clear-filter': { name: 'clear', value: 'clear', text: '清除过滤条件', icon: 'icon-filter-clear' },
        'equal': { name: 'equal', value: 'equal', text: '等于', icon: 'icon-filter-equal' },
        'not-equal': { name: 'not-equal', value: 'not-equal', text: '不等于', icon: 'icon-filter-not-equal' },
        'greater': { name: 'gt', value: 'gt', text: '大于', icon: 'icon-filter-greater' },
        'less': { name: 'less', value: 'less', text: '小于', icon: 'icon-filter-less' },
        'greater-equal': { name: 'gt-equal', value: 'gt-equal', text: '大于等于', icon: 'icon-filter-greater-equal' },
        'less-equal': { name: 'less-equal', value: 'less-equal', text: '小于等于', icon: 'icon-filter-less-equal' },
        'like': { name: 'like', text: '模糊匹配', value: 'like', icon: 'icon-filter-like' },
        'not-like': { name: 'not-like', value: 'not-like', text: 'Not Like', icon: 'icon-filter-not-like' },
        'contain': { name: 'contain', value: 'contain', text: '包含于', icon: 'icon-filter-contain' },
        'not-contain': { name: 'not-contain', value: 'not-contain', text: '不包含于', icon: 'icon-filter-not-contain' }
    };
    function setDefault(j) {
        args = $.Util.initArgs(j, args); args.p = (args.p || args.pBody);
        attr.ver = $('').split(',')[0];
        if (!attr.childs) { attr.childs = {}; }
        if (args.table) {
            args.updateApi = 'm=SYS_TABLE_BASE&action=updateByID&table=' + args.table;
            if (args.rootID != null) { args.loadApi = 'm=SYS_TABLE_TREE&action=getNodesByPid&table=' + args.table + '&pid=' + args.rootID; }
        }
        var _sAry = args.style.split(':');
        if (_sAry.length == 2) {
            attr.expandCol = _sAry[1];
            if (args.aHeader.length == 2) {
                args.aHeader = [
                    { name: 'id', type: 'attr' },
                    { name: 'pid', type: 'attr' },
                    { name: 'type', type: 'attr' },
                    { name: 'sons', type: 'attr' },
                    { name: 'depth', type: 'attr' },
                    { name: 'nodeName', type: 'none' }
                ];
            }
        }
    }
    function layout() {
        layout_colControls();
        eBody = args.p.adElm('', 'div').cn('List FFsn ' + args.skin + ' ' + args.cn).css(args.css).attr('List', args.varName);
        eBody.onselectstart = function () { return false; }
        me.eBody = eBody;
        if (args.initText) { eBody.h('<div class="init-text" >' + args.initText + '</div>'); }
        if (args.dataSource) { me.loadArray(args.dataSource); } else { me.loadAjax({ args: args.loadApi }); }
    }

    function bindEvent() {
        eBody.evt('click', function (e) {
            var e = $.e.fix(e), _e = e.t; //e.stop();
            if (_e.tagName == 'FONT') { _e = _e.pn(); }
            if (_e.attr('state')) {
                expand(_e);
            } else {
                var _te = getTargetElm(_e);
                if (args.onTDClickBefore(_te) != false) { clickRow(_te); /* $.UI.DestroyPopElm('list--render--click');*/ }
            }
        }).evt('dblclick', function (e) {
            var e = $.e.fix(e), _e = e.t; e.stop();
            if (_e.tagName == 'FONT') { _e = _e.pn(); }
            dblClickRow(getTargetElm(_e));
        }).evt('contextmenu', function (e) {
            var e = $.e.fix(e), _e = e.t;
            if (_e.tagName == 'FONT') { _e = _e.pn(); }
            if (args.onContextMenu({ List: me, E: e, Target: getTargetElm(_e) }) == false) {
                //阻止鼠标右键原有的事件
                if (document.all) {
                    window.event.returnValue = false; // for IE
                } else {
                    e.stop();
                }
            }
        }).evt('mousedown', function (e) {
            var e = $.e.fix(e), _e = e.t; e.stop();
            if (_e.tagName == 'FONT') { _e = _e.pn(); }
            var _te = getTargetElm(_e, false);
            if (_te) { _te.e = e; }
            args.onTDMouseDown(_te, me);
        });
        args.p.pn().evt('scroll', function (e) {
            var e = $.e.fix(e), _e = e.t;
            var sl = _e.scrollLeft;
            if (attr.eHeader) { attr.eHeader.scrollLeft = sl; }
            args.onTableScoll({ List: me, Value: sl });
        });
    }
    function dblClickRow(obj) {
        if (!obj) { return; }
        if ((obj.eNode && obj.eNode.attr('state') != null) || !obj.eTd) { return; }
        var _eTd = obj.eTd, _pos = _eTd.pos(), _cIdx = _eTd.cellIndex, _hObj = attr.visColAry[_cIdx], _iAry = [], _name = _hObj.name;
        var _x = _pos.x, _y = _pos.y + _pos.h, _rowId = obj.getAttr('rowId') || obj.getAttr('id');
        _hObj.text = obj.get('text'); _hObj.comType = _hObj.comType || 'TextArea'; _hObj.value = obj.get('value'); _hObj.ifHead = false; _hObj.width = _hObj.inputWidth;
        obj.FormItemArgs = _hObj; obj.x = _x; obj.y = _y;
        if (args.onTDDoubleClickBefore(obj) != false && _hObj.ifEdit) {
            _iAry.push(_hObj);
            if (!editTips) { editTips = new $.UI.PopDialog({ p: $DB, ifClose: true, css: 'max-height:200px;padding:10px;width:170px;' }); }
            editTips.clearHTML(false).set('ePop', obj.eTxt).init({ type: 'Form', ifFixedHeight: false, btnItems: [{ name: 'FORM-SYS-SUBMIT', text: '编辑(Edit)', icon: 'icon-glyph-edit', align: 'right'}], state: 'Update', hidden: { id: _rowId }, items: _iAry, submitApi: args.updateApi }).show()
            .evt('onSubmit', function (j) { j.name = _name; j.id = _rowId; obj.List = me; return args.onTDUpdate(obj, j, editTips); })
            .evt('onSubmitSuccess', function (j) { obj.set('text', j.Data.UText[_name]).set('value', j.Data.UValue[_name]); editTips.hide(); }).get('owner').dc('oh');
        }
        args.onTDDoubleClick(obj);
    }

    function expand(_e) {
        if (!_e || !attr.expandCol) { return; }
        var _tag = _e.tagName, _eNode, _eTD, _eTR;
        switch (_tag) {
            case 'DIV':
                _eNode = _e; _eTD = _e.pn().pn();
                break;
            case 'TD':
                _eNode = _e.fc().fc(); _eTD = _e;
                break;
            case 'TR':
                _eTD = _e.chn(attr.colIdxObj[attr.expandCol]); _eNode = $(_eTD.lastChild).fc();
                break;
        }
        _eTR = _eTD.pn();
        var _sons = +_eNode.attr('sons'), _state = +_eNode.attr('state'), _id = _eTR.attr('rowId') || _eTR.attr('id');
        if (!_sons) { return; }
        if (_state) {
            if (args.expandMode == 'delete') { traversalTrs(_id, 'delete'); } else { traversalTrs(_id, 'hidden'); }
            _eNode.dc('td-unfold').ac('td-fold').attr('state', 0);
        } else {
            _eNode.dc('td-fold').ac('td-loading');
            if (args.expandMode == 'delete') {
                var _tApi = getTreeListApi(_id);
                if (_tApi) {
                    $.Util.ajax({
                        args: _tApi,
                        onSuccess: function (d) {
                            insertTreeNodesByString(_eTR, d.data[0]);
                            _eNode.dc('td-loading').dc('td-fold').ac('td-unfold').attr('state', 1);
                            args.onExpandNodeSuccess();
                        }
                    });
                } else {
                    MTips.show('请求API为空', 'warn');
                }
            } else {
                traversalTrs(_id, 'show');
                _eNode.dc('td-loading').ac('td-unfold').attr('state', 1);
            }
        }
    }

    function insertTreeNodesByString(_eTR, _sData) {
        if (!_sData) { return; }
        var _currIdx = _eTR.rowIndex, _depth = +_eTR.attr('depth') - args.initDepth + 1;
        var _pid = _eTR.attr('pid'), _id = _eTR.attr('rowId') || _eTR.attr('id');
        var _sSpace = '', _table = attr.eTable, _eNTr, _eNTd, _cName;
        for (var m = 0; m < _depth; m++) { _sSpace += '<div class="td-space"></div>'; }
        var _trAry = _sData.split('</td></tr>'), _insertAry = [];
        for (var i = 0, _iLen = _trAry.length; i < _iLen; i++) {
            var _tdAry = _trAry[i].split('</td><td>'), _newIdx = i + _currIdx + 1;
            _eNTr = $(_table.insertRow(_newIdx)).attr('pNodeName', 'xxx');
            var _sAttrVal, _aAttrVal;
            for (var j = 0, _jLen = _tdAry.length; j < _jLen; j++) {
                var _sTd = _tdAry[j];
                _cName = attr.visColAry[j].name;
                if (_sTd.indexOf('<tr') != -1) {
                    var _iid = _sTd.indexOf('><td>');
                    _sAttrVal = _sTd.substr(0, _iid);
                    _sTd = _sTd.substr(_iid + 5, _sTd.length);
                }
                if (_cName == attr.expandCol) { _sTd = _sSpace + _sTd; }
                _sTd = (_sTd == '') ? '<div class="td-detail"><div class="td-text" ></div><div class="td-value" ></div></div>' : _sTd;
                _eNTd = $(_eNTr.insertCell(j)).h(_sTd);
            }
            _aAttrVal = _sAttrVal.substr(4).split(' ');
            for (var j = 0; j < _aAttrVal.length - 1; j++) {
                var _attr = _aAttrVal[j].split('='), _val = _attr[1];
                _eNTr.attr(_attr[0], _val.substr(1, _val.length - 2));
            }
            _insertAry.push(_eNTr);
        }
        attr.childs[_id] = _insertAry;
        if (attr.childs[_pid]) { attr.childs[_pid].push(_id); }
        if (!attr.expandState) { attr.expandState = {}; }
        attr.expandState[_id] = 'open';
    }

    function addChild() { }


    //action: show, hidden, delete
    function traversalTrs(id, action) {
        var trs = attr.childs[+id];
        if (trs == null) { return; }
        for (var i = trs.length - 1; i >= 0; i--) {
            var _tr = trs[i], _type = typeof _tr;
            if (_type == 'string') {
                if (attr.expandState[_tr] == 'open') { traversalTrs(_tr, action); }
            } else {
                switch (action) {
                    case 'show':
                        _tr.dc('dn'); break;
                    case 'hidden':
                        _tr.ac('dn'); break;
                    case 'delete':
                        attr.eTable.deleteRow(_tr.rowIndex); break;
                }
                if (+_tr.attr('sons')) { traversalTrs(_tr.attr('rowId'), action); }
            }
        }
        if (action == 'delete') { attr.childs[id] = null; }
        args.onExpandNodeSuccess();
    }


    me.expandNode = function (key, keyType) { expand(getTR(key, keyType)); }


    function insertNode() {

    }

    function initHeaderAry() {
        var _hAry = args.aHeader, _attrHead = [], _visHead = [], _allW = 0, _cIdx = 0, _colIdxObj = {}, _colWidth = {}, _colH = {}, _hObj;
        for (var i = 0, _hLen = _hAry.length; i < _hLen; i++) {
            _hAry[i] = $.Util.initArgs(_hAry[i], iArgs);
            _hObj = _hAry[i];
            var _type = _hObj.type, _name = _hObj.name, _w = _hObj.width;
            if (_type == 'attr') {
                _attrHead.push(_hObj);
            } else {
                _colIdxObj[_name] = _cIdx;
                _colWidth[_cIdx] = _w;
                _colH[_cIdx] = _hObj;
                if (_type == 'checkbox') { attr.cbIdx = _cIdx; args.hasCheckBox = true; }
                _cIdx++;
                _allW += _w;
                _visHead.push(_hObj);
            }
        }
        attr.attrColAry = _attrHead;
        attr.visColAry = _visHead;
        attr.allWidth = _allW;
        attr.colIdxObj = _colIdxObj;
        attr.colWidth = _colWidth;
        attr.idxObj = _colH;
        initColHtml();
        return attr;
    }

    function initColHtml() {
        var _visCAry = attr.visColAry, _vLen = _visCAry.length;
        var _allW = attr.allWidth + 'px;', _sCol = '', _sTRs = '', _sFilter = '';
        for (var i = 0; i < _vLen; i++) {
            var _vis = _visCAry[i], _type = _vis.type.toLow(), _w = _vis.width;
            if (_vLen == 1) {
                if (_w == null) {
                    _sCol = '<col class="wp" />'; _allW = '100%;';
                } else {
                    if (_w) {
                        _sCol = '<col width="' + _w + 'px" />'
                    } else {
                        _sCol = '<col class="w0" />';
                    }
                }
            } else {
                if (_w == null) { _w = 30; }
                if (_w) { _sCol += '<col width="' + _w + 'px" />'; } else { _sCol += '<col class="w0" />'; }
            }
            var _sTd = '<div class="text" >' + _vis.title + '</div>', _sF = '<input dataType="' + (_vis.dataType || 'string') + '" comType="{0}" {1} class="td-filter-input" name="' + _vis.name + '" /><a class="icon-filter-filter" MTips="选择过滤条件"></a>';
            var _std = '<td>';
            switch (_type) {
                case 'bar':
                case 'operate':
                case 'icon':
                    _sF = '';
                    break;
                case 'checkbox':
                    _sTd = '<div class="checkbox"></div>';
                    _sF = '<a class="td-filter-cancle"></a>';
                    break;
                default:
                    var _readonly = '';
                    if (_vis.ifReadonly) { _readonly = 'readonly="readonly"'; }
                    if (_vis.ifEdit) { _sTd += '<div class="edit"></div>'; }
                    if (_vis.ifDrag) { _sTd += '<div class="drag"></div>'; }
                    if (_vis.ifSort) { _sTd += '<div class="sort sort-normal"></div>'; _std = '<td orderBy="' + _vis.name + '">'; }
                    _sF = _sF.format(_type, _readonly);
                    break;
            }
            if (!_vis.ifFilter) { _sF = ''; }
            _sTRs += _std + _sTd + '</td>';
            _sFilter += '<td>' + _sF + '</td>'
        }
        var _sCols = '<colgroup>' + _sCol + '</colgroup>';
        _sTRs = '<tr>' + _sTRs + '</tr>';
        if (args.ifEnabledFilter) { _sTRs += '<tr class="tr-filter">' + _sFilter + '</tr>'; }
        attr.colHtml = _sCols;
        attr.headHtml = _sCols + _sTRs;
        attr.allW = _allW;
    }

    function layout_header() {
        var _obj = args.colControls.header, _eSelCol;
        if (!_obj) { return; }
        var _css = _obj.css || '', _cn = _obj.cn || '';
        if (!_obj.p) {
            var _pH = 0, _fH = _obj.height || 30;
            if (args.ifEnabledFilter) { _fH += 30; }
            if (args.colControls.paging) { _pH = 30; }
            var _tBase = new $.UI.BaseDiv({ p: args.p, head_h: _fH, foot_h: _pH, ifFixedHeight: args.ifFixedHeight });
            _obj.p = _tBase.head; args.p = _tBase.body;
            if (_pH) { args.colControls.paging.p = _tBase.foot; }
            _css += ';line-height:' + (_obj.height || 30) + 'px;';
        }
        var _render = _obj.p, _dragCn = 'pr z4 ce bc_15 hp';
        attr.eHeader = _render;
        _render.h('<table class="List-header ' + _cn + '" style="' + _css + '" width="' + attr.allW + '">' + attr.headHtml + '</table>');
        _render.evt("mousedown", function (e) {
            var e = $.e.fix(e), _e = e.t;
            if (!attr.eTable || _e.className != 'drag') { return; }
            var _eTd = _e.pn(), _idx = _eTd.cellIndex, _pos = _e.posFix(), _hX = _render.posFix().x;
            var _x = _pos.x - _hX + 5, _origW = attr.colWidth[_idx], _hMask, _startX = _pos.x, dx;
            var _dargDiv = _render.adElm('', 'div').cn(_dragCn).css($.box(_x + ',0,2,') + ';margin-top:-' + _eTd.csn('height') + 'px;');
            var _bodyDiv = args.p.adElm('', 'div').cn('pa z4 ce bc_15 hp').css($.box(_x + ',0,2,'));
            $.drag.init(_dargDiv, null, _x - _origW + 25, 0, null, 0, null, 1);
            _dargDiv.onDragStart = function () { }
            _dargDiv.onDrag = function () {
                var _dragMX = _dargDiv.posFix().x;
                dx = _dragMX - _startX;
                if (_bodyDiv) { _bodyDiv.css('left:' + (_dragMX - _hX) + 'px;'); }
                if (!_hMask) { _hMask = new $.UI.Mask({ p: _render, alpha: 1, cn: 'ce' }); }
            }
            _dargDiv.onDragEnd = function () {
                _dargDiv.r(); _dargDiv = null;
                if (_bodyDiv) { _bodyDiv.r(); _bodyDiv = null; }
                if (_hMask) { _hMask.remove(); _hMask = null; } else { return; }
                attr.colWidth[_idx] = (_origW + dx) < 25 ? 25 : (_origW + dx - 5);
                resetColWidth(_idx);
            }
            $.drag.start(e, _dargDiv);
        }).evt("click", function (e) {
            var e = $.e.fix(e), _e = e.t; e.stop(); $.UI.DestroyPopElm('list--render--click');
            var _cn = _e.className, _eTd;
            switch (_cn) {
                case 'drag':
                    setColMaxWidth(_e.pn().cellIndex);
                    break;
                case 'td-filter-cancle':

                    break;
                default:
                    if (_cn.indexOf('-filter') != -1) {
                        var _cellIdx = _e.pn().cellIndex, _vObj = attr.idxObj[_cellIdx];
                        switch (_e.tagName) {
                            case 'INPUT':
                                if (!_e.attr('opt')) { _e.ns().ac('td-filter-error'); _e.blur(); return false; } else { _e.ns().dc('td-filter-error'); }
                                _vObj.onChange = function (obj) { onFilterChange(_e, obj.Value); };
                                $.UI.FormItem.onInputClick(_e, _vObj);
                                break;
                            case 'A':
                                if ($.global.popTips) { $.global.popTips.remove(); }
                                $.global.popTips = new $.UI.PopDialog({ p: $DB, css: 'max-height:180px;' });
                                var _pTips = $.global.popTips;
                                if (!attr.filterAry) { attr.filterAry = []; }
                                if (!attr.filterAry[_cellIdx]) {
                                    var _fA = _vObj.filterItems || ['clear-filter', 'like', 'equal', 'not-equal', 'greater', 'less', 'greater-equal'], _fALen = _fA.length, _fAry = [];
                                    for (var i = 0; i < _fALen; i++) { _fAry.push(filter_table[_fA[i]]); }
                                    attr.filterAry[_cellIdx] = _fAry;
                                }
                                _pTips.set('ePop', _e).hide().init({ type: 'Menu', items: attr.filterAry[_cellIdx], checkedValue: _e.ps().attr('opt') }).show()
                                    .evt('onClick', function (obj) {
                                        var _icon = obj.Item.Args.icon, eInput = _e.ps();
                                        if (_icon == 'icon-filter-clear') {
                                            eInput.value = ''; eInput.focus();
                                        } else {
                                            _e.cn(_icon).attr('MTips', obj.Text); eInput.attr('opt', obj.Value);
                                        }
                                        _pTips.hide();
                                    });
                                break;
                        }
                    } else {
                        if (_e.tagName == 'DIV') { _eTd = _e.pn(); } else { _eTd = _e; }
                        var _sN = _eTd.attr('orderby'), _argsObj = attr.loadArgsObj;
                        var _order = +(_eTd.attr('order') || '0');
                        if (_sN && _argsObj) {
                            var _eSort = $(_eTd.lastChild);
                            _argsObj.orderBy = _sN;
                            _argsObj.order = _order;
                            me.loadAjax({
                                args: _argsObj,
                                cbFn: {
                                    onSuccess: function () {
                                        if (_order) {
                                            _eTd.attr('order', 0);
                                            _eSort.dc('sort-normal sort-down').ac('sort-up');
                                        } else {
                                            _eTd.attr('order', 1);
                                            _eSort.dc('sort-normal sort-up').ac('sort-down');
                                        }
                                        if (_eSelCol && _eSelCol != _eTd) {
                                            _eSelCol.dc('td-selected');
                                            $(_eSelCol.lastChild).dc('sort-up sort-down').ac('sort-normal');
                                        }
                                        _eTd.ac('td-selected');
                                        _eSelCol = _eTd;
                                    }
                                }
                            });
                        }
                    }
                    break;
            }
        }).evt('keyup', function (e) {
            var e = $.e.fix(e), _e = e.t;
            if (e.code == 13) { onFilterChange(_e, _e.value); }
            e.stop();
        });
        attr.hTable = _render.fc();
    }

    function onFilterChange(_e, value) {
        if (!attr.filterArgs) {
            attr.filterArgs = {};
            var _tdAry = _e.pn().pn().childNodes, _dLen = _tdAry.length, _eInput, _name, _val, _opt;
            for (var i = 0; i < _dLen; i++) {
                _eInput = $(_tdAry[i]).fc();
                if (_eInput && _eInput.tagName == 'INPUT') {
                    _name = _eInput.name; _val = _eInput.value;
                    if (_name && _val) { attr.filterArgs[_name] = { col: _name, value: _val, opt: _eInput.attr('opt'), dataType: _eInput.attr('dataType') }; }
                }
            }
        }
        var _sName = _e.name, _opt = _e.attr('opt') || 'equal', _fAry = [];
        if (_opt) {
            if (value) {
                attr.filterArgs[_sName] = { col: _sName, value: value, opt: _opt, dataType: _e.attr('dataType') };
            } else {
                attr.filterArgs[_sName] = null;
            }
        }
        attr.filter = [];
        for (var k in attr.filterArgs) { var _fObj = attr.filterArgs[k]; if (_fObj) { _fAry.push($.JSON.encode(_fObj)); attr.filter.push(_fObj); } }
        attr.loadArgsObj.filterCondition = _fAry.join('\u0001');
        ajax(attr.loadArgsObj, function (d) { }, function (d) { MTips.show(d.data, 'error'); });
    }

    function hideFilter() {

    }

    function getFilterString() {

    }

    function layout_paging() {
        var _obj = args.colControls.paging;
        if (!_obj) { return; }
        if (!_obj.p) {
            var _tBase = new $.UI.BaseDiv({ p: args.p, head_h: 0, foot_h: (_obj.height || 28) });
            args.p = _tBase.body; _obj.p = _tBase.foot;
        }
        _obj.onClick = function (j) { me.loadAjax({ args: attr.loadApi }); }
        _obj.onSelect = function (j) { me.loadAjax({ args: attr.loadApi }); }
        attr.Paging = new $.UI.Paging(_obj);
    }

    function layout_colControls() { initHeaderAry(); layout_header(); layout_paging(); }

    function sortByCol() {

    }

    function setBodyHtml(html) {
        //if (!html.trim()) { eBody.h('<div class="no-data" ><img src="images/EmptyData.gif" ></div>'); return; }
        if (attr.loadApi) { html += '</td></tr>'; }
        var _html = '<table class="' + args.cn + '" style="' + args.css + '" width="' + attr.allW + '" >' + attr.colHtml + html + '</table>';
        eBody.h(unescape(_html));
        attr.eTable = eBody.fc();
        if (attr.eTable.rows.length) { args.initDepth = +$(attr.eTable.rows[0]).attr('depth'); }
        args.onLoadFinish({ List: me, Html: _html, Attr: attr });
    }


    function Ufirst(str) {
        var tmpStr = str.toLowerCase(), strLen = tmpStr.length, postString, tmpChar, index, preString;
        if (!strLen) { return ''; }
        for (index = 0; index < strLen; index++) {
            if (index == 0) {
                tmpChar = tmpStr.substring(0, 1).toUpperCase();
                postString = tmpStr.substring(1, strLen);
                tmpStr = tmpChar + postString;
            } else {
                tmpChar = tmpStr.substring(index, index + 1);
                if (tmpChar == " " && index < strLen - 1) {
                    tmpChar = tmpStr.substring(index + 1, index + 2).toUpperCase();
                    preString = tmpStr.substring(0, index + 1);
                    postString = tmpStr.substring(index + 2, strLen);
                    tmpStr = preString + tmpChar + postString
                }
            }
        }
        return tmpStr;
    }

    function toArgsObj(argsStr) {
        var _kvAry = argsStr.split('&'), _len = _kvAry.length, _kv = {};
        for (var i = 0; i < _len; i++) { var _sAry = _kvAry[i].split('='); _kv[_sAry[0]] = _sAry[1]; }
        return _kv;
    }

    function getTreeListApi(pid) {
        if (attr.loadArgsObj) {
            var _obj = attr.loadArgsObj;
            if (_obj[args.pidKey]) {
                _obj[args.pidKey] = +pid;
            } else {
                var _jc = $.JSON.decode(_obj.jsonCondition || '{}');
                _jc[args.pidKey] = +pid;
                _obj.jsonCondition = $.JSON.encode(_jc);
            }
            return _obj;
        }
    }

    function toArgsString(argsObj) {
        var _kvAry = [];
        for (var k in argsObj) { _kvAry.push(k + '=' + argsObj[k]); }
        return _kvAry.join('&');
    }

    function ajax(args, onSucc, onErr) {
        var _onSucc = onSucc || _fn, _onErr = onErr || _fn;
        if (attr.ifLoading) { return; }
        if (!attr.oldApi) { attr.oldApi = args; }
        attr.refreshApi = args;
        attr.ifLoading = true;
        $.Util.ajax({
            args: args,
            onSuccess: function (d) {
                var _dAry = d.data, _html = _dAry[0], _count = _dAry[1];
                var _return = { List: me, Data: d, Attr: attr };
                attr.ifLoading = false;
                attr.ifAjax = true;
                if (!_html) { eBody.h('<div class="no-data"><img src="images/EmptyData.gif" ></div>'); _return.Length = 0; _onSucc(_return); return; }
                if (_html.indexOf('<tr rowId=') != -1 || _html.indexOf('</td><td') != -1) {
                    _html = _html.replaceAll("<td></td>", "<td><div class='td-detail'><div class='td-text'></div><div class='td-value'></div></div></td>");
                    setBodyHtml(_html);
                } else if (_html.indexOf('[{') == 0) {
                    me.loadArray(eval(_html), _f);
                } else if (_html.indexOf('\u0002') != -1 && _html.indexOf('\u0001') != -1) {
                    var _cols = _html.split('\u0002'), _ary = [];
                    for (var i = 0; i < _cols.length; i++) {
                        var _col = _cols[i];
                        if (_col != '') {
                            var _aCol = _col.split('\u0001'); _ary.push(_aCol);
                        }
                    }
                    me.loadArray(_ary, _f);
                }
                if (!_count) { _count = 0; }
                if (attr.Paging) { attr.Paging.setTotal(+_count); }
                _return.Length = attr.eTable.rows.length;
                _onSucc(_return);
            },
            onError: function (j) {
                eBody.h('<div class="no-data">' + j.data + '</div>');
                attr.ifLoading = false;
                _onErr({ List: me, Data: j, Attr: attr });
            }
        });
    }

    function getSql4MSSQL(aHeader) {
        var _spChar = "'", hyphen = '%2B';
        if (args.ifProc) { _spChar = "''"; }
        var _hAry = aHeader || args.aHeader, _name = '', sQ = '{0}<tr ';
        var sAttr = '', aCol = [], sCb = '', _firstNode, _name, _sName, _fVis, _ifSI = args.ifShowIcon;
        if (args.ifBindID) { sQ += 'rowId="{0}{1}cast(id as varchar(20)){1}{0}" '; }
        for (var i = 0, _hLen = _hAry.length; i < _hLen; i++) {
            var col = _hAry[i], _type = col.type || 'none', _sCol = '';
            _name = col.name; _sName = _name;
            if (_type.toLow() == 'select') { col.ifTrans = true; }
            if (col.ifTrans) { _sName = 'dbo.' + (col.trans || 'SYS_TRANS_GT') + '(' + _name + ')'; }
            if (_name == attr.expandCol) { _sCol += '<div sons="{0}{1}cast(isnull(' + args.sonsKey + ',{0}{0}) as varchar(10)){1}{0}" state="0" class="td-node {0}{1}dbo.SYS_SET_ICON_FOR_TREELIST(' + args.sonsKey + ',{0}td-fold{0}){1}{0}" ></div>'; }
            switch (_type.toLowerCase()) {
                case 'checkbox':
                    sCb += '<td><div val="0" class="td-checkbox"><div class="td-checkbox-icon dn"></div></div>';
                    break;
                case 'icon':
                    aCol.push('{0}<div class="td-detail" ><div class="image ' + (col.image || '') + '" ></div><div class="td-value" ></div></div>{0}');
                    break;
                case 'date':
                    aCol.push('{0}<div class="td-detail" ><div class="td-text" >{0}{1}dbo.SYS_FORMAT_TIME(' + _name + '){1}{0}</div><div class="td-value" >{0}{1}dbo.SYS_FORMAT_TIME(' + _name + '){1}{0}</div></div>{0}');
                    break;
                case 'normal':
                    return '&resultSplit=$';
                case 'operate':
                    var _items = col.items || [], _sAry = [], _sI = '';
                    var _oiArgs = { type: 'normal', target: '', title: '', text: '', icon: '', href: 'javascript:void(0);', css: '' };
                    for (var j = 0, _jLen = _items.length; j < _jLen; j++) {
                        var _item = $.Util.initArgs(_items[j], _oiArgs);
                        switch (_item.type.toLowerCase()) {
                            case 'normal':
                                _sI = '<A rowId="{0}{1}cast(' + (_item.key || 'id') + ' as varchar(20)){1}{0}" name="' + _item.name + '" href="' + _item.href + '" >';
                                if (_item.icon) { _sI += '<span class="A-icon ' + _item.icon + '" title="' + _item.title + '"></span>'; }
                                if (_item.text) { _sI += '<span class="A-text">' + _item.text + '</span>'; }
                                _sI += '</A>';
                                break;
                            case 'button':

                                break;
                        }
                        _sAry.push(_sI);
                    }
                    aCol.push('{0}<div class="td-detail" >' + _sAry.join('') + '</div>{0}');
                    break;
                case 'process':
                    _name = '{0}{1}cast(isnull(' + _name + ',0) as varchar(20)){1}{0}';
                    aCol.push('{0}<div class="td-detail" ><div class="td-process"><div class="td-process-value" style="width:' + _name + '%;">' + _name + '%</div></div><div class="td-value">' + _name + '</div></div>{0}');
                    break;
                case 'attr':
                    var _key = col.key || _name;
                    if (col.isLocalAttr) {
                        sAttr += _key + '="' + escape(col.value) + '" ';
                    } else if (col.isLinkAttr) {
                        //什么都不做
                    } else {
                        sAttr += _key + '="{0}{1}cast(replace(isnull(' + _name + ',{0}{0}),{0}"{0},{0}%24%24{0}) as varchar(100)){1}{0}" ';
                    }
                    break;
                default:
                    if (!_fVis && _ifSI) {
                        if (typeof _ifSI == 'string') {
                            _sCol += '<div class="td-icon icon-type-{0}{1}cast(' + _ifSI + ' as varchar(10)){1}{0}"></div>';
                        } else {
                            _sCol += '<div class="td-icon {0}{1}cast(icon as varchar(50)){1}{0}"></div>';
                        }
                        _fVis = _name;
                    }
                    var _sMT = '';
                    if (col.ifEnabledTips) { _sMT = ' MTips="1" '; }
                    _sName = col.sqlName || _sName;
                    _sCol += '<div class="td-text" ' + _sMT + '>{0}{1}cast(' + _sName + ' as varchar(500)){1}{0}</div><div class="td-value" >{0}{1}cast(' + _name + ' as varchar(500)){1}{0}</div>';
                    aCol.push('{0}<div class="td-detail" >' + _sCol + '</div>{0}');
                    break;
            }
        }
        if (args.hasCheckBox) {
            _firstNode = ">" + sCb + "{0},";
        } else {
            var _fNode = aCol[0];
            if (_fNode) {
                aCol.shift();
                _firstNode = '><td>{0}{1}cast(isnull(' + _fNode + ', {0}{0}) as varchar(500)),';
            } else {
                alert('必须要有可见列!'); return '';
            }
        }
        if (!aCol.length) { _firstNode = _firstNode.substr(0, _firstNode.length - 1); }
        sQ += sAttr + _firstNode + aCol.join(',');
        sQ = sQ.format(_spChar, hyphen);
        return sQ;
    }


    function getSql4MYSQL(aHeader) {
        var head = aHeader || me.aHeader, _len = head.length;
        var _aTRAttr = ["'<tr rowId=\"'", "id"], _fNode, _fNodeStr, _aNor, _sNor;
        var _sCB = '', _aCol = [], _aTreeCol = [];
        for (var i = 0; i < _len; i++) {
            var _col = head[i], _name = _col.name, _type = _col.type || 'none', _tDB = _col.transDB || '';
            if (_tDB) { _tDB += '.'; }
            if (_name == me.expandColName) {
                _aTreeCol = ["'<div sons=\"'", 'sons', "'\" part=\"expand\" state=\"close\" class=\"pa w16 h16 '", _tDB + "dbo.sonIcon(sons,''tree_fold'')", "'\" ></div><div class=\"pa nhh oh wp\" style=\"margin-left:16px;\" part=\"text\" class=\"wp hp\" >'", _name, "'</div><div class=\"dn\" part=\"val\" >'", _name, "'</div>'"];
            }
            if (_col.trans) { _name = _col.trans; }
            var _nameCopy = _name, _ifTrans = _col.ifTrans;
            if (_type != 'attr' && !_fNode) { _fNode = _col; }
            switch (_type) {
                case 'attr':
                    if (_col.isLocalAttr) {
                        _aTRAttr.push(_name, escape(_col.value));
                    } else if (_col.isLinkAttr) { }
                    else {
                        _aTRAttr.push("'\" " + _name + "=\"'", _name);
                    }
                    break;
                case 'icon':
                    _sNor = "'<div class=\"h20 lh20 oh\" ><div class=\"ma w16 h16\" part=\"icon\" style=\"" + $.UI.ico16(_col.icon) + ";\" ></div><div class=\"dn\" part=\"val\" ></div></div>'";
                    _aCol.push('concat(' + _sNor + ') as ' + _name);
                    break;
                case 'checkbox':
                    _sCB = "<td><div val=\"0\" part=\"checkbox\" class=\"ma r3 w11 h11 bc_19 b_6\"><div part=\"checkbox_icon\" class=\"w15 h15 checkBox_check dn\"></div></div>";
                    break;
                case 'date':
                case 'num':
                case 'select':
                case 'richText':
                case 'none':
                    _aNor = ["'<div class=\"pr h20 lh20 oh\" ><div part=\"text\" class=\"wp hp\" >'", _name, "'</div><div part=\"val\" class=\"dn\" >'", _name, "'</div></div>'"];
                    _sNor = _aNor.join(',');
                    _aCol.push('concat(' + _sNor + ') as ' + _name);
                    break;
                case 'process':
                    _aNor = ["'<div class=\"pr h20 lh20 oh\" ><div part=\"text\" class=\"ma oh r3 bc_15 h15 lh15 tac\" style=\"width:90%;margin-top:2px;\"><div part=\"processVal\" class=\"fl rl3 bc_20\" style=\"width:'", _name, "'%;\">'", _name, "'%</div></div><div class=\"dn\" part=\"val\">'", _name, "'</div></div>'"];
                    _sNor = _aNor.join(',');
                    _aCol.push('concat(' + _sNor + ') as ' + _name);
                    break;
                case 'normal':
                    return '&resultsplit=$';
                case 'operate':
                    var _items = _col.items, _sOper = '';
                    if (_items) {
                        var _itemsLen = _items.length;
                        for (var j = 0; j < _itemsLen; j++) {
                            var _item = _items[j], _ty = _item.type || 'normal', _target = _item.target || '_black';
                            var _title = _item.title || _item.text || '';
                            var _icon = _item.icon, _text = _item.text, _href = _item.href || 'javascript:void(0);';
                            switch (_ty) {
                                case 'normal':
                                    var _sCn = 'ml3';
                                    if (!j) { _sCn = ''; }
                                    if (!_text) { _sCn += ' mt2'; }
                                    _sOper += '<span class=\"dib\" name=\"' + _item.name + '\" part=\"operate\" >';
                                    if (_icon != null) {
                                        _sOper += '<span part="icon" class=\"w16 mr3 h16 ' + _sCn + ' dib\" title=\"' + _title + '\" style=\"' + $.UI.ico16(_item.icon) + '\" ></span>';
                                    }
                                    if (_text) {
                                        _sOper += '<a target="' + _target + '" part="val" href=\"' + _href + '\">' + _text + '</a>';
                                    }
                                    _sOper += '</span>';
                                    break;
                                case 'btn':
                                    break;
                            }
                        }
                    }
                    _sOper = '\'<span class=\"lh20 wp oh tac\" >' + _sOper + '</span>\'';
                    _aCol.push('concat(' + _sOper + ') as ' + _name);
                    break;
            }
            if (!_fNodeStr) { _fNodeStr = _sNor; }
        }
        if (_fNode) {
            var _sAttr = 'concat(' + _aTRAttr.join(',') + ',\'\" >{0}\') as ' + _fNode.name + '';
            if (hasCB) {
                _fNodeStr = _sCB;
            } else {
                _aCol.shift();
                _fNodeStr = _fNodeStr.substr(1, _fNodeStr.length - 2);
                _fNodeStr = "<td>" + _fNodeStr;
            }
            _sAttr = _sAttr.format(_fNodeStr);
        } else {
            alert('必须要有可见列!'); return '';
        }
        if (_aCol.length) { _sAttr += ',' + _aCol.join(','); }
        return _sAttr;
    }


    function resetColWidth(idx) {
        var _allW = getColAllWidth(); resetTableCol(attr.hTable, idx); resetTableCol(attr.eTable, idx);
    }
    function resetTableCol(eTable, idx) {
        if (!eTable) { return; }
        var _eCols = eTable.fc(), _eCol = _eCols.chn(idx);
        var _allW = attr.allWidth, _nW = attr.colWidth[idx];
        if (_nW) { _eCol.dc('w0').attr('width', _nW + 'px;'); } else { _eCol.ac('w0'); };
        if (_allW) { eTable.dc('w0').attr('width', _allW + 'px;'); } else { eTable.ac('w0'); }

    }
    function setColMaxWidth(idx) {
        var _table = attr.eTable;
        if (!_table) { return; }
        var maxVal = 0, newW = 0, rows = _table.rows, len = 0;
        for (var i = 0, _len = rows.length; i < _len; i++) {
            var _eTd = $(rows[i].cells[idx]);
            if (!_eTd) { return; }
            var _elmAry = _eTd.find('div:class=td-text');
            if (_elmAry.length) { len = $(_elmAry[0]).ht().len(); } else { return; }
            maxVal = maxVal < len ? len : maxVal;
        }
        //maxVal = maxVal < hWidth ? hWidth : maxVal;
        attr.colWidth[idx] = (maxVal == 0 ? 1 : maxVal) * 10 + 20;
        resetColWidth(idx);
    }
    function resetBarWidth() {
        return;
        if (bar_index != null) {
            var _pbw = pBody.csn('width'), _aw = me.nTotalW;
            var barCol = eCols.chn(bar_index), _nBarW = 0;
            if (_aw + 18 > _pbw) { _nBarW = 18; }
            if (_nBarW == 0) {
                barCol.ac("w0");
            } else {
                barCol.dc("w0").attr('width', _nBarW + "px");
            }
        }
    }


    function getColAllWidth() { var _allW = 0; for (var i in attr.colWidth) { _allW += attr.colWidth[i]; }; attr.allWidth = _allW; return _allW; }
    function getTargetElm(_e, ifExecEvent) {
        var _tag = _e.tagName, _cn = _e.className.trim(), _cIdx = _cn.indexOf('td');
        var _ifee = ifExecEvent == null ? true : ifExecEvent;
        var _eTR, _eTD, _eDetail, _eNode, _eIcon, _eTxt, _eVal;
        if (_tag == 'A' || _tag == 'SPAN') {
            if (_tag == 'SPAN') { _e = _e.pn(); }
            var _n = _e.attr('name'); _eTD = _e.pn().pn(); _eTR = _eTD.pn();
            var _rID = _eTR.attr('rowId') || _eTR.attr('id');
            if (_ifee) { args.onOperateClick({ List: me, Attr: attr, Name: _n, RowId: _rID, E: _e, eTd: _eTD, eTr: _eTR }); }
            return {};
        }
        if (_tag == 'TD') { _eTD = _e; _eDetail = _e.fc(); if (_e.cellIndex == attr.cbIdx) { if (_ifee) { clickCheckBox(_e.fc()); } return {}; } }
        if (_tag == 'DIV') {
            if (_cIdx) { return {}; }
            switch (_cn) {
                case 'td-space':
                    _eDetail = _e.ns(); break;
                case 'td-detail':
                    _eDetail = _e; break;
                case 'td-checkbox-icon':
                    clickCheckBox(_e.pn()); return;
                case 'td-checkbox':
                    clickCheckBox(_e); return;
                default:
                    _eDetail = _e.pn(); break;
            }
            _eTD = _eDetail.pn();
        }
        if (!_eDetail) { return {}; }
        _eVal = $(_eDetail.lastChild); if (!_eVal) { return {}; };
        _eTxt = $(_eVal.previousSibling); _eTR = _eTD.pn();
        if (args.ifShowIcon) { _eIcon = $(_eTxt.previousSibling); }
        if (attr.expandCol) { if (_eIcon) { _eNode = $(_eIcon.previousSibling); } else { _eNode = $(_eTxt.previousSibling); } }
        return getFullT({ eTr: _eTR, eTd: _eTD, eDetail: _eDetail, eNode: _eNode, eIcon: _eIcon, eTxt: _eTxt, eVal: _eVal });
    }

    function getFullT(obj) {
        var _eTR = obj.eTr, _eTxt = obj.eTxt, _eVal = obj.eVal;
        var _getAttr = function (key) { return _eTR.attr(key); };
        var _get = function (key, col) {
            switch (key) {
                case 'text':
                    return _eTxt.ht();
                case 'value':
                    return _eVal.h();
                case 'icon':
                    if (obj.eIcon) { return obj.eIcon.className.split(' ')[1]; }
            }
        }
        var _set = function (key, value, col) {
            switch (key) {
                case 'text':
                    _eTxt.h(value); break;
                case 'value':
                    _eVal.h(value); break;
            }
            return this;
        }
        obj.getAttr = _getAttr; obj.get = _get; obj.set = _set;
        return obj;
    }

    function clickCheckBox(_eCB) {
        if (!_eCB) { return {}; }
        setCheckBoxChecked(_eCB, ! +_eCB.attr('val'));
        args.onCheckBoxClick({ List: me, Attr: attr });
    }
    function clickRow(elms) {
        if (!elms) { return; }
        var _eTr = elms.eTr;
        if (!_eTr) { return; }
        setRowSel(_eTr);
        args.onTDClick({ List: me, Attr: attr, Target: elms });
    }
    function getCBElm(key, type) { var _eTr = getTR(key, type); if (!_eTr) { return; } return $(_eTr.cells[attr.cbIdx]).fc(); }
    function getTR(key, type) { var _eTr = (type == 'ID' ? me.getTRById(key) : me.getTRByIdx(key)); return _eTr; }
    function setCheckBoxChecked(_eCB, _val) {
        if (!_eCB) { return; }
        if (!attr.selIds) { attr.selIds = []; attr.selTrs = []; }
        if (+_eCB.attr('val') == _val) { return; }
        var _eCBI = _eCB.fc(), _tr = _eCB.pn().pn(), _id = _tr.attr('rowId') || _tr.attr('id');
        if (_val) {
            attr.selIds.push(_id);
            attr.selTrs.push(_tr);
            _eCBI.dc('dn'); _eCB.attr('val', 1);
        } else {
            _eCBI.ac('dn'); _eCB.attr('val', 0);
            attr.selIds.re(_id);
            attr.selTrs.re(_tr);
        }
    }
    function setRowSel(_eTr) {
        if (!_eTr) { return; }
        var _selTR = attr.eSelTR;
        if (_selTR) { setTRSelected(_selTR, false); }
        setTRSelected(_eTr, true); attr.eSelTR = _eTr; attr.selID = _eTr.attr('rowId') || _eTr.attr('id');
    }
    function setTRSelected(tr, ifSel, selCn) {
        var _table = attr.eTable, _selCn = selCn || args.selCn;
        if (!tr || !_table) { return; }
        if (typeof tr == 'number') {
            var _rLen = _table.rows.length;
            if (tr > _rLen - 1) { return; } else { tr = _table.rows[tr]; }
        }
        tr = $(tr);
        var _trs = tr.childNodes;
        for (var i = 0, _len = _trs.length; i < _len; i++) {
            var _td = $(_trs[i]);
            if (ifSel) { _td.ac(_selCn); } else { _td.dc(_selCn); }
        }
        return tr;
    }

    function getElmsByTd(_eTd) {
        if (!_eTd) { return; }
        var _eTD = _eTd, _eDetail = $(_eTD.lastChild);
        var _eVal = $(_eDetail.lastChild), _eTxt = $(_eVal.previousSibling), _eIcon, _eNode;
        if (args.ifShowIcon) { _eIcon = _eTxt.previousSibling; }
        if (attr.expandCol) { if (_eIcon) { _eNode = _eIcon.previousSibling; } else { _eNode = _eTxt.previousSibling; } }
        return getFullT({ eTr: _eTD.pn(), eTd: _eTD, eDetail: _eDetail, eNode: _eNode, eIcon: _eIcon, eTxt: _eTxt, eVal: _eVal });
    }

    function getElmsByTr(_eTr) {
        if (!_eTr) { return; }
        var _eTD;
        if (args.hasCheckBox) { _eTD = _eTr.chn(1); } else { _eTD = _eTr.fc(); }
        var _elms = getElmsByTd(_eTD); _elms.eTr = _eTr;
        return _elms;
    }

    function getTdByKey(key, rowKey, keyType) {
        var _kT = keyType || 'ID', _rK = rowKey, _k = key, _eTr, _eTd;
        if (!_k) { return; }
        if (_rK) { _eTr = getTR(rowKey, keyType); } else { _eTr = attr.eSelTR; }
        if (!_eTr) { return; }
        if (typeof key == 'string') { _eTd = _eTr.chn(attr.colIdxObj[key]); } else { _eTd = _eTr.chn(key); }
        return _eTd;
    }

    function getDeleteApi() {
        var _dApi = args.deleteApi, _t = args.table;
        if (!_dApi && _t) {
            if (attr.expandCol) { _dApi = 'm=SYS_TABLE_TREE&action=delTreeNode'; } else { _dApi = 'm=SYS_TABLE_BASE&action=deleteByID'; }
            _dApi += '&table=' + _t;
        }
        return _dApi;
    }

    function resetVar() {
        /*
        attr.childs = {};
        attr.expandState = {};
        attr.ifLoading = false;
        attr.selIds = [];
        attr.selTrs = [];
        attr.eSelTR = null;
        attr.selID = null;
        */
    }


    me.loadAjax = function (j) {
        var _args = j.args || '', _f = j.cbFn || {}, _onSucc = _f.onSuccess || args.onSuccess, _onErr = _f.onError || args.onError;
        args.loadApi = _args;
        if (attr.ifLoading) { return; }
        if (!_args || !$.Util.toArgsString(_args)) { return; }
        if (typeof _args == 'string') { _args = toArgsObj(_args); }
        eBody.h('<div class="ajax-loading"><div class="img"></div><div class="text" >Loading...</div></div>').fc();
        //if (!attr.ifAjax) { eBody.h('<div class="ajax-loading"><div class="img"></div><div class="text" >Loading...</div></div>').fc(); }
        if (attr.Paging) { _args.ifCount = 1; _args.pageIndex = attr.Paging.get('pageIndex'); _args.pageSize = attr.Paging.get('pageSize'); }
        attr.loadApi = _args;
        if (args.onLoadAjax({ List: me, Args: _args }) != false) {
            var _filterAry = args.filter, _sFilterAry = [];
            if (_filterAry.length) {
                for (var i = 0, _len = _filterAry.length; i < _len; i++) { _sFilterAry.push($.JSON.encode(_filterAry[i])); }
                _args.filterCondition = _sFilterAry.join('\u0001');
                attr.filter = _filterAry;
            }
            _args.keyFields = me.getKeyFieldsByHeader();
            _args.cSplit = '</td><td>';
            _args.rsplit = '</td></tr>';
            attr.loadArgsObj = _args;
            ajax(_args, _onSucc, _onErr);
        }
    }

    me.forwardPage = function (v) { attr.Paging.forwardPage(v); }

    me.refresh = function (cbFn, ifCheckSel, ifClick) {
        var _f = cbFn || {}, _onSucc = _f.onSuccess || _fn, _ifCS = (ifCheckSel == null ? true : ifCheckSel);
        ajax(attr.refreshApi, function (obj) {
            if (_ifCS) {
                if (ifClick) { me.fireClick(attr.selID, 'ID'); } else { setRowSel(me.getTRById(attr.selID)); }
                if (!attr.selID) { me.fireClick(0); }
            }
            _onSucc(obj);
        }, _f.onError);
        return me;
    }

    me.scrollTo = function (v) {
        return;
        var _val = (+v || 0);
        if (_val == -1) { _val = eBody.scrollHeight; }
        eBody.scrollTop = _val;
    }
    me.formatData = function (data) {
        var _dAry = [];
        switch ($.getType(data[0])) {
            case 'array':
                _dAry = data;
                break;
            case 'object':

                break;
        }
        return _dAry
    }

    me.loadArray = function (data, cbFn) {   //使用从本地数据中来获取数据
        var _f = cbFn || {}, _onSuc = _f.onSuccess || args.onSuccess, _onErr = _f.onError || args.onError;
        var _dType = $.getType(data), _html = '';
        if (_dType != 'array') { _html = '<div class="no-data" >Error Data Format</div>'; _onErr({ List: me, data: _html }); setBodyHtml(_html); return; }
        var _dAry = me.formatData(data), _dLen = _dAry.length;
        if (_dLen) {
            args.expandMode = 'hidden';
            var _header = args.aHeader, _hLen = _header.length, _trAry = [], _cbCheckAry = [];
            for (var i = 0; i < _dLen; i++) {
                var _sTR = '', _sAttr = '';
                for (var j = 0; j < _hLen; j++) {
                    var col = _header[j], _hType = col.type || 'none', _val = _dAry[i][j] || '';
                    switch (_hType.toLowerCase()) {
                        case 'checkbox':
                            if (_val) { _cbCheckAry.push(i); }
                            _sTR += '<td><div val="0" class="td-checkbox"><div class="td-checkbox-icon dn"></div></div></td>';
                            break;
                        case 'icon':
                            _sTR += '<td><div class="td-detail" ><div class="image ' + (col.image || '') + '" ></div><div class="td-value" ></div></div></td>';
                            break;
                        case 'operate':
                            _sTR += '<td>' + toOperateHtml(col.items) + '</td>';
                            break;
                        case 'process':
                            _sTR += '<td><div class="td-detail" ><div class="td-process"><div class="td-process-value" style="width:' + _val + '%</div></div><div class="td-value">' + _val + '</div></div></td>';
                            break;
                        case 'attr':
                            if (col.isLocalAttr) {
                                _sAttr += col.name + '="' + escape(col.value) + '" ';
                            } else if (col.isLinkAttr) {
                                //什么都不做
                            } else {
                                _sAttr += col.name + '="' + escape(_val) + '" ';
                            }
                            break;
                        default:
                            _sTR += '<td><div class="td-detail"><div class="td-text" MTips="1">' + _val + '</div><div class="td-value">' + _val + '</div></div></td>';
                            break;
                    }
                }
                _trAry.push('<tr ' + _sAttr + '>' + _sTR + '</tr>');
            }
            setBodyHtml(_trAry.join(''));
            me.setChecked(_cbCheckAry, true, 'rowIndex');
        } else {
            _html = ''; _onErr({ List: me, data: _html }); setBodyHtml(_html); return;
        }
    }

    function toOperateHtml(items) {
        var _items = items || [], _sAry = [], _sI = '';
        var _oiArgs = { type: 'normal', target: '', title: '', text: '', icon: '', href: 'javascript:void(0);', css: '' };
        for (var j = 0, _jLen = _items.length; j < _jLen; j++) {
            var _item = $.Util.initArgs(_items[j], _oiArgs);
            switch (_item.type.toLowerCase()) {
                case 'normal':
                    _sI = '<A name="' + _item.name + '" href="' + _item.href + '" >';
                    if (_item.icon) { _sI += '<span class="A-icon ' + _item.icon + '" title="' + _item.title + '"></span>'; }
                    if (_item.text) { _sI += '<span class="A-text">' + _item.text + '</span>'; }
                    _sI += '</A>';
                    break;
                case 'button':

                    break;
            }
            _sAry.push(_sI);
        }
        return '<div class="td-detail" >' + _sAry.join('') + '</div>';
    }

    me.calculateCols = function (td) {
        var _val = '', _eTR;
        if (td) {
            _eTR = td.pn();
            var _tdAry = _eTR.childNodes, _name = attr.idxObj[td.cellIndex].name, _tdLen = _tdAry.length;
            for (var i = 0; i < _tdLen; i++) {
                var _HO = attr.visColAry[i], _union = _HO.union || '';
                if (_union && _union.indexOf('$' + _name) != -1) {
                    var _tTD = _tdAry[i], _eVal = $(_tTD.fc().lastChild), _eText = _eVal.ps(), _cVal;
                    for (var j = 0; j < _tdLen; j++) {
                        var _eTD = _tdAry[j], _key = attr.idxObj[_eTD.cellIndex].name;
                        var _val = $(_eTD.fc().lastChild).h();
                        if (!_val) { _val = 0; }
                        _union = _union.replace('$' + _key, _val);
                    }
                    _cVal = eval(_union);
                    _eVal.h(_cVal); _eText.h(_cVal);
                }
            }
        }
        return me;
    }

    me.insertRow = function (data, position) {
        if (!attr.eTable || !data) { return me; }
        var _pos = position || -1, _eTR = $(attr.eTable.insertRow(_pos)), _obj, _idx = 0, mtips = '';
        for (var i = 0, _len = args.aHeader.length; i < _len; i++) {
            _obj = args.aHeader[i];
            var _key = _obj.name, _val = data[i] || data[_key] || '', _type = _obj.type.toLow();
            if (_type == 'attr') {
                _eTR.attr(_key, _val);
            } else {
                if (_obj.ifEnabledTips) { mtips = ' MTips="1" '; }
                var _tdHtml = '<div class="td-detail"><div class="td-text" ' + mtips + ' >' + _val + '</div><div class="td-value" >' + _val + '</div></div>';
                switch (_type) {
                    case 'operate':
                        _tdHtml = toOperateHtml(_obj.items);
                        break;
                    case 'icon':

                        break;
                }
                $(_eTR.insertCell(_idx)).h(_tdHtml);
                _idx++;
            }
        }
        return me;
    }

    me.reExpandTR = function (tr, type, ifClickSelRow) {
        if (!attr.expandCol) { return me; }
        var _eTR = me.deleteTR(tr, type, false);
        if (!_eTR) { return me; }
        var _id = _eTR.attr('rowid') || _eTR.attr('id');
        var _tApi = getTreeListApi(_id);
        if (_tApi) {
            $.Util.ajax({
                args: _tApi,
                onSuccess: function (d) {
                    insertTreeNodesByString(_eTR, d.data[0]);
                    var _eTD = _eTR.chn(attr.colIdxObj[attr.expandCol]);
                    $(_eTD.lastChild).fc().dc('td-loading').dc('td-fold').ac('td-unfold').attr('state', 1);
                    if (ifClickSelRow != false) { me.fireClick(attr.selID, 'ID'); } else { setRowSel(me.getTRById(attr.selID)); }
                    if (!attr.selID) { me.fireClick(0); }
                }
            });
        } else {
            MTips.show('请求API为空', 'warn');
        }
    }

    me.deleteTR = function (tr, type, ifRemoveSelf) {
        var _delTR = function (_tr, depth) { if (_tr && (+_tr.attr('depth')) > depth) { _delTR(_tr.ns(), depth); _tr.r(); _tr = null; }; }
        if (typeof tr != 'object') { tr = getTR(tr, type); }
        if (!tr) { return; me; }
        _delTR(tr.ns(), +tr.attr('depth'));
        if (ifRemoveSelf != false) { tr.r(); tr = null; } else { return tr; }
        return me;
    }

    //这个方法是getKeyFieldsByHeader的缩写, 得到部分查询url
    //aHeader:  list 的aHeader
    //dbType:  连接数据库的类型 默认是MSSQL,   可选值: MSSQL, MYSQL;
    me.getKeyFieldsByHeader = function (aHeader, dbT) {
        if (!dbT) { dbT = $.global.getDBType(); }
        var _dbt = dbT || 'MSSQL';
        if (_dbt == 'MSSQL') { return getSql4MSSQL(aHeader); }
        if (_dbt == 'MYSQL') { return getSql4MYSQL(aHeader); }
    }


    me.setAllChecked = function (ifChecked) {
        var _table = attr.eTable;
        if (!_table) { return me; }
        if (ifChecked == null) { ifChecked = true; }
        var _rows = _table.rows, _rLen = _rows.length;
        for (var i = 0; i < _rLen; i++) { var _eCB = $(_rows[i].cells[attr.cbIdx]).fc(); setCheckBoxChecked(_eCB, ifChecked); }
        return me;
    }

    function getJsonDownload() {
        var _aHead = attr.visColAry, _len = _aHead.length, _kv = {}, _skv = '';
        for (var i = 0; i < _len; i++) {
            var _col = _aHead[i], _type = _col.type, _k = _col.name, _name = _k;
            if (_type == 'checkbox') { continue; }
            if (attr.colWidth[i]) {
                _kv[_name] = _col.title;
                if (_col.ifTrans) { _k = 'dbo.SYS_TRANS_GT(' + _name + ')'; }
                if (_col.trans) { _k = 'dbo.' + _col.trans + '(' + _name + ')'; }
                var _n = ',' + _k;
                if (!_skv) { _n = _k; };
                _skv += _n;
            }
        }
        return '&jsonDownload=' + $.JSON.encode(_kv) + '&keyFields=' + _skv;
    }

    me.saveAsExecl = function (fileName, api, ifDownAll) {
        if (!$.global.iframe) { $.global.iframe = $DB.adElm('', 'iframe').cn('w0 h0 b0'); }
        var _temp = attr.loadApi;
        if (ifDownAll) { _temp.pageSize = 1; _temp.pageSize = 1000000; }
        _temp.keyFields = null; delete _temp.keyFields;
        $.global.iframe.src = 'meeko.aspx?' + (api || $.Util.toArgsString(_temp)) + getJsonDownload() + '&fileName=' + (fileName || 'table');
    }

    me.getRowData = function (key, rowKey, keyType) {
        var _elms = getElmsByTr(getTdByKey(key, rowKey, keyType));
        console.log(_elms);

    }

    me.getRowDataByTR = function (tr) {
        var _dObj = {};
        if (tr && tr.tagName == 'TR') {
            var _cells = tr.cells, _cLen = _cells.length;
            for (var i = 0; i < _cLen; i++) {
                var _td = $(_cells[i]), _cIdx = _td.cellIndex, _HO = attr.idxObj[_cIdx], _name = _HO.key || _HO.name, _tObj = getTargetElm(_td, false);
                if (!_tObj || !_tObj.get) { continue; }
                _dObj[_name] = _tObj.get('value');
                _dObj[_name + '_text'] = _tObj.get('text');
            }
            for (var _a = 0, _aLen = attr.attrColAry.length; _a < _aLen; _a++) {
                var _HO = attr.attrColAry[_a], _name = _HO.key || _HO.name;
                _dObj[_name] = $(tr).attr(_HO.name);
            }
        }
        return _dObj;
    }

    me.delSelRows = function (onSucc, ids) {
        if (typeof _ids == 'string') { _ids = _ids.split(','); }
        var _ids = ids || attr.selIds || [], _idLen = _ids.length, _onSucc = onSucc || _fn;
        if (_idLen > 1) {
            MConfirm.setWidth(250).show('确定删除<font color="red">' + _idLen + '</font>项记录?').evt('onOk', function () {
                var _dApi = getDeleteApi();
                if (!_dApi) { MTips.show('删除接口为空', 'warn'); return; }
                $.Util.ajax({
                    args: _dApi += '&ids=' + _ids.join(','),
                    onSuccess: function () { MTips.show('删除记录成功!', 'ok'); me.refresh(null, ifFireClick); attr.selIds = []; attr.selTrs = []; _onSucc(); },
                    onError: function (d) { MTips.show('删除记录失败!', 'error'); }
                });
            });
        } else {
            MTips.show('没有选中项', 'warn');
        }
        return me;
    }
    me.deleteSelRow = function (ifFireClick) {
        if (attr.selID) {
            MConfirm.setWidth(250).show('确定删除ID为<font color="red">' + attr.selID + '</font>的记录?').evt('onOk', function () {
                var _dApi = getDeleteApi();
                if (!_dApi) { MTips.show('删除接口为空', 'warn'); return; }
                $.Util.ajax({
                    args: _dApi += '&id=' + attr.selID,
                    onSuccess: function () { MTips.show('删除记录成功!', 'ok'); me.deleteTR(attr.eSelTR); attr.eSelTR = null; attr.selID = null; if (ifFireClick != false) { me.fireClick(0); } },
                    onError: function (d) { MTips.show('删除记录失败!', 'error'); }
                });
            });
        } else {
            MTips.show('请先选择要删除的记录', 'warn');
        }
    }

    me.orderSelNode = function (order, fn) {
        if (attr.selID != null && args.orderApi) {
            var _order = order || 'asc', _f = fn || _fn;
            if (_order.toLowerCase() == 'asc') { _order = '1'; } else { _order = '0'; }
            $.Util.ajax({
                args: $.Util.toArgsString(args.orderApi) + '&id=' + attr.selID + '&order=' + _order,
                onSuccess: function () { me.refresh(null, true, true); _f({ List: me, Args: args, Attr: attr }); }
            });
        } else {
            MTips.show('没有选中项或排序API(orderApi)不存在', 'warn');
        }
        return me;
    }
    me.reCreate = function (aHeader, api) {
        if (api) { me.set('loadApi', api); }
        me.set('aHeader', aHeader);
        for (var idx in attr) { var _attr = attr[idx]; if (_attr && _attr.remove && !_attr.tagName) { _attr.remove(); _attr = null; } }
        if (eBody) { eBody.h('').r(); };
        //console.log(args);
        attr = {}; setDefault(args); layout(); return me;
    }
    me.setSelected = function (value, type) { setRowSel(value, type); return me; }
    me.setChecked = function (key, value, type) {
        if ($.getType(key) == 'array') {
            for (var i = 0, _iLen = key.length; i < _iLen; i++) { setCheckBoxChecked(getCBElm(key[i], type), value); }
        } else {
            setCheckBoxChecked(getCBElm(key, type), value);
        }
        return me;
    }
    me.fireChecked = function (key, type) { clickCheckBox(getCBElm(key, type)); return me; }
    me.fireClick = function (key, type) { clickRow(getElmsByTr(getTR(key, type))); return me; }
    me.getTRByIdx = function (v) { if (v == null || !attr.eTable) { return; }; return $(attr.eTable.rows[+v]); }
    me.getTRById = function (v) {
        var _table = attr.eTable, _tr = null;
        if (v == null || !_table) { return; };
        var _rows = _table.rows, _len = _rows.length;
        for (var i = 0; i < _len; i++) { var _eTr = _rows[i]; if (_eTr.getAttribute('rowId') == v || _eTr.getAttribute('id') == v) { _tr = $(_eTr); break; } }
        return _tr;
    }
    me.setAttr = function (k, v) { attr[k] = v; return me; }
    me.getAttr = function (k) { return attr[k]; }
    me.getArgs = function () { return args; }
    me.evt = function (key, fn) { me.set(key, fn); return me; }
    me.set = function (key, value) { args[key] = value; return me; }
    me.get = function (key) { return args[key]; }
    me.show = function () { owner.show(); return me; }
    me.hide = function () { owner.hide(); return me; }
    me.remove = function () { owner.r(); owner = null; me = null; }
    me.init = function (j) { setDefault(j); layout(); bindEvent(); return me; }
    if (arguments.length) { me.init(j); }
    return me;
}