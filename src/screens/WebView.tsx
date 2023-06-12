import React, { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Webview() {
  const [searchQuery, setSearchQuery] = useState('https://google.com.br');
  const webViewRef = useRef<WebView>();

  const handleSearch = () => {
    if (isURL(searchQuery)) {
      webViewRef.current?.stopLoading();
      setWebViewSource(searchQuery);
    } else {
      const encodedQuery = encodeURIComponent(searchQuery);
      const searchUrl = `https://www.google.com/search?q=${encodedQuery}`;
      webViewRef.current?.stopLoading();
      setWebViewSource(searchUrl);
    }
  };

  const isURL = (text: string) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(text);
  };

  const [webViewSource, setWebViewSource] = useState('https://google.com.br');

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar ou digitar uma URL"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          {<MaterialIcons name="search" size={24} color="black" />}
        </TouchableOpacity>
      </View>
      {searchQuery && <WebView source={{ uri: `${webViewSource}` }} style={styles.webView} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
    borderRadius: 8,
  },
  webView: {
    flex: 1,
  },
});
