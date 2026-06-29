import GradientWrapper from '@/components/GradientWrapper';
import { RootStackParamList } from '@/navigation/MainTabNavigator';
import { useHomeData } from '@/services/homeService';
import { ContentItem, ContentRow, HeroBanner } from '@/services/mockData';
import SCText from '@/utils/CustomText';
import { Feather, Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
    const { data } = useHomeData();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handlePress = (id: string) => {
        navigation.navigate('HomeDetails', { id });
    };

    const renderHeader = useCallback(() => (
        <SafeAreaView style={styles.headerContainer}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    {/* Placeholder for Logo */}
                    <SCText style={{
                        fontWeight: 'bold'
                    }} varient="bold" size={20} color="#fff">HOTSTAR</SCText>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Feather name="cast" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Feather name="search" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    ), []);

    const renderHeroBanner = useCallback(({ item }: { item: HeroBanner }) => (
        <View style={styles.heroBannerContainer}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.heroImage}
                resizeMode="cover"
            />
            <LinearGradient
                colors={['transparent', 'rgba(5, 1, 13, 0.5)', '#05010D']}
                locations={[0, 0.6, 1]}
                style={styles.heroGradient}
            >
                <View style={styles.heroContent}>
                    <SCText varient="bold" size={28} color="#fff" style={styles.heroTitle}>
                        {item.title}
                    </SCText>
                    <SCText varient="regular" size={14} color="#ccc" style={styles.heroDescription}>
                        {item.description}
                    </SCText>
                    <View style={styles.heroActions}>
                        <TouchableOpacity style={styles.playButton} onPress={() => handlePress(item.contentId)}>
                            <Ionicons name="play" size={20} color="#000" />
                            <SCText varient="semibold" size={16} color="#000" style={styles.playButtonText}>Play</SCText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.listButton}>
                            <Feather name="plus" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    ), []);

    const renderContentItem = ({ item }: { item: ContentItem }) => (
        <TouchableOpacity style={styles.contentItem} onPress={() => handlePress(item.id)}>
            <Image
                source={{ uri: item.thumbnailUrl }}
                style={styles.contentThumbnail}
                resizeMode="cover"
            />
            {item.isPremium && (
                <View style={styles.premiumBadge}>
                    <Feather name="star" size={10} color="#FFD700" />
                </View>
            )}
        </TouchableOpacity>
    );

    const renderContentRow = ({ item }: { item: ContentRow }) => (
        <View style={styles.rowContainer}>
            <SCText varient="semibold" size={18} color="#fff" style={styles.rowTitle}>
                {item.title}
            </SCText>
            <FlatList
                data={item.items}
                renderItem={renderContentItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.rowList}
            />
        </View>
    );

    return (
        <GradientWrapper hideGlow>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView style={styles.container} bounces={false}>
                <View style={styles.heroSection}>
                    {data?.heroBanners && (
                        <Carousel
                            loop
                            width={width}
                            height={height * 0.65}
                            autoPlay={true}
                            data={data.heroBanners}
                            scrollAnimationDuration={6000}
                            renderItem={renderHeroBanner}

                        />
                    )}
                    {renderHeader()}
                </View>

                <View style={styles.contentSection}>
                    {data?.rows.map((row) => (
                        <View key={row.id}>
                            {renderContentRow({ item: row })}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </GradientWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 20,
    },
    heroSection: {
        height: height * 0.65,
    },
    heroBannerContainer: {
        width: width,
        height: height * 0.65,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '60%',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    heroContent: {
        alignItems: 'center',
    },
    heroTitle: {
        textAlign: 'center',
        marginBottom: 8,
    },
    heroDescription: {
        textAlign: 'center',
        marginBottom: 24,
    },
    heroActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    playButton: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        marginRight: 16,
        minWidth: 120,
        justifyContent: 'center',
    },
    playButtonText: {
        marginLeft: 8,
    },
    listButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10,
        borderRadius: 8,
    },
    contentSection: {
        paddingBottom: 100,
    },
    rowContainer: {
        marginBottom: 24,
    },
    rowTitle: {
        marginLeft: 16,
        marginBottom: 12,
    },
    rowList: {
        paddingHorizontal: 12,
    },
    contentItem: {
        marginHorizontal: 4,
        borderRadius: 8,
        overflow: 'hidden',
    },
    contentThumbnail: {
        width: 120,
        height: 180,
        borderRadius: 8,
    },
    premiumBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 4,
        borderRadius: 12,
    }
});

export default HomeScreen;
