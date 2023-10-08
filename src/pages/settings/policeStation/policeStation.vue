<template>
    <PageLayout header="Police Station" subHeader="">
        <div class="deliveries-service-btn">
            <router-link :to="{ name: 'newNote' }">
                <Btn class="btn-success btn-squire-md mb-10">
                    <div class="d-flex-center-start">
                        <i class="fa-solid fa-plus"></i>
                        <span class="text px-5">New Case</span>
                    </div>
                </Btn>
            </router-link>
        </div>
        <hr class="hr-line" />
        <!---------------------Delivery Action  ------------------------------------------>
        <div>
            <DataTable class="cc-data-table" :headerData="dataTableHeader" :tableData="dataTableHeader">
            </DataTable>
        </div>
        <!-- <div class="mt-30 d-flex-center-between">
            <ResultPerPage :totalResult="deliveryStore?.deliveryList?.meta?.total"
                :perPage="deliveryStore?.deliveryList?.meta?.to">
            </ResultPerPage>
            <Pagination :totalPage="deliveryStore?.deliveryList?.meta?.last_page"
                :currentPage="deliveryStore?.deliveryList?.meta?.current_page" :paginationLength="1"
                @change="paginationPage" />
        </div> -->
    </PageLayout>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { ref, reactive, computed, onBeforeUnmount, watch } from "vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import Btn from "@/components/form/Btn.vue";
import DataTable from "@/components/table/DataTable.vue";
import Pagination from '@/components/navigation/Pagination.vue';
import ResultPerPage from '@/components/navigation/ResultPerPage.vue';
import { rangeData } from "@/components/dropdownData/dateRange.js";
import alert from "@/functions/alert";

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
        title: "File NO",
        field: "consignment_id",
        style: { minWidth: "100px" },
    },
    {
        title: "Case Type",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "Case No",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "Court",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "Police Station",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "1st Party",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "2nd Party",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "Appointed by",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "Mobile No",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "Law & Section",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "Previous Date",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "Next Date",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "Fixed For",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "Status",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "Call",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },
    {
        title: "Action",
        field: "merchant_info",
        style: { minWidth: "100px" },
    },

]);
</script>
  
<style lang="scss" scoped>
.deliveries {
    &-filter-option {
        display: grid;
        margin-bottom: 10px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    &-action {
        display: grid;
        grid-column-gap: 20px;
        grid-row-gap: 10px;
        align-items: end;

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