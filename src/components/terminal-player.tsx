'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

export interface TerminalCommand {
  command: string;
  output: string;
  delay?: number; // 延迟多少毫秒后执行该命令
}

interface TerminalPlayerProps {
  commands: TerminalCommand[];
  typingSpeed?: number; // 打字速度 (毫秒/字符)
  outputLineDelay?: number; // 每行输出的间隔时间 (毫秒)
  autoPlay?: boolean;
  className?: string;
  title?: string;
}

interface DisplayLine {
  type: 'command' | 'output' | 'prompt';
  content: string;
  isLastOutputLine?: boolean; // 是否是该命令输出的最后一行
}

const TerminalPlayer: React.FC<TerminalPlayerProps> = ({
  commands,
  typingSpeed = 50,
  outputLineDelay = 0, // 默认不延迟，一次性输出
  autoPlay = true,
  className = '',
  title = 'Terminal',
}) => {
  const [displayLines, setDisplayLines] = useState<DisplayLine[]>([]);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentOutputLineIndex, setCurrentOutputLineIndex] = useState(-1); // -1 表示还在输入命令阶段
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cursorBlinkRef = useRef<NodeJS.Timeout | null>(null);

  // 光标闪烁效果
  useEffect(() => {
    cursorBlinkRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      if (cursorBlinkRef.current) clearInterval(cursorBlinkRef.current);
    };
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayLines]);

  // 主播放逻辑
  useEffect(() => {
    if (!isPlaying || currentCommandIndex >= commands.length) {
      return;
    }

    const currentCommand = commands[currentCommandIndex];
    const commandText = currentCommand.command;
    const outputLines = currentCommand.output.split('\n').filter((line, index, arr) => 
      // 保留所有行，但过滤掉最后一个空行（由于 split 产生）
      index < arr.length - 1 || line !== ''
    );

    // 打字机输入效果
    if (currentCharIndex < commandText.length) {
      timerRef.current = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (currentOutputLineIndex === -1) {
      // 命令输入完毕，开始输出
      timerRef.current = setTimeout(() => {
        // 添加完整命令
        setDisplayLines((prev) => [
          ...prev,
          { type: 'command', content: commandText },
        ]);
        
        if (outputLineDelay > 0 && outputLines.length > 0) {
          // 逐行输出模式
          setCurrentOutputLineIndex(0);
        } else {
          // 一次性输出所有内容
          setDisplayLines((prev) => [
            ...prev,
            { type: 'output', content: currentCommand.output, isLastOutputLine: true },
          ]);
          setCurrentCommandIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }
      }, currentCommand.delay || 500);
    } else if (currentOutputLineIndex < outputLines.length) {
      // 逐行输出
      timerRef.current = setTimeout(() => {
        const isLast = currentOutputLineIndex === outputLines.length - 1;
        setDisplayLines((prev) => [
          ...prev,
          { type: 'output', content: outputLines[currentOutputLineIndex], isLastOutputLine: isLast },
        ]);
        setCurrentOutputLineIndex((prev) => prev + 1);
      }, currentOutputLineIndex === 0 ? 0 : outputLineDelay);
    } else {
      // 输出完毕，移动到下一个命令
      timerRef.current = setTimeout(() => {
        setCurrentCommandIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
        setCurrentOutputLineIndex(-1);
      }, outputLineDelay);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentCommandIndex, currentCharIndex, currentOutputLineIndex, commands, typingSpeed, outputLineDelay]);

  // 播放完毕
  useEffect(() => {
    if (
      isPlaying &&
      currentCommandIndex >= commands.length &&
      currentCharIndex === 0
    ) {
      setIsPlaying(false);
    }
  }, [currentCommandIndex, currentCharIndex, isPlaying, commands.length]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentCommandIndex(0);
    setCurrentCharIndex(0);
    setCurrentOutputLineIndex(-1);
    setDisplayLines([]);
  };

  const handleProgressClick = (index: number) => {
    setIsPlaying(false);
    setCurrentCommandIndex(index);
    setCurrentCharIndex(0);
    setCurrentOutputLineIndex(-1);
    
    // 构建到该命令为止的所有历史记录
    const newDisplayLines: DisplayLine[] = [];
    for (let i = 0; i < index; i++) {
      newDisplayLines.push({
        type: 'command',
        content: commands[i].command,
      });
      newDisplayLines.push({
        type: 'output',
        content: commands[i].output,
        isLastOutputLine: true,
      });
    }
    setDisplayLines(newDisplayLines);
  };

  return (
    <div className={cn(
      "flex flex-col h-full rounded-lg border border-border bg-card overflow-hidden shadow-sm",
      className
    )}>
      {/* 终端头部 */}
      <div className="flex items-center justify-center relative px-4 py-2 border-b border-border bg-muted/50">
        <div className="flex items-center gap-1.5 absolute left-3">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-[#27ca40] hover:bg-[#27ca40]/80 transition-colors"></div>
        </div>
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
      </div>

      {/* 终端内容 */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-[#0d1117] text-[#c9d1d9] mx-1 rounded-md border border-border/50"
      >
        {displayLines.map((line, index) => (
          <div key={index} className="leading-relaxed">
            {line.type === 'command' ? (
              <div className="flex items-start gap-2">
                <span className="text-[#7ee787] select-none">$</span>
                <span className="text-[#c9d1d9]">{line.content}</span>
              </div>
            ) : (
              <div className={cn(
                "text-[#8b949e] whitespace-pre-wrap pl-4",
                line.isLastOutputLine && "mb-2"
              )}>
                {line.content}
              </div>
            )}
          </div>
        ))}

        {/* 当前正在输入的命令 */}
        {currentCommandIndex < commands.length &&
          currentCharIndex > 0 &&
          currentOutputLineIndex === -1 && (
            <div className="flex items-start gap-2">
              <span className="text-[#7ee787] select-none">$</span>
              <span className="text-[#c9d1d9]">
                {commands[currentCommandIndex].command.substring(
                  0,
                  currentCharIndex
                )}
              </span>
              {showCursor && (
                <span 
                  className="inline-block w-2 bg-[#c9d1d9] ml-0.5 align-text-bottom animate-pulse" 
                  style={{ height: '1em' }}
                />
              )}
            </div>
          )}

        {/* 等待输入的提示符（初始状态或播放完成后） */}
        {currentCharIndex === 0 && currentOutputLineIndex === -1 && (
          <div className="flex items-start gap-2 text-[#8b949e]">
            <span className="text-[#7ee787] select-none">$</span>
            {showCursor && (
              <span 
                className="inline-block w-2 bg-[#c9d1d9] align-text-bottom animate-pulse" 
                style={{ height: '1em' }}
              />
            )}
          </div>
        )}
      </div>

      {/* 进度条 */}
      <div className="px-4 py-2 bg-muted/30 border-t border-border">
        <div className="flex gap-1">
          {commands.map((cmd, index) => (
            <button
              key={index}
              onClick={() => handleProgressClick(index)}
              className={cn(
                "flex-1 h-1.5 rounded-full transition-all duration-300",
                "hover:scale-y-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                index < currentCommandIndex
                  ? 'bg-primary'
                  : index === currentCommandIndex
                    ? 'bg-primary/60'
                    : 'bg-muted-foreground/20'
              )}
              title={`${index + 1}. ${cmd.command}`}
              aria-label={`跳转到命令 ${index + 1}: ${cmd.command}`}
            />
          ))}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-muted/50">
        <Button
          variant="default"
          size="sm"
          onClick={handlePlay}
          disabled={isPlaying || currentCommandIndex >= commands.length}
          className="gap-1.5"
        >
          <Play className="h-3.5 w-3.5" />
          播放
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handlePause}
          disabled={!isPlaying}
          className="gap-1.5"
        >
          <Pause className="h-3.5 w-3.5" />
          暂停
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          重置
        </Button>
        <div className="flex-1" />
        <span className="text-xs text-muted-foreground">
          {currentCommandIndex} / {commands.length}
        </span>
      </div>
    </div>
  );
};

export default TerminalPlayer;

/**
 * 使用示例：
 * 
 * const commands: TerminalCommand[] = [
 *   {
 *     command: 'npm install',
 *     output: 'added 125 packages\n',
 *     delay: 800,
 *   },
 *   {
 *     command: 'npm run build',
 *     output: 'Successfully compiled 234 files\n',
 *     delay: 600,
 *   },
 *   {
 *     command: 'echo "Hello, World!"',
 *     output: 'Hello, World!\n',
 *   },
 * ];
 * 
 * // 基础用法（一次性输出）
 * <TerminalPlayer commands={commands} typingSpeed={50} />
 * 
 * // 逐行输出，每行间隔 100ms
 * <TerminalPlayer commands={commands} typingSpeed={50} outputLineDelay={100} />
 */
