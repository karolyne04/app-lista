import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { format } from "date-fns";


export default function Date() {
    const [currentDate, setCurrentDate] = useState("");

	useEffect(() => {
		const today = new Date();
		const formattedDate = format(today, "dd/MM/yyyy");
		setCurrentDate(formattedDate);
	}, []);

    return (
        <View>
            <Text>
            {currentDate}
            </Text>
        </View>
    )
}