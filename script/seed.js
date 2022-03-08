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
      "The 2016 vintage pulses with complexity layers of black raspberry and macerated black cherry join with blueberry and juicy black currant on a wave of dark fruit tones. The plush, full-bodied mouthfeel reveals hints of cedar, cloves and coffee on a red carpet of velvety tannins. Lot No. 1 is something of a mosaic of iconic appellations and vineyards – an assemblage of Napa Valley’s best mountain, benchland and valley floor fruit. The 2016 vintage is comprised of Cabernet from Atlas Peak, Howell Mountain, Stags Leap, Mount Veeder and the greater Napa Valley AVA. From a growing perspective, 2016 was nearly ideal, with a consistently warm spring and summer guiding grapes to full and even ripeness.",
    quantity: 5,
    price: 225.0,
    imageURL:
      "https://www.louismartini.com/dw/image/v2/BFWT_PRD/on/demandware.static/-/Sites-gallo-master-catalog/default/dw6c9d60b0/images/00085000014165/00085000014165_2016_3.png?sw=582&sh=774&sm=fit&q=65",
  },
  {
    name: "Howell Mountain Cabernet Sauvignon",
    year: 2017,
    variety: "red",
    description: "This wine is unmistakably rustic. On the nose, dominant notes of ripe blackberries, crème de cassis and dark chocolate truffles are complimented by bay leaf and fine leather. The complex and textured palate showcases flavors of blackberry crumble and star anise offset by earthy undertones and toasty oak. Built for your cellar, this wine will age gracefully over the years to come. The last to be harvested of all our wines, these grapes were hand-picked in late October. Fermentation took place in small open-top tanks, allowing for precise and gentle extraction of color and flavor. Each lot was aged in French oak barrels and evaluated individually, with the final blend occurring the summer of the following year. In total, the wine was aged for 26 months in barrel (82% new) and a year in bottle. Grape growing on Howell Mountain requires the practice of patience. On a sunny yet cool hillside, these inconspicuous vineyards surrounded by a thicket of Redwood trees yield highly concentrated fruit that takes longer to ripen. In 2017, abundant winter rainfall fueled vine growth early in the season. A mild spring, followed by steady warmth in the summer and fall, led to a slightly early harvest with ripe, fruit-driven intensity.",
    quantity: 20,
    price: 150.0,
    imageURL: "https://www.louismartini.com/dw/image/v2/BFWT_PRD/on/demandware.static/-/Sites-gallo-master-catalog/default/dw82275e90/images/00085000031568/00085000031568_2017_1.png?q=80"
  },
  {
    name: "Monte Rosso Vineyard Malbec",
    year: 2016,
    variety: "red",
    description: "Enticing aromas of cedar, fresh plum and a hint of pepper. On the palate, lush notes of blackberry jam, dark roasted coffee and blackcurrant harmonize for a densely layered, full-bodied wine. ",
    quantity: 20,
    price: 70.0,
    imageURL: "https://www.louismartini.com/dw/image/v2/BFWT_PRD/on/demandware.static/-/Sites-gallo-master-catalog/default/dw6035a94c/images/00085000015728/00085000015728_2016_0.png?sw=684&sh=910&sm=fit&q=65"
  },
  {
    name: "Cellar No. 254 Merlot",
    year: 2018,
    variety: "red",
    description: "Enchanting aromas of fresh blueberries, Bing cherries, and ripe red plum mingle with hints of violet and dried mint leaves as they dust the nose. These notes are echoed on the supple palate where polished tannins and flavors of boysenberry pie and raspberry, as well as subtleties of baking spice, vanilla and freshly shaved chocolate carry through the long, textured finish.",
    quantity: 20,
    price: 85.0,
    imageURL: "https://www.louismartini.com/dw/image/v2/BFWT_PRD/on/demandware.static/-/Sites-gallo-master-catalog/default/dw404ab11b/images/00085000031124/00085000031124.png?sw=684&sh=910&sm=fit&q=65"
  },
  {
    name: "Napa Valley Sauvignon Blanc",
    year: 2019,
    variety: "white",
    description: "Our grapes were picked in mid-to-late September, entirely by hand. At the winery, the grapes were pressed to tank, cold settled and racked off lees for fermentation. This gentle, oxygen-free process is utilized to maintain the wine’s signature crispness and fruit-forward character. Fermentation took place in a combination of stainless steel, oak barrel and concrete egg. A small amount of new French oak was used during barrel fermentation to build a rich and complex palate. Vintage 2019 was warm and evenly paced. Plentiful winter rains and a cool spring delayed budbreak, leading to rains in late May. By June, a consistently warm and steady summer emerged, setting the stage for expressive and vibrant wines. Vines developed clean, healthy clusters with rich, complex flavors and excellent structure. With exceptional growing conditions, harvest began later in the year and high-quality fruit was delivered into the cellar.",
    quantity: 20,
    price: 40.0,
    imageURL: "https://www.louismartini.com/dw/image/v2/BFWT_PRD/on/demandware.static/-/Sites-gallo-master-catalog/default/dw9c20e6e4/images/00085000028094/00085000028094_2019_0.png?sw=684&sh=910&sm=fit&q=65"
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
  {
    name: "Merlot Napa Valley",
    year: 2018,
    variety: "red",
    description: "Sweet fruit notes of plum with touches of blueberry and dark chocolate, as well as velvety tannins and a beautiful salinity that begs you to take another sip.",
    quantity: 20,
    price: 29.0,
    imageURL: "https://cdn.shopify.com/s/files/1/0540/2686/2769/products/Merlot_NapaValley_thumb_9d99c618-044b-4ad4-960e-cf3ba9c55003_720x.png?v=1620134606"
  },
  {
    name: "Petit Verdot Oakville",
    year: 2015,
    variety: "red",
    description: "Dark fruit notes of currant and plum meet earthy notes of licorice and cinnamon. Followed by light floral aromas and a touch of pleasant smokiness.",
    quantity: 20,
    price: 80.0,
    imageURL: "https://cdn.shopify.com/s/files/1/0540/2686/2769/products/PetitVerdot_thumb_74dd5993-6df6-450e-a2a0-155f02ce243d_720x.png?v=1620133421"
  },
  {
    name: "Clone 777 Pinot Noir Carneros Napa Valley",
    year: 2019,
    variety: "red",
    description: "Initial smells of bright raspberry, red plum, earthy graphite, toasted graham cracker and hint of iris. Taste of black cherry, vanilla cola, spicy clove, salted plum, and toasted almonds with a dark brooding finish.",
    quantity: 20,
    price: 55.0,
    imageURL: "https://cdn.shopify.com/s/files/1/0540/2686/2769/products/PinotNoir_777_thumb_156205aa-861d-4c60-8626-f4b3559758fe_720x.png?v=1620134531"
  },
  {
    name: "To Kalon Reserve Fumé Blanc",
    year: 2019,
    variety: "white",
    description: "Beautifully expressive on the nose. With smells of honey suckle, green papaya, and jasmine. Lively, complex and weighty on the palate with refreshing minerality, white peach, meyer lemon zest.",
    quantity: 20,
    price: 95.0,
    imageURL: "https://cdn.shopify.com/s/files/1/0540/2686/2769/products/Thumbnail_RMW_Reserve_Fume_720x.png?v=1637369330"
  },
  {
    name: "Unoaked Chardonnay",
    year: 2019,
    variety: "white",
    description: "Fragrantly ripe summer peach and green apple flavors, with hints of lemon peel and minerality.",
    quantity: 20,
    price: 34.0,
    imageURL: "https://cdn.shopify.com/s/files/1/0540/2686/2769/products/Chard_Unoaked_thumb_0857c2a1-5345-4f8c-bce1-6aa576decbd3_720x.png?v=1620134895"
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
    quantity: 10,
    price: 16.0,
    imageURL:
      "https://www.pineridgevineyards.com/wp-content/uploads/2020/12/PRV_CBV_NV_300x1000.png",
  },
  {
    name: "Petit Verdot Napa Valley",
    year: 2017,
    variety: "red",
    description: "Petit Verdot is a thick-skinned grape expressing a dense, deep ruby color. Aromas are dark and brooding, with blackberry, black cherry, fig, mocha, dried herbs, and savory truffles. Oak barrels contribute a caramel and toasted marshmallow nuance, along with some baking spices. The entry is juicy, with mouthwatering acidity. A rich midpalate leads to flavors of dark plum, black cherry, mocha, coffee, and dark chocolate. Ripe, pronounced tannins are present from start to finish.",
    quantity: 15,
    price: 85.0,
    imageURL: "https://www.pineridgevineyards.com/wp-content/uploads/2020/08/napa-valley-petit-verdot.png"
  },
  {
    name: "Malbec",
    year: 2017,
    variety: "red",
    description: "The thick skin of Malbec grapes yields wine with a beautiful, nearly opaque, deep purple-red color. The wine shows signature aromas and flavors of dark fruit, raspberry, mocha, and tobacco. Full-bodied with moderate tannins, it is enjoyable by the glass or with food.",
    quantity: 15,
    price: 75.0,
    imageURL: "https://www.pineridgevineyards.com/wp-content/uploads/2020/08/napa-valley-malbec.png"
  },
  {
    name: "Tessitura Napa Valley",
    year: 2017,
    variety: "red",
    description: "Brilliant ruby color in hue, our 2017 Tessitura opens with profuse aromas of cherry and cassis, with intriguing hints of sage, espresso bean and baking spices. The elegant, silky texture envelopes the bright red and dark fruit flavors on the palate. Lively acidity and supple tannins structure the wine and carry the plush flavors through a long, smooth finish. Beautifully balanced, this wine can complement many dishes, including roasted salmon, Moroccan braised lamb and truffle risotto.",
    quantity: 20,
    price: 75.0,
    imageURL: "https://www.pineridgevineyards.com/wp-content/uploads/2020/08/Pine-Ridge-Tessitura_NV_300x1000.png"
  },
  {
    name: "Merlot Napa Valley",
    year: 2018,
    variety: "red",
    description: "This wine sets out with aromas of blueberry, tomato leaf, and briary spices. On the palate, violet, cinnamon, and strawberry entice, alongside a vanilla finish. This wine is enchanting now and will drink well for at least four years.",
    quantity: 20,
    price: 65.0,
    imageURL: "https://www.pineridgevineyards.com/wp-content/uploads/2020/08/Pine-Ridge-Merlot_NV.png"
  }
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
  await wineries[0].setProducts([products[0], products[1], products[2], products[3], products[4], products[5], products[6]]);
  await wineries[1].setProducts([products[8], products[7], products[9], products[10], products[11], products[12], products[13]]);
  await wineries[2].setProducts([products[14]]);
  await wineries[3].setProducts([products[15], products[16], products[17], products[18], products[19], products[20]]);

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

  // // seed relationship btw Cart and User
  // //a user can have many carts
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
