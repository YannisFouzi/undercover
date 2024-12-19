import { useEffect, useState } from "react";
import GameSetup from "./components/GameSetup";
import GameStatus from "./components/GameStatus";
import PlayerRegistration from "./components/PlayerRegistration";

function App() {
  const [gameState, setGameState] = useState({
    step: "setup", // 'setup', 'registration', 'ready', 'status'
    word1: "",
    word2: "",
    civilCount: 0,
    undercoverCount: 0,
    players: [],
    roles: [],
  });

  const [countdown, setCountdown] = useState(3);
  const [canStart, setCanStart] = useState(false);

  useEffect(() => {
    let timer;
    if (gameState.step === "ready" && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanStart(true);
    }
    return () => clearTimeout(timer);
  }, [gameState.step, countdown]);

  const handleGameSetup = (setupData) => {
    const { word1, word2, civilCount, undercoverCount } = setupData;

    // Créer un tableau de rôles mélangés
    const roles = [
      ...Array(parseInt(civilCount)).fill("civil"),
      ...Array(parseInt(undercoverCount)).fill("undercover"),
    ].sort(() => Math.random() - 0.5);

    setGameState({
      ...gameState,
      word1,
      word2,
      civilCount: parseInt(civilCount),
      undercoverCount: parseInt(undercoverCount),
      step: "registration",
      roles,
    });
  };

  const handlePlayerRegistration = (playerName) => {
    const currentPlayerIndex = gameState.players.length;
    const playerRole = gameState.roles[currentPlayerIndex];
    const playerWord =
      playerRole === "civil" ? gameState.word1 : gameState.word2;

    const newPlayer = {
      name: playerName,
      role: playerRole,
      word: playerWord,
      isAlive: true,
    };

    const newPlayers = [...gameState.players, newPlayer];

    setGameState({
      ...gameState,
      players: newPlayers,
      step: "registration",
    });

    return {
      word: playerWord,
      isLast:
        newPlayers.length === gameState.civilCount + gameState.undercoverCount,
    };
  };

  const handleGameComplete = () => {
    setGameState((prev) => ({
      ...prev,
      step: "ready",
    }));
  };

  const handleStartGame = () => {
    setGameState((prev) => ({
      ...prev,
      step: "status",
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Undercover</h1>

      {gameState.step === "setup" && <GameSetup onSubmit={handleGameSetup} />}

      {gameState.step === "registration" && (
        <PlayerRegistration
          onSubmit={handlePlayerRegistration}
          currentPlayer={gameState.players.length + 1}
          totalPlayers={gameState.civilCount + gameState.undercoverCount}
          onComplete={handleGameComplete}
        />
      )}

      {gameState.step === "ready" && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold mb-4">
            Tous les joueurs sont prêts !
          </h2>
          <p className="text-gray-600 mb-6">
            Chaque joueur a mémorisé son mot. Vous pouvez maintenant commencer
            la partie.
          </p>
          {countdown > 0 ? (
            <div className="text-3xl font-bold text-blue-500 mb-4">
              {countdown}
            </div>
          ) : (
            <button
              onClick={handleStartGame}
              className={`w-full py-2 px-4 rounded transition-all duration-300 ${
                canStart
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!canStart}
            >
              Commencer la partie
            </button>
          )}
        </div>
      )}

      {gameState.step === "status" && (
        <GameStatus players={gameState.players} />
      )}
    </div>
  );
}

export default App;
