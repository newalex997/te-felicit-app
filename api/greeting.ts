import { apiClient } from "./client";
import type {
  GreetingImageResponseDto,
  GreetingMessageResponseDto,
  GreetingResponseDto,
} from "./Api";

export type { GreetingImageResponseDto, GreetingMessageResponseDto, GreetingResponseDto };

export const greetingApi = {
  getGreeting: () => apiClient.get<GreetingResponseDto>("/greeting"),
  getMessage: () => apiClient.get<GreetingMessageResponseDto>("/greeting/message"),
  getImage: () => apiClient.get<GreetingImageResponseDto>("/greeting/image"),
};
