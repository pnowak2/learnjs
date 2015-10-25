define(function(require) {

    var searchService = require('app/services/search/searchService'),
        testResponses = {
            search: {
                success: {
                    status: 200,
                    dataType: 'json',
                    responseText: '{ "aaData": [["id", "title", "description", null, "year", "countries"]] }'
                },
                error: {
                    status: 500
                }
            }
        };

    describe('SearchService', function() {

        beforeEach(function() {
            jasmine.Ajax.install();
        });

        afterEach(function() {
            jasmine.Ajax.uninstall();
        });

        describe('api', function() {
            describe('searching by keyword', function() {
                it('should call proper REST service url', function() {
                    searchService.searchByKeyword('test', function() {}, function() {});

                    request = jasmine.Ajax.requests.mostRecent();

                    expect(request.url).toBe('/programmes/service/es/search?index=eplus&indexTypeShow=projectPublicSearch&searchType=simple&indexTypeSearch=projectPublicSearch&GOOD_PRACTICE=false&SUCCESS_STORY=false&sort=MODIFIED_DATE-DESC&sEcho=1&iColumns=6&sColumns=nodeRef%2Ctitle%2Cdescription%2Ctopics%2CstartDate%2Ccountries&iDisplayStart=0&iDisplayLength=10&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&KEYWORD=test');
                    expect(request.method).toBe('GET');
                });

                it('should call success', function(done) {
                    searchService.searchByKeyword('test', function(data) {
                        expect(data).toEqual([{
                            id: 'id',
                            title: 'title',
                            description: 'description',
                            year: 'year',
                            countries: 'countries'
                        }]);
                        done();
                    });

                    request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith(testResponses.search.success);
                });

                it('should call failure', function(done) {
                    searchService.searchByKeyword('test', null, function(data) {
                        expect(data).toEqual('error');
                        done();
                    });

                    request = jasmine.Ajax.requests.mostRecent();
                    request.respondWith(testResponses.search.error);
                });
            });
        });



    });
});