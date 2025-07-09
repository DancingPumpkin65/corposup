import { SidebarInset, SidebarTrigger } from '@/components/Shadcn/Sidebar';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Shadcn/Button';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/Shadcn/Dialog';
import { Trash2, Ban } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/Shadcn/Avatar';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  photo_profile: string;
  role: string;
  // ...other fields as needed
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/users');
      if (!res.ok) {
        setUsers([]);
        setLoading(false);
        return;
      }
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        setUsers([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      console.log('Fetched users:', data); // Debugging line
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await fetch(`/api/users/${selectedUser.id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Accept': 'application/json' },
      });
      setDeleteDialogOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } finally {
      setActionLoading(false);
    }
  };

  // Placeholder for ban logic
  const handleBan = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      // If you have a ban endpoint, use it here (e.g., PATCH /api/users/{id}/ban)
      // await fetch(`/api/users/${selectedUser.id}/ban`, { method: 'PATCH', ... });
      setBanDialogOpen(false);
      setSelectedUser(null);
      // fetchUsers();
    } finally {
      setActionLoading(false);
    }
  };

  const getProfileImageUrl = (photo_profile?: string): string => {
  if (!photo_profile) return '';
  
  if (photo_profile.startsWith('profiles/')) {
    return `http://127.0.0.1:8000/storage/${photo_profile}`;
  }
  
  return photo_profile;
};

  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Utilisateurs</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-8">
        <div className="rounded-xl bg-white border shadow-sm p-4">
          <h2 className="text-md font-semibold mb-4">Liste des utilisateurs</h2>
          {loading ? (
            <div className="text-gray-500">Chargement...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">ID</th>
                  <th className="text-left py-2 px-2">PHOTO</th>
                  <th className="text-left py-2 px-2">NOM</th>
                  <th className="text-left py-2 px-2">PRENOM</th>
                  <th className="text-left py-2 px-2">EMAIL</th>
                  <th className="text-left py-2 px-2">RÔLE</th>
                  <th className="text-left py-2 px-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user: User) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2">{user.id}</td>
                    <td className="py-2 px-2"><Avatar><AvatarImage className='w-5 h-5' src={getProfileImageUrl(user.photo_profile)} alt={`${user.firstname} ${user.lastname}`} className="w-10 h-10 rounded-full" /></Avatar></td>
                    <td className="py-2 px-2">{user.firstname}</td>
                    <td className="py-2 px-2">{user.lastname}</td>
                    <td className="py-2 px-2">{user.email}</td>
                    <td className="py-2 px-2">{user.role}</td>
                    <td className="py-2 px-2 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setBanDialogOpen(true);
                        }}
                        className="text-yellow-600 hover:bg-yellow-50"
                        title="Bannir"
                      >
                        <Ban size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setDeleteDialogOpen(true);
                        }}
                        className="text-red-600 hover:bg-red-50"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </td>
                  </tr>
                ))}
                {users?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-4">
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer l'utilisateur</DialogTitle>
          </DialogHeader>
          <div>
            Êtes-vous sûr de vouloir supprimer l'utilisateur{' '}
            <span className="font-semibold">{selectedUser?.firstname}</span> ?
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={actionLoading}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={actionLoading}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Ban Dialog */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bannir l'utilisateur</DialogTitle>
          </DialogHeader>
          <div>
            Êtes-vous sûr de vouloir bannir l'utilisateur{' '}
            <span className="font-semibold">{selectedUser?.firstname}</span> ?
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBanDialogOpen(false)} disabled={actionLoading}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleBan} disabled={actionLoading}>
              Bannir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarInset>
  );
};

export default Users;
