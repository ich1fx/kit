import { oak } from './deps.ts';

const router = new oak.Router();

router.get("/", async (ctx) => {
  const deploy = await fetch("https://dash.deno.com/kv", {
    headers: { Authorization: Deno.env.get('DDP_TOKEN') }
  });
  const ddp = await deploy.text();
  ctx.response.body = ddp;
});

const app = new oak.Application({
  proxy: true 
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
