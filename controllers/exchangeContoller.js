const exchangeRateService = require("../service/exchangeRateService");

exports.convertCurrency =(req,res,next) => {
  const {amount,sourceCurrency,targetCurrency} = req.body;

  if(!amount || !sourceCurrency || !targetCurrency){
  return res.status(400).json({status:"failure",message: "Invalid request body"});
  }
  const targetAmount = exchangeRateService.convert(amount,sourceCurrency,targetCurrency);

  res.json({status: 'success',targetAmount});

}