import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Utils from '../../../utils'
import { Box, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { themeColors } from '../../../styles/mui'
import { useAdminStore } from '../../../store/admin.store'
import hooks from '../../../hooks'
import useTerritory from '../../../hooks/useDataTerritory'

type RouteParams = {
  userRole: ROLE_TYPES
}

const Filter = () => {
  const { searchClients, setSearchClients } = useAdminStore()
  const [status, setStatus] = useState<string>('') 
  const [territory, setTerritory] = useState<string>('')  
  const navigate = useNavigate()
  const { data } = hooks.admin.useDataUsers()
  const { userRole } = useParams<RouteParams>()
  const { data: territoryData } = useTerritory() 

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search)
    const territoryParam = urlSearchParams.get('territory')
    if (territoryParam) {
      setTerritory(territoryParam) 
    }
  }, [location.search]) 

  const handleDebounce = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('search', value)
    if (status) {
      urlSearchParams.set('status', status)
    }
    if (territory) {
      urlSearchParams.set('territory', territory)  // Include territory filter in the URL
    }
    const url = urlSearchParams.toString()
    navigate(`/admin/${userRole}?${url}`)
  }

  const handleStatusChange = (event: SelectChangeEvent<string>) => { 
    const newStatus = event.target.value
    setStatus(newStatus)
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('search', searchClients) 
    urlSearchParams.set('status', newStatus)  // Corrected to use 'status'
    const url = urlSearchParams.toString()
    navigate(`/admin/${userRole}?${url}`)
  }

  const handleTerritoryChange = (event: SelectChangeEvent<string>) => { 
    const newTerritory = event.target.value
    setTerritory(newTerritory)
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('search', searchClients)
    urlSearchParams.set('territory', newTerritory)  // Update territory filter in the URL
    const url = urlSearchParams.toString()
    navigate(`/admin/${userRole}?${url}`)
  }

  const total = data?.['hydra:totalItems'] ?? 0

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px 0',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
        <Typography variant="h5">
          {userRole === 'ROLE_AGENT' ? 'סוכנים' : 'לקוחות'}
        </Typography>
        <Typography variant="body1" color={themeColors.asphalt}>
          {'נמצאו: ' + total + ' לקוחות'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Utils.SearchInput
          handleFunction={handleDebounce}
          value={searchClients}
          setValue={setSearchClients}
          placeholder="חיפוש לפי שם לקוח או מספר לקוח"
        />
        <Select
          value={status}
          onChange={handleStatusChange} 
          displayEmpty
          sx={{ height: '40px' }}
        >
          <MenuItem value="">פעילים / לא פעילים</MenuItem>
          <MenuItem value="true">פעילים</MenuItem>
          <MenuItem value="false">לא פעילים</MenuItem>
        </Select>
        <Select
          value={territory}
          onChange={handleTerritoryChange} 
          displayEmpty
          sx={{ height: '40px' }}
        >
          <MenuItem value={''}>
            כולם
          </MenuItem>
          {territoryData?.map((item) => (
            <MenuItem key={item.territory_code} value={item.territory_code}>
              {item.territory_description}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  )
}

export default Filter
