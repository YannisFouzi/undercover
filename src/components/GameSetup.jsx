import { useState } from "react";

function GameSetup({ onSubmit }) {
  const wordPairs = [
    { civil: "Messi", undercover: "Ronaldo", category: "Joueurs" },
    {
      civil: "Coupe du monde",
      undercover: "Ligue des champions",
      category: "Compétitions",
    },
    { civil: "PSG", undercover: "OM", category: "Clubs" },
  ];

  const [selectedPair, setSelectedPair] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      word1: wordPairs[selectedPair].civil,
      word2: wordPairs[selectedPair].undercover,
      civilCount: 3, // Fixé à 3 civils
      undercoverCount: 1, // Fixé à 1 undercover
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">
            Choisissez la paire de mots:
          </label>
          <select
            value={selectedPair}
            onChange={(e) => setSelectedPair(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          >
            {wordPairs.map((pair, index) => (
              <option key={index} value={index}>
                {pair.civil} vs {pair.undercover}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded space-y-2">
          <p className="text-sm text-gray-600">
            Configuration: 3 Civils et 1 Undercover
          </p>
          <div className="flex justify-between text-sm">
            <p className="text-blue-600">
              Civils :{" "}
              <span className="font-bold">{wordPairs[selectedPair].civil}</span>
            </p>
            <p className="text-purple-600">
              Undercover :{" "}
              <span className="font-bold">
                {wordPairs[selectedPair].undercover}
              </span>
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Commencer
        </button>
      </form>
    </div>
  );
}

export default GameSetup;
