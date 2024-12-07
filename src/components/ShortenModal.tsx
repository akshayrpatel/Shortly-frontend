import React, { useState } from "react";
import { AXIOS, PATHS } from "../api";
import { useAuth } from "../context";
import { MdContentCopy, MdOutlineCreate } from "react-icons/md";

interface ShortenModalProps {
	isOpen: boolean;
	onClose: () => void;
	handleShortUrlClick: (shortUrl: string) => void;
}

const ShortenModal: React.FC<ShortenModalProps> = ({
	isOpen,
	onClose,
	handleShortUrlClick,
}) => {
	const [originalUrl, setOriginalUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [copied, setCopied] = useState(false);
	const { token } = useAuth();

	const generateShortUrl = async () => {
		if (!originalUrl.trim()) return;
		setLoading(true);
		try {
			const response = await AXIOS.post(
				PATHS.BACKEND.SHORTEN,
				{ originalUrl }, // This is the request body
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: "Bearer " + token,
					},
					withCredentials: true, // Optional depending on cookie-based auth
				}
			);
			setShortUrl(response.data.shortUrl);
		} catch (error) {
			console.error("Error generating short URL:", error);
			alert("Failed to generate short URL. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleCopy = async () => {
		if (!shortUrl) return;
		const formedShortUrl =
			PATHS.BACKEND.SERVER + PATHS.BACKEND.REDIRECT + "/" + shortUrl;
		await navigator.clipboard.writeText(formedShortUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleResetModal = () => {
		setShortUrl("");
		setOriginalUrl("");
		setCopied(false);
	};

	const handleCancelClick = () => {
		handleResetModal();
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50 animate__animated animate__fadeIn">
			<div className="p-6 w-[50%] rounded-lg border-1 border-slate-400 shadow-xl bg-white text-slate-600">
				<h2 className="mb-2 block uppercase tracking-wide font-bold text-slate-500 text-md">
					Shorten a URL
				</h2>
				<input
					type="text"
					value={originalUrl}
					onChange={(e) => setOriginalUrl(e.target.value)}
					placeholder="Enter long URL"
					disabled={originalUrl !== "" && shortUrl !== ""}
					className="w-full p-2 border border-slate-300 rounded mb-4 disabled:opacity-45 focus:outline-none focus:ring-1 focus:ring-slate-400"
				/>
				{shortUrl ? (
					<div className="space-y-3">
						<div className="flex items-baseline justify-between">
							<div className="flex w-1/2 items-baseline">
								<p className="text-sm block uppercase tracking-wide font-medium text-zinc-500">
									Your short URL:{" "}
								</p>
								<p
									onClick={() => handleShortUrlClick(shortUrl)}
									className="mx-1 underline text-md text-sky-600 hover:text-sky-500 cursor-pointer"
								>
									{shortUrl}
								</p>
							</div>
							<div className="flex w-1/2 justify-end gap-3">
								<button
									onClick={handleCancelClick}
									className="px-4 py-2 rounded-full text-slate-500 hover:text-slate-700 cursor-pointer"
								>
									Cancel
								</button>
								<button
									onClick={handleCopy}
									className="flex items-stretch justify-center gap-1 py-2 px-4 rounded-full bg-slate-600 text-white hover:bg-slate-500 cursor-pointer transition"
								>
									<MdContentCopy className="mt-1" />
									{copied ? "Copied!" : "Copy"}
								</button>
								<button
									onClick={handleResetModal}
									className="flex items-stretch justify-center gap-1 py-2 px-4 rounded-full bg-slate-600 text-white hover:bg-slate-500 cursor-pointer transition"
								>
									<MdOutlineCreate className="mt-1" />
									New
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className="flex justify-end space-x-2">
						<button
							onClick={handleCancelClick}
							className="px-4 py-2 rounded-full text-slate-500 hover:text-slate-700 cursor-pointer"
						>
							Cancel
						</button>
						<button
							onClick={generateShortUrl}
							disabled={loading}
							className="flex items-stretch justify-center gap-1 py-2 px-4 rounded-full bg-slate-600 text-white hover:bg-slate-500 cursor-pointer"
						>
							<MdOutlineCreate className="mt-1" />
							{loading ? "Generating..." : "Generate"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ShortenModal;
