function createStore(reducer, initialState) {
  let listeners = [];

  let state = initialState;

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener.call())
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe
  };
}

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat(action.message)
    }
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: [
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(action.index + 1, state.messages.length),
      ]
    }
  } else {
    return state;
  }
}

const initialState = { messages: [] }
const store = createStore(reducer, initialState);

const App = React.createClass({
  componentDidMount: function () {
    store.subscribe(() => this.forceUpdate());
  },

  render: function () {
    const message = store.getState().messages;

    return (
      <div className='ui segment'>
        <MessageView messages={messages} />
        <MessageInput />
      </div>
    );
  }
});

const MessageInput = React.createClass({
  handleSubmit: function () {
    store.dispatch({
      type: 'ADD_MESSAGE',
      message: this.refs.messageInput.value
    });
    this.refs.messageInput.value = '';
  },

  render: function() {
    return (
      <div className='ui input'>
        <input ref='messageInput' type='text' />
        <button onClick={this.handleSubmit} className='ui primary button' type='submit'>
          Submit
        </button>
      </div>
    )
  }
});

const MessageView = React.createClass({
  render: function() {
    return (
      <div></div>
    );
  }
});

ReactDOM.render(<App />, document.querySelector('#content'));