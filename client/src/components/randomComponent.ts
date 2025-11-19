const fetchCall = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(endpoint);
  return response.json() as Promise<T>;
};

interface Show {
  id: number;
  message?: string;
}

async function rawFetchCall(endpoint: string) {
  const response = await fetch(endpoint);
  const data: Show[] = await response.json();
  return data;
}
