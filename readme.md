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

#### 事件

| 事件      | 返回值           | 描述                           |
| --------- | ---------------- | ------------------------------ |
| obj-click | 3dTileSetFeature | 模型部件点击事件，返回值为模型 |

#### expose

| expose | 描述         |
| ------ | ------------ |
| earth  | 三维地球实例 |
