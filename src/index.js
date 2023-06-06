import { oak } from './deps.js';
import foo from './foo.json' assert { type: 'json' };
console.log(foo);

const router = new oak.Router();

router.get("/", async (ctx) => {
  const blobRequest = await fetch('file:///src/src/image.png');
  const blobResult = await blobRequest.blob();
  
  ctx.response.body = blobResult;
});

const dir = Array.from(Deno.readDirSync(Deno.cwd() + '/src'))
  .filter(ctx => ctx.name.endsWith('s'));
console.log(dir);

Promise.all(dir.map(ctx => import(`./` + ctx.name)))
  .then(console.log);

const app = new oak.Application({
  proxy: true 
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
