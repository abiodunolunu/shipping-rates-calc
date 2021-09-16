<script setup lang="ts">
import axios from "redaxios";
import { reactive, ref } from "vue";
import BaseInput from "../BaseInput.vue";
import BaseSelect from "../BaseSelect.vue";
import CountriesDropdown, { Country } from "../CountriesDropdown.vue";

const rand = ref("");

const shipmentDate = ref(new Date());

const shipmentCountryFrom = ref<Country>();

const shipmentCountryTo = ref<Country>();

const zipCodeFrom = ref("10001");

const zipCodeTo = ref("10001");

const packageType = ref("custom_package");

const weight = ref("1");

const dimensions = reactive({
  depth: "1",
  width: "1",
  height: "1",
  unit: "in",
});

const handleSubmit = (e: Event) => {
  e.preventDefault();

  // const Shipment = {
  //   box_type: packageType.value,
  //   dimensions: {
  //     depth: dimensions.depth,
  //     width: dimensions.width,
  //     height: dimensions.height,
  //     unit: dimensions.unit,
  //   },
  //   ship_from: {
  //     country: shipmentCountryFrom.value?.iso3,
  //     postal_code: zipCodeFrom.value,
  //   },
  //   ship_to: {
  //     country: shipmentCountryTo.value?.iso3,
  //     postal_code: zipCodeTo.value,
  //   },
  //   weight: {
  //     unit: "lb",
  //     value: rand.value,
  //   },
  // };

  const fake = {

    "async": false,
    "shipper_accounts": [
      {
        "id": "3ba41ff5-59a7-4ff0-8333-64a4375c7f21"
      }
    ],
    "is_document": false,
    "shipment": {
      "ship_from": {
        "contact_name": "Contact Name",
        "company_name": "Postmen",
        "street1": "5160 Wiley Post Way",
        "country": "USA",
        "type": "business",
        "postal_code": "10001",
        "city": "Salt Lake City",
        "company_url": null,
        "phone": "18682306030",
        "street2": "Building 2",
        "tax_id": null,
        "street3": null,
        "state": "UT",
        "email": "usps_discounted@test.com",
        "fax": null
      },
      "ship_to": {
        "contact_name": "Dr. Moises Corwin",
        "phone": "1-140-225-6410",
        "email": "Giovanna42@yahoo.com",
        "street1": "28292 Daugherty Orchard",
        "city": "Beverly Hills",
        "postal_code": "90209",
        "state": "CA",
        "country": "USA",
        "type": "residential"
      },
      "parcels": [
        {
          "description": "Food XS",
          "box_type": "custom",
          "weight": {
            "value": 2,
            "unit": "kg"
          },
          "dimension": {
            "width": 20,
            "height": 40,
            "depth": 40,
            "unit": "cm"
          },
          "items": [
            {
              "description": "Food Bar",
              "origin_country": "USA",
              "quantity": 2,
              "price": {
                "amount": 3,
                "currency": "USD"
              },
              "weight": {
                "value": 0.6,
                "unit": "kg"
              },
              "sku": "imac2014"
            }
          ]
        }
      ]
    }
  };




  axios
    .post(
      "https://sandbox-api.postmen.com/v3/rates",
      { fake },
      {
        headers: {
          "postmen-api-key": "ef69ba1-3cd7-449c-833c-72aebfec34f7",
        },
      }
    )
    .then((res) => {
      console.log({ res });
    })
    .catch((err) => {
      console.log({ err });
    });
}

</script>
<template>
  <div class="calculator-wrapper">
    <form action="#" @submit.prevent="handleSubmit">
      <div class="form-item grid justify-between gap-x-4 grid-cols-6">
        <p class="label col-span-full">Ship from</p>
        <CountriesDropdown class="col-span-4" @country="(value) => (shipmentCountryFrom = value)" />
        <BaseInput class="col-start-5 col-end-7" v-model="zipCodeFrom" placeholder="Zip Code" />
      </div>
      <div class="form-item grid justify-between gap-4 grid-cols-6">
        <p class="label col-span-full">Ship to</p>
        <CountriesDropdown class="col-span-4" @country="(value) => (shipmentCountryTo = value)" />
        <BaseInput class="col-start-5 col-end-7" v-model="zipCodeTo" placeholder="Zip Code" />
      </div>

      <div class="form-item">
        <p class="label">Package Type</p>
        <BaseSelect required>
          <option selected value="custom_package">Custom Package</option>
          <option value="flat_rate_box">Flat rate box</option>
          <option value="flat_rate_envelope">Flat rate envelope</option>
        </BaseSelect>
      </div>

      <div class="form-item weight-dimension">
        <div>
          <p class="label">Weight</p>
          <div>
            <BaseInput placeholder="lb" v-model="weight" required />
            <span>lb</span>
          </div>
        </div>

        <div class="dimension">
          <p class="label">Dimension (Optional)</p>
          <div>
            <BaseInput placeholder="Depth" v-model="dimensions.depth" required />
            <span>x</span>
            <BaseInput placeholder="Width" v-model="dimensions.width" required />
            <span>x</span>
            <BaseInput placeholder="Height" v-model="dimensions.height" required />
            <span>in</span>
          </div>
        </div>
      </div>

      <div class="form-item">
        <p class="label">Shipment date</p>
        <BaseInput type="date" v-model="shipmentDate" required />
      </div>

      <button type="submit">Show Rates</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.calculator-wrapper {
  padding-left: 3rem;
  padding-right: 3rem;
  background-color: #e9f0ff;
  @apply max-w-lg py-10;

  form {
    .form-item {
      @apply mb-4;

      p.label {
        @apply text-sm block w-full font-bold mb-2;
      }
    }

    .weight-dimension {
      p.label {
        @apply block;
      }
      @apply grid;
      grid-template-columns: 1fr 5fr;
      gap: 1rem;
    }

    .weight-dimension {
      > div > div {
        @apply flex items-center;

        span {
          @apply text-xs mx-1;
        }
      }
    }

    .dimension {
      p.label {
        @apply block flex-shrink-0;
      }

      @apply flex flex-wrap items-center;
    }
  }
}

button[type="submit"] {
  background: #2b6eff;
  height: 3.125rem;
  @apply flex items-center border-2 justify-center w-full text-white font-medium;

  &:hover {
    color: #2b6eff;
    background: #fff;
    border: 2px solid #2b6eff;
  }
}
</style>
