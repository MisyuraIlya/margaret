import React, { useState, useEffect } from 'react'
import Utils from '../../../utils'
import { Box, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import hooks from '../../../hooks'
import useTerritory from '../../../hooks/useDataTerritory'

const Filter = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string>('') 
  const [territory, setTerritory] = useState<string>('') 
  const navigate = useNavigate()
  const { agentId } = useParams()
  const { data } = hooks.agent.useDataAgentClients()
  const { data: territoryData } = useTerritory() 

  // Effect to sync territory with URL query parameter on mount
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search)
    const territoryParam = urlSearchParams.get('territory')
    if (territoryParam) {
      setTerritory(territoryParam)
    }
  }, [location.search]) // This ensures it runs when URL changes

  const handleDebounce = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    urlSearchParams.set('search', value)
    if (status) {
      urlSearchParams.set('status', status)
    }
    if (territory) {
      urlSearchParams.set('territory', territory) 
    }
    const url = urlSearchParams.toString()
    navigate(`/agentClients/${agentId}?${url}`)
  }

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value
    setStatus(newStatus)
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    urlSearchParams.set('status', newStatus) 
    const url = urlSearchParams.toString()
    navigate(`/agentClients/${agentId}?${url}`)
  }

  const handleTerritoryChange = (event: SelectChangeEvent<string>) => { 
    const newTerritory = event.target.value
    setTerritory(newTerritory)
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    urlSearchParams.set('territory', newTerritory)
    const url = urlSearchParams.toString()
    navigate(`/agentClients/${agentId}?${url}`)
  }

  const totalCount = data?.['hydra:totalItems'] ?? 0

  return (
    <Box
      sx={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ width: '50%' }}>
        <Utils.SearchInput
          handleFunction={handleDebounce}
          value={search}
          setValue={setSearch}
          placeholder="חיפוש לפי שם לקוח או מספר לקוח"
        />
      </Box>
      <Box sx={{ width: '18%' }}>
        <Select
          value={status}
          onChange={handleStatusChange}
          displayEmpty
          fullWidth
          sx={{ height: '40px' }}
        >
          <MenuItem value="">פעילים / לא פעילים</MenuItem>
          <MenuItem value="active">פעילים</MenuItem>
          <MenuItem value="inactive">לא פעילים</MenuItem>
        </Select>
      </Box>
      <Box sx={{ width: '10%' }}>
        <Select
          value={territory}
          onChange={handleTerritoryChange}
          displayEmpty
          fullWidth
          sx={{ height: '40px' }}
          placeholder='טריטוריה'
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
      <Box className="centered">
        <Typography variant="body1">{`סה״כ לקוחות: ${totalCount}`}</Typography>
      </Box>
    </Box>
  )
}

export default Filter
