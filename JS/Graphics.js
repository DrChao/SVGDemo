﻿var xmlns = 'http://www.w3.org/2000/svg';
xlinkns = 'http://www.w3.org/1999/xlink';
nodenum = 0
threshold = .3 //proportion of connection nodes
THR = 100 //defeault threshold distance
Nodes = new Array()
Root = null
Words = null
D = document
Canvas = null
nodeW = 55
nodeH = 20

function start(evt) {

    Root = D.documentElement
    var T = D.getElementById("T")
    Words = T.firstChild.nodeValue.split(",")
    Canvas = D.getElementById("Canvas")
    Canvas.setAttribute("onmousedown", "newNode(evt)")
    try { BB = Canvas.getBBox() }
    catch (e) { BB = new Object; BB.height = 600; BB.width = 800 }
    makebuttons(0, 0, CLR, 0)
    makebuttons(100, 0, CLR, 1, "toggle")
    newGraph()
    movethem()
}

var Colors = new Array("#faa", "#faf", "#8af", "#aff", "#bf9", "#a8f", "#fa8")
function rebuild() {
    n = nodenum
    if (D.getElementsByTagName("rect").length > n) unbuild(n)
    makepoints(n)
    makelinks()
    build(n)
}
function newGraph() {
    nodenum = 20
    rebuild()
}
function makepoints(n) {
    wide = BB.width
    high = BB.height
    for (i = 0; i < n; i++) {
        y = Math.floor(Math.random() * (high - 2 * nodeH)) + nodeH
        x = Math.floor(Math.random() * (wide - nodeW))
        onepoint(i, x, y)
    }
}
var B
function movethem() {
    var moveNum = Math.floor(nodenum / 1.5)
    var A = new Array()
    B = new Array()
    for (var i = 0; i < nodenum; i++) A[i] = i
    for (var i = 0; i < moveNum; i++) {
        var r = Math.floor(Math.random() * A.length)
        B.push(A.splice(r, 1))
    }
    animate(B)
}
function animate() {
    for (var j = 0; j < B.length; j++) {
        var rx = Math.random() - .5
        var ry = Math.random() - .5
        Nodes[B[j]].xv += rx
        Nodes[B[j]].yv += ry
        if (Nodes[B[j]].xv > 4) Nodes[B[j]].xv -= 1
        else if (Nodes[B[j]].xv < -4) Nodes[B[j]].xv += 1
        if (Nodes[B[j]].yv > 4) Nodes[B[j]].yv -= 1
        else if (Nodes[B[j]].yv < -4) Nodes[B[j]].yv += 1
        if (Nodes[B[j]].x < 0) Nodes[B[j]].xv = 1
        else if (Nodes[B[j]].x > BB.width - nodeW) Nodes[B[j]].xv = -1
        if (Nodes[B[j]].y < 0) Nodes[B[j]].yv = 1
        else if (Nodes[B[j]].y > BB.height - nodeH) Nodes[B[j]].yv = -1
        Nodes[B[j]].x += Nodes[B[j]].xv
        Nodes[B[j]].y += Nodes[B[j]].yv

        var n = Nodes[B[j]].id
        var r = document.getElementById(n).firstChild
        r.setAttribute("x", Nodes[B[j]].x)
        r.setAttribute("y", Nodes[B[j]].y)
        t = r.nextSibling
        t.setAttribute("x", Nodes[B[j]].x + 5)
        t.setAttribute("y", Nodes[B[j]].y + nodeH - 5)
        dragrealign(n)
    }
    if (GlobalStatus == "travel") window.setTimeout("animate()", 20)
}
function Node(x, y, id, label, col) {
    this.x = x
    this.y = y
    this.id = id
    this.xv = 0
    this.yv = 0
    this.label = label
    this.col = col
    this.links = new Array()
    this.info = label
}
function onepoint(i, x, y) {
    r = Math.floor(Math.random() * Words.length)
    w = Words[r]
    Words.splice(r, 1)
    NB = new Node(x, y, i, w, Colors[i % Colors.length])
    Nodes.push(NB)
}
function build(n) {
    for (i = 0; i < n; i++) {
        buildone(i)
    }
}
function buildone(i) {
    var P = document.getElementById("prototype")
    var NB = Nodes[i]
    var id = NB.id
    var label = NB.label
    var G = P.cloneNode(true)
    G.setAttribute("id", id)
    var r = G.firstChild
    var t = r.nextSibling
    t.firstChild.nodeValue = label
    t.setAttribute("x", NB.x + 5)
    t.setAttribute("y", NB.y + nodeH - 5)
    r.setAttribute("x", NB.x);
    r.setAttribute("y", NB.y);
    r.setAttribute("id", id);
    r.setAttribute("fill", NB.col);
    G.setAttribute("onmousedown", "NodeClick(evt,'" + i + "')");
    G.setAttribute("onmouseover", "buttonSee(evt,'" + w + "')");
    G.setAttribute("onmouseout", "buttonSee(evt,'" + w + "')");
    Root.appendChild(G);
    s = "node " + i + " created: " + label + "\n"

}

