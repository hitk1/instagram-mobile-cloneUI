import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { IFeed } from './interface';
import Post from '../../components/Post'

import { Container, Loading } from './styles';

const Feed: React.FC = () => {

    const [feed, setFeed] = useState<IFeed[]>([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const loadPage = useCallback(async (pageNumber: number = page, shouldRefresh?: boolean) => {

        if (total && pageNumber > total) return 

        setLoading(true)
        const response = await fetch(`http://192.168.0.106:3333/feed?_expand=author&_limit=5&_page=${pageNumber}`)

        let data = await response.json() as any[]
        const amountItems = Number(response.headers.get('X-Total-Count'))

        setTotal(Math.floor(amountItems / 5))
        setFeed(shouldRefresh ? data : [...feed, ...data])
        setPage(pageNumber + 1)
        setLoading(false)
        
    }, [page, total, loading, feed])

    const refreshList = useCallback(async () => {
        setRefreshing(true)
        await loadPage(1, true)
        setRefreshing(false)
    }, [refreshing])

    useEffect(() => { loadPage() }, [])

    return (
        <Container>
            <FlatList
                data={feed}
                keyExtractor={(post: IFeed) => String(post.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.6}
                // onRefresh={() => refreshList()}
                // refreshing={refreshing}
                ListFooterComponent={<Loading />}
                renderItem={({ item }) => ( <Post item={item} /> )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshList} />
                }
            >
            </FlatList>
        </Container>
    )
}

export default Feed;