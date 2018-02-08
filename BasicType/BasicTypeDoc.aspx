<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BasicTypeDoc.aspx.cs" Inherits="SVG.BasicType.BasicTypeDoc" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title></title>
    <script language="javascript" type="text/javascript">
        
        </script>
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
           case "circle":
               _path = "circle.svg";
               break;
           case "ellipse":
               _path = "ellipse.svg";
               break;
           case "rect":
               _path = "rect.svg";
               break;
           case "polygon":
               _path = "polygon.svg";
               break;
           case "polyline":
               _path = "polyline.svg";
               break;
           case "marker":
               _path = "marker.svg";
               break;
           case "pattern":
               _path = "pattern.svg";
               break;
           case "tiger":
               _path = "tiger.svg";
               break;
           case "map":
               _path = "map.svg";
               break;
           case "PowerStation":
               _path = "PowerStation.svg";
               break;
           case "pattern1":
               _path = "flowers.svg";
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
        <%--<asp:Button ID="BtnModify" runat="server" Text="修改" OnClientClick=""/>--%>
        <asp:TextBox ID="TextBox1" runat="server" TextMode="MultiLine" Width="90%" Height="800px"></asp:TextBox>
        <asp:HiddenField ID="HfType" runat="server" />
    </div>
    </form>
</body>
</html>