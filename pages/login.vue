<template>
    <div class="mt-10">
        <h1 class="text-5xl font-bold mb-7">
            Login
        </h1>
        <button @click="login" class="bg-red-400 p-3 rounded text-white font-bold">
            Click to login
        </button>
    </div>
</template>

<script setup>
const router = useRouter();
const isLoggedIn = useSessionStorage('isLoggedIn', true);
definePageMeta({
    layout: "custom"
});

const login = () => {
    isLoggedIn.value = true;
    router.push("/");
}
</script>