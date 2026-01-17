"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Image, Info, RotateCcw, Trash2 } from 'lucide-react';

type CompareMode = 'split' | 'fade' | 'highlight' | 'subtract';

interface ImageData {
  src: string;
  file?: File;
  width: number;
  height: number;
  size: number;
  type: string;
}

const ImageComparePage = () => {
  const [image1, setImage1] = useState<ImageData | null>(null);
  const [image2, setImage2] = useState<ImageData | null>(null);
  const [compareMode, setCompareMode] = useState<CompareMode>('split');
  const [splitPosition, setSplitPosition] = useState(50);
  const [opacity, setOpacity] = useState(50);
  const [diffThreshold, setDiffThreshold] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const [showDetails1, setShowDetails1] = useState(false);
  const [showDetails2, setShowDetails2] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>, isImage1: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('请选择有效的图片文件');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const imageData: ImageData = {
          src: event.target?.result as string,
          file,
          width: img.width,
          height: img.height,
          size: file.size,
          type: file.type
        };
        
        if (isImage1) {
          setImage1(imageData);
        } else {
          setImage2(imageData);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  useEffect(() => {
    if (image1) {
      const img = new window.Image();
      img.onload = () => {
        image1Ref.current = img;
      };
      img.src = image1.src;
    }
  }, [image1]);

  useEffect(() => {
    if (image2) {
      const img = new window.Image();
      img.onload = () => {
        image2Ref.current = img;
      };
      img.src = image2.src;
    }
  }, [image2]);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSplitPosition(Math.max(0, Math.min(100, position)));
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const calculateDifference = useCallback((mode: CompareMode, threshold: number) => {
    if (!image1Ref.current || !image2Ref.current || !canvasRef.current) return;

    const img1 = image1Ref.current;
    const img2 = image2Ref.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = Math.min(img1.width, img2.width);
    const height = Math.min(img1.height, img2.height);
    
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img1, 0, 0, width, height);
    const data1 = ctx.getImageData(0, 0, width, height);
    
    ctx.drawImage(img2, 0, 0, width, height);
    const data2 = ctx.getImageData(0, 0, width, height);

    const resultData = ctx.createImageData(width, height);

    for (let i = 0; i < data1.data.length; i += 4) {
      const r1 = data1.data[i];
      const g1 = data1.data[i + 1];
      const b1 = data1.data[i + 2];
      const a1 = data1.data[i + 3];

      const r2 = data2.data[i];
      const g2 = data2.data[i + 1];
      const b2 = data2.data[i + 2];
      const a2 = data2.data[i + 3];

      const diffR = Math.abs(r1 - r2);
      const diffG = Math.abs(g1 - g2);
      const diffB = Math.abs(b1 - b2);
      const diffA = Math.abs(a1 - a2);

      const totalDiff = diffR + diffG + diffB + diffA;

      if (mode === 'highlight') {
        if (totalDiff > threshold) {
          resultData.data[i] = r2;
          resultData.data[i + 1] = g2;
          resultData.data[i + 2] = b2;
          resultData.data[i + 3] = a2;
        } else {
          resultData.data[i] = r1 * 0.3;
          resultData.data[i + 1] = g1 * 0.3;
          resultData.data[i + 2] = b1 * 0.3;
          resultData.data[i + 3] = a1;
        }
      } else if (mode === 'subtract') {
        resultData.data[i] = Math.abs(r1 - r2);
        resultData.data[i + 1] = Math.abs(g1 - g2);
        resultData.data[i + 2] = Math.abs(b1 - b2);
        resultData.data[i + 3] = Math.max(a1, a2);
      }
    }

    ctx.putImageData(resultData, 0, 0);
  }, []);

  useEffect(() => {
    if ((compareMode === 'highlight' || compareMode === 'subtract') && image1 && image2) {
      calculateDifference(compareMode, diffThreshold);
    }
  }, [compareMode, diffThreshold, image1, image2]);

  const handleClear = useCallback(() => {
    setImage1(null);
    setImage2(null);
    setSplitPosition(50);
    setOpacity(50);
    image1Ref.current = null;
    image2Ref.current = null;
  }, []);

  const handleReset = useCallback(() => {
    setSplitPosition(50);
    setOpacity(50);
    setDiffThreshold(30);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="main pt-32">
        <h1 className="text-4xl font-bold mb-8">图片对比工具</h1>
        <p className="text-muted-foreground mb-4">
          通过多种方式对比两张图片的差异，支持分割查看、透明度调整、高亮差异区域和像素相减。
        </p>

        {!image1 || !image2 ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>上传图片</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Image className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">图片 1</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, true)}
                  className="hidden"
                  id="upload1"
                />
                <Button onClick={() => document.getElementById('upload1')?.click()}>
                  选择图片
                </Button>
                {image1 && (
                  <div className="mt-4 text-sm text-green-600">
                    ✓ 已上传: {image1.file?.name || '图片1'}
                  </div>
                )}
              </div>

              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Image className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">图片 2</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, false)}
                  className="hidden"
                  id="upload2"
                />
                <Button onClick={() => document.getElementById('upload2')?.click()}>
                  选择图片
                </Button>
                {image2 && (
                  <div className="mt-4 text-sm text-green-600">
                    ✓ 已上传: {image2.file?.name || '图片2'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex gap-2 mb-6">
                {(['split', 'fade', 'highlight', 'subtract'] as CompareMode[]).map((mode) => (
                  <Button
                    key={mode}
                    variant={compareMode === mode ? "default" : "secondary"}
                    onClick={() => setCompareMode(mode)}
                    className="flex-1"
                  >
                    {mode === 'split' && '分割对比'}
                    {mode === 'fade' && '淡化对比'}
                    {mode === 'highlight' && '高亮差异'}
                    {mode === 'subtract' && '像素相减'}
                  </Button>
                ))}
              </div>

              {compareMode === 'split' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">分割位置: {splitPosition}%</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={splitPosition}
                      onChange={(e) => setSplitPosition(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              )}

              {compareMode === 'fade' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">透明度: {opacity}%</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={opacity}
                      onChange={(e) => setOpacity(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    调整滑块控制图片2的透明度，两张图片重叠显示以查看位置偏移。
                  </p>
                </div>
              )}

              {(compareMode === 'highlight' || compareMode === 'subtract') && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">差异阈值: {diffThreshold}</span>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="1"
                      value={diffThreshold}
                      onChange={(e) => setDiffThreshold(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {compareMode === 'highlight' 
                      ? '较低的值会更敏感地显示差异，较高的值会忽略细微差异。' 
                      : '像素相减会将差异以灰度值显示，差异越大越亮。'}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4 mb-6">
              <Button onClick={handleReset} variant="secondary">
                <RotateCcw className="w-4 h-4 mr-2" />
                重置
              </Button>
              <Button onClick={handleClear} variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                清空
              </Button>
            </div>

            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex justify-center items-center min-h-[400px] p-4">
              {compareMode === 'split' ? (
                <div
                  ref={containerRef}
                  className="relative w-full max-w-4xl h-auto cursor-col-resize select-none"
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={handleDragStart}
                  onTouchMove={handleDragMove}
                  onTouchEnd={handleDragEnd}
                >
                  <div className="absolute inset-0 flex">
                    <div className="h-full overflow-hidden" style={{ width: `${splitPosition}%` }}>
                      <img
                        src={image1.src}
                        alt="图片1"
                        className="h-full w-full object-contain"
                        crossOrigin="anonymous"
                      />
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 0 0 ${splitPosition}%)` }}
                  >
                    <img
                      src={image2.src}
                      alt="图片2"
                      className="h-full w-full object-contain"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                    style={{ left: `calc(${splitPosition}% - 2px)` }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="w-3 h-3 flex justify-between">
                        <div className="w-0.5 h-full bg-gray-400"></div>
                        <div className="w-0.5 h-full bg-gray-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : compareMode === 'fade' ? (
                <div className="relative w-full max-w-4xl h-auto">
                  <img
                    src={image1.src}
                    alt="图片1"
                    className="h-full w-full object-contain"
                    crossOrigin="anonymous"
                  />
                  <img
                    src={image2.src}
                    alt="图片2"
                    className="absolute top-0 left-0 h-full w-full object-contain"
                    style={{ opacity: opacity / 100 }}
                    crossOrigin="anonymous"
                  />
                </div>
              ) : (
                <div className="w-full max-w-4xl h-auto">
                  <canvas
                    ref={canvasRef}
                    className="h-full w-full object-contain"
                  />
                  <div className="mt-4 text-sm text-muted-foreground text-center">
                    {compareMode === 'highlight' 
                      ? '高亮显示两张图片之间的差异区域（未淡化的部分为差异区域）' 
                      : '像素相减结果：差异越明显，颜色越亮'}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Dialog open={showDetails1} onOpenChange={setShowDetails1}>
                <DialogTrigger asChild>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        图片 1 信息
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{image1.file?.name}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>图片 1 详情</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    <p><strong>文件名:</strong> {image1.file?.name}</p>
                    <p><strong>格式:</strong> {image1.type}</p>
                    <p><strong>分辨率:</strong> {image1.width} × {image1.height}</p>
                    <p><strong>大小:</strong> {formatFileSize(image1.size)}</p>
                    <p><strong>宽高比:</strong> {(image1.width / image1.height).toFixed(2)} : 1</p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showDetails2} onOpenChange={setShowDetails2}>
                <DialogTrigger asChild>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        图片 2 信息
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{image2.file?.name}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>图片 2 详情</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    <p><strong>文件名:</strong> {image2.file?.name}</p>
                    <p><strong>格式:</strong> {image2.type}</p>
                    <p><strong>分辨率:</strong> {image2.width} × {image2.height}</p>
                    <p><strong>大小:</strong> {formatFileSize(image2.size)}</p>
                    <p><strong>宽高比:</strong> {(image2.width / image2.height).toFixed(2)} : 1</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {image1.width !== image2.width || image1.height !== image2.height ? (
              <Alert variant="destructive" className="mt-6">
                <AlertDescription>
                  警告: 两张图片分辨率不同（图片1: {image1.width}×{image1.height}, 图片2: {image2.width}×{image2.height}），可能影响对比效果。
                </AlertDescription>
              </Alert>
            ) : null}
          </>
        )}
      </div>
      <div className="mb-20"></div>
    </main>
  );
};

export default ImageComparePage;
