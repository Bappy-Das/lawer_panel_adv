<template>
    <div>
        <Header />
        <div>
            redirect route
            <router-view />
        </div>

    </div>
</template>
<script setup>
    import Header from './Header.vue';
</script>