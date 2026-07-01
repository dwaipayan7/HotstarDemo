import GradientWrapper from '@/components/GradientWrapper';
import RenderContent from '@/components/RenderContent';
import { RowSkeleton } from '@/components/RowSkeleton';
import { COLORS } from '@/constants/colors';
import useTheme from '@/hooks/useTheme';
import { RootStackParamList } from '@/navigation/MainTabNavigator';
import { selectWatchlist, toggleWatchList } from '@/redux/slices/watchlistSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/store';
import { useHomeData } from '@/services/homeService';
import { HeroBanner } from '@/services/mockData';
import { deviceHeight, deviceWidth } from '@/utils/AllContext';
import SCText from '@/utils/CustomText';
import { globalStyles } from '@/utils/globalStyles';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Skeleton } from '@rneui/base';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';





const HomeScreen = () => {
    const { data, isLoading, isFetching, refetch } = useHomeData();
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const { isDark, theme, toggle } = useTheme();

    console.log("The Data are: ", data);

    const onRefetch = useCallback(async () => {
        setRefreshing(true);
        try {
            await refetch();
        } catch (error) {
            setRefreshing(false)
        } finally {
            setRefreshing(false)

        }
    }, [refetch])


    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handlePress = (id: string) => {
        navigation.navigate('HomeDetails', { id });
    };

    const dispatch = useAppDispatch();
    const watchlistItems = useAppSelector(selectWatchlist);

    // const item = data?.rows?.flatMap((row) => row.items)

    // console.log("The Item data are: ", item);


    const handleToggleWatchlist = useCallback((heroItem: HeroBanner) => {

        const item = data?.rows?.flatMap((row) => row.items).find((item) => item.id === heroItem.contentId) ?? {
            id: heroItem.contentId,
            title: heroItem.title,
            thumbnailUrl: heroItem.imageUrl
        }



        dispatch(toggleWatchList(item))

    }, [data, dispatch]);

    // const onRefetch = () => {

    //     refetch()

    // }


    const indicator = useSharedValue(1);

    useEffect(() => {
        indicator.value = withRepeat(
            withTiming(0, { duration: 600 }),
            -1,
            true
        );
    }, []);

    const animatedDotStyle = useAnimatedStyle(() => ({
        opacity: indicator.value,
        transform: [
            {
                scale: 0.8 + indicator.value * 0.4,
            },
        ],
    }));

    const renderHeroBanner = useCallback(({ item }: { item: HeroBanner }) => {
        const isSaved = watchlistItems.some((watchItem) => watchItem.id === item.contentId);

        return (
            <SafeAreaView style={{
                width: deviceWidth,
                height: deviceHeight * 0.65,
            }}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    contentFit="cover"
                />
                <LinearGradient
                    colors={COLORS.gradient2}
                    locations={[0, 0.6, 1]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '60%',
                        justifyContent: 'flex-end',
                        paddingHorizontal: 20,
                        paddingBottom: 40,
                    }}
                >
                    <View style={{
                        alignItems: 'center',

                    }}>
                        <SCText size={28} color={COLORS.white} style={{
                            textAlign: 'center',
                            marginBottom: 8,
                            fontWeight: '700'
                        }}>
                            {item.title}
                        </SCText>
                        <SCText size={14} color="#ccc" style={{
                            textAlign: 'center',
                            marginBottom: 24,

                        }}>
                            {item.description}
                        </SCText>

                        {item.isLive && (
                            <View style={{

                                paddingVertical: 4,
                                paddingHorizontal: 6,
                                borderRadius: 4,
                                backgroundColor: COLORS.white,
                                position: 'absolute',
                                left: 4,
                                bottom: 8
                            }}>
                                <View style={{ ...globalStyles.row, gap: 3, }}>
                                    {/* <SCText color={COLORS.redColor}>.</SCText> */}
                                    <Animated.View style={[animatedDotStyle, {
                                        width: 8,
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor: COLORS.redColor,
                                        marginRight: 6,
                                    }]} />
                                    <SCText size={12} color={COLORS.textBlack}>LIVE</SCText>
                                </View>

                            </View>
                        )}

                        <View style={{
                            ...globalStyles.row,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                        }}>
                            <TouchableOpacity style={styles.playButton} onPress={() => handlePress(item.contentId)}>
                                <Ionicons name="play" size={20} color={COLORS.textBlack} />
                                <SCText size={16} color={COLORS.textBlack} style={styles.playButtonText}>Play</SCText>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.listButton} onPress={() => handleToggleWatchlist(item)}>
                                {/* <Feather name="plus" size={24} color={COLORS.white} /> */}
                                <Ionicons
                                    name={isSaved ? "checkmark-circle" : "add-circle-outline"}
                                    size={28}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View >
                </LinearGradient >
            </SafeAreaView >
        );
    }, [watchlistItems, handleToggleWatchlist]);


    const HeroSkeleton = () => {
        return (
            <SafeAreaView
                style={{
                    width: deviceWidth,
                    height: deviceHeight * 0.65,
                }}
            >
                <Skeleton
                    animation="wave"
                    width="100%"
                    height="100%"
                />

                <View
                    style={{
                        position: "absolute",
                        bottom: 40,
                        left: 20,
                        right: 20,
                    }}
                >
                </View>
            </SafeAreaView>
        );
    };


    return (
        <GradientWrapper hideGlow style={{ flex: 1 }} gradientColors={theme.gradientColors}>

            <StatusBar barStyle={isDark ? "light-content" : 'dark-content'} translucent backgroundColor="transparent" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefetch} />} style={styles.container} >
                <View style={{
                    height: deviceHeight * 0.65,

                }}>
                    {isLoading || !data ? (
                        <HeroSkeleton />
                    ) : (
                        <Carousel
                            loop
                            width={deviceWidth}
                            height={deviceHeight * 0.65}
                            autoPlay
                            data={data.heroBanners}
                            scrollAnimationDuration={800}
                            renderItem={renderHeroBanner}
                        />
                    )}
                    <SafeAreaView style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 10,
                    }}>
                        <View style={styles.header}>
                            <View style={{ flex: 1 }}>
                                <View style={{ ...globalStyles.row, gap: 4 }}>
                                    <FontAwesome name="star" size={24} color="gold" />
                                    <SCText style={{
                                        fontWeight: 'bold'
                                    }} size={20} color={COLORS.white}>HOTSTAR</SCText>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <TouchableOpacity style={{
                                    marginLeft: 20,

                                }}>
                                    <Feather name="cast" size={24} color={COLORS.white} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{

                                    // marginLeft: 20,

                                }}>
                                    {/* <Feather name="search" size={24} color={COLORS.white} /> */}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>

                <View style={{ paddingBottom: 100 }}>
                    {isLoading || !data ? (
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
                                        color={theme.textPrimary}
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
                <View style={{ paddingBottom: 100 }}>
                    {isLoading || !data ? (
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
                                        color={theme.textPrimary}

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
                <View style={{ paddingBottom: 100 }}>
                    {isLoading || !data ? (
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
                                        color={theme.textPrimary}

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
            </ScrollView >
        </GradientWrapper >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    playButton: {
        backgroundColor: COLORS.white,
        ...globalStyles.row,
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


    rowTitle: {
        marginLeft: 16,
        marginBottom: 12,
        marginTop: 8,
        fontWeight: 'bold'
    },




});

export default HomeScreen;
