var xmlns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/2000/xlink/namespace/";
var _svgDoc;
var _svgRoot;
var _docWidth;
var _docHeigth;

var _procInfo = [];
var n;
var _procDateInfo;
var _rejectLaws;
var arr_rejectLaws;


var defs;
var refs = [];



var _fishBody;
//var _fishHead;

var _translateX;
var _translateY;

var _topRoot;
var _bottomRoot;

var _newTrefNode;

var _transform;

var targetElement = null;
var TrueCoords = null;
var GrabPoint = null;
var BackDrop = null;
var DragTarget = null;

var _divNode;
var _divText;
var _flag = false;

//*************************************** 
//JS文件入口
//***************************************
function startUp(_evt) {
    _svgDoc = _evt.target.ownerDocument;
    _svgRoot = _svgDoc.documentElement;
    _docWidth = window.parent.document.body.clientWidth;
    _docHeigth = window.parent.document.body.clientHeight;
    defs = _svgDoc.getElementsByTagName("defs").item(0);

    RecPassedInfo();

    if (n && n > 0) {
        InitRefText(_procDateInfo, _rejectLaws);
        GetParams();

        PassToSvg();

        InitSVG();
        window.parent.document.getElementById('showInfo').style.display = "none";
        //window.parent.document.getElementById('txtAreaSvg').value = printNode(_svgRoot);
        TrueCoords = _svgRoot.createSVGPoint();
        GrabPoint = _svgRoot.createSVGPoint();
        BackDrop = _svgDoc.getElementById('BackDrop');

        targetElement = _svgDoc.getElementById('gChart');
    }
}

//***************************************
//接收傳遞到SVG中的參數
//***************************************
function RecPassedInfo() {
    if (-1 != _svgDoc.URL.indexOf("?")) {
        _procInfo = _svgDoc.URL.split("?")[1].split(/;/);
    }
    else {
        _procInfo = window.parent.document.getElementById('showInfo').innerHTML.split(/;/);
    }
    n = parseInt(_procInfo[0], 10);
    _procDateInfo = _procInfo[1];
    _rejectLaws = _procInfo[2];
}

