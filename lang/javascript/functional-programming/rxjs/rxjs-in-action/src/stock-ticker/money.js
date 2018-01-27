export const Money = function(currency, value) {
  return {
    currency: function () {
      return currency;
    },
    value: function () {
      return value;
    },
    toString: function () {
      return `${value} ${currency}`;
    }
  }
}