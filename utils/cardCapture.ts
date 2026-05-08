import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import type { RefObject } from "react";
import { captureRef } from "react-native-view-shot";

async function cropBottomPixel(uri: string) {
  const sizeRef = await ImageManipulator.manipulate(uri).renderAsync();
  const { width, height } = sizeRef;
  return ImageManipulator.manipulate(uri)
    .crop({ originX: 0, originY: 0, width, height: height - 1 })
    .renderAsync();
}

export async function captureCardAsBase64(ref: RefObject<null>): Promise<string> {
  const tmpUri = await captureRef(ref, { format: "jpg", quality: 0.7 });
  const croppedRef = await cropBottomPixel(tmpUri);
  const result = await croppedRef.saveAsync({
    compress: 0.7,
    format: SaveFormat.JPEG,
    base64: true,
  });
  return result.base64 ?? "";
}

export async function captureCardAsUri(ref: RefObject<null>): Promise<string> {
  const tmpUri = await captureRef(ref, {
    format: "jpg",
    quality: 1,
    fileName: "greeting",
  });
  const croppedRef = await cropBottomPixel(tmpUri);
  const { uri } = await croppedRef.saveAsync({ compress: 1, format: SaveFormat.JPEG });
  return uri;
}
