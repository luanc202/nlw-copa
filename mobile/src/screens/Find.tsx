import { VStack, Heading, Text, useToast } from "native-base";

import { api } from "../services/api";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [code, setCode] = useState('');

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        toast.show({
          title: 'Informe o código do bolão',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      await api.post('/polls/join', { code });
      navigate('polls');

      toast.show({
        title: 'Entrada no bolão feita com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message === 'Poll not found.') {
        return toast.show({
          title: 'Bolão não encontrado.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      if (error.response?.data?.message === 'You already joined this poll.') {
        toast.show({
          title: 'Você já está nesse bolão.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      toast.show({
        title: 'Não foi possível encontrar o bolão.',
        placement: 'top',
        bgColor: 'red.500',
      });

      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Buscar por código' showBackButton />

      <VStack mt={8} mx={5} alignItems='center'>

        <Heading fontFamily='heading' color='white' fontSize='xl' mb={8} textAlign='center'>
          Encontre um bolão através de {'\n'}
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />

        <Button
          title='BUSCAR BOLÃO'
          isLoading={isLoading}
          onPress={handleJoinPool}
        />

      </VStack>

    </VStack>
  )
}