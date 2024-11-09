'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const GRID_SIZE = 40;
const CELL_SIZE = 15;

interface Player {
  position: { x: number; y: number };
  direction: 'up' | 'down' | 'left' | 'right';
  color: string;
  trail: Array<{ x: number; y: number }>;
}

export default function EasterEgg() {
  const [isVisible, setIsVisible] = useState(false);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [player, setPlayer] = useState<Player>({
    position: { x: 10, y: 20 },
    direction: 'right',
    color: 'from-violet-500 to-indigo-500',
    trail: []
  });
  const [ai, setAi] = useState<Player>({
    position: { x: 30, y: 20 },
    direction: 'left',
    color: 'from-red-500 to-orange-500',
    trail: []
  });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Game initialization
  useEffect(() => {
    if (isVisible && !gameOver) {
      setPlayer({
        position: { x: 10, y: 20 },
        direction: 'right',
        color: 'from-violet-500 to-indigo-500',
        trail: []
      });
      setAi({
        position: { x: 30, y: 20 },
        direction: 'left',
        color: 'from-red-500 to-orange-500',
        trail: []
      });
      setScore(0);
    }
  }, [isVisible, gameOver]);

  // Game loop
  useEffect(() => {
    if (!isVisible || gameOver) return;

    const movePlayer = (player: Player): Player => {
      const newPosition = { ...player.position };
      switch (player.direction) {
        case 'up': newPosition.y--; break;
        case 'down': newPosition.y++; break;
        case 'left': newPosition.x--; break;
        case 'right': newPosition.x++; break;
      }
      return {
        ...player,
        position: newPosition,
        trail: [...player.trail, player.position]
      };
    };

    const checkCollision = (pos: { x: number; y: number }, trails: Array<{ x: number; y: number }>, currentTrail: Array<{ x: number; y: number }>) => {
      // Check boundaries
      if (pos.x < 0 || pos.x >= GRID_SIZE || pos.y < 0 || pos.y >= GRID_SIZE) {
        return true;
      }

      // Check collision with other trails
      return trails.some(t => t.x === pos.x && t.y === pos.y) ||
        // Check collision with own trail (excluding the last few positions to prevent immediate self-collision)
        currentTrail.slice(0, -3).some(t => t.x === pos.x && t.y === pos.y);
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
        
        if (checkCollision(newAi.position, allTrails, prev.trail)) {
          setGameOver(true);
          if (score > highScore) setHighScore(score);
          return prev;
        }
        
        // Simple AI logic
        const directions: ('up' | 'down' | 'left' | 'right')[] = ['up', 'down', 'left', 'right'];
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

  // Key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible || gameOver) return;

      setPlayer(prev => {
        const newDirection = 
          e.key === 'ArrowUp' ? 'up' :
          e.key === 'ArrowDown' ? 'down' :
          e.key === 'ArrowLeft' ? 'left' :
          e.key === 'ArrowRight' ? 'right' :
          prev.direction;

        return { ...prev, direction: newDirection };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, gameOver]);

  // Keep the sequence detection from the original
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      const newSequence = [...userSequence, key];
      
      if (newSequence.length > SEQUENCE.length) {
        newSequence.shift();
      }
      setUserSequence(newSequence);

      const match = SEQUENCE.every((value, index) => 
        newSequence[index]?.toLowerCase() === value.toLowerCase()
      );

      if (match && newSequence.length === SEQUENCE.length) {
        setIsVisible(true);
        setUserSequence([]);
        setScore(0);
        setGameOver(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [userSequence]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/95 to-indigo-900/95" />
          
          <div className="relative w-[600px] h-[600px] bg-black/40 backdrop-blur-xl border border-violet-500/50 rounded-xl overflow-hidden">
            {/* Game grid */}
            <div className="absolute inset-0 grid"
                 style={{ 
                   gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
                   gap: '1px',
                   background: 'rgba(255,255,255,0.1)'
                 }}>
              {/* Player trail */}
              {player.trail.map((pos, i) => (
                <motion.div
                  key={`player-${i}`}
                  className={`absolute bg-gradient-to-r ${player.color}`}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    left: pos.x * CELL_SIZE,
                    top: pos.y * CELL_SIZE
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              ))}

              {/* AI trail */}
              {ai.trail.map((pos, i) => (
                <motion.div
                  key={`ai-${i}`}
                  className={`absolute bg-gradient-to-r ${ai.color}`}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    left: pos.x * CELL_SIZE,
                    top: pos.y * CELL_SIZE
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              ))}

              {/* Current positions */}
              <motion.div
                className={`absolute bg-gradient-to-r ${player.color}`}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  left: player.position.x * CELL_SIZE,
                  top: player.position.y * CELL_SIZE
                }}
              />
              <motion.div
                className={`absolute bg-gradient-to-r ${ai.color}`}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  left: ai.position.x * CELL_SIZE,
                  top: ai.position.y * CELL_SIZE
                }}
              />
            </div>

            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-white mb-4">Game Over!</h3>
                <p className="text-white mb-2">Score: {score}</p>
                <p className="text-white mb-4">High Score: {highScore}</p>
                <button
                  onClick={() => setGameOver(false)}
                  className="px-6 py-3 bg-violet-500/20 rounded-lg hover:bg-violet-500/40 transition-colors text-white"
                >
                  Play Again
                </button>
              </div>
            )}

            {/* UI */}
            <div className="absolute top-4 right-4 text-white font-bold">
              Score: {score}
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 left-4 px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
            >
              Exit (Esc)
            </button>

            {!gameOver && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60">
                Use arrow keys to change direction
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 