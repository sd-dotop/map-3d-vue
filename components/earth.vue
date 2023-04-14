<template>
  <div style="width: 100%; height: 100%">
    <div ref="earthRef" style="width: 100%; height: 100%" id="_earthWrapper"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import '../earthSDK/XbsjCesium/Widgets/widgets.css'
import { loadJS } from '../utils/loadFile'
const cesiumUrl = new URL('../earthSDK/XbsjCesium/Cesium.js', import.meta.url).href
const earthSDKUrl = new URL('../earthSDK/XbsjEarth/XbsjEarth.js', import.meta.url).href
const earthUiUrl = new URL('../earthSDK/XbsjEarthUI/xbsj.js', import.meta.url).href

const props = defineProps({
  objs: Array,
  ui: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['earth-ready', 'tileset-ready', 'ui-ready'])

const earthRef = ref(null)

loadJS(cesiumUrl, () => {
  loadJS(earthSDKUrl, () => {
    loadJS(earthUiUrl, () => {
      XbsjEarthUI.create('_earthWrapper').then((earthUI) => {
        if (props.ui) {
          //隐藏主工具栏
          earthUI.controls.mainBar.show = true
          //隐藏图层管理
          earthUI.tools.sceneTree.show = false
          emit('ui-ready', earthUI)
        }
        let { earth } = earthUI
        //   earth.interaction.picking.enabled = true
        earth.sceneTree.root = {
          children: [],
        }
        props.objs.forEach((obj) => {
          earth.sceneTree.root.children.push(obj)
          if (obj.ref) {
            XE.MVVM.watch(earth.sceneTree.$refs[obj.ref].czmObject, 'ready', (ready) => {
              if (ready) {
                emit('tileset-ready', { origin: obj, tileset: earth.sceneTree.$refs[obj.ref].czmObject })
              }
            })
          }
        })
        emit('earth-ready', { XE, earth, sceneTree: earth.sceneTree })
      })
    })
  })
})
</script>