function unbuild(n) {
    for (i = 0; i < n; i++) {
        removeLinesFirst(i)
        var N = D.getElementById(Nodes[i].id)
        Root.removeChild(N)
    }
    Nodes = new Array()
}
function removeLinesFirst(i) {
    for (var j in Nodes[i].links) {
        var k = Math.min(i, Nodes[i].links[j])
        var l = Math.max(i, Nodes[i].links[j])
        var L = D.getElementById("L" + k + ":" + l)
        try { Root.removeChild(L) }
        catch (err) { }
    }
}
function removeNode(n) {
    for (var j in Nodes[n].links) {
        var k = Math.min(n, Nodes[n].links[j])
        var l = Math.max(n, Nodes[n].links[j])
        var L = D.getElementById("L" + k + ":" + l)
        try { Root.removeChild(L) }
        catch (err) { }
        for (var m = 0; m < Nodes[n].links.length; m++)
            if (n == Nodes[n].links[m]) Nodes[n].links.splice(m, 1)
    }
    var N = D.getElementById(Nodes[n].id)
    Root.removeChild(N)
    Nodes[n].x = -1000
}
function reconnect() {
    for (i = 0; i < nodenum; i++) removeLinesFirst(i)
    makelinks()
    redrawNodes()
}
function redrawNodes() {
    for (i = 0; i < nodenum; i++) {
        try {
            var Q = D.getElementById(Nodes[i].id)
            var P = Q.cloneNode("true")
            Root.removeChild(Q)
            Root.appendChild(P)
        }
        catch (err) { }
    }
}
function makelinks() {
    Dist = new Array()
    for (i = 0; i < Nodes.length; i++) {
        for (j = i + 1; j < Nodes.length; j++) {
            var dx = Nodes[i].x - Nodes[j].x
            var dy = Nodes[i].y - Nodes[j].y
            var d = Math.sqrt(dx * dx + dy * dy)
            Dist.push(d)
        }
    }
    Dist = Dist.sort(function(x, y) { return x - y })
    var T = Dist[Math.floor(Dist.length * threshold)]
    THR = T
    for (i = 0; i < Nodes.length; i++) {
        for (j = i + 1; j < Nodes.length; j++) {
            var dx = Nodes[i].x - Nodes[j].x
            var dy = Nodes[i].y - Nodes[j].y
            var d = Math.sqrt(dx * dx + dy * dy)
            if (d < T) makeLine(i, j)
        }
    }

}
function makeLine(m, n) {
    if (alreadyLine(m, n)) {
        removeLine(m, n)
        return
    }
    var L = D.createElementNS(xmlns, "path");
    x1 = Nodes[m].x + nodeW / 2
    x2 = Nodes[n].x + nodeW / 2
    y1 = Nodes[m].y + nodeH / 2
    y2 = Nodes[n].y + nodeH / 2
    L.setAttribute("d", "M " + x1 + " " + y1 + " " + x2 + " " + y2)
    L.setAttribute("stroke", "black")
    L.setAttribute("stroke-width", 1)
    if (m < n) L.setAttribute("id", "L" + m + ":" + n)
    else L.setAttribute("id", "L" + n + ":" + m)
    Nodes[m].links.push(n)
    Nodes[n].links.push(m)
    Root.appendChild(L)
}

function buttonSee(evt) {
    var i = evt.currentTarget.id
    var b = document.getElementById(i)
    adjust(evt, b)
}
first = true
selectedNode = -1
function connectNode(n) {
    if (first) {
        first = false
        selectedNode = n
        selectNode(n, "grey")
    }
    else {
        first = true
        if (alreadyLine(n, selectedNode)) {
            removeLine(n, selectedNode)
        }
        else finishLine(n, selectedNode)
        enddrag(selectedNode)
    }
}
function removeLine(n1, n2) {
    var k = Math.min(n1, n2)
    var l = Math.max(n1, n2)

    var L = D.getElementById("L" + k + ":" + l)
    try { Root.removeChild(L) }
    catch (err) { }

    for (var m = 0; m < Nodes[n2].links.length; m++)
        if (n1 == Nodes[n2].links[m]) Nodes[n2].links.splice(m, 1)
    for (var m = 0; m < Nodes[n1].links.length; m++)
        if (n2 == Nodes[n1].links[m]) Nodes[n1].links.splice(m, 1)
}
function finishLine(n1, n2) {
    makeLine(n1, n2)
    rebuildNode(n1)
    rebuildNode(n2)
}
function selectNode(n, c) {
    var b = document.getElementById(n)
    b.firstChild.setAttribute("opacity", .5)
    b.firstChild.setAttribute("fill", c)
    b.setAttribute("stroke-width", 3)
    b.firstChild.nextSibling.setAttribute("fill", "red")
    b.setAttribute("onmouseover", null);
    b.setAttribute("onmouseout", null);
    selectedNode = n

}

