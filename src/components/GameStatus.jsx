import { useState } from "react";

function GameStatus({ players: initialPlayers }) {
  const [players, setPlayers] = useState(initialPlayers);

  const togglePlayerStatus = (index) => {
    setPlayers(
      players.map((player, i) =>
        i === index ? { ...player, isAlive: !player.isAlive } : player
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8 text-center">État de la partie</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {players.map((player, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
              !player.isAlive ? "opacity-50" : ""
            }`}
          >
            <div className="p-3 sm:p-4 text-center">
              <div className="flex flex-col items-center mb-3 sm:mb-4 gap-2">
                <h3 className="text-lg sm:text-xl font-bold">{player.name}</h3>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    player.role === "civil"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {player.role === "civil" ? "Civil" : "Undercover"}
                </span>
              </div>

              <div className="mb-3 sm:mb-4">
                <p className="text-gray-600 text-sm mb-1">Mot :</p>
                <p className="text-base sm:text-lg font-medium">
                  {player.word}
                </p>
              </div>

              <button
                onClick={() => togglePlayerStatus(index)}
                className={`w-full py-2 px-4 rounded text-white transition-colors ${
                  player.isAlive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {player.isAlive ? "Éliminer" : "Réanimer"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameStatus;
