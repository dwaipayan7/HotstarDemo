import RootStackNavigator from '@/navigation/RootStackNavigator';
import { persistor, store } from '@/redux/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { registerRootComponent } from 'expo';
import { StatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
      gcTime: 0,
    },
  },
});

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <StoreProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <PersistGate
              loading={<View style={{ flex: 1, backgroundColor: '#0D0D0D' }} />}
              persistor={persistor}
            >
              <NavigationContainer>
                <StatusBar barStyle="default" />
                <RootStackNavigator />
              </NavigationContainer>
            </PersistGate>
          </QueryClientProvider>
        </StoreProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

registerRootComponent(App);
export default App;
