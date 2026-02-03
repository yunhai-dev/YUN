"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Split, Eye, Sparkles, Minus, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type CompareMode = "split" | "fade" | "highlight" | "subtract";

interface ImageInfo {
  file: File;
  url: string;
  width: number;
  height: number;
  size: number;
  format: string;
}

/**
 * 格式化文件大小
 * @param bytes - 字节数
 * @returns 格式化后的字符串
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * 图片对比工具页面组件
 * 支持分割、淡化、高亮、相减四种对比模式
 */
export default function ImageComparePage() {
  const [image1, setImage1] = useState<ImageInfo | null>(null);
  const [image2, setImage2] = useState<ImageInfo | null>(null);
  const [mode, setMode] = useState<CompareMode>("split");
  const [splitPosition, setSplitPosition] = useState(50);
  const [fadeOpacity, setFadeOpacity] = useState(50);
  const [highlightThreshold, setHighlightThreshold] = useState(30);
  const [subtractIntensity, setSubtractIntensity] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);

  /**
   * 处理图片加载
   * @param file - 图片文件
   * @param setImage - 设置图片状态的函数
   */
  const handleImageLoad = useCallback((file: File, setImage: (img: ImageInfo) => void) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage({
        file,
        url,
        width: img.width,
        height: img.height,
        size: file.size,
        format: file.type.split("/")[1]?.toUpperCase() || "UNKNOWN",
      });
    };
    img.src = url;
  }, []);

  /**
   * 处理文件选择
   * @param e - 文件选择事件
   * @param setImage - 设置图片状态的函数
   */
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>, setImage: (img: ImageInfo) => void) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageLoad(file, setImage);
    }
  }, [handleImageLoad]);

  /**
   * 清除图片
   * @param setImage - 设置图片状态的函数
   * @param inputRef - 文件输入引用
   */
  const clearImage = useCallback((setImage: (img: null) => void, inputRef: React.RefObject<HTMLInputElement>) => {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  /**
   * 处理分割拖动
   * @param e - 鼠标或触摸事件
   */
  const handleSplitDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current || mode !== "split") return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSplitPosition(percentage);
  }, [mode]);

  /**
   * 开始拖动
   */
  const startDragging = useCallback(() => {
    setIsDragging(true);
  }, []);

  /**
   * 停止拖动
   */
  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  /**
   * 处理鼠标移动
   * @param e - 鼠标事件
   */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      handleSplitDrag(e);
    }
  }, [isDragging, handleSplitDrag]);

  /**
   * 处理触摸移动
   * @param e - 触摸事件
   */
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging) {
      handleSplitDrag(e);
    }
  }, [isDragging, handleSplitDrag]);

  /**
   * 渲染高亮差异效果
   * 使用 Canvas 像素级比较来高亮显示差异区域
   */
  useEffect(() => {
    if (mode !== "highlight" && mode !== "subtract") return;
    if (!image1 || !image2 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img1 = new Image();
    const img2 = new Image();
    
    img1.crossOrigin = "anonymous";
    img2.crossOrigin = "anonymous";
    
    img1.onload = () => {
      img2.onload = () => {
        // 设置 canvas 尺寸为两张图片的最小尺寸
        const width = Math.min(img1.width, img2.width);
        const height = Math.min(img1.height, img2.height);
        canvas.width = width;
        canvas.height = height;

        // 绘制第一张图片
        ctx.drawImage(img1, 0, 0, width, height);
        const imgData1 = ctx.getImageData(0, 0, width, height);
        
        // 绘制第二张图片
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img2, 0, 0, width, height);
        const imgData2 = ctx.getImageData(0, 0, width, height);

        // 创建输出数据
        const outputData = ctx.createImageData(width, height);

        if (mode === "highlight") {
          // 高亮模式：标记差异区域
          const threshold = highlightThreshold * 2.55; // 转换为 0-255 范围
          
          for (let i = 0; i < imgData1.data.length; i += 4) {
            const r1 = imgData1.data[i];
            const g1 = imgData1.data[i + 1];
            const b1 = imgData1.data[i + 2];
            const r2 = imgData2.data[i];
            const g2 = imgData2.data[i + 1];
            const b2 = imgData2.data[i + 2];

            // 计算像素差异
            const diff = Math.sqrt(
              Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
            );

            if (diff > threshold) {
              // 差异区域用红色高亮
              outputData.data[i] = 255;
              outputData.data[i + 1] = 0;
              outputData.data[i + 2] = 0;
              outputData.data[i + 3] = 200;
            } else {
              // 非差异区域显示为半透明灰度
              const gray = (r1 + g1 + b1) / 3;
              outputData.data[i] = gray;
              outputData.data[i + 1] = gray;
              outputData.data[i + 2] = gray;
              outputData.data[i + 3] = 100;
            }
          }
        } else if (mode === "subtract") {
          // 相减模式：显示像素差异
          const intensity = subtractIntensity / 50; // 强度系数
          
          for (let i = 0; i < imgData1.data.length; i += 4) {
            const r1 = imgData1.data[i];
            const g1 = imgData1.data[i + 1];
            const b1 = imgData1.data[i + 2];
            const r2 = imgData2.data[i];
            const g2 = imgData2.data[i + 1];
            const b2 = imgData2.data[i + 2];

            // 像素相减并应用强度
            const r = Math.min(255, Math.abs(r1 - r2) * intensity);
            const g = Math.min(255, Math.abs(g1 - g2) * intensity);
            const b = Math.min(255, Math.abs(b1 - b2) * intensity);

            // 使用反色效果增强可见性
            outputData.data[i] = 255 - r;
            outputData.data[i + 1] = 255 - g;
            outputData.data[i + 2] = 255 - b;
            outputData.data[i + 3] = 255;
          }
        }

        ctx.putImageData(outputData, 0, 0);
      };
      img2.src = image2.url;
    };
    img1.src = image1.url;
  }, [mode, image1, image2, highlightThreshold, subtractIntensity]);

  /**
   * 渲染图片上传区域
   * @param image - 图片信息
   * @param setImage - 设置图片状态的函数
   * @param inputRef - 文件输入引用
   * @param label - 标签文本
   */
  const renderUploadArea = (
    image: ImageInfo | null,
    setImage: (img: ImageInfo | null) => void,
    inputRef: React.RefObject<HTMLInputElement>,
    label: string
  ) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e, setImage)}
        className="hidden"
      />
      {image ? (
        <div className="relative group">
          <img
            src={image.url}
            alt={label}
            className="w-full h-48 object-contain rounded-lg border bg-muted"
          />
          <button
            onClick={() => clearImage(setImage, inputRef)}
            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full h-48 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 flex flex-col items-center justify-center gap-2 transition-colors"
        >
          <Upload className="w-8 h-8 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">点击上传图片</span>
        </button>
      )}
    </div>
  );

  /**
   * 渲染对比控制面板
   */
  const renderControls = () => {
    const controls = [];

    if (mode === "split") {
      controls.push(
        <div key="split" className="space-y-2">
          <label className="text-sm font-medium">分割位置: {splitPosition.toFixed(0)}%</label>
          <Slider
            value={[splitPosition]}
            onValueChange={(v) => setSplitPosition(v[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
      );
    } else if (mode === "fade") {
      controls.push(
        <div key="fade" className="space-y-2">
          <label className="text-sm font-medium">透明度: {fadeOpacity}%</label>
          <Slider
            value={[fadeOpacity]}
            onValueChange={(v) => setFadeOpacity(v[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
      );
    } else if (mode === "highlight") {
      controls.push(
        <div key="highlight" className="space-y-2">
          <label className="text-sm font-medium">差异阈值: {highlightThreshold}</label>
          <Slider
            value={[highlightThreshold]}
            onValueChange={(v) => setHighlightThreshold(v[0])}
            min={0}
            max={100}
            step={1}
          />
          <p className="text-xs text-muted-foreground">
            阈值越高，标记的差异区域越少
          </p>
        </div>
      );
    } else if (mode === "subtract") {
      controls.push(
        <div key="subtract" className="space-y-2">
          <label className="text-sm font-medium">强度: {subtractIntensity}%</label>
          <Slider
            value={[subtractIntensity]}
            onValueChange={(v) => setSubtractIntensity(v[0])}
            min={0}
            max={100}
            step={1}
          />
          <p className="text-xs text-muted-foreground">
            调整像素差异的显示强度
          </p>
        </div>
      );
    }

    return controls;
  };

  /**
   * 渲染对比结果区域
   */
  const renderCompareResult = () => {
    if (!image1 || !image2) {
      return (
        <div className="h-96 flex items-center justify-center text-muted-foreground">
          请上传两张图片以开始对比
        </div>
      );
    }

    if (mode === "split") {
      return (
        <div
          ref={containerRef}
          className="relative h-96 overflow-hidden cursor-ew-resize select-none"
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onTouchMove={handleTouchMove}
          onTouchEnd={stopDragging}
        >
          {/* 第二张图片（底层） */}
          <img
            src={image2.url}
            alt="Image 2"
            className="absolute inset-0 w-full h-full object-contain bg-muted"
            draggable={false}
          />
          
          {/* 第一张图片（裁剪显示） */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - splitPosition}% 0 0)` }}
          >
            <img
              src={image1.url}
              alt="Image 1"
              className="absolute inset-0 w-full h-full object-contain bg-muted"
              draggable={false}
            />
          </div>

          {/* 分割线 */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize shadow-lg"
            style={{ left: `${splitPosition}%`, transform: "translateX(-50%)" }}
            onMouseDown={startDragging}
            onTouchStart={startDragging}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Split className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        </div>
      );
    }

    if (mode === "fade") {
      return (
        <div className="relative h-96">
          <img
            src={image1.url}
            alt="Image 1"
            className="absolute inset-0 w-full h-full object-contain bg-muted"
          />
          <img
            src={image2.url}
            alt="Image 2"
            className="absolute inset-0 w-full h-full object-contain bg-muted"
            style={{ opacity: fadeOpacity / 100 }}
          />
        </div>
      );
    }

    if (mode === "highlight" || mode === "subtract") {
      return (
        <div className="h-96 flex items-center justify-center bg-muted rounded-lg">
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    }

    return null;
  };

  /**
   * 渲染文件详情
   */
  const renderFileDetails = () => {
    if (!showDetails || (!image1 && !image2)) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {image1 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">图片 1 详情</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">文件名:</span>
                <span className="truncate max-w-[200px]">{image1.file.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">格式:</span>
                <span>{image1.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">尺寸:</span>
                <span>{image1.width} × {image1.height}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">大小:</span>
                <span>{formatFileSize(image1.size)}</span>
              </div>
            </CardContent>
          </Card>
        )}
        {image2 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">图片 2 详情</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">文件名:</span>
                <span className="truncate max-w-[200px]">{image2.file.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">格式:</span>
                <span>{image2.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">尺寸:</span>
                <span>{image2.width} × {image2.height}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">大小:</span>
                <span>{formatFileSize(image2.size)}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="main pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-4">图片对比工具</h1>
        <p className="text-muted-foreground mb-8">
          上传两张图片，使用多种模式对比差异，支持分割、淡化、高亮和相减模式。
        </p>

        {/* 图片上传区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {renderUploadArea(image1, setImage1, fileInput1Ref, "第一张图片")}
          {renderUploadArea(image2, setImage2, fileInput2Ref, "第二张图片")}
        </div>

        {/* 模式选择 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={mode === "split" ? "default" : "outline"}
            onClick={() => setMode("split")}
            className="gap-2"
          >
            <Split className="w-4 h-4" />
            分割
          </Button>
          <Button
            variant={mode === "fade" ? "default" : "outline"}
            onClick={() => setMode("fade")}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            淡化
          </Button>
          <Button
            variant={mode === "highlight" ? "default" : "outline"}
            onClick={() => setMode("highlight")}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            高亮
          </Button>
          <Button
            variant={mode === "subtract" ? "default" : "outline"}
            onClick={() => setMode("subtract")}
            className="gap-2"
          >
            <Minus className="w-4 h-4" />
            相减
          </Button>
          <Button
            variant={showDetails ? "default" : "outline"}
            onClick={() => setShowDetails(!showDetails)}
            className="gap-2"
          >
            <Info className="w-4 h-4" />
            文件详情
          </Button>
        </div>

        {/* 控制面板 */}
        {image1 && image2 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              {renderControls()}
            </CardContent>
          </Card>
        )}

        {/* 对比结果 */}
        <Card>
          <CardHeader>
            <CardTitle>对比结果</CardTitle>
          </CardHeader>
          <CardContent>
            {renderCompareResult()}
          </CardContent>
        </Card>

        {/* 文件详情 */}
        {renderFileDetails()}
      </div>
    </main>
  );
}
