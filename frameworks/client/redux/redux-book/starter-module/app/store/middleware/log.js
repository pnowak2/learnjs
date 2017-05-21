// const logMiddleware = ({ getState, dispatch }) => (next) => (action) => {
//   console.log(`Action: ${action.type}`);

//   next(action);
// }

// same as

var logMiddleware = function logMiddleware(store) {
  var getState = store.getState,
      dispatch = store.dispatch;
  return function (next) {
    return function (action) {
      console.log("Action: " + action.type);

      next(action);
    };
  };
};

export default logMiddleware;