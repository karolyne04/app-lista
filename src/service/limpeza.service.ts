// src/service/limpeza.service.ts

export interface Limpeza {
    id: string;
    name: string;
    image: string;
  }
  
  export const limpeza: Limpeza[] = [
    {
      id: "1",
      name: "Detergente Líquido",
      image: "https://ibassets.com.br/ib.item.image.medium/m-d283d91e8c4c402b8ea573ca3d92cbee.jpg", // Substitua pela URL da imagem do Detergente Líquido
    },
    {
      id: "2",
      name: "Sabão em Pó",
      image: "https://www.brilhante.com.br/images/h0nadbhvm6m4/20jpD7nkSRs3lHhaOHkxJv/02b8877850b00c0f67d9a962a39251af/NS5wbmc/1080w-1080h/sab%C3%A3o-em-p%C3%B3-brilhante-cuidado-total.jpg", // Substitua pela URL da imagem do Sabão em Pó
    },
    {
      id: "3",
      name: "Água Sanitária",
      image: "https://images.tcdn.com.br/img/img_prod/1215932/180_agua_sanitaria_clorito_1l_1195_1_1853cbd7ce222c0038c467e602d4c3e4.jpg", // Substitua pela URL da imagem da Água Sanitária
    },
    {
      id: "4",
      name: "Desinfetante",
      image: "https://images.tcdn.com.br/img/img_prod/1028719/180_desinfetante_pinho_bril_500ml_671_1_a19d03a5b94dc7b5a67d722f00322ecd.jpg", // Substitua pela URL da imagem do Desinfetante
    },
    {
      id: "5",
      name: "Limpa Vidros",
      image: "https://images-na.ssl-images-amazon.com/images/I/61SDVidYY8L.jpg", // Substitua pela URL da imagem do Limpa Vidros
    },
    {
      id: "6",
      name: "Limpador Multiuso",
      image: "https://cepel.vteximg.com.br/arquivos/ids/159298-410-410/7087.jpg?v=635785474187800000", // Substitua pela URL da imagem do Limpador Multiuso
    },
    {
      id: "7",
      name: "Esponja de Cozinha",
      image: "https://http2.mlstatic.com/D_858978-MLB46294232264_062021-X.jpg", // Substitua pela URL da imagem da Esponja de Cozinha
    },
    {
      id: "8",
      name: "Desengordurante",
      image: "https://images-na.ssl-images-amazon.com/images/I/412ST6Dk-ZL.jpg", // Substitua pela URL da imagem do Desengordurante
    },
    {
      id: "9",
      name: "Limpador de Banheiro",
      image: "https://a-static.mlcdn.com.br/280x210/limpador-de-banheiro-limpeza-profunda-marine-pato-750ml/casasantaluzia2/25419/8c522a5c61808a81877f4b02720c83e4.jpeg", // Substitua pela URL da imagem do Limpador de Banheiro
    },
    {
      id: "10",
      name: "Pano de Limpeza",
      image: "https://http2.mlstatic.com/D_684661-MLB73046414826_112023-X.jpg", // Substitua pela URL da imagem do Pano de Limpeza
    },
    // Adicione mais produtos de limpeza conforme necessário
  ];
  
  export const getLimpeza = async (): Promise<Limpeza[]> => {
    return limpeza;
  };
  