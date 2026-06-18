import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: "Men's Rights Bangladesh | Dignity BD",
  description: "A dark crimson professional platform advocating for legal balance and humanitarian security for men in Bangladesh.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-neutral-950 min-h-screen text-gray-100">{children}</body>
    </html>
  );
}
