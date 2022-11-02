<template>
  <div>
    <MenuHeader ref="menu"></MenuHeader>
    <v-app-bar id="header" color="transparent" fixed class="isolate">
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
    };
  },
  computed: {
    user() {return this.$store.state.dataUser},
  },
  // created() {
  //   const theme = localStorage.getItem("theme");
  //   if (theme) {
  //     setTimeout(() => {
  //       this.$store.commit("switchTheme", theme);
  //     }, 100);
  //   }
  //   if (theme === "light") {this.themeButton = true}
  //   else {this.themeButton = false}
  // },
  methods: {
    // changeTheme(theme) {
    //   this.$store.commit("switchTheme", theme);
    //   this.themeButton = !this.themeButton;
    // },
  },
};
</script>

<style src="~/assets/styles/components/header.scss" lang="scss" />
