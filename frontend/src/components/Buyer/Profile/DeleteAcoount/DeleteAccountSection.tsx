import { useState } from 'react';
import { AlertTriangleIcon } from 'lucide-react';
import { Button } from '@/components/Shadcn/Button';
import { Input } from '@/components/Shadcn/Input';
import { Label } from '@/components/Shadcn/Label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/Shadcn/Dialog';

const DeleteAccountSection = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setError('Le mot de passe est requis');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // destroy user api still not implemented
      setError('Cette fonctionnalité n\'est pas encore disponible. Contactez l\'administrateur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6" id="delete-account">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Supprimer le compte</h2>
        <p className="text-gray-600">
          Une fois votre compte supprimé, toutes ses ressources et données seront définitivement supprimées.
        </p>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="bg-orange-600 hover:bg-orange-500 px-11">
            SUPPRIMER
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangleIcon className="h-5 w-5 text-red-600" />
              Êtes-vous sûr de vouloir supprimer votre compte ?
            </DialogTitle>
            <DialogDescription>
              Une fois votre compte supprimé, toutes ses ressources et données seront définitivement supprimées.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleDelete} className="space-y-4">
            <div>
              <Label htmlFor="delete_password" className="sr-only">
                Mot de passe
              </Label>
              <Input
                id="delete_password"
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-3/4"
                required
              />
              {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
              )}
            </div>

            <div className="flex justify-start gap-2">
              <Button
                type="submit"
                variant="destructive"
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-500 px-11"
                >
                {loading ? 'Suppression...' : 'Supprimer'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                    setIsOpen(false);
                    setPassword('');
                    setError('');
                }}
                > 
                    Annuler
                  </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteAccountSection;
