// constants/colors.js
// Design system color palette

export const COLORS = {
  // Primary colors
  primary: {
    blue: '#4F46E5',
    purple: '#7C3AED',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
  },
  
  // Node type colors
  nodeTypes: {
    input: '#3B82F6',
    output: '#3B82F6',
    llm: '#8B5CF6',
    text: '#F59E0B',
    filter: '#8B5CF6',
    transform: '#8B5CF6',
    api: '#10B981',
    database: '#10B981',
    validator: '#F59E0B',
  },
  
  // UI colors
  background: {
    main: '#F9FAFB',
    card: '#FFFFFF',
    hover: '#F3F4F6',
  },
  
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    light: '#9CA3AF',
  },
  
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },
  
  status: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
  
  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

export default COLORS;
