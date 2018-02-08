<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MainFrame.aspx.cs" Inherits="SVG.Frame.MainFrame" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>管理導航區域</title>
    <link rel="stylesheet" href="../style.css" type="text/css" />

    <script type="text/javascript">
        var preClassName = "man_nav_1";
        function list_sub_nav(Id, sortname) {
            if (preClassName != "") {
                getObject(preClassName).className = "bg_image";
            }
            if (getObject(Id).className == "bg_image") {
                getObject(Id).className = "bg_image_onclick";
                preClassName = Id;
                //showInnerText(Id);
                window.top.frames['leftFrame'].outlookbar.getbytitle(sortname);
                window.top.frames['leftFrame'].outlookbar.getdefaultnav(sortname);
            }
        }

        function _switchDocImage(Id) {
            var _initDocId = "SVGDoc";
            var _initImageId = "SVGimage";
            var _type, _preHref;
            // var _SecHref = "";
            var _href = window.top.frames['manFrame'].location.href;
            if (-1 != _href.indexOf("?")) {
                _preHref = _href.split("?")[0];
                _type = _href.split("?")[1];

                //            if (-1 == _preHref.split("/")[2].indexof("."))
                //                _SecHref = _preHref.split("/")[2] + "/";
                if (_initDocId == Id) {
                    getObject(_initDocId).className = "bg_image";
                    getObject(_initImageId).className = "bg_image_onclick";
                    switch (_preHref.split("\/")[3]) {
                        case "BasicType":
                            window.top.frames['manFrame'].location = "../BasicType/BasicTypeDoc.aspx?" + _type;
                            break;
                        case "Gradiental":
                            window.top.frames['manFrame'].location = "../Gradiental/GradDoc.aspx?" + _type;
                            break;
                        case "FeChange":
                            window.top.frames['manFrame'].location = "../FeChange/feSVGDoc.aspx?" + _type;
                            break;
                        case "SVGAnimate":
                            window.top.frames['manFrame'].location = "../SVGAnimate/AnimSVGDoc.aspx?" + _type;
                            break;
                    }

                }
                else {
                    getObject(_initImageId).className = "bg_image_onclick";
                    getObject(_initDocId).className = "bg_image";
                    switch (_preHref.split("\/")[3]) {
                        case "BasicType":
                            window.top.frames['manFrame'].location = "../BasicType/BasicType.aspx?" + _type;
                            break;
                        case "Gradiental":
                            window.top.frames['manFrame'].location = "../Gradiental/GradImage.aspx?" + _type;
                            break;
                        case "FeChange":
                            window.top.frames['manFrame'].location = "../FeChange/FeSVGImage.aspx?" + _type;
                            break;
                        case "SVGAnimate":
                            window.top.frames['manFrame'].location = "../SVGAnimate/AnimSVGImage.aspx?" + _type;
                            break;
                    }
                }
            }
        }
        //獲取對象屬性兼容方法
        function getObject(objectId) {
            if (document.getElementById && document.getElementById(objectId)) {
                // W3C DOM
                return document.getElementById(objectId);
            } else if (document.all && document.all(objectId)) {
                // MSIE 4 DOM
                return document.all(objectId);
            } else if (document.layers && document.layers[objectId]) {
                // NN 4 DOM.. note: this won't find nested layers
                return document.layers[objectId];
            } else {
                return false;
            }
        }
    </script>

</head>
<body>
    <form id="form1" runat="server">
    <div id="nav">
        <ul>
            <li id="man_nav_1" onclick="list_sub_nav(id,'基本形狀')" class="bg_image_onclick">基本形狀</li>
            <li id="man_nav_2" onclick="list_sub_nav(id,'漸變')" class="bg_image">SVG漸變</li>
            <li id="man_nav_3" onclick="list_sub_nav(id,'濾鏡')" class="bg_image">SVG濾鏡</li>
            <li id="man_nav_4" onclick="list_sub_nav(id,'動畫')" class="bg_image">SVG動畫</li>
            <li id="man_nav_5" onclick="list_sub_nav(id,'傳遞參數')" class="bg_image">傳遞參數</li>
        </ul>
    </div>
    <div id="sub_info">
        <div id="SVGimage" onclick="_switchDocImage(id)" class="bg_image_onclick" style="width: 100px;
            float: left; height: 100%; text-align: center; line-height: 20px; padding-top: 3px;
            color: Maroon">
            SVG圖像</div>
        <div id="SVGDoc" onclick="_switchDocImage(id)" class="bg_image" style="width: 100px;
            float: left; height: 100%; text-align: center; line-height: 20px; padding-top: 3px;
            color: Maroon">
            SVG文檔</div>
    </div>
    </form>
</body>
</html>
