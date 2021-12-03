// add middlewares here related to actions

function logRouter(req, res, next) {
    console.log(`Displaying Info from actions...`);
    next(); 
  }

function errorHandling(err, req, res, next) { // eslint-disable-line
    res.status(err.status || 500).json({
      message: `Error in the router: ${err.message} from actions`,
      stack: err.stack,
    });
  }

module.exports = {
    logRouter,
    errorHandling
}