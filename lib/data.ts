import type { Product } from "./types";
export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Organic Tomatoes",
    description:
      "Vine-ripened, organic tomatoes grown with sustainable farming practices. Perfect for salads, sauces, or cooking.",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=2070&auto=format&fit=crop",
    region: "South Region",
    quantity: 50,
    isOrganic: true,
    farmer: "Green Valley Farms",
    harvestDate: "2025-04-15",
    category: "Vegetables",
  },
  {
    id: "2",
    name: "Premium Potatoes",
    description:
      "Locally grown premium potatoes. Versatile for various cooking methods including baking, mashing, or frying.",
    price: 1.49,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2070&auto=format&fit=crop",
    region: "North Region",
    quantity: 100,
    farmer: "Highland Produce",
    harvestDate: "2025-04-10",
    category: "Vegetables",
  },
  {
    id: "3",
    name: "Organic Carrots",
    description:
      "Sweet and crunchy organic carrots. Rich in vitamins and perfect for snacking, cooking, or juicing.",
    price: 1.99,
    image:
      "https://images.unsplash.com/photo-1580294672675-91afc00ee7b3?q=80&w=2070&auto=format&fit=crop",
    region: "East Region",
    quantity: 75,
    isOrganic: true,
    farmer: "Sunrise Organic Co-op",
    harvestDate: "2025-04-18",
    category: "Vegetables",
  },
  {
    id: "4",
    name: "Fresh Green Beans",
    description:
      "Crisp and tender green beans harvested at peak freshness. Great for side dishes or stir-fries.",
    price: 3.49,
    image:
      "https://images.unsplash.com/photo-1567375698348-5d9d5ae99d0a?q=80&w=2070&auto=format&fit=crop",
    region: "West Region",
    quantity: 30,
    farmer: "Valley View Farm",
    harvestDate: "2025-04-20",
    category: "Vegetables",
  },
  {
    id: "5",
    name: "Organic Apples",
    description:
      "Sweet and juicy organic apples. Perfect for snacking, baking, or making fresh apple juice.",
    price: 2.49,
    image:
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2070&auto=format&fit=crop",
    region: "Central Region",
    quantity: 60,
    isOrganic: true,
    farmer: "Orchard Hills",
    harvestDate: "2025-04-05",
    category: "Fruits",
  },
  {
    id: "6",
    name: "Fresh Strawberries",
    description:
      "Sweet and fragrant strawberries. Enjoy them fresh, in desserts, or smoothies.",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=2071&auto=format&fit=crop",
    region: "South Region",
    quantity: 25,
    farmer: "Berry Good Farm",
    harvestDate: "2025-04-19",
    category: "Fruits",
  },
  {
    id: "7",
    name: "Organic Brown Rice",
    description:
      "Nutritious organic brown rice. A wholesome base for many meals with a nutty flavor and chewy texture.",
    price: 3.29,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop",
    region: "East Region",
    quantity: 80,
    isOrganic: true,
    farmer: "Sunrise Organic Co-op",
    harvestDate: "2025-03-30",
    category: "Grains",
  },
  {
    id: "8",
    name: "Fresh Corn",
    description:
      "Sweet and tender corn picked at the perfect time. Great for grilling, boiling, or adding to salads.",
    price: 0.99,
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=2070&auto=format&fit=crop",
    region: "West Region",
    quantity: 120,
    farmer: "Golden Fields Farm",
    harvestDate: "2025-04-16",
    category: "Vegetables",
  },
  {
    id: "9",
    name: "Organic Spinach",
    description:
      "Nutrient-rich organic spinach. Versatile for salads, smoothies, or cooking.",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2080&auto=format&fit=crop",
    region: "North Region",
    quantity: 40,
    isOrganic: true,
    farmer: "Green Leaf Gardens",
    harvestDate: "2025-04-22",
    category: "Vegetables",
  },
  {
    id: "10",
    name: "Fresh Cucumbers",
    description:
      "Crisp and refreshing cucumbers. Perfect for salads, sandwiches, or pickling.",
    price: 1.79,
    image:
      "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?q=80&w=2070&auto=format&fit=crop",
    region: "Central Region",
    quantity: 65,
    farmer: "Fresh Fields Co-op",
    harvestDate: "2025-04-17",
    category: "Vegetables",
  },
  {
    id: "11",
    name: "Organic Blueberries",
    description:
      "Sweet and tangy organic blueberries. Packed with antioxidants and perfect for snacking or baking.",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=2069&auto=format&fit=crop",
    region: "North Region",
    quantity: 20,
    isOrganic: true,
    farmer: "Berry Patch Farm",
    harvestDate: "2025-04-21",
    category: "Fruits",
  },
  {
    id: "12",
    name: "Fresh Lettuce",
    description:
      "Crisp and fresh lettuce. The foundation for salads or a great addition to sandwiches.",
    price: 2.29,
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=2076&auto=format&fit=crop",
    region: "West Region",
    quantity: 45,
    farmer: "Valley View Farm",
    harvestDate: "2025-04-23",
    category: "Vegetables",
  },
  {
    id: "13",
    name: "Local Honey",
    description:
      "Pure, raw honey produced by local bees. Perfect for sweetening tea, drizzling on toast, or baking.",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2080&auto=format&fit=crop",
    region: "South Region",
    quantity: 30,
    farmer: "Busy Bee Apiaries",
    harvestDate: "2025-03-15",
    category: "Specialty",
  },
  {
    id: "14",
    name: "Organic Kale",
    description:
      "Fresh organic kale. A nutritional powerhouse perfect for salads, smoothies, and sautéed dishes.",
    price: 3.49,
    image:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e695?q=80&w=2080&auto=format&fit=crop",
    region: "East Region",
    quantity: 35,
    isOrganic: true,
    farmer: "Green Leaf Gardens",
    harvestDate: "2025-04-19",
    category: "Vegetables",
  },
  {
    id: "15",
    name: "Farm Fresh Eggs",
    description:
      "Free-range eggs from pasture-raised hens. Rich in flavor with vibrant orange yolks.",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=2070&auto=format&fit=crop",
    region: "Central Region",
    quantity: 100,
    farmer: "Happy Hen Farm",
    harvestDate: "2025-04-22",
    category: "Dairy & Eggs",
  },
  {
    id: "16",
    name: "Organic Quinoa",
    description:
      "Protein-rich organic quinoa. Perfect as a base for grain bowls, salads, or as a nutritious side dish.",
    price: 5.79,
    image:
      "https://images.unsplash.com/photo-1612358405970-e1adb2e874d3?q=80&w=2071&auto=format&fit=crop",
    region: "West Region",
    quantity: 50,
    isOrganic: true,
    farmer: "Wholesome Farms Collective",
    harvestDate: "2025-03-20",
    category: "Grains",
  },
  {
    id: "17",
    name: "Fresh Asparagus",
    description:
      "Tender asparagus spears harvested at peak season. Excellent grilled, roasted, or steamed.",
    price: 4.29,
    image:
      "https://images.unsplash.com/photo-1595855759920-86582396756e?q=80&w=2073&auto=format&fit=crop",
    region: "North Region",
    quantity: 40,
    farmer: "Riverside Gardens",
    harvestDate: "2025-04-15",
    category: "Vegetables",
  },
  {
    id: "18",
    name: "Organic Avocados",
    description:
      "Creamy, ripe organic avocados. Perfect for guacamole, salads, or spreading on toast.",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=2075&auto=format&fit=crop",
    region: "South Region",
    quantity: 55,
    isOrganic: true,
    farmer: "Green Valley Farms",
    harvestDate: "2025-04-18",
    category: "Fruits",
  },
  {
    id: "19",
    name: "Artisanal Cheese",
    description:
      "Small-batch, artisanal cheese made from grass-fed cow's milk. Rich, complex flavor profile.",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=2069&auto=format&fit=crop",
    region: "East Region",
    quantity: 25,
    farmer: "Meadow Creek Dairy",
    harvestDate: "2025-04-10",
    category: "Dairy & Eggs",
  },
  {
    id: "20",
    name: "Organic Cherries",
    description:
      "Sweet, juicy organic cherries. Perfect for snacking, baking, or preserving.",
    price: 6.49,
    image:
      "https://images.unsplash.com/photo-1528821128474-27f963b062bf?q=80&w=2070&auto=format&fit=crop",
    region: "West Region",
    quantity: 30,
    isOrganic: true,
    farmer: "Cherry Hill Orchards",
    harvestDate: "2025-04-20",
    category: "Fruits",
  },
];
