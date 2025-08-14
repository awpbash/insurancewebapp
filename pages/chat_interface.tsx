// pages/Chat.tsx
import { ChatInterface } from "../src/sections/ChatInterface";
import { Footer } from "../src/sections/Footer";
import { Header } from "../src/sections/Header";

// This is a placeholder function to satisfy the onBack prop requirement.
const handleBack = () => {
    console.log("Back button clicked!");
    // You would add navigation logic here, e.g., router.push('/')
};

export default function Chat({
    isDarkMode,
    toggleDarkMode,
}: {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}) {
    return (
        <div className="overflow-hidden col text-strong">
            <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <main>
                {/* Pass the handleBack function to the onBack prop */}
                <ChatInterface onBack={handleBack} />
            </main>
            <Footer />
        </div>
    );
};