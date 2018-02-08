/////////////////////////////////
// Copyright Adobe System 2001 //
/////////////////////////////////
// Chemeleon v1.0              //
// --------- ----              //
// Conceived, Designed and     //
// Written by Paul Hounshell   //
/////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
// Global Variables                                                              //
// ------ ---------                                                              //
//                                                                               //
// FontScalar         - Defines font size.  This is the font which will be used  //
//                      for any text at exactly 0 in the plane coming directly   //
//                      out of the monitor (z).  Text further back is smaller    //
//                      (font size becomes 0 at negative infinity) and nearer    //
//                      text becomes larger (font size infinite at the camera).  //
//                                                                               //
//                      Default: 10                                              //
//                      Range:   0 - Infinite                                    //
//                                                                               //
//                                                                               //
// ChargeScale        - This determines the size of any charges present on an    //
//                      atom.  This number is what fraction of the atom's font   //
//                      size this charge should be.                              //
//                                                                               //
//                      Default: 0.8                                             //
//                      Range:   0 - 1                                           //
//                                                                               //
//                                                                               //
// Dimensions         - Defines the maximum size any dimension can occupy.  Any  //
//                      screen element can be guaranteed to be within twice this //
//                      value of the origin.                                     //
//                                                                               //
//                      Default: 200                                             //
//                      Range:   0 - Infinite                                    //
//                                                                               //
//                                                                               //
// CameraDistance     - Defines exactly how far the camera is from the origin.   //
//                      This is used for proper depth scaling.  Increasing it    //
//                      flattens things out while decreasing it causes depth     //
//                      perception to be more pronounced.                        //
//                                                                               //
//                      Default: Dimensions * 2                                  //
//                      Range:   0 - Infinite                                    //
//                                                                               //
//                                                                               //
// HitherPlane        - This is a virtual wall at which point no object may come //
//                      any closer to the camera.  Any objects which attempt to  //
//                      are snapped back to this distance (in display space      //
//                      only).                                                   //
//                                                                               //
//                      Default: CameraDistance / 20                             //
//                      Range:   0 - CameraDistance                              //
//                                                                               //
//                                                                               //
// MouseScalar        - This provides a translation between mouse movements      //
//                      (whose measurements are in pixels) to amounts of         //
//                      rotation.                                                //
//                                                                               //
//                      Default: .005                                            //
//                      Range:   0 - 1                                           //
//                                                                               //
//                                                                               //
// MinMouseSpeed      - This defines the minimum speed of the mouse necessary    //
//                      for "throw" mode to be activated upon release.  Any      //
//                      mouse movement below this threshold is considered a full //
//                      stop, any value above indicates that object should       // 
//                      spinning.  This is after the MouseScalar is calculated.  //
//                                                                               //
//                      Default: .01                                             //
//                      Range:   0 - 1                                           //
//                                                                               //
//                                                                               //
// MouseMoveAverage   - Defines the weight of the most recent mouse movement     //
//                      when averaging these values over time.  The larger this  //
//                      value, the more influence recent mouse movements have.   //
//                      This only gets used when throwing an object.             //
//                                                                               //
//                      Default: .3                                              //
//                      Range:   0 - 1                                           //
//                                                                               //
//                                                                               //
// MaxRotationalSpeed - This is the maximum amount the structure may rotate in a //
//                      given cycle.  Any mouse movements greater than this are  //
//                      truncated as the object is rotated.                      //
//                                                                               //
//                      Default: .04                                             //
//                      Range:   0 - 1                                           //
//                                                                               //
//                                                                               //
// RotationsPerCycle  - This is the number of times that the rotation is         //
//                      calculated per cycle.  More calculations lead to less    //
//                      structure degradation over time, though naturally take   //
//                      longer to process and require more system resources.     //
//                                                                               //
//                      Default: 5                                               //
//                      Range:   1 - Infinity                                    //
//                                                                               //
//                                                                               //
// ApproachRange      - This number specifies how close to the desired spot the  //
//                      structure should continue rotating at it's original      //
//                      speed.  An ApproachRange of 0 would indicate that the    //
//                      structure should stop rotating abruptly, while larger    //
//                      values indicate that it should drift to a stop.          //
//                                                                               //
//                      Default: 3 * RotationsPerCycle                           //
//                      Range:   0 - Infinity                                    //
//                                                                               //
//                                                                               //
// BondSpread         - This value indicates how much a bond with a strength     //
//                      greater than 1 should spread.  A spread of 0 would       //
//                      indicate that all bonds should be displayed as single    //
//                      bonds, whereas otherwise double and triple bonds would   //
//                      appear as two or three lines respectively. This is also  //
//                      used to calculate how close a bond should come to the    //
//                      atoms at either end to prevent difficulty reading atoms. //
//                                                                               //
//                      Default: 3                                               //
//                      Range:   0 - Infinity                                    //
//                                                                               //
//                                                                               //
// MinTunIncrement   - This value is used to determine whether or not a         //
//                      structure has ceased rotating.  If the current rotation  //
//                      if below this value, the change is minor enough that the //
//                      structure has for all purposes stopped and the scripted  //
//                      animation need not be running.                           //
//                                                                               //
//                      Default: .0001                                           //
//                      Range:   0 - MaxRotationalSpeed                          //
//                                                                               //
//                                                                               //
// ShadowDistance     - This determines exactly how far away from the structure  //
//                      the shadow lies on the screen.  This methodology is only //
//                      used to calculate the angle of the shadow.  Exact        //
//                      placement is done by the SVG group the shadows reside    //
//                      in.  A Distance of -1 indicates that shadows should not  //
//                      be drawn at all.                                         //
//                                                                               //
//                      Default: Dimensions / 4                                  //
//                      Range:   -1, 0 - Infinity                                //
//                                                                               //
// ShowCarbons        - Boolean flag determining whether or not normal carbon    //
//                      atoms should be displayed.  If not displayed, the        //
//                      structure should rotate quicker.  Also note that any     //
//                      atypical carbon atoms (isotopes or charged atoms) will   //
//                      be displayed anyway.                                     //
//                                                                               //
//                      Default: true                                            //
//                      Range:   true, false                                     //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////



