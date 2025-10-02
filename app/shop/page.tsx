'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SIZE_PRICES } from '../../prices'; // adjust path if prices.ts is elsewhere

type SizeKey = '8oz' | '12oz';
type PackKey = 6 | 12;

export default function ShopPage() {
  const router = useRouter();

  const [size, setSize] = useState<SizeKey>('8oz');
  const [pack, setPack] = useState<PackKey>(6);

  const unitPrice = useMemo(() => SIZE_PRICES[size][pack], [size, pack]);

  function goToCart() {
    const params = new URLSearchParams({ size, pack: String(pack) });
    router.push(`/cart?${params.toString()}`);
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.headerRow}>
          <Image
            src="/basil-bottle.png"
            alt="Basil Bottle"
            width={80}
            height={80}
            priority
          />
          <div>
            <h1 style={styles.title}>Shop — Basil Tea by K</h1>
            <p style={styles.subtitle}>Honey-infused basil tea in glass bottles</p>
          </div>
        </div>

        {/* Size */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Size</h2>
          <div style={styles.btnRow}>
            <Choice label="8 oz" selected={size === '8oz'} onClick={() => setSize('8oz')} />
            <Choice label="12 oz" selected={size === '12oz'} onClick={() => setSize('12oz')} />
          </div>
        </section>

        {/* Pack */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Pack</h2>
          <div style={styles.btnRow}>
            <Choice label="6-pack" selected={pack === 6} onClick={() => setPack(6)} />
            <Choice label="12-pack" selected={pack === 12} onClick={() => setPack(12)} />
          </div>
        </section>

        {/* Price + CTA */}
        <section style={styles.section}>
          <div style={styles.priceRow}>
            <div>
              <div style={styles.priceLabel}>Price</div>
              <div style={styles.priceValue}>${unitPrice.toFixed(2)}</div>
              <div style={styles.note}>{pack}-pack • {size}</div>
            </div>
          </div>

          <button type="button" style={styles.primaryBtn} onClick={goToCart}>
            Add to Cart
          </button>
        </section>
      </div>

      <style>{responsiveCss}</style>
    </main>
  );
}

function Choice({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        ...styles.choiceBtn,
        ...(selected ? styles.choiceBtnSelected : null),
      }}
    >
      <span
        style={{
          ...styles.choiceText,
          ...(selected ? styles.choiceTextSelected : null),
        }}
      >
        {label}
      </span>
    </button>
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
  sectionTitle: { margin: '0 0 10px 0', fontSize: 14, fontWeight: 700 },

  btnRow: { display: 'flex', flexWrap: 'wrap', gap: 10 },

  choiceBtn: {
    padding: '8px 12px',           // smaller than before
    borderRadius: 8,
    border: '1px solid #dcdcdc',
    background: '#fff',
    cursor: 'pointer',
    flex: '0 0 auto',
    width: '48%',                  // neat 2 per row on phones
    textAlign: 'center',
  },
  choiceBtnSelected: { background: '#111', borderColor: '#111' },
  choiceText: { fontSize: 13, fontWeight: 600, color: '#111' },
  choiceTextSelected: { color: '#fff' },

  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 12,
  },
  priceLabel: { fontSize: 12, color: '#666' },
  priceValue: { fontSize: 22, fontWeight: 800, marginTop: 2 },
  note: { fontSize: 12, color: '#888', marginTop: 2 },

  primaryBtn: {
    width: '100%',
    padding: '12px 14px',          // smaller button
    borderRadius: 10,
    border: 'none',
    background: '#111',
    color: '#fff',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
  },
};

const responsiveCss = `
  @media (max-width: 420px) {
    h1 { font-size: 18px !important; }
  }
`;
