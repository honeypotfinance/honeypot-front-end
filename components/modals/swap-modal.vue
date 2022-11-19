<template>
  <div>
    <ModalsTokens ref="tokens" :from="swapFrom" :to="swapTo"></ModalsTokens>
    
    <v-dialog v-model="modalSwap" content-class="modalSwap relative" max-width="588px">
      <v-btn icon class="close" style="--d: 10px" @click="modalSwap = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <h3 class="font2 tcenter" style="--fw: 700; --fs: 32px">Swap</h3>

      <v-form class="swap-container divcol jspace" style="gap: 12px">
        <div class="fnowrap space" style="gap: inherit">
          <!-- card swap left -->
          <aside
            class="divcol" style="gap: inherit">
            <div class="container-options">
              <label>From</label>
              <div class="space">
                <v-chip
                  close close-icon="mdi-chevron-down" class="btn2" @click="$refs.tokens.openModalTokens(swapFrom)"
                  @click:close="$refs.tokens.openModalTokens(swapFrom)">
                  <v-img class="aspect mr-2" style="--w: 20px">
                    <template #default>
                      <img :src="swapFrom.img" :alt="`${swapFrom.name} token`" style="--w: 100%; --of: cover">
                    </template>
                    <template #placeholder>
                      <v-skeleton-loader type="avatar" />
                    </template>
                  </v-img>
                  <span>{{swapFrom.name}}</span>
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
                  v-model="swapFrom.amount"
                  solo counter
                  placeholder="0.00"
                  type="number"
                  class="custome"
                >
                  <template #counter>
                    <label class="font1" style="--fs: 21px">~${{swapFrom.amount / 2 || 0}} USD</label>
                  </template>
                </v-text-field>
              </div>
              <label class="font1">Balance 112.390</label>
            </v-card>
          </aside>

          <center>
            <v-btn icon style="--p: 7px" @click="switchTokens()">
              <img src="~/assets/sources/icons/swap-arrow.svg" alt="switch icon" style="--w: 16px">
            </v-btn>
          </center>

          <!-- card swap right -->
          <aside
            class="divcol" style="gap: inherit">
            <div class="container-options">
              <label>To</label>
              <div>
                <v-chip
                  close close-icon="mdi-chevron-down" class="tup btn2" @click="$refs.tokens.openModalTokens(swapTo)"
                  @click:close="$refs.tokens.openModalTokens(swapTo)">
                  <v-img class="aspect mr-2" style="--w: 20px">
                    <template #default>
                      <img :src="swapTo.img" :alt="`${swapTo.name} token`" style="--w: 100%; --of: cover">
                    </template>
                    <template #placeholder>
                      <v-skeleton-loader type="avatar" />
                    </template>
                  </v-img>
                  <span>{{swapTo.name}}</span>
                </v-chip>
              </div>
            </div>

            <v-card class="card">
              <div class="divcol">
                <v-text-field
                  v-model="swapTo.amount"
                  solo counter
                  placeholder="0.00"
                  type="number"
                  class="custome"
                >
                  <template #counter>
                    <label class="font1" style="--fs: 21px">~${{swapTo.amount / 2 || 0}} USD</label>
                  </template>
                </v-text-field>
              </div>
              <label class="font1">Balance 112.390</label>
            </v-card>
          </aside>
        </div>

        <v-btn class="btn mt-6" style="--bg: #fff; --fs: 21px; --stroke: .5px">
          swap
        </v-btn>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "SwapModalComponent",
  data() {
    return {
      modalSwap: false,
      swapFrom: {
        img: require('~/assets/sources/tokens/database.svg'),
        name: "bear",
        amount: undefined,
      },
      swapTo: {
        img: require('~/assets/sources/tokens/btc.svg'),
        name: "btc",
        amount: undefined,
      },
    };
  },
  methods: {
    switchTokens() {
      [this.swapFrom.img, this.swapFrom.name, this.swapTo.img, this.swapTo.name]
      = [this.swapTo.img, this.swapTo.name, this.swapFrom.img, this.swapFrom.name]
    },
  }
};
</script>

<style src="~/assets/styles/components/modals.scss" lang="scss" />
