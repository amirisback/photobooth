import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface CardProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Base Card component
 */
export function Card({ id, className, children }: CardProps) {
  const safeId = id || `card-${React.useId().replace(/:/g, "")}`;
  return (
    <div id={safeId} className={cn("card", className)}>
      {children}
    </div>
  );
}

/**
 * Asymmetric Card with single-corner radius
 */
export function AsymmetricCard({ id, className, children }: CardProps) {
  const safeId = id || `card-asym-${React.useId().replace(/:/g, "")}`;
  return (
    <div id={safeId} className={cn("card-asymmetric", className)}>
      {children}
    </div>
  );
}

interface NewsCardProps {
  id?: string;
  image: string;
  date: string;
  tag: string;
  title: string;
  className?: string;
}

/**
 * Editorial News Card
 */
export function NewsCard({ id, image, date, tag, title, className }: NewsCardProps) {
  const safeId = id || `news-card-${React.useId().replace(/:/g, "")}`;
  
  return (
    <Card id={safeId} className={cn("flex flex-col", className)}>
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-3">
          <span className="text-eyebrow text-text-body uppercase">{date}</span>
          <Badge variant="outlined">{tag}</Badge>
        </div>
        <h4 className="text-h4-bold text-text-headline leading-tight">
          {title}
        </h4>
      </div>
    </Card>
  );
}
