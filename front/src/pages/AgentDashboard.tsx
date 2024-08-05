import React, { useState } from 'react'
import { Box, Container, Fab, Grid } from '@mui/material'
import { Tab, Tabs } from '../utils/tabs'
import Utils from '../utils'
import Agent from '../components/Agent'
import AddIcon from '@mui/icons-material/Add'
import Modals from '../components/Modals'

const AgentDashboard = () => {
  const [openVisitModal, setOpenVisiModal] = useState(false)
  const [openMission, setOpenMission] = useState(false)

  const components = [
    {
      title: 'דאשבורד',
      component: (
        <>
          <Agent.Dashboard.MainInfo />
          <Agent.Dashboard.Daily />
          <Agent.Dashboard.Tasks />
          <Agent.Dashboard.Targets />
        </>
      ),
    },
    {
      title: 'משימות',
      component: (
        <>
          <Agent.Missions.Filter />
          <Agent.Missions.Schedule />
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: 'fixed',
              right: '50px',
              bottom: '50px',
              borderRadius: '5px',
              width: '80px',
              height: '80px',
            }}
            onClick={() => setOpenMission(true)}
          >
            <AddIcon style={{ fontSize: '50px' }} />
          </Fab>
        </>
      ),
    },
    {
      title: 'תבניות ביקורים',
      component: (
        <>
          <Agent.Visits.List />
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: 'fixed',
              right: '50px',
              bottom: '50px',
              borderRadius: '5px',
              width: '80px',
              height: '80px',
            }}
            onClick={() => setOpenVisiModal(true)}
          >
            <AddIcon style={{ fontSize: '50px' }} />
          </Fab>
        </>
      ),
    },
    {
      title: 'יעדים',
      component: (
        <>
          {/* <Agent.Targets.Filter /> */}
          <Agent.Targets.List />
        </>
      ),
    },
  ]

  return (
    <Container maxWidth="xl">
      <Utils.BreadCrumbsUtil array={[]} />
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          {/* {(isSuperAgent || isAdmin) &&  */}
          <Agent.SideBar />
          {/* // } */}
        </Grid>
        <Grid item sm={9} xs={12}>
          <Tabs baseRoute="/agentDashboard" params={['tab', 'id']}>
            {components.map((tab, index) => (
              <Tab key={index} label={tab.title}>
                <Box sx={{ margin: '20px 0' }}>{tab.component}</Box>
              </Tab>
            ))}
          </Tabs>
        </Grid>
      </Grid>
      <Modals.Agent.Visit.Handler
        open={openVisitModal}
        setOpen={setOpenVisiModal}
      />
      <Modals.Agent.Mission.Create
        open={openMission}
        setOpen={setOpenMission}
      />
    </Container>
  )
}

export default AgentDashboard
