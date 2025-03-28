export default function WindowDefaultContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full flex-col p-2 lg:p-4 @container">
            {children}
        </div>
    );
}