import dashboard from "../assets/dashboard.svg";
import { useState, useEffect } from "react";
import { AXIOS, PATHS } from "../api";
import { useAuth } from "../context";
import { useNavigate } from "react-router-dom";
import { ShortenModal } from ".";
import { MdOutlineCreate } from "react-icons/md";

type UrlItem = {
	originalUrl: string;
	shortUrl: string;
	createdDate: string;
	clickCount: number;
};

const DashboardPage = () => {
	const navigate = useNavigate();
	const { token, username, loading } = useAuth();
	const [urls, setUrls] = useState<UrlItem[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const onCreateNew = () => {
		setModalOpen(true);
	};

	const fetchUrls = async () => {
		try {
			const { data: response } = await AXIOS.get(PATHS.BACKEND.MYURLS, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + token,
				},
				withCredentials: true,
			});
			setUrls(response);
		} catch (err) {
			setError("Failed to load URLs. Please try again later.");
			console.log(error);
			throw err;
		}
	};

	useEffect(() => {
		if (loading) {
			// Do nothing yet – still loading auth state
			return;
		}
		if (token === null || token === undefined) {
			navigate(PATHS.FRONTEND.HOME);
		} else {
			fetchUrls();
		}
	}, [token, modalOpen, navigate]);

	// Sort URLs by click count descending
	const sortedUrls = [...urls].sort((a, b) => b.clickCount - a.clickCount);

	const handleShortUrlClick = async (data: string) => {
		try {
			window.open(
				PATHS.BACKEND.SERVER + PATHS.BACKEND.REDIRECT + "/" + data,
				"_blank"
			);
		} catch (error) {
			console.log(error);
		} finally {
			// Wait a short time and then refresh table
			setTimeout(() => {
				fetchUrls(); // Refresh the data to reflect increased click count
			}, 1500);
		}
	};

	return (
		<>
			<div className="flex h-screen mx-[8rem] min-w-[100rem] max-w-[100rem] animate__animated animate__fadeIn animate__delay-1s">
				{/* Left Column - Content */}
				<div className="flex flex-col w-[50%] mx-[8rem] mt-[10rem] gap-8 items-start">
					<div className="flex w-full justify-between">
						<div className="font-bold text-3xl text-slate-700">
							Hello, <span className="text-sky-500">{username}</span>
						</div>

						<button
							onClick={onCreateNew}
							className="rounded-full px-6 py-2 bg-slate-600 text-white hover:bg-slate-400 hover:text-black"
						>
							<span className="flex gap-2">
								<MdOutlineCreate className="text-2xl" />
								<p>Create New</p>
							</span>
						</button>
					</div>

					<div className="w-full border border-slate-300 " />

					<div className="w-full max-w-4xl">
						<h2 className="text-xl font-semibold text-slate-800 mb-4">
							Your URLs
						</h2>

						{sortedUrls.length === 0 ? (
							<p className="text-gray-500">No links created yet.</p>
						) : (
							<div className="overflow-auto rounded shadow-md">
								<table className="min-w-full text-sm text-left text-gray-700">
									<thead className="bg-gray-200 text-xs uppercase font-medium text-gray-600">
										<tr>
											<th className="px-4 py-3">Short URL</th>
											<th className="px-4 py-3">Original URL</th>
											<th className="px-4 py-3">Created At</th>
											<th className="px-4 py-3 text-right">Clicks</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-100">
										{sortedUrls.map((url, i) => (
											<tr key={i} className="hover:bg-gray-100">
												<td
													className="px-4 py-2 cursor-pointer truncate max-w-[150px] text-sky-600 hover:text-sky-500"
													onClick={() => handleShortUrlClick(url.shortUrl)}
												>
													{url.shortUrl}
												</td>
												<td className="px-4 py-2 truncate max-w-[250px] pointer-events-none select-none">
													{url.originalUrl}
												</td>
												<td className="px-4 py-2">
													{new Date(url.createdDate).toLocaleDateString()}
												</td>
												<td className="px-4 py-2 text-right">
													{url.clickCount}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>

				{/* Right Column - Placeholder Image */}
				<div className="flex w-[50%] items-start justify-center">
					<div className="flex h-[70%]">
						<img
							className="object-contain"
							src={dashboard}
							alt="dashboard visual"
						/>
					</div>
				</div>

				<ShortenModal
					isOpen={modalOpen}
					onClose={() => setModalOpen(false)}
					handleShortUrlClick={handleShortUrlClick}
				/>
			</div>
		</>
	);
};

export default DashboardPage;
