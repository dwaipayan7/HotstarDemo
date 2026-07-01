import { isSmallDeviceWidth } from '@/utils/AllContext';
import { Text, TextProps, TextStyle } from 'react-native';

interface ITextProps extends TextProps {
    varient?: 'regular' | 'medium' | 'semibold' | 'bold';
    size?: number;
    color?: string;
}

export const font = (size: number) => {
    if (isSmallDeviceWidth) return size - 1;
    return size;
};


const WEIGHT_MAPPING: Record<string, TextStyle['fontWeight']> = {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '900',
};

const SCText = ({
    varient = 'regular',
    color,
    size = 14,
    style,
    children,
    ...props
}: ITextProps) => {

    return (
        <Text
            allowFontScaling={false}
            {...props}
            style={[
                {
                    fontSize: font(size),
                    fontWeight: WEIGHT_MAPPING[varient],
                    ...(color && { color }),
                },
                style,
            ]}
        >
            {children}
        </Text>
    );
};

export default SCText;