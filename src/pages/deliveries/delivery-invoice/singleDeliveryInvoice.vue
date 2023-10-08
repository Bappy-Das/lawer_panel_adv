<template>
    <PageLayout header="Delivery Invoice">
        <div class="d-flex-between px-40">
            <div class="printBtn" @click="printInvoice()">
                <Btn class="btn-info btn-squire-md my-10"><i class="fa-solid fa-print mr-15"
                        style="font-size: 20px;font-weight: bolder;"></i> Print</Btn>
            </div>
            <!-- <div class="printBtn" @click="delivery.reGenerateBarCode({ code: consignment_id })">
                <Btn class="btn-success btn-squire-md my-10"><i class="fa-solid fa-barcode mr-15"
                        style="font-size: 20px;font-weight: bolder;"></i> Regenerate Barcode</Btn>
            </div> -->
        </div>
        <!-- <div v-if="delivery.loading">
            <loader2></loader2>
        </div> -->
        <div id="invoicePage" class="d-flex-center">
            <div class="mb-20">
                <div class="mt-30 ">
                    <svg width="110" height="50" viewBox="0 0 279 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_512_4549)">
                            <path
                                d="M185.97 62.1901H155.551L140.242 83.3105H158.819L170.572 65.5834L182.494 83.3105H201.236L185.97 62.1901Z"
                                fill="#F0BA1B" />
                            <path
                                d="M184.575 47.2545L199.921 26.1341H182.329L170.986 42.6336L159.477 26.1341H141.144L156.133 47.2545H184.575Z"
                                fill="#F0BA1B" />
                            <path d="M221.293 62.1901H205.017V83.3105H221.293V62.1901Z" fill="#333333" />
                            <path d="M221.293 26.1341H205.017V47.2545H221.293V26.1341Z" fill="#333333" />
                            <path d="M227.456 26.7316V39.5524H245.132V47.2545H261.409V39.5524H279V26.7316H227.456Z"
                                fill="#333333" />
                            <path d="M261.408 62.1901H245.132V83.908H261.408V62.1901Z" fill="#333333" />
                            <path d="M164.471 53.0601H156.095V55.3942H164.471V53.0601Z" fill="#333333" />
                            <path d="M180.612 53.0601H172.236V55.3942H180.612V53.0601Z" fill="#333333" />
                            <path d="M196.752 53.0601H188.376V55.3942H196.752V53.0601Z" fill="#333333" />
                            <path d="M212.893 53.0601H204.517V55.3942H212.893V53.0601Z" fill="#333333" />
                            <path d="M229.033 53.0601H220.657V55.3942H229.033V53.0601Z" fill="#333333" />
                            <path d="M245.174 53.0601H236.798V55.3942H245.174V53.0601Z" fill="#333333" />
                            <path d="M261.315 53.0601H252.939V55.3942H261.315V53.0601Z" fill="#333333" />
                            <path
                                d="M130.805 45.5667C130.806 47.7091 131.342 48.7597 132.661 49.2067C133.992 49.6589 135.063 49.1878 136.38 47.5638V27.8981C135.745 27.3229 135.193 26.5991 134.462 26.1976C118.823 17.6212 103.16 9.08862 87.5148 0.52253C86.1945 -0.199622 85.0368 -0.161795 83.7209 0.559497C68.079 9.12903 52.4225 17.6702 36.759 26.1993C35.4777 26.8957 34.8582 27.8594 34.8988 29.3166C34.9438 31.0085 34.9084 32.703 34.9084 34.5238H33.255C24.103 34.5238 14.9518 34.5221 5.79977 34.5238C4.73212 34.5238 3.66101 34.4851 2.59682 34.5496C1.10783 34.6373 0.0721881 35.7085 0.004703 37.1236C-0.0645125 38.616 0.90364 39.805 2.4134 40.0234C2.8685 40.0887 3.34003 40.062 3.80464 40.062C13.6064 40.0638 23.4091 40.0638 33.2108 40.0638H34.7898V50.0346C29.6082 50.0346 24.5459 50.0028 19.4854 50.0699C18.6635 50.0793 17.7308 50.3673 17.0585 50.829C16.0869 51.497 15.9537 52.6378 16.3283 53.7116C16.7722 54.9882 17.7966 55.5685 19.1359 55.5711C23.8754 55.5771 28.6141 55.5745 33.3519 55.5745H34.7881V69.9797C27.331 69.9797 19.9916 69.978 12.6538 69.9797C12.1425 69.9815 11.626 69.9557 11.1233 70.0193C9.82206 70.1835 8.82882 71.2401 8.7224 72.5167C8.61944 73.7427 9.34793 74.9136 10.567 75.2987C11.1268 75.4758 11.7506 75.5076 12.3458 75.5094C19.3608 75.524 26.375 75.5188 33.3899 75.5188H34.9092C34.9092 77.3018 34.9724 78.8708 34.8928 80.4337C34.8071 82.1162 35.5149 83.1599 37.0013 83.9671C52.5549 92.412 68.0894 100.889 83.6075 109.4C85.0213 110.174 86.2239 110.21 87.6419 109.432C103.123 100.951 118.631 92.5212 134.104 84.0265C134.986 83.5424 135.628 82.6269 136.381 81.9107V68.0617C136.287 67.9053 136.196 67.7454 136.1 67.5889C135.283 66.271 134.171 65.7749 132.822 66.13C131.618 66.4446 130.826 67.5029 130.815 68.9533C130.789 72.1376 130.844 75.3228 130.767 78.5054C130.755 79.0118 130.362 79.7374 129.929 79.9755C116.413 87.4025 102.869 94.7831 89.3291 102.165C89.0972 102.293 88.8454 102.381 88.4336 102.56V101.071C88.4336 86.7182 88.4448 72.368 88.4094 58.0152C88.4059 57.0085 88.6957 56.4609 89.6059 55.9829C93.2129 54.0864 96.7697 52.097 100.35 50.1472C100.784 49.9125 101.238 49.7122 101.886 49.395C101.886 52.3481 101.886 55.0991 101.887 57.851C101.887 58.9119 101.826 59.9797 101.915 61.0337C102.1 63.2147 104.102 64.3736 106.052 63.3557C109.499 61.5529 112.895 59.653 116.301 57.7728C117.386 57.1753 117.753 56.1944 117.747 54.9831C117.723 50.6003 117.719 46.2149 117.766 41.8322C117.772 41.3292 118.017 40.5796 118.394 40.3672C122.414 38.0899 126.484 35.8994 130.806 33.5395V45.5667H130.805ZM82.854 101.705C82.854 101.931 82.828 102.158 82.8072 102.526C82.3669 102.323 81.9931 102.177 81.6444 101.987C68.2694 94.6945 54.8987 87.3956 41.5202 80.1088C40.8817 79.7606 40.456 79.4502 40.4569 78.5716C40.4941 63.9016 40.4828 49.2308 40.4854 34.5608C40.4854 34.3003 40.5191 34.0415 40.5468 33.6375C40.9967 33.855 41.3238 33.9951 41.6335 34.1645C55.0077 41.4599 68.3758 48.7622 81.7569 56.0439C82.4612 56.4257 82.8825 56.7756 82.8808 57.6929C82.8462 72.3637 82.8574 87.0337 82.854 101.705ZM86.2568 51.4867C85.9306 51.662 85.3336 51.6431 85.0005 51.4626C71.2595 43.9857 57.5323 36.4788 43.8043 28.9753C43.7654 28.9529 43.7368 28.9134 43.6131 28.7965C47.2071 26.8312 50.8349 24.9906 54.3034 22.8886C56.071 21.8183 57.3809 21.8853 59.1857 22.8869C71.8945 29.9382 84.6778 36.8588 97.4351 43.8224C97.8694 44.0588 98.289 44.3227 98.8471 44.652C94.5548 46.993 90.4184 49.2652 86.2568 51.4867ZM105.101 41.1719C104.692 41.3473 103.977 41.0584 103.501 40.7997C92.474 34.8041 81.4601 28.7853 70.4445 22.7691C67.8973 21.379 65.3485 19.9871 62.566 18.4671C64.1052 17.6246 65.409 16.8775 66.7536 16.2078C67.0062 16.0815 67.4708 16.1777 67.7494 16.3291C81.4541 23.799 95.1466 31.287 108.842 38.7733C108.881 38.794 108.909 38.8352 109.117 39.0356C107.699 39.811 106.445 40.5951 105.101 41.1719ZM112.162 49.916C112.162 54.162 111.84 54.5962 107.463 56.0809C107.463 52.9602 107.445 49.9701 107.485 46.9792C107.49 46.6439 107.741 46.1711 108.022 46C109.281 45.2443 110.592 44.5729 112.162 43.7218V49.916ZM115.727 35.3861C115.293 35.6131 114.474 35.4609 113.991 35.1996C105.025 30.35 96.0862 25.4591 87.1419 20.5751C82.4707 18.0252 77.7969 15.4762 73.0037 12.8601C73.3706 12.6168 73.6102 12.432 73.8724 12.2884C77.4889 10.3085 81.0959 8.31317 84.7401 6.38399C85.1839 6.14929 85.9513 6.06418 86.3623 6.28685C100.044 13.7061 113.7 21.1718 127.36 28.6323C127.438 28.6753 127.496 28.7552 127.68 28.9263C123.636 31.128 119.705 33.3056 115.727 35.3861Z"
                                fill="#333333" />
                            <path
                                d="M136.38 58.6447C136.185 58.8837 135.993 59.1236 135.797 59.3608C134.709 60.6736 132.825 60.8034 131.649 59.6488C130.489 58.5106 130.544 56.6923 131.771 55.622C133.002 54.5474 134.906 54.7932 135.885 56.1627C136.07 56.4224 136.216 56.7087 136.38 56.9829C136.38 57.5365 136.38 58.0911 136.38 58.6447Z"
                                fill="#333333" />
                        </g>
                        <defs>
                            <clipPath id="clip0_512_4549">
                                <rect width="279" height="110" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div class="my-5">
                    <div class="text-5-18">Merchant Info : </div>
                    <div class="text-gray-2 text-4-14">{{ delivery.deliveryDetails.merchant_info?.business_name }}</div>
                    <div class="text-gray-2 text-4-14">{{
                        delivery.deliveryDetails.merchant_info?.first_name + " "
                        + delivery.deliveryDetails.merchant_info?.last_name
                    }}</div>

                    <div class="text-gray-2 text-4-14">{{ delivery.deliveryDetails.merchant_info?.operator_number }}</div>
                </div>
                <div class="mb-5">
                    <div class="text-5-18">Shipped To : </div>
                    <div class="text-gray-2 text-4-14">{{ delivery.deliveryDetails.recipient_name }}</div>
                    <div class="text-gray-2 text-bold">{{ delivery.deliveryDetails.recipient_number }}</div>
                    <div class="text-gray-2 text-4-14">{{ delivery.deliveryDetails.recipient_email }}</div>
                    <div class="text-gray-2 text-4-14" style="width:200px">
                        {{ delivery.deliveryDetails.recipient_address }}</div>
                </div>
                <div class="mb-5">
                    <div class="text-5-18">Order summary : </div>
                    <div v-if="delivery.deliveryDetails.product?.name" class="text-gray-2 text-4-14">Item: {{
                        delivery.deliveryDetails.product?.name }}</div>
                    <div class="text-gray-2 text-4-14">Merchant Order ID: {{
                        delivery.deliveryDetails.merchant_order_id
                    }}
                    </div>
                    <div class="text-gray-2 text-4-14">Order Date: {{
                        delivery.deliveryDetails.created_at?.split(" ")[0].replace("/", "-").replace("/", "-")
                    }}</div>
                    <div class="text-gray-2 text-4-14">Total Receivable:
                        <span class="text-bold">{{ delivery.deliveryDetails.amount_to_be_collected }} Tk</span>
                    </div>
                </div>
                <div v-if="delivery.deliveryDetails.special_instruction" class="mb-10">
                    <div class="text-5-18">Special Instruction: </div>
                    <div class="text-gray-2 text-4-14">{{ delivery.deliveryDetails.special_instruction }}</div>
                </div>
                <div class="mb-20">
                    <BarcodeGenerator :value=delivery.deliveryDetails.consignment_id />
                    <!-- <canvas ref="barcodeCanvas"></canvas> -->
                    <!-- <img style="width:200px" :src=delivery.deliveryDetails.barcode_path alt="barcode" srcset=""> -->
                </div>
                <hr class="hr-line">
            </div>

        </div>
    </PageLayout>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch, onMounted } from "vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import { useRoute } from "vue-router";
