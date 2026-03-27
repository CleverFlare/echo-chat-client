export type FriendRequestStatus = "pending" | "accepted" | "declined";

export type ReceivedFriendRequest = {
  id: string;
  senderId: string;
  senderFirstName: string;
  senderLastName: string;
  senderHandle: string;
  senderAvatar: string;
  sentAt: Date;
  status: FriendRequestStatus;
};

export type SentFriendRequest = {
  id: string;
  receiverId: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverHandle: string;
  receiverAvatar: string;
  sentAt: Date;
  status: FriendRequestStatus;
};
