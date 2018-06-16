var express = require('express');
var router = express.Router();
var config = require('../bin/config');
var auth = require('../bin/auth')
var queries = require('../models/queries')

router.use('/', function (req, res, next) {

  var courseID = auth.provider.body.custom_canvas_course_id;
  var userID = auth.provider.body.custom_canvas_user_id;

  if (courseID == 10184) {
    courseID = 38082;
  }

  console.log('User ID: ');
  console.log(userID);

  console.log('Course ID: ');
  console.log(courseID);

  if (auth.provider.admin) {
    if (req.query.masquerade) {
      queries.homepageQuery(parseInt(req.query.masquerade), courseID, function (module_progress, score, awarded_badge_ids, leaderboard, my_team, home_updates, home_vids) {
        res.render('home', {
          title: 'Home | ONEXYS',
          courseID: courseID,
          module_progress: module_progress,
          score: score,
          awarded_badge_ids: awarded_badge_ids,
          leaderboard: leaderboard,
          my_team: my_team,
          home_updates: home_updates,
          home_vids: home_vids,
          admin: auth.provider.admin,
          masquerade: true,
        });
      });
    } else {
      queries.homepageAdminQuery(courseID, function (module_progress, leaderboard, home_updates, home_vids, students) {
        res.render('home', {
          title: 'Home | ONEXYS',
          courseID: courseID,
          module_progress: module_progress,
          score: 0,
          awarded_badge_ids: [],
          leaderboard: leaderboard,
          my_team: {
            Name: "Admin",
            Score: 0
          },
          home_updates: home_updates,
          home_vids: home_vids,
          admin: auth.provider.admin,
          masquerade: false,
          students: students
        });
      });
    }
  }

  else {
    queries.homepageQuery(userID, courseID, function (module_progress, score, awarded_badge_ids, leaderboard, my_team, home_updates, home_vids) {
      res.render('home', {
        title: 'Home | ONEXYS',
        courseID: courseID,
        module_progress: module_progress,
        score: score,
        awarded_badge_ids: awarded_badge_ids,
        leaderboard: leaderboard,
        my_team: my_team,
        home_updates: home_updates,
        home_vids: home_vids,
        admin: auth.provider.admin
      });
    });
  }
});

module.exports = router;
