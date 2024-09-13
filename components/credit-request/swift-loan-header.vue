<template>
    <v-sheet
        class="mx-auto mb-7 mt-1"
        style="text-align: center"
        elevation="10"
        height="40"
    >
        <h2 class="text-h6 mb-4" style="font-weight: 550">
            Swift Loan Платформа - {{ headerRole }}
        </h2>
    </v-sheet>
</template>

<script setup>
import ApiFactory from "~/factories/api-factory";
import { user } from "~/utils/auth-data";

const apiClient = ApiFactory.build();
const headerRole = shallowRef();

onMounted(async () => {
    const res = await apiClient.options("/users/users");
    headerRole.value = res.properties.swift_loan_role.choices.find(
        (s) => s.value === user.value.swift_loan_role,
    ).display_name;
});
</script>
