import React, { useState, useEffect, useCallback } from 'react';
import { View, RefreshControl, useColorScheme } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'

import { IFeed } from './interface';
import LazyImage from '../../components/LazyImage'
import themes from '../../themes'

import {
    Container,
    Post,
    Header,
    Avatar,
    Name,
    UserInfoWrapper,
    FollowLink,
    IconsWrapper,
    Description,
    Loading,
    LikeButton,
    CommentButton,
    DirectMessageButton
} from './styles';

const Feed: React.FC = () => {

    const userTheme = useColorScheme() || 'light'

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
        setFeed([...feed, ...data])
        // setFeed(shouldRefresh
        //     ? {
        //         ...data,
        //         isFavorite: false
        //     }
        //     : [...feed, { ...data, isFavorite: false }])
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
        <Container>
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
                            <UserInfoWrapper>
                                <Avatar source={{ uri: item.author.avatar }} />
                                <Name>{item.author.name}</Name>
                            </UserInfoWrapper>
                            <FollowLink>follow</FollowLink>
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
                        <IconsWrapper>
                            <LikeButton>
                                {/* <MaterialIcon
                                    name={!item.isFavorite ? "favorite-border" : "favorite"}
                                    size={26}
                                    color={item.isFavorite ? "red" : themes[userTheme].icons}
                                /> */}
                            </LikeButton>
                            <CommentButton>
                                <IonIcon name="md-chatbox-outline" size={26} color="#FFF" />
                            </CommentButton>
                            <DirectMessageButton>
                                <IonIcon name="md-paper-plane-outline" size={26} color="#FFF" />
                            </DirectMessageButton>
                        </IconsWrapper>
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
        </Container>
    )
}

export default Feed;