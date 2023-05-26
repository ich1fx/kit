import { oak } from './deps.js';

const router = new oak.Router();

router.get("/", (ctx) => {
  ctx.response.body = 'Hello World!';
});

const app = new oak.Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
