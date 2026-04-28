import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
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
import { adicionarNoticia } from '../services/api';

function dataDeHoje() {
  const agora = new Date();
  const dia = String(agora.getDate()).padStart(2, '0');
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const ano = String(agora.getFullYear());
  return `${dia}/${mes}/${ano}`;
}

export function NovaNoticiaTela() {
  const navegacao = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(dataDeHoje());
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (!titulo.trim() || !descricao.trim() || !data.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    setSalvando(true);
    try {
      await adicionarNoticia({
        titulo: titulo.trim(),
        descricao: descricao.trim(),
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
          <Text style={estilos.titulo}>Nova notícia</Text>
          <Text style={estilos.subtitulo}>Preencha e salve no aparelho</Text>

          <View style={estilos.caixa}>
            <Text style={estilos.rotulo}>Título</Text>
            <TextInput
              value={titulo}
              onChangeText={setTitulo}
              style={estilos.entrada}
              placeholder="Ex: Feira de ciências"
              placeholderTextColor="#64748B"
            />
          </View>

          <View style={estilos.caixa}>
            <Text style={estilos.rotulo}>Descrição</Text>
            <TextInput
              value={descricao}
              onChangeText={setDescricao}
              style={[estilos.entrada, estilos.entradaAlta]}
              placeholder="Escreva a descrição"
              placeholderTextColor="#64748B"
              multiline
            />
          </View>

          <View style={estilos.duasColunas}>
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
            <Text style={estilos.textoBotao}>{salvando ? 'Salvando...' : 'Adicionar'}</Text>
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
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  botaoDesativado: {
    opacity: 0.7,
  },
  textoBotao: {
    color: '#052E16',
    fontWeight: '900',
    fontSize: 16,
  },
});

