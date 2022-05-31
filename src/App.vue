<template>
  <div class="topBar">
    <TopBarTerm>Home</TopBarTerm>
    <TopBarTerm>Jackson</TopBarTerm>
    <TopBarTerm>Jackson</TopBarTerm>
    <TopBarTerm>Jackson</TopBarTerm>
    <TopBarTerm>Jackson</TopBarTerm>
    <TopBarTerm>Jackson</TopBarTerm>
    <TopBarTerm>Jackson</TopBarTerm>
  </div>
  <div class="pagewrapper">
    <ParallaxBG id="para1" file-url="./Picture1.jpg" css-height="60vh" z-value="-254"></ParallaxBG>
    <div class="main" id="box1">The three kingdoms period of China</div>
    <div class="main" id="intro">Introduction</div>
    <div class="main" id="box2" @mouseleave="this.hideCoolGif" @mouseenter="this.showCoolGif">
      The Three Kingdoms (simplified Chinese: 三国; traditional Chinese: 三國) from 220 to 280 AD was the
      tripartite division of China among the dynastic states of Cao Wei, Shu Han, and Eastern Wu.
      The Three Kingdoms period was preceded by the Eastern Han dynasty and was followed by the
      Western Jin dynasty. The short-lived state of Yan on the Liaodong Peninsula, which lasted from 237 to 238,
      is sometimes considered as a "4th kingdom".
      To distinguish the three states from other historical Chinese states of the same names,
      historians have added a relevant character to the state's original name: the state that
      called itself "Wei" (魏) is also known as "Cao Wei" (曹魏), the state that called itself "Han" (漢)
      is also known as "Shu Han" (蜀漢) or just "Shu" (蜀), and the state that called itself "Wu" (吳)
      is also known as "Eastern Wu" (東吳; Dōng Wú) or "Sun Wu" (孫吳).
      Academically, the period of the Three Kingdoms refers to the period between the
      establishment of Cao Wei in 220 and the conquest of the Eastern Wu by the Western Jin in 280.
      The earlier, "unofficial" part of the period, from 184 to 220, was marked by chaotic
      infighting between warlords in various parts of China during the downfall of the Eastern Han
      dynasty. The middle part of the period, from 220 to 263, was marked by a more
      militarily stable arrangement between three rival states of Cao Wei, Shu Han, and Eastern Wu.
      The later part of the era was marked by the conquest of Shu by Wei in 263, the usurpation of Cao
      Wei by the Western Jin in 266, and the conquest of Eastern Wu by the Western Jin in 280.
      The Three Kingdoms period is one of the bloodiest in Chinese history. A nationwide census
      taken in 280 AD, following the reunification of the Three Kingdoms under the Jin shows a total
      of 2,459,840 households and 16,163,863 individuals which was only a fraction of the 10,677,960
      households, and 56,486,856 individuals reported during the Han era.
      While the census may not have been particularly accurate due to a multitude of
      factors of the times, in 280, the Jin did make an attempt to account for all individuals
      where they could.
      Technology advanced significantly during this period. Shu chancellor Zhuge Liang invented the
      wooden ox, suggested to be an early form of the wheelbarrow, and improved on the repeating
      crossbow. Wei mechanical engineer Ma Jun is considered by many to be the equal of his
      predecessor Zhang Heng. He invented a hydraulic-powered, mechanical puppet theatre designed
      for Emperor Ming of Wei, square-pallet chain pumps for irrigation of gardens in Luoyang, and
      the ingenious design of the south-pointing chariot, a non-magnetic directional
      compass operated by differential gears.
      Although relatively short, this historical period has been
      greatly romanticized in the cultures of China, Japan, Korea, and Vietnam.
      It has been celebrated and popularized in operas, folk stories, novels and in
      more recent times, films, television, and video games. The best known of these
      is Luo Guanzhong's Romance of the Three Kingdoms, a Ming dynasty historical novel
      based on events in the Three Kingdoms period. The authoritative historical
      record of the era is Chen Shou's Records of the Three Kingdoms, along with Pei
      Songzhi's later annotations of the text.
      The English-language term "Three Kingdoms" is something of a misnomer, since each state
      was eventually headed not by a king, but by an emperor who claimed suzerainty over all China.
      Nevertheless, the term "Three Kingdoms" has become standard among English-speaking sinologists.
      - Wikipedia, <i>Three Kingdoms</i>
    </div>
    <ParallaxBG id="para2" file-url="./Picture1.jpg" css-height="50vh" z-value="-255"></ParallaxBG>
    <div class="footer"></div>
  </div>
  <img src="./assets/Three_Kingdoms_timelapse.gif" id="coolFloatyGif" :class="{ showCoolGif: this.gifClass }">
