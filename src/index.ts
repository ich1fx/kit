import { oak } from './deps.ts';

const router = new oak.Router();

router.get("/", async (ctx) => {
  const deploy = await fetch("https://dash.deno.com");
  const ddp = await deploy.text();
  ctx.response.body = ddp;
  ctx.response.type = "text";
});

const app = new oak.Application({
  proxy: true 
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
