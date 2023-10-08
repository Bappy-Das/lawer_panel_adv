<template>
  <PageLayout header="Delivery Management" subHeader="Edit Delivery" @setScreenWidth="screenW = $event"
    :padding="screenW < 650 ? '10px 10px 40px 10px' : '25px 25px 50px 25px'">
    <div v-if="delivery.loading">
      <loader2></loader2>
    </div>
    <div v-else>
      <div class="px-5 mb-30">
        <div class="d-flex-center-start">
          <i class="fa-solid fa-plus"></i>
          <h3 class="text ma-3 px-5">Edit Delivery</h3>
        </div>
      </div>
      <hr class="hr-line" />
      <!-- -------------------------------------------------------------------- -->
      <form method="post" @submit="onSubmit" id="delivery-form" enctype="multipart/form-data">
        <div class="input-group-container col-wrap mt-20">
          <div class="input-container col-6 col-12-md">
            <div class="input-title">Recipient Name<span class="input-title-require">*</span></div>
            <InputBox v-model="delivery.deliveryBasic.recipient_name" type="text" placeholder="Enter Recipient Name"
              id="recipient_name" name="recipient_name" showDetail :validate="Yup.string().required()">
              <template v-slot:left>
                <div class="d-flex-v-center pl-15 pr-10">
                  <i class="fa-solid fa-user" style="color: #666460"></i>
                </div>
              </template>
            </InputBox>
          </div>
          <div class="input-container col-6 col-12-md">
            <div class="input-title">Recipient Number <span class="input-title-require">*</span></div>
            <InputBox v-model="delivery.deliveryBasic.recipient_number" type="number" placeholder="Enter Recipient Number"
              id="recipient_number" name="recipient_number" showDetail
              :validate="Yup.string().required().matches(/^(?:(?:\+|00)88|01)?\d{11}$/, 'Phone number is not valid')">
              <template v-slot:left>
                <div class="d-flex-v-center pl-15 pr-10">
                  <i class="fa-solid fa-phone" style="color: #666460"></i>
                </div>
              </template>
            </InputBox>
          </div>

          <div class="input-container col-6 col-12-md">
            <div class="input-title">Recipient Zone<span class="input-title-require">*</span></div>
            <SelectBox placeholder="Select Zone" :options="courierZone.courierZones.data" show="zone_name" catch="id"
              name="recipient_zone_id" @change="delivery.getHubInfoByZone()"
              v-model="delivery.deliveryBasic.recipient_zone_id" showDetail :validate="Yup.string().required()">
              <template v-slot:left>
                <div class="d-flex-v-center pl-15">
                  <i class="fa-solid fa-location-crosshairs" style="color: #666460"></i>
                </div>
              </template>
            </SelectBox>
          </div>
          <div class="input-container col-6 col-12-md">
            <div class="input-title">Recipient Alternative Number</div>
            <InputBox v-model="delivery.deliveryBasic.recipient_alternative_number" type="number"
              placeholder="Enter Recipient Alternative Number" id="recipient_alternative_number"
              name="recipient_alternative_number" showDetail>
              <template v-slot:left>
                <div class="d-flex-v-center pl-15 pr-10">
                  <i class="fa-solid fa-square-phone-flip" style="color: #666460"></i>
                </div>
              </template>
            </InputBox>
          </div>


          <div class="input-container col-6 col-12-md">
            <div class="input-title">Recipient Email</div>
            <InputBox v-model="delivery.deliveryBasic.recipient_email" type="text" placeholder="Enter Recipient Email"
              id="recipient_email" name="recipient_email" showDetail>
              <template v-slot:left>
                <div class="d-flex-v-center pl-15 pr-10">
                  <i class="fa-solid fa-envelope" style="color: #666460"></i>
                </div>
              </template>
            </InputBox>
          </div>
          <div class="input-container col-6 col-12-md">
            <div class="input-title">Recipient Hub<span class="input-title-require">*</span></div>
            <SelectBox v-model="delivery.deliveryBasic.hub_id" placeholder="Select Zone" :options="delivery.hubInfoByZone"
              show="hub_name" catch="id" name="hub_id" showDetail :validate="Yup.string().required()"><template
                v-slot:left>
                <div class="d-flex-v-center pl-15">
                  <i class="fa-brands fa-hubspot" style="color: #666460"></i>
                </div>
              </template>
            </SelectBox>
          </div>


          <div class="input-container col-12 col-12-md">
            <div class="input-title">Recipient Address <span class="input-title-require">*</span></div>
            <LongTextBox v-model="delivery.deliveryBasic.recipient_address" id="recipient_address"
              name="recipient_address" placeholder="Enter Recipient Address" :showDetail="true" type="text"
              :validate="Yup.string().required()">
              <template v-slot:left>
                <div class="d-flex-v-center pl-15 pr-10 py-20">
                  <i class="fa-solid fa-location-dot" style="color: #666460"></i>
                </div>
              </template>
            </LongTextBox>

          </div>
          <!-- ------------------------------------------------------------------ -->
          <div class="input-container col-6 col-12-md">
            <div class="input-title">Merchant <span class="input-title-require">*</span></div>
            <SelectBox :validate="Yup.string().required()" @optionSearch="actionStatusSearch" :inputSearch="true"
              placeholder="Select Merchant" show="business_name" catch="id" :options="merchantSearchOption"
              name="merchant_id" v-model="delivery.deliveryBasic.merchant_id"
              @change="delivery.getMerchantDeliveryInfo()">
              <template v-slot:left>
                <div class="d-flex-v-center pl-15">
                  <i class="fa-solid fa-person-rays" style="color: #666460"></i>
                </div>
              </template>
              <template v-slot:input="{ data }">
                <div class="d-flex-v-center px-10">
                  <div>{{ data?.business_name }}</div>
                </div>
              </template>
              <template v-slot:option="{ data }">
                <div class="d-flex-v-center px-10 py-5">
                  <div class="round-image bg-background mr-10 bg-primary-shade" style="width: 30px; height: 30px; ">
                    <!-- <img style="width:200px" :src=merchant.getMerchantForDropDownList.profile_pic_url  alt="marchant profile" srcset=""> -->
                    <img style="width: 30px; height: 30px;" :src="merchant.getMerchantForDropDownList.profile_pic_url"
                      class="img-fluid" />
                  </div>
                  <div>{{ data?.business_name }}</div>
                </div>
              </template>
            </SelectBox>
          </div>
          <div class="input-container col-6 col-12-md">
            <div class="input-title">Store</div>
            <SelectBox v-model="delivery.deliveryBasic.store_id" placeholder="Select Store"
              :options="delivery.merchantStoreList" @input="delivery.getMerchantProduct($event)" show="store_name"
              catch="id" name="store_id" showDetail>
              <template v-slot:left>
                <div class="d-flex-v-center pl-15">
                  <i class="fa-solid fa-store" style="color: #666460"></i>
                </div>
              </template>
            </SelectBox>
          </div>

          <div class="input-container col-6 col-12-md">
            <div class="input-title">Product</div>
            <SelectBox placeholder="Select Product" :options="delivery.merchantProductList" show="name" catch="id"
              name="product_id" @input="delivery.getProductActualPrice($event)"
              v-model="delivery.deliveryBasic.product_id" showDetail><template v-slot:left>
                <div class="d-flex-v-center pl-15">
                  <i class="fa-solid fa-gift" style="color: #666460"></i>
                </div>
              </template>
            </SelectBox>
          </div>
          <div class="input-container col-6 col-12-md">
            <div class="input-title">Merchant Order ID <span class="input-title-require">*</span></div>
            <InputBox v-model="delivery.deliveryBasic.merchant_order_id" type="number"
              placeholder="Select Merchant Order ID" id="merchant_order_id" name="merchant_order_id" showDetail
              :validate="Yup.string().required()">
              <template v-slot:left>
                <div class="d-flex-v-center pl-15 pr-10">
                  <i class="fa-solid fa-barcode" style="color: #666460"></i>
                </div>
              </template>
            </InputBox>
          </div>
          <div class="input-container col-12">
            <div class="input-title">Package Description <span class="input-title-require">*</span></div>
            <LongTextBox v-model="delivery.deliveryBasic.package_description" id="package_description"
              name="package_description" placeholder="Enter Package Description " :showDetail="true" type="text">
              <template v-slot:left>
                <div class="d-flex-v-center pl-15 pr-10 py-20">
                  <i class="fa-solid fa-file-lines" style="color: #666460"></i>
                </div>
              </template>
            </LongTextBox>
          </div>

          <div class="input-container col-6 col-12-md">
            <div class="input-title">Delivery Plan <span class="input-title-require">*</span></div>
            <SelectBox :disabled="true" placeholder="Select Delivery Plan" :options="delivery.merchantDeliveryPlans"
              show="plan_name" catch="id" name="delivery_plan_id" :validate="Yup.string().required()" showDetail
              v-model="delivery.selectDeliveryPlan.id"><template v-slot:left>
                <div class="d-flex-v-center pl-15">
                  <i class="fa-solid fa-truck" style="color: #666460"></i>
                </div>
              </template>
            </SelectBox>
          </div>
          <div class="input-container col-6 col-12-md">
            <div class="input-title">Return Plan <span class="input-title-require">*</span></div>
            <SelectBox :disabled="true" placeholder="Select Return Plan " :options="delivery.merchantReturnPlans"
              show="plan_name" catch="id" name="return_plan_id" :validate="Yup.string().required()" showDetail
              v-model="delivery.selectReturnPlan.id"><template v-slot:left>
                <div class="d-flex-v-center pl-15">
                  <i class="fa-solid fa-person-walking-arrow-loop-left" style="color: #666460"></i>
                </div>
              </template>
            </SelectBox>
          </div>
          <div class="input-container col-6 col-12-md">
            <div class="input-title">Product Actual Price</div>
            <InputBox type="number" :disabled="true" placeholder="Product Actual Price" name="product_actual_price"
              showDetail v-model="delivery.actual_price">
              <template v-slot:left>
                <div class="d-flex-v-center pl-15 pr-10">
                  <i class="fa-solid fa-sack-dollar" style="color: #666460"></i>
                </div>
              </template>
            </InputBox>
          </div>
          <div class="input-container col-6 col-12-md">
            <div class="input-title">Amount to be Collected<span class="input-title-require">*</span></div>
            <InputBox type="number" v-model="delivery.deliveryBasic.amount_to_be_collected"
              placeholder="Amount to be Collected" name="amount_to_be_collected" showDetail>
              <template v-slot:left>
                <div class="d-flex-v-center pl-15 pr-10">
                  <i class="fa-solid fa-sack-dollar" style="color: #666460"></i>
                </div>
              </template>
            </InputBox>
          </div>
          <!-- ---------------------------------------------------------------- -->
          <div class="input-container col-12">
            <div class="input-title">Special Instructions</div>
            <LongTextBox v-model="delivery.deliveryBasic.special_instruction" id="special_instruction"
              name="special_instruction" placeholder="Enter Special Instructions" :showDetail="true" type="text"><template
                v-slot:left>
                <div class="d-flex-v-center pl-15 pr-10 py-20">
                  <i class="fa-solid fa-person-chalkboard" style="color: #666460"></i>
                </div>
              </template>
            </LongTextBox>
          </div>
        </div>

        <div class="my-10">
          <Message :message="invalidSubmitErr" coloredBg type="error" padding="10px" />
        </div>
        <!-- ---------------------------------------------------------------- -->

        <div :class="[screenW > 600 ? 'd-flex' : 'd-block']">
          <div class="pa-5">
            <Btn class="btn-primary btn-squire-md" :block="screenW < 600" type="submit" :loading="delivery.loading">Save
            </Btn>
          </div>
          <div class="pa-5">
            <Btn class="btn-warning btn-squire-md" :block="screenW < 600">Reset</Btn>
          </div>
          <div class="pa-5">
            <Btn class="btn-danger btn-squire-md" :block="screenW < 600">Cancel</Btn>
          </div>
        </div>
      </form>
    </div>

  </PageLayout>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch, computed } from "vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import InputBox from "@/components/form/InputBox.vue";
