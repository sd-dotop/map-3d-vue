<template>
  <div style="width: 100%; height: 100%">
    <div ref="earthRef" style="width: 100%; height: 100%" id="_earthWrapper"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import '../earthSDK/XbsjCesium/Widgets/widgets.css'
const cesiumUrl = new URL('../earthSDK/XbsjCesium/Cesium.js', import.meta.url).href
const earthSDKUrl = new URL('../earthSDK/XbsjEarth/XbsjEarth.js', import.meta.url).href
const earthUiUrl = new URL('../earthSDK/XbsjEarthUI/xbsj.js', import.meta.url).href

const cesiumDOM = document.createElement('script')
cesiumDOM.src = cesiumUrl

const script = document.createElement('script')
script.src = earthSDKUrl

document.body.appendChild(cesiumDOM)
document.body.appendChild(script)

const uiDOM = document.createElement('script')
uiDOM.src = earthUiUrl

document.body.appendChild(uiDOM)

const props = defineProps({
  objs: Array,
  ui: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['earth-ready', 'tileset-ready', 'ui-ready'])

const earthRef = ref(null)

cesiumDOM.onload = () => {
  setTimeout(() => {
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
  }, 2000)
}
</script>
