
import * as types from '../../types';

export default function ProfileCard({
  name,
  birth_year,
  gender,
  hair_color,
  eye_color,
  mass,
}: types.StatWarCharacter) {
  return <div className="card">
    <h4>{name}</h4>
    <p>Birth Year: {birth_year} </p>
    <p>Gender: {gender}</p>
    <p>Eye Color: {eye_color} </p>
    <p>Hair Color {hair_color}</p>
    <p>Mass: {mass}</p>
  </div>;
}