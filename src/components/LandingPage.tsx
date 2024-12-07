import { type JSX } from "react";
import landingPageImage from "../assets/link_shortener.svg";

import { MdAccountCircle } from "react-icons/md";
import { MdContentCut } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";

type IconCardProps = {
	icon: JSX.Element;
	text: string;
};

const IconCard = ({ icon, text }: IconCardProps) => {
	return (
		<div className="flex p-2 gap-2 border-2 rounded-xl border-slate-400">
			<div className="text-6xl mt-1">{icon}</div>
			<div className="font-light text-xl mt-1">{text}</div>
		</div>
	);
};

const LandingPage = () => {
	return (
		<div className="static h-screen w-full mx-auto min-w-[100rem] max-w-[100rem] animate__animated animate__fadeIn animate__delay-1s">
			<div className="flex flex-col h-[60%] mx-[8rem] pt-[5rem] gap-3">
				<div className="flex flex-wrap h-full mt-[10rem]">
					<div className="flex h-[90%] w-3/5 items-center justify-center">
						<div className="flex flex-col gap-5">
							<p className="flex font-bold text-4xl">
								Shortly helps you turn lengthy URLs into clean, branded links -
								perfect for sharing anywhere.
							</p>
							<p className="flex font-light text-xl">
								Just paste, shorten, and share - it’s that easy!
							</p>
							{/* <div className="flex flex-col gap-2 mt-10">
                <p className="text-2xl font-bold">Features</p>
                <ul className="gap-1 text-lg">
                  <li className="flex gap-2">
                    <span className="pt-1">
                      <MdAccountCircle />
                    </span>
                    <p className="font-light">Create your own account</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="pt-1">
                      <MdContentCut />
                    </span>
                    <p className="font-light">Shorten long urls</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="pt-1">
                      <MdAnalytics />
                    </span>
                    <p className="font-light">Check usage analytics</p>
                  </li>
                </ul>
              </div> */}
						</div>
					</div>
					<div className="flex h-[90%] w-2/5 items-center justify-center">
						<div className="flex">
							<img className="object-contain" src={landingPageImage} />
						</div>
					</div>
					<div className="flex h-[40%] w-full mt-[2rem] gap-20 items-center justify-start">
						<IconCard
							icon={<MdAccountCircle />}
							text={"Secure your data and access your link history anytime"}
						/>
						<IconCard
							icon={<MdContentCut />}
							text={
								"Instantly shorten any link for easy sharing and a cleaner look"
							}
						/>
						<IconCard
							icon={<MdAnalytics />}
							text={"Insightful data to help optimize your link performance"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
