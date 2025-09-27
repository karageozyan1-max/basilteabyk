
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#0F3D2E',      // Deep green
  secondary: '#C7A66B',    // Tea-gold
  accent: '#C7A66B',       // Tea-gold
  background: '#F3EDE3',   // Cream
  backgroundAlt: '#FFFFFF', // White
  text: '#1E1E1E',         // Charcoal
  textLight: '#FFFFFF',    // White text
  grey: '#8A8A8A',         // Medium grey
  card: '#FFFFFF',         // White card background
  border: '#E5E5E5',       // Light border
};

export const fonts = {
  serif: 'PlayfairDisplay_400Regular',
  serifBold: 'PlayfairDisplay_700Bold',
  sansSerif: 'Inter_400Regular',
  sansSerifMedium: 'Inter_500Medium',
  sansSerifBold: 'Inter_600SemiBold',
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.serifBold,
    textAlign: 'center',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: fonts.serif,
    textAlign: 'center',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 32,
  },
  heading: {
    fontSize: 20,
    fontFamily: fonts.serifBold,
    color: colors.text,
    marginBottom: 8,
    lineHeight: 28,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.sansSerif,
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  textMedium: {
    fontSize: 16,
    fontFamily: fonts.sansSerifMedium,
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  textSmall: {
    fontSize: 14,
    fontFamily: fonts.sansSerif,
    color: colors.grey,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    boxShadow: '0px 4px 12px rgba(15, 61, 46, 0.1)',
    elevation: 3,
  },
  heroSection: {
    backgroundColor: colors.primary,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  benefitCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    margin: 8,
    alignItems: 'center',
    flex: 1,
    minHeight: 160,
    boxShadow: '0px 4px 12px rgba(15, 61, 46, 0.08)',
    elevation: 2,
  },
  productImage: {
    width: 280,
    height: 280,
    borderRadius: 12,
    marginBottom: 20,
  },
  priceText: {
    fontSize: 28,
    fontFamily: fonts.serifBold,
    color: colors.primary,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.sansSerifBold,
    color: colors.textLight,
  },
  buttonTextDark: {
    fontSize: 16,
    fontFamily: fonts.sansSerifBold,
    color: colors.primary,
  },
});
