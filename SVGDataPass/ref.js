/////////////////////////////////
// Copyright Foxconn 2011 //
/////////////////////////////////
// ref v1.0              //
// --------- ----              //
// Conceived, Designed and     //
// Written by Yao   //
/////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
// 全局變量                                                                      //
// ------ ---------                                                              //
//                                                                               //
// n                  - 用於接收傳遞的參數：控制魚骨圖節點的個數                 //
//                                                                               //
// defs               - SVG的DOM中的defs節點                                     //
//                                                                               //
// refs               - 用於保存SVG中ref的信息                                   //
//                                                                               //
// _initTopObj        - 原魚骨圖節點的上方魚刺                                   //
var xmlns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/2000/xlink/namespace/";
var _svgDoc;
var _svgRoot;
var n;
var defs;
var refs = [];

var _initTopObj;
var _initTopBox;
var _initTopX;
var _initTopY;
var _topTransform = "matrix(0.57204612,0.82022146,-0.82022146,0.57204612,0,0)";

var _width;
var _height;
var _degree = 0.0;

var _initBottomObj;
var _initBottomBox;
var _initBottomX;
var _initBottomY;
var _bottomTransform = "matrix(0.6080572,-0.79389322,0.79389322,0.6080572,0,0)";

var _fishBody;
var _fishHead;
var _spanNum = 0.0;

var _baseNumX = 50;
var _offset = 6;
var _translateX;
var _translateY;
var _splitNum;
var _scaleNum;
var _topRoot;
var _bottomRoot;
var _topBoneUseInitId = "use001";
var _bottomBoneUseInitId = "use002";
var _newNodeTop;
var _newNodeBottom;
//var _newNodeText;
var _transform;
var _criticalNum = 0;

var targetElement = null;
var TrueCoords = null;
var GrabPoint = null;
var BackDrop = null;
var DragTarget = null;

var _showInfoDiv;
var _divNode;
var _divText;
//var _prePosX;
//var _prePosY;
var _flag = false;

//*************************************** 
//JS文件入口
//*************************************** 
function startUp(_evt) {
    _svgDoc = _evt.target.ownerDocument;
    //alert(window.opener);
    //alert(window.document);
    //alert(window.parent.document.getElementById('showInfo').innerHTML);
    //alert(window.location.href);
    //alert(window.frameElement.parentNode);
    _svgRoot = _svgDoc.documentElement;
    defs = _svgDoc.getElementsByTagName("defs").item(0);
    n = parseInt(_svgDoc.URL.split("?")[1].split(/&|;/)[0].split("=")[1], 10);
    if (n && n > 0) {
        InitRefText(n);

        GetParams();

        GetParamsValues();

        PassToSvg();

        InitSVG(_svgDoc, n);

        TrueCoords = _svgRoot.createSVGPoint();
        GrabPoint = _svgRoot.createSVGPoint();
        BackDrop = _svgDoc.getElementById('BackDrop');

        targetElement = _svgDoc.getElementById('fishBone');
        //ShowInfoDiv();
    }
}

//***************************************
//在SVG的defs中初始化ref
//***************************************    
function InitRefText(_mn) {
    var _newNodeRef;
    for (var _refNum = 0; _refNum < _mn + 1; _refNum++) {

        _newNodeRef = _svgDoc.createElementNS(xmlns, "ref");
        _newNodeRef.setAttribute("id", "paramTopText" + _refNum);
        _newNodeRef.setAttributeNS(xlinkns, "param", "text-top" + _refNum);
        _newNodeRef.setAttributeNS(xlinkns, "default", "暫無數據");
        defs.appendChild(_newNodeRef);

        _newNodeRef = _svgDoc.createElementNS(xmlns, "ref");
        _newNodeRef.setAttribute("id", "paramBottomText" + _refNum);
        _newNodeRef.setAttributeNS(xlinkns, "param", "text-bot" + _refNum);
        _newNodeRef.setAttributeNS(xlinkns, "default", "暫無數據");
        defs.appendChild(_newNodeRef);
    }
}

