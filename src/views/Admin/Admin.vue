<template>
    <div>
        <router-view v-if="isRouterAlive"/>
    </div>
</template>

<script>
export default {
  name: 'Admin',
  // 父组件通过provide提供变量，子组件通过inject获取
  provide(){
    return{
      reload: this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(()=>{
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style scoped>

</style>
