/*****
*
*   ComboBox.es
*
*   Author: Antoine Quint
*
*****/

ComboBox.VERSION = 0.1;

ComboBox.prototype = new RCCBase();
ComboBox.prototype.Class = ComboBox;
ComboBox.Super = RCCBase.prototype;

ComboBox.Events = {
	SELECT 		: 'ComboBoxItemSelect',
	HIGHLIGHT	: 'ComboBoxItemHighlight'
};

function ComboBox () {};

ComboBox.prototype.Init = function () {
	this.ShadowRoot = this.Element.shadowTree;
	this.Disabled = (this.Element.getAttribute('state') == 'disabled');

	this.Bg = this.ShadowRoot.getElementById('comboBox_bg');
	this.Entry = this.ShadowRoot.getElementById('comboBox_entry');
	this.Text = this.ShadowRoot.getElementById('comboBox_text');
	this.Button = this.ShadowRoot.getElementById('comboBox_button');

	this.Pane = this.ShadowRoot.getElementById('comboBox_pane');
	this.PaneBg = this.ShadowRoot.getElementById('comboBox_pane_bg');
	this.PaneHighlight = this.ShadowRoot.getElementById('comboBox_pane_highlight');
	this.ItemsContainer = this.ShadowRoot.getElementById('comboBox_items_container');

	this.PaneBounds = null;
	this.Items = [];
	this.HighlightedItem = null;
	this.SelectedItem = null;
	
	this.Disabled = (this.Element.getAttribute('state') == 'disabled');

	if (this.Disabled) {
		this.Disable();
	} else {
		this.Enable();
	}

	this.RefreshStyle();
	this.BuildPane();
	this.HidePane();
};

/*****  Build  *****/

ComboBox.prototype.BuildPane = function () {
	var found = null;
	var items = this.Element.getElementsByTagNameNS(SVGUtil.NS.FUI, 'item');
	for (var i=0; i <items.length; i++) {
		var item = items.item(i);
		var text = document.createElement('text');
		text.appendChild(document.createTextNode(item.firstChild.data));
		text.setAttribute('x', this.Style.ItemBorder);
		text.setAttribute('y', (this.Items.length + 1) * this.Style.ItemHeight);
		text.setAttribute('style', 'fill:' + this.Style.TextColorNormal);
		this.ItemsContainer.appendChild(text);
		this.Items.push({text: text, item: item});
		if (item.hasAttribute('selected')) {
			if (item.getAttribute('selected') == 'true') {
				found = i;
			}
		}
	}
	if (found != null) {
		this.SelectItem(found);
	}
};

/*****  Disable/Enable  *****/

ComboBox.prototype.Enable = function () {
	this.Disabled = false;
	this.ShadowRoot.style.setProperty('pointer-events', 'inherit');
	this.Bg.style.setProperty('stroke', '#09A');
	this.Button.setAttribute('state', 'normal');
	this.Text.style.setProperty('fill', 'black')
	this.RefreshStyle();
};

ComboBox.prototype.Disable = function () {
	this.Disabled = true;
	this.ShadowRoot.style.setProperty('pointer-events', 'none');
	this.Bg.style.setProperty('stroke', '#A3A3A3');
	this.Text.style.setProperty('fill', '#A3A3A3')
	this.Button.setAttribute('state', 'disabled');
	this.HidePane();
};

/*****  Highlight  *****/

ComboBox.prototype.HighlightItem = function (pos) {
	if (this.HighlightedItem != pos) {
		this.UnHighlight();
		this.Items[pos].text.style.setProperty('fill', this.Style.TextColorHighlight);
		this.PaneHighlight.setAttribute('display', 'inline');
		this.PaneHighlight.setAttribute('y', this.Style.ItemBorder + pos * this.Style.ItemHeight);	
		this.HighlightedItem = pos;
		this.DispatchEvent(this.Class.Events.HIGHLIGHT, this.Items[pos].item);
	}
};

ComboBox.prototype.UnHighlight = function () {
	if (this.HighlightedItem != null) {
		this.Items[this.HighlightedItem].text.style.setProperty('fill', this.Style.TextColorNormal);
		this.HighlightedItem = null;
	}
};

ComboBox.prototype.HideHighlight = function () {
	this.PaneHighlight.setAttribute('display', 'none');
	this.UnHighlight();
};

ComboBox.prototype.SelectItem = function (pos) {
	if (this.SelectedItem != null) {
		if (this.SelectedItem.item.hasAttribute('selected')) {
			if (this.SelectedItem.item.getAttribute('selected') == 'true') {
				this.SelectedItem.item.removeAttribute('selected');
			}
		}
	}	
	this.SelectedItem = this.Items[pos];
	this.Text.firstChild.data = this.SelectedItem.text.firstChild.data;
	this.SelectedItem.item.setAttribute('selected', 'true');
	this.DispatchEvent(this.Class.Events.SELECT, this.SelectedItem.item);
};

/*****  Show / Hide / Enable / Disable  *****/

ComboBox.prototype.ShowPane = function () {
	this.HideHighlight();
	this.Pane.setAttribute('display', 'inline');
	this.Button.style.setProperty('pointer-events', 'none');
};

ComboBox.prototype.HidePane = function () {
	this.Pane.setAttribute('display', 'none');
	this.Button.style.setProperty('pointer-events', 'inherit');
};

/*****  Events  *****/

