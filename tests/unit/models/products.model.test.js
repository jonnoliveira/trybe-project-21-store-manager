const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const { productsList, validProduct, itemQuery} = require('./mocks/products.model.mock');

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

  describe('Atualizando um produto da lista pelo Id', function () {
    it('Deve retornar um id de cadastro', async function () {
      // arrange
      const name = 'Biribinha Atômica';
      const id = 1;
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      // act
      const result = await productsModel.updateById(id, name);

      // assert
      expect(result).to.be.deep.equal(1);
    });
  });

  describe('Deletando um produto da lista', function () {
    it('Deve retornar se houve linhas afetadas', async function () {
      // arrange
      const id = 1;
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      // act
      const result = await productsModel.deleteById(id);

      // assert
      expect(result).to.be.equal(1);

    });
  });

  describe('Inserindo um produto da lista', function () {
    it('Deve retornar um produto específico', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      // act
      const result = await productsModel.insert(validProduct);

      // assert
      expect(result).to.be.equal(4);

    });
  });

  describe('Listando um produto específico por query', function () {
    it('Deve retornar o produto', async function () {
      // arrange
      const query = 'Martelo';
      sinon.stub(connection, 'execute').resolves([itemQuery]);

      // act
      const result = await productsModel.findByQuery(query);

      // assert
      expect(result).to.be.equal(itemQuery);
    });
  });


  afterEach(() => {
    sinon.restore();
  })
});