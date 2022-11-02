<template>
  <v-app id="layout" class="relative">
    <Alerts ref="alerts"></Alerts>
    <Navbar ref="navbar" />
    <v-main :class="wrapperSpace?'with':'without'" class="parent">
      <nuxt-child />
    </v-main>
    <!-- <Footer ref="footer"></Footer> -->
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  // middleware: ['authenticated'],
  data() {
    return {
      wrapperSpace: false,
    }
  },
  created() {
    // get data profile
    this.$store.dispatch("getData");
  },
  mounted() {
    this.scrollX();
    // this.footerHeightListener();
    
    // resize listener
    // window.addEventListener("resize", this.footerHeightListener);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.footerHeightListener);
  },
  methods: {
    scrollX() {
      const scrollableDesktop = document.querySelectorAll('.scrollx');
      const scrollableMobile = document.querySelectorAll('.scrollxmobile');
      if (scrollableDesktop) {
        for (const el of scrollableDesktop) {
          el.addEventListener("wheel", event => { event.preventDefault(); el.scrollLeft += event.deltaY })
        }
      }
      if (scrollableMobile) {
        for (const el of scrollableMobile) {
          el.addEventListener("wheel", event => {
            if (window.innerWidth <= 880) { event.preventDefault(); el.scrollLeft += event.deltaY }
          })
        }
      }
    },
    footerHeightListener() {
      setTimeout(() => {
        const footer = document.querySelector('#footer');
        document.documentElement.style.setProperty(
          '--h-footer', `${footer.getBoundingClientRect().height}px`
        );
      }, 400);
    },
  },
}
</script>

<style src="~/assets/styles/layouts/default.scss" lang="scss" />
