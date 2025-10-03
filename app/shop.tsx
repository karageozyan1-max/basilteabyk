return (
  <SafeAreaView style={{ flex: 1, backgroundColor: BG_CREAM }}>
    <ScrollView
      contentContainerStyle={{
        padding: 18,
        paddingBottom: 100, // ⬅️ gives space so footer doesn’t cover last content
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Top-right cart button */}
      <View style={styles.card}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.headerCartBtn}
            onPress={() => router.push('/cart')}
          >
            <Text style={{ color: GREEN, fontWeight: '700' }}>Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero image + short text */}
      <View style={styles.heroRow}>
        <Image
          source={require('../assets/images/basil-bottle.png')}
          style={styles.heroImage}
          resizeMode="contain"
        />
        <View style={styles.heroText}>
          <Text style={styles.title}>Basil Tea by K</Text>
          <Text style={styles.subtitle}>Honey-infused basil tea in glass bottles</Text>
          <Text style={styles.desc}>
            Lightly sweet and refreshing. Real basil brewed in small batches, balanced with honey.
          </Text>
        </View>
      </View>

      {/* Size / Pack / Quantity sections here */}
      {/* ... keep your existing code */}
    </ScrollView>
  </SafeAreaView>
);
