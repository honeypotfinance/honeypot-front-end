<template>
  <div id="farm">
    <section id="farm-header" class="divcol" style="gap: 10px">
      <h1 class="tcap font1 acenter" style="gap: inherit">my portfolio
        <v-icon color="var(--accent)" size="1em">mdi-eye-off-outline</v-icon>
      </h1>

      <v-card class="container-profits space card">
        <div class="divcol">
          <label>deposits</label>
          <span>${{profits.deposit.toString().split(".").join(",")}}</span>
        </div>
        <div class="divcol">
          <label>rewards</label>
          <span>${{profits.rewards}}</span>
        </div>
        <div class="divcol">
          <label>monthly APY</label>
          <span>{{profits.apy_monthly}}%</span>
        </div>
        <div class="divcol">
          <label>daily APY</label>
          <span>{{profits.apy_daily}}%</span>
        </div>
      </v-card>
    </section>

    <section id="farm-content" class="fwrap center">
    </section>
  </div>
</template>

<script>
export default {
  name: "FarmPage",
  data() {
    return {
      profits: {
        deposit: 20.009,
        rewards: 283,
        apy_monthly: 30,
        apy_daily: 20,
      },
    }
  },
  head() {
    const title = 'Farm';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/farm.scss" lang="scss" />
