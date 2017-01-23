const Parent = React.createClass({
  render() {
    return (
      <Container component={<p />}>hello</Container>
    );
  }
});

const Container = React.createClass({
  propTypes: {
    component: React.PropTypes.element.isRequired,
    children: React.PropTypes.element.isRequired
  },

  renderChild(childData, index) {
    return React.createElement(
      this.props.component,
      {},
      childData
    );
  },

  render() {
    return (
      <div>
        <p>here is child</p>
        {React.Children.map(
          this.props.children,
          this.renderChild)}
        )
      </div>
    );
  }
});

ReactDOM.render(<Parent />, document.getElementById('children'));