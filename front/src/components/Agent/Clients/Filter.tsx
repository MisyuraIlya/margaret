import React, { useState } from 'react'
import Utils from '../../../utils'
import { Box, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import hooks from '../../../hooks'

const Filter = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string>('') // New state for active/inactive filter
  const navigate = useNavigate()
  const { agentId } = useParams()
  const { data } = hooks.agent.useDataAgentClients()

  const handleDebounce = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    urlSearchParams.set('search', value)
    if (status) {
      urlSearchParams.set('status', status) // Add status filter to query params
    }
    const url = urlSearchParams.toString()
    navigate(`/agentClients/${agentId}?${url}`)
  }

  const handleStatusChange = (event: SelectChangeEvent<string>) => { // Correct event type
    const newStatus = event.target.value
    setStatus(newStatus)
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    urlSearchParams.set('status', newStatus) // Update status filter in query params
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
      <Box sx={{ width: '25%' }}>
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
      <Box className="centered">
        <Typography variant="body1">{`סה״כ לקוחות: ${totalCount}`}</Typography>
      </Box>
    </Box>
  )
}

export default Filter
