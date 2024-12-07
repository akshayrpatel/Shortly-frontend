import { FaPaperclip } from "react-icons/fa6";
import { MdLogin, MdLogout } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuUserPen } from "react-icons/lu";

import { Link } from "react-router-dom";
import { useAuth } from "../context";
import { PATHS } from "../api";

const UserOptions = () => {
	const { token, username, logout } = useAuth();

	if (token === null || token === undefined) {
		return (
			<>
				<div className="flex">
					<Link
						className="pointer-events-auto rounded-full px-5 py-2 bg-slate-400 text-white hover:bg-slate-200 hover:text-black"
						to={PATHS.FRONTEND.LOGIN}
					>
						<div className="flex gap-2">
							<MdLogin className="text-2xl" />
							<p>Login</p>
						</div>
					</Link>
				</div>
				<div className="flex">
					<Link
						className="pointer-events-auto rounded-full px-5 py-2 bg-slate-400 text-white hover:bg-slate-200 hover:text-black"
						to={PATHS.FRONTEND.REGISTER}
					>
						<div className="flex gap-2">
							<LuUserPen className="text-2xl" />
							<p>Sign Up</p>
						</div>
					</Link>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="flex">
					<div className="px-5 py-2 font-bold text-white">
						<p className="text-sky-500">{username}</p>
					</div>
				</div>
				<div className="flex">
					<Link
						className="pointer-events-auto rounded-full px-5 py-2 bg-slate-400 text-white hover:bg-slate-200 hover:text-black"
						to={PATHS.FRONTEND.DASHBOARD}
					>
						<div className="flex gap-2">
							<MdOutlineSpaceDashboard className="text-2xl" />
							<p>Dashboard</p>
						</div>
					</Link>
				</div>
				<div className="flex">
					<div className="cursor-pointer rounded-full px-5 py-2 bg-slate-400 text-white hover:bg-slate-200 hover:text-black">
						<div className="flex gap-2" onClick={logout}>
							<MdLogout className="text-2xl" />
							<p>Logout</p>
						</div>
					</div>
				</div>
			</>
		);
	}
};

const Navbar = () => {
	return (
		<div className="fixed top-0 flex h-[5rem] w-full px-[8rem] min-w-[100rem] z-100 items-center justify-center bg-slate-600 text-white animate__animated animate__fadeIn animate__delay-1s">
			<div className="flex w-1/2 gap-3 justify-start">
				<div className="flex text-3xl gap-2">
					<Link to={PATHS.FRONTEND.HOME} className="pt-1">
						<FaPaperclip />
					</Link>
					<Link to={PATHS.FRONTEND.HOME}>
						<div className="flex text-3xl">Shortly</div>
					</Link>
				</div>
			</div>
			<div className="flex w-1/2 gap-3 justify-end">
				<UserOptions />
			</div>
		</div>
	);
};

export default Navbar;
