<template>
  <span class="topBarTerm">
    <slot></slot>
  </span>
</template>

<script>
export default {
 name: "TopBarTerm"
}
</script>

<style scoped>
.topBarTerm{
  transition:background-color, 500ms;
  margin: 0;
  position: relative;
  top: 0;
  height: 100%;
  padding-left: 20px;
  display: inline-flex;
  align-items: center;
  background:rgba(255,255,255,0);
}
.topBarTerm:after{
  content: "";
  transition:height, 700ms, border-right-color, 700ms;
  height: 70%;
  margin-left: 20px;
  border-right: 1px solid rgba(255,255,255,0.2);
}
.topBarTerm:hover{
  transition:background-color, 500ms;
  background: rgba(255,255,255,0.2);
}
.topBarTerm:hover:after{
  transition:height, 700ms, border-right-color, 700ms;
  height: 100%;
  border-right: 1px solid rgba(255,255,255,0);
}
</style>
