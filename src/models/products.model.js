const connection = require('./connection');

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const updateById = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [name, id]);
  return affectedRows;
};

const deleteById = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [id]);
  return affectedRows;
};

const findByQuery = async (q) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
  const [products] = await connection.execute(query, [`%${q}%`]);
  console.log(products);
  return products;
};

const insert = async (name) => {  
  const query = 'INSERT INTO StoreManager.products (name) VALUE ?';
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

module.exports = {
  findAll,
  findById,
  updateById,
  deleteById,
  findByQuery,
  insert,
};