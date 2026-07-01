import Chip from '@/components/Chip';
import DetailsSheet from '@/components/DetailsSheet';
import GradientWrapper from '@/components/GradientWrapper';
import RenderContent from '@/components/RenderContent';
import { COLORS } from '@/constants/colors';
import useTheme from '@/hooks/useTheme';
import { useHomeData } from '@/services/homeService';
import { useSearch } from '@/services/searchService';
import { globalStyles } from '@/utils/globalStyles';
import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
    const { data, isLoading, isFetching, refetch } = useHomeData();

    console.log("Getting the data are: ", data);



    // const navigation = useNavigation<any>();
    const { theme } = useTheme();
    const [selectedChip, setSelectedChip] = useState<string[]>([]);


    const allItems = data?.rows.flatMap(row => row.items) || [];

    console.log("The ALl ITems are: ", allItems);


    const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror'];

    const toggleGenre = (genre: string) => {
        if (selectedChip.includes(genre)) {
            setSelectedChip(selectedChip.filter(g => g !== genre));
        } else {
            setSelectedChip([...selectedChip, genre]);
        }
    };

    const handlePress = (id: string) => {
        // navigation.navigate('HomeDetails', { id });
        setId(id);
        setShowDetails(true)
    };

    const [getId, setId] = useState<string>('')
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const [text, setText] = useState<string>('')

    const searchQuery = text || selectedChip.join(',')
    const { data: searchedData } = useSearch(searchQuery)
    // already delayed no need to debouncing

    // console.log("The searched data is: ", searchedData);

    const displayItems =
        searchQuery.trim().length > 0
            ? (searchedData?.data?.items || [])
            : allItems;

    console.log("The display names are: ", displayItems);


    return (
        <GradientWrapper style={{ flex: 1 }} gradientColors={theme.gradientColors} hideGlow>
            <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.surface }]}>

                <TextInput
                    placeholder="Search Entertainment"
                    placeholderTextColor="#888"
                    style={{
                        height: 45,
                        borderWidth: 1,
                        borderColor: COLORS.divider,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        color: theme.textPrimary
                    }}
                    value={text}
                    onChangeText={setText}
                />


                <View style={{
                    height: 40
                }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.chipScrollContent}
                    >
                        {genres.map((genre) => (
                            <Chip
                                key={genre}
                                label={genre}
                                selected={selectedChip.includes(genre)}
                                onPress={() => toggleGenre(genre)}
                                onClose={selectedChip.includes(genre) ? () => toggleGenre(genre) : undefined}
                            />
                        ))}
                    </ScrollView>
                </View>


                <FlatList
                    data={displayItems}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.gridRowSpacing}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <View>
                            <RenderContent
                                isWidth
                                item={item}
                                onPress={() => handlePress(item.id)}
                            />
                        </View>
                    )}
                />

                <DetailsSheet
                    show={showDetails}
                    close={() => {
                        setShowDetails(false)
                        setId('')
                    }}
                    id={getId}
                />

            </SafeAreaView>
        </GradientWrapper>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        gap: 10,
        padding: 16,
        paddingBottom: 0
    },

    chipScrollContent: {
        ...globalStyles.row,
        gap: 8,
        alignItems: 'center',
    },
    listContent: {
        paddingBottom: 12,
    },
    gridRowSpacing: {
        justifyContent: 'space-between',
        // justifyContent: 'flex-start',
        marginBottom: 12,
    }
});
