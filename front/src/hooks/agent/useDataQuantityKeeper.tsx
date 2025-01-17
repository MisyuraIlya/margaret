import useSWR from 'swr'
import { useAuth } from '../../store/auth.store'
import { salesKeeperService } from '../../services/agents/salesKeeper.service'

const fetchData = async (userId: string):Promise<IQuantityKeeper[]> => {
  return await salesKeeperService.getSalesQuantityKeeperAlert(userId)
}

const useDataQuantityKeeper = (extId?: string | null | undefined) => {
  const { user } = useAuth()
  const { data, isLoading, mutate } = useSWR<IQuantityKeeper[]>(
    `salesQuantityKeeper/${extId ? extId : user?.extId}`,
    () => fetchData(extId ? extId : user?.extId!)
  )

  return {
    data,
    isLoading,
    mutate,
  }
}

export default useDataQuantityKeeper
