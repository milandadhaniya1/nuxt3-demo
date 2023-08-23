<template>
  <div>
    <CarCards v-if="(cars || []).length > 0" :cars="cars"/>
    <div v-else class="text-red-600">No cars found.</div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data: cars, refresh } = await useFetchCars(route.params.city, {
  make: route.params.make, 
  minPrice: route.query.minPrice,
  maxPrice: route.query.maxPrice
});

watch(() => route.query, () => window.location.reload());
</script>