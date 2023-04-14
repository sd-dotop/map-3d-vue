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

| 属性 | 类型    | 描述             |
| ---- | ------- | ---------------- |
| objs | Array   | czmObject 数组   |
| ui   | Boolean | 是否展示 UI 界面 |

#### 事件

| 事件          | 返回值                 | 描述                                        |
| ------------- | ---------------------- | ------------------------------------------- |
| earth-ready   | {XE, earth, sceneTree} | 返回值对象包含 XE， earth 实例， 场景树实例 |
| tileset-ready | {origin, tileset}      | 返回值包含原始数据对象， 三维场景对象       |
| ui-ready      | earthUI                | 返回值为 earthUI 对象                       |

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
<earth-view :objs="objs" :ui="true" @tileset-ready="tilesetReady" @earth-ready="earthReady" @ui-ready="uiReady" />
```

```javascript
<script setup>
    const objs = [
        {
            expand: true,
            title: '地图',
            children: [
            {
                czmObject: {
                name: '默认离线影像',
                xbsjType: 'Imagery',
                xbsjImageryProvider: {
                    XbsjImageryProvider: {
                    url: '//t6.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=81a16678c200ad51f8378bee6fd598b7',
                    },
                },
                },
            },
            {
                czmObject: {
                name: '默认离线影像',
                xbsjType: 'Imagery',
                xbsjImageryProvider: {
                    XbsjImageryProvider: {
                    url: '//t6.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=81a16678c200ad51f8378bee6fd598b7',
                    },
                },
                },
            },
            ],
        },
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

    function uiReady(earthUI) {
        console.log(earthUI)
    }
</script>
```

### earthUI MainControl 自定义内容

```javascript
earthUI.controls.mainBar.controls = {
  navigate: {
    // 漫游
    show: true, // 是否显示
    scene: {
      // 场景
      show: true, //
    },
    view: {
      // 视角
      show: true,
      global: true, // 全球
      china: true, // 中国
      custom: true, // 自定义
    },
    location: {
      // 搜索定位
      show: true,
    },
    autofly: {
      // 自动飞行
      show: true,
      globalrotation: true, // 全球旋转
      centerrotation: true, // 中心旋转
      cameraattach: true, // 绑定相机
    },
    interactivemode: {
      // 交互模式
      show: true,
      default: true, // 默认
      gooleearth: true, // 右键旋转
      firstperson: true, // 第一人称
      mouseshiqu: true, // 鼠标拾取
      VR: true, // VR
      FOV: true, // FOV
    },
  },
  imagery: {
    // 影像
    show: true,
    source: {
      // 数据源
      show: true,
      online: true, // 在线
      localhost: false, // 本地lab服务
      cloud: false, // 云lab服务
      wmts: false, // wmts
      history: false, // 历史
      wms: false, // wms
      acgis: false, // acgis
    },
    visible: {
      // 可视化
      show: true,
    },
  },
  model: {
    // 瓦片
    show: true,
    source: {
      // 数据源
      show: false,
      online: false, // 在线
      localhost: false, // 本地lab服务
      cloudhost: false, // 云lab服务
      instance: false, // 实例
      localUpload: false, // 本地上传
    },
    custom: {
      // 自定义
      show: true,
    },
    edit: {
      // 编辑
      show: true,
      fenleimmodel: true, // 分类瓦片
      fenleiterrain: true, // 分类地形
      style: true, // 样式
      move: true, // 移动
      rotate: true, // 旋转
      view: true, // 视口
      technology: true, // 科技感
      doubleSide: true, // 双面显示
      skipLOD: true, // 忽略LOD
      debugShowBoundingVolume: true, // 调试包围盒
    },
    visible: {
      // 可视化
      show: true,
    },
  },
  terrain: {
    // 地形
    show: true,
    source: {
      // 数据源
      show: true,
      online: true, // 在线
      localhost: true, // 本地lab服务
      cloudhost: false, // 云lab服务
    },
    tocolor: {
      // 着色
      show: true,
      elevationcolor: true, // 高程
      slope: true, // 坡度
      slopeaspect: true, // 坡向
      contour: true, // 等高线
    },
    effect: {
      // 效果
      show: true,
      tailoring: true, // 地形裁剪
      globe: true, // 显示地球
      enableLighting: true, // 地形光照
      depth: true, // 深度检测
      terrainExaggeration: true, // 地形夸张
      subSurface: true, // 地下模式
      wireFrame: true, // 三角网
      transparent: true, // 地表不透明
      globeTranslucency: true, // 地表透明
    },
  },
  analysis: {
    // 分析
    show: true,
    visualization: {
      // 可视化
      show: true,
      flatten: true, // 压平
      videofusion: true, // 视频融合
      sectioning: true, // 剖切
      visual: true, // 可视阈
      water: true, // 水面
      expansion: true, // 模型展开
      cutsurface: true, // 挖坑
    },
    measure: {
      // 测量
      show: true,
      point: true, // 点位
      distance: true, // 距离
      disGround: true, // 贴地距离
      height: true, // 高度
      area: true, // 面积
      sectionPlane: true, // 剖面
      areaGround: true, // 立面面积
      angle: true, // 方位角
      intervisible: true, // 通视
      circleIntervisible: true, // 圆形通视
      volume: true, // 体积
      reset: true, // 清除
    },
  },
  effect: {
    // 效果
    show: true,
    weather: {
      // 天气
      show: true,
      sun: true, // 太阳
      moon: true, // 月亮
      atmosphere: true, // 大气
      cloud: true, // 云
      rain: true, // 雨
      snow: true, // 雪
      fog: true, // 雾
      fogpostprocess: true, // 全屏雾效
      starrysky: true, // 星空
      skyBoxOnGround: true, // 天空盒
    },
    effect: {
      // 特效
      show: true,
      shadow: true, // 阴影
      bloom: true, // 泛光
      ambientOcclusion: true, // 环境遮蔽
      depthOfField: true, // 景深
      silhouette: true, // 轮廓
      brightness: true, // 亮度
      blackAndWhite: true, // 黑白
      nightVision: true, // 夜市
      lensFlare: true, // 镜头耀斑
      mosaic: true, // 马赛克
      forceSunPos: true, // 强制光照
    },
  },
  entity: {
    // 标绘
    show: true,
    plotlibrary: {
      // 标绘库
      show: true,
      online: true, // 在线
      localhost: true, // 本来lab
      custom: true, // 自定义
    },
    routine: {
      // 常规
      show: true,
      pin: true, // 图标点
      line: true, // 折现
      DoubleArrow: true, // 双箭头
      polygonStretch: true, // 多边形
      classificationpolygon: true, // 单体化
      flatarrow: true, // 平尾箭头
      particlesystem: true, // 粒子
      ParticleSystemFireWork: true, // 粒子烟火
      ParticleSystemTails: true, // 粒子喷射
      GeoSmoothPolygon: true, // 平滑多边形
    },
    solid: {
      // 立体
      show: true,
      model: true, // 模型
      polygonImage: true, // 立面贴图
    },
    senior: {
      // 高级
      show: true,
      path: true, // 路径动画
      CustomGroundRectangle: true, // 贴地图元
      road: true, // 道路
      wall: true, // 挡土墙
      surface: true, // 填充面
      groundimage: true, // 贴地图像
    },
    algorithm: {
      // 算法
      show: true,
      parabolic: true, // 抛物插值
      ODLines: true, // ODLines
    },
  },
  other: {
    // 其他
    show: true,
    dataSource: {
      // 数据源
      show: true,
      GeoJSON: true, // geojson
      KML: true, // kml
      Czml: true, // czml
    },
  },
  view: {
    // 视图
    show: true,
    control: {
      // 控件
      show: true,
      layer: true, // 图层管理
      navcontrol: true, // 导航控件
      scalecontrol: true, // 比例尺
      statecontrol: true,
      timelinecontrol: true,
      autoTest: true,
    },
    splitscreen: {
      show: true,
    },
    debug: {
      show: true,
      terraindebug: false,
      dtilesdebug: false,
      capture: true,
      earthColor: true,
      defaultAccessToken: false,
    },
  },
}
```
