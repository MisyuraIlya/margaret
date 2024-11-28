import useSWR from 'swr'
import { useAuth } from '../../store/auth.store'
import { salesKeeperService } from '../../services/agents/salesKeeper.service'

const fetchData = async (userId: string) => {
  return await salesKeeperService.getSalesSkeeper(userId)
}

const useDataSalesKeeper = (extId?: string | null | undefined) => {
  const { user } = useAuth()
  const { data, isLoading, mutate } = useSWR(
    `salesKeeper/${extId ? extId : user?.extId}`,
    () => fetchData(extId ? extId : user?.extId!)
  )

  return {
    data,
    isLoading,
    mutate,
  }
}

export default useDataSalesKeeper
