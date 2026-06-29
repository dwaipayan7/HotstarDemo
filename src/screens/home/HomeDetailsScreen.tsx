import GradientWrapper from '@/components/GradientWrapper';
import Header from '@/components/Header';
import { RootStackParamList } from '@/navigation/MainTabNavigator';
import { ContentItem, MOCK_CONTENT_DB } from '@/services/mockData';
import SCText from '@/utils/CustomText';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const videoSource =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const HomeDetailsScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'HomeDetails'>>();
    const navigation = useNavigation();
    const { id } = route.params;

    const [item, setItem] = useState<ContentItem | undefined>(undefined);

    useEffect(() => {
        const foundItem = MOCK_CONTENT_DB.find((i) => i.id === id);
        setItem(foundItem);
    }, [id]);

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    return (
        <GradientWrapper hideGlow>

            <SafeAreaView style={{ flex: 1 }}>

                <Header showBackButton onBack={() => navigation.goBack()} />
                <View style={styles.container}>
                    <View style={styles.videoContainer}>
                        <VideoView style={styles.video} player={player} allowsPictureInPicture />
                        {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity> */}
                    </View>

                    {item && (
                        <View style={styles.contentContainer}>
                            <SCText varient="bold" size={24} color="#fff" style={styles.title}>{item.title}</SCText>
                            <View style={styles.metaInfo}>
                                <SCText varient="medium" size={14} color="#aaa">{item.releaseYear} • {item.duration || `${item.totalSeasons} Seasons`} • {item.rating}</SCText>
                                <View style={styles.matchContainer}>
                                    <SCText varient="bold" size={14} color="#46d369">98% Match</SCText>
                                </View>
                            </View>
                            <SCText varient="regular" size={16} color="#ddd" style={styles.description}>{item.description}</SCText>

                            <View style={styles.tagsContainer}>
                                {item.genres.map(genre => (
                                    <View key={genre.id} style={styles.tag}>
                                        <SCText size={12} color="#fff">{genre.name}</SCText>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
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
        width: width,
        height: width * (9 / 16),
        backgroundColor: '#000',
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
    contentContainer: {
        padding: 20,
    },
    title: {
        marginBottom: 8,
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
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
    }
});
