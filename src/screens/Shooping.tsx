import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Nav from "../components/Nav";
import Categoria from "./Categoria";

export default function Shooping() {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../assets/undraw.png")}
				style={styles.background}
			>
				<View>
					<Text style={styles.textName}>olá</Text>
					<Text style={styles.textSub}>Organize suas listas de compras</Text>
				</View>

				<Button title="lista sugerida" />
			</ImageBackground>
			<Categoria />
			<Nav />
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
	},
	container: {
		flex: 1,
		padding: 12,
	},
	textName: {
		fontSize: 32,
	},
	textSub: {
		fontSize: 20,
		color: "#6E3CBC",
		fontWeight: "800",
	},
});
