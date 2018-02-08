

var ElectoralData=function(){
	
	this.imageSaveScript="Resources/FusionChartsSave.aspx";
	this.toWin=0;
	this.activeState="";
	this.activeParty="";
	this.PD=new Object();
	this.SD=new Object();
	this.XML="";



	this.init();

}

ElectoralData.prototype = {
    init: function() {

        this.toWin = 270;
        this.PD = this.initPartyData();
        this.SD = this.initStateData();

    },
    initPartyData: function() {
        var parties = new Object();

        parties["D"] = { val: 1, name: "Gora-Lieberman", color: "1E61D1", total: 0 };
        parties["Rp"] = { val: 2, name: "Bush-Cheney", color: "CC0000", total: 0 };
        parties["G"] = { val: 3, name: "Nader-La_Duke", color: "AEC965", total: 0 };
        parties["Rf"] = { val: 4, name: "Buchanan-Foster", color: "F3B40B", total: 0 };
        parties["clear"] = { val: 0, name: "Unalloted", color: "DBEAF3", total: 0 };

        return parties;
    },

    initStateData: function() {
        var StateData = new Object();
        StateData.AL = { name: "Alabama", seats: 9, winner: "Rp" };
        StateData.AK = { name: "Alaska", seats: 3, winner: "Rp" };
        StateData.AZ = { name: "Arizona", seats: 8, winner: "Rp" };
        StateData.AR = { name: "Arkansas", seats: 6, winner: "Rp" };
        StateData.CA = { name: "California", seats: 54, winner: "D" };
        StateData.CO = { name: "Colorado", seats: 8, winner: "Rp" };
        StateData.CT = { name: "Connecticut", seats: 8, winner: "D" };
        StateData.DC = { name: "District of Columbia", seats: 3, winner: "D" };
        StateData.DE = { name: "Delaware", seats: 3, winner: "D" };
        StateData.FL = { name: "Florida", seats: 25, winner: "Rf" };
        StateData.GA = { name: "Georgia", seats: 13, winner: "G" };
        StateData.HI = { name: "Hawaii", seats: 4, winner: "D" };
        StateData.ID = { name: "Idaho", seats: 4, winner: "Rp" };
        StateData.IL = { name: "Illinois", seats: 22, winner: "Rf" };
        StateData.IN = { name: "Indiana", seats: 4, winner: "Rp" };
        StateData.IA = { name: "Iowa", seats: 7, winner: "D" };
        StateData.KS = { name: "Kansas", seats: 6, winner: "Rp" };
        StateData.KY = { name: "Kentucky", seats: 8, winner: "Rp" };
        StateData.LA = { name: "Louisiana", seats: 9, winner: "Rp" };
        StateData.ME = { name: "Maine", seats: 4, winner: "G" };
        StateData.MD = { name: "Maryland", seats: 10, winner: "D" };
        StateData.MA = { name: "Massachusetts", seats: 12, winner: "G" };
        StateData.MI = { name: "Michigan", seats: 18, winner: "Rf" };
        StateData.MN = { name: "Minnesota", seats: 10, winner: "G" };
        StateData.MS = { name: "Mississippi", seats: 7, winner: "Rp" };
        StateData.MO = { name: "Missouri", seats: 11, winner: "Rp" };
        StateData.MT = { name: "Montana", seats: 3, winner: "Rp" };
        StateData.NE = { name: "Nebraska", seats: 5, winner: "Rp" };
        StateData.NV = { name: "Nevada", seats: 4, winner: "Rp" };
        StateData.NH = { name: "New Hampshire", seats: 4, winner: "G" };
        StateData.NJ = { name: "New Jersey", seats: 15, winner: "G" };
        StateData.NM = { name: "New Mexico", seats: 5, winner: "D" };
        StateData.NY = { name: "New York", seats: 33, winner: "D" };
        StateData.NC = { name: "North Carolina", seats: 14, winner: "Rp" };
        StateData.ND = { name: "North Dakota", seats: 3, winner: "Rp" };
        StateData.OH = { name: "Ohio", seats: 21, winner: "Rf" };
        StateData.OK = { name: "Oklahoma", seats: 8, winner: "Rp" };
        StateData.OR = { name: "Oregon", seats: 7, winner: "D" };
        StateData.PA = { name: "Pennsylvania", seats: 23, winner: "D" };
        StateData.RI = { name: "Rhode Island", seats: 4, winner: "D" };
        StateData.SC = { name: "South Carolina", seats: 8, winner: "Rp" };
        StateData.SD = { name: "South Dakota", seats: 3, winner: "Rp" };
        StateData.TN = { name: "Tennessee", seats: 11, winner: "Rp" };
        StateData.TX = { name: "Texas", seats: 32, winner: "Rp" };
        StateData.UT = { name: "Utah", seats: 5, winner: "Rp" };
        StateData.VT = { name: "Vermont", seats: 3, winner: "D" };
        StateData.VA = { name: "Virginia", seats: 13, winner: "Rp" };
        StateData.WA = { name: "Washington", seats: 11, winner: "G" };
        StateData.WV = { name: "West Virginia", seats: 5, winner: "Rp" };
        StateData.WI = { name: "Wisconsin", seats: 11, winner: "Rf" };
        StateData.WY = { name: "Wyoming", seats: 3, winner: "Rp" };



        return StateData;
    },

    getMapXML: function() {
        var s;
        var id = value = toolText = JSLink = color = dValue = "";
        var XML = "";

        XML += "<map imageSave='1' imageSaveURL='" + this.imageSaveScript + "' exposeHoverEvent='1' includeValueInLabels='1' showShadow='0' showBevel='0' animation='0' borderColor='FFFFFF' showCanvasBorder='0' hoverColor='dfdfdf' legendPosition='BOTTOM'>";
        XML += "<colorRange>";

        for (var i in this.PD) {
            //<color minValue='0' maxValue='500' displayValue='Sparsely Populated' color='A7E9BC' />
            XML += "<color minValue='" + this.PD[i]["val"] + "' maxvalue='" + (this.PD[i]["val"] + 1) + "' color='" + this.PD[i]["color"] + "' displayValue='" + this.PD[i]["name"] + "' />";
        }
        XML += "</colorRange>";

        XML += "<data>";
        for (var i in this.SD) {
            s = this.SD[i];
            id = i;
            value = this.PD[s.winner].val;
            dValue = i + " " + s.seats;
            toolText = s.name + "(" + s.seats + ")";
            JSLink = 'Javascript:activeState(&quot;' + i + '&quot;);'
            XML += "<entity id='" + id + "' value='" + value + "' displayValue='" + dValue + "' tooltext='" + toolText + "' link='" + JSLink + "' font='tahoma' fontSize='10' fontBold='1' />";
        }

        XML += "</data>";
        XML += "</map>";

        return XML;

    },
    calculateVotes: function() {
        var p, s;
        for (var i in this.PD) {
            p = this.PD[i];
            p.total = 0;
        }

        for (var i in this.SD) {
            s = this.SD[i];
            p = this.PD[s.winner];
            p.total += s.seats;
        }
    },

    getStackedXML: function() {
        var p;
        var XML;
        var catXML = dXML1 = dXMl2 = "";

        this.calculateVotes();

        catXML = "<categories>";
        dXML1 = "<dataset>";
        //		dXML2="<dataset seriesName='Additional Votes Required to win' color='DFDFDF'>";
        dXML2 = "<dataset color='DFDFDF'>";
        for (var i in this.PD) {
            p = this.PD[i];
            if (i != "clear") {
                catXML += "<category label='" + p.name + "' />";
                dXML1 += "<set value='" + (p.total <= 0 ? "" : (p.total > 270 ? 270 : p.total)) + "' color='" + p.color + "' tooltext='" + p.name + " (" + i + ")-" + p.total + "'/>";
                dXML2 += "<set value='" + (this.toWin - p.total <= 0 ? "" : this.toWin - p.total) + "' tooltext='Short of " + (this.toWin - p.total) + " Votes'/>";
            }
        }
        catXML += "</categories>";
        dXML1 += "</dataset>";
        dXML2 += "</dataset>";
        XML = "<chart adjustDiv='0' animation='0' showBorder='0' bgColor='FFFFFF' showPlotBorder='1' canvasborderColor='ffffff' canvasBorderThickness='1' showValues='0' showLabels='0' use3DLighting='0'  showLegend='0' showCanvasBg='0' showYAxisValues='0' numdivLines='0' yAxisMaxValue='270' plotBorderColor='ffffff' plotFillColor='eaeaea,ffffff' plotFillRatio='25,75' chartLeftMargin='40' chartRightMargin='40' chartTopMargin='0' chartBottomMargin='0'>" + catXML + dXML1 + dXML2 + "</chart>";


        return XML;

    },

    getPieXML: function() {
        var p;
        var toolText;
        var XML;

        this.calculateVotes();

        XML = "<chart showPlotBorder='1' plotBorderColor='ffffff' plotBorderThickness='2' animation='0' showValues='0' showLabels='0' showPercentInToolTip='0' showZeroPies='0' showBorder='0' bgAlpha='100' bgColor='ffffff' chartLeftMargin='0' chartRightMargin='0' chartTopMargin='0' chartBottomMargin='0' use3DLighting='0' pieRadius='55'>";
        for (var i in this.PD) {
            p = this.PD[i];
            toolText = (i != "clear" ? p.name + " (" + i + ")-" + p.total : "Unalloted Votes");
            XML += "<set label='" + p.name + "' value='" + (p.total <= 0 ? 0 : p.total) + "' color='" + p.color + "' tooltext='" + toolText + "'/>";
        }
        XML += "<styles><definition><style type='shadow' name='noShadow' alpha='0'/></definition><application><apply toObject='DATAPLOT' styles='noShadow' /></application></styles></chart>";

        return XML;

    },

    activateState: function(id) {
        if (id != "" && id != null && typeof id != "undefined")
            this.activeState = id;
        else
            this.activeState = "";
    },
    activateParty: function(id) {
        if (id != "" && id != null && typeof id != "undefined")
            this.activeParty = id;
        else
            this.activeParty = "";
    },

    applyPrediction: function() {
        if (this.activeState != "") {
            if (this.activeParty != "") {
                this.SD[this.activeState].winner = this.activeParty;
            }

        }

    },

    getPartyData: function() {
        var data = new Object();
        var p;

        this.calculateVotes();

        for (var i in this.PD) {
            p = this.PD[i];
            if (i != "clear") {
                data[i] = { total: (p.total <= 0 ? 0 : p.total), needed: (this.toWin - p.total <= 0 ? 0 : this.toWin - p.total) };
            }
        }

        return data;
    },

    setMapSaveAsImageURL: function(URL) {
        this.imageSaveScript = URL;
    }




}
