<template>
  <div id="swap">
    <section id="swap-header" class="divcol center">
      <h2>Swap</h2>
      <h3>Swap tokens instantly</h3>
    </section>

    <section id="swap-content" class="fwrap">
      <v-card class="card">
      </v-card>

      <v-sheet color="transparent">
      </v-sheet>

      <v-card class="card">
        <div class="divcol center" style="gap: 8px">
          <h3 class="p" style="--fw: 700">Trending Coins</h3>
          <label>Drag your token to swap</label>
        </div>
        
        <div class="grid" style="--gtc: repeat(auto-fit, minmax(min(100%, 50px), 1fr))">
          <div v-for="(item, i) in dataTokens" :key="i" class="divcol center">
            <v-img :src="item.img" :alt="`${item.name} token`" class="aspect" style="--w: 50px">
              <template #placeholder>
                <v-skeleton-loader type="avatar" />
              </template>
            </v-img>
            <label class="tcap">{{item.name}}</label>
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
      dataTokens: [
        {
          img: undefined,
          name: "Coin Name",
        },
        {
          img: undefined,
          name: "Coin Name",
        },
        {
          img: undefined,
          name: "Coin Name",
        },
        {
          img: undefined,
          name: "Coin Name",
        },
        {
          img: undefined,
          name: "Coin Name",
        },
      ],
    }
  },
  head() {
    const title = 'Swap';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/swap.scss" lang="scss" />
