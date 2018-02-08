var svgns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/2000/xlink/namespace/";

var SVGDoc = null;

function GetParams(evt) {

    SVGDoc = evt.target.ownerDocument;
    var defs = SVGDoc.getElementsByTagName("defs").item(0);
    var refs = [];
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
    alert(window.document.location);
    //alert(document.owenerDocument.documentElement);
    alert(SVGDoc.URL);
    alert(location.href);
    var href = SVGDoc.URL;
    if (-1 != href.indexOf("?")) {
        var paramList = href.split("?")[1].split(/&|;/);
        for (var p = 0, pLen = paramList.length; pLen > p; p++) {
            var eachParam = paramList[p];
            var valList = eachParam.split("=");
            var name = unescape(valList[0]);
            var value = unescape(valList[1]);

            refs[name][2] = value;
        }
    }
    //    if (document.defaultView.frameElement) {
    //        var params = document.defaultView.frameElement.getElementsByTagName("param");

    //        for (var i = 0, iLen = params.length; iLen > i; i++) {
    //            var eachParam = params[i];
    //            var name = eachParam.getAttribute("name");
    //            var value = eachParam.getAttribute("value");

    //            refs[name][2] = value;
    //        }
    //    }



    for (paramName1 in refs) {
        var eachParam = refs[paramName1];

        if (-1 != paramName1.indexOf("text-")) {
            var ref = eachParam[0];
            var t = CreateText(eachParam[1], eachParam[2]);
            defs.replaceChild(t, ref);
            // alert(printNode(t));
        }
        else {
            var ref = eachParam[0];
            var c = CreateColor(eachParam[1], eachParam[2]);
            defs.replaceChild(c, ref);
        }
        //GetIdRefs(eachParam[1]);
    }
    //alert(printNode(defs));

}


function CreateText(id, val) {
    var t = SVGDoc.createElementNS(svgns, "text");
    t.setAttribute("id", id);
    t.setAttribute("startOffset", 20);
    t.appendChild(SVGDoc.createTextNode(val));
    return t;
}


function CreateColor(id, val) {
    var lg = SVGDoc.createElementNS(svgns, "linearGradient");
    lg.setAttribute("id", id);

    var stop = SVGDoc.createElementNS(svgns, "stop");
    stop.setAttribute("stop-color", val);
    lg.appendChild(stop);

    return lg;
}



function GetIdRefs(id) {
    var elList = SVGDoc.documentElement.getElementsByTagName("*");

    for (var i = 0, iLen = elList.length; iLen > i; i++) {
        var eachEl = elList.item(i);
        for (var a = 0, aLen = eachEl.attributes.length; aLen > a; a++) {
            var attr = eachEl.attributes.item(a);
            //alert(attr.value);
            if (attr && -1 != attr.value.indexOf("#" + id)) {
                var val = attr.value;
                if (attr.name != "xlink:href")
                    eachEl.setAttributeNS(attr.namespaceURI, attr.name, val);
            }
        }
    }
}