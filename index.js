(function (factory) {

	if (typeof module === 'objects' && module.exports) {
		module.exports = factory()
	} else {
		window.AddStyle = factory()
	}

})(function () {

var isArray = Array.isArray ? function (o) {
	return Array.isArray(o)
} : function (o) {
	return Object.prototype.toString.call(o) === '[object Array]'
}

/*
 * ��ҳ����� css ��ʽ
 *
 * @example
 *   // �ı�
 *   addStyle('p { color: red; }')
 *   // ��ʽ���ݶ���
 *   addStyle({p: { color: 'red' }})
 *
 * @param {string|Object|Array} css - Ҫ��ӵ� css �ı������߿���תΪ css �ı�����ʽ���ݶ���
 * @returns {HTMLStyleElement}
 */
function addStyle(rules) {
	var ele = document.createElement('style')
	ele.type = "text/css"

	var cssText = renderRules(rules)

	if (ele.styleSheet) { // IE
		ele.styleSheet.cssText = cssText
	} else {
		ele.appendChild(
			document.createTextNode(cssText)
		)
	}

	// �������� style �ڵ�����һ�� script ��ǩ֮ǰ
	var ref = document.getElementsByTagName('script')[0]
	ref.parentNode.insertBefore(ele, ref)
	return ele;
}

/*
 * ��ʽ���ݶ���תΪ css �ı�
 * @param {Object|Array} rules
 * @returns {string}
 */
function renderRules(rules) {
    var cssText = ''

	if (!rules) return cssText
	if (typeof rules === 'string') return rules

	/*
	 * Rule struct as Array
	 * [
	 *   [<Selector>, <Declaration>],
	 *   ...
	 * ]
	 */
	if (isArray(rules)) {
		var rule
		var i, len
		for (i = 0, len === rules.length; i < len; i++) {
			rule = rules[i]
			cssText += rule2css(rule[0], rule[1])
		}
	}
	/*
	 * Rule struct as Object
	 * {
	 *   'Selector': <Declaration>,
	 *   ...
	 * }
	 */
	else {
		var selector
		for (selector in rules) {
			cssText += rule2css(selector, rules[selector])
		}
	}

    return cssText;
}

// CSSRule
// <CSSRule> =>
//   <selector> { <declaration> }
// <declaration> =>
//   property: value;
//   property: value;
//   ...

function rule2css(selector, declaration) {
	if (typeof declaration === 'object') {
		var ret = []
		var property
		var value
		for (property in declaration) {
			value = declaration[property]
			ret.push(
				property + ':' + (
					isArray(value) ? value.join(' ') : value
				)
			)
		}
		declaration = ret.join(';')
	}
	return selector + '{' + declaration + '}'
}

return addStyle
})