//***************************************
//在SVG的defs中初始化ref
//***************************************
function InitRefText(_procDateInfo, _rejectLaws) {
    var _newNodeRef;
    var arr_procDate = _procDateInfo.indexOf("|") ? _procDateInfo.split("|") : new Array(_procDateInfo);
    arr_rejectLaws = _rejectLaws.indexOf("|") ? _rejectLaws.split("|") : new Array(_rejectLaws);
    var arrLaws_perNode;

    for (var _refNum = 0; _refNum < n; _refNum++) {

        _newNodeRef = _svgDoc.createElementNS(xmlns, "ref");
        _newNodeRef.setAttribute("id", "text-trunk" + _refNum + 0);
        _newNodeRef.setAttributeNS(xlinkns, "param", "text-trunk" + _refNum + 0);
        _newNodeRef.setAttributeNS(xlinkns, "default", arr_procDate[_refNum].split(",")[0]);
        defs.appendChild(_newNodeRef);

        _newNodeRef = _svgDoc.createElementNS(xmlns, "ref");
        _newNodeRef.setAttribute("id", "text-trunk" + _refNum + 1);
        _newNodeRef.setAttributeNS(xlinkns, "param", "text-trunk" + _refNum + 1);
        _newNodeRef.setAttributeNS(xlinkns, "default", arr_procDate[_refNum].split(",")[1]);
        defs.appendChild(_newNodeRef);

        arrLaws_perNode = arr_rejectLaws[_refNum].split(",");
        for (var boneNum_perNode = 0; boneNum_perNode < arrLaws_perNode.length; boneNum_perNode++) {
            _newNodeRef = _svgDoc.createElementNS(xmlns, "ref");
            _newNodeRef.setAttribute("id", "text-bone" + _refNum + boneNum_perNode);
            _newNodeRef.setAttributeNS(xlinkns, "param", "text-bone" + _refNum + boneNum_perNode);
            _newNodeRef.setAttributeNS(xlinkns, "default", arrLaws_perNode[boneNum_perNode]);
            defs.appendChild(_newNodeRef);
        }
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

//*************************************** //createElement,setAttribute
//接收參數後，更新SVG
//***************************************//getElementById,getAttribute
function InitSVG() {

    _fishBody = _svgDoc.getElementById("fishBody");
    //    _fishHead = _svgDoc.getElementById("fishHead");
    _topRoot = _svgDoc.getElementById("gTopBone");
    _bottomRoot = _svgDoc.getElementById("gBottomBone");

    //*********************************************************
    var _bodyWidth = 10;


    var _dividedNum = 8;
    var _perLen = 1 / _dividedNum;
    var _drawPosX = 1 / 10;
    var _ellipseRx = _perLen / 2 - _perLen / 10;
    var _ellipseRy = _perLen / 2 - _perLen / 10;
    var _textOffsetX = _perLen / 10;
    var _textOffsetY = _ellipseRy / 2;
    var _tspanOffsetX = _ellipseRx / 5;
    var _tspanOffsetY = _ellipseRy / 2;

    var _boneLineLen = (1 / 2 - _ellipseRy) / 3;
    var _boneOffsetLen = _boneLineLen / 4;
    var _boneRectWidth = _perLen * 0.75;
    var _boneRectHeight;
    var _boneRectX = -_boneRectWidth / 2;
    var _boneRectY;
    var _boneRectBox = new Array(); //[_boneRectX, _boneRectY, _boneRectWidth, _boneRectHeight]

    var _tailWidth = _perLen * 0.75;
    var _tailHeight = 2 * _ellipseRy;

    //*********************************************************
    var _startNode;
    var _tailNode;
    var _bodyNode;
    var _bodyNodeText;
    var _bodyNodeTspan;
    var Col = new Array("red", "magenta", "blue", "cyan", "green", "yellow", "orange");

    _startNode = _svgDoc.createElementNS(xmlns, "circle");
    _startNode.setAttribute("cx", 0.8 * _drawPosX * _docWidth);
    _startNode.setAttribute("cy", 0.5 * _docHeigth);
    _startNode.setAttribute("r", 0.2 * _drawPosX * _docWidth);
    _startNode.setAttribute("style", "stroke:#0b3300ff;stroke-width:2;fill:#9c31c8;fill-opacity:.4;");
    _fishBody.appendChild(_startNode);

    _startNode = _svgDoc.createElementNS(xmlns, "circle");
    _startNode.setAttribute("cx", 0.8 * _drawPosX * _docWidth);
    _startNode.setAttribute("cy", 0.5 * _docHeigth);
    _startNode.setAttribute("r", 0.05 * _drawPosX * _docWidth);
    _startNode.setAttribute("style", "stroke:#0b3300ff;fill:red;");
    _fishBody.appendChild(_startNode);

    var _bodyRect = _svgDoc.createElementNS(xmlns, "rect");
    _bodyRect.setAttribute("x", _drawPosX * _docWidth);
    _bodyRect.setAttribute("y", 0.5 * _docHeigth - _bodyWidth / 2);
    _bodyRect.setAttribute("width", _perLen * n * _docWidth);
    _bodyRect.setAttribute("height", _bodyWidth);
    _bodyRect.setAttribute("style", "fill:none;stroke:#0b3300ff;stroke-width:2;");
    _fishBody.appendChild(_bodyRect);

    _tailNode = _svgDoc.createElementNS(xmlns, "path");
    _tailNode.setAttribute("d", "M" + (_drawPosX + _perLen * n + _tailWidth) * _docWidth + "," + 0.5 * _docHeigth + "l" + -_tailWidth * _docWidth + "," + _tailHeight / 2 * _docHeigth + "l0," + -_tailHeight * _docHeigth + "l" + _tailWidth * _docWidth + "," + _tailHeight / 2 * _docHeigth + "Z");
    _tailNode.setAttribute("style", "stroke:#0b3300ff;fill:#9c31c8;fill-opacity:.4;");
    _fishBody.appendChild(_tailNode);

    _tailNode = _svgDoc.createElementNS(xmlns, "circle");
    _tailNode.setAttribute("cx", (_drawPosX + _perLen * n + _tailWidth * 0.25) * _docWidth);
    _tailNode.setAttribute("cy", 0.5 * _docHeigth);
    _tailNode.setAttribute("r", 0.1 * _tailHeight * _docWidth);
    _tailNode.setAttribute("style", "stroke:#0b3300ff;fill:red;");
    _fishBody.appendChild(_tailNode);

    for (var _cycle = 0; _cycle < n; _cycle++) {
        //畫魚骨圖Body上的節點
        _bodyNode = _svgDoc.createElementNS(xmlns, "ellipse");
        _bodyNode.setAttribute("cx", (_drawPosX + (_cycle + 0.5) * _perLen) * _docWidth);
        _bodyNode.setAttribute("cy", 0.5 * _docHeigth);
        _bodyNode.setAttribute("rx", _ellipseRx * _docWidth);
        _bodyNode.setAttribute("ry", _ellipseRy * _docHeigth);
        _bodyNode.setAttribute("opacity", .4);
        _bodyNode.setAttribute("fill", Col[_cycle % Col.length]);
        _bodyNode.setAttribute("stroke", "#0b3300ff");
        _bodyNode.setAttribute("stroke-width", "2");
        var an = svgDocument.createElementNS(xmlns, "set");
        an.setAttribute("attributeName", "opacity");
//        an.setAttribute("type", "CSS");
//        an.setAttribute("values", "0");
        an.setAttribute("begin", "mouseover");
        an.setAttribute("end", "mouseout");
        an.setAttribute("to", "0");
        _bodyNode.appendChild(an);

        //魚骨圖Body節點上的Text
        _bodyNodeText = _svgDoc.createElementNS(xmlns, "text");
        _bodyNodeText.setAttribute("x", (_drawPosX + _textOffsetX + _cycle * _perLen) * _docWidth);
        _bodyNodeText.setAttribute("y", (0.5 + _textOffsetY) * _docHeigth);
        _bodyNodeText.setAttribute("fill", "#0b3300ff");
        _bodyNodeText.setAttribute("font-family", "Sans");
        _bodyNodeText.setAttribute("font-size", "10");

        _bodyNodeTspan = _svgDoc.createElementNS(xmlns, "tspan");
        _bodyNodeTspan.setAttribute("dx", _tspanOffsetX * _docWidth);
        _bodyNodeTspan.setAttribute("dy", 0);
        _newTrefNode = _svgDoc.createElementNS(xmlns, "tref");
        _newTrefNode.setAttributeNS(xlinkns, "xlink:href", "#text-trunk" + _cycle + 0);
        _bodyNodeTspan.appendChild(_newTrefNode);
        _bodyNodeText.appendChild(_bodyNodeTspan);
        _fishBody.appendChild(_bodyNodeText);

        _bodyNodeText = _svgDoc.createElementNS(xmlns, "text");
        _bodyNodeText.setAttribute("x", (_drawPosX + _textOffsetX + _cycle * _perLen) * _docWidth);
        _bodyNodeText.setAttribute("y", (0.5 - _textOffsetY) * _docHeigth);
        _bodyNodeText.setAttribute("fill", "#0b3300ff");
        _bodyNodeText.setAttribute("font-family", "Sans");
        _bodyNodeText.setAttribute("font-size", "10");

        _bodyNodeTspan = _svgDoc.createElementNS(xmlns, "tspan");
        _bodyNodeTspan.setAttribute("dx", _tspanOffsetX * _docWidth);
        _bodyNodeTspan.setAttribute("dy", _bodyWidth / 2);
        _bodyNodeTspan.setAttribute("font-weight", "bold");
        _newTrefNode = _svgDoc.createElementNS(xmlns, "tref");
        _newTrefNode.setAttributeNS(xlinkns, "xlink:href", "#text-trunk" + _cycle + 1);
        _bodyNodeTspan.appendChild(_newTrefNode);
        _bodyNodeText.appendChild(_bodyNodeTspan);
        _fishBody.appendChild(_bodyNodeText);

        _fishBody.appendChild(_bodyNode);

        _rejectLawsNum = arr_rejectLaws[_cycle].split(",").length;
        var _root; //骨刺位置：（上邊|下邊）
        var _gBoneNode; //骨刺
        var _spanRange = 0.05 * _docHeigth; //偏移量
        var _angle; //骨刺內容旋轉角度
        var _bonelength;
        //var _translate; //平移
        //畫魚骨圖Bone
        for (_rjNum = 0; _rjNum < _rejectLawsNum; _rjNum++) {
            _bonelength = _boneLineLen;
            if (_rjNum % 2 == 0) {
                _translateY = (0.5 - _ellipseRy) * _docHeigth;
                _translateX = (_drawPosX + (_cycle + 0.5) * _perLen) * _docWidth;
                _root = _topRoot;
                _angle = 180;
            }
            else {
                _translateY = (0.5 + _ellipseRy) * _docHeigth;
                _translateX = (_drawPosX + (_cycle + 0.5) * _perLen) * _docWidth;
                _root = _bottomRoot;
                _angle = 0;
            }
            switch (_rjNum) {
                case 0:
                    _transform = "matrix(-1,0,0,-1," + _translateX + "," + _translateY + ")";
                    break;
                case 1:
                    _transform = "matrix(1,0,0,1," + _translateX + "," + _translateY + ")";
                    break;
                case 2:
                    _bonelength = _bonelength - _boneOffsetLen;
                    _transform = "matrix(-0.866,-0.5,0.5,-0.866," + _translateX + "," + _translateY + ")";
                    break;
                case 3:
                    _bonelength = _bonelength - _boneOffsetLen;
                    _transform = "matrix(0.866,-0.5,0.5,0.866," + _translateX + "," + _translateY + ")";
                    break;
                case 4:
                    _bonelength = _bonelength - _boneOffsetLen;
                    _transform = "matrix(-0.866,0.5,-0.5,-0.866," + _translateX + "," + _translateY + ")";
                    break;
                case 5:
                    _bonelength = _bonelength - _boneOffsetLen;
                    _transform = "matrix(0.866,0.5,-0.5,0.866," + _translateX + "," + _translateY + ")";
                    break;
                case 6:
                    _bonelength = _bonelength + _boneOffsetLen;
                    _translateY = _translateY - _spanRange;
                    _transform = "matrix(-0.866,-0.5,0.5,-0.866," + _translateX + "," + _translateY + ")";
                    break;
                case 7:
                    _bonelength = _bonelength + _boneOffsetLen;
                    _translateY = _translateY + _spanRange;
                    _transform = "matrix(0.866,-0.5,0.5,0.866," + _translateX + "," + _translateY + ")";
                    break;
                case 8:
                    _bonelength = _bonelength + _boneOffsetLen;
                    _translateY = _translateY - _spanRange;
                    _transform = "matrix(-0.866,0.5,-0.5,-0.866," + _translateX + "," + _translateY + ")";
                    break;
                case 9:
                    _bonelength = _bonelength + _boneOffsetLen;
                    _translateY = _translateY + _spanRange;
                    _transform = "matrix(0.866,0.5,-0.5,0.866," + _translateX + "," + _translateY + ")";
                    break;

            }
            //創建骨刺
            _boneRectY = _bonelength;
            _boneRectHeight = _bonelength / 4;
            _boneRectBox = [_boneRectX, _boneRectY, _boneRectWidth, _boneRectHeight];
            _gBoneNode = CreateTheBoneNode(_cycle, _rjNum, _angle, _bonelength, _boneRectBox, Col[_cycle % Col.length]);
            _gBoneNode.setAttribute('transform', _transform);
            _root.appendChild(_gBoneNode);
        }
    }
}

//*************************************** 
//在SVG的特定位置插入text
//***************************************
function CreateTheBoneNode(_cycle, _rjNum, _angle, _lineLen, _rectBox, _rectColor) {
    var _gBoneNode = _svgDoc.createElementNS(xmlns, "g");
    _gBoneNode.setAttribute("id", "_boneNode" + _cycle + _rjNum);
    var _boneNodePath;
    var _boneNodeRect;
    var _boneNodeG;
    var _boneNodeText;


    _boneNodePath = _svgDoc.createElementNS(xmlns, "path");
    _boneNodePath.setAttribute("d", "M0,0v" + _lineLen * _docHeigth + "Z");
    _boneNodePath.setAttribute("id", "_topBone" + _cycle + _rjNum);
    _boneNodePath.setAttribute("style", "&st0;");
    _gBoneNode.appendChild(_boneNodePath);

    _boneNodeG = _svgDoc.createElementNS(xmlns, "g");
    _boneNodeG.setAttribute("id", "boneNodeG" + _cycle + _rjNum);
    _boneNodeG.setAttribute('transform', 'rotate(' + _angle + ',0,' + (_rectBox[1] + _rectBox[3] / 2) * _docHeigth + ')');

    _boneNodeRect = _svgDoc.createElementNS(xmlns, "rect");
    _boneNodeRect.setAttribute("x", _rectBox[0] * _docWidth);
    _boneNodeRect.setAttribute("y", _rectBox[1] * _docHeigth);
    _boneNodeRect.setAttribute("width", _rectBox[2] * _docWidth);
    _boneNodeRect.setAttribute("height", _rectBox[3] * _docHeigth);
    _boneNodeRect.setAttribute("stroke", _rectColor);
    _boneNodeRect.setAttribute("stroke-width", 2);
    _boneNodeRect.setAttribute("fill", "#9c31c8");
    _boneNodeRect.setAttribute("fill-opacity", ".4");
    _boneNodeG.appendChild(_boneNodeRect);



    _boneNodeText = _svgDoc.createElementNS(xmlns, "text");
    _boneNodeText.setAttribute("x", _rectBox[0] * _docWidth);
    _boneNodeText.setAttribute("y", (_rectBox[1] + _rectBox[3] / 2) * _docHeigth);
    _boneNodeText.setAttribute("fill", "#0b3300ff");
    _boneNodeText.setAttribute("font-family", "Sans");
    _boneNodeText.setAttribute("font-size", "10");

    _newTrefNode = _svgDoc.createElementNS(xmlns, "tref");
    _newTrefNode.setAttribute("id", "trefModel" + _cycle + _rjNum);
    //_newTrefNode.setAttribute("rotate", _angle);
    _newTrefNode.setAttributeNS(xlinkns, "xlink:href", "#text-bone" + _cycle + _rjNum);

    _boneNodeText.appendChild(_newTrefNode);
    _boneNodeG.appendChild(_boneNodeText);
    _gBoneNode.appendChild(_boneNodeG);


    return _gBoneNode;
}

//*************************************** 
//onmousedown響應事件
//***************************************
function Grab(evt) {
    //if (BackDrop != targetElement) {
        DragTarget = targetElement;
        DragTarget.parentNode.appendChild(DragTarget);
        DragTarget.setAttribute('pointer-events', 'none');
        var transMatrix = DragTarget.getCTM();
        GrabPoint.x = TrueCoords.x - Number(transMatrix.e);
        GrabPoint.y = TrueCoords.y - Number(transMatrix.f);
        PopInfoDiv(evt, GrabPoint.x, GrabPoint.y);
    //}
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
        DragTarget.setAttribute('pointer-events', 'all');
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
        _divText.setAttribute("style", "font-family:Arial;font-size:10;stroke:#00ff00;fill:#9c31c8;");

        _divText.appendChild(_svgDoc.createTextNode("this is a test"));
        targetElement.appendChild(_divText);
        targetElement.appendChild(_divNode);
        _flag = true;
    }
}

//function zoomSelectedNode(evt) {
//    if(evt.target.nodeName)
//}


function getNodeString(node) {
    var serializer = new XMLSerializer();
    var xml = serializer.serializeToString(node);
    return xml
}

