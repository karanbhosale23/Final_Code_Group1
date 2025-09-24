import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Footer() {
    return (
        <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} color="#c6040a" />
          <Text style={[styles.navText, styles.activeNavText]}>HOME</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bar-chart" size={22} color="#000" style={{opacity: 0.7}} />
          <Text style={styles.navText}>DASHBOARD</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cube" size={22} color="#000" style={{opacity: 0.7}} />
          <Text style={styles.navText}>ITEMS</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="menu" size={22} color="#000" style={{opacity: 0.7}} />
          <Text style={styles.navText}>MENU</Text>
        </TouchableOpacity>
      </View>
    )
}   

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
      },
      navItem: {
        flex: 1,
        alignItems: 'center',
      },
      navText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#000',
        opacity: 0.7,
      },
      activeNavText: {
        color: '#c6040a',
        opacity: 1,
      },
})