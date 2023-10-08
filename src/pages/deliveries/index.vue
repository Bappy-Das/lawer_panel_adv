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
    <div class="pa-5">
      <div class="deliveries-action">
        <div style="width: 100px;">
          <div class="d-flex-center-start">
            <div class="mt-10 flex-auto">
              <SelectBox v-model="deliveryStore.selectList" placeholder="Select Table" :options="['Active', 'Trash']"
                @change="deliveryStore.getDeliveries()" />
            </div>
          </div>
        </div>
        <div style="width: 250px;">
          <div class="mb-10">
            <span class="px-5">Action</span>
          </div>
          <div class="px-5 flex-auto">
            <SelectBox @optionSearch="actionSearch" :inputSearch="true" placeholder="Select Action" show="flag_text"
              catch="id" :options="actionSearchlist" v-model="deliveryStore.actionStatus" @change="actionStatusModal()">
              <template v-slot:input="{ data }">
                <div class="d-flex-v-center px-10">
                  <div>{{ data?.flag_text }}</div>
                </div>
              </template>
              <template v-slot:option="{ data }">
                <div class="d-flex-v-center px-10 py-5">
                  <div class="round-image bg-background mr-10 bg-primary-shade" style="width: 30px; height: 30px; ">
                  </div>
                  <div>{{ data?.flag_text }}</div>
                </div>
              </template>
            </SelectBox>
          </div>
        </div>
        <div style="width: 250px;" v-show="deliveryStore.actionStatus == 4">
          <div class="mb-10">
            <span class="px-5">Transit To<span class="start-span">*</span> </span>
          </div>
          <div class="px-5 flex-auto">
            <SelectBox placeholder="Select Transit Hub" :options="hubStore.hubList.data" show="hub_name" catch="id"
              v-model="deliveryStore.transitHub" />
          </div>
        </div>
        <div style="width: 250px;" v-show="deliveryStore.actionStatus == 5">
          <div class="mb-10">
            <span class="px-5">Assign To<span class="start-span">*</span> </span>
          </div>
          <div class="px-5 flex-auto">
            <SelectBox placeholder="Select Rider" :options="deliveryStore.hubRiderList" show="name" catch="id"
              v-model="deliveryStore.assignRider" />
          </div>
        </div>
        <div style="width: 250px;" v-show="deliveryStore.actionStatus == 12">
          <div class="mb-10">
            <span class="px-5">Note</span>
          </div>
          <div class="px-5 flex-auto">
            <InputBox type="text" placeholder="Note" id="note" :name="'notes' + rowIndex"
              v-model="deliveryStore.delivery_note" />
          </div>
        </div>

        <div>
          <Btn class="btn-primary btn-squire-md" @click="deliveryAction()" :disabled="deliveryStore.actionStatus === ''"
            :loading="deliveryStore.deliveryActionLoading">
            <div class="d-flex-center">
              <span class="mx-5 text-5-14">Submit </span>
            </div>
          </Btn>
        </div>
      </div>
    </div>
    <!-- ---------------Delivery Modal ------------------- -->
    <div>
      <Modal width="800" title="Product Details" v-if="deliveryStore.deliveryModal" @closeModal="closeDeliveryModal">
        <div class="modal-body">
          <div class="mb-20 text-5-18">Action for
            <span class="text-primary">{{ deliveryStore.nextFlagText }}</span>
            from
            <span class="text-primary">{{ deliveryStore.currentItemFlagText }}</span>
          </div>
          <DataTable height="calc(100vh - 400px)" class="cc-data-table" :headerData="modalHeader"
            :tableData="deliveryStore.selectActionItem" :checkBox="{ field: 'selectedProductCheckbox' }"
            @change="statusModalCheckbox()">
            <template v-slot:action_status="{ data }">
              <div :style="{ color: data.action_status.color_code }">{{ data.icon }}{{ data.action_status.flag_text }}
              </div>
            </template>
            <template v-slot:received_amount="{ data, rowIndex }">
              <div class="mx-5">
                <InputBox type="text" id="note" :name="'receivedAmount' + rowIndex" v-model="data.receive_amount" />
              </div>
            </template>
            <template v-slot:note="{ data, rowIndex }">
              <div>
                <InputBox :showNotification="data.receive_amount !== data.amount_to_be_collected && !data.delivery_note"
                  type="text" placeholder="Note" id="note" :name="'notes' + rowIndex" v-model="data.delivery_note"
                  @keyup.enter="goToNextInput(rowIndex)" />
              </div>
            </template>
          </DataTable>
          <div class="input-group-container col-wrap mt-20">
            <div class="input-container col-2 col-12-md">
            </div>
            <div class="input-container col-4 col-12-md">
              <div class="d-flex-center-start" style="min-width: 150px; color:#F0BA1B">
                <i class="fa-regular fa-money-bill-1 fa-2x" style="font-weight: bolder;"></i>&nbsp;
                To Be Collected
              </div>
              <div class="fa-2x fw-600" style="min-width: 150px; color:#F0BA1B">{{
                deliveryStore.selectedModalItemAmountToBeCollected }}</div>
            </div>
            <div class="input-container col-4 col-12-md">
              <div class="d-flex-center-start" style="min-width: 150px; color:#1DAF95">
                <i class="fa-solid fa-hand-holding-dollar fa-2x" style="font-weight: bolder;"></i>&nbsp;
                Received Amount
              </div>
              <div class="fa-2x fw-600" style="min-width: 150px; color:#1DAF95">{{
                deliveryStore.selectedModalReceivedAmount }}
              </div>
            </div>
            <div class="input-container col-2 col-12-md">
              <Btn class="btn-primary btn-squire-md mb-30 mr-25" style="float: right" @enter="deliveryAction()"
                @click="deliveryAction()" :onLoading="deliveryStore.deliveryActionLoading"
                @keyup.enter="deliveryAction()">
                <div class="d-flex-center">
                  <span class="mx-5 text-5-14">Submit </span>
                </div>
              </Btn>
            </div>
          </div>
        </div>
      </Modal>
    </div>

    <div>
      <Modal width="800" title="Tracking Details" v-if="deliveryStore.trackingModal" @closeModal="closetrackingModal">
        <div class="modal-body">
          <div>
            <TrackingTimeline height="520" />
            <!-- <TrackingTimeline :trackingdata="delivery.trackingData" /> -->
          </div>
        </div>
      </Modal>
    </div>

    <!-- ------------Filter option------------- -->
    <div class="px-10 pt-10 text-5-14 text-gray-2">Filter Option</div>
    <hr class="hr-line" />
    <div class="deliveries-filter-option">
      <!--show the table delivery item count  -->
      <div class="d-flex-center-start pa-10">
        <div class="text-4-14 text-gray-3">Show</div>
        <div class="px-10" style="width: 100px">
          <SelectBox placeholder="Row" :options="dataRow" show="item" catch="item" v-model="deliveryStore.perPageProduct"
            @change="deliveryStore.getDeliveries()" />
        </div>
        <Btn class="btn-warning btn-auto-width" @click="resetDelivery()">
          Reset
        </Btn>
      </div>

      <!------------Delete from active delivery  -->
      <div v-if="deliveryStore.selectList === 'Active'" class="pa-10 d-flex">
        <div style="width: 100px">
          <SelectBox v-model="deliveryStore.removeType" placeholder="Select" :options="['Delete']" />
        </div>
        <Btn :disabled="deliveryStore.removeType !== 'Delete'" class="btn-danger btn-auto-width"
          @click="deleteDelivery(deliveryStore.selectRemoveItemId, 'soft_delete')">
          <i class="fa-regular fa-trash-can"></i>
        </Btn>
      </div>

      <!------------ Permanent Delete or restore from trash delivery  -------------------------------->
      <div v-else class="pa-10 d-flex">
        <div style="width: 100px">
          <SelectBox v-model="deliveryStore.removeType" placeholder="Select" :options="['Delete', 'Restore']" />
        </div>
        <Btn v-if="deliveryStore.removeType !== 'Restore'" :disabled="deliveryStore.removeType !== 'Delete'"
          class="btn-danger btn-squire-md" @click="deleteDelivery(deliveryStore.selectRemoveItemId, 'hard_delete')">
          <i class="fa-regular fa-trash-can"></i>
        </Btn>
        <Btn v-else :disabled="deliveryStore.removeType !== 'Restore'" class="btn-danger btn-squire-md"
          @click="deleteDelivery(deliveryStore.selectRemoveItemId, 'restore')">
          Restore
        </Btn>
      </div>
      <!------------- filter date range ------------------------------------------>
      <div class="pa-10">
        <DatePicker placeholder="Select Date Range" range rangePreset v-model="deliveryStore.dateRangeSelect"
          format="dd-MM-yyyy" @change="deliveryStore.getDeliveries()" />
      </div>
      <!------------ filter Action Status ---------------------------------------->
      <div class="pa-10">
        <SelectBox @optionSearch="actionStatusSearch" :inputSearch="true" placeholder="Filter by Status" show="flag_text"
          catch="id" :options="actionSearchOption" v-model="deliveryStore.filterStatus"
          @change="deliveryStore.getDeliveries()">
          <template v-slot:input="{ data }">
            <div class="d-flex-v-center px-10">
              <div>{{ data?.flag_text }}</div>
            </div>
          </template>
          <template v-slot:option="{ data }">
            <div class="d-flex-v-center px-10 py-5">
              <div class="round-image bg-background mr-10 bg-primary-shade" style="width: 30px; height: 30px; ">
              </div>
              <div>{{ data?.flag_text }}</div>
            </div>
          </template>
        </SelectBox>
      </div>
      <!------------ filter by merchant ---------------------------------------->
      <div class="pa-10">
        <SelectBox @optionSearch="merchantSearch" :inputSearch="true" placeholder="Filter by Merchant"
          show="business_name" catch="id" :options="searchMerchant" v-model="deliveryStore.merchant_id"
          @change="deliveryStore.getDeliveries()">
          <template v-slot:input="{ data }">
            <div class="d-flex-v-center px-10">
              <div>{{ data?.business_name }}</div>
            </div>
          </template>
          <template v-slot:option="{ data }">
            <div class="d-flex-v-center px-10 py-5">
              <div class="round-image bg-background mr-10 bg-primary-shade" style="width: 30px; height: 30px; ">
              </div>
              <div>{{ data?.business_name }}</div>
            </div>
          </template>
        </SelectBox>
      </div>
      <!----------- Filter hub -------------------------------------------------->
      <div class="pa-10">
        <SelectBox @optionSearch="hubSearch" :inputSearch="true" placeholder="Filter by Hub" show="hub_name" catch="id"
          :options="searchHub" v-model="deliveryStore.filterHub" @change="deliveryStore.getDeliveries()">
          <template v-slot:input="{ data }">
            <div class="d-flex-v-center px-10">
              <div>{{ data?.hub_name }}</div>
            </div>
          </template>
          <template v-slot:option="{ data }">
            <div class="d-flex-v-center px-10 py-5">
              <div class="round-image bg-background mr-10 bg-primary-shade" style="width: 30px; height: 30px; ">
                <i class="fa-solid fa-house-flag"></i>
              </div>
              <div>{{ data?.hub_name }}</div>
            </div>
          </template>
        </SelectBox>
      </div>
      <!------------- Filter Rider ---------------------------------------------->
      <div class="pa-10">
        <SelectBox @optionSearch="actionRiderSearch" :inputSearch="true" placeholder="Filter by Rider"
          show="rider_full_name" catch="id" :options="allRider" v-model="deliveryStore.filterRider"
          @change="deliveryStore.getDeliveries()">
          <template v-slot:input="{ data }">
            <div class="d-flex-v-center px-10">
              <div>{{ data?.rider_full_name }}</div>
            </div>
          </template>
          <template v-slot:option="{ data }">
            <div class="d-flex-v-center px-10 py-5">
              <div class="round-image bg-background mr-10 bg-primary-shade" style="width: 30px; height: 30px; ">
                <i class="fa-solid fa-person-biking"></i>
              </div>
              <div>{{ data?.rider_full_name }}</div>
            </div>
          </template>
        </SelectBox>
      </div>

      <!----------- filter payment status ------------------------------------>
      <div class="pa-10">
        <SelectBox placeholder="Filter by Payment Status" :options="deliveryStore.paymentStatusList" show="key"
          v-model="deliveryStore.filterPaymentStatus" catch="value" @change="deliveryStore.getDeliveries()" />
      </div>

      <!---------- filter input field search --------------------------------->
      <div class="pa-10 flex-auto">
        <InputBox placeholder="Consignment id, Merchant" v-model="deliveryStore.getFilterData"
          @input="deliveryStore.getDeliveries()">
          <template v-slot:left>
            <div class="d-flex-center mx-15 text-gray-3">
              <i class="xit-font-search" style="font-size: 16px"></i>
            </div>
          </template>
        </InputBox>
      </div>
    </div>
    <!-- ---------data table for delivery data ----------- -->
    <div v-if="deliveryStore.loading">
      <TableSkeleton></TableSkeleton>
    </div>
    <div v-else>
      <DataTable :height="deliveryStore.deliveryList.data?.length != 0 ? '520px' : '200px'" class="cc-data-table"
        :headerData="dataTableHeader" :tableData="deliveryStore.deliveryList.data" actionColumn
        :checkBox="{ field: 'checkboxStatus' }" :onLoading="deliveryStore.loading" @change="actionStatusModal()">
        <template v-slot:consignment_id="{ data }">
          <div class="text-info">
            <div class="pl-15">
              <router-link
                :to="{ name: 'singledeliveryInvoice', params: { id: data.id }, query: { consignment_id: data.consignment_id } }">
                {{ data.consignment_id }}
              </router-link>
            </div>
          </div>
        </template>
        <template v-slot:table-action="{ data }">
          <div class="data-table--cell-action-menu">
            <div v-if="data.actions.can_view">
              <router-link :to="{ name: 'viedDeliveries', params: { id: data.id } }">
                <div class="py-5 data-table--cell-action-menu-item d-flex-center-start">
                  <i class="fa-regular fa-eye pr-5"></i>
                  <span class="text-4-14">View</span>
                </div>
              </router-link>
            </div>

            <!-- <div v-if="data.actions.can_edit && data?.action_status?.id < 11"> -->

            <div>
              <!-- <router-link :to="{ name: 'editDeliveries', params: { id: data.id } }"> -->
              <div @click="deliveryStore.trackingDetails(data.consignment_id)"
                class="py-5 data-table--cell-action-menu-item d-flex-center-start">
                <i class="fa-solid fa-pen-to-square pr-5"></i>
                <span class="text-4-14">Tracking</span>
              </div>
              <!-- </router-link> -->
            </div>
            <div
              v-if="data.actions.can_edit && (data?.action_status?.id !== 10 && data?.action_status?.id !== 11 && data?.action_status?.id !== 17 && data?.action_status?.id !== 21)">
              <router-link :to="{ name: 'editDeliveries', params: { id: data.id } }">
                <div class="py-5 data-table--cell-action-menu-item d-flex-center-start">
                  <i class="fa-solid fa-pen-to-square pr-5"></i>
                  <span class="text-4-14">Edit</span>
                </div>
              </router-link>
            </div>
            <div>
              <!-- <router-link :to="{ name: 'editDeliveries', params: { id: data.id } }"> -->
              <div @click="generateBarCode(data.consignment_id)"
                class="py-5 data-table--cell-action-menu-item d-flex-center-start">
                <i class="fa-solid fa-barcode pr-5"></i>
                <span class="text-4-14">Generate Barcode</span>
              </div>
              <!-- </router-link> -->
            </div>
            <div v-if="data.actions.can_delete">
              <div v-if="!data.deleted_at" class="py-5 data-table--cell-action-menu-item d-flex-center-start"
                @click="deleteDelivery(deliveryStore.selectRemoveItemId.push({ id: data.id }), 'soft_delete')">
                <i class="fa-regular fa-trash-can pr-5"></i>
                <span class="text-4-14">Delete</span>
              </div>
              <div v-if="data.deleted_at">
                <div class="py-5 data-table--cell-action-menu-item d-flex-center-start"
                  @click="deleteDelivery(deliveryStore.selectRemoveItemId.push({ id: data.id }), 'restore')">
                  <i class="fa-solid fa-arrow-rotate-left pr-5"></i>
                  <span class="text-4-14">Restore</span>
                </div>
                <div class="py-5 data-table--cell-action-menu-item d-flex-center-start"
                  @click="deleteDelivery(deliveryStore.selectRemoveItemId.push({ id: data.id }), 'hard_delete')">
                  <i class="fa-solid fa-trash-arrow-up pr-5"></i>
                  <span class="text-4-14">Permanent Delete</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:recipient_name="{ data }">
          <div class="pa-15">
            <div>{{ data?.recipient_name }}</div>
            <div class="text-4-12">{{ data?.recipient_email }}</div>
            <div class="text-4-12">{{ data?.recipient_number }}</div>
            <div class="text-4-12">{{ data?.recipient_address }}</div>
          </div>
        </template>
        <template v-slot:merchant_info="{ data }">
          <div class="pa-15 d-flex-v-center">
            <div v-if="data.payment_status == 'Confirmed'" class="pr-10" style="color: var(--success);">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <div v-if="data.payment_status == 'Paid'" class="pr-10" style="color: var(--primary);">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <div v-if="data.payment_status == 'Unpaid'" class="pr-10" style="color: var(--primary);">
              <div class="pl-15"></div>
            </div>
            <div>
              <div>{{ data?.merchant_info?.business_name }}</div>
              <div class="text-4-12">{{ data?.merchant_info?.first_name + " " + data?.merchant_info?.last_name }}</div>
              <div class="text-4-12">{{ data?.merchant_info?.operator_number }}</div>
            </div>
          </div>
        </template>

        <template v-slot:action_status="{ data }">
          <div class="pa-5 d-flex-center">
            <span class="px-15 py-5"
              :style="{ color: data?.action_status?.color_code, 'border': '1px solid ' + data?.action_status?.color_code, borderRadius: '6px', backgroundColor: 'aliceblue' }">
              {{ data?.icon }}{{ data?.action_status?.flag_text }}
            </span>
          </div>
        </template>
        <template v-slot:delivery_date="{ data }">
          <div class="ml-15 text-gray-1">
            <div v-if="data?.delivery_date">
              <div>{{ data?.delivery_date?.split(" ")[0].replace("/", "&#8209;").replace("/", "&#8209;") }}</div>
              <div class="font-10">{{ data?.delivery_date?.split(" ")[1] + " " + data?.delivery_date?.split(" ")[2] }}
              </div>
            </div>
            <div v-else>-------</div>
          </div>
        </template>
        <template v-slot:return_date="{ data }">
          <div class="ml-15 text-gray-1">
            <div v-if="data?.return_date">
              <div>{{ data?.return_date?.split(" ")[0].replace("/", "&#8209;").replace("/", "&#8209;") }}</div>
              <div class="font-10">{{ data?.return_date?.split(" ")[1] + " " + data?.return_date?.split(" ")[2] }}</div>
            </div>
            <div v-else>-------</div>
          </div>
        </template>
        <template v-slot:invoice_date="{ data }">
          <div class="ml-15 text-gray-1">
            <div v-if="data?.invoice_date">
              <div>{{ data?.invoice_date?.split(" ")[0].replace("/", "&#8209;").replace("/", "&#8209;") }}</div>
              <div class="font-10">{{ data?.invoice_date?.split(" ")[1] + " " + data?.invoice_date?.split(" ")[2] }}</div>
            </div>
            <div v-else>-------</div>
          </div>
        </template>
        <template v-slot:created_at="{ data }">
          <div class="ml-15 text-gray-1">
            <div>{{ data?.created_at?.split(" ")[0].replace("/", "&#8209;").replace("/", "&#8209;") }}</div>
            <div class="font-10">{{ data?.created_at?.split(" ")[1] + " " + data?.created_at?.split(" ")[2] }}</div>
          </div>
        </template>
      </DataTable>
    </div>
    <div class="mt-30 d-flex-center-between">
      <ResultPerPage :totalResult="deliveryStore?.deliveryList?.meta?.total"
        :perPage="deliveryStore?.deliveryList?.meta?.to">
      </ResultPerPage>
      <Pagination :totalPage="deliveryStore?.deliveryList?.meta?.last_page"
        :currentPage="deliveryStore?.deliveryList?.meta?.current_page" :paginationLength="1" @change="paginationPage" />
    </div>
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
import { useHubStore } from "@/store/hub/hub";
import { useDeliveryStore } from "@/store/delivery/delivery";
import alert from "@/functions/alert";
import Modal from "@/components/pop/Modal.vue";
import { useRiderStore } from "@/store/rider/rider";
import { forEach } from "lodash";
import DatePicker from '@/components/others/DatePicker.vue';
import loader2 from "@/components/loader/loader2.vue";
import toast from '@/functions/toast.js'
import { useRoute } from "vue-router";
import { useMerchantStore } from "@/store/merchant/merchant";
import TableSkeleton from "@/components/TableSkeleton/TableSkeleton.vue";
import TrackingTimeline from "@/components/trackingTimeline/trackingTimeline.vue";

