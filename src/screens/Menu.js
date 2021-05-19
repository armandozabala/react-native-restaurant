import React, { useContext, useEffect, Fragment } from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body
} from 'native-base';

import globalStyles from '../styles/global';

import FirebaseContext from '../context/firebase/firebaseContext'
import PedidosContext from '../context/pedidos/pedidosContext'

const Menu = () => {

    //Context
    const  { menu, obtenerProductos } = useContext(FirebaseContext);

    const  { seleccionarPlatillo } = useContext(PedidosContext);

    //Hook Redireccionar
    const navigation = useNavigation();

    useEffect(() => {
        obtenerProductos();   
    },[])

    const mostrarHeading = (categoria, i) => {

        if( i > 0){
            const categoriaAnterior = menu[i-1].categoria;

            if(categoriaAnterior !== categoria){
              return(
                  <Separator style={styles.separador}>
                        <Text style={styles.separadorTexto}>{categoria}</Text>
                  </Separator>
              )
            }
        }else{
            return(
                <Separator style={styles.separador}>
                      <Text style={styles.separadorTexto}>{categoria}</Text>
                </Separator>
            )
        }

       
    }

    return (
         <Container style={globalStyles.container}>
             <Content style={{ backgroundColor: '#FFF' }}>
                    <List>
                         {
                             menu.map( (platillo, i) => {

                                   const { imagen, nombre, descripcion, categoria, id, precio  } = platillo;
                                    return(
                                         <Fragment key={id}>
                                             { mostrarHeading(categoria, i)}
                                             <ListItem
                                                onPress={ () => {
                                                    //eliminar propiedades del platllo
                                                    const { existencia, ...platillo2 } = platillo;
                                            
                                                    seleccionarPlatillo(platillo2);

                                                    navigation.navigate('DetallePlatillo');
                                                }}
                                             >
                                                 <Thumbnail large square source={{uri: imagen}} />
                                                <Body>
                                                    <Text>{nombre}</Text>
                                                    <Text
                                                        note
                                                        numberOfLines={2}
                                                     >{descripcion}</Text>
                                                     <Text>
                                                          Precio $ { precio }
                                                     </Text>
                                                </Body>
                                                  
                                             </ListItem>
                                         </Fragment>
                                    )
                             })
                         }
                    </List>
             </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
     separador:{
            backgroundColor: '#000',
     },
     separadorTexto:{
            color: '#FFDD00',
            fontWeight: 'bold',
            textTransform: 'uppercase'
     }
})

export default Menu