var FontScalar = 10                    //字體標量
var ChargeScale = 0.8		             //電荷量
var Dimensions = 200                   //尺寸
var CameraDistance = Dimensions * 2        //攝像距離
var HitherPlane = CameraDistance / 20   //偏轉平面
var MouseScalar = .005                  //鼠標量
var MinMouseSpeed = .01                   //最小鼠標速度
var MouseMoveAverage = .3                    //鼠標平均移動速度
var MaxRotationalSpeed = .05			         //最大旋轉速度
var RotationsPerCycle = 4                     //旋轉週期
var ApproachRange = 3 * RotationsPerCycle //範圍
var BondSpread = 3                     //共價鍵長度
var MinTurnIncrement = .0001			     //最小的旋轉增量
var ShadowDistance = Dimensions / 4		 //陰影距離
var ShowCarbons = true			       //是否顯示碳元素

var SVGDocument = null

var Rotating = true

var Scale = 1

var XOffset = 0
var YOffset = 0
var ZOffset = 0

var MinX = 0
var MaxX = 0
var MinY = 0
var MaxY = 0
var MinZ = 0
var MaxZ = 0

var Theta = 0;
var Phi = 0;

var ThrownTheta = 0;
var ThrownPhi = 0;

var Atoms = new Array();
var Bonds = new Array();


function Initialize(LoadEvent) {
    SVGDocument = LoadEvent.getTarget().getOwnerDocument();
    GenerateStructure();
}



