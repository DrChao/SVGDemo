<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GraphicCtrl.aspx.cs" Inherits="SVG.SVGGraphic.GraphicCtrl" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>SVG圖表</title>

    <script language="Javascript" type="text/javascript">

        function Populate() {
            // Data taken from http://www.undp.org/popin/wdtrends/pop1998

            window.addChartValue(1255698, "China", true)
            window.addChartValue(982223, "India", true)
            window.addChartValue(274028, "United States of America", true)
            window.addChartValue(206338, "Indonesia", true)
            window.addChartValue(165851, "Brazil", true)
            window.addChartValue(148166, "Pakistan", true)
            window.addChartValue(147434, "Russian Federation", true)
            window.addChartValue(126281, "Japan", true)
            window.addChartValue(106409, "Nigeria", true)
            window.addChartValue(95831, "Mexico", false)
            window.setTitle("World Populations ca. 1998")
            window.setAxis("1000's of people")
        }

    </script>

</head>
<body>
    <form id="inputform" runat="server">
    <div>
        <embed src="chart.svgz" width="625" height="392.5" type="image/svg+xml">
    </div>
    <table>
        <tr>
            <td>
                <b>Value:</b>
            </td>
            <td>
                <input type="text" name="number" value="" size="8"/>
            </td>
            <td>
                <b>Label:</b>
            </td>
            <td>
                <input type="text" name="item" value="" size="16"/>
            </td>
            <td>
                <input type="button" value="Add Value" onclick="window.addChartValue(document.inputform.number.value, document.inputform.item.value, false)"/>
            </td>
            <td>
                <input type="button" value="Auto Populate" onclick="Populate()"/>
            </td>
            <td>
                <input type="button" value="Delete" onclick="window.deleteOuties()"/>
            </td>
            <td>
                <input type="button" value="Clear" onclick="window.clearChart()"/>
            </td>
        </tr>
    </table>
    </form>
</body>
</html>
