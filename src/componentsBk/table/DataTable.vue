<template>
  <div class="data-table--main">
    <div
      class="data-table--container"
      :style="{ maxHeight: `${height}` }"
      ref="containerRef"
    >
      <table ref="tableRef" border="0" cellspacing="0" cellpadding="0">
        <thead ref="headerRef">
          <tr class="data-table--row-tr text-6-11-16">
            <td class="data-table--x-spacer">
              <div class="data-table--x-spacer"></div>
            </td>
            <td
              v-if="checkBox.field"
              :style="{
                width: checkBox.style ? checkBox.style.width : '',
                maxWidth: checkBox.style ? checkBox.style.maxWidth : '',
                minWidth: checkBox.style ? checkBox.style.minWidth : '',
              }"
            >
              <slot
                v-if="checkIfSlot(checkBox) != ''"
                :name="'header-' + checkIfSlot(checkBox)"
              />
              <div
                class="data-table--header-cell-checkbox"
                v-if="!slots['header-' + checkIfSlot(checkBox)]"
              >
                <input
                  type="checkbox"
                  v-model="headerCheckBox"
                  @change="hederCheckBoxAction()"
                />
              </div>
            </td>
            <td
              v-for="(headerItem, HeaderIndex) in headerData"
              :key="'header-' + HeaderIndex"
              :style="{
                width: headerItem.style.width,
                maxWidth: headerItem.style.maxWidth,
                minWidth: headerItem.style.minWidth,
              }"
            >
              <div class="data-table--header-cell">
                <div>
                  <slot
                    v-if="checkIfSlot(headerItem) != ''"
                    :name="'header-' + checkIfSlot(headerItem)"
                    :data="headerItem"
                  />
                  <div
                    class="data-table--header-cell-def"
                    v-if="!slots['header-' + checkIfSlot(headerItem)]"
                  >
                    {{ headerItem.title }}
                  </div>
                </div>
                <div
                  v-if="headerItem.sort"
                  class="data-table--header-cell-sort"
                  @click="sortColumn(headerItem, HeaderIndex)"
                >
                  <i
                    class="data-table--header-cell-sort-icon"
                    v-if="headerItem.sort == 'none'"
                  ></i>
                  <i
                    class="fas fa-sort-down data-table--header-cell-sort-icon"
                    v-if="headerItem.sort == 'asc'"
                  ></i>
                  <i
                    class="fas fa-sort-up data-table--header-cell-sort-icon"
                    v-if="headerItem.sort == 'dsc'"
                  ></i>
                </div>
              </div>
            </td>
            <td v-if="actionColumn" class="data-table--action-spacer">
              <div class="data-table--action-spacer"></div>
            </td>
            <td v-else class="data-table--x-spacer">
              <div class="data-table--x-spacer"></div>
            </td>
          </tr>
        </thead>
        <tbody v-if="tableData.length > 0">
          <tr
            v-for="(rowItem, rowInedx) in tableData"
            :key="'row-' + rowInedx"
            class="data-table--row-tr text-5-13-22"
          >
            <td class="data-table--x-spacer">
              <div class="data-table--x-spacer"></div>
            </td>
            <td
              v-if="checkBox.field"
              :style="{
                width: checkBox.style ? checkBox.style.width : '',
                maxWidth: checkBox.style ? checkBox.style.maxWidth : '',
                minWidth: checkBox.style ? checkBox.style.minWidth : '',
              }"
            >
              <div class="data-table--body-cell-checkbox">
                <input
                  type="checkbox"
                  v-model="rowItem[checkBox.field]"
                  @change="bodyCheckBox()"
                />
              </div>
            </td>
            <td
              v-for="(cellItem, cellIndex) in headerData"
              :key="'cell-' + cellIndex"
              :style="{
                width: cellItem.style.width,
                maxWidth: cellItem.style.maxWidth,
                minWidth: cellItem.style.minWidth,
              }"
            >
              <slot
                v-if="checkIfSlot(cellItem) != ''"
                :name="checkIfSlot(cellItem)"
                :data="rowItem"
                :index="rowInedx"
              />
              <div
                class="data-table--body-cell-def"
                v-if="!slots[checkIfSlot(cellItem)]"
              >
                {{ getData(rowItem, cellItem.field) }}
              </div>
            </td>
            <td
              class="data-table--cell-action data-table--action-spacer"
              v-if="actionColumn"
            >
              <div
                class="data-table--cell-action-container"
                @click="loadAction($event, rowInedx)"
              >
                <div class="data-table--cell-action-title">...</div>
              </div>
            </td>
            <td v-else class="data-table--x-spacer">
              <div class="data-table--x-spacer"></div>
            </td>
          </tr>
          <tr></tr>
        </tbody>
        <tbody v-else>
          <tr
            :style="{
              height:
                height == 'auto'
                  ? '100px'
                  : `${clearNumber(height) - headerHeight - scrollHeight}px`,
            }"
          ></tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="onLoading"
      class="data-table--no-item"
      :style="{
        top: `${headerHeight - 2}px`,
        right: `${scrollWidth}px`,
        bottom: `${scrollHeight}px`,
      }"
    >
      <loaderVue></loaderVue>
    </div>
    <div class="mt-20">
      <ResultPerPage></ResultPerPage>
      <Pagination></Pagination>
    </div>
    <!-- <div class="data-table--loader-animation" v-if="onLoading" :style="{top:`${headerHeight}px`, right:`${scrollWidth}px`}">
            <div class="data-table--loader-animation-content"></div>
        </div> -->
    <div
      v-if="tableData.length === 0 && !onLoading"
      class="data-table--no-item"
      :style="{
        top: `${headerHeight - 2}px`,
        right: `${scrollWidth}px`,
        bottom: `${scrollHeight}px`,
      }"
    >
      No item to show.
    </div>
    <div
      class="data-table--cell-action-option-container"
      v-for="(actionItem, actionInedx) in tableData"
      :id="'action_' + tableId + '_' + actionInedx"
      :key="'action-' + actionInedx"
    >
      <slot
        name="table-action"
        :data="actionItem"
        :closeAllAction="closeAllAction"
      />
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  computed,
  useSlots,
  nextTick,
  reactive,
  watch,
} from "vue";
import {
  cloneDeep,
  clearNumber,
  getTargetParent,
  randomString,
} from "@/functions/com.js";
import loaderVue from "../loader/loader.vue";
import ResultPerPage from "../navigation/ResultPerPage.vue";
import Pagination from "../navigation/Pagination.vue";
const props = defineProps({
  headerData: {
    type: Array,
    default: () => {
      return [];
    },
  },
  tableData: {
    type: Array,
    default: () => {
      return [];
    },
  },
  checkBox: {
    type: Object,
    default: () => {
      return {};
    },
  },
  onLoading: { type: Boolean, default: false },
  height: { type: String, default: "auto" },
  actionColumn: { type: Boolean, default: false },
});
const slots = useSlots();
const emit = defineEmits(["sort"]);

