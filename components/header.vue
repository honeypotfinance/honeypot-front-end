<template>
  <div>
    <MenuHeader ref="menu"></MenuHeader>
    <v-app-bar id="header" color="transparent" fixed class="isolate">
      <nuxt-link to="/">
        <img src="~/assets/sources/logos/logo.svg" alt="logo">
      </nuxt-link>

      <aside class="middle tcap">
        <a
          v-for="(item, i) in dataNavbar" :key="i"
          :class="{active: item.active}"
          @click="dataNavbar.forEach(e=>e.active=false); item.active = true; $router.push(localePath(item.to))">
          {{item.name}}
        </a>
      </aside>

      <aside class="right" :class="user.logged ? 'font2' : 'font1'">
        <v-btn class="btn">
          <img src="~/assets/sources/tokens/honeypot.svg" alt="token" class="aspect mr-2" style="--w: 24.53px">
          <span>${{user.balance}}</span>
        </v-btn>
        
        <v-btn v-show="!user.logged" class="btn" @click="$store.commit('signIn')">Connect wallet</v-btn>
        <v-btn v-show="user.logged" class="btn openMenuLogin">
          <span>{{user.accountId}}</span>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </aside>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      dataNavbar: [
        {
          name: "portfolio",
          active: false,
          to: "/"
        },
        {
          name: "swap",
          active: false,
          to: "/"
        },
        {
          name: "farm",
          active: false,
          to: "/"
        },
        {
          name: "pools",
          active: false,
          to: "/"
        },
        {
          name: "xhpot",
          active: false,
          to: "/"
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

<style src="~/assets/styles/components/header.scss" lang="scss" />
