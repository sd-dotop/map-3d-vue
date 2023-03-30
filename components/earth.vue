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
  objs: Array,
})

const emit = defineEmits(['earth-ready', 'tileset-ready'])

const earthRef = ref(null)
let earth
cesiumDOM.onload = () => {
  setTimeout(() => {
    XE.ready().then(() => {
      earth = new XE.Earth(earthRef.value)
      earth.interaction.picking.enabled = true
      earth.sceneTree.root = {
        children: [
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
                      url: '//t6.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=835402675b4eef1d10ff69553d33801f',
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
                      url: '//t6.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=835402675b4eef1d10ff69553d33801f',
                    },
                  },
                },
              },
            ],
          },
        ],
      }
      props.objs.forEach((obj) => {
        earth.sceneTree.root.children.push(obj)
        XE.MVVM.watch(earth.sceneTree.$refs[obj.ref].czmObject, 'ready', (ready) => {
          if (ready) {
            emit('tileset-ready', { origin: obj, tileset: earth.sceneTree.$refs[obj.ref].czmObject })
          }
        })
      })
      emit('earth-ready', { XE, earth, sceneTree: earth.sceneTree })
    })
  }, 1000)
}
</script>
