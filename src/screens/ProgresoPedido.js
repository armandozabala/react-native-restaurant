import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import {Container, Content, Text, H1, H3, Button} from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';

const ProgresoPedido = () => {

    const { idpedido } = useContext(PedidoContext);
    const [tiempo, guardarTiempo] = useState(0);
    const [completado, guardarCompletado] = useState(false);


    const navigation = useNavigation();

    useEffect(() => {

         const obtenerProducto = () => {
               firebase.db.collection('ordenes')
                          .doc(idpedido)
                          .onSnapshot(function(doc){
                               guardarTiempo(doc.data().tiempoentrega);
                               guardarCompletado(doc.data().completado);
                          })
         }

         obtenerProducto();
    },[])

    //Muestra Countdown
    const renderer = ({minutes, seconds}) => {

        return(
             <Text style={styles.tiempo}>{minutes}:{seconds}</Text>
        )
    }

    return (
       <Container style={globalStyles.contenedor}>
             <View style={[globalStyles.contenido, {marginTop: 50}]}>
                    {
                        tiempo === 0 && (
                            <>
                               <Text style={{textAlign: 'center'}}>Hemos recibido tu orden</Text>
                               <Text style={{textAlign: 'center'}}>Estamos calculando el tiempo de entrega</Text>
                            </>
                        )
                    }

                    {
                        !completado && tiempo > 0 && (
                             <>
                                <Text style={{textAlign: 'center'}}>Su orden estará lista en:   </Text>
                                <Text>
                                     <Countdown 
                                         date={  Date.now() + tiempo * 60000 }
                                         renderer={ renderer }
                                     />
                                </Text>
                             </>
                        )
                    }

                    {
                        completado && (
                             <>
                               <H1 style={styles.textoCompletado}>Orden Lista</H1>
                               <H3 style={styles.textoCompletado}>Por favor, pase a recoger su pedido</H3>

                               <Button 
                                    rounded
                                    block
                                    style={[globalStyles.boton, {marginTop: 100}]}
                                    onPress={ () => navigation.navigate('NuevaOrden') }
                                    >
                                    <Text>Comenzar nueva orden</Text>
                               </Button>
                             </>
                        )
                    }
             </View>
       </Container>
    )
}

const styles = StyleSheet.create({
    tiempo:{
        marginBottom: 20,
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30
    },
    textoCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }
})

export default ProgresoPedido
