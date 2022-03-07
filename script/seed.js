"use strict";

const {
  db,
  models: { User, Product, Winery, Cart, CartItems },
} = require("../server/db");

const userData = [
  {
    username: "Ying",
    password: "123",
  },
  {
    username: "Lei",
    password: "123",
  },
  {
    username: "Vivian",
    password: "123",
  },
  {
    username: "Melissa",
    password: "123",
    isAdmin: true,
  },
  {
    username: "Josephine",
    password: "123",
    isAdmin: true,
  },
  {
    username: "Joe",
    password: "123",
  },
];

const wineData = [
  //winery: Louis M. Martini
  {
    name: "Stagecoach Cabernet Sauvignon",
    year: 2021,
    variety: "red",
    description:
      "Stagecoach Cabernet is robust and unhindered. On the nose, aromas of cassis and wild blueberries with hints of baker’s chocolate, bay leaf and camphor waft out of the glass. The full-bodied palate is characterized by flavors of dense black fruit that linger with subtle notes of cinnamon dusted pastry while the vineyard’s enormous quantities of rugged rock mixed with hard volcanic soil imparts subtle hints of forest floor and clean earth, adding to the complexity. Fresh and youthful, muscular tannins support the concentrated fruit profile and round out the very long, textured finish.",
    quantity: 20,
    price: 200.0,
    imageURL:
      "https://www.louismartini.com/dw/image/v2/BFWT_PRD/on/demandware.static/-/Sites-gallo-master-catalog/default/dw38776976/images/000000000210010039/000000000210010039_0.png?sw=582&sh=774&sm=fit&q=65",
  },
  {
    name: "Cellar No. 254 Petite Sirah",
    year: 2018,
    variety: "red",
    description:
      "Thomann Station Vineyard benefits from the warmth of the St. Helena sun, yielding ripe, round flavors. Ideal for growing Petite Sirah, the grapes thrive in the deep, gravelly loam soils of the Napa Valley floor. The 2018 growing season began with plentiful winter rains that gave to a consistently warm and steady that eased into a mild fall, resulting in a slightly later harvest that delivered beautifully developed fruit with marked complexity. Because this fruit is literally in our backyard, it was delivered by tractor and immediately hand-sorted and destemmed. A three-day cold soak allowed for gentle extraction of flavor and color. We then used a careful combination of punch-downs and rack-and-returns during fermentation, which helped to tame the varietal’s burly tannins and build a balanced, beautifully finessed Petite Sirah. Total aging was 15 months in a combination of French and American oak, the latter imparting a sweet bacon spice note to this remarkably rich wine (74% new oak, 48% French, 26% American).",
    quantity: 5,
    price: 65.0,
    imageURL:
      "https://www.louismartini.com/dw/image/v2/BFWT_PRD/on/demandware.static/-/Sites-gallo-master-catalog/default/dw24827800/images/00085000015193/00085000015193_2018_0.png?sw=582&sh=774&sm=fit&q=65",
  },
  {
    name: "Lot No.1 Cabernet Sauvignon",
    year: 2016,
    variety: "red",
    description:
      "The 2016 vintage pulses with complexity – layers of black raspberry and macerated black cherry join with blueberry and juicy black currant on a wave of dark fruit tones. The plush, full-bodied mouthfeel reveals hints of cedar, cloves and coffee on a red carpet of velvety tannins. Lot No. 1 is something of a mosaic of iconic appellations and vineyards – an assemblage of Napa Valley’s best mountain, benchland and valley floor fruit. The 2016 vintage is comprised of Cabernet from Atlas Peak, Howell Mountain, Stags Leap, Mount Veeder and the greater Napa Valley AVA. From a growing perspective, 2016 was nearly ideal, with a consistently warm spring and summer guiding grapes to full and even ripeness.",
    quantity: 5,
    price: 225.0,
    imageURL:
      "https://www.louismartini.com/dw/image/v2/BFWT_PRD/on/demandware.static/-/Sites-gallo-master-catalog/default/dw6c9d60b0/images/00085000014165/00085000014165_2016_3.png?sw=582&sh=774&sm=fit&q=65",
  },

  ///winery: Robert Mondavi
  {
    name: "Reserve Pinot Noir Carneros",
    year: 2018,
    variety: "red",
    description:
      "A notoriously challenging variety, Pinot Noir prefers the foggy, wind-swept slopes of the Carneros region, in southernmost Napa Valley. Through the repeated tastings of our reserve candidates we have brought together select blocks from two renowned vineyards in the Carneros AVA: Rancho Carneros and the Hyde Vineyard.The head-trained, dry-farmed vines of Rancho Carneros are over forty years old and bring weight, depth and complexity to the blend. The clonal diversity of the Hyde Vineyard, further enhances complexity and heightens fruitiness, elegance and structure.",
    quantity: 5,
    price: 68.0,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0540/2686/2769/products/PinotNoir_Reserve_thumb_992e6e51-b5b7-4ab6-a9e3-c0b208bd8100_360x.png?v=1620073462",
  },
  {
    name: "Cabernet Sauvignon",
    year: 2019,
    variety: "red",
    description:
      "Fruit for our Napa Valley Cabernet comes from sub-appellations throughout the Valley, each of which have been specially chosen for their contributions to a combined blend that is a true reflection of place, a gorgeous expression of Napa Valley.  Nearly half of this year’s blend is sourced from the deep, well-drained soils of Oakville, which give us gorgeously dark, supple wines framed by fine tannin. Complementary portions of the blend come from Stags Leap District, Oak Knoll, Yountville and Rutherford.",
    quantity: 5,
    price: 50.0,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0540/2686/2769/products/RMW_2019_CabernetSauvignon_NV_thumb_894d6375-7e00-44f0-9e84-52400f1fa33e_360x.png?v=1634055369",
  },
  //white
  //winery: Domaine Carneros
  {
    name: "Estate Chardonnay",
    year: 2020,
    variety: "white",
    description:
      "The Estate Chardonnay is an exciting new addition to our portfolio. Each year, our winemaker TJ Evans determines the ideal blend of Chardonnay grapes from our six Estate vineyards to highlight the vivid complexity of Carneros. The 2020 vintage marries two great chardonnay sites, Palmer Vineyard and Tula Vista. The Wente clone grapes from Palmer Vineyard lend acidity, while the Clone 17 grapes of Tula Vista Vineyard provide unctuous richness, resulting in a complex and lively wine. Fermentation was conducted in barrel, mostly neutral oak with just a touch of new, steam bent, French Oak (28%) to support but not overwhelm the fruit. The wine rested on primary lees for 15 months with occasional stirring.",
    quantity: 5,
    price: 43.99,
    imageURL:
      "https://www.domainecarneros.com/system/uploads/fae/image/asset/1296/2020_Estate_Chardonnay.jpg",
  },
  //winery: Pine Ridge
  {
    name: "Carneros Collines Vineyard Chardonnay",
    year: 2018,
    variety: "white",
    description:
      "Tension between richness and acidity. Tropical pineapple and bright Granny Smith apple aromas give lift to pear, white nectarine, and toast. The palate follows with lemon curd, apricot, and hints of apple pie. This wine is round, silky, and viscous, showing good weight with zesty acidity that carries freshness and provides added dimension. Enjoyably broad and expansive on the palate with a long, rounded finish.",
    quantity: 5,
    price: 47.99,
    imageURL:
      "https://www.pineridgevineyards.com/wp-content/uploads/2020/08/Collines-Chardonnay.png",
  },
  {
    name: "Chenin Blanc + Viognier White Blend",
    year: 2021,
    variety: "white",
    description:
      "Crisp, bright, and vivacious, CB+V 2021 is an aromatic white blend boasting a bouquet of honeysuckle, orange blossoms, nectarine, white peach, and ginger spice. The entry is both bright and mouth-filling exhibiting refreshing acidity and roundness, opening to flavors of tangerine, lime, and lemon curd, lemongrass, ginger, white peach, and green apple. This delicious wine finishes clean and long with a lingering hint of lime.",
    quantity: 50,
    price: 16.0,
    imageURL:
      "https://www.pineridgevineyards.com/wp-content/uploads/2020/12/PRV_CBV_NV_300x1000.png",
  },
];

