import React, { useContext } from 'react'
import { Button, Text } from 'native-base';
import globalStyle from '../../styles/global';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../../context/pedidos/pedidosContext';

export const BotonResumen = () => {

    const navigation = useNavigation();

    //Leer el objeto de pedido
    const { pedido } = useContext(PedidoContext);

    if(pedido.length === 0) return null;

    return (
        <Button style={globalStyle.boton}
                onPress={ () => navigation.navigate('ResumenPedido')}
        >
            <Text style={globalStyle.botonTexto}>Ir Pedido</Text>
        </Button>
    )
}

