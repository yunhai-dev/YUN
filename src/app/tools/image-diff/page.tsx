"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  Upload, 
  Download, 
  RefreshCw, 
  ZoomIn, 
  ZoomOut, 
  Info,
  Eye,
  Layers,
  Sparkles,
  Minus,
  X
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

/**
 * 图片对比工具
 * 支持多种对比模式：分割、淡化、高亮、相减
 */

type CompareMode = 'split' | 'fade' | 'highlight' | 'subtract';

interface ImageMetadata {
  width: number;
  height: number;
  size: number;
  format: string;
  name: string;
}

const ImageDiffPage = () => {
  const { toast } = useToast();
  
  // 图片状态
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);
  const [image1Metadata, setImage1Metadata] = useState<ImageMetadata | null>(null);
  const [image2Metadata, setImage2Metadata] = useState<ImageMetadata | null>(null);
  
  // 对比模式
  const [compareMode, setCompareMode] = useState<CompareMode>('split');
  
  // 分割模式相关
  const [splitPosition, setSplitPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  
  // 淡化模式相关
  const [opacity, setOpacity] = useState([50]);
  
  // 高亮模式相关
  const [highlightThreshold, setHighlightThreshold] = useState([10]);
  
  // 缩放相关
  const [zoom, setZoom] = useState(100);
  
  // 文件详情显示
  const [showMetadata, setShowMetadata] = useState(false);
  
  // Refs
  const canvas1Ref = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);

  /**
   * 处理图片上传
   */
  const handleImageUpload = useCallback(async (file: File, isImage1: boolean) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "文件格式错误",
        description: "请上传图片文件",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const metadata: ImageMetadata = {
          width: img.width,
          height: img.height,
          size: file.size,
          format: file.type.split('/')[1].toUpperCase(),
          name: file.name,
        };

        if (isImage1) {
          setImage1(imageUrl);
          setImage1Metadata(metadata);
        } else {
          setImage2(imageUrl);
          setImage2Metadata(metadata);
        }
      };
      img.src = imageUrl;
    };
    reader.readAsDataURL(file);
  }, [toast]);

  /**
   * 处理文件输入变化
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isImage1: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file, isImage1);
    }
  };

  /**
   * 加载图片到 Canvas
   */
  const loadImageToCanvas = useCallback((imageUrl: string, canvas: HTMLCanvasElement | null): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!canvas) {
        reject(new Error('Canvas not found'));
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not found'));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve();
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageUrl;
    });
  }, []);

  /**
   * 执行图片对比
   */
  const performComparison = useCallback(async () => {
    if (!image1 || !image2 || !canvas1Ref.current || !canvas2Ref.current || !resultCanvasRef.current) {
      return;
    }

    try {
      await loadImageToCanvas(image1, canvas1Ref.current);
      await loadImageToCanvas(image2, canvas2Ref.current);

      const ctx1 = canvas1Ref.current.getContext('2d');
      const ctx2 = canvas2Ref.current.getContext('2d');
      const resultCtx = resultCanvasRef.current.getContext('2d');

      if (!ctx1 || !ctx2 || !resultCtx) {
        return;
      }

      const width = canvas1Ref.current.width;
      const height = canvas1Ref.current.height;

      resultCanvasRef.current.width = width;
      resultCanvasRef.current.height = height;

      const imageData1 = ctx1.getImageData(0, 0, width, height);
      const imageData2 = ctx2.getImageData(0, 0, width, height);
      const resultImageData = resultCtx.createImageData(width, height);

      const data1 = imageData1.data;
      const data2 = imageData2.data;
      const resultData = resultImageData.data;

      const threshold = highlightThreshold[0];

      for (let i = 0; i < data1.length; i += 4) {
        const r1 = data1[i];
        const g1 = data1[i + 1];
        const b1 = data1[i + 2];
        const a1 = data1[i + 3];

        const r2 = data2[i];
        const g2 = data2[i + 1];
        const b2 = data2[i + 2];
        const a2 = data2[i + 3];

        if (compareMode === 'highlight') {
          // 高亮模式：标记差异区域
          const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
          if (diff > threshold * 3) {
            resultData[i] = 255;
            resultData[i + 1] = 0;
            resultData[i + 2] = 0;
            resultData[i + 3] = 255;
          } else {
            resultData[i] = r1;
            resultData[i + 1] = g1;
            resultData[i + 2] = b1;
            resultData[i + 3] = a1;
          }
        } else if (compareMode === 'subtract') {
          // 相减模式：显示差异
          resultData[i] = Math.abs(r1 - r2);
          resultData[i + 1] = Math.abs(g1 - g2);
          resultData[i + 2] = Math.abs(b1 - b2);
          resultData[i + 3] = Math.max(a1, a2);
        }
      }

      resultCtx.putImageData(resultImageData, 0, 0);
    } catch (error) {
      console.error('Comparison failed:', error);
      toast({
        title: "对比失败",
        description: "图片尺寸不一致或加载失败",
        variant: "destructive",
      });
    }
  }, [image1, image2, compareMode, highlightThreshold, loadImageToCanvas, toast]);

  /**
   * 执行分割模式对比
   */
  const performSplitComparison = useCallback(async () => {
    if (!image1 || !image2 || !resultCanvasRef.current) {
      return;
    }

    try {
      const img1 = new Image();
      const img2 = new Image();
      
      await Promise.all([
        new Promise<void>((resolve) => {
          img1.onload = () => resolve();
          img1.src = image1;
        }),
        new Promise<void>((resolve) => {
          img2.onload = () => resolve();
          img2.src = image2;
        })
      ]);

      const ctx = resultCanvasRef.current.getContext('2d');
      if (!ctx) return;

      const width = Math.max(img1.width, img2.width);
      const height = Math.max(img1.height, img2.height);

      resultCanvasRef.current.width = width;
      resultCanvasRef.current.height = height;

      const splitX = (splitPosition / 100) * width;

      // 绘制左侧图片（图片1的对应部分）
      // 计算图片1的缩放比例
      const scaleX1 = img1.width / width;
      const sourceX1 = 0;
      const sourceWidth1 = splitX * scaleX1;
      ctx.drawImage(img1, sourceX1, 0, sourceWidth1, img1.height, 0, 0, splitX, height);
      
      // 绘制右侧图片（图片2的对应部分）
      // 计算图片2的缩放比例
      const scaleX2 = img2.width / width;
      const sourceX2 = splitX * scaleX2;
      const sourceWidth2 = (width - splitX) * scaleX2;
      ctx.drawImage(img2, sourceX2, 0, sourceWidth2, img2.height, splitX, 0, width - splitX, height);
      
      // 绘制分割线
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(splitX, 0);
      ctx.lineTo(splitX, height);
      ctx.stroke();
    } catch (error) {
      console.error('Split comparison failed:', error);
    }
  }, [image1, image2, splitPosition]);

  /**
   * 执行淡化模式对比
   */
  const performFadeComparison = useCallback(async () => {
    if (!image1 || !image2 || !resultCanvasRef.current) {
      return;
    }

    try {
      const img1 = new Image();
      const img2 = new Image();
      
      await Promise.all([
        new Promise<void>((resolve) => {
          img1.onload = () => resolve();
          img1.src = image1;
        }),
        new Promise<void>((resolve) => {
          img2.onload = () => resolve();
          img2.src = image2;
        })
      ]);

      const ctx = resultCanvasRef.current.getContext('2d');
      if (!ctx) return;

      const width = Math.max(img1.width, img2.width);
      const height = Math.max(img1.height, img2.height);

      resultCanvasRef.current.width = width;
      resultCanvasRef.current.height = height;

      const alpha = opacity[0] / 100;

      // 绘制底部图片（图片1）
      ctx.globalAlpha = 1;
      ctx.drawImage(img1, 0, 0, img1.width, img1.height, 0, 0, width, height);
      
      // 绘制顶部图片（图片2，带透明度）
      ctx.globalAlpha = alpha;
      ctx.drawImage(img2, 0, 0, img2.width, img2.height, 0, 0, width, height);
      
      ctx.globalAlpha = 1;
    } catch (error) {
      console.error('Fade comparison failed:', error);
    }
  }, [image1, image2, opacity]);

  /**
   * 根据模式执行对比
   */
  useEffect(() => {
    if (!image1 || !image2) return;

    if (compareMode === 'split') {
      performSplitComparison();
    } else if (compareMode === 'fade') {
      performFadeComparison();
    } else {
      performComparison();
    }
  }, [compareMode, image1, image2, splitPosition, opacity, highlightThreshold, performComparison, performSplitComparison, performFadeComparison]);

  /**
   * 处理分割线拖动
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (compareMode !== 'split') return;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current || compareMode !== 'split') return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSplitPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  /**
   * 下载对比结果
   */
  const handleDownload = () => {
    if (!resultCanvasRef.current) return;

    const link = document.createElement('a');
    link.download = `image-diff-${compareMode}-${Date.now()}.png`;
    link.href = resultCanvasRef.current.toDataURL('image/png');
    link.click();
  };

  /**
   * 清空图片
   */
  const handleClear = () => {
    setImage1(null);
    setImage2(null);
    setImage1Metadata(null);
    setImage2Metadata(null);
    setZoom(100);
    setSplitPosition(50);
    setOpacity([50]);
    setHighlightThreshold([10]);
  };

  /**
   * 格式化文件大小
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  /**
   * 渲染文件详情
   */
  const renderMetadata = (metadata: ImageMetadata | null, label: string) => {
    if (!metadata) return null;

    return (
      <div className="space-y-2">
        <h4 className="font-semibold text-sm">{label}</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div>文件名: <span className="text-foreground">{metadata.name}</span></div>
          <div>格式: <span className="text-foreground">{metadata.format}</span></div>
          <div>尺寸: <span className="text-foreground">{metadata.width} x {metadata.height}</span></div>
          <div>大小: <span className="text-foreground">{formatFileSize(metadata.size)}</span></div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="main pt-32">
        <h1 className="text-4xl font-bold mb-8">图片对比工具</h1>
        <p className="text-muted-foreground mb-12">
          在线对比两张图片的差异，支持多种对比模式，帮助您快速发现图片之间的变化。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 图片上传 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">上传图片</CardTitle>
                <CardDescription>选择两张需要对比的图片</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image1">图片 1</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image1"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, true)}
                      ref={fileInput1Ref}
                      className="cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => fileInput1Ref.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  {image1 && (
                    <div className="relative h-20 border rounded-md overflow-hidden">
                      <img src={image1} alt="Image 1" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image2">图片 2</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image2"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, false)}
                      ref={fileInput2Ref}
                      className="cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => fileInput2Ref.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  {image2 && (
                    <div className="relative h-20 border rounded-md overflow-hidden">
                      <img src={image2} alt="Image 2" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="flex-1"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    清空
                  </Button>
                  <Button
                    onClick={() => setShowMetadata(!showMetadata)}
                    variant="outline"
                    size="icon"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 对比模式选择 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">对比模式</CardTitle>
                <CardDescription>选择不同的对比方式</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={compareMode} onValueChange={(v) => setCompareMode(v as CompareMode)}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="split" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      分割
                    </TabsTrigger>
                    <TabsTrigger value="fade" className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      淡化
                    </TabsTrigger>
                    <TabsTrigger value="highlight" className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      高亮
                    </TabsTrigger>
                    <TabsTrigger value="subtract" className="flex items-center gap-2">
                      <Minus className="h-4 w-4" />
                      相减
                    </TabsTrigger>
                  </TabsList>

                  {/* 分割模式控制 */}
                  <TabsContent value="split" className="mt-4">
                    <div className="space-y-2">
                      <Label>分割位置: {Math.round(splitPosition)}%</Label>
                      <Slider
                        value={[splitPosition]}
                        onValueChange={(v) => setSplitPosition(v[0])}
                        max={100}
                        step={1}
                      />
                      <p className="text-xs text-muted-foreground">
                        拖动滑块或直接在图片上拖动来调整分割位置
                      </p>
                    </div>
                  </TabsContent>

                  {/* 淡化模式控制 */}
                  <TabsContent value="fade" className="mt-4">
                    <div className="space-y-2">
                      <Label>透明度: {opacity[0]}%</Label>
                      <Slider
                        value={opacity}
                        onValueChange={setOpacity}
                        max={100}
                        step={1}
                      />
                      <p className="text-xs text-muted-foreground">
                        调整图片2的透明度，两张图片重叠显示
                      </p>
                    </div>
                  </TabsContent>

                  {/* 高亮模式控制 */}
                  <TabsContent value="highlight" className="mt-4">
                    <div className="space-y-2">
                      <Label>差异阈值: {highlightThreshold[0]}</Label>
                      <Slider
                        value={highlightThreshold}
                        onValueChange={setHighlightThreshold}
                        max={100}
                        step={1}
                      />
                      <p className="text-xs text-muted-foreground">
                        调整阈值来控制差异检测的敏感度
                      </p>
                    </div>
                  </TabsContent>

                  {/* 相减模式说明 */}
                  <TabsContent value="subtract" className="mt-4">
                    <p className="text-xs text-muted-foreground">
                      像素相减模式会将两张图片的像素值相减，差异区域会以不同颜色显示
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* 缩放控制 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">缩放控制</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setZoom(Math.max(10, zoom - 10))}
                    disabled={zoom <= 10}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 text-center text-sm font-mono">
                    {zoom}%
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                    disabled={zoom >= 200}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 文件详情 */}
            {showMetadata && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">文件详情</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {renderMetadata(image1Metadata, '图片 1')}
                  {renderMetadata(image2Metadata, '图片 2')}
                </CardContent>
              </Card>
            )}
          </div>

          {/* 右侧对比区域 */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">对比结果</CardTitle>
                    <CardDescription>
                      {compareMode === 'split' && '拖动分割线查看差异'}
                      {compareMode === 'fade' && '调整透明度查看重叠效果'}
                      {compareMode === 'highlight' && '红色区域表示差异'}
                      {compareMode === 'subtract' && '颜色越亮表示差异越大'}
                    </CardDescription>
                  </div>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    disabled={!image1 || !image2}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    下载
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  ref={containerRef}
                  className="relative bg-muted/50 rounded-lg overflow-hidden flex items-center justify-center min-h-[500px]"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{ cursor: compareMode === 'split' ? 'col-resize' : 'default' }}
                >
                  {!image1 || !image2 ? (
                    <div className="text-center text-muted-foreground">
                      <Upload className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>请上传两张图片开始对比</p>
                    </div>
                  ) : (
                    <div
                      className="relative"
                      style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'center',
                      }}
                    >
                      <canvas
                        ref={resultCanvasRef}
                        className="max-w-full h-auto shadow-lg"
                      />
                      {/* 隐藏的 Canvas 用于处理图片 */}
                      <canvas ref={canvas1Ref} className="hidden" />
                      <canvas ref={canvas2Ref} className="hidden" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="mb-20"></div>
    </main>
  );
};

export default ImageDiffPage;
