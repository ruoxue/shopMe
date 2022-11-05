<template>
  <baidu-map class="map" @click="click" :clicking="true" :zoom="15" :center='{lng: 116.404, lat: 39.915}'>
    <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}" />
    </bm-marker>
  </baidu-map>
</template>


<script>
  export default {
    data() {
      return {
        polyline: {
          editing: false,
          paths: []
        }
      }
    },
    created() {
      this.init();
    },
    methods: {

      click(e) {
        console.log(e);
        let point = new BMap.Point(e.point.lng, e.point.lat)
        console.log(point);
      },

      init() {
        var map = new BMap.Map("container", {
          coordsType: 5 // coordsType指定输入输出的坐标类型，3为gcj02坐标，5为bd0ll坐标，默认为5。
          // 指定完成后API将以指定的坐标类型处理您传入的坐标
        }); // 创建地图实例
        var point = new BMap.Point(116.404, 39.915); // 创建点坐标
        map.centerAndZoom(point, 15);
      }
    },
  }
</script>
<style>
  .map {
    width: 100%;
    height: 300px;
  }
</style>
