<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AnimSVGDoc.aspx.cs" Inherits="SVG.SVGAnimate.AnimSVGDoc" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>SVG動畫文檔</title>
    <script language="C#" runat="server">
   void Page_Load(Object Sender, EventArgs E)   {
       if (!Page.IsPostBack)
       {
           if (this.Request.QueryString["type"] != null)
               HfType.Value = Request.QueryString["type"].ToString();
       }
       string _path = "";
       switch (HfType.Value)
       {
           case "animate":
               _path = "Animate/animate.svg";
               break;
           case "animateMotion":
               _path = "Animate/animateMotion.svg";
               break;
           case "animateTransform":
               _path = "Animate/animateTransform.svg";
               break;
           case "set":
               _path = "Animate/set.svg";
               break;
           case "flower":
               _path = "Flower/flower.svg";
               break;
           case "flowerSvg":
               _path = "Flower/flowerSvg.svg";
               break;
           //case "roate":
           //    _path = "Rotate/roate.svg";
           //    break;
           case "clipPath":
               _path = "clipPath.svg";
               break;
           case "DynamicAddPoints":
               _path = "DynamicAddPoints.svg";
               break;
           case "DrawLine":
               _path = "Drawing/DrawLine.svg";
               break;
           case "Bezier2":
               _path = "Drawing/Bezier2.svg";
               break;
           case "knife":
               _path = "knife.svg";
               break;
           case "MoveWithMouse":
               _path = "MoveWithMouse.svg";
               break;
           case "blockGame":
               _path = "blockGame.svg";
               break;
           case "graphs30":
               _path = "graphs30.svg";
               break;
           case "ripples6":
               _path = "ripples6.svg";
               break;
           case "stars3":
               _path = "stars3.svg";
               break;
           case "balloon":
               _path = "balloon.svg";
               break;
       }
       if (_path != "")
       {
           _path = Server.MapPath(_path);
       }
       System.IO.StreamReader myFile = new System.IO.StreamReader(_path, System.Text.Encoding.UTF8);
       //注意System.Text.Encoding.Default

       string myString = myFile.ReadToEnd();//myString是读出的字符串
       TextBox1.Text = myString;
       myFile.Close();
    }
  
   </script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="SVGDoc">
        <asp:TextBox ID="TextBox1" runat="server" TextMode="MultiLine" Width="90%" Height="800px"></asp:TextBox>
        <asp:HiddenField ID="HfType" runat="server" />
    </div>
    </form>
</body>
</html>
