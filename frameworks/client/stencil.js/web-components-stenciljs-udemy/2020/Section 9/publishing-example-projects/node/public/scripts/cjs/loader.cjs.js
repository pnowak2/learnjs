'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b9834b6.js');

/*
 Stencil Client Patch Esm v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["uc-spinner_3.cjs",[[1,"uc-stock-finder",{"loading":[32],"searchResults":[32]}],[1,"uc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","onStockSymbolSelected"]]],[1,"uc-spinner"]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
