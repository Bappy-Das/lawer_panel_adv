<template>
  <PageLayout :header="useRoute().meta.pageTitle">
    <div @click="btnLoading = !btnLoading"
      class="cursor-pointer pa-10 bg-primary text-white no-text-select d-inline-block mb-20">
      Loading
    </div>
    <div @click="btnDisabled = !btnDisabled"
      class="cursor-pointer pa-10 bg-gray-5 text-white no-text-select d-inline-block mb-20 ml-10">
      Disable
    </div>
    <div>
      <Btn class="btn-primary" btnType="submit" :disabled="btnDisabled" :loading="btnLoading">
        Test
      </Btn>
    </div>
    <h4 class="my-15">Button [btn-primary]</h4>
    <div>
      <Btn class="btn-primary" btnType="submit" :disabled="btnDisabled" :loading="btnLoading">
        Primary
      </Btn>
    </div>

    <h4 class="my-15">Button [btn-info]</h4>
    <div>
      <Btn class="btn-info" btnType="submit" :disabled="btnDisabled" :loading="btnLoading">
        btn-info
      </Btn>
    </div>

    <h4 class="my-15">Button [btn-success]</h4>
    <div>
      <Btn class="btn-success" btnType="submit" :disabled="btnDisabled" :loading="btnLoading">
        Success
      </Btn>
    </div>
    <h4 class="my-15">Button [btn-warning]</h4>
    <div>
      <Btn class="btn-warning" btnType="submit" :disabled="btnDisabled" :loading="btnLoading">
        Warning
      </Btn>
    </div>
    <h4 class="my-15">Button [btn-danger]</h4>
    <div>
      <Btn class="btn-danger" btnType="submit" :disabled="btnDisabled" :loading="btnLoading">
        Danger
      </Btn>
    </div>

    <h4 class="my-15">Button [btn-secondary-outlined]</h4>
    <div>
      <Btn class="btn-outlined" btnType="submit" :disabled="btnDisabled" :loading="btnLoading">
        Secondary Outlined
      </Btn>
    </div>
    <h4 class="my-15">Button with icon</h4>
    <div>
      <Btn class="btn-primary" btnType="submit" :disabled="btnDisabled" :loading="btnLoading">
        <i class="xit-font-Edit-Square mr-5" />Icons
      </Btn>
    </div>

    <h4 class="my-15">Squire Button [btn-primary btn-squire-lg]</h4>
    <div>
      <Btn class="btn-primary btn-squire-lg" btnType="submit" :disabled="btnDisabled" :loading="btnLoading">
        Primary
      </Btn>
    </div>

    <h4 class="my-15">Button [btn-sm]</h4>
    <div>
      <Btn class="btn-primary btn-sm" btnType="submit" :disabled="btnDisabled" :loading="btnLoading">
        Small Main Button
      </Btn>
    </div>
    <div class="border-grey-b1 text-h3 mt-20 mb-10 py-5">Props</div>
    <div>
      <strong>btnType:</strong> Submit or others<br />
      <strong>disabled:</strong> To disable button<br />
      <strong>loading:</strong> To show loading Animation.<br />
      <strong>readonly:</strong>
    </div>
    <div class="border-grey-b1 text-h3 mt-20 mb-10 py-5">Events</div>
  </PageLayout>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import PageLayout from "@/components/layout/PageLayout.vue";
import Btn from "@/components/form/Btn.vue";

const btnDisabled = ref(false);
const btnLoading = ref(false);

const LoadingBtn = (e) => { };
</script>