
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getProductsByPage } from "../../../actions/products/get-products-by-page";
import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { ProductList } from "../../components/products/ProductList";

export const HomeScreen = () => {

    //const { isLoading, data: products = [] } = useQuery({
    //    queryKey:['products', 'infinite'],
    //    staleTime: 1000 * 60 * 60, //1 hour
    //    queryFn: () => getProductsByPage(0),
    //});

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey:['products', 'infinite'],
        staleTime: 1000 * 60 * 60, //1 hour
        initialPageParam: 0,
        
        queryFn: async (params) => {
            console.log({params})
            return await getProductsByPage(params.pageParam);
        },
        getNextPageParam:(lastPage, allPages) => allPages.length,
    });

    return (
        <MainLayout
            title="TesloShop - Products"
            subTitle="Aplicación administrativa"
            rightAction={() => {}}
            rightActionIcon="plus-outline"
        >
            {
                isLoading 
                    ? (<FullScreenLoader />) 
                    : (
                        <ProductList 
                            products={data?.pages.flat() ?? []} 
                            fetchNextPage={fetchNextPage}    
                        />
                    )
            }
        </MainLayout>
    );
};
