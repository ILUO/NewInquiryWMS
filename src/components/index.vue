<template>
  <div id="app">
    <v-header :active="active"  v-on:headCallBack="headCall"></v-header>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  html,body{
        display: block;
        margin: 0px;
        width: 100%;
        height: 100%;
  }
  #app{
    width: 100%;
    height: 100%;
  }
</style>

<script>
//导入需要的头部控件
  import Vheader from '@/components/header'
  export default {
      data() {
        return{
          active:"/Index/xjczbr"
        }
      },
      created () {
        //向后端请求 省份数据，并且存放到仓库中

        
      }
      ,components: {
       "v-header": Vheader
      }
      ,beforeMount () {
        //保证页面刷新后还在原来的界面上
        var currentName = this.$route.name;
        console.log(currentName);
        this.active="/Index/"+currentName;
        this.navGotoPage("/Index/"+currentName);
      }
      ,methods: {
        headCall: function (url) {
          // console.log("父页面："+url);
          // this.active = url;
          this.navGotoPage(url);
        }
        ,navGotoPage:function(val){
          //当期路径为跳转路径时不执行跳转操作
          var currentName ="/Index/"+this.$route.name;
          if(val == currentName){
            return false;
          }else{
            this.active = val;
          }
          var pathParams = window.localStorage.getItem("pathParams");
          var path_obj = {path:"",data:{}},
              path_obj1 ={path:"",data:{}};
          // 从导航栏切换不需要缓存数据
          this.$store.dispatch("clearPathParams",path_obj);
          this.$store.dispatch("clearPrePathParams",path_obj1);
          this.$router.push({
             path: val
          });
        }
        ,setPropertyNull : function(obj){
          obj.path = null;
          for(var key in obj.data){
            obj.data[key] = null;
          }
          return obj;
        }
      }
  }
</script>
  