"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Info } from 'lucide-react';

interface ImageInfo {
    name: string;
    size: number;
    type: string;
    width: number;
    height: number;
}

type CompareMode = 'split' | 'fade' | 'highlight' | 'subtract';

const modeLabels: Record<CompareMode, string> = {
    split: '分割对比',
    fade: '淡化对比',
    highlight: '高亮差异',
    subtract: '像素相减',
};

const ImageComparePage = () => {
    const [image1, setImage1] = useState<string | null>(null);
    const [image2, setImage2] = useState<string | null>(null);
    const [imageInfo1, setImageInfo1] = useState<ImageInfo | null>(null);
    const [imageInfo2, setImageInfo2] = useState<ImageInfo | null>(null);
    const [splitPosition, setSplitPosition] = useState(50);
    const [opacity, setOpacity] = useState(50);
    const [compareMode, setCompareMode] = useState<CompareMode>('split');
    const [highlightThreshold, setHighlightThreshold] = useState(30);
    const [diffCanvas, setDiffCanvas] = useState<string | null>(null);
    const [showInfo, setShowInfo] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const image1Ref = useRef<HTMLImageElement>(null);
    const image2Ref = useRef<HTMLImageElement>(null);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const loadImage = async (file: File): Promise<{ dataUrl: string; info: ImageInfo }> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        dataUrl: e.target?.result as string,
                        info: {
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            width: img.width,
                            height: img.height,
                        },
                    });
                };
                img.onerror = reject;
                img.src = e.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImage1Upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const { dataUrl, info } = await loadImage(file);
            setImage1(dataUrl);
            setImageInfo1(info);
        }
    };

    const handleImage2Upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const { dataUrl, info } = await loadImage(file);
            setImage2(dataUrl);
            setImageInfo2(info);
        }
    };

    const computeDifference = useCallback(() => {
        if (!image1 || !image2 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img1 = new Image();
        const img2 = new Image();

        img1.onload = () => {
            img2.onload = () => {
                const width = Math.max(img1.width, img2.width);
                const height = Math.max(img1.height, img2.height);
                canvas.width = width;
                canvas.height = height;

                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, width, height);

                const x1 = (width - img1.width) / 2;
                const y1 = (height - img1.height) / 2;
                ctx.drawImage(img1, x1, y1);
                const imageData1 = ctx.getImageData(0, 0, width, height);

                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, width, height);

                const x2 = (width - img2.width) / 2;
                const y2 = (height - img2.height) / 2;
                ctx.drawImage(img2, x2, y2);
                const imageData2 = ctx.getImageData(0, 0, width, height);

                const diffData = ctx.createImageData(width, height);

                for (let i = 0; i < imageData1.data.length; i += 4) {
                    const r1 = imageData1.data[i];
                    const g1 = imageData1.data[i + 1];
                    const b1 = imageData1.data[i + 2];

                    const r2 = imageData2.data[i];
                    const g2 = imageData2.data[i + 1];
                    const b2 = imageData2.data[i + 2];

                    const diff = Math.sqrt(
                        Math.pow(r1 - r2, 2) +
                        Math.pow(g1 - g2, 2) +
                        Math.pow(b1 - b2, 2)
                    );

                    if (compareMode === 'highlight') {
                        if (diff > highlightThreshold) {
                            diffData.data[i] = 255;
                            diffData.data[i + 1] = 0;
                            diffData.data[i + 2] = 0;
                            diffData.data[i + 3] = 255;
                        } else {
                            diffData.data[i] = r1;
                            diffData.data[i + 1] = g1;
                            diffData.data[i + 2] = b1;
                            diffData.data[i + 3] = 255;
                        }
                    } else if (compareMode === 'subtract') {
                        diffData.data[i] = Math.abs(r1 - r2);
                        diffData.data[i + 1] = Math.abs(g1 - g2);
                        diffData.data[i + 2] = Math.abs(b1 - b2);
                        diffData.data[i + 3] = 255;
                    }
                }

                ctx.putImageData(diffData, 0, 0);
                setDiffCanvas(canvas.toDataURL());
            };
            img2.src = image2;
        };
        img1.src = image1;
    }, [image1, image2, compareMode, highlightThreshold]);

    useEffect(() => {
        if (compareMode === 'highlight' || compareMode === 'subtract') {
            computeDifference();
        }
    }, [compareMode, highlightThreshold, computeDifference]);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSplitPosition(percentage);
    }, [isDragging]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove]);

    const handleClear = () => {
        setImage1(null);
        setImage2(null);
        setImageInfo1(null);
        setImageInfo2(null);
        setDiffCanvas(null);
        setSplitPosition(50);
        setOpacity(50);
    };

    const handleSwap = () => {
        const tempImg = image1;
        const tempInfo = imageInfo1;
        setImage1(image2);
        setImageInfo1(imageInfo2);
        setImage2(tempImg);
        setImageInfo2(tempInfo);
    };

    const renderSplitCompare = () => (
        <div
            ref={containerRef}
            className="relative w-full h-[500px] overflow-hidden rounded-lg border border-input cursor-ew-resize select-none flex items-center justify-center bg-background"
            onMouseDown={handleMouseDown}
        >
            {image1 && image2 ? (
                <>
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={image2}
                            alt="Image 2"
                            className="max-w-full max-h-full object-contain"
                        />
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ 
                                clipPath: `inset(0 ${100 - splitPosition}% 0 0)`
                            }}
                        >
                            <img
                                src={image1}
                                alt="Image 1"
                                className="max-w-full max-h-full object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        </div>
                    </div>
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                        style={{ left: `${splitPosition}%`, transform: 'translateX(-50%)' }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                            <span className="text-gray-600 text-lg">↔</span>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                        图片 1 (左侧 {splitPosition.toFixed(0)}%)
                    </div>
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                        图片 2 (右侧 {100 - splitPosition.toFixed(0)}%)
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    请上传两张图片进行对比
                </div>
            )}
        </div>
    );

    const renderFadeCompare = () => (
        <div className="relative w-full h-[500px] overflow-hidden rounded-lg border border-input">
            {image1 && image2 ? (
                <>
                    <img
                        src={image1}
                        alt="Image 1"
                        className="absolute inset-0 w-full h-full object-contain"
                    />
                    <img
                        src={image2}
                        alt="Image 2"
                        className="absolute inset-0 w-full h-full object-contain transition-opacity"
                        style={{ opacity: opacity / 100 }}
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded text-sm">
                        透明度: {opacity}%
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    请上传两张图片进行对比
                </div>
            )}
        </div>
    );

    const renderDiffCompare = () => (
        <div className="relative w-full h-[500px] overflow-hidden rounded-lg border border-input flex items-center justify-center bg-background">
            {diffCanvas ? (
                <>
                    <img
                        src={diffCanvas}
                        alt="Difference"
                        className="max-w-full max-h-full object-contain"
                    />
                    {compareMode === 'highlight' && (
                        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                            红色区域 = 差异部分
                        </div>
                    )}
                    {compareMode === 'subtract' && (
                        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                            亮色区域 = 差异部分
                        </div>
                    )}
                </>
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    {image1 && image2 ? '计算差异中...' : '请上传两张图片进行对比'}
                </div>
            )}
        </div>
    );

    const renderImageInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
                <h3 className="font-semibold mb-3">图片 1 详情</h3>
                {imageInfo1 ? (
                    <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">文件名:</span> {imageInfo1.name}</p>
                        <p><span className="text-muted-foreground">尺寸:</span> {imageInfo1.width} × {imageInfo1.height} px</p>
                        <p><span className="text-muted-foreground">大小:</span> {formatFileSize(imageInfo1.size)}</p>
                        <p><span className="text-muted-foreground">类型:</span> {imageInfo1.type}</p>
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">未上传图片</p>
                )}
            </Card>
            <Card className="p-4">
                <h3 className="font-semibold mb-3">图片 2 详情</h3>
                {imageInfo2 ? (
                    <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">文件名:</span> {imageInfo2.name}</p>
                        <p><span className="text-muted-foreground">尺寸:</span> {imageInfo2.width} × {imageInfo2.height} px</p>
                        <p><span className="text-muted-foreground">大小:</span> {formatFileSize(imageInfo2.size)}</p>
                        <p><span className="text-muted-foreground">类型:</span> {imageInfo2.type}</p>
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">未上传图片</p>
                )}
            </Card>
        </div>
    );

    const renderCompareContent = () => {
        switch (compareMode) {
            case 'split':
                return (
                    <>
                        {renderSplitCompare()}
                        <p className="text-sm text-muted-foreground mt-2 text-center">
                            拖动中间的竖线来对比两张图片的差异
                        </p>
                    </>
                );
            case 'fade':
                return (
                    <>
                        {renderFadeCompare()}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                                图片 2 透明度: {opacity}%
                            </label>
                            <Slider
                                value={[opacity]}
                                min={0}
                                max={100}
                                step={1}
                                onValueChange={(value) => setOpacity(value[0])}
                            />
                        </div>
                    </>
                );
            case 'highlight':
                return (
                    <>
                        {renderDiffCompare()}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                                敏感度阈值: {highlightThreshold}
                            </label>
                            <Slider
                                value={[highlightThreshold]}
                                min={0}
                                max={100}
                                step={1}
                                onValueChange={(value) => {
                                    setHighlightThreshold(value[0]);
                                    computeDifference();
                                }}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                较低的阈值会检测到更多细微差异，较高的阈值只会检测到明显差异
                            </p>
                        </div>
                    </>
                );
            case 'subtract':
                return (
                    <>
                        {renderDiffCompare()}
                        <p className="text-sm text-muted-foreground mt-2 text-center">
                            像素相减模式：亮色区域表示两张图片的差异部分
                        </p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <main className="min-h-screen flex flex-col">
            <div className="main pt-32">
                <h1 className="text-4xl font-bold mb-8">图片对比工具</h1>
                <p className="text-muted-foreground mb-4">在线对比两张图片的差异，支持多种对比模式。</p>
                <div className="text-sm text-muted-foreground mb-12 space-y-1">
                    <p>支持分割、淡化、高亮和相减四种对比模式，帮助您快速找出图片差异。</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {(Object.keys(modeLabels) as CompareMode[]).map((mode) => (
                        <Button
                            key={mode}
                            variant={compareMode === mode ? 'default' : 'secondary'}
                            onClick={() => setCompareMode(mode)}
                            className="flex-1 min-w-[120px]"
                        >
                            {modeLabels[mode]}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            图片 1:
                        </label>
                        <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage1Upload}
                                className="hidden"
                                id="image1-upload"
                            />
                            <label htmlFor="image1-upload" className="cursor-pointer">
                                {image1 ? (
                                    <img src={image1} alt="Preview 1" className="max-h-32 mx-auto rounded" />
                                ) : (
                                    <div>
                                        <p className="text-muted-foreground">点击上传图片 1</p>
                                        <p className="text-xs text-muted-foreground mt-1">支持 JPG, PNG, GIF, WebP</p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 lg:px-4">
                        <div className="flex flex-col gap-2 w-full lg:w-auto">
                            <Button onClick={handleSwap} variant="secondary" className="w-full lg:w-[180px]">
                                ⇄ 交换图片
                            </Button>
                            <Button onClick={handleClear} variant="outline" className="w-full lg:w-[180px]">
                                清空
                            </Button>
                            <Button
                                onClick={() => setShowInfo(!showInfo)}
                                variant="outline"
                                className="w-full lg:w-[180px]"
                            >
                                <Info size={16} className="mr-2" />
                                {showInfo ? '隐藏详情' : '查看详情'}
                            </Button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            图片 2:
                        </label>
                        <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage2Upload}
                                className="hidden"
                                id="image2-upload"
                            />
                            <label htmlFor="image2-upload" className="cursor-pointer">
                                {image2 ? (
                                    <img src={image2} alt="Preview 2" className="max-h-32 mx-auto rounded" />
                                ) : (
                                    <div>
                                        <p className="text-muted-foreground">点击上传图片 2</p>
                                        <p className="text-xs text-muted-foreground mt-1">支持 JPG, PNG, GIF, WebP</p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>
                </div>

                {showInfo && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">文件详情</h3>
                        {renderImageInfo()}
                    </div>
                )}

                {renderCompareContent()}
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="mb-20"></div>
        </main>
    );
};

export default ImageComparePage;
