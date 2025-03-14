import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Property endpoints
export const fetchProperties = async () => {
  const response = await api.get('/properties');
  return response;
};


export const getProperty = async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      console.log('API response:', response); // Debug log
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };
export const createProperty = async (data) => {
  const response = await api.post('/properties', data);
  return response;
};

export const updateProperty = async (id, data) => {
  const response = await api.put(`/properties/${id}`, data);
  return response;
};

export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}`);
  return response;
};

// Tenant endpoints
export const fetchTenants = async (propertyId) => {
  const response = await api.get('/tenants', { params: { propertyId } });
  return response;
};

export const getTenant = async (id) => {
  const response = await api.get(`/tenants/${id}`);
  return response;
};

export const createTenant = async (data) => {
  const response = await api.post('/tenants', data);
  return response;
};

export const updateTenant = async (id, data) => {
  const response = await api.put(`/tenants/${id}`, data);
  return response;
};

export const deleteTenant = async (id) => {
  const response = await api.delete(`/tenants/${id}`);
  return response;
};

// Payment endpoints
export const fetchPayments = async (propertyId) => {
    const response = await api.get('/payments', { params: { propertyId } });
    return response;
  };
  

export const createPayment = async (paymentData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/payments', paymentData); // Example API endpoint
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };
  
export const deletePayment = async (paymentData) => {
    try {
      const response = await axios.delete('http://localhost:5000/api/payments', paymentData); // Example API endpoint
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };
  

export const getPaymentsByMonth = async (propertyId, month, year) => {
  const response = await api.get('/payments/monthly', { 
    params: { propertyId, month, year } 
  });
  return response;
};

// Report endpoints
export const fetchReportData = async (params) => {
  const response = await api.get('/reports/data', { params });
  return response;
};

export const fetchMonthlyReport = async (propertyId, month, year) => {
  const response = await api.get('/reports/monthly', {
    params: { propertyId, month, year }
  });
  return response;
};

export const fetchYearlyReport = async (propertyId, year) => {
  const response = await api.get('/reports/yearly', {
    params: { propertyId, year }
  });
  return response;
};

export const generateReport = async (params) => {
  const response = await api.get('/reports/generate', {
    params,
    responseType: 'blob'
  });
  return response;
};

// Statistics endpoints
export const fetchPropertyStats = async (propertyId) => {
  const response = await api.get(`/properties/${propertyId}/stats`);
  return response;
};

export const fetchOverallStats = async () => {
  const response = await api.get('/stats/overall');
  return response;
};

export const fetchPropertyById = async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      console.log('API Response:', response); // Debug log
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };
  

  // Unit endpoints
export const deleteUnit = async (unitId) => {
    const response = await api.delete(`/units/${unitId}`);
    return response;
  };
  

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized access');
          // Handle unauthorized access
          break;
        case 404:
          console.error('Resource not found');
          // Handle not found
          break;
        case 500:
          console.error('Server error');
          // Handle server error
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);





export default api;