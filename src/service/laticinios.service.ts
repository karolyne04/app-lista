// src/service/laticinio.service.ts

export interface Laticinio {
    id: string;
    name: string;
    image: string;
  }
  
  export const laticinios: Laticinio[] = [
    {
      id: "1",
      name: "Leite Integral",
      image: "https://images-na.ssl-images-amazon.com/images/I/51b+EcjSdCL.jpg", // Substitua pela URL da imagem do Leite Integral
    },
    {
      id: "2",
      name: "Iogurte Natural",
      image: "https://www.thebakers.com.br/wp-content/uploads/2019/05/iogurte-nestle-natural-integral.png", // Substitua pela URL da imagem do Iogurte Natural
    },
    {
      id: "3",
      name: "Queijo Mussarela",
      image: "https://i0.wp.com/www.yema.com.br/wp-content/uploads/2024/06/3011-Mussarela-Barra-Aprox.-37kg-Yema.jpg?fit=600,600&ssl=1", // Substitua pela URL da imagem do Queijo Mussarela
    },
    {
      id: "4",
      name: "Manteiga",
      image: "https://images.tcdn.com.br/img/img_prod/1049139/manteiga_extra_sem_sal_aprox_3_7kg_yema_1057_1_912621f8d0b57ffa06cc816f539b7a79.jpg", // Substitua pela URL da imagem da Manteiga
    },
    {
      id: "5",
      name: "Requeijão",
      image: "https://nuviofoods.vteximg.com.br/arquivos/ids/157336-0-0/vitalatte_matinal_requeijao_light.png?v=638590684077300000", // Substitua pela URL da imagem do Requeijão
    },
    {
      id: "6",
      name: "Creme de Leite",
      image: "https://www.nestle.com.br/sites/g/files/pydnoa436/files/styles/product_showcase_image/public/creme-leite-original.png.webp?itok=j4qjN8ah", // Substitua pela URL da imagem do Creme de Leite
    },
    {
      id: "7",
      name: "Queijo Cottage",
      image: "https://tirolez.com.br/wp-content/uploads/tirolezapi/PT-3-10-44Queijo%20Cottage%20400g.png", // Substitua pela URL da imagem do Queijo Cottage
    },
    {
      id: "8",
      name: "Queijo Parmesão",
      image: "https://www.frimesa.com.br/upload/image/subproduct/queijos-nobres-parmesao-5kg-12meses1-322-40.png", // Substitua pela URL da imagem do Queijo Parmesão
    },
    {
      id: "9",
      name: "Iogurte Grego",
      image: "https://d3gdr9n5lqb5z7.cloudfront.net/fotos/955341_mini.jpg", // Substitua pela URL da imagem do Iogurte Grego
    },
    {
      id: "10",
      name: "Leite Condensado",
      image: "https://images.tcdn.com.br/img/img_prod/673450/180_leite_condensado_itambe_tp_395_ml_3767_1_316e65c5533da46340fe2c757ff1e42f.jpg", // Substitua pela URL da imagem do Leite Condensado
    },
    // Adicione mais laticínios conforme necessário
  ];
  
  export const getLaticinios = async (): Promise<Laticinio[]> => {
    return laticinios;
  };
  