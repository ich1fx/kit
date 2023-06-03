import { oak } from './deps.ts';

const router = new oak.Router();

router.get("/", async (ctx) => {
  const denolandX = await fetch("https://deno.land/x");
  const dlx = await response.body();
  ctx.response.body = dlx;
});

const app = new oak.Application({
  proxy: true 
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
