'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  ArrowLeft, 
  Smile, 
  X, 
  Mic, 
  Video, 
  Phone,
  Play,
  Pause,
  Download,
  Image as ImageIcon,
  File,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { images } from '@/constants/images';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Message {
  id: number;
  sender: 'user' | 'sheikh';
  content?: string;
  timestamp: Date;
  type?: 'text' | 'image' | 'voice' | 'file';
  images?: string[];
  file?: {
    name: string;
    size: string;
    type: string;
    url: string;
  };
  voice?: {
    duration: string;
    url: string;
    isPlaying: boolean;
  };
  isRead?: boolean;
}

export default function ChatPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeVoiceId, setActiveVoiceId] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null); // ADD THIS REF
  const recordingIntervalRef = useRef<NodeJS.Timeout>();
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'sheikh',
      content: 'As-salamu alaykum! How can I help you today?',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      isRead: true
    },
    {
      id: 2,
      sender: 'user',
      content: 'Wa alaykumu as-salam! I have a question about prayer times.',
      timestamp: new Date(Date.now() - 3500000),
      type: 'text',
      isRead: true
    },
    {
      id: 3,
      sender: 'sheikh',
      content: 'Of course, I\'d be happy to help you with that. What specifically would you like to know about prayer times?',
      timestamp: new Date(Date.now() - 3400000),
      type: 'text',
      isRead: true
    },
    {
      id: 4,
      sender: 'sheikh',
      type: 'voice',
      timestamp: new Date(Date.now() - 3200000),
      voice: {
        duration: '0:26',
        url: '#',
        isPlaying: false
      },
      isRead: true
    },
    {
      id: 5,
      sender: 'sheikh',
      type: 'image',
      timestamp: new Date(Date.now() - 3000000),
      images: ['/images/sample1.jpg', '/images/sample2.jpg'],
      isRead: true
    },
    {
      id: 6,
      sender: 'sheikh',
      type: 'file',
      timestamp: new Date(Date.now() - 2800000),
      file: {
        name: 'Prayer_Times_Guide.pdf',
        size: '2.4 MB',
        type: 'pdf',
        url: '#'
      },
      isRead: true
    }
  ]);

  const sheikh = {
    id: 1,
    name: 'Sheikh Abdullah',
    image: images.Unknown,
    isOnline: true,
    typing: false
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Custom scroll function - ADD THIS
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      // Scroll the container, not the whole page
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Auto scroll to bottom - UPDATE THIS
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedImages.length > 0) {
      // Send images
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        type: 'image',
        timestamp: new Date(),
        images: imagePreviews,
        isRead: false
      };
      
      setMessages(prev => [...prev, newMessage]);
      setSelectedImages([]);
      setImagePreviews([]);
      
      // Simulate sheikh response
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          sender: 'sheikh',
          content: 'JazakAllah Khair for sharing these images! May Allah reward you.',
          timestamp: new Date(),
          type: 'text',
          isRead: false
        };
        setMessages(prev => [...prev, response]);
      }, 1500);
      
      return;
    }
    
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        content: message,
        timestamp: new Date(),
        type: 'text',
        isRead: false
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate sheikh typing and response
      setTimeout(() => {
        const responses = [
          "Alhamdulillah, that's a great question.",
          "Let me provide you with some guidance on this matter.",
          "Based on the Quran and Sunnah, the answer is...",
          "May Allah make it easy for you and accept your efforts.",
          "I appreciate your seeking knowledge. Here's what I can share..."
        ];
        const response: Message = {
          id: messages.length + 2,
          sender: 'sheikh',
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          type: 'text',
          isRead: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setSelectedImages(prev => [...prev, ...newImages]);
      
      const newPreviews = newImages.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    
    if (recordingTime > 0) {
      const duration = `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}`;
      const voiceMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        type: 'voice',
        timestamp: new Date(),
        voice: {
          duration,
          url: '#',
          isPlaying: false
        },
        isRead: false
      };
      
      setMessages(prev => [...prev, voiceMessage]);
      setRecordingTime(0);
    }
  };

  const toggleVoicePlayback = (messageId: number) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.type === 'voice') {
        const isPlaying = !msg.voice?.isPlaying;
        setActiveVoiceId(isPlaying ? messageId : null);
        return {
          ...msg,
          voice: { ...msg.voice!, isPlaying }
        };
      } else if (msg.type === 'voice') {
        return { ...msg, voice: { ...msg.voice!, isPlaying: false } };
      }
      return msg;
    }));
  };

  const simulateFileUpload = (file: File) => {
    setUploading(true);
    setUploadProgress(0);
    
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setUploading(false);
            const newMessage: Message = {
              id: messages.length + 1,
              sender: 'user',
              type: 'file',
              timestamp: new Date(),
              file: {
                name: file.name,
                size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                type: file.type.split('/')[1] || 'file',
                url: URL.createObjectURL(file)
              },
              isRead: false
            };
            setMessages(prev => [...prev, newMessage]);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      simulateFileUpload(file);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <File className="h-4 w-4" />;
      case 'doc':
      case 'docx': return <File className="h-4 w-4" />;
      case 'jpg':
      case 'jpeg':
      case 'png': return <ImageIcon className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col h-[86vh] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Header - FIXED */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 shadow-sm flex-shrink-0">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-color1/20">
                  <Image
                    src={sheikh.image}
                    alt={sheikh.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                {sheikh.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900"></div>
                )}
              </div>
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">{sheikh.name}</h2>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${sheikh.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {sheikh.isOnline ? 'Online' : 'Offline'}
                    {sheikh.typing && <span className="text-primary-color1 ml-2">• typing...</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area - UPDATED WITH REF */}
      <div 
        ref={messagesContainerRef} 
        className="flex-1 overflow-y-auto p-4"
        style={{ 
          overscrollBehavior: 'contain', // Prevents page scroll
          scrollBehavior: 'smooth'
        }}
      >
        <div className="container mx-auto max-w-3xl space-y-6">
          {messages.map((msg, index) => {
            const showDate = index === 0 || 
              formatDate(msg.timestamp) !== formatDate(messages[index - 1].timestamp);
            
            return (
              <React.Fragment key={msg.id}>
                {showDate && (
                  <div className="text-center">
                    <Badge 
                      variant="secondary" 
                      className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-normal px-3 py-1 rounded-full"
                    >
                      {formatDate(msg.timestamp)}
                    </Badge>
                  </div>
                )}
                
                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.sender === 'sheikh' && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={sheikh.image}
                          alt={sheikh.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      {/* Voice Message */}
                      {msg.type === 'voice' && msg.voice && (
                        <div
                          className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all hover:shadow-md ${
                            msg.sender === 'user'
                              ? 'bg-primary-color1 text-white'
                              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                          }`}
                          onClick={() => toggleVoicePlayback(msg.id)}
                        >
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            msg.sender === 'user' ? 'bg-white/20' : 'bg-primary-color1/10'
                          }`}>
                            {msg.voice.isPlaying ? (
                              <Pause className="h-5 w-5" />
                            ) : (
                              <Play className="h-5 w-5 ml-0.5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-[120px]">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium">
                                {msg.sender === 'user' ? 'Your voice message' : 'Voice message'}
                              </span>
                              <span className="text-xs opacity-75">{msg.voice.duration}</span>
                            </div>
                            <div className="h-2 bg-white/30 dark:bg-gray-700/50 rounded-full overflow-hidden">
                              {msg.voice.isPlaying && (
                                <div className="h-full bg-white animate-pulse"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Image Message */}
                      {msg.type === 'image' && msg.images && (
                        <div className="space-y-2">
                          <div className={`grid grid-cols-2 gap-2 ${msg.images.length === 1 ? 'max-w-sm' : ''}`}>
                            {msg.images.map((img, idx) => (
                              <div 
                                key={idx}
                                className={`relative overflow-hidden rounded-xl ${
                                  msg.images?.length === 1 ? 'max-w-md' : ''
                                }`}
                              >
                                <Image
                                  src={img}
                                  alt={`Image ${idx + 1}`}
                                  width={300}
                                  height={200}
                                  className="object-cover w-full h-auto rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                                />
                                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                  <ImageIcon className="h-3 w-3 inline mr-1" />
                                  {idx + 1}/{msg.images.length}
                                </div>
                              </div>
                            ))}
                          </div>
                          {msg.content && (
                            <div className={`text-sm mt-2 ${
                              msg.sender === 'user' ? 'text-right' : 'text-left'
                            }`}>
                              {msg.content}
                            </div>
                          )}
                        </div>
                      )}

                      {/* File Message */}
                      {msg.type === 'file' && msg.file && (
                        <Card className={`p-4 max-w-xs ${
                          msg.sender === 'user'
                            ? 'bg-primary-color1 text-white'
                            : 'bg-white dark:bg-gray-800'
                        }`}>
                          <div className="flex items-start gap-3">
                            <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                              msg.sender === 'user' ? 'bg-white/20' : 'bg-primary-color1/10'
                            }`}>
                              {getFileIcon(msg.file.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">{msg.file.name}</p>
                              <p className="text-xs opacity-75 mt-1">{msg.file.size}</p>
                              <div className="flex items-center gap-2 mt-3">
                                <Button
                                  size="sm"
                                  variant={msg.sender === 'user' ? 'secondary' : 'default'}
                                  className="h-8 text-xs"
                                >
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </Button>
                                {msg.sender === 'user' && msg.isRead && (
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      )}

                      {/* Text Message */}
                      {msg.type === 'text' && (
                        <div
                          className={`rounded-2xl px-4 py-3 max-w-lg ${
                            msg.sender === 'user'
                              ? 'bg-primary-color1 text-white rounded-tr-sm'
                              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-tl-sm'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          {msg.sender === 'user' && msg.isRead && (
                            <CheckCircle className="h-4 w-4 text-green-400 mt-1 ml-auto" />
                          )}
                        </div>
                      )}

                      <div className={`flex items-center gap-2 mt-1 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          
          {/* Keep this for reference but we're using the container ref now */}
          <div ref={messagesEndRef} className="invisible h-0" />
        </div>
      </div>

      {/* Image Previews - FIXED */}
      {imagePreviews.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex-shrink-0">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {imagePreviews.length} {imagePreviews.length === 1 ? 'image' : 'images'} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedImages([]);
                  setImagePreviews([]);
                }}
                className="h-7 text-xs"
              >
                Clear all
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Voice Recording - FIXED */}
      {isRecording && (
        <div className="bg-white dark:bg-gray-900 border-t border-red-200 dark:border-red-900 px-4 py-3 flex-shrink-0">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center animate-pulse">
                  <div className="h-6 w-6 rounded-full bg-red-500"></div>
                </div>
                <div>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    Recording voice message
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={stopRecording}
                className="gap-2"
              >
                <div className="h-3 w-3 bg-white rounded-full"></div>
                Stop Recording
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Input Area - FIXED */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex-shrink-0">
        <div className="container mx-auto max-w-3xl">
          <form onSubmit={handleSendMessage} className="flex items-end gap-2">
            {/* Hidden file inputs */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              multiple
              accept="image/*"
              className="hidden"
            />
            <input
              type="file"
              id="file-upload"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full h-10 w-10"
              >
                <Paperclip className="h-5 w-5" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="rounded-full h-10 w-10"
              >
                <File className="h-5 w-5" />
              </Button>

              <div className="relative" ref={emojiPickerRef}>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="rounded-full h-10 w-10"
                >
                  <Smile className="h-5 w-5" />
                </Button>
                
                {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 mb-2 z-50 shadow-xl rounded-lg overflow-hidden">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:border-primary-color1 transition-colors min-h-[44px] flex items-center">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 px-4 py-3 bg-transparent border-none outline-none resize-none text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={isRecording ? stopRecording : startRecording}
                className={`rounded-full h-10 w-10 mr-1 ${
                  isRecording ? 'text-red-500 hover:text-red-600 hover:bg-red-50' : ''
                }`}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </div>

            <Button
              type="submit"
              size="icon"
              disabled={!message.trim() && selectedImages.length === 0}
              className="rounded-full h-11 w-11 bg-gradient-to-r from-primary-color1 to-primary-color1/90 hover:from-primary-color1 hover:to-primary-color1 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}