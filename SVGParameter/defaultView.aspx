<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="defaultView.aspx.cs" Inherits="SVG.SVGParameter.defaultView" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<title></title>
    <script type="text/javascript">
        function GetLocationFromDocument (doc) {
            var parWindow = doc.defaultView ? doc.defaultView : doc.parentWindow;
            alert (parWindow.location.href);
        }

        function GetLocations () {
            var frameTags = document.getElementsByTagName ("iframe");
            for (var i = 0; i < frameTags.length; i++) {
                var frameTag = frameTags[i];

                var frameDoc = frameTag.contentDocument ? frameTag.contentDocument : frameTag.contentWindow.document;

                GetLocationFromDocument (frameDoc);
            }
        }
    </script>
    
    <script type="text/javascript">
        function AnalyzeLocation() {
            var message = "";
            message += "hash: " + location.hash + "\n";
            message += "host: " + location.host + "\n";
            message += "hostname: " + location.hostname + "\n";
            message += "href: " + location.href + "\n";
            message += "pathname: " + location.pathname + "\n";
            message += "port: " + location.port + "\n";
            message += "protocol: " + location.protocol + "\n";
            message += "search: " + location.search + "\n";

            alert(message);
        }
    </script>

</head>
<body>
    <iframe src="frame1.htm"></iframe>
    <iframe src="frame2.htm"></iframe>
    
    <br /><br />
    <button onclick="GetLocations ();">Get the location of the frames</button>
    <button onclick="AnalyzeLocation ();">Analyze the location of the current document</button>

</body>
</html>