const route = useRoute();
const screenW = ref();
const invalidSubmitErr = ref('')
const { handleSubmit, resetForm, setErrors } = useForm();
let currentItemStatus = ref('');

const merchant = useMerchantStore();
merchant.getMerchantForDropDown();

const deliveryStore = useDeliveryStore();
deliveryStore.getDeliveries();
deliveryStore.getStatus();
deliveryStore.getPaymentStatusList();

const hubStore = useHubStore();
hubStore.getHubs(-1);

const riderStore = useRiderStore();
riderStore.getRiderForDropDown();

const dateRange = reactive(rangeData);

const needModalForSelect = ref();
const searchText = ref();


// action status
const actionText = ref();
const actionSearch = (e) => { actionText.value = e; }
const actionSearchlist = computed(() => {
  let re = new RegExp(actionText.value, "i");
  let filteredList = deliveryStore.actionStatusList?.filter((item) => {
    return re.test(item.flag_text);
  });
  return filteredList;
});

// selectbox filter for action item or delivery status
const actionSearchText = ref();
const actionStatusSearch = (e) => { actionSearchText.value = e; }
const actionSearchOption = computed(() => {
  let re = new RegExp(actionSearchText.value, "i");
  let filteredList = deliveryStore.getStatusList?.filter((item) => {
    return re.test(item.flag_text);
  });
  return filteredList;
});

