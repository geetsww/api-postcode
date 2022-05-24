import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const data = await Deno.readTextFile("./data.json")
const postcodes = await JSON.parse(data)

const router = new Router();
router
  .get("/:code", (context) => {
    const { code } = context.params;
    const cities  = postcodes.filter(city => city.postcode === code)
    context.response.body = cities;
  });

const app = new Application();

app.use(oakCors({ origin: "*" }));
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 80 });