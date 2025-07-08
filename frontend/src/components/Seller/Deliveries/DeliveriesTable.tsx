import { Edit, Trash2, MoreHorizontal, Truck } from 'lucide-react';
import { Button } from '@/components/Shadcn/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Shadcn/Table/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Shadcn/DropdownMenu';
import { type DeliveriesTableProps } from '@/components/Seller/Deliveries/types';

const DeliveriesTable = ({ services, onEdit, onDelete, formatCost, formatDeliveryTime }: DeliveriesTableProps) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="min-w-[120px] font-semibold">Service</TableHead>
              <TableHead className="min-w-[200px] font-semibold">Description</TableHead>
              <TableHead className="min-w-[100px] font-semibold text-left">Coût (DH)</TableHead>
              <TableHead className="min-w-[100px] font-semibold text-left">Délai (jours)</TableHead>
              <TableHead className="min-w-[120px] font-semibold">Date de création</TableHead>
              <TableHead className="w-[50px] text-left"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-left">
                    <span className="truncate max-w-[150px]" title={service.shipping_name}>
                      {service.shipping_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="truncate max-w-[250px]" title={service.shipping_description}>
                    {service.shipping_description}
                  </p>
                </TableCell>
                <TableCell className="text-left font-medium">
                  {formatCost(service.shipping_cost)} DH
                </TableCell>
                <TableCell className="text-left">
                  {formatDeliveryTime(service.shipping_delivery_time)} jour{formatDeliveryTime(service.shipping_delivery_time) > 1 ? 's' : ''}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {new Date(service.created_at).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell className="text-left">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem 
                        className='cursor-pointer hover:bg-gray-100' 
                        onClick={() => onEdit(service)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(service)}
                        className="text-red-600 focus:text-red-600 cursor-pointer hover:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {services.map((service) => (
          <div key={service.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="p-4">
              {/* Service Header */}
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm truncate max-w-[200px]" title={service.shipping_name}>
                    {service.shipping_name}
                  </h4>
                  <span className="text-xs text-gray-500 truncate max-w-[200px]">Service de livraison</span>
                </div>
                <div className="ml-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem 
                        className='cursor-pointer hover:bg-gray-100' 
                        onClick={() => onEdit(service)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(service)}
                        className="text-red-600 focus:text-red-600 cursor-pointer hover:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 line-clamp-3 max-w-full" title={service.shipping_description}>
                  {service.shipping_description}
                </p>
              </div>

              {/* Pricing & Time */}
              <div className="grid grid-cols-2 gap-4 text-center text-xs">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="font-semibold text-gray-900 truncate max-w-[80px] mx-auto" title={`${formatCost(service.shipping_cost)} DH`}>
                    {formatCost(service.shipping_cost)} DH
                  </div>
                  <div className="text-gray-500">Coût</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="font-semibold text-gray-900 truncate max-w-[80px] mx-auto" title={`${formatDeliveryTime(service.shipping_delivery_time)} jour${formatDeliveryTime(service.shipping_delivery_time) > 1 ? 's' : ''}`}>
                    {formatDeliveryTime(service.shipping_delivery_time)} jour{formatDeliveryTime(service.shipping_delivery_time) > 1 ? 's' : ''}
                  </div>
                  <div className="text-gray-500">Délai</div>
                </div>
              </div>

              {/* Creation Date */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500 truncate max-w-full" title={`Créé le ${new Date(service.created_at).toLocaleDateString('fr-FR')}`}>
                  Créé le {new Date(service.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DeliveriesTable;
