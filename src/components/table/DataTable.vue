<template>
    <div class="data-table--main">
        <div class="data-table--container" :style="{ maxHeight: `${height}` }" ref="containerRef">
            <table ref="tableRef" cellspacing="0" cellpadding="0">
                <thead ref="headerRef">
                    <tr>
                        <td class="data-table--x-spacer">
                            <div class="data-table--x-spacer"></div>
                        </td>
                        <td v-if="checkBox.field" :style="checkBox.style">
                            <slot v-if="checkIfSlot(checkBox) != ''" :name="'header-' + checkIfSlot(checkBox)" />
                            <div class="data-table--header-cell-checkbox" v-if="!slots['header-' + checkIfSlot(checkBox)]">
                                <input type="checkbox" class="site-checkbox" v-model="headerCheckBox"
                                    @change="hederCheckBoxAction()" />
                            </div>
                        </td>
                        <td v-for="(headerItem, HeaderIndex) in headerData" :key="'header-' + HeaderIndex"
                            :style="headerItem.style">
                            <div class="data-table--header-cell">
                                <div>
                                    <slot v-if="checkIfSlot(headerItem) != ''" :name="'header-' + checkIfSlot(headerItem)"
                                        :data="headerItem" />
                                    <div class="data-table--header-cell-def"
                                        v-if="!slots['header-' + checkIfSlot(headerItem)]">{{ headerItem.title }}</div>
                                </div>
                                <div v-if="headerItem.sort" class="data-table--header-cell-sort"
                                    @click="sortColumn(headerItem, HeaderIndex)">
                                    <i class="data-table--header-cell-sort-icon" v-if="headerItem.sort == 'none'"></i>
                                    <i class="fas fa-sort-down data-table--header-cell-sort-icon"
                                        v-if="headerItem.sort == 'asc'"></i>
                                    <i class="fas fa-sort-up data-table--header-cell-sort-icon"
                                        v-if="headerItem.sort == 'dsc'"></i>
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
                    <tr v-for="(rowItem, rowInedx) in tableData" :key="'row-' + rowInedx" class="data-table--row-tr">
                        <td class="data-table--x-spacer">
                            <div class="data-table--x-spacer"></div>
                        </td>
                        <td v-if="checkBox.field" :style="checkBox.style">
                            <div class="data-table--body-cell-checkbox">
                                <input type="checkbox" class="site-checkbox" v-model="rowItem[checkBox.field]"
                                    @change="bodyCheckBox()" />
                            </div>
                        </td>
                        <td v-for="(cellItem, cellIndex) in headerData" :key="'cell-' + cellIndex" :style="cellItem.style">
                            <slot v-if="checkIfSlot(cellItem) != ''" :name="checkIfSlot(cellItem)" :data="rowItem"
                                :rowIndex="rowInedx" />
                            <div class="data-table--body-cell-def" v-if="!slots[checkIfSlot(cellItem)]">
                                {{ getData(rowItem, cellItem.field) }}</div>
                        </td>
                        <td class="data-table--cell-action data-table--action-spacer" v-if="actionColumn">
                            <div class="data-table--cell-action-container" @mouseup="loadAction($event, rowInedx)">
                                <div class="data-table--cell-action-title">...</div>
                            </div>
                        </td>
                        <td v-else class="data-table--x-spacer">
                            <div class="data-table--x-spacer"></div>
                        </td>
                    </tr>
                    <slot name="last-row" />
                </tbody>
                <tbody v-else>
                    <tr
                        :style="{ height: height == 'auto' ? '100px' : `${clearNumber(height) - headerHeight - scrollHeight}px` }">
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="data-table--loader-animation" v-if="onLoading"
            :style="{ top: `${headerHeight}px`, right: `${scrollWidth}px` }">
            <div class="data-table--loader-animation-content"></div>
        </div>
        <div v-if="tableData.length === 0" class="data-table--no-item"
            :style="{ top: `${headerHeight - 2}px`, right: `${scrollWidth}px`, bottom: `${scrollHeight}px` }">
            No item to show.
        </div>
        <div class="data-table--cell-action-option-container" v-for="(actionItem, actionInedx) in tableData"
            :id="'action_' + tableId + '_' + actionInedx" :key="'action-' + actionInedx">
            <slot :name="'table-action'" :data="actionItem" :closeAllAction="closeAllAction" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, useSlots, nextTick, reactive, watch } from 'vue';
import { cloneDeep, clearNumber, getTargetParent, randomString } from '@/functions/com.js'
const props = defineProps({
    headerData: { type: Array, default: () => { return [] } },
    tableData: { type: Array, default: () => { return [] } },
    checkBox: { type: Object, default: () => { return {} } },
    onLoading: { type: Boolean, default: false },
    height: { type: String, default: 'auto' },
    actionColumn: { type: Boolean, default: false },
})
const slots = useSlots();
const emit = defineEmits(['sort', 'onSelected']);

const containerRef = ref();
const headerRef = ref();
const tableRef = ref();

const headerCheckBox = ref();
const headerHeight = ref();
const scrollWidth = ref(0);
const scrollHeight = ref(0);
const actionOpenIndex = ref(null);

const tableId = ref(randomString(50, '0123456789abcdefghijklmnopqrstuvwxyz'))

