<template>
  <div id="farm">
    <section id="farm-header" class="divcol" style="gap: 10px">
      <h1 class="tcap font1 acenter" style="gap: inherit">my portfolio
        <v-icon color="var(--accent)" size="1em">mdi-eye-off-outline</v-icon>
      </h1>

      <v-card class="container-profits card grid">
        <div class="divcol">
          <label>deposits</label>
          <span>${{profits.deposit.toString().split(".").join(",")}}</span>
        </div>
        <div class="divcol">
          <label>rewards</label>
          <span>${{profits.rewards}}</span>
        </div>
        <div class="divcol">
          <label>monthly APY</label>
          <span>{{profits.apy_monthly}}%</span>
        </div>
        <div class="divcol">
          <label>daily APY</label>
          <span>{{profits.apy_daily}}%</span>
        </div>
      </v-card>
    </section>

    <section id="farm-controls" class="divcol" style="gap: 15px; margin-block: 30px 20px">
      <aside class="space" style="gap: inherit">
        <div class="acenter wrap" style="gap: inherit">
          <v-tabs v-model="filters.farms_model" hide-slider>
            <v-tab v-for="item in dataFilterFarms" :key="item" class="tcap">
              {{item}}
            </v-tab>
          </v-tabs>
          
          <v-tabs v-model="filters.filter_model" hide-slider>
            <v-tab v-for="item in dataFilter" :key="item" class="tcap">
              {{item}}
            </v-tab>
          </v-tabs>
        </div>
        
        <v-btn class="btn2">
          <img src="~/assets/sources/icons/options.svg" alt="options">
        </v-btn>
      </aside>
      
      <aside class="space wrap" style="gap: inherit">
        <v-text-field
          v-model="filters.search"
          label="Search"
          style="--b: 1px solid #2D291D; --br: 10px; --max-w: 262px; --h: 46px; --fs: 14px; --c-label: var(--accent); --caret: var(--accent)"
          hide-details solo
          clearable
          clear-icon="mdi-close"
        >
          <template #prepend-inner>
            <img src="~/assets/sources/icons/search.svg" alt="search icon" class="mr-1">
          </template>
        </v-text-field>
        
        <div class="center alignr" style="gap: 10px">
          <label class="plain">Sort by</label>
          <v-tabs v-model="filters.sort" hide-slider style="--bg-active: transparent">
            <v-tab v-for="item in dataSort" :key="item" class="tup">
              {{item}}
            </v-tab>
          </v-tabs>
        </div>
      </aside>
    </section>

    <section id="farm-content" class="gridauto">
      <!-- not logged -->
      <div v-show="!isLogged" class="divcol center tcenter align font1 nopevents maxsize_w">
        <img src="~/assets/sources/icons/wallet-empty.png" alt="empty icon" style="--w: 13.4375em">
        <span class="h9_em bold mt-5 mb-2">You haven't connected your wallet.</span>
        <span class="h11_em">Connect to view eligible farms.</span>
        <v-btn
          class="btn mt-3 pevents font2" style="--w: 10.3125em; --h: 3.25em; --stroke: .4px"
          @click="$store.dispatch('modalConnect')">
          Connect Wallet
        </v-btn>
      </div>

      <!-- empty -->
      <div v-show="filterDataFarms.length < 1 && isLogged" class="divcol center tcenter align font1 nopevents">
        <img src="~/assets/sources/icons/empty.png" alt="empty icon" style="--w: 13.4375em">
        <span class="h9_em bold mt-5 mb-2">No results found</span>
        <span class="h11_em">Try searching something else</span>
      </div>

      <!-- filled -->
      <template v-if="!filterDataFarms.length < 1 && isLogged">
        <v-card
          v-for="(item, i) in filterDataFarms" :key="i"
          class="card divcol"
          style=" --w: 100%; gap: 20px">
          <aside class="divcol align" style="gap: 10px">
            <v-sheet color="transparent" width="var(--w-sheet)" height="56px" class="relative" style="--w-sheet: 100px">
              <img :src="require(`~/assets/sources/tokens/${item.tokenA}.svg`)" :alt="`${item.tokenA} token`" class="aspect">
              <img :src="require(`~/assets/sources/tokens/${item.tokenB}.svg`)" :alt="`${item.tokenB} token`" class="aspect">
            </v-sheet>
            
            <h3 class="p tup">{{item.tokenA}}-{{item.tokenB}}</h3>
          </aside>
          
          <aside class="space wrap">
            <div class="divcol center" style="gap: 5px">
              <h3 class="p">{{item.apr + "%"}}</h3>
              <label>APR</label>
            </div>
            
            <div class="divcol center" style="gap: 5px">
              <h3 class="p">{{item.vol + "K"}}</h3>
              <label>24h Vol.</label>
            </div>
            
            <div class="divcol center" style="gap: 5px">
              <h3 class="p">{{"$" + item.tvl + "M"}}</h3>
              <label>TVL</label>
            </div>
          </aside>
          
          <aside class="fwrap space" style="gap: 10px; --max-w-child: 110px">
            <v-btn class="btn">Deposit</v-btn>
            <v-btn class="btn">Withdraw</v-btn>
            <v-btn class="btn">Claim {{item.claim}}</v-btn>
          </aside>
        </v-card>
      </template>
    </section>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "FarmPage",
  mixins: [computeds],
  data() {
    return {
      profits: {
        deposit: 20.009,
        rewards: 283,
        apy_monthly: 30,
        apy_daily: 20,
      },
      dataFilter: ["featured", "stablecoin"],
      dataFilterFarms: ["all farms", "my farms"],
      dataSort: ["tvl", "apr"],
      filters: {
        farms_model: 0,
        filter_model: 0,
        search: undefined,
        sort: 0,
      },
      
      dataFarms: [
        {
          tokenA: "btc",
          tokenB: "usdc",
          apr: 32,
          vol: 20,
          tvl: 1.2,
          claim: 29.7,
        },
        {
          tokenA: "btc",
          tokenB: "usdc",
          apr: 32,
          vol: 20,
          tvl: 1.2,
          claim: 29.7,
        },
        {
          tokenA: "btc",
          tokenB: "usdc",
          apr: 32,
          vol: 20,
          tvl: 1.2,
          claim: 29.7,
        },
      ],
    }
  },
  head() {
    const title = 'Farm';
    return {
      title,
    }
  },
  computed: {
    filterDataFarms() {
      return this.$store.getters.filters({items: this.dataFarms, search: this.filters.search})
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/farm.scss" lang="scss" />
