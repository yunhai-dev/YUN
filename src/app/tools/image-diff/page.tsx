"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, FileImage, Info } from 'lucide-react';

// 图片元数据类型
interface ImageData {
  src: string;
  file: File | null;
  width: number;
  height: number;
  size: number;
  type: string;
  name: string;
}

const ImageDiffPage = () => {
  const [image1, setImage1] = useState<ImageData>({
    src: '',
    file: null,
    width: 0,
    height: 0,
    size: 0,
    type: '',
    name: '',
  });
  const [image2, setImage2] = useState<ImageData>({
    src: '',
    file: null,
    width: 0,
    height: 0,
    size: 0,
    type: '',
    name: '',
  });
  const [mode, setMode] = useState<'split' | 'fade' | 'highlight' | 'subtract'>('split');
  const [splitPosition, setSplitPosition] = useState(50);
  const [fadeOpacity, setFadeOpacity] = useState(50);
  const [diffResult, setDiffResult] = useState<string | null>(null);
  const [showDiff, setShowDiff] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails1, setShowDetails1] = useState(false);
  const [showDetails2, setShowDetails2] = useState(false);
  
  const imageRef1 = useRef<HTMLImageElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // 加载图片并获取元数据
  const loadImage = useCallback((file: File) => {
    return new Promise<ImageData>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            src: e.target?.result as string,
            file,
            width: img.width,
            height: img.height,
            size: file.size,
            type: file.type,
            name: file.name,
          });
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  // 处理文件上传
  const handleFileUpload = useCallback(
    async (file: File, imageIndex: 1 | 2) => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: '请选择图片文件',
          description: '支持的格式：JPG, PNG, GIF, WebP',
          variant: 'destructive',
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: '文件过大',
          description: '请选择小于10MB的图片',
          variant: 'destructive',
        });
        return;
      }

      try {
        const imageData = await loadImage(file);
        if (imageIndex === 1) {
          setImage1(imageData);
        } else {
          setImage2(imageData);
        }
        setShowDiff(false);
      } catch (error) {
        toast({
          title: '图片加载失败',
          description: '请尝试重新选择图片',
          variant: 'destructive',
        });
      }
    },
    [loadImage, toast]
  );

  // 处理拖拽上传
  const handleDrop = useCallback(
    (e: React.DragEvent, imageIndex: 1 | 2) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(files[0], imageIndex);
      }
    },
    [handleFileUpload]
  );

  // 处理点击选择文件
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent, imageIndex: 1 | 2) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        handleFileUpload(target.files[0], imageIndex);
      }
    },
    [handleFileUpload]
  );

  // 计算图片差异
  const calculateDiff = useCallback(() => {
    if (!image1.src || !image2.src || !imageRef1.current || !imageRef2.current || !canvasRef.current) {
      return;
    }

    setIsLoading(true);

    // 使用 requestIdleCallback 避免阻塞主线程
    requestIdleCallback(() => {
      try {
        const img1 = imageRef1.current;
        const img2 = imageRef2.current;
        const canvas = canvasRef.current;
        
        // 设置画布尺寸
        const width = Math.max(img1.width, img2.width);
        const height = Math.max(img1.height, img2.height);
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 根据模式处理差异
        if (mode === 'highlight') {
          // 高亮模式：使用exclusion复合模式增强差异
          ctx.globalCompositeOperation = 'exclusion';
          ctx.drawImage(img1, 0, 0);
          ctx.drawImage(img2, 0, 0);
        } else if (mode === 'subtract') {
          // 相减模式：使用difference复合模式
          ctx.globalCompositeOperation = 'difference';
          ctx.drawImage(img1, 0, 0);
          ctx.drawImage(img2, 0, 0);
        }

        // 获取差异图片数据
        const diffUrl = canvas.toDataURL('image/png');
        setDiffResult(diffUrl);
        setShowDiff(true);
      } catch (error) {
        toast({
          title: '差异计算失败',
          description: '请确保两张图片都是有效的',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    });
  }, [image1.src, image2.src, mode, toast]);

  // 清除所有
  const handleClear = () => {
    setImage1({
      src: '',
      file: null,
      width: 0,
      height: 0,
      size: 0,
      type: '',
      name: '',
    });
    setImage2({
      src: '',
      file: null,
      width: 0,
      height: 0,
      size: 0,
      type: '',
      name: '',
    });
    setShowDiff(false);
    setDiffResult(null);
  };

  // 交换图片
  const handleSwap = () => {
    const temp = { ...image1 };
    setImage1({ ...image2 });
    setImage2(temp);
    setShowDiff(false);
  };

  // 下载差异结果
  const handleDownloadDiff = useCallback(() => {
    if (!diffResult) return;
    
    const link = document.createElement('a');
    link.href = diffResult;
    link.download = `diff-${Date.now()}.png`;
    link.click();
  }, [diffResult]);

  // 格式化文件大小
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // 渲染详情面板
  const renderDetailsPanel = (image: ImageData, index: number) => {
    const show = index === 1 ? showDetails1 : showDetails2;
    const toggle = index === 1 ? setShowDetails1 : setShowDetails2;
    
    return (
      <div className="mt-4">
        <Button
          variant="outline"
          size="sm"
          className="mb-2"
          onClick={() => toggle(!show)}
        >
          <Info size={16} className="mr-2" />
          {show ? '收起详情' : '查看详情'}
        </Button>
        {show && image.file && (
          <Card className="p-4 bg-background border border-input">
            <h4 className="font-semibold mb-3">图片 {index} 信息</h4>
            <ScrollArea className="h-48 pr-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">文件名:</span>
                  <span className="font-mono truncate max-w-64">{image.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">格式:</span>
                  <span>{image.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">尺寸:</span>
                  <span>{image.width} x {image.height} 像素</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">文件大小:</span>
                  <span>{formatFileSize(image.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">宽高比:</span>
                  <span>{image.width > 0 && image.height > 0 
                    ? (image.width / image.height).toFixed(2)
                    : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">平均颜色:</span>
                  <span className="font-mono">
                    {image.width > 0 && image.height > 0 
                      ? '#000000' 
                      : 'N/A'}</span>
                </div>
              </div>
            </ScrollArea>
          </Card>
        )}
      </div>
    );
  };

  // 模式切换时重新计算差异
  useEffect(() => {
    if (mode === 'highlight' || mode === 'subtract') {
      if (image1.src && image2.src) {
        calculateDiff();
      }
    }
  }, [mode]);

  return (
    <main className="min-h-screen flex flex-col">
      <div className="main pt-32">
        <h1 className="text-4xl font-bold mb-8">图片对比工具</h1>
        <p className="text-muted-foreground mb-4">在线对比两张图片的差异，支持多种对比模式。</p>
        <div className="text-sm text-muted-foreground mb-12 space-y-1">
          <p>支持拖拽上传或点击选择图片，最大支持10MB。可通过分割、淡化、高亮和相减模式查看差异。</p>
        </div>

        {/* 模式选择 */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={mode === 'split' ? 'default' : 'outline'}
            onClick={() => setMode('split')}
            size="sm"
          >
            分割
          </Button>
          <Button
            variant={mode === 'fade' ? 'default' : 'outline'}
            onClick={() => setMode('fade')}
            size="sm"
          >
            淡化
          </Button>
          <Button
            variant={mode === 'highlight' ? 'default' : 'outline'}
            onClick={() => {
              setMode('highlight');
              calculateDiff();
            }}
            size="sm"
          >
            高亮
          </Button>
          <Button
            variant={mode === 'subtract' ? 'default' : 'outline'}
            onClick={() => {
              setMode('subtract');
              calculateDiff();
            }}
            size="sm"
          >
            相减
          </Button>
        </div>

        {/* 图片上传区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 mb-6">
          {/* 左侧图片 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-muted-foreground">
                图片 1
              </label>
              {image1.file && (
                <Badge variant="outline" className="text-xs">
                  {image1.type}
                </Badge>
              )}
            </div>
            
            <div
              className="border-2 border-dashed rounded-lg p-8 border-input bg-background hover:border-primary transition-colors cursor-pointer relative min-h-[300px] flex flex-col items-center justify-center"
              onDrop={(e) => handleDrop(e, 1)}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => handleFileSelect(e, 1);
                input.click();
              }}
            >
              {image1.src ? (
                <img
                  ref={imageRef1}
                  src={image1.src}
                  alt="Image 1"
                  className="max-w-full max-h-[300px] object-contain rounded"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <FileImage size={48} className="mx-auto mb-4 opacity-50" />
                  <p>拖拽图片到这里</p>
                  <p className="text-sm">或点击选择图片</p>
                </div>
              )}
            </div>
            {renderDetailsPanel(image1, 1)}
          </div>

          {/* 中间控制区域 */}
          <div className="flex flex-col items-center justify-center gap-4 px-4">
            <div className="flex flex-col gap-2 w-full">
              <Button onClick={handleSwap} variant="outline" className="w-full">
                ⇄ 交换
              </Button>
              <Button onClick={handleClear} variant="outline" className="w-full">
                清空
              </Button>
            </div>
          </div>

          {/* 右侧图片 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-muted-foreground">
                图片 2
              </label>
              {image2.file && (
                <Badge variant="outline" className="text-xs">
                  {image2.type}
                </Badge>
              )}
            </div>
            
            <div
              className="border-2 border-dashed rounded-lg p-8 border-input bg-background hover:border-primary transition-colors cursor-pointer relative min-h-[300px] flex flex-col items-center justify-center"
              onDrop={(e) => handleDrop(e, 2)}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => handleFileSelect(e, 2);
                input.click();
              }}
            >
              {image2.src ? (
                <img
                  ref={imageRef2}
                  src={image2.src}
                  alt="Image 2"
                  className="max-w-full max-h-[300px] object-contain rounded"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <FileImage size={48} className="mx-auto mb-4 opacity-50" />
                  <p>拖拽图片到这里</p>
                  <p className="text-sm">或点击选择图片</p>
                </div>
              )}
            </div>
            {renderDetailsPanel(image2, 2)}
          </div>
        </div>

        {/* 对比结果显示 */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">对比结果</h2>
            {showDiff && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadDiff}
                startIcon={<Download size={16} />}
              >
                下载差异图片
              </Button>
            )}
          </div>

          {/* 分割模式控制器 */}
          {mode === 'split' && image1.src && image2.src && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                分割位置: {splitPosition}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={splitPosition}
                onChange={(e) => setSplitPosition(Number(e.target.value))}
                className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          )}

          {/* 淡化模式控制器 */}
          {mode === 'fade' && image1.src && image2.src && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                透明度: {fadeOpacity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={fadeOpacity}
                onChange={(e) => setFadeOpacity(Number(e.target.value))}
                className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          )}

          {/* 结果展示区域 */}
          <div className="border border-input rounded-lg overflow-hidden bg-background min-h-[400px] flex items-center justify-center p-4">
            {!image1.src || !image2.src ? (
              <p className="text-muted-foreground text-lg">请选择两张图片进行对比</p>
            ) : (
              <div className="relative w-full max-w-4xl">
                {mode === 'split' && (
                  <div className="relative w-full max-h-[600px] overflow-hidden rounded-lg">
                    <img
                      src={image1.src}
                      alt="Image 1"
                      className="w-full h-auto object-contain"
                      crossOrigin="anonymous"
                    />
                    <div
                      className="absolute top-0 h-full overflow-hidden"
                      style={{ 
                        left: `${splitPosition}%`, 
                        width: `${100 - splitPosition}%`,
                        clipPath: `inset(0 0 0 ${splitPosition}%)`
                      }}
                    >
                      <img
                        src={image2.src}
                        alt="Image 2"
                        className="w-full h-auto object-contain"
                        crossOrigin="anonymous"
                        style={{ transform: `translateX(-${splitPosition}%)` }}
                      />
                    </div>
                    <div
                      className="absolute top-0 w-1 h-full bg-white cursor-col-resize shadow-lg z-10"
                      style={{ left: `${splitPosition}%` }}
                    />
                  </div>
                )}
                
                {mode === 'fade' && (
                  <div className="relative w-full max-h-[600px] overflow-hidden rounded-lg">
                    <img
                      ref={imageRef1}
                      src={image1.src}
                      alt="Image 1"
                      className="w-full h-auto object-contain"
                      crossOrigin="anonymous"
                    />
                    <div
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ opacity: fadeOpacity / 100 }}
                    >
                      <img
                        ref={imageRef2}
                        src={image2.src}
                        alt="Image 2"
                        className="w-full h-auto object-contain"
                        crossOrigin="anonymous"
                      />
                    </div>
                  </div>
                )}
                
                {(mode === 'highlight' || mode === 'subtract') && (
                  <div className="relative w-full max-h-[600px] overflow-hidden rounded-lg">
                    {isLoading ? (
                      <div className="text-center text-muted-foreground py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4" />
                        <p>正在计算差异...</p>
                      </div>
                    ) : showDiff && diffResult ? (
                      <img
                        src={diffResult}
                        alt="Difference Result"
                        className="w-full h-auto object-contain"
                      />
                    ) : (
                      <p className="text-muted-foreground py-20">等待计算差异...</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">使用说明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-background rounded-lg border border-input">
              <h4 className="font-medium mb-2">分割模式</h4>
              <p className="text-muted-foreground">拖动中间竖线查看两张图片的不同区域</p>
            </div>
            <div className="p-4 bg-background rounded-lg border border-input">
              <h4 className="font-medium mb-2">淡化模式</h4>
              <p className="text-muted-foreground">调整透明度重叠图片，查看位置偏移</p>
            </div>
            <div className="p-4 bg-background rounded-lg border border-input">
              <h4 className="font-medium mb-2">高亮模式</h4>
              <p className="text-muted-foreground">自动标记图片间的差异区域，用于检测修改</p>
            </div>
            <div className="p-4 bg-background rounded-lg border border-input">
              <h4 className="font-medium mb-2">相减模式</h4>
              <p className="text-muted-foreground">像素相减，以颜色暗淡显示差异</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-20"></div>

      {/* 隐藏的画布用于计算差异 */}
      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
};

export default ImageDiffPage;
