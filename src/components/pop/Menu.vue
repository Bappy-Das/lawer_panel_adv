<template>
    <div class="menu--container">
        <div class="menu--preview" ref="previewRef" @click="toggleOption">
            <slot name="preview" />
        </div>
        <transition :name="dropdownAnimation">
            <div class="menu--options" ref="optionRef" v-if="toggle">
                <slot name="menu" :closeMenu="closeOptions" />
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
const props = defineProps({
    closeOnClick: { type: Boolean, default: false },
    alignMenu: { type: String, default: 'center' }
})
const optionRef = ref();
const previewRef = ref();

const toggle = ref(false);
const interv = ref();
const monitorPosition = ref();
const dropdownAnimation = ref('dropdown')

const toggleOption = async (e) => {
    if (toggle.value === false) {
        let mainContainerEl = previewRef.value.getBoundingClientRect();
        toggle.value = true;
        await nextTick();
        let screenY = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let screenX = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let caclDropdownHeight = optionRef.value.offsetHeight;
        let caclDropdownWidth = optionRef.value.offsetWidth;
        if ((mainContainerEl.top + mainContainerEl.height + caclDropdownHeight) > screenY) {
            dropdownAnimation.value = 'dropup';
        } else {
            dropdownAnimation.value = 'dropdown';
        }
        if (dropdownAnimation.value == 'dropup') {
            optionRef.value.style.bottom = (screenY - mainContainerEl.top) + 'px';
        } else {
            optionRef.value.style.top = (mainContainerEl.top + mainContainerEl.height) + 'px';
        }

        if (props.alignMenu == 'left') {
            optionRef.value.style.left = mainContainerEl.left + 'px';
        } else if (props.alignMenu == 'right') {
            optionRef.value.style.right = (screenX - (mainContainerEl.left + mainContainerEl.width)) + 'px';
        } else {
            if (mainContainerEl.width > caclDropdownWidth) {
                let diff = (mainContainerEl.width - caclDropdownWidth) / 2;
                optionRef.value.style.left = (mainContainerEl.left + diff) + 'px';
            } else if (mainContainerEl.width < caclDropdownWidth) {
                let diff = (caclDropdownWidth - mainContainerEl.width) / 2;
                let left = mainContainerEl.left - diff;
                if (left < 10) { left = 10; }
                optionRef.value.style.left = left + 'px';
            } else {
                optionRef.value.style.left = mainContainerEl.left + 'px';
            }
        }
        optionRef.value.style.opacity = 1;
        document.addEventListener('mousedown', closeOptions);

        monitorPosition.value = mainContainerEl;
        interv.value = setInterval(async () => {
            if (previewRef.value) {
                let mainContainerEl = previewRef.value.getBoundingClientRect();
                if (
                    mainContainerEl.left != monitorPosition.value.left ||
                    mainContainerEl.right != monitorPosition.value.right ||
                    mainContainerEl.top != monitorPosition.value.top
                ) {
                    dropdownAnimation.value = ''
                    await nextTick();
                    closeOptions();
                }
            } else {
                closeOptions();
            }
        }, 30);
    } else {
        closeOptions();
    }
}
const closeOptions = (dt) => {
    if (props.closeOnClick === false) {
        if (dt && dt.target && dt.target.closest('.menu--options') != null) { return }
    }
    if (dt && dt.target && dt.target.closest('.menu--preview') != null) { return }

    document.removeEventListener('mousedown', closeOptions);
    clearInterval(interv.value);
    toggle.value = false;
    setTimeout(() => { dropdownAnimation.value = 'dropdown'; }, 500)
}
</script>
