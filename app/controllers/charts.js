const Tweet = require('../models/tweet');

exports.getScoreTrend = (req, res, next) => {
	console.log("At least we got here!");
	var today = new Date();
    today.setDate(today.getDate() - 1);
    console.log("today: " + today);
	// Default 1 week of data
	//var from = today.getDate() - 7;
    var from = new Date();
    from.setDate(from.getDate() - 7);
    if (req.params.from != null && req.params.from != "") {
        from = new Date(req.params.from);
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
        var sum = 0.0;
        var count = 0;
        var index = 0;
        while (date <= today) {
            console.log("date: " + date);
            for (; index < result.length; index += 1) {
                var newDate = new Date(result[index].date);
                // Go to next date
                if (newDate.getMonth() != date.getMonth() || newDate.getFullYear() != date.getFullYear() || newDate.getDate() != date.getDate()) {
                    break;
                }
                sum += result[index].score;
                count += 1;
            }
            // Increment date
            if (count != 0) {
                avg.averageScore = sum/count;
            }
            else {
                avg.averageScore = 0;
            }
            avg.date = date;
            res2.push(avg);
            sum = 0.0;
            count = 0;
            avg = new Object();
            date = new Date(date);
            date.setDate(date.getDate() + 1);
        }

        res.json(res2);
    });
}