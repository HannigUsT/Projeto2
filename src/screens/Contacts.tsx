import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Contacts() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState<number>(0);
  const [contacts, setContacts] = useState<{ name: string; phone: number }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingPhone, setEditingPhone] = useState<number>(0);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const contactsData = await AsyncStorage.getItem('contacts');
      if (contactsData !== null) {
        setContacts(JSON.parse(contactsData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveContacts = async () => {
    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.log(error);
    }
  };

  const checkDuplicatePhone = (phone: number): boolean => {
    return contacts.some((contact) => contact.phone === phone);
  };

  const addContact = () => {
    if (checkDuplicatePhone(phone)) {
      Alert.alert('Erro', 'Número já está em uso.');
      return;
    }
    if (editingIndex !== null) {
      if (
        editingName === '' ||
        editingPhone === 0 ||
        editingName.length === 0 ||
        editingPhone.toString().length === 0
      ) {
        Alert.alert('Erro', 'Por favor, preencha o nome e o número de telefone.');
        return;
      }
      if (checkDuplicatePhone(editingPhone)) {
        Alert.alert('Erro', 'Número já está em uso.');
        return;
      }
      const updatedContacts = [...contacts];
      const updatedContact = {
        name: editingName,
        phone: editingPhone,
      };
      updatedContacts[editingIndex] = updatedContact;
      setContacts(updatedContacts);
      setEditingIndex(null);
    } else {
      if (name === '' || phone === 0 || name.length === 0 || phone.toString().length === 0) {
        Alert.alert('Erro', 'Por favor, preencha o nome e o número de telefone.');
        return;
      }
      const newContact = { name, phone };
      setContacts([...contacts, newContact]);
    }
    saveContacts();
    setName('');
    setPhone(0);
    setEditingName('');
    setEditingPhone(0);
  };

  const deleteContact = (index: number) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
    saveContacts();

    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingName('');
      setEditingPhone(0);
    }
  };

  const renderContact = ({
    item,
    index,
  }: {
    item: { name: string; phone: number };
    index: number;
  }) => {
    return (
      <View style={styles.contactContainer}>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text>{item.phone}</Text>
        </View>
        <View style={styles.contactButtonsContainer}>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => {
              setEditingIndex(index);
              setEditingName(item.name);
              setEditingPhone(item.phone);
            }}
          >
            <Text style={styles.contactButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={() => deleteContact(index)}>
            <Text style={styles.contactButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contatos</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={editingIndex !== null ? editingName : name}
          onChangeText={(text) => (editingIndex !== null ? setEditingName(text) : setName(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de telefone"
          value={
            editingIndex !== null
              ? editingPhone !== 0
                ? editingPhone.toString()
                : ''
              : phone !== 0
              ? phone.toString()
              : ''
          }
          onChangeText={(text) =>
            editingIndex !== null ? setEditingPhone(Number(text)) : setPhone(Number(text))
          }
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <Text style={styles.addButtonLabel}>
            {editingIndex !== null ? 'Salvar alterações' : 'Adicionar contato'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.contactsList}
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(_, index) => index.toString()}
      />
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
  inputContainer: {
    width: '80%',
    marginBottom: 20,
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
  contactsList: {
    width: '80%',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactButtonsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  contactButton: {
    marginLeft: 10,
  },
  contactButtonText: {
    color: '#3f51b5',
    fontWeight: 'bold',
  },
});
