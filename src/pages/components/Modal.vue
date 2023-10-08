<template>
  <PageLayout :header="useRoute().meta.pageTitle">
    <div @click="check()" class="pb-10 cursor-pointer">Check Function</div>
    <div
      @click="modalToggle = !modalToggle"
      class="cursor-pointer pa-10 bg-primary text-white no-text-select d-inline-block mb-20"
    >
      Modal Toggle
    </div>
    <div>
      <Modal
        title="Modal title"
        v-if="modalToggle"
        @closeModal="modalToggle = false"
      >
        <div class="modal-body">Modal content</div>
      </Modal>
    </div>
    <div
      @click="custonHeaderModalToggle = !custonHeaderModalToggle"
      class="cursor-pointer pa-10 bg-primary text-white no-text-select d-inline-block mb-20"
    >
      Custom Header Modal Toggle
    </div>
    <div>
      <Modal
        title="Modal title"
        v-if="custonHeaderModalToggle"
        @closeModal="custonHeaderModalToggle = false"
      >
        <template v-slot:header
          ><div class="pa-30">Custom Header Modal</div></template
        >
        <div class="modal-body">Modal content</div>
      </Modal>
    </div>
    <div
      @click="noHeaderModalToggle = !noHeaderModalToggle"
      class="cursor-pointer pa-10 bg-primary text-white no-text-select d-inline-block mb-20"
    >
      No Header Modal Toggle
    </div>
    <div>
      <Modal
        title="Modal title"
        noHeader
        v-if="noHeaderModalToggle"
        @closeModal="noHeaderModalToggle = false"
      >
        <div class="modal-body pt-40">Modal content</div>
      </Modal>
    </div>
    <div class="border-grey-b1 text-h3 mt-20 mb-10 py-5">Slot</div>
    <div>
      <strong>header:</strong> for cutom header.<br />
      <strong>default:</strong> For body
    </div>
    <div class="border-grey-1 mt-20 mb-10 py-5">Props</div>
    <div>
      <strong>title:</strong> Header title.<br />
      <strong>width:</strong> modal width.<br />
      <strong>noHeader:</strong> Header will be hidden.
    </div>
    <div class="border-grey-b1 text-h3 mt-20 mb-10 py-5">Events</div>
    <div></div>
  </PageLayout>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import PageLayout from "@/components/layout/PageLayout.vue";
import Modal from "@/components/pop/Modal.vue";

const modalToggle = ref(false);
const custonHeaderModalToggle = ref(false);
const noHeaderModalToggle = ref(false);

const check = (e) => {};
</script>