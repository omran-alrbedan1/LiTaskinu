import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ICONS } from "@/constants/icons";

interface CustomPremiumIconProps {
  className?: string;
  size?: number;
  withGlow?: boolean;
  withBadge?: boolean;
  showLabel?: boolean;
  variant?: "default" | "solid" | "badge" | "floating";
  animation?: "glow" | "bounce" | "pulse" | "spin" | "float" | "sparkle" | "none";
  intensity?: "subtle" | "medium" | "strong";
}

const CustomPremiumIcon = ({
  className,
  size = 24,
  withGlow = true,
  variant = "default",
  animation = "glow",
  intensity = "medium",
}: CustomPremiumIconProps) => {
  const iconSize = variant === "badge" ? Math.max(size - 8, 16) : size;
  
  // Animation classes based on type and intensity
  const getAnimationClasses = () => {
    const intensityMap = {
      subtle: "opacity-30",
      medium: "opacity-50",
      strong: "opacity-70"
    };

    switch (animation) {
      case "glow":
        return `animate-glow ${intensityMap[intensity]}`;
      case "pulse":
        return `animate-pulse-slow ${intensityMap[intensity]}`;
      case "bounce":
        return "animate-bounce-slow";
      case "spin":
        return "animate-spin-slow";
      case "float":
        return "animate-float";
      case "sparkle":
        return "animate-sparkle";
      default:
        return "";
    }
  };

  // Glow effect with different colors based on variant
  const getGlowColor = () => {
    switch (variant) {
      case "badge":
        return "from-amber-400/30 via-yellow-500/20 to-amber-600/10";
      case "floating":
        return "from-yellow-400/40 via-amber-500/30 to-yellow-600/20";
      default:
        return "from-amber-300/40 via-yellow-400/30 to-orange-500/20";
    }
  };

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {/* Icon Container */}
      <div className="relative">
        {/* Animated glow effect */}
        {withGlow && variant !== "badge" && (
          <>
            {/* Base glow */}
            <div 
              className={cn(
                "absolute inset-0 rounded-full blur-xl",
                getGlowColor(),
                getAnimationClasses(),
                animation === "glow" && "bg-gradient-to-r"
              )}
              style={{ 
                width: `${iconSize + 20}px`, 
                height: `${iconSize + 20}px`,
                top: '-10px',
                left: '-10px',
              }}
            />
            
            {/* Secondary glow for depth */}
            {(animation === "glow" || animation === "sparkle") && (
              <div 
                className={cn(
                  "absolute inset-0 rounded-full blur-lg",
                  "bg-gradient-to-r from-yellow-200/20 via-amber-300/15 to-yellow-400/10",
                  animation === "sparkle" && "animate-ping-slow"
                )}
                style={{ 
                  width: `${iconSize + 10}px`, 
                  height: `${iconSize + 10}px`,
                  top: '-5px',
                  left: '-5px',
                }}
              />
            )}
          </>
        )}
        
        {/* Main icon container with animations */}
        <div 
          className={cn(
            "relative flex items-center justify-center",
            "transition-all duration-300",
            animation === "bounce" && "animate-bounce-slow",
            animation === "spin" && "animate-spin-slow",
            animation === "float" && "animate-float",
            variant === "badge" && "bg-gradient-to-br from-[#FFC6] to-[#FFD700] p-1.5 rounded-full shadow-lg",
            variant === "floating" && "shadow-2xl shadow-amber-500/20"
          )}
          style={{ 
            width: `${iconSize}px`, 
            height: `${iconSize}px` 
          }}
        >
          {/* Icon with shine effect */}
          <div className="relative">
            <Image
              src={ICONS.premium}
              alt="Premium"
              width={iconSize}
              height={iconSize}
              className={cn(
                "object-contain transition-transform duration-300",
                animation === "spin" && "hover:scale-110",
                variant === "badge" && "filter drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
              )}
            />
            
            {/* Shine overlay for metallic effect */}
            {(animation === "sparkle" || intensity === "strong") && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full" />
            )}
          </div>
          
          {/* Floating particles for sparkle animation */}
          {animation === "sparkle" && (
            <>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-float"
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${1.5 + Math.random() * 1}s`,
                  }}
                />
              ))}
            </>
          )}
        </div>
        

        
        {/* Pulse ring for floating variant */}
        {variant === "floating" && animation !== "none" && (
          <div 
            className={cn(
              "absolute inset-0 rounded-full border-2 border-amber-400",
              "animate-ping-slow"
            )}
            style={{ 
              width: `${iconSize + 15}px`, 
              height: `${iconSize + 15}px`,
              top: '-7.5px',
              left: '-7.5px',
            }}
          />
        )}
      </div>
      
    </div>
  );
};

export default CustomPremiumIcon;