</template>

<script>
import TopBarTerm from "@/components/TopBarTerm";
import ParallaxBG from "@/components/ParallaxBG";
let options = {
  root: document.querySelector('.pagewrapper'),
  rootMargin: '20px',
  threshold: 0.1
}
export default {
  name: 'App',
  components: {
    ParallaxBG,
    TopBarTerm
  },
  gifClass: false,
  data(){
    return {
      gifClass: this.gifClass
    }
  },
  methods:{

  },
  async created(){
    await this.$nextTick();
    let observer = new IntersectionObserver(()=>{this.gifClass = true}, options);
    observer.observe(document.querySelector("#box2"));
  }
}

// color scheme: #311D14
// #989385
// #9B8882
// #C1763F

</script>

<style>
/*
#311D14
#9B8882
#C1763F
#8F4D31
rgb(230,230,255)
 */
body{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  font-size: 26px;
  color: #2c3e50;
}
.pagewrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  font-size: 26px;
  color: #2c3e50;
  height: 100vh;
  perspective: 1px;
  transform-style: preserve-3d;
  overflow-x: hidden;
  overflow-y: auto;
}
html {
  overflow: hidden;
}
.main {
  width: 100vw;
  height: 30vh;
  background: rgb(255,255,255);
  padding-top: 20vh;
  z-index: 2;
  position: relative;
}
.topBar{
  top: 0;
  left: 0;
  position: absolute;
  margin-top: 0;
  margin-left: 0;
  width: 100%;
  height: min(30%, 90px);
  background: midnightblue;
  color: white;
  z-index: 255;
  display: flex;
}
.footer{
  width: 100vw;
  padding-top:20vh;
  position: relative;
  top: calc(100% - min(30%, 90px));
  bottom:0;
  background: midnightblue;
  height: 50%;
  z-index: 255;
}
#box1{
  z-index: 254;
  background-image: linear-gradient(45deg, midnightblue, #ff8935);
  transform: skewY(-5deg);
  color: rgb(230,230,255);
  font-size: 50px;
}
#intro{
  z-index: 253;
  transform: skewY(-5deg);
  padding-top: 30px;
  color: rgb(128,128,128);
  font-size: 40px;
}
#box2{
  top: -10vh;
  width: auto;
  padding-left: 50px;
  padding-right: 600px;
  text-align: left;
  z-index: 253;
  font-size: 20px;
  height: fit-content;
}
#para2:before{
  top: 100vh;
}
#coolFloatyGif{
  z-index: 255;
  position: fixed;
  width: 50vh;
  height: 50vh;
  top: 50%;
  transform: translateY(-50%);
  left: calc(100vw - 50vh - 50px);
  background-image: url("./assets/Three_Kingdoms_timelapse.gif");
  opacity: 0;
  transition: opacity, 0.5s;
}
.showCoolGif{
  z-index: 255;
  position: fixed;
  width: 50vh;
  height: 50vh;
  top: 50%;
  transform: translateY(-50%);
  left: calc(100vw - 50vh - 50px);
  background-image: url("./assets/Three_Kingdoms_timelapse.gif");
  opacity: 100%;
  transition: opacity, 0.5s;
}</style>
