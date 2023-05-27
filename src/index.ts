import { oak } from './deps.ts';

const router = new oak.Router();

router.get("/", async (ctx) => {
  ctx.response.body = 'Hello World!';
});

const app = new oak.Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
