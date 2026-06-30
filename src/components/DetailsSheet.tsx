import { COLORS } from '@/constants/colors';
import { videoSource } from '@/screens/home/HomeDetailsScreen';
import { useContentDetails } from '@/services/contentService';
import { deviceHeight, deviceWidth } from '@/utils/AllContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import ContentCardDetails from './ContentCardDetails';


interface Props {
    show: boolean;
    close: () => void;
    id: string;
}

const DetailsSheet = ({ show, close, id }: Props) => {

    console.log("The Id is: ", id);
    console.log("SHOWING DETAILS: ", show);



    // const actionRef = useRef<ActionSheetRef>(null);
    const videoRef = useRef<any>(null);


    // const [fetching, setFetching] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        setLoading(true);
        setShowVideo(false);
        const timer = setTimeout(() => {
            setShowVideo(true);
        }, 600);
        return () => clearTimeout(timer);
    }, [id]);

    const { data: content, isFetching } = useContentDetails(id);



    return (
        // <ActionSheet
        //     ref={actionRef}
        //     onClose={close}
        //     overlayColor="rgba(0,0,0,0.7)"
        //     containerStyle={styles.sheet}
        //     indicatorStyle={{ width: 0, height: 0 }}
        //     statusBarTranslucent

        // >

        <Modal
            isVisible={show}
            // onDismiss={close}
            onBackdropPress={close}
            onBackButtonPress={close}
            backdropOpacity={0.2}
            backdropColor="black"

            style={{

                justifyContent: 'flex-end',
                margin: 0,


            }}
        >

            <SafeAreaView
                edges={['bottom']}
                style={{
                    maxHeight: deviceHeight * 0.96,
                    backgroundColor: COLORS.gradient1,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    overflow: 'hidden',
                }}
            >
                <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                    <View style={styles.videoContainer}>
                        {(!showVideo || loading) && (
                            <View style={styles.videoLoader}>
                                <ActivityIndicator size="large" color={COLORS.white} />
                            </View>
                        )}

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

                        <LinearGradient
                            colors={['transparent', 'rgba(11,11,15,0.6)', COLORS.textBlack]}
                            style={styles.videoFade}
                        />

                        <TouchableOpacity style={styles.closeButton} onPress={close} hitSlop={12}>
                            <Ionicons name="close" size={22} color={COLORS.white} />
                        </TouchableOpacity>

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

                        {/* <View style={styles.titleOverlay}>
                            <SCText size={26} color={COLORS.white} style={styles.title} numberOfLines={2}>
                                {content?.data?.title}
                            </SCText>
                        </View> */}
                    </View>

                    {content?.data && (


                        <ContentCardDetails item={content} />
                    )}

                    {isFetching && (
                        <View style={styles.fullLoader}>
                            <ActivityIndicator size="large" color={COLORS.white} />
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
            {/* </ActionSheet > */}
        </Modal>
    );
};

export default DetailsSheet;

const styles = StyleSheet.create({
    sheet: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.textBlack,
        // maxHeight: '92%',
    },
    videoContainer: {
        width: deviceWidth,
        height: deviceWidth * (9 / 16),
        backgroundColor: COLORS.textBlack,
        position: 'relative'
    },
    video: { ...StyleSheet.absoluteFill },
    videoLoader: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.textBlack,
        zIndex: 10,
    },
    videoFade: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 80,
    },
    closeButton: {
        position: 'absolute',
        top: 14,
        right: 14,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    muteButton: {
        position: 'absolute',
        bottom: 14,
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
    titleOverlay: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 70,
        zIndex: 15,
    },
    title: { fontWeight: '700' },
    contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
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
    description: { lineHeight: 21, marginBottom: 10 },
    castLine: { marginBottom: 16 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tag: {
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    fullLoader: { paddingVertical: 40, alignItems: 'center' },
});