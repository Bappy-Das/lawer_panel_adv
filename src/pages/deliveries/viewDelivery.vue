<template>
    <PageLayout header="Delivery Management" subHeader="Edit Delivery" @setScreenWidth="screenW = $event"
        :padding="screenW < 650 ? '10px 10px 40px 10px' : '25px 25px 50px 25px'">
        <div v-if="delivery.loading">
            <loader2></loader2>
        </div>
        <div v-else class="bg-primary-shade  mb-30"
            :style="{ borderRadius: '24px', backgroundColor: 'rgb(255, 255, 255)' }">
            <div class="input-group-container col-wrap pa-30">
                <div class="input-container col-12 col-12-md mb-10">
                    <div class="text-5-20 text-gray-1 mb-5">Recipient Details</div>
                    <hr class="hr-line" />
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Recipient Name</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.recipient_name ?
                            delivery.deliveryDetails.recipient_name : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Recipient Number</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.recipient_number ?
                            delivery.deliveryDetails.recipient_number : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Recipient Zone</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.recipient_zone ?
                            delivery.deliveryDetails.recipient_zone : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Recipient Alternative Number</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.recipient_alternative_number ?
                            delivery.deliveryDetails.recipient_alternative_number : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Recipient Email</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.recipient_email ?
                            delivery.deliveryDetails.recipient_email : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Recipient Hub</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.hub_name ?
                            delivery.deliveryDetails.hub_name : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Recipient Address</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.recipient_address ?
                            delivery.deliveryDetails.recipient_address : "N/A"
                        }}
                    </div>
                </div>
            </div>
            <div class="input-group-container col-wrap pa-30">
                <div class="input-container col-12 col-12-md mb-10">
                    <div class="text-5-20 text-gray-1 mb-5">Merchant Details</div>
                    <hr class="hr-line" />
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Merchant Name</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.merchant_info ?
                            delivery.deliveryDetails.merchant_info.business_name : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Store Name</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.store ?
                            delivery.deliveryDetails.store.store_name : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Product Name</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.product ?
                            delivery.deliveryDetails.product.name : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Merchant Order ID</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.merchant_order_id ?
                            delivery.deliveryDetails.merchant_order_id : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Delivery Plan</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.delivery_plan ?
                            delivery.deliveryDetails.delivery_plan : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Return Plan</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.return_plan ?
                            delivery.deliveryDetails.return_plan : "N/A"
                        }}
                    </div>
                </div>
            </div>
            <div class="input-group-container col-wrap pa-30">
                <div class="input-container col-12 col-12-md mb-10">
                    <div class="text-5-20 text-gray-1 mb-5">Product Details</div>
                    <hr class="hr-line" />
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Product Actual Price</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.product ?
                            delivery.deliveryDetails.product.actual_price : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Amount to be Collected</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.amount_to_be_collected ?
                            delivery.deliveryDetails.amount_to_be_collected : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-4 col-12-md mb-20">
                    <div class="input-title">Package Entry Date</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.created_at.replace("/", "-").replace("/", "-")
                        }}
                    </div>
                </div>
                <div class="input-container col-12 col-12-md mb-20">
                    <div class="input-title">Package Description</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.package_description ?
                            delivery.deliveryDetails.package_description : "N/A"
                        }}
                    </div>
                </div>
                <div class="input-container col-12 col-12-md mb-20">
                    <div class="input-title">Special Instructions</div>
                    <div class="text-4-14 my-10">
                        {{
                            delivery.deliveryDetails.special_instruction ?
                            delivery.deliveryDetails.special_instruction : "N/A"
                        }}
                    </div>
                </div>
            </div>
            <div class="input-group-container col-wrap">
                <div class="input-container col-12 col-12-md mb-10">
                    <hr class="hr-line" />
                </div>
                <div class="input-container col-9 col-12-md mb-10">
                    <TrackingTimeline />
                    <!-- <TrackingTimeline :trackingdata="delivery.trackingData" /> -->
                </div>
            </div>

        </div>
    </PageLayout>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { ref } from "vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import { useRoute } from "vue-router";
import { useDeliveryStore } from "@/store/delivery/delivery";
import { useCourierZoneStore } from "@/store/courierZone/courierZone";
import { useMerchantStore } from "@/store/merchant/merchant";
import { useProductStore } from "@/store/product/product";
import { useStore } from "@/store/merchantStore/merchantStore";
import { usePlanStore } from "@/store/plan/plan";
import { useHubStore } from "@/store/hub/hub";
import TrackingTimeline from "@/components/trackingTimeline/trackingTimeline.vue";
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

const store = useStore();
store.getStoreList();

const product = useProductStore();
product.getProducts();

const plans = usePlanStore();
plans.getPlans();

const delivery = useDeliveryStore();
delivery.trackingDetails(route.params.id);
delivery.getDeliveryDetails(route.params.id);
</script>

<style lang="scss" scoped>
.tracking {
    &-container {
        position: relative;
        width: 100%;
        margin: auto;
        height: 100px;
        margin-top: 65px;
    }
}

.base-timeline {
    list-style-type: none;
    counter-reset: number;
    /* number 2021*/
    position: relative;
    display: block;
    z-index: 2;
    width: 75%;
    /* change or remove*/
    margin: auto;

}

.base-timeline::before {
    content: '';
    width: 100%;
    border-top: 2px solid steelblue;
    display: inline-block;
    position: absolute;
    top: 50%;
    z-index: -1;

}

/* set width of time-line this can be px, percentage or other unit
3 is the number of list items minus 1 when using percentage
*/
.base-timeline__item {
    position: relative;
    display: inline-block;
    width: calc(100% / 3 - 15px);
    /* change width */
}

.base-timeline__item::before {
    display: flex;
    justify-content: center;
    align-items: center;
    counter-increment: number;
    /* number -1*/
    content: counter(number) '';
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: steelblue;
    color: white;
    font-weight: bold;
    transition: all 0.6s ease-in-out;
    box-sizing: border-box;

}

/* modifier with use of the data-year attribute */
.base-timeline__item--data::before {
    content: attr(data-year);
    width: 60px;
    height: 60px;
}

.base-timeline__item--active::before {
    background-color: rgba(225, 114, 114, .9);
    border: 2px solid;
    border-color: rgba(0, 0, 0, .3);
}

.base-timeline__item:last-child {
    width: 0;
}

.base-timeline__summary-text {
    position: absolute;
    bottom: -2em;
    left: 5px;
}
</style>

pa-30