function Atom(x, y, z, Element, Charge, Isotope) {
    FixRange(x, y, z)

    if (x != null) this.x = x;
    if (y != null) this.y = y;
    if (z != null) this.z = z;
    if (Charge != null) this.charge = Charge;
    if (Isotope != null) this.isotope = Isotope;

    if ((isNaN(1 * Element)) && (Element != ""))
        this.element = Element;
    else
        this.element = "C";

    Atypical = (!(this.element == "C"))

    this.SVG = SVGDocument.createElement("text");

    if ((Isotope != null) && (Isotope >= 0)) {
        this.SVGisotope = SVGDocument.createElement("tspan");
        this.SVGisotope.setAttribute("dy", "-5");
        this.SVGisotope.appendChild(SVGDocument.createTextNode(Isotope));
        this.SVG.appendChild(this.SVGisotope)

        ElementText = SVGDocument.createElement("tspan");
        ElementText.setAttribute("dy", "5");
        ElementText.appendChild(SVGDocument.createTextNode(Element));
        this.SVG.appendChild(ElementText)

        Atypical = true
    }
    else
        this.SVG.appendChild(SVGDocument.createTextNode(Element))


    if ((Charge != null) && (Charge != 0)) {
        Sign = ""
        if (Charge > 0) Sign = "+"

        this.SVGcharge = SVGDocument.createElement("tspan");
        this.SVGcharge.setAttribute("dy", "-5");
        this.SVGcharge.appendChild(SVGDocument.createTextNode(Sign + Charge));
        this.SVG.appendChild(this.SVGcharge)

        Atypical = true
    }

    if ((Atypical) || (ShowCarbons))
        SVGDocument.getElementById("atoms").appendChild(this.SVG);
    else
        this.SVG = null

    Atoms[Atoms.length] = this;

    this.refresh();

    return this;
}

Atom.prototype.x = 0;
Atom.prototype.y = 0;
Atom.prototype.z = 0;
Atom.prototype.charge = 0;
Atom.prototype.isotope = -1;
Atom.prototype.bonds = new Array();
Atom.prototype.element = "";
Atom.prototype.SVGcharge = null;
Atom.prototype.atomicNumber = null;
Atom.prototype.displayPhi = 0;
Atom.prototype.displayTheta = 0;
Atom.prototype.distanceScalar = 1;

Atom.prototype.refresh = Atom_Refresh;
Atom.prototype.fixCoords = Atom_FixCoordinates;
Atom.prototype.calculateRotation = Atom_CalculateRotation


function Atom_FixCoordinates() {
    this.x += XOffset;
    this.y += YOffset;
    this.z += ZOffset;

    this.x = this.x * Scale;
    this.y = this.y * Scale;
    this.z = this.z * Scale;

    this.calculateRotation();

    this.refresh()
}

function Atom_Refresh() {
    oldx = this.x
    oldy = this.y

    this.calculateRotation();

    if (this.SVG != null) {
        this.SVG.setAttribute("transform", "translate(" + this.displayX + ", " + this.displayY + ")");
        this.SVG.setAttribute("style", "font-size:" + (this.displayZ));
    }

    if (this.charge != 0)
        this.SVGcharge.getStyle().setProperty("font-size", (this.displayZ * ChargeScale));

    if (this.isotope != -1)
        this.SVGisotope.getStyle().setProperty("font-size", (this.displayZ * ChargeScale));

    return ((oldx != this.x) || (oldy != this.y))
}

function Atom_CalculateRotation() {
    var clipTheta = true;
    var clipPhi = true;

    for (var I = 1; I < RotationsPerCycle; I++) {
        dTheta = Theta - this.displayTheta;
        dPhi = Phi - this.displayPhi;


        if ((dTheta > MaxRotationalSpeed * ApproachRange) || (dTheta < MaxRotationalSpeed * ApproachRange * -1))
            dTheta = max(min(dTheta, MaxRotationalSpeed), MaxRotationalSpeed * -1)
        else if ((dTheta < MinTurnIncrement) && (dTheta > MinTurnIncrement * -1))
            dTheta = 0
        else {
            dTheta = dTheta / ApproachRange
            clipTheta = false;
        }
        this.displayTheta += dTheta

        if ((dPhi > MaxRotationalSpeed * ApproachRange) || (dPhi < MaxRotationalSpeed * ApproachRange * -1))
            dPhi = max(min(dPhi, MaxRotationalSpeed), MaxRotationalSpeed * -1)
        else if ((dPhi < MinTurnIncrement) && (dPhi > MinTurnIncrement * -1))
            dPhi = 0
        else {
            dPhi = dPhi / ApproachRange
            clipPhi = false;
        }
        this.displayPhi += dPhi


        this.x += dTheta * this.z;
        this.y += dPhi * this.z;
        this.z -= (dTheta * this.x) + (dPhi * this.y);
    }

    if (clipTheta)
        this.displayTheta = Theta - dTheta * (ApproachRange - 1)

    if (clipPhi)
        this.displayPhi = Phi - dPhi * (ApproachRange - 1)

    z = this.z
    if (z < HitherPlane - CameraDistance) {
        z = HitherPlane - CameraDistance
    }

    DistanceScalar = CameraDistance / (z + CameraDistance)

    this.distanceScalar = DistanceScalar

    this.displayX = this.x * DistanceScalar
    this.displayY = this.y * DistanceScalar
    this.displayZ = DistanceScalar * FontScalar
}








