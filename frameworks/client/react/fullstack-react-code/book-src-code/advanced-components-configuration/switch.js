const CREDITCARD = 'Creditcard';
const BTC = 'Bitcoin';

const Switch = React.createClass({
  getInitialState() {
    return {
      payMethod: BTC
    }
  },

  select(method) {
    return (evt) => {
      this.setState({
        payMethod: method
      })
    }
  },

  renderChoice(choice) {
    let cssClasses = [];

    if(this.state.payMethod === choice) {
      cssClasses.push('active');
    }

    return (
      <div className="choice"
           className={cssClasses}
           onClick={this.select(choice)}>
        {choice}
      </div>
    );
  },

  render() {
    return (
      <div className="switch">
        {this.renderChoice(CREDITCARD)}
        {this.renderChoice(BTC)}
        Pay with: {this.state.payMethod}
      </div>
    );
  }
});

ReactDOM.render(
  <Switch />,
  document.getElementById('switch')
);