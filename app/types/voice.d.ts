export interface Voice {
  voice_id: string;
  name: string;
  category: string;
  labels: { [key: string]: string };
  description: string;
  preview_url: string;
}