import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import order_routes from './handlers/orders';
import user_routes from './handlers/users';
import product_routes from './handlers/products';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

user_routes(app);
order_routes(app);
product_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
