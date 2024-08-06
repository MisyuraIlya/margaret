import React from 'react'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useAuth } from '../../../store/auth.store'
import { Box, Card, CircularProgress, Grid, Typography } from '@mui/material'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import LegendToggleIcon from '@mui/icons-material/LegendToggle'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import hooks from '../../../hooks'
import Utils from '../../../utils'
const MainInfo = () => {
  const { isAdmin, isSuperAgent } = useAuth()
  const { data, isLoading } = hooks.agent.useDataAgentProfile()
  const { user } = useAuth()
  return (
    <Card sx={{ padding: '10px', position: 'relative' }}>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      <Grid container spacing={10}>
        <Grid item sm={7} xs={12} className="centered">
          <Grid container spacing={2} className="centered">
            <Grid item sm={4} xs={6} sx={{ gap: '5px' }}>
              <Box className="centered" sx={{ gap: '10px' }}>
                <SupportAgentIcon />
                <Box sx={{ marginTop: '5px' }}>
                  <Typography>{data?.agentName}</Typography>
                  <Typography>{data?.agentExtId}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={4} xs={6} sx={{ gap: '5px' }}>
              <Grid container spacing={0} className="centered">
                <Grid item xs={2}>
                  <LegendToggleIcon />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">{'סה״כ חודשי'}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Utils.MyCheapButton>
                    {numberWithCommas(data?.totalPriceMonth)}
                  </Utils.MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4} xs={6} sx={{ gap: '5px' }}>
              <Grid container spacing={0} className="centered">
                <Grid item xs={2}>
                  <LegendToggleIcon />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">{'סה״כ שנתי'}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Utils.MyCheapButton>
                    {numberWithCommas(data?.total)}
                  </Utils.MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4} xs={6} sx={{ gap: '5px' }}>
              <Grid container spacing={0} className="centered">
                <Grid item xs={2}>
                  <AnalyticsIcon />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">{'סל ממוצע'}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Utils.MyCheapButton>
                    {numberWithCommas(data?.averageBasket)}
                  </Utils.MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={5} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign={'center'}>
                {'סה״כ יומי'}
              </Typography>
              <Box className="centered" sx={{ marginTop: '5px' }}>
                <Utils.MyCheapButton>
                  {numberWithCommas(data?.totalPriceDay)}
                </Utils.MyCheapButton>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign={'center'}>
                {'כמות עסקאות יומי'}
              </Typography>
              <Box className="centered" sx={{ marginTop: '5px' }}>
                <Utils.MyCheapButton>
                  {numberWithCommas(data?.totalDayCount)}
                </Utils.MyCheapButton>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign={'center'}>
                {'כמות עסקאות חודשי'}
              </Typography>
              <Box className="centered" sx={{ marginTop: '5px' }}>
                <Utils.MyCheapButton>
                  {numberWithCommas(data?.totalMonthCount)}
                </Utils.MyCheapButton>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign={'center'}>
                {'עמידה ביעד'}
              </Typography>
              <Box className="centered" sx={{ marginTop: '5px' }}>
                <Utils.MyCheapButton>
                  {numberWithCommas(data?.targetPrecent)}
                </Utils.MyCheapButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default MainInfo
