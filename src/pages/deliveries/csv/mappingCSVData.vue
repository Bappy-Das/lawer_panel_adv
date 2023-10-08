<template>
  <PageLayout header="Delivery Management" subHeader="New Delivery" @setScreenWidth="screenW = $event"
    :padding="screenW < 650 ? '10px 10px 40px 10px' : '35px'">
    <!-- <div class="my-30">
        <div class="d-flex-center-start">
          <i class="xit-font-plus font-20 bold mt--4" />
          <h3>Add New Delivery</h3>
        </div>
      </div> -->
    <!-- -------------------------------------------------------------------- -->
    <form method="post" @submit.prevent="handleSubmit()" id="csv-process-form" enctype="multipart/form-data">
      <input type="hidden" name="csv_data_file_id" :value="delivery.csv.csv_data_file_id" />
      <!-- <div class="input-group-container col-wrap mt-20">
            <table>
              <tr v-for="(item,index) in delivery.csv.response">
                <th v-for="(aData,aIndex) in item">{{aData }}</th>
              </tr>
              <tr v-for="(item,key) in delivery.csv.response[0]">
                <td>
                  <select :name="'fields['+key+']'">
                    <option value="">select field</option>
                    <option v-for="(defaultColumn,defaultIndex) in delivery.csv.headers" :value="defaultIndex" :selected="defaultColumn == item.toLowerCase().replace(/ /g,'_')"> {{defaultColumn}}</option>
                  </select>
                </td>
              </tr>
            </table>
        </div>      -->
      <DataTable class="cc-data-table" :headerData="delivery.csv.headers" :tableData="delivery.csv.response">
        <template v-slot:last-row>
          <tr>
            <td></td>
            <td v-for="(item, index) in delivery.csv.headers" :key="index">
              <div style="min-width:200px" class="pa-10">
                <SelectBox :options="delivery.csv.options" @change="selectBoxKey(item, index)" v-model="item.value" />
                <input type="hidden" :name="'fields[' + index + ']'" :value="item.index">
              </div>
            </td>
            <td></td>
          </tr>
        </template>

      </DataTable>


      <div class="d-flex mt-20">
        <Btn :loading="delivery.loading" class="btn-primary btn-squire-md" :block="screenW < 600" type="submit">Submit
        </Btn>
        <Btn class="btn-danger btn-squire-md ml-10" :block="screenW < 600">Cancel</Btn>
      </div>
    </form>

  </PageLayout>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch } from "vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import SelectBox from "@/components/form/SelectBox.vue";
import Btn from "@/components/form/Btn.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import DataTable from "@/components/table/DataTable.vue";

import { useRouter } from 'vue-router';
import { useDeliveryStore } from "@/store/delivery/delivery";


const screenW = ref('auto');
const delivery = useDeliveryStore();
const router = useRouter();
if (!delivery.csv.response) {
  router.push({ name: "uploadCSVDocument" });
} else {
  // console.log(delivery.csv.response)
}



function handleSubmit() {
  let fs = new FormData(document.getElementById("csv-process-form"));
  delivery.handleProcessCSVData(fs);
}

function selectBoxKey(item, index) {
  let itemIndex = delivery.csv.options.findIndex(x => x === item.value);
  item.index = itemIndex;
}

</script>