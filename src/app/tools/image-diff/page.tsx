"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Info, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ImageMetadata {
  name: string;
  size: number;
  type: string;
  width: number;
  height: number;
  lastModified: string;
}

type CompareMode = 'split' | 'opacity' | 'highlight' | 'subtract' | 'metadata';

const ImageDiffPage = () => {
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);
  const [metadata1, setMetadata1] = useState<ImageMetadata | null>(null);
  const [metadata2, setMetadata2] = useState<ImageMetadata | null>(null);
  const [splitPosition, setSplitPosition] = useState(50);
  const [opacity, setOpacity] = useState(50);
  const [zoom, setZoom] = useState(100);
  const [activeMode, setActiveMode] = useState<CompareMode>('split');
  const [isDragging, setIsDragging] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // 处理文件上传并获取图片元数据
  const handleFileUpload = (file: File, imageNumber: 1 | 2) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "文件类型错误",
        description: "请上传图片文件。",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      
      if (imageNumber === 1) {
        setImage1(result);
      } else {
        setImage2(result);
      }

      // 获取图片尺寸
      const img = new Image();
      img.onload = () => {
        const metadata: ImageMetadata = {
          name: file.name,
          size: file.size,
          type: file.type,
          width: img.width,
          height: img.height,
          lastModified: new Date(file.lastModified).toLocaleString()
        };
        
        if (imageNumber === 1) {
          setMetadata1(metadata);
        } else {
          setMetadata2(metadata);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  // 处理拖拽上传
  const handleDrop = (e: React.DragEvent, imageNumber: 1 | 2) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file, imageNumber);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // 清除图片
  const clearImage = (imageNumber: 1 | 2) => {
    if (imageNumber === 1) {
      setImage1(null);
      setMetadata1(null);
    } else {
      setImage2(null);
      setMetadata2(null);
    }
  };

  // 处理分割线拖动
  const handleSplitLineMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSplitPosition(Math.max(0, Math.min(100, percentage)));
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 渲染分割对比模式
  const renderSplitMode = () => {
    if (!image1 || !image2) return null;
    
    return (
      <div 
        ref={containerRef}
        className="relative w-full h-[600px] border border-border rounded-lg overflow-hidden cursor-col-resize"
      >
        {/* 背景图片（第二张图片） */}
        <img 
          src={image2} 
          alt="Image 2" 
          className="w-full h-full object-contain"
          style={{ transform: `scale(${zoom / 100})` }}
        />
        
        {/* 前景图片（第一张图片），使用clip-path实现分割效果 */}
        <div 
          className="absolute inset-0"
          style={{ 
            clipPath: `inset(0 ${100 - splitPosition}% 0 0)`,
            transform: `scale(${zoom / 100})`
          }}
        >
          <img 
            src={image1} 
            alt="Image 1" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* 分割线 */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10 shadow-lg"
          style={{ left: `${splitPosition}%` }}
          onMouseDown={handleSplitLineMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-lg">
            <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };

  // 渲染透明度对比模式
  const renderOpacityMode = () => {
    if (!image1 || !image2) return null;
    
    return (
      <div className="relative w-full h-[600px] border border-border rounded-lg overflow-hidden">
        <img 
          src={image2} 
          alt="Image 2" 
          className="absolute inset-0 w-full h-full object-contain"
          style={{ transform: `scale(${zoom / 100})` }}
        />
        <img 
          src={image1} 
          alt="Image 1" 
          className="absolute inset-0 w-full h-full object-contain"
          style={{ 
            opacity: opacity / 100,
            transform: `scale(${zoom / 100})`
          }}
        />
      </div>
    );
  };

  // 渲染高亮差异模式
  const renderHighlightMode = () => {
    if (!image1 || !image2 || !canvasRef.current) return null;
    
    return (
      <div className="relative w-full h-[600px] border border-border rounded-lg overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="w-full h-full object-contain"
          style={{ transform: `scale(${zoom / 100})` }}
        />
      </div>
    );
  };

  // 处理高亮模式的Canvas绘制
  useEffect(() => {
    if (activeMode !== 'highlight' || !image1 || !image2 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img1 = new Image();
    const img2 = new Image();
    
    img1.crossOrigin = "anonymous";
    img2.crossOrigin = "anonymous";
    
    img1.onload = () => {
      img2.onload = () => {
        // 设置Canvas实际尺寸为图片尺寸
        const maxWidth = Math.max(img1.width, img2.width);
        const maxHeight = Math.max(img1.height, img2.height);
        
        // 设置显示尺寸和实际尺寸
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制第一张图片
        ctx.drawImage(img1, 0, 0);
        const imageData1 = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // 绘制第二张图片
        ctx.drawImage(img2, 0, 0);
        const imageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // 创建差异图像
        const diffImageData = ctx.createImageData(canvas.width, canvas.height);
        
        for (let i = 0; i < imageData1.data.length; i += 4) {
          const r1 = imageData1.data[i];
          const g1 = imageData1.data[i + 1];
          const b1 = imageData1.data[i + 2];
          
          const r2 = imageData2.data[i];
          const g2 = imageData2.data[i + 1];
          const b2 = imageData2.data[i + 2];
          
          // 计算差异
          const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
          
          if (diff > 30) { // 差异阈值
            // 标记为红色
            diffImageData.data[i] = 255;
            diffImageData.data[i + 1] = 0;
            diffImageData.data[i + 2] = 0;
            diffImageData.data[i + 3] = 200;
          } else {
            // 保持原色，但稍微调暗
            diffImageData.data[i] = r1 * 0.8;
            diffImageData.data[i + 1] = g1 * 0.8;
            diffImageData.data[i + 2] = b1 * 0.8;
            diffImageData.data[i + 3] = 255;
          }
        }
        
        // 绘制差异图像
        ctx.putImageData(diffImageData, 0, 0);
      };
      img2.src = image2;
    };
    img1.src = image1;
  }, [activeMode, image1, image2, zoom]);

  // 渲染相减模式
  const renderSubtractMode = () => {
    if (!image1 || !image2 || !canvasRef.current) return null;
    
    return (
      <div className="relative w-full h-[600px] border border-border rounded-lg overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="w-full h-full object-contain"
          style={{ transform: `scale(${zoom / 100})` }}
        />
      </div>
    );
  };

  // 处理相减模式的Canvas绘制
  useEffect(() => {
    if (activeMode !== 'subtract' || !image1 || !image2 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img1 = new Image();
    const img2 = new Image();
    
    img1.crossOrigin = "anonymous";
    img2.crossOrigin = "anonymous";
    
    img1.onload = () => {
      img2.onload = () => {
        // 设置Canvas实际尺寸为图片尺寸
        const maxWidth = Math.max(img1.width, img2.width);
        const maxHeight = Math.max(img1.height, img2.height);
        
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制第一张图片
        ctx.drawImage(img1, 0, 0);
        const imageData1 = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // 绘制第二张图片
        ctx.drawImage(img2, 0, 0);
        const imageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // 创建相减图像
        const subtractImageData = ctx.createImageData(canvas.width, canvas.height);
        
        for (let i = 0; i < imageData1.data.length; i += 4) {
          const r1 = imageData1.data[i];
          const g1 = imageData1.data[i + 1];
          const b1 = imageData1.data[i + 2];
          
          const r2 = imageData2.data[i];
          const g2 = imageData2.data[i + 1];
          const b2 = imageData2.data[i + 2];
          
          // 像素相减，增强差异显示
          const diffR = Math.abs(r1 - r2);
          const diffG = Math.abs(g1 - g2);
          const diffB = Math.abs(b1 - b2);
          
          // 增强差异显示，使用反色效果
          subtractImageData.data[i] = 255 - diffR;
          subtractImageData.data[i + 1] = 255 - diffG;
          subtractImageData.data[i + 2] = 255 - diffB;
          subtractImageData.data[i + 3] = 255;
        }
        
        // 绘制相减图像
        ctx.putImageData(subtractImageData, 0, 0);
      };
      img2.src = image2;
    };
    img1.src = image1;
  }, [activeMode, image1, image2, zoom]);

  // 渲染文件详情模式
  const renderMetadataMode = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metadata1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                图片 1 详情
              </CardTitle>
              <CardDescription>第一张上传的图片元数据</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">文件名:</span>
                <span className="font-mono text-sm">{metadata1.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">尺寸:</span>
                <span>{metadata1.width} × {metadata1.height} px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">文件大小:</span>
                <span>{(metadata1.size / 1024).toFixed(2)} KB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">格式:</span>
                <Badge variant="secondary">{metadata1.type}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">修改时间:</span>
                <span className="text-sm">{metadata1.lastModified}</span>
              </div>
            </CardContent>
          </Card>
        )}
        
        {metadata2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                图片 2 详情
              </CardTitle>
              <CardDescription>第二张上传的图片元数据</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">文件名:</span>
                <span className="font-mono text-sm">{metadata2.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">尺寸:</span>
                <span>{metadata2.width} × {metadata2.height} px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">文件大小:</span>
                <span>{(metadata2.size / 1024).toFixed(2)} KB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">格式:</span>
                <Badge variant="secondary">{metadata2.type}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">修改时间:</span>
                <span className="text-sm">{metadata2.lastModified}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // 下载对比结果
  const downloadResult = () => {
    if (activeMode === 'highlight' || activeMode === 'subtract') {
      if (!canvasRef.current) return;
      
      const link = document.createElement('a');
      link.download = `image-diff-${activeMode}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
      
      toast({
        title: "下载成功",
        description: `已下载${activeMode === 'highlight' ? '高亮' : '相减'}对比结果`,
      });
    } else {
      toast({
        title: "无法下载",
        description: "只有高亮和相减模式支持下载结果",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="main pt-32">
        <h1 className="text-4xl font-bold mb-8">图片对比工具</h1>
        <p className="text-muted-foreground mb-12">上传两张图片，使用多种模式对比差异</p>

        {/* 图片上传区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] relative"
            onDrop={(e) => handleDrop(e, 1)}
            onDragOver={handleDragOver}
          >
            <input
              ref={fileInput1Ref}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 1)}
              className="hidden"
            />
            
            {image1 ? (
              <div className="relative w-full h-full">
                <img src={image1} alt="Image 1" className="w-full h-full object-contain rounded" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => clearImage(1)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">拖拽或点击上传第一张图片</p>
                <Button onClick={() => fileInput1Ref.current?.click()}>
                  选择图片
                </Button>
              </div>
            )}
          </div>

          <div
            className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] relative"
            onDrop={(e) => handleDrop(e, 2)}
            onDragOver={handleDragOver}
          >
            <input
              ref={fileInput2Ref}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 2)}
              className="hidden"
            />
            
            {image2 ? (
              <div className="relative w-full h-full">
                <img src={image2} alt="Image 2" className="w-full h-full object-contain rounded" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => clearImage(2)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">拖拽或点击上传第二张图片</p>
                <Button onClick={() => fileInput2Ref.current?.click()}>
                  选择图片
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* 对比模式选择 */}
        {image1 && image2 && (
          <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as CompareMode)}>
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="split">分割</TabsTrigger>
                <TabsTrigger value="opacity">淡化</TabsTrigger>
                <TabsTrigger value="highlight">高亮</TabsTrigger>
                <TabsTrigger value="subtract">相减</TabsTrigger>
                <TabsTrigger value="metadata">详情</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(Math.max(50, zoom - 10))}
                  disabled={zoom <= 50}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground w-12 text-center">{zoom}%</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(Math.min(200, zoom + 10))}
                  disabled={zoom >= 200}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(100)}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                
                {(activeMode === 'highlight' || activeMode === 'subtract') && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={downloadResult}
                    className="ml-2"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <TabsContent value="split" className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">分割位置:</span>
                <Slider
                  value={[splitPosition]}
                  onValueChange={(value) => setSplitPosition(value[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground w-12">{splitPosition}%</span>
              </div>
              {renderSplitMode()}
            </TabsContent>

            <TabsContent value="opacity" className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">透明度:</span>
                <Slider
                  value={[opacity]}
                  onValueChange={(value) => setOpacity(value[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground w-12">{opacity}%</span>
              </div>
              {renderOpacityMode()}
            </TabsContent>

            <TabsContent value="highlight" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                红色区域表示两张图片之间的差异，灰色区域表示相同部分
              </div>
              {renderHighlightMode()}
            </TabsContent>

            <TabsContent value="subtract" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                像素相减模式，亮度越高表示差异越大
              </div>
              {renderSubtractMode()}
            </TabsContent>

            <TabsContent value="metadata" className="space-y-4">
              {renderMetadataMode()}
            </TabsContent>
          </Tabs>
        )}
      </div>
      <div className="mb-20"></div>
    </main>
  );
};

export default ImageDiffPage;