import Client from '../database'

export type Product ={
    id?: number;
    name: string;
    price: number;
}

export class storefrontProduct {

async index(): Promise<Product[]> {
try{
    const conn = await Client.connect();
    const sql = 'SELECT * FROM products';
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
}   catch(err) {
    throw new Error(`Cannot get products ${err}`);
}
}

async show(id:number): Promise<Product> {
    try{
        const conn = await Client.connect();
        const sql = 'SELECT * FROM products WHERE id = ($1)';
        const result = await conn.query(sql,[id]);
        conn.release();
        return result.rows[0];
    }   catch(err) {
        throw new Error(`Cannot get product ${err}`);
    }
    }

    async create(product:Product): Promise<Product> {
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name,price) VALUES($1,$2) RETURNING *';
            const result = await conn.query(sql,[product.name,product.price]);
            conn.release();
            return result.rows[0];
        }   catch(err) {
            throw new Error(`Cannot create product ${err}`);
        }
        }

        async update(id:number, product:Product): Promise<Product> {
            try{
                const conn = await Client.connect();
                const sql = 'UPDATE products SET name = ($1), price = ($2) WHERE id = ($3) RETURNING *';
                const result = await conn.query(sql,[product.name,product.price,id]);
                conn.release();
                return result.rows[0];
            }   catch(err) {
                throw new Error(`Cannot update product ${err}`);
            }
            }

            async delete(id:number, product:Product): Promise<Product> {
                try{
                    const conn = await Client.connect();
                    const sql = 'DELETE FROM products WHERE id = ($1)';
                    const result = await conn.query(sql,[id]);
                    conn.release();
                    return result.rows[0];
                }   catch(err) {
                    throw new Error(`Cannot get product ${err}`);
                }
                }
}