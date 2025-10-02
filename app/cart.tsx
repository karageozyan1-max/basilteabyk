'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { PRICES } from '../prices'; // adjust the path if prices.ts is in a different folder

export default function CartPage() {
  const [size, setSize] = useState<'8oz' | '12oz'>('8oz');
  const [pack, setPack] = useState<6 | 12>(6);
  const [qty, setQty] = useState<number>(1);

  // pull from your actual prices.ts
  const unitPrice = useMemo(() => PRICES[size][pack], [size, pack]);
  const subtotal = useMemo(() => round2(unitPrice * qty), [unitPrice, qty]);

  function addToCart() {
    alert(
      `Added to cart:\n${qty} × ${pack}-pack (${size})\nSubtotal: ${fmt(subtotal)}`
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <Image
            src="/basil-bottle.png"
            alt="Basil Bottle"
            width={72}
            height={72}
            style={{ flexShrink: 0 }}
          />
          <div style={{ minWidth: 0 }}>
            <h1 style={styles.title}>Basil Tea by K</h1>
            <p style={styles.subtitle}>Honey-infused basil tea in glass bottles</p>
          </div>
        </div>

        {/* Size selector */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Size</h2>
          <div style={styles.btnRow}>
            <SelectButton
              label="8 oz"
              selected={size === '8oz'}
              onClick={() => setSize('8oz')}
            />
            <SelectButton
              label="12 oz"
              selected={size === '12oz'}
              onClick={() => setSize('12oz')}
            />
          </div>
        </section>

        {/* Pack selector */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Pack</h2>
          <div style={styles.btnRow}>
            <SelectButton
              label="6-pack"
              selected={pack === 6}
              onClick={() => setPack(6)}
            />
            <SelectButton
              label="12-pack"
              selected={pack === 12}
              onClick={() => setPack(12)}
            />
          </div>
        </section>

        {/* Quantity */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Quantity</h2>
          <div style={styles.qtyRow}>
            <button
              type="button"
              style={styles.qtyBtn}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <div style={styles.qtyDisplay}>{qty}</div>
            <button
              type="button"
              style={styles.qtyBtn}
              onClick={() => setQty((q) => q + 1)}
            >
              +
            </button>
          </div>
        </section>

        {/* Price + Add to Cart */}
        <section style={styles.section}>
          <div style={styles.priceRow}>
            <div>
              <div style={styles.priceLabel}>Price</div>
              <div style={styles.priceValue}>{fmt(unitPrice)}</div>
              <div style={styles.note}>
                {pack}-pack • {size}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={styles.priceLabel}>Subtotal</div>
              <div style={styles.priceValue}>{fmt(subtotal)}</div>
            </div>
          </div>
          <button type="button" style={styles.primaryBtn} onClick={addToCart}>
            Add to Cart
          </button>
        </section>
      </div>
    </main>
  );
}

/* --- Components --- */
function SelectButton({
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
      style={{
        ...styles.choiceBtn,
        ...(selected ? styles.choiceBtnSelected : null),
      }}
    >
      {label}
    </button>
  );
}

/* --- Helpers --- */
function fmt(n: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);
}
function round2(n: number) {
  return Math.round(n * 100) / 100;
}

/* --- Styles --- */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100dvh',
    display: 'grid',
    placeItems: 'center',
    padding: '24px',
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
  headerRow: { display: 'flex', alignItems: 'center', gap: 14 },
  title: { margin: 0, fontSize: 20, fontWeight: 700 },
  subtitle: { margin: '4px 0 0 0', color: '#666', fontSize: 14 },
  section: { marginTop: 20 },
  sectionTitle: { margin: '0 0 10px 0', fontSize: 14, fontWeight: 600 },
  btnRow: { display: 'flex', flexWrap: 'wrap', gap: 10 },
  choiceBtn: {
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid #dcdcdc',
    background: '#fff',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  choiceBtnSelected: { borderColor: '#111', background: '#111', color: '#fff' },
  qtyRow: { display: 'flex', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    border: '1px solid #dcdcdc',
    background: '#fff',
    fontSize: 20,
    fontWeight: 700,
    cursor: 'pointer',
  },
  qtyDisplay: {
    minWidth: 44,
    height: 40,
    display: 'grid',
    placeItems: 'center',
    borderRadius: 10,
    border: '1px solid #dcdcdc',
    fontWeight: 700,
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  priceLabel: { fontSize: 12, color: '#666' },
  priceValue: { fontSize: 22, fontWeight: 800, marginTop: 2 },
  note: { fontSize: 12, color: '#888', marginTop: 2 },
  primaryBtn: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 12,
    border: 'none',
    background: '#111',
    color: '#fff',
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
  },
};