function NodeClick(evt, n) {
    if (selectedNode > -1) {
        if (selectedNode == n)
            finishLine(selectedNode, n)
    }
    selectNode(n, "grey")
    var x = evt.clientX;
    var y = evt.clientY;
    var offsetx = x - Nodes[n].x
    var offsety = y - Nodes[n].y
    Root.setAttribute("onmousemove", "drag(evt," + n + "," + offsetx + "," + offsety + ")")
    Root.setAttribute("onmouseup", "enddrag(" + n + "," + Nodes[n].x + "," + Nodes[n].y + ")")
}

function drag(evt, n, x, y) {
    var i = Nodes[n].id
    var r = document.getElementById(i).firstChild
    r.setAttribute("x", (evt.clientX - x))
    r.setAttribute("y", (evt.clientY - y))
    t = r.nextSibling
    t.setAttribute("x", evt.clientX - x + 5)
    t.setAttribute("y", evt.clientY - y + nodeH - 5)
    Nodes[n].x = evt.clientX - x
    Nodes[n].y = evt.clientY - y
    if (GlobalStatus == "normal") draglinks(n)
    else dragrealign(n)
}

function draglinks(n) {
    for (var j in Nodes[n].links) {
        var k = n
        var l = Nodes[n].links[j]
        if (Nodes[n].links[j] < n) {
            var k = Nodes[n].links[j]
            var l = n
        }
        var L = D.getElementById("L" + k + ":" + l)
        x1 = Nodes[n].x + nodeW / 2
        y1 = Nodes[n].y + nodeH / 2
        x2 = Nodes[Nodes[n].links[j]].x + nodeW / 2
        y2 = Nodes[Nodes[n].links[j]].y + nodeH / 2
        try {
            L.setAttribute("d", "M " + x1 + " " + y1 + " " + x2 + " " + y2)
        }
        catch (err) { }
    }
}
function alreadyLine(n1, n2) {
    var linestat = true
    var k = Math.min(n1, n2)
    var l = Math.max(n1, n2)
    try { //determine if a line already exists
        L = D.getElementById("L" + k + ":" + l)
        var dq = L.getAttribute("d")
    }
    catch (err) { linestat = false }
    return linestat
}
function dragrealign(n) {
    for (var j = 0; j < nodenum; j++) {
        if (j == n) continue
        var dx = Nodes[n].x - Nodes[j].x
        var dy = Nodes[n].y - Nodes[j].y
        var d = Math.sqrt(dx * dx + dy * dy)
        linestat = alreadyLine(j, n)
        var k = Math.min(j, n)
        var l = Math.max(j, n)
        if (d < THR) {
            if (linestat) {
                var x1 = Nodes[n].x + nodeW / 2
                var y1 = Nodes[n].y + nodeH / 2
                var x2 = Nodes[j].x + nodeW / 2
                var y2 = Nodes[j].y + nodeH / 2
                L.setAttribute("d", "M " + x1 + " " + y1 + " " + x2 + " " + y2)
            }
            else finishLine(k, l)
        }
        else {
            if (linestat) {
                Root.removeChild(L)
                for (var k = 0; k < Nodes[n].links.length; k++)
                    if (j == Nodes[n].links[k]) Nodes[n].links.splice(k, 1)
            }
        }
    }
}
function rebuildNode(n) {
    var i = Nodes[n].id
    var N = document.getElementById(i)
    var NN = N.cloneNode(true)
    Root.removeChild(N)
    Root.appendChild(NN)
    unSelect(n)
}
function enddrag(n, beginx, beginy) {
    var dx = beginx - Nodes[n].x
    var dy = beginy - Nodes[n].y
    distance = Math.abs(dx) + Math.abs(dy)
    var subtle = 10
    Root.setAttribute("onmousemove", null)
    Root.setAttribute("onmouseup", null)
    if (distance < subtle) { selectNode(n, "yellow") }
    else unSelect(n)
}
function unSelect(n) {
    var N = document.getElementById(n)
    //alert(Nodes[n].label)
    var r = N.firstChild
    r.setAttribute("opacity", 1)
    r.setAttribute("fill", Nodes[n].col)
    N.setAttribute("stroke-width", 1)
    r.nextSibling.setAttribute("fill", "black")
    N.setAttribute("onmouseover", "buttonSee(evt)");
    N.setAttribute("onmouseout", "buttonSee(evt)");
    selectedNode = -1
}

