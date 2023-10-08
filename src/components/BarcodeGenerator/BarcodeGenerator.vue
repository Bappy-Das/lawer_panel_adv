<template>
    <div>
        <canvas ref="barcodeCanvas"></canvas>
    </div>
</template>
  
<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import JsBarcode from 'jsbarcode';

const barcodeCanvas = ref(null);

const props = defineProps({
    value: {
        type: String,
        required: true,
    },
});

watch(() => props.value, (newValue) => {
    JsBarcode(barcodeCanvas.value, newValue);
    // console.log(newValue);
});
</script>
  
<style scoped>
canvas {
    width: 200px;
    height: 100px;
}
</style>
  