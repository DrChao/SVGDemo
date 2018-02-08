﻿var svgDocument;
balloon = null;
count = 0
running = true
xlow = -200
xhigh = 100
x = xlow
incr = 5
dir = 1
xdir = 1
ydir = 1
xspeed = .7
yspeed = .4
xcur = 50
ycur = 50
ylow = -25
yhigh = 100
numlines = 35
rightedge = null
Hi = new Array()
Up = new Array()
bottomedge = null
svgns = 'http://www.w3.org/2000/svg';
xlinkns = 'http://www.w3.org/2000/xlink/namespace/';
function startup(evt) {
    O = evt.target
    O.setAttribute("onclick", "running=!running;animate()")
    svgDocument = O.ownerDocument;
    balloon = svgDocument.getElementById("balloon");
    path = svgDocument.getElementById("Q")
    A = getDisplaySize()
    rightedge = A.width
    bottomedge = A.height - 40
    sky = svgDocument.getElementById("sky")
    sky.setAttribute("cy", 50)
    sky.setAttribute("cx", rightedge / 2)
    sky.setAttribute("r", rightedge / 1.45)
    draw("peaks2", 7, 90, 30)
    draw("peaks", 10, 80, 25)
    draw("mountains", 15, 55, 22)
    draw("foothills", 22, 35, 15)

    moredraw();
}
function getDisplaySize() {
    //function due to G. Wade Johnson <svg-developers.yahoogroups.com>
    //Date: Mon, 12 Dec 2005 20:57:49 -0600
    //Subject: Re: [svg-developers] Screen extents
    var extents = null;
    try {
        var view = document.documentElement.viewport;
        extents = { width: view.width, height: view.height };
    }
    catch (e) {
        extents = { width: window.innerWidth, height: window.innerHeight };
    }
    return extents;
}
P = new Array()
offset = 50
function draw(id, humps, hi, up) {
    IDS[IDS.length] = id
    Hi[id] = hi
    Up[id] = up
    var peaks = 3 * humps
    P[id] = new Array;
    t = svgDocument.getElementById(id)
    for (i = 0; i < peaks; i++) {
        P[id][i] = { x: Math.floor(Math.random() * (rightedge + 2 * offset) - offset),
            y: Math.floor(Math.random() * hi) + up
        };
    }
    P[id].sort(compare)
    s = render(P[id], 0)
    t.setAttribute("d", s)
}
function compare(x, y) {
    if (x.x < y.x) return -1
    else return 1
}
function render(Arr, lo) {

    var low = Math.floor(bottomedge * .9)
    var s = "M " + (-offset) + " " + (low) + " "
    s += (7 - offset) + " " + (low - Arr[0].y) + " "
    for (i = 1; i < Arr.length; i++) {
        if ((i) % 3 == 0) s += "C " + Arr[i].x + " " + (low - Arr[i].y) + " "
        else
            s += Arr[i].x + " " + (low - Arr[i].y) + " "
    }
    s += "L " + (rightedge + offset) + " " + (low) + " Q " + (rightedge / 2) + " " + (low) + " " + (-offset) + " " + (low) + " z"
    return s
}
function moredraw() {
    for (j = 0; j < numlines; j++) another(100 + j * 10)
    Pa = svgDocument.createElementNS(svgns, "path");
    Pa.setAttribute("d", "M 194 340 C 185 360 215 360 206 340");
    Pa.setAttribute("stroke", "#440")
    Pa.setAttribute("stroke-width", "3")
    Pa.setAttribute("fill", "#551")
    balloon.appendChild(Pa);
    animate()
}
var xlinkns = "http://www.w3.org/2000/xlink/namespace/";
function another(x) {
    Pa = svgDocument.createElementNS(svgns, "path");
    Pa.setAttribute("id", "P" + count); count++
    Pa.setAttribute("d", "M 100 0 C 200 200 300 200 100 300");
    Pa.setAttribute("stroke", color(16, 16, 12))
    Pa.setAttribute("stroke-width", "5")
    Pa.setAttribute("fill", "none")
    balloon.appendChild(Pa);
}
function animate() {
    if (!running) return
    x += incr * dir
    if ((x < xlow + incr) || (x > xhigh + incr)) dir = -dir
    onestep(x)
    window.setTimeout("animate()", 10)
}
IDS = new Array
mea = 0
function onestep(x) {
    mea++
    balloon.setAttribute("transform", "translate(" + xcur + "," + ycur + ")")
    for (i = 0; i < count; i++) {
        Pa = svgDocument.getElementById("P" + i);
        Pa.setAttribute("d", "M 200 20 C " + ((i * 18) + x) + " 100 " + (220 - x / 2) + " 250 200 340 ");
    }
    adj = 0
    for (id in IDS) {
        for (j = 0; j < P[IDS[id]].length; j++) {
            P[IDS[id]][j].x -= (adj * adj / 4 + 1) / 2
        }
        adj++
        if (P[IDS[id]][3].x < 0) {
            st = rightedge + offset
            for (k = 0; k < 3; k++) {
                newx = st + Math.ceil(80 * Math.random() / P[IDS[id]].length)
                Q = { x: newx,
                    y: Math.floor(Math.random() * Hi[IDS[id]] + Up[IDS[id]])
                }
                st = newx
                P[IDS[id]].push(Q);
                R = P[IDS[id]].shift()
            }
        }
        s = render(P[IDS[id]], R.y)
        t = svgDocument.getElementById(IDS[id])
        t.setAttribute("d", s)
    }
    xcur = xcur + xspeed * xdir
    ycur = ycur + yspeed * ydir
    if ((xcur < xlow + 150) || (xcur > rightedge / 1.5)) xdir = -xdir
    if ((ycur < ylow) || (ycur > yhigh)) ydir = -ydir
    if (Math.floor(xcur) % 10 == 0) recolorone(color(16, 12, 8))
    if (Math.floor(xcur) % 20 == 1) recolorone(color(16, 16, 0))
    if (Math.floor(xcur) % 30 == 2) recolorone("#da0")
}
first = true
function recolorone(c) {
    r = Math.floor(Math.random() * count)
    Pa = svgDocument.getElementById("P" + r);
    Pa.setAttribute("stroke", c);
}
function color(xr, xg, xb) {
    r = Math.floor(Math.random() * xr)
    R = r.toString(16)
    g = Math.floor(Math.random() * xg)
    G = g.toString(16)
    b = Math.floor(Math.random() * xb)
    B = b.toString(16)
    return "#" + R + B + G
}