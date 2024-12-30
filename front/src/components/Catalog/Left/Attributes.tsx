import React, { useState, useEffect } from 'react';
import useDataCatalog from '../../../hooks/useDataCatalog';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import CustomMultiSelectBox from '../../../utils/CustomMultiSelectBox';

const Attributes = () => {
    const { data } = useDataCatalog();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({});

    useEffect(() => {
        // Initialize state from URL query params
        const initialValues: Record<string, string[]> = {};
        data?.['hydra:filter']?.forEach((item) => {
            const values = searchParams.getAll(`filter[${item.id}]`);
            if (values.length > 0) {
                initialValues[item.id] = values;
            }
        });
        setSelectedValues(initialValues);
    }, [data, searchParams]);

    const handleChange = (id: number, values: string[]) => {
        setSelectedValues((prev) => ({
            ...prev,
            [id]: values,
        }));

        const updatedParams = new URLSearchParams(searchParams.toString());
        if (values.length > 0) {
            updatedParams.delete(`filter[${id}]`);
            values.forEach((value) => updatedParams.append(`filter[${id}]`, value));
        } else {
            updatedParams.delete(`filter[${id}]`);
        }
        setSearchParams(updatedParams);
    };

    return (
        <Box>
            {data?.['hydra:filter']?.map((item) => (
                <CustomMultiSelectBox
                    key={item.id}
                    label={item.title}
                    values={selectedValues[item.id] || []}
                    onChange={(values) => handleChange(item.id, values)}
                    options={item.SubAttributes?.map((subItem) => ({
                        value: subItem.id.toString(),
                        label: subItem.title,
                    })) || []}
                />
            ))}
        </Box>
    );
};

export default Attributes;
