import ApiFactory from "~/factories/api-factory";
import {toastSuccess, toastInfo} from "../utils/toast";
import {getModelLink} from '~/common/domain-model'

export class DataSource {
  apiModel: string
  primaryKeyValue: number | undefined
  apiClient: any
  fields: Object
  resourceName: string
  verboseName: string
  verboseNamePlural: string
  url: string
  isReady: Boolean

  constructor(apiModel: string, primaryKeyValue: number | undefined) {
    this.apiModel = apiModel
    this.primaryKeyValue = primaryKeyValue
    this.apiClient = ApiFactory.build();
    this.fields = {}
    this.resourceName = ''
    this.verboseName = ''
    this.verboseNamePlural = ''
    this.url = ''
    this.isReady = false
  }

  async init() {
    const [url, prop] = await getModelLink(this.apiModel)
    this.url = url
    this.resourceName = prop.resource_name
    this.verboseName = prop.verbose_name
    this.verboseNamePlural = prop.verbose_name_plural
    this.fields = prop.properties
    await this.build()
  }

  async build() {
    let res: any = {}
    if (this.primaryKeyValue) {
      res = await this.apiClient.get(`${this.url}/${this.primaryKeyValue}`)
    }
    for (const [key, value] of Object.entries(this.fields)) {
      this.fields[key].value = res[this.resourceName]?.[key]
      this.fields[key].oldValue = res[this.resourceName]?.[key]
    }
    this.isReady = true
  }

  async save(props) {
    const data = {}
    for (const field in this.fields) {
      if (this.fields[field].value !== this.fields[field].oldValue) {
        data[field] = this.fields[field].value
      }
    }
    if (Object.keys(data).length) {
      if (this.primaryKeyValue) {
        this.apiClient.patch(`${this.url}/${this.primaryKeyValue}`, data)
      } else {
        const res = await this.apiClient.post(this.url, data)
        this.primaryKeyValue = res[this.resourceName].id
      }
      if (!props?.withoutMessage) {
        toastSuccess('Данные сохранены!')
      }
      this.build()
    } else {
      if (!props?.withoutMessage) {
        toastInfo('Нет изменений для обновления')
      }
    }
  }

  get fieldsChanged() {
    for (const field in this.fields) {
      if (this.fields[field].value !== this.fields[field].oldValue) {
        return true
      }
    }
    return false
  }

  resetFieldsValues() {
    for (const field in this.fields) {
      if (this.fields[field].value !== this.fields[field].oldValue) {
        this.fields[field].value = this.fields[field].oldValue
      }
    }
  }
}