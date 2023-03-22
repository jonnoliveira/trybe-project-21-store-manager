const { expect } = require('chai');
const sinon = require('sinon');

const {
salesModel,
} = require('../../../src/models');

const { salesService } = require('../../../src/services');

const { salesList, saleItem } = require('./mocks/sales.service.mock');

describe('Teste da unidade do salesService', async function () {
  describe('Listando todos as vendas', function () {
    it('Deve retornar null e uma lista completa', async function () {
      // arrange
      sinon.stub(salesModel, 'findAll').resolves(salesList);
      
      // act
      const result = await salesService.findAll();
      
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(salesList);
    });

    it('Deve retornar erro caso algo dê errado', async function () {
      // arrange
      sinon.stub(salesModel, 'findAll').resolves(undefined);
      
      // act
      const result = await salesService.findAll();

      // assert
      expect(result.type).to.be.equal(404);
      expect(result.message).to.deep.equal('Sale not found');
    });
  });

  describe('Listando uma venda específica', function () {
    it('Deve retornar erro caso o Id seja inválido', async function () {
      // arrange
      const result = await salesService.findById('aeae');
      
      // assert
      expect(result.type).to.be.equal(400);
      expect(result.message).to.deep.equal('"id" must be a number');
    });

    it('Deve retornar erro caso o Id não exista', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves([]);

      // act
      const result = await salesService.findById(999);

      // assert
      expect(result.type).to.be.equal(404);
      expect(result.message).to.deep.equal('Sale not found');
    });

    it('Deve retornar uma venda caso exista o Id', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves(saleItem);

      // act
      const result = await salesService.findById(2);

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleItem);
    });

  describe('Deleta um produto', function () {
    it('Ao passar um id inválido deve retornar um erro', async function() {
      // arrenge
      const id = 'aeae';
      
      // act
      const result = await salesService.deleteById(id);
      
      // assert
      expect(result.type).to.be.equal(400);
      expect(result.message).to.deep.equal('\"id\" must be a number');
    });

    it('Ao passar um id inexistente deve retornar um erro', async function() {
      // arrenge
      const id = 999;
      sinon.stub(salesModel, 'deleteById').resolves(0)
      
      // act
      const result = await salesService.deleteById(id);
      
      // assert
      expect(result.type).to.be.equal(404);
      expect(result.message).to.deep.equal('Sale not found');
    });

    it('Retorna sucesso quando estiver tudo ok', async function() {
      // arrenge
      const id = 1;
      sinon.stub(salesModel, 'deleteById').resolves(1)
      
      // act
      const result = await salesService.deleteById(id);
      
      // assert
      expect(result.type).to.be.equal(null);
    });
  });
  
  });

  describe('Deleta uma venda', function () {
    it('Ao passar um id inválido deve retornar um erro', async function() {
      // arrenge
      const id = 'aeae';
      
      // act
      const result = await salesService.deleteById(id);
      
      // assert
      expect(result.type).to.be.equal(400);
      expect(result.message).to.deep.equal('\"id\" must be a number');
    });

    it('Ao passar um id inexistente deve retornar um erro', async function() {
      // arrenge
      const id = 999;
      sinon.stub(salesModel, 'deleteById').resolves(0)
      
      // act
      const result = await salesService.deleteById(id);
      
      // assert
      expect(result.type).to.be.equal(404);
      expect(result.message).to.deep.equal('Sale not found');
    });

    it('Retorna sucesso quando estiver tudo ok', async function() {
      // arrenge
      const id = 1;
      sinon.stub(salesModel, 'deleteById').resolves(1)
      
      // act
      const result = await salesService.deleteById(id);
      
      // assert
      expect(result.type).to.be.equal(null);
    });
  });
  

  afterEach(() => {
    sinon.restore();
  })
});
