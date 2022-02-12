export default class CurrecnyExchange {  
  static async getExchange(currency, USD) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${currency}/${USD}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}