import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type Player = 'X' | 'O';

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkGameResult = (currentBoard: Player[]): string | null => {
  for (let i = 0; i < winCombinations.length; i++) {
    const [a, b, c] = winCombinations[i];
    if (
      currentBoard[a] &&
      currentBoard[a] === currentBoard[b] &&
      currentBoard[a] === currentBoard[c]
    ) {
      return currentBoard[a];
    }
  }

  if (currentBoard.every((cell) => cell)) {
    return 'draw';
  }

  return null;
};

const GameResult = ({ result, onRestart }: { result: string; onRestart: () => void }) => {
  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultText}>
        {result === 'draw' ? 'Empate!' : `Jogador ${result} venceu!`}
      </Text>
      <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
        <Text style={styles.restartButtonText}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameResult, setGameResult] = useState<string | null>(null);

  const handleCellPress = (index: number) => {
    if (!board[index] && !gameResult) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;

      setBoard(newBoard);

      const result = checkGameResult(newBoard);

      if (result) {
        setGameResult(result);
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameResult(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => handleCellPress(index)}>
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {gameResult && <GameResult result={gameResult} onRestart={restartGame} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  board: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 100,
    height: 100,
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999999',
  },
  cellText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  resultContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  restartButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    padding: 5,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
  },
  restartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});
