import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';

const NUM_CARDS = 12;

export default function MemoryGame() {
  const [key, setKey] = useState(0);
  const [cards, setCards] = useState<
    Array<{ id: number; isFlipped: boolean; color: string; position: string }>
  >([]);
  const [flippedCards, setFlippedCards] = useState<Array<{ id: number; color: string }>>([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeCards();
  }, [key]);

  const shuffleArray = (array: number[] | string[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const initializeCards = () => {
    const newCards = [];
    const shuffledColors = shuffleArray([
      '#FF0000',
      '#000000',
      '#0000FF',
      '#00FF00',
      '#FFFFFF',
      '#00FFFF',
    ]);

    const stringColors = shuffledColors.map((color) => String(color));
    const positions = Array.from({ length: NUM_CARDS }, (_, index) => index);
    const shuffledPositions = shuffleArray(positions);

    for (let i = 0; i < NUM_CARDS; i++) {
      const cardId = i + 1;
      const color = stringColors[i % (NUM_CARDS / 2)];
      const position = shuffledPositions[i].toString();
      newCards.push({ id: cardId, isFlipped: false, color, position });
    }

    setCards(newCards);
    setGameOver(false);
  };

  const flipCard = (card: { id: number; isFlipped: boolean; color: string }) => {
    if (flippedCards.length === 2) {
      return;
    }

    const newCards = cards.map((c) => (c.id === card.id ? { ...c, isFlipped: !c.isFlipped } : c));
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const updatedFlippedCards = newFlippedCards.map((card) => ({
        ...card,
        isFlipped: false,
      }));
      checkMatch(updatedFlippedCards);
    }
  };

  const checkMatch = (flippedCards: Array<{ id: number; isFlipped: boolean; color: string }>) => {
    const [card1, card2] = flippedCards;
    if (card1.color === card2.color) {
      const newCards = cards.map((card) =>
        card.id === card1.id || card.id === card2.id ? { ...card, isFlipped: true } : card
      );
      setCards(newCards);
      setFlippedCards([]);
    } else {
      setTimeout(() => {
        const newCards = cards.map((card) =>
          card.id === card1.id || card.id === card2.id ? { ...card, isFlipped: false } : card
        );
        setCards(newCards);
        setFlippedCards([]);
      }, 300);
    }
  };

  const resetGame = () => {
    setKey(key + 1);
  };

  useEffect(() => {
    if (cards.every((card) => card.isFlipped)) {
      setGameOver(true);
    }
  }, [cards]);

  const renderCards = () => {
    return cards.map((card) => (
      <TouchableOpacity
        key={card.id}
        style={[styles.card, card.isFlipped && styles.flippedCard]}
        onPress={() => flipCard(card)}
        disabled={card.isFlipped}
      >
        {card.isFlipped && <View style={[styles.cardColor, { backgroundColor: card.color }]} />}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Memória</Text>
      <View style={styles.cardsContainer}>{renderCards()}</View>
      <Modal
        visible={gameOver && cards.every((card) => card.isFlipped)}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Parabéns! Você completou o jogo!</Text>
            <TouchableOpacity style={styles.playAgainButton} onPress={resetGame}>
              <Text style={styles.playAgainButtonText}>Jogar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 80,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flippedCard: {
    backgroundColor: '#b3b3b3',
  },
  cardColor: {
    width: '80%',
    height: '80%',
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: '#0066cc',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  playAgainButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
