/*****
*
*   RCCBase.es
*
*   Author: Antoine Quint
*
*****/

RCCBase.VERSION = 0.1;

RCCBase.Instances = [];

RCCBase.RegisterInstance = function (handler, element) {
	var e = new handler();
	e.Element = element;
	e.Style = {};
	e.Id = this.Instances.length;
	e.Element.setAttributeNS(SVGUtil.NS.FUI, 'id', e.Id);
	e.Element.addEventListener('SVGBindEnd', e, false);
	e.Init();
	this.Instances.push(e);
};

RCCBase.GetInstance = function (element) {
	var id = element.getAttributeNS(SVGUtil.NS.FUI, 'id');
	return this.Instances[id];
};

function RCCBase () {};

RCCBase.prototype.toString = function () {
	return 'Instance of <' + this.Element.nodeName + '> with id ' + this.Id;
};

RCCBase.prototype.handleEvent = function(e) {
	var handler = 'Handle' + e.type;
	if ( this[handler] == null ) {
		alert("Unsupported event: " + e.type);
	} else {
		this[handler](e);
	}
};
