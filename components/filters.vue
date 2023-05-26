<template>
  <section class="container-filters fwrap gap2" style="--fb: 200px" :class="{contents: contents}">
    <v-text-field
      v-if="!hide.includes(1)"
      v-model="search_model"
      hide-details solo
      append-icon="mdi-magnify"
      label="Search for NFTs Name, Artist, Event &amp; Collections"
      style="--p: 0 1em 0 2em"
      class="search"
      @keyup="$emit('search', search_model)"
    ></v-text-field>

    <v-select
      v-if="!hide.includes(2)"
      v-model="filterA_model"
      :items="filterA"
      hide-details solo
      clearable clear-icon="mdi-close"
      label="by Tier:"
      style="--p: 0 1em 0 2em"
      @change="$emit('filterA', filterA_model)"
    >
      <template #selection="{ item }">
        <div class="v-select__selection v-select__selection--comma">
          {{
            item === 1 ? "Bronze" :
            item === 2 ? "Silver" :
            item === 3 ? "Gold" :
            item === 4 ? "platinum" :
            item === 5 ? "Diamond" :
            item === 6 ? "Uranium" : undefined
          }}
        </div>
      </template>
      <template #item="{ item }">
        <v-list-item-title>
          {{
            item === 1 ? "Bronze" :
            item === 2 ? "Silver" :
            item === 3 ? "Gold" :
            item === 4 ? "platinum" :
            item === 5 ? "Diamond" :
            item === 6 ? "Uranium" : undefined
          }}
        </v-list-item-title>
      </template>
    </v-select>

    <v-select
      v-if="!hide.includes(3)"
      v-model="filterB_model"
      :items="filterB"
      hide-details solo
      clearable clear-icon="mdi-close"
      label="Sort by:"
      style="--p: 0 1em 0 2em"
      @change="$emit('filterB', filterB_model)"
    ></v-select>
  </section>
</template>

<script>
export default {
  name: "FiltersComponent",
  props: {
    contents: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Array,
      default: () => [],
    },
    search: {
      type: String,
      default: undefined,
    },
    filterA: {
      type: Array,
      default: undefined
    },
    filterB: {
      type: Array,
      default: undefined
    },
  },
  data() {
    return {
      search_model: "",
      filterA_model: "",
      filterB_model: "",
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/components/filters.scss" lang="scss" />
