import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
// Fix: Updated path from './rootReducer' to './reducers'
// Fix: Removed 'require' in favor of modern Vite HMR
if (process.env.NODE_ENV === 'development' && import.meta.hot) {
  import.meta.hot.accept('./reducers', (newModule) => {
    if (newModule) {
      store.replaceReducer(newModule.default);
    }
  });
}
export type AppDispatch = typeof store.dispatch

export default store;