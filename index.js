(function (factory) {

	if (typeof module === 'objects' && module.exports) {
		module.exports = factory();
	} else {
		window.AddStyle = factory();
	}

})(function () {

/*
 * ��ҳ����� css ��ʽ
 *
 * @example
 *   // �ı�
 *   addStyle('p { color: red; }')
 *   // ��ʽ���ݶ���
 *   addStyle({p: { color: 'red' }})
 *
 * @param {string|Object} css - Ҫ��ӵ� css �ı������߿���תΪ css �ı�����ʽ���ݶ���
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
 * ��ʽ���ݶ���תΪ css �ı�
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