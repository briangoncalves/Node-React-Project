const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const companyId = request.headers.authorization;
    const incidents = await connection('Incidents')
      .where('companyId', companyId)
      .select('*');

    return response.json(incidents);
  }
};
