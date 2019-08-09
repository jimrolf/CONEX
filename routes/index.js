var express = require('express'),
    router = express.Router(),
    config = require("../bin/config"),
    queries = require("../models/queries");


router.use('/home', (req, res) => {
    var courseID = parseInt(req.session.course_id),
        userID = parseInt(req.session.user_id),
        is_physics = Boolean(courseID == 48039);

    if (req.session.admin) {
        if (req.query.masquerade) {
            queries.homepageQueryMasquerade(parseInt(req.query.masquerade), courseID, req.session.course_title, dataArray => {
                res.render("home", {
                    title: "Home | " + config.herokuAppName,
                    module_progress: dataArray[0],
                    post_test_status: dataArray[1],
                    score: dataArray[2],
                    awarded_badges: dataArray[3],
                    leaderboard: dataArray[4],
                    my_team: dataArray[5],
                    home_updates: dataArray[6],
                    home_vids: dataArray[7],
                    home_links: dataArray[8],
                    daily_yalie: dataArray[9],
                    canvasURL: config.canvasURL,
                    admin: req.session.admin,
                    masquerade: true,
                    heroku_app: config.herokuAppName,
                    lucky: req.session.lucky,
                    courseID,
                    is_physics,
                });
            });
        } else {
            queries.homepageAdminQuery(courseID, req.session.course_title, dataArray => {
                res.render("home", {
                    title: "Home | " + config.herokuAppName,
                    module_progress: dataArray[0],
                    post_test_status: dataArray[1],
                    score: 0,
                    awarded_badges: [],
                    leaderboard: dataArray[2],
                    my_team: {Name: "Admin", Score: 0},
                    home_updates: dataArray[2],
                    home_vids: dataArray[3],
                    home_links: dataArray[4],
                    students: dataArray[5],
                    daily_yalie: dataArray[6],
                    canvasURL: config.canvasURL,
                    admin: req.session.admin,
                    heroku_app: config.herokuAppName,
                    masquerade: false,
                    lucky: req.session.lucky
                    courseID,
                    is_physics,
                });
            });
        }
    } else {
        queries.homepageQuery(userID, courseID, req.session.course_title, dataArray => {
            res.render("home", {
                title: "Home | " + config.herokuAppName,
                courseID: dataArray[0],
                module_progress: dataArray[1],
                post_test_status: dataArray[2],
                score: dataArray[3],
                awarded_badges: dataArray[4],
                leaderboard: dataArray[5],
                my_team: dataArray[6],
                home_updates: dataArray[7],
                home_vids: dataArray[8],
                home_links: dataArray[9],
                daily_yalie: dataArray[10],
                canvasURL: config.canvasURL,
                admin: req.session.admin,
                heroku_app: config.herokuAppName,
                lucky: req.session.lucky,
                is_physics,
            });
        });
    }
});

// Serve index page
router.use('/', function(req, res, next) {
  res.render('index', { title: 'System Index' });
});

module.exports = router;
