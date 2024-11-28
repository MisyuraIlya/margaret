import React, { useState } from 'react';
import useDataSalesKeeper from '../../../../hooks/agent/useDataSalesKeeper';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
  } from "@mui/material";

const SalesKeeperAverage = () => {
    const { data } = useDataSalesKeeper();
    const [partsData, setPartsData] = useState<IQuantityKeeper | null>(null);
  
  
    const rows = Object.entries(data!).map(([partName, values]) => ({
      partName,
      ...values,
    }));
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PARTNAME</TableCell>
              <TableCell align="right">Sum (Previous Month - Current Year)</TableCell>
              <TableCell align="right">Sum (Previous Month - Previous Year)</TableCell>
              <TableCell align="right">Average (Last 3 Months)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.partName}>
                <TableCell>{row.partName}</TableCell>
                <TableCell align="right">{row.sumPreviousMonthCurrentYear}</TableCell>
                <TableCell align="right">{row.sumPreviousMonthPreviousYear}</TableCell>
                <TableCell align="right">{row.averageLastThreeMonths}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
export default SalesKeeperAverage;