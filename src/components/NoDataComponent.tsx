import useTheme from '@/hooks/useTheme'
import SCText from '@/utils/CustomText'
import { Image, StyleSheet, View } from 'react-native'


interface Prop {
    label?: string,
    size?: number
}

const NoDataComponent = ({ label, size }: Prop) => {

    const { theme } = useTheme()

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            gap: 5
        }}>
            {/* <Text>NoDataComponent</Text> */}
            <Image

                source={require('../../assets/images/no_data_img.png')}
                style={{
                    height: size ? size : 100,
                    width: size ? size : 100,
                }}
                resizeMode='cover'
            />
            <SCText color={theme.textPrimary}>{`${label ? label : "No Data Available"} `}</SCText>
        </View>
    )
}

export default NoDataComponent

const styles = StyleSheet.create({})