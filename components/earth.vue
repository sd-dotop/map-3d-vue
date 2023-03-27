<template>
  <div style="width: 100%; height: 100%">
    <div ref="earthRef" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import '../earthSDK/XbsjCesium/Widgets/widgets.css'
const cesiumUrl = new URL('../earthSDK/XbsjCesium/Cesium.js', import.meta.url).href
const earthSDKUrl = new URL('../earthSDK/XbsjEarth/XbsjEarth.js', import.meta.url).href
const cesiumDOM = document.createElement('script')
cesiumDOM.src = cesiumUrl
const script = document.createElement('script')
script.src = earthSDKUrl
document.body.appendChild(cesiumDOM)
document.body.appendChild(script)

const props = defineProps({
  url: String,
})

const earthRef = ref(null)
let earth
cesiumDOM.onload = () => {
  setTimeout(() => {
    XE.ready().then(() => {
      earth = new XE.Earth(earthRef.value)
      earth.sceneTree.root = {
        children: [
          {
            czmObject: {
              name: '默认离线影像',
              xbsjType: 'Imagery',
              xbsjImageryProvider: {
                createTileMapServiceImageryProvider: {
                  url: XE.HTML.cesiumDir + 'Assets/Textures/NaturalEarthII',
                  fileExtension: 'jpg',
                },
                type: 'createTileMapServiceImageryProvider',
              },
            },
          },
          {
            czmObject: {
              name: '三维瓦片数据', // 可以不填写
              xbsjType: 'Tileset', // 必填项
              url: props.url, // 必填项

              xbsjUseOriginTransform: false, // 可以不填写
              skipLevelOfDetail: false,
            },
          },
        ],
      }
      const tileset = earth.sceneTree.root.children[1].czmObject
      XE.MVVM.watch(tileset, 'ready', (ready) => ready && tileset.flyTo())
    })
  }, 1000)
}
</script>
