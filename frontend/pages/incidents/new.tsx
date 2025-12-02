import { useState } from "react";
import { createIncident, Incident } from "../../lib/api";

export default function NewIncidentPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const incident: Incident = {
      title,
      description,
    };
    try {
      const result = await createIncident(incident);
      setMessage(`Incident created with ID: ${result.id}`);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setMessage(err.message);
        } else {
            setMessage(String(err));
        }
    }
  };

  return (
    <div>
      <h1>Create New Incident</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
