export default {
  computed: {
    baseUrl() {
      return this.$axios.defaults.baseURL
    },
    user() {
      return this.$store.state.dataUser
    },
  }
}
