import React, { useState, useEffect } from 'react';
import Utils from '../../../utils';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  ToggleButton,
  ToggleButtonGroup,
  Checkbox,
  Button,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import GridViewIcon from '@mui/icons-material/GridView';
import TocIcon from '@mui/icons-material/Toc';
import useDataCatalog from '../../../hooks/useDataCatalog';
import hooks from '../../../hooks';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useCatalog } from '../../../store/catalog.store';

const MobileFilterWithAttributes = () => {
  const [search, setSearch] = useState<string>('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openOrden, setOpenOrden] = useState(false);
  const [openProd, setOpenProd] = useState(false);
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({});
  const [searchDebounce] = useDebounce(search, 1000);
  const { data } = useDataCatalog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSelectedValues, setLocalSelectedValues] = useState<Record<string, string[]>>({});
  const [filters, setFilters] = useState<IAttributeMain[]>([]);

  const {
    listView,
    setListView,
    prodsPerPage,
    setProdsPerPage,
    sortProdSetting,
    setSortProdSetting,
    sortArr,
    prodsPerPageArr,
  } = useCatalog();

  const { mutate } = hooks.useDataCatalog();
  const navigate = useNavigate();

  // Sync filters from data
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

  // Sync local state with URL query params
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

  const handleSearchValue = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search);
    urlSearchParams.set('page', '1');
    if (value) {
      urlSearchParams.set('search', value);
    } else {
      urlSearchParams.delete('search');
    }
    const updatedUrl = '?' + urlSearchParams.toString();
    navigate(location.pathname + updatedUrl);
    mutate();
  };

  const handleChangeItemsPerPage = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search);
    urlSearchParams.set('itemsPerPage', value);
    urlSearchParams.set('page', '1');
    const updatedUrl = '?' + urlSearchParams.toString();
    setProdsPerPage(value);
    navigate(location.pathname + updatedUrl);
    mutate();
  };

  const handleOrderBy = (value: string) => {
    setSortProdSetting(value);
    if (value === 'שם') {
      value = 'title';
    } else if (value === 'מומלץ') {
      value = 'isSpecial';
    } else if (value === 'חדש') {
      value = 'isNew';
    }
    const urlSearchParams = new URLSearchParams(location.search);
    urlSearchParams.set('orderBy', value);
    const updatedUrl = '?' + urlSearchParams.toString();
    navigate(location.pathname + updatedUrl);
    mutate();
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setListView(newAlignment as any);
  };

  const handleChange = (id: number, value: string) => {
    setLocalSelectedValues((prev) => {
      const currentValues = prev[id] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      // Update search params
      const updatedParams = new URLSearchParams(searchParams.toString());
      updatedParams.delete(`filter[${id}]`);
      newValues.forEach((val) => updatedParams.append(`filter[${id}]`, val));
      setSearchParams(updatedParams);

      return {
        ...prev,
        [id]: newValues,
      };
    });
  };

  const toggleFilter = (id: string) => {
    setOpenFilters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    handleSearchValue(searchDebounce);
  }, [searchDebounce]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Utils.SearchInput
            value={search}
            setValue={setSearch}
            sx={{
              '& .muirtl-152mnda-MuiInputBase-input-MuiOutlinedInput-input': {
                padding: '12px',
              },
            }}
            placeholder="חפש מוצר..."
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => setOpenDrawer(true)}
            variant="contained"
            sx={{
              padding: '0px',
              margin: '0px',
              minWidth: '40px',
              height: '90%',
            }}
          >
            <FilterAltIcon />
          </Button>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: 'flex', justifyContent: 'end', height: '56px' }}
        >
          <ToggleButtonGroup
            value={listView}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="grid">
              <GridViewIcon
                sx={{ color: listView === 'grid' ? 'white' : 'black' }}
              />
            </ToggleButton>
            <ToggleButton value="list">
              <TocIcon sx={{ color: listView === 'list' ? 'white' : 'black' }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>

      <Drawer anchor="bottom" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ height: '100vh', width: '100%' }}>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '16px',
                }}
              >
                <Box>Filters</Box>
                <IconButton onClick={() => setOpenDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </ListSubheader>
            }
          >
            <Divider />

            <ListItemButton onClick={() => setOpenOrden(!openOrden)}>
              <ListItemText
                primary="מיון:"
                secondary={sortProdSetting}
                sx={{
                  textAlign: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  gap: '10px',
                  '& .MuiListItemText-primary': {
                    fontSize: '16px',
                  },
                  '& .MuiListItemText-secondary': {
                    fontSize: '16px',
                  },
                }}
              />
              {openOrden ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openOrden} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {sortArr?.map((item, key) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={key}
                    onClick={() => handleOrderBy(item.value)}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            <ListItemButton onClick={() => setOpenProd(!openProd)}>
              <ListItemText
                primary="מוצרים:"
                secondary={prodsPerPage}
                sx={{
                  textAlign: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  gap: '10px',
                  '& .MuiListItemText-primary': {
                    fontSize: '16px',
                  },
                  '& .MuiListItemText-secondary': {
                    fontSize: '16px',
                  },
                }}
              />
              {openProd ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProd} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {prodsPerPageArr?.map((item, key) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={key}
                    onClick={() => handleChangeItemsPerPage(item.value)}
                  >
                    <ListItemText primary={`כמות: ${item.value}`} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            {filters.map((filter) => (
              <React.Fragment key={filter.id}>
                <ListItemButton onClick={() => toggleFilter(filter.id.toString())}>
                  <ListItemText
                    primary={filter.title}
                    secondary={
                      (localSelectedValues[filter.id] || []).length > 0
                        ? `${localSelectedValues[filter.id].length} נבחרו`
                        : ' לא נבחר'
                    }
                  />
                  {openFilters[filter.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openFilters[filter.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {filter.SubAttributes?.map((subItem) => (
                      <ListItem key={subItem.id} sx={{ pl: 4 }}>
                        <Checkbox
                          checked={(localSelectedValues[filter.id] || []).includes(subItem.id.toString())}
                          onChange={() => handleChange(filter.id, subItem.id.toString())}
                        />
                        <ListItemText primary={subItem.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileFilterWithAttributes;
