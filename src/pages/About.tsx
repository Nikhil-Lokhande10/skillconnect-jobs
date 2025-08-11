import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Users, Shield, Award, Heart, Globe, HandCoins, Building2, Handshake } from "lucide-react";

const UN_GOALS = [
	{
		icon: <HandCoins className="h-8 w-8" />,
		title: "No Poverty",
		desc: "SkillConnect empowers skilled workers to earn fair wages, helping lift families out of poverty.",
		img: "https://sdgs.un.org/sites/default/files/goals/E_SDG-goals_icons-individual-rgb-01.png",
	},
	{
		icon: <Building2 className="h-8 w-8" />,
		title: "Zero Hunger",
		desc: "By providing decent work, we help communities afford nutritious food and basic needs.",
		img: "https://sdgs.un.org/sites/default/files/goals/E_SDG-goals_icons-individual-rgb-02.png",
	},
	{
		icon: <Handshake className="h-8 w-8" />,
		title: "Reduced Inequalities",
		desc: "We connect opportunities to all, regardless of background, promoting equality and inclusion.",
		img: "https://sdgs.un.org/sites/default/files/goals/E_SDG-goals_icons-individual-rgb-10.png",
	},
	{
		icon: <Award className="h-8 w-8" />,
		title: "Decent Work & Economic Growth",
		desc: "SkillConnect creates dignified jobs and supports local economic growth.",
		img: "https://sdgs.un.org/sites/default/files/goals/E_SDG-goals_icons-individual-rgb-08.png",
	},
	{
		icon: <Globe className="h-8 w-8" />,
		title: "Sustainable Communities",
		desc: "We foster resilient, sustainable communities by connecting people and services locally.",
		img: "https://sdgs.un.org/sites/default/files/goals/E_SDG-goals_icons-individual-rgb-11.png",
	},
];

const About = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
			<Navbar />

			{/* Hero Section */}
			<section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto text-center">
					<img
						src="https://sdgs.un.org/sites/default/files/2023-02/SDG%20Wheel_Transparent_WEB.png"
						alt="UN SDG Wheel"
						className="mx-auto mb-6 w-32 h-32"
					/>
					<h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
						About SkillConnect
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
						SkillConnect is proud to support the United Nations 17 Sustainable
						Development Goals. Our platform tackles poverty, hunger, inequality,
						decent work, and sustainable communities—building a better future for
						all.
					</p>
				</div>
			</section>

			{/* UN SDG Focus Section */}
			<section className="px-4 sm:px-6 lg:px-8 pb-16">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl font-bold text-center text-foreground mb-12">
						How We Support the UN Sustainable Development Goals
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{UN_GOALS.map((goal) => (
							<div
								key={goal.title}
								className="bg-white rounded-2xl p-6 shadow-lg border text-center flex flex-col items-center"
							>
								<img
									src={goal.img}
									alt={goal.title}
									className="w-16 h-16 mb-4"
								/>
								<div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
									{goal.icon}
								</div>
								<h3 className="text-xl font-semibold text-foreground mb-2">
									{goal.title}
								</h3>
								<p className="text-muted-foreground">{goal.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Story Section */}
			<section className="px-4 sm:px-6 lg:px-8 pb-16">
				<div className="max-w-4xl mx-auto">
					<div className="bg-white rounded-2xl p-8 shadow-lg border mb-16">
						<h2 className="text-3xl font-bold text-foreground mb-6">
							Our Story
						</h2>
						<p className="text-lg text-muted-foreground mb-4">
							SkillConnect was born from a vision to make decent work and
							opportunity accessible to all. By connecting skilled professionals
							with those who need their expertise, we help communities thrive and
							support the UN’s mission for a better world.
						</p>
						<p className="text-lg text-muted-foreground mb-4">
							Our platform is designed to break barriers—whether economic, social,
							or geographic—so everyone can participate in sustainable growth and
							prosperity.
						</p>
						<p className="text-lg text-muted-foreground">
							Today, we’re proud to serve thousands of skilled workers and
							customers, facilitating meaningful connections that drive progress on
							the Sustainable Development Goals.
						</p>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="px-4 sm:px-6 lg:px-8 pb-16">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl font-bold text-center text-foreground mb-12">
						Our Values
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<Users className="h-8 w-8" />
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-2">
								Community First
							</h3>
							<p className="text-muted-foreground">
								We build strong, sustainable communities by connecting neighbors and
								supporting local businesses.
							</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<Shield className="h-8 w-8" />
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-2">
								Trust & Safety
							</h3>
							<p className="text-muted-foreground">
								Every professional is verified, ensuring peace of mind for all our
								users.
							</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<Award className="h-8 w-8" />
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-2">
								Excellence
							</h3>
							<p className="text-muted-foreground">
								We help skilled professionals deliver exceptional work and grow
								their careers.
							</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<Heart className="h-8 w-8" />
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-2">
								Fairness
							</h3>
							<p className="text-muted-foreground">
								Fair pricing, fair opportunities, and fair treatment for everyone in
								our community.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="px-4 sm:px-6 lg:px-8 pb-16">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-bold text-foreground mb-12">
						Join Our Mission
					</h2>
					<div className="bg-white rounded-2xl p-8 shadow-lg border">
						<p className="text-lg text-muted-foreground mb-6">
							Whether you’re a skilled professional looking to grow your business or
							someone who needs reliable services, join SkillConnect and help us
							advance the UN Sustainable Development Goals in your community.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								onClick={() => (window.location.href = "/register?tab=worker")}
							>
								Join as Professional
							</Button>
							<Button
								variant="outline"
								size="lg"
								onClick={() => (window.location.href = "/register?tab=customer")}
							>
								Find Services
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default About;