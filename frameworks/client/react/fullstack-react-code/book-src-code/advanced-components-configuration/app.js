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

ReactDOM.render(
  <Component name={'nazwa'} totalCount={5} />,
  document.getElementById('content')
);