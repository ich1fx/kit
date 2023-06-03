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
  console.log(ctx.request.headers);
});

const app = new oak.Application({
  proxy: true 
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
