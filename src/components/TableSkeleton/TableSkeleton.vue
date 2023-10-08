<template>
    <div class="tb-body">
        <table class="tg">
            <tr v-for="(item, index) in 8">
                <th class="tg-cly1">
                    <div class="line-td"></div>
                </th>
                <th class="tg-cly1">
                    <div class="line-td"></div>
                </th>
                <th class="tg-cly1">
                    <div class="line-td"></div>
                </th>
                <th class="tg-cly1">
                    <div class="line-td"></div>
                </th>
                <th class="tg-cly1">
                    <div class="line-td"></div>
                </th>
                <th class="tg-cly1">
                    <div class="line-td"></div>
                </th>
                <th class="tg-cly1">
                    <div class="line-td"></div>
                </th>
                <th class="tg-cly1">
                    <div class="line-td"></div>
                </th>
            </tr>
        </table>
    </div>
</template>
<style lang="css" >
.tb-body {
    margin: auto;
    background-color: #FFFFF5;
    border-radius: 10px;
    border: 3px solid var(--primary);
}

.tg {
    border-collapse: collapse;
    border-spacing: 0;
    border-color: #ccc;
    width: 100%;
    border-radius: 20%;
    /* background-color: var(--primary); */

}

.tg td {
    font-family: Arial, sans-serif;
    font-size: 14px;
    padding: 5px;
    border-style: solid;
    border-width: 0px;
    overflow: hidden;
    word-break: normal;
    border-color: #ccc;
    color: #333;
    /* background-color: #fff; */

}

.tg th {
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    padding: 10px 5px;
    border-style: solid;
    border-width: 0px;
    overflow: hidden;
    word-break: normal;
    border-color: #ccc;
    color: #333;
    /* background-color: #f0f0f0; */
}

.line-td {
    float: left;
    width: 90%;
    height: 40px;
    border-radius: 7px;
    background-image: linear-gradient(90deg, #efefef 0px, #FFFFFF 40px, #efefef 80px);
    /* background-image: linear-gradient(90deg, #efefef 0px, rgba(229, 229, 229, 0.8) 40px, #efefef 80px); */
    background-size: 600px;
    animation: shine-lines 2s infinite ease-out;
}

@keyframes shine-lines {
    0% {
        background-position: -100px;
    }

    40%,
    100% {
        background-position: 140px;
    }
}
</style>