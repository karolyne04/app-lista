import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import Nav from "../components/Nav";
import Categoria from "./Categoria";
import { useNavigation } from "@react-navigation/native";

export default function Shooping() {
    const navigation = useNavigation();

	const handleSuggested = () => {
		navigation.navigate("Categoria");
	};

	const handleList = () => {
		navigation.navigate("ShoppingList");
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../assets/undraw.png")}
				style={styles.background}
				imageStyle={styles.imageOpacity} // Aplica opacidade apenas na imagem
			>
				<View style={styles.content}>
					<Text style={styles.textName}>Olá,</Text>
					<Text style={styles.textSub}>Organize suas listas de compras</Text>
					<Button title="Lista sugerida" onPress={handleSuggested} />
					<Button title="Ver Lista de compras" onPress={handleList}/>
					
					
				</View>
			</ImageBackground>
			
			<Nav />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
	},
	background: {
		flex: 1,
		width: "100%",
		justifyContent: "center", // Centraliza o conteúdo verticalmente
		alignItems: "center", // Centraliza o conteúdo horizontalmente
	},
	imageOpacity: {
		opacity: 0.3, // Define a opacidade da imagem de fundo
	},
	content: {
		position: "absolute", // Garante que o conteúdo fique sobre a imagem sem opacidade
		alignItems: "center", // Centraliza o texto e o botão
		gap: 6,
	},
	textName: {
		fontSize: 28,
		color: "#000", // Define a cor do texto para garantir boa visibilidade sobre a imagem
	},
	textSub: {
		fontSize: 20,
		color: "#6E3CBC",
		fontWeight: "800",
		marginVertical: 10, // Adiciona espaçamento entre o texto principal e o subtítulo
	},
});
