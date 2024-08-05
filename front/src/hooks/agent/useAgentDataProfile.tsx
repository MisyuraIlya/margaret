import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import services from '../../services'

const fetchDataProfile = async (agentId: string) => {
  return await services.Agents.agentProfileService.getAgentProfile(agentId)
}

type RouteParams = {
  id: string
}

const useDataAgentProfile = () => {
  const { id } = useParams<RouteParams>()

  const { data, isLoading } = useSWR(`/agentProfile/${id}`, () =>
    fetchDataProfile(id!)
  )

  const findTarget = (numberMonth: number) => {
    const find = data?.monthlyTotals?.find((item) => item.month === numberMonth)
    return find?.total ?? 0
  }

  return {
    data,
    isLoading,
    findTarget,
  }
}

export default useDataAgentProfile
