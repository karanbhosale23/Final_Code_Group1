import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import Footer from "../../components/App_Components/Footer";
import { useLocalSearchParams, useRouter } from "expo-router";
import { isAuthenticated, getUserData, removeToken, UserData } from "../../utils/auth";

const TransactionPage = () => {
  
  const [activeTab, setActiveTab] = React.useState('transaction');
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const { username } = useLocalSearchParams<{ username?: string }>();
  const displayName = Array.isArray(username) ? username[0] : username;
  const router = useRouter();

  // Check authentication on component mount
  React.useEffect(() => {
    checkAuthAndLoadUser();
  }, []);

  const checkAuthAndLoadUser = async () => {
    try {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        // User is not authenticated, redirect to login
        router.replace("/Authentication/LogIn");
        return;
      }

      // Load user data
      const user = await getUserData();
      setUserData(user);
    } catch (error) {
      console.log("Auth check error:", error);
      router.replace("/Authentication/LogIn");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await removeToken();
      router.replace("/Authentication/LogIn");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleProfileNavigation = () => {
    router.push({
      pathname: "./Profile",
      params: { username: userData?.username || displayName || 'User' }
    });
  };

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome, {userData?.username || 'User'}!</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="code-slash" size={20} color="#fff" />
          <Ionicons name="settings-outline" size={20} color="#fff" />
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* User Section */}
      <View style={styles.userSection}>
        <TouchableOpacity style={styles.userInfo} onPress={handleProfileNavigation}>
          <Ionicons name="person-circle-outline" size={22} color="#000" />
          <Text style={styles.userName}>{userData?.username || 'User'}</Text>
        </TouchableOpacity>
        <View style={styles.userIcons}>
          <Ionicons name="notifications-outline" size={22} color="#000" />
          <Ionicons name="settings-outline" size={22} color="#000" />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'transaction' && styles.activeTab]}
          onPress={() => setActiveTab('transaction')}
        >
          <Text style={[styles.tabText, activeTab === 'transaction' && styles.activeTabText]}>
            Transaction Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'party' && styles.activeTab]}
          onPress={() => setActiveTab('party')}
        >
          <Text style={[styles.tabText, activeTab === 'party' && styles.activeTabText]}>
            Party Details
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Links Section */}
      <View style={styles.quickLinksContainer}>
        <Text style={styles.quickLinksTitle}>Quick Links</Text>
        <View style={styles.quickLinksGrid}>
          <TouchableOpacity style={styles.quickLinkItem}>
            <View style={styles.quickLinkIcon}>
              <Ionicons name="add-circle" size={24} color="#c6040a" />
            </View>
            <Text style={styles.quickLinkText}>Add Txn</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickLinkItem}>
            <View style={styles.quickLinkIcon}>
              <Ionicons name="settings" size={24} color="#666" />
            </View>
            <Text style={styles.quickLinkText}>Txn Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickLinkItem}>
            <View style={styles.quickLinkIcon}>
              <Ionicons name="apps" size={24} color="#4a90a4" />
            </View>
            <Text style={styles.quickLinkText}>Show All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* This area can be filled with transaction details or party details based on active tab */}
      </View>

      {/* Add New Sale Button */}
      <TouchableOpacity style={styles.addSaleButton}>
        <Text style={styles.addSaleText}>Add New Sale</Text>
      </TouchableOpacity>
      
      {/* Voice Button */}
      <TouchableOpacity style={styles.voiceButton}>
        <Ionicons name="mic" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3e4f4",
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#c6040a',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 40,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  logoutButton: {
    marginLeft: 10,
  },
  
  // User Section
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  userIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  // Tab Navigation
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(198, 4, 10, 0.1)',
    borderColor: '#c6040a',
    borderWidth: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    opacity: 0.6,
  },
  activeTabText: {
    color: '#c6040a',
    opacity: 1,
    fontWeight: '600',
  },
  
  // Quick Links Section
  quickLinksContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  quickLinksTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 15,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickLinkItem: {
    alignItems: 'center',
    width: 70,
  },
  quickLinkIcon: {
    width: 45,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  quickLinkText: {
    fontSize: 11,
    color: '#000',
    opacity: 0.8,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Main Content
  mainContent: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  
  // Add New Sale Button
  addSaleButton: {
    backgroundColor: '#c6040a',
    marginHorizontal: 80,
    marginRight: 100,
    marginBottom: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  addSaleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  
  // Voice Button
  voiceButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4a90a4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  
  // Bottom Navigation
  
});

export default TransactionPage;