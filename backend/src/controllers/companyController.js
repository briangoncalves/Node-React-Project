const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async index(request, response) {
    const companies = await connection('Companies').select('*');

    return response.json(companies);
  },

  async create(request, response) {
    const data = request.body;
    //console.log(data);
    const { name, email, whatsapp, city, state } = data;
    const code = crypto.randomBytes(4).toString('HEX');

    //console.log(code);
    await connection('Companies').insert({
      code,
      name,
      email,
      whatsapp,
      city,
      state
    });

    return response.json({ code });
  }
};
