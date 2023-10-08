<template>
    <PageLayout header="Cases" subHeader="New Case" width="100%" @setScreenWidth="screenW = $event"
        :padding="screenW < 650 ? '10px 10px 40px 10px' : '25px 25px 50px 25px'">
        <div class="px-5 mb-30">
            <div class="d-flex-center-start">
                <i class="fa-solid fa-plus"></i>
                <h3 class="text ma-3 px-5">Add New Case</h3>
            </div>
        </div>
        <hr class="hr-line" />
        <!-- -------------------------------------------------------------------- -->
        <form method="post" @submit="onSubmit" id="delivery-form" enctype="multipart/form-data">
            <div class="input-group-container col-wrap mt-20">
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">File No<span class="input-title-require">*</span></div>
                    <InputBox type="text" placeholder="Enter File No" id="file_no" name="file_no" showDetail
                        :validate="Yup.string().required()">
                        <!-- <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10">
                                <i class="fa-solid fa-user" style="color: #666460"></i>
                            </div>
                        </template> -->
                    </InputBox>
                </div>
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">Case Type<span class="input-title-require">*</span></div>
                    <SelectBox placeholder="Select Case Type" :options="dfs" show="case_type" catch="id" name="case_type"
                        showDetail :validate="Yup.string().required()">
                        <!-- <template v-slot:left>
                            <div class="d-flex-v-center pl-15">
                                <i class="fa-solid fa-location-crosshairs" style="color: #666460"></i>
                            </div>
                        </template> -->
                    </SelectBox>
                </div>
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">Case No<span class="input-title-require">*</span></div>
                    <InputBox type="text" placeholder="Enter Case No" id="case_no" name="case_no" showDetail
                        :validate="Yup.string().required()">
                        <!-- <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10">
                                <i class="fa-solid fa-user" style="color: #666460"></i>
                            </div>
                        </template> -->
                    </InputBox>
                </div>
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">Court<span class="input-title-require">*</span></div>
                    <SelectBox placeholder="Select Court" :options="dfs" show="court" catch="id" name="court" showDetail
                        :validate="Yup.string().required()">
                        <!-- <template v-slot:left>
                            <div class="d-flex-v-center pl-15">
                                <i class="fa-solid fa-location-crosshairs" style="color: #666460"></i>
                            </div>
                        </template> -->
                    </SelectBox>
                </div>
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">Police Station<span class="input-title-require">*</span></div>
                    <SelectBox placeholder="Select Police Station" :options="dfs" show="police_station" catch="id"
                        name="police_station" showDetail :validate="Yup.string().required()">
                        <!-- <template v-slot:left>
                            <div class="d-flex-v-center pl-15">
                                <i class="fa-solid fa-location-crosshairs" style="color: #666460"></i>
                            </div>
                        </template> -->
                    </SelectBox>
                </div>

                <div class="input-container col-6 col-12-md">
                    <div class="input-title">Fixed For<span class="input-title-require">*</span></div>
                    <InputBox type="text" placeholder="Enter Fixed For" id="fixed_for" name="fixed_for" showDetail
                        :validate="Yup.string().required()">
                        <!-- <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10">
                                <i class="fa-solid fa-user" style="color: #666460"></i>
                            </div>
                        </template> -->
                    </InputBox>
                </div>
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">1st Party<span class="input-title-require">*</span></div>
                    <InputBox type="text" placeholder="Enter 1st Party" id="1st_party" name="1st_party" showDetail
                        :validate="Yup.string().required()">
                        <!-- <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10">
                                <i class="fa-solid fa-user" style="color: #666460"></i>
                            </div>
                        </template> -->
                    </InputBox>
                </div>
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">2st Party<span class="input-title-require">*</span></div>
                    <InputBox type="text" placeholder="Enter 2st Party" id="2st_party" name="2st_party" showDetail
                        :validate="Yup.string().required()">
                        <!-- <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10">
                                <i class="fa-solid fa-user" style="color: #666460"></i>
                            </div>
                        </template> -->
                    </InputBox>
                </div>
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">Appointed By<span class="input-title-require">*</span></div>
                    <InputBox type="text" placeholder="Enter Appointed By" id="appointed_by" name="appointed_by" showDetail
                        :validate="Yup.string().required()">
                        <!-- <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10">
                                <i class="fa-solid fa-user" style="color: #666460"></i>
                            </div>
                        </template> -->
                    </InputBox>
                </div>
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">Mobile No<span class="input-title-require">*</span></div>
                    <InputBox type="number" placeholder="Enter Mobile No" id="nobile_no" name="nobile_no" showDetail
                        :validate="Yup.string().required()">
                        <!-- <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10">
                                <i class="fa-solid fa-user" style="color: #666460"></i>
                            </div>
                        </template> -->
                    </InputBox>
                </div>
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">Law & Section<span class="input-title-require">*</span></div>
                    <InputBox type="number" placeholder="Enter Law & Section" id="law_section" name="law_section" showDetail
                        :validate="Yup.string().required()">
                        <!-- <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10">
                                <i class="fa-solid fa-user" style="color: #666460"></i>
                            </div>
                        </template> -->
                    </InputBox>
                </div>
                <div class="input-container col-6 col-12-md">
                    <div class="input-title">Date<span class="input-title-require">*</span></div>
                    <div>
                        <DatePicker showDetail v-model="dateVal" format="dd-MM-yyyy" name="date" />
                    </div>
                </div>
                <div class="input-container col-12">
                    <div class="input-title">Comments/Others <span class="input-title-require">*</span>
                    </div>
                    <LongTextBox id="Comments" name="Comments" placeholder="Enter Comments/Others" :showDetail="true"
                        type="text">
                        <template v-slot:left>
                            <div class="d-flex-v-center pl-15 pr-10 py-20">
                                <i class="fa-solid fa-file-lines" style="color: #666460"></i>
                            </div>
                        </template>
                    </LongTextBox>
                </div>
            </div>
            <div class="my-5">
                <Message :message="invalidSubmitErr" coloredBg type="error" padding="10px" />
            </div>
            <!-- ---------------------------------------------------------------- -->
            <div :class="[screenW > 600 ? 'd-flex' : 'd-block']">
                <div class="pa-5">
                    <Btn class="btn-primary btn-squire-md" :block="screenW < 600" type="submit">
                        Save
                    </Btn>
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
import DatePicker from '@/components/others/DatePicker.vue';

const { handleSubmit, resetForm, setErrors } = useForm();
const dateVal = ref('2022/7/23');
const screenW = ref();
const invalidSubmitErr = ref('')
</script>