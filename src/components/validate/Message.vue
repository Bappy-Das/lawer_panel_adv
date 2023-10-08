<template>
    <div :class="[
        'message--container',
        { 'message--bg-box': coloredBg !== false },
        messaging.type == 'error' ? coloredBg === false ? 'message--error' : 'message--error-bg' : '',
        messaging.type == 'warning' ? coloredBg === false ? 'message--warning' : 'message--warning-bg' : '',
        messaging.type == 'success' ? coloredBg === false ? 'message--success' : 'message--success-bg' : '',
        messaging.type == 'info' ? coloredBg === false ? 'message--info' : 'message--info-bg' : ''
    ]" :style="{ height: height, padding: validVar(messaging.msg) ? padding : '0px' }">
        <div v-if="messaging.type" class="message--icon">
            <span v-if="messaging.type == 'error'" class="xit-font-info-circle message--icon-font"></span>
            <span v-if="messaging.type == 'success'" class="xit-font-accepted message--icon-font"></span>
            <span v-if="messaging.type == 'warning'" class="xit-font-info-danger message--icon-font"></span>
            <span v-if="messaging.type == 'info'" class="xit-font-info-circle message--icon-font"></span>
        </div>
        <div class="message--text">{{ messaging.msg }}</div>
        <input type="hidden" :name="name" />
    </div>
</template>

<script setup>
import { watchEffect, ref, reactive, toRef, onMounted } from 'vue';
import { useField } from 'vee-validate';
import { validVar } from '@/functions/com.js';
const props = defineProps({
    name: String,
    validateValue: String | Number | Boolean,
    message: String,
    height: String,
    type: String,
    validate: Array | Object,
    coloredBg: { type: Boolean, default: false },
    padding: { type: String, default: '0px' }
})
var tempValue = ref();
var errorMessage = ref();
if (props.name) {
    var name = toRef(props, 'name');
    var { value: tempValue, errorMessage, setErrors } = useField(name, props.validate);
}
const showErr = ref(false);
const messaging = reactive({
    status: false,
    type: null,
    msg: '',
})

onMounted(() => {
    setTimeout(() => {
        if (props.name) { setErrors([]); }
        showErr.value = true;
    }, 2000)
})

watchEffect(() => {
    tempValue.value = props.validateValue;
})

watchEffect(() => {
    if (validVar(props.message)) {
        messaging.status = true;
        messaging.type = props.type;
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
</script>
