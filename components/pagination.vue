<template>
  <v-btn-toggle class="pagination align" background-color="rgba(0, 0, 0, .4)">
    <button
      :style="isInFirstPage ? 'opacity: .5' : 'opacity: 1'"
      :disabled="isInFirstPage"
      @click="onClickPreviousPage"
    >
      <v-icon size="2em" class="reverse">mdi-play</v-icon>
    </button>
    
    <v-btn
      :disabled="isInFirstPage" text
      :class="{ active: isInFirstPage }"
      @click="onClickFirstPage"
    >1</v-btn>

    <!-- Visible Buttons Start -->
    <v-btn
      v-for="(page, i) in pages.slice(1, totalPages - 1)" :key="i"
      :disabled="page.isDisabled" text
      :class="{ active: isPageActive(page.name) }"
      @click="onClickPage(page.name)"
    >
      {{page.name}}
    </v-btn>
    <!-- Visible Buttons End -->

    <v-btn
      v-if="totalPages > 1"
      :disabled="isInLastPage" text
      :class="{ active: isInLastPage }"
      @click="onClickLastPage"
    >{{totalPages}}</v-btn>
    
    <button
      :style="isInLastPage ? 'opacity: .5' : 'opacity: 1'"
      :disabled="isInLastPage"
      @click="onClickNextPage"
    >
      <v-icon size="2em">mdi-play</v-icon>
    </button>
  </v-btn-toggle>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 3,
    },
    currentPage: {
      type: Number,
      default: 1,
      required: true
    }
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }

      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.perPage + 1;
      }

      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <= Math.min(this.startPage + this.perPage - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }
};
</script>

<style src="~/assets/styles/components/pagination.scss" lang="scss" />
/*

⭐  how to use  ⭐
----------template----------
<Pagination
  :total-pages="pagination_per_page"
  :current-page="currentPage"
  @pagechanged="(page) => currentPage = page"
/>
----------script----------
data() {
  return {
    currentPage: 1,
    itemsPerPage: 10,
  }
},
computed: {
  dataItems_pagination() {
    return this.dataItems.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
  },
  pagination_per_page() {
    return Math.ceil(this.dataItems.length / this.itemsPerPage)
  }
},

⭕ vuetify component version ⭕
<v-pagination
  v-model="currentPage"
  :length="pagination_per_page"
></v-pagination>

*/
