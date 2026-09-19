"use client";

import { getAdvisor, type AdvisorId } from "@/lib/advisory-widget/config";

interface AdvisorAvatarProps {
  advisor: AdvisorId;
  size?: "trigger" | "message" | "menu";
  decorative?: boolean;
  className?: string;
}

const SIZE_CLASSES = {
  trigger: "h-14 w-14",
  message: "h-9 w-9",
  menu: "h-8 w-8",
} as const;

export function AdvisorAvatar({
  advisor,
  size = "message",
  decorative = false,
  className = "",
}: AdvisorAvatarProps) {
  const profile = getAdvisor(advisor);

  return (
    <img
      src={profile.image.src}
      srcSet={profile.image.srcSet}
      sizes={size === "trigger" ? "56px" : size === "message" ? "36px" : "32px"}
      width={size === "trigger" ? 56 : size === "message" ? 36 : 32}
      height={size === "trigger" ? 56 : size === "message" ? 36 : 32}
      alt={decorative ? "" : profile.name}
      aria-hidden={decorative || undefined}
      className={`${SIZE_CLASSES[size]} rounded-full border border-white/80 bg-white object-cover ${className}`}
      draggable={false}
    />
  );
}
