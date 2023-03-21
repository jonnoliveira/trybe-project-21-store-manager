const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

const { productsList, productItem } = require('./mocks/products.mock')

describe('Teste da unidade do productsController', function () {
  describe('Listando todos os produtos', function () {
    it('Deve retornar o status 200 e uma lista', async function() {
      // arrange
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll')
        .resolves({ type: null, message: productsList });
      
      // act
      await productsController.findAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsList);
    });

    it('Deve retornar um erro caso não dê certo', async function() {
      // arrange
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll')
        .resolves({ type: 500, message: 'Erro de requisição' });
      
      // act
      await productsController.findAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith('Erro de requisição');
    });


  });

  describe('Listando um produto específico', function () {
    it('Deve retornar o status 200 e o produto', async function() {
      // arrange
      const req = {
        params: { id: 1},
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: null, message: productItem });
      
      // act
      await productsController.findById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productItem);
    });

    it('Deve retornar um erro quando id não existe', async function() {
      // arrange
      const req = {
        params: { id: 99 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: 404, message: 'Product not found' });
      
      // act
      await productsController.findById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' } );
    });
  });


  afterEach(function () {
  sinon.restore();
  });
  
});