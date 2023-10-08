<template>
    <div class="cc-radio-box--container">
        <div class="cc-radio-box--main">
            <div class="cc-radio-box--input">
                <input 
                    type="radio" 
                    :name="name" 
                    :value="radioValue"
                    v-model="radioBoxVal"
                />
            </div>
            <div v-if="label || slots['label']">
                <slot name="label" />
                <div v-if="!slots['label']">{{label}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits, ref, computed , useSlots} from 'vue'
    const props = defineProps({
        modelValue: String | Number | Boolean,
        name: String,
        radioValue: String | Number | Boolean,
        size: {type: String, default:''},
        label: {type: String, default:null},
        message:String,
        type:String,
    })
    const emit = defineEmits(['update:modelValue', 'change']);
    const slots = useSlots();

    const radioBoxVal = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit('update:modelValue',value);
            emit('change',value);
        }
    });
</script>
