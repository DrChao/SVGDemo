<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AnimSVGImage.aspx.cs" Inherits="SVG.SVGAnimate.AnimSVGImage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
 <head>
  <script language="C#" runat="server">
   void Page_Load(Object Sender, EventArgs E)   
   {
        if (!Page.IsPostBack)		
        {
        string _type = "";
        if (Request.QueryString["type"] != null)
        {
            _type = Request.QueryString["type"].ToString();
            HfType.Value = _type;
        }
        }
        switch (HfType.Value)
        {
            case "animate":
                svgembed.Attributes["src"] = "Animate/animate.svg";
                break;
            case "animateMotion":
                svgembed.Attributes["src"] = "Animate/animateMotion.svg";
                break;
            case "animateTransform":
                svgembed.Attributes["src"] = "Animate/animateTransform.svg";
                break;
            case "set":
                svgembed.Attributes["src"] = "Animate/set.svg";
                break;
            case "flower":
                svgembed.Attributes["src"] = "Flower/flower.svg";
                break;
            case "flowerSvg":
                svgembed.Attributes["src"] = "Flower/flowerSvg.svg";
                break;
            //case "roate":
            //    svgembed.Attributes["src"] = "Rotate/roate.html";
            //    break;
            case "clipPath":
                svgembed.Attributes["src"] = "clipPath.svg";
                break;
            case "DynamicAddPoints":
                svgembed.Attributes["src"] = "DynamicAddPoints.svg";
                break;
            case "DrawLine":
                svgembed.Attributes["src"] = "Drawing/DrawLine.svg";
                break;
            case "Bezier2":
                svgembed.Attributes["src"] = "Drawing/Bezier2.svg";
                break;
            case "knife":
                svgembed.Attributes["src"] = "knife.svg";
                break;
            case "MoveWithMouse":
                svgembed.Attributes["src"] = "MoveWithMouse.svg";
                break;
            case "blockGame":
                svgembed.Attributes["src"] = "blockGame.svg";
                break;
            case "graphs30":
                svgembed.Attributes["src"] = "graphs30.svg";
                break;
            case "ripples6":
                svgembed.Attributes["src"] = "ripples6.svg";
                break;
            case "stars3":
                svgembed.Attributes["src"] = "stars3.svg";
                break;
            case "balloon":
                svgembed.Attributes["src"] = "balloon.svg";
                break;
        }
    }
   </script>
    <title>SVG動畫圖像</title>
  </head>
<body>
<form id="_myform1" runat="server">
<asp:HiddenField ID="HfType" runat="server" />
</form>
<embed id=svgembed height="100%" width="100%" pluginspage="http://www.adobe.com/svg/viewer/install/" runat="server" />
</body> 
</html>
