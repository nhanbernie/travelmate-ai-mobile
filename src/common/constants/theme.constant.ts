
export const colors = (theme: string) => ({
  background: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
  text: theme === 'dark' ? 'text-white' : 'text-gray-900',
  textSecondary: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
  surface: theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50',
  border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
  primary: theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500',
  primaryText: 'text-white',
  // theme specific colors
  primaryColor: '#E95D77',
  secondaryColor: '#F58601',
  tertiaryColor: '#00C5A7',
  quaternaryColor: '#FFAD9F',
  // simple colors
  greyColor: '#737373',
});

