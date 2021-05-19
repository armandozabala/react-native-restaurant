import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import NuevaOrden from './src/screens/NuevaOrden'
import Menu from './src/screens/Menu'
import DetallePlatillo from './src/screens/DetallePlatillo'
import FormularioPlatillo from './src/screens/FormularioPlatillo'
import ResumenPedido from './src/screens/ResumenPedido'
import ProgresoPedido from './src/screens/ProgresoPedido'


//import state de context
import FirebaseState from './src/context/firebase/firebaseState';
//import state de context
import PedidoState from './src/context/pedidos/pedidosState';

import { BotonResumen } from './src/components/ui/BotonResumen'

const App = () =>  {


  return (
    <>
    <FirebaseState> 
      <PedidoState> 
    <NavigationContainer> 
      <Stack.Navigator
          screenOptions={{
             headerStyle:{
                backgroundColor: '#FFDA00'
             },
             headerTitleStyle: {
                 fontWeight: 'bold'
             },
             headerTintColor: '#000'
          }}
      >
        <Stack.Screen name="NuevaOrden" component={NuevaOrden} options={{ title: 'Nueva Orden'}}/>
        <Stack.Screen name="Menu" 
                      component={Menu} 
                      options={{ 
                            title: 'Menu', 
                            headerRight: props => <BotonResumen/>
                      }}
                      />
        <Stack.Screen name="DetallePlatillo" component={DetallePlatillo} options={{ title: 'Detalle Platillo'}}/>
        <Stack.Screen name="FormularioPlatillo" component={FormularioPlatillo} options={{ title: 'Ordenar Platillo'}}/>
        <Stack.Screen name="ResumenPedido" component={ResumenPedido} options={{ title: 'Resumen de Pedido'}}/>
        <Stack.Screen name="ProgresoPedido" component={ProgresoPedido} options={{ title: 'Progreso de Pedido'}}/>
       
    </Stack.Navigator>
    </NavigationContainer>
    </PedidoState>
    </FirebaseState>
    </>
  );

};


export default App;
