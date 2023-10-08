<template>
    <label class="switch">
        <input type="checkbox" id="togBtn" :value="radioValue" v-model="modelValueTemp" @change="updateValue">
        <div class="slider"></div>
    </label>
</template>
<script setup>
import { ref, watchEffect, useSlots, toRef } from 'vue'
import { useField } from 'vee-validate';
const props = defineProps({
    modelValue: String | Number | Boolean,
    name: String,
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    radioValue: String | Number | Boolean,
    size: { type: String, default: '' },
    label: { type: String, default: null },
})
if (props.name) {
    var name = toRef(props, 'name');
    useField(name);
}
const emit = defineEmits(['update:modelValue', 'change']);

const modelValueTemp = ref();

watchEffect(() => {
    modelValueTemp.value = props.modelValue;
});

const updateValue = () => {
    emit('update:modelValue', modelValueTemp.value);
    emit('change', modelValueTemp.value);
};


</script>
<style>
.switch {
    position: relative;
    display: inline-block;
    width: 90px;
    height: 36px;
}

.switch input {
    display: none;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 4px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--info);
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 30px;
    width: 30px;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background-color: white;
    transition: 0.4s;
    border-radius: 34px;
}

input:checked+.slider {
    background-color: var(--primary);
}

input:focus+.slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(55px);
}

.slider:after {
    content: 'Trash';
    color: white;
    display: block;
    position: absolute;
    transform: translate(-10%, -50%);
    transition: 0.3s ease-in-out;
    top: 50%;
    left: 50%;
    font-size: 14px;
    font-weight: 500;
    font-family: Verdana, sans-serif;
}

input:checked+.slider:after {
    content: 'Active';
    transform: translate(-80%, -50%);
    transition: 0.3s ease-in-out;
}
</style>