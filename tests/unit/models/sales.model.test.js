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

  describe('Deletando uma venda da lista', function () {
    it('Deve retornar se houve linhas afetadas', async function () {
      // arrange
      const id = 1;
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      // act
      const result = await salesModel.deleteById(id);

      // assert
      expect(result).to.be.equal(1);

    });
  });

  describe('Atualizando um produto da lista pelo Id', function () {
    it('Deve retornar um id de cadastro', async function () {
      // arrange
      const quantity = 15;
      const id = 1;
      const productId = 1
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      // act
      const result = await salesModel.updateById(quantity, id, productId);

      // assert
      expect(result).to.be.deep.equal(1);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});