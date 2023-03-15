import axios from "axios";
import blank_profile from "../assets/profile.png";

export interface IWilderProps {
  name: string;
  id: number;
}

const handleDelete = (id: number) => {
  axios.delete("http://localhost:5000/api/wilder/" + id);
};
const Wilder = ({ name, id }: IWilderProps) => {
  return (
    <article className="card">
      <img src={blank_profile} alt="Jane Doe Profile" />
      <h3>{name}</h3>
      <button onClick={() => handleDelete(id)}>Delete</button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h4>Wild Skills</h4>
      <ul className="skills"></ul>
    </article>
  );
};

export default Wilder;
