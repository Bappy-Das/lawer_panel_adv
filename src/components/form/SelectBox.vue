<template>
<div :class="['cc-select-box--container', size != '' ? `cc-select-box--container-${size}`: '', {'cc-select-box--disabled read-only':disabled}, {'read-only':readonly}]" :id="`select-box-${selectBoxId}`">
    <div class="cc-select-box--main" ref="mainContainerRef">
        
        <div :class="['cc-select-box--preview' , `cc-input-message--${messaging.type}`, size != '' ? `cc-select-box--${size}`: '', {'cc-input-focus':toggle}]" @click="toggleOptions">
            <slot name="left" />
            <div class="cc-select-box--search-input" v-if="toggle && inputSearch">
                
                <input ref="searchInputRef" type="text" v-model="inputSearchText" @input="inputSearchChange" :autocomplete="autocomplete" :id="`select-box-search-${selectBoxId}`" />
            </div>
            
            <div class="cc-select-box--placeholder" v-else-if="!validVar(modelValueTemp)">
                {{placeholder}}
            </div>
            <div class="cc-select-box--text-preview" v-else>
                <slot name="input" :data="options[activeIndex]" />
                <div class="cc-select-box--input" v-if="!slots['input']">
                    {{textPreview}}
                </div>
            </div>
            <div class="cc-select-box--right-icons">
                <div class="cc-select-box--reset" @click="reset" v-if="resetVal && !disabled"><i v-if="validVar(modelValueTemp)" class="xit-font-x font-8"></i></div>
                <div class="cc-select-box--arrow-down"><i class="xit-font-arrow-down"></i></div>
                <input type="hidden" :value="modelValueTemp" :name="name" />
            </div>
        </div>
        <transition :name="dropdownAnimation">
            <div v-if="toggle" class="cc-select-box--item-container" ref="optionContainerRef">
                <div>
                    <slot name="dropdownHead" />
                </div>
                <div class="cc-select-box--items" :style="{maxHeight:dropdownHeight+'px'}">
                    <div 
                        v-for="(item, index) in options" 
                        :key="index" 
                        @click="completeSelect(item)"
                        :class="['cc-select-box--item', {'cc-select-box--item-hover':hoverIndex===index}]"
                        @mouseenter="hoverIndex = index"
                    >
                        <slot name="option" :data="item" :index="index" />
                        <div class="cc-select-box--item-text" v-if="!slots['option']">{{validVar(show) ? item[show] : item}}</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
    <div class="cc-select-box--detail" v-if="showDetail">
        <Message v-if="messaging.status === true" :message="messaging.msg" :type="messaging.type"  />
    </div>
</div>
</template>

