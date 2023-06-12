import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Centro Universitário Unieuro</Text>
      <Text style={styles.title}>Programação Mobile</Text>
      <Text style={styles.title}>Projeto Final</Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}>Professor:</Text>
      <Text style={styles.title}>Me. Aldo Henrique Dias Mendes</Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}>Alunos:</Text>
      <Text style={styles.title}>Gustavo Lopes dos Santos - 53158</Text>
      <Text style={styles.title}>Lucas Vinicíus Braga de Amorim - 54771</Text>
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});
