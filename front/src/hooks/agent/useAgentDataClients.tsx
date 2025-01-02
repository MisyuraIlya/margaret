import useSWR from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import { HydraHandler } from '../../helpers/hydraHandler'
import services from '../../services'

const fetchData = async (
  agentId: string,
  page: string = '1',
  search: string,
  status: string,
) => {
  return await services.Agents.agentService.getClients(agentId, page, search,status)
}

type RouteParams = {
  agentId: string
}

const useDataAgentClients = () => {
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const page = urlSearchParams.get('page')
  const search = urlSearchParams.get('search')
  const status = urlSearchParams.get('status')
  const { agentId } = useParams<RouteParams>()

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/agentClients/${agentId}?page=${page}&${search}&${status}`,
    () => fetchData(agentId!, page!, search!,status!)
  )
  let hydraPagination
  if (data) {
    hydraPagination = HydraHandler.paginationHandler(data)
  }

  return {
    data,
    hydraPagination,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataAgentClients
