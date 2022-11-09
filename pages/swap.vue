<template>
  <div id="swap">
    <ModalsSwapModal ref="modal"></ModalsSwapModal>
    <section id="swap-header" class="divcol center">
      <h1>Swap</h1>
      <h2>Swap tokens instantly</h2>
    </section>

    <section id="swap-content" class="fwrap center">
      <!-- left -->
      <v-card ref="target_swap_chart" class="left card">
        <ChartsSwapChart ref="chart" :height="heightChart" @model="$refs.modal.modalChart = true"></ChartsSwapChart>
      </v-card>


      <!-- middle -->
      <v-form class="middle divcol jspace" style="gap: 12px">
        <div class="fnowrap space" style="gap: inherit">
          <!-- card swap left -->
          <aside
            id="swapFrom" class="target_drag divcol" style="gap: inherit"
            @dragover="($event) => $event.preventDefault()" @drop="dropToken($event)">
            <div class="container-options">
              <label>From</label>
              <div>
                <v-chip
                  close close-icon="mdi-chevron-down" class="btn2" @click="$refs.modal.openModalTokens(swapFrom)"
                  @click:close="$refs.modal.openModalTokens(swapFrom)">
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

          <center style="transform: translateY(calc(62px / 2)); margin-inline: clamp(5px, .6vw, 20px)">
            <v-btn icon style="--p: 7px" @click="switchTokens()">
              <img src="~/assets/sources/icons/swap-arrow.svg" alt="switch icon" style="--w: 16px">
            </v-btn>
          </center>

          <!-- card swap right -->
          <aside
            id="swapTo" class="target_drag divcol" style="gap: inherit"
            @dragover="($event) => $event.preventDefault()" @drop="dropToken($event)">
            <div class="container-options">
              <label>To</label>
              <div class="space">
                <v-chip
                  close close-icon="mdi-chevron-down" class="tup btn2" @click="$refs.modal.openModalTokens(swapTo)"
                  @click:close="$refs.modal.openModalTokens(swapTo)">
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
                <v-btn class="btn2" @click.stop="$refs.modal.modalSettings = true">
                  <img src="~/assets/sources/icons/settings.svg" alt="settings" style="--w: 18px">
                </v-btn>
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

        <v-btn
          class="btn" style="--bg: linear-gradient(109.68deg, #F7931A 5.56%, #FFCD4D 85.08%); --fs: 21px"
        >swap</v-btn>
      </v-form>


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
            <label class="tup">{{item.name}}</label>
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
      heightChart: undefined,
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
      dataTokens: [
        {
          img: require('~/assets/sources/tokens/honeypot.svg'),
          name: "honeypot",
        },
        {
          img: require('~/assets/sources/tokens/usdc.svg'),
          name: "usdc",
        },
        {
          img: require('~/assets/sources/tokens/btc.svg'),
          name: "btc",
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "coin name",
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "coin name",
        },
      ],
      currentDrag: undefined,
    }
  },
  head() {
    const title = 'Swap';
    return {
      title,
    }
  },
  computed: {
    observerTokensFrom() {
      return this.swapFrom.name
    },
  },
  watch: {
    observerTokensFrom(current, old) {
      if (current !== old) {
        // height cards
        const
          page = document.querySelector("#swap"),
          cardLeft = page.querySelector("aside#swapFrom");
        setTimeout(() => page.style.setProperty("--h-cards", `${cardLeft.getBoundingClientRect().height}px`), 100);
      }
    },
  },
  mounted() {
    this.styles()
    window.addEventListener("resize", this.styles)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.styles)
  },
  methods: {
    styles() {
      // height chart calculator
      const
        container = this.$refs.target_swap_chart.$el,
        header = container.querySelector(".charts-header"),
        footer = container.querySelector(".charts-footer");
      this.heightChart = `
        ${container.getBoundingClientRect().height -
        (header.getBoundingClientRect().height + footer.getBoundingClientRect().height + 48 + 15)}px
      `
    },
    switchTokens() {
      [this.swapFrom.img, this.swapFrom.name, this.swapTo.img, this.swapTo.name]
      = [this.swapTo.img, this.swapTo.name, this.swapFrom.img, this.swapFrom.name]
    },
    dragstart(event) {
      if (event.target?.alt) {
        document.querySelector(".v-form.middle").classList.add("focus");
        this.currentDrag = event.target
      }
    },
    dragend(event) {
      if (event.target?.alt) {
        document.querySelector(".v-form.middle").classList.remove("focus");
      }
    },
    dropToken(event) {
      const
        data = [this.swapFrom, this.swapTo],
        token = this[event.path.find(e => e.className.includes("target_drag")).id],
        [otherToken] = data.filter(el => el.name !== token.name && el.img !== token.img);

      if (otherToken?.name === this.currentDrag?.alt?.split(" token")[0]) { this.switchTokens() }
      else {
        token.img = this.currentDrag.src
        token.name = this.currentDrag.alt.split(" token")[0]
      }
    },
  }
};
</script>

<style src="~/assets/styles/pages/swap.scss" lang="scss" />
