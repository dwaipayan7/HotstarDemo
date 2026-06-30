import { Skeleton } from "@rneui/base";
import { FlatList, View } from "react-native";

export const RowSkeleton = () => {
    return (
        <View style={{ marginBottom: 30, marginTop: 10 }}>
            <Skeleton
                animation="wave"
                width={180}
                height={24}
                style={{
                    marginLeft: 16,
                    marginBottom: 16,
                    borderRadius: 3
                }}
            />

            <FlatList
                horizontal
                data={[1, 2, 3, 4, 5]}
                keyExtractor={(item) => item.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 12,
                }}
                renderItem={() => (
                    <View style={{ marginRight: 12 }}>
                        <Skeleton
                            animation="wave"
                            width={130}
                            height={190}
                            style={{ borderRadius: 8 }}
                        />
                    </View>
                )}
            />
        </View>
    );
};