import { useDeliveryStore } from "@/store/delivery/delivery";
import Btn from "@/components/form/Btn.vue";
// import loader2 from "@/components/loader/loader2.vue";
// import JsBarcode from 'jsbarcode';
import BarcodeGenerator from "../../../components/BarcodeGenerator/BarcodeGenerator.vue";
// const barcodeCanvas = ref(null);

const delivery = useDeliveryStore();
const route = useRoute();
const consignment_id = route.query.consignment_id;
delivery.getDeliveryDetails(route.params.id);

// onMounted(() => {
//     JsBarcode(barcodeCanvas.value, consignment_id);
// });
const printInvoice = () => {
    const prtHtml = document.getElementById('invoicePage').innerHTML;

    let stylesHtml = '';
    for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
        stylesHtml += node.outerHTML;
    }

    const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

    WinPrint.document.write(`<!DOCTYPE html>
<html>
  <head>
    ${stylesHtml}
  </head>
  <body>
    ${prtHtml}
  </body>
</html>`);


    setTimeout(() => {
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();

    }, 1000);
}




</script>

<style lang="scss" scoped>
canvas {
    width: 200px;
    height: 80px;
}

@media print {
    // body * {
    //     visibility: hidden;
    // }

    #invoicePage,
    #invoicePage * {
        visibility: visible;
    }

    #invoicePage {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }
}
</style>