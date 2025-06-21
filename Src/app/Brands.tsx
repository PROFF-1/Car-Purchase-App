import { StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { carBrands, brandList } from '../mockup';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { useTheme } from '../styles/theme';
import Header1 from '../components/Headers';
import { useRouter } from 'expo-router';

export default function Brands() {
  const {
    scale,
    scaleHeight,
    scaleFontSize,
    wp,
    hp,
    orientation,
    isTablet,
  } = useResponsiveScreen();
  const { colors } = useTheme();


  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: wp(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: scaleFontSize(isTablet ? 32 : 24),
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      backgroundColor: 'green'
    },
    sectionTitle: {
      fontSize: scaleFontSize(isTablet ? 22 : 18),
      fontWeight: '600',
      color: colors.textSecondary,
      marginHorizontal: wp(5),
      marginBottom: hp(2),
    },
    brandsList: {
      paddingHorizontal: wp(2),
      paddingBottom: hp(2),
    },
    brandItem: {
      flex: 1,
      alignItems: 'center',
      padding: scale(orientation === 'landscape' ? 3 : 5),
      margin: scale(3),
      backgroundColor: colors.mainBackground,
      borderRadius: scale(10),
      minHeight: hp(isTablet ? 18 : 10),
      justifyContent: 'center',
      shadowColor: colors.border,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    brandName: {
      fontSize: scaleFontSize(isTablet ? 18 : (orientation === 'landscape' ? 8 : 10)),
      fontWeight: '500',
      color: colors.text,
      marginTop: hp(1),
      textAlign: 'center',
    },


    listContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
      paddingLeft:scale(orientation === 'landscape' ? 10 : 15)
    },


    letterContainer: {
      backgroundColor: colors.mainBackground,
      height: wp(10),
      width: '100%',
      justifyContent: 'center',
      paddingLeft: scale(orientation=== 'landscape'? 20: 10)
    },

    letter: {
      fontWeight: 700,
      fontSize: 18
    },
    logoImage :{
      marginRight: scale(10),

    }
  })
  

  const renderBrandItem = ({ item }: { item: any }) => {
    const SvgComponent = item.Svg;
    
    return (
      <TouchableOpacity style={styles.brandItem} onPress={() => router.push({ pathname: '/BrandDetails', params: { brand: item.name } })}>
        {SvgComponent && <SvgComponent width={scale(isTablet ? 100 : 50)} height={scaleHeight(isTablet ? 80 : 40)} />}
        <Text style={styles.brandName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };



  const carBrandList =({item}: {item: any})=>{

    return (
      <TouchableOpacity style={styles.listContainer}>
        <Image source={item.image} style={styles.logoImage}/>
        <Text  >{item.name}</Text>
      </TouchableOpacity>
    )

  }

  const numColumns = isTablet ? 6 : orientation === 'landscape' ? 4 : 4;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled={false}>
        <Header1 title={'Brands'} onPress={()=>router.replace('./tabs')}/>
        <Text style={styles.sectionTitle}>
          Popular Brands
        </Text>

        <FlatList
          data={carBrands}
          renderItem={renderBrandItem}
          keyExtractor={(item) => item.name}
          horizontal={false}
          numColumns={4}
          key={4}
          contentContainerStyle={styles.brandsList}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />

        <View style={styles.letterContainer}>
          <Text style={styles.letter}>A</Text>
        </View>
        <View>
          <FlatList
            data={brandList}
            renderItem={carBrandList}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}


          />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

