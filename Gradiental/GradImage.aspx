<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GradImage.aspx.cs" Inherits="SVG.Gradiental.GradImage" %>

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
            case "lingrad":
                svgembed.Attributes["src"] = "lingrad01.svg";
                break;
            case "radgrad":
                svgembed.Attributes["src"] = "radgrad01.svg";
                break;
            case "mask":
                svgembed.Attributes["src"] = "mask01.svg";
                break;
            case "opacity":
                svgembed.Attributes["src"] = "opacity01.svg";
                break;
            case "background":
                svgembed.Attributes["src"] = "enable-background-01.svg";
                break;  
        }
    }
   </script>
    <title>線性漸變圖像</title>
  </head>
<body>
<form id="_myform1" runat="server">
<asp:HiddenField ID="HfType" runat="server" />
</form>
<embed id=svgembed height="100%" width="100%" pluginspage="http://www.adobe.com/svg/viewer/install/" runat="server" />
</body> 
</html>
