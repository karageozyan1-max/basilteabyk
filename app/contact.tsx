
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

import { FontAwesome6 } from '@expo/vector-icons';
import { Linking } from 'react-native';

export default function ContactScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    
    console.log('Contact form submitted:', formData);
    Alert.alert(
      'Message Sent!', 
      'Thank you for reaching out. We\'ll get back to you within 24 hours.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.section, { flexDirection: 'row', alignItems: 'center', paddingTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.heading, { flex: 1 }]}>Contact Us</Text>
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Icon name="bag-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>
            Get in Touch
          </Text>
          
          <Text style={[commonStyles.text, { marginBottom: 24 }]}>
            We would love to hear from you! Whether you have questions about our tea, 
            need help with an order, or just want to share your experience, we are here to help.
          </Text>

          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Icon name="mail" size={20} color={colors.primary} style={{ marginRight: 12 }} />
              <Text style={commonStyles.textMedium}>Email</Text>
            </View>
            <Text style={commonStyles.text}>basilteabyk@gmail.com</Text>
          </View>

          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Icon name="time" size={20} color={colors.primary} style={{ marginRight: 12 }} />
              <Text style={commonStyles.textMedium}>Response Time</Text>
            </View>
            <Text style={commonStyles.text}>We typically respond within 24 hours</Text>
          </View>

          <View style={[commonStyles.card, { marginBottom: 32 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Icon name="location" size={20} color={colors.primary} style={{ marginRight: 12 }} />
              <Text style={commonStyles.textMedium}>Based in</Text>
            </View>
            <Text style={commonStyles.text}>California, USA</Text>
          </View>
        </View>

        {/* Contact Form */}
        <View style={[commonStyles.section, { backgroundColor: colors.backgroundAlt, paddingVertical: 40 }]}>
          <Text style={[commonStyles.heading, { marginBottom: 24 }]}>
            Send us a Message
          </Text>

          <View style={{ marginBottom: 20 }}>
            <Text style={[commonStyles.textMedium, { marginBottom: 8 }]}>
              Name *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                fontFamily: 'Inter_400Regular',
                backgroundColor: colors.card,
                color: colors.text
              }}
              value={formData.name}
              onChangeText={(text) => updateFormData('name', text)}
              placeholder="Your full name"
              placeholderTextColor={colors.grey}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={[commonStyles.textMedium, { marginBottom: 8 }]}>
              Email *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                fontFamily: 'Inter_400Regular',
                backgroundColor: colors.card,
                color: colors.text
              }}
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              placeholder="your.email@example.com"
              placeholderTextColor={colors.grey}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={[commonStyles.textMedium, { marginBottom: 8 }]}>
              Subject
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                fontFamily: 'Inter_400Regular',
                backgroundColor: colors.card,
                color: colors.text
              }}
              value={formData.subject}
              onChangeText={(text) => updateFormData('subject', text)}
              placeholder="What's this about?"
              placeholderTextColor={colors.grey}
            />
          </View>

          <View style={{ marginBottom: 32 }}>
            <Text style={[commonStyles.textMedium, { marginBottom: 8 }]}>
              Message *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                fontFamily: 'Inter_400Regular',
                backgroundColor: colors.card,
                color: colors.text,
                height: 120,
                textAlignVertical: 'top'
              }}
              value={formData.message}
              onChangeText={(text) => updateFormData('message', text)}
              placeholder="Tell us how we can help you..."
              placeholderTextColor={colors.grey}
              multiline
              numberOfLines={5}
            />
          </View>

          <TouchableOpacity style={buttonStyles.primary} onPress={handleSubmit}>
            <Text style={commonStyles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* Social Media */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.heading, { marginBottom: 20 }]}>
            Follow Us
          </Text>
          
          <Text style={[commonStyles.text, { marginBottom: 24 }]}>
            Stay connected for updates, wellness tips, and behind-the-scenes content.
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                padding: 16,
                borderRadius: 12,
                backgroundColor: colors.card,
                flex: 1,
                marginRight: 8,
                boxShadow: '0px 2px 8px rgba(15, 61, 46, 0.1)',
                elevation: 2
              }}
              onPress={() => Linking.openURL('https://www.instagram.com/basilteabyk/')}
            >
              <FontAwesome6 name="instagram" size={24} color={colors.primary} />
              <Text style={[commonStyles.textSmall, { marginTop: 8 }]}>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                padding: 16,
                borderRadius: 12,
                backgroundColor: colors.card,
                flex: 1,
                marginHorizontal: 4,
                boxShadow: '0px 2px 8px rgba(15, 61, 46, 0.1)',
                elevation: 2
              }}
              onPress={() => console.log('Facebook pressed')}
            >
              <Icon name="logo-facebook" size={24} color={colors.primary} />
              <Text style={[commonStyles.textSmall, { marginTop: 8 }]}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                padding: 16,
                borderRadius: 12,
                backgroundColor: colors.card,
                flex: 1,
                marginLeft: 8,
                boxShadow: '0px 2px 8px rgba(15, 61, 46, 0.1)',
                elevation: 2
              }}
              onPress={() => Linking.openURL('https://www.tiktok.com/@basilteabyk.com')}
            >
              <FontAwesome6 name="tiktok" size={24} color={colors.primary} />
              <Text style={[commonStyles.textSmall, { marginTop: 8 }]}>TikTok</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing for Navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
