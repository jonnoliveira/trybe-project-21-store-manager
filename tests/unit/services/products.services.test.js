const { expect } = require('chai');
const sinon = require('sinon');

const {
productsModel,
} = require('../../../src/models');

const { productsService } = require('../../../src/services');

const { productsList, productItem, validName, validProduct, updatedItem } = require('./mocks/products.service.mock')

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
      // act
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

  describe('Adicionando um novo produto', function () {
    it('Ao passar dados inválidos deve retornar um erro', async function() {     
      // act
      const result = await productsService.insert('ih');

      // assert
      expect(result.type).to.be.equal(422);
      expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
    });

    it('Deve retornar erro quando o produto não for encontrado no db', async function () {  
      // arrange
      sinon.stub(productsModel, "insert").resolves();

      // act
      const result = await productsService.insert(validName);

      // assert
      expect(result.type).to.equal(404);
      expect(result.message).to.deep.equal('Product not found');
    });

    it('Se tudo certo retorna com sucesso', async function () {  
      // arrange
      sinon.stub(productsModel, "insert").resolves(4);
      sinon.stub(productsModel, "findById").resolves(validProduct);

      // act
      const result = await productsService.insert(validName);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(validProduct);
    });


  });

  describe('Atualizando um produto', function () {
    it('Ao passar um id inválido deve retornar um erro', async function() {
      // arrenge
      const name = 'Biribinha Atômica';
      const id = 'aeae';
      
      // act
      const result = await productsService.updateById(id, name);
      
      // assert
      expect(result.type).to.be.equal(400);
      expect(result.message).to.deep.equal('"id" must be a number');
    });

    it('Deve retornar erro caso o Id não exista', async function () {
      // arrange
      const name = 'Biribinha Atômica';
      const id = 999;
      sinon.stub(productsModel, 'updateById').resolves(0);

      // act
      const result = await productsService.updateById(id, name);

      // assert
      expect(result.type).to.be.equal(404);
      expect(result.message).to.deep.equal('Product not found');
    });

    it('Deve retornar erro caso o nome seja inválido', async function () {
      // arrange
      const name = 'Bir';
      const id = 1;
      sinon.stub(productsModel, 'updateById').resolves(0);

      // act
      const result = await productsService.updateById(id, name);

      // assert
      expect(result.type).to.be.equal(422);
      expect(result.message).to.deep.equal('\"name\" length must be at least 5 characters long');
    });

    it('Deve retornar um produto atualizado', async function () {
      // arrange
      const name = 'Biribinha Atômica';
      const id = 3;
      sinon.stub(productsModel, 'updateById').resolves(1);
      sinon.stub(productsModel, 'findById').resolves(updatedItem);

      // act
      await productsService.updateById(id, name);
      const result = await productsService.findById(id);

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(updatedItem);
    });
  });
  
  afterEach(function () {
  sinon.restore();
  });
});