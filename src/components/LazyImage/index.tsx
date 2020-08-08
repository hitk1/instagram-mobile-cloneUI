import React, { useState, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';
import { Props } from './interface';

import { Small, Original } from './styles';

const OriginalAnimated = Animated.createAnimatedComponent(Original)

const LazyImage: React.FC<Props> = ({ aspectRatio, smallSource, source }) => {

    const [loaded, setLoaded] = useState(false)
    const opacity = new Animated.Value(0)

    useEffect(() => {
        setTimeout(() => setLoaded(true), 800)
    }, [])

    const handleAnimate = useCallback(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true
        }).start()
    }, [opacity])

    return (
        <Small
            source={{ uri: smallSource }}
            ratio={aspectRatio}
            resizeMode="contain"
            blurRadius={1}
        >
            {loaded &&
                <OriginalAnimated
                    source={{ uri: source }}
                    ratio={aspectRatio}
                    resizeMode="contain"
                    onLoadEnd={handleAnimate}
                    style={{ opacity }}
                />
            }
        </Small>
    );
}

export default LazyImage;