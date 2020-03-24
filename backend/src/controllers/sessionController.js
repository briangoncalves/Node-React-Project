const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { code } = request.body;

    const company = await connection('companies')
      .where('code', code)
      .select('id', 'name')
      .first();

    if (!company) {
      return response.status(400).json({ error: 'No company found for the provided company code' });
    }

    return response.json(company);
  }
};