ComboBox.prototype.DispatchEvent = function (type, item) {
	var e = document.createEvent(type);
	e.item = item;
	this.Element.dispatchEvent(e);
}

ComboBox.prototype.HandleSVGBindEnd = function (e) {
	this.RefreshPosition();
	this.RefreshSize();
	this.Element.addEventListener('DOMAttrModified', this, false);
	this.Element.addEventListener('DOMNodeInserted', this, false);
	this.Button.addEventListener('ButtonActivate', this, false);
	for (var i=0; i<this.Items.length; i++) {
		var item = this.Items[i].item;
		item.addEventListener('DOMCharacterDataModified', this, false);
	}
};

ComboBox.prototype.HandleButtonActivate = function (e) {
	this.ShowPane();	
	this.EnablePaneEvents();
};

ComboBox.prototype.Handlemousemove = function (e) {
	var c = SVGUtil.GetMouseCoordsInContext(e, this.PaneBg);
	var pos = (c.y - this.Style.ItemBorder) / this.Style.ItemHeight;
	if ((pos > 0) && (pos < this.Items.length)) {
		this.HighlightItem(Math.floor(pos));
	} else {
		this.HideHighlight();
	}
};

ComboBox.prototype.HandleDOMNodeInserted = function (e) {
	this.RefreshPane();
};

ComboBox.prototype.HandleDOMAttrModified = function (e) {
	var name = e.attrName;
	if (name == 'width') {
		this.RefreshSize();
	} else if (name == 'style') {
		this.RefreshStyle();
		this.RefreshPane();
	} else if (name == 'state') {
		this.RefreshState();
	}
};

ComboBox.prototype.HandleDOMCharacterDataModified = function (e) {
	this.RefreshPane();
};

ComboBox.prototype.Handlemouseup = function (e) {
	this.DisablePaneEvents();
	this.SelectItem(this.HighlightedItem);
	this.HidePane();
};

ComboBox.prototype.Handlemouseout = function (e) {
	this.DisablePaneEvents();
	this.HidePane();
};

ComboBox.prototype.EnablePaneEvents = function () {
	this.PaneBg.addEventListener('mousemove', this, false);
	this.PaneBg.addEventListener('mouseup', this, false);
	this.PaneBg.addEventListener('mouseout', this, false);
};

ComboBox.prototype.DisablePaneEvents = function () {
	this.PaneBg.removeEventListener('mousemove', this, false);
	this.PaneBg.removeEventListener('mouseup', this, false);
	this.PaneBg.removeEventListener('mouseout', this, false);
};


/*****  Refresh  *****/

ComboBox.prototype.RefreshPane = function () {
	for (var i=0; i <this.Items.length; i++) {
		var text = this.Items[i].text;
		this.ItemsContainer.removeChild(text);
	}
	this.Items = [];
	this.BuildPane();
	this.RefreshSize();
};

ComboBox.prototype.RefreshPosition = function () {
	var x = parseFloat(this.Element.getAttribute('x')) || 0;
	var y = parseFloat(this.Element.getAttribute('y')) || 0;
	this.ShadowRoot.setAttribute('transform', 'translate(' + x + ',' + y + ')');	
	this.Pane.setAttribute('y', 22);
};

ComboBox.prototype.RefreshSize = function () {
	var w = this.Element.getAttribute('width') - 0;

	this.Bg.setAttribute('width', w-1);	
	this.Entry.setAttribute('width', w-28);
	this.Button.setAttribute('x', w-18);
	
	var text = this.ItemsContainer.getBBox().width;
	if (text + this.Style.ItemBorder * 2 > w) {
		w = text + this.Style.ItemBorder * 2;
	}
	
	this.PaneBg.setAttribute('width', w-1);
	this.PaneBg.setAttribute('height', this.Items.length * this.Style.ItemHeight + this.Style.ItemBorder * 2);
	this.PaneHighlight.setAttribute('width', w-2);
	this.PaneHighlight.setAttribute('height', this.Style.ItemHeight);

	this.PaneBounds = this.PaneBg.getBBox();
};

ComboBox.prototype.RefreshStyle = function () {
	this.Style.TextColorNormal = this.Element.style.getPropertyValue('text-color-normal') || 'black';
	this.Style.TextColorHighlight = this.Element.style.getPropertyValue('text-color-highlight') || 'white';
	this.Style.BackgroundNormal = this.Element.style.getPropertyValue('background-normal') || 'white';
	this.Style.BackgroundHighlight = this.Element.style.getPropertyValue('background-highlight') || '#3D80DF';
	this.Style.Border = this.Element.style.getPropertyValue('border') || 'black';
	this.Style.TextSize = parseInt(this.Element.style.getPropertyValue('text-size')) || 12;
	this.Style.ItemHeight = this.Style.TextSize * 1.25;
	this.Style.ItemBorder = this.Style.TextSize * 0.25;
	
	this.ItemsContainer.style.setProperty('font-size', this.Style.TextSize);
	this.PaneHighlight.style.setProperty('fill', this.Style.BackgroundHighlight);
	this.PaneBg.style.setProperty('fill', this.Style.BackgroundNormal);
	this.PaneBg.style.setProperty('stroke', this.Style.Border);
};

ComboBox.prototype.RefreshState = function () {
	var state = this.Element.getAttribute('state');
	if (state == 'disabled') {
		this.Disable();
	} else if (this.Disabled) {
		this.Enable();
	}
};
