
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

export default function ShopScreen() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('16oz');
  
  const price = selectedSize === '16oz' ? 12.99 : 19.99;
  
  const sizes = [
    { label: '16oz Bottle', value: '16oz', price: 12.99 },
    { label: '32oz Bottle', value: '32oz', price: 19.99 }
  ];

  const faqs = [
    {
      question: 'How should I store the tea?',
      answer: 'Keep refrigerated and consume within 7 days of opening. Shake well before serving.'
    },
    {
      question: 'Is this tea caffeinated?',
      answer: 'No, our basil tea is naturally caffeine-free, making it perfect for any time of day.'
    },
    {
      question: 'What are the ingredients?',
      answer: 'Basil leaves, purified water, natural honey, lemon essence (trace). Nothing artificial.'
    }
  ];

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${selectedSize} Basil Tea to cart`);
    // In a real app, this would add to cart state/context
    alert(`Added ${quantity} x ${selectedSize} Basil Tea with Honey to cart!`);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.section, { flexDirection: 'row', alignItems: 'center', paddingTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.heading, { flex: 1 }]}>Shop</Text>
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Icon name="bag-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={[commonStyles.section, { alignItems: 'center', paddingVertical: 20 }]}>
          <Image
            source={require('../assets/images/a5103974-aee6-415a-9faa-72b606dfcdca.png')}
            style={[commonStyles.productImage, { width: 320, height: 320 }]}
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Basil Tea with Honey</Text>
          <Text style={commonStyles.priceText}>${price.toFixed(2)}</Text>
          
          <Text style={[commonStyles.text, { marginBottom: 20 }]}>
            A refreshing blend of basil tea infused with natural honey—smooth, lightly sweet, and calming.
          </Text>

          {/* Size Selection */}
          <Text style={[commonStyles.textMedium, { marginBottom: 12 }]}>Size:</Text>
          <View style={{ flexDirection: 'row', marginBottom: 24 }}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size.value}
                style={[
                  {
                    flex: 1,
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: selectedSize === size.value ? colors.primary : colors.border,
                    backgroundColor: selectedSize === size.value ? colors.primary : colors.backgroundAlt,
                    marginRight: 8,
                    alignItems: 'center'
                  }
                ]}
                onPress={() => setSelectedSize(size.value)}
              >
                <Text style={[
                  commonStyles.textMedium,
                  { color: selectedSize === size.value ? colors.textLight : colors.text }
                ]}>
                  {size.label}
                </Text>
                <Text style={[
                  commonStyles.textSmall,
                  { color: selectedSize === size.value ? colors.textLight : colors.grey }
                ]}>
                  ${size.price.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity Selection */}
          <Text style={[commonStyles.textMedium, { marginBottom: 12 }]}>Quantity:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.border,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Icon name="remove" size={20} color={colors.text} />
            </TouchableOpacity>
            
            <Text style={[commonStyles.textMedium, { marginHorizontal: 20, minWidth: 30, textAlign: 'center' }]}>
              {quantity}
            </Text>
            
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Icon name="add" size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity style={buttonStyles.primary} onPress={handleAddToCart}>
            <Text style={commonStyles.buttonText}>
              Add to Cart - ${(price * quantity).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={[commonStyles.section, { paddingTop: 40 }]}>
          <Text style={[commonStyles.heading, { marginBottom: 16 }]}>Ingredients</Text>
          <Text style={commonStyles.text}>
            Basil leaves, purified water, natural honey, lemon essence (trace), nothing artificial.
          </Text>
        </View>

        <View style={commonStyles.section}>
          <Text style={[commonStyles.heading, { marginBottom: 16 }]}>Benefits</Text>
          <Text style={commonStyles.text}>
            • Soothing aroma from fresh basil leaves{'\n'}
            • Gentle sweetness from pure honey{'\n'}
            • Feel-good balance for mind and body{'\n'}
            • No artificial flavors or preservatives
          </Text>
        </View>

        <View style={commonStyles.section}>
          <Text style={[commonStyles.heading, { marginBottom: 16 }]}>Brewing & Serving</Text>
          <Text style={commonStyles.text}>
            Chill and sip over ice for a refreshing treat, or warm gently for a cozy experience. 
            Always shake well before serving to ensure the perfect blend of flavors.
          </Text>
        </View>

        {/* FAQs */}
        <View style={[commonStyles.section, { paddingTop: 40 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 24 }]}>Frequently Asked Questions</Text>
          
          {faqs.map((faq, index) => (
            <View key={index} style={[commonStyles.card, { marginBottom: 16 }]}>
              <Text style={[commonStyles.textMedium, { marginBottom: 8 }]}>
                {faq.question}
              </Text>
              <Text style={commonStyles.text}>
                {faq.answer}
              </Text>
            </View>
          ))}
        </View>

        {/* Bottom Spacing for Navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