function adjust(evt, b) {
    var r = b.firstChild
    if (evt.type == "mouseover") {
        r.setAttribute("opacity", .5)
        r.setAttribute("stroke", "black")
        r.nextSibling.setAttribute("fill", "red")
    } else {
        r.setAttribute("opacity", 1)
        r.setAttribute("stroke", "red")
        r.nextSibling.setAttribute("fill", "black")
    }
}

CLR = new Array("grey", "red", "blue", "purple")
buttons = new Array()
buttons[0] = new Array("menu", "rebuild", "reconnect", "newGraph")
buttons[1] = new Array("mode", "travel", "realign", "normal")
var GlobalStatus = buttons[1][1]
var bwidth = 98
var barheight = 20
function makebuttons(x, y, colors, B, tog) {
    var n = buttons[B].length
    if (tog == "toggle") onebutton(0, x + 100, y, "red", B, tog, buttons[B][1])
    for (var i = 0; i < n; i++) {
        onebutton(i, x, y, colors[i % colors.length], B, tog)
    }
    b = D.createElementNS(xmlns, "rect");
    b.setAttribute("x", x - 4);
    b.setAttribute("y", y - 4);
    b.setAttribute("width", bwidth + 8)
    b.setAttribute("height", barheight * buttons[B].length + 8);
    b.setAttribute("fill", "none");
    b.setAttribute("stroke", "grey")
    b.setAttribute("stroke-width", 8)
    b.setAttribute("visibility", "hidden")
    b.setAttribute("onmouseover", "menu('hidden'," + B + ")")
    b.setAttribute("id", "menu" + B)
    D.documentElement.appendChild(b)
}
function onebutton(i, x, y, C, B, tog, togname) {

    var g = D.createElementNS(xmlns, "g");
    var b = D.createElementNS(xmlns, "rect");
    var t = D.createElementNS(xmlns, "text");
    if (togname != null) {
        tv = D.createTextNode(togname);
        g.setAttribute("id", buttons[B][0])
    }
    else {
        tv = D.createTextNode(buttons[B][i]);
        g.setAttribute("id", "b" + B + ":" + i)
    }
    t.setAttribute("x", x + 20)
    t.setAttribute("y", y + i * barheight + 15)
    t.setAttribute("fill", "black")
    t.setAttribute("font-size", 18)
    t.setAttribute("font-family", "garamond")
    t.appendChild(tv)
    b.setAttribute("x", x);
    b.setAttribute("y", y + i * barheight);
    b.setAttribute("width", bwidth)
    b.setAttribute("height", barheight);
    b.setAttribute("fill", C);
    b.setAttribute("opacity", .2)
    var s = ""
    if (i > 0) {
        g.setAttribute("visibility", "hidden")
        if (tog == "toggle") {
            var M = "menu('hidden'," + B + ");setStatus(" + i + ",'" + buttons[B][0] + "')"
            g.setAttribute("onclick", M);
        }
        else {
            var M = "menu('hidden'," + B + ");eval(" + buttons[B][i] + "('" + s + "'))"
            g.setAttribute("onclick", M);
        }
    }
    else {
        s = "visible"
        g.setAttribute("onclick", "menu('visible'," + B + ")");
    }
    g.setAttribute("onmouseover", "hilight(evt)")
    g.setAttribute("onmouseout", "hilight(evt)")
    g.appendChild(b);
    g.appendChild(t);
    D.documentElement.appendChild(g)
}

function setStatus(i, id) {
    var B = buttons[1][i]
    togDisplay = D.getElementById(id)
    togDisplay.firstChild.nextSibling.firstChild.nodeValue = B
    GlobalStatus = B
    if (B == "travel") movethem()
}

function newNode(evt) {
    if (selectedNode > -1) { unSelect(selectedNode); return }
    onepoint(nodenum, evt.clientX, evt.clientY)
    buildone(nodenum)
    nodenum++
}
function hilight(evt) {
    var o = evt.currentTarget
    if (evt.type == "mouseover") {
        o.firstChild.setAttribute("opacity", .5)
        o.firstChild.nextSibling.setAttribute("fill", "white")
    }
    else {
        o.firstChild.setAttribute("opacity", .2)
        o.firstChild.nextSibling.setAttribute("fill", "black")
    }
}
function menu(s, B) {
    for (var i = 1; i < buttons[B].length; i++) {
        D.getElementById("b" + B + ":" + i).setAttribute("visibility", s)
    }
    D.getElementById("menu" + B).setAttribute("visibility", s)
}
