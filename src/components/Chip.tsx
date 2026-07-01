import { COLORS } from '@/constants/colors';
import useTheme from '@/hooks/useTheme';
import SCText from '@/utils/CustomText';
import { globalStyles } from '@/utils/globalStyles';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';


interface ChipInterface {
    label: string;
    selected?: () => any;
    onPress: () => any;
    onClose: () => any
}

const Chip = ({
    label,
    onClose,
    onPress,
    selected
}: ChipInterface) => {

    const { isDark, theme, toggle } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.chip, selected && styles.chipSelected]}
        >
            <SCText color={selected ? COLORS.white : COLORS.textBlack}>
                {label}
            </SCText>

            {onClose && (
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Feather name="x" size={14} color={selected ? COLORS.white : COLORS.gray400} />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
}

export default Chip

const styles = StyleSheet.create({
    chip: {
        ...globalStyles.row,
        // alignItems: 'center',
        backgroundColor: COLORS.chipBackgroundColor,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.chipBorderColor,
    },
    chipSelected: {
        backgroundColor: COLORS.lightBlue,
        borderColor: COLORS.divider2,
    },

    labelSelected: {
        color: COLORS.white,
        fontWeight: '600',
    },
    closeButton: {
        marginLeft: 6,
    },
})