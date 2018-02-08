<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FeSVGImage.aspx.cs" Inherits="SVG.FeChange.FeSVGImage" %>

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
            case "feColorMatrix":
                svgembed.Attributes["src"] = "feColorMatrix.svg";
                break;
            case "feComponentTransfer":
                svgembed.Attributes["src"] = "feComponentTransfer.svg";
                break;
            case "feComposite":
                svgembed.Attributes["src"] = "feComposite.svg";
                break;
            case "feImage":
                svgembed.Attributes["src"] = "feImage.svg";
                break;
            case "felend":
                svgembed.Attributes["src"] = "felend.svg";
                break;
            case "feMorphology":
                svgembed.Attributes["src"] = "feMorphology.svg";
                break;
            case "feTurbulence":
                svgembed.Attributes["src"] = "feTurbulence.svg";
                break;
            case "filters00":
                svgembed.Attributes["src"] = "filters00.svg";
                break;
            case "filters01":
                svgembed.Attributes["src"] = "filters01.svg";
                break;
            case "filters02":
                svgembed.Attributes["src"] = "gradient7.svg";
                break;
        }
    }
   </script>
    <title>濾鏡圖像</title>
  </head>
<body>
<form id="_myform1" runat="server">
<asp:HiddenField ID="HfType" runat="server" />
</form>
<embed id=svgembed height="100%" width="100%" pluginspage="http://www.adobe.com/svg/viewer/install/" runat="server" />
</body> 
</html>
