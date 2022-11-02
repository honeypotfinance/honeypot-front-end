<template>
  <div>
    <MenuHeader ref="menu"></MenuHeader>
    <v-app-bar id="header" color="transparent" fixed class="font2 isolate">
      <section class="acenter gap2" style="padding-left:calc(48px + 2em">
        <aside class="sidebar divcol acenter jspace isolate" :class="{active: sidebar}">
          <v-btn icon @click="toggleFunc()">
            <img :src="require(`~/assets/sources/icons/menu${positionFocus==0||positionFocus==16?'':'-active-sidebar'}.svg`)" alt="toggle">
          </v-btn>

          <div class="focus" :style="`--distanceInitial:${initialFocus};--distance:${positionFocus}px`" />

          <v-tooltip v-for="(item,i) in dataSidebar" :key="i" right color="var(--primary)">
            <template #activator="{ on, attrs}">
              <v-btn
                v-show="sidebar" :to="localePath('/')" icon :class="{openMenuMarket: item.key==='market', active: item.active}"
                v-bind="item.active?null:attrs" v-on="item.active?null:on" @click="positionFocus=item.position;activeSidebarIcons(item)">
                <img :src="require(`~/assets/sources/icons/${item.icon}${item.active?'-active':''}.svg`)" alt="side bar icons">
              </v-btn>
            </template>

            <span class="h9_em">{{item.name}}</span>
          </v-tooltip>
        </aside>

        <v-text-field id="search" hide-details solo style="--max-w: 14.6875em;--p: 0 1.5em" class="eliminarmobile">
          <template #append>
            <img src="~/assets/sources/icons/lupa.svg" alt="search">
          </template>
        </v-text-field>
      </section>

      <v-btn icon style="--p:2.3em;" @click="$router.push(localePath('/')); $scrollTo('home')">
        <img src="~/assets/sources/icons/records.svg" alt="records" style="--bs:drop-shadow(10px 5px 12px rgba(0, 0, 0, 0.25));--w:4.5em">
      </v-btn>

      <section class="acenter gap2">
        <template v-if="!user.user">
          <v-btn class="btn eliminarmobile" @click="$store.commit('signIn')">LOG IN WITH NEAR</v-btn>
          <v-btn icon @click="$store.commit('signIn')">
            <img :src="require(`~/assets/sources/icons/account.svg`)" alt="account" class="eliminarmobile aspect" style="--w:3em">
            <img :src="require(`~/assets/sources/icons/account-mobile.svg`)" alt="account" class="vermobile aspect" style="--w:3em">
          </v-btn>
        </template>

        <!-- console.log('abrir-menu-perfil') -->
        <div v-show="user.user" class="openMenuLogin acenter" style="cursor:pointer;border-radius:4vmax">
          <v-btn v-if="user.avatar" icon>
            <img :src="user.avatar" alt="account" class="eliminarmobile aspect" style="--w:3em;--br:50%;--b:2px solid var(--clr);--p:4px">
            <img :src="user.avatar" alt="account" class="vermobile aspect" style="--w:3em;--br:50%;--b:2px solid var(--clr);--p:4px">
          </v-btn>
          <v-skeleton-loader v-else type="avatar" />
          <v-icon v-show="user.user">mdi-menu-down</v-icon>
        </div>
      </section>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      messages: 1,
      sidebar: false,
      initialFocus: 0,
      positionFocus: 0,
      dataSidebar: [
        { key:"market", icon: "market", name:"Marketplace", position: 120, active: false },
        { key:"stats", icon: "stats", name:"stats", to:"/stats", position: 240, active: false },
        { key:"chats", icon: "chats", name:"chats", to: "/chats", position: 360, active: false },
        { key:"settings", icon: "settings", name:"settings", position: 480, active: false  },
        { key:"faq", icon: "faq", name:"faq", position: 600, active: false  },
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
    activeSidebarIcons(item) {
      this.dataSidebar.forEach(e=>{e.active=false});
      setTimeout(() => {
        item.active=true
      }, 500);
    },
    toggleFunc() {
      if (window.innerWidth <= 880) {
        this.$refs.menu.drawer=true
      } else {
        this.sidebar=!this.sidebar
        this.dataSidebar.forEach(e=>{e.active=false})
        this.positionFocus=0
        if (this.sidebar === false) {this.initialFocus=0}
        else {this.initialFocus=16}
      }
    },
    // changeTheme(theme) {
    //   this.$store.commit("switchTheme", theme);
    //   this.themeButton = !this.themeButton;
    // },
  },
};
</script>

<style src="~/assets/styles/components/header.scss" lang="scss" />
