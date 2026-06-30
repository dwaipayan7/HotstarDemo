import ContentCardDetails from '@/components/ContentCardDetails';
import DetailsSheet from '@/components/DetailsSheet';
import GradientWrapper from '@/components/GradientWrapper';
import Header from '@/components/Header';
import RenderContent from '@/components/RenderContent';
import { RowSkeleton } from '@/components/RowSkeleton';
import { COLORS } from '@/constants/colors';
import { RootStackParamList } from '@/navigation/MainTabNavigator';
import { useContentDetails } from '@/services/contentService';
import { useHomeData } from '@/services/homeService';
import { deviceWidth } from '@/utils/AllContext';
import SCText from '@/utils/CustomText';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Skeleton } from '@rneui/base';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video, { VideoRef } from 'react-native-video';


export const videoSource = 'https://www.w3schools.com/html/mov_bbb.mp4';


const HomeDetailsScreen = () => {

    const ContentDetailsSkeleton = () => {
        return (
            <View>

                <Skeleton
                    animation="wave"
                    width={deviceWidth}
                    height={deviceWidth * (9 / 16)}
                />

                <View style={{ padding: 16 }}>

                    <Skeleton
                        animation="wave"
                        width="65%"
                        height={30}
                        style={{ marginBottom: 16 }}
                    />


                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 20,
                        }}
                    >
                        <Skeleton width={70} height={16} animation="wave" />
                        <View style={{ width: 10 }} />
                        <Skeleton width={55} height={16} animation="wave" />
                        <View style={{ width: 10 }} />
                        <Skeleton width={60} height={16} animation="wave" />
                    </View>


                    <Skeleton
                        animation="wave"
                        width="100%"
                        height={48}
                        style={{ borderRadius: 8, marginBottom: 20 }}
                    />


                    <Skeleton
                        animation="wave"
                        width="100%"
                        height={14}
                        style={{ marginBottom: 8 }}
                    />
                    <Skeleton
                        animation="wave"
                        width="95%"
                        height={14}
                        style={{ marginBottom: 8 }}
                    />
                    <Skeleton
                        animation="wave"
                        width="80%"
                        height={14}
                        style={{ marginBottom: 20 }}
                    />

                </View>
            </View>
        );
    };

    const { data, isFetching, refetch } = useHomeData();

    console.log("The Data are: ", data);

    const route = useRoute<RouteProp<RootStackParamList, 'HomeDetails'>>();
    const navigation = useNavigation();
    const { id } = route.params;

    console.log("THe Id is: ", id);

    const { data: content, isFetching: isFetchingContent } = useContentDetails(id);

    console.log("The COntents are: ", content);


    const showSkeleton = !content && isFetchingContent;
    const videoRef = useRef<VideoRef>(null);


    const [loading, setLoading] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [showVideo, setShowVideo] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const [getid, setId] = useState('')

    useEffect(() => {
        setLoading(true);
        setShowVideo(false);

        const timer = setTimeout(() => {
            setShowVideo(true);
        }, 600);

        return () => clearTimeout(timer);
    }, [id]);

    // const player = useVideoPlayer(videoSource, player => {
    //     player.loop = true;
    //     player.play();
    // });

    // const onBuffer = () => {

    // }

    const handlePress = (id: string) => {
        // navigation.navigate('HomeDetails', { id });
        setId(id);
        setShowDetails(true)

    };

    return (
        <GradientWrapper hideGlow>

            <SafeAreaView style={{ flex: 1 }}>

                <Header extraTitle={content?.data?.title} showBackButton onBack={() => navigation.goBack()} />
                <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.container}>

                    {
                        showSkeleton ? (
                            <ContentDetailsSkeleton />
                        ) : (
                            <View style={{
                                width: deviceWidth,
                                height: deviceWidth * (9 / 16),
                                backgroundColor: COLORS.textBlack,
                                position: 'relative'
                            }}>
                                <View style={styles.videoContainer}>
                                    {!showVideo || loading ? (
                                        <View style={{
                                            ...StyleSheet.absoluteFill,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: COLORS.textBlack,
                                            zIndex: 10,
                                            position: 'absolute',

                                        }}>
                                            <ActivityIndicator size="large" color={COLORS.white} />
                                        </View>
                                    ) : null}

                                    {showVideo && (
                                        <Video
                                            ref={videoRef}
                                            source={{ uri: videoSource }}
                                            style={styles.video}
                                            controls
                                            resizeMode="contain"
                                            // paused={false}
                                            repeat
                                            muted={isMuted}
                                            onLoad={() => setLoading(false)}
                                            onError={(e) => {
                                                setLoading(false);
                                                console.log(e);
                                            }}
                                            onBuffer={({ isBuffering }) => {
                                                console.log("The Buffering is: ", isBuffering);
                                                // getting type of boolean
                                                setLoading(isBuffering);
                                            }}
                                        />
                                    )}
                                </View>
                            </View>
                        )
                    }

                    {showVideo && videoSource && (
                        <TouchableOpacity
                            style={styles.muteButton}
                            onPress={() => setIsMuted(prev => !prev)}
                            hitSlop={12}
                        >
                            <Ionicons
                                name={isMuted ? 'volume-mute' : 'volume-high'}
                                size={18}
                                color={COLORS.white}
                            />
                        </TouchableOpacity>
                    )}



                    {/* {content?.data && (
                        <View style={styles.contentContainer}>
                            <SCText size={24} color={COLORS.white} style={styles.title}>{content?.data.title}</SCText>
                            <View style={styles.metaInfo}>
                                <SCText size={14} color={COLORS.gray}>{content?.data.releaseYear} • {content?.data.duration || `${content?.data.totalSeasons} Seasons`} • {content?.data.rating}</SCText>
                                <View style={styles.matchContainer}>
                                    <SCText size={14} color={COLORS.green}>98% Match</SCText>
                                </View>
                            </View>
                            <SCText size={16} color={COLORS.gray100} style={styles.description}>{content?.data.description}</SCText>

                            <View style={styles.tagsContainer}>
                                {content?.data.genres.map(genre => (
                                    <View key={genre.id} style={styles.tag}>
                                        <SCText size={12} color={COLORS.white}>{genre.name}</SCText>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )} */}

                    {!showSkeleton && (
                        <ContentCardDetails item={content} />
                    )}

                    <View style={{ paddingBottom: 100 }}>
                        {showSkeleton || !data ? (
                            <>
                                <RowSkeleton />
                                <RowSkeleton />
                                <RowSkeleton />
                                <RowSkeleton />
                            </>
                        ) : (
                            data.rows.map((row) => (
                                <View key={row.id}>
                                    <View style={{ marginBottom: 24 }}>
                                        <SCText
                                            size={18}
                                            color={COLORS.white}
                                            style={styles.rowTitle}
                                        >
                                            {row.title}
                                        </SCText>

                                        <FlatList
                                            horizontal
                                            data={row.items}
                                            keyExtractor={(item) => item.id}
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{
                                                paddingHorizontal: 12,
                                            }}
                                            renderItem={({ item }) => (
                                                <RenderContent
                                                    item={item}
                                                    onPress={() => handlePress(item.id)}
                                                />
                                            )}
                                        />
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                </ScrollView>

                <DetailsSheet
                    show={showDetails}
                    close={() => {
                        setShowDetails(false)
                        setId('')
                    }}
                    id={getid}
                />
            </SafeAreaView>
        </GradientWrapper>
    );
};

export default HomeDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoContainer: {
        width: deviceWidth,
        height: deviceWidth * (9 / 16),
        backgroundColor: COLORS.textBlack,
        position: 'relative'
    },
    video: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
    },

    rowTitle: {
        marginLeft: 16,
        marginBottom: 12,
        marginTop: 8,
        fontWeight: 'bold'
    },
    muteButton: {
        position: 'absolute',
        // bottom: 14,
        top: 10,
        right: 14,
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
});
