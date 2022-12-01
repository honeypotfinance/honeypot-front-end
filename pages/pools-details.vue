<template>
  <div id="pools-details" class="divcol" style="gap: 30px">
    <section id="pools-details-header" class="divcol" style="gap: 10px">
      <label class="maxsize_w hover_arrowback pointer" style="--fs: 21px" @click="$router.go(-1)">
        <v-icon size="1.5em">mdi-chevron-left</v-icon>
        Back
      </label>

      <v-card class="card space gap2" style="--br: 20px">
        <span class="acenter tup" style="gap: 5px">
          <img src="~/assets/sources/tokens/usdc.svg" alt="token" style="--w: 1.72em; --of: cover">
          usdc /
          <img src="~/assets/sources/tokens/btc.svg" alt="token" style="--w: 1.72em; --of: cover">
          btc
        </span>

        <img
          src="~/assets/sources/miscellaneous/locked-pools-test-img.jpg" alt="test image"
          style="--h: 123px; --ar: 1.75 / 1; border-radius: 0 !important"
        >
      </v-card>
    </section>


    <section id="pools-details-content" class="fwrap">
      <!-- section left -->
      <v-card id="container-chart" class="card" style="--br: 20px">
        <ChartsPoolsChart ref="chart"></ChartsPoolsChart>

        <aside class="gridauto font2" style="gap: 30px; --gs: 190px; align-items: start">
          <v-card class="card divcol center">
            <label style="--fs: 15px">TVL</label>
            <span class="hspan" style="--fs: 23.25px">
              $1.2M
            </span>
          </v-card>
          
          <v-card class="card divcol center">
            <label style="--fs: 15px">Pool APR</label>
            <span class="hspan" style="--fs: 23.25px">
              32%
            </span>
          </v-card>
          
          <v-card class="card divcol center">
            <label style="--fs: 15px">HPOT APR</label>
            <span class="hspan" style="--fs: 23.25px">
              2%
            </span>
          </v-card>
          
          <v-card class="card divcol center">
            <label style="--fs: 15px">Total Staked</label>
            <span class="hspan" style="--fs: 23.25px">
              $38,000
            </span>
          </v-card>
          
          <v-card class="card divcol center">
            <label style="--fs: 15px">Your Share</label>
            <span class="hspan" style="--fs: 23.25px">
              &#60;0.93%
            </span>
          </v-card>
          
          <v-card class="card divcol">
            <label style="--fs: 15px">Claimable Rewards</label>
            <span class="hspan" style="--fs: 23.25px">
              183.32 HPOT
            </span>
            <label style="--fs: 15px">~$389.58 USD</label>
            
            <v-btn class="btn mt-5" style="--w: 100%">
              <span style="font-family: var(--font1) !important">Harvest</span>
            </v-btn>
          </v-card>
        </aside>
      </v-card>


      <!-- section right -->
      <v-card id="container-pool-options" class="card divcol" style="gap: 20px; --br: 20px">
        <aside class="space wrap_inv" style="gap: 10px">
          <div class="center" style="gap: inherit">
            <v-sheet class="dual-tokens" color="transparent" style="--h-sheet: 30px">
              <img :src="require(`~/assets/sources/tokens/btc.svg`)" :alt="`btc token`" class="aspect">
              <img :src="require(`~/assets/sources/tokens/usdc.svg`)" :alt="`usdc token`" class="aspect">
            </v-sheet>
            
            <span class="hspan" style="--fs: 28px; --fw: 700">BTC-USD</span>
          </div>
          
          <v-tabs class="alignr" hide-slider style="--h: 54px; --bg-active: hsl(43 100% 65% / .15); --w-tab: 82px; --g: 5px; --fw: 500; --c: var(--accent)">
            <v-tab v-for="item in dataPoolOptions" :key="item" class="tcap font3">
              {{item}}
            </v-tab>
          </v-tabs>
        </aside>

        <v-sheet class="card space font1 mt-12" style="--bg: #292724; --br: 10px; --p: 10px 20px; gap: inherit">
          <div class="divcol">
            <v-text-field
              type="number"
              label="0.0"
              hide-details solo
              style="--fs: 28px; --p: 0"
            ></v-text-field>
            <label>LP Balance 112.390</label>
          </div>
          
          <v-btn
            class="btn font3" style="--bg: #1A1917; --b: 1px solid #2D291D; --br: 10px; --w: 82px; --min-h: 40px; --fs: 14px"
          >
            <span style="--c: #FFF8E6">Max</span>
          </v-btn>
        </v-sheet>

        <v-btn class="btn" style="--w: 100%; --h: 51px; --fs: 21px">
          Deposit
        </v-btn>

        <a class="hspan align" style="--c: var(--accent); --fs: 13px">
          <span class="tdeco">Get LP Tokens</span><v-icon size="1.5em">mdi-arrow-right-thin</v-icon>
        </a>
      </v-card>
    </section>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "PoolsDetailsPage",
  mixins: [computeds],
  data() {
    return {
      dataPoolOptions: ["deposit", "withdraw"],
      filterPoolOptions: "deposit",
    }
  },
  head() {
    const title = 'Pools Details';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/pools-details.scss" lang="scss" />
