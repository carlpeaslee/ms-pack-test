import React, { Component } from 'react'
import { createStore } from 'redux'
import {connect} from 'react-redux'


export const store = createStore(
  reducer,
  loadState()
)
store.subscribe(()=>{
  saveState(store.getState())
})

class App extends Component {

  render() {
    console.log(this)
    return (
      <div>
        <h3>
          Hi this is baby! {this.props.counter}
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

const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}


App = connect(
  mapStateToProps
)(App)

export default App


function reducer (state = {counter: 0}, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        counter: state.counter + 1
      }
    case 'DECREMENT':
      return {
        counter: state.counter - 1
      }
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
    return JSON.parse(stringState)
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
