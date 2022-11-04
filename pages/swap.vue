<template>
  <div id="swap">
    <ModalsSwapModal ref="modal"></ModalsSwapModal>
    <section id="swap-header" class="divcol center">
      <h2>Swap</h2>
      <h3>Swap tokens instantly</h3>
    </section>

    <section id="swap-content" class="fwrap center">
      <!-- left -->
      <v-card class="left card">
        <ChartsSwapChart ref="chart"></ChartsSwapChart>
      </v-card>


      <!-- middle -->
      <v-sheet color="transparent" class="middle divcol jspace" style="gap: 12px">
        <div class="fnowrap space" style="gap: inherit">
          <!-- card swap left -->
          <aside class="divcol" style="gap: inherit">
            <div class="container-options">
              <label>From</label>
              <div>
                <v-chip close close-icon="mdi-chevron-down" class="btn2">
                  <v-img :src="require('~/assets/sources/tokens/database.svg')" class="aspect mr-2" style="--w: 20px">
                    <template #placeholder>
                      <v-skeleton-loader type="avatar" />
                    </template>
                  </v-img>
                  bear
                </v-chip>
                <v-btn class="btn2">
                  <span>half</span>
                </v-btn>
                <v-btn class="btn2">
                  <span>max</span>
                </v-btn>
              </div>
            </div>

            <v-card class="card">
              <div class="divcol">
                <v-text-field
                  v-model="swapTo"
                  solo counter
                  placeholder="0.00"
                  type="number"
                  class="custome"
                >
                  <template #counter>
                    <label class="font1" style="--fs: 21px">~${{swapTo / 2 || 0}} USD</label>
                  </template>
                </v-text-field>
              </div>
              <label class="font1">Balance 112.390</label>
            </v-card>
          </aside>

          <center style="transform: translateY(calc(62px / 2)); margin-inline: clamp(5px, .6vw, 20px)">
            <v-btn icon style="--p: 7px">
              <img src="~/assets/sources/icons/swap-arrow.svg" alt="switch icon" style="--w: 16px">
            </v-btn>
          </center>

          <!-- card swap right -->
          <aside class="divcol" style="gap: inherit">
            <div class="container-options">
              <label>To</label>
              <div class="space">
                <v-chip close close-icon="mdi-chevron-down" class="tup btn2">
                  <v-img :src="require('~/assets/sources/tokens/database.svg')" class="aspect mr-2" style="--w: 20px">
                    <template #placeholder>
                      <v-skeleton-loader type="avatar" />
                    </template>
                  </v-img>
                  bear
                </v-chip>
                <v-btn class="btn2" @click="$refs.modal.modalSwap = true">
                  <img src="~/assets/sources/icons/settings.svg" alt="settings" style="--w: 18px">
                </v-btn>
              </div>
            </div>

            <v-card class="card">
              <div class="divcol">
                <v-text-field
                  v-model="swapTo"
                  solo counter
                  placeholder="0.00"
                  type="number"
                  class="custome"
                >
                  <template #counter>
                    <label class="font1" style="--fs: 21px">~${{swapTo / 2 || 0}} USD</label>
                  </template>
                </v-text-field>
              </div>
              <label class="font1">Balance 112.390</label>
            </v-card>
          </aside>
        </div>

        <v-btn
          class="btn" style="--bg: linear-gradient(109.68deg, #F7931A 5.56%, #FFCD4D 85.08%); --fs: 21px"
        >swap</v-btn>
      </v-sheet>


      <!-- right -->
      <v-card class="right card divcol" style="max-width: 318px !important; gap: 14px 0">
        <div class="divcol center" style="gap: 6px">
          <h3 class="p" style="--fw: 700">Trending Coins</h3>
          <label>Drag your token to swap</label>
        </div>
        
        <div
          class="grid" style="gap: inherit"
          @dragstart="dragstart($event)" @dragend="dragend($event)">
          <div v-for="(item, i) in dataTokens" :key="i" class="divcol center">
            <v-img class="aspect" style="--w: 50px">
              <template #default>
                <img
                  v-show="item.img" :src="item.img" :alt="`${item.name} token`" style="--w: 100%; --of: cover">
              </template>
              <template #placeholder>
                <v-skeleton-loader type="avatar" />
              </template>
            </v-img>
            <label class="tcap">{{item.name}}</label>
          </div>
        </div>
      </v-card>
    </section>
  </div>
</template>

<script>
export default {
  name: "SwapPage",
  data() {
    return {
      swapTo: undefined,
      dataTokens: [
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "Coin Name",
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "Coin Name",
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "Coin Name",
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "Coin Name",
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "Coin Name",
        },
      ],
    }
  },
  head() {
    const title = 'Swap';
    return {
      title,
    }
  },
  methods: {
    dragstart(event) {
      if (event.target?.alt) console.log(event)
    },
    dragend(event) {
      if (event.target?.alt) console.log(event)
    },
  }
};
</script>

<style src="~/assets/styles/pages/swap.scss" lang="scss" />
