import { MessageCircle } from "lucide-react";
import { companyInfo } from "@/data/mockData";

const ZaloButton = () => {
  return (
    <a
      href={companyInfo.zaloLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0068ff] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#0052cc] transition-all duration-300 hover:scale-105 group"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden md:inline font-medium">Chat Zalo</span>
      
      {/* Pulse animation */}
      <span className="absolute -inset-1 bg-[#0068ff] rounded-full animate-ping opacity-30"></span>
    </a>
  );
};

export default ZaloButton;
