import registerImage from "../assets/register.svg";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AXIOS, PATHS } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import { useAuth } from "../context";

type Inputs = {
	email: string;
	username: string;
	password: string;
};

const RegisterPage = () => {
	const navigate = useNavigate();
	const { token } = useAuth();
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
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		reset();
		try {
			await AXIOS.post(PATHS.BACKEND.REGISTER, data);
			reset();
			navigate(PATHS.FRONTEND.LOGIN);
			toast.success("Successfully registered!");
		} catch (error) {
			console.log(error);
			toast.error("Failed to register!");
		}
	};

	if (token == null || undefined) {
		return (
			<>
				<Navbar />
				<div className="flex h-screen mx-[8rem] min-w-[100rem] max-w-[100rem] animate__animated animate__fadeIn animate__delay-1s">
					<div className="flex flex-col w-[50%] mx-[8rem] mt-[15rem] gap-10 justify-items-start items-start">
						<div className="font-bold text-3xl">Register</div>
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
										Email
									</label>
									<input
										className="appearance-none block w-full py-3 px-4 mb-3 border border-gray-200 rounded leading-tight bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500"
										type="text"
										placeholder="janedoe@gmail.com"
										{...register("email", {
											required: true,
											pattern: emailPattern,
										})}
									/>
									{errors.email?.type === "required" && (
										<p className="text-red-600 text-xs italic">
											This is a required field!
										</p>
									)}
									{errors.email?.type === "pattern" && (
										<p className="text-red-600 text-xs italic">
											Please enter a valid email!
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
							<div className="flex flex-wrap -mx-3 mb-2">
								<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
									<input
										className="rounded-full px-5 py-2 bg-slate-600 text-white hover:bg-slate-400 hover:text-black"
										type="submit"
									/>
								</div>
							</div>
						</form>
					</div>
					<div className="flex w-[50%] items-start justify-center">
						<div className="flex h-[70%] pt-[10rem]">
							<img className="object-contain" src={registerImage} />
						</div>
					</div>
				</div>
			</>
		);
	} else {
		navigate(PATHS.FRONTEND.DASHBOARD);
	}
};

export default RegisterPage;
