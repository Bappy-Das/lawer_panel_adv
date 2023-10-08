<template>
    <div class="modal--container" @mousedown="mouseDownEvent" ref="modalContainerRef">
        <transition name="zoom-toggle">
            <div class="modal--view" :style="{ maxWidth: `${props.width}px`, maxHeight: `${props.height}px` }"
                v-if="toggle">
                <div class="modal--header" v-if="!noHeader">
                    <div class="flex-auto">
                        <slot name="header" />
                        <div class="modal--header-text" v-if="!slots['header']">
                            {{ title }}
                        </div>
                    </div>
                    <div class="modal--close-btn">
                        <i @click="closeModal" class="fa-regular fa-circle-xmark cursor-pointer"></i>
                    </div>
                </div>
                <div>
                    <slot />
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, useSlots, ref, onMounted } from 'vue';
import { validVar } from '@/functions/com.js'
const props = defineProps({
    title: { type: String, default: '' },
    width: { type: Number, default: 550 },
    height: { type: String, default: 'auto' },
    noHeader: { type: Boolean, default: false }
})
const emit = defineEmits(['closeModal']);
const slots = useSlots();

const modalContainerRef = ref()
const toggle = ref(false);

onMounted(() => {
    toggle.value = true;
    setTimeout(() => {
        modalContainerRef.value.style.opacity = 1;
    }, 10)

})

const closeModal = () => {
    toggle.value = false;
    modalContainerRef.value.style.opacity = 0;
    setTimeout(() => {
        emit('closeModal')
    }, 300)
}
const mouseDownEvent = (e) => {
    if (e.target.closest('.modal--view') == null) {
        closeModal()
    }
}

</script>