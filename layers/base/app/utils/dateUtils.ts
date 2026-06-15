import type { Chat } from "~/types";

export const isWithinDays = (date: Date, days: number) => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays <= days;
};

export const filterChatsByDateRange = (
  chats: Chat[],
  startDays: number,
  endDays?: number,
) => {
  return chats.filter((chat) => {
    const date = new Date(chat.updatedAt);
    if (!endDays || endDays === undefined) {
      return !isWithinDays(date, startDays);
    }
    return !isWithinDays(date, startDays) && isWithinDays(date, endDays);
  });
};
