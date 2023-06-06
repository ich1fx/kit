import { oak } from './deps.ts';

const router = new oak.Router();

router.get("/", async (ctx) => {
  const blobRequest = await fetch('file:///src/src/image.png');
  const blobResult = await blobRequest.blob();
  
  ctx.response.body = blobResult;
});

const dir = Array.from(Deno.readDirSync(Deno.cwd() + '/src'));
console.log(dir);

const app = new oak.Application({
  proxy: true 
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