//*************************************** 
//獲取SVG中ref的默認參數param
//*************************************** 
function GetParams() {
    var refList = defs.getElementsByTagName("ref");
    for (var r = refList.length - 1; 0 <= r; r--) {
        var eachRef = refList.item(r);
        var id = eachRef.getAttribute("id");
        var paramName = eachRef.getAttribute("param");
        var defaultVal = eachRef.getAttribute("default");
        if (!defaultVal) {
            if (eachRef.firstChild) {
                defaultVal = eachRef.firstChild.nodeValue;
            }
            else {
                defaultVal = "";
            }
        }
        refs[paramName] = [eachRef, id, defaultVal];
    }
}

//*************************************** 
//接收傳參，為ref的默認參數param賦新值
//*************************************** 
function GetParamsValues() {
    var href = _svgDoc.URL;
    if (-1 != href.indexOf("?")) {
        var paramList = href.substring(href.indexOf("&") + 1).split(/&|;/);
        for (var p = 0, pLen = paramList.length; pLen > p; p++) {
            var eachParam = paramList[p];
            var valList = eachParam.split("=");
            var name = unescape(valList[0]);
            var value = unescape(valList[1]);
            refs[name][2] = value;
        }
    }
}

//*************************************** 
//將defs中的ref轉化為text
//*************************************** 
function PassToSvg() {
    for (paramName in refs) {
        var eachParam = refs[paramName];
        if (-1 != paramName.indexOf("text-")) {
            var ref = eachParam[0];
            var t = CreateText(eachParam[1], eachParam[2]);
            defs.replaceChild(t, ref);
        }
        else {
            var ref = eachParam[0];
            var c = CreateColor(eachParam[1], eachParam[2]);
            defs.replaceChild(c, ref);
        }
    }
}

//*************************************** 
//創建text
//***************************************     
function CreateText(id, val) {
    var t = _svgDoc.createElementNS(xmlns, "text");
    t.setAttribute("id", id);
    t.appendChild(_svgDoc.createTextNode(val));
    return t;
}

//*************************************** 
//創建SVG顏色
//*************************************** 
function CreateColor(id, val) {
    var lg = _svgDoc.createElementNS(xmlns, "linearGradient");
    lg.setAttribute("id", id);

    var stop = _svgDoc.createElementNS(xmlns, "stop");
    stop.setAttribute("stop-color", val);
    lg.appendChild(stop);
    return lg;
}

