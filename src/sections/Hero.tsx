import { useState } from "react";
import { ScatteredSpheres } from "../svg/ScatteredSpheres";
import { Title } from "../components/Title";
import { Details } from "../components/Details";
import { Section } from "../components/Section";
import { GradientText } from "../components/GradientText";
import { Button } from "../components/Button";
import { ProfileForm } from "../sections/ProfileForm";
import { ChatInterface } from "../sections/ChatInterface";
import { useRouter } from "next/router";
import { FormData as ProfileFormData } from "../types";

// Built with Vivid (https://vivid.lol) ✨

const Background = () => (
  <div
    className="absolute inset-0 translate-y-32 pointer-events-none dark:invert dark:brightness-90"
    aria-hidden="true"
  >
    <ScatteredSpheres />
  </div>
);

export const Hero = () => {
  const [showForm, setShowForm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData | null>(null);

  // // Handle form completion and transition to chat
  // const handleFormSubmit = (data: FormData) => {
  //   console.log('Hero received form data:', data);
  //   setFormData(data);
  //   setShowForm(false);
  //   setShowChat(true);
  //   console.log('Transitioning to chat interface');
  // };
  const router = useRouter();
  const handleFormSubmit = (data: ProfileFormData) => {
    console.log("Hero received form data:", data);

    // 1️⃣ Save form data to localStorage
    try {
      localStorage.setItem("formData", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving form data:", error);
    }

    // 2️⃣ Navigate to chat interface page
    router.push("/chat_interface");
  };

  // Handle back navigation from chat
  const handleBackFromChat = () => {
    setShowChat(false);
    setShowForm(false);
    setFormData(null);
  };

  // Handle back navigation from form
  const handleBackFromForm = () => {
    setShowForm(false);
  };

  // Show chat interface after form completion
  if (showChat) {
    return (
      <Section className="items-center justify-center min-h-screen py-12">
        <ChatInterface 
          profileData={formData} 
          onBack={handleBackFromChat}
        />
      </Section>
    );
  }

  // Show profile form
  if (showForm) {
    return (
      <Section className="items-center justify-center min-h-screen py-12">
        <div className="max-w-lg mx-auto">
  
          <ProfileForm onSubmit={handleFormSubmit} />
        </div>
      </Section>
    );
  }

  // Show landing page
  return (
    <Section
      gradients
      className="items-center justify-center min-h-screen h-fit gap-12 col"
    >
      <Background />
      <div className="z-10 gap-6 text-center col max-w-3xl mx-auto px-4">
        <Title size="lg">
          <GradientText className="pink-blue">Clear insurance advice in just 5 minutes</GradientText>
        </Title>
        
        <div className="p-4 bg-white/20 backdrop-blur rounded-xl text-justify">
          <h2 className="text-lg font-bold mb-3 text-strong text-left">Five minutes is all it takes</h2>
          
          <Details className="mb-3 text-sm">
            We give you clear, objective, and transparent insurance recommendations. We are not affiliated with any insurer, and are not paid by any insurance company.
          </Details>
          
          <Details className="mb-3 text-sm">
            We handle everything with smart, pressure-free advice focused on what is best for your needs (DPI).
          </Details>
          
          <p className="font-semibold mb-1 text-strong text-lg">Whether you:</p>
          <ul className="list-disc list-inside mb-3 space-y-0.5 text-lg">
            <li>Are starting from zero and do not know what &quot;term&quot; or &quot;whole life&quot; means</li>
            <li>Want help fine-tuning your coverage</li>
          </ul>
          
          <Details className="text-sm">
            We guide you from your first click to your perfect policy match.
          </Details>
        </div>

        <Button 
          className="px-12 py-6 text-2xl font-bold mx-auto"
          onClick={() => setShowForm(true)}
          data-aos="zoom-y-out"
          data-aos-delay="300"
        >
          Get Me Covered
        </Button>
      </div>
    </Section>
  );
};
