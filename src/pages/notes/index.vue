<template>
    <PageLayout header="All Notes" subHeader="">
        <div class="deliveries-service-btn">
            <!-- <Btn class="btn-info mb-10" @click="exportDelivery()">
                <div class="d-flex-center-start">
                    <i class="fa-solid fa-download"></i>
                    <span class="text px-5">Export</span>
                </div>
            </Btn> -->
            <router-link :to="{ name: 'newNote' }">
                <Btn class="btn-success mr-10 mb-10">
                    <div class="d-flex-center-start">
                        <i class="fa-solid fa-plus"></i>
                        <span class="text px-5">New Note</span>
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
        title: "Date",
        field: "consignment_id",
        style: { minWidth: "200px" },
    },
    {
        title: "Task",
        field: "merchant_info",
        style: { minWidth: "200px" },
    },
    {
        title: "Stutas",
        field: "merchant_info",
        style: { minWidth: "200px" },
    },
    {
        title: "Action",
        field: "merchant_info",
        style: { minWidth: "200px" },
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