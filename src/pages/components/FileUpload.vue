<template>
    <PageLayout :header="useRoute().meta.pageTitle">
        <h4 class="mb-15">Site fileupload</h4>
        <h4 class="mb-15">File Upload General</h4>
        <div class="cursor-pointer pa-10 bg-primary text-white no-text-select d-inline-block mb-20"
            @click="validateFormGen">Validate</div>
        <div class="cursor-pointer pa-10 bg-primary text-white no-text-select d-inline-block mb-20 ml-10"
            @click="fileuploadValue = ''">Reset</div>
        <div>
            <FileUpload placeholder="Placeholder" :validate="Yup.mixed().required()" name="fileupload"
                v-model="fileuploadValue" showDetail></FileUpload>
        </div>
        <div class="border-grey-b1 text-h3 mt-20 mb-10 py-5">Props</div>
        <div>
            name: fileupload name.<br>
            size: size of raadio.<br>
            validate: <br>
            showDetail: <br>
            readonly:
        </div>
        <div class="border-grey-b1 text-h3 mt-20 mb-10 py-5">Events</div>
    </PageLayout>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch } from 'vue';
import { initializeValidator, setValidators, validate, setErrors } from '@/functions/validate.js'
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import PageLayout from '@/components/layout/PageLayout.vue'
import FileUpload from '@/components/form/FileUpload.vue';

initializeValidator();

const fileuploadValue = ref(null);
const genValidate = setValidators(["fileupload"]);
const disableInput = ref(true);
const readonly = ref(true)
const validateFormGen = async () => {
    let chk = await validate(genValidate);
    alert(JSON.stringify(chk, null, 2));

    // console.log(chk)
}
</script>