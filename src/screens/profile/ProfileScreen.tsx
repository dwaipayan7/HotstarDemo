import DetailsSheet from '@/components/DetailsSheet';
import GradientWrapper from '@/components/GradientWrapper';
import ImagePreviewModal from '@/components/ImagePreviewModal';
import ProfileSkeleton from '@/components/ProfileSkeleton';
import RenderContent from '@/components/RenderContent';
import { COLORS } from '@/constants/colors';
import useTheme from '@/hooks/useTheme';
import { selectWatchlist } from '@/redux/slices/watchlistSlice';
import { useAppSelector } from '@/redux/store/store';
import { ContentItem } from '@/services/mockData';
import { useUserProfile } from '@/services/profileService';
import { formatText } from '@/utils/AllContext';
import SCText from '@/utils/CustomText';
import { globalStyles } from '@/utils/globalStyles';
import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { useCallback, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { IconButton, Switch } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen = () => {
    const insets = useSafeAreaInsets()
    const [visibleModal, setVisibleModal] = useState<boolean>(false)

    const { theme, isDark, toggle } = useTheme();

    const { data, isLoading, isFetching, refetch } = useUserProfile()
    const profile = data?.data

    const watchlistItems = useAppSelector(selectWatchlist)

    const isPremium = profile?.subscriptionPlan?.toLowerCase() === 'premium';

    const [getId, setId] = useState<string>('');
    const [showDetails, setShowDetails] = useState<boolean>(false)

    const [refreshing, setRefreshing] = useState<boolean>(false);

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


    const renderSection = (title: string, data: ContentItem[]) => {



        if (!data?.length) return null

        return (
            <View style={{ marginTop: 24 }}>
                <SCText
                    varient="bold"
                    size={18}
                    color={theme.textPrimary}
                    style={{ paddingHorizontal: 16, marginBottom: 12, fontWeight: 'bold' }}
                >
                    {title}
                </SCText>
                <FlatList
                    data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <RenderContent item={item} onPress={(id) => {
                                    setId(id)
                                    setShowDetails(true)
                                }} />

                                <View style={{
                                    position: 'absolute',
                                    bottom: 2,
                                    left: 8
                                }}>
                                    <SCText style={{
                                        fontWeight: '700'
                                    }} color={theme.textPrimary}>{formatText(item?.title, 16)}</SCText>
                                </View>
                            </>
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <GradientWrapper hideGlow style={{ flex: 1 }} gradientColors={theme.gradientColors}>
            <SafeAreaView style={{ flex: 1 }}>
                {/* <Header title="Profile" /> */}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefetch} />}
                // bounces={false}
                >
                    {isFetching ? (
                        <ProfileSkeleton />
                    ) : (
                        <>
                            <View style={{ alignItems: 'center', paddingTop: 16, paddingHorizontal: 16 }}>

                                <View style={{ ...globalStyles.rowCenter, alignItems: 'center', alignSelf: 'flex-end' }}>
                                    <Switch value={isDark} onValueChange={toggle} />
                                    <IconButton style={{
                                        margin: 0, padding: 0,
                                        position: 'relative',
                                        marginTop: -12,
                                        top: 5,
                                        gap: 10
                                    }} color={theme.textPrimary} icon={isDark ? 'weather-night' : 'white-balance-sunny'} />
                                </View>

                                <TouchableOpacity
                                    onPress={() => setVisibleModal(true)}
                                    activeOpacity={0.8}
                                    style={{
                                        padding: 4,
                                        borderRadius: 999,
                                        borderWidth: 2,
                                        borderColor: isPremium ? COLORS.golden : COLORS.gray100,
                                    }}
                                >
                                    <Image
                                        source={{ uri: profile?.avatarUrl }}
                                        style={{ width: 100, height: 100, borderRadius: 50 }}
                                        contentFit="cover"
                                    />
                                </TouchableOpacity>

                                <SCText size={20} color={theme.textPrimary} style={{ marginTop: 12, fontWeight: 'bold' }}>
                                    {profile?.name}
                                </SCText>

                                <SCText varient="medium" size={14} color={theme.textSecondary} style={{ marginTop: 2 }}>
                                    {profile?.email}
                                </SCText>

                                {profile?.subscriptionPlan && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 6,
                                            marginTop: 10,
                                            paddingVertical: 6,
                                            paddingHorizontal: 14,
                                            borderRadius: 20,
                                            backgroundColor: isPremium ? COLORS.premium : COLORS.gray400,
                                            borderWidth: 1,
                                            borderColor: isPremium ? COLORS.golden : COLORS.gray300,
                                        }}
                                    >
                                        <Feather
                                            name={isPremium ? 'award' : 'user'}
                                            size={14}
                                            color={isPremium ? COLORS.golden : COLORS.gray300}
                                        />
                                        <SCText
                                            style={{
                                                fontWeight: 'bold'
                                            }}
                                            size={14}
                                            color={isPremium ? COLORS.golden : COLORS.gray300}
                                        >
                                            {profile?.subscriptionPlan}
                                        </SCText>
                                    </View>
                                )}

                                {profile?.memberSince && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 6,
                                            marginTop: 10,
                                        }}
                                    >
                                        <Feather name="calendar" size={14} color={theme.textSecondary} />
                                        <SCText varient="medium" size={13} color={theme.textSecondary}>
                                            Member since {dayjs(profile.memberSince).format('MMM YYYY')}
                                        </SCText>
                                    </View>
                                )}
                            </View>

                            {renderSection('My List', watchlistItems)}

                            <ImagePreviewModal
                                imageUrl={profile?.avatarUrl}
                                visible={visibleModal}
                                onClose={() => setVisibleModal(false)}
                            />

                            <DetailsSheet
                                show={showDetails}
                                close={() => {
                                    setShowDetails(false);
                                    setId('')
                                }}
                                id={getId}
                            />
                        </>
                    )}

                </ScrollView>
            </SafeAreaView>
        </GradientWrapper>
    )
}

export default ProfileScreen