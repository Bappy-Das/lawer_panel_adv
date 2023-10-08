<template>
    <nav class="breadcrumb">
        <router-link v-for="(route, index) in routes" :key="index" :to="route.to">
            {{ route.label }}
        </router-link>
    </nav>
</template>
  
<script>
export default {
    computed: {
        routes() {
            // Fetch the current route and its ancestors
            const matchedRoutes = this.$route.matched;
            const routes = matchedRoutes.map(route => ({
                to: route.path,
                label: route.meta.breadcrumbLabel || route.name
            }));

            return routes;
        }
    }
};
</script>
  
<style>
.breadcrumb {
    /* Add your breadcrumb styling here */
}
</style>
  