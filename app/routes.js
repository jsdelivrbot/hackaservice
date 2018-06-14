var AuthenticationController = require('./controllers/authentication'), 
    express = require('express'),
    passportService = require('./config/passport'),
    passport = require('passport'),
    ResponseController = require('./controllers/responses');
    TweetController = require('./controllers/tweets');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router(),
        myTweetRoutes = express.Router(),
        claimTweetRoutes = express.Router(),        
        tweetRoutes = express.Router(),
        responseRoutes = express.Router();
 
    app.get('/', (req, res) => { res.send('none of ur bznz gtfo :)'); });

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
 
    // get tweets generally
    apiRoutes.use('/tweets', tweetRoutes);
    tweetRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TweetController.getTweets);
    tweetRoutes.get('/:number', TweetController.getSpecificTweets);
    tweetRoutes.get('/:id', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TweetController.getTweetById);
    tweetRoutes.post('/postTweet', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TweetController.postTweet);
    tweetRoutes.get('/good/:number', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']),  TweetController.getGoodTweets);
    tweetRoutes.get('/bad/:number',  requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TweetController.getBadTweets);
    tweetRoutes.get('/byUser/:user',   TweetController.getTweetsByUser);

    // get and post responses
    apiRoutes.use('/responses', responseRoutes);
    responseRoutes.post('/saveResponse', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), ResponseController.saveResponse);
    responseRoutes.get('/getResponses/:user', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), ResponseController.getResponses);

    // get tweets belonging to this csr
    apiRoutes.use('/myTweets', myTweetRoutes);
    myTweetRoutes.get('/:user', TweetController.getMyTweets);
    
    // claim tweets
    apiRoutes.use('/claimTweet', claimTweetRoutes);
    claimTweetRoutes.put('/:tweet', TweetController.claimTweet);

    // Set up routes
    app.use('/api', apiRoutes);
}