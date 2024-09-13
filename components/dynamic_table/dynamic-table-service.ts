import ApiFactory from "~/factories/api-factory";
import ApiClient from "~/utils/api-client";
import {buildUrl, buildDRestResponse} from "./helpers";
import {getModelLink} from "~/common/domain-model";
import {toastError} from '~/utils/toast'

export class DynamicTableService {
    private apiClient: ApiClient;

    constructor() {
        this.apiClient = ApiFactory.build();
    }

    async getData(data) {
        let sort = '';
        if (data.sortBy !== '') {
            if (data.sortDir !== '') {
                if (data.sortDir === 'desc') {
                    sort = '-';
                }
            }
            sort = sort.concat(data.sortBy);
        }
        const includes = new Set()
        data.columns.forEach(c => {
            if (c.name.includes('.')) {
                const include = c.name.split('.')
                includes.add(include.slice(0, -1).join('.'))
            }
        })
        const url = await buildUrl({
            modelName: data.modelName,
            perPage: data.perPage,
            page: data.page,
            sort: [sort],
            filters: data.filters,
            externalFilters: data.externalFilters,
            includes
        });
        const response = await this.apiClient.get(url);
        return buildDRestResponse(response, data.modelName)
    }

    async deleteItemsFromServer(itemIds: number[], modelName: string) {
        if (!itemIds?.length) {
            toastError('Item IDs are required for deletion.')
            return
        }
        const [apiUrl, modelOptions] = await getModelLink(modelName);
        for (const id of itemIds) {
            this.apiClient.delete(`${apiUrl}/${id}`)
        }
    }
    async getModelOptions(modelName: string){
        const [apiUrl, modelOptions] = await getModelLink(modelName);
        return {
            verboseName: modelOptions.verbose_name,
            verboseNamePlural: modelOptions.verbose_name_plural,
        }
    }
}

export interface SortOption {
    key: string;
    order: 'asc' | 'desc';
}

export interface DataTableOptions {
    page: number;
    itemsPerPage: number;
    sortBy?: SortOption[];
}

export interface Choice {
    value: string;
    display_name: string;
}

export interface FieldMeta {
    required: boolean;
    read_only: boolean;
    default: null;
    label: string;
    nullable: boolean;
    type: string;
    choices?: Choice[];
}

export interface DataField {
    field: string;
    value: any;
}
