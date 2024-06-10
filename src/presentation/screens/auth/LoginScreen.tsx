import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components/ui/MyIcon';

export const LoginScreen = () => {

    const { height } = useWindowDimensions();
    
    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>
                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category='h1'>Ingresar</Text>
                    <Text category='p2'>Por favor, ingresar para continuar</Text>
                </Layout>

                {/* Inputs */}
                <Layout style={{ marginTop: 20 }}>
                    <Input 
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        accessoryLeft={ <MyIcon name='email-outline' /> }
                        style={{ marginBottom: 10 }}
                    />
                    
                    <Input 
                        placeholder='Contraseña'
                        autoCapitalize='none'
                        secureTextEntry
                        accessoryLeft={ <MyIcon name='lock-outline' /> }
                        style={{ marginBottom: 10 }}
                    /> 
                </Layout>

                {/* Space */}
                <Layout style={{ height: 10 }} />

                {/* Button */}
                <Layout>
                    <Button
                        accessoryRight={<MyIcon name='arrow-forward-outline' white />}
                        onPress={() => {}}
                        //appearance='ghost'
                    >
                        Ingresar
                    </Button>
                </Layout>

                {/* Información para crear cuenta */}
                <Layout style={{ height: 50 }} />

                <Layout
                    style={{
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <Text>¿No tienes cuenta?</Text>
                    <Text
                        status='primary'
                        category='s1'
                        onPress={() => {}}
                    >
                        {' '}Crea una{' '}
                    </Text>
                </Layout>


            </ScrollView>
        </Layout>
    );
};