const actionMonitor = reactive({
    elPosition: {},
    interv: null,
    loaded: false,
    timeCount: 0,

})

onMounted(() => {
    headerHeight.value = headerRef.value.offsetHeight;
    const resizeObserver = new ResizeObserver(entries => {
        if (containerRef.value) {
            scrollWidth.value = containerRef.value.offsetWidth - containerRef.value.clientWidth
            scrollHeight.value = containerRef.value.offsetHeight - containerRef.value.clientHeight
        }
    })
    resizeObserver.observe(containerRef.value);
})
/**
 * checkIfSlot
 * Check and return slot name
 */
const checkIfSlot = (data) => {
    if (data.slotName) {
        return data.slotName
    } else if (data.field) {
        return data.field
    }
    return '';
}
/**
 * getData
 * Use key and data to generate cell value.
 */
const getData = (source, key) => {
    if (key.includes(".")) {
        let clonedSource = cloneDeep(source)
        let keyArr = key.split('.');
        for (let item of keyArr) {
            if (!clonedSource.hasOwnProperty(item)) { return '' }
            clonedSource = clonedSource[item]
        }
        return clonedSource;
    } else {
        return source[key];
    }
}
/**
 * sortColumn
 * Sorting column and trigger event
 */
const sortColumn = (headerItem, index) => {
    let sort = 'none';
    if (headerItem.sort == 'none') {
        sort = 'asc'
    } else if (headerItem.sort == 'asc') {
        sort = 'dsc'
    } else if (headerItem.sort == 'dsc') {
        sort = 'none'
    }
    emit('sort', { data: headerItem, index, sort });
}

////////////////////// CHECKBOX
/**
 * hederCheckBoxAction
 * Select unselect all checkbox in table body
*/
const hederCheckBoxAction = () => {
    props.tableData.map((item) => {
        item[props.checkBox.field] = headerCheckBox.value;
    })
};
/**
 * bodyCheckBox
 * Select unselect all checkbox in table body
*/
const bodyCheckBox = () => {
    let allTure = true;
    props.tableData.map((item) => {
        if (item[props.checkBox.field] === false) { allTure = null }
    })
    if (allTure === true) { headerCheckBox.value = true; return }
    headerCheckBox.value = false;

}
const loadAction = async (e, index) => {

    if (actionOpenIndex.value != index) { closeAllAction() }
    if (actionMonitor.loaded === false) {
        actionOpenIndex.value = index;
        closeAllAction()
        actionMonitor.timeCount = 0;
        actionMonitor.loaded = true;
        let el = getTargetParent(e.target, 'data-table--cell-action-container');
        let floatingEl = document.getElementById('action_' + tableId.value + '_' + index);
        let elPosition = el.getBoundingClientRect();
        let winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let bodyHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);

        actionMonitor.elPosition = elPosition;

        // floatingEl.style.display = 'block';
        // floatingEl.style.top = (elPosition.top + (elPosition.height / 2)) + 'px';
        // floatingEl.style.right = (winWidth - elPosition.right + elPosition.width / 2) + 'px';
        // console.log('bottom', bodyHeight - elPosition.bottom)
        if (bodyHeight - elPosition.bottom > elPosition.height) {
            // console.log('fd')

            floatingEl.style.display = 'block';
            floatingEl.style.top = (elPosition.top + (elPosition.height / 2)) + 'px';
            floatingEl.style.right = (winWidth - elPosition.right + elPosition.width / 2) + 'px';
            // console.log('bottom', bodyHeight - elPosition.bottom)
            // console.log('elPosition.height', elPosition.height)
        } else {
            floatingEl.style.display = 'block';
            floatingEl.style.right = (winWidth - elPosition.right + elPosition.width / 2) + 'px';
            floatingEl.style.bottom = (Math.abs(bodyHeight - elPosition.bottom) + 10) + 'px';
            // console.log('bottom', bodyHeight - elPosition.bottom)
            // console.log('elPosition.height', elPosition.height)
        }

        await nextTick();
        floatingEl.style.opacity = 1;

        document.addEventListener('click', tableDocClicked)
        actionMonitor.interv = setInterval(() => {
            actionMonitor.timeCount = actionMonitor.timeCount + 50;
            let elPosition = getTargetParent(e.target, 'data-table--cell-action-container').getBoundingClientRect();
            if (Math.abs(elPosition.top - actionMonitor.elPosition.top) > 2 || Math.abs(elPosition.left - actionMonitor.elPosition.left) > 2) {
                clearInterval(actionMonitor.interv);
                closeAllAction()
            }
        }, 50)
    } else {
        closeAllAction()
    }
}
const tableDocClicked = (e) => {
    if (e.target.closest('.data-table--cell-action-option-container, .data-table--cell-action-container, .data-table--cell-action') == null) {
        closeAllAction();
    } else if (actionMonitor.loaded === true && actionMonitor.timeCount > 500) {
        //closeAllAction()
    }
}
const closeAllAction = () => {
    let els = document.getElementsByClassName('data-table--cell-action-option-container');
    for (let item of els) {
        item.style.display = 'none';
        item.style.opacity = 0;
    }
    clearInterval(actionMonitor.interv);
    document.removeEventListener('click', tableDocClicked)
    actionMonitor.loaded = false;
}
</script>