// selectbox filter for rider
const riderSearchText = ref();
const actionRiderSearch = (e) => { riderSearchText.value = e; }

const allRider = computed(() => {
  let re = new RegExp(riderSearchText.value, "i");
  let filteredList = riderStore.getRiderForDropDownList?.data?.filter((item) => {
    return re.test(item.rider_full_name);
  });
  return filteredList;
});

// selectbox filter for hub
const hubSearchText = ref();
const hubSearch = (e) => { hubSearchText.value = e; }

const searchHub = computed(() => {
  let re = new RegExp(hubSearchText.value, "i");
  let filteredList = hubStore.hubList?.data?.filter((item) => {
    return re.test(item.hub_name);
  });
  return filteredList;
});

// selectbox filter by merchant
const merchantSearchText = ref();
const merchantSearch = (e) => { merchantSearchText.value = e; }

const searchMerchant = computed(() => {
  let re = new RegExp(merchantSearchText.value, "i");
  let filteredList = merchant.getMerchantForDropDownList.filter((item) => {
    return re.test(item.business_name);
  });
  return filteredList;
});


const closeDeliveryModal = () => {
  deliveryStore.deliveryModal = false
  deliveryStore.actionStatus = ""
}
const closetrackingModal = () => {
  deliveryStore.trackingModal = false
}

