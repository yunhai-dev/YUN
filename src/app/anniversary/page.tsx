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
    <div className="flex-1 pt-32 pb-24">
      <div className="main">
        <h1 className="text-3xl font-bold mb-4">纪念日</h1>
        <p className="mb-4">记录的意义不在当下，而在未来的回忆中。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {items.map((item) => (
            <div className="h-auto" key={item.id}>
              <AnniversaryCard item={item} showJson={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
