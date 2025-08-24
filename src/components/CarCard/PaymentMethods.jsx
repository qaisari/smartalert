import React, { useState, useContext, useRef, useEffect } from 'react';
import { LanguageContext } from '@/i18n/LanguageProvider';
import t from '@/i18n/t';

// Simple inline SVG icons matching the brands visually (not official assets)
const IconGPay = () => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    border: '1px solid #d1d5db',
    borderRadius: 999,
    padding: '2px 8px',
    fontSize: 12,
    color: '#111'
  }}>
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 11v3.5h5.3c-.2 1.3-1.6 3.8-5.3 3.8-3.2 0-5.7-2.6-5.7-5.8s2.5-5.8 5.7-5.8c1.8 0 3 .7 3.7 1.3l2.5-2.4C16.8 4.4 14.6 3.5 12 3.5 6.9 3.5 2.8 7.6 2.8 12.5S6.9 21.5 12 21.5c7.1 0 8.8-6.2 8.1-9.5H12z"/>
    </svg>
    <span>Pay</span>
  </div>
);

const IconCard = () => (
  <svg width="20" height="16" viewBox="0 0 24 16" aria-hidden="true" fill="none">
    <rect x="1" y="1" width="22" height="14" rx="2" stroke="#111" fill="#111"/>
    <rect x="2.5" y="5" width="19" height="2.2" fill="#ffffff" opacity=".85"/>
    <rect x="3.5" y="10" width="8" height="1.8" fill="#ffffff" opacity=".85"/>
  </svg>
);

const IconPayPal = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true" role="img">
    {/* Simplified PP monogram */}
    <path fill="#003087" d="M9.6 5.5h8.1c5 0 7.9 2.3 7.9 6.7 0 4.6-3 7.1-8.2 7.1h-5c-.6 0-1.1.4-1.2 1l-1.6 9.3c-.1.5-.5.9-1 .9H6.6c-.4 0-.7-.3-.6-.7l3-18.9c.2-1.1 1.2-2 2.2-2z"/>
    <path fill="#009CDE" d="M13.6 7.8h6.6c4 0 6.3 1.7 6.3 5.1 0 3.7-2.6 5.8-6.9 5.8h-3.9c-.6 0-1.1.4-1.2 1l-1.3 7.9c-.1.5-.5.9-1 .9H9.5c-.4 0-.7-.3-.6-.7l2.2-13.5c.2-1.1 1.2-2 2.5-2z"/>
  </svg>
);

const IconRevolut = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true" role="img">
    {/* Bold, clean "R" to mirror the reference */}
    <path
      fill="#111"
      fillRule="evenodd"
      d="M8.5 6h9.2c5.1 0 8.2 2.4 8.2 6.6 0 3.1-1.6 5.2-4.7 6.3l4.8 7.1h-5.3l-4.5-6.6h-3.9l-.7 6.6H8.4L8.5 6Zm9.1 9.6c3 0 4.6-1.1 4.6-3.4 0-2.2-1.6-3.3-4.6-3.3h-5.5l-.9 6.7h6.4Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function PaymentMethods() {
  const { lang } = useContext(LanguageContext);
  const [method, setMethod] = useState('gpay');
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Simple collapsible with height measurement for smooth animation
  const Collapsible = ({ open, children }) => {
    const ref = useRef(null);
    const [h, setH] = useState(0);
    useEffect(() => {
      const measure = () => {
        if (ref.current) setH(ref.current.scrollHeight);
      };
      measure();
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }, []);
    return (
      <div
        style={{
          maxHeight: open ? h + 12 : 0,
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height .35s ease, opacity .25s ease',
        }}
      >
        <div ref={ref}>{children}</div>
      </div>
    );
  };

  const Row = ({ id, icon, label }) => {
    const handleToggle = () => setMethod(prev => (prev === id ? null : id));
    const checked = method === id;
    return (
    <label
      onClick={handleToggle}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        borderRadius: 12,
        cursor: 'pointer',
        border: '1px solid #e5e7eb',
        background: '#fff'
      }}
    >
      <div aria-hidden>{icon}</div>
      <div style={{ fontWeight: 600, color: '#111' }}>{label}</div>
      <input
        type="radio"
        name="pay-method"
        checked={checked}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        readOnly
        aria-checked={checked}
        aria-expanded={id === 'card' ? checked : undefined}
      />
    </label>
    );
  };

  return (
    <div style={{
      background: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: 12,
      direction: dir
    }}>
      <div style={{ display: 'grid', gap: 10 }}>
        <Row id="gpay" icon={<IconGPay />} label={t[lang]?.rental?.payment?.methods?.gpayLabel || 'Google Pay'} />
        <div>
          <Row id="card" icon={<IconCard />} label={t[lang]?.rental?.payment?.methods?.cardNewLabel || 'New credit or debit card'} />
          {/* Card details form */}
          <Collapsible open={method === 'card'}>
            <div style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              marginTop: 8,
              padding: 16
            }}>
              <div style={{
                height: 1,
                background: 'transparent',
                margin: '-16px -16px 16px -16px'
              }} />

              {/* Card number */}
              <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 }}>
                {t[lang]?.rental?.payment?.fields?.cardNumber}
              </label>
              <input
                inputMode="numeric"
                placeholder={t[lang]?.rental?.payment?.fields?.numberPh}
                style={{
                  width: '100%',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  padding: '12px 14px',
                  outline: 'none',
                  fontSize: 14,
                }}
              />

              {/* Row: Expiry + CVC */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 }}>
                    {t[lang]?.rental?.payment?.fields?.expiry}
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <input placeholder={t[lang]?.rental?.payment?.fields?.mmPh} inputMode="numeric" style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '12px 14px', outline: 'none', fontSize: 14 }} />
                    <input placeholder={t[lang]?.rental?.payment?.fields?.yyPh} inputMode="numeric" style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '12px 14px', outline: 'none', fontSize: 14 }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 }}>
                    {t[lang]?.rental?.payment?.fields?.cvc}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input placeholder={t[lang]?.rental?.payment?.fields?.cvcPh} inputMode="numeric" style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '12px 36px 12px 14px', outline: 'none', fontSize: 14 }} />
                    <span aria-hidden style={{ position: 'absolute', top: '50%', [dir==='rtl'?'left':'right']: 10, transform: 'translateY(-50%)', color: '#9ca3af' }}>?
                    </span>
                  </div>
                </div>
              </div>

              {/* Cardholder name */}
              <div style={{ marginTop: 12 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 }}>
                  {t[lang]?.rental?.payment?.fields?.holder}
                </label>
                <input placeholder={t[lang]?.rental?.payment?.fields?.holderPh} style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '12px 14px', outline: 'none', fontSize: 14 }} />
              </div>
            </div>
          </Collapsible>
        </div>
        <Row id="paypal" icon={<IconPayPal />} label={t[lang]?.rental?.payment?.methods?.paypalLabel || 'PayPal'} />
        <Row id="revolut" icon={<IconRevolut />} label={t[lang]?.rental?.payment?.methods?.revolutLabel || 'Revolut'} />
      </div>
    </div>
  );
}
