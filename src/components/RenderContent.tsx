import { ContentItem } from '@/services/mockData'
import { Feather } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const RenderContent = ({ item, onPress }: { item: ContentItem, onPress: (id: string) => void }) => {
    return (
        <TouchableOpacity style={{
            marginHorizontal: 4,
            borderRadius: 8,
            overflow: 'hidden',

        }} onPress={onPress}>
            <Image
                source={{ uri: item.thumbnailUrl }}
                style={{
                    width: 120,
                    height: 200,
                    borderRadius: 8,
                }}
                contentFit='cover'
            />
            {item.isPremium && (
                <View style={{
                    position: 'absolute',
                    top: 8,
                    right: 2,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: 4,
                    borderRadius: 12,
                }}>
                    <Feather name="star" size={10} color="#FFD700" />
                </View>
            )}
        </TouchableOpacity>
    )
}

export default RenderContent

const styles = StyleSheet.create({})


