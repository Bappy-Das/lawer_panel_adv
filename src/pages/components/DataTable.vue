<template>
    <PageLayout :header="useRoute().meta.pageTitle">
        <div @click="check()" class="pb-10 cursor-pointer">Check Function</div>
        <div class="d-flex">
            <div class="cursor-pointer pa-10 bg-primary text-white no-text-select" @click="tableHeight++">Table Height +
            </div>
            <div class="cursor-pointer pa-10 bg-primary text-white no-text-select ml-10" @click="tableHeight--">Table Height
                -</div>
        </div>

        <div class="my-10 cursor-pointer pa-10 bg-primary text-white no-text-select d-inline-block"
            @click="addDataToTable()">Add data to table</div>
        <div class="cursor-pointer pa-10 bg-primary text-white no-text-select my-10 d-inline-block ml-10"
            @click="onLoading = !onLoading">On Loading</div>
        <div>
            <input class="my-10 pa-10 site-input-border input-no-outline" v-model="tableHeight" />
        </div>
        <div>
            <DataTable class="cc-data-table" actionColumn height="200px" :onLoading="onLoading"
                :headerData="dataTableHeader" :tableData="dataTableData" @sort="tableSort"
                :checkBox="{ field: 'status', style: { width: '20px' } }">
                <!-- <template v-slot:header-status>
                    slot data
                </template> -->
                <template v-slot:table-action="{ data, closeAllAction }">
                    <div @click="passAction(closeAllAction, data)">{{ data }}</div>
                </template>
            </DataTable>
        </div>
        <div class="mt-30">
            <DataTable class="cc-data-table" actionColumn :onLoading="onLoading" :headerData="dataTableHeader"
                :tableData="dataTableData" @sort="tableSort" :checkBox="{ field: 'status', style: { width: '20px' } }">
                <!-- <template v-slot:header-status>
                    slot data
                </template> -->
                <template v-slot:table-action="{ data, closeAllAction }">
                    <div @click="passAction(closeAllAction, data)">{{ data }}</div>
                </template>
            </DataTable>
        </div>
        <div class="mt-30">
            <DataTable class="cc-data-table" :onLoading="onLoading" :headerData="dataTableHeader" :tableData="dataTableData"
                @sort="tableSort">
                <!-- <template v-slot:header-status>
                    slot data
                </template> -->
                <template v-slot:table-action="{ data, closeAllAction }">
                    <div @click="passAction(closeAllAction, data)">{{ data }}</div>
                </template>
            </DataTable>
        </div>
        <div class="border-grey-b1 text-h3 mt-20 mb-10 py-5">Slot</div>
        <div>
            'header-'+[field or slotName]: For change header cell html<br>
            field or slotName: For change header cell html
        </div>
        <div class="border-grey-b1 text-h3 mt-20 mb-10 py-5">Props</div>
        <div>
            headerData [Must be an array object. <div class="pl-20"><span class="h6">Object fields:</span><br> title: as
                header title<br> field: as table array object field name that will show in cell<br> style:to set tables
                width, sort:asc, desc, none<br> slotName: by default field name will be used as a slot. but if u want to use
                custom slot name</div>]<br>
            tableData [Array Object for table row]<br>
            checkBox [object that will contain field name as field, custom slot name as slotName]<br>
            lazyLoading [For table lazy load.(not completed yet)]<br>
            height [if table needs fixed height]<br>
            actionColumn [fixed column at the right. default false]<br>
        </div>
        <div class="border-grey-b1 text-h3 mt-20 mb-10 py-5">Events</div>
        <div>

        </div>
    </PageLayout>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import PageLayout from '@/components/layout/PageLayout.vue'
import DataTable from '@/components/table/DataTable.vue'

const tableHeight = ref(200);
const onLoading = ref(false);

const dataTableHeader = reactive([
    {
        title: 'Id',
        field: 'id',
        style: { width: '50px' }
    },
    {
        title: 'Name',
        field: 'name',
        style: { maxWidth: '2000px' },
        sort: 'asc'
    },
    {
        title: 'Address',
        field: 'address.0.present',
        style: { maxWidth: '300px' }
    },
    {
        title: 'Action',
        field: 'id',
        slotName: 'action',
        style: { maxWidth: '50px' }
    },
])
const dataTableData = reactive([
    {
        id: 1,
        name: 'Abdul Malek',
        address: [{
            present: '',
            permanent: ''
        }],
        status: true,
    },
    {
        id: 2,
        name: 'Abdul Khalek',
        address: [{
            present: 'xxxx',
            permanent: ''
        }],
        status: true,
    },
    {
        id: 3,
        name: 'Jamil Malek',
        address: [{
            present: '',
            permanent: ''
        }],
        status: true,
    },
    {
        id: 4,
        name: 'Kamil Malek',
        address: [{
            present: '',
            permanent: ''
        }],
        status: true,
    }

])
const tableSort = (e) => {
    // console.log(e)
    dataTableHeader[e.index].sort = e.sort
}
const passAction = (closeAllAction) => {
    closeAllAction()
}
const addDataToTable = () => {
    dataTableData.push({
        id: 0,
        name: 'Kamil Push',
        address: [{
            present: '',
            permanent: ''
        }],
        status: true,
    })
}
const check = (e) => {

}
</script>