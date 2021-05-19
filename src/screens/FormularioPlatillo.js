import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Container, Content, Form, Icon, Input, Grid, Col, Button, Text, FooterTab, Footer } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const FormularioPlatillo = () => {

    const [ cantidad, guardarCantidad ] = useState(1);
    const [total, guardarTotal] = useState(0);

    const { platillo, guardarPedido } = useContext(PedidoContext);
    const { precio } = platillo;

    const navigation = useNavigation();

    //En caga calcular cantidad pagar
    useEffect(() => {
        calcularTotal();
    },[cantidad])


    //Calcular el total por platillo
    const calcularTotal = () => {
         const totalPagar = precio * cantidad;
         guardarTotal(totalPagar);
    }

    //Confirmar Orden
    const confirmarOrden = () => {

        Alert.alert(
            'Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podrá modificar',
            [
                    {
                        text:'Confirmar',
                        onPress: () => {
                            //Almacenar pedido principal
                            const pedido = {
                                ...platillo,
                                cantidad,
                                total
                            }

                            guardarPedido(pedido);
                            //Navegar hacia el resumen
                            navigation.navigate('ResumenPedido');

                        },
                    },
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    }
                
            ]
        )

    }


    const  decrementarUno = () => {
        if(cantidad > 1){
            const nuevaCantidad = parseInt(cantidad) - 1;
            guardarCantidad(nuevaCantidad);
        }
       
    }

    const incrementarUno = () => {
        const nuevaCantidad = parseInt(cantidad) + 1;
        guardarCantidad(nuevaCantidad);
    }   

    return (
        <Container>
                <Content>
                      <Form>
                            <Text style={globalStyles.titulo}>Cantidad</Text>
                            <Grid>
                                  <Col>
                                            <Button
                                                props
                                                dark
                                                style={{ width: '100%', height: 80, justifyContent: 'center'}}
                                                onPress={ () => decrementarUno() }
                                            >
                                        <Icon style={{ fontSize: 40 }} name="remove" />
                                    </Button>
                                  </Col>
                                  <Col>
                                       <Input
                                           style={{ textAlign: 'center', fontSize: 20 }}
                                           value={cantidad.toString()}
                                           keyboardType='numeric'
                                           onChangeText={ (cantidad) => guardarCantidad(cantidad) }
                                       />
                                  </Col>
                                  <Col>
                                             <Button
                                                props
                                                dark
                                                style={{ width: '100%', height: 80, justifyContent: 'center'}}
                                                onPress={ () => incrementarUno() }
                                            >
                                        <Icon style={{ fontSize: 40 }} name="add" /> 
                                     </Button>
                                  </Col>
                            </Grid>

                            <Text style={globalStyles.cantidad}>Subtotal: $ { total }</Text>
                      </Form>
                </Content>
                <Footer>
                    <FooterTab>
                          <Button
                             style={globalStyles.boton}
                             onPress={ () => confirmarOrden() }   
                            >
                              <Text style={ globalStyles.botonTexto }>Agregar al Pedido</Text>
                         </Button>
                    </FooterTab>
                </Footer>
        </Container>
    )
}

export default FormularioPlatillo
