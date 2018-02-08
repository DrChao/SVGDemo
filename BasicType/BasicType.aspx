<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BasicType.aspx.cs" Inherits="SVG.BasicType.BasicType" %>

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
            case "circle":
                svgembed.Attributes["src"] = "circle.svg";
                break;
            case "ellipse":
                svgembed.Attributes["src"] = "ellipse.svg";
                break;
            case "rect":
                svgembed.Attributes["src"] = "rect.svg";
                break;
            case "polygon":
                svgembed.Attributes["src"] = "polygon.svg";
                break;
            case "polyline":
                svgembed.Attributes["src"] = "polyline.svg";
                break;
            case "marker":
                svgembed.Attributes["src"] = "marker.svg";
                break;
            case "pattern":
                svgembed.Attributes["src"] = "pattern.svg";
                break;
            case "tiger":
                svgembed.Attributes["src"] = "tiger.svg";
                break;
            case "PowerStation":
                svgembed.Attributes["src"] = "PowerStation.svg";
                break;
            case "map":
                svgembed.Attributes["src"] = "map.svg";
                break;
            case "pattern1":
                svgembed.Attributes["src"] = "flowers.svg";
                break;
                
        }
    }
   </script>
    <title>基本形狀</title>
  </head>
<body>
<form id="_myform1" runat="server">
<asp:HiddenField ID="HfType" runat="server" />
</form>
<embed id=svgembed height="100%" width="100%" pluginspage="http://www.adobe.com/svg/viewer/install/" runat="server" />
</body> 
</html>
