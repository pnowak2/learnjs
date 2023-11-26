define(function(require) {
  var _ = require('underscore'),
    $ = require('jquery');

  var searchByKeyword = function(keyword, success, failure) {
    var url = '/programmes/service/es/search?index=eplus&indexTypeShow=projectPublicSearch&searchType=simple&indexTypeSearch=projectPublicSearch&GOOD_PRACTICE=false&SUCCESS_STORY=false&sort=MODIFIED_DATE-DESC&sEcho=1&iColumns=6&sColumns=nodeRef%2Ctitle%2Cdescription%2Ctopics%2CstartDate%2Ccountries&iDisplayStart=0&iDisplayLength=10&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5';

    var request = $.ajax({
      url: url,
      dataType: 'json',
      method: 'GET',
      data: {
        'KEYWORD': keyword
      }
    });

    request
      .done(function(response) {
        var projects = _.map(response.aaData, function(responseItem) {
          return {
            id: responseItem[0],
            title: responseItem[1],
            description: responseItem[2],
            year: responseItem[4],
            countries: responseItem[5]
          }
        });
        success.call(null, projects);
      })
      .fail(function(jqXHR, textStatus) {
        failure.call(null, textStatus);
      });
  }

  return {
    searchByKeyword: searchByKeyword
  }
});