<script setup>
    import { defineProps, defineEmits, ref, watchEffect, computed, useSlots, nextTick, toRef, reactive, onMounted } from 'vue';
    import { useField } from 'vee-validate';
    import Message from '@/components/validate/Message.vue';
    import { validVar, getTargetParent, randomString } from '@/functions/com.js';
    const props = defineProps({
        modelValue: String | Number,
        placeholder: String,
        name: String,
        size: {type: String, default:''},
        disabled: {type:Boolean, default:false},
        readonly: {type:Boolean, default:false},
        resetVal: {type: Boolean, default:false},
        autocomplete: String,
        options: {type: [Array, Object], default: () => {return []}},
        show: {type: String},
        catch: {type: String},
        inputSearch:{type: Boolean, default:false},
        showDetail:{type: Boolean, default:false},
        message:String,
        messageType:{type:String, default:null},
        validate: Array | Object,
        disableOnClickOptionClose:{type: Boolean, default:false},
        disableOptionClick:{type: Boolean, default:false}
    })

    var modelValueTemp = ref();
    var errorMessage = ref();
    if(props.name){
        var name = toRef(props, 'name');
        var {value: modelValueTemp, errorMessage, setErrors} = useField(name, props.validate);
    }

    //Component
    const emit = defineEmits(['update:modelValue', 'reset', 'optionSearch', 'change']);
    const slots = useSlots();
    //Refs
    const showErr = ref(false);
    const optionContainerRef = ref();
    const mainContainerRef = ref();
    const searchInputRef = ref();
    const selectBoxId = ref(randomString(50, '0123456789abcdefghijklmnopqrstuvwxyz'))
    //
    //const modelValueTemp = ref();
    const interv = ref();
    const monitorPosition = ref();
    const toggle = ref(false);
    const inputSearchText = ref();
    const hoverIndex = ref('');
    const dropdownHeight = ref(250);
    const dropdownAnimation = ref('dropdown');
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
        modelValueTemp.value = props.modelValue;
    })

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

    const activeIndex = computed(() => {
        if(props.options.constructor !== Array){return null}
        if(validVar(props.catch) && validVar(props.show)){
            let index = props.options.findIndex(x => x[props.catch] === modelValueTemp.value);
            if(index === -1){return null}
            if(props.options[index][props.show]){return index}else{return null}
        }else if(validVar(props.show) && modelValueTemp.value){
            let index = props.options.findIndex(x => x[props.show] === modelValueTemp.value[props.show]);
            if(index === -1){return null}
            if(props.options[index][props.show]){return index}else{return null}
        }else{
            let index = props.options.findIndex(x => x === modelValueTemp.value);
            if(index === -1){return null}
            if(props.options[index]){return index}else{return null}
        }
    })
    const textPreview = computed(() => {
        if(props.options.constructor !== Array){return ''}
        if(validVar(props.catch) && validVar(props.show)){
            let index = props.options.findIndex(x => x[props.catch] === modelValueTemp.value);
            if(index === -1){return ''}
            return props.options[index][props.show];
        }else if(validVar(props.show) && modelValueTemp.value){
            let index = props.options.findIndex(x => x[props.show] === modelValueTemp.value[props.show]);
            if(index === -1){return ''}
            return props.options[index][props.show];
        }else{
            let index = props.options.findIndex(x => x === modelValueTemp.value);
            if(index === -1){return ''}
            return props.options[index];
        }
    })
    const toggleOptions = async (ev) => {     
        if(toggle.value === false){
            if(ev && ev.target && ev.target.closest('.cc-select-box--reset') != null){return}
            let mainContainerEl = mainContainerRef.value.getBoundingClientRect();
            mainContainerRef.value.style.width = mainContainerEl.width + 'px';
            let screenY = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            toggle.value = true;
            await nextTick();

            let caclDropdownHeight = optionContainerRef.value.offsetHeight;
            if((mainContainerEl.top + mainContainerEl.height + caclDropdownHeight) > screenY){
                dropdownAnimation.value = 'dropup';
            }else{
                dropdownAnimation.value = 'dropdown';
            }
            
            if(dropdownAnimation.value == 'dropup'){
                optionContainerRef.value.style.bottom = (screenY - mainContainerEl.top) + 'px';
            }else{
                optionContainerRef.value.style.top = (mainContainerEl.top + mainContainerEl.height) + 'px';
            }
            optionContainerRef.value.style.left = mainContainerEl.left + 'px';
            optionContainerRef.value.style.width = mainContainerEl.width + 'px';
            optionContainerRef.value.style.opacity = 1;
            monitorPosition.value = mainContainerEl;

            interv.value = setInterval(async ()=> {
                if(mainContainerRef.value){
                    let mainContainerEl = mainContainerRef.value.getBoundingClientRect();
                    if(
                        mainContainerEl.left != monitorPosition.value.left ||
                        mainContainerEl.right != monitorPosition.value.right ||
                        mainContainerEl.top != monitorPosition.value.top
                    ){
                        dropdownAnimation.value = ''
                        await nextTick();
                        closeOptions();
                    }                        
                }else{
                    closeOptions();
                }
            },30);
            document.addEventListener('mousedown', closeOptions);
            if(searchInputRef.value){searchInputRef.value.focus()}
            if(activeIndex.value != null){
                hoverIndex.value = activeIndex.value;
                await nextTick();
                centerItem();
            }
        }else{
            if(ev && ev.target && ev.target.closest('.cc-select-box--search-input') != null){return}
            closeOptions();
        }
    }
    const closeOptions = (dt) => {
        if(dt && dt.target && dt.target.closest('.cc-select-box--search-input, .cc-select-box--text-preview, .cc-select-box--placeholder, .cc-select-box--preview') != null){
            if(getTargetParent(dt.target, 'cc-select-box--container') && getTargetParent(dt.target, 'cc-select-box--container').id === 'select-box-'+selectBoxId.value){
                return
            }
            if(document.activeElement.id == 'select-box-search-'+selectBoxId.value){return}
            
        }
        if(props.disableOnClickOptionClose && dt && dt.target && dt.target.closest('.cc-select-box--item-container') != null){return}
        
        
        document.removeEventListener('mousedown', closeOptions);
        clearInterval(interv.value);
        toggle.value = false;
        hoverIndex.value = '';
        if(mainContainerRef.value){mainContainerRef.value.style.width = 'auto'}
        setTimeout(()=>{dropdownAnimation.value = 'dropdown';},500) 
    }
    const centerItem = () => {
        let el = optionContainerRef.value.querySelector('.cc-select-box--item-hover')
        optionContainerRef.value.scrollTop = el.offsetTop - dropdownHeight.value/2;
    }
    const completeSelect = (item) => {
        if(props.disableOptionClick === false){
            if(validVar(props.catch)){
                modelValueTemp.value = item[props.catch];
                emit('update:modelValue', item[props.catch]);
                emit('change', item[props.catch]);
            }else{
                modelValueTemp.value = item;
                emit('update:modelValue', item);
                emit('change', item);
            }            
        }
    }
    const reset = () => {
        setTimeout(()=>{
            modelValueTemp.value = '';
            emit('update:modelValue','');
            emit('change','');
            emit('reset','');
        },50)
    };
    const inputSearchChange = () => {
        emit('optionSearch',inputSearchText.value);
    }
</script>