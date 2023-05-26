<template>
  <v-navigation-drawer
    v-model="propModel"
    height="100%"
    fixed :right="dir === 'right'" :left="dir === 'left'"
    temporary
    :overlay-opacity="$store.state.overlay.opacity"
    :overlay-color="$store.state.overlay.color"
    class="custome-drawer"
  >
    <section v-if="$slots.header" class="v-navigation-drawer__content--header divcol center gap2">
      <v-btn icon class="close" style="--t: 8px; --r: 10px" @click="propModel = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      
      <slot name="header" />
    </section>

    <section class="v-navigation-drawer__content--content divcol jspace gap2">
      <slot name="content" />

      <section v-if="$slots.footer" class="v-navigation-drawer__content--footer divcol center">
        <slot name="footer" />
      </section>
    </section>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "CustomeDrawer",
  props: {
    model: {
      type: Boolean,
      default: false
    },
    dir: {
      type: String,
      default: "left"
    }
  },
  data() {
    return {
    }
  },
  computed: {
    propModel: {
      get () { return this.model },
      set (value) { this.$emit('update', value) },
    },
  },
  methods: {
  },
}
</script>

<style lang="scss">
.v-navigation-drawer.custome-drawer {
  --w-drawer: 300px;
  @include media(max, x-small) {--w-drawer: 100vw}
  
  width: var(--w-drawer) !important;
  background: var(--secondary) !important;
  z-index: 99;
  .v-navigation-drawer__content {
    --h-drawer-header: 170px;
    //
    --padding-drawer-header: 1.5em;
    --margin-bottom-drawer-header: .5em;
    
    &--header {
      padding: 1em;
      padding-block: calc(var(--padding-drawer-header) * 2) var(--padding-drawer-header);
      margin-bottom: var(--margin-bottom-drawer-header);
      position: relative;
      // line
      &::before {
        content: "";
        @include absolute(0,auto,0,0);
        height: 1px;
        width: 60%;
        background-color: var(--clr-line);
        border-radius: 50% / 3vmax;
      }
    }

    &--content {
      height: calc(100% - (var(--h-drawer-header) + var(--padding-drawer-header) + var(--margin-bottom-drawer-header)) );
      .v-expansion-panels {
        .v-expansion-panel {
          background-color: transparent;
          &::after, &::before {display: none !important}
          .v-expansion-panel-header {
            padding: 0;
            margin-inline: auto;
            width: 70%;
            min-height: 48px !important;
            &::before {
              width: var(--w-drawer);
              margin-left: -22%;
            }
          }
          .v-expansion-panel-content__wrap {padding: 0}
          .v-list {
            .v-list-item {padding: 0}
          }
        }
      }
    }

    &--footer {
      padding-block: 1.5em 2em;
      position: relative;
      // line
      &::before {
        content: "";
        @include absolute(0,0,0,auto);
        height: 1px;
        width: 60%;
        background-color: var(--clr-line);
        border-radius: 50% / 3vmax;
      }
    }
  }
}
</style>
