const salesList = [
  {
    "saleId": 1,
    "date": "2023-03-22T16:09:09.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-03-22T16:09:09.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-03-22T16:09:09.000Z",
    "productId": 3,
    "quantity": 15
  }
];

saleItem = [
  {
    "date": "2023-03-22T16:09:09.000Z",
    "productId": 1,
    "quantity": 15
  },
];

productById = { id: 1, name: 'Martelo de Thor' };

saleModelRetun = {
  saleId: 1,
  itemsUpdated: [
    {
    date: "2023-03-22T16:09:09.000Z",
    productId: 1,
    quantity: 15
    }
  ]
}

  const itemsSold = {
    "id": 4,
    "itemsSold": [
      {
        "productId": 1,
        "quantity": 10
      }
    ]
}

module.exports = {
  salesList,
  saleItem,
  productById,
  saleModelRetun,
  itemsSold
}