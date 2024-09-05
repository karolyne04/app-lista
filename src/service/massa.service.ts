// src/service/massa.service.ts

export interface Massa {
    id: string;
    name: string;
    image: string;
  }
  
  export const massas: Massa[] = [
    {
      id: "1",
      name: "Spaghetti",
      image: "https://t4.ftcdn.net/jpg/01/12/44/89/360_F_112448921_j0XxpLmhvOFhaOSXm3S9rhxcH4uHae29.jpg", // Substitua pela URL da imagem de Spaghetti
    },
    {
      id: "2",
      name: "Penne",
      image: "https://www.barilla.com//-/media/images/pt_br/products/cards/massa-com-ovos/novo/fb_aw_3d_11154_swwe_penne_500g_blu_v1.png?la=pt-BR", // Substitua pela URL da imagem de Penne
    },
    {
      id: "3",
      name: "Fusilli",
      image: "https://media.istockphoto.com/id/453958889/photo/fusilli.jpg?s=612x612&w=0&k=20&c=SecJP5Kjy38onh7pNRNDnIusWhqy6OUWRRx4lTK9ck8=", // Substitua pela URL da imagem de Fusilli
    },
    {
        id: "4",
        name: "Arroz Branco",
        image: "https://http2.mlstatic.com/D_837534-MLB44856886474_022021-X.jpg", // Substitua pela URL da imagem de Arroz Branco
      },
      {
        id: "5",
        name: "Arroz Integral",
        image: "https://vapza.vtexassets.com/arquivos/ids/156682-800-auto?v=638324757388830000&width=800&height=auto&aspect=true", // Substitua pela URL da imagem de Arroz Integral
      },
      {
        id: "6",
        name: "Massa de bolo",
        image: "",
      },
    
    // Adicione mais massas conforme necessário
  ];
  
  export const getMassas = async (): Promise<Massa[]> => {
    return massas;
  };
  