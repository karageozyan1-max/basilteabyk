'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { SIZE_PRICES } from '../../prices'; // adjust if prices.ts is in a different folder

type SizeKey = '8oz' | '12oz';
type PackKey = 6 | 12;

export default function CartPage() {
  const searchParams = useSearchParams();

  // read size/pack from query params passed from shop
  const size = (searchParams.get('size') as SizeKey) || '8oz';
  const pack = (parseInt(searchParams.get('pack') || '6', 10) as PackKey) || 6;

  const unitPrice = useMemo(() => SIZE_PRICES[size][pack], [size, pack]);

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.headerRow}>
          <Image
            src="/basil-bottle.png"
            alt="Basil Bottle"
            width={72}
            height={72}
            priority
          />
          <div>
            <h1 style={styles.title}>Your Cart</h1>
            <p style={styles.subtitle}>
              {pack}-pack • {size} Basil Tea Bottle
            </p>
          </div>
        </div>

        {/* Price */}
        <section style={styles.section}>
          <div style={styles.priceRow}>
            <div>
              <div style={styles.priceLabel}>Price</div>
              <div style={styles.priceValue}>${unitPrice.toFixed(2)}</div>
            </div>
          </div>
        </section>

        {/* Checkout button */}
        <section style={styles.section}>
          <button type="button" style={styles.primaryBtn}>
            Proceed to Checkout
          </button>
        </section>
      </div>
    </main>
  );
}

/* ---------- styles ---------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100dvh',
    display: 'grid',
    placeItems: 'center',
    padding: 24,
    background: '#fafafa',
  },
  card: {
    width: '100%',
    maxWidth: 720,
    background: '#fff',
    border: '1px solid #e8e8e8',
    borderRadius: 14,
    padding: 20,
    boxShadow: '0 4px 18px rgba(0,0,0,0.05)',
  },
  headerRow: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 },
  title: { margin: 0, fontSize: 22, fontWeight: 800, lineHeight: 1.2 },
  subtitle: { margin: '4px 0 0 0', color: '#666', fontSize: 14 },

  section: { marginTop: 20 },

  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 12,
  },
  priceLabel: { fontSize: 12, color: '#666' },
  priceValue: { fontSize: 22, fontWeight: 800, marginTop: 2 },

  primaryBtn: {
    width: '100%',
    padding: '12px 14px', // slightly smaller
    borderRadius: 10,
    border: 'none',
    background: '#111',
    color: '#fff',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
  },
};
