import { Skeleton } from "@rneui/base";
import { View } from "react-native";

const ContentCardDetailsSkeleton = () => {
    return (
        <View
            style={{
                // padding: 20,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
            }}
        >

            <Skeleton
                animation="pulse"
                width="70%"
                height={24}
                style={{ marginBottom: 16 }}
            />


            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 18,
                }}
            >
                <Skeleton animation="pulse" width={60} height={14} />
                <Skeleton animation="pulse" width={35} height={14} />
                <Skeleton animation="pulse" width={70} height={14} />
                <Skeleton animation="pulse" width={40} height={18} />
            </View>


            <Skeleton
                animation="pulse"
                height={48}
                style={{
                    borderRadius: 6,
                    marginBottom: 18,
                }}
            />


            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 20,
                }}
            >
                {[1, 2, 3].map((item) => (
                    <View
                        key={item}
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <Skeleton
                            animation="pulse"
                            circle
                            width={24}
                            height={24}
                        />

                        <Skeleton
                            animation="pulse"
                            width={60}
                            height={12}
                            style={{ marginTop: 8 }}
                        />
                    </View>
                ))}
            </View>


            <Skeleton
                animation="pulse"
                height={14}
                style={{ marginBottom: 8 }}
            />
            <Skeleton
                animation="pulse"
                height={14}
                style={{ marginBottom: 8 }}
            />
            <Skeleton
                animation="pulse"
                width="80%"
                height={14}
                style={{ marginBottom: 20 }}
            />


            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 8,
                }}
            >
                {[1, 2, 3].map((item) => (
                    <Skeleton
                        key={item}
                        animation="pulse"
                        width={70}
                        height={28}
                        style={{
                            borderRadius: 16,
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export default ContentCardDetailsSkeleton;