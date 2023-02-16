import express from 'express';
import { Client } from '@elastic/elasticsearch';
import { getProducts } from './products';

const client = new Client({
  node: 'http://localhost:9200',
});


const app = express();

app.get('/search', async (req, res) => {
  const result = await client.search({
    index: 'products',
    body: {
      query: {
        bool: {
          should: [
            {
              wildcard: {
                name: {
                  value: `*${req.query.q}*`,
                  boost: 1.0,
                  rewrite: 'constant_score',
                },
              },
            },
            {
              match: {
                description: {
                  query: `${req.query.q}`,
                  boost: 0.5,
                  operator: 'or',
                  fuzziness: 'AUTO',
                },
              }
            }
          ],
        }
      },
      suggest: {
        text: `${req.query.q}`,
        simple_phrase: {
          phrase: {
            field: 'name',
            size: 1,
            real_word_error_likelihood: 0.95,
            max_errors: 0.5,
            gram_size: 2,
            direct_generator: [
              {
                field: 'name',
                suggest_mode: 'always',
                min_word_length: 1,
              }
            ],
            highlight: {
              pre_tag: '<em>',
              post_tag: '</em>',
            }
          }
        }
      }
    },
  });

  res.json(result);
});

async function main() {
  const products = await getProducts();

  // Perform the bulk index request
  // Inserted data into elastic search
  const { errors } =
    await client.bulk({
      body: products.flatMap((product) => [
        { index: { _index: 'products', _id: product.id } },
        product,
      ]),
    });

  if (errors) {
    console.log(errors);
    process.exit(1);
  }

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

main();