import { apiClient } from "./client";
import type {
  GreetingImageResponseDto,
  GreetingMessageResponseDto,
  GreetingResponseDto,
  MoodOptionsResponseDto,
} from "./Api";

export type {
  GreetingImageResponseDto,
  GreetingMessageResponseDto,
  GreetingResponseDto,
  MoodOptionsResponseDto,
};

function buildQuery(mood?: string, holiday?: string) {
  const params = new URLSearchParams();
  if (mood) params.set("mood", mood);
  if (holiday) params.set("holiday", holiday);
  const query = params.toString();
  return query ? `?${query}` : "";
}

export const greetingApi = {
  getGreeting: (mood?: string, holiday?: string) =>
    apiClient.get<GreetingResponseDto>(`/greeting${buildQuery(mood, holiday)}`),
  getMessage: (mood?: string, holiday?: string) =>
    apiClient.get<GreetingMessageResponseDto>(`/greeting/message${buildQuery(mood, holiday)}`),
  getImage: (mood?: string, holiday?: string) =>
    apiClient.get<GreetingImageResponseDto>(`/greeting/image${buildQuery(mood, holiday)}`),
  getMoods: () => apiClient.get<MoodOptionsResponseDto>("/greeting/moods"),
};
