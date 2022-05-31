<template>
  <div class="parallax" :style="cssVars">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ParallaxBG",
  props:{
    fileUrl: String,
    cssHeight: String,
    zValue: String
  },
  computed: {
    cssVars() {
      return {
        '--fileURL': "url(\"" + this.fileUrl + "\")",
        '--height': this.cssHeight,
        '--zVal' : this.zValue
      }
    }
  }
}
</script>

<style scoped>
.parallax {
  width: 100vw;
  height: var(--height);
  padding-top:20vh;
  box-sizing: border-box;
  transform-style: preserve-3d;
}
.parallax::before {
  content: "";
  position: absolute;
  width: 100vw;
  height: 100vh;
  top:0;
  left:0;
  background-image: var(--fileURL);
  z-index: var(--zVal);
  transform: translateZ(-1px) scale(2);
}
</style>
