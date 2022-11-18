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
        
        <div class="space wrap" style="gap: 10px 0">
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
      <ChartsSwapChart ref="chart" height="400px" closable @model="modalChart = false"></ChartsSwapChart>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ModalsSwapComponent",
  data() {
    return {
      // modal settings
      modalSettings: false,
      dataSlippage: [0.5, 1, 2, 3.5],
      slippageSelection: 0.5,
      deadlineSelection: undefined,
      // modal chart
      modalChart: false,
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
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$targetTooltip)
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/components/modals.scss" lang="scss" />
