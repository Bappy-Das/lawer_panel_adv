<template>
    <div style="margin:20px; padding:30px; background-color:#FFF">
        Dashboard
        <div @click="reqGet()">get</div>
        <div @click="modalToggle = !modalToggle">Modal Toggle</div>
        <div>
            <InputBox v-model="chk" size="sm" reset @reset="reqGet" name="xxx" autocomplete="off" placeholder="xxxxx"
                :showDetail="true" message="xxx" type="error">
                <!-- <template v-slot:left>xxxx</template>
                <template v-slot:right>xxxx</template> -->
            </InputBox>
            <SelectBox v-model="chk" size="sm" reset @reset="reqGet" placeHolder="placeHolder" :inputSearch="true"
                show="name" catch="id" name="xxx" :options="options" style="width:200px" :showDetail="true">
                <!-- <template v-slot:input="{data}">{{data.name}}</template>
                <template v-slot:option="{data}">{{data.name}}</template> -->
            </SelectBox>


        </div>
        <Modal title="modal title" v-if="modalToggle" @closeModal="modalToggle = false">
            <!-- <template v-slot:header>templete title</template> -->

            modal content
        </Modal>
        <ResultPerPage :totalResult="1000" :perPage="resultPer" @select="(e) => { resultPer = e }" />
        <Pagination :paginationData="paginationData" />
        <DataTable class="cc-data-table" :headerData="dataTableHeader" :tableData="dataTableData" height="100px"
            :checkBox="{ field: 'status' }">

            <template v-slot:id={ data }>
                xxx{{ data }}
            </template>
        </DataTable>
        <CheckBox v-model="checkBox" label="xxx" :showDetail="true" message="xxx" type="error" />
        <RadioBox v-model="radioBox" :radioValue="true" label="xxx" name="oo" />
        <RadioBox v-model="radioBox" :radioValue="false" label="yyy" name="oo" />
        <LongTextBox placeholder="xxxxx fsvxs" v-model="messageData" :showDetail="true" message="xxx" type="error" />
        <Btn class="btn-info" />
        <div class="col-wrap">
            <div class="bg-primary col-6 col-12-md d-flex-v-center">xxx2</div>
            <div class="bg-secondary col-6 d-flex-v-center">ooo</div>
        </div>
        <div style="height:2000px"></div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch } from 'vue'
import alert from '@/functions/alert'

import InputBox from '@/components/form/InputBox.vue'
import SelectBox from '@/components/form/SelectBox.vue'
import Modal from '@/components/pop/Modal.vue'
import ResultPerPage from '@/components/navigation/ResultPerPage.vue'
import Pagination from '@/components/navigation/Pagination.vue'
import DataTable from '@/components/table/DataTable.vue'
import CheckBox from '@/components/form/CheckBox.vue'
import RadioBox from '@/components/form/RadioBox.vue'
import LongTextBox from '@/components/form/LongTextBox.vue'
import Btn from '@/components/form/Btn.vue'

var dt = []
for (var i = 1; i < 100; i++) {
    dt.push({
        id: i,
        name: 'xxx - ' + i
    })
}
const options = reactive(dt)
const chk = ref();
const resultPer = ref(5);
const modalToggle = ref(false)

const optionsx = reactive(['xxx', 'yyy'])
const checkBox = ref(true)
const radioBox = ref(true)
const messageData = ref(null)

const paginationData = reactive({
    "current_page": 1,
    "from": null,
    "last_page": 1,
    "links": [
        {
            "url": null,
            "label": "&laquo; Previous",
            "active": false
        },
        {
            "url": "http://admin-xit.xyz/api/admin/departments?page=1",
            "label": "1",
            "active": true
        },
        {
            "url": null,
            "label": "Next &raquo;",
            "active": false
        }
    ],
    "path": "http://admin-xit.xyz/api/admin/departments",
    "per_page": 25,
    "to": null,
    "total": 0
})
const dataTableHeader = reactive([
    {
        title: 'Id',
        field: 'id',
        style: { maxWidth: '50px' }
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

const reqGet = () => {
    //    let xx = axios.get('https://reqxres.in/api/users/2');
    //    console.log(xx)

    //alert.error({title: 'Auto close alert!',text: 'Modal with a custom image.',timer: false})
    //console.log('chk.value',chk.value)
    // dataTableData.push(
    //     {
    //         id:5,
    //         name:'Kamil xx',
    //         address:[{
    //             present:'',
    //             permanent:''
    //         }],
    //         status:true,
    //     }
    // )
    // console.log(dataTableData)
    checkBox.value = false
}

watch(radioBox, () => {
    console.log('xxxx--', radioBox.value)
})
</script>

