import { useRuntimeConfig } from '#app'
const defaultQuery: Object = { t__status: "Published" }
const defaultTransform = (data: any) => {
  return data && data.results ? data.results : [];
}
export const useChiselFetch = (modelName: string, query: Object = defaultQuery, other: Object = {}, transform: Function = defaultTransform ) => {
  const config = process.server ? useRuntimeConfig() : useRuntimeConfig().public
  const modelURL = `${config.chisel.parseServerURL}/classes/ct____${config.chisel.siteNameId}____${modelName}`;
  return useFetch(modelURL, {
    method: 'POST',
    body: {
      ...other,
      where: query,
      _ApplicationId: config.chisel.parseAppId,
      _method: "GET"
    },
    transform
  })
}
