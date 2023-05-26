export default {
  data() {
    return {
      rules: {
        required: [(v) => !!v || "Field required"],
        email: [
          (v) => !!v || "Field required",
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      }
    }
  },
  computed: {
    baseUrl() {
      return this.$axios.defaults.baseURL
    },
    isLogged() {
      return this.$store.state.isLogged
    },
    user() {
      return this.$store.state.dataUser
    },
  }
}
