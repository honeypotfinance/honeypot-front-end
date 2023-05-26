<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  beforeMount() {
    this.$router.push(this.localePath("/swap"))
  }
};
</script>
