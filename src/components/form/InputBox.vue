<template>
    <div
        :class="['cc-input-box--container', size != '' ? `cc-input-box--container-${size}` : '', { 'cc-input-box--disabled read-only': disabled }, { 'read-only': readonly }]">
        <div
            :class="['cc-input-box--main', { 'cc-input-box--red': showNotification }, { 'cc-input-box--border-transparent': hideborder }, { 'cc-input-focus': focus }, `cc-input-message--${messaging.type}`]">
            <slot name="left" />
            <input
                :class="['cc-input-box--input', { 'cc-input-box--input-padding-left': !slots['left'] }, { 'cc-input-box--input-padding-right': !slots['right'] }]"
                :type="inputType" :placeholder="placeholder" v-model="modelValueTemp"
                @input="updateValue($event.target.value)" @change="changedValue($event.target.value)" @focus="focus = true"
                @blur="focus = false" :name="name" :autocomplete="autocomplete"
                :style="resetVal && validVar(modelValueTemp) && !disabled ? 'padding-right:5px' : ''" />
            <div class="cc-input-box--reset" @click="reset" v-if="resetVal && !disabled"
                :style="slots['right'] ? 'padding-right:0px' : ''"><i v-if="validVar(modelValueTemp)"
                    class="xit-font-x font-8"></i></div>
            <slot name="right" />
        </div>
        <div class="cc-input-box--detail" v-if="showDetail">
            <Message v-if="messaging.status === true" :message="messaging.msg" :type="messaging.type" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watchEffect, useSlots, toRef, reactive, onMounted } from 'vue';
import { useField } from 'vee-validate';
import { validVar } from '@/functions/com.js';
import Message from '@/components/validate/Message.vue';
const props = defineProps({
    modelValue: String | Number,
    placeholder: String,
    name: String,
    size: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    showNotification: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    hideborder: { type: Boolean, default: false },
    inputType: { type: String, default: 'text' },
    resetVal: { type: Boolean, default: false },
    autocomplete: String,
    showDetail: { type: Boolean, default: false },
    message: String,
    messageType: String,
    validate: Array | Object,
})

var modelValueTemp = ref();
var errorMessage = ref();
if (props.name) {
    var name = toRef(props, 'name');
    var { value: modelValueTemp, errorMessage, setErrors } = useField(name, props.validate);
}

const focus = ref(false);
const emit = defineEmits(['update:modelValue', 'reset', 'input', 'change']);
const slots = useSlots();
const showErr = ref(false);
const messaging = reactive({
    status: false,
    type: null,
    msg: '',
});

onMounted(() => {
    setTimeout(() => {
        if (props.name) { setErrors([]); }
        showErr.value = true;
    }, 1000)
})

watchEffect(() => {
    modelValueTemp.value = props.modelValue;
})

watchEffect(() => {
    if (validVar(props.message)) {
        messaging.status = true;
        messaging.type = props.messageType;
        messaging.msg = props.message;
    } else if (validVar(errorMessage.value) && showErr.value) {
        messaging.status = true;
        messaging.type = 'error';
        messaging.msg = errorMessage.value;
    } else {
        messaging.status = false;
        messaging.type = null;
        messaging.msg = '';
    }
})

const updateValue = (value) => {
    emit('update:modelValue', value);
    emit('input', value);
};
const changedValue = (value) => {
    emit('change', value);
};
const reset = () => {
    modelValueTemp.value = ''
    emit('update:modelValue', '');
    emit('reset', '');
};
</script>