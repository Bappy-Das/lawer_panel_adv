<template>
  <div class="cc-select-box--container">
    <div class="cc-select-box--main" ref="mainContainerRef">
      <div :class="[
        'cc-select-box--preview',
        size != '' ? `cc-select-box--${size}` : '',
        { 'cc-input-focus': toggle },
      ]" @click="toggleOptions">
        <div class="cc-select-box--search-input" v-if="toggle && inputSearch">
          <input ref="searchInputRef" type="text" v-model="inputSearchText" @change="inputSearchChange" />
        </div>
        <div class="cc-select-box--placeholder" v-else-if="!validVar(modelValue)">
          {{ placeholder }}
        </div>
        <div class="cc-select-box--text-preview" v-else>
          <slot name="input" :data="options[activeIndex]" />
          <div class="cc-select-box--input" v-if="!slots['input']">
            {{ textPreview }}
          </div>
        </div>
        <div class="cc-select-box--right-icons">
          <div class="cc-input-reset" @click="reset" v-if="resetVal">X</div>
          <div style="transform: rotate(90deg); margin: 8px">></div>
          <input type="hidden" :value="modelValue" :name="name" />
        </div>
      </div>
      <transition :name="dropdownAnimation">
        <div v-if="toggle" class="cc-select-box--item-container" id="dropItem" ref="optionContainerRef"
          :style="{ maxHeight: dropdownHeight + 'px' }">
          <div v-for="(item, index) in options" :key="index" @click="completeSelect(item)" :class="[
            'cc-select-box--item',
            { 'cc-select-box--item-hover': hoverIndex === index },
          ]" @mouseenter="hoverIndex = index">
            <slot name="option" :data="item" />
            <div v-if="!slots['option']">
              {{ validVar(show) ? item[show] : item }}
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="cc-select-box--detail" v-if="showDetail">
      <Message v-if="message" :message="message" :type="type" />
    </div>
  </div>
</template>

<script setup>
import {
  defineProps,
  defineEmits,
  ref,
  onMounted,
  computed,
  useSlots,
  nextTick,
} from "vue";
import Message from "@/components/validate/Message.vue";
import { validVar } from "@/functions/com.js";
const props = defineProps({
  modelValue: String | Number,
  placeholder: String,
  name: String,
  size: { type: String, default: "" },
  resetVal: { type: Boolean, default: false },
  options: {
    type: [Array, Object],
    default: () => {
      return [];
    },
  },
  show: { type: String },
  catch: { type: String },
  inputSearch: { type: Boolean, default: false },
  showDetail: { type: Boolean, default: false },
  message: String,
  type: { type: String, default: null },
});
//Component
const emit = defineEmits(["update:modelValue", "reset"]);
const slots = useSlots();
//Refs
const optionContainerRef = ref();
const mainContainerRef = ref();
const searchInputRef = ref();
//
const interv = ref();
const monitorPosition = ref();
const toggle = ref(false);
const inputSearchText = ref();
const hoverIndex = ref("");
const dropdownHeight = ref(250);
const dropdownAnimation = ref("dropdown");

// let height = this.$optionContainerRef.dropItem.clientHeight;
// console.log(height)

// const element = document.getElementById("dropItem");
// let text = "clientHeight: " + element.clientHeight + "px";


const activeIndex = computed(() => {
  if (validVar(props.catch) && validVar(props.show)) {
    let index = props.options.findIndex(
      (x) => x[props.catch] === props.modelValue
    );
    if (index === -1) {
      return null;
    }
    if (props.options[index][props.show]) {
      return index;
    } else {
      return null;
    }
  } else {
    let index = props.options.findIndex((x) => x === props.modelValue);
    if (index === -1) {
      return null;
    }
    if (props.options[index]) {
      return index;
    } else {
      return null;
    }
  }
});
const textPreview = computed(() => {
  if (validVar(props.catch) && validVar(props.show)) {
    let index = props.options.findIndex(
      (x) => x[props.catch] === props.modelValue
    );
    if (index === -1) {
      return null;
    }
    return props.options[index][props.show];
  } else {
    let index = props.options.findIndex((x) => x === props.modelValue);
    if (index === -1) {
      return null;
    }
    return props.options[index];
  }
});
const toggleOptions = async (ev) => {
  if (toggle.value === false) {
    if (ev && ev.target && ev.target.closest(".cc-input-reset") != null) {
      return;
    }
    let mainContainerEl = mainContainerRef.value.getBoundingClientRect();
    mainContainerRef.value.style.width = mainContainerEl.width + "px";
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
        mainContainerEl.top - mainContainerEl.height + "px";
      // optionContainerRef.value.style.top = (mainContainerEl.top - dropdownHeight.value) + 'px';
    } else {
      optionContainerRef.value.style.top =
        mainContainerEl.top + mainContainerEl.height + "px";
    }
    optionContainerRef.value.style.left = mainContainerEl.left + "px";
    optionContainerRef.value.style.width = mainContainerEl.width + "px";
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
    if (searchInputRef.value) {
      searchInputRef.value.focus();
    }
    if (activeIndex.value != null) {
      hoverIndex.value = activeIndex.value;
      await nextTick();
      centerItem();
    }
  } else {
    // console.log("else");
    if (
      ev &&
      ev.target &&
      ev.target.closest(".cc-select-box--search-input") != null
    ) {
      return;
    }
    closeOptions();
  }
};
const closeOptions = (dt) => {
  if (
    dt &&
    dt.target &&
    dt.target.closest(
      ".cc-select-box, .cc-select-box--search-input, .cc-select-box--text-preview, .cc-select-box--placeholder"
    ) != null
  ) {
    return;
  }
  // console.log("closed", dt);
  document.removeEventListener("click", closeOptions);
  clearInterval(interv.value);
  toggle.value = false;
  hoverIndex.value = "";
  mainContainerRef.value.style.width = "auto";
};
const centerItem = () => {
  let el = optionContainerRef.value.querySelector(".cc-select-box--item-hover");
  optionContainerRef.value.scrollTop = el.offsetTop - dropdownHeight.value / 2;
};
const completeSelect = (item) => {
  if (validVar(props.catch)) {
    emit("update:modelValue", item[props.catch]);
  } else {
    emit("update:modelValue", item);
  }
};
const reset = () => {
  emit("update:modelValue", "");
  emit("reset", "");
};
const inputSearchChange = () => {
  emit("inputSearch", inputSearchText.value);
};
</script>
