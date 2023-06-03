import { oak } from './deps.ts';

const router = new oak.Router();

router.get("/", async (ctx) => {
  ctx.response.body = `
    <!DOCTYPE html>
    <html>
      <head><title>Hello ichi!</title><head>
      <body>
        <h1>Hello ichi!</h1>
      </body>
    </html>
  `;
  const hw = await import('./deps.ts');
  console.log(hw);
});

const app = new oak.Application({
  proxy: true 
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
