export const createStore = <S=any>(intialState: S) => {
  let newState = intialState;

  return {
    getState: ()=>newState,
    setState: (incomingState:S)=>(newState=incomingState),

  }
}

const store = createStore({
    value1: 0,
    value2: 0
})

export default store