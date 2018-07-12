const Tweet = require('../models/tweet');

exports.getScoreTrend = (req, res, next) => {
	console.log("At least we got here!");
	var today = new Date();
	// Default 1 week of data
	//var from = today.getDate() - 7;
	var from = new Date(req.params.from) || today.getDay()-7;
	// Search dates x: from < x < today
    Tweet
    .find({ date: {$gte: from, $lte: today} })
    .sort({ date: 'asc' })
    .exec(function(err, result) {
        if (err) throw err;
        // res is a list of avg objects
        let res2 = [];
        // avg will have date and score average
        let avg = new Object();
        // Date to iterate
        let date = from;
        let sum = 0;
        let count = 0;
        // Perform algorithm and set as averages
        for (let tweet in result) {
        	let newDate = new Date(tweet.date);
        	// Move to next object in array
        	if (newDate != date) {
        		avg.averageScore = sum/count;
        		avg.date = date;
        		res2.push(avg);
        		date = newDate;
        		sum = 0;
        		count = 0;
        	}
        	sum += tweet.score;
        	count += 1;
        }

        res.json(res2);
    });
}