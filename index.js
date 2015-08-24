(function (factory) {

	if (typeof module === 'objects' && module.exports) {
		module.exports = factory();
	} else {
		window.AddStyle = factory();
	}

})(function () {

/*
 * 向页面添加 css 样式
 *
 * @example
 *   // 文本
 *   addStyle('p { color: red; }')
 *   // 样式数据对象
 *   addStyle({p: { color: 'red' }})
 *
 * @param {string|Object} css - 要添加的 css 文本，或者可以转为 css 文本的样式数据对象
 * @returns {HTMLStyleElement}
 */
function addStyle(css) {
    var ref = document.getElementsByTagName('script')[0],
        eleStyle = document.createElement('style');

	if (typeof css === 'object') {
		css = renderStyles(css);
	}

    eleStyle.type = "text/css";
    if (eleStyle.styleSheet) { // IE
        eleStyle.styleSheet.cssText = css;
    } else {
        eleStyle.appendChild(
        	document.createTextNode(css)
        );
    }

    ref.parentNode.insertBefore(eleStyle, ref);
    return eleStyle;
}

/*
 * 样式数据对象转为 css 文本
 * @param {Object} styles
 * @returns {string}
 */
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

return addStyle;
});