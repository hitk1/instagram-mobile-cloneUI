import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    background-color: ${(props: any) => props.theme.screenBackground};
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 'small',
    color: `${(props: any) => props.theme.textColor}`,
})`
    margin: 30px 0;
`;