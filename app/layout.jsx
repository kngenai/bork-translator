
import './globals.css';

export const metadata = {
  title: "Dog Bork Translator",
  description: "Entertainment-only. Certified in Bork-itecture, minor in Zoomology."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
