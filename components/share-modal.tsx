"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
  text?: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  url = "https://icair.unilag.edu.ng/register/",
  title = "MIRG-ICAIR 2025 Conference",
  text = "Join me at the MIRG-ICAIR 2025 Conference at University of Lagos!",
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text,
    url,
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const encodedTitle = encodeURIComponent(title);

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      color: "bg-[#25D366] hover:bg-[#20BA5A]",
      action: () => {
        window.open(
          `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
          "_blank"
        );
      },
    },
    {
      name: "Twitter",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "bg-black hover:bg-gray-800",
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
          "_blank"
        );
      },
    },
    {
      name: "Telegram",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      color: "bg-[#0088cc] hover:bg-[#0077b5]",
      action: () => {
        window.open(
          `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
          "_blank"
        );
      },
    },
    {
      name: "Email",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      color: "bg-gray-600 hover:bg-gray-700",
      action: () => {
        window.location.href = `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`;
      },
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Use native share if available (mobile devices)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        onClose();
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:max-w-md sm:w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Share2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    Share Conference
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Invite your friends
                  </p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto pb-28">
              {/* Native Share Button (Mobile) */}
              {navigator.share && (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNativeShare}
                  className="w-full p-4 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-primary/90 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share with...
                </motion.button>
              )}

              {/* Social Media Options */}
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">
                  Share via
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {shareOptions.map((option, idx) => (
                    <motion.button
                      key={option.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={option.action}
                      className={`${option.color} text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg`}
                    >
                      {option.icon}
                      <span className="text-xs font-medium">{option.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Copy Link */}
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">
                  Or copy link
                </p>
                <div className="flex gap-2">
                  <div className="flex-1 px-4 py-3 bg-muted rounded-xl text-sm text-foreground truncate border border-border">
                    {url}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {copied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
                <AnimatePresence>
                  {copied && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-green-600 mt-2 font-medium"
                    >
                      ✓ Link copied to clipboard!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
