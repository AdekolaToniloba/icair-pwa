// components/speaker-avatar.tsx
"use client";

import { useMemo } from "react";
import { User } from "lucide-react";
import { getSpeakerByScheduleName, type Speaker } from "@/data/speakers-data";

interface SpeakerAvatarProps {
  speakerName: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

const SIZE_CONFIG = {
  sm: {
    container: "w-8 h-8",
    text: "text-xs",
    icon: 14,
  },
  md: {
    container: "w-10 h-10",
    text: "text-sm",
    icon: 16,
  },
  lg: {
    container: "w-12 h-12",
    text: "text-base",
    icon: 20,
  },
};

export default function SpeakerAvatar({
  speakerName,
  size = "md",
  showName = false,
  className = "",
}: SpeakerAvatarProps) {
  const speaker = useMemo(
    () => getSpeakerByScheduleName(speakerName),
    [speakerName]
  );

  const sizeConfig = SIZE_CONFIG[size];
  const initials = speakerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!speaker) {
    // Fallback avatar with initials if speaker not found in database
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div
          className={`${sizeConfig.container} rounded-full bg-muted flex items-center justify-center shrink-0`}
          title={speakerName}
        >
          <span
            className={`${sizeConfig.text} font-semibold text-muted-foreground`}
          >
            {initials}
          </span>
        </div>
        {showName && (
          <span className="text-sm text-foreground font-medium">
            {speakerName}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`${sizeConfig.container} rounded-full overflow-hidden bg-muted shrink-0 relative`}
        title={speaker.name}
      >
        {/* Blur placeholder */}
        {speaker.blurDataURL && (
          <img
            src={speaker.blurDataURL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-sm"
            aria-hidden="true"
          />
        )}

        {/* Initials fallback */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
          <span className={`${sizeConfig.text} font-semibold text-primary`}>
            {initials}
          </span>
        </div>

        {/* Actual image */}
        <img
          src={speaker.image}
          alt={speaker.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          onLoad={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          style={{ opacity: 0 }}
        />
      </div>

      {showName && (
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {speaker.name}
          </p>
          {speaker.organization && (
            <p className="text-xs text-muted-foreground truncate">
              {speaker.organization}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Component for displaying multiple speakers
interface SpeakerAvatarGroupProps {
  speakers: Array<{ name: string; title?: string; organization?: string }>;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SpeakerAvatarGroup({
  speakers,
  max = 3,
  size = "md",
  className = "",
}: SpeakerAvatarGroupProps) {
  const displaySpeakers = speakers.slice(0, max);
  const remaining = speakers.length - max;
  const sizeConfig = SIZE_CONFIG[size];

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex -space-x-2">
        {displaySpeakers.map((speaker, idx) => (
          <div
            key={idx}
            className={`${sizeConfig.container} rounded-full border-2 border-card overflow-hidden bg-muted relative`}
            style={{ zIndex: displaySpeakers.length - idx }}
            title={speaker.name}
          >
            {(() => {
              const speakerData = getSpeakerByScheduleName(speaker.name);
              const initials = speaker.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              if (!speakerData) {
                return (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                    <span
                      className={`${sizeConfig.text} font-semibold text-primary`}
                    >
                      {initials}
                    </span>
                  </div>
                );
              }

              return (
                <>
                  {speakerData.blurDataURL && (
                    <img
                      src={speakerData.blurDataURL}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover blur-sm"
                      aria-hidden="true"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                    <span
                      className={`${sizeConfig.text} font-semibold text-primary`}
                    >
                      {initials}
                    </span>
                  </div>
                  <img
                    src={speakerData.image}
                    alt={speakerData.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                    style={{ opacity: 0 }}
                  />
                </>
              );
            })()}
          </div>
        ))}
        {remaining > 0 && (
          <div
            className={`${sizeConfig.container} rounded-full border-2 border-card bg-muted flex items-center justify-center`}
            title={`+${remaining} more`}
          >
            <span
              className={`${sizeConfig.text} font-semibold text-muted-foreground`}
            >
              +{remaining}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
