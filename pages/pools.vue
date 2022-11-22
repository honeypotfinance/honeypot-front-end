<template>
  <div id="pools">
    <section id="pools-header" class="divcol" style="gap: 10px">
      <h1 class="tcap font1 acenter" style="gap: inherit">pools</h1>

      <v-card class="card space">
        <div class="divcol" style="gap: 10px">
          <label>Total Value Locked 
            <img src="~/assets/sources/icons/info.svg" alt="info icon" style="--w: .813125em">
          </label>
          <span>{{poolsLocked ? `$${poolsLocked.toLocaleString().split('.').join(',')}` : ''}}</span>
        </div>

        <img
          src="~/assets/sources/miscellaneous/locked-pools-test-img.jpg" alt="test image"
          style="--h: 123px; --ar: 1.75 / 1; border-radius: 0 !important"
        >
      </v-card>
    </section>

    <section class="controls divcol" style="gap: 15px; margin-block: 30px 20px">
      <v-tabs v-model="tabsPools_model" hide-slider>
        <v-tab v-for="item in dataFilterPools" :key="item" class="tcap" @change="filters.pools = item">
          {{item}}
        </v-tab>
      </v-tabs>
      
      <div class="space" style="gap: 15px">
        <v-text-field
          v-model="filters.search"
          label="Search"
          class="font3"
          style="--b: 1px solid #2D291D; --br: 10px; --h: 46px; --fs: 14px; --c-label: var(--accent); --caret: var(--accent)"
          hide-details solo
          clearable
          clear-icon="mdi-close"
        >
          <template #prepend-inner>
            <img src="~/assets/sources/icons/search.svg" alt="search icon" class="mr-1">
          </template>
        </v-text-field>
        
        <v-btn class="btn" style="--fs: .875em;--b: 1px solid #2D291D; --br: 10px; --g: .625em; --h: 46px">
          <v-icon size="1.5em">mdi-plus</v-icon>
          Create Pool
        </v-btn>
      </div>
    </section>
    
    <v-data-table
      :headers="tableHeaders"
      :items="filterDataPools"
      hide-default-footer
      mobile-breakpoint="-1"
      class="custome-table"
      @click:row="goTo($event)"
    >
      <template #[`item.name`]="{ item }">
        <div class="acenter font2" style="gap: 10px">
          <v-sheet class="dual-tokens" color="transparent" style="--h-sheet: 40px">
            <img :src="require(`~/assets/sources/tokens/${item.tokenA}.svg`)" :alt="`${item.tokenA} token`" class="aspect">
            <img :src="require(`~/assets/sources/tokens/${item.tokenB}.svg`)" :alt="`${item.tokenB} token`" class="aspect">
          </v-sheet>
          
          <span class="bold tup">{{`${item.tokenA}-${item.tokenB}`}}</span>
        </div>
      </template>
      
      <template #[`item.liquidity`]="{ item }">
        {{item.liquidity ? `$${item.liquidity.toLocaleString().split(".").join(",")}` : ""}}
      </template>
      
      <template #[`item.volume`]="{ item }">
        {{item.volume ? `$${item.volume.toLocaleString().split(".").join(",")}` : ""}}
      </template>
      
      <template #[`item.fees`]="{ item }">
        {{item.fees ? `$${item.fees.toLocaleString().split(".").join(",")}` : ""}}
      </template>
      
      <template #[`item.apr`]="{ item }">
        {{item.apr ? `${item.apr}%` : ""}}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "PoolsPage",
  mixins: [computeds],
  data() {
    return {
      poolsLocked: 200009,
      dataFilterPools: ["all pools", "my pools"],
      filters: {
        pools: "all farms",
        search: undefined,
      },
      tabsPools_model: 0,

      tableHeaders: [
        { value: "name", text: "Name",  sortable: false },
        { value: "liquidity", text: "Liquidity", align: "start", sortable: false },
        { value: "volume", text: "Volume (24th)", align: "start", sortable: false },
        { value: "fees", text: "Fees (24th)", align: "start", sortable: false },
        { value: "apr", text: "APR", align: "start", sortable: false },
        
      ],
      dataPools: [
        {
          tokenA: "btc",
          tokenB: "usdc",
          liquidity: 100000000,
          volume: 100000000,
          fees: 100000000,
          apr: 2335,
        },
        {
          tokenA: "btc",
          tokenB: "usdc",
          liquidity: 100000000,
          volume: 100000000,
          fees: 100000000,
          apr: 2335,
        },
        {
          tokenA: "btc",
          tokenB: "usdc",
          liquidity: 100000000,
          volume: 100000000,
          fees: 100000000,
          apr: 2335,
        },
      ],
    }
  },
  head() {
    const title = 'Pools';
    return {
      title,
    }
  },
  computed: {
    filterDataPools() {
      let filters = this.dataPools
      // search
      if (this.filters.search) filters = filters.filter(data => `${data.tokenA}-${data.tokenB}`.includes(this.filters.search))
      // filter pools
      if (this.filters.pools === 'my pools') filters = filters.filter(data => data.mine)

      return filters
    },
  },
  methods: {
    goTo(item) {
      console.log(item)
      this.$router.push(`/pools-details`)
    }
  }
};
</script>

<style src="~/assets/styles/pages/pools.scss" lang="scss" />
