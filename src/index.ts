import { oak } from './deps.ts';

const router = new oak.Router();

router.get("/", async (ctx) => {
  ctx.response.body = 'Hello World!';
  console.log(ctx.cookies);
  console.log(ctx.request.ip);
  console.log(ctx.request.ips);
  
  for (const [k, v] of ctx.request.url.searchParams.entries()) {
    console.log(k, v);
  }
});

const app = new oak.Application({
  proxy: true 
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
