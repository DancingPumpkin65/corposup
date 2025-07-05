import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/Shadcn/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Shadcn/Table/table';
import { type ShippingService } from '@/components/SellerPage/Deliveries/types';

interface DeliveriesTableProps {
  services: ShippingService[];
  onEdit: (service: ShippingService) => void;
  onDelete: (service: ShippingService) => void;
  formatCost: (cost: number | string) => string;
  formatDeliveryTime: (time: number | string) => number;
}

const DeliveriesTable = ({ services, onEdit, onDelete, formatCost, formatDeliveryTime }: DeliveriesTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Coût (DH)</TableHead>
            <TableHead>Délai (jours)</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  {service.shipping_name}
                </div>
              </TableCell>
              <TableCell className="max-w-xs">
                <p className="truncate" title={service.shipping_description}>
                  {service.shipping_description}
                </p>
              </TableCell>
              <TableCell>{formatCost(service.shipping_cost)} DH</TableCell>
              <TableCell>
                {formatDeliveryTime(service.shipping_delivery_time)} jour{formatDeliveryTime(service.shipping_delivery_time) > 1 ? 's' : ''}
              </TableCell>
              <TableCell>
                {new Date(service.created_at).toLocaleDateString('fr-FR')}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(service)}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(service)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DeliveriesTable;
