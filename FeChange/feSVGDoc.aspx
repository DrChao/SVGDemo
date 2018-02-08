<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="feSVGDoc.aspx.cs" Inherits="SVG.FeChange.feSVGDoc" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>濾鏡文檔</title>
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
           case "feColorMatrix":
               _path = "feColorMatrix.svg";
               break;
           case "feComponentTransfer":
               _path = "feComponentTransfer.svg";
               break;
           case "feComposite":
               _path = "feComposite.svg";
               break;
           case "feImage":
               _path = "feImage.svg";
               break;
           case "felend":
               _path = "felend.svg";
               break;
           case "feMorphology":
               _path = "feMorphology.svg";
               break;
           case "feTurbulence":
               _path = "feTurbulence.svg";
               break;
           case "filters00":
               _path = "filters00.svg";
               break;
           case "filters01":
               _path = "filters01.svg";
               break;
           case "filters02":
               _path = "gradient7.svg";
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
