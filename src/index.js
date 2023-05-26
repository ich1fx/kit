import { oak } from './deps.js';

const router = new oak.Router();

router.get("/", (ctx) => {
  ctx.response.body = 'Hello World!';
  
  const conn = Deno.listen({ hostname: 'wss://gateway.discord.gg/?v=10&encoding=json', port: 80 });
});

const app = new oak.Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