function Bond(Atom1, Atom2, Strength) {

    this.left = Atom1;
    this.right = Atom2;

    if (Strength != null) this.strength = Strength;

    this.SVG = new Array()
    this.SVGgroup = SVGDocument.createElement("g")

    for (var I = 0; I < Strength; I++) {
        this.SVG[I] = SVGDocument.createElement("line");
        this.SVGgroup.appendChild(this.SVG[I]);
    }

    if (ShadowDistance >= 0) {
        this.shadow = SVGDocument.createElement("line");
        SVGDocument.getElementById("shadows").appendChild(this.shadow)
    }

    SVGDocument.getElementById("bonds").appendChild(this.SVGgroup)

    Bonds[Bonds.length] = this;

    this.refresh();

    return this;
}

Bond.prototype.strength = 1;

Bond.prototype.refresh = Bond_Refresh;



function Bond_Refresh() {
    ox1 = this.right.displayX
    oy1 = this.right.displayY
    ox2 = this.left.displayX
    oy2 = this.left.displayY

    dx = ox2 - ox1
    dy = oy2 - oy1
    dz = Math.sqrt(dx * dx + dy * dy)

    c = BondSpread / dz

    if (this.right.SVG != null) {
        x1 = ox1 + dx * c * 2
        y1 = oy1 + dy * c * 2
    }
    else {
        x1 = ox1
        y1 = oy1
    }
    if (this.left.SVG != null) {
        x2 = ox2 - dx * c * 2
        y2 = oy2 - dy * c * 2
    }
    else {
        x2 = ox2
        y2 = oy2
    }

    if (this.strength >= 1) {
        this.SVG[0].setAttribute("x1", x1);
        this.SVG[0].setAttribute("y1", y1);
        this.SVG[0].setAttribute("x2", x2);
        this.SVG[0].setAttribute("y2", y2);
    }

    if (this.strength >= 2) {
        this.SVG[1].setAttribute("x1", x1 - dy * c);
        this.SVG[1].setAttribute("y1", y1 + dx * c);
        this.SVG[1].setAttribute("x2", x2 - dy * c);
        this.SVG[1].setAttribute("y2", y2 + dx * c);
    }

    if (this.strength >= 3) {
        this.SVG[2].setAttribute("x1", x1 + dy * c);
        this.SVG[2].setAttribute("y1", y1 - dx * c);
        this.SVG[2].setAttribute("x2", x2 + dy * c);
        this.SVG[2].setAttribute("y2", y2 - dx * c);
    }

    if (ShadowDistance >= 0) {
        this.shadow.setAttribute("x1", ox1);
        this.shadow.setAttribute("y1", (ShadowDistance * this.right.distanceScalar - ShadowDistance));
        this.shadow.setAttribute("x2", ox2);
        this.shadow.setAttribute("y2", (ShadowDistance * this.left.distanceScalar - ShadowDistance));
    }
}







function RefreshScreen() {
    for (var I = 0; I < Atoms.length; I++) {
        Atoms[I].fixCoords()
    }

    for (var I = 0; I < Bonds.length; I++) {
        Bonds[I].refresh();
    }
}


function FixRange(x, y, z) {
    if (x < MinX) MinX = x;
    if (x > MaxX) MaxX = x;
    if (y < MinY) MinY = y;
    if (y > MaxY) MaxY = y;
    if (z < MinZ) MinZ = z;
    if (z > MaxZ) MaxZ = z;

    XRange = MaxX - MinX
    YRange = MaxY - MinY
    ZRange = MaxZ - MinZ

    Range = max(max(XRange, YRange), ZRange)

    if (Range == 0)
        Range = Dimensions

    Scale = Dimensions / Range

    XOffset = XRange / 2 - MaxX
    YOffset = YRange / 2 - MaxY
    ZOffset = ZRange / 2 - MaxZ
}



