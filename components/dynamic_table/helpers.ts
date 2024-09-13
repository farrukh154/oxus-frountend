import {getModelLink} from '~/common/domain-model'

export const buildUrl = async (params: QueryParams): string => {
    let queryParams: string[] = [];

    if (params.sort) {
        params.sort.forEach(sortParam => {
            queryParams.push(`sort[]=${encodeURIComponent(sortParam)}`);
        });
        delete params.sort;
    }

    if (params.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
            if (key === '' || value === '' || value === null) {
                return;
            }
            queryParams.push(`filter{${encodeURIComponent(key)}}=${encodeURIComponent(value)}`);
        });
        delete params.filters;
    }

    if (params.page) {
        queryParams.push(`page=${params.page}`);
    }
    if (params.perPage) {
        queryParams.push(`per_page=${params.perPage}`);
    }
    let additionalData = ''
    if (params.externalFilters) {
        additionalData = `&${params.externalFilters}`
    }
    if (params.includes) {
        params.includes.forEach((include: string) => {
            queryParams.push(`include[]=${include}.*`)
        });
    }
    const [apiUrl, modelOptions] = await getModelLink(params.modelName)
    return `${apiUrl}?${queryParams.join('&')}${additionalData}`;
}

export type QueryParams = {
    sort?: string[];
    filters?: { [key: string]: string | number };
    [key: string]: any;
}

export function buildDRestResponse(response: any, mainModelName: string) {
  let mainModels = response[mainModelName];
  if (!Array.isArray(mainModels)) {
    // in case of single model response
    mainModels = [mainModels];
  }
  const meta = response.meta
  let relatedModels = new Map()
  for (const key in response) {
    if (key !== mainModelName && key !== 'meta') {
      relatedModels.set(key, relatedModelsToMap(response[key]));
    }
  }
  return {mainModels, relatedModels, meta};
}

function relatedModelsToMap(relatedModels: any) {
  const result = new Map();
  for (const relatedModel of relatedModels) {
    result.set(relatedModel.id, relatedModel);
  }
  return result;
}

export async function mergeRelatedModels(mainModels: Array<any>, relatedModels: any, columns: Array<any>, modelName: string) {
  const rowData = []
  for (const row of mainModels) {
    for (const c of columns) {
      if (!c.name.includes('.')) {
        continue
      }
      row[c.name] = await getRelatedData(c.name, row, relatedModels, modelName)
    }
    rowData.push(row)
  }
  return rowData
}

async function getRelatedData(fieldName: string, row: object, relatedModels: any, modelName: string) {
  if (!fieldName.includes('.')) {
    return row?.[fieldName]
  }
  const relatedField = fieldName.split('.')[0]
  const [_, modelOptions] = await getModelLink(modelName);
  const relatedModelName = modelOptions.properties[relatedField].related_to
  if (!relatedModels.has(relatedModelName)) {
    return undefined
  }
  const relatedModel = relatedModels.get(relatedModelName)
  if (!relatedModel.has(row[relatedField])) {
    return undefined
  }
  const relatedModelId = relatedModel.get(row[relatedField])
  const fieldNamePart = fieldName.split('.').slice(1)
  return getRelatedData(fieldNamePart.join('.'), relatedModelId, relatedModels, relatedModelName)
}