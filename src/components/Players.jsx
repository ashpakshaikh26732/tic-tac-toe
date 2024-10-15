import { useState } from "react";
export default function Player({ intailname, symbol, isActive, onChangeName }) {
  const [playername, setplayername] = useState(intailname);
  const [isEditing, setIsEditing] = useState(false);
  function handlechange(event) {
    setplayername(event.target.value);
  }
  function handleEditFunction() {
    setIsEditing((edit) => !edit);
    if (isEditing) {
      onChangeName(symbol, playername);
    }
  }
  let editbleplayerName = <span className="player-name">{playername}</span>;
  if (isEditing) {
    editbleplayerName = (
      <input type="text" required value={playername} onChange={handlechange} />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span id="player">
        {editbleplayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditFunction}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
