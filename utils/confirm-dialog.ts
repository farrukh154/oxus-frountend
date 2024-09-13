import {ref} from 'vue'
export const confirmData = ref({})

const defaultParameters = {
    title: 'Подтверждение',
    body: 'Вы действтиельно хотите это выполнить действие?',
    cancelButtonText: 'Отмена',
    confirmButtonText: 'Ok',
    onCancel: () => {},
    onConfirm: () => {},
}

export function confirmDialog(properties: {}) {
    confirmData.value = {...defaultParameters, ...properties, ...{show: true}};
}