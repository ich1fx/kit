import { oak } from './deps.ts';

const router = new oak.Router();

router.get("/", async (ctx) => {
  // ctx.response.body = 'Hello World!';
  
  console.log(ctx.request.headers.get('Referer');
  ctx.response.redirect(oak.REDIRECT_BACK);
});

const app = new oak.Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
