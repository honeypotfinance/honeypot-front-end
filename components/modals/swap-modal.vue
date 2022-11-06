<template>
  <div class="modals">
    <!-- modal settings -->
    <v-dialog v-model="modalSettings" content-class="modalSettings" width="400px">
      <section class="modalSettings-header space">
        <h3 class="p" style="--fw: 700">Exchange Settings</h3>
        <v-btn icon style="top: -10px" @click="modalSettings = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </section>

      <div class="divcol" style="gap: 5px">
        <label class="plain">Slippage Tolerance
          <v-tooltip bottom max-width="174px" color="#574F42">
            <template #activator="{on, attrs}">
              <img src="~/assets/sources/icons/info.svg" alt="info" v-bind="attrs" v-on="on">
            </template>
            
            <span>your transaction will revert if the price changes unfavourably by more than it’s percentage</span>
          </v-tooltip>
        </label>
        
        <div class="space wrap" style="gap: 10px 0">
          <v-btn
            v-for="item in dataSlippage" :key="item" plain class="btn2"
            :class="{active: item === slippageSelection}" @click="slippageSelection = item"
          >{{item}}%</v-btn>
        </div>
      </div>

      <div class="divcol" style="gap: 5px">
        <label class="plain">Transaction Deadline</label>
        
        <div class="acenter" style="gap: inherit">
          <v-text-field
            v-model="deadlineSelection"
            type="number"
            placeholder="-"
            solo
            class="btn2"
          ></v-text-field>
          <span>Min</span>
        </div>
      </div>
    </v-dialog>


    <!-- modal chart -->
    <v-dialog v-model="modalChart" width="496px" content-class="modalChart">
      <ChartsSwapChart ref="chart" height="400px" closable @model="modalChart = false"></ChartsSwapChart>
    </v-dialog>


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
  </div>
</template>

<script>
export default {
  name: "SwapModalComponent",
  data() {
    return {
      // modal settings
      modalSettings: false,
      dataSlippage: [0.5, 1, 2, 3.5],
      slippageSelection: 0.5,
      deadlineSelection: undefined,
      // modal chart
      modalChart: false,
      // modal token
      handlerToken: undefined,
      modalTokens: false,
      searchToken: undefined,
      dataPopularTokens: [
        {
          img: require('~/assets/sources/tokens/honeypot.svg'),
          name: "honeypot",
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
          img: require('~/assets/sources/tokens/honeypot.svg'),
          name: "honeypot",
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
          img: require('~/assets/sources/tokens/honeypot.svg'),
          name: "honeypot",
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
          img: require('~/assets/sources/tokens/honeypot.svg'),
          name: "honeypot",
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
          img: require('~/assets/sources/tokens/honeypot.svg'),
          name: "honeypot",
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
      return this.$store.getters.filters({
        items: this.dataTokens, search: this.searchToken
      })
    },
  },
  watch: {
    modalSettings(current) {
      if (current) {
        this.$targetTooltip('.modalSettings img[alt="info"]')
        window.addEventListener("resize", () => this.$targetTooltip('.modalSettings img[alt="info"]', 13))
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$targetTooltip)
  },
  methods: {
    isSameToken(item) {
      return this.handlerToken?.name === item?.name
    },
    selectToken(item) {
      const data = [this.$parent.swapFrom, this.$parent.swapTo]; let same;
      for (const token of data) {
        if (token.name === item.name) same = token
      }
      
      if (same) { this.$parent.switchTokens() }
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
