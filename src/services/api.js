import { fallbackHomepageData } from '../data/fallbackData';

const API_URL = 'https://backend-one-rho-24.vercel.app/api/homepage';

export async function fetchHomepageData() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const res = await fetch(API_URL, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    if (json && json.success && json.data) {
      return {
        data: json.data,
        isLive: true,
        fetchedAt: new Date().toLocaleTimeString(),
      };
    }
    throw new Error('Invalid data format received from API');
  } catch (err) {
    console.warn('API fetch failed or timed out, using bundled fallback:', err);
    return {
      data: fallbackHomepageData.data,
      isLive: false,
      error: err.message,
      fetchedAt: new Date().toLocaleTimeString(),
    };
  }
}

