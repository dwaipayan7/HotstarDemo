import { Skeleton } from '@rneui/base';
import { FlatList, View } from 'react-native';

const WatchlistSkeleton = () => (
    <FlatList
        horizontal
        data={[1, 1, 1,]}
        keyExtractor={(item) => item.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal: 16,
        }}
        renderItem={() => (
            <View style={{ marginRight: 12 }}>
                <Skeleton
                    animation="pulse"
                    width={130}
                    height={190}
                    style={{
                        borderRadius: 12
                    }}
                />
            </View>
        )}
    />
);

const ProfileSkeleton = () => {
    return (
        <View>
            <View
                style={{
                    alignItems: 'center',
                    paddingTop: 16,
                    paddingHorizontal: 16,
                }}
            >

                <Skeleton
                    animation="pulse"
                    circle
                    width={100}
                    height={100}
                />


                <Skeleton
                    animation="pulse"
                    width={180}
                    height={24}
                    style={{ marginTop: 16, borderRadius: 4 }}
                />


                <Skeleton
                    animation="pulse"
                    width={220}
                    height={16}
                    style={{ marginTop: 10, borderRadius: 8 }}
                />


                <Skeleton
                    animation="pulse"
                    width={120}
                    height={32}
                    style={{
                        marginTop: 16,
                        borderRadius: 20,
                    }}
                />


                <Skeleton
                    animation="pulse"
                    width={140}
                    height={14}
                    style={{
                        marginTop: 12,

                        borderRadius: 6,

                    }}
                />
            </View>

            <View style={{ marginTop: 30 }}>
                <Skeleton
                    animation="pulse"
                    width={120}
                    height={26}
                    style={{
                        marginLeft: 16,
                        marginBottom: 16,
                        borderRadius: 20,

                    }}
                />

                <WatchlistSkeleton />
            </View>
        </View>
    );
};

export default ProfileSkeleton;