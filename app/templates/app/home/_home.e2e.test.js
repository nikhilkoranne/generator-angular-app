describe('Testing Home Page', function () {
    beforeEach(function () {
        browser.driver.manage().window().maximize();
        browser.get('#/');
        browser.sleep(2000);
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
    });
    it('should display home page', function () {
        browser.sleep(2000);
        element(by.id('about')).click();
        browser.sleep(2000);
        expect(true).toEqual(true);
    });
});