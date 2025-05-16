export type User = {
  id: string
  username: string
  email: string
  created: string
};

export type Stream = {
  id: string
  title: string
  description?: string | null
  streamer: User
  stream_key: string
  created_at: string
  updated_at: string
};
