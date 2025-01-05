import useSWR from 'swr'
import { TerritoryService } from '../services/territory.service'

const fetchData = async (
): Promise<ITerritory[]> => {
  return await TerritoryService.getTerritory()
}

const useTerritory = () => {
  const { data, error, isLoading, mutate } = useSWR<ITerritory[]>(
    `/territory`,
    () => fetchData()
  )

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  }
}

export default useTerritory
