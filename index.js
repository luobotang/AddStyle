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
 * 向页面添加 css 样式
 *
 * @example
 *   // 文本
 *   addStyle('p { color: red; }')
 *   // 样式数据对象
 *   addStyle({p: { color: 'red' }})
 *
 * @param {string|Object|Array} css - 要添加的 css 文本，或者可以转为 css 文本的样式数据对象
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

	// 将新增的 style 节点插入第一个 script 标签之前
	var ref = document.getElementsByTagName('script')[0]
	ref.parentNode.insertBefore(ele, ref)
	return ele;
}

/*
 * 样式数据对象转为 css 文本
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
		var i = 0
		var len = rules.length
		for (; i < len; i++) {
			rule = rules[i]
			if (isArray(rule)) {
				cssText += rule2css(rule[0], rule[1])
			} else if (typeof rule === 'string') {
				cssText += rule;
			}
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
//
// <declaration> [1] {string} =>
//   'property: value; ...'
// <declaration> [2] {Object} =>
//   {
//     property: <value>;
//     ...
//   }
// <declaration> [3] {string[]} =>
//   [
//     'property: value',
//     ...
//   ]
// <declaration> [4] {Array[]} =>
//   [
//     ['property', <value>],
//     ...
//   ]
//
// <value> [1] {string} =>
//   'value'
// <value> [2] {string[]} =>
//   ['value', ...]

function rule2css(selector, declaration) {
	if (typeof declaration !== 'string') {
		var tmp = []
		var property
		var value
		
		if (isArray(declaration)) {
			var propValuePairSet = declaration
			var propValuePair
			var i = 0
			var len = propValuePairSet.length
			for (; i < len; i++) {
				propValuePair = propValuePairSet[i]
				if (isArray(propValuePair)) {
					property = propValuePair[0]
					value = propValuePair[1]
					tmp.push(propertyValuePair(property, value))
				} else if (typeof propValuePair === 'string') {
					tmp.push(propValuePair)
				}
			}
		}
		else if (typeof declaration === 'object') {
			for (property in declaration) {
				value = declaration[property]
				tmp.push(propertyValuePair(property, value))
			}
		}

		declaration = tmp.join(';')
	}

	return selector + '{' + declaration + '}'
}

function propertyValuePair(property, value) {
	value = isArray(value) ? value.join(' ') : value
	return property + ':' + value
}

return addStyle
})