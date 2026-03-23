import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'nexo_auth_token';
let tokenCache: string | null = null;

export async function saveAuthToken(token: string) {
  tokenCache = token;
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function readAuthToken() {
  if (tokenCache) {
    return tokenCache;
  }
  const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
  tokenCache = storedToken;
  return storedToken;
}

export async function clearAuthToken() {
  tokenCache = null;
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
