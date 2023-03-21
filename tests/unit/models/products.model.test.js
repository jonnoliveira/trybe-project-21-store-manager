const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const { productsList } = require('./mocks/products.model.mock');

describe('Teste da unidade do productsModel', function () {
  describe('Recuperando a lista de produtos do db', function () {
    it('Deve retornar uma lista', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([productsList]);

      // act
      const result = await productsModel.findAll();

      // assert
      expect(result).to.be.deep.equal(productsList);

    });
  });

  describe('Recuperando um produto da lista pelo Id', function () {
    it('Deve retornar um produto específico', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([[productsList[1]]]);

      // act
      const result = await productsModel.findById(2);

      // assert
      expect(result).to.be.deep.equal(productsList[1]);

    });
  });

  this.afterEach(() => {
    sinon.restore();
  })
});