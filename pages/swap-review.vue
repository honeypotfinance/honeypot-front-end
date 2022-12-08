<template>
  <div id="swap-review" class="font1" style="--fw: 500">
    <section id="swap-review-header" class="center relative">
      <v-btn icon class="absolute hover_arrowback" style="--r: auto" @click="$router.push(localePath('/swap'))">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      
      <h2 class="p" style="--fs: 16px; --fw: 500">Confirm Swap</h2>
    </section>

    <section id="swap-review-content" class="divcol">
      <section class="divcol" style="gap: 10px">
        <div class="divcol" style="gap: inherit">
          <label style="--c: hsl(225 225% 225% / .56); --fs: 16px">From</label>
          <span class="hspan tup">{{review.priceFrom}} {{review.tokenFrom}}</span>
        </div>
        
        <div class="divcol" style="gap: inherit">
          <label style="--c: hsl(225 225% 225% / .56); --fs: 16px">To</label>
          <span class="hspan tup">{{review.priceTo}} {{review.tokenTo}}</span>
        </div>
      </section>


      <section class="divcol anchorline" style="gap: 10px; --b: auto; padding-top: var(--distance)">
        <div class="space" style="gap: inherit">
          <label style="--c: hsl(225 225% 225% / .56); --fs: 13px">Price</label>
          <span class="hspan" style="--fs: 13px">0.0001234 HONEY per NAME</span>
        </div>
        
        <div class="space" style="gap: inherit">
          <label style="--c: hsl(225 225% 225% / .56); --fs: 13px">Minimum Received</label>
          <span class="hspan" style="--fs: 13px">{{review.priceTo}} {{review.tokenTo}}</span>
        </div>
        
        <div class="space" style="gap: inherit">
          <label style="--c: hsl(225 225% 225% / .56); --fs: 13px">Fee Estimate</label>
          <span class="hspan" style="--fs: 13px">$0.00</span>
        </div>
      </section>

      <v-btn class="btn stylish" @click="confirm()">swap</v-btn>
    </section>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "SwapReviewPage",
  mixins: [computeds],
  data() {
    return {
    }
  },
  head() {
    const title = 'Swap Review';
    return {
      title,
    }
  },
  computed: {
    review() {
      return this.$store.state.swapReview
    }
  },
  methods: {
    confirm() {
      this.$alert("success")
      this.$router.push(this.localePath('/swap'))
    },
  }
};
</script>

<style src="~/assets/styles/pages/swap-review.scss" lang="scss" />