const containerRef = ref();
const headerRef = ref();
const tableRef = ref();

const headerCheckBox = ref();
const headerHeight = ref();
const scrollWidth = ref(0);
const scrollHeight = ref(0);

const tableId = ref(randomString(50, "0123456789abcdefghijklmnopqrstuvwxyz"));

const actionMonitor = reactive({
  elPosition: {},
  interv: null,
  loaded: false,
  timeCount: 0,
});

onMounted(() => {
  headerHeight.value = headerRef.value.clientHeight;
  const resizeObserver = new ResizeObserver((entries) => {
    if (containerRef.value) {
      scrollWidth.value =
        containerRef.value.offsetWidth - containerRef.value.clientWidth;
      scrollHeight.value =
        containerRef.value.offsetHeight - containerRef.value.clientHeight;
    }
  });
  resizeObserver.observe(containerRef.value);
  document.addEventListener("click", tableDocClicked);
});
/**
 * checkIfSlot
 * Check and return slot name
 */
const checkIfSlot = (data) => {
  if (data.slotName) {
    return data.slotName;
  } else if (data.field) {
    return data.field;
  }
  return "";
};
/**
 * getData
 * Use key and data to generate cell value.
 */
const getData = (source, key) => {
  if (key.includes(".")) {
    let clonedSource = cloneDeep(source);
    let keyArr = key.split(".");
    for (let item of keyArr) {
      if (!clonedSource.hasOwnProperty(item)) {
        return "";
      }
      clonedSource = clonedSource[item];
    }
    return clonedSource;
  } else {
    return source[key];
  }
};
/**
 * sortColumn
 * Sorting column and trigger event
 */
const sortColumn = (headerItem, index) => {
  let sort = "none";
  if (headerItem.sort == "none") {
    sort = "asc";
  } else if (headerItem.sort == "asc") {
    sort = "dsc";
  } else if (headerItem.sort == "dsc") {
    sort = "none";
  }
  emit("sort", { data: headerItem, index, sort });
};

////////////////////// CHECKBOX
/**
 * hederCheckBoxAction
 * Select unselect all checkbox in table body
 */
const hederCheckBoxAction = () => {
  props.tableData.map((item) => {
    item[props.checkBox.field] = headerCheckBox.value;
  });
};
/**
 * bodyCheckBox
 * Select unselect all checkbox in table body
 */
const bodyCheckBox = () => {
  let allTure = true;
  props.tableData.map((item) => {
    if (item[props.checkBox.field] === false) {
      allTure = null;
    }
  });
  if (allTure === true) {
    headerCheckBox.value = true;
    return;
  }
  headerCheckBox.value = false;
};
const loadAction = async (e, index) => {
  closeAllAction();
  if (actionMonitor.loaded === false) {
    actionMonitor.timeCount = 0;
    actionMonitor.loaded = true;
    let el = getTargetParent(e.target, "data-table--cell-action-container");
    let floatingEl = document.getElementById(
      "action_" + tableId.value + "_" + index
    );
    let elPosition = el.getBoundingClientRect();
    let winWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    actionMonitor.elPosition = elPosition;

    floatingEl.style.display = "block";
    floatingEl.style.top = elPosition.top + elPosition.height / 2 + "px";
    floatingEl.style.right =
      winWidth - elPosition.right + elPosition.width / 2 + "px";

    await nextTick();
    floatingEl.style.opacity = 1;

    actionMonitor.interv = setInterval(() => {
      actionMonitor.timeCount = actionMonitor.timeCount + 50;
      let elPosition = getTargetParent(
        e.target,
        "data-table--cell-action-container"
      ).getBoundingClientRect();
      if (
        elPosition.top != actionMonitor.elPosition.top ||
        elPosition.left != actionMonitor.elPosition.left
      ) {
        clearInterval(actionMonitor.interv);
        closeAllAction();
      }
    }, 50);
  }
};
const tableDocClicked = (e) => {
  if (
    e.target.closest(
      ".data-table--cell-action-option-container, .data-table--cell-action-container, .data-table--cell-action"
    ) == null
  ) {
    closeAllAction();
  } else if (actionMonitor.loaded === true && actionMonitor.timeCount > 500) {
    //closeAllAction()
  }
};
const closeAllAction = () => {
  let els = document.getElementsByClassName(
    "data-table--cell-action-option-container"
  );
  for (let item of els) {
    item.style.display = "none";
    item.style.opacity = 0;
  }
  clearInterval(actionMonitor.interv);
  actionMonitor.loaded = false;
};
</script>