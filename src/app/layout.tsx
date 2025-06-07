import "./globals.scss";

export const metadata = {
  title: "No Name Diary",
  description:
    "No Name Diary is a personal diary web application. All visitors can do is view posts, leave comments anonymously, and react to the posts.",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
