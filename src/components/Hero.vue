<script setup lang="ts"></script>

<template>
  <div class="hero">
    <div class="container">
      <h1 class="max-w-2xl">Calculate USPS times and rates</h1>
      <p class="max-w-4xl">
        Determining USPS domestic and international shipping cost is now easier than ever. Fill in the details and let
        our online calculator find out your postage rate and transit time.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  .container {
    @apply h-full flex flex-col justify-center items-center text-center;

    h1 {
      @apply text-6xl font-bold capitalize;
      color: #323b4b;
    }

    p {
      @apply mt-9 text-xl;
      color: #8a94a6;
    }
  }
}
</style>
