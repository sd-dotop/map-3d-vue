<template>
  <div style="width: 100%; height: 100%">
    <div ref="earthRef" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const cesiumUrl = new URL('../earthSDK/XbsjCesium/Cesium.js', import.meta.url).href
const earthSDKUrl = new URL('../earthSDK/XbsjEarth/XbsjEarth.js', import.meta.url).href
const cesiumDOM = document.createElement('script')
cesiumDOM.src = cesiumUrl
const script = document.createElement('script')
script.src = earthSDKUrl
document.body.appendChild(cesiumDOM)
document.body.appendChild(script)
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
        ],
      }
    })
  }, 1000)
}
</script>
