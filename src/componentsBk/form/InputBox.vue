<template>
    <div class="cc-input-box--container">
        <div :class="['cc-input-box--main', size != '' ? `cc-input-box--${size}`: '', {'cc-input-focus':focus}]">
            <slot name="left" />
            <input 
                :class="['cc-input-box--input', {'cc-input-box--input-padding-left':!slots['left']}, {'cc-input-box--input-padding-right':!slots['right']}]" 
                :type="inputType"
                :placeholder="placeholder" 
                :value="modelValue" 
                @input="updateValue($event.target.value)"
                @change="changedValue($event.target.value)"
                @focus="focus = true"
                @blur="focus = false"
                :name="name"
                :autocomplete="autocomplete"
            />
            <div class="cc-input-reset" @click="reset" v-if="resetVal">X</div>
            <slot name="right" />
        </div>
        <div class="cc-input-box--detail" v-if="showDetail">
            <Message v-if="message" :message="message" :type="type"  />
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits, ref, watch , useSlots} from 'vue';
    import Message from '@/components/validate/Message.vue';
    const props = defineProps({
        modelValue: String | Number,
        placeholder: String,
        name: String,
        size: {type: String, default:''},
        inputType: {type: String, default:'text'},
        resetVal: {type: Boolean, default:false},
        autocomplete: String,
        showDetail:{type: Boolean, default:false},
        message:String,
        type:String,
    })
    const focus = ref(false);
    const emit = defineEmits(['update:modelValue', 'reset', 'input', 'change']);
    const slots = useSlots();

    const updateValue = (value) => {
        emit('update:modelValue',value);
        emit('input',value);
    };
    const changedValue = (value) => {
        emit('change',value);
    };
    const reset = () => {
        emit('update:modelValue','');
        emit('reset','');
    };
</script>