import SelectBox from "@/components/form/SelectBox.vue";
import Btn from "@/components/form/Btn.vue";
import RadioBox from "../../components/form/RadioBox.vue";
import { useRoute } from "vue-router";
import { useDeliveryStore } from "@/store/delivery/delivery";
import { useCourierZoneStore } from "@/store/courierZone/courierZone";
import { useMerchantStore } from "@/store/merchant/merchant";
import { useProductStore } from "@/store/product/product";
import { useStore } from "@/store/merchantStore/merchantStore";
import { usePlanStore } from "@/store/plan/plan";
import { useHubStore } from "@/store/hub/hub";
import LongTextBox from "../../components/form/LongTextBox.vue";
import Message from '@/components/validate/Message.vue';
import loader2 from "@/components/loader/loader2.vue";

const route = useRoute();
const { handleSubmit, resetForm, setErrors } = useForm();
const screenW = ref();
const invalidSubmitErr = ref('')
const courierZone = useCourierZoneStore();
courierZone.getCourierZone(100);

const hubStore = useHubStore();
hubStore.getHubs(100);

const merchant = useMerchantStore();
merchant.getMerchant(100);
merchant.getMerchantForDropDown();
const store = useStore();
store.getStoreList();

const product = useProductStore();
product.getProducts();

const plans = usePlanStore();
plans.getPlans();

const delivery = useDeliveryStore();
delivery.editDelivery(route.params.id);
delivery.getDeliveryDetails(route.params.id);
delivery.getHubInfoByZone()

const searchText = ref();

const actionStatusSearch = (e) => {
  searchText.value = e;
}
const merchantSearchOption = computed(() => {
  let re = new RegExp(searchText.value, "i");
  let filteredList = merchant.getMerchantForDropDownList.filter((item) => {
    return re.test(item.business_name);
  });
  return filteredList;
});

const onSubmit = handleSubmit(async () => {
  let fs = new FormData(document.getElementById("delivery-form"));
  fs.append('id', route.params.id)
  delivery.handleCreateDelivery(fs);
  const response = await delivery.handleCreateDelivery(fs);
  if (response === true) {
    return;
  }
  invalidSubmitErr.value = "Some values are not right";
  setErrors(response);
}, () => {
  invalidSubmitErr.value = 'Please Fullup all the require fields'
});


</script>