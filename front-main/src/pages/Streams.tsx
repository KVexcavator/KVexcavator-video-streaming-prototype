export const Streams = () => {
  return(
    <h1>Streams</h1>
  )
}

export const streamsLoader = async () => {
  console.log("Streams URL: ")
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/streams/?limit=30`
  )
  const response = await res.json()
  if (!res.ok){
    throw new Error(response.message)
  }
  return response['streams']
}