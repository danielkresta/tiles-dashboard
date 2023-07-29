export interface TileConfiguration {
  text: string;
  backgroundColor: string;
  link?: string;
}

export interface UpdateResponse {
  status: 'success' | 'failed';
}