const paginationPage = (e) => {
  deliveryStore.page = e;
  deliveryStore.getDeliveries();
}
// onSelected for delivery list
const actionStatusModal = () => {
  deliveryStore.selectActionItemId = [];
  deliveryStore.selectActionItem = [];
  deliveryStore.selectRemoveItemId = [];
  deliveryStore.totalAmountToBeCollected = 0;
  deliveryStore.selectedHubId = "";
  deliveryStore.currentItemFlagText = "";
  for (let item of deliveryStore?.deliveryList.data) {
    if (item.checkboxStatus === true) {
      // console.log(item);
      deliveryStore.selectActionItemId.push(item.id);
      deliveryStore.selectRemoveItemId.push({ id: item.id })
      deliveryStore.selectedHubId = item.hub_id;
      deliveryStore.selectActionItem.push(item);
      currentItemStatus = item.action_status.id;
      deliveryStore.currentItemFlagText = item.action_status.flag_text;
      if (deliveryStore.actionStatus === 5) {
        deliveryStore.getRiderListByHubId(item.hub_id)
      }
    }
  }
  if (deliveryStore.selectActionItem.length !== 0) {
    deliveryStore.isItemChecked = true;
  } else {
    deliveryStore.isItemChecked = false;
  }
  for (let i = 0; deliveryStore.selectActionItem.length > i; i++) {
    deliveryStore.selectActionItem[i].selectedProductCheckbox = false;
    if (deliveryStore.actionStatus === 14 || deliveryStore.actionStatus === 12) {
      deliveryStore.selectActionItem[i].receive_amount = 0;
    }
    else {
      deliveryStore.selectActionItem[i].receive_amount = deliveryStore.selectActionItem[i].amount_to_be_collected;
    }
  }
  if ((deliveryStore.actionStatus === 6 || deliveryStore.actionStatus === 7 || deliveryStore.actionStatus === 8 || deliveryStore.actionStatus === 12 || deliveryStore.actionStatus === 14 || deliveryStore.actionStatus === 15) && deliveryStore.selectActionItemId.length !== 0) {
    deliveryStore.deliveryModal = true;
    deliveryStore.isItemChecked = false;
    matchStatus(deliveryStore.actionStatus);
  }
}

