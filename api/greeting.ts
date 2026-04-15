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

export const greetingApi = {
  getGreeting: (mood?: string, holiday?: string) => {
    const params = new URLSearchParams();
    if (mood) params.set("mood", mood);
    if (holiday) params.set("holiday", holiday);
    const query = params.toString();
    return apiClient.get<GreetingResponseDto>(
      query ? `/greeting?${query}` : "/greeting",
    );
  },
  getMessage: (mood?: string, holiday?: string) => {
    const params = new URLSearchParams();
    if (mood) params.set("mood", mood);
    if (holiday) params.set("holiday", holiday);
    const query = params.toString();
    return apiClient.get<GreetingMessageResponseDto>(
      query ? `/greeting/message?${query}` : "/greeting/message",
    );
  },
  getImage: () => apiClient.get<GreetingImageResponseDto>("/greeting/image"),
  getMoods: () => apiClient.get<MoodOptionsResponseDto>("/greeting/moods"),
};
