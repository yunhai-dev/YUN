interface WindowDecorationProps {
    type: 'mac' | 'windows';
    title?: string;
}

export function WindowDecoration({ type, title }: WindowDecorationProps) {
    if (type === 'mac') {
        return (
            <div className="flex items-center gap-2 px-5 py-4 bg-[#2d2d2d] border-b border-[#1a1a1a]">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                {title && <span className="ml-4 text-sm text-gray-300 font-medium">{title}</span>}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between px-5 py-3 bg-[#2d2d2d] border-b border-[#1a1a1a]">
            {title && <span className="text-sm text-gray-300 font-medium">{title}</span>}
            <div className="flex gap-1 text-gray-400 text-sm">
                <span className="w-10 h-7 flex items-center justify-center hover:bg-gray-700 rounded cursor-default">─</span>
                <span className="w-10 h-7 flex items-center justify-center hover:bg-gray-700 rounded cursor-default">□</span>
                <span className="w-10 h-7 flex items-center justify-center hover:bg-red-600 rounded cursor-default">×</span>
            </div>
        </div>
    );
}
