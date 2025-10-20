import { StyleSheet, Text, View } from "react-native";
import Navigation from "./navigation/Navigation";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"
import {store,persistor} from "./store/index"
import { setBooting } from "./store/profileSlice";


function Bootstrapper() {
  // PersistGate tamamlandığında booting=false yap
  const dispatch = useDispatch();
  useEffect(() => {
    // PersistGate'in onBeforeLift'ini kullanacağız; burada yedek plan:
    dispatch(setBooting(false));
  }, [dispatch]);
  return <Navigation />;
}


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          // rehydrate bittiğinde çağrılır; booting'i burada da kapatabiliriz
          store.dispatch(setBooting(false));
        }}
      >
        <Bootstrapper />
      </PersistGate>
    </Provider>
  );
}
const styles = StyleSheet.create({});
