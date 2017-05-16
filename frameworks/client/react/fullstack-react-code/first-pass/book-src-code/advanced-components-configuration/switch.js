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

    if (this.state.payMethod === choice) {
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
        <Choice 
          active={this.state.payMethod === CREDITCARD}
          onClick={this.select(CREDITCARD)}
          label="Pay with Creditcard"
        />

        <Choice 
          active={this.state.payMethod === BTC}
          onClick={this.select(BTC)}
          label="Pay with Bitcoin"
        />
        Pay with: {this.state.payMethod}
      </div>
    );
  }
});

const Choice = (props) => {
  let cssClasses = [];

  if(props.active) {
    cssClasses.push('active')
  }

  return (
    <div className="choice"
      className={cssClasses}
      onClick={props.onClick}>
      {props.label}
    </div>
  );
}

ReactDOM.render(
  <Switch />,
  document.getElementById('switch')
);