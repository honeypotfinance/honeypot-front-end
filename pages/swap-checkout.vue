<template>
  <div id="swap-checkout">
    <section id="swap-checkout-header" class="divcol center">
      <h1>Swap</h1>
      <h2>checkout</h2>
    </section>

    <section id="swap-checkout-content" class="divcol">
      <!-- content -->
    </section>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "SwapCheckoutPage",
  mixins: [computeds],
  data() {
    return {
    }
  },
  head() {
    const title = 'Swap checkout';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/swap-checkout.scss" lang="scss" />
