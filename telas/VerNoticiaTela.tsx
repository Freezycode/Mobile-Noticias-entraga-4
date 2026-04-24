import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RotasParam } from '../rotas/RotasParam';

type Rota = RouteProp<RotasParam, 'VerNoticia'>;

export function VerNoticiaTela() {
  const rota = useRoute<Rota>();
  const { noticiaLocal } = rota.params;

  return (
    <SafeAreaView style={estilos.tela}>
      <ScrollView contentContainerStyle={estilos.conteudo}>
        <Text style={estilos.titulo}>{noticiaLocal.titulo}</Text>

        <View style={estilos.faixa}>
          <Text style={estilos.info}>{noticiaLocal.autor}</Text>
          <Text style={estilos.separador}>•</Text>
          <Text style={estilos.info}>{noticiaLocal.data}</Text>
        </View>

        <View style={estilos.bloco}>
          <Text style={estilos.rotulo}>Resumo</Text>
          <Text style={estilos.texto}>{noticiaLocal.resumo}</Text>
        </View>

        <View style={estilos.bloco}>
          <Text style={estilos.rotulo}>Conteúdo</Text>
          <Text style={estilos.texto}>{noticiaLocal.conteudo}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  conteudo: {
    padding: 16,
    paddingBottom: 26,
  },
  titulo: {
    color: '#E2E8F0',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
  },
  faixa: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  info: {
    color: '#94A3B8',
    fontSize: 12,
  },
  separador: {
    color: '#94A3B8',
    fontSize: 12,
  },
  bloco: {
    backgroundColor: '#111827',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
    padding: 14,
    marginTop: 14,
  },
  rotulo: {
    color: '#CBD5E1',
    fontWeight: '900',
    marginBottom: 8,
  },
  texto: {
    color: '#E2E8F0',
    lineHeight: 22,
  },
});

