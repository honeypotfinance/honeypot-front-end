<template>
  <div class="modals">
    <v-dialog v-model="modalSwap" content-class="modalSwap" width="400px">
      <section class="modalSwap-header space">
        <h3 class="p" style="--fw: 700">Exchange Settings</h3>
        <v-btn icon style="top: -10px" @click="modalSwap = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </section>

      <div class="divcol" style="gap: 5px">
        <label class="plain">Slippage Tolerance
          <v-tooltip bottom max-width="174px" color="#574F42" content-class="tooltip-target">
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
  </div>
</template>

<script>
export default {
  name: "ModalSwapComponent",
  data() {
    return {
      modalSwap: false,
      dataSlippage: [0.5, 1, 2, 3.5],
      slippageSelection: 0.5,
      deadlineSelection: undefined,
    };
  },
  watch: {
    modalSwap(current) {
      if (current) this.$targetTooltip('.modalSwap img[alt="info"]')
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/components/modals.scss" lang="scss" />
