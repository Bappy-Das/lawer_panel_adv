<template>
    <PageLayout header="Delivery Management">
        <div class="d-flex-center flex-column pa-60">
            <div class="fw-400 font-40 pb-30">Thank You</div>
            <router-link :to="{ name: 'deliveries' }">
                <Btn class="btn-primary btn-squire-md">Back To Deliveries</Btn>
            </router-link>
        </div>
    </PageLayout>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch } from "vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import Btn from "@/components/form/Btn.vue";
</script>

<style lang="scss" scoped>

</style>