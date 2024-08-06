import { Box, Container } from '@mui/material'
import React from 'react'
import { Tab, Tabs } from '../utils/tabs'
import Agent from '../components/Agent'
import moment from 'moment'

const AgentStatistics = () => {
  const tabDatable = [
    {
      tabIndex: 0,
      dateFrom: moment().format('YYYY-MM-DD'),
      dateTo: moment().format('YYYY-MM-DD'),
    },
    {
      tabIndex: 1,
      dateFrom: moment().startOf('month').format('YYYY-MM-DD'),
      dateTo: moment().format('YYYY-MM-DD'),
    },
    {
      tabIndex: 2,
      dateFrom: moment().startOf('year').format('YYYY-MM-DD'),
      dateTo: moment().format('YYYY-MM-DD'),
    },
  ]
  const components = [
    {
      title: 'יומי',
      component: (
        <>
          <Box>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Agent.Statistics.Intro />
              <Agent.Statistics.MainInfo />
              <Agent.Statistics.PieAgents />
            </Box>
            <Box sx={{ mt: '30px' }}>
              <Agent.Statistics.AgentsList />
            </Box>
          </Box>
        </>
      ),
    },
    {
      title: 'חודשי',
      component: (
        <>
          <Box>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Agent.Statistics.Intro />
              <Agent.Statistics.MainInfo />
              <Agent.Statistics.PieAgents />
            </Box>
            <Box sx={{ mt: '30px' }}>
              <Agent.Statistics.AgentsList />
            </Box>
          </Box>
        </>
      ),
    },
    {
      title: 'שנתי',
      component: (
        <>
          <Box>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Agent.Statistics.Intro />
              <Agent.Statistics.MainInfo />
              <Agent.Statistics.PieAgents />
            </Box>
            <Box sx={{ mt: '30px' }}>
              <Agent.Statistics.AgentsList />
            </Box>
          </Box>
        </>
      ),
    },
  ]

  return (
    <Container maxWidth="lg">
      <Tabs
        baseRoute="/agentStatistics"
        params={['tab', 'date']}
        isDatable={true}
        tabDatable={tabDatable}
      >
        {components.map((tab, index) => (
          <Tab key={index} label={tab.title}>
            <Box sx={{ margin: '20px 0' }}>{tab.component}</Box>
          </Tab>
        ))}
      </Tabs>
    </Container>
  )
}

export default AgentStatistics
