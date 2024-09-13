import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { styled } from 'nativewind';
import './styles.css';

const StyledView = styled(View)
const StyledText = styled(Text)
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
        <StyledView className="flex-1 items-center justify-center  mt-5 p-6 bg-white">
            <StyledText className="text-slate-800 font-bold">Check The App Here!</StyledText>
            <Text>Here is another part on the same application.</Text>
            <StyledText className= " text-red-500"> Try this.</StyledText>
            {error ? <Text >{error}</Text> : <Text>{message}</Text>}
        </StyledView>
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