const wineryData = [
  {
    name: "Louis M. Martini",
  },
  {
    name: "Robert Mondavi",
  },
  {
    name: "Domaine Carneros",
  },
  {
    name: "Pine Ridge",
  },
];

const cartData = [
  {
    isPurchased: true,
    cartPriceTotal: 300.23,
  },
  {},
  {},
  {},
  {},
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all(
    userData.map((user) => {
      return User.create(user);
    })
  );
  // Creating Products
  const products = await Promise.all(
    wineData.map((wine) => {
      return Product.create(wine);
    })
  );
  //Creating Wineries
  const wineries = await Promise.all(
    wineryData.map((winery) => {
      return Winery.create(winery);
    })
  );
  // Creating Cart
  const carts = await Promise.all(
    cartData.map((cart) => {
      return Cart.create(cart);
    })
  );
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  //set relationships:
  //winery can have many products:
  await wineries[0].setProducts([products[0], products[2], products[6]]);
  await wineries[1].setProducts([products[1], products[7]]);
  await wineries[2].setProducts([products[3], products[4]]);
  await wineries[3].setProducts(products[5]);

  //a cart can have many products
  // await carts[0].addProducts([
  //   products[0],
  //   products[2],
  //   products[5],
  //   products[3],
  // ]);
  // await carts[1].addProducts([products[1], products[6], products[4]]);
  // await carts[2].addProduct(products[8]);
  // await carts[3].addProduct(products[0]);

  // seed relationship btw Cart and User
  //a user can have many carts
  // await users[0].setCarts([carts[0], carts[1]]);
  // await users[1].setCarts(carts[3]);
  // await users[2].setCarts(carts[4]);
  // await users[3].setCarts(carts[2]);

  // set cart to see user connect to cart

  // Creating CartItems
  // const cartItems = await Promise.all([
  //   CartItems.create({productQuantity: 3}),
  //   CartItems.create({productQuantity: 4}),
  //   CartItems.create({productQuantity: 5})
  // ])

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

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
