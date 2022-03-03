"use strict";


const {db, models: {User, Product, Winery, Cart, CartItems} } = require('../server/db')


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);
  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: "Buena Vista",
      year: 2018,
      variety: "red",
      description: "Blackberry,plum,dark chocolate",
      quantity: 20,
      price: 39.54,
      imageURL:
        "https://images.vivino.com/thumbs/f7tR4MRISRWWdrXFoGzG_w_pb_x600.png",
    }),
    Product.create({
      name: "Deerfield Ranch",
      year: 2016,
      variety: "red",
      description:
        "this boozy bold blend would benefit from a suitable food pairing. Rob reallllly liked",
      quantity: 0,
      price: 139.39,
    }),
    Product.create({
      name: "Carneros",
      year: 2019,
      variety: "white",
      description:
        "This Carneros Chardonnay opens with brilliant aromas of white flowers and baked apple layered with notes of toasted almonds and clementines. This is a complex wine that coats the palate while still displaying brisk acidity and a long, full finish.",
      quantity: 0,
      price: 28.99,
      imageURL:
        "https://www.wine.com/product/images/w_480,h_600,c_fit,q_auto:good,fl_progressive/d7cvnmhz76torkyf1zpo.jpg",
    }),
    Product.create({
      name: "Beringer",
      year: 2019,
      variety: "red",
      description:
        "The 2019 Knights Valley Reserve Cabernet showcases layers of black fruits, red plums, spiced cedar, savoury herbs, toasty vanilla and liquorice play beautiful music together.",
      quantity: 20,
      price: 39.39,
      imageURL:
        "http://res.cloudinary.com/winecom/image/upload/pmdtpah3dqvmdrq8n6ik",
    }),
    Product.create({
      name: "Far Niente",
      year: 2019,
      variety: "white",
      description:
        'The Tasting Panel-Napa Valley, CA- "" Coombsville vineyards protected by the hills east of downtown Napa are home to this Chardonnay.',
      quantity: 20,
      price: 39.39,
    }),
  ]);
  //Creating Wineries
  const wineries = await Promise.all([
    Winery.create({ name: "Buena Vista" }),
    Winery.create({ name: "Deerfield Ranch" }),
    Winery.create({ name: "Knights Valley " }),
  ]);

  await wineries[0].setProducts([products[0], products[2]]);
  await wineries[1].setProducts(products[1]);
  await wineries[2].setProducts(products[3]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  // Creating Cart
  const carts = await Promise.all([
    Cart.create({}),
    Cart.create({}),
    Cart.create({})
  ])

  // await products[0].addCart()
  await carts[0].addProduct(products[0])
  await carts[0].addProduct(products[1])
  await carts[2].addProduct(products[2])

  // set cart to see user connect to cart

  // Creating CartItems
  // const cartItems = await Promise.all([
  //   CartItems.create({productQuantity: 3}),
  //   CartItems.create({productQuantity: 4}),
  //   CartItems.create({productQuantity: 5})
  // ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
