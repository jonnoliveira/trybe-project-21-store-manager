const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const { salesList, saleItem } = require('./mocks/sales.model.mock');

describe('Teste da unidade do salesModel', function () {
  describe('Recuperando a lista de vendas do db', function () {
    it('Deve retornar uma lista', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([salesList]);

      // act
      const result = await salesModel.findAll();

      // assert
      expect(result).to.be.deep.equal(salesList);
    });
  });

  describe('Recuperando uma venda da lista pelo Id', function () {
    it('Deve retornar uma venda específica', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([[salesList[2]]]);
      
      // act
      const [result] = await salesModel.findById(2);

      // assert
      expect(result).to.be.deep.equal(salesList[2]);

    });
  });
  afterEach(() => {
    sinon.restore();
  });
});