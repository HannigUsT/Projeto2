import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
export default function Calculator() {
  const [displayValue, setDisplayValue] = useState('');

  const handleButtonPress = (value: string) => {
    if (displayValue === null) {
      handleClearPress();
    }

    setDisplayValue((prevDisplayValue) => prevDisplayValue + value);
  };

  const handleEqualsPress = () => {
    if (displayValue === null || displayValue.length === 0) {
      handleClearPress();
    } else {
      try {
        const result = calculateResult(displayValue);
        setDisplayValue(result.toString());
      } catch (error) {
        setDisplayValue('Error: Invalid expression');
      }
    }
  };

  const handleClearPress = () => {
    setDisplayValue('');
  };

  const calculateResult = (expression: string): number => {
    if (!isValidExpression(expression)) {
      throw new Error('Invalid expression');
    }

    let result = 0;
    const numbers = expression.split(/[-+*/%]/).map(Number);
    const operators = expression.split('').filter((char) => /[-+*/%]/.test(char));

    for (let i = 0; i < operators.length; i++) {
      if (i === 0) {
        result = numbers[i];
      }

      switch (operators[i]) {
        case '+':
          result += numbers[i + 1];
          break;
        case '-':
          result -= numbers[i + 1];
          break;
        case '*':
          result *= numbers[i + 1];
          break;
        case '/':
          result /= numbers[i + 1];
          break;
        case '%':
          result %= numbers[i + 1];
          break;
        default:
          throw new Error('Invalid operator');
      }
    }

    return result;
  };

  const isValidExpression = (expression: string): boolean => {
    const validCharactersRegex = /^[\d\s+\-*/%]+$/;
    return validCharactersRegex.test(expression);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{displayValue || '0'}</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.operationButton} onPress={() => handleButtonPress('*')}>
          <Text style={styles.operationButtonText}>*</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.operationButton} onPress={() => handleButtonPress('-')}>
          <Text style={styles.operationButtonText}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.operationButton} onPress={() => handleButtonPress('+')}>
          <Text style={styles.operationButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('%')}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.equalsButton} onPress={() => handleEqualsPress()}>
          <Text style={styles.equalsButtonText}>=</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={() => handleClearPress()}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>

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
  display: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#DDDDDD',
  },
  operationButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#FF9800',
  },
  equalsButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#2196F3',
  },
  clearButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f44336',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  operationButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  equalsButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  clearButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
