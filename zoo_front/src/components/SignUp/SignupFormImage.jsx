import React from "react";
import chienImage from "/images/chien_2.jpg";

function SignupFormImage() {
  return (
    <div className="relative hidden w-full lg:block lg:w-1/2">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10" />
      <img
        src={chienImage}
        alt="Animaux de compagnie"
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
        <h1 className="text-4xl font-bold mb-2">PetConnect</h1>
        <p className="text-xl opacity-90">
          Connectez-vous avec des propriétaires d'animaux, des refuges et des
          éleveurs
        </p>
      </div>
    </div>
  );
}

export default SignupFormImage;
