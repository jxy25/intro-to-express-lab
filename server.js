import express from "express";
//1. Be Polite, Greet the User

const app = express();

app.get("/greetings/:name", (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

//2. Rolling the Dice

app.get("/roll/:number", (req, res) => {
  const number = req.params.number;
  if (isNaN(number)) {
    res.send(`You must specify a number.`);
  } else {
    res.send(`You rolled a ${Math.floor(Math.random() * number)}`);
  }
});

//3. I Want THAT One!

app.get("/collectibles/:index", (req, res) => {
  const collectibles = [
    { name: "shiny ball", price: 5.95 },
    { name: "autographed picture of a dog", price: 10 },
    { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
  ];

  const index = req.params.index;

  index < 3
    ? res.send(
        `So, you want the ${collectibles[index].name}? For ${collectibles[index].price}, it can be yours!`
      )
    : res.send("This item is not yet in stock. Check back soon!");
});

//4. Filter Shoes by Query Parameters

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  const type = req.query.type;
  const minPrice = req.query["min-price"];
  const maxPrice = req.query["max-price"];

  let filtered = shoes;

  if (minPrice) {
    filtered = shoes.filter((shoe) => shoe.price >= minPrice);
  }
  if (maxPrice) {
    filtered = shoes.filter((shoe) => shoe.price <= maxPrice);
  }
  if (type) {
    filtered = shoes.filter((shoe) => shoe.type === type);
  }

  if (!minPrice && !maxPrice && !type) {
    res.send(shoes);
  }

  res.send(filtered);
});

app.listen(3000, () => {});
