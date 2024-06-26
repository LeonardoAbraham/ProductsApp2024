import { Button, ButtonGroup, Input, Layout, Text, useTheme } from "@ui-kitten/components";
import { MainLayout } from "../../layouts/MainLayout";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigation";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getProductById, updateCreateProduct } from "../../../actions/products";

import { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Product } from '../../../domain/entities/product';
import { MyIcon } from "../../components/ui/MyIcon";
import { Formik } from "formik";
import { ProductImages } from "../../components/products/ProductImages";
import { genders, sizes } from "../../../config/constants/constants";
import { CameraAdapter } from "../../../config/adapters/camera-adapter";


interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ route }: Props) => {

    const productIdRef = useRef(route.params.productId);
    const theme = useTheme();
    const queryClient = useQueryClient();

    const { data: product } = useQuery({
        queryKey:['product', productIdRef.current],
        queryFn: () => getProductById(productIdRef.current),
    })

    const mutation = useMutation({
        mutationFn: (data: Product) => updateCreateProduct({...data, id: productIdRef.current}),
        onSuccess(data: Product) {
            productIdRef.current = data.id; //creación

            queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
            queryClient.invalidateQueries({ queryKey: ['product', data.id ] });
        }
    })

    if(!product){
        return (<MainLayout title="Cargando..." />)
    }

    return (
        <Formik
            initialValues={product}
            onSubmit={ (values) => mutation.mutate(values) }
        >
            {
                ({handleChange, handleSubmit, values, errors, setFieldValue}) =>(
                    <MainLayout
                        title={values.title}
                        subTitle={`Precio: ${values.price}`}
                        rightAction={async() => {
                            const photos = await CameraAdapter.getPicturesFromLibrary();
                            //const photos = await CameraAdapter.takePicture();
                            setFieldValue('images', [...values.images, ...photos])
                        }}
                        rightActionIcon="camera-outline"
                    >
                        <Text>ProductScreen</Text>

                        <ScrollView style={{ flex:1 }}>
                            {/* Imágenes de el producto */}
                            <Layout style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <ProductImages images={values.images} />
                            </Layout>

                            {/* Formulario */}
                            <Layout style={{ marginHorizontal: 10 }}>
                                <Input 
                                    label="Título"
                                    style={{ marginVertical: 5 }}
                                    value={values.title}
                                    onChangeText={handleChange('title')}
                                />
                                <Input 
                                    label="Slug"
                                    style={{ marginVertical: 5 }}
                                    value={values.slug}
                                    onChangeText={handleChange('slug')}
                                />
                                <Input 
                                    label="Descripción"
                                    multiline
                                    numberOfLines={5}
                                    style={{ marginVertical: 5 }}
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                />
                            </Layout>
                            
                            {/* Precio e inventario */}
                            <Layout style={{ marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
                                <Input 
                                    label="Precio"
                                    value={ values.price.toString() }
                                    onChangeText={handleChange('price')}
                                    style={{flex: 1}}
                                    keyboardType="numeric"
                                />
                                <Input 
                                    label="Inventario"
                                    value={ values.stock.toString() }
                                    onChangeText={handleChange('stock')}
                                    style={{flex: 1}}
                                    keyboardType="numeric"
                                />
                            </Layout>
                            
                            {/* Selectores */}
                            <ButtonGroup 
                                style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
                                size="small"
                                appearance="outline"
                            >
                                {
                                    sizes.map((size) =>(
                                        <Button
                                            onPress={() => setFieldValue(
                                                'sizes',
                                                values.sizes.includes(size)
                                                    ? values.sizes.filter(s => s !== size)
                                                    : [...values.sizes, size]
                                            )}
                                            key={size}
                                            style={{ 
                                                flex:1,
                                                backgroundColor: values.sizes.includes(size) ? theme['color-primary-200'] : undefined
                                            }}
                                        >
                                            {size}
                                        </Button>
                                    ))
                                }
                            </ButtonGroup>

                            <ButtonGroup 
                                style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
                                size="small"
                                appearance="outline"
                            >
                                {
                                    genders.map((gender) =>(
                                        <Button
                                            onPress={() => setFieldValue('gender', gender)}
                                            key={gender}
                                            style={{ 
                                                flex:1,
                                                backgroundColor: values.gender.startsWith(gender) ? theme['color-primary-200'] : undefined
                                            }}
                                        >
                                            {gender}
                                        </Button>
                                    ))
                                }
                            </ButtonGroup>

                            {/* Botón de guardar */}
                            <Button
                                accessoryLeft={ <MyIcon name="save-outline" white /> }
                                onPress={() => handleSubmit()}
                                disabled={mutation.isPending}
                                style={{ margin: 15 }}
                            >
                                Guardar
                            </Button>

                            <Layout style={{height: 200}} />
                        </ScrollView>
                    </MainLayout>
                )
            }
            
        </Formik>
    );
};
