<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GradDoc.aspx.cs" Inherits="SVG.Gradiental.GradDoc" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>線性漸變文檔</title>
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
           case "lingrad":
               _path = "lingrad01.svg";
               break;
           case "radgrad":
               _path = "radgrad01.svg";
               break;
           case "mask":
               _path = "mask01.svg";
               break;
           case "opacity":
               _path = "opacity01.svg";
               break;
           case "background":
               _path = "enable-background-01.svg";
               break;
       }
       if (_path != "")
       {
           _path = Server.MapPath(_path);
       }
       System.IO.StreamReader myFile = new System.IO.StreamReader(_path, System.Text.Encoding.UTF8);
       //注意System.Text.Encoding.Default filters02

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
