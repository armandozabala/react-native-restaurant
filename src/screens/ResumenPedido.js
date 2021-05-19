import React, {  useContext, useEffect } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { Container, Content, List, Thumbnail, Form, Icon, Input, Grid, Col, Button, Text, Body, FooterTab, Footer, H1, Left, ListItem } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';
import firebase from '../firebase';
import PedidoContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {

    const navigation = useNavigation();

    //context de pedido
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext);


    useEffect(() => {
        calcularTotal();
    },[pedido])

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal =  pedido.reduce( (nuevoTotal, articulo) =>  nuevoTotal + articulo.total, 0)

        mostrarResumen(nuevoTotal)
    }

    //redirecciona a progreso de epedido
    const progresoPedido = () => {

        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {

                        const pedidoObj = {
                             tiempoentrega: 0,
                             completado: false,
                             total: Number(total),
                             orden: pedido,
                             creado: Date.now()
                        }

                        try{
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoRealizado(pedido.id);
                            //redireccionar a progreso
                            navigation.navigate('ProgresoPedido')
                        }catch(error){
                            console.log(error)
                        }

                      

                        
                    }
                },
                {
                    text: 'Revisar',
                    style: 'cancel'
                }
            ]
        )
    
    }

    const confirmarEliminacion = (id) => {

        Alert.alert(
            'Desea eliminar este producto',
            'Una vez que eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                         //Eliminar del state
                         eliminarProducto(id)
                    }
                },
                {
                    text: 'Revisar',
                    style: 'cancel'
                }
            ]
        )
       
    }

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
              <H1 style={globalStyles.titulo}>Resumen</H1>
              {
                  pedido.map( (platillo, i) => {
                      const { cantidad, nombre, imagen, id, precio } = platillo;
                      return(
                          <List key={id + i}> 
                           <ListItem thumbnail>
                                <Left>
                                    <Thumbnail source={{ uri: imagen }} large square/>
                                </Left>
                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: $ {precio}</Text>

                                    <Button
                                         full
                                         danger
                                         style={{marginTop: 20}}
                                         onPress={ () => confirmarEliminacion(id) }
                                    >
                                         <Text>Eliminar</Text>
                                    </Button>
                                </Body>
                           </ListItem>
                        </List>
                      )
                  })
              }
              <Text style={globalStyles.cantidad}>Total a Pagar: $ {total}</Text>

              <Button
                onPress={ () => navigation.navigate('Menu') }
                style={{ marginTop: 30}}
                dark
                full
              >
                  <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Seguir Pidiendo</Text>
              </Button>
            </Content>
            <Footer>
                 <FooterTab>
                        <Button
                            onPress={ () => progresoPedido() }
                            style={[globalStyles.boton, { marginTop: 30}]}
                            full
                        >
                        <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                    </Button>
                 </FooterTab>
            </Footer>
        </Container>
    )
}

export default ResumenPedido
