"use client";

import { useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner"; // Updated import

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Invite = {
  id: string;
  email: string;
  role: "Admin" | "Member" | "Viewer";
  invitedAt: string; // ISO string or similar for date/time
};

const MOCK_INVITES: Invite[] = [
  {
    id: "inv1",
    email: "new.user1@example.com",
    role: "Member",
    invitedAt: "2025-08-01T10:00:00Z",
  },
  {
    id: "inv2",
    email: "admin.candidate@example.com",
    role: "Admin",
    invitedAt: "2025-07-28T14:30:00Z",
  },
  {
    id: "inv3",
    email: "viewer.request@example.com",
    role: "Viewer",
    invitedAt: "2025-07-25T09:15:00Z",
  },
];

const getRoleColor = (role: Invite["role"]) => {
  switch (role) {
    case "Admin":
      return "bg-primary/10 text-primary";
    case "Member":
      return "bg-secondary/10 text-secondary";
    case "Viewer":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function InvitesTable() {
  const [invites, setInvites] = useState<Invite[]>(MOCK_INVITES);
  const [isConfirmRevokeDialogOpen, setIsConfirmRevokeDialogOpen] =
    useState(false);
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);

  const handleRevokeInvite = (invite: Invite) => {
    setSelectedInvite(invite);
    setIsConfirmRevokeDialogOpen(true);
  };

  const confirmRevokeInvite = () => {
    if (selectedInvite) {
      console.log("Revoking invite for:", selectedInvite.email);
      setInvites(invites.filter((invite) => invite.id !== selectedInvite.id));
      toast.error("Invite Revoked", {
        // Using toast.error for destructive action
        description: `The invitation for ${selectedInvite.email} has been revoked.`,
      });
      // In a real app, send API call to revoke invite
      setIsConfirmRevokeDialogOpen(false);
      setSelectedInvite(null);
    }
  };

  return (
    <div className="grid gap-4">
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Invited At</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invites.length > 0 ? (
              invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="font-medium">{invite.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(invite.role)}>
                      {invite.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(invite.invitedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleRevokeInvite(invite)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Revoke Invite
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No pending invites.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Revoke Invite Confirmation Dialog */}
      <AlertDialog
        open={isConfirmRevokeDialogOpen}
        onOpenChange={setIsConfirmRevokeDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will revoke the invitation for {selectedInvite?.email}
              . They will no longer be able to join using this invite.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRevokeInvite}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
