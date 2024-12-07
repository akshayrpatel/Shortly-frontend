import loginImage from "../assets/login.svg";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AXIOS, PATHS } from "../api";
import { useAuth } from "../context";
import Navbar from "./Navbar";
import { useEffect } from "react";

type Inputs = {
	username: string;
	password: string;
};

const LoginPage = () => {
	const { token, loading, login } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		reset();
		try {
			const { data: response } = await AXIOS.post(PATHS.BACKEND.LOGIN, data);
			login(response.token, response.username);
			toast.success("Successfully logged in!");
		} catch (error) {
			console.log(error);
			toast.error("Failed to login!");
		}
	};

	useEffect(() => {
		if (token && !loading) {
			navigate(PATHS.FRONTEND.DASHBOARD, { replace: true });
		}
	}, [token, loading, navigate]);

	return (
		<>
			<Navbar />
			<div className="flex h-screen mx-[8rem] min-w-[100rem] max-w-[100rem] animate__animated animate__fadeIn animate__delay-1s">
				<div className="flex flex-col w-[50%] mx-[8rem] mt-[15rem] gap-10 justify-items-start items-start">
					<div className="font-bold text-3xl">Login</div>
					<form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-wrap -mx-3 mb-6">
							<div className="w-full px-3">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
									Username
								</label>
								<input
									className="appearance-none block w-full py-3 px-4 mb-3 border border-gray-200 rounded leading-tight bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
									placeholder="janedoe"
									{...register("username", {
										required: "This is a required field",
									})}
								/>
								{errors.username && (
									<p className="text-red-600 text-xs italic">
										This is a required field!
									</p>
								)}
							</div>
						</div>
						<div className="flex flex-wrap -mx-3 mb-6">
							<div className="w-full px-3">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
									Password
								</label>
								<input
									className="appearance-none block w-full py-3 px-4 mb-3  border border-gray-200 rounded leading-tight bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
									type="password"
									placeholder="******************"
									{...register("password", { required: true })}
								/>
								{errors.password && (
									<p className="text-red-600 text-xs italic">
										This is a required field!
									</p>
								)}
							</div>
						</div>
						<div className="flex gap-10 justify-between">
							<div className="flex">
								<input
									className="rounded-full px-5 py-2 bg-slate-600 text-white hover:bg-gray-400 hover:text-black"
									type="submit"
								/>
							</div>
							<div className="flex pt-2 text-right">
								<p className="text-slate-600 hover:text-slate-300">
									<Link to={PATHS.FRONTEND.REGISTER}>
										Sign up if you don't have an account!
									</Link>
								</p>
							</div>
						</div>
					</form>
				</div>
				<div className="flex w-[50%] items-start justify-center">
					<div className="flex h-[80%]">
						<img className="object-contain" src={loginImage} />
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
