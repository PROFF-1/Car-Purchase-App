import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { fetchNewsDetails } from '../utils/api';
import { News } from '../types/news';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header1 from '../components/Headers';


export default function NewsDetails() {
  const { colors } = useTheme();
  const responsive = useResponsiveScreen();
  const router = useRouter();
  const { newsId } = useLocalSearchParams();

  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchNewsDetails(newsId as string).then((data) => {
      setNews(data);
      setLoading(false);
    });
  }, [newsId]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: responsive.hp(2),
      paddingBottom: responsive.hp(1),
      paddingHorizontal: responsive.wp(4),
      backgroundColor: colors.background,
    },
    backButton: {
      marginRight: responsive.wp(3),
      padding: responsive.scale(6),
    },
    title: {
      fontSize: responsive.scaleFontSize(22),
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
      textAlign: 'center',
    },
    authorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: responsive.hp(1),
      paddingHorizontal: responsive.wp(4),
    },
    avatar: {
      width: responsive.wp(10),
      height: responsive.wp(10),
      borderRadius: responsive.wp(5),
      marginRight: responsive.wp(3),
      backgroundColor: colors.cardOnWhitePage,
    },
    authorInfo: {
      flex: 1,
    },
    authorName: {
      fontWeight: '600',
      color: colors.text,
      fontSize: responsive.scaleFontSize(15),
    },
    meta: {
      color: colors.textSecondary,
      fontSize: responsive.scaleFontSize(12),
      marginTop: 2,
    },
    followButton: {
      borderWidth: 1,
      borderColor: colors.constant,
      borderRadius: 16,
      paddingHorizontal: responsive.wp(4),
      paddingVertical: responsive.hp(0.5),
      marginLeft: responsive.wp(2),
    },
    followText: {
      color: colors.constant,
      fontWeight: '600',
      fontSize: responsive.scaleFontSize(14),
    },
    newsImage: {
      width: responsive.hp(50),
      height: responsive.hp(28),
      borderRadius: 12,
      marginVertical: responsive.hp(2),
      alignSelf: 'center',
    },
    category: {
      color: colors.text,
      fontWeight: '600',
      fontSize: responsive.scaleFontSize(13),
      marginBottom: responsive.hp(1),
      marginLeft: responsive.wp(4),
    },
    content: {
      color: colors.textSecondary,
      fontSize: responsive.scaleFontSize(16),
      paddingHorizontal: responsive.wp(4),
      marginBottom: responsive.hp(2),
    },
    sectionTitle: {
      fontSize: responsive.scaleFontSize(18),
      fontWeight: 'bold',
      color: colors.text,
      marginTop: responsive.hp(3),
      marginBottom: responsive.hp(1),
      paddingHorizontal: responsive.wp(4),
    },
    relatedNews: {
      paddingHorizontal: responsive.wp(4),
      marginBottom: responsive.hp(2),
    },
    emptyState: {
      alignItems: 'center',
      paddingBottom: responsive.hp(50),
      padding: responsive.scale(10)
    },
    emptyText: {
      color: colors.textSecondary,
      fontSize: responsive.scaleFontSize(16),
    },


    purchaseTag:{
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-between',
      width:'95%',
      backgroundColor: colors.cardOffWhitePage,
      padding: responsive.scale(15),
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset:{
        width: 10,
        height: 10
      },
      shadowOpacity: 0,
      shadowRadius: 3.5,
      elevation: 3,
      marginBottom: responsive.scale(10)

    },

    details: {
      flex: 0.9

    },


    top: {
      alignItems:'center',
      justifyContent: 'space-between',
      flexDirection: 'row',

    },

    name: {
      fontSize: responsive.scaleFontSize(18),
      fontWeight: 700,
      color: colors.text

    },


    type: {
      fontSize: responsive.scaleFontSize(10),
      color: colors.textSecondary
    },

    price: {
      color: colors.constant,
      fontWeight: 400,
      fontSize: responsive.scaleFontSize(14)
    },
    scrollContent: {
      flex: 1,
    },
    footer: {
     
      paddingTop: responsive.scale(25),
      paddingHorizontal: responsive.scale(15),
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      width :'100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: responsive.hp(12),
    },

    commentLeft: {
      flexDirection : 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0,155,0,0.3)',
      paddingHorizontal: responsive.scale(15),
      flex:responsive.scale(0.7),
      borderRadius: 50

    },

    commentRight: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '30%',
      paddingHorizontal: responsive.scale(5),
      marginLeft: responsive.scale(15)
    },
    comment:{
      padding:responsive.scale(10),
      flex:responsive.scale(0.5),
    },

    reaction :{
      alignItems: 'center'
    }
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <Header1 title={'News'} onPress={()=>router.replace('./tabs')}/>
      {loading ? (
        <View style={styles.emptyState}>
          <ActivityIndicator color={colors.constant} size="large" />
        </View>
      ) : !news ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.emptyState}>
        <View style={styles.authorRow}>
            <Image source={require('../mockup/NewsMockup/user.png')} style={styles.avatar} />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>Abbey</Text>
              <Text style={styles.meta}>19th June, 2025 • 0 Views</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>+ Follow</Text>
            </TouchableOpacity>
        </View>
          {/* Title */}
          <Text style={[styles.title, { textAlign: 'left', fontSize: responsive.scaleFontSize(22) }]}>Porsche's First Electric Car Named 
                  Taycan; Will Rival Tesla Model S </Text>
          {/* News Image */}
          <Image source={require('../mockup/NewsMockup/newsImage.png')} style={styles.newsImage} resizeMode="contain" />

          <TouchableOpacity  style={styles.purchaseTag}>
            <Image source={require('../mockup/NewsMockup/car.png')}/>
            <View  style={styles.details}>
              <View style={styles.top}>
                <Text style={styles.name} >
                Porsche-Taycan
                </Text>
                <Text style={styles.price}>
                $634,800
                </Text>
              </View>
              <View style={styles.top}>
                <Text style={styles.type}>
                McLaren/Luxury
                </Text>
                <Text style={styles.type}>
                Price
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* Content Placeholder */}
          <Text style={styles.content}>
          Porsche says that the name Taycan roughly translates to 
          "lively young horse", paying homage to the leaping horse that 
          has been featured on the brand's crest logo since 1952.12
            News content will appear here. This is a placeholder for the article body. Backend integration will provide the full text.
          </Text>
          {/* Related News Placeholder */}
          <Text style={styles.sectionTitle}>Related</Text>
          <View style={styles.relatedNews}>
            {/* Placeholder for related news cards */}
            <Text style={styles.emptyText}>Related news will appear here.</Text>
          </View>

         
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Author Row */}
          <Text style={styles.emptyText}>News not found.</Text>

          
        </ScrollView>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.footer}>
          <View style={styles.commentLeft}>
            <Image source={require('../mockup/NewsMockup/typeComment.png')}/>
            <TextInput
              placeholder='Say somthing...'
              style={styles.comment}
            />
          </View>
          <View style={styles.commentRight}>
            <TouchableOpacity style={styles.reaction} onPress={() => setCommentModalVisible(true)}>
              <Image source={require('../mockup/NewsMockup/comment.png')} tintColor={'#8E8E93'} style={{height: responsive.scale(20), width: responsive.scale(22)}}/>
              <Text>50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reaction}>
              <Image source={require('../mockup/NewsMockup/like.png')} tintColor={'#8E8E93'} style={{height: responsive.scale(20), width: responsive.scale(20)}}/>
              <Text>50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reaction}>
              <Image source={require('../mockup/NewsMockup/star.png')} tintColor={'#8E8E93'} style={{height: responsive.scale(20), width: responsive.scale(20)}}/>
              <Text>50</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* Comment Modal */}
      <Modal
        visible={commentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
          }}
          activeOpacity={1}
          onPressOut={() => setCommentModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              minHeight: 300,
              height: '45%',
              width: '100%',
              alignSelf: 'flex-end',
            }}
          >
            {/* Drag handle */}
            <View
              style={{
                width: 40,
                height: 5,
                borderRadius: 3,
                backgroundColor: '#ccc',
                alignSelf: 'center',
                marginBottom: 12,
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Comments</Text>
            {/* Placeholder for comments list */}
            <Text style={{ color: '#888' }}>Comments will appear here.</Text>
            <TouchableOpacity onPress={() => setCommentModalVisible(false)} style={{ alignSelf: 'flex-end', marginTop: 10 }}>
              <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
} 