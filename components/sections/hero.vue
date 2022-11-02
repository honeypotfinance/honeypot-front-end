<template>
  <div id="hero" class="divcol center overflow">
    <h1 class="hover_split maxsize_w">WHO ARE YOU?
      <span class="mask"><span>WHO ARE YOU?</span></span>
      <span class="mask"><span>WHO ARE YOU?</span></span>
    </h1>
    <img class="eliminarmobile" src="~/assets/sources/images/hero.png" alt="hero" style="--w:85.5em;--h:47.125em">
    <img class="vermobile" src="~/assets/sources/images/hero-mobile.png" alt="hero" style="--w:max(100%,24.375em);--h:37.4375em">

    <img id="artist" class="floating" src="~/assets/sources/miscellaneous/artist.svg" alt="fan">
    <img id="other" class="floating" src="~/assets/sources/miscellaneous/other.svg" alt="fan">
    <img id="fan" class="floating" src="~/assets/sources/miscellaneous/fan.svg" alt="fan">
  </div>
</template>

<script>
export default {
  name: "HeroSection",
  data() {
    return {
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/components/sections/hero.scss" lang="scss" />
