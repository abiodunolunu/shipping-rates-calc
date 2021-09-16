<script lang="ts" setup>
import Calculator from "@/components/Calculator/index.vue";
import Hero from "@/components/Hero.vue";
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";

const navBarHeight = ref(0);

console.log({ navBarHeight });
</script>
<template>
  <div>
    <NavBar @nav-bar-height="(value) => (navBarHeight = value)" style="background: #fafbfc" />
    <Hero :style="{ height: `calc(100vh - ${navBarHeight}px)`, background: '#FAFBFC' }" />

    <Calculator />
  </div>
</template>

<style></style>