const matchStatus = (nextStatus) => {
  // console.log(nextStatus);
  const item = deliveryStore.actionStatusList.find((item) => item.id === nextStatus);
  deliveryStore.nextFlagText = item.flag_text
  // console.log(item.flag_text);
}

// enter to next note field------------------
const goToNextInput = (rowIndex) => {
  const nextInputIndex = rowIndex + 1;
  const nextInput = document.querySelector(`input[name="notes${nextInputIndex}"]`);
  if (nextInput) {
    nextInput.focus();
  }
};

// onclick generate barcode
const generateBarCode = (e) => {
  let fs = new FormData()
  fs.append("code", e);
  deliveryStore.reGenerateBarCode(fs)
}

// modal checkbox 
const statusModalCheckbox = () => {
  deliveryStore.selectedModalItemIds = [];
  deliveryStore.selectedModalItemReceivedAmounts = [];
  deliveryStore.selectedModalItemNotes = [];
  deliveryStore.deliveries = [];
  deliveryStore.totalReceivedAmount = 0;
  deliveryStore.selectedModalItemAmountToBeCollected = 0;
  deliveryStore.selectedModalReceivedAmount = 0;
  for (let item of deliveryStore?.selectActionItem) {
    if (item.selectedProductCheckbox === true) {
      deliveryStore.selectedModalItemIds.push(item.id)
      deliveryStore.selectedModalItemReceivedAmounts.push(item.amount_to_be_collected)
      modalItemAmount(item);
    }
  }
  if (deliveryStore.selectedModalItemIds.length !== 0) {
    deliveryStore.modalItemChecked = true
  } else {
    deliveryStore.modalItemChecked = false
  }
}

