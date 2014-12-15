function addStyle(cssText) {
    var ref = document.getElementsByTagName('script')[0],
        eleStyle = document.createElement('style');

	if (typeof cssText === 'object') {
		cssText = renderStyles(cssText);
	}

    eleStyle.type = "text/css";
    if (eleStyle.styleSheet) { // IE
        eleStyle.styleSheet.cssText = cssText;
    } else {
        cssText = document.createTextNode(cssText);
        eleStyle.appendChild(cssText);
    }

    ref.parentNode.insertBefore(eleStyle, ref);
}

// style definition object to css text
function renderStyles(styles) {
    var styleHtml = '',
        selector,
        propHtml,
        properties, propName, propVal,
        toStr = Object.prototype.toString;

    for (selector in styles) {
        properties = styles[selector];
        props = [];
        for (propName in properties) {
            propVal = properties[propName];
            if (toStr.call(propVal) === '[object Array]') {
                props.push(propName + ':' + propVal.join(' '));
            } else {
                props.push(propName + ':' + propVal);
            }
        }
        styleHtml = selector + '{' + props.join(';') + '}';
    }

    return styleHtml;
}
