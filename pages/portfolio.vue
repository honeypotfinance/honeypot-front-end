<template>
  <div id="portfolio" class="divcol" style="gap: 30px">
    <section id="portfolio-header" class="divcol" style="gap: inherit">
      <h1 class="tcap font2 tcenter">dashboard</h1>

      <aside id="profits" class="fwrap space" style="gap: inherit">
        <v-card class="card spacea acenter" style="gap: 20px">
          <div class="divcol">
            <label class="mb-1">Total Value Locked</label>
            <span class="hspan my-2">{{valueLocked.current ? `$${valueLocked.current.formatter(false, 2)}` : ''}}</span>
            <span>
              {{valueLocked.percent.toString().includes("-") ? `${valueLocked.percent}%` : `+${valueLocked.percent}%`}}
              this week
            </span>
          </div>
          
          <v-sparkline
            :value="valueLocked.grafic"
            :color="calcColor(valueLocked.grafic)"
            :smooth="15"
            :line-width="5"
            :height="isXMobile ? 150 : 200"
          ></v-sparkline>
        </v-card>
        
        <v-card class="card spacea acenter" style="gap: 20px">
          <div class="divcol">
            <label class="mb-1">Total Stakd</label>
            <span class="hspan my-2">{{valueStaked.current ? `$${valueStaked.current.formatter(false, 2)}` : ''}}</span>
            <span>
              {{valueStaked.percent.toString().includes("-") ? `${valueStaked.percent}%` : `+${valueStaked.percent}%`}}
              this week
            </span>
          </div>

          <v-sparkline
            :value="valueStaked.grafic"
            :color="calcColor(valueStaked.grafic)"
            :smooth="15"
            :line-width="5"
            :height="isXMobile ? 150 : 200"
          ></v-sparkline>
        </v-card>
        
        <v-card class="card spacea acenter" style="gap: 20px">
          <div class="divcol">
            <label class="mb-1">Claimable Rewards</label>
            <span class="hspan my-2">{{claimableRewards ? `$${claimableRewards.toLocaleString().split(".").join(",")}` : ''}}</span>
          </div>

          <v-btn
            class="btn2 font3" style="--fs: 1em; --fw: 700; --bg: #292724; --br: 100px; --b: 1px solid rgba(78, 56, 156, 0.16); --p: 12px 14px"
          >
            Claim All <img src="~/assets/sources/icons/download.svg" alt="claim icon" class="flr" style="--w: .9em">
          </v-btn>
        </v-card>
      </aside>
    </section>


    <section id="portfolio-content" class="fwrap" style="gap: inherit">
      <!-- portfolio table -->
      <v-sheet class="card divcol">
        <h3 class="p" style="--fs: 21px; --fw: 700">Your Portfolio</h3>

        <v-data-table
          :headers="portfolioHeaders"
          :items="dataPortfolio"
          style="--spacing: 0px; --p-td: 10px; --fs-th: 14px; --fs-td: 16px; --fw: 700; --distance-th: 0px"
          hide-default-footer
        >
          <template #[`item.fullName`]="{ item }">
            <div class="acenter" style="gap: 10px">
              <img :src="require(`~/assets/sources/tokens/${item.name}.svg`)" :alt="`${item.name} icon`" style="--w: 36.96px">
              
              <div class="divcol" style="--fw: 700; gap: 5px">
                <span class="tcap">{{item.fullName}}</span>
                <span class="hspan" style="font-size: 13px !important; --c: var(--accent)">
                  {{item.percent ? `${item.percent}%` : ''}}
                </span>
              </div>
            </div>
          </template>
          
          <template #[`item.balance`]="{ item }">
            {{item.balance}} {{item.name.toUpperCase()}}
          </template>
          
          <template #[`item.price`]="{ item }">
            {{item.price ? `$${item.price}` : ''}}
          </template>
          
          <template #no-data>
            <div class="divcol center tcenter align font1 nopevents mt-10">
              <img src="~/assets/sources/icons/empty.png" alt="empty icon" style="--w: 13.4375em">
              <span class="h9_em bold mt-5 mb-2">No results found</span>
              <span class="h11_em">Try searching something else</span>
            </div>
          </template>
        </v-data-table>
      </v-sheet>


      <!-- farms table -->
      <v-sheet class="card divcol">
        <aside class="space" style="gap: 15px">
          <div class="center" style="gap: inherit; --fw: 700">
            <h3 class="hspan p" style="--fs: 21px; --under: underline">Farms</h3>
            
            <span class="hspan" style="--fs: 21px; --c: var(--accent)">My Farms</span>
          </div>
          
          <a @click="$router.push(localePath('/farm'))">View all</a>
        </aside>

        <v-data-table
          :headers="farmsHeaders"
          :items="dataFarms"
          style="--spacing: 0px; --p-td: 10px; --fs-th: 14px; --fs-td: 16px; --fw: 700; --distance-th: 0px"
          hide-default-footer
        >
          <template #[`item.poolName`]="{ item }">
            <div class="acenter" style="gap: 10px">
              <v-sheet class="dual-tokens" color="transparent" style="--h-sheet: 35px; --b-img: none; --p-img: 0;">
                <img :src="require(`~/assets/sources/tokens/${item.tokenA}.svg`)" :alt="`${item.tokenA} token`" class="aspect">
                <img :src="require(`~/assets/sources/tokens/${item.tokenB}.svg`)" :alt="`${item.tokenB} token`" class="aspect">
              </v-sheet>
              
              <span class="tup">{{item.poolName}}</span>
            </div>
          </template>
          
          <template #[`item.apr`]="{ item }">
            {{item.apr ? `${item.apr}%` : item.apr}}
          </template>
          
          <template #[`item.tvl`]="{ item }">
            {{item.tvl ? `$${item.tvl.formatter(true)}` : ''}}
          </template>
          
          <template #[`item.ago`]="{ item }">
            {{item.ago.formatter(true)}}
          </template>
          
          <template #no-data>
            <div class="divcol center tcenter align font1 nopevents">
              <img src="~/assets/sources/icons/my-farms-empty.png" alt="empty icon" style="--w: 13.4375em">
              <span class="h9_em bold mt-5 mb-2">You dont have any pools</span>
              <span class="h11_em">Go to create a pool</span>
              <v-btn class="btn mt-3 pevents font2" style="--w: 10.3125em; --h: 3.25em; --stroke: .4px">
                Create Pool
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-sheet>
    </section>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'
