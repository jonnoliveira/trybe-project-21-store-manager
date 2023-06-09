const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

const { productsList, productItem, newProduct, updatedItem, itemQuery} = require('./mocks/products.mock')

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

  describe('Adicionando um novo produto', function () {
    it('Ao passar dados inválidos deve retornar um erro', async function() {
      // arrange
      const req = {
        body: { nome: 'la' },
      };
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'insert')
        .resolves({ type: 404, message: 'Product not found' });
      
      // act
      await productsController.insert(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

        it('Ao passar dados validos deve salvar com sucesso', async function() {
      // arrange
      const req = {
        body: newProduct,
      };
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'insert')
        .resolves({ type: null, message: newProduct })
      
      // act
      await productsController.insert(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
  });

  describe('Atualizando um produto', function () {
    it('Ao passar um id inválido deve retornar um erro', async function() {
       // arrange
      const req = {
        params: { id: 99 },
        body: { name: 'Biribinha Atômica' }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateById')
        .resolves({ type: 404, message: 'Product not found' });
      
      // act
      await productsController.updateById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' } );
    });

    it('Ao passar um nome inválido deve retornar um erro', async function() {
       // arrange
      const req = {
        params: { id: 1 },
        body: { name: 'Bir' }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateById')
        .resolves({ type: 422, message: '\"name\" length must be at least 5 characters long' });
      
      // act
      await productsController.updateById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '\"name\" length must be at least 5 characters long' } );
    });

    it('Ao passar dados válidos retorna com sucesso', async function() {
       // arrange
      const req = {
        params: { id: 1 },
        body: { name: 'Biribinha Atômica' }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateById')
        .resolves({ type: null, message: updatedItem });
      
      // act
      await productsController.updateById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedItem);
    });
  });

  describe('Deleta um produto', function () {
    it('Ao passar um id inválido deve retornar um erro', async function() {
       // arrange
      const req = {
        params: { id: 99 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'deleteById')
        .resolves({ type: 404, message: 'Product not found' });
      
      // act
      await productsController.deleteById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' } );
    });

    it('Ao passar um id válido deve retornar com sucesso', async function() {
       // arrange
      const req = {
        params: { id: 1 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'deleteById')
        .resolves({ type: null });
      
      // act
      await productsController.deleteById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(204);
    });
  });

  describe('Listando um produto específico por query', function () {
    it('Deve retornar o status 200 e o produto', async function() {
      // arrange
      const req = {
        query: { q: 'Martelo'},
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findByQuery')
        .resolves({ type: null, message: itemQuery });
      
      // act
      await productsController.findByQuery(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(itemQuery);
    });

    it('Deve falha caso dê algum problema', async function() {
      // arrange
      const req = {query: ''};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findByQuery')
        .resolves({ type: 500, message: 'Erro na requisição' });
      
      // act
      await productsController.findByQuery(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith( { message: 'Erro na requisição' } );
    });
  });


  afterEach(function () {
  sinon.restore();
  });
  
});