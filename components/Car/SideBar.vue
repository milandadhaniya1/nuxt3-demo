<script setup>
const { makes } = useCars();
const { city: cityList } = useCars();
const modal = ref({
  make: false,
  location: false,
  price: false,
});
const resetModal = () => {
  modal.value = {
    make: false,
    location: false,
    price: false,
  };
}
const selectedCity = ref("");
const priceRange = ref({
  min: "",
  max: "",
});
const route = useRoute();
const router = useRouter();

const priceRangeText = computed(() => {
  const minPrice = route.query.minPrice;
  const maxPrice = route.query.maxPrice;

  if (!minPrice && !maxPrice) return "Any";
  else if (!minPrice && maxPrice) {
    return `< $${maxPrice}`;
  } else if (minPrice && !maxPrice) {
    return `> $${minPrice}`;
  } else {
    return `$${minPrice}-$${maxPrice}`;
  }
});

const updateModal = (key) => {
  let val = modal.value[key];
  resetModal();
  modal.value[key] = !val;
};

const onChangeLocation = () => {
  if (!selectedCity.value) return;
  if (!isNaN(parseInt(selectedCity.value))) {
    throw createError({
      statusCode: 400,
      message: "Invalid city format",
    });
  }
  updateModal("location");
  navigateTo(`/city/${selectedCity.value}/car/${route.params.make}`);
  selectedCity.value = "";
};

const onChangeMake = (make) => {
  updateModal("make");
  navigateTo(`/city/${route.params.city}/car/${make}`);
};

const onChangePrice = () => {console.log(priceRange.value.max);
  updateModal("price");
  if (priceRange.value.max && priceRange.value.min) {
    if (priceRange.value.min > priceRange.value.max) return;
  }
  router.push({
    query: {
      minPrice: priceRange.value.min,
      maxPrice: priceRange.value.max,
    },
  });
};
</script>

<template>
  <div class="shadow border w-56 mr-10 z-30 h-[190px]">
    <!-- LOCATION START -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Location</h3>
      <h3 @click="updateModal('location')" class="text-blue-400 capitalize">
        {{ route.params.city }}
      </h3>
      <div
        v-if="modal.location"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <select type="text" class="border p-1 rounded w-[200px]" v-model="selectedCity">
          <option :value="cityName" v-for="cityName in cityList" :key="cityName">{{ cityName }}</option>
        </select>
        <button
          @click="onChangeLocation"
          class="bg-blue-400 w-full mt-2 rounded text-white p-1"
        >
          Apply
        </button>
      </div>
    </div>
    <!-- LOCATION END -->

    <!-- MAKE START -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Make</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('make')">
        {{ route.params.make || "Any" }}
      </h3>
      <div
        class="
          absolute
          border
          shadow
          left-56
          p-5
          top-1
          -m-1
          w-[600px]
          flex
          justify-between
          flex-wrap
          bg-white
        "
        v-if="modal.make"
      >
        <h4
          v-for="make in makes"
          :key="make"
          class="w-1/3"
          @click="onChangeMake(make)"
        >
          {{ make }}
        </h4>
      </div>
    </div>
    <!-- MAKE END -->

    <!-- PRICE START -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Price</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('price')">
        {{ priceRangeText }}
      </h3>
      <div
        class="absolute border sahow left-56 p-5 top-1 -m-1 bg-white"
        v-if="modal.price"
      >
        <input
          class="border p-1 rounded"
          type="number"
          placeholder="Min"
          v-model="priceRange.min"
        />
        <input
          class="border p-1 rounded"
          type="number"
          placeholder="Max"
          v-model="priceRange.max"
        />
        <button
          class="bg-blue-400 w-full mt-2 rounded text-white p-1"
          @click="onChangePrice"
        >
          Apply
        </button>
      </div>
    </div>
    <!-- PRICE END -->
  </div>
</template>



