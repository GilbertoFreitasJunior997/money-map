import {
  FadeIn,
  FadeInStaggered,
  Pulse,
  ScaleOnHover,
  SlideIn,
  StaggerChildren,
} from "@/components/animations";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Icon } from "@/components/icon";
import { Logo } from "@/components/logo";
import { getSession } from "@/lib/session";
import { ArrowRight, MapPin, PieChart, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const token = await getSession();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b justify-between">
        <Logo />

        <nav className="flex gap-4 sm:gap-6">
          {token ? (
            <Link href="/dashboard">
              <Button className="space-x-2">
                <p>Go to Dashboard</p>
                <Icon src={ArrowRight} />
              </Button>
            </Link>
          ) : (
            <div className="flex text-sm items-center gap-2">
              <SlideIn direction="left">
                <Link href="sign-in">
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    Sign In
                  </Button>
                </Link>
              </SlideIn>
              <SlideIn direction="right">
                <Link href="sign-up">
                  <Button size="sm">Sign up</Button>
                </Link>
              </SlideIn>
            </div>
          )}
        </nav>
      </header>
      <main className="flex-1 bg-gradient-to-b from-background to-accent">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <FadeIn>
            <div className="px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-indigo-600 dark:from-green-400 dark:via-emerald-400 dark:to-indigo-400 animate-in fade-in">
                    Revolutionize Your Financial Journey
                  </h1>
                  <p className="mx-auto max-w-[700px] text-xl md:text-2xl text-gray-700 dark:text-gray-300">
                    Your personal financial GPS for navigating wealth and
                    success.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <ScaleOnHover>
                    <Link href="sign-up">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </ScaleOnHover>
                  <ScaleOnHover>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Learn More
                    </Button>
                  </ScaleOnHover>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <FadeIn>
            <div className="px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text">
                Innovative Features
              </h2>
              <StaggerChildren>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: MapPin,
                      title: "Financial Mapping",
                      desc: "Visualize your financial landscape with precision.",
                    },
                    {
                      icon: PieChart,
                      title: "Budget Allocation",
                      desc: "Optimize your spending with intelligent categorization.",
                    },
                    {
                      icon: TrendingUp,
                      title: "Investment Tracking",
                      desc: "Monitor and analyze your investment portfolio growth.",
                    },
                    {
                      icon: Shield,
                      title: "Secure Transactions",
                      desc: "Bank-grade security for all your financial operations.",
                    },
                  ].map((feature, index) => (
                    <FadeInStaggered key={index}>
                      <ScaleOnHover>
                        <Card.Root className="transition-shadow duration-300 h-full hover:shadow-lg">
                          <div className="flex flex-col items-center space-y-2 p-6 h-full">
                            <Pulse>
                              <Icon
                                src={feature.icon}
                                className="h-12 w-12 text-green-600 dark:text-green-400"
                              />
                            </Pulse>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                              {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                              {feature.desc}
                            </p>
                          </div>
                        </Card.Root>
                      </ScaleOnHover>
                    </FadeInStaggered>
                  ))}
                </div>
              </StaggerChildren>
            </div>
          </FadeIn>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <FadeIn>
            <div className="px-4 md:px-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Elevate Your Financial Strategy Today
                  </h2>
                  <p className="mx-auto max-w-[600px] text-xl md:text-2xl ">
                    Join thousands of users optimizing their finances with Money
                    Map.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <ScaleOnHover>
                    <Link href="/sign-up">
                      <Button
                        size="lg"
                        className="w-full"
                      >
                        Create account for free
                      </Button>
                    </Link>
                  </ScaleOnHover>
                  <p className="text-xs">
                    By signing up, you agree to our{" "}
                    <Link
                      className="underline underline-offset-2"
                      href="#"
                    >
                      Terms & Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
      <footer className="py-6 w-full shrink-0 px-4 md:px-6 border-t">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            © 2024 Money Map. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              href="#"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
