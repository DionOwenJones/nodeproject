'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Position = { x: number; y: number };
type Direction = 'up' | 'down' | 'left' | 'right';

interface GameState {
  position: Position;
  direction: Direction;
  trail: Position[];
}

interface EasterEggProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export default function EasterEgg({ isVisible, setIsVisible }: EasterEggProps) {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [player, setPlayer] = useState<GameState>({
    position: { x: 5, y: 5 },
    direction: 'right',
    trail: []
  });
  const [ai, setAi] = useState<GameState>({
    position: { x: 15, y: 15 },
    direction: 'left',
    trail: []
  });

  useEffect(() => {
    if (!isVisible || gameOver) return;

    const movePlayer = (state: GameState): GameState => {
      const newPos = { ...state.position };
      switch (state.direction) {
        case 'up': newPos.y = (newPos.y - 1 + 20) % 20; break;
        case 'down': newPos.y = (newPos.y + 1) % 20; break;
        case 'left': newPos.x = (newPos.x - 1 + 20) % 20; break;
        case 'right': newPos.x = (newPos.x + 1) % 20; break;
      }
      return {
        ...state,
        position: newPos,
        trail: [...state.trail, state.position].slice(-5)
      };
    };

    const checkCollision = (pos: Position, trails: Position[], selfTrail: Position[]) => {
      return [...trails, ...selfTrail].some(p => p.x === pos.x && p.y === pos.y);
    };

    const gameLoop = setInterval(() => {
      setPlayer(prev => {
        const newPlayer = movePlayer(prev);
        const allTrails = [...ai.trail];
        
        if (checkCollision(newPlayer.position, allTrails, prev.trail)) {
          setGameOver(true);
          if (score > highScore) setHighScore(score);
          return prev;
        }
        setScore(s => s + 1);
        return newPlayer;
      });

      setAi(prev => {
        const newAi = movePlayer(prev);
        const allTrails = [...player.trail];
        
        const directions: Direction[] = ['up', 'down', 'left', 'right'];
        const possibleMoves = directions.filter(dir => {
          const testPos = { ...newAi.position };
          switch (dir) {
            case 'up': testPos.y--; break;
            case 'down': testPos.y++; break;
            case 'left': testPos.x--; break;
            case 'right': testPos.x++; break;
          }
          return !checkCollision(testPos, allTrails, prev.trail);
        });

        if (possibleMoves.length > 0) {
          newAi.direction = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        }
        
        return newAi;
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, [isVisible, gameOver, score, highScore, ai.trail, player.trail]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <div className="relative max-w-2xl w-full mx-4">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white"
            >
              Close
            </button>

            <div className="bg-black/80 p-8 rounded-xl border border-white/10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {gameOver ? 'Game Over!' : 'TRON Light Cycles'}
                </h3>
                <div className="flex justify-center gap-8 text-white/60">
                  <p>Score: {score}</p>
                  <p>High Score: {highScore}</p>
                </div>
              </div>

              <div className="aspect-square w-full bg-black/60 rounded-lg border border-white/10 relative overflow-hidden">
                {/* Player */}
                <motion.div
                  className="absolute w-2 h-2 bg-violet-500"
                  style={{
                    x: player.position.x * 20,
                    y: player.position.y * 20,
                  }}
                />
                {player.trail.map((pos, i) => (
                  <motion.div
                    key={`player-${i}`}
                    className="absolute w-2 h-2 bg-violet-500/30"
                    style={{
                      x: pos.x * 20,
                      y: pos.y * 20,
                    }}
                  />
                ))}

                {/* AI */}
                <motion.div
                  className="absolute w-2 h-2 bg-indigo-500"
                  style={{
                    x: ai.position.x * 20,
                    y: ai.position.y * 20,
                  }}
                />
                {ai.trail.map((pos, i) => (
                  <motion.div
                    key={`ai-${i}`}
                    className="absolute w-2 h-2 bg-indigo-500/30"
                    style={{
                      x: pos.x * 20,
                      y: pos.y * 20,
                    }}
                  />
                ))}
              </div>

              {gameOver && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setIsVisible(false)}
                    className="px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 