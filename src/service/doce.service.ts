// src/service/doce.service.ts

export interface Doce {
    id: string;
    name: string;
    image: string;
  }
  
  export const doces: Doce[] = [
    {
      id: "1",
      name: "Brigadeiro",
      image: "https://xamegobom.com.br/wp-content/uploads/2016/12/brigadeiro-pote-2-kg.png", // Substitua pela URL da imagem do Brigadeiro
    },
    {
      id: "2",
      name: "Beijinho",
      image: "https://acdn.mitiendanube.com/stores/001/143/617/products/09daf1e441c8dadd2529e5dad282f3e5-5c9f9c279a11d3a69d16988466949044-240-0.png", // Substitua pela URL da imagem do Beijinho
    },
    {
      id: "4",
      name: "Paçoca",
      image: "https://m.media-amazon.com/images/I/81rtNNapP5L.jpg", // Substitua pela URL da imagem da Paçoca
    },
    {
        id: "10",
        name: "Chocolate ao Leite",
        image: "https://cdn.awsli.com.br/300x300/1957/1957771/produto/1047753238bb67c04f8.jpg", // Substitua pela URL da imagem do Chocolate ao Leite
      },
      {
        id: "11",
        name: "Biscoito Recheado",
        image: "https://richester.b-cdn.net/wp-content/uploads/2021/01/Recheado-Amori-Chocolate-125g-1.png", // Substitua pela URL da imagem do Biscoito Recheado
      },
      {
        id: "12",
        name: "Bala de Goma",
        image: "https://armazemsaovito.fbitsstatic.net/img/p/bala-smoofree-vegan-tijolinho-cereja-e-nata-citrico-fini-80g-162225/360298.jpg?w=256&h=256&v=no-change&qs=ignore", // Substitua pela URL da imagem da Bala de Goma
      },
      {
        id: "13",
        name: "Bombom",
        image: "https://images-na.ssl-images-amazon.com/images/I/61DLWxRwsTL.jpg", // Substitua pela URL da imagem do Bombom
      },
      {
        id: "14",
        name: "Barra de Cereal",
        image: "https://www.drogariaminasbrasil.com.br/media/product/62b/barra-de-cereal-muito-mais-banana-22g-nutry-66d.jpg", // Substitua pela URL da imagem da Barra de Cereal
      },
      {
        id: "17",
        name: "Pipoca Doce",
        image: "https://images.tcdn.com.br/img/img_prod/1187091/180_marsh_fini_250g_pipoca_doce_8045_1_fd474ef5e40ee4cd8df013037906c6bc.jpeg", // Substitua pela URL da imagem da Pipoca Doce
      },
      {
        id: "18",
        name: "Gelatina",
        image: "https://lineatatix.vteximg.com.br/arquivos/ids/158998-220-220/Linea-Gelatina-De-Limao-10G--100465036-_1.jpg?v=638506174773100000", // Substitua pela URL da imagem da Gelatina
      },
    // Adicione mais doces conforme necessário
  ];
  
  export const getDoces = async (): Promise<Doce[]> => {
    return doces;
  };
  