//*************************************** 
//接收參數後，更新SVG
//*************************************** 
function InitSVG(_doc, n) {

    _topRoot = _doc.getElementById("gTopBone1");
    _bottomRoot = _doc.getElementById("gBottomBone1");

    _initTopObj = _doc.getElementById("path41180");
    _initTopBox = _initTopObj.getBBox();
    _initTopX = _initTopBox.x;
    _initTopY = _initTopBox.y;

    _width = _initTopBox.width;
    _height = _initTopBox.height;
    _degree = 120;

    _initBottomObj = _doc.getElementById("path41181");
    _initBottomBox = _initBottomObj.getBBox();
    _initBottomX = _initBottomBox.x;
    _initBottomY = _initBottomBox.y;

    _topRoot = CreateRecParamText(_topRoot, _degree * -1, _initTopX + _width, _initTopY + _height, "#paramTopText0"); //, _topTransform
    _bottomRoot = CreateRecParamText(_bottomRoot, _degree, _initBottomX + _width, _initBottomY, "#paramBottomText0"); // _bottomTransform, _

    if (n > 1) {

        _splitNum = 2 / n;
        _fishBody = _doc.getElementById("rect4025");
        _fishHead = _doc.getElementById("fishHead");
        _spanNum = 60 * n - _fishBody.getAttribute("width");
        if (_spanNum > 0) {
            _fishHead.setAttribute("transform", "translate(" + _spanNum + ",0)");
            _fishBody.setAttribute("width", 60 * n);
        }
        else {
            _spanNum = 60 * n + 60 - _fishBody.getAttribute("width");
            _fishHead.setAttribute("transform", "translate(" + _spanNum + ",0)");
            _fishBody.setAttribute("width", 60 * n + 60);
        }

        for (var _cycle = 1; _cycle <= n; _cycle++) {
            if (n % 2 == 0) {
                _cycle > n / 2 ? _criticalNum-- : _criticalNum++;
            }
            else
                _cycle > n / 2 + 1 ? _criticalNum-- : _criticalNum++;

            _scaleNum = 1 + _splitNum * _criticalNum;

            _translateY = -(_initTopY + _height) * (_splitNum * _criticalNum);
            _translateX = -(_initTopX + _width) * (_splitNum * _criticalNum) + _baseNumX * _cycle;
            _transform = "matrix(" + _scaleNum + ",0,0," + _scaleNum + "," + _translateX + "," + _translateY + ")";
            _newNodeTop = _doc.createElementNS(xmlns, "use");
            _newNodeTop.setAttributeNS("http://www.w3.org/2000/xlink/namespace/", "xlink:href", "#path41180");
            _newNodeTop.setAttribute("transform", _transform);
            _newNodeTop.setAttribute("id", _topBoneUseInitId);
            _topBoneUseInitId = _topBoneUseInitId + "1";
            _topRoot.appendChild(_newNodeTop);
            //if (_cycle != n)
            _topRoot = CreateRecParamText(_topRoot, _degree * -1, _initTopX + _width + _baseNumX * _cycle + _offset, _initTopY + _height - _offset, "#paramTopText" + _cycle); //, _topTransform




            _translateY = -(_initBottomY) * (_splitNum * _criticalNum);
            _translateX = -(_initBottomX + _width) * (_splitNum * _criticalNum) + _baseNumX * _cycle;
            _transform = "matrix(" + _scaleNum + ",0,0," + _scaleNum + "," + _translateX + "," + _translateY + ")";
            _newNodeBottom = _doc.createElementNS(xmlns, "use");
            _newNodeBottom.setAttributeNS("http://www.w3.org/2000/xlink/namespace/", "xlink:href", "#path41181");
            _newNodeBottom.setAttribute("transform", _transform);
            _newNodeBottom.setAttribute("id", _bottomBoneUseInitId);
            _bottomBoneUseInitId = _bottomBoneUseInitId + "2";
            _bottomRoot.appendChild(_newNodeBottom);
            //if (_cycle != n)
            _bottomRoot = CreateRecParamText(_bottomRoot, _degree, _initBottomX + _width + _baseNumX * _cycle, _initBottomY, "#paramBottomText" + _cycle); //, _bottomTransform

        }
    }
}

//*************************************** 
//在SVG的特定位置插入text
//*************************************** 
function CreateRecParamText(_root, _angle, _posX, _posY, _xlnkTref) {
    var _newNodeText;
    var _newTrefNode;

    _newNodeText = _svgDoc.createElementNS(xmlns, "text");
    _newNodeText.setAttribute("x", _posX);
    _newNodeText.setAttribute("y", _posY);
    _newNodeText.setAttribute("fill", "#9c31c8");
    _newNodeText.setAttribute("font-family", "Sans");
    _newNodeText.setAttribute("font-size", "20");
    _newNodeText.setAttribute("transform", "rotate(" + _angle + "," + _posX + "," + _posY + ")");  //, trefTransform
    _newNodeText.setAttributeNS(xlinkns, "onmouseover", "a.html");

    _newTrefNode = _svgDoc.createElementNS(xmlns, "tref");
    _newTrefNode.setAttributeNS(xlinkns, "xlink:href", _xlnkTref);

    _newNodeText.appendChild(_newTrefNode);
    _root.appendChild(_newNodeText);

    return _root;
}

//*************************************** 
//onmousedown響應事件
//***************************************
function Grab(evt) {
    if (BackDrop != targetElement) {
        DragTarget = targetElement;
        DragTarget.parentNode.appendChild(DragTarget);
        DragTarget.setAttribute('pointer-events', 'none');
        var transMatrix = DragTarget.getCTM();
        GrabPoint.x = TrueCoords.x - Number(transMatrix.e);
        GrabPoint.y = TrueCoords.y - Number(transMatrix.f);
        PopInfoDiv(evt, GrabPoint.x, GrabPoint.y);
    }
}

