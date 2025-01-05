import React, { useState, useEffect } from 'react';
import useDataCatalog from '../../../hooks/useDataCatalog';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import CustomMultiSelectBox from '../../../utils/CustomMultiSelectBox';

const Attributes = () => {
  const { data } = useDataCatalog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSelectedValues, setLocalSelectedValues] = useState<Record<string, string[]>>({});
  const [filters, setFilters] = useState<IAttributeMain[]>([]);

  useEffect(() => {
    if (data?.['hydra:filter']) {
      setFilters((prevFilters) => {
        const newFilters = data['hydra:filter'];
        const preservedValues = prevFilters.reduce<Record<string, string[]>>((acc, filter) => {
          if (newFilters.find((newFilter: IAttributeMain) => newFilter.id === filter.id)) {
            acc[filter.id] = localSelectedValues[filter.id] || [];
          }
          return acc;
        }, {});
        setLocalSelectedValues((prev) => ({ ...prev, ...preservedValues }));
        return newFilters;
      });
    }
  }, [data]);

  useEffect(() => {
    const initialValues: Record<string, string[]> = {};
    filters.forEach((item) => {
      const values = searchParams.getAll(`filter[${item.id}]`);
      if (values.length > 0) {
        initialValues[item.id] = values;
      }
    });
    setLocalSelectedValues(initialValues);
  }, [filters, searchParams]);

  const handleChange = (id: number, values: string[]) => {
    setLocalSelectedValues((prev) => ({
      ...prev,
      [id]: values,
    }));

    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.delete(`filter[${id}]`);
    values.forEach((value) => updatedParams.append(`filter[${id}]`, value));
    setSearchParams(updatedParams);
  };
  return (
    <Box sx={{display:'flex'}}>
      {filters.map((item) => (
        <Box key={item.id} sx={{padding:'10px'}}>
            <CustomMultiSelectBox
            key={item.id}
            label={item.title}
            values={localSelectedValues[item.id] || []}
            onChange={(values) => handleChange(item.id, values)}
            options={item.SubAttributes?.map((subItem) => ({
                value: subItem.id.toString(),
                label: subItem.title,
                count: subItem.productCount
            })) || []}
            />
        </Box>
      ))}
    </Box>
  );
};

export default Attributes;
