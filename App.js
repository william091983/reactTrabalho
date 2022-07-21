import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MainScreen from './MainScreen'

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <MainScreen />
      </SafeAreaView>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

