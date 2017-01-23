const Parent = React.createClass({
  render() {
    return (
      <Container><div>te</div></Container>
    );
  }
});

const Container = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  render() {
    return (
      <div><p>here is child</p><b>{this.props.children}</b></div>
    );
  }
});

ReactDOM.render(<Parent />, document.getElementById('children'));