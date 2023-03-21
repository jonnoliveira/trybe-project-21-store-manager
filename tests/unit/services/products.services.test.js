const { expect } = require('chai');
const sinon = require('sinon');

const {
productsModel,
} = require('../../../src/models');

const { productsService } = require('../../../src/services');

const { productsList, productItem } = require('./mocks/products.service.mock')

describe('Teste da unidade do productsServices', function () {
  describe('Listando todos os produtos', function () {
    it('Deve retornar null e uma lista completa', async function () {
      // arrange
      sinon.stub(productsModel, 'findAll').resolves(productsList);
      
      // act
      const result = await productsService.findAll();
      
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productsList);
    });

    it('Deve retornar erro caso algo dê errado', async function () {
      // arrange
      sinon.stub(productsModel, 'findAll').resolves(undefined);
      
      // act
      const result = await productsService.findAll();
      // assert
      expect(result.type).to.be.equal(500);
      expect(result.message).to.deep.equal('Erro na requisição');
    });
  });

  describe('Listando um produto específico', function () {
    it('Deve retornar erro caso o Id seja inválido', async function () {
      // arrange
      const result = await productsService.findById('aeae');
      
      // assert
      expect(result.type).to.be.equal(400);
      expect(result.message).to.deep.equal('"id" must be a number');
    });

    it('Deve retornar erro caso o Id não exista', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);

      // act
      const result = await productsService.findById(999);
      // assert
      expect(result.type).to.be.equal(404);
      expect(result.message).to.deep.equal('Product not found');
    });

        it('Deve retornar um produto caso exista o Id', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(productItem);

      // act
      const result = await productsService.findById(3);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productItem);
    });
  });

  afterEach(function () {
  sinon.restore();
  });
});