import { salon } from "@/lib/content";

export function whatsappHref(message: string) {
  const digits = salon.phoneTel.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
