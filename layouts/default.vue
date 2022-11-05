<template>
  <v-app id="layout" class="relative">
    <Alerts ref="alerts"></Alerts>
    <Navbar ref="navbar" />
    <v-main :class="wrapperSpace?'with':'without'" class="parent">
      <v-btn v-show="$route.path !== '/swap'" id="swap-floating-button" class="btn">
        <v-icon>mdi-chevron-up</v-icon>
        <span>Swap</span>
      </v-btn>
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
  watch: {
    $route() {
      this.dragFloatingBtn();
    }
  },
  created() {
    // get data profile
    this.$store.dispatch("getData");
  },
  mounted() {
    this.dragFloatingBtn();
    this.scrollX();
    // this.footerHeightListener();
    
    // resize listener
    // window.addEventListener("resize", this.footerHeightListener);
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.footerHeightListener);
  },
  methods: {
    scrollX() {
      const
        scrollableDesktop = document.querySelectorAll('.scrollx'),
        scrollableMobile = document.querySelectorAll('.scrollxmobile');
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
    dragFloatingBtn() {
      const target = document.getElementById ("swap-floating-button");
      let offset = [0,0], isDown = false;
      function typeEvent(event) {
        if (event.type.includes('mouse')) {
          return event
        } else if (event.type.includes('touch')) {
          return event.touches[0]
        }
      }

      const mousedown = (e) => {
        if (this.$route.path !== '/swap') {
          isDown = true;
          offset = [
            target.offsetTop - typeEvent(e).clientY
          ];
        }
      }
      const mousemove = (e) => {
        if (this.$route.path !== '/swap') {
          const
            position = typeEvent(e).clientY + offset[0],
            range = 100;
          if (e.type.includes('mouse')) e.preventDefault();
          if (isDown && position > range && position < window.innerHeight - (range + 80)) target.style.top  = `${position}px`;
        }
      }
      const mouseup = () => { 
        if (this.$route.path !== '/swap') { isDown = false }
      }

      // desktop
      target.addEventListener('mousedown', function(e) { mousedown(e) }, true);
      document.addEventListener('mouseup', function() { mouseup() }, true);
      document.addEventListener('mousemove', function(e) { mousemove(e) }, true);
      // mobile
      target.addEventListener('touchstart', function(e) { mousedown(e) }, true);
      document.addEventListener('touchend', function() { mouseup() }, true);
      document.addEventListener('touchmove', function(e) { mousemove(e) }, true);
    }
  },
}
</script>

<style src="~/assets/styles/layouts/default.scss" lang="scss" />
