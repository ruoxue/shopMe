<template>
  <div>
    <div ref="container" class="map" style="width: 100%;height: 100%;min-height: 100%;">
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
        geocoder: [],
        loading: true,
        visible: false,
        map: null,
        marker: null,
        socket: null,
        list: [],
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
          console.log(val);
          if (val && val.length > 0) {
            // 首先将值转为数组
            this.list = Array.isArray(val) ? val : this.value.split(',');
            if (this.map) {
              this.addMark();
            }
            return this.list;
          } else {
            if (this.marker) {
              this.marker.setMap(null);
              this.marker = null;
            }

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
        console.log(456)
        if(this.list.length==0){
           thus.center =new window.TMap.LatLng(31.236176, 121.478743)
        }else{
          //定义map变量，调用 TMap.Map() 构造函数创建地图
          thus.center = (thus.center == undefined ||
              thus.center.lat == '' ||
              thus.center.lng == '' || thus.center.lat == 0) ?
            new window.TMap.LatLng(this.list[0].latitude, this.list[0].longitude) :
            new window.TMap.LatLng(31.236176, 121.478743)
            console.log(123)
        }

        thus.map = new window.TMap.Map(this.$refs.container, {
          center: thus.center, //设置地图中心点坐标
          zoom: 14, //设置地图缩放级别
          mapStyleId: 'style1'
        });

        //监听地图瓦片加载完成事件
        thus.map.on("tilesloaded", function() {
          thus.addMark();
        })
        thus.map.on("click", function(evt) {
          var lat = evt.latLng.getLat().toFixed(6);
          var lng = evt.latLng.getLng().toFixed(6);

          thus.center = new window.TMap.LatLng(lat, lng);
          thus.$emit("input", lat + "," + lng);
          //thus.addMark();
        })
      },
      click(e) {
        this.map.destroy();
      },
      addMark() {
        console.log("mark");
        var thus = this;
        for (var index in this.list) {
          var item = {
            styleId: 'small', // 对应中的样式id
            position: new window.TMap.LatLng(this.list[index].latitude, this.list[index].longitude), // 标注点位置
            content: this.list[index].name, // 标注点文本
          };
          thus.geocoder.push(item);
        }


        if (this.geocoder != null && this.geocoder.length > 0) {


          if (this.marker) {
            this.marker.setMap(null);
            this.marker = null;
          }
          this.marker = new window.TMap.MultiMarker({
            map: this.map,
            styles: {
              // 点标记样式
              marker: new window.TMap.MarkerStyle({
                width: 20, // 样式宽
                height: 30, // 样式高
                anchor: {
                  x: 10,
                  y: 30
                }, // 描点位置
              }),
            },
            geometries: this.geocoder,
          });
        }
      },



    }
  };
</script>

<style scoped lang="scss">
.div{
  height: 100%;
}
</style>
