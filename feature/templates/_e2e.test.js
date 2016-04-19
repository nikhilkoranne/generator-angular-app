describe('Testing <%= pageName %> Page', function () {
    beforeEach(function () {
        browser.driver.manage().window().maximize();
        browser.get('#/<%= url %>');
       
    });
    it('should do some e2e test', function () {
         // The test logic
         // ...
    });
});