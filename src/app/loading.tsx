// app/loading.tsx or components/Loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
      <div className="w-4 h-4 rounded-full animate-pulse bg-[#3B82F6]"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-[#3B82F6]"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-[#3B82F6]"></div>
    </div>
  );
}
