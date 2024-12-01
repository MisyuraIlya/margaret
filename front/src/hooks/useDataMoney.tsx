import useSWR from 'swr'
import { useAuth } from '../store/auth.store'
import { AuthService } from '../services/auth.service'

const fetchData = async (
  userExId: string,
): Promise<IMoney> => {
  return await AuthService.getMoneyUser(userExId)
}

const useDataMoney = () => {
  const { user } = useAuth()
  const { data, error, isLoading, mutate } = useSWR<IMoney>(
    `/user/moneyInfo/${user?.extId}`,
    () => fetchData(user?.extId!)
  )

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  }
}

export default useDataMoney
