import '@/app/ui/global.css';
import Header from '@/app/ui/header'
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`flex flex-col h-full ${inter.className} antialiased`}>
        <Header />
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
