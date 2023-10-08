<template>
    <div :class="['cc-file-upload--container', {'read-only':readonly}]">
        <div class="cc-file-upload--main">
            <div class="cc-file-upload--input">
                  <input
                    type="file"
                    :name="name"
                    autocomplete="off"
                    ref="fileUploadInputRef"
                    @change="updateValue"
                  />
            </div>
        </div>
        <div class="cc-select-box--detail" v-if="showDetail">
            <Message v-if="messaging.status === true" :message="messaging.msg" :type="messaging.type"  />
        </div>
    </div>
</template>

<script setup>
    import { ref, watchEffect , toRef, onMounted, reactive } from 'vue'
    import { useField } from 'vee-validate';
    import Message from '@/components/validate/Message.vue';
    import { validVar } from '@/functions/com.js';
    const props = defineProps({
        modelValue: String | Number | Boolean,
        name: String,
        disabled: {type:Boolean, default:false},
        readonly: {type:Boolean, default:false},
        showDetail:{type: Boolean, default:false},
        validate: Array | Object,
        size: {type: String, default:''},
    })

    var modelValueTemp = ref();
    var errorMessage = ref();
    if(props.name){
        var name = toRef(props, 'name');
        var {value: modelValueTemp, errorMessage, setErrors} = useField(name, props.validate);
    }

    const emit = defineEmits(['update:modelValue', 'change']);
    const fileUploadInputRef = ref();
    const showErr = ref(false);
    const messaging = reactive({
        status:false,
        type:null,
        msg:'',
    });

    onMounted(()=>{
        setTimeout(()=>{
            if(props.name){setErrors([]);}
            showErr.value = true;
        },1000)
    })

    watchEffect(()=>{
        if(!validVar(props.modelValue)){
            if(fileUploadInputRef.value){fileUploadInputRef.value.value = "";}
            modelValueTemp.value = null;
        }
    });

    watchEffect(()=>{
        if(validVar(props.message)){
            messaging.status = true;
            messaging.type = props.messageType;
            messaging.msg = props.message;
        }else if(validVar(errorMessage.value) && showErr.value){
            messaging.status = true;
            messaging.type = 'error';
            messaging.msg = errorMessage.value;
        }else{
            messaging.status = false;
            messaging.type = null;
            messaging.msg = '';
        }
    })

    const updateValue = (e) => {
        modelValueTemp.value = e.target.files[0];
        emit('update:modelValue',e.target.files[0]);
        emit('change',e.target.files);
    };
</script>
