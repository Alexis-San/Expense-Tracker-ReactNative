import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";

import { AppProvider } from "./context/AppContext";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppProvider>
          <Navigation />
          <StatusBar style="dark" backgroundColor="white" />
        </AppProvider>
      </SafeAreaProvider>
    );
  }
}
