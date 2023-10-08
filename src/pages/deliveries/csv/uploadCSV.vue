<template>
  <PageLayout header="Delivery Management" subHeader="New Delivery" @setScreenWidth="screenW = $event"
    :padding="screenW < 650 ? '10px 10px 40px 10px' : '25px 25px 50px 25px'">
    <div class="pb-5">
      <div class="tab">
        <div :class="{ activeBtn: delivery.tabs === 'upload' }">
          <button class="tablinks " id="defaultOpen" @click="tabFunction('upload')">Upload</button>
        </div>
        <div :class="{ activeBtn: delivery.tabs === 'errorlogs' }">
          <button class="tablinks" @click="tabFunction('errorlogs')">Error Logs</button>
        </div>
      </div>
    </div>

    <!-- <hr class="hr-line" /> -->

    <div v-show="delivery.tabs === 'upload'">
      <div class="px-5 my-30 d-flex-center-between">
        <div class="d-flex-center-start">
          <i class="fa-solid fa-plus"></i>
          <h3 class="text ma-3 px-5">Upload your CSV</h3>
        </div>

        <a :href="downloadSampleCSV()" class="btn-primary btn-squire-md" :block="screenW < 600" download="sample_csv">
          <Btn class="btn-warning btn-squire-md">
            <div class="d-flex-center-start">
              <i class="fa-solid fa-download"></i>
              <span class="text px-5">Download Sample CSV</span>
            </div>
          </Btn>
        </a>
      </div>
      <!-- <hr class="hr-line" /> -->
      <div class="pa-10">
        <form method="post" @submit.prevent="handleSubmit()" id="delivery-form" enctype="multipart/form-data">
          <div class="input-group-container col-wrap mt-10 mb-30">
            <div class="input-container col-6 col-12-md">
              <div class="input-title">Document<span class="input-title-require">*</span></div>
              <FileUpload name="document" :showDetail="true" />
            </div>
          </div>
          <div :class="[screenW > 600 ? 'd-flex' : 'd-block']">
            <Btn class="btn-primary btn-squire-md" :block="screenW < 600" type="submit" :loading="delivery.loading">
              Upload
            </Btn>
            <Btn class="btn-danger btn-squire-md ml-15" :block="screenW < 600">Cancel</Btn>
          </div>
        </form>
        <div class="mt-30">
          <Message :message="delivery.errorMsg.message" type="error" padding="10px" />
        </div>
        <div class="input-group-container col-wrap mt-20">
          <div class="" v-for="(item, index) in delivery.errorMsg.data" :key="index">
            <div class="input-container col-6 col-12-md my-5">
              <Message :message="item" coloredBg type="info" padding="10px" style="width:150px" />
            </div>
          </div>
        </div>


      </div>
    </div>
    <div v-show="delivery.tabs === 'errorlogs'" class="py-30">
      <div class="pa-10" style="width: 300px;">
        <InputBox placeholder="By Csv Name" v-model="delivery.getFilterData" @input="delivery.errorlogsForCsv()">
          <template v-slot:left>
            <div class="d-flex-center mx-15 text-gray-3">
              <i class="xit-font-search" style="font-size: 16px"></i>
            </div>
          </template>
        </InputBox>
      </div>
      <DataTable class="cc-data-table" :headerData="errorHeaderData" :tableData="delivery.errLogsList"
        :onLoading="delivery.loading">

      </DataTable>
    </div>

  </PageLayout>
</template>

<script setup>
import { ref, reactive } from "vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import SelectBox from "@/components/form/SelectBox.vue";
import Btn from "@/components/form/Btn.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import { useDeliveryStore } from "@/store/delivery/delivery";
import Message from '@/components/validate/Message.vue';
import DataTable from "@/components/table/DataTable.vue";
import InputBox from "@/components/form/InputBox.vue";
const screenW = ref('auto');
const delivery = useDeliveryStore();

// console.log(delivery.tabs)

function handleSubmit() {
  let fs = new FormData(document.getElementById("delivery-form"));
  delivery.handleUploadCSV(fs);
}

function downloadSampleCSV() {
  return import.meta.env.VITE_MAIN_API_URL + '/storage/assets/csv/sample/sample_csv_for_download.csv';
}

const tabFunction = (tab) => {
  delivery.tabs = tab
  if (tab === 'errorlogs') {
    delivery.errorlogsForCsv()
  }
}

const errorHeaderData = reactive([
  {
    title: "CSV Name",
    field: "csv_filename",
    style: { maxWidth: "250px" },
  },
  {
    title: "Merchant Id",
    field: "merchant_id",
    style: { maxWidth: "250px" },
  },
  {
    title: "Recipient Name",
    field: "recipient_name",
    style: { maxWidth: "250px" },
  },
  {
    title: "Recipient Contact",
    field: "recipient_contact",
    style: { maxWidth: "250px" },
  },
  {
    title: "Recipient Email",
    field: "recipient_email",
    style: { maxWidth: "250px" },
  },
  {
    title: "Recipient Address",
    field: "recipient_address",
    style: { maxWidth: "250px" },
  },
  {
    title: "Amount to be Collected",
    field: "amount_to_be_collected",
    style: { maxWidth: "250px" },
  },
  {
    title: "Order id",
    field: "order_id",
    style: { maxWidth: "250px" },
  },
  {
    title: "Recipient Zone Code",
    field: "recipient_zone_code",
    style: { maxWidth: "250px" },
  },
  {
    title: "Transit Hub",
    field: "transit_hub",
    style: { maxWidth: "250px" },
  },
  {
    title: "Delivery Plan",
    field: "delivery_plan",
    style: { maxWidth: "250px" },
  },
  {
    title: "Return Plan",
    field: "return_plan",
    style: { maxWidth: "250px" },
  },
  {
    title: "Error Message",
    field: "error_message",
    style: { maxWidth: "250px" },
  },

]);
</script>

<style>
.tab {
  overflow: hidden;
  border-bottom: 1px solid var(--gray-4);
  /* background-color: var(--gray-5); */
  /* border-radius: 8px; */
}

.tab button {
  background-color: inherit;
  /* background-color: inherit; */
  float: left;
  border: 1px solid var(--gray-4);
  border-bottom: none;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  outline: none;
  cursor: pointer;
  padding: 10px 16px;
  transition: 0.3s;
  font-size: 17px;
  margin-left: 10px;
}

.tab button:hover {
  background-color: var(--primary);
}

.activeBtn {
  background-color: var(--primary);
}
</style>