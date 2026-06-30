import { COLORS } from '@/constants/colors'

import SCText from '@/utils/CustomText'
import { Ionicons } from '@expo/vector-icons'
import { memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const ContentCardDetails = memo(({ item }: { item: any }) => {
    return (
        <View style={styles.itemContainer}>

            <View>
                <SCText style={{
                    fontSize: 18,
                    marginBottom: 6,
                    fontWeight: 'bold'
                }} color={COLORS.white}>{item?.data?.title}</SCText>
            </View>
            <View style={styles.metaInfo}>
                <SCText size={13} color={COLORS.green} style={styles.matchText}>
                    {98}% Match
                </SCText>
                <SCText size={13} color={COLORS.gray}>
                    {item?.data?.releaseYear}
                </SCText>
                <View style={styles.dot} />
                <SCText size={13} color={COLORS.gray}>
                    {item?.data?.duration ?? `${item?.data?.totalSeasons} Seasons`}
                </SCText>
                <View style={styles.ratingPill}>
                    <SCText size={11} color={COLORS.white}>
                        {item?.data?.rating}
                    </SCText>
                </View>
            </View>

            <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={20} color={COLORS.textBlack} />
                <SCText size={16} color={COLORS.textBlack} style={styles.playText}>
                    Play
                </SCText>
            </TouchableOpacity>

            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionItem}>
                    <Ionicons name="add" size={22} color={COLORS.white} />
                    <SCText size={11} color={COLORS.gray100}>Watchlist</SCText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                    <Ionicons name="download-outline" size={20} color={COLORS.white} />
                    <SCText size={11} color={COLORS.gray100}>Download</SCText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                    <Ionicons name="share-social-outline" size={20} color={COLORS.white} />
                    <SCText size={11} color={COLORS.gray100}>Share</SCText>
                </TouchableOpacity>
            </View>

            <SCText size={15} color={COLORS.gray100} style={styles.description}>
                {item?.data?.description}
            </SCText>

            {/* {!! item.data.cast?.length && (
                                <SCText size={13} color={COLORS.gray} style={styles.castLine} numberOfLines={2}>
                                    Cast: { item.data.cast.join(', ')}
                                </SCText>
                            )} */}

            <View style={styles.tagsContainer}>
                {item?.data?.genres?.map((genre: any) => (
                    <View key={genre.id} style={styles.tag}>
                        <SCText size={12} color={COLORS.white}>{genre.name}</SCText>
                    </View>
                ))}
            </View>
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
    tag: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },


    matchText: { fontWeight: '700' },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 2,
        backgroundColor: COLORS.gray,
    },

    ratingPill: {
        borderWidth: 1,
        borderColor: COLORS.gray,
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 3,
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 6,
        paddingVertical: 12,
        marginBottom: 16,
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