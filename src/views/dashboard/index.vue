<template>
  <div class="dashboard-container">
     <img src="@/assets/welcome.png">
  </div>
</template>

<script>
import { getIndexData } from "@/api/index.js";
export default {
  name: 'Dashboard',
  mounted () {
    getIndexData().then((result) => {
        console.log(result);
        //TODO 
    });
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 5px 2px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
