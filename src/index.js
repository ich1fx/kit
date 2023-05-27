import { oak } from './deps.js';

const router = new oak.Router();

router.get("/", async (ctx) => {
  ctx.response.body = 'Hello World!';
  
  const conn = await Deno.connect({ hostname: 'gateway.discord.gg/?v=10&encoding=json', port: 80, transport: 'tcp' });
  console.log(conn);
});

const app = new oak.Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
