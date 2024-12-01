import React from 'react'
import { useAuth } from '../../store/auth.store'
import { Paper, Typography, Grid, IconButton, Box, CircularProgress } from '@mui/material'
import { themeColors } from '../../styles/mui'
import ErrorIcon from '@mui/icons-material/Error';
import useDataSalesKeeper from '../../hooks/agent/useDataSalesKeeper';
import useDataQuantityKeeper from '../../hooks/agent/useDataQuantityKeeper';
import Keeper from './Keeper';
import useDataMoney from '../../hooks/useDataMoney';
import { numberWithCommas } from '../../helpers/numberWithCommas';

const Money = () => {
  const { user } = useAuth()
  const {data: sales} = useDataSalesKeeper()
  const {data: quantity} = useDataQuantityKeeper()
  const {data: money, isLoading} = useDataMoney()
  return (
    <>

      <Typography variant="h4" sx={{ marginTop: '50px' }}>
        {'כספים'}
      </Typography>
      <Paper
        sx={{
          padding: '15px 40px',
          marginTop: '20px',
          minHeight: '100px',
          alignItems: 'center',
          display: 'flex',
          position:'relative'
        }}
      >
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
        <Grid container spacing={1}>
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {'מס חברה'}
            </Typography>
            <Typography variant="body1">{user?.hp ?? '-'}</Typography>
          </Grid>
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {'קוד תנאי תשלום'}
            </Typography>
            <Typography variant="body1">{user?.payCode ?? '-'}</Typography>
          </Grid>
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {'תנאי תשלום'}
            </Typography>
            <Typography variant="body1">{user?.payDesc ?? '-'}</Typography>
          </Grid>

          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"הזמנות פתוחות"}
            </Typography>
            <Typography variant="body1">{money?.openDocs ?? '-'}</Typography>
          </Grid>

          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"תעודות שלא חויבו"}
            </Typography>
            <Typography variant="body1">{money?.docsNotPay ?? '-'}</Typography>
          </Grid>

          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"חוב פתוח"}
            </Typography>
            <Typography variant="body1">{money?.openDeibt ? '₪' + numberWithCommas(money?.openDeibt) : '-'}</Typography>
          </Grid>

          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"חוב 1-30"}
            </Typography>
            <Typography variant="body1">{money?.upt30 ? '₪' + numberWithCommas(money?.upt30) : '-'}</Typography>
          </Grid>
          
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"חוב 31-60"}
            </Typography>
            <Typography variant="body1">{money?.upt60 ? '₪' + numberWithCommas(money?.upt60) : '-'}</Typography>
          </Grid>
          
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"חוב 61-90"}
            </Typography>
            <Typography variant="body1">{money?.upt90 ? '₪' + numberWithCommas(money?.upt90) : '-'}</Typography>
          </Grid>


          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"צ'קים שלא נפרעו"}
            </Typography>
            <Typography variant="body1">{money?.chequeDebit ? '₪' + numberWithCommas(money?.chequeDebit) : '-'}</Typography>
          </Grid>

          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"אשראי"}
            </Typography>
            <Typography variant="body1">{money?.credit ? '₪' + numberWithCommas(money?.credit) : '-'}</Typography>
          </Grid>
          
          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"תיקרת האשראי"}
            </Typography>
            <Typography variant="body1">{money?.maxCredit ? '₪' + numberWithCommas(money?.maxCredit) : '-'}</Typography>
          </Grid>

          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"יתרת אשראי"}
            </Typography>
            <Typography variant="body1">{money?.creditDiff ? '₪' + numberWithCommas(money?.creditDiff) : '-'}</Typography>
          </Grid>

          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"אובליגו"}
            </Typography>
            <Typography variant="body1">{money?.obligo ? '₪' + numberWithCommas(money?.obligo) : '-'}</Typography>
          </Grid>

          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"תיקרת האובליגו"}
            </Typography>
            <Typography variant="body1">{money?.maxObligo ? '₪' + numberWithCommas(money?.maxObligo) : '-'}</Typography>
          </Grid>

          <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {"יתרת אובליגו"}
            </Typography>
            <Typography variant="body1">{money?.obligoDiff ? '₪' + numberWithCommas(money?.obligoDiff) : '-'}</Typography>
          </Grid>
          <Keeper/>
        </Grid>
      </Paper>
    </>
  )
}

export default Money
