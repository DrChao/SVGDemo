<%@Page Language="C#"%>
<html>
 <head>
  <script language="C#" runat="server">
   void Page_Load(Object Sender, EventArgs E)   {
    }
   void ButtonClicked(Object Sender, EventArgs E) {
       svgembed.Attributes["src"] = "ReceiveDataPage.aspx?w=" + width.Text + "&h=" + height.Text + "&r=" + radius.Text + "&.svg";	
   }
   </script>
    <title>Parameter Passing Example</title>
  </head>
<body>
<h1> ASPX form to update SVG file - Parameter Passing Example </h1>
<h2> Enter Width & Height for Rectangle & Radius for Circle </h2>

<form id="_myform1" runat="server">
   Width <ASP:TextBox id="width" runat="server" /><br />
   Height <ASP:TextBox id="height" runat="server" /><br />
   Radius <ASP:TextBox id="radius" runat="server" /><br />

   <asp:Button ID="button" runat="server" OnClick="ButtonClicked" Text="update" Width="60" /><br />
</form>
<%if (Page.IsPostBack)		{  %>
	<embed id=svgembed height="400" width="300" pluginspage="http://www.adobe.com/svg/viewer/install/" runat="server" />
<% } %>
</body> 
</html>