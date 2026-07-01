import { COLORS } from '@/constants/colors'
import { selectInWatchlist, toggleWatchList } from '@/redux/slices/watchlistSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store/store'

import useTheme from '@/hooks/useTheme'
import SCText from '@/utils/CustomText'
import { globalStyles } from '@/utils/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import { memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import ContentCardDetailsSkeleton from './ContentCardDetailsSkeleton'

interface Props {
    item: any;
    loading?: boolean;
    isPlaying?: boolean;
    onPlayPause?: () => void;
    onDownload?: () => void;
    onShare?: () => void;
}

const ContentCardDetails = memo(({ item,
    loading,
    isPlaying = false,
    onPlayPause,
    onDownload,
    onShare, }: Props) => {

    const dispatch = useAppDispatch();
    const isSaved = useAppSelector(selectInWatchlist(item.id));

    const handleToggle = () => {
        dispatch(toggleWatchList(item?.data?.id));
    };

    const { theme, isDark, toggle } = useTheme();

    return (
        <View style={[styles.itemContainer, { backgroundColor: theme.surface }]}>


            {loading ? (
                <ContentCardDetailsSkeleton />
            ) : (
                <>
                    <View>
                        <SCText style={{
                            fontSize: 18,
                            marginBottom: 6,
                            fontWeight: 'bold'
                        }} color={theme.textPrimary}>{item?.data?.title}</SCText>
                    </View>
                    <View style={styles.metaInfo}>
                        <SCText size={13} color={COLORS.green} style={styles.matchText}>
                            {98}% Match
                        </SCText>
                        <SCText size={13} color={theme.textSecondary}>
                            {item?.data?.releaseYear}
                        </SCText>
                        <View style={[styles.dot, { backgroundColor: theme.textSecondary }]} />
                        <SCText size={13} color={theme.textSecondary}>
                            {item?.data?.duration ?? `${item?.data?.totalSeasons} Seasons`}
                        </SCText>
                        <View style={[styles.ratingPill, { borderColor: theme.textSecondary }]}>
                            <SCText size={11} color={theme.textPrimary}>
                                {item?.data?.rating}
                            </SCText>
                        </View>
                    </View>

                    <TouchableOpacity style={{
                        ...globalStyles.row,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.textPrimary,
                        borderRadius: 6,
                        paddingVertical: 12,
                        marginBottom: 16,
                    }}
                        onPress={onPlayPause}
                    >
                        <Ionicons name={isPlaying ? "pause" : "play"} size={20} color={isDark ? COLORS.textBlack : COLORS.white} />
                        <SCText size={16} color={isDark ? COLORS.textBlack : COLORS.white} style={styles.playText}>
                            {isPlaying ? "Pause" : "Play"}
                        </SCText>
                    </TouchableOpacity>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.actionItem} onPress={handleToggle}>
                            <Ionicons name={isSaved ? "checkmark-circle" : "add-circle-outline"} size={22} color={theme.textSecondary} />
                            <SCText size={11} color={theme.textSecondary}>{isSaved ? "Watchlisted" : "Watchlist"}</SCText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionItem} onPress={onDownload}>
                            <Ionicons name="download-outline" size={20} color={theme.textSecondary} />
                            <SCText size={11} color={theme.textSecondary}>Download</SCText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionItem} onPress={onShare}>
                            <Ionicons name="share-social-outline" size={20} color={theme.textSecondary} />
                            <SCText size={11} color={theme.textSecondary}>Share</SCText>
                        </TouchableOpacity>
                    </View>

                    <SCText size={15} color={theme.textSecondary} style={styles.description}>
                        {item?.data?.description}
                    </SCText>

                    {/* {!! item.data.cast?.length && (
                                <SCText size={13} color={COLORS.gray} style={styles.castLine} numberOfLines={2}>
                                    Cast: { item.data.cast.join(', ')}
                                </SCText>
                            )} */}

                    <View style={styles.tagsContainer}>
                        {item?.data?.genres?.map((genre: any) => (
                            <View key={genre.id} style={{
                                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : theme.card,
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 16,
                                marginRight: 8,
                                marginBottom: 8,
                                borderWidth: 1,
                                borderColor: theme.border,
                            }}>
                                <SCText size={12} color={theme.textSecondary}>{genre.name}</SCText>
                            </View>
                        ))}
                    </View>
                </>
            )}

        </View>
    );
});


export default ContentCardDetails

const styles = StyleSheet.create({

    itemContainer: {
        padding: 20,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    title: {
        marginBottom: 8,
        fontWeight: 'bold'
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 10
    },
    matchContainer: {
        marginLeft: 12,
    },
    description: {
        lineHeight: 24,
        marginBottom: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },



    matchText: { fontWeight: '700' },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 2,
    },

    ratingPill: {
        borderWidth: 1,
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 3,
    },

    playText: { fontWeight: '700', marginLeft: 6 },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 18,
    },
    actionItem: { alignItems: 'center', gap: 4 },

    castLine: { marginBottom: 16 },
})