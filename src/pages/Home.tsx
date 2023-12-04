import { Link } from "react-router-dom";

const Home = () => {
    return (
            <div className="relative isolate px-6 pt-14 lg:px-8 w-full">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Draw & Visualize
                        </h1>
                        <p className="mt-6 text-md leading-8 text-gray-600">
                            Express your creativity on a digital canvas. Draw,
                            add shapes, and incorporate text seamlessly. Elevate
                            your artistry with dynamic charts – from lines to
                            pies. Collaborate in real-time and transform your
                            ideas into interactive masterpieces. Unleash your
                            dual talents!
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/playground"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get started <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Home;
