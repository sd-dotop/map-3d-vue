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

| 属性 | 类型  | 描述           |
| ---- | ----- | -------------- |
| objs | Array | czmObject 数组 |

#### 事件

| 事件          | 返回值                 | 描述                                        |
| ------------- | ---------------------- | ------------------------------------------- |
| earth-ready   | {XE, earth, sceneTree} | 返回值对象包含 XE， earth 实例， 场景树实例 |
| tileset-ready | {origin, tileset}      | 返回值包含原始数据对象， 三维场景对象       |

#### czmObject 例子

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

#### 示例

```html
<earth-view :objs="objs" @tileset-ready="tilesetReady" @earth-ready="earthReady" />
```

```javascript
<script setup>
    const objs = [
        {
            czmObject: {
                name: '三维瓦片数据', // 可以不填写
                xbsjType: 'Tileset', // 必填项
                url: './c/ljt_cache/tileset.json', // 必填项
                xbsjUseOriginTransform: true,
            },
            ref: 'tileset',
        },
    ]

    function tilesetReady({ origin, tileset }) {
        console.log(origin)
        tileset.flyTo()
        tileset.onclick = (pickedObj) => {
            console.log(pickedObj)

            // 获取模型属性
            let names = pickedObj.getPropertyNames()
            let objs = {}
            for (let index in names) {
                let key = names[index]
                objs[key] = pickedObj.getProperty(key)
            }
            console.log(objs)
        }
    }

    function earthReady({XE, earth sceneTree}) {
        console.log(XE)
        console.log(earth)
        console.log(sceneTree)
    }
</script>
```
