<template>
    <div :class="['message--container', {'message--error':type == 'error'}, {'message--warning':type == 'warning'}, {'message--success':type == 'success'}]">
        <div v-if="type" class="message--icon">o</div>
        <div class="message--text">{{message}}</div>
    </div>
</template>

<script setup>
    import { defineProps} from 'vue';
    const props = defineProps({
        message:String,
        type:String,
    })
</script>
