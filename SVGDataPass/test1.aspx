<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="test1.aspx.cs" Inherits="SVG.SVGDataPass.test1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <%--<div style="position: absolute; z-index: 1; width: 100%;">--%>
        <object type="image/svg+xml" data="fishBone.svg" width="100%" height="100%" codebase="http://www.adobe.com/svg/viewer/install/">
            <param name="src" value="fishBone.svg?num=3&text-top0=claims001&text-bot0=claims002&text-top1=claims0011&text-bot1=claims0022&text-top2=claims00111&text-bot2=claims00222&text-top3=claims001111&text-bot3=claims002222" />
            提示：您的瀏覽器不支持SVG。 請安裝 <a href="http://www.adobe.com/svg/viewer/install/">Adobe SVG Viewer</a>
            插件(IE用戶) 或者用 <a href="http://www.getfirefox.com/">Firefox</a>, <a href="http://www.opera.com/">
                Opera</a> or <a href="http://www.apple.com/safari/download/">Safari</a> 進行替代。
        </object>
    <%--</div>--%>
   <%-- <div id="showInfo" style="position: absolute; z-index: 100; visibility: hidden;">
        adfjasdlfjfksdafjasdl
    </div>--%>
    <%--<embed width="100%" height="100%" type="image/svg+xml" id="svg" src="fishBone.svg" pluginspage="http://www.adobe.com/svg/viewer/install/"> style="color:Aqua; top:40px; left:60px; "</embed>--%>
</body>
</html>
