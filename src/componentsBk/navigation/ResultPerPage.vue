<template>
  <div class="result-per-page--container">
    <div class="result-per-page--text">Show result</div>
    <div>
      <div
        class="result-per-page--per-page primary-color"
        @click="toggleOptions"
        ref="mainContainerRef"
      >
        {{ perPage }}
      </div>
      <transition :name="dropdownAnimation">
        <div
          class="result-per-page--option-container"
          v-if="toggle"
          ref="optionContainerRef"
          :style="{ maxHeight: dropdownHeight + 'px' }"
        >
          <div
            class="result-per-page--option-item"
            v-for="(item, index) in pageNumberOptions"
            :key="index"
            @click="loadItem(item)"
          >
            {{ item }}
          </div>
        </div>
      </transition>
    </div>
    <div class="result-per-page--text">out of</div>
    <div class="result-per-page--total primary-color">{{ totalResult }}</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, nextTick } from "vue";
const props = defineProps({
  totalResult: { type: Number, default: 0 },
  perPage: { type: Number, default: 0 },
  pageNumberOptions: {
    type: Array,
    default: () => {
      return [5, 10, 15, 20, 25, 30, 50, 100];
    },
  },
});
const toggle = ref(false);
const mainContainerRef = ref();
const optionContainerRef = ref();
const dropdownHeight = ref(150);
const interv = ref();
const monitorPosition = ref();
const dropdownAnimation = ref("dropdown");

const emit = defineEmits(["select"]);

const toggleOptions = async () => {
  if (toggle.value === false) {
    let mainContainerEl = mainContainerRef.value.getBoundingClientRect();
    let screenY =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    if (
      mainContainerEl.top + mainContainerEl.height + dropdownHeight.value >
      screenY
    ) {
      dropdownAnimation.value = "dropup";
    } else {
      dropdownAnimation.value = "dropdown";
    }
    toggle.value = true;
    await nextTick();

    if (dropdownAnimation.value == "dropup") {
      optionContainerRef.value.style.top =
        mainContainerEl.top - dropdownHeight.value + "px";
    } else {
      optionContainerRef.value.style.top =
        mainContainerEl.top + mainContainerEl.height + "px";
    }
    optionContainerRef.value.style.left = mainContainerEl.left + "px";
    optionContainerRef.value.style.opacity = 1;
    monitorPosition.value = mainContainerEl;

    interv.value = setInterval(() => {
      let mainContainerEl = mainContainerRef.value.getBoundingClientRect();
      if (
        mainContainerEl.left != monitorPosition.value.left ||
        mainContainerEl.right != monitorPosition.value.right ||
        mainContainerEl.top != monitorPosition.value.top
      ) {
        closeOptions();
      }
    }, 100);
    document.addEventListener("click", closeOptions);
  } else {
    closeOptions();
  }
};
const closeOptions = (dt) => {
  if (
    dt &&
    dt.target &&
    dt.target.closest(".result-per-page--per-page") != null
  ) {
    return;
  }
  document.removeEventListener("click", closeOptions);
  clearInterval(interv.value);
  toggle.value = false;
};
const loadItem = (item) => {
  emit("select", item);
};
</script>