const Component = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    totalCount: React.PropTypes.number,
    isOk: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      isOk: true
    }
  },

  render() {
    return (
      <div>
        <div>
          Component name: {this.props.name}
        </div>
        <div>
          Component total count: {this.props.totalCount}
        </div>
        <div>
          Component isOk: {this.props.isOk ? 'ok' : 'not ok'}
        </div>
      </div>
    );
  }
});

const A = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },

  contextTypes: {
    name: React.PropTypes.string
  },

  componentDidUpdate(prevProps, prevState, nextContext) {
    console.log(nextContext);
    console.log('didupdate');
  },

  render() {
    return (
      <div> name: {this.context.name}, A</div>
    );
  }
});

const B = React.createClass({
  render() {
    return (
      <div><A />B</div>
    );
  }
});

const C = React.createClass({
  childContextTypes: {
    name: React.PropTypes.string
  },

  getChildContext() {
    return {
      name: 'name from parent'
    }
  },

  render() {
    return (
      <div><B />C</div>
    );
  }
});

ReactDOM.render(
  <C />,
  document.getElementById('content')
);