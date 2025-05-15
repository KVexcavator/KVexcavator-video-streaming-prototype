import { type Stream } from '../types'

export default async function fetchStreamData(id: string): Promise<Stream> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/streams/${id}`);
  const response = await res.json();

  if (!res.ok) {
    throw new Error(response.detail || "Failed to fetch stream");
  }

  return response;
}

// {
//   "title": "Test Stream",
//   "description": "Something cool",
//   "stream_key": "abc123",
//   "created_at": "2025-05-15T10:00:00",
//   "updated_at": "2025-05-15T10:30:00",
//   "streamer": {
//     "id": "663ddf8df13e2d...",
//     "username": "Ivan",
//     "email": "ivan@mail.local",
//     "created": "2025-05-10T12:00:00"
//   }
// }

