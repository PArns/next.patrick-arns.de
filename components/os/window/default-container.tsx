export default function WindowDefaultContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="@container flex w-full flex-col p-2 lg:p-4">{children}</div>
  );
}
