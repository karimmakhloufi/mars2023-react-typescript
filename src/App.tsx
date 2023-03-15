import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Wilder, { IWilderProps } from "./components/Wilder";

const formatWildersFromApi = (wilders: any) =>
  wilders.map((wilder: any) => {
    return {
      name: wilder.name,
      skills: wilder.grades.map((grade: any) => {
        return { votes: grade.grade, title: grade.skill.name };
      }),
    };
  });

function App() {
  const [wilders, setWilders] = useState<IWilderProps[]>([]);
  useEffect(() => {
    const fetchWilders = async () => {
      const apiWilders = await axios.get("http://localhost:5000/api/wilder");
      setWilders(formatWildersFromApi(apiWilders.data));
    };
    fetchWilders();
  }, []);

  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <h2>Wilders</h2>
        <section className="card-row">
          {wilders.map((wilder) => {
            return <Wilder key={wilder.id} name={wilder.name} id={wilder.id} />;
          })}
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
