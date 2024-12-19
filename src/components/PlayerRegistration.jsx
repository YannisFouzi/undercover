import { useState } from "react";

function PlayerRegistration({
  onSubmit,
  currentPlayer,
  totalPlayers,
  onComplete,
}) {
  const [showWord, setShowWord] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [currentPlayerNumber, setCurrentPlayerNumber] = useState(currentPlayer);
  const [selectedName, setSelectedName] = useState("");
  const [usedNames, setUsedNames] = useState([]);

  const availableNames = ["Damien", "Steven", "Lucca", "Julien"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showWord) {
      const result = onSubmit(selectedName);
      setCurrentWord(result.word);
      setShowWord(true);
      setUsedNames([...usedNames, selectedName]);
    } else {
      if (currentPlayerNumber === totalPlayers) {
        onComplete();
      } else {
        setCurrentPlayerNumber(currentPlayerNumber + 1);
      }
      setSelectedName("");
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
            <label className="block text-gray-700 mb-2 text-center">
              Choisis ton nom :
            </label>
            <div className="grid grid-cols-2 gap-3">
              {availableNames.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSelectedName(name)}
                  disabled={usedNames.includes(name)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedName === name
                      ? "border-blue-500 bg-blue-50"
                      : usedNames.includes(name)
                      ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={!selectedName}
            className={`w-full py-2 px-4 rounded transition-all ${
              selectedName
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
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
