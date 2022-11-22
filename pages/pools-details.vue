<template>
  <div id="pools-details">
    <section id="pools-header" class="divcol" style="gap: 10px">
      <h1 class="tcap font1 acenter" style="gap: inherit">pools details under build</h1>

      <v-card class="card space">
        <!-- content -->
      </v-card>
    </section>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "PoolsDetailsPage",
  mixins: [computeds],
  data() {
    return {
    }
  },
  head() {
    const title = 'Pools Details';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/pools-details.scss" lang="scss" />
