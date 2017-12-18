const Koa = require('koa');
const koaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');

const app = new Koa();
const router = new koaRouter();

const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  database: 'usda',
  port: 5432,
})

client.connect();

router
  .get('/', getAllFoods)
  .get('/food/:id', getFood)
  .get('/food/search/:name', searchFoods)

async function getAllFoods(ctx) {
  const res = await client.query(`SELECT ndb_no, long_desc from food_des`)
  ctx.body = res.rows;
}

async function searchFoods(ctx) {
  console.log(ctx.params.name)
  const res = await client.query(
    `SELECT ndb_no, long_desc from food_des
     WHERE long_desc like '%' || $1 || '%'`
    , [ctx.params.name]
  )  
  ctx.body = res.rows;
}

async function getFood(ctx) {
  const res = await client.query(
    `SELECT nut_data.NDB_No , nutrdesc, Nutr_Val, units  FROM nutr_def
     INNER JOIN nut_data
       ON nut_data.Nutr_No = nutr_def.nutr_no
       AND nut_data.ndb_no = $1
     WHERE nutr_def.nutr_no IN ('203', '204', '205', '208', '269', '605', '606');  `
    , [ctx.params.id]
  )  
  ctx.body = res.rows;
}

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3001)

// await client.end()
