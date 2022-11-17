<template>
  <v-dialog v-model="modalConnect" content-class="modal-connect divcol relative isolate">
    <aside class="space">
      <span class="h9_em">Connect Wallet</span>
      
      <v-btn icon @click="modalConnect = false">
        <v-icon size="1.5em">mdi-close</v-icon>
      </v-btn>
    </aside>

    <v-sheet class="grid" color="transparent">
      <v-btn plain @click="$store.commit('signIn')">
        <img src="~/assets/sources/logos/sender-icon.svg" alt="near">
        
        <div class="divcol astart" style="gap: 5px">
          <span class="h12_em bold">connect</span>
          <span class="h13_em">connect.org</span>
        </div>
      </v-btn>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  name: "ConnectModal",
  data() {
    return {
      modalConnect: false,
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="scss">
.modal-connect {
  @include card;
  --min-w: 330px;
  --w: max-content;
  --br: 30px;
  --bg: #272727;
  --p: 30px;
  --tt: capitalize;
  gap: 20px;
  
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background-clip: content-box, border-box;
    background-image: linear-gradient(var(--bg),var(--bg)),
      linear-gradient(135deg, rgba($primary,.2), rgba($accent,.2));
    z-index: -1;
  }

  i {color: hsl(225 225% 225% / .5) !important}

  .v-sheet.grid {
    @include media(min, 500px) {--gtc: 1fr 1fr}
    gap: 20px;
    .v-btn {
      --fs: 20px;
      width: 100%;
      min-height: 70px;
      border-radius: 10px;
      background-color: hsl(0 0% 0% / .2);
      transition: .2s $ease-return;
      &:hover {
        background-color: hsl(0 0% 0% / .4);
        transform: translateY(-5px) !important;
      }
      &__content {
        justify-content: flex-start;
        gap: 10px;
        img {
          --w: 40px;
          --of: cover;
        }
        span + span {
          --c: hsl(225 225% 225% / .5);
        }
      }
    }
  }
}
</style>
