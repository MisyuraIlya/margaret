import React, { FC, useState } from 'react'
import {
  Box,
  Button,
  Card as MuiCard,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import Modals from '../../Modals'
import { useAuth } from '../../../store/auth.store'
import DateRangeIcon from '@mui/icons-material/DateRange'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import { themeColors } from '../../../styles/mui'
import { onSuccessAlert } from '../../../utils/MySweetAlert'
import hooks from '../../../hooks'

interface TargetItemProps {
  item: IAgentTaget
  index: number
}
const Card: FC<TargetItemProps> = ({ item, index }) => {
  const [open, setOpen] = useState(false)
  const [number, setNumber] = useState(item.targetValue)
  const { user } = useAuth()
  const { createTarget, updateTarget } = hooks.agent.useDataAgentTargets(
    item.year!
  )
  const { isLoading, data } = hooks.agent.useDataAgentObjectives('visit')

  const completedType = (item: IAgentTaget) => {
    let answer = ''
    let bg = '#f7f9fc'
    if (!item.targetValue || !item.currentValue) {
      bg = '#f7f9fc'
      answer = 'ממתין'
    } else {
      if (item.currentValue > item.targetValue) {
        bg = '#41dc934d'
        answer = 'הגיע ליעד'
      } else {
        bg = '#d2335c33'
        answer = 'לא הגיע'
      }
    }
    return (
      <Box
        sx={{
          backgroundColor: bg,
          color: themeColors.primary,
          padding: '5px 10px',
          borderRadius: '5px',
        }}
      >
        {answer}
      </Box>
    )
  }

  const handle = () => {
    if (item.id) {
      item.targetValue = number
      item.currentValue = 0
      updateTarget(item)
    } else {
      item.targetValue = number
      item.currentValue = 0
      createTarget(item)
    }
    onSuccessAlert('יעד עודכן בהצלחה', '')
    setOpen(false)
  }

  return (
    <>
      <MuiCard
        key={index}
        sx={{
          margin: '20px',
          padding: '10px 20px',
          borderRadius: '5px',
          boxShadow: '0 2px 40px rgba(132,147,168,.15)',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">{item.month}</Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">חודשי</Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">
              {numberWithCommas(item.targetValue)}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">
              {numberWithCommas(item.currentValue)}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body1"
              sx={{ minWidth: '80px', textAlign: 'center' }}
            >
              {completedType(item)}
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{
                borderRadius: '5px',
                backgroundColor: '#f7f9fc',
                minWidth: '80px',
              }}
            >
              <ModeEditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </MuiCard>

      <Modals.ModalWrapper
        active={open}
        setActive={setOpen}
        width={28}
        height={'30%'}
      >
        <Box sx={{ padding: '0 20px' }}>
          <Typography variant="h5" sx={{ mb: '20px' }}>
            עדכון יעד
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <TextField
              variant="outlined"
              value={item.month + ' ' + item.year}
              disabled
              InputProps={{
                startAdornment: (
                  <Box sx={{ padding: '0 10px' }}>
                    <DateRangeIcon />
                  </Box>
                ),
              }}
            />
            <TextField
              variant="outlined"
              type="number"
              placeholder="יעד"
              value={number}
              onChange={(e) => setNumber(+e.target.value)}
              InputProps={{
                startAdornment: (
                  <Box sx={{ padding: '0 10px' }}>
                    <CurrencyExchangeIcon />
                  </Box>
                ),
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: '40px' }}>
            <Button variant="contained" onClick={() => handle()}>
              עדכן יעד
            </Button>
          </Box>
        </Box>
      </Modals.ModalWrapper>
    </>
  )
}

export default Card
