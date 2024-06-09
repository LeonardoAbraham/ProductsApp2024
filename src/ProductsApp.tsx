import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigation';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export const ProductsApp = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? eva.dark : eva.light;

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
                {...eva} theme={ theme }
            >
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </ApplicationProvider>
        </>
        
        
        
    );
};
