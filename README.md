# AddStyle

将 CSS 内容以添加 style 节点方式应用到页面。

## 安装

```hash
npm install addstyle
```

## 用法

```javascript
// 最简单的方式，使用 css 文本
var styleElement1 = AddStyle('p { color: red; }')
// 传入 css 规则对象
var styleElement2 = AddStyle({
  p: {color: 'blue'}
})
// 传入 css 规则数组，规则采用不同结构声明
var styleElement2 = AddStyle([
    ['p', { color: 'red' }],
    ['.msg', 'line-height: 2'],
    '.alert { font-weight: bold; }'
])
```

CSS 规则可以通过多种方式传入：

1、规则文本

例如：
```javascript
'p { color: red; } strong { font-weight: bold; }'
```

2、规则对象

例如：
```javascript
{
    p: {
        color: 'red'
    },
    strong: 'font-weight: bold'
}
```

3、规则数组

例如：
```javascript
[
    ['p', 'color: red;'],
    ['strong', {
        'font-weight': 'bold'
    }]
]
```

注：如示例中所示，CSS 规则声明支持文本或对象形式。

## 兼容性

在 IE8+、Chrome 测试通过。
