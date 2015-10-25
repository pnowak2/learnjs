define(function (require) {
  var _ = require('underscore'),
      Backbone = require('backbone'),
      SearchCriteriaModel = require('../models/searchCriteriaModel'),
      tpl = require('text!../templates/searchbox.html');

  var ENTER_KEY = 13;

  return Backbone.View.extend({
    className: 'efc-searchbox',

    template: _.template(tpl),

    events: {
      'click button': 'searchButtonClicked',
      'keypress input': 'keyPressed'
    },

    initialize: function () {
      this.model = new SearchCriteriaModel;
      this.listenTo(this.model, 'invalid', this.validationDidFail);
    },

    searchButtonClicked: function () {
      this.performSearch();
    },

    validationDidFail: function (e) {
      this.trigger('searchbox:invalid', e.validationError);
    },

    keyPressed: function (e) {
      if (e.which === ENTER_KEY) {
        e.preventDefault();
        this.performSearch();
      }
    },

    performSearch: function () {
      var isValid = this.model.set('keyword', this.keywordInput.val(), { validate: true });
      if(isValid) {
        this.trigger('searchbox:keyword', this.model.toJSON());
      }
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.keywordInput = this.$el.find('input');

      return this;
    }
  });
});