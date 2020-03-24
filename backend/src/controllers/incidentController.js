const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const count = await connection('incidents').count('id');

    const incidents = await connection('Incidents')
      .join('companies', 'companies.id', '=', 'incidents.companyId')
      .select(['incidents.*', 'companies.Name', 'companies.Email', 'companies.WhatsApp', 'companies.City', 'companies.State'])
      .orderBy('incidents.id')
      .limit(5)
      .offset((+page - 1) * 5);

    response.header('X-Total-Count', count[0]['']);

    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;

    const companyId = request.headers.authorization;

    const result = await connection('incidents')
      .insert({
        title,
        description,
        value,
        companyId
      })
      .returning('id');

    const id = result[0];

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const companyId = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('companyId')
      .first();
    if (incident == null) {
      return response.status(400).json({ error: 'Bad request' });
    }
    if (incident.companyId != companyId) {
      console.log(incident.companyId);
      console.log(companyId);
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('incidents')
      .where('id', id)
      .delete();

    return response.status(204).send();
  }
};
