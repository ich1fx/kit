import { Application, Router } from 'oak';

const router = new Router();

router.get("/", async (ctx) => {
  ctx.response.body = 'Hello World!';
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
