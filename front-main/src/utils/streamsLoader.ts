export const streamsLoader = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/streams/?limit=30`)  
  const response = await res.json()

  if (!res.ok) {
    throw new Error(response?.message || 'Failed to fetch streams')
  }
  // console.log('LOADER response:', response)
  return response
};
