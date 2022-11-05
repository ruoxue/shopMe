<template>
  <div>
    <div ref="container" class="map">
    </div>
  </div>
</template>

<script>
  function loadScript(callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://map.qq.com/api/gljs?v=1.exp&key=5VKBZ-3SCWU-DFJVK-BY2RI-EZ54S-HSBQ3";
    document.body.appendChild(script);
    script.onload = () => {
      try {
        callback();
      } catch (e) {} finally {

      }
    };
  }

  window.onload = loadScript;

  export default {
    props: {
      value: [String, Object, Array]
    },
    data() {
      return {
        geocoder: null,
        loading: true,
        visible: false,
        map: null,
        markerLayer: null,
        socket: null,
        makrPoint: {},
        centerPoint: {},
        center: {
          lng: "",
          lat: "",
          msg: "",
          level: 0
        },
      };
    },
    watch: {
      value: {
        handler(val) {
          console.log("val" + val)
          if (val) {
            // 首先将值转为数组
            const list = Array.isArray(val) ? val : this.value.split(',');

            this.centerPoint.lng = Number.parseFloat(list[1]);
            this.centerPoint.lat = Number.parseFloat(list[0]);
            if (this.map) {
              this.setCenter(this.centerPoint.lat, this.centerPoint.lng);
              this.addMark(this.centerPoint.lat, this.centerPoint.lng);
            }
            return list;
          } else {
            this.centerPoint.lng = 0;
            this.centerPoint.lat = 0;

            this.clearMark();
            return [];
          }
        },
        deep: true,
        immediate: true
      }
    },

    mounted() {
      loadScript(() => {
        this.init();
      });
    },
    methods: {
      init() {
        var thus = this;
        //定义map变量，调用 TMap.Map() 构造函数创建地图

        thus.center = (thus.center == undefined ||
            thus.center.lat == '' ||
            thus.center.lng == '' || thus.center.lat == 0) ?
          new window.TMap.LatLng(this.centerPoint.lat, this.centerPoint.lng) :
          new window.TMap.LatLng(31.236176, 121.478743)


        thus.map = new window.TMap.Map(this.$refs.container, {
          center: thus.center, //设置地图中心点坐标
          zoom: 14, //设置地图缩放级别
        });
        thus.map.on("tilesloaded", function() {

          thus.setCenter(thus.centerPoint.lat, thus.centerPoint.lng);
          thus.addMark(thus.centerPoint.lat, thus.centerPoint.lng);

        });
        thus.map.on("click", function(evt) {
          var lat = evt.latLng.getLat().toFixed(6);
          var lng = evt.latLng.getLng().toFixed(6);
          this.centerPoint = {};
          this.centerPoint.lng = lng;
          this.centerPoint.lat = lat;
          thus.$emit("input", lat + "," + lng);

          thus.addMark(lat, lng);
        })
      },
      click(evt) {

      },
      setCenter(lat, lng) {
        var thus = this;
        if (lat > 0) {
          thus.center = (lng == 0 || lat == 0) ?
            new window.TMap.LatLng(lat, lng) :
            new window.TMap.LatLng(31.236176, 121.478743)
          console.log("thus.center");
          console.log(thus.center);
          console.log("thus.center");
          this.map.setCenter(thus.center);
        }
      },

      clearMark() {
        if (this.markerLayer) {
          this.markerLayer.setMap(null);
          this.markerLayer = null;
        }
      },
      addMark(lat, lng) {
        this.clearMark();
        this.markerLayer = new TMap.MultiMarker({
          id: 'marker',
          map: this.map
        });
        this.makrPoint = new window.TMap.LatLng(lat, lng);
        console.log("this.makrPoint");
        console.log(this.makrPoint);
        console.log("this.makrPoint");

        this.markerLayer.add({
          position: this.makrPoint
        });
      },



    }
  };
</script>

<style scoped lang="scss">
  .rightBar {
    width: 60px;
    overflow: hidden;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(231, 229, 229, 0.864);

    .anticon {
      font-size: 30px;
      color: rgb(109, 108, 108);
      margin: 20px 0;

      &.add {
        color: #f00;
      }
    }
  }
</style>
