import { Popover, PopoverTrigger, PopoverContent } from "@/components/Shadcn/Popover";
import { Button } from "@/components/Shadcn/Button";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";

const initialCartProducts = [
	{
		id: 1,
		name: "ETAGERE FLOTTANTES MODERNES BOIS 3 NIV FIL METALLIQUE D50*12*50CM-SF-19819-3",
		quantity: 2,
		unit_price: 159,
		image:
			"https://www.bricoma.ma/pub/media/catalog/product/cache/6f5542370fb8b06785a17de9ae4d02fe/1/2/124756.png",
		url: "https://www.bricoma.ma/etagere-flottantes-modernes-bois-3-niv-fil-metallique-d50-12-50cm-sf-19819-3.html",
	},
];

export default function CartPopover() {
	const [cartProducts, setCartProducts] = useState(initialCartProducts);
	const [editQty, setEditQty] = useState<{ [id: number]: number }>({});
	const [showUpdate, setShowUpdate] = useState<{ [id: number]: boolean }>({});

	const handleQtyChange = (id: number, value: number) => {
		setEditQty((prev) => ({ ...prev, [id]: value }));
		setShowUpdate((prev) => ({ ...prev, [id]: true }));
	};

	const handleUpdate = (id: number) => {
		setCartProducts((prev) =>
			prev.map((prod) =>
				prod.id === id
					? { ...prod, quantity: Math.max(1, Number(editQty[id] ?? prod.quantity)) }
					: prod
			)
		);
		setShowUpdate((prev) => ({ ...prev, [id]: false }));
	};

	const handleRemove = (id: number) => {
		setCartProducts((prev) => prev.filter((prod) => prod.id !== id));
	};

	const totalItems = cartProducts.reduce((sum, prod) => sum + prod.quantity, 0);
	const totalPrice = cartProducts.reduce((sum, prod) => sum + prod.quantity * prod.unit_price, 0);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="relative bg-white px-0 py-0 hover:text-gray-500 hover:bg-white"
				>
					<div className="rounded-md text-orange-500 hover:text-gray-500">
						<svg
							style={{ width: "24px", height: "24px" }}
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"></path>
						</svg>
					</div>
					{cartProducts.length > 0 && (
						<span className="absolute -top-1 -right-1 rounded-full bg-orange-500 px-1.5 text-xs text-white">
							{cartProducts.length}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="p-0"
				style={{
					background: "#fff",
					border: "1px solid #bbb",
					marginTop: 4,
					boxSizing: "border-box",
					position: "absolute",
					top: "100%",
					right: -10,
					boxShadow: "0 3px 3px rgba(0,0,0,0.15)",
					padding: "0",
					width: 390,
					minWidth: 350,
					maxWidth: 400,
					display: "block",
					zIndex: 101,
				}}
			>
				{/* Top section */}
				<div className="flex items-start justify-between px-5 pt-4 pb-2 border-b border-gray-200">
					<div className="flex items-center justify-start gap-2">
						<span className="text-sm text-gray-700">
							{totalItems} Article{totalItems > 1 ? "s" : ""} dans le panier
						</span>
					</div>
					<div className="flex items-center gap-2">
                        <div className="flex flex-col items-end">
						<span className="text-sm text-gray-700">
							Sous-total du panier :
						</span>
						<span className="font-bold text-orange-600 text-base">
							{totalPrice.toFixed(2)} MAD
						</span>
                        </div>
						<Button
							variant="ghost"
							size="icon"
							className="ml-2 text-gray-400 hover:text-gray-700"
							aria-label="Fermer"
							onClick={() => {
								// You can close the popover here if you control its open state
							}}
						>
							<span className="sr-only">Fermer</span>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path d="M6 6L14 14M6 14L14 6" stroke="#888" strokeWidth="2" strokeLinecap="round" />
							</svg>
						</Button>
					</div>
				</div>
				{/* Cart items */}
				<ol className="minicart-items list-none m-0 p-0 px-5 py-2" style={{ maxHeight: 260, overflowY: "auto" }}>
					{cartProducts.length === 0 ? (
						<li className="p-4 text-center text-gray-400 text-sm">
							Votre panier est vide.
						</li>
					) : (
						cartProducts.map((prod) => (
							<li
								key={prod.id}
								className="item product product-item flex gap-3 py-4 border-b border-gray-200 last:border-b-0"
								data-role="product-item"
							>
								<div className="product flex-shrink-0 flex items-center">
									<a
										href={prod.url}
										tabIndex={-1}
										className="block border border-gray-200 w-16"
										title={prod.name}
									>
										<img
											className="w-14 h-14 object-cover mx-auto"
											src={prod.image}
											alt={prod.name}
										/>
									</a>
								</div>
								<div className="flex-1 flex flex-col justify-between">
									<div>
										<div className="font-medium text-gray-900 text-sm break-words leading-tight mb-1">
											<a
												href={prod.url}
												className="hover:underline"
												title={prod.name}
												style={{ color: "#333" }}
											>
												{prod.name}
											</a>
										</div>
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
										
										{showUpdate[prod.id] && (
											<Button
												size="sm"
												className="ml-2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-400"
												onClick={() => handleUpdate(prod.id)}
												type="button"
												style={{ fontWeight: 500 }}
											>
												Mettre à jour
											</Button>
										)}
										
									</div>
									<div className="font-bold text-orange-600 text-base mt-1">
										{prod.unit_price.toFixed(2)} MAD
									</div>
								</div>
                                <div className="flex flex-col items-center ml-4">
                                    <span>Qté:</span>
                                    <input
                                        type="number"
                                        min={1}
                                        value={
                                            editQty[prod.id] !== undefined
                                                ? editQty[prod.id]
                                                : prod.quantity
                                        }
                                        onChange={(e) =>
                                            handleQtyChange(
                                                prod.id,
                                                Number(e.target.value)
                                            )
                                        }
                                        className="item-qty cart-item-qty w-12 border rounded px-1 py-0.5 text-center"
                                        style={{ fontSize: "1em", fontWeight: 500 }}
                                    />
                                    <div className="flex bottom-0">
                                    <Button
											variant="ghost"
											size="icon"
											className="ml-2 text-gray-400 hover:text-gray-700"
											title="Modifier"
										>
											<Pencil className="w-4 h-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="ml-1 text-red-400 hover:text-red-600"
											onClick={() => handleRemove(prod.id)}
											title="Supprimer"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
                                    </div>
                                </div>
							</li>
						))
					)}
				</ol>
				{/* Footer */}
				<div className="px-5 pb-5 pt-2 border-t border-gray-200">
					<Button
						id="top-cart-btn-checkout"
						type="button"
						className="w-full bg-orange-600 text-white px-4 py-3 rounded font-bold hover:bg-orange-700 text-base transition"
						style={{ fontWeight: 700, fontSize: "1.1em" }}
					>
						Finaliser ma commande
					</Button>
					<div className="text-center mt-2">
						<a className="action viewcart text-sm text-blue-600 underline hover:text-blue-800" href="/buyer/cart/">
							Voir le panier
						</a>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}