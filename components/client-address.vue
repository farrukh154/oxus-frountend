<template>
    <v-select
        v-model="region"
        :items="regions"
        item-title="name"
        item-value="id"
        label="Вилоят"
        clearable
        variant="outlined"
        :rules="rules"
    />
    <v-select
        v-model="town"
        :items="filteredTowns"
        item-title="name"
        item-value="id"
        label="Шаҳр"
        clearable
        variant="outlined"
        :rules="rules"
    />
    <v-select
        v-model="district"
        :items="filteredDistricts"
        item-title="name"
        item-value="id"
        label="Ноҳия"
        clearable
        variant="outlined"
        :rules="rules"
    />
</template>

<script setup>
import ApiFactory from "~/factories/api-factory";
const apiClient = ApiFactory.build();

const regions = ref([]);
const towns = ref([]);
const districts = ref([]);
const region = ref();
const town = ref();
const props = defineProps(["modelValue", "rules"]);
const emit = defineEmits(["update:modelValue"]);

onMounted(async () => {
    let res = await apiClient.get("/division/regions?per_page=1000");
    regions.value = res.regions;
    res = await apiClient.get("/division/towns?per_page=1000");
    towns.value = res.towns;
    res = await apiClient.get("/division/districts?per_page=1000");
    districts.value = res.districts;
    if (props.modelValue) {
        town.value = districts.value.find(
            (d) => d.id === props.modelValue,
        ).town;
        region.value = towns.value.find((t) => t.id === town.value).region;
    }
});

const district = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

const filteredTowns = computed(() => {
    if (region.value) {
        return towns.value.filter((t) => t.region === region.value);
    }
    return [];
});

const filteredDistricts = computed(() => {
    if (town.value) {
        return districts.value.filter((t) => t.town === town.value);
    }
    return [];
});

watch(
    () => region.value,
    (curr, prev) => {
        if (
            region.value !==
            towns.value.find((ts) => ts.id === town.value)?.region
        ) {
            town.value = "";
        }
    },
);
watch(
    () => town.value,
    (curr, prev) => {
        if (
            town.value !==
            districts.value.find((ds) => ds.id === district.value)?.town
        ) {
            district.value = "";
        }
    },
);
</script>
