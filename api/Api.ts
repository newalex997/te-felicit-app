/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TextBlockConfigDto {
  /**
   * Font size in sp/pt
   * @example 24
   */
  fontSize: number;
  /**
   * Text color as hex or rgba
   * @example "#FFFFFF"
   */
  color: string;
  /** @example "center" */
  position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export interface GreetingTextConfigDto {
  message: TextBlockConfigDto;
  slogan: TextBlockConfigDto;
}

export interface GreetingResponseDto {
  /** @example "Astazi este joi" */
  message: string;
  /** @example "Bună dimineața!" */
  slogan: string;
  /** @example "https://picsum.photos/seed/coffee/800/1200" */
  imageUrl: string;
  textConfig: GreetingTextConfigDto;
}

export interface GreetingMessageResponseDto {
  /** @example "Astazi este joi" */
  message: string;
  /** @example "Bună dimineața!" */
  slogan: string;
  textConfig: GreetingTextConfigDto;
}

export interface GreetingImageResponseDto {
  /** @example "https://picsum.photos/seed/coffee/800/1200" */
  imageUrl: string;
}
