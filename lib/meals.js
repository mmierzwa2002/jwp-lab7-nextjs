import sql from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "meals.db");
const db = sql(dbPath);

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}
