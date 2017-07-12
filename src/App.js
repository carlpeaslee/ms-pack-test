import React, { Component } from 'react'
import { createStore } from 'redux'


const store = createStore(reducer)
store.subscribe(()=>{
  saveState(store.getState())
})

class App extends Component {
  render() {
    return (
      <div>
        <h3>
          Hi this is baby!
        </h3>
        <button
          onClick={()=>store.dispatch({type: "INCREMENT"})}
        >
          Increment
        </button>
        <button
          onClick={()=>store.dispatch({type: "DECREMENT"})}
        >
          Decrement
        </button>
      </div>
    )
  }
}

export default App


function reducer (state = {counter: 0}, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state.counter + 1
    case 'DECREMENT':
      return state.counter - 1
    default:
      return state
  }
}

function loadState() {
  try {
    const stringState = localStorage.getItem('state')
    if (stringState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.log(err)
    return undefined
  }
}

function saveState(state) {
  try {
    const stringState = JSON.stringify(state)
    localStorage.setItem("state", stringState)
  } catch (err) {
    console.log(err)
    return undefined
  }
}
