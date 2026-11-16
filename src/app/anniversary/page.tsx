import AnniversaryCard, { Anniversary } from "@/components/anniversary-card";

export default async function AnniversaryPage() {
  const items: Anniversary[] = [
    {
      id: "1",
      title: "相遇",
      date: "2025-08-27",
      dateTime: "2025-08-27T23:45",
      repeat: true,
      category: "个人",
    },
    {
      id: "2",
      title: "友谊",
      date: "2024-04-15",
      dateTime: "2024-04-15T10:00",
      repeat: true,
      category: "个人",
    },
    {
      id: "4",
      title: "工作",
      date: "2022-10-24",
      repeat: true,
      category: "生活",
    },
  ];

  return (
    <main className="flex-1 min-h-screen bg-white dark:bg-zinc-950 pt-28 md:pt-36 pb-24">
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-border/60 mb-12">
          <h1 className="font-serif-sc text-5xl sm:text-6xl font-medium tracking-tight">纪念日</h1>
          <p className="text-sm sm:text-base text-muted-foreground md:text-right">
            记录的意义不在当下，而在未来的回忆中。
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div className="h-auto" key={item.id}>
              <AnniversaryCard item={item} showJson={false} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
