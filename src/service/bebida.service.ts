
export const bebidas = [
    {
      id: "1",
      name: "Café",
      image: "https://www.mercafe.com.br/_next/image?url=https://mercafefaststore.vtexassets.com/assets/vtex.file-manager-graphql/images/631b3d63-2bf7-468b-a420-dda45c73e6eb___9525e2e2e5cb18a14ef14cfe184f073e.png&w=3840&q=75",
    },
    {
      id: "2",
      name: "Chá Verde",
      image: "https://images.tcdn.com.br/img/img_prod/293394/180_cha_verde_200g_heath_labs_1516_1_20240207144730.png",
    },
    {
      id: "3",
      name: "Suco de Laranja",
      image: "https://naturalone.vteximg.com.br/arquivos/ids/157669-300-300/SUCO_DE_LARANJA_INTEGRAL_2L_AMBIENTE_-_NATURAL_ONE-01.jpg?v=638210557462300000",
    },
    {
      id: "4",
      name: "Refrigerante de Cola",
      image: "https://media.gettyimages.com/id/458709281/photo/two-liter-bottle-of-coca-cola.jpg?s=612x612&w=0&k=20&c=uOvqKDJ_lg35QtyTJf9Pc5yVLzOJLC-Qvbt8J3PMudc=",
    },
    {
      id: "5",
      name: "Vinho Tinto",
      image: "https://m.media-amazon.com/images/I/31oXu5VbnTL.jpg",
    },
    {
      id: "6",
      name: "Cerveja",
      image: "https://www.imigrantesbebidas.com.br/img/bebida/images/products/full/222-cerveja-heineken-long-neck-330ml.jpg?p=product_regular&s=bee0afd13dbe1a58ddbf47a8921f47b2",
    },
    {
      id: "7",
      name: "Suco de Maçã",
      image: "https://naturalone.vteximg.com.br/arquivos/ids/158185-292-292/MKP_MACA_RECICLADA_2L.jpg?v=638411878451570000",
    },
    {
      id: "8",
      name: "Suco de uva",
      image: "https://naturalone.vteximg.com.br/arquivos/ids/157700-300-300/SUCO_DE_UVA_AMBIENTE_2L_-_NATURAL_ONE-01.jpg?v=638210639648300000",
    },
    {
      id: "9",
      name: "Água de Coco",
      image: "https://www.imigrantesbebidas.com.br/img/bebida/images/products/full/4770_Agua_de_Coco_Sococo_330_ml.jpg?p=product_regular&s=4655698d4c2fe954dbf9aabbf13dc1d6",
    },
    {
      id: "10",
      name: "Chá Gelado",
      image: "https://cdn.awsli.com.br/400x400/2532/2532767/produto/190713727/gelado-3vermelho-7d3d6880ff.jpg",
    },
    {
      id: "11",
      name: "Chocolate Quente",
      image: "https://www.cafe3coracoes.com.br/wp-content/uploads/2024/03/chocolate-quente-cremoso.png",
    },
    {
      id: "12",
      name: "Whisky",
      image: "https://www.casadabebida.com.br/img/products/whisky-johnnie-walker-red-label_1_88.webp",
    },
    {
      id: "13",
      name: "Gin Tônica",
      image: "https://images.tcdn.com.br/img/img_prod/1189104/gin_tonica_flowers_drinks_toque_de_morango_269ml_caixa_c_10_un_300079_1_f6030b8691394f8f23930129ecd17534.jpg",
    },
    {
      id: "14",
      name: "Batida de Coco",
      image: "https://www.djamboslijterij.nl/cdn/shop/products/batida-de-coco-100cl-jumbo-slijterij-den-haag_800x.jpg?v=1592986873",
    },
    {
      id: "15",
      name: "Limonada",
      image: "https://www.nativealimentos.com.br/upload/products/limonada-02-3008.png",
    },
    {
      id: "16",
      name: "Mojito",
      image: "https://images.tcdn.com.br/img/img_prod/1189104/mojito_flowers_drinks_269ml_caixa_c_10_un_300059_1_48e37e6d51119af04480d3b94617c1ec.jpg",
    },
  ];
export const getBebidas = async (): Promise<bebidas[]> => {
    return bebidas;
}