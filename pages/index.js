import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>Tagline generator</title>
        <link rel="icon" href="/dog.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className="absolute inset-28">
      <main className={styles.main}>
        <span class="material-symbols-outlined text-5xl">
          edit_note
        </span>
        <h3>Generate Taglines with AI</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="write a tagline for an icecream shop"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate Tagline" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
      </div>
    </div>
  );
}
