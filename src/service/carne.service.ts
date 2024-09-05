// src/service/carne.service.ts

export interface Carne {
    id: string;
    name: string;
    image: string;
  }
  
  export const carnes: Carne[] = [
    {
      id: "1",
      name: "Frango",
      image: "https://swiftbr.vteximg.com.br/arquivos/ids/197523-450-450/617344_FRANGO-CAIPIRA-SWIFT-KG_INNATURA_0616_QUADRADO_1000x1000pixels.jpg?v=638467083788370000", // URL da imagem de frango
    },
    {
      id: "2",
      name: "Carne Bovina",
      image: "https://cptstatic.s3.sa-east-1.amazonaws.com/imagens/produtos/230px/45303/butique-de-carnes-como-montar-e-operar.jpg", // URL da imagem de carne bovina
    },
    {
      id: "3",
      name: "Porco",
      image: "https://swiftbr.vteximg.com.br/arquivos/ids/197558-450-450/619972_BIFE-DE-LOMBO-SUINO-SWIFT-MAIS-1KG_INNATURA_0631_QUADRADO_1000x1000pixels.jpg?v=638467251614200000", // URL da imagem de carne de porco
    },
    {
      id: "4",
      name: "Peixe",
      image: "https://static.tuasaude.com/media/article/ja/mn/beneficios-de-comer-peixe_53382_l.jpg", // URL da imagem de peixe
    },
    {
      id: "5",
      name: "Carneiro",
      image: "https://swiftbr.vteximg.com.br/arquivos/ids/198230-450-450/616157_PALETA-DE-CORDEIRO-SWIFT-KG_INNATURA_0961_QUADRADO_1000x1000pixels.jpg?v=638495838269930000", // URL da imagem de carneiro
    },
    // Adicione mais carnes conforme necessário
  ];
// src/service/carne.service.ts

export const getCarnes = async (): Promise<Carne[]> => {
    return carnes;
  };
  