const modalItemAmount = (item) => {
  deliveryStore.selectedModalItemAmountToBeCollected += item.amount_to_be_collected
  deliveryStore.selectedModalReceivedAmount += parseInt(item.receive_amount)
}

// function for delivery single item---------------
const deleteDelivery = (id, type) => {
  let msg = "";
  if (type == 'soft_delete') {
    msg = "You want to Delete this Delivery?";
  } else if (type == 'restore') {
    msg = "You want to restore this Delivery?";
  } else {
    msg = "You want to permanently delete this Delivery?";
  }
  alert.Swal.fire({
    title: 'Are you sure?',
    text: msg,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4646',
    cancelButtonColor: '#333333',
    confirmButtonText: 'Confirmed'
  }).then((result) => {
    if (result.isConfirmed) {
      deliveryStore.selectActionItemId.forEach((item, index) => {
        deliveryStore.selectRemoveItemId.push('id[' + index + ']', item.id);
      });
      deliveryStore.deleteDelivery(deliveryStore.selectRemoveItemId, type);
    }
  })
}

// reset button 
const resetDelivery = () => {
  deliveryStore.reset();
  deliveryStore.getDeliveries();
  deliveryStore.getStatus();
  deliveryStore.getPaymentStatusList();
  riderStore.getRiderForDropDown();
}

