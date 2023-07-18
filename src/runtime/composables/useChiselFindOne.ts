import { useRuntimeConfig, useFetch } from '#app'
export const useChiselFindOne = (modelName: string, siteNameId: string, query: Object) => {
  const config = process.server ? useRuntimeConfig() : useRuntimeConfig().public
  const modelURL = `${config.chisel.parseServerURL}/classes/ct____${siteNameId}____${modelName}`;
  return useFetch(modelURL, {
    method: 'POST',
    body: {
      where: { ...query, t__status: "Published" },
      _ApplicationId: config.chisel.parseAppId,
      _method: "GET"
    },
    transform: (data) => {
      if (data.results && data.results.length > 0) return data.results[0];
    }
  })
}
