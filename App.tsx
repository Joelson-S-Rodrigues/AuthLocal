import { useEffect, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication'

import { styles } from './style';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  async function verifyAviableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
  
  
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      console.log(types.map(type => LocalAuthentication.AuthenticationType[type]))

  }

  async function handleAuthentication() {
      const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

        if(!isBiometricEnrolled){
          return Alert.alert('Login', 'Nenhuma biometria encontrada. Por favor, Cadastre no dispositivo');
        }

        const auth = LocalAuthentication.authenticateAsync({
          promptMessage: 'Login com Biometria',
          fallbackLabel: 'Biometria não reconhecida'
        });

        setIsAuthenticated((await auth).success);

    }

  useEffect(() => {
    verifyAviableAuthentication();
  },[])


  return (
    <View style={styles.container}>
      <Text>
        Usuário conectado: {isAuthenticated ? "Sim" : "Não"}
        </Text>
    
        <Button
         title="Entrar"
         onPress={handleAuthentication}
          />
    </View>
  );
}
