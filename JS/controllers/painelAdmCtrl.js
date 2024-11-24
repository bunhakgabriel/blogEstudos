import Artigo from "../../classes/Artigo.js"
import Imagem from "../../classes/Imagem.js";
import Topico from "../../classes/Topico.js";
import { converterImagemBase64 } from "../../utils/converterImgBase64.js";
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

angular.module('myApp').factory('servicePainel', ['$http', function ($http) {
    return {
        salvarArtigo: async (data) => {
            try {
                const docRef = doc(db, 'identificador', 'uc0E1y6Rtxce46SrQrNk');
                const docSnap = await getDoc(docRef);
                const identificadorAtual = docSnap.data().id;
                await updateDoc(docRef, { id: identificadorAtual + 1 });
                
                data.id = identificadorAtual;
                const colecaoRef = doc(db, data.categoria, data.id.toString());
                await setDoc(colecaoRef, data);
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
}]).controller('painelAdmCtrl', function ($scope, $uibModal, servicePainel) {
    $scope.vm = new Artigo();

    $scope.save = async () => {
        const data = $scope.vm;

        const dataConverted = data instanceof Artigo ? data.toJSON() : data;
        if (dataConverted.imagem instanceof Imagem) {
            dataConverted.imagem = dataConverted.imagem.toJSON();
        }
        if (dataConverted.topicos && Array.isArray(dataConverted.topicos)) {
            dataConverted.topicos = dataConverted.topicos.map(topico => {
                if (topico instanceof Topico) {
                    return topico.toJSON();
                }
                return topico;
            });
        }

        await servicePainel.salvarArtigo(dataConverted)
            .then((result) => {
                if(result){
                    alert('Artigo salvo com sucesso!');
                    $scope.vm = new Artigo();
                    $scope.$apply();
                } else {
                    alert('Falha ao salvar artigo.');
                }
            })
    }

    $scope.previa = function () {
        $uibModal.open({
            templateUrl: '.././views/modais/previa.html',
            controller: 'painelAdmModalCtrl',
            size: 'lg',
            windowClass: 'modal-centered',
            resolve: {
                modal: function () {
                    return {
                        vm: $scope.vm
                    };
                }
            }
        });
    };

    $scope.addItem = (item, index) => {
        if (item === 'topico') {
            $scope.vm.topicos.push(new Topico());
        }
        else if (item === 'paragrafo') {
            $scope.vm.topicos[index].paragrafos.push({ texto: "" });
        }
    }

    $scope.removeItem = (item, index) => {
        if (item === 'paragrafo') {
            $scope.vm.topicos[index].paragrafos.pop();
        }
    }

    $scope.capturarImagem = async function (input, action, index) {
        let file = input.files[0];
        let base64 = await converterImagemBase64(file)
        let imagem = new Imagem(base64, file.name, file.size, file.type)

        if (action === 'artigo') {
            $scope.vm.imagem = imagem;
        } else {
            let index = $scope.vm.topicos.length
            $scope.vm.topicos[index - 1].imagem = imagem;
        }
    }

    $scope.removerImagem = (action, event, index) => {
        let inputElement = event.target.closest('div').querySelector('input[type="file"]');
        angular.element(inputElement).val(null);

        if (action === 'artigo') {
            $scope.vm.imagem = undefined;
        } else {
            $scope.vm.topicos[index].imagem = undefined
        }
    }

}).controller('painelAdmModalCtrl', function ($scope, $uibModalInstance, modal) {
    $scope.vm = modal.vm;

    $scope.close = () => {
        $uibModalInstance.close();
    }
});

