<template>



  <div class="center-cmp">
    <div class="cc-header">
      <dv-decoration-1 style="width:200px;height:50px;" />
      <div>实时分布图</div>
      <dv-decoration-1 style="width:200px;height:50px;" />
    </div>

    <div class="cc-main-container">

      <dv-flyline-chart-enhanced :config="config" style="width:100%;height:100%;" :dev="true" />

    <TMapBig v-model="religionSacrificeList"></TMapBig>

    </div>
  </div>
</template>

<script>
  import LabelTag from './LabelTag'
  export default {
    data() {
      return {
        config: {
          points: [{
              name: '郑州',
              coordinate: [0.48, 0.35],
              halo: {
                show: true,
              },
              icon: {
                src: "../../assets/images/mapPoint.png",
                width: 30,
                height: 30
              },
              text: {
                show: false
              }
            },
            {
              name: '新乡',
              coordinate: [0.52, 0.23]
            },
            {
              name: '焦作',
              coordinate: [0.43, 0.29]
            },
            {
              name: '开封',
              coordinate: [0.59, 0.35]
            },
            {
              name: '许昌',
              coordinate: [0.53, 0.47]
            },
            {
              name: '平顶山',
              coordinate: [0.45, 0.54]
            },
            {
              name: '洛阳',
              coordinate: [0.36, 0.38]
            },
            {
              name: '周口',
              coordinate: [0.62, 0.55]
            },
            {
              name: '漯河',
              coordinate: [0.56, 0.56]
            },
            {
              name: '南阳',
              coordinate: [0.37, 0.66]
            },
            {
              name: '信阳',
              coordinate: [0.55, 0.81]
            },
            {
              name: '驻马店',
              coordinate: [0.55, 0.67]
            },
            {
              name: '济源',
              coordinate: [0.37, 0.29]
            },
            {
              name: '三门峡',
              coordinate: [0.20, 0.36]
            },
            {
              name: '商丘',
              coordinate: [0.76, 0.41]
            },
            {
              name: '鹤壁',
              coordinate: [0.59, 0.18]
            },
            {
              name: '濮阳',
              coordinate: [0.68, 0.17]
            },
            {
              name: '安阳',
              coordinate: [0.59, 0.10]
            }
          ],
          lines: [{
              source: '新乡',
              target: '郑州'
            },
            {
              source: '焦作',
              target: '郑州'
            },
            {
              source: '开封',
              target: '郑州'
            },
            {
              source: '许昌',
              target: '郑州'
            },
            {
              source: '平顶山',
              target: '郑州'
            },
            {
              source: '洛阳',
              target: '郑州'
            },
            {
              source: '周口',
              target: '郑州'
            },
            {
              source: '漯河',
              target: '郑州'
            },
            {
              source: '南阳',
              target: '郑州'
            },
            {
              source: '信阳',
              target: '郑州'
            },
            {
              source: '驻马店',
              target: '郑州'
            },
            {
              source: '济源',
              target: '郑州'
            },
            {
              source: '三门峡',
              target: '郑州'
            },
            {
              source: '商丘',
              target: '郑州'
            },
            {
              source: '鹤壁',
              target: '郑州'
            },
            {
              source: '濮阳',
              target: '郑州'
            },
            {
              source: '安阳',
              target: '郑州'
            }
          ],
          icon: {
            show: true,
            src: '../../assets/images/mapPoint.png'
          },
          text: {
            show: true,
          },
          bgImgSrc: '/img/flylineChart/map.jpg'
        }
      }
    }
  }
</script>

<style lang="less">
  .center-cmp {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;

    .cc-header {
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 30px;
    }

    .cc-details {
      height: 120px;
      display: flex;
      justify-content: center;
      font-size: 32px;
      align-items: center;

      .card {
        background-color: rgba(4, 49, 128, .6);
        color: #08e5ff;
        height: 70px;
        width: 70px;
        font-size: 45px;
        font-weight: bold;
        line-height: 70px;
        text-align: center;
        margin: 10px;
      }
    }

    .cc-main-container {
      position: relative;
      flex: 1;
      display: flex;

      .ccmc-middle {
        width: 50%;
        height: 90%;

        .active-ring-name {
          font-size: 20px !important;
        }
      }

      .ccmc-left,
      .ccmc-right {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 24px;

        span {
          font-size: 40px;
          font-weight: bold;
        }

        .station-info {
          height: 80px;
          display: flex;
          align-items: center;
        }
      }

      .ccmc-left {
        align-items: flex-end;

        span {
          margin-left: 20px;
        }
      }

      .ccmc-right {
        align-items: flex-start;

        span {
          margin-right: 20px;
        }
      }
    }

    .label-tag {
      position: absolute;
      width: 500px;
      height: 30px;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
