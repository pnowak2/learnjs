function reducer(state, action) {
  if(action.type === 'INCREMENT') {
    return state + action.amount
  } else if(action.type === 'DECREMENT') {
    return state - action.amount;
  } else {
    return state;
  }
}

const incrementAction = { type: 'INCREMENT', amount: 5 };
const decrementAction = { type: 'DECREMENT', amount: 11 };

console.log(reducer(0, incrementAction));
console.log(reducer(1, incrementAction));
console.log(reducer(5, incrementAction));

const unknown = { type: 'UNKNOWN' }

console.log(reducer(5, unknown));

console.log(reducer(0, decrementAction));
console.log(reducer(1, decrementAction));
console.log(reducer(5, decrementAction));