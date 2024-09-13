import ApiFactory from "~/factories/api-factory";

const modelLinks = ref(null);
const optionsModelLinks = ref({});
const apiClient = ApiFactory.build();

export async function initializeModelLinks() {
  const result = await apiClient.get('');
  modelLinks.value = result;
  await sendOptionsRequests(result);
}

 async function sendOptionsRequests(links: any) {
  const config = useRuntimeConfig();

  for (const res in links) {
    for (const r in links[res]) {
      const url = links[res][r];
      const apiUrl = url.replace(config.public.apiBase, ''); 
      const optionsRes = await apiClient.options(apiUrl); 
      optionsModelLinks.value[url] = optionsRes;
    }
  }
 }
 
export async function getModelLink(apiModel: string) {
  if (!modelLinks.value) {
    await initializeModelLinks();
  } 

 let url;
 for (const res in modelLinks.value) {
    for (const r in modelLinks.value[res]) {
      if (r === apiModel) {
        url = modelLinks.value[res][r];
        break;
      }
    }
 }

 if (!url) {
    throw new Error(`Ссылка на модель ${apiModel} не найдена в modelLinks.`);
 }

 const config = useRuntimeConfig();
 const apiUrl = url.replace(config.public.apiBase, ''); 

 const fullUrl = url; 
 const res = optionsModelLinks.value[fullUrl];
 return [apiUrl, res];
}