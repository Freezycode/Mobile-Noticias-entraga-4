import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { editarNoticia } from '../banco/dadosNoticias';
import { RotasParam } from '../rotas/RotasParam';

type Rota = RouteProp<RotasParam, 'AtualizarNoticia'>;

export function AtualizarNoticiaTela() {
  const rota = useRoute<Rota>();
  const navegacao = useNavigation();
  const inicial = useMemo(() => rota.params.noticiaLocal, [rota.params.noticiaLocal]);

  const [titulo, setTitulo] = useState(inicial.titulo);
  const [resumo, setResumo] = useState(inicial.resumo);
  const [conteudo, setConteudo] = useState(inicial.conteudo);
  const [autor, setAutor] = useState(inicial.autor);
  const [data, setData] = useState(inicial.data);
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (!titulo.trim() || !resumo.trim() || !conteudo.trim() || !autor.trim() || !data.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    setSalvando(true);
    try {
      await editarNoticia({
        id: inicial.id,
        titulo: titulo.trim(),
        resumo: resumo.trim(),
        conteudo: conteudo.trim(),
        autor: autor.trim(),
        data: data.trim(),
      });
      navegacao.goBack();
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={estilos.tela}>
      <KeyboardAvoidingView
        style={estilos.tela}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
          <Text style={estilos.titulo}>Atualizar notícia</Text>
          <Text style={estilos.subtitulo}>Edite e salve novamente</Text>

          <View style={estilos.caixa}>
            <Text style={estilos.rotulo}>Título</Text>
            <TextInput
              value={titulo}
              onChangeText={setTitulo}
              style={estilos.entrada}
              placeholder="Título"
              placeholderTextColor="#64748B"
            />
          </View>

          <View style={estilos.caixa}>
            <Text style={estilos.rotulo}>Resumo</Text>
            <TextInput
              value={resumo}
              onChangeText={setResumo}
              style={[estilos.entrada, estilos.entradaMultilinha]}
              placeholder="Resumo"
              placeholderTextColor="#64748B"
              multiline
            />
          </View>

          <View style={estilos.caixa}>
            <Text style={estilos.rotulo}>Conteúdo</Text>
            <TextInput
              value={conteudo}
              onChangeText={setConteudo}
              style={[estilos.entrada, estilos.entradaAlta]}
              placeholder="Conteúdo"
              placeholderTextColor="#64748B"
              multiline
            />
          </View>

          <View style={estilos.duasColunas}>
            <View style={[estilos.caixa, estilos.metade]}>
              <Text style={estilos.rotulo}>Autor</Text>
              <TextInput
                value={autor}
                onChangeText={setAutor}
                style={estilos.entrada}
                placeholder="Autor"
                placeholderTextColor="#64748B"
              />
            </View>

            <View style={[estilos.caixa, estilos.metade]}>
              <Text style={estilos.rotulo}>Data</Text>
              <TextInput
                value={data}
                onChangeText={setData}
                style={estilos.entrada}
                placeholder="dd/mm/aaaa"
                placeholderTextColor="#64748B"
              />
            </View>
          </View>

          <Pressable
            style={[estilos.botao, salvando ? estilos.botaoDesativado : undefined]}
            onPress={salvar}
            disabled={salvando}
          >
            <Text style={estilos.textoBotao}>{salvando ? 'Salvando...' : 'Salvar'}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: 28,
  },
  titulo: {
    color: '#E2E8F0',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#94A3B8',
    marginTop: 4,
    marginBottom: 14,
  },
  caixa: {
    marginTop: 12,
  },
  rotulo: {
    color: '#CBD5E1',
    marginBottom: 6,
    fontWeight: '800',
  },
  entrada: {
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#E2E8F0',
  },
  entradaMultilinha: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  entradaAlta: {
    minHeight: 140,
    textAlignVertical: 'top',
  },
  duasColunas: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  metade: {
    flex: 1,
  },
  botao: {
    marginTop: 18,
    backgroundColor: '#60A5FA',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  botaoDesativado: {
    opacity: 0.7,
  },
  textoBotao: {
    color: '#0B1220',
    fontWeight: '900',
    fontSize: 16,
  },
});