// for update delivery status
const deliveryAction = () => {
  deliveryStore.deliveries = [];

  if (deliveryStore.isItemChecked || deliveryStore.modalItemChecked) {
    let fs = new FormData();

    if (deliveryStore.actionStatus != 10) {
      for (let item of deliveryStore?.selectActionItem) {
        if (item.checkboxStatus === true && deliveryStore.deliveryModal === false) {
          deliveryStore.deliveries.push({
            "id": item.id,
            "consignment_id": item.consignment_id,
            "note": deliveryStore.delivery_note,
            "current_status": item.action_status.id
          })
        }
        else if (item.selectedProductCheckbox === true) {
          if ((item.receive_amount !== item.amount_to_be_collected) && (item.delivery_note == "" || item.delivery_note == null)) {
            toast.error({
              title: `Note Must for ${item.consignment_id}`,
            })
            return
          }
          else {
            deliveryStore.deliveries.push({
              "id": item.id,
              "consignment_id": item.consignment_id,
              "received_amount": item.receive_amount,
              "note": item.delivery_note,
              "current_status": item.action_status.id

            })
          }
        }
      }
      fs.append("deliveries", JSON.stringify(deliveryStore.deliveries));
      fs.append("next_status", deliveryStore.actionStatus);
      fs.append("note", deliveryStore.delivery_note);
      fs.append("rider_id", deliveryStore.assignRider);
      fs.append("hub_id", deliveryStore.transitHub);

      deliveryStore.deliveryAction(fs);
    } else {
      toast.error({
        title: 'Cash Handover must be done from the hub account',
      })
    }
  } else {
    toast.error({
      title: 'Please Select The Item',
    })
  }


}

// export delivery
const exportDelivery = () => {
  deliveryStore.exportDelivery = deliveryStore.currentDateTime() + '-export-delivery.csv';
  deliveryStore.getDeliveries();
}


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