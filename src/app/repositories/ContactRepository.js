const { v4 } = require('uuid');
const db = require('../../database/index');

let contacts = [
  {
    id: v4(),
    name: 'Rhuan',
    email: 'rhuan@mail.com',
    phone: '3116194',
    category: v4(),
  },
  {
    id: v4(),
    name: 'Test',
    email: 'test@mail.com',
    phone: '3116194',
    category: v4(),
  },
];

class ContactRepository {
  async findAll(orderBy) {
    const direction = orderBy === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);

    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
			INSERT INTO contacts(name, email, phone, category_id) 
			VALUES($1, $2, $3, $4)
			RETURNING *
		`, [name, email, phone, category_id]);

    return row;
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactRepository();