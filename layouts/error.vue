<template>
  <v-app id="error">
    <v-container fluid class="error-page center divcol">
      <v-row justify="center" align="center">
        <v-col class="tcenter center divcol padd0mobile">
          <!-- content -->
          <h1 class="p bold">{{error.statusCode === 404 ? 404 : 'Error'}}</h1>
          <span class="h5_em bold">{{error.statusCode === 404 ? $t('pageNotFound') : $t('otherError')}}</span>
          <v-btn :to="localePath('/')" class="h7_em bold">{{$t('buttonTitle')}}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "ErrorPage",
  layout: 'empty-layout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    const title =
      this.error.statusCode === 404 ? '404' : this.otherError
    return {
      title,
    }
  },
}
</script>

<style src="~/assets/styles/layouts/error.scss" lang="scss" />
