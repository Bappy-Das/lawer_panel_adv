<template>
    <div class="pagination--container">
        <div class="pagination--btn" v-for="(item, index) in paginationData.links" :key="index">
            <div :class="['pagination--btn-nav', { 'pagination--btn-nav-disable': !item.active }]"
                v-if="item.label.indexOf('laquo') !== -1" @click="loadPage()"> {{ '<' }} </div>
                    <div :class="['pagination--btn-nav', { 'pagination--btn-nav-disable': !item.active }]"
                        v-else-if="item.label.indexOf('raquo') !== -1" @click="loadPage()">{{ '>' }}</div>
                    <div :class="['pagination--btn-page', { 'pagination--btn-page-active': Number(item.label) === Number(paginationData.current_page) }]"
                        v-else @click="loadPage(item)">{{ item.label }}</div>
            </div>
        </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, nextTick } from 'vue';
const props = defineProps({
    paginationData: {
        type: Object, default: () => {
            return { links: [] }
        }
    }
})

const loadPage = (item) => {
    // console.log(item.label , props.paginationData.current_page)
}

</script>
