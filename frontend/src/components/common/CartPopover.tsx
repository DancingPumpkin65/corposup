import { Popover, PopoverTrigger, PopoverContent } from "@/components/Shadcn/Popover";
import { Button } from "@/components/Shadcn/Button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

// Example cart data (replace with your state/props)
const initialCartProducts = [
	{
		id: 1,
		name: "ETAGERE FLOTTANTES MODERNES BOIS 3 NIV FIL METALLIQUE D50*12*50CM-SF-19819-3",
		quantity: 1,
		unit_price: 159,
		image:
			"https://www.bricoma.ma/pub/media/catalog/product/cache/6f5542370fb8b06785a17de9ae4d02fe/1/2/124756.png",
		url: "https://www.bricoma.ma/etagere-flottantes-modernes-bois-3-niv-fil-metallique-d50-12-50cm-sf-19819-3.html",
	},
	{
		id: 2,
		name: "ETAGÉRE MURALE RONDE EN METAL 4 NIV 50*10*50CM -SF-230495-FD",
		quantity: 1,
		unit_price: 149,
		image:
			"https://www.bricoma.ma/pub/media/catalog/product/cache/6f5542370fb8b06785a17de9ae4d02fe/1/2/124757_.jpg",
		url: "https://www.bricoma.ma/etagere-murale-ronde-en-metal-4-niv-50-10-50cm-sf-230495-fd.html",
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
					className="relative bg-white px-0 py-0 hover:bg-white"
				>
					<div className="rounded-md text-orange-500 hover:text-gray-500">
						<svg
							className="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"></path>
						</svg>
					</div>
					{cartProducts.length > 0 && (
						<span className="absolute -top-1 -right-1 rounded-full bg-orange-500 px-1.5 py-0.5 text-xs text-white">
							{cartProducts.length}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[370px] p-0">
				<div className="flex flex-col border-b p-4 text-lg font-bold text-gray-800 flex flex-col gap-1">
					<span>Mon Panier ({totalItems})</span>
					<span className="text-xs font-normal text-gray-500">
						Total :{" "}
						<span className="font-semibold text-orange-600">
							{totalPrice.toFixed(2)} DH
						</span>
					</span>
				</div>
				<div
					className="minicart-items-wrapper"
					style={{
						height: 401,
						overflowX: "auto",
						padding: 15,
						margin: "0 -20px",
						border: "1px solid #ccc",
						borderLeft: 0,
						borderRight: 0,
						boxSizing: "border-box",
						background: "#fff",
					}}
				>
					<ol className="minicart-items list-none m-0 p-0">
						{cartProducts.length === 0 ? (
							<li className="p-4 text-center text-gray-400">
								Votre panier est vide.
							</li>
						) : (
							cartProducts.map((prod) => (
								<li
									key={prod.id}
									className="item product product-item flex gap-3 py-4 border-b last:border-b-0"
									data-role="product-item"
								>
									<div className="product flex-shrink-0">
										<a
											href={prod.url}
											tabIndex={-1}
											className="product-item-photo block"
											title={prod.name}
										>
											<span className="product-image-container block w-[75px]">
												<span className="product-image-wrapper block relative pb-[100%]">
													<img
														className="product-image-photo absolute top-0 left-0 w-full h-full object-contain"
														src={prod.image}
														alt={prod.name}
													/>
												</span>
											</span>
										</a>
									</div>
									<div className="product-item-details flex-1 flex flex-col justify-between">
										<div>
											<strong className="product-item-name block font-bold text-gray-900 text-sm">
												<a
													href={prod.url}
													className="hover:underline"
													title={prod.name}
												>
													{prod.name}
												</a>
											</strong>
										</div>
										<div className="product-item-pricing mt-2 flex items-center gap-2 text-xs text-gray-700">
											<span>Qté</span>
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
											/>
											{showUpdate[prod.id] && (
												<Button
													size="sm"
													className="ml-2 px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white"
													onClick={() => handleUpdate(prod.id)}
													type="button"
												>
													Mise à jour
												</Button>
											)}
											<span className="ml-2 text-gray-500">|</span>
											<span className="ml-2">
												Prix unitaire:{" "}
												<span className="font-semibold">
													{prod.unit_price.toFixed(2)} DH
												</span>
											</span>
										</div>
										<div className="product actions flex items-center gap-2 mt-2">
											<button
												className="action delete text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
												onClick={() => handleRemove(prod.id)}
												title="Supprimer"
											>
												<Trash2 className="h-4 w-4" />
												Supprimer
											</button>
										</div>
									</div>
								</li>
							))
						)}
					</ol>
				</div>
			</PopoverContent>
		</Popover>
	);
}
