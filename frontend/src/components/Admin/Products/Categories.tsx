import { SidebarInset, SidebarTrigger } from '@/components/Shadcn/Sidebar';
import { useCategories } from '@/hooks/useCategories';
import { useState } from 'react';
import { Button } from '@/components/Shadcn/Button';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/Shadcn/Dialog';
import { Trash2 } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  // ...add other fields as needed
}

const Categories = () => {
  const { categories, loading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedCategory) return;
    setDeleting(true);
    try {
      await fetch(`/api/categories/${selectedCategory.id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Catégories</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-8">
        <div className="rounded-xl bg-white border shadow-sm p-4">
          <h2 className="text-md font-semibold mb-4">Liste des catégories</h2>
          {loading ? (
            <div className="text-gray-500">Chargement...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">ID</th>
                  <th className="text-left py-2 px-2">Nom</th>
                  <th className="text-left py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((cat: Category) => (
                  <tr key={cat.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2">{cat.id}</td>
                    <td className="py-2 px-2">{cat.name}</td>
                    <td className="py-2 px-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedCategory(cat);
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
                {categories?.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center text-gray-400 py-4">
                      Aucune catégorie trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer la catégorie</DialogTitle>
          </DialogHeader>
          <div>
            Êtes-vous sûr de vouloir supprimer la catégorie{' '}
            <span className="font-semibold">{selectedCategory?.name}</span> ?
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarInset>
  );
};

export default Categories;
