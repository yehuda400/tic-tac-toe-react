import { useState } from "react";

export default function Player({
    initialName,
    symbol,
    isActive,
    onChangeName,
}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEdit() {
        setIsEditing((prev) => !prev);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let playerNameJsx = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        playerNameJsx = (
            <input
                type="text"
                required
                value={playerName}
                onChange={handleChange}
            />
        );
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {playerNameJsx}
                <span className="player-symbol">{symbol}</span>
                <button onClick={handleEdit}>
                    {isEditing ? "Save" : "Edit"}
                </button>
            </span>
        </li>
    );
}
