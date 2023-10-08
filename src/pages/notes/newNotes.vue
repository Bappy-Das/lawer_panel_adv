<template>
    <PageLayout header="Notes" subHeader="New Note" width="100%" @setScreenWidth="screenW = $event"
        :padding="screenW < 650 ? '10px 10px 40px 10px' : '25px 25px 50px 25px'">
        <div class="px-5 mb-30">
            <div class="d-flex-center-start">
                <i class="fa-solid fa-plus"></i>
                <h3 class="text ma-3 px-5">Add New Note</h3>
            </div>
        </div>
        <hr class="hr-line" />
        <!-- -------------------------------------------------------------------- -->
        <form method="post" @submit="onSubmit" id="delivery-form" enctype="multipart/form-data">
            <div class="input-group-container col-wrap mt-20">
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">Recipient Name<span class="input-title-require">*</span></div>
                    <InputBox type="text" placeholder="Enter Recipient Name" id="recipient_name" name="recipient_name"
                        showDetail :validate="Yup.string().required()">
                        <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10">
                                <i class="fa-solid fa-user" style="color: #666460"></i>
                            </div>
                        </template>
                    </InputBox>
                </div>
                <div class="input-container col-12">
                    <div class="input-title">Package Description (Item Details) <span class="input-title-require">*</span>
                    </div>
                    <LongTextBox id="package_description" name="package_description"
                        placeholder="Enter Package Description " :showDetail="true" type="text">
                        <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10 py-20">
                                <i class="fa-solid fa-file-lines" style="color: #666460"></i>
                            </div>
                        </template>
                    </LongTextBox>
                </div>

                <div class="input-container col-6 col-12-md">
                    <div class="input-title">Product Actual Price</div>
                    <InputBox type="number" :disabled="true" placeholder="Product Actual Price" name="product_actual_price"
                        showDetail v-model="delivery.actual_price">
                        <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10">
                                <i class="fa-solid fa-sack-dollar" style="color: #666460"></i>
                            </div>
                        </template>
                    </InputBox>
                </div>
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">Amount to be Collected<span class="input-title-require">*</span></div>
                    <InputBox type="number" placeholder="Amount to be Collected" name="amount_to_be_collected" showDetail>
                        <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10">
                                <i class="fa-solid fa-sack-dollar" style="color: #666460"></i>
                            </div>
                        </template>
                    </InputBox>
                </div>
                <!-- ---------------------------------------------------------------- -->
                <div class="input-container col-12">
                    <div class="input-title">Special Instructions</div>
                    <LongTextBox id="special_instruction" name="special_instruction"
                        placeholder="Enter Special Instructions" :showDetail="true" type="text"><template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10 py-20">
                                <i class="fa-solid fa-person-chalkboard" style="color: #666460"></i>
                            </div>
                        </template>
                    </LongTextBox>
                </div>
            </div>

            <div class="my-10">
                <Message :message="invalidSubmitErr" coloredBg type="error" padding="10px" />
            </div>
            <!-- ---------------------------------------------------------------- -->

            <div :class="[screenW > 600 ? 'd-flex' : 'd-block']">
                <div class="pa-5">
                    <Btn class="btn-primary btn-squire-md" :block="screenW < 600" type="submit">
                        Save
                    </Btn>
                </div>
                <div class="pa-5">
                    <Btn class="btn-warning btn-squire-md" :block="screenW < 600">Reset</Btn>
                </div>
                <div class="pa-5">
                    <Btn class="btn-danger btn-squire-md" :block="screenW < 600">Cancel</Btn>
                </div>
            </div>
        </form>

    </PageLayout>
</template>
  
<script setup>
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { ref } from "vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import InputBox from "@/components/form/InputBox.vue";
import SelectBox from "@/components/form/SelectBox.vue";
import Btn from "@/components/form/Btn.vue";
import LongTextBox from "@/components/form/LongTextBox.vue";
import Message from '@/components/validate/Message.vue';
// const phoneRegExp = /^(?:(?:\+|00)88|01)?\d{11}$/ ;
// const x = ref('delivery.deliveryBasic.recipient_zone_id');
const { handleSubmit, resetForm, setErrors } = useForm();
const screenW = ref();
const invalidSubmitErr = ref('')

const onSubmit = handleSubmit(async () => {
    let fs = new FormData(document.getElementById("delivery-form"));
    const response = await delivery.handleCreateDelivery(fs);
    if (response.success === true) { return; }
    else {
        invalidSubmitErr.value = Object.values(response)[0][0];
        setErrors(response);
    }
},
    () => {
        invalidSubmitErr.value = 'Please fillup all the require fields'
    });
</script>