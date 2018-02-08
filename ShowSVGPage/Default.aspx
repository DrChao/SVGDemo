<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SVG.ShowSVGPage.Default" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>化學元素</title>
</head>
<%--方式一--%>
<%--   <frameset rows="150,*" cols="*" frameborder="no" border="0" framespacing="0">
         <frame src="index.html" name="NavFrame" frameborder="no" scrolling="No"  noresize="noresize" id="mainFrame" title="mainFrame" />
         <frame name="body" frameborder="no" id="body"  />
     </frameset>
<noframes>
    <body>
    </body>
</noframes>--%>

<%--方式二--%>
<body>
    <p>
        <embed src="../SVGFile/cml2svg_hdr.svgz" width="640" height="90" type="image/svg+xml" />
    </p>
    <iframe name="body" frameborder="0" id="body" width="100%" height="100%" />
</body>
</html>
