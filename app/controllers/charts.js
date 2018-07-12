const Tweet = require('../models/tweet');

function dateCompare(x, y) {
    if (x.getDate() == y.getDate() && x.getMonth == y.getMonth && x.getFullYear == y.getFullYear) {
        return 0;
    }
    else if (
        // Same month & year, different date
        (x.getFullYear() == y.getFullYear() && x.getMonth() == y.getMonth() && x.getDate() < y.getDate())
        // Same year, different month
        || (x.getFullYear() == y.getFullYear() && x.getMonth() < y.getMonth())
        // Different year
        || (x.getFullYear() < y.getFullYear()) 
    ) {
        return -1;
    }
    else {
        return 1;
    }
}

exports.getScoreTrend = (req, res, next) => {
	var today = new Date();
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
        console.log("# results: " + result.length);
        // res is a list of avg objects
        var res2 = [];
        // avg will have date and score average
        var avg = new Object();
        // Date to iterate
        var date = from;
        var sum = 0.0;
        var count = 0;
        var index = 0;
        // Loop until date passes today
        while (dateCompare(date, today) < 1) {
            console.log("date: " + date);
            for (; index < result.length; index += 1) {
                console.log(result[index]);
                var newDate = new Date(result[index].date);
                // Go to next date, dates are not equal
                if (dateCompare(newDate, date) != 0) {
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
                avg.averageScore = 0.0;
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