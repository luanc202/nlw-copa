import { NativeBaseProvider, Center, Text } from "native-base";
import { THEME } from "../styles/theme";

export function Sigin() {
    return (
        <NativeBaseProvider theme={THEME}>
            <Center flex={1} bgColor='gray.900'>
                <Text color="white" fontSize={24} fontFamily='heading'>
                    Hello React Native!
                </Text>
            </Center>
        </NativeBaseProvider>
    )
}