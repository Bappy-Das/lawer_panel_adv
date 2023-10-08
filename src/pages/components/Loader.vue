<template>
    <Loader/>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import PageLayout from "@/components/layout/PageLayout.vue";
import Modal from "@/components/pop/Modal.vue";
import Loader from "../../components/loader/loader.vue";

</script>