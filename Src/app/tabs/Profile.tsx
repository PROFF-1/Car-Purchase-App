import React from "react";
import {View, Text, Image, FlatList, ScrollView, ScrollViewBase, TouchableOpacity, StyleSheet} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../styles/theme";



export default function Profile(){

  const {colors} =useTheme();



  const styles =StyleSheet.create({
    container:{
      backgroundColor: colors.mainBackground,
    },

    header:{
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-between',
      paddingHorizontal: 30
    },

    headerLeft : {
      flexDirection:'row',
      width: '30%',
      alignItems:'center',
      justifyContent: 'space-between'
    },
    holder:{
      backgroundColor:'#fff',
      height: 50,
      width: 50,
      borderRadius: '50%',
      alignItems: 'center',
      justifyContent: 'center'
    },


    profileContainer:{
      flexDirection: 'row',
      alignItems:'center',
      paddingHorizontal: 20,
      marginTop: 38,
      marginBottom: 20
    },


    name :{
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 10
    },

    description : {
      fontSize: 12,
      color: colors.textSecondary
    },

    profileStatContainer :{
      flexDirection:'row',
      alignItems: 'center',
      paddingHorizontal: 30,
      
    },

    followBtn:{
      paddingVertical: 6,
      paddingHorizontal: 15,
      borderRadius:25,
      borderWidth: 1,
      borderColor: colors.constant,
      alignItems:'center',
      justifyContent: 'center',
      marginRight: 33
    },

    follow:{
      color:colors.constant,
    },

    profileStat:{
      alignItems:'center'
    },


    number: {
      fontSize: 14,
      fontWeight: 900,

    },

    text: {
      fontSize: 12,
      color:colors.textSecondary
    },


    statContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '60%'
    }, 

    details:{
      flex:1,
      backgroundColor: colors.background,
      marginTop: 31,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 20

    },
    functionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 15,
      marginBottom: 30

    },

    function:{
      height: 86,
      width: 86,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.mainBackground,
      borderRadius: 16
    },

    notification: {
      backgroundColor: 'red',
      height: 20,
      width: 20,
      alignItems: 'center',
      justifyContent :'center',
      position: 'absolute',
      borderRadius: 15,
      top: 6,
      left: 25,
      zIndex: 100
    }
  })

  return(
    <SafeAreaView style={[styles.container, {flex:1}]}>
      <View style={styles.header}>
        <Image source={require('../../assets/backtrack.png')} style={{height: 20, width: 20}}/>
        <View style={styles.headerLeft}>
          <View style={styles.notification}>
              <Text style={{fontSize: 8, color: '#fff'}}>8</Text>
          </View>
          <TouchableOpacity style={styles.holder}>
            <Image source={require('../../assets/message.png')} style={{height: 20, width: 20}}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.holder}>
            <Image source={require('../../assets/settings.png')} style={{height: 20, width: 20}}/>
          </TouchableOpacity>
         
        </View>
      </View>
      <View style={styles.profileContainer}>
        <Image source={require('../../assets/profile.png')} style={{marginRight: 20}}/>
        <View>
          <Text style={styles.name}>Sebastian</Text>
          <Text style={styles.description}>BMW 3 Series/7 Series owner</Text>
        </View>
      </View>
      <View style={styles.profileStatContainer}>
        <TouchableOpacity style={styles.followBtn}>
          <Text style={styles.follow}>+ Follow</Text>
        </TouchableOpacity>
        <View style={styles.statContainer}>
          <TouchableOpacity style={styles.profileStat}>
            <Text style={styles.number}>47</Text>
            <Text style={styles.text}>Following</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileStat}>
            <Text style={styles.number}>8673</Text>
            <Text style={styles.text}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileStat}>
            <Text style={styles.number}>67</Text>
            <Text style={styles.text}>Posts</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      <View style={styles.details}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection:'row', alignItems:'center', width: '35%', justifyContent: 'space-between'}}>
            <Image source={require('../../assets/functions.png')}/>
            <Text>common Functions</Text>
          </View>
          <View style={styles.functionsContainer}>
            <TouchableOpacity style={styles.function}>
              <Image source={require('../../assets/order.png')} style={{marginVertical: 10}}/>
              <Text>My Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.function}>
              <Image source={require('../../assets/maintainance.png')} style={{marginVertical: 10}}/>
              <Text>Maintain</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.function}>
              <Image source={require('../../assets/autoparts.png')} style={{marginVertical: 10}}/>
              <Text>Auto Parts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.function}>
              <Image source={require('../../assets/driver.png')} style={{marginVertical: 10}}/>
              <Text>Driving Skills</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', width: '18%', justifyContent: 'space-between'}}>
            <Image source={require('../../assets/mycar.png')}/>
            <Text>My Cars</Text>
          </View>
          <TouchableOpacity style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center', paddingVertical: 20}}>
            <Text style={{fontSize: 14}}>Owned/Driven</Text>
            <Image source={require('../../assets/arrow.png')}/>
          </TouchableOpacity>
          <Image source={require('../../assets/Line60.png')} style={{width: '100%'}} tintColor={'#D1D1D6'}/>
          <TouchableOpacity style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center', paddingVertical: 20}}>
            <Text style={{fontSize: 14}}>Liked List</Text>
            <Image source={require('../../assets/arrow.png')}/>
          </TouchableOpacity>
          <View style={{flexDirection:'row', alignItems: 'center', width: '15%', justifyContent: 'space-between'}}>
            <Image source={require('../../assets/other.png')}/>
            <Text>Others</Text>
          </View>
          <TouchableOpacity style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center', paddingVertical: 20}}>
            <Text style={{fontSize: 14}}>Feedback</Text>
            <Image source={require('../../assets/arrow.png')}/>
          </TouchableOpacity>
          <Image source={require('../../assets/Line60.png')} style={{width: '100%'}} tintColor={'#D1D1D6'}/>
          <TouchableOpacity style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center', paddingVertical: 20}}>
            <Text style={{fontSize: 14, color: colors.constant}}>Log Out</Text>
          </TouchableOpacity>

    

     

     

       

         
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}