<template>
  <div class="loader"></div>
</template>
<style lang="scss" scoped>
$animation-duration: 1.8s;
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 10px;
  background: #3498DB;
  border-radius: 5px;
  animation: load $animation-duration ease-in-out infinite; 
  &:before, &:after {
    position: absolute; 
    display: block;
    content: "";
    animation: load $animation-duration ease-in-out infinite;
    height: 10px;
    border-radius: 5px;
  }
    &:before {
    top: -20px;
    left: 10px;
    width: 40px;
    background: #EF4836;
  }
  &:after {
    bottom: -20px;
    width: 35px;
    background: #F5AB35; 
  }
}

@keyframes load {
  0% {
    transform: translateX(40px);
  }
  
  50% {
    transform: translateX(-30px);
  }
  100% {
    transform: translateX(40px);
  }
}

</style>

<!-- <template>
  <div class="preloader" :style="cssVars">
    <span class="rot-1"></span>
    <span class="rot-2"></span>
    <span class="rot-3"></span>
    <span class="rot-4"></span>
    <span class="rot-5"></span>
    <span class="rot-6"></span>
    <span class="rot-7"></span>
    <span class="rot-8"></span>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  props: {
    color: {
      type: String,
      default: '#F0BA1B',
    },
    scale: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    cssVars() {
      return {
        '--color': this.color,
        '--scale': this.scale,
      }
    }
  }
}
</script>

<style scoped>
.preloader {
  position: relative;
  width: 125px;
  height: 125px;
  margin: auto;
  transform: scale(var(--scale));
}
.preloader > span {
  position: absolute;
  background-color: transparent;
  height: 22px;
  width: 22px;
  border-radius: 12px;
  animation-name: f_fadeG;
  animation-duration: 1.0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
}
.rot-1 {
  left: 0;
  top: 51px;
  animation-delay: 0.2s;
}
.rot-2 {
  left: 15px;
  top: 15px;
  animation-delay: 0.35s;
}
.rot-3 {
  left: 51px;
  top: 0;
  animation-delay: 0.50s;
}
.rot-4 {
  right: 15px;
  top: 15px;
  animation-delay: 0.65s;
}
.rot-5 {
  right: 0;
  top: 51px;
  animation-delay: 0.80s;
}
.rot-6 {
  right: 15px;
  bottom: 15px;
  animation-delay: 0.95s;
}
.rot-7 {
  left: 51px;
  bottom: 0;
  animation-delay: 1.10s;
}
.rot-8 {
  left: 15px;
  bottom: 15px;
  animation-delay: 1.25s;
}
@keyframes f_fadeG {
  0% {
    background-color: var(--color);
  }
  100% {
    background-color: transparent;
  }
}
</style> -->