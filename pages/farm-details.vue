<template>
  <div id="farm-details">
    <section id="farm-details-header" class="divcol" style="gap: 10px">
      <h1 class="font1 acenter deletemobile" style="gap: inherit">My Portfolio
        <v-btn icon @click="hideProfits = !hideProfits">
          <v-icon size="2.3em" color="var(--accent)">mdi-eye{{hideProfits ? "" : "-off"}}-outline</v-icon>
        </v-btn>
      </h1>

      <v-card class="container-profits card divcol">
        <div class="grid showmobile pl-4">
          <h1 class="p font1 acenter">Portfolio
            <v-btn icon max-width="max-content" height="max-content" @click="hideProfits = !hideProfits">
              <v-icon size=".6em" color="var(--accent)">mdi-eye{{hideProfits ? "" : "-off"}}-outline</v-icon>
            </v-btn>
          </h1>
        </div>

        <v-sheet color="transparent" class="grid" :class="{hide: hideProfits}">
          <div class="divcol">
            <label>deposits
              <v-tooltip bottom max-width="174px" color="#574F42">
                <template #activator="{on, attrs}">
                  <img src="~/assets/sources/icons/info.svg" alt="info" style="--w: max(11px, .8em)" v-bind="attrs" v-on="on">
                </template>
                
                <span>info</span>
              </v-tooltip>
            </label>
            <span>${{profits.deposit.toString().split(".").join(",")}}</span>
          </div>
          
          <div class="divcol">
            <label>rewards
              <v-tooltip bottom max-width="174px" color="#574F42">
                <template #activator="{on, attrs}">
                  <img src="~/assets/sources/icons/info.svg" alt="info" style="--w: max(11px, .8em)" v-bind="attrs" v-on="on">
                </template>
                
                <span>info</span>
              </v-tooltip>
            </label>
            <span>${{profits.rewards}}</span>
          </div>
          
          <div class="divcol">
            <label>monthly APY
              <v-tooltip bottom max-width="174px" color="#574F42">
                <template #activator="{on, attrs}">
                  <img src="~/assets/sources/icons/info.svg" alt="info" style="--w: max(11px, .8em)" v-bind="attrs" v-on="on">
                </template>
                
                <span>info</span>
              </v-tooltip>
            </label>
            <span>{{profits.apy_monthly}}%</span>
          </div>
          
          <div class="divcol">
            <label>daily APY
              <v-tooltip bottom max-width="174px" color="#574F42">
                <template #activator="{on, attrs}">
                  <img src="~/assets/sources/icons/info.svg" alt="info" style="--w: max(11px, .8em)" v-bind="attrs" v-on="on">
                </template>
                
                <span>info</span>
              </v-tooltip>
            </label>
            <span>{{profits.apy_daily}}%</span>
          </div>
        </v-sheet>
      </v-card>
    </section>

    <section class="controls divcol" style="gap: 15px; margin-block: 30px 20px">
      <aside class="space" style="gap: inherit">
        <div class="acenter wrap" style="gap: inherit">
          <v-tabs v-model="tabsFarms_model" hide-slider>
            <v-tab v-for="item in dataFilterFarms" :key="item" class="tcap" @change="filters.farms = item">
              {{item}}
            </v-tab>
          </v-tabs>
          
          <v-tabs v-model="tabsFilter_model" hide-slider>
            <v-tab v-for="item in dataFilter" :key="item" class="tcap" @change="filters.filter = item">
              {{item}}
            </v-tab>
          </v-tabs>
        </div>
        
        <v-btn class="btn2 deletemobile" @click="changeLayoutCells()">
          <img :src="require(`~/assets/sources/icons/cells-${layoutCells ? '2' : '1'}.svg`)" alt="layout cells type">
        </v-btn>
      </aside>
      
      <aside class="space" style="gap: inherit">
        <v-text-field
          v-model="filters.search"
          label="Search"
          class="search font3"
          style="--b: 1px solid #2D291D; --br: 10px; --max-w: 16.375em; --c-label: var(--accent); --caret: var(--accent)"
          hide-details solo
          clearable
          clear-icon="mdi-close"
        >
          <template #prepend-inner>
            <img src="~/assets/sources/icons/search.svg" alt="search icon" class="mr-1">
          </template>
        </v-text-field>
        
        <div class="center alignr contentsmoible" style="gap: 10px">
          <label class="plain deletemobile">Sort by</label>
          <v-tabs hide-slider class="tab2" style="--bg-active: transparent">
            <v-tab v-for="item in dataSort" :key="item" class="tup" @change="filters.sort = item">
              {{item}}
            </v-tab>
          </v-tabs>
        </div>
      </aside>
    </section>

    <!-- if not logged -->
    <div v-if="!isLogged" class="divcol center tcenter align font1 nopevents maxsize_w">
      <img src="~/assets/sources/icons/wallet-empty.png" alt="empty icon" style="--w: 13.4375em">
      <span class="h9_em bold mt-5 mb-2">You haven't connected your wallet.</span>
      <span class="hspan" style="--fs: max(13px, 1em)">Connect to view eligible farms.</span>
      <v-btn
        class="btn mt-3 pevents font2" style="--w: 10.3125em; --h: 3.25em; --stroke: .4px"
        @click="$store.dispatch('modalConnect')">
        Connect Wallet
      </v-btn>
    </div>
    
    <!-- if empty -->
    <div v-else-if="filterDataFarms.length < 1 && layoutCells" class="divcol center tcenter align font1 nopevents">
      <template v-if="filters.farms === 'my farms'">
        <img src="~/assets/sources/icons/my-farms-empty.png" alt="empty icon" style="--w: 13.4375em">
        <span class="h9_em bold mt-5 mb-2">You dont have any farms</span>
        <span class="hspan" style="--fs: max(13px, 1em)">See which pools are available to swap</span>
        <v-btn class="btn mt-3 pevents font2" style="--w: 10.3125em; --h: 3.25em; --stroke: .4px">
          Create LP
        </v-btn>
      </template>
      
      <template v-else>
        <img src="~/assets/sources/icons/empty.png" alt="empty icon" style="--w: 13.4375em">
        <span class="h9_em bold mt-5 mb-2">No results found</span>
        <span class="hspan" style="--fs: max(13px, 1em)">Try searching something else</span>
      </template>
    </div>

    <!-- content filled -->
    <template v-else>
      <!-- layoutcell 1 -->
      <section v-if="layoutCells" id="farm-details-content" class="gridauto">
        <v-card
          v-for="(item, i) in filterDataFarms" :key="i"
          class="card divcol"
          style=" --w: 100%; gap: 20px">
          <aside class="divcol align" style="gap: 10px">
            <v-sheet class="dual-tokens" color="transparent">
              <img :src="require(`~/assets/sources/tokens/${item.tokenA}.svg`)" :alt="`${item.tokenA} token`" class="aspect">
              <img :src="require(`~/assets/sources/tokens/${item.tokenB}.svg`)" :alt="`${item.tokenB} token`" class="aspect">
            </v-sheet>
            
            <h3 class="p tup">{{item.tokenA}}-{{item.tokenB}}</h3>
          </aside>
          
          <aside class="spacea wrap" style="gap: 5px">
            <div class="divcol center" style="gap: 5px">
              <h3 class="p">{{`${item.apr}%`}}</h3>
              <label>APR</label>
            </div>
            
            <div class="divcol center" style="gap: 5px">
              <h3 class="p">{{`${item.vol.formatter(true)}`}}</h3>
              <label>24h Vol.</label>
            </div>
            
            <div class="divcol center" style="gap: 5px">
              <h3 class="p">{{`$${item.tvl.formatter(true)}`}}</h3>
              <label>TVL</label>
            </div>
          </aside>
          
          <aside class="fwrap space" style="gap: 10px; --max-w-child: 110px">
            <v-btn class="btn">Deposit</v-btn>
            <v-btn class="btn">Withdraw</v-btn>
            <v-btn class="btn">Claim {{item.claim}}</v-btn>
          </aside>
        </v-card>
      </section>



      <!-- layoutcell 2 -->
      <v-data-table
        v-else
        :headers="tableHeaders"
        :items="filterDataFarms"
        hide-default-footer
        mobile-breakpoint="-1"
      >
        <template #[`item.poolName`]="{ item }">
          <div class="acenter font2" style="gap: 10px">
            <v-sheet class="dual-tokens" color="transparent" style="--h-sheet: 40px">
              <img :src="require(`~/assets/sources/tokens/${item.tokenA}.svg`)" :alt="`${item.tokenA} token`" class="aspect">
              <img :src="require(`~/assets/sources/tokens/${item.tokenB}.svg`)" :alt="`${item.tokenB} token`" class="aspect">
            </v-sheet>
            
            <span class="bold tup">{{item.poolName}}</span>
          </div>
        </template>
        
        <template #[`item.staked`]="{ item }">
          {{item.staked ? `$${item.staked.toLocaleString()}` : ""}}
        </template>
        
        <template #[`item.wallet`]="{ item }">
          {{item.wallet ? `$${item.wallet.toLocaleString()}` : ""}}
        </template>
        
        <template #[`item.apr`]="{ item }">
          {{item.apr ? `${item.apr.toLocaleString()}%` : ""}}
        </template>
        
        <template #[`item.tvl`]="{ item }">
          {{item.tvl ? `$${item.tvl.formatter(true)}` : ""}}
        </template>
        
        <template #[`item.actions`]>
          <div class="end" style="gap: 10px">
            <v-btn icon style="--bg: #292724">
              <v-icon size="1.2em">mdi-plus</v-icon>
            </v-btn>
            
            <v-btn icon style="--bg: #292724">
              <v-icon size="1.2em">mdi-minus</v-icon>
            </v-btn>
            
            <v-btn
              class="btn" style="--fs: 1.3125em; --stroke: .4px; --br: 10px"
            >
              <img src="~/assets/sources/icons/download.svg" alt="claim icon" style="--w: .8em">
              claim
            </v-btn>
          </div>
        </template>
        
        <template #no-data>
          <div class="divcol center tcenter align font1 nopevents">
            <template v-if="filters.farms === 'my farms'">
              <img src="~/assets/sources/icons/my-farms-empty.png" alt="empty icon" style="--w: 13.4375em">
              <span class="h9_em bold mt-5 mb-2">You dont have any farms</span>
              <span class="hspan" style="--fs: max(13px, 1em)">See which pools are available to swap</span>
              <v-btn class="btn mt-3 pevents font2" style="--w: 10.3125em; --h: 3.25em; --stroke: .4px">
                Create LP
              </v-btn>
            </template>
            
            <template v-else>
              <img src="~/assets/sources/icons/empty.png" alt="empty icon" style="--w: 13.4375em">
              <span class="h9_em bold mt-5 mb-2">No results found</span>
              <span class="hspan" style="--fs: max(13px, 1em)">Try searching something else</span>
            </template>
          </div>
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "FarmDetailsPage",
  mixins: [computeds],
  data() {
    return {
      hideProfits: false,
      profits: {
        deposit: 20.009,
        rewards: 283,
        apy_monthly: 30,
        apy_daily: 20,
      },
      dataFilterFarms: ["all farms", "my farms"],
      dataFilter: ["featured", "stablecoin"],
      dataSort: ["tvl", "apr"],
      layoutCells: true,
      filters: {
        farms: "all farms",
        filter: "featured",
        search: undefined,
        sort: "tvl",
      },
      tabsFarms_model: 0,
      tabsFilter_model: 0,
      
      tableHeaders: [
        { value: "poolName", text: "Name",  sortable: false },
        { value: "staked", text: "Staked", align: "center", sortable: false },
        { value: "wallet", text: "Wallet", align: "center", sortable: false },
        { value: "apr", text: "APR", align: "center", sortable: false },
        { value: "tvl", text: "TVL", align: "center", sortable: false },
        { value: "actions", align: "center", sortable: false },
      ],
      dataFarms: [
        {
          poolName: "btc-usdc",
          tokenA: "btc",
          tokenB: "usdc",
          apr: 32,
          vol: 20000,
          tvl: 32000000,
          claim: 29.7,
          staked: 1000,
          wallet: 10000,
        },
        {
          poolName: "btc-usdc",
          tokenA: "btc",
          tokenB: "usdc",
          apr: 50,
          vol: 20000,
          tvl: 12000000,
          claim: 29.7,
          staked: 1000,
          wallet: 10000,
        },
        {
          poolName: "btc-usdc",
          tokenA: "btc",
          tokenB: "usdc",
          apr: 12,
          vol: 20000,
          tvl: 22000000,
          claim: 29.7,
          staked: 1000,
          wallet: 10000,
        },
      ],
    }
  },
  head() {
    const title = 'All Farms';
    return {
      title,
    }
  },
  computed: {
    filterDataFarms() {
      // filters
      let filters = this.dataFarms;
      // filter A
      if (this.filters.farms === 'my farms') filters = filters.filter(data => data.mine)
      // // filter B
      // if (this.filters.filter === 'featured') filters = filters.filter(data => data.featured)
      // else if (this.filters.filter === 'stablecoin')  filters = filters.filter(data => data.stablecoin)
      // filter C
      if (this.filters.sort === 'tvl') filters.sort((a, b) => b.tvl - a.tvl)
      else if (this.filters.sort === 'apr') filters.sort((a, b) => b.apr - a.apr)
      // search
      if (this.filters.search) filters = filters.filter(data => `${data.tokenA}-${data.tokenB}`.includes(this.filters.search))

      return filters
    }
  },
  methods: {
    changeLayoutCells() {
      if (this.layoutCells) {
        this.dataFilterFarms = ["view all", "farms", "my farms"]
        this.filters.farms = this.dataFilterFarms[0]
        this.dataFilter.push("bluechip")
        this.filters.filter = this.dataFilter[0]
        this.layoutCells = false
      } else {
        this.dataFilterFarms = ["all farms", "my farms"]
        this.filters.farms = this.dataFilterFarms[0]
        this.dataFilter.pop()
        this.filters.filter = this.dataFilter[0]
        this.layoutCells = true
      }
      setTimeout(() => {
        this.tabsFarms_model = 1
        this.tabsFilter_model = 0
      }, 100);
    },
  }
};
</script>

<style src="~/assets/styles/pages/farm-details.scss" lang="scss" />
