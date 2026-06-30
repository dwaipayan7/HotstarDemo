import { COLORS } from '@/constants/colors'
import { selectInWatchlist, toggleWatchList } from '@/redux/slices/watchlistSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store/store'
import { ContentItem } from '@/services/mockData'
import SCText from '@/utils/CustomText'
import { FontAwesome } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const RenderContent = ({ item, onPress }: { item: ContentItem, onPress: (id: string) => void }) => {
    const dispatch = useAppDispatch();
    const isSaved = useAppSelector(selectInWatchlist(item.id));

    const handleToggle = () => {
        dispatch(toggleWatchList(item));
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onPress(item.id)}
        >
            <Image
                source={{ uri: item.thumbnailUrl }}
                style={styles.thumbnail}
                contentFit='cover'
            />

            {item.isPremium && (
                <View style={styles.premiumBadge}>
                    <SCText color={COLORS.golden}>Premium</SCText>
                </View>
            )}

            <TouchableOpacity
                style={styles.starButton}
                onPress={handleToggle}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
                <FontAwesome
                    name={isSaved ? "star" : "star-o"}
                    size={16}
                    color={COLORS.golden}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default RenderContent

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 5,
        borderRadius: 8,
        overflow: 'hidden',
    },
    thumbnail: {
        width: 120,
        height: 200,
        borderRadius: 8,
    },
    premiumBadge: {
        position: 'absolute',
        top: 8,
        left: 2,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 6,
        borderRadius: 24,
    },
    starButton: {
        position: 'absolute',
        top: 8,
        right: 2,
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 16,
    },
})