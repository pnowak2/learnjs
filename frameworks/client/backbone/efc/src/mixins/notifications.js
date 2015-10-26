define(function(require) {
  return {
    showInfo: function(message) {
      console.log('show info ' + message);
    },

    showWarning: function(message) {
      console.log('show warning ' + message);
    },

    showError: function(message) {
      console.log('show error ' + message);
    }
  }
});