export interface Host {
  id: number;
  name: string;
  picture: string;
}

export interface Property {
  id: string;
  slug?: string;
  title: string;
  description: string;
  cover: string;
  location: string;
  price_per_night?: number;
  rating_avg: number;
  ratings_count?: number;
  host: Host;
  pictures?: string[];
  equipments?: string[];
  tags?: string[];
}