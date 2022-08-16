import client from '../../database';
import { Product, storefrontProduct } from '../products';

const storeProduct = new storefrontProduct();

const product: Product = {
  id: 1,
  name: 'tommy tshirt',
  price: 35,
};

beforeAll(async () => {
  const createdProduct = await storeProduct.create(product);
  product.id = createdProduct.id as number;
});

afterAll(async () => {
  const conn = await client.connect();
  const sql = 'DELETE FROM products';
  await conn.query(sql);
  const sql2 = 'ALTER SEQUENCE products_id_seq RESTART with 1';
  await conn.query(sql2);
  conn.release();
});

describe('products models test', () => {
  describe('test methods exist', () => {
    it('should have an index method', () => {
      expect(storeProduct.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(storeProduct.create).toBeDefined();
    });

    it('should have a create method', () => {
      expect(storeProduct.show).toBeDefined();
    });
  });
  it('the create methode should return a new created product', async () => {
    const createdProduct = await storeProduct.create(product);
    expect(createdProduct?.name).toBe(product.name);
    expect(createdProduct?.price).toBe(product.price);
  });

  it('the index methode should return all created products', async () => {
    const allproducts = await storeProduct.index();
    expect(allproducts).toEqual([
      { id: 1, name: 'tommy tshirt', price: 35 },
      { id: 2, name: 'tommy tshirt', price: 35 },
      { id: 3, name: 'tommy tshirt', price: 35 },
    ]);
  });

  it('the show methode should return a product by ID', async () => {
    const showProduct = await storeProduct.show(product.id as number);
    expect(showProduct).toEqual(product);
  });
});
