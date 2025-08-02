
"use client";

import { useState, useEffect, useRef } from "react";
import { formatDistanceToNow, format } from "date-fns";

interface RelativeTimeProps {
  date: string | Date;
}

export function RelativeTime({ date }: RelativeTimeProps) {
  const [relativeTime, setRelativeTime] = useState("");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const newDate = new Date(date);
    setRelativeTime(formatDistanceToNow(newDate, { addSuffix: true }));
    
    if (ref.current?.parentElement) {
        ref.current.parentElement.title = format(newDate, "PPP p");
    }

  }, [date]);

  if (!relativeTime) {
    return <span ref={ref}></span>;
  }

  return <span ref={ref}>{relativeTime}</span>;
}
