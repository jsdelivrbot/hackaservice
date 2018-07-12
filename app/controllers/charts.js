const Tweet = require('../models/tweet');

exports.getScoreTrend = (req, res, next) => {
	console.log("At least we got here!");
	var today = new Date().setHours(0,0,0,0);
    console.log("today: " + today);
	// Default 1 week of data
	//var from = today.getDate() - 7;
    var from = new Date().setHours(0,0,0,0);
    from.setDate(from.getDate() - 7);
    if (req.params.from != null && req.params.from != "") {
        from = new Date(req.params.from).setHours(0,0,0,0);
    }
    console.log("from: " + from);
	// Search dates x: from < x < today
    Tweet
    .find({ date: {$gte: from, $lte: today} })
    .sort({ date: 'asc' })
    .exec(function(err, result) {
        if (err) throw err;
        // res is a list of avg objects
        var res2 = [];
        // avg will have date and score average
        var avg = new Object();
        // Date to iterate
        var date = from;
        var sum = 0;
        var count = 0;
        // Perform algorithm and set as averages
        for (var tweet in result) {
        	var newDate = new Date(result[tweet].date).setHours(0,0,0,0);
        	// Move to next object in array
        	if (newDate != date) {
                console.log("newDate: " + newDate + " vs date: " + date);
        		avg.averageScore = sum/count;
        		avg.date = date;
        		res2.push(avg);
        		date = newDate;
        		sum = 0;
        		count = 0;
        	}
        	sum += result[tweet].score;
        	count += 1;
        }

        res.json(res2);
    });
}