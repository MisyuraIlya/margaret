import useSWR from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import { HydraHandler } from '../../helpers/hydraHandler'
import services from '../../services'

const fetchData = async (
  userRole: ROLE_TYPES,
  page: string,
  search: string,
  isRegistered: string,
  territory: string
) => {
  return await services.Admin.AdminClinetsService.getUsers(
    userRole,
    page,
    search,
    isRegistered,
    territory
  )
}

type RouteParams = {
  userRole: ROLE_TYPES
}

const useDataUsers = () => {
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const page = urlSearchParams.get('page')
  const search = urlSearchParams.get('search')
  const isRegistered = urlSearchParams.get('isRegistered')
  const territory = urlSearchParams.get('territory')
  const { userRole } = useParams<RouteParams>()
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/${userRole}?page=${page}&${search}&${isRegistered}&${territory}`,
    () => fetchData(userRole!, page!, search!,isRegistered!,territory!)
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

export default useDataUsers
