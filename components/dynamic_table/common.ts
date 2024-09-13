import {getModelLink} from "~/common/domain-model";

export async function getColumnLabel(fieldName: string, modelName: string, prefix: string = ''): string {
  if (!fieldName.includes('.')) {
    const [_, modelOptions] = await getModelLink(modelName);
    return `${prefix}${modelOptions.properties[fieldName]?.label}`
  }
  const relatedField = fieldName.split('.')[0]
  const [_, modelOptions] = await getModelLink(modelName);
  const relatedModel = modelOptions.properties[relatedField].related_to
  const [__, modelOptionsRelated] = await getModelLink(relatedModel);
  const fieldNamePart = fieldName.split('.').slice(1)
  return getColumnLabel(fieldNamePart.join('.'), relatedModel, `[${modelOptionsRelated.verbose_name}] ${prefix}`)
}

export async function getColumnInfo(fieldName: string, modelName: string, option: string): string {
  if (!fieldName.includes('.')) {
    const [_, modelOptions] = await getModelLink(modelName);
    return modelOptions.properties[fieldName]?.[option]
  }
  const relatedField = fieldName.split('.')[0]
  const [_, modelOptions] = await getModelLink(modelName);
  const relatedModel = modelOptions.properties[relatedField].related_to
  const fieldNamePart = fieldName.split('.').slice(1)
  return getColumnInfo(fieldNamePart.join('.'), relatedModel, option)
}
