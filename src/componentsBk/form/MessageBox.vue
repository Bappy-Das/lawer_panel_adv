<template>
    <div class="cc-message-box--container">
        <div :class="['cc-message-box--main', {'cc-input-focus':focus}]">
            <textarea
                :placeholder="placeholder" 
                :value="modelValue" 
                :name="name"
                :maxlength="maxlength"
                :rows="10"
                class="cc-message-box--input"
                @input="updateValue($event.target.value)"
                @change="changedValue($event.target.value)"
                @focus="focus = true"
                @blur="focus = false"></textarea>
        </div>
        <div class="cc-message-box--detail" v-if="showDetail">
            <div class="cc-message-box--detail-box">
                <Message v-if="message" :message="message" :type="type"  />
            </div>
            <div class="cc-message-box--detail-count" v-if="maxlength">
                {{totalCount}}/{{maxlength}}
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits, ref, computed , useSlots} from 'vue';
    import Message from '@/components/validate/Message.vue';
    import { validVar } from '@/functions/com.js';
    const props = defineProps({
        modelValue: String | Number,
        placeholder: String,
        name: String,
        size: {type: String, default:''},
        rows: {type: Number, default:5},
        maxlength: {type: Number, default:null},
        showDetail:{type: Boolean, default:false},
        message:String,
        type:String,
    })
    const focus = ref(false);
    const emit = defineEmits(['update:modelValue',  'input', 'change']);
    const slots = useSlots();

    const totalCount = computed(()=>{
        if(!validVar(props.modelValue)){return 0}
        else{return props.modelValue.length}
    });

    const updateValue = (value) => {
        emit('update:modelValue',value);
        emit('input',value);
    };
    const changedValue = (value) => {
        emit('change',value);
    };
</script>
