import React from 'react'
import { useAuth } from '../store/auth.store'
import { Box, Button, Container } from '@mui/material'
import Home from '../components/Home'
import hooks from '../hooks'
import useSWR from 'swr'
import services from '../services'
import { useAuthProvider } from '../provider/AuthProvider'
import { Link } from 'react-router-dom'

const fetchData = async () => {
  return await services.Admin.AdminHomeEditService.getHomeEdits()
}

const HomePage = () => {
  const { user } = useAuth()
  const { isAuthrized } = useAuthProvider()

  const { data: specialCatalog, isLoading: specialLoading } =
    hooks.useDataCatalog('', 'special')

  const { data: newCatalog, isLoading: newLoading } = hooks.useDataCatalog(
    '',
    'new'
  )

  const { data } = useSWR(`api/homeEdit`, () => fetchData(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })

  return (
    <Box>
      {data?.['hydra:member']?.map((element) => {
        if (element.type === 'main') {
          if (element.isVideo && element.isActive) {
            return (
              <Home.Video
                isVideo={true}
                src={element?.homeMedia[0]?.media?.filePath}
              />
            )
          }

          if (element.isBanner && element.isActive) {
            return (
              <Home.Video
                isVideo={false}
                src={element?.homeMedia[0]?.media?.filePath}
              />
            )
          }
        }
        return (
          <Container
            maxWidth="xl"
            sx={{ marginBottom: isAuthrized ? '50px' : '0px' }}
          >
            {isAuthrized && (
              <>
                {element.type === 'categories' && element.isActive && (
                  <Box sx={{ marginTop: '50px' }}>
                    <Home.Categories
                      toShow={element.count}
                      toShowMobile={element.countMobile}
                    />
                    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', mt:'50px'}}>
                      <Link to="/client/catalog/0/0/0?page=1">
                        <Button
                          variant="contained"
                          sx={{ padding: '12px 20px' }}
                          color="secondary"
                        >
                          לקטלוג המלא
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                )}
      
                {element.type === 'productsNew' && element.isActive && (
                  <Box>

                    {newCatalog?.['hydra:member'] && (
                      <Home.Products
                        title={'מוצרים חדשים'}
                        array={newCatalog['hydra:member'].slice(0, 10)}
                        toShow={element.count}
                        toShowInMobile={element.countMobile}
                        column={1}
                        link="/client/new/1/0/0?page=1"
                        loading={specialLoading}
                      />
                    )}
                  </Box>
                )}
                {element.type === 'productsSale' && element.isActive && (
                  <Box sx={{ marginTop: '60px' }}>
                  {specialCatalog?.['hydra:member'] && (
                    <Home.Products
                      title={'מוצרים מיוחדים'}
                      array={specialCatalog?.['hydra:member']} 
                      toShow={element.count}
                      toShowInMobile={element.countMobile}
                      column={1}
                      link="/client/special/1/0/0?page=1"
                      loading={newLoading}
                    />
                  )}
                </Box>
                )}
              </>
            )}
          </Container>
        )
      })}
    </Box>
  )
}

export default HomePage
