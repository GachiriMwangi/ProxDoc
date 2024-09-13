import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
      axios.get('http://192.168.100.29:8000/api/test')
      .then(response => {
       // console.log('Success:', response.data);
        setMessage(response.data.message);
        setError('');
      })
      .catch(error => {
        console.log('Error details:', error);
        if (error.response) {        
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        setError(`Failed to fetch data: ${error.message}`);
      });
    }, []);

    return (
        <View style={styles.container}>
            <Text>Check The App Here!</Text>
            {error ? <Text style={styles.error}>{error}</Text> : <Text>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
    },
});

export default App;
