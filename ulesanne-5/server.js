const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const os = require("os");
const crypto = require("crypto");

const app = express();
app.use(express.json());

// Serve frontend static files from project folder
app.use(express.static(path.join(__dirname)));

const PRODUCTS_FILE = path.join(__dirname, "products.json");
const FAVORITES_FILE = path.join(__dirname, "favorites.json");

async function readJson(filePath, defaultValue) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    return defaultValue;
  }
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + os.EOL, "utf8");
}

// Ensure clientId cookie exists; attach req.clientId
app.use((req, res, next) => {
  const cookieHeader = req.headers.cookie || "";
  const cookies = {};
  cookieHeader.split(";").forEach((c) => {
    const [k, ...rest] = c.split("=");
    if (!k) return;
    cookies[k.trim()] = decodeURIComponent((rest || []).join("=").trim());
  });

  let clientId = cookies.clientId;
  if (!clientId) {
    // generate a stable id for this client
    clientId = crypto.randomUUID
      ? crypto.randomUUID()
      : crypto.randomBytes(16).toString("hex");
    // Set cookie so frontend keeps the same clientId across reloads
    // HttpOnly to prevent tampering from JS;
    res.setHeader("Set-Cookie", `clientId=${clientId}; Path=/; SameSite=Lax`);
  }
  req.clientId = clientId;
  next();
});

// Fetch products from fakestoreapi and cache to products.json if missing
async function ensureProducts() {
  let products = await readJson(PRODUCTS_FILE, null);
  if (!products) {
    try {
      const resp = await fetch("https://fakestoreapi.com/products");
      const json = await resp.json();
      products = json.map((p) => ({
        id: p.id,
        name: p.title || p.name || "",
        price: p.price,
        category: p.category || "",
        description: p.description || "",
        image: p.image || "",
      }));
      await writeJson(PRODUCTS_FILE, products);
      console.log(
        "Fetched products from fakestoreapi and saved to products.json",
      );
    } catch (err) {
      console.error("Failed to fetch products:", err);
      products = [];
    }
  }
  return products;
}

// API: get all products
app.get("/api/products", async (req, res) => {
  const products = await ensureProducts();
  res.json(products);
});

// API: get single product by id
app.get("/api/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const products = await ensureProducts();
  const product = products.find((p) => Number(p.id) === id);
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
});

// API: list categories
app.get("/api/categories", async (req, res) => {
  const products = await ensureProducts();
  const categories = Array.from(
    new Set(products.map((p) => p.category)),
  ).filter(Boolean);
  res.json(categories);
});

// API: products by category
app.get("/api/products/category/:category", async (req, res) => {
  const category = decodeURIComponent(req.params.category);
  const products = await ensureProducts();
  const filtered = products.filter((p) => p.category === category);
  res.json(filtered);
});

// Favorites endpoints (per clientId) - stored in favorites.json as map { clientId: [ { product } ] }
app.get("/api/favorites", async (req, res) => {
  const all = await readJson(FAVORITES_FILE, {});
  const favs = all[req.clientId] || [];
  res.json(favs);
});

app.post("/api/favorites", async (req, res) => {
  const payload = req.body;
  if (!payload) return res.status(400).json({ error: "Missing body" });

  const all = await readJson(FAVORITES_FILE, {});
  const clientFavs = all[req.clientId] || [];

  const product = payload.product || payload;
  if (!product || product.id === undefined)
    return res.status(400).json({ error: "Missing product with id" });

  const exists = clientFavs.find(
    (f) => Number((f.product || f).id) === Number(product.id),
  );
  if (exists) return res.status(409).json({ error: "Already exists" });

  clientFavs.push({ product });
  all[req.clientId] = clientFavs;
  await writeJson(FAVORITES_FILE, all);
  res.json(clientFavs);
});

app.delete("/api/favorites/:productId", async (req, res) => {
  const productId = Number(req.params.productId);
  const all = await readJson(FAVORITES_FILE, {});
  const clientFavs = all[req.clientId] || [];
  const updated = clientFavs.filter(
    (f) => Number((f.product || f).id) !== productId,
  );
  all[req.clientId] = updated;
  await writeJson(FAVORITES_FILE, all);
  res.json(updated);
});

// SPA fallback: serve index.html for any non-API GET request so client-side routes work on refresh
app.use((req, res, next) => {
  if (req.method !== "GET") return next();
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
