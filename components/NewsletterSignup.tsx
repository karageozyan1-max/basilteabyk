
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface NewsletterSignupProps {
  showDiscount?: boolean;
}

export default function NewsletterSignup({ showDiscount = true }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    
    console.log('Newsletter signup:', email);
    setIsSubmitted(true);
    
    Alert.alert(
      'Success!', 
      showDiscount 
        ? 'Thank you for subscribing! Check your email for your 10% discount code.'
        : 'Thank you for subscribing to our newsletter!'
    );
  };

  if (isSubmitted) {
    return (
      <View style={[commonStyles.card, { alignItems: 'center', backgroundColor: colors.primary }]}>
        <Icon name="checkmark-circle" size={32} color={colors.textLight} style={{ marginBottom: 8 }} />
        <Text style={[commonStyles.textMedium, { color: colors.textLight, textAlign: 'center' }]}>
          Thank you for subscribing!
        </Text>
        {showDiscount && (
          <Text style={[commonStyles.textSmall, { color: colors.secondary, textAlign: 'center', marginTop: 4 }]}>
            Check your email for your discount code
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={[commonStyles.card, { backgroundColor: colors.primary }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Icon name="mail" size={24} color={colors.secondary} style={{ marginRight: 8 }} />
        <Text style={[commonStyles.textMedium, { color: colors.textLight, flex: 1 }]}>
          Join Our Newsletter
        </Text>
      </View>
      
      {showDiscount && (
        <Text style={[commonStyles.textSmall, { color: colors.secondary, marginBottom: 16 }]}>
          Get 10% off your first order plus wellness tips and exclusive offers
        </Text>
      )}
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: colors.secondary,
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            fontFamily: 'Inter_400Regular',
            backgroundColor: colors.textLight,
            color: colors.text,
            marginRight: 12
          }}
          value={email}
          onChangeText={setEmail}
          placeholder="your.email@example.com"
          placeholderTextColor={colors.grey}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TouchableOpacity
          style={[buttonStyles.secondary, { paddingHorizontal: 16, paddingVertical: 12 }]}
          onPress={handleSubmit}
        >
          <Text style={[commonStyles.buttonText, { fontSize: 14 }]}>Subscribe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
