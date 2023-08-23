<template>
  <header
    class="
      sticky
      top-0
      z-50
      flex
      justify-between
      items-center
      space-x-1
      border-b
      bg-white
      p-4
      shadow-md
    "
  >
    <NuxtLink class="text-3xl font-mono" to="/">cartrader</NuxtLink>
    <div class="flex">
      <NuxtLink to="/login" v-if="!isUserLoggedIn">Login</NuxtLink>
      <p class="cursor-pointer" v-if="isUserLoggedIn" @click="logout">Logout</p>
    </div>
  </header>
</template>
<script setup>
const isUserLoggedIn = useSessionStorage('isLoggedIn', false);
const router = useRouter();

const logout = () => {
  isUserLoggedIn.value = false;
  router.push("/");
}
</script>