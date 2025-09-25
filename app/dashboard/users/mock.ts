export type User = {
  id: string;
  profilePhoto: string;
  name: string;
  role: "Admin" | "Member" | "Viewer";
  email: string;
  joinDate: string; // ISO string for exact date and timestamp
};

export const MOCK_USERS: User[] = [
  {
    id: "1",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    name: "Alice Smith",
    role: "Admin",
    email: "alice.smith@example.com",
    joinDate: "2024-01-15T09:30:00Z",
  },
  {
    id: "2",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    name: "Bob Johnson",
    role: "Member",
    email: "bob.johnson@example.com",
    joinDate: "2024-02-20T14:15:00Z",
  },
  {
    id: "3",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    name: "Charlie Brown",
    role: "Viewer",
    email: "charlie.brown@example.com",
    joinDate: "2024-03-10T11:45:00Z",
  },
  {
    id: "4",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    name: "Diana Prince",
    role: "Admin",
    email: "diana.prince@example.com",
    joinDate: "2024-01-25T16:20:00Z",
  },
  {
    id: "5",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    name: "Eve Adams",
    role: "Member",
    email: "eve.adams@example.com",
    joinDate: "2024-04-05T08:10:00Z",
  },
  {
    id: "6",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    name: "Frank White",
    role: "Viewer",
    email: "frank.white@example.com",
    joinDate: "2024-05-12T13:30:00Z",
  },
  {
    id: "7",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    name: "Grace Lee",
    role: "Admin",
    email: "grace.lee@example.com",
    joinDate: "2024-02-28T10:00:00Z",
  },
  {
    id: "8",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    name: "Henry King",
    role: "Member",
    email: "henry.king@example.com",
    joinDate: "2024-06-18T15:45:00Z",
  },
  {
    id: "9",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    name: "Ivy Queen",
    role: "Viewer",
    email: "ivy.queen@example.com",
    joinDate: "2024-07-22T12:20:00Z",
  },
  {
    id: "10",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    name: "Jack Black",
    role: "Admin",
    email: "jack.black@example.com",
    joinDate: "2024-03-15T09:15:00Z",
  },
  {
    id: "11",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    name: "Karen Green",
    role: "Member",
    email: "karen.green@example.com",
    joinDate: "2024-08-01T14:30:00Z",
  },
  {
    id: "12",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    name: "Liam Blue",
    role: "Viewer",
    email: "liam.blue@example.com",
    joinDate: "2024-08-15T11:00:00Z",
  },
];
