const connection = require('./connection');

// const insertDate = async () => {
//   const query = 'INSERT INTO StoreManager.sales (date) VALUE (NOW())';
//   const [{ insertId }] = await connection.execute(query, []);
//   return insertId;
// };

// const insertSale = async (newProductId, productId, quantity) => {
//   // const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
//   // const [{ insertId }] = await connection.execute(query, [newProductId, productId, quantity]);
//   // return insertId;
// };

const findAll = async () => {
  const query = (`
    SELECT
      sale.sale_id AS saleId,
      date.date,
      sale.product_id AS productId,
      sale.quantity
    FROM
      StoreManager.sales_products AS sale
    INNER JOIN
      StoreManager.sales AS date
    ON
      sale.sale_id = date.id`);
  const [sales] = await connection.execute(query, []);
  return sales;
};

const findById = async (id) => {
  const query = (`
    SELECT
      date.date,
      sale.product_id AS productId,
      sale.quantity
    FROM
      StoreManager.sales_products AS sale
    INNER JOIN
      StoreManager.sales AS date
    ON
      sale.sale_id = date.id
    WHERE
      sale.sale_id  = ?
    ORDER BY
      sale.sale_id, sale.product_id
  `);
  const [sale] = await connection.execute(query, [id]);
  return sale;
};

const deleteById = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [id]);
  return affectedRows;
};

module.exports = {
  // insertDate,
  // insertSale,
  findAll,
  findById,
  deleteById,
};