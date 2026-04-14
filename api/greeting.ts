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
  getGreeting: (mood?: string) =>
    apiClient.get<GreetingResponseDto>(
      mood ? `/greeting?mood=${mood}` : "/greeting",
    ),
  getMessage: (mood?: string) =>
    apiClient.get<GreetingMessageResponseDto>(
      mood ? `/greeting/message?mood=${mood}` : "/greeting/message",
    ),
  getImage: () => apiClient.get<GreetingImageResponseDto>("/greeting/image"),
  getMoods: () => apiClient.get<MoodOptionsResponseDto>("/greeting/moods"),
};
