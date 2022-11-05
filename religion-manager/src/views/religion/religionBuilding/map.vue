<template>
  <div class="div">
    <TMapBig v-model="religionSacrificeList"></TMapBig>
  </div>
</template>

<script>
 import { listReligionBuilding, getReligionBuilding, delReligionBuilding, addReligionBuilding, updateReligionBuilding } from "@/api/religion/religionBuilding";
  export default {
    name: 'mapBig',
    components: {

    },
    data() {
      return {
        religionSacrificeList:[],
        total:0
      }
    },
    created() {

      this.getList();
    },
    methods:{
      getList() {
        this.loading = true;
        listReligionBuilding(this.queryParams).then(response => {
          this.religionSacrificeList = response.rows;
          this.total = response.total;
          this.loading = false;

        });
      },
      gotobig(){
        window.location.href="http://dami.fgimax.vipnps.vip//religion/religionSacrifice/map"
      }
    }

  }
</script>

<style lang="less">
  body {
    margin: 0;
    height: 100%;
  }
  

 
</style>