function max(a, b) {
    if (a > b)
        return a
    else
        return b
}


function min(a, b) {
    if (a < b)
        return a
    else
        return b
}


Mouse_LastX = null
Mouse_LastY = null

Mouse_dX = null
Mouse_dY = null


function MouseDown(MouseEvent) {
    Mouse_LastX = MouseEvent.getScreenX()
    Mouse_LastY = MouseEvent.getScreenY()
    Mouse_dX = 0
    Mouse_dY = 0
    ThrownTheta = 0
    ThrownPhi = 0
    if (!(Rotating)) {
        Rotating = true
        Rotate()
    }
}

function MouseMove(MouseEvent) {
    if ((Mouse_LastX != null) && (Mouse_LastY != null)) {
        Mouse_dX = ((1.0 - MouseMoveAverage) * Mouse_dX)
                    		+ (MouseMoveAverage * ((MouseEvent.getScreenX() - Mouse_LastX) * MouseScalar))
        Mouse_dY = ((1.0 - MouseMoveAverage) * Mouse_dY)
                    		+ (MouseMoveAverage * ((MouseEvent.getScreenY() - Mouse_LastY) * MouseScalar))

        Theta -= Mouse_dX
        Phi -= Mouse_dY

        Mouse_LastX = MouseEvent.getScreenX()
        Mouse_LastY = MouseEvent.getScreenY()
    }
}

function MouseUp(MouseEvent) {
    if ((Mouse_LastX != null) && (Mouse_LastY != null)) {
        ThrownTheta = Mouse_dX
        ThrownPhi = Mouse_dY
        if ((ThrownTheta < MinMouseSpeed) && (ThrownTheta > (MinMouseSpeed * -1))
                     && (ThrownPhi < MinMouseSpeed) && (ThrownPhi > (MinMouseSpeed * -1))) {
            ThrownTheta = 0
            ThrownPhi = 0
        }
    }

    Mouse_LastX = null
    Mouse_LastY = null
}



function Rotate() {
    debugger;
    MovementMade = false

    for (var I = 0; I < Atoms.length; I++) {
        JustMoved = Atoms[I].refresh()
        MovementMade = MovementMade || JustMoved
    }

    for (var I = 0; I < Bonds.length; I++) {
        Bonds[I].refresh();
    }

    Theta -= ThrownTheta
    Phi -= ThrownPhi

    if ((MovementMade) || (ThrownTheta != 0) || (ThrownPhi != 0) || (Mouse_LastX != null))
        setTimeout("window.rotate()", 50)
    else
        Rotating = false
}

window.rotate = Rotate








function SetName(NameString) {
    SVGDocument.getElementByID("name").appendChild(SVGDocument.createTextNode(NameString))
}





function SetFormula(FormulaString) {
    if (FormulaString != "") {
        Chunks = FormulaString.split(" ")

        for (var I = 0; I < Chunks.length; I++) {
            firstChar = -1
            secondDigit = -1

            for (var J = 0; J < Chunks[I].length; J++) {
                if ((firstChar < 0) && (!(isDigit(Chunks[I].charAt(J)))))
                    firstChar = J

                if ((firstChar >= 0) && (secondDigit < 0) && (isDigit(Chunks[I].charAt(J))))
                    secondDigit = J
            }

            NormalText = Chunks[I].substring(0, secondDigit)
            SubscrText = Chunks[I].substring(secondDigit, Chunks[I].length)


            SVGDocument.getElementByID("formula").appendChild(SVGDocument.createTextNode(" " + NormalText))

            if (SubscrText != "") {
                NewSpan = SVGDocument.createElement("tspan")
                NewSpan.setAttribute("style", "baseline-shift:sub;font-size:12")
                NewSpan.appendChild(SVGDocument.createTextNode(SubscrText))
            }

            SVGDocument.getElementByID("formula").appendChild(NewSpan)
        }
    }
}





function isDigit(Character) {
    return ((Character >= "0") && (Character <= "9"))
}