<template>
  <div id="menuHeader">
    <!--////////////// drawers //////////////-->
    <!-- toggle drawer -->
    <v-navigation-drawer
      v-model="drawer"
      height="100%"
      fixed right
      temporary
      :overlay-opacity="$store.state.overlay.opacity"
      :overlay-color="$store.state.overlay.color"
      class="font2"
    >
      <section class="v-navigation-drawer__content--header divcol center gap2">
        <v-btn icon class="close" style="--top: 8px; --right: 10px" @click="drawer=false">
          <img src="~/assets/sources/icons/close.svg" alt="close" style="--w:2.375em">
        </v-btn>
        
        <a class="center" @click="$router.push(localePath('/')); $scrollTo('home')">
          <img src="~/assets/sources/icons/records.svg" alt="logo" style="--w: 6em">
        </a>
        <v-btn class="btn" style="--w:75%; --min-h: 30px; --p: .5em 2em" :ripple="false">Connect</v-btn>
      </section>

      <section class="v-navigation-drawer__content--content divcol jspace gap2">
        <v-expansion-panels focusable accordion class="anim_moveleft">
          <template v-if="dataDrawer.expansion">
            <v-expansion-panel v-for="(item, index) in dataDrawer.expansion" :key="index">
              <!-- title -->
              <v-expansion-panel-header class="conttitle acenter gap1 h10_em" hide-actions @click="ActiveClass('expansion', item)">
                  <img :src="require(`~/assets/sources/icons/${item.key}${item.active?'-active':''}.svg`)" :alt="`${item.key} icon`" class="icon" :class="{active: item.active}">
                  <span class="normal" style="max-width: max-content">{{ item.name }}</span>
                  <v-icon small color="#ffffff" :class="{reverse: item.active}">mdi-menu-down</v-icon>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-list>
                  <!-- ciclo for items -->
                  <v-list-item-group active-class="activeText">
                    <v-list-item v-for="(item2,i) in item.selection" :key="i" :ripple="false" :to="localePath(item2.to)" @click="drawer = false">
                      <v-list-item-title class="center h10_em">
                        <span class="normal">{{ item2.name}}</span>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </template>


          <template v-if="dataDrawer.list">
            <v-list class="fill_w">
              <!-- ciclo for items -->
              <v-list-item v-for="(item,i) in dataDrawer.list" :key="i" link :to="localePath(item.to)" :ripple="false">
                <v-list-item-title class="conttitle acenter gap1 h10_em" @click="ActiveClass('list', item); drawer = false">
                    <img :src="require(`~/assets/sources/icons/${item.key}${item.active?'-active':''}.svg`)" class="icon" :alt="`${item.key} icon`" :class="{active: item.active}">
                    <span style="max-width: max-content">
                      {{ item.name }}
                    </span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </template>
        </v-expansion-panels>

        <section class="v-navigation-drawer__content--footer divcol center">
          <span class="h10_em clr_inv">Join us on:</span>

          <div class="center">
            <v-btn v-for="(item,i) in dataSocial" :key="i" icon :href="item.url" target="_blank">
              <img :src="require(`~/assets/sources/icons/${item.icon}.svg`)" alt="social red">
            </v-btn>
          </div>
        </section>
      </section>
    </v-navigation-drawer>



    <!--////////////// menues //////////////-->
    <!-- menu login -->
    <v-menu activator=".openMenuLogin" bottom offset-y>
      <v-list class="font2" color="var(--secondary)" style="--c:#fff">
        <v-list-item-group active-class="activeClass">
          <v-list-item
            v-for="(item,i) in dataMenuLogin" :key="i"
            @click="item.key==='logout' ? $store.commit('signOut') : $router.push(localePath(key))">
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "HeaderMenuComponent",
  data() {
    return {
      messages: 1,
      drawer: false,
      dataDrawer: {
        list: [
          {
            key: "stats",
            name: "STATS",
            to: "/stats",
            active: false,
          },
          {
            key: "chats",
            name: "CHATS",
            to: "/chats",
            active: false,
          },
          {
            key: "settings",
            name: "SETTINGS",
            to: "/settings",
            active: false,
          },
          {
            key: "faq",
            name: "FAQ",
            to: "/faq",
            active: false,
          },
        ],
        expansion: [
          {
            key: "market",
            name: "MARKETPLACE",
            active: false,
            selection: [
              {key: "buy", name: "Buy", to: "/buy"},
              {key: "sell", name: "Sell", to: "/sell"},
            ],
          },
        ],
      },
      dataSocial: [
        { icon:"twitter", url:"#" },
        { icon:"instagram", url:"#" },
        { icon:"twitch", url:"#" }
      ],
      dataMenuLogin: [
        { key:"logout", name:"Log out" },
      ],
    };
  },
  // created() {
  //   const theme = localStorage.getItem("theme");
  //   this.overlayMethod(theme);
  // },
  methods: {
    ActiveClass(key, item) {
      // mejorar hace falta
      if (key === 'expansion') {
        if (item.active) {
          item.active=!item.active
        } else {
          this.dataDrawer.list.forEach(e=>{e.active=false})
          this.dataDrawer.expansion.forEach(e=>{e.active=false})
          item.active=true
        }
      } else if (key === 'list') {
        this.dataDrawer.expansion.forEach(e=>{e.active=false})
        this.dataDrawer.list.forEach(e=>{e.active=false})
        item.active=true
      }
    },
  },
};
</script>

<style src="~/assets/styles/components/header.scss" lang="scss" />
