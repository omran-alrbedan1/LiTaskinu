export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-mb-32 max-h-screen overflow-hidden relative !z-50">
      {children}
    </div>
  );
}
