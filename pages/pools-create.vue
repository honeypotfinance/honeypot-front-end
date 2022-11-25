<template>
  <div id="pools-create" class="divcol" style="gap: 30px">
    <ModalsTokens ref="tokens" :from="firstToken" :to="secondToken"></ModalsTokens>
    
    <section id="pools-create-header" class="divcol" style="gap: 10px">
      <label class="maxsize_w hover_arrowback pointer" style="--fs: 21px" @click="$router.push(localePath('/pools'))">
        <v-icon size="1.5em">mdi-chevron-left</v-icon>
        Back To Pools
      </label>

      <v-card class="card space gap2" style="--br: 20px">
        <span class="acenter" style="gap: 5px">Create a pool</span>

        <img
          src="~/assets/sources/miscellaneous/locked-pools-test-img.jpg" alt="test image"
          style="--h: 123px; --ar: 1.75 / 1; border-radius: 0 !important"
        >
      </v-card>
    </section>


    <section id="pools-create-content" class="fwrap">
      <!-- section left -->
      <v-sheet color="transparent" class="divcol">
        <span class="hspan mb-2" style="--fs: 28px; --fw: 700">Create a pool</span>
        <p class="mb-8">
          You are the first liquidity provider.
          The ratio of tokens you add will set the price of this pool.
          Once you are happy with the rate click supply to review.
        </p>
        <img
          src="~/assets/sources/miscellaneous/locked-pools-test-img.jpg" alt="test image"
          style="--h: 123px; --ar: 1.75 / 1; border-radius: 0 !important; max-width: 201px !important"
        >
      </v-sheet>


      <!-- section right -->
      <v-sheet class="card divcol center" style="--br: 20px; gap: 20px; max-width: max-content !important">
        <v-tabs hide-slider style="--h: 54px; --bg-active: hsl(43 100% 65% / .15); --w-tab: 82px; --g: 5px; --fw: 500; --c: var(--accent)">
          <v-tab v-for="item in dataControls" :key="item" class="tcap font3">
            {{item}}
          </v-tab>
        </v-tabs>
        
        <v-form class="container-liquidity divcol jspace font1" style="gap: 12px">
          <div class="fnowrap space" style="gap: inherit">
            <!-- card pools left -->
            <aside
              class="divcol" style="gap: inherit">
              <div class="container-options">
                <label>Input</label>
                <div class="fnowrap" style="gap: 10px; --fb: max-content">
                  <v-chip
                    close close-icon="mdi-chevron-down" class="btn2 center" @click="$refs.tokens.openModalTokens(firstToken)"
                    @click:close="$refs.tokens.openModalTokens(firstToken)">
                    <v-img class="aspect mr-2" style="--w: 20px">
                      <template #default>
                        <img :src="firstToken.img" :alt="`${firstToken.name} token`" style="--w: 100%; --of: cover">
                      </template>
                      <template #placeholder>
                        <v-skeleton-loader type="avatar" />
                      </template>
                    </v-img>
                    <span class="tup">{{firstToken.name}}</span>
                  </v-chip>
                  
                  <v-btn class="btn2">
                    <span>max</span>
                  </v-btn>
                </div>
              </div>

              <v-card class="card" style="--bg: #292724">
                <div class="divcol">
                  <v-text-field
                    v-model="firstToken.amount"
                    solo counter
                    placeholder="0.00"
                    type="number"
                    class="custome"
                  >
                    <template #counter>
                      <label class="font1" style="--fs: 21px">~${{firstToken.amount / 2 || 0}} USD</label>
                    </template>
                  </v-text-field>
                </div>
                <label class="font1">Balance 112.390</label>
              </v-card>
            </aside>

            <center>
              <v-btn icon style="--p: 7px" class="nopevents">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </center>

            <!-- card pools right -->
            <aside class="divcol" style="gap: inherit">
              <div class="container-options">
                <label>Input</label>
                <div class="fnowrap" style="gap: 10px; --fb: max-content">
                  <v-chip
                    close close-icon="mdi-chevron-down" class="btn2 center" @click="$refs.tokens.openModalTokens(secondToken)"
                    @click:close="$refs.tokens.openModalTokens(secondToken)">
                    <v-img class="aspect mr-2" style="--w: 20px">
                      <template #default>
                        <img :src="secondToken.img" :alt="`${secondToken.name} token`" style="--w: 100%; --of: cover">
                      </template>
                      <template #placeholder>
                        <v-skeleton-loader type="avatar" />
                      </template>
                    </v-img>
                    <span class="tup">{{secondToken.name}}</span>
                  </v-chip>
                  
                  <v-btn class="btn2">
                    <span>max</span>
                  </v-btn>
                </div>
              </div>

              <v-card class="card" style="--bg: #292724">
                <div class="divcol">
                  <v-text-field
                    v-model="secondToken.amount"
                    solo counter
                    placeholder="0.00"
                    type="number"
                    class="custome"
                  >
                    <template #counter>
                      <label class="font1" style="--fs: 21px">~${{secondToken.amount / 2 || 0}} USD</label>
                    </template>
                  </v-text-field>
                </div>
                <label class="font1">Balance 112.390</label>
              </v-card>
            </aside>
          </div>

          <v-card class="card space my-5" style="--bg: #292724; --br: 20px; --fs: 14px; gap: 10px">
            <div class="divcol" style="gap: 5px">
              <span class="hspan" style="--fw: 700">1306.67</span>
              <span class="hspan" style="--fw: 400">BERA per HONEY</span>
            </div>
            
            <div class="divcol" style="gap: 5px">
              <span class="hspan" style="--fw: 700">1306.67</span>
              <span class="hspan" style="--fw: 400">BERA per HONEY</span>
            </div>
            
            <div class="divcol" style="gap: 5px">
              <span class="hspan" style="--fw: 700">0%</span>
              <span class="hspan" style="--fw: 400">Share of Pool</span>
            </div>
          </v-card>

          <v-btn
            class="btn mb-3" style="--bg: #FFCD4D; --fs: 21px"
          >Add Liquidity</v-btn>

          <a class="hspan align" style="--c: var(--accent); --fs: 13px">
            <span class="tdeco">Get Tokens</span><v-icon size="1.5em">mdi-arrow-right-thin</v-icon>
          </a>
        </v-form>
      </v-sheet>
    </section>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "PoolsCreatePage",
  mixins: [computeds],
  data() {
    return {
      dataControls: ["add", "remove"],
      firstToken: {
        img: require('~/assets/sources/tokens/btc.svg'),
        name: "btc",
        amount: undefined,
      },
      secondToken: {
        img: require('~/assets/sources/tokens/usdc.svg'),
        name: "usdc",
        amount: undefined,
      },
    }
  },
  head() {
    const title = 'Create Pools';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/pools-create.scss" lang="scss" />
