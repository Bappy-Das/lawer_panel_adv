<template>
    <div class="tracking-">
        <div class="wrapper" :style="{ maxHeight: `${height}` }">
            <div class="center-line">
            </div>
            <div class="row row-2" v-for="(trackingItem, Index) in delivery.trackingData" :key="Index">
                <section>
                    <div class="date">
                        <p class="action-date">{{ trackingItem.created_at.split(" ")[0].replace("/", "-").replace("/", "-")
                        }}</p>
                        <p class="time">
                            {{ trackingItem.created_at.split(" ")[1] + " " + trackingItem.created_at.split(" ")[2] }}
                        </p>
                    </div>
                    <div class="icon-group">
                        <i class="icon fa-solid fa-circle-check"></i>
                    </div>
                    <div class="description">
                        <p>
                            {{ trackingItem.description }}
                        </p>
                        <p v-if="trackingItem.notes" class="text-4-12 text-gray-1" style="text-transform: capitalize;">( {{
                            trackingItem.notes }} )</p>
                    </div>
                </section>
            </div>


        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch } from "vue";
import { useDeliveryStore } from "@/store/delivery/delivery";
const props = defineProps({
    trackingdata: { type: Array, default: () => { return [] } },
    height: { type: String, default: '500' },
})
// console.log(trackingdata)
const delivery = useDeliveryStore();
// delivery.trackingDetails(route.params.id);
</script>
  
<style lang="scss" scoped>
.wrapper {
    //   margin: 20px auto;
    padding: 0 20px;
    position: relative;
    margin-bottom: 30px;
    max-height: 600px;
    overflow-y: scroll;
}

.wrapper .center-line {
    position: absolute;
    height: calc(100vh - 500px);
    width: 4px;
    background: var(--gray-5);
    // left: 50%;
    left: 308px;
    top: 20px;
    margin: auto;
    transform: translateX(-50%);
}

.wrapper .row {
    display: flex;
}

.wrapper .row-2 {
    justify-content: flex-end;
    bottom: 20px;
}

.wrapper .row section {
    width: calc(50% - 40px);
    padding: 15px;
    position: relative;
    margin-top: 10px;
}

.row section .icon,
.center-line .scroll-icon {
    position: absolute;
    left: -200px;
    background: #f2f2f2;
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    color: var(--primary);
    font-size: 17px;
    box-shadow: 0 0 0 4px #fff, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05);
}

.center-line {
    // position: absolute;
    bottom: 0px;
    left: 50%;
    // left: 308px;
    height: 100%;
    font-size: 25px;
    transform: translateX(-50%);
}

.row-2 section .icon {
    top: 10px;
    left: -60px;
}

.icon-group {
    position: absolute;
    left: -60px;
}

.row section .date {
    position: absolute;
    display: inline-block;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 1;
    left: -300px;
    top: 30px;
    // left: -170px;
    color: var(--gray-2);
}

@media(max-width: 769px) {
    .wrapper .row section {
        width: 100%;
        // width: calc(100% - 40px);
        padding: 10px;
        position: relative;
        margin-top: 5px;
    }

    .wrapper .center-line {
        display: none;
    }

    .wrapper .row {
        display: inline;
        // padding: 50px;
        left: 40px;
    }

    .row section .date {
        position: relative;
        display: flex;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
        z-index: 1;
        left: 40px;
        color: var(--gray-2);

        .time {
            margin-left: 10px;
        }
    }

    .row-2 section .icon {
        top: 10px;
        left: 0px;
    }

    .row section .description {
        position: relative;
        display: inline-block;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
        z-index: 1;
        left: 40px;
        color: var(--gray-2);
    }
}</style>