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

import converterDataFirebase from "../../utils/converterDataFirebase.js";

angular.module('myApp').factory('serviceArtigo', [function () {
    return {
        buscarArtigoId: async (id, colecao) => {
            try {
                const docRef = doc(db, colecao, id);
                const docSnap = await getDoc(docRef);
                return docSnap.data();
            } catch (error) {
                console.error("Erro ao buscar o documento:", error);
            }
        }
    }
}]).controller('artigoCtrl', function ($scope, serviceArtigo) {
    $scope.vm = null;

    const init = async () => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const id = params.get("id");
        const colecao = params.get("categoria");

        await serviceArtigo.buscarArtigoId(id, colecao)
            .then(response => {
                $scope.vm = response;
            })
            .catch(e => {
                console.log('ERROR: ', e);
            })

        $scope.vm.dataPublicacao = converterDataFirebase($scope.vm.dataPublicacao);
        $scope.$apply();
    }

    init();
})