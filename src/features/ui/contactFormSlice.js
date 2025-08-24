import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  birthDate: '',
  email: '',
  countryCode: 'MA',
  phoneNumber: '',
  apps: { telegram: false, whatsapp: false, viber: false },
  hasSecondary: false,
  secondaryCountryCode: 'MA',
  secondaryPhone: '',
  secondaryApps: { telegram: false, whatsapp: false, viber: false },
  comment: '',
  savedAt: null,
  validateTick: 0,
};

const slice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    setField(state, { payload }) {
      const { key, value } = payload;
      state[key] = value;
    },
    setApp(state, { payload }) {
      const { app, value } = payload;
      state.apps[app] = value;
    },
    setSecondaryApp(state, { payload }) {
      const { app, value } = payload;
      state.secondaryApps[app] = value;
    },
    toggleHasSecondary(state, { payload }) {
      state.hasSecondary = payload ?? !state.hasSecondary;
      if (!state.hasSecondary) {
        state.secondaryPhone = '';
        state.secondaryApps = { telegram: false, whatsapp: false, viber: false };
      }
    },
    reset(state) {
      Object.assign(state, initialState);
    },
    markSaved(state) {
      state.savedAt = Date.now();
    },
    triggerValidation(state) {
      state.validateTick++;
    }
  }
});

export const { setField, setApp, setSecondaryApp, toggleHasSecondary, reset, markSaved, triggerValidation } = slice.actions;
export default slice.reducer;
