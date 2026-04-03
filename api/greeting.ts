import { apiClient } from "./client";
import type {
  GreetingImageResponseDto,
  GreetingMessageResponseDto,
  GreetingResponseDto,
} from "./Api";

export type { GreetingImageResponseDto, GreetingMessageResponseDto, GreetingResponseDto };

export const greetingApi = {
  getGreeting: (locale?: string) =>
    apiClient.get<GreetingResponseDto>("/greeting", locale),
  getMessage: (locale?: string) =>
    apiClient.get<GreetingMessageResponseDto>("/greeting/message", locale),
  getImage: () => apiClient.get<GreetingImageResponseDto>("/greeting/image"),
};
