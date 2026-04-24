import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { excluirNoticia, listarNoticias } from '../banco/dadosNoticias';
import { NoticiaLocal } from '../modelos/NoticiaLocal';
import { RotasParam } from '../rotas/RotasParam';

type Navegacao = NativeStackNavigationProp<RotasParam>;

export function InicioTela() {
  const navegacao = useNavigation<Navegacao>();
  const [noticiasLocais, setNoticiasLocais] = useState<NoticiaLocal[]>([]);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(() => {
    setCarregando(true);
    listarNoticias()
      .then(setNoticiasLocais)
      .finally(() => setCarregando(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  function pedirExclusao(item: NoticiaLocal) {
    Alert.alert('Excluir', 'Quer remover esta notícia?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await excluirNoticia(item.id);
          carregar();
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={estilos.tela}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>Painel local</Text>
        <Text style={estilos.subtitulo}>Notícias salvas neste aparelho</Text>
      </View>

      <FlatList
        data={noticiasLocais}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={noticiasLocais.length ? estilos.lista : estilos.listaVazia}
        refreshing={carregando}
        onRefresh={carregar}
        renderItem={({ item }) => (
          <View style={estilos.card}>
            <Text style={estilos.cardTitulo} numberOfLines={2}>
              {item.titulo}
            </Text>
            <Text style={estilos.cardResumo} numberOfLines={2}>
              {item.resumo}
            </Text>

            <View style={estilos.linhaInfo}>
              <Text style={estilos.textoInfo}>{item.autor}</Text>
              <Text style={estilos.pontinho}>•</Text>
              <Text style={estilos.textoInfo}>{item.data}</Text>
            </View>

            <View style={estilos.linhaAcoes}>
              <Pressable
                style={[estilos.botao, estilos.botaoVer]}
                onPress={() => navegacao.navigate('VerNoticia', { noticiaLocal: item })}
              >
                <Text style={estilos.textoBotao}>Abrir</Text>
              </Pressable>

              <Pressable
                style={[estilos.botao, estilos.botaoEditar]}
                onPress={() => navegacao.navigate('AtualizarNoticia', { noticiaLocal: item })}
              >
                <Text style={estilos.textoBotao}>Alterar</Text>
              </Pressable>

              <Pressable
                style={[estilos.botao, estilos.botaoApagar]}
                onPress={() => pedirExclusao(item)}
              >
                <Text style={estilos.textoBotao}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={estilos.vazio}>
            <Text style={estilos.vazioTitulo}>Nenhuma notícia</Text>
            <Text style={estilos.vazioTexto}>Crie uma em “Nova notícia”.</Text>
          </View>
        }
      />

      <View style={estilos.rodape}>
        <Pressable
          style={estilos.botaoPrincipal}
          onPress={() => navegacao.navigate('NovaNoticia')}
        >
          <Text style={estilos.textoBotaoPrincipal}>Nova notícia</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  cabecalho: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
  },
  titulo: {
    color: '#E2E8F0',
    fontSize: 26,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#94A3B8',
    marginTop: 2,
  },
  lista: {
    paddingBottom: 92,
  },
  card: {
    backgroundColor: '#111827',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  cardTitulo: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '800',
  },
  cardResumo: {
    color: '#CBD5E1',
    marginTop: 6,
    lineHeight: 20,
  },
  linhaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  textoInfo: {
    color: '#94A3B8',
    fontSize: 12,
  },
  pontinho: {
    color: '#94A3B8',
    fontSize: 12,
  },
  linhaAcoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  botao: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#0B1220',
    fontWeight: '800',
  },
  botaoVer: {
    backgroundColor: '#FCD34D',
  },
  botaoEditar: {
    backgroundColor: '#60A5FA',
  },
  botaoApagar: {
    backgroundColor: '#FB7185',
  },
  vazio: {
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 30,
  },
  vazioTitulo: {
    color: '#E2E8F0',
    fontSize: 18,
    fontWeight: '800',
  },
  vazioTexto: {
    color: '#94A3B8',
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 20,
  },
  listaVazia: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 92,
  },
  rodape: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  botaoPrincipal: {
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  textoBotaoPrincipal: {
    color: '#052E16',
    fontWeight: '900',
    fontSize: 16,
  },
});

