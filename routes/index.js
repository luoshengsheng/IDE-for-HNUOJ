var express = require('express');
var router = express.Router();
var UAParser = require('ua-parser-js');

//browser filter
router.all(/\/.*$/, filterBrowser);
function filterBrowser(req, res, next) {
  var parser = new UAParser();
  var ua = req.headers['user-agent'];
  var browserName = parser.setUA(ua).getBrowser().name;
  var fullBrowserVersion = parser.setUA(ua).getBrowser().version;
  var browserVersion = fullBrowserVersion.split(".",1).toString();
  var browserVersionNumber = Number(browserVersion);

  if (browserName == 'IE' && browserVersion <= 9)
    res.redirect('/ignoreBrowser');
  else if (browserName == 'Firefox' && browserVersion <= 20)
    res.redirect('/ignoreBrowser');
  else if (browserName == 'Chrome' && browserVersion <= 15)
    res.redirect('/ignoreBrowser');
  else if (browserName == 'Canary' && browserVersion <= 15)
    res.redirect('/ignoreBrowser');
  else if (browserName == 'Safari' && browserVersion <= 3)
    res.redirect('/ignoreBrowser');
  else if (browserName == 'Opera' && browserVersion <= 8)
    res.redirect('/ignoreBrowser');
  else
    return next();
}
router.get('/ignoreBrowser', function(req, res, next) {
  // res.render('ignoreBrowser', {});
  return res.redirect('/ignoreBrowser.html');

});
// router.get('/', checkLogin);
/* GET index page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', {});
// });
/* GET index page. */
router.get('/njudge', function(req, res, next) {
    return res.redirect('/index.html');
});

module.exports = router;