import React, { useMemo, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setField, setApp, setSecondaryApp, toggleHasSecondary } from '@/features/ui/contactFormSlice';
import { LanguageContext } from '@/i18n/LanguageProvider';
import t from '@/i18n/t';

const ccOptions = [
  { code: 'MA', label: 'MA +212' },
  { code: 'FR', label: 'FR +33' },
  { code: 'ES', label: 'ES +34' },
];

const TextInput = React.memo(React.forwardRef(({ error, ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    style={{
      width:'100%',
      padding:'12px',
      border:`1px solid ${error ? '#fca5a5' : '#e5e7eb'}`,
      background: error ? '#fff7f7' : '#fff',
      borderRadius:6
    }}
  />
)));

export default function ContactForm() {
  const dispatch = useDispatch();
  const form = useSelector(s => s.contactForm);
  const { lang } = useContext(LanguageContext);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const fullNameRef = React.useRef(null);
  const birthRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const phoneRef = React.useRef(null);

  const preventSubmit = (e) => e.preventDefault();

  const label = (s) => <label style={{fontSize: '.9rem', color:'#111', fontWeight:600}}>{s}</label>;

  const showErrors = form.validateTick > 0;
  const errors = useMemo(() => {
    const e = {};
    if (!showErrors) return e;
    if (!form.fullName) e.fullName = t[lang]?.rental.contactForm?.errors?.fullNameReq;
    if (!form.birthDate) e.birthDate = t[lang]?.rental.contactForm?.errors?.birthReq;
    if (!form.email) e.email = t[lang]?.rental.contactForm?.errors?.emailReq;
    if (!form.phoneNumber) e.phoneNumber = t[lang]?.rental.contactForm?.errors?.phoneReq;
    return e;
  }, [showErrors, form.fullName, form.birthDate, form.email, form.phoneNumber]);

  return (
    <form onSubmit={preventSubmit} style={{ display:'grid', gap:12}}>
      {label(t[lang].rental.contactForm?.fields.fullNameLabel)}
  <TextInput
    ref={fullNameRef}
    error={showErrors && !!errors.fullName}
    value={form.fullName}
    onChange={e=>{
      const v = e.target.value;
      dispatch(setField({key:'fullName', value:v}));
      requestAnimationFrame(()=> fullNameRef.current && fullNameRef.current.focus({ preventScroll: true }));
    }}
    placeholder={t[lang]?.rental.contactForm?.fields?.fullNamePh}
  />
  {showErrors && errors.fullName && <div style={{ color:'#ef4444', fontSize:'.85rem' }}>{errors.fullName}</div>}

      {label(t[lang]?.rental.contactForm?.fields?.birthDateLabel)}
  <TextInput
    ref={birthRef}
    error={showErrors && !!errors.birthDate}
    type='date'
    value={form.birthDate}
    onChange={e=>{
      const v = e.target.value;
      dispatch(setField({key:'birthDate', value:v}));
      requestAnimationFrame(()=> birthRef.current && birthRef.current.focus({ preventScroll: true }));
    }}
    placeholder={t[lang]?.rental.contactForm?.fields?.birthDatePh}
  />
  {showErrors && errors.birthDate && <div style={{ color:'#ef4444', fontSize:'.85rem' }}>{errors.birthDate}</div>}

      {label(t[lang]?.rental.contactForm?.fields?.emailLabel)}
  <TextInput
    ref={emailRef}
    error={showErrors && !!errors.email}
    type='email'
    value={form.email}
    onChange={e=>{
      const v = e.target.value;
      dispatch(setField({key:'email', value:v}));
      requestAnimationFrame(()=> emailRef.current && emailRef.current.focus({ preventScroll: true }));
    }}
    placeholder={t[lang]?.rental.contactForm?.fields?.emailPh}
  />
  {showErrors && errors.email && <div style={{ color:'#ef4444', fontSize:'.85rem' }}>{errors.email}</div>}

      {label(t[lang]?.rental.contactForm?.fields?.phoneLabel)}
      <div style={{ display:'grid', gridTemplateColumns: '140px 1fr', gap:8 }}>
        <select value={form.countryCode} onChange={e=>dispatch(setField({key:'countryCode', value:e.target.value}))} style={{ padding:'12px', border:`1px solid ${showErrors && errors.phoneNumber ? '#fca5a5' : '#e5e7eb'}`, background: showErrors && errors.phoneNumber ? '#fff7f7' : '#fff', borderRadius:6 }}>
          {ccOptions.map(o=> <option key={o.code} value={o.code}>{o.label}</option>)}
        </select>
        <TextInput
          ref={phoneRef}
          error={showErrors && !!errors.phoneNumber}
          value={form.phoneNumber}
          onChange={e=>{
            const v = e.target.value;
            dispatch(setField({key:'phoneNumber', value:v}));
            requestAnimationFrame(()=> phoneRef.current && phoneRef.current.focus({ preventScroll: true }));
          }}
          placeholder={t[lang]?.rental.contactForm?.fields?.phonePh}
        />
      </div>
      {showErrors && errors.phoneNumber && <div style={{ color:'#ef4444', fontSize:'.85rem' }}>{errors.phoneNumber}</div>}
      <div style={{ fontSize: '.85rem', color:'#6b7280' }}>{t[lang]?.rental.contactForm?.fields?.appsHint}</div>
      <div style={{ display:'flex', gap:28, justifyContent: 'flex-start' }}>
        <label className='inputLayout'><input type='checkbox' checked={form.apps.telegram} onChange={e=>dispatch(setApp({app:'telegram', value:e.target.checked}))}/>{t[lang]?.rental.contactForm?.apps?.telegram}</label>
        <label className='inputLayout'><input type='checkbox' checked={form.apps.whatsapp} onChange={e=>dispatch(setApp({app:'whatsapp', value:e.target.checked}))}/>{t[lang]?.rental.contactForm?.apps?.whatsapp}</label>
        <label className='inputLayout'><input type='checkbox' checked={form.apps.viber} onChange={e=>dispatch(setApp({app:'viber', value:e.target.checked}))}/>{t[lang]?.rental.contactForm?.apps?.viber}</label>
      </div>

      {label(t[lang]?.rental.contactForm?.fields?.secondaryPhoneSection)}
      <label style={{ display: 'flex', fontSize:'.9rem', alignItems: 'center', justifyContent: 'space-between', width: 'fit-content', whiteSpace: 'nowrap', gap: 10 }}>
        <span>{t[lang]?.rental.contactForm?.fields?.addAnother}</span><input type='checkbox' checked={form.hasSecondary} onChange={e=>dispatch(toggleHasSecondary(e.target.checked))} />
      </label>
      <div style={{ display:'grid', gridTemplateColumns: '140px 1fr', gap:8, opacity: form.hasSecondary ? 1 : .6 }}>
        <select disabled={!form.hasSecondary} value={form.secondaryCountryCode} onChange={e=>dispatch(setField({key:'secondaryCountryCode', value:e.target.value}))} style={{ padding:'12px', border:'1px solid #e5e7eb', borderRadius:6}}>
          {ccOptions.map(o=> <option key={o.code} value={o.code}>{o.label}</option>)}
        </select>
  <TextInput disabled={!form.hasSecondary} value={form.secondaryPhone} onChange={e=>dispatch(setField({key:'secondaryPhone', value:e.target.value}))} placeholder={t[lang]?.rental.contactForm?.fields?.secondaryPhonePh} />
      </div>
      <div style={{ display:'flex', gap:28, opacity: form.hasSecondary ? 1 : .6, justifyContent: 'flex-start' }}>
        <label className='inputLayout'><input disabled={!form.hasSecondary} type='checkbox' checked={form.secondaryApps.telegram} onChange={e=>dispatch(setSecondaryApp({app:'telegram', value:e.target.checked}))}/>{t[lang]?.rental.contactForm?.apps?.telegram}</label>
        <label className='inputLayout'><input disabled={!form.hasSecondary} type='checkbox' checked={form.secondaryApps.whatsapp} onChange={e=>dispatch(setSecondaryApp({app:'whatsapp', value:e.target.checked}))}/>{t[lang]?.rental.contactForm?.apps?.whatsapp}</label>
        <label className='inputLayout'><input disabled={!form.hasSecondary} type='checkbox' checked={form.secondaryApps.viber} onChange={e=>dispatch(setSecondaryApp({app:'viber', value:e.target.checked}))}/>{t[lang]?.rental.contactForm?.apps?.viber}</label>
      </div>

      {label(t[lang]?.rental.contactForm?.fields?.commentLabel)}
      <textarea value={form.comment} onChange={e=>dispatch(setField({key:'comment', value:e.target.value}))} rows={4} style={{ width:'100%', padding:'12px', border:'1px solid #e5e7eb', borderRadius:6 }} />

  {/* Submit action removed; validation is triggered from the Pay button in the aside */}
    </form>
  );
}