//*************************************** 
//onmousemove響應事件
//***************************************
function Drag(evt) {
    GetTrueCoords(evt);
    if (DragTarget) {
        var newX = TrueCoords.x - GrabPoint.x;
        var newY = TrueCoords.y - GrabPoint.y;
        DragTarget.setAttribute('transform', 'translate(' + newX + ',' + newY + ')');
    }
}

//*************************************** 
//onmouseup響應事件
//*************************************** 
function Drop(evt) {
    if (DragTarget) {
        //var targetElement = evt.target;
        DragTarget.setAttribute('pointer-events', 'all');
        //        if ('Folder' == targetElement.parentNode.id) {
        //            targetElement.parentNode.appendChild(DragTarget);
        //            alert(DragTarget.id + ' has been dropped into a folder, and has been inserted as a child of the containing group.');
        //        }
        //        else {
        //            alert(DragTarget.id + ' has been dropped on top of ' + targetElement.id);
        //        }
        DragTarget = null;
    }
}

//*************************************** 
//鼠標在原坐標系中的坐標
//*************************************** 
function GetTrueCoords(evt) {
    var newScale = _svgRoot.currentScale;
    var translation = _svgRoot.currentTranslate;
    TrueCoords.x = (evt.clientX - translation.x) / newScale;
    TrueCoords.y = (evt.clientY - translation.y) / newScale;
}


function ShowInfoDiv(_posX, _posY) {
    _showInfoDiv = window.parent.document.getElementById('showInfo');
    //_showInfoDiv.setAttribute("style", "height=300px; width=500px");
    _showInfoDiv.style.width = 300;
    _showInfoDiv.style.height = 300;
    _showInfoDiv.style.backgroundColor = "#c1ca83";
    _showInfoDiv.style.color = "#9c31c8";
    _showInfoDiv.innerHTML = "this is a test div";
    _showInfoDiv.style.visibility = "visible";
    _showInfoDiv.style.top = _posX;
    _showInfoDiv.style.left = _posY;
    //    _showInfoDiv.style.setProperty("margin-top",50);
    //    _showInfoDiv.style.setProperty("margin-left", 80);
}

function PopInfoDiv(evt, _posX, _posY) {
    if (_flag) {
        targetElement.removeChild(_divText);
        targetElement.removeChild(_divNode);
        _flag = false;
    }
    if (evt.target.nodeName == "tref" && !_flag) {
        _divNode = _svgDoc.createElement("rect");
        _divNode.setAttribute("width", "200");
        _divNode.setAttribute("height", "200");
        _divNode.setAttribute("x", _posX);
        _divNode.setAttribute("y", _posY);
        _divNode.setAttribute("fill", "#c1ca83");
        _divNode.setAttribute("fill-opacity", ".4");

        _divText = _svgDoc.createElement("text");
        _divText.setAttribute("x", _posX * 1.05);
        _divText.setAttribute("y", _posY * 1.05);
        _divText.setAttribute("style", "font-family:Arial;font-size:20;stroke:#00ff00;fill:#9c31c8;");

        _divText.appendChild(_svgDoc.createTextNode("this is a test"));
        targetElement.appendChild(_divText);
        targetElement.appendChild(_divNode);
        //        _prePosX = evt.clienltX;
        //        _prePosY = evt.clienltY;
        _flag = true;
    }
    //        else {
    //            if (Math.abs(evt.clientX - _prePosX) >= 0.5) {
    //                _divNode.setAttribute("x", evt.clientX);
    //                _divNode.setAttribute("y", evt.clientY);
    //                _divText.setAttribute("x", evt.clientX + 10);
    //                _divText.setAttribute("y", evt.clientY + 10);
    //            }
    //        }
    //ShowInfoDiv(evt.clientX, evt.clientY);

    //    else {
    //        if (_flag) {
    //            targetElement.removeChild(_divText);
    //            targetElement.removeChild(_divNode);
    //            _flag = false;
    //        }
    //    }
}