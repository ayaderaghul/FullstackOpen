import ReactDOM from 'react-dom/client'
// import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
// import { configureStore } from '@reduxjs/toolkit'
import store from './store'
import App from './App'
// import filterReducer from './reducers/filterReducer'
// import notificationReducer from './reducers/notificationReducer'
// import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'




console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)