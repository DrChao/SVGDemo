/*****
*
*   Button.es
*
*   Author: Antoine Quint
*
*****/

Button.VERSION = 0.1;

Button.prototype = new RCCBase();
Button.prototype.Class = Button;
Button.Super = RCCBase.prototype;

Button.Events = {
	PRESS 	: 'ButtonPress',
	RELEASE	: 'ButtonRelease',
	ACTIVATE: 'ButtonActivate',
};

function Button () {};

Button.prototype.Init = function () {
	this.ShadowRoot = null;
	this.Graphics = null;
	this.Skin = null;
	this.MouseOver = false;
	this.Bounds = null;
	this.Disabled = (this.Element.getAttribute('state') == 'disabled');

	this.Build();
};

Button.prototype.Build = function () {
	this.ShadowRoot = this.Element.shadowTree.appendChild(SVGUtil.CreateElement('svg'));
	this.ShadowRoot.setAttribute('preserveAspectRatio', 'none');
	this.Graphics = this.ShadowRoot.appendChild(SVGUtil.CreateElement('use'));
	this.Graphics.addEventListener('mouseover', this, false);
	this.Graphics.addEventListener('mouseout', this, false);
	this.Graphics.addEventListener('mousedown', this, false);
	this.Element.addEventListener('DOMAttrModified', this, false);
};

Button.prototype.Pressed = function () {
	this.Element.setAttribute('state', 'active');
	this.DispatchEvent(this.Class.Events.PRESS);
};

Button.prototype.Released = function () {
	this.Element.setAttribute('state', 'normal');
	this.DispatchEvent(this.Class.Events.RELEASE);
};

Button.prototype.Activated = function () {
	this.Element.setAttribute('state', 'normal');
	this.DispatchEvent(this.Class.Events.ACTIVATE);
};

Button.prototype.Enable = function () {
	this.Disabled = false;
	this.ShadowRoot.style.setProperty('pointer-events', 'inherit');
};

Button.prototype.Disable = function () {
	this.Disabled = true;
	this.ShadowRoot.style.setProperty('pointer-events', 'none');
};


/*****  Events  *****/

Button.prototype.DispatchEvent = function(type) {
	var e = document.createEvent(type);
	this.Element.dispatchEvent(e);
};

Button.prototype.HandleSVGBindEnd = function (e) {
	this.SetGeometry('x', this.Element.getAttribute('x'));
	this.SetGeometry('y', this.Element.getAttribute('y'));
	this.SetGeometry('width', this.Element.getAttribute('width'));
	this.SetGeometry('height', this.Element.getAttribute('height'));
	this.SetSkin(this.Element.getAttribute('skin'));
};

Button.prototype.Handlemousedown = function (e) {
	this.Pressed();
	this.MouseOver = true;
	this.Graphics.addEventListener('mousemove', this, false);
	this.Graphics.addEventListener('mouseup', this, false);
	captureMouse(e, this.Graphics);
};

Button.prototype.Handlemouseup = function (e) {
	this.Released();
	if (this.MouseOver) {
		this.Activated();
	}
	this.Graphics.removeEventListener('mousemove', this, false);
	this.Graphics.removeEventListener('mouseup', this, false);	
};

Button.prototype.Handlemouseover = function (e) {
	if (!this.Disabled)
		this.Element.setAttribute('state', 'hover');	
};

Button.prototype.Handlemouseout = function (e) {
	if (!this.Disabled)
		this.Element.setAttribute('state', 'normal');
};

Button.prototype.Handlemousemove = function (e) {
	if (!this.Disabled) {
		var m = SVGUtil.GetMouseCoordsInContext(e, this.Graphics);
		var b = this.Bounds;
		if (m.x > b.x && m.x < b.x + b.width && m.y > b.y && m.y < b.y + b.height) {
			if (!this.MouseOver) {
				this.Pressed();
				this.MouseOver = true;
			}
		} else {
			if (this.MouseOver) {
				this.Released();
				this.MouseOver = false;
			}
		}
	}
};

Button.prototype.HandleDOMAttrModified = function (e) {
	var n = e.attrName;
	if (n == 'x' || n == 'y' || n == 'width' || n == 'height') {
		this.SetGeometry(e.attrName, e.newValue);
	} else if (n == 'state') {
		this.SetState(e.newValue);
	} else if (n == 'skin') {
		this.SetSkin(e.newValue);
	}
};


/*****  Refresh  *****/

Button.prototype.SetGeometry = function (name, value) {
	this.ShadowRoot.setAttribute(name, value);	
};

Button.prototype.SetSkin = function (id) {
	this.Skin = id + '_';
	var skin = document.getElementById(id.substr(1));
	var w = skin.getAttributeNS(SVGUtil.NS.FUI, 'width');
	var h = skin.getAttributeNS(SVGUtil.NS.FUI, 'height');
	this.Bounds = SVGUtil.CreateSVGRect(0,0,w,h);
	this.ShadowRoot.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
	if (this.Element.hasAttribute('state')) {
		this.SetState(this.Element.getAttribute('state'));
	} else {
		this.SetState('normal');
	}
};

Button.prototype.SetState = function (state) {
	this.Graphics.setAttributeNS(SVGUtil.NS.XLink, 'href', this.Skin + state);
	if (state == 'disabled') {
		this.Disable();
	} else if (this.Disabled) {
		this.Enable();
	}
};
