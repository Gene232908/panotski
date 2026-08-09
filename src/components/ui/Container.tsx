import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  // A narrow union rather than keyof JSX.IntrinsicElements: r3f augments the
  // global JSX namespace with three.js tags, which turns the full-union tag
  // type into an impossible props intersection.
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "nav" | "main";
};

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-content px-6 md:px-10", className)}>
      {children}
    </Tag>
  );
}
