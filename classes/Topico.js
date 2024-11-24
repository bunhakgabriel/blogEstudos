class Topico {
    constructor(
        subtitulo = null,
        conteudo = null,
        imagem = null,
        paragrafos = []
    ){
        this.subtitulo = subtitulo;
        this.conteudo = conteudo;
        this.imagem = imagem;
        this.paragrafos = paragrafos;
    }

    toJSON() {
        return {
            subtitulo: this.subtitulo,
            conteudo: this.conteudo,
            imagem: this.imagem ? this.imagem.toJSON() : null, // Caso imagem seja um objeto, chamamos o toJSON nela também
            paragrafos: this.paragrafos
        };
    }
}


export default Topico;