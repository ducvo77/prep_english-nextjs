"use client";

import { useState } from "react";
import styles from "./index.module.css";
import { NextResponse } from "next/server";

export default function PromptChatgpt() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event: any) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setAnimalInput("");
      return NextResponse.json(data);
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <main className={styles.main}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="animal"
          placeholder="Enter an animal"
          value={animalInput}
          onChange={(e) => setAnimalInput(e.target.value)}
        />
        <input type="submit" value="Generate names" />
      </form>
      <div className={styles.result}>{result}</div>
    </main>
  );
}
