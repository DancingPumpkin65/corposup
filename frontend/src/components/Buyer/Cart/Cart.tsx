import { SidebarInset, SidebarTrigger } from "@/components/Shadcn/Sidebar/sidebar";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Shadcn/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Shadcn/Table";
import { Trash2, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/Shadcn/DropdownMenu";

// mock data
const cartProducts = [
	{
		id: 1,
		name: "ETAGERE FLOTTANTES MODERNES BOIS 3 NIV FIL METALLIQUE D50*12*50CM-SF-19819-3",
		quantity: 2,
		unit_price: 159,
		image:
			"https://www.bricoma.ma/pub/media/catalog/product/cache/6f5542370fb8b06785a17de9ae4d02fe/1/2/124756.png",
		url: "https://www.bricoma.ma/etagere-flottantes-modernes-bois-3-niv-fil-metallique-d50-12-50cm-sf-19819-3.html",
	},
    {
		id: 2,
		name: "ETAGERE FLOTTANTES MODERNES BOIS 3 NIV FIL METALLIQUE D50*12*50CM-SF-19819-3",
		quantity: 2,
		unit_price: 159,
		image:
			"https://www.bricoma.ma/pub/media/catalog/product/cache/6f5542370fb8b06785a17de9ae4d02fe/1/2/124756.png",
		url: "https://www.bricoma.ma/etagere-flottantes-modernes-bois-3-niv-fil-metallique-d50-12-50cm-sf-19819-3.html",
	},
];

const Cart = () => {
	const [loading] = useState(false);
	const [editQty, setEditQty] = useState<{ [id: number]: number }>({});
	const [_, setShowUpdate] = useState<{ [id: number]: boolean }>({});

	const handleQtyChange = (id: number, value: number) => {
		setEditQty((prev) => ({ ...prev, [id]: value }));
		setShowUpdate((prev) => ({ ...prev, [id]: true }));
	};

	// const handleUpdate = (id: number) => {
	// 	setShowUpdate((prev) => ({ ...prev, [id]: false }));
	// };

	// const handleRemove = (id: number) => {
	// };

	return (
		<SidebarInset>
			<header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
				<SidebarTrigger className="-ml-1" />
				<div className="flex items-center gap-2">
					<h1 className="text-lg font-semibold">Panier</h1>
				</div>
			</header>
			<div className="flex w-full max-w-[1100px] mx-auto py-8 px-4">
				<div className="flex-1">
					{loading ? (
						<div className="flex justify-center items-center min-h-[300px]">
							<Loader className="animate-spin mr-2" /> Chargement...
						</div>
					) : (
						<div className="bg-white rounded-xl shadow-sm border p-6">
							<h2 className="text-3xl font-bold mb-4">Votre panier</h2>
							<div className="overflow-x-auto rounded-lg border">
								<Table>
									<TableHeader>
										<TableRow className="bg-gray-50">
											<TableHead className="min-w-[180px] font-semibold">
												Article
											</TableHead>
											<TableHead className="min-w-[100px] font-semibold">
												Prix
											</TableHead>
											<TableHead className="min-w-[80px] font-semibold">
												Qté
											</TableHead>
											<TableHead className="min-w-[120px] font-semibold">
												Sous-total
											</TableHead>
											<TableHead className="w-[50px] text-left"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{cartProducts.length === 0 ? (
											<TableRow>
												<TableCell
													colSpan={5}
													className="text-center text-gray-400 py-4"
												>
													Votre panier est vide.
												</TableCell>
											</TableRow>
										) : (
											cartProducts.map((prod) => (
												<TableRow key={prod.id}>
													<TableCell>
														<div className="flex items-center gap-4">
															<a href={prod.url} tabIndex={-1}>
																<img
																	src={prod.image}
																	alt={prod.name}
																	className="w-16 h-16 object-cover rounded border"
																/>
															</a>
															<div>
																<span className="block font-medium text-gray-900 hover:underline hover:cursor-pointer hover:text-orange-600">
																	{prod.name}
																</span>
															</div>
														</div>
													</TableCell>
													<TableCell>
														<span className="font-bold text-orange-600">
															{prod.unit_price.toFixed(2)} MAD
														</span>
													</TableCell>
													<TableCell>
														<div className="flex items-center gap-2">
															<input
																id={`cart-${prod.id}-qty`}
																name={`cart[${prod.id}][qty]`}
																value={
																	editQty[prod.id] !== undefined
																		? editQty[prod.id]
																		: prod.quantity
																}
																type="number"
																min={1}
																size={4}
																step="any"
																title="Qté"
																className="input-text qty border rounded px-2 py-1 w-16 text-center"
																onChange={(e) =>
																	handleQtyChange(
																		prod.id,
																		Number(e.target.value)
																	)
																}
															/>
														</div>
													</TableCell>
													<TableCell>
														<span className="font-bold text-gray-900">
															{
																(prod.unit_price *
																	(editQty[prod.id] !== undefined
																		? editQty[prod.id]
																		: prod.quantity)
																).toFixed(2)
															}{" "}
															MAD
														</span>
													</TableCell>
													<TableCell className="text-left justify-center items-center">
														<DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-40">
                                                            <DropdownMenuItem className="text-gray-600 focus:text-gray-600 cursor-pointer hover:bg-blue-50 fill-gray-500" >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="31" viewBox="0 0 25 31" className="text-gray-600 mr-2">
                                                                <path d="M14.9863 6.90768H9.74077C8.84643 6.90768 7.98872 6.55272 7.35632 5.92089C6.72393 5.28905 6.36865 4.4321 6.36865 3.53856C6.36865 2.64501 6.72393 1.78806 7.35632 1.15623C7.98872 0.524394 8.84643 0.169434 9.74077 0.169434L14.9863 0.169434C15.8806 0.169434 16.7383 0.524394 17.3707 1.15623C18.0031 1.78806 18.3584 2.64501 18.3584 3.53856C18.3584 4.4321 18.0031 5.28905 17.3707 5.92089C16.7383 6.55272 15.8806 6.90768 14.9863 6.90768Z"/>
                                                                <path d="M18.3587 30.1164H6.3689C3.63436 30.1164 0.374023 29.077 0.374023 24.1268V9.52794C0.374023 6.628 1.32071 4.8355 3.26718 4.04812C3.34133 4.017 3.42092 4.00089 3.50135 4.00071C3.68236 4.01511 3.85339 4.08946 3.98732 4.21197C4.12125 4.33448 4.21043 4.49814 4.24072 4.67703C4.45723 5.75129 4.98948 6.73663 5.76941 7.50709C6.2897 8.0301 6.90857 8.4449 7.59027 8.72751C8.27197 9.01012 9.00297 9.15494 9.74102 9.15359H14.9865C16.2813 9.15354 17.5361 8.70628 18.5386 7.88759C19.541 7.0689 20.2293 5.92914 20.4868 4.66143C20.5157 4.4833 20.6039 4.32012 20.7372 4.19838C20.8705 4.07663 21.0411 4.00346 21.2212 3.99072C21.2979 3.99093 21.3738 4.0051 21.4454 4.03252C21.8634 4.19455 22.2529 4.422 22.5994 4.70635C23.779 5.67528 24.3535 7.24941 24.3535 9.52794V24.1275C24.3535 29.077 21.0926 30.1164 18.3587 30.1164ZM6.3689 21.5058C6.07079 21.5058 5.78488 21.6241 5.57409 21.8347C5.36329 22.0453 5.24486 22.331 5.24486 22.6288C5.24486 22.9267 5.36329 23.2123 5.57409 23.4229C5.78488 23.6336 6.07079 23.7519 6.3689 23.7519H18.3587C18.6568 23.7519 18.9427 23.6336 19.1535 23.4229C19.3643 23.2123 19.4827 22.9267 19.4827 22.6288C19.4827 22.331 19.3643 22.0453 19.1535 21.8347C18.9427 21.6241 18.6568 21.5058 18.3587 21.5058H6.3689ZM6.3689 15.5162C6.072 15.5201 5.78834 15.6397 5.57838 15.8495C5.36842 16.0592 5.24874 16.3426 5.24486 16.6393C5.24486 16.9371 5.36329 17.2228 5.57409 17.4334C5.78488 17.644 6.07079 17.7623 6.3689 17.7623H12.3638C12.6619 17.7623 12.9478 17.644 13.1586 17.4334C13.3694 17.2228 13.4878 16.9371 13.4878 16.6393C13.4878 16.3414 13.3694 16.0558 13.1586 15.8452C12.9478 15.6346 12.6619 15.5162 12.3638 15.5162H6.3689Z"/>
                                                                </svg> Ajouter au devis
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer hover:bg-red-50">
                                                                <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                                                            </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
													</TableCell>
												</TableRow>
											))
										)}
									</TableBody>
								</Table>
							</div>
							{/* Mise à jour button always below the table */}
							<div className="mt-6 text-right font-bold text-lg">
								<Button className="text-white bg-orange-600 hover:bg-orange-700">
									Ajouter tout au devis
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</SidebarInset>
	);
};

export default Cart;
