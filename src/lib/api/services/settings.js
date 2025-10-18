import apiClient from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export const settingsAPI = {
    // Get business settings
    getSettings: () => apiClient.get(API_ENDPOINTS.SETTINGS),

    // Update business settings
    // updateSettings: (data) => apiClient.put(API_ENDPOINTS.BUSINESS_SETTINGS, data),
};
