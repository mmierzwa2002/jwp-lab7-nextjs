import clientPromise from "./mongodb";
import { put } from "@vercel/blob";
import slugify from "slugify";
import xss from "xss";

async function getDb() {
  const client = await clientPromise;
  return client.db("nextlevel-food");
}

export async function getMeals() {
  const db = await getDb();
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error('Loading meals failed');

  return db.collection("meals").find({}).toArray();
}

export async function getMeal(slug) {
  const db = await getDb();
  return db.collection("meals").findOne({ slug: slug });
}

export async function saveMeal(meal) {
  const db = await getDb();

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  console.log("--- DEBUGGING BLOB TOKEN ---");
  console.log(
    "Is Token Present?",
    process.env.BLOB_READ_WRITE_TOKEN ? "YES" : "NO",
  );

  const blob = await put(fileName, meal.image, {
    access: "public",
  });

  const newMeal = {
    title: meal.title,
    summary: meal.summary,
    instructions: meal.instructions,
    creator: meal.creator,
    creator_email: meal.creator_email,
    slug: meal.slug,
    image: blob.url,
  };

  await db.collection("meals").insertOne(newMeal);
}
