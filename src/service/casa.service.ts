// src/service/casa.service.ts

export interface Casa {
    id: string;
    name: string;
    image: string;
  }
  
  export const casa: Casa[] = [
    {
      id: "1",
      name: "Cesto de Roupas",
      image: "https://tokstok.vtexassets.com/arquivos/ids/20831903-400-auto/cesto-para-roupa-cinza-slag_st0.jpg?v=638073175671170000&width=400&height=auto&aspect=true", // Substitua pela URL da imagem do Cesto de Roupas
    },
    {
      id: "2",
      name: "Organizador de Armário",
      image: "https://product-hub-prd.madeiramadeira.com.br/536017881/images/923c70c6-3a53-42c6-873f-6a663ed1359e24a80f4dddbea5f89c4876b5eb.jpg", // Substitua pela URL da imagem do Organizador de Armário
    },
    
    {
      id: "4",
      name: "Luminária",
      image: "https://m.media-amazon.com/images/I/21b0ZC7ETzL._AC._SR180,230.jpg", // Substitua pela URL da imagem da Luminária
    },
   
    {
      id: "6",
      name: "Capa de Sofá",
      image: "https://images.tcdn.com.br/img/img_prod/707938/capa_para_sofa_retratil_impermeavel_acquablock_2175_1_e8ba2b4164ddab4374e0c0938108868e.jpeg", // Substitua pela URL da imagem da Capa de Sofá
    },
    
    {
      id: "8",
      name: "Cortina",
      image: "https://images.tcdn.com.br/img/img_prod/669579/180_cortina_duplex_bella_janela_bellini_4_20m_x_2_50m_com_forro_e_ilhos_varao_ate_3_metros_9599_2_15b0e6efa88f86828cbe9b6bbd808ff8.jpg", // Substitua pela URL da imagem da Cortina
    },
    {
      id: "9",
      name: "Tapete",
      image: "https://images.tcdn.com.br/img/img_prod/811530/180_tapete_de_banheiro_microsoft_2_pecas_1065_1_c258863eb5aab24b40032fce7d71f1b7.png", // Substitua pela URL da imagem do Tapete
    },
    {
      id: "10",
      name: "Vaso de Flores",
      image: "https://tokstok.vtexassets.com/arquivos/ids/25434457-400-auto/vaso-37-cm-galaxy-blue-prata-dracco_st0.jpg?v=638119918462330000&width=400&height=auto&aspect=true", // Substitua pela URL da imagem do Vaso de Flores
    },
    {
        id: "11",
        name: "Pano de prato",
        image: "https://http2.mlstatic.com/D_NQ_NP_690673-MLB47766734783_102021-W.webp"
    }
    // Adicione mais produtos para casa conforme necessário
  ];
  
  export const getCasa = async (): Promise<Casa[]> => {
    return casa;
  };
  