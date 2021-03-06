/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        /* Make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            var length = allFeeds.length;
            for (var i = 0; i < length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });
        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
            var length = allFeeds.length;
            for (var i = 0; i < length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    describe('The Menu', function() {

        /* Ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        beforeEach(function(){
            spyOn($('.menu-icon-link'), 'click');
        });
        it('is hidden by default', function(){
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

         /* Ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should appear after click', function(){
            $('.menu-icon-link').click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
        });
        it('should hide again after clicking', function(){
            $('.menu-icon-link').click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        /* Ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            });
        });
        it('are populated with at least a single item', function(done){
            expect($(".feed").children(".entry-link").length).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function() {
        /* Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var initialContent  = $(".feed").text();
        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            });
        });
        it('changes content', function(done){
            expect($(".feed").text()).not.toEqual(initialContent);
            done();
        });

    });
}());
