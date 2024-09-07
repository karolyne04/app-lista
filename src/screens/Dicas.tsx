import { ScrollView, View } from "react-native";
import CardDica from "../components/CardDica";

export default function Dicas()  {
    return (
        <View>
            <ScrollView style={{ padding: 20 }}>
            <CardDica 
                title="Dica 1: Faça uma lista"
                description="Antes de ir às compras, faça uma lista dos itens que você precisa para evitar compras desnecessárias."
            />
            <CardDica 
                title="Dica 2: Compre a granel"
                description="Sempre que possível, compre a granel para economizar e evitar desperdícios."
            />
            <CardDica 
                title="Dica 3: Verifique promoções"
                description="Verifique as promoções da semana para aproveitar descontos e ofertas."
            />
            <CardDica
                title="Dica 4: Evitar fazer lista com fome"
                description="Evite ao máximo criar listas quando estiver com fome ou ansiedade.
                As chances de incluir itens desnecessários se multiplicam!"
            />
            <CardDica
                title="Dica 5: Não acumule produtos"
                description="Calcule corretamente as quantidades, para evitar acúmulo e desperdício.
                Para isso, acrescente os itens conforme o tempo desejado de duração e a validade."
            />
            <CardDica
                title="Dica 6: Faça cotações"
                description="Use a tecnologia a seu favor: pesquise preços na internet e faça uma estimativa de gastos"
            />
            <CardDica
                title="Dica 7: Determine um valor"
                description="Coloque um valor limite em cada lista de compras e use planilhas para controlar os gastos ao longo do mês."
            />
            <CardDica
                title="Dica 8: Use a calculadora"
                description="Nas compras presenciais, use a calculadora de seu celular para saber se a sua lista de compras de fato não irá ultrapassar o orçamento."
            />
        </ScrollView>
        </View>
    )

}