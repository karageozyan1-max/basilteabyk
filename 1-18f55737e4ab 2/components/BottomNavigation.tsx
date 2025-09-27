
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', icon: 'home-outline', route: '/' },
    { name: 'Shop', icon: 'storefront-outline', route: '/shop' },
    { name: 'Story', icon: 'book-outline', route: '/story' },
    { name: 'FAQ', icon: 'help-circle-outline', route: '/faq' },
    { name: 'Contact', icon: 'mail-outline', route: '/contact' },
  ];

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: colors.backgroundAlt,
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      boxShadow: '0px -2px 8px rgba(15, 61, 46, 0.1)',
      elevation: 8,
    }}>
      {navItems.map((item) => {
        const isActive = pathname === item.route;
        return (
          <TouchableOpacity
            key={item.route}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 8,
            }}
            onPress={() => router.push(item.route as any)}
          >
            <Icon 
              name={item.icon as any} 
              size={20} 
              color={isActive ? colors.primary : colors.grey} 
            />
            <Text style={[
              commonStyles.textSmall,
              { 
                marginTop: 4, 
                fontSize: 12,
                color: isActive ? colors.primary : colors.grey 
              }
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
