class Artigo {
    constructor(
        id = null,
        titulo = null,
        conteudo = null,
        autor = 'Gabriel de Camargo Bunhak',
        dataPublicacao = new Date(),
        imagem = null,
        categoria = null,
        topicos = []
    ){
        this.id = id;
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.autor = autor;
        this.dataPublicacao = dataPublicacao;
        this.imagem = imagem;
        this.categoria = categoria;
        this.topicos = topicos;
    }

    // Método toJSON para converter a instância em um objeto literal
    toJSON() {
        return {
            id: this.id,
            titulo: this.titulo,
            conteudo: this.conteudo,
            autor: this.autor,
            dataPublicacao: this.dataPublicacao,
            imagem: this.imagem,
            categoria: this.categoria,
            topicos: this.topicos
        };
    }
}


export default Artigo;