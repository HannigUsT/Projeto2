import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface EditableNote {
  id: string;
  title: string;
  content: string;
  isEditing: boolean;
}

export default function Notes() {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState<EditableNote[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const notesData = await AsyncStorage.getItem('notes');
      if (notesData !== null) {
        setNotes(JSON.parse(notesData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveNotes = async () => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = () => {
    if (title === '') {
      Alert.alert('Erro', 'Título não pode ser em branco.');
      return;
    }

    const existingNote = notes.find((note) => note.title === title);
    if (existingNote) {
      Alert.alert('Erro', 'Nota já existe.');
      return;
    }

    const newNote: EditableNote = {
      id: Date.now().toString(),
      title,
      content: '',
      isEditing: false,
    };
    setNotes([...notes, newNote]);
    saveNotes();
    setTitle('');
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotes();
  };

  const editNote = (id: string) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          isEditing: true,
        };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const updateNoteContent = (id: string, content: string) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          content,
        };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const saveNoteContent = (id: string) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          isEditing: false,
        };
      }
      return note;
    });
    setNotes(updatedNotes);
    saveNotes();
  };

  const renderNote = ({ item }: { item: EditableNote }) => {
    if (item.isEditing) {
      return (
        <View style={styles.noteContainer}>
          <TextInput
            style={styles.noteTitleInput}
            value={item.content}
            onChangeText={(content) => updateNoteContent(item.id, content)}
            multiline
          />
          <View style={styles.noteButtonsContainer}>
            <TouchableOpacity style={styles.noteButton} onPress={() => deleteNote(item.id)}>
              <Text style={styles.noteButtonText}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noteButton} onPress={() => saveNoteContent(item.id)}>
              <Text style={styles.noteButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity style={styles.noteContainer} onPress={() => editNote(item.id)}>
        <Text style={styles.noteTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bloco de Notas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TouchableOpacity style={styles.addButton} onPress={addNote}>
          <Text style={styles.addButtonLabel}>Criar Bloco de Notas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notesContainer}>
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.noteColumnWrapper}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#3f51b5',
    paddingVertical: 10,
    borderRadius: 4,
  },
  addButtonLabel: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notesContainer: {
    width: '80%',
  },
  noteContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#829CBC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flex: 1,
    margin: 4,
  },
  noteTitleInput: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 6,
  },
  noteButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  noteButton: {
    backgroundColor: '#6290C8',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  noteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteColumnWrapper: {
    justifyContent: 'space-between',
  },
});
