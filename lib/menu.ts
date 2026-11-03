// Menu text transcribed from the five in-store menu boards (Nov 2026).
// Prices in SGD. Everything is shared except the Richie Rich, the outlet exclusive and a
// few Build Your Own extras, which are listed per outlet at the bottom.

export type Dish = { name: string; price: number; tag?: "Seafood" | "Pork" | "Chicken" | "Beef" | "Veg"; items: string; note?: string };
export type Line = { name: string; price?: number | string; price2?: number | string; note?: string };

export const goat: Dish[] = [
  { name: "Luxe", price: 18, tag: "Seafood", items: "Smoked salmon, scallion cream cheese, tomato, pickled cucumber, red onion, caper, lemon vinaigrette" },
  { name: "Popeye’s Fav.", price: 18, tag: "Seafood", items: "Smoked salmon, creamed spinach, dill pickled onion, sunny egg, lemon vinaigrette" },
  { name: "2 BAC", price: 15, tag: "Pork", items: "House bacon, buttermilk scrambled eggs, double cheddar, smoked chipotle ketchup" },
  { name: "Avo BV%", price: 17, tag: "Pork", items: "House bacon, avocado, mesclun, tomato, dill pickled onion, sunny egg, smoked garlic aioli, balsamic glaze" },
  { name: "Sunday Best", price: 17, tag: "Pork", items: "Fennel pork patty, double cheddar, onion marmalade, smoked garlic aioli, sunny egg, hashbrown" },
  { name: "The Great Suisse", price: 17, tag: "Pork", items: "Fennel pork patty, mixed wild mushroom, emmental, spicy aioli, arugula, sautéed onion, all sorts butter" },
  { name: "Personal Best", price: 17, tag: "Pork", items: "Spam, Skippy peanut butter, sunny egg, hashbrown, spicy aioli" },
  { name: "Motherclucker", price: 18, tag: "Chicken", items: "Grilled sriracha chicken, smoked garlic aioli, mesclun, red onion, pickled jalapeño, sunny egg" },
  { name: "Hambush®", price: 18, tag: "Chicken", items: "Smoked chicken ham, emmental, mixed berries jam, tomato, arugula, balsamic glaze, pesto rosso" },
  { name: "Kayago", price: 15, tag: "Chicken", items: "Smoked chicken ham, chicken floss, TMBH kaya, smoked Kewpie mayonnaise, buttermilk scrambled eggs" },
  { name: "Mars Yard", price: 19, tag: "Beef", items: "House roast beef, jalapeño relish, horseradish cream, arugula, sautéed onion, all sorts butter" },
  { name: "Cow King", price: 18, tag: "Beef", items: "House roast beef, double cheddar, jalapeño relish, smoked honey mustard, onion ring" },
  { name: "Chickies", price: 18, tag: "Chicken", items: "Baked chicken breast, halloumi, salted walnut, smoked honey mustard, dill pickled onion, mesclun, tomato, balsamic glaze, pesto rosso" },
  { name: "Pizza Hart", price: 17, tag: "Veg", items: "Halloumi, mozzarella stick, emmental, cheddar, pesto rosso, Heinz ketchup, honey, hashbrown", note: "Kids friendly" },
];

export const happiestMeal = [
  { name: "Starter Kit", price: "+5", items: "Personal fries or onion rings + sodas or iced tea" },
  { name: "Survival", price: "+7", items: "Personal fries or onion rings + coffee (white/black)" },
  { name: "No Ragrets", price: "+8", items: "Personal fries or onion rings + any drinks" },
];

export const superbowl: Dish[] = [
  { name: "Falafel", price: 15, items: "Edamame falafel, mesclun, arugula, red onion, tomato, pickled cucumber, caper, avocado", note: "Choice of sauce: lemon vinaigrette or yuzu sesame" },
  { name: "Chicken", price: 15, items: "Baked chicken breast, mesclun, arugula, red onion, tomato, pickled cucumber, caper, avocado", note: "Choice of sauce: lemon vinaigrette or yuzu sesame" },
];

export const houseSides: Line[] = [
  { name: "Skin on fries", price: 8 },
  { name: "Real onion rings", price: 8 },
  { name: "Mozzarella sticks", price: 8 },
];

const baseAddOns: Line[] = [
  { name: "Buttermilk scrambled eggs", price: 5 },
  { name: "Sunny egg", price: 2 },
  { name: "Egg white", price: 3 },
  { name: "Hashbrown", price: 2 },
  { name: "Cheddar", price: 2 },
  { name: "Halloumi", price: 5 },
  { name: "Emmental", price: 2 },
  { name: "Avocado", price: 2 },
  { name: "Forged gras", price: 5 },
];
export const addOns = baseAddOns;

// price = single serving, price2 = 300g tub
export const schmears: Line[] = [
  { name: "Whipped cream cheese", price: 2, price2: 8 },
  { name: "Scallion cream cheese", price: 3, price2: 10 },
  { name: "Cinnamon roll cream cheese", price: 4, price2: 12 },
  { name: "Mixed berries jam", price: 2 },
  { name: "Butter", price: 1 },
  { name: "All sorts butter", price: 2 },
  { name: "Vegemite", price: 3 },
  { name: "Vegemite butter", price: 4 },
  { name: "Peanut butter", price: 2 },
  { name: "P.B.J", price: 4 },
  { name: "Nutella", price: 2 },
  { name: "Biscoff", price: 2 },
  { name: "TMBH kaya", price: 2 },
  { name: "TMBH kaya with sliced butter", price: 3 },
];

// price = hot, price2 = iced
export const coffee: Line[] = [
  { name: "Double espresso", price: 4.5, price2: 5.5 },
  { name: "Piccolo", price: 5.5, price2: 6.5 },
  { name: "Black", price: 5.5, price2: 6.5 },
  { name: "White", price: 6.5, price2: 7.5 },
  { name: "Mocha", price: 7, price2: 8 },
  { name: "Chai", price: 7, price2: 8, note: "+$1 espresso for dirty" },
];
export const coffeeOptions: Line[] = [
  { name: "Skinny milk" },
  { name: "Oat milk", price: "+1" },
  { name: "Extra shot", price: "+1" },
];

export const thirstQuenchers: Line[] = [
  { name: "Tea", price: 3, price2: 4.5 },
  { name: "Sodas / bottled water", price2: 3 },
  { name: "Fresh O.J.", price2: 6.5 },
  { name: "Fresh lemonade", price2: 6.5 },
  { name: "Chocolate", price: 7, price2: 8 },
  { name: "P.B. shake", price2: 7.5 },
  { name: "Avocado smoothie", price2: 7.5 },
  { name: "Berry boom smoothie", price2: 7.5 },
];

export const bagelFlavours = [
  { name: "Plain", src: "/img/bagel-plain.png" },
  { name: "Sesame", src: "/img/bagel-sesame.png" },
  { name: "All-sorts", src: "/img/bagel-all-sorts.png" },
  { name: "Onion & garlic", src: "/img/bagel-garlic.png" },
  { name: "Cheddar & jalapeño", src: "/img/bagel-jalapeno-cheddar.png" },
  { name: "Blueberry", src: "/img/bagel-blueberry.png" },
];
export const bagelPrice = 4;

type Byo = { group: string; items: Line[] };
const byoBase: Byo[] = [
  { group: "Add ons", items: baseAddOns },
  {
    group: "Proteins",
    items: [
      { name: "Breaded falafel", price: 5 },
      { name: "Smoked salmon", price: 9 },
      { name: "House bacon", price: 6 },
      { name: "House roast beef", price: 12 },
      { name: "Smoked chicken ham", price: 8 },
      { name: "Spam", price: 6 },
      { name: "Grilled sriracha chicken", price: 7 },
      { name: "Fennel pork patty", price: 7 },
      { name: "Baked chicken breast", price: 7 },
    ],
  },
  {
    group: "Schmears",
    items: [
      { name: "Whipped cream cheese", price: 2 },
      { name: "Scallion cream cheese", price: 3 },
      { name: "Cinnamon roll cream cheese", price: 4 },
      { name: "Mixed berries jam", price: 2 },
      { name: "Butter", price: 1 },
      { name: "All sorts butter", price: 2 },
      { name: "Vegemite", price: 3 },
      { name: "Vegemite butter", price: 4 },
      { name: "Skippy peanut butter", price: 2 },
      { name: "P.B.J", price: 4 },
      { name: "Nutella", price: 2 },
      { name: "Biscoff", price: 2 },
      { name: "TMBH kaya", price: 2 },
      { name: "TMBH kaya with sliced butter", price: 3 },
    ],
  },
  {
    group: "Greens",
    items: [
      { name: "Creamed spinach", price: 4 },
      { name: "Mixed wild mushroom", price: 6 },
      { name: "Arugula", price: 2 },
      { name: "Mixed mesclun", price: 2 },
      { name: "Red onion", price: 1 },
      { name: "Tomato", price: 1 },
      { name: "Sautéed onion", price: 2 },
    ],
  },
  {
    group: "Pickles",
    items: [
      { name: "Dill pickled onion", price: 1 },
      { name: "Pickled Japanese cucumber", price: 1 },
      { name: "Pickled jalapeño", price: 1 },
      { name: "Caper", price: 1 },
      { name: "Jalapeño relish", price: 1 },
    ],
  },
  {
    group: "Condiments",
    items: [
      { name: "Spicy aioli", price: 2 },
      { name: "Smoky honey mustard", price: 2 },
      { name: "Smoked garlic aioli", price: 2 },
      { name: "Onion marmalade", price: 2 },
      { name: "Smoked chipotle ketchup", price: 2 },
      { name: "Pesto rosso", price: 2 },
      { name: "Horseradish cream", price: 2 },
      { name: "Salted walnut", price: 1 },
      { name: "Balsamic glaze", price: 2 },
      { name: "Lemon vinaigrette", price: 2 },
    ],
  },
];

export type OutletMenu = {
  richieRich: Dish;
  exclusive: Dish;
  byoExtras: Partial<Record<string, Line[]>>;
};

export const outletMenus: Record<string, OutletMenu> = {
  "tanjong-pagar": {
    richieRich: { name: "The Jurassic Project", price: 25, items: "Short rib pastrami, chorizo, mustard green relish, mustard slaw" },
    exclusive: { name: "Moho Jojo", price: 18, items: "Pressed bagel, roasted mojo pork belly, cheddar, emmental, schug, apple mostarda" },
    byoExtras: {
      Proteins: [{ name: "Roasted mojo pork belly", price: 8 }, { name: "Short rib pastrami", price: 12 }],
      Condiments: [{ name: "Schug", price: 2 }, { name: "Apple mostarda", price: 2 }],
    },
  },
  novena: {
    richieRich: { name: "Hangul Stack", price: 25, items: "Smoked galbi brisket, breaded pulled pork, double pepper jack, smoked mustard aioli, chilli jangajji, kimchi relish" },
    exclusive: { name: "All My Exes", price: 18, items: "Smoked pulled pork, pepper jack, green mango slaw, dill pickled onion, sunny egg" },
    byoExtras: {
      "Add ons": [{ name: "Pepper jack", price: 2 }],
      Proteins: [{ name: "Smoked pulled pork", price: 8 }, { name: "Smoked galbi brisket", price: 12 }],
      Greens: [{ name: "Green mango slaw", price: 3 }],
    },
  },
  "holland-village": {
    richieRich: { name: "What He Ordered", price: 25, items: "Double Labo beef patty, smoked cheese, emmental, tomato bacon jam, boom boom sauce, dill pickled onion" },
    exclusive: { name: "What She Ordered", price: 18, items: "Battered fish, cheddar, tartar sauce, sambal ijo, red onion, fried caper" },
    byoExtras: {
      Proteins: [{ name: "Battered fish", price: 10 }, { name: "Labo beef patty", price: 8 }],
      Condiments: [{ name: "Sambal ijo", price: 2 }, { name: "Tartar sauce", price: 2 }],
    },
  },
  "joo-chiat": {
    richieRich: { name: "East Coast Plan", price: 25, items: "Beef skirt steak, smashed prawn, smoked garlic aioli, wing bean salad, arugula, mixed wild mushroom, truffle shroom butter" },
    exclusive: { name: "Boss Hogg", price: 17, items: "BBQ pulled pork, mac & cheese patty, pickled red cabbage" },
    byoExtras: {
      "Add ons": [{ name: "Mac & cheese patty", price: 3 }],
      Proteins: [{ name: "BBQ pulled pork", price: 8 }],
      Pickles: [{ name: "Pickled red cabbage", price: 1 }],
    },
  },
  punggol: {
    richieRich: { name: "Just Keep Swimming", price: 25, items: "Aburi miso tuna, mango salsa, avocado, arugula, lemon vinaigrette" },
    exclusive: { name: "Finding Nemo", price: 17, items: "Fried fish of the day, sunny egg, salted egg sauce, Thai chili jam, pickled 3 chilli, mesclun" },
    byoExtras: {
      "Add ons": [{ name: "Pepper jack", price: 2 }],
    },
  },
};

export function byoFor(slug: string): Byo[] {
  const extras = outletMenus[slug]?.byoExtras ?? {};
  return byoBase.map((g) => ({ group: g.group, items: [...g.items, ...(extras[g.group] ?? [])] }));
}

export const byoUrl = "https://twomenbagelsbyob.oddle.me/en_SG?productId=8aa600449f202fff019f2259ccd92d4f";
