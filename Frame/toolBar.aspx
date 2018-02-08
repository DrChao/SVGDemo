<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="toolBar.aspx.cs" Inherits="SVG.Frame.toolBar" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>打開/隱藏左側導航欄</title>
    <link href="../style.css" rel="stylesheet" type="text/css" />
    <script language="JavaScript" type="text/javascript">
        function Submit_onclick() {
            if (parent.myFrame.cols == "199,7,*") {
                parent.myFrame.cols = "0,7,*";
                document.getElementById("ImgArrow").src = "../images/switch_right.gif";
                document.getElementById("ImgArrow").alt = "打開左側導航欄";
            } else {
                parent.myFrame.cols = "199,7,*";
                document.getElementById("ImgArrow").src = "../images/switch_left.gif";
                document.getElementById("ImgArrow").alt = "隱藏左側導航欄";
            }
        }

        function MyLoad() {
            if (window.parent.location.href.indexOf("MainUrl") > 0) {
                window.top.midFrame.document.getElementById("ImgArrow").src = "../images/switch_right.gif";
            }
        }
    </script>

</head>
<body onload="MyLoad()"  style ="margin :0; height:100%;">
    <form id="form1" runat="server">
    <div id="switchpic" style="height:100%;">
        <a href="javascript:Submit_onclick()">
            <img src="../images/switch_left.gif" alt="隱藏左側導航欄" id="ImgArrow" /></a></div>
    </form>
</body>
</html>
