"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useChat } from "ai/react";
import { ScrollArea } from "./ui/scroll-area";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  return (
    <Card className="w-full max-w-[450px] h-[95vh] shadow-xl flex flex-col">
      <CardHeader>
        <CardTitle>Chat AI</CardTitle>
        <CardDescription>Fell free to ask anything!</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-[65vh] w-full pr-4">
          {messages.map((message) => {
            return (
              <div key={message.id} className="flex gap-3 text-slate-700 text-sm mt-4">
                {message.role === "user" && (
                  <Avatar className="w-6 h-6">
                    <AvatarFallback>VA</AvatarFallback>
                    <AvatarImage src="https://github.com/VitorAndrey.png" />
                  </Avatar>
                )}
                {message.role === "assistant" && (
                  <Avatar className="w-6 h-6">
                    <AvatarFallback>GPT</AvatarFallback>
                    <AvatarImage src="/chatGPTIcon.png" />
                  </Avatar>
                )}

                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-900">
                    {message.role === "user" && "Você:"}
                    {message.role === "assistant" && "Chat GPT:"}
                  </span>
                  {message.content}
                </p>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <Input placeholder="Type your message" value={input} onChange={handleInputChange} />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
