<script setup lang="ts">
export interface Country {
  name: string;
  demonym: string;
  flag: string;
  iso2: string;
  iso3: string;
}
defineProps<{ label?: string }>();
const emit = defineEmits<{ (e: "country", value: Country): void }>();
import { countries } from "country-flags-svg";
import { computed, Ref, ref, watch } from "vue";
import SvgIcon from "./SvgIcon.vue";

const showDropDown = ref(false);

const toggleDropdown = () => {
  showDropDown.value = !showDropDown.value;
};

const dropdownContainer = ref() as Ref<HTMLDivElement>;
const searchInput = ref() as Ref<HTMLInputElement>;

watch(showDropDown, (current) => {
  if (!current) return;

  setTimeout(() => {
    searchInput.value.focus();
    dropdownContainer.value.scrollIntoView({ behavior: "smooth" });
  }, 0);
});

const searchTerm = ref("");

let debounce: any;

const handleInput = (e: Event) => {
  clearTimeout(debounce);

  debounce = setTimeout(() => {
    searchTerm.value = (e.target as HTMLInputElement).value;
  }, 500);
};

const countriesList = [...countries] as Country[];

const filteredCountries = computed(() =>
  countriesList.filter((country) => country.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
);

const selectedCountry = ref<Country>(countries[0]);

const selectCountry = (country: Country) => {
  selectedCountry.value = country;

  emit("country", country);

  showDropDown.value = false;
};

const onBlur = () => {
  showDropDown.value = false;
};
</script>

<template>
  <div class="country-picker" v-click-outside="onBlur">
    <label @click="toggleDropdown" v-if="label">{{ label }}</label>
    <div class="selected-country" :class="showDropDown ? 'active' : ''" @click="toggleDropdown">
      <div class="">
        <img :src="selectedCountry.flag" alt="" />
        <p>{{ selectedCountry.name }}</p>
      </div>

      <span>&#x25BC;</span>
    </div>

    <div class="dropdown" v-show="showDropDown" ref="dropdownContainer">
      <div class="px-4 py-4">
        <div class="dropdown__input">
          <SvgIcon name="search" class="fill-current h-8 w-8 px-2" />
          <input type="text" @input="handleInput" ref="searchInput" />
        </div>
      </div>
      <hr />
      <div class="dropdown__list">
        <div class="country" v-for="country in filteredCountries" :key="country.name" @click="selectCountry(country)">
          <img :src="country.flag" alt="" />
          <p>{{ country.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.country-picker {
  position: relative;
}

label {
  @apply block text-lg font-bold mb-1;
}
.selected-country {
  background-color: #fff;
  @apply h-12 flex items-center justify-between px-4 rounded-md cursor-pointer;
  border: 1px solid #181818;
  @apply text-sm;

  div {
    @apply flex items-center py-2 px-4;
    img {
      @apply w-6 mr-4;
    }
  }

  &.active {
    border: 4px solid rgba(0, 0, 0, 0.2);
  }
  span {
    @apply ml-auto;
  }
}
.dropdown {
  position: absolute;
  top: calc(100%);
  z-index: 30;
  background-color: #fff;

  border: 0 solid rgba(24, 24, 24, 0.15);
  border-radius: 0.25rem;

  box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.22);
  width: 100%;
  @apply text-sm;
}
.dropdown__input {
  border: 1px solid rgba(0, 0, 0, 0.6);
  @apply rounded-md overflow-hidden;
  @apply h-12;
  @apply flex justify-between items-center;

  input {
    @apply h-full outline-none border-none flex-grow;
  }
}

hr {
  background-color: #e9ecef;
}

.dropdown__list {
  max-height: 300px;
  @apply overflow-auto my-4;
  .country {
    @apply flex items-center py-2 px-4 cursor-pointer hover:bg-gray-200;
    img {
      @apply w-6 mr-4;
    }
  }
}
</style>
