<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SVG.Default" %>


<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>SVG演示</title>
    
</head>
  <frameset name="myFrame" cols="199,7,*" frameborder="no" border="0" framespacing="0">
    <frame src="Frame/LeftFrame.aspx" name="leftFrame" frameborder="no" scrolling="No" noresize="noresize" id="leftFrame" title="leftFrame" />
	<frame src="Frame/toolBar.aspx" name="midFrame" frameborder="no" scrolling="No" noresize="noresize" id="midFrame" title="midFrame" />
    <frameset rows="59,*" cols="*" frameborder="no" border="0" framespacing="0">
         <frame src="Frame/MainFrame.aspx" name="mainFrame" frameborder="no" scrolling="No"  noresize="noresize" id="mainFrame" title="mainFrame" />
         <frame src="BasicType/BasicType.aspx?type=tiger" name="manFrame" frameborder="no" id="manFrame"  />
     </frameset>
  </frameset>
<noframes>
    <body>
    </body>
</noframes>
</html>
