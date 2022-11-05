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
        
        <div class="space wrap">
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
      <ChartsSwapChart ref="chart" height="400px"></ChartsSwapChart>
    </v-dialog>


    <!-- modal token -->
    <v-dialog v-model="modalTokens" width="447px" content-class="modalTokens">
      <section class="modalTokens-header">
        <h3 style="--fw: 700">Select a token</h3>

        <v-text-field
          v-model="searchToken"
          prepend-icon="mdi-magnify"
          placeholder="search name or paste address"
          hide-details solo
          style="--fs: 18px;  --fw: 400; --p: 0 12px 0 0; --c-place: var(--accent)"
        ></v-text-field>
      </section>

      <section class="modalTokens-content divcol">
        <aside class="divcol" style="gap: 10px">
          <label class="plain tup" style="--fw: 600">popular</label>
          <div class="wrap" :class="{space: dataPopularTokens.length > 4}" style="gap: inherit">
            <v-chip
              v-for="(item, i) in dataPopularTokens.slice(0, 8)" :key="i" class="tup" color="#292724" style="border-radius: 10px; min-width: 82px"
              @click="selectToken(item)"
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

        <v-sheet color="transparent" class="divcol" style="gap: 16px">
          <v-card
            v-for="(item, i) in filterDataTokens" :key="i" class="space" style="gap: 10px"
            @click="selectToken(item)"
          >
            <div class="acenter tcap" style="gap: 10px">
              <v-img :src="item.img" :alt="`${item.name} token`" class="aspect" style="--w: 35.5px">
                <template #placeholder>
                  <v-skeleton-loader type="avatar" />
                </template>
              </v-img>

              <div class="divcol" style="gap: inherit">
                <span>{{item.name}}</span>
                <span>{{item.fullname}}</span>
              </div>
            </div>

            <label>{{item.value}}</label>
          </v-card>
        </v-sheet>
      </section>
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
          img: require('~/assets/sources/tokens/database.svg'),
          name: "bear",
          fullname: "bear bear",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "bear",
          fullname: "bear bear",
          value: 0,
        },
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "bear",
          fullname: "bear bear",
          value: 0,
        },
      ],
      dataTokens: [
        {
          img: require('~/assets/sources/tokens/database.svg'),
          name: "bear",
          fullname: "bear bear",
          value: 0,
        },
        {
          img: "",
          name: "otro",
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
    modalTokens(current) {
      if (current) {
        setTimeout(() => {
          const container = document.querySelector(".modalTokens");
          const header = container.querySelector(".modalTokens-header");

          document.documentElement.style.setProperty("--h-modal-tokens-content", `
            ${container.getBoundingClientRect().height - header.getBoundingClientRect().height}px
          `)
        }, 100);
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$targetTooltip)
  },
  methods: {
    selectToken(item) {
      for (const [keys, ] of Object.entries(this.$parent[this.handlerToken])) {
        if (keys !== "amount") this.$parent[this.handlerToken][keys] = item[keys]
      }
      this.modalTokens = false
    },
    openModalTokens(key) {
      this.modalTokens = true
      this.handlerToken = key
    },
  }
};
</script>

<style src="~/assets/styles/components/modals.scss" lang="scss" />
