const excludedRoutes = ['/', '/login'];

export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = async () => await useSessionStorage('isLoggedIn', false);
    isAuthenticated().then((res) => {
        if (!res && !excludedRoutes.includes(to.path)) {
            return navigateTo('/login')
        } else {
            return;
        }
    })
});