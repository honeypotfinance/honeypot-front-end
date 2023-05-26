export default {
  data() {
    return {
      isMobile: undefined,
      isXMobile: undefined,
    }
  },
  mounted() {
    this.IsMobile()
    
    // resize listener
    window.addEventListener("resize", this.IsMobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.IsMobile);
  },
  methods: {
    IsMobile() {
      if (window.innerWidth <= 880) { this.isMobile = true }
      else { this.isMobile = false}
      if (window.innerWidth <= 430) { this.isXMobile = true }
      else { this.isXMobile = false}
    },
  }
}
