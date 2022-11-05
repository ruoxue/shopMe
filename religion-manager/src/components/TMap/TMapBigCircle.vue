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
      "https://map.qq.com/api/gljs?v=1.exp&key=5VKBZ-3SCWU-DFJVK-BY2RI-EZ54S-HSBQ3&libraries=visualization";
    document.body.appendChild(script);
    script.onload = () => {
      try {
        callback();
      } catch (e) {} finally {

      }
    };
  }

  function loadScript2(callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://mapapi.qq.com/web/lbs/visualizationApi/demo/data/beijing_pondingWarning.js";
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
        if (this.list.length == 0) {
          thus.center = new window.TMap.LatLng(39.914961477236766, 116.3898104098216)
        } else {
          //定义map变量，调用 TMap.Map() 构造函数创建地图
          thus.center = (thus.center == undefined ||
              thus.center.lat == '' ||
              thus.center.lng == '' || thus.center.lat == 0) ?
            new window.TMap.LatLng(this.list[0].latitude, this.list[0].longitude) :
            new window.TMap.LatLng(39.914961477236766, 116.3898104098216)

        }

        thus.map = new window.TMap.Map(this.$refs.container, {
          center: thus.center, //设置地图中心点坐标
          zoom: 11, //设置地图缩放级别
          mapStyleId: 'style2',
          renderOptions: {
            enableBloom: true, //泛光
          },
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


        if (this.geocoder != null) {


          //初始化辐射圈
          var radiationCircle = new window.TMap.visualization.Radiation({
              styles: {
                style2: {
                  fillColor: "rgba(29,250,242,0.9)", //辐射圈填充颜色
                },
              },
              processAnimation: {
                duration: 3000, //辐射圈半径从0到最大半径的时长，单位为ms
              },
            })
            .addTo(this.map)
          radiationCircle.setData(this.getRadiationData());

          //初始化散点图并添加至map图层
          var dot = new window.TMap.visualization.Dot({
              styles: {
                style2: {
                  radius: 2, //圆形半径
                },
                style2: {
                  fillColor: "rgba(29,250,242,1)", //圆形填充颜色
                  radius: 3, //圆形半径
                },
              },
              enableBloom: true, // 泛光
            })
            .addTo(this.map)
          dot.setData(this.getDotData()); //设置数据



        }
      },
      getRadiationData() {
        var radiationData = [{
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.947956, 116.193726), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.959471, 116.431851), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.923891, 116.161111), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.870612, 116.439311), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.933175, 116.275105), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.997959, 116.281896), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.874752, 116.23101), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.90377, 116.227691), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.869761, 116.364304), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.996873, 116.295021), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.896941, 116.22972), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(40.002393, 116.274061), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.868101, 116.34857), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(40.123662, 116.269061), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.96283, 116.4598), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.832082, 116.397024), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(40.002369, 116.277648), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.933026, 116.132948), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.954655, 116.432297), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.916455, 116.198681), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.880825, 116.2081), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.897042, 116.310339), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.872221, 116.41342), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.857052, 116.400061), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.857102, 116.414191), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.987849, 116.299789), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.883011, 116.48979), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.897016, 116.32108), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.849062, 116.231481), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.864223, 116.313241), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.941143, 116.433771), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.987623, 116.442581), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.949082, 116.408451), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.789872, 116.186621), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.99517, 116.416633), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.935432, 116.113423), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.913709, 116.206807), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(40.02762, 116.441785), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.893756, 116.442413), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.832251, 116.44736), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.862713, 116.454541), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.852241, 116.346722), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.857342, 116.238959), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.907213, 116.356531), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.858941, 116.43867), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.968646, 116.394118), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.880232, 116.302827), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.898187, 116.398036), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.940631, 116.355491), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.866093, 116.458691), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.895943, 116.32929), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.831292, 116.290721), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.843826, 116.209312), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.872992, 116.279051), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.900881, 116.43647), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.941365, 116.141765), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.896903, 116.152801), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(40.047512, 116.405632), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.843269, 116.208327), // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.908047, 116.307532), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 2000, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.940985, 116.438975), // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            radius: 600, // 辐射圈半径，单位为米
            center: new window.TMap.LatLng(39.968911, 116.40739), // 辐射圈中心点经纬度
            styleId: "style2",
          },
        ];

        return radiationData;
      },
      getDotData() {


        var dotData = [{
            lat: 39.947956,
            lng: 116.193726, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.959471,
            lng: 116.431851, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.923891,
            lng: 116.161111, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.870612,
            lng: 116.439311, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.933175,
            lng: 116.275105, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.997959,
            lng: 116.281896, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.874752,
            lng: 116.23101, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.90377,
            lng: 116.227691, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.869761,
            lng: 116.364304, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.996873,
            lng: 116.295021, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.896941,
            lng: 116.22972, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 40.002393,
            lng: 116.274061, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.868101,
            lng: 116.34857, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 40.123662,
            lng: 116.269061, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.96283,
            lng: 116.4598, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.832082,
            lng: 116.397024, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 40.002369,
            lng: 116.277648, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.933026,
            lng: 116.132948, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.954655,
            lng: 116.432297, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.916455,
            lng: 116.198681, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.880825,
            lng: 116.2081, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.897042,
            lng: 116.310339, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.872221,
            lng: 116.41342, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.857052,
            lng: 116.400061, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.857102,
            lng: 116.414191, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.987849,
            lng: 116.299789, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.883011,
            lng: 116.48979, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.897016,
            lng: 116.32108, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.849062,
            lng: 116.231481, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.864223,
            lng: 116.313241, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.941143,
            lng: 116.433771, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.987623,
            lng: 116.442581, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.949082,
            lng: 116.408451, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.789872,
            lng: 116.186621, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.99517,
            lng: 116.416633, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.935432,
            lng: 116.113423, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.913709,
            lng: 116.206807, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 40.02762,
            lng: 116.441785, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.893756,
            lng: 116.442413, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.832251,
            lng: 116.44736, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.862713,
            lng: 116.454541, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.852241,
            lng: 116.346722, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.857342,
            lng: 116.238959, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.907213,
            lng: 116.356531, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.858941,
            lng: 116.43867, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.968646,
            lng: 116.394118, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.880232,
            lng: 116.302827, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.898187,
            lng: 116.398036, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.940631,
            lng: 116.355491, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.866093,
            lng: 116.458691, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.895943,
            lng: 116.32929, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.831292,
            lng: 116.290721, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.843826,
            lng: 116.209312, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.872992,
            lng: 116.279051, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.900881,
            lng: 116.43647, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.941365,
            lng: 116.141765, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.896903,
            lng: 116.152801, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 40.047512,
            lng: 116.405632, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.843269,
            lng: 116.208327, // 辐射圈中心点经纬度
            styleId: "style2",
          },

          {
            lat: 39.908047,
            lng: 116.307532, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.940985,
            lng: 116.438975, // 辐射圈中心点经纬度
            styleId: "style2",
          },
          {
            lat: 39.968911,
            lng: 116.40739, // 辐射圈中心点经纬度
            styleId: "style2",
          },
        ];
        return dotData;
      }

    }
  };
</script>

<style scoped lang="scss">
  .div {
    height: 100%;
  }
</style>
