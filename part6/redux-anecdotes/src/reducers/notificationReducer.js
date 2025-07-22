import {createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state,action) {
            return action.payload
        },
        clearNotification(){
            return ''
        }
    }
})

export const {setNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer


let timeoutId = null

export const setNotificationWithTimeout = (message, seconds) => {
    return dispatch => {

    dispatch(setNotification(message))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null
    }, seconds * 1000)
  }
}