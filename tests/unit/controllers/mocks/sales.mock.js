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

saleById = [
  {
    "date": "2023-03-22T16:09:09.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-03-22T16:09:09.000Z",
    "productId": 2,
    "quantity": 10
  }
]

const updatedItem = {
  "saleId": "1",
  "itemsUpdated": [
    {
      "date": "2023-03-23T01:22:09.000Z",
      "productId": 1,
      "quantity": 100
    },
    {
      "date": "2023-03-23T01:22:09.000Z",
      "productId": 2,
      "quantity": 50
    }
  ]
}

const insertedItem = {
  "id": 4,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 50
    }
  ]
}

module.exports = {
  salesList,
  saleById,
  updatedItem,
  insertedItem
}