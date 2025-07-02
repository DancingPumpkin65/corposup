import { useState } from 'react';
import { AlertTriangleIcon } from 'lucide-react';
import { Button } from '../Shadcn/Button';
import { Input } from '../Shadcn/Input';
import { Label } from '../Shadcn/Label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../Shadcn/Dialog';

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
      // Since there's no delete endpoint in your API, we'll show a message
      // that this functionality needs to be implemented
      setError('Cette fonctionnalité n\'est pas encore disponible. Contactez l\'administrateur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6" id="delete-account">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Supprimer le compte</h2>
        <p className="text-gray-600">
          Une fois votre compte supprimé, toutes ses ressources et données seront définitivement supprimées.
        </p>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="bg-black hover:bg-gray-800 px-11">
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
              Veuillez entrer votre mot de passe pour confirmer que vous souhaitez supprimer définitivement votre compte.
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

            <div className="flex justify-end gap-2">
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
              <Button
                type="submit"
                variant="destructive"
                disabled={loading}
                className="bg-black-600 hover:bg-black-500 px-10"
              >
                {loading ? 'Suppression...' : 'SUPPRIMER'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteAccountSection;
