# 三维地图组件

使用[earthSDK](http://www.earthsdk.com/)

## 安装

```terminal
pnpm install git+http://122.14.216.105:8090/mengxi/map-3d-vue3.git
```

## 使用

```javascript
// main.js

import earth from 'map-3d'

app.use(earth)
```

## earth-view 组件

```html
<earth-view />
```

#### 属性

| 属性 | 类型   | 描述                       |
| ---- | ------ | -------------------------- |
| url  | String | 三维缓存地址, tileset.json |
| objs | Array  | czmObject 数组             |

#### 事件

| 事件      | 返回值           | 描述                           |
| --------- | ---------------- | ------------------------------ |
| obj-click | 3dTileSetFeature | 模型部件点击事件，返回值为模型 |

#### expose

| expose | 描述         |
| ------ | ------------ |
| earth  | 三维地球实例 |

### czmObject 例子

```javascript
{
    "czmObject": {
        "xbsjType": "Tileset", // 三维缓存的type就是Tileset
        "name": "三维瓦片1x", // name自己取一个
        "url": "../assets/dayanta/tileset.json", // 三维缓存的url地址
        "xbsjClippingPlanes": {},
        "xbsjUseOriginTransform": true, // 是否启用原先的状态
        "skipLevelOfDetail": false
    },
    "ref": 'tileset' // ref需要自己取一个名字 用来获取czmObject实例
},
```
