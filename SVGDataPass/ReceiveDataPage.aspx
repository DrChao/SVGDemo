<!-- Filename squarecircle.aspx -->
<%@Page Language="C#" Debug="true"%>
<%
Response.AddHeader("Content-Type","image/svg-xml");
//int w=200,h=60,r=40;
int w,h,r;
w = Int32.Parse(Request["w"]);
h = Int32.Parse(Request["h"]);
r = Int32.Parse(Request["r"]);

Response.Write ("<svg>");
Response.Write ("<rect x='10' y='10' width='"+ w +"' height='"+h+"' stroke='red' fill='blue' />");
Response.Write ("<circle cx='100' cy='40' r='"+ r +"' stroke='red' fill='blue' />");
Response.Write ("</svg>");
%>



