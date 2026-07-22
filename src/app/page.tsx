import { getProperties } from "../services/properties.service";

export default async function Home() {
  const properties = await getProperties();

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h1>Validation Étape 2 - Connexion API Kasa</h1>
      <p style={{ marginTop: "10px", color: "green", fontWeight: "bold" }}>
        ✅ Nombre de propriétés récupérées depuis le back-end : {properties.length}
      </p>

      <ul style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {properties.map((property) => (
          <li key={property.id} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <strong>{property.title}</strong> - <em>{property.location}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}