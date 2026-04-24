import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { InicioTela } from './telas/InicioTela';
import { NovaNoticiaTela } from './telas/NovaNoticiaTela';
import { VerNoticiaTela } from './telas/VerNoticiaTela';
import { AtualizarNoticiaTela } from './telas/AtualizarNoticiaTela';
import { RotasParam } from './rotas/RotasParam';

const Pilha = createNativeStackNavigator<RotasParam>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Pilha.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#E2E8F0',
          headerTitleStyle: { fontWeight: '800' },
          contentStyle: { backgroundColor: '#0F172A' },
        }}
      >
        <Pilha.Screen name="Inicio" component={InicioTela} options={{ title: 'Início' }} />
        <Pilha.Screen
          name="NovaNoticia"
          component={NovaNoticiaTela}
          options={{ title: 'Nova notícia' }}
        />
        <Pilha.Screen name="VerNoticia" component={VerNoticiaTela} options={{ title: 'Notícia' }} />
        <Pilha.Screen
          name="AtualizarNoticia"
          component={AtualizarNoticiaTela}
          options={{ title: 'Atualizar' }}
        />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}
