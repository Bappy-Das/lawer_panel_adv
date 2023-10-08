<template>
    <div class="page-layout--container">
        <div class="page-layout--header">
            <div class="page-layout--header-main">{{header}}</div>
            <div class="page-layout--header-sub">{{subHeader}}</div>
        </div>
        
        <div class="page-layout--content">
            <slot />
        </div>
    </div>
</template>
<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        header: String,
        subHeader: String,
    })
</script>


