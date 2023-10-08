<template>
  <PageLayout :header="useRoute().meta.pageTitle">
    <h4 class="mb-15">Message Box General</h4>
    <div>
      <LongTextBox
        v-model="msgBox"
        placeholder="Placeholder"
        :validate="Yup.string().required()"
        name="msg"
        showDetail
      ></LongTextBox>
    </div>
    <div>{{ msgBox }}</div>
    <h4 class="mb-15">Message Box No Scroll</h4>
    <div>
      <LongTextBox placeholder="Placeholder" noScroll showDetail></LongTextBox>
    </div>
    <h4 class="mb-15">Message Box limit text</h4>
    <div>
      <LongTextBox
        placeholder="Placeholder"
        :maxlength="100"
        noScroll
        showDetail
      ></LongTextBox>
    </div>
    <h4 class="mb-15">Message Box slot</h4>
    <div>
      <LongTextBox placeholder="Placeholder" noScroll showDetail>
        <template v-slot:left><div class="pa-10">Left</div></template>
        <template v-slot:right><div class="pa-10">Right</div></template>
      </LongTextBox>
    </div>
    <h4 class="mb-15">Example Of disabled</h4>
    <div
      class="cursor-pointer pa-10 bg-primary text-white no-text-select d-inline-block mb-20"
      @click="disableInput = !disableInput"
    >
      Disabled
    </div>
    <div>
      <LongTextBox
        :disabled="disableInput"
        placeholder="Placeholder"
        :maxlength="100"
        noScroll
        showDetail
      ></LongTextBox>
    </div>
    <div class="border-grey-b1 text-h3 mt-20 mb-10 py-5">Slot</div>
    <div></div>
    <div class="border-grey-b1 font-25 bold mt-20 mb-10 py-5">Props</div>
    <div>
      <strong>v-model</strong><br />
      <strong>modelValue</strong><br />
      <strong>placeholder</strong><br />
      <strong>name</strong> [Form input field name]<br />
      <strong>rows</strong><br />
      <strong>size</strong> [Options:sm]<br />
      <strong>disabled</strong><br />
      <strong>readonly</strong><br />
      <strong>maxlength</strong> [number, password]<br />
      <strong>resetVal</strong> [if true, reset value icon will show]<br />
      <strong>showDetail</strong> [Maintain space for error, success, warning
      msg | Default value is false]<br />
      <strong>noScroll</strong><br />
      <strong>message</strong> [message like error or warning]<br />
      <strong>messageType</strong> [message type Ex:error, warning, success, no
      value will show plain text]<br />
    </div>
    <div class="border-grey-b1 text-h3 mt-20 mb-10 py-5">Events</div>
  </PageLayout>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch } from "vue";
import {
  initializeValidator,
  setValidators,
  validate,
  setErrors,
} from "@/functions/validate.js";
import * as Yup from "yup";
import { useRoute } from "vue-router";
import PageLayout from "@/components/layout/PageLayout.vue";
import LongTextBox from "@/components/form/LongTextBox.vue";

initializeValidator();

const msgBox = ref();
const disableInput = ref(true);
</script>