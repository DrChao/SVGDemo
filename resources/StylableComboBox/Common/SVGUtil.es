/*****
*
*   SVGUtil.es
*
*   Author: Antoine Quint
*
*****/

SVGUtil.VERSION = 0.1;

function SVGUtil () {};


/*****  Namespaces  *****/

SVGUtil.NS = {
	SVG: 'http://www.w3.org/2000/svg',
	XLink: 'http://www.w3.org/1999/xlink',
	XMLEvents: 'http://www.w3.org/2001/xml-events',
	XForms: 'www.w3.org/2002/01/xforms',
	FUI: 'http://xmlns.fuchsia-design.com/ui/',
	FD: 'http://xmlns.fuchsia-design.com/dynamics/'
};


/*****  JS Extensions  *****/

Array.prototype.hasItem = function (val) {
	var found = false;
	for (var i=0; i<this.length; i++) {
		if (this[i] === val) {
			found = true;
			break;
		}
	};
	return found;
};


/*****  SVG DOM routines  *****/

/*****
*
*   CreateElement
*
*****/
SVGUtil.CreateElement = function (name, attributes) {
	var str;
	if (arguments.length == 1) {
		str = '<' + name + ' />';
	} else if (arguments.length == 2) {
		var xmlStr = '';
		if (attributes.xml) {
			for (var i=0; i<attributes.xml.length; i++) {
				var attr = attributes.xml[i];
				xmlStr += attr[0] + '="' + attr[1] + '" ';
			}
		}
		if (attributes.css) {
			var cssStr = 'style="';
			for (var i=0; i<attributes.css.length; i++) {
				var prop = attributes.css[i];
				cssStr += prop[0] + ': ' + prop[1] + ';';
			}
			xmlStr += cssStr + '" ';
		}
		str = '<' + name + ' ' + xmlStr + '/>';
	}
	var fragment = parseXML(str, document);
	return fragment.firstChild;
};

/*****
*
*   CreateSVGPoint
*
*****/
SVGUtil.CreateSVGPoint = function (x,y) {
	var p = document.documentElement.createSVGPoint();
	p.x = x;
	p.y = y;
	return p;
};

/*****
*
*   CreateSVGRect
*
*****/
SVGUtil.CreateSVGRect = function (x,y,w,h) {
	return {
		x: x,
		y: y,
		width: w,
		height: h
	};
};

/*****
*
*   InsertAfter
*
*****/
SVGUtil.InsertAfter = function (newChild, refChild) {
	refChild.parentNode.insertBefore( newChild, (refChild?refChild.nextSibling:parent.firstChild) );
};


/*****  Mouse routines  *****/

/*****
*
*   GetClientMouseCoords
*
*****/
SVGUtil.GetClientMouseCoords = function (e) {
	return this.CreateSVGPoint(e.clientX, e.clientY);
};

/*****
*
*   GetMouseCoordsInContext
*
*****/
SVGUtil.GetMouseCoordsInContext = function (e, context) {
	var c = this.GetClientMouseCoords(e);
	var m = context.getScreenCTM().inverse();
	return c.matrixTransform(m);
};


/*****  Bounding box routines  *****/

/*****
*
*   DisplayBox
*
*****/
SVGUtil.DisplayBox = function (e) {
	var box = this.GetBBox(e.target);
	var attributes = {
		xml: [
			['x', box.x],
			['y', box.y],
			['width', box.width],
			['height', box.height]
		],
		css: [
			['stroke', 'red'],
			['stroke-width', '1px'],
			['fill', 'pink'],
			['fill-opacity', 0.5],
			['shape-rendering', 'optimizeSpeed'],
			['pointer-events', 'none']
		]
	};
	document.documentElement.appendChild(this.CreateElement('rect', attributes));
};

/*****
*
*   GetScreenBBox
*
*****/
SVGUtil.GetScreenBBox = function (elem) {
	var m = elem.getScreenCTM();
	return this.GetBBox(m, elem);
};

/*****
*
*   GetBBoxInContext
*
*****/
SVGUtil.GetBBoxInContext = function (elem, context) {
	var m = elem.getTransformToElement(context);
	return this.GetBBox(m, elem);
};

SVGUtil.GetBBox = function (m, elem) {
	var box;
	if (elem.shadowTree) {
		box = elem.shadowTree.getBBox();
	} else {
		box = elem.getBBox();
	}
	var corners = [];
	var point = this.CreateSVGPoint(box.x, box.y);
	corners.push( point.matrixTransform(m) );
	point.x = box.x + box.width;
	point.y = box.y;
	corners.push( point.matrixTransform(m) );
	point.x = box.x + box.width;
	point.y = box.y + box.height;
	corners.push( point.matrixTransform(m) );
	point.x = box.x;
	point.y = box.y + box.height;
	corners.push( point.matrixTransform(m) );
	var max = this.CreateSVGPoint(corners[0].x, corners[0].y);
	var min = this.CreateSVGPoint(corners[0].x, corners[0].y);
	for (var i = 1; i < corners.length; i++) {
		var x = corners[i].x;
		var y = corners[i].y;
		if (x < min.x) {
			min.x = x;
		} else if (x > max.x) {
			max.x = x;
		}
		if (y < min.y) {
			min.y = y;
		} else if (y > max.y) {
			max.y = y;
		}
	}
	return this.CreateSVGRect(min.x, min.y, max.x - min.x, max.y - min.y);
};

/*****
*
*   PrintSVGMatrix
*
*****/
SVGUtil.PrintSVGMatrix = function (m) {
	return 'matrix(' + m.a + ' ' + m.b + ' ' + m.c + ' ' + m.d + ' ' + m.e + ' ' + m.f + ')';
};

/*****
*
*   PrintSVGRect
*
*****/
SVGUtil.PrintSVGRect = function (r) {
	return r.x + ',' + r.y + ',' + r.width + ',' + r.height;
};

/*****
*
*   PrintSVGPoint
*
*****/
SVGUtil.PrintSVGPoint = function (p) {
	return p.x + ',' + p.y;
};
