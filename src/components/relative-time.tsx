
"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

interface RelativeTimeProps {
  date: string | Date;
}

export function RelativeTime({ date }: RelativeTimeProps) {
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    setRelativeTime(formatDistanceToNow(new Date(date), { addSuffix: true }));
  }, [date]);

  if (!relativeTime) {
    return null;
  }

  return <>{relativeTime}</>;
}
