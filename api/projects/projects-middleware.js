// add middlewares here related to projects
function errorHandling(err, req, res, next) { // eslint-disable-line
    res.status(err.status || 500).json({
      message: `Error in the router: ${err.message} from projects`,
      stack: err.stack,
    });
  }

  function logRouter(req, res, next) {
    console.log(`Displaying Info from projects...`);
    next(); 
  }

  module.exports = {
    logRouter,
    errorHandling
}