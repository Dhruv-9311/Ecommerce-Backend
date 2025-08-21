const axios = require('axios');

class ExchangeRateService {
  constructor() {
    this.rates = null;
    this.apikey = process.env.EXCHANGE_RATE_API_KEY;
    this.baseURL = 'https://v6.exchangerate-api.com/v6/'
  }

  async getRates() {
    const url = `${this.baseURL}${this.apikey}/latest/INR`;
    console.log('Fetching rates from:', url);
    const response = await axios.get(url);
    
    if(response.status === 200 && response.data.result === 'success'){
      this.rates = response.data.conversion_rates;
    }
  }
  convert(amount,sourceCurrency,targetCurrency){
    const sourceRate = this.rates[sourceCurrency];
    const targetRate = this.rates[targetCurrency];
    return amount*(targetRate/sourceRate);
  }
}
module.exports = new ExchangeRateService();