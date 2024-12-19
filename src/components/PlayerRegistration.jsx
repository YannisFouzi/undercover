import { useState } from "react";

function PlayerRegistration({
  onSubmit,
  currentPlayer,
  totalPlayers,
  onComplete,
}) {
  const [playerName, setPlayerName] = useState("");
  const [showWord, setShowWord] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [currentPlayerNumber, setCurrentPlayerNumber] = useState(currentPlayer);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showWord) {
      const result = onSubmit(playerName);
      setCurrentWord(result.word);
      setShowWord(true);
    } else {
      if (currentPlayerNumber === totalPlayers) {
        onComplete();
      } else {
        setCurrentPlayerNumber(currentPlayerNumber + 1);
      }
      setPlayerName("");
      setShowWord(false);
      setCurrentWord("");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Joueur {currentPlayerNumber}/{totalPlayers}
      </h2>

      {!showWord ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Nom du joueur:</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Voir mon mot
          </button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-xl font-bold">Ton mot est:</p>
          <p className="text-3xl text-blue-600">{currentWord}</p>
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            J'ai mémorisé
          </button>
        </div>
      )}
    </div>
  );
}

export default PlayerRegistration;
