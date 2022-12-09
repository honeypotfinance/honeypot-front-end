<template>
  <div id="staking" class="divcol">
    <section id="staking-header" class="divcol center">
      <h1>Stake</h1>
      <h2>Add liquidity to a pool instantly</h2>
    </section>

    <v-form id="staking-content" class="divcol">
      <v-sheet class="btn space" style="--br: 20px; --fw: 700; --p: 15px 25px">
        <span style="font-size: max(19px, 1.3125em)">Staking APR</span>
        <span style="font-size: max(18px, 1.75em)">17%</span>
      </v-sheet>

      <div class="fwrap space" style="gap: 20px">
        <v-sheet class="card divcol center" style="gap: 5px">
          <label style="--fs: max(12px, 0.875em)">Total Staked HPOT</label>
          <span class="hspan" style="--fs: max(22px, 1.75em); --fw: 700">10.3M</span>
        </v-sheet>

        <v-sheet class="card divcol center" style="gap: 5px">
          <label style="--fs: max(12px, 0.875em)">My XHPOT Balance</label>
          <span class="hspan" style="--fs: max(22px, 1.75em); --fw: 700">920k</span>
        </v-sheet>
      </div>

      <aside id="controls" class="space">
        <span class="hspan" style="--fs: max(22px, 1.75em); --fw: 700">Stake HPOT</span>
        
        <div class="center" style="gap: 10px">
          <v-btn
            class="btn" :class="{active: stakeMode === 'stake'}"
            @click="stakeMode = 'stake'"
          >Stake</v-btn>
          
          <v-btn
            class="btn" :class="{active: stakeMode === 'unstake'}"
            @click="stakeMode = 'unstake'"
          >Unstake</v-btn>
        </div>
      </aside>

      <v-sheet class="card space font1" style="--bg: var(--secondary); --br: 10px; --p: 10px 20px; gap: inherit">
        <div class="divcol">
          <v-text-field
            v-model="stake_amount"
            type="number"
            label="0.0"
            hide-details solo
            style="--fs: 28px; --p: 0; max-width: 130px"
            suffix="HPOT"
          ></v-text-field>
          <label>Balance 112.390</label>
        </div>
        
        <v-btn
          class="btn font3" style="--bg: #574F42; --b: 1px solid #2D291D; --br: 10px; --w: 56px; --min-h: 40px; --fs: 14px; --fw: 400"
        >
          <span style="--c: #FFF8E6">Max</span>
        </v-btn>
      </v-sheet>

      <template v-if="stakeMode === 'stake'">
        <v-btn class="btn" style="--w: 100%; --h: 64px; --fs: 21px" :disabled="!stake_amount">
          Stake
        </v-btn>

        <a class="hspan align" style="--c: var(--accent); --fs: 13px">
          <span class="tdeco">Get HPOT</span><v-icon size="1.5em">mdi-arrow-right-thin</v-icon>
        </a>
      </template>
      
      <v-btn v-else class="btn" style="--w: 100%; --h: 64px; --fs: 21px" :disabled="!stake_amount">
        Unstake
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "StakingPage",
  mixins: [computeds],
  data() {
    return {
      stakeMode: "stake",
      stake_amount: undefined,
    }
  },
  head() {
    const title = 'Staking';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/staking.scss" lang="scss" />
