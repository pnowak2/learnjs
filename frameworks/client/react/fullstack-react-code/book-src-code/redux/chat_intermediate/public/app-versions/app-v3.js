/* eslint-disable no-undef */ /* eslint-disable no-shadow */

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    const newMessage = {
      text: action.text,
      timestamp: Date.now(),
      id: uuid.v4(),
    };
    return {
      messages: state.messages.concat(newMessage),
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    const index = state.messages.findIndex(
      (m) => m.id === action.id
    );
    return {
      messages: [
        ...state.messages.slice(0, index),
        ...state.messages.slice(
          index + 1, state.messages.length
        ),
      ],
    };
  } else {
    return state;
  }
}

const initialState = {
  threads: [    // Two threads in state
    {
      id: '1-fca2',    // hardcoded pseudo-UUID
      title: 'Buzz Aldrin',
      messages: [
        {   // This thread starts with a single message already
          text: 'Twelve minutes to ignition.',
          timestamp: Date.now(),
          id: uuid.v4(),
        },
      ],
    },
    {
      id: '2-be91',
      title: 'Michael Collins',
      messages: [],
    },
  ],
};

const store = Redux.createStore(reducer, initialState);

const App = React.createClass({
  componentDidMount: function () {
    store.subscribe(() => this.forceUpdate());
  },
  render: function () {
    const messages = store.getState().messages;

    return (
      <div className='ui segment'>
        <MessageView messages={messages} />
        <MessageInput />
      </div>
    );
  },
});

const MessageInput = React.createClass({
  handleSubmit: function () {
    store.dispatch({
      type: 'ADD_MESSAGE',
      text: this.refs.messageInput.value,
    });
    this.refs.messageInput.value = '';
  },
  render: function () {
    return (
      <div className='ui input'>
        <input
          ref='messageInput'
          type='text'
        >
        </input>
        <button
          onClick={this.handleSubmit}
          className='ui primary button'
          type='submit'
        >
          Submit
        </button>
      </div>
    );
  },
});

const MessageView = React.createClass({
  handleClick: function (id) {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      id: id,
    });
  },
  render: function () {
    const messages = this.props.messages.map((message, index) => (
      <div
        className='comment'
        key={index}
        onClick={() => this.handleClick(message.id)}
      >
        <div className='text'>
          {message.text}
          <span className='metadata'>@{message.timestamp}</span>
        </div>
      </div>
    ));
    return (
      <div className='ui center aligned basic segment'>
        <div className='ui comments'>
          {messages}
        </div>
      </div>
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
