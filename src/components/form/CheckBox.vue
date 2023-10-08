<template>
    <div :class="['cc-check-box--container', { 'read-only': readonly }]">
        <div class="cc-check-box--main">
            <div class="cc-check-box--input">
                <input type="checkbox" :name="name" v-model="modelValueTemp" @change="updateValue" :disabled="disabled" />
            </div>
            <div v-if="label || slots['label']" class="cc-check-box--label">
                <slot name="label" />
                <div v-if="!slots['label']">{{ label }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watchEffect, ref, useSlots, toRef } from 'vue';
import { useField } from 'vee-validate';
const props = defineProps({
    modelValue: Boolean,
    name: String,
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    size: { type: String, default: '' },
    label: { type: String, default: null },
})
if (props.name) {
    var name = toRef(props, 'name');
    useField(name);
}
const emit = defineEmits(['update:modelValue', 'change']);
const slots = useSlots();
const modelValueTemp = ref();

watchEffect(() => {
    modelValueTemp.value = props.modelValue;

});

const updateValue = () => {
    emit('update:modelValue', modelValueTemp.value);
    emit('change', modelValueTemp.value);
    // console.log(modelValueTemp.value)
};
</script>
