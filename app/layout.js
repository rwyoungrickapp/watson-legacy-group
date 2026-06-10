import "./globals.css";

export const metadata = {
  title: "Watson Legacy Group | We Build Dynasties",
  description:
    "Watson Legacy Group — music, technology, publishing, and creator networks. Books on Amazon, audiobooks on Google Play, music on all streaming platforms by Ya Boy Rick, courses on Stan Store, and live events on Eventbrite. We don't just build businesses — we build dynasties.",
  keywords: [
    "Watson Legacy Group",
    "WLG",
    "Ya Boy Rick",
    "Travel Plug",
    "books",
    "audiobooks",
    "music",
    "courses",
    "creator network",
  ],
  openGraph: {
    title: "Watson Legacy Group | We Build Dynasties",
    description:
      "Music. Technology. Publishing. Creator Networks. One empire. One legacy.",
    url: "https://watsonlegacygroup.com",
    siteName: "Watson Legacy Group",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
