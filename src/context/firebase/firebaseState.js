import React, { useReducer } from 'react';

import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import firebase from '../../firebase'

import { OBTENER_PRODUCTOS_EXITO } from '../../types'; 

import _ from 'lodash';

const FirebaseState = ( props ) => {
    
     //state inicial
     const initialState = {
           menu:[]
     }

     //useReducer con dispatch para ejecutar funciones
     const [state, dispatch] = useReducer(FirebaseReducer, initialState);


     const obtenerProductos = () => {


             //consultar firebase
             firebase.db.collection('productos')
                        .where('existencia','==',true)
                        .onSnapshot(manejarSnapshot);

            function manejarSnapshot(snapshot) {
                   let platillos = snapshot.docs.map(doc => {
                          return {
                                 id: doc.id,
                                 ...doc.data()
                          }
                   });

                   //Ordenear por categoria
                   platillos = _.sortBy(platillos, 'categoria');

                   dispatch({
                        type: OBTENER_PRODUCTOS_EXITO,
                        payload: platillos
                  });
            }
     }



     return(
          <FirebaseContext.Provider
             value={{ 
                   menu: state.menu,
                   firebase,
                   obtenerProductos
            }}
          >
                { props.children }
          </FirebaseContext.Provider>
     )

}

export default FirebaseState;