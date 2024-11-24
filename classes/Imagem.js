class Imagem {
    constructor(
        base64 = null,
        nome = null,
        tamanho = null,
        tipo = null
    ){
        this.base64 = base64;
        this.nome = nome;
        this.tamanho = tamanho;
        this.tipo = tipo;
    }

    toJSON() {
        return {
            base64: this.base64,
            nome: this.nome,
            tamanho: this.tamanho,
            tipo: this.tipo
        };
    }
}


export default Imagem;