import isMobile from '~/mixins/isMobile'

export default {
  name: "PortfolioPage",
  mixins: [computeds, isMobile],
  data() {
    return {
      valueLocked: {
        grafic: [2, 4, 3, 6, 7, 1, 7, 2, 9],
        current: 42830000,
        percent: 42
      },
      valueStaked: {
        grafic: [2, 4, 6, 1, 7, 1, 7, 9, 2],
        current: 42830000,
        percent: -42
      },
      claimableRewards: 2000,
      
      portfolioHeaders: [
        { text: "Name", value: "fullName" },
        { text: "Balance", value: "balance" },
        { text: "Price", value: "price" },
      ],
      dataPortfolio: [
        {
          name: "btc",
          fullName: "bitcoin",
          percent: 25,
          balance: 10,
          price: 128.22,
        },
        {
          name: "btc",
          fullName: "bitcoin",
          percent: 25,
          balance: 10,
          price: 128.22,
        },
        {
          name: "btc",
          fullName: "bitcoin",
          percent: 25,
          balance: 10,
          price: 128.22,
        },
      ],
      farmsHeaders: [
        { text: "Pool", value: "poolName" },
        { text: "APR", value: "apr" },
        { text: "TVL", value: "tvl" },
        { text: "24H", value: "ago" },
      ],
      dataFarms: [
        {
          poolName: "btc-usdc",
          tokenA: "btc",
          tokenB: "usdc",
          apr: 256,
          tvl: 328000000,
          ago: 100200,
        },
        {
          poolName: "hny-bear",
          tokenA: "hny",
          tokenB: "database",
          apr: 256,
          tvl: 328000000,
          ago: 100200,
        },
        {
          poolName: "btc-usdc",
          tokenA: "btc",
          tokenB: "usdc",
          apr: 256,
          tvl: 328000000,
          ago: 100200,
        },
      ],
    }
  },
  head() {
    const title = 'Portfolio';
    return {
      title,
    }
  },
  methods: {
    calcColor(grafic) {
      return grafic[grafic.length-1] > grafic[grafic.length-2] ? '#4ABCA4' : '#D83429'
    }
  }
};
</script>

<style src="~/assets/styles/pages/portfolio.scss" lang="scss" />
