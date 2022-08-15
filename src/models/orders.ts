import Client from '../database'

export type Order ={
    id?: number;
    status: string;
    user_id?: number;
}

export type OrderProducts ={
    id?: number;
    quantity: number;
    order_id?: number;
    product_id?: number;
}

export class storefrontOrder {

async index(): Promise<Order[]> {
try{
    const conn = await Client.connect();
    const sql = 'SELECT * FROM orders';
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
}   catch(err) {
    throw new Error(`Cannot get orders ${err}`);
}
}

async show(id:number): Promise<Order> {
    try{
        const conn = await Client.connect();
        const sql = 'SELECT * FROM orders WHERE id = ($1)';
        const result = await conn.query(sql,[id]);
        conn.release();
        return result.rows[0];
    }   catch(err) {
        throw new Error(`Cannot get order ${err}`);
    }
    }

    async create(order:Order): Promise<Order> {
        try{
            console.log(order);
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *';
            const result = await conn.query(sql,[order.status,order.user_id]);
            conn.release();
            return result.rows[0];
        }   catch(err) {
            throw new Error(`Cannot create order ${err}`);
        }
        }

        async update(id:number, order:Order): Promise<Order> {
            try{
                const conn = await Client.connect();
                const sql = 'UPDATE orders SET status = ($1) WHERE id = ($2) RETURNING *';
                const result = await conn.query(sql,[order.status,id]);
                conn.release();
                return result.rows[0];
            }   catch(err) {
                throw new Error(`Cannot update order ${err}`);
            }
            }

            async delete(id:number, order:Order): Promise<Order> {
                try{
                    const conn = await Client.connect();
                    const sql = 'DELETE FROM orders WHERE id = ($1)';
                    const result = await conn.query(sql,[id]);
                    conn.release();
                    return result.rows[0];
                }   catch(err) {
                    throw new Error(`Cannot get order ${err}`);
                }
                }

                async addProduct(orderProduct: OrderProducts): Promise<OrderProducts> {
                    try {
                        const conn = await Client.connect();
                        const sql = 'INSERT INTO order-products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
                        const result = await conn.query(sql, [orderProduct.quantity, orderProduct.order_id, orderProduct.product_id]);
                        conn.release();
                        return result.rows[0];
                    } catch (err) {
                        throw new Error(`Cannot get orderProducts ${err}`)
                    }
                }

                async currentOrder(user_id: number): Promise<Order> {
                    try{
                        const conn = await Client.connect();
                        const sql = `Select * from orders where user_id = ($1) and status = 'Active' limit 1`;
                        const result = await conn.query(sql,[user_id]);
                        conn.release();
                        return result.rows[0];
                    }   catch(err) {
                        throw new Error(`Cannot get the current order for the user with id${user_id},  ${err}`);
                    }
                    }
}