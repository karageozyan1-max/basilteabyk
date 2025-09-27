
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import NewsletterSignup from '../components/NewsletterSignup';

export default function HomeScreen() {
  const router = useRouter();

  const benefits = [
    {
      icon: 'leaf-outline',
      title: 'Calming',
      description: 'Natural basil soothes your mind and body'
    },
    {
      icon: 'heart-outline',
      title: 'Lightly Sweet',
      description: 'Pure honey adds gentle sweetness'
    },
    {
      icon: 'checkmark-circle-outline',
      title: 'Natural Ingredients',
      description: 'No artificial flavors or preservatives'
    }
  ];

  const reviews = [
    {
      name: 'Sarah M.',
      rating: 5,
      text: 'This tea is absolutely divine! The perfect balance of basil and honey.'
    },
    {
      name: 'Michael R.',
      rating: 5,
      text: 'So refreshing and calming. I drink it every evening to unwind.'
    }
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Navigation Header */}
        <View style={[commonStyles.section, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10 }]}>
          <Text style={[commonStyles.heading, { color: colors.primary }]}>Basil Tea by K.</Text>
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Icon name="bag-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={commonStyles.heroSection}>
          <Text style={[commonStyles.title, { color: colors.textLight, fontSize: 36, marginBottom: 8 }]}>
            Basil Tea by K.
          </Text>
          <Text style={[commonStyles.subtitle, { color: colors.secondary, marginBottom: 24 }]}>
            Sip abundance. Feel balance.
          </Text>
          
          {/* Hero Product Image */}
          <Image
            source={require('../assets/images/a5103974-aee6-415a-9faa-72b606dfcdca.png')}
            style={commonStyles.productImage}
            resizeMode="cover"
          />
          
          <TouchableOpacity 
            style={[buttonStyles.secondary, { marginTop: 20 }]}
            onPress={() => router.push('/shop')}
          >
            <Text style={commonStyles.buttonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>

        {/* Benefits Section */}
        <View style={[commonStyles.section, { paddingVertical: 40 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 32 }]}>
            Why You&apos;ll Love It
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {benefits.map((benefit, index) => (
              <View key={index} style={[commonStyles.benefitCard, { width: '30%', minWidth: 100 }]}>
                <Icon 
                  name={benefit.icon as any} 
                  size={32} 
                  color={colors.primary} 
                  style={{ marginBottom: 12 }}
                />
                <Text style={[commonStyles.textMedium, { textAlign: 'center', marginBottom: 8 }]}>
                  {benefit.title}
                </Text>
                <Text style={[commonStyles.textSmall, { textAlign: 'center' }]}>
                  {benefit.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Newsletter Signup */}
        <View style={[commonStyles.section, { paddingVertical: 20 }]}>
          <NewsletterSignup showDiscount={true} />
        </View>

        {/* Our Story Section */}
        <View style={[commonStyles.section, { backgroundColor: colors.backgroundAlt, paddingVertical: 40 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>
            Our Story
          </Text>
          <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 16 }]}>
            Born from a passion for wellness and natural ingredients, Basil Tea by K. combines the 
            soothing properties of fresh basil with the gentle sweetness of pure honey.
          </Text>
          <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 24 }]}>
            Each bottle is crafted with care, using only the finest basil leaves and natural honey 
            to create a refreshing drink that nourishes both body and soul.
          </Text>
          
          <TouchableOpacity 
            style={buttonStyles.outline}
            onPress={() => router.push('/story')}
          >
            <Text style={commonStyles.buttonTextDark}>Learn More</Text>
          </TouchableOpacity>
        </View>

        {/* Reviews Section */}
        <View style={[commonStyles.section, { paddingVertical: 40 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 32 }]}>
            What Our Customers Say
          </Text>
          
          {reviews.map((review, index) => (
            <View key={index} style={[commonStyles.card, { marginBottom: 16 }]}>
              <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                {[...Array(review.rating)].map((_, i) => (
                  <Icon key={i} name="star" size={16} color={colors.secondary} />
                ))}
              </View>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>
                &quot;{review.text}&quot;
              </Text>
              <Text style={commonStyles.textSmall}>
                - {review.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Final CTA */}
        <View style={[commonStyles.section, { paddingVertical: 40, alignItems: 'center' }]}>
          <Text style={[commonStyles.heading, { textAlign: 'center', marginBottom: 20 }]}>
            Ready to Experience Balance?
          </Text>
          
          <TouchableOpacity 
            style={[buttonStyles.primary, { width: '100%', maxWidth: 300 }]}
            onPress={() => router.push('/shop')}
          >
            <Text style={commonStyles.buttonText}>Shop Basil Tea</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing for Navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
