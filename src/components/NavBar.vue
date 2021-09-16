<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import Logo from "./Logo.vue";

const emit = defineEmits<{
  (e: "navBarHeight", value: number): void;
}>();

const navLinks = [
  {
    name: "Home",
    path: "/",
  },

  {
    name: "About",
    path: "/about",
  },

  {
    name: "FAQs",
    path: "/faqs",
  },

  {
    name: "Blogs",
    path: "/blogs",
  },
];

const header = ref() as Ref<HTMLElement>;

onMounted(() => {
  console.log(header.value?.getBoundingClientRect().height);
  emit("navBarHeight", header.value.getBoundingClientRect().height);
});
</script>

<template>
  <header ref="header">
    <nav class="container">
      <Logo class="h-10" />

      <ul class="nav-list">
        <li v-for="(link, idx) in navLinks" :key="idx + link.name">
          <a :href="link.path">{{ link.name }}</a>
        </li>
      </ul>

      <a href="#" class="cta">Contact US</a>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
  .nav-list {
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      color: #8a94a6;
      margin-right: 2rem;

      &:last-of-type {
        margin-right: 0;
      }

      &:hover {
        color: #377dff;
      }
    }

    a {
      @apply text-xl;
    }
  }

  a.cta {
    background: #377dff;
    border-radius: 0.625rem;
    height: 3.75rem;

    @apply flex justify-center items-center px-9 text-white font-semibold;
  }
}
</style>
