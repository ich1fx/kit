import { oak } from './deps.ts';

const router = new oak.Router();

router.get("/", async (ctx) => {
  const denolandX = await fetch("https://deno.land/x");
  const dlx = await denolandX.text();
  ctx.response.body = dlx;
  ctx.response.type = "text";
});

const app = new oak.Application({
  proxy: true 
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
