export default function MealDetailsPage({ params }) {
  return (
    <main>
      <h1>Meal Details</h1>
      <p>You are looking at the meal: {params.someName}</p>
    </main>
  );
}
