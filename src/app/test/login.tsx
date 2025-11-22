import Image from "next/image";
import {STORAGE_HOST} from "@/data/baseUrl";
import {Airplay} from "lucide-react";

export default function LoginPage() {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-[32rem]">
                <div className="w-full flex flex-col items-center space-y-4 mb-4">
                    <Image
                        src={`${STORAGE_HOST}/docs/Avatar.webp`}
                        alt="Avatar"
                        width={50}
                        height={50}
                    />
                </div>
                <div className="bg-card rounded-lg py-10 px-6">
                    <form className="flex flex-col space-y-4 p-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full p-2 bg-background rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 bg-background rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button
                            type="submit"
                            className="w-full p-2 bg-primary rounded text-primary-foreground border border-primary hover:bg-primary/90 transition"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="flex items-center my-4 mx-4">
                        <div className="flex-grow border-t border-border"></div>
                        <span className="text-muted-foreground">OR</span>
                        <div className="flex-grow border-t border-border"></div>
                    </div>

                {/*    Google Login*/}
                    <div className="flex space-y-4 flex-col">
                        <LoginButton provider="Google" onClick={() => {
                            alert('Google Login Clicked');
                        }}/>
                        <LoginButton provider="Google" onClick={() => {
                            alert('Google Login Clicked');
                        }}/>
                        <LoginButton provider="Google" onClick={() => {
                            alert('Google Login Clicked');
                        }}/>

                        <div className="text-[14px] text-muted-foreground text-center mt-4">
                            Don't have an account? <a href="#" className="text-blue-500/90 hover:underline">Sign up</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function LoginButton({provider, onClick}: { provider: string, onClick: () => void }) {
    return (
        <div className="px-4 flex justify-center items-center">
            <button
                onClick={onClick}
                className="w-full p-2 bg-background rounded text-foreground border border-border hover:border-primary transition flex items-center justify-center space-x-2"
            >
                <Airplay size={18} />
                <span>Sign in with {provider}</span>
            </button>
        </div>
    )
}