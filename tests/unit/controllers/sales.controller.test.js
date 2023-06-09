const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');

const { salesList, saleById, updatedItem, insertedItem } = require('./mocks/sales.mock.js')

describe('Teste da unidade do salesController', function () {
  describe('Listando todos as vendas', function () {
    it('Deve retornar o status 200 e uma lista', async function () {
      // arrange
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAll')
        .resolves({ type: null, message: salesList });
      
      // act
      await salesController.findAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesList);
    });

    it('Deve retornar um erro caso não dê certo', async function () {
      // arrange
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAll')
        .resolves({ type: 500, message: 'Erro de requisição' });
      
      // act
      await salesController.findAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith('Erro de requisição');
    });
  });

  describe('Listando uma venda específica', function () {
    it('Deve retornar o status 200 e o produto', async function() {
      // arrange
      const req = {
        params: { id: 1},
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findById')
        .resolves({ type: null, message: saleById });
      
      // act
      await salesController.findById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleById);
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
        .stub(salesService, 'findById')
        .resolves({ type: 404, message: 'Product not found' });
      
      // act
      await salesController.findById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' } );
    });
  });

  describe('Deleta uma venda', function () {
    it('Ao passar um id inválido deve retornar um erro', async function() {
       // arrange
      const req = {
        params: { id: 99 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'deleteById')
        .resolves({ type: 404, message: 'Product not found' });
      
      // act
      await salesController.deleteById(req, res);

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
        .stub(salesService, 'deleteById')
        .resolves({ type: null });
      
      // act
      await salesController.deleteById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(204);
    });
  });

  describe('Atualizando uma venda', function () {
    it('Ao passar um id inválido deve retornar um erro', async function() {
       // arrange
      const req = {
        params: { id: 99 },
        body: [
            {
              "productId": 1,
              "quantity": 10
            },
            {
              "productId": 2,
              "quantity": 50
            }
          ]
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'updateById')
        .resolves({ type: 404, message: 'Sale not found' });
      
      // act
      await salesController.updateById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' } );
    });

    it('Ao passar um id válido retorna com sucesso', async function() {
       // arrange
      const req = {
        params: { id: 1 },
        body: [
            {
              "productId": 1,
              "quantity": 10
            },
            {
              "productId": 2,
              "quantity": 50
            }
          ]
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'updateById')
        .resolves({ type: '', message: updatedItem });
      
      // act
      await salesController.updateById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedItem);
    });
  });

  describe('Inserindo uma venda', function () {
    it('Retorna erro se não houver o campo productId', async function () {
      // arrange
      const req = {
        body: [
          {
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'insertSale')
        .resolves({ type: 400, message: '"productId" is required' });
      
      // act
      await salesController.insertSale(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('Retorna sucesso se tiver tudo certo', async function () {
      // arrange
      const req = {
        body: [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'insertSale')
        .resolves({ type: null, message: insertedItem });
      
      // act
      await salesController.insertSale(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(insertedItem);
    });
  });

    afterEach(() => {
    sinon.restore();
    })
});