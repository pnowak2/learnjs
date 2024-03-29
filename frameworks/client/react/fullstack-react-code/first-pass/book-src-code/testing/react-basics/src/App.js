import React from 'react';

const App = React.createClass({
  getInitialState: function () {
    return {
      items: [],
      item: '',
    }
  },
  onItemChange: function (e) {
    this.setState({
      item: e.target.value,
    });
  },
  addItem: function (e) {
    e.preventDefault();

    this.setState({
      items: this.state.items.concat(
        this.state.item
      ),
      item: '',
    });
  },
  render: function () {
    const submitDisabled = !this.state.item;
    return (
      <div
        className='ui text container'
        id='app'
        >
        <table className='ui selectable structured large table'>
          <thead>
            <tr>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.items.map((item, idx) => (
                <tr
                  key={idx}
                  >
                  <td>{item}</td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <th>
                <form
                  className='ui form'
                  onSubmit={this.addItem}
                  >
                  <div className='field'>
                    <input
                      className='prompt'
                      type='text'
                      placeholder='Add item...'
                      value={this.state.item}
                      onChange={this.onItemChange}
                      />
                  </div>
                  <button
                    className='ui button'
                    type='submit'
                    disabled={submitDisabled}
                    >
                    Add item
                </button>
                </form>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
})

export default App;
