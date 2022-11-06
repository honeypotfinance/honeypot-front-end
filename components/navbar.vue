<template>
  <div>
    <MenuNavbar ref="menu"></MenuNavbar>
    <v-app-bar id="navbar" color="transparent" absolute class="isolate">
      <nuxt-link to="/swap">
        <img src="~/assets/sources/logos/logo.svg" alt="logo" style="--w: clamp(10em, 13vw, 13.414375em)">
      </nuxt-link>

      <aside class="middle tcap deletemobile">
        <a
          v-for="(item, i) in dataNavbar" :key="i"
          :class="{active: item.to === $route.path}"
          @click="$router.push(localePath(item.to))">
          {{item.name}}
        </a>
      </aside>

      <aside class="right" :class="user.logged ? 'font2' : 'font1'">
        <v-btn class="btn2">
          <img src="~/assets/sources/tokens/honeypot.svg" alt="token" class="aspect mr-2" style="--w: 1.533125em">
          <span>${{user.balance}}</span>
        </v-btn>
        
        <v-btn v-show="!user.logged" class="btn2" @click="$store.commit('signIn')">Connect wallet</v-btn>
        <v-btn v-show="user.logged" class="btn2 openMenuLogin">
          <span>{{user.accountId}}</span>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </aside>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      dataNavbar: [
        {
          name: "portfolio",
          to: ""
        },
        {
          name: "swap",
          to: "/swap"
        },
        {
          name: "farm",
          to: "/farm"
        },
        {
          name: "pools",
          to: ""
        },
        {
          name: "xhpot",
          to: ""
        },
      ],
    };
  },
  computed: {
    user() {return this.$store.state.dataUser},
  },
  // created() {
  //   const theme = localStorage.getItem("theme");
  //   if (theme) {
  //     setTimeout(() => {
  //       this.$store.commit("switchTheme", theme);
  //     }, 100);
  //   }
  //   if (theme === "light") {this.themeButton = true}
  //   else {this.themeButton = false}
  // },
  methods: {
    // changeTheme(theme) {
    //   this.$store.commit("switchTheme", theme);
    //   this.themeButton = !this.themeButton;
    // },
  },
};
</script>

<style src="~/assets/styles/components/navbar.scss" lang="scss" />
