import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigation';

export const ProductsApp = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
        
    );
};
