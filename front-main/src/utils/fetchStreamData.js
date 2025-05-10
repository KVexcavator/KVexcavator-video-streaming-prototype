export default async function fetchStreamData(id) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/streams/${id}`)
  const response = await res.json()
  if (!res.ok) {
    throw new Error(response.message)
  }
  return response
}