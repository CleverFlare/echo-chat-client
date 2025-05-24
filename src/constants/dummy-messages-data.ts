import { type Message } from "@/store/chat";

export const dummyMessagesData: Record<string, Record<string, Message[]>> = {
  "2": {
    "2025-05-16": [
      {
        id: "96bfffda-0bbe-4eb9-975b-c42cb769141d",
        isEdited: false,
        status: "read",
        sender: {
          id: "2",
        },
        content: "Hi there, my name is Omaima.",
        timestamp: "2025-05-16T14:47:33.574Z",
      },
      {
        id: "c2837aee-5dc0-4f20-94c7-7b12345dd234",
        isEdited: false,
        status: "read",
        sender: {
          id: "1",
        },
        content: "Hey Omaima, nice to meet you!",
        timestamp: "2025-05-16T14:48:10.123Z",
      },
    ],
    "2025-05-17": [
      {
        id: "4ec1dc0f-76ea-4d4f-b674-f12f50d8ae22",
        isEdited: false,
        status: "delivered",
        sender: {
          id: "2",
        },
        content: "So what do you do for work?",
        timestamp: "2025-05-17T08:15:45.321Z",
      },
      {
        id: "fe4b4d66-61aa-4c55-9f84-77e3a4a2b3ce",
        isEdited: false,
        status: "sent",
        sender: {
          id: "1",
        },
        content: "I’m a frontend engineer. I love building UI stuff.",
        timestamp: "2025-05-17T08:16:30.892Z",
      },
      {
        id: "bc76c5b0-eac6-4dcf-b55f-8f3c54d39ae2",
        isEdited: false,
        status: "sent",
        sender: {
          id: "1",
        },
        content: "How about you?",
        timestamp: "2025-05-17T08:17:01.414Z",
      },
    ],
    "2025-05-18": [
      {
        id: "1a8c40c3-498d-4a5f-a6f9-65f22c4b8e1d",
        isEdited: false,
        status: "delivered",
        sender: {
          id: "2",
        },
        content: "I’m a product designer! We should collaborate sometime 👀",
        timestamp: "2025-05-18T09:22:11.689Z",
      },
      {
        id: "a96a1a9b-f1b4-4a28-9474-658e1de13bb2",
        isEdited: false,
        status: "pending",
        sender: {
          id: "1",
        },
        content: "That sounds awesome! I'd love to.",
        timestamp: "2025-05-18T09:23:59.732Z",
      },
      {
        id: "f1342bc2-66a3-4c56-bb2c-dfe2e7a372e0",
        isEdited: false,
        status: "read",
        sender: {
          id: "2",
        },
        content: "Cool! What kind of projects do you usually work on?",
        timestamp: "2025-05-18T09:24:40.102Z",
      },
      {
        id: "21f3d648-23a0-45a1-88f2-d1e6cf45f7c1",
        isEdited: false,
        status: "read",
        sender: {
          id: "1",
        },
        content:
          "Mostly front-end apps and internal tools. Lately some mobile work too.",
        timestamp: "2025-05-18T09:25:17.011Z",
      },
      {
        id: "a31e25d6-4e0c-45db-b6d1-b2fc65c423e2",
        isEdited: false,
        status: "delivered",
        sender: {
          id: "2",
        },
        content:
          "That's great! I'm currently redesigning a mobile banking app.",
        timestamp: "2025-05-18T09:26:03.401Z",
      },
      {
        id: "d9c189ac-312a-4ae7-92cf-85a451aaae12",
        isEdited: false,
        status: "sent",
        sender: {
          id: "1",
        },
        content: "No way! I'm working on something fintech-related too 😄",
        timestamp: "2025-05-18T09:26:41.293Z",
      },
      {
        id: "89cfc9e0-f35c-4a20-8fa1-58a4c02f6434",
        isEdited: false,
        status: "delivered",
        sender: {
          id: "2",
        },
        content: "Haha that’s a sign 😄 We should definitely collaborate soon!",
        timestamp: "2025-05-18T09:27:14.100Z",
      },
      {
        id: "28e9998a-fc16-4456-b3e7-d4f2f97b43c3",
        isEdited: false,
        status: "read",
        sender: {
          id: "1",
        },
        content: "Agreed. Let's set up a quick call sometime this week?",
        timestamp: "2025-05-18T09:27:51.890Z",
      },
      {
        id: "6cf7e0aa-5d3e-4f83-8b95-b3b8ef6359b0",
        isEdited: false,
        status: "delivered",
        sender: {
          id: "2",
        },
        content: "Thursday afternoon works for me!",
        timestamp: "2025-05-18T09:28:29.123Z",
      },
      {
        id: "347c3a9a-c52a-44f2-bfd9-f92b409ae57a",
        isEdited: false,
        status: "sent",
        sender: {
          id: "1",
        },
        content: "Perfect. I’ll send a calendar invite now.",
        timestamp: "2025-05-18T09:29:02.777Z",
      },
      {
        id: "74c9f9e4-02c9-43ef-8ef4-8a69c60c1dd6",
        isEdited: false,
        status: "delivered",
        sender: {
          id: "2",
        },
        content: "Looking forward to it!",
        timestamp: "2025-05-18T09:29:29.345Z",
      },
      {
        id: "d517bcfa-70f7-44c0-a12e-37e093eb0f14",
        isEdited: false,
        status: "read",
        sender: {
          id: "1",
        },
        content: "Quick question: do you prefer Figma or Adobe XD?",
        timestamp: "2025-05-18T09:30:17.498Z",
      },
      {
        id: "faeb7ff7-1205-4051-ae39-59c121f6f47a",
        isEdited: false,
        status: "delivered",
        sender: {
          id: "2",
        },
        content: "Figma, 100%! It's so much more collaborative.",
        timestamp: "2025-05-18T09:30:41.204Z",
      },
      {
        id: "49846f61-e5ee-48c5-8509-84e71639f06e",
        isEdited: false,
        status: "delivered",
        sender: {
          id: "1",
        },
        content: "Same here. I love how seamless handoff is with dev mode.",
        timestamp: "2025-05-18T09:31:10.599Z",
      },
      {
        id: "9a65c996-6c6b-4059-9d6e-3b27b1186f2f",
        isEdited: false,
        status: "read",
        sender: {
          id: "2",
        },
        content: "Have you tried Figma variables yet?",
        timestamp: "2025-05-18T09:31:45.422Z",
      },
      {
        id: "6c71f214-872e-4cb4-b54f-eec19a2e42f3",
        isEdited: false,
        status: "delivered",
        sender: {
          id: "1",
        },
        content: "Not yet! I saw the announcement though, they look amazing.",
        timestamp: "2025-05-18T09:32:21.330Z",
      },
      {
        id: "3604e57c-9539-4dc7-9377-9ecb7aa229e3",
        isEdited: false,
        status: "sent",
        sender: {
          id: "2",
        },
        content:
          "They're a game-changer. We should include them in our design system.",
        timestamp: "2025-05-18T09:33:01.671Z",
      },
      {
        id: "ac4ec8a1-9f5d-4c0a-a37f-c8466d6ce3d4",
        isEdited: false,
        status: "read",
        sender: {
          id: "1",
        },
        content: "Noted! I’ll explore it before Thursday.",
        timestamp: "2025-05-18T09:33:27.913Z",
      },
      {
        id: "dbd0d48a-f49e-48b3-991e-fb3a708ff3a1",
        isEdited: false,
        status: "delivered",
        sender: {
          id: "2",
        },
        content: "Awesome 👏 Let me know if you run into anything confusing.",
        timestamp: "2025-05-18T09:33:58.214Z",
      },
      {
        id: "d8ea4cd9-7df7-4d86-89b8-8e17372db517",
        isEdited: false,
        status: "read",
        sender: {
          id: "1",
        },
        content: "Will do. Talk soon ✌️",
        timestamp: "2025-05-18T09:34:29.108Z",
      },
      {
        id: "83fd9e2b-e487-463f-a760-43db68be8b69",
        isEdited: false,
        status: "delivered",
        sender: {
          id: "2",
        },
        content: "Bye! ✨",
        timestamp: "2025-05-18T09:34:52.820Z",
      },
    ],
  },
};
