
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

export default function FAQScreen() {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: 'Product',
      questions: [
        {
          question: 'What ingredients are in Basil Tea with Honey?',
          answer: 'Our tea contains basil leaves, purified water, natural honey, and a trace of lemon essence. We use no artificial flavors, colors, or preservatives.'
        },
        {
          question: 'Is the tea caffeinated?',
          answer: 'No, our basil tea is naturally caffeine-free, making it perfect for any time of day or evening relaxation.'
        },
        {
          question: 'How should I serve the tea?',
          answer: 'Shake well before serving. Enjoy chilled over ice for a refreshing drink, or warm gently for a cozy experience. Do not boil.'
        },
        {
          question: 'What does it taste like?',
          answer: 'Our tea has a unique, refreshing flavor with herbal notes from the basil and gentle sweetness from natural honey. It&apos;s smooth, calming, and lightly sweet.'
        }
      ]
    },
    {
      category: 'Storage & Shelf Life',
      questions: [
        {
          question: 'How should I store the tea?',
          answer: 'Keep refrigerated at all times. Once opened, consume within 7 days for best quality and taste.'
        },
        {
          question: 'What is the shelf life?',
          answer: 'Unopened bottles have a shelf life of 6 months when properly refrigerated. Check the expiration date on each bottle.'
        },
        {
          question: 'Can I freeze the tea?',
          answer: 'We dont recommend freezing as it may affect the texture and flavor. Refrigeration is the best storage method.'
        }
      ]
    },
    {
      category: 'Shipping & Returns',
      questions: [
        {
          question: 'How much does shipping cost?',
          answer: 'We offer free shipping on orders over $25. For orders under $25, shipping is $4.99 within the continental US.'
        },
        {
          question: 'How long does shipping take?',
          answer: 'Orders typically arrive within 3-5 business days. We ship Monday through Friday and provide tracking information.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Currently, we only ship within the United States. We are working on expanding to international shipping soon.'
        },
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day satisfaction guarantee. If you are not completely happy with your purchase, contact us for a full refund.'
        },
        {
          question: 'How do I track my order?',
          answer: 'Youll receive a tracking number via email once your order ships. You can use this to track your package on our website or the carriers site.'
        }
      ]
    },
    {
      category: 'Health & Allergens',
      questions: [
        {
          question: 'Are there any allergens in the tea?',
          answer: 'Our tea contains honey, which may not be suitable for infants under 12 months. Its gluten-free and contains no nuts, dairy, or soy.'
        },
        {
          question: 'Is it safe during pregnancy?',
          answer: 'While our ingredients are natural, we recommend consulting with your healthcare provider before consuming during pregnancy or breastfeeding.'
        },
        {
          question: 'Can children drink this tea?',
          answer: 'Yes, children over 12 months can enjoy our tea. However, due to the honey content, its not suitable for infants under 12 months.'
        },
        {
          question: 'Are there any health benefits?',
          answer: 'Basil is traditionally known for its calming properties, and honey provides natural antioxidants. However, our tea is intended as a refreshing beverage, not as a medical treatment.'
        }
      ]
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.section, { flexDirection: 'row', alignItems: 'center', paddingTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.heading, { flex: 1 }]}>FAQ</Text>
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Icon name="bag-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* FAQ Content */}
        {faqs.map((category, categoryIndex) => (
          <View key={categoryIndex} style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { marginBottom: 20, fontSize: 20 }]}>
              {category.category}
            </Text>
            
            {category.questions.map((faq, faqIndex) => {
              const currentIndex = questionIndex++;
              const isExpanded = expandedIndex === currentIndex;
              
              return (
                <TouchableOpacity
                  key={faqIndex}
                  style={[
                    commonStyles.card,
                    { marginBottom: 12, paddingVertical: 16 }
                  ]}
                  onPress={() => toggleExpanded(currentIndex)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[commonStyles.textMedium, { flex: 1, marginRight: 12 }]}>
                      {faq.question}
                    </Text>
                    <Icon 
                      name={isExpanded ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color={colors.primary} 
                    />
                  </View>
                  
                  {isExpanded && (
                    <Text style={[commonStyles.text, { marginTop: 12, color: colors.grey }]}>
                      {faq.answer}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {/* Contact Section */}
        <View style={[commonStyles.section, { backgroundColor: colors.backgroundAlt, paddingVertical: 40 }]}>
          <Text style={[commonStyles.heading, { textAlign: 'center', marginBottom: 16 }]}>
            Still Have Questions?
          </Text>
          <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 24 }]}>
            We are here to help! Reach out to us and we will get back to you as soon as possible.
          </Text>
          
          <TouchableOpacity 
            style={[buttonStyles.primary, { alignSelf: 'center', paddingHorizontal: 32 }]}
            onPress={() => router.push('/contact')}
          >
            <Text style={commonStyles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing for Navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
