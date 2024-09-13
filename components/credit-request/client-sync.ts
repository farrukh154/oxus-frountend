import {DataSource} from '~/dataSource/dataSource'
import ApiFactory from '~/factories/api-factory'
const apiClient = ApiFactory.build()

const clientFormData = ref()

export async function clientSync(clientData: any) {
  clientFormData.value = undefined
  const client = await apiClient.get(`/customer/customers?filter{client_ID}=${clientData.client_id}`)
  clientFormData.value = new DataSource('customers', client.customers?.[0]?.id)
  await clientFormData.value.init()

  clientFormData.value.fields.name.value = clientData.name
  clientFormData.value.fields.passport.value = clientData.passport
  clientFormData.value.fields.INN.value = clientData.inn
  clientFormData.value.fields.birthday.value = clientData.birthday
  clientFormData.value.fields.gender.value = clientData.gender ? 'female' : 'male'
  clientFormData.value.fields.address_street.value = clientData.address_street
  clientFormData.value.fields.phone1.value = clientData.phone1
  clientFormData.value.fields.phone2.value = clientData.phone2
  clientFormData.value.fields.phone3.value = clientData.phone3
  clientFormData.value.fields.passport_details.value = clientData.passport_details
  clientFormData.value.fields.passport_date.value = clientData.passport_date
  clientFormData.value.fields.client_ID.value = clientData.client_id
  clientFormData.value.fields.registration_address_street.value = clientData.registration_address_street
  if (clientData.address) {
    const res = await apiClient.get(`/division/districts?filter{abacus_id}=${clientData.address}`)
    clientFormData.value.fields.address.value = res.districts?.[0]?.id
  }
  if (clientData.registration_address) {
    const res = await apiClient.get(`/division/districts?filter{abacus_id}=${clientData.registration_address}`)
    clientFormData.value.fields.registration_address.value = res.districts?.[0]?.id
  }
  if (clientData.branch) {
    const res = await apiClient.get(`/division/branches?filter{abacus_id}=${clientData.branch}`)
    clientFormData.value.fields.branch.value = res.branches?.[0]?.id
  }
  await clientFormData.value.save({withoutMessage: true})
  return clientFormData.value
}