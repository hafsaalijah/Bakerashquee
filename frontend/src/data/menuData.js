export const categories=[
    {id:"brownies",label:"Browies"},
    { id: "cookies", label: "Cookies" },
    { id: "cinnamonRolls", label: "Cinnamon Rolls" },
    { id: "bentoCakes", label: "Bento Cakes" },
    { id: "customCakes", label: "Custom Cakes" },
];
export const menuItems = {
  brownies: [
    { id: "b1", name: "Classic Brownie", price: 350, description: "Rich, fudgy chocolate brownie with a crinkly top.", bestseller: true },
    { id: "b2", name: "Nutella Brownie", price: 400, description: "Loaded with Nutella swirls and extra gooeyness.", bestseller: false },
    { id: "b3", name: "Lotus Biscoff Brownie", price: 450, description: "Topped with Biscoff spread and a crunchy cookie.", bestseller: true },
    { id: "b4", name: "Oreo Brownie", price: 400, description: "Crushed Oreos baked right into the brownie batter.", bestseller: false },
    { id: "b5", name: "Salted Caramel Brownie", price: 420, description: "Sweet and salty perfection with caramel drizzle.", bestseller: false },
  ],
  cookies: [
    { id: "c1", name: "Chocolate Chip Cookie", price: 180, description: "Classic buttery cookie loaded with chocolate chips.", bestseller: true },
    { id: "c2", name: "Nutella Stuffed Cookie", price: 220, description: "Soft cookie with a gooey Nutella center.", bestseller: true },
    { id: "c3", name: "Biscoff Cookie", price: 230, description: "Cookie butter cookie with Biscoff crumble on top.", bestseller: false },
    { id: "c4", name: "Red Velvet Cookie", price: 220, description: "Vibrant red velvet with cream cheese chips.", bestseller: false },
    { id: "c5", name: "Brookie", price: 280, description: "Half brownie half cookie — the best of both worlds.", bestseller: true },
  ],
  cinnamonRolls: [
    { id: "cr1", name: "Classic", price: 650, description: "Soft fluffy rolls with rich cream cheese frosting.", bestseller: false },
    { id: "cr2", name: "Nutella", price: 800, description: "Cinnamon rolls topped with Nutella and a Ferrero Rocher.", bestseller: true },
    { id: "cr3", name: "Lotus Biscoff", price: 800, description: "Cream cheese frosting with melted Biscoff and a crunchy cookie.", bestseller: true },
    { id: "cr4", name: "Salted Caramel", price: 750, description: "Rich salted caramel with cream cheese and chopped peanuts.", bestseller: false },
    { id: "cr5", name: "Milk Chocolate", price: 700, description: "Drizzled with creamy milk chocolate and chocolate wafers.", bestseller: false },
    { id: "cr6", name: "Cookies and Cream", price: 700, description: "Swirled with cookies and cream frosting and crushed Oreos.", bestseller: false },
  ],
  bentoCakes: [
    { id: "bc1", name: "Chocolate Bento Cake", price: 1200, description: "Mini single serve chocolate cake, perfect for gifting.", bestseller: true },
    { id: "bc2", name: "Vanilla Bento Cake", price: 1100, description: "Light and fluffy vanilla cake with buttercream.", bestseller: false },
    { id: "bc3", name: "Red Velvet Bento Cake", price: 1300, description: "Classic red velvet with cream cheese frosting.", bestseller: true },
    { id: "bc4", name: "Lotus Biscoff Bento Cake", price: 1400, description: "Cookie butter cake with Biscoff drizzle.", bestseller: false },
  ],
  customCakes: [],
};

export const bestsellers = Object.values(menuItems)
  .flat()
  .filter(item => item.bestseller);