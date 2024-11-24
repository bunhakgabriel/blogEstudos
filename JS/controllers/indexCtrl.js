import { db } from "../firebaseConfig.js";
import {
    getFirestore,
    getDocs,
    collection,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import imagensCapa from "../../utils/objetoImagensCapa.js";
import converterDataFirebase from "../../utils/converterDataFirebase.js";

angular.module('myApp').factory('serviceIndex', ['$http', function ($http) {
    return {
        buscarArtigos: async (colecao) => {
            try {
                const collectionRef = collection(db, colecao);
                const querySnapshot = await getDocs(collectionRef);

                const documents = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    data.dataPublicacao = converterDataFirebase(data.dataPublicacao);

                    return {
                        ...data
                    };
                });

                return documents;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
}])
    .controller('indexCtrl', function ($scope, serviceIndex) {
        $scope.artigos = [];
        $scope.capa = '';

        $scope.buscarArtigos = async (colecao) => {
            await serviceIndex.buscarArtigos(colecao).then(response => {
                $scope.artigos = response;
                $scope.capa = imagensCapa[colecao];
                console.log(response)
                $scope.$apply();
            }).catch(e => {
                alert('Erro ao obter artigos de: ', colecao);
                console.log('ERROR: ', e);
            })
        }

    });