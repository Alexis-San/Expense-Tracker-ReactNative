import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-gesture-handler';
import useCachedResources from "./hooks/useCachedResources";
import AppNavigation from "./navigation/AppNavigation";
import { AppProvider } from "./context/AppContext";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppProvider>
          <AppNavigation />
          <StatusBar style="dark" backgroundColor="white" />
        </AppProvider>
      </SafeAreaProvider>
    );
  }
}