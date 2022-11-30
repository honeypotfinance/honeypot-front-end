<template>
  <!-- modal token -->
  <v-dialog v-model="modalTokens" width="447px" content-class="modalTokens">
    <section class="modalTokens-header">
      <div class="wrapper-header">
        <h3 style="--fw: 700">Select a token</h3>
        <v-btn icon style="top: -10px" @click="modalTokens = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      
      <v-text-field
        v-model="searchToken"
        prepend-icon="mdi-magnify"
        placeholder="search name or paste address"
        hide-details solo
        style="--fs: 18px;  --fw: 400; --p: 0 12px 0 0; --c-place: var(--accent); --tt: lowercase"
      ></v-text-field>
      
      <aside class="container-popular" style="gap: 10px">
        <label class="plain tup" style="--fw: 600">popular</label>
        <div class="wrap" :class="{space: dataPopularTokens.length > 4}" style="gap: inherit">
          <v-chip
            v-for="(item, i) in dataPopularTokens.slice(0, 8)" :key="i" class="tup" color="#292724" style="border-radius: 10px; min-width: 82px"
            :disabled="isSameToken(item)" @click="selectToken(item)"
          >
            <v-img :src="item.img" class="aspect mr-2" style="--w: 20px">
              <template #placeholder>
                <v-skeleton-loader type="avatar" />
              </template>
            </v-img>
            {{item.name}}
          </v-chip>
        </div>
      </aside>
    </section>

    <v-virtual-scroll
      :items="filterDataTokens"
      height="400"
      item-height="60"
      class="modalTokens-content"
    >
      <template #default="{ item }">
        <v-card class="space" style="gap: 10px" :disabled="isSameToken(item)" @click="selectToken(item)">
          <div class="acenter tcap" style="gap: 10px">
            <v-img :src="item.img" :alt="`${item.name} token`" class="aspect" style="--w: 35.5px">
              <template #placeholder>
                <v-skeleton-loader type="avatar" />
              </template>
            </v-img>
            
            <div class="divcol" style="gap: inherit">
              <span class="tup">{{item.name}}</span>
              <span>{{item.fullname}}</span>
            </div>
          </div>
          
          <label>{{item.value}}</label>
        </v-card>
      </template>
    </v-virtual-scroll>
  </v-dialog>
</template>

<script>
export default {
  name: "TokenModalComponent",
  props: {
    from: {
      type: Object,
      default: undefined
    },
    to: {
      type: Object,
      default: undefined
    },
  },
  data() {
    return {
      // modal token
      handlerToken: undefined,
      modalTokens: false,
      searchToken: undefined,
      dataPopularTokens: [
        {
          img: require('~/assets/sources/tokens/hny.svg'),
          name: "hny",
          fullname: "honeypot",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/btc.svg'),
          name: "btc",
          fullname: "bitcon",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/usdc.svg'),
          name: "usdc",
          fullname: "usdc coin",
          value: 0,
        },
      ],
      dataTokens: [
        {
          img: require('~/assets/sources/tokens/hny.svg'),
          name: "hny",
          fullname: "honeypot",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/btc.svg'),
          name: "btc",
          fullname: "bitcon",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/usdc.svg'),
          name: "usdc",
          fullname: "usdc coin",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "bear",
          fullname: "bear bear",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/hny.svg'),
          name: "hny",
          fullname: "honeypot",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/btc.svg'),
          name: "btc",
          fullname: "bitcon",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/usdc.svg'),
          name: "usdc",
          fullname: "usdc coin",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "bear",
          fullname: "bear bear",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/hny.svg'),
          name: "hny",
          fullname: "honeypot",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/btc.svg'),
          name: "btc",
          fullname: "bitcon",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/usdc.svg'),
          name: "usdc",
          fullname: "usdc coin",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "bear",
          fullname: "bear bear",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/hny.svg'),
          name: "hny",
          fullname: "honeypot",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/btc.svg'),
          name: "btc",
          fullname: "bitcon",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/usdc.svg'),
          name: "usdc",
          fullname: "usdc coin",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "bear",
          fullname: "bear bear",
          value: 0,
        },
      ],
    };
  },
  computed: {
    filterDataTokens() {
      let filters = this.dataTokens;
      if (this.searchToken) filters = filters.filter(data => data.name.includes(this.searchToken))
      return filters
    },
  },
  methods: {
    isSameToken(item) {
      return this.handlerToken?.name === item?.name
    },
    selectToken(item) {
      const data = [this.from, this.to]; let same;
      for (const token of data) {
        if (token.name === item.name) same = token
      }
      
      if (same) {
        [this.from.img, this.from.name, this.to.img, this.to.name] = [this.to.img, this.to.name, this.from.img, this.from.name]
      }
      else {
        for (const key of Object.keys(this.handlerToken)) {
          if (key !== "amount") this.handlerToken[key] = item[key]
        }
      }
      this.modalTokens = false
    },
    openModalTokens(item) {
      this.modalTokens = true
      this.handlerToken = item
    },
  }
};
</script>

<style src="~/assets/styles/components/modals.scss" lang="scss" />
