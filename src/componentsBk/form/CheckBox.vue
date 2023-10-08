<template>
    <div class="cc-check-box--container">
        <div class="cc-check-box--main">
            <div class="cc-check-box--input">
                <input 
                    type="checkbox" 
                    :name="name" 
                    v-model="checkBoxVal"
                    :value="value"
                />
            </div>
            <div v-if="label || slots['label']" class="cc-check-box--label">
                <slot name="label" />
                <div v-if="!slots['label']">{{label}}</div>
            </div>
        </div>
        <div class="cc-check-box--detail" v-if="showDetail">
            <Message v-if="message" :message="message" :type="type"  />
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits, ref, computed , useSlots} from 'vue';
    import Message from '@/components/validate/Message.vue';
    const props = defineProps({
        modelValue: Boolean,
        name: String | Array,
        size: {type: String, default:''},
        label: {type: String, default:null},
        showDetail:{type: Boolean, default:false},
        message:String,
        type:String,
        value:String
    })
    const emit = defineEmits(['update:modelValue', 'change']);
    const slots = useSlots();

    const checkBoxVal = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit('update:modelValue',value);
            emit('change',value);
        }
    });
</script>
