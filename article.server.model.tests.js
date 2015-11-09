'use strict';

/**
 * Backend tests should verify that the server-side code you write functions properly. 
 * In general, you should ensure that models are properly saved to your database, and that API calls
 * return the correct data. 
 *
 * In this file, the functionality that writes articles to the DB is tested. 
 */

/**
 * The test environment is set up in the file mean/config/env/test.js. As an example, this is 
 * the variable for setting up the mongo database: 
 *
 * db: {
 *   uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mean-test',
 *   options: {
 *      user: '',
 *      pass: ''
 *    },
 *    // Enable mongoose debug mode
 *    debug: process.env.MONGODB_DEBUG || false
 *  }
 */

/**
 * Module dependencies.
 */
var should = require('should'),
    /** 
     * Functions are tested using assertions. The 'should' module is an assertion library containing methods 
     * that correspond with different function/object states.
     *
     * A simple example (Credit: https://www.npmjs.com/package/should):
     *
     *    var user = {
     *        name: 'tj'
     *      , pets: ['tobi', 'loki', 'jane', 'bandit']
     *    };
     *     
     *    user.should.have.property('name', 'tj');
     *    user.should.have.property('pets').with.lengthOf(4);
     *
     */ 

  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article');

/** 
 * Globals --> these are necessary to have access to the correct mock data when running your unit tests
 */
var user, article;

/**
 * Unit tests
 */

//describe blocks should indicate the functionality you are testing 
describe('Article Model Unit Tests:', function () {

  /** 
   * This function will create a user object and then save it to the DB 
   * before every test is executed. This ensures that each piece of functionality
   * is tested separately. 
   */

  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    });

    user.save(function () {
      //defines the article object after saving the user to DB
      article = new Article({
        title: 'Article Title',
        content: 'Article Content',
        user: user
      });

      done();
    });
  });

  //you can place describe blocks within other describe blocks
  describe('Method Save', function () {

    //The 'it' function is used for the individual unit tests. 
    //These blocks should test a single function
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      return article.save(function (err) {
        should.not.exist(err);
        done(); //executing the done() function will make the program move to the next test.
      });
    });

    it('should be able to show an error when try to save without title', function (done) {
      article.title = '';

      return article.save(function (err) {
        should.not.exist(err);
        done();
      });
    });
  });

  /** 
   * afterEach() will delete the user + article objects created using the 'beforeEach' hook. 
   */

  afterEach(function (done) {
    Article.remove().exec(function () { //docs for exec function: http://mongoosejs.com/docs/api.html#query_Query-exec
      User.remove().exec(done);
    });
  });
});
