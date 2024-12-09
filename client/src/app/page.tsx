import { getMassages } from "lib/api/massages";

export default async function Page() {
  const massagesList = await getMassages();

  return (
    <div>
      <h1>Massages</h1>
      {
        massagesList.map(massage => (
          <p>{massage.name}</p>
        ))
      }
    </div>
  );
}