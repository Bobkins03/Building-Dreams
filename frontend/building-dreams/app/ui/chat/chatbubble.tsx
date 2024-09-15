
import { ChatMessage } from '@/app/lib/chat';

export default function ChatBubble({ msg, me }: { msg: ChatMessage, me: boolean }) {

  return (
    <div className={`flex items-center gap-4 ${me ? "flex-row self-end" : "flex-row-reverse self-start"}`}>
        <span className="text-zinc-600">{msg.username}</span>
        <div className="flex flex-row rounded-sm bg-zinc-800 px-4 py-3 md:py-2">
            <span>{msg.message}</span>
        </div>


    </div>
  );
}
