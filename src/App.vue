<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import country from "@/helpers/allCountriesWithFlags";
import { onMounted } from "vue";

onMounted(() => {
  console.log("App mounted");

  console.log(country);
});
</script>

<template>
  <router-view />
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
