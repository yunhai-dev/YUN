'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { MousePointer2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHandControl } from '@/context/HandControlContext';

export default function HandControlOverlay() {
    const { isEnabled, isLoading, setIsLoading, setStatus, status } = useHandControl();
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isPinching, setIsPinching] = useState(false);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);
    const handLandmarkerRef = useRef<HandLandmarker | null>(null);
    const enabledRef = useRef(false);
    const lastPredictionTime = useRef<number>(0);

    // Sync enabledRef with isEnabled state
    useEffect(() => {
        enabledRef.current = isEnabled;
        if (isEnabled) {
            startHandControl();
        } else {
            stopHandControl();
        }
    }, [isEnabled]);
    
    // State for smoothing
    const cursorPos = useRef({ x: 0, y: 0 });
    const targetPos = useRef({ x: 0, y: 0 });
    
    // Click state
    const isClicked = useRef(false);
    const lastPinchY = useRef<number | null>(null);
    const lastHoveredElement = useRef<Element | null>(null);

    const startHandControl = async () => {
        if (isLoading) return; // Prevent multiple calls
        setIsLoading(true);
        setStatus("正在加载模型...");
        try {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );
            
            handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `/hand_landmarker.task`,
                    delegate: "GPU"
                },
                runningMode: "VIDEO",
                numHands: 1,
                minHandDetectionConfidence: 0.3,
                minHandPresenceConfidence: 0.3,
                minTrackingConfidence: 0.3,
            });

            setStatus("正在请求摄像头权限...");
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        width: 640,
                        height: 480,
                        frameRate: { ideal: 30 }
                    } 
                });
                
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    // Wait for video to be ready
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current?.play();
                    };
                    videoRef.current.oncanplay = () => {
                        setIsCameraReady(true);
                        setStatus("摄像头已就绪，请伸出手...");
                        predictWebcam();
                    };
                }
            }
        } catch (error) {
            console.error("Failed to start hand control:", error);
            setStatus("启动失败: " + (error as Error).message);
            alert("无法启动摄像头或加载模型，请检查权限和网络。");
            // We don't call stopHandControl here directly to avoid infinite loops if effect triggers again,
            // but we should probably reset state.
            // Better to let the user try again.
        } finally {
            setIsLoading(false);
        }
    };

    const stopHandControl = () => {
        setIsCameraReady(false);
        setIsPinching(false);
        
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }

        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        
        if (handLandmarkerRef.current) {
            handLandmarkerRef.current.close();
            handLandmarkerRef.current = null;
        }
    };

    const triggerClick = (x: number, y: number) => {
        // Hide cursor momentarily so we don't click the cursor div itself
        if (cursorRef.current) cursorRef.current.style.display = 'none';
        
        const element = document.elementFromPoint(x, y);
        if (element) {
            // Universal click trigger using MouseEvent
            // This works for HTMLElement, SVGElement, and others
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: x,
                clientY: y
            });
            element.dispatchEvent(clickEvent);
            
            // Try to focus if it's an HTML element
            if (element instanceof HTMLElement) {
                try {
                    element.focus();
                } catch (e) {
                    // Ignore focus errors
                }
            }
        }
        
        if (cursorRef.current) cursorRef.current.style.display = 'flex';
    };

    const predictWebcam = () => {
        if (!handLandmarkerRef.current || !videoRef.current || !enabledRef.current) return;

        // Limit FPS to ~60
        const now = performance.now();
        if (now - lastPredictionTime.current < 16) {
             requestRef.current = requestAnimationFrame(predictWebcam);
             return;
        }
        lastPredictionTime.current = now;

        // Ensure video is playing and has dimensions
        if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
             setStatus(`等待视频数据... Size: ${videoRef.current.videoWidth}x${videoRef.current.videoHeight}, State: ${videoRef.current.readyState}`);
             requestRef.current = requestAnimationFrame(predictWebcam);
             return;
        }

        const startTimeMs = performance.now();
        try {
            const results = handLandmarkerRef.current.detectForVideo(videoRef.current, startTimeMs);

            if (results.landmarks && results.landmarks.length > 0) {
                setStatus("已检测到手势");
                const landmarks = results.landmarks[0];
                
                // 1. Get Coordinates (Index Finger Tip - ID 8)
                const indexTip = landmarks[8];
                const thumbTip = landmarks[4];

                // Map to screen (Mirror X)
                // Use a slightly smaller box than full screen to reach edges easier
                const margin = 0.1; // 10% margin
                const rawX = 1 - indexTip.x; // Mirror
                const rawY = indexTip.y;
                
                // Remap from [margin, 1-margin] to [0, 1] to make edges reachable
                const mappedX = Math.max(0, Math.min(1, (rawX - margin) / (1 - 2 * margin)));
                const mappedY = Math.max(0, Math.min(1, (rawY - margin) / (1 - 2 * margin)));

                const x = mappedX * window.innerWidth;
                const y = mappedY * window.innerHeight;

                // 2. Smoothing (Lerp)
                // Lower value = smoother but more lag (0.08 is smoother than 0.2)
                targetPos.current = { x, y };
                cursorPos.current.x += (targetPos.current.x - cursorPos.current.x) * 0.08;
                cursorPos.current.y += (targetPos.current.y - cursorPos.current.y) * 0.08;

                // Update Cursor UI
                if (cursorRef.current) {
                    cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
                }

                // Simulate Hover Events
                const element = document.elementFromPoint(cursorPos.current.x, cursorPos.current.y);
                if (element !== lastHoveredElement.current) {
                    if (lastHoveredElement.current) {
                        lastHoveredElement.current.dispatchEvent(new MouseEvent('mouseout', {
                            view: window,
                            bubbles: true,
                            cancelable: true,
                            clientX: cursorPos.current.x,
                            clientY: cursorPos.current.y
                        }));
                        lastHoveredElement.current.dispatchEvent(new MouseEvent('mouseleave', {
                            view: window,
                            bubbles: true,
                            cancelable: true,
                            clientX: cursorPos.current.x,
                            clientY: cursorPos.current.y
                        }));
                    }
                    
                    if (element) {
                        element.dispatchEvent(new MouseEvent('mouseover', {
                            view: window,
                            bubbles: true,
                            cancelable: true,
                            clientX: cursorPos.current.x,
                            clientY: cursorPos.current.y
                        }));
                        element.dispatchEvent(new MouseEvent('mouseenter', {
                            view: window,
                            bubbles: true,
                            cancelable: true,
                            clientX: cursorPos.current.x,
                            clientY: cursorPos.current.y
                        }));
                    }
                    
                    lastHoveredElement.current = element;
                }

                if (element) {
                    element.dispatchEvent(new MouseEvent('mousemove', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        clientX: cursorPos.current.x,
                        clientY: cursorPos.current.y
                    }));
                }

                // 3. Click/Pinch Detection
                const distance = Math.hypot(indexTip.x - thumbTip.x, indexTip.y - thumbTip.y);
                const PINCH_THRESHOLD = 0.025; 

                if (distance < PINCH_THRESHOLD) {
                    setIsPinching(true);
                    
                    // Click trigger (only once per pinch)
                    if (!isClicked.current) {
                        triggerClick(cursorPos.current.x, cursorPos.current.y);
                        isClicked.current = true;
                        lastPinchY.current = cursorPos.current.y;
                    } else {
                        // Scroll logic (if holding pinch)
                        if (lastPinchY.current !== null) {
                            const deltaY = cursorPos.current.y - lastPinchY.current;
                            // Threshold to avoid jitter scrolling (Increased threshold)
                            if (Math.abs(deltaY) > 25) {
                                window.scrollBy(0, deltaY * 0.8); // Reduced speed
                                lastPinchY.current = cursorPos.current.y;
                            }
                        }
                    }
                } else {
                    setIsPinching(false);
                    isClicked.current = false;
                    lastPinchY.current = null;
                }
            } else {
                setStatus(`未检测到手势 (FPS: ${Math.round(1000 / (performance.now() - startTimeMs))})`);
            }
        } catch (e) {
            console.error(e);
            setStatus("检测出错: " + (e as Error).message);
        }

        requestRef.current = requestAnimationFrame(predictWebcam);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopHandControl();
        };
    }, []);

    return (
        <>
            {/* Video Element - Visible for debugging */}
            {isEnabled && (
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted
                    className={cn(
                        "fixed bottom-6 left-6 w-48 h-36 object-cover rounded-lg border-2 border-white/20 shadow-lg z-50 transition-opacity duration-300 bg-black",
                        isCameraReady ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                />
            )}
            
            {/* Virtual Cursor */}
            {isEnabled && isCameraReady && (
                <div
                    ref={cursorRef}
                    className={cn(
                        "fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] transition-colors duration-200 flex items-center justify-center",
                        isPinching ? "text-red-500 scale-90" : "text-blue-500"
                    )}
                    style={{
                        // Initial position off-screen
                        transform: 'translate3d(-100px, -100px, 0)',
                    }}
                >
                    <div className={cn(
                        "absolute inset-0 rounded-full opacity-30 transition-all duration-200",
                        isPinching ? "bg-red-500 scale-150" : "bg-blue-500 scale-100"
                    )} />
                    <MousePointer2 
                        className="w-full h-full drop-shadow-md relative z-10" 
                        fill="currentColor" 
                    />
                </div>
            )}
        </>
    );
}
