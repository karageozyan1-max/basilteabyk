
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

export default function StoryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.section, { flexDirection: 'row', alignItems: 'center', paddingTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.heading, { flex: 1 }]}>Our Story</Text>
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Icon name="bag-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Hero Image */}
        <View style={[commonStyles.section, { alignItems: 'center', paddingVertical: 20 }]}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop' }}
            style={{ width: '100%', height: 200, borderRadius: 12 }}
            resizeMode="cover"
          />
        </View>

        {/* Story Content */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.title, { textAlign: 'left', marginBottom: 24 }]}>
            Why Basil + Honey?
          </Text>
          
          <Text style={[commonStyles.text, { marginBottom: 20 }]}>
            It all started in my grandmother&apos;s garden, where rows of fragrant basil grew alongside 
            wildflowers that attracted the most industrious bees. She would brew fresh basil tea 
            and sweeten it with honey from her own hives, creating a drink that was both soothing 
            and energizing.
          </Text>

          <Text style={[commonStyles.text, { marginBottom: 20 }]}>
            Years later, during a particularly stressful period in my life, I remembered that 
            simple ritual. The way the steam would rise from the cup, carrying with it the 
            promise of calm. The gentle sweetness that reminded me to slow down and savor 
            the moment.
          </Text>

          <Text style={[commonStyles.text, { marginBottom: 32 }]}>
            That&apos;s when Basil Tea by K. was born—from a desire to share this feeling of 
            balance and abundance with others who need a moment of peace in their busy lives.
          </Text>
        </View>

        {/* Values Section */}
        <View style={[commonStyles.section, { backgroundColor: colors.backgroundAlt, paddingVertical: 40 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 24 }]}>Our Values</Text>
          
          <View style={[commonStyles.card, { marginBottom: 16 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Icon name="leaf" size={24} color={colors.primary} style={{ marginRight: 12 }} />
              <Text style={commonStyles.textMedium}>Natural Ingredients</Text>
            </View>
            <Text style={commonStyles.text}>
              We source only the finest basil leaves and pure honey, never compromising on quality 
              or adding artificial ingredients.
            </Text>
          </View>

          <View style={[commonStyles.card, { marginBottom: 16 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Icon name="heart" size={24} color={colors.primary} style={{ marginRight: 12 }} />
              <Text style={commonStyles.textMedium}>Mindful Crafting</Text>
            </View>
            <Text style={commonStyles.text}>
              Each batch is carefully prepared with attention to detail, ensuring every bottle 
              delivers the perfect balance of flavor and wellness.
            </Text>
          </View>

          <View style={[commonStyles.card, { marginBottom: 16 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Icon name="earth" size={24} color={colors.primary} style={{ marginRight: 12 }} />
              <Text style={commonStyles.textMedium}>Sustainable Sourcing</Text>
            </View>
            <Text style={commonStyles.text}>
              We work with local farmers and beekeepers who share our commitment to sustainable, 
              ethical practices.
            </Text>
          </View>
        </View>

        {/* Sourcing Section */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>Our Sourcing</Text>
          
          <Text style={[commonStyles.text, { marginBottom: 16 }]}>
            Our basil comes from organic farms in California&apos;s Central Valley, where the 
            Mediterranean climate creates ideal growing conditions. The leaves are harvested 
            at peak freshness and processed within hours to preserve their essential oils 
            and aromatic compounds.
          </Text>

          <Text style={[commonStyles.text, { marginBottom: 16 }]}>
            The honey we use is sourced from small-scale beekeepers who practice sustainable 
            hive management. This raw, unfiltered honey retains all its natural enzymes and 
            minerals, adding not just sweetness but genuine nutritional value to every bottle.
          </Text>

          <Text style={[commonStyles.text, { marginBottom: 32 }]}>
            Every ingredient is carefully selected and tested to ensure it meets our high 
            standards for purity, flavor, and wellness benefits.
          </Text>
        </View>

        {/* Image Gallery */}
        <View style={[commonStyles.section, { paddingVertical: 20 }]}>
          <Text style={[commonStyles.heading, { marginBottom: 20 }]}>From Farm to Bottle</Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=180&h=180&fit=crop' }}
              style={{ width: '48%', height: 120, borderRadius: 8, marginBottom: 12 }}
              resizeMode="cover"
            />
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=180&h=180&fit=crop' }}
              style={{ width: '48%', height: 120, borderRadius: 8, marginBottom: 12 }}
              resizeMode="cover"
            />
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=180&h=180&fit=crop' }}
              style={{ width: '48%', height: 120, borderRadius: 8, marginBottom: 12 }}
              resizeMode="cover"
            />
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=180&h=180&fit=crop' }}
              style={{ width: '48%', height: 120, borderRadius: 8, marginBottom: 12 }}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* CTA Section */}
        <View style={[commonStyles.section, { paddingVertical: 40, alignItems: 'center' }]}>
          <Text style={[commonStyles.heading, { textAlign: 'center', marginBottom: 16 }]}>
            Experience Our Story
          </Text>
          <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 24 }]}>
            Every sip connects you to our journey of wellness, balance, and natural goodness.
          </Text>
          
          <TouchableOpacity 
            style={[buttonStyles.primary, { width: '100%', maxWidth: 300 }]}
            onPress={() => router.push('/shop')}
          >
            <Text style={commonStyles.buttonText}>Try Basil Tea</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing for Navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
