import { useCallback, useEffect, useState } from "react";
import { VStack, Icon, useToast, FlatList } from "native-base";
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { api } from "../services/api";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { Loading } from "../components/Loading";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { useFocusEffect } from '@react-navigation/native'

export function Pools() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [polls, setPolls] = useState<PoolCardProps[]>([]);

  const { navigate } = useNavigation();
  const toast = useToast();

  async function fetchPolls() {
    try {
      setIsLoading(true)
      const response = await api.get('/polls');
      setPolls(response.data.polls);

    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar os bolões.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPolls();
  }, []));

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title="Meus bolões" />
      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor='gray.600' pb={4} mb={4}>
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name='search' color='black' size='md' />}
          onPress={() => navigate('find')}
        />
      </VStack>

      {
        isLoading ? <Loading /> : (
          <FlatList
            data={polls}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <PoolCard
              data={item}
              onPress={() => navigate('details', { id: item.id })}
            />}
            px={5}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 10 }}
            ListEmptyComponent={() => <EmptyPoolList />}
          />
        )
      }
    </VStack>
  )
}