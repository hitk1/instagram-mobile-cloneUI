import React, { useState, useEffect, useCallback } from 'react';
import { View, RefreshControl } from 'react-native';

import { IFeed } from './interface';
import LazyImage from '../../components/LazyImage'
import { FlatList } from 'react-native-gesture-handler';

import { Post, Header, Avatar, Name, PostImage, Description, Loading } from './styles';

const Feed: React.FC = () => {

    const [feed, setFeed] = useState<IFeed[]>([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const loadPage = useCallback(async (pageNumber: number = page, shouldRefresh?: boolean) => {

        if (total && pageNumber > total) return

        setLoading(true)
        const response = await fetch(`http://localhost:3333/feed?_expand=author&_limit=5&_page=${pageNumber}`)

        const data = await response.json()
        const amountItems = Number(response.headers.get('X-Total-Count'))

        setTotal(Math.floor(amountItems / 5))
        setFeed(shouldRefresh ? data : [...feed, ...data])
        setPage(pageNumber + 1)

        setLoading(false)
    }, [page, total, loading, feed])

    const refreshList = useCallback(async () => {
        setRefreshing(true)
        console.log('call the refresh function')

        await loadPage(1, true)

        setRefreshing(false)
    }, [refreshing])

    useEffect(() => { loadPage() }, [])

    return (
        <View>
            <FlatList
                data={feed}
                keyExtractor={(post: IFeed) => String(post.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.6}
                // onRefresh={() => refreshList()}
                // refreshing={refreshing}
                ListFooterComponent={<Loading />}
                renderItem={({ item }) => (
                    <Post>
                        <Header>
                            <Avatar source={{ uri: item.author.avatar }} />
                            <Name>{item.author.name}</Name>
                        </Header>

                        <LazyImage
                            source={item.image}
                            smallSource={item.small}
                            aspectRatio={item.aspectRatio}
                            /*
                                AspectRatio é calculado com base na largura e altura da imagem original
                                é uma maneira de definir a altura da imagem automaticamente
                                
                                AspectRatio = width / height
                            */
                        />
                        <Description>
                            <Name>{item.description}</Name> {item.description}
                        </Description>
                    </Post>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshList} />
                }
            >
            </FlatList>
        </View>
    )
}

export default Feed;