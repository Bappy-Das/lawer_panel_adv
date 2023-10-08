<template>
    <PageLayout>
        <div v-if="auth.loading">
            <loader2></loader2>
        </div>

        <div v-else class="input-group-container col-wrap">
            <div class="input-container col-3 col-12-md">
                <div class="text-center">
                    <img style="width:50%" :src=auth.userData.profile_pic_public_url alt="" srcset="">
                </div>
                <div class="my-20 text-center">
                    <div class="my-10">
                        {{
                            auth.userData.name ? auth.userData.name : auth.userData.first_name + " " + auth.userData.last_name
                        }}
                    </div>
                    <div>{{ auth.userData.email }}</div>
                </div>
            </div>
            <div class="input-container col-7 col-12-md">
                <div class="personal-info w-50 mb-10"
                    style="background: linear-gradient(90.21deg, #C9FFF8 -4.86%, rgba(171, 255, 250, 0) 94.09%);; border-radius:10px ;">
                    <div class="px-20 py-30">
                        <div class="text-6-14 text-success">Personal Information</div>
                        <div class="text-5-12 text-gray-2 mt-10">
                            Name :
                            {{
                                auth.userData.name ? auth.userData.name : auth.userData.first_name + " " +
                            auth.userData.last_name
                            }}
                        </div>
                        <div class="text-5-12 text-gray-2 mt-5">Email : {{ auth.userData.email }}</div>
                        <div class="text-5-12 text-gray-2 mt-5">Mobile : {{ auth.userData.contact }}</div>
                        <div class="text-5-12 text-gray-2 mt-5">Address : {{ auth.userData.address }}</div>
                        <div class="text-5-12 text-gray-2 mt-5">User Role : {{ auth.userData.user_role }}</div>
                        <div class="text-5-12 text-gray-2 mt-5">Department : {{ auth.userData.department }}</div>
                        <div class="text-5-12 text-gray-2 mt-5">Employee ID : {{ auth.userData.employee_id }}</div>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
</template>
<script setup>
import PageLayout from "@/components/layout/PageLayout.vue";
// import cssLoader from "@/components/loader/cssLoader.vue";
import loader2 from "@/components/loader/loader2.vue";
import { useAuthStore } from "@/store/auth/auth";
const auth = useAuthStore();
auth.getUserByID();

</script>

<style lang="scss" scoped>
.profile {
    &-sidebar {
        margin-top: 10px;

        & h2 {
            padding: 6px 8px 6px 0px;
            color: var(--gray-3);
            display: block;
            cursor: pointer;

            &:hover {
                color: var(--primary);
            }
        }
    }
}
</style>