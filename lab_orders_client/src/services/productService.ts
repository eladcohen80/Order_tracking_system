import type { Product } from '../types/Product';

import { API_BASE_URL } from './api';

const API_URL = `${API_BASE_URL}/products`;

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };
};

export const getProducts = async (supplier: string): Promise<Product[]> => {
    const response = await fetch(`${API_URL}?supplier=${encodeURIComponent(supplier)}`, {
        headers: getHeaders(),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
};