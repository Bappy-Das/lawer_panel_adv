<template>
    <button class="btn" :type="btnType">
        <slot />
    </button>
</template>

<script setup>
    import { onBeforeMount, onBeforeUnmount } from 'vue'
    const props = defineProps({
        size: {type: String, default:''},
        btnType: {type: String, default:'text'},
    })

</script>
