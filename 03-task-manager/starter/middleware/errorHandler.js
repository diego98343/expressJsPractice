const errorHandlerMiddlewere = (err, req, res, next) => {
    // return res.status(500).json({ msg: err });
   return res.status(err.status).json({ msg:`somethin went wrong please try again later`  });
}


module.exports = errorHandlerMiddlewere;