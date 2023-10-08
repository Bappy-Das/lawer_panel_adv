<template>
    <div class="page-layout--container">
        <div v-if="route.name !== 'uploadSuccess'">
            <span class="cursor-pointer text-center" onclick="history.back()"><i class="fa-solid fa-reply pa-5"></i>Go
                Back</span>
            <!-- <Breadcrumb></Breadcrumb> -->
        </div>
        <div class="page-layout--header">
            <div class="page-layout--header-main">{{ header }}</div>
            <div class="page-layout--header-sub">{{ subHeader }}</div>
            <!-- <div class="page-layout--header-sub">{{ subHeader }}</div> -->
        </div>
        <!-- <Breadcrumb /> -->
        <div class="page-layout--content" ref="containerRef"
            :style="{ maxWidth: width, backgroundColor: background, padding: padding }">
            <slot />
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumb from '../breadcrumbs/Breadcrumb.vue';
const route = useRoute();
const props = defineProps({
    header: String,
    subHeader: String,
    width: String,
    tabs: { type: Boolean, default: false },
    background: { type: String, default: '#FFFFFF' },
    padding: { type: String, default: '25px' },
})
const emit = defineEmits(['setScreenWidth', 'setScreenHeight']);
const containerRef = ref();
onMounted(() => {
    const resizeObserver = new ResizeObserver(entries => {
        emit('setScreenWidth',
            window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        );
        emit('setScreenHeight',
            window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        );
    })
    resizeObserver.observe(containerRef.value);
})
// computed(() => {
//     currentRouteName(() => {
//         return this.$route.name;
//     })
// })

</script>


