import React from 'react';
import useDataSalesKeeper from '../../../../hooks/agent/useDataSalesKeeper';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
import moment from 'moment';

const SalesKeeperAverage = ({extId}: {extId: string}) => {
    const { data } = useDataSalesKeeper(extId);
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{fontSize:'20px', fontWeight:700}}>חודש - {moment().subtract(1, 'month').format('MM/YYYY')}</TableCell>
              <TableCell align="left" sx={{fontSize:'20px', fontWeight:700}}>ממוצע 3 חודשים</TableCell>
              <TableCell align="left" sx={{fontSize:'20px', fontWeight:700}}>חודש - {moment().subtract(1, 'months').subtract(1, 'years').format('MM/YYYY')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                <TableCell align="left" sx={{fontSize:'18px', fontWeight:400}}>{data?.sumPreviousMonthCurrentYear}₪</TableCell>
                <TableCell align="left" sx={{fontSize:'18px', fontWeight:400}}>{data?.averageLastThreeMonths}₪</TableCell>
                <TableCell align="left" sx={{fontSize:'18px', fontWeight:400}}>{data?.sumPreviousMonthPreviousYear}₪</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
export default SalesKeeperAverage;