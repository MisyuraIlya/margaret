import { Box, Tab, Tabs as MuiTabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

type Props = {
  children: JSX.Element[] | null
  baseRoute: string // BASE ROUTE LINE /home /about
  params: string[] // PARAMS LIKE /home/:tab/:id --> ['tab','id']
  isDatable?: boolean
  tabDatable?: ITabDatable[]
}

interface ITabDatable {
  tabIndex: number
  dateFrom: string
  dateTo: string
}

export const Tabs = ({
  children,
  baseRoute,
  params,
  isDatable,
  tabDatable,
}: Props) => {
  const [tabIndex, setTabIndex] = useState(0)
  const navigate = useNavigate()
  const { tab, ...routeParams } = useParams()

  if (!tab) throw new Error('To use tabs there must be parameter called tab')

  const handleTabChange = (event: React.SyntheticEvent, newTabIndex: any) => {
    setTabIndex(newTabIndex)
    const newRouteParams: { [key: string]: string } = {
      tab: newTabIndex.toString(),
      ...routeParams,
    }
    let route = `${baseRoute}/${params.map((param) => newRouteParams[param]).join('/')}`
    if (isDatable) {
      const find = tabDatable?.find((item) => item.tabIndex === newTabIndex)
      route = `${route}${find?.dateFrom}/${find?.dateTo}`
    }
    navigate(route)
  }

  return (
    <Box>
      <MuiTabs value={+tab!} onChange={handleTabChange}>
        {children?.map((element, index: number) => (
          <Tab
            key={index}
            label={element.props.label}
            className={+tab! === index ? 'Mui-selected' : ''}
          />
        ))}
      </MuiTabs>
      <Box>
        {children?.map((element, index: number) =>
          +tab! === index ? element.props.children : null
        )}
      </Box>
    </Box>
  )
}
