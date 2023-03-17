import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Wilder, { IWilderProps } from "./components/Wilder";
import AddGradeForm from "./components/AddGradeForm";
import AddWilderForm from "./components/AddWilderForm";

interface ISkillFromAPI {
  id: number;
  name: string;
}

interface IGradeFromAPI {
  grade: number;
  skill: ISkillFromAPI;
}

interface IWilderFromAPI {
  name: string;
  id: number;
  grades: IGradeFromAPI[];
}

const formatWildersFromApi = (wilders: IWilderFromAPI[]): IWilderProps[] =>
  wilders.map((wilder) => {
    return {
      id: wilder.id,
      name: wilder.name,
      skills: wilder.grades.map((grade) => {
        return { votes: grade.grade, title: grade.skill.name };
      }),
    };
  });

function App() {
  const [wilders, setWilders] = useState<IWilderProps[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date().getTime());
  useEffect(() => {
    const fetchWilders = async () => {
      const wilderFromApi = await axios.get<IWilderFromAPI[]>(
        "http://localhost:5000/api/wilder"
      );
      console.log(wilderFromApi);
      setWilders(formatWildersFromApi(wilderFromApi.data));
    };
    fetchWilders();
  }, [lastUpdate]);

  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <AddGradeForm />
        <AddWilderForm setLastUpdate={setLastUpdate} />
        <h2>Wilders</h2>
        <section className="card-row">
          {wilders.map((wilder) => {
            return (
              <Wilder
                key={wilder.id}
                name={wilder.name}
                id={wilder.id}
                skills={wilder.skills}
              />
            );
          })}
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2023 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
