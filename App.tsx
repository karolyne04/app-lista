import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/screens/Login";
import Shooping from "./src/screens/Shooping";
import Categoria from "./src/screens/Categoria";
import { Routes } from "./src/routes";

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<Routes />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
