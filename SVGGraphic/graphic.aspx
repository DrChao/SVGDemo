<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="graphic.aspx.cs" Inherits="SVG.SVGGraphic.graphic" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>graphic圖表</title>
    <script language="Javascript" type="text/javascript">

        function Populate() {
            // Data taken from http://www.census.gov/ipc/www/worldhis.html


            window.addChartValue(170, 1, true)
            window.addChartValue(190, 200, true)
            window.addChartValue(190, 400, true)
            window.addChartValue(190, 500, true)
            window.addChartValue(200, 600, true)
            window.addChartValue(207, 700, true)
            window.addChartValue(220, 800, true)
            window.addChartValue(226, 900, true)
            window.addChartValue(254, 1000, true)
            window.addChartValue(301, 1100, true)
            window.addChartValue(360, 1200, true)
            window.addChartValue(400, 1250, true)
            window.addChartValue(360, 1300, true)
            window.addChartValue(443, 1340, true)
            window.addChartValue(350, 1400, true)
            window.addChartValue(425, 1500, true)
            window.addChartValue(545, 1600, true)
            window.addChartValue(470, 1650, true)
            window.addChartValue(600, 1700, true)
            window.addChartValue(629, 1750, true)
            window.addChartValue(813, 1800, true)
            window.addChartValue(1128, 1850, true)
            window.addChartValue(1550, 1900, true)
            window.addChartValue(1750, 1910, true)
            window.addChartValue(1860, 1920, true)
            window.addChartValue(2070, 1930, true)
            window.addChartValue(2300, 1940, true)
            window.addChartValue(2400, 1950, false)

            window.setTitle("World Population")
            window.setAxes("Population (1,000,000's of people)", "Year")
        }

    </script>
</head>
<body>
    <form id="inputform" runat="server">
    <div>
    <embed src="graphic.svgz" width="625.5" height="393" type="image/svg+xml">
    </div>
    <table>
			<tr>
				<td><b>Vertical:</b></td>
				<td><input type="text" name="number" value="" size="8"/></td>
				<td><b>Horizontal:</b></td>
				<td><input type="text" name="item" value="" size="16"/></td>
				<td><input type="button" value="Add Value" onclick="window.addChartValue(document.inputform.number.value, document.inputform.item.value, false)"/></td>
				<td><input type="button" value="Auto Populate" onclick="Populate()"/></td>
			</tr>
		</table>
    </form>
</body>
</html>
