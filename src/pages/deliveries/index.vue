<template>
  <PageLayout header="Delivery Management" subHeader="All delivery">
    <div class="deliveries-service-btn">
      <router-link :to="{ name: 'newDeliveries' }">
        <Btn class="btn-success mr-10 mb-10">
          <div class="d-flex-center-start">
            <i class="fa-solid fa-plus"></i>
            <span class="text px-5">New Delivery</span>
          </div>
        </Btn>
      </router-link>
      <router-link :to="{ name: 'uploadCSVDocument' }">
        <Btn class="btn-warning mr-10 mb-10">
          <div class="d-flex-center-start">
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
            <span class="text px-5">Upload CSV</span>
          </div>
        </Btn>
      </router-link>
      <Btn class="btn-info mb-10" @click="exportDelivery()">
        <div class="d-flex-center-start">
          <i class="fa-solid fa-download"></i>
          <span class="text px-5">Export</span>
        </div>
      </Btn>
      <div class="flex-auto"></div>
      <Btn class="btn-outlined">
        <div class="d-flex-center-start">
          <i class="fa-solid fa-barcode"></i>
          <span class="text px-5">Scan Barcode</span>
        </div>
      </Btn>
    </div>
    <hr class="hr-line" />
    <!---------------------Delivery Action  ------------------------------------------>



    <div>
      <!-- <DataTable :height="deliveryStore.deliveryList.data?.length != 0 ? '520px' : '200px'" class="cc-data-table"
        :headerData="dataTableHeader" :tableData="dataTableHeader">
      </DataTable> -->
    </div>
    <!-- <div class="mt-30 d-flex-center-between">
      <ResultPerPage :totalResult="deliveryStore?.deliveryList?.meta?.total"
        :perPage="deliveryStore?.deliveryList?.meta?.to">
      </ResultPerPage>
      <Pagination :totalPage="deliveryStore?.deliveryList?.meta?.last_page"
        :currentPage="deliveryStore?.deliveryList?.meta?.current_page" :paginationLength="1" @change="paginationPage" />
    </div> -->
  </PageLayout>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { ref, reactive, computed, onBeforeUnmount, watch } from "vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import Btn from "@/components/form/Btn.vue";
import SelectBox from "@/components/form/SelectBox.vue";
import InputBox from "@/components/form/InputBox.vue";
import DataTable from "@/components/table/DataTable.vue";
import Pagination from '@/components/navigation/Pagination.vue';
import ResultPerPage from '@/components/navigation/ResultPerPage.vue';
import { rangeData } from "@/components/dropdownData/dateRange.js";
import alert from "@/functions/alert";
import Modal from "@/components/pop/Modal.vue";
import { forEach } from "lodash";
import DatePicker from '@/components/others/DatePicker.vue';
import loader2 from "@/components/loader/loader2.vue";
import toast from '@/functions/toast.js'
import { useRoute } from "vue-router";
import TableSkeleton from "@/components/TableSkeleton/TableSkeleton.vue";
import TrackingTimeline from "@/components/trackingTimeline/trackingTimeline.vue";

const route = useRoute();
const screenW = ref();
const invalidSubmitErr = ref('')
const { handleSubmit, resetForm, setErrors } = useForm();
let currentItemStatus = ref('');


const dateRange = reactive(rangeData);



























const dataRow = reactive([
  {
    item: 25,
  },
  {
    item: 50,
  },
  {
    item: 100,
  },
  {
    item: 500,
  },
  {
    item: 1000,
  },
]);

const dataTableHeader = reactive([
  {
    title: "CONSIGNMENT ID",
    field: "consignment_id",
    style: { minWidth: "140px" },
  },
  {
    title: "Merchant Info",
    field: "merchant_info",
    style: { minWidth: "200px" },
  },
  {
    title: "Recipient Info",
    field: "recipient_name",
    style: { minWidth: "250px" },
  },
  {
    title: "ORDER ID",
    field: "merchant_order_id",
    style: { minWidth: "150px" },
  },
  {
    title: "Action Status",
    field: "action_status",
    style: { minWidth: "250px" },
  },
  {
    title: "Collection Amount",
    field: "amount_to_be_collected",
    style: { minWidth: "100px" },
  },
  {
    title: "Received Amount",
    field: "received_amount",
    style: { minWidth: "100px" },
  },
  {
    title: "Sorting Hub",
    field: "sorting_hub_name",
    style: { minWidth: "130px" },
  },
  {
    title: "Transit Hub",
    field: "hub_name",
    style: { minWidth: "130px" },
  },
  {
    title: "Courier Zone",
    field: "recipient_zone",
    style: { minWidth: "140px" },
  },
  {
    title: "Delivery Plan",
    field: "delivery_plan",
    style: { minWidth: "100px" },
  },
  {
    title: "Return Plan",
    field: "return_plan",
    style: { minWidth: "100px" },
  },
  {
    title: "Charge",
    field: "charge",
    style: { minWidth: "100px" },
  },
  {
    title: "COD Charge",
    field: "cod_charge",
    style: { minWidth: "100px" },
  },
  {
    title: "Payment Status",
    field: "payment_status",
    style: { minWidth: "100px" },
  },
  {
    title: "DELIVERED DATE",
    field: "delivery_date",
    style: { minWidth: "100px" },
  },
  {
    title: "Returned DATE",
    field: "return_date",
    style: { minWidth: "100px" },
  },
  {
    title: "Invoiced DATE",
    field: "invoice_date",
    style: { minWidth: "100px" },
  },
  {
    title: "Created at",
    field: "created_at",
    style: { minWidth: "100px" },
  },
]);
const modalHeader = reactive([
  {
    title: "CONSIGNMENT ID",
    field: "consignment_id",
    style: { minWidth: "20px" },
  },
  {
    title: "Merchant order Id",
    field: "merchant_order_id",
    style: { minWidth: "100px" },
  },
  {
    title: "Status",
    field: "action_status",
    style: { minWidth: "100px" },
  },
  {
    title: "Amount to be collected",
    field: "amount_to_be_collected",
    style: { minWidth: "50px" },
  },
  {
    title: "Received Amount",
    field: "received_amount",
    style: { minWidth: "70px" },
  },
  {
    title: "Note",
    field: "note",
    style: { minWidth: "70px" },
  },
]);
</script>

<style lang="scss" scoped>
.deliveries {
  &-filter-option {
    display: grid;
    margin-bottom: 10px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

    // @media only screen and (min-width: 600px) {
    //   grid-template-columns: repeat(2, 1fr);
    // }

    // @media only screen and (min-width: 768px) {
    //   grid-template-columns: repeat(3, 1fr);
    // }

    // @media only screen and (min-width: 992px) {
    //   grid-template-columns: repeat(3, 1fr);
    // }

    // @media only screen and (min-width: 1200px) {
    //   grid-template-columns: repeat(5, 1fr) 1.5fr;
    // }
  }

  &-action {
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 10px;
    align-items: end;
    // grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

    @media only screen and (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media only screen and (min-width: 992px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media only screen and (min-width: 1125px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  &-service-btn {
    display: flex;
    margin-bottom: 10px;

    @media only screen and (max-width: 1090px) {
      flex-direction: column;
      align-items: start;
    }
  }
}
</style>