var React = require('react');

function ConfirmBattle(props) {
	return props.isLoading === true
		? <p> Loading </p> 
		: <p> Confirm battle! </p>
}

module.exports = ConfirmBattle;