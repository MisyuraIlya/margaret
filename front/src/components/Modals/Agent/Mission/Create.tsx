import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import moment from 'moment'
import { useMyScheduleCalendar } from '../../../../store/ScheduleCalendar.store'
import { onSuccessAlert } from '../../../../utils/MySweetAlert'
import ModalWrapper from '../../../../components/Modals/ModalWrapper'
import hooks from '../../../../hooks'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { TimePicker } from '@mui/x-date-pickers'
import { useParams } from 'react-router-dom'

const Create = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (value: boolean) => void
}) => {
  const { id } = useParams()
  const [comment, setComment] = useState('')
  const { weekFrom, weekTo } = useMyScheduleCalendar()
  const { createObjective } = hooks.agent.useDataAgentMissions(weekFrom, weekTo)
  const [date, setDate] = useState(moment())
  const [hourFrom, setHourFrom] = useState(moment())
  const [hourTo, setHourTo] = useState(moment())

  const handleCreate = () => {
    let obj: IAgentObjective = {
      agent: `/api/users/${id}`,
      client: null,
      isCompleted: false,
      completedAt: null,
      title: '',
      description: '',
      week1: false,
      week2: false,
      week3: false,
      week4: false,
      hourFrom: moment(hourFrom).format('HH:mm'),
      hourTo: moment(hourTo).format('HH:mm'),
      choosedDay: moment().locale('he').format('dddd'),
      date: date.format('YYYY-MM-DD'),
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
      objectiveType: 'task',
      subTusk: [],
    }
    console.log(obj)
    createObjective(obj)
    onSuccessAlert('משימה נורה בהצלחה', '')
  }

  return (
    <>
      <ModalWrapper active={open} setActive={setOpen} width={25} height={'50%'}>
        <Box>
          <Typography variant="h6">יצירת משימה</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="בחירת תאריך"
                value={date}
                onChange={(e) => setDate(e)}
              />
            </DemoContainer>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '15px',
              margin: '20px 0',
            }}
          >
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="משעה"
                value={hourFrom}
                onChange={(e) => setHourFrom(e)}
              />
            </DemoContainer>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="עד שעה"
                value={hourTo}
                onChange={(e) => setHourTo(e)}
              />
            </DemoContainer>
          </Box>
          <TextField
            label="פרטי משימה"
            placeholder="פרטי משימה"
            rows={4}
            fullWidth
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: '20px' }}>
            <Button variant="contained" onClick={() => handleCreate()}>
              שמירה
            </Button>
          </Box>
        </Box>
      </ModalWrapper>
    </>
  )
}

export default Create
