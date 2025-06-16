import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';

import {StyledText} from '@/components/StyledText';
import WithNavbar from "@/components/ui/NavIconBar";
import {AuthContext} from "@/context/AuthContext";
import { useRouter} from "expo-router";




const profileImage = require('@/assets/images/calendar.png'); // Adjust the path as necessary


export default WithNavbar(function Settings() {
  const pp= "https://cdn.jsdelivr.net/gh/eyezkes/Avatars@main/bitmojis/female/young/32261991.png"
  const { logout } = React.useContext(AuthContext);
  let router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/auth")
  }
  console.log(pp)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Avatar and Title */}
        <View style={styles.header}>
  <Image source={{uri : pp}} style={{ width: 64, height: 64, borderRadius: 32 }} />
          <StyledText style={styles.title}>Edit Profile</StyledText>
        </View>

        {/* Menu Items */}
        <View style={styles.menuItem}>
          <MaterialIcons name="email" size={24} color="#2AA7A1" />
          <StyledText style={styles.menuStyledText}>Change Email</StyledText>
        </View>

        <View style={styles.menuItem}>
          <FontAwesome5 name="lock" size={22} color="#2AA7A1" />
          <StyledText style={styles.menuStyledText}>Change Password</StyledText>
        </View>

        <View style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={24} color="#2AA7A1" />
          <StyledText style={styles.menuStyledText}>Notification Settings</StyledText>
        </View>

        <View style={styles.menuItem}>
          <Entypo name="emoji-happy" size={24} color="#2AA7A1" />
          <StyledText style={styles.menuStyledText}>Mood Settings</StyledText>
        </View>

        <View style={styles.menuItem}>
          <AntDesign name="calendar" size={24} color="#2AA7A1" />
          <StyledText style={styles.menuStyledText}>Calendar Settings</StyledText>
        </View>

        {/* Logout */}
        <View style={[styles.menuItem, styles.logoutRow, { marginTop: 20 }]}>
          <MaterialIcons name="logout" size={24} color="#2AA7A1" />
          <TouchableOpacity onPress={handleLogout} ><StyledText style={styles.menuStyledText}>Log Out</StyledText></TouchableOpacity>
          {/**/}
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
}, 4)

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#FFF6EF',
    height: Dimensions.get('window').height - 100,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    color: '#2AA7A1',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  menuStyledText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#2AA7A1',
    fontWeight: '500',
  },
    logoutRow: {
    justifyContent: 'center',
    borderBottomWidth: 0,
    marginRight: 25,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    backgroundColor: '#FFF6EF',
  },
  activeNav: {
    width: 40,
    height: 40,
    backgroundColor: '#2AA7A1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
