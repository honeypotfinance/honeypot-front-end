<template>
  <div id="pools-create" class="divcol" style="gap: 30px">
    <section id="pools-create-header" class="divcol" style="gap: 10px">
      <label class="maxsize_w hover_arrowback pointer" style="--fs: 21px" @click="$router.push(localePath('/pools'))">
        <v-icon size="1.5em">mdi-chevron-left</v-icon>
        Back To Pools
      </label>

      <v-card class="card space gap2">
        <span class="acenter" style="gap: 5px">Create a pool</span>

        <img
          src="~/assets/sources/miscellaneous/locked-pools-test-img.jpg" alt="test image"
          style="--h: 123px; --ar: 1.75 / 1; border-radius: 0 !important"
        >
      </v-card>
    </section>


    <section id="pools-create-content" class="fwrap">
      <!-- content -->
    </section>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "PoolsCreatePage",
  mixins: [computeds],
  data() {
    return {
    }
  },
  head() {
    const title = 'Create Pools';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/pools-create.scss" lang="scss" />
