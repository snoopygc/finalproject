"use client"

import React, { useState } from "react";
import { CalendarIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

const FoodCalculator = () => {
    const [isCatSelected, setIsCatSelected] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        breed: "",
        dob: "",
        weight: "",
        activityLevel: "1",
        desexed: "yes",
        bodyCondition: "1",
        foodCalories: ""
    });
    const [solution, setSolution] = useState(null);

    const handleCatClick = () => {
        setIsCatSelected(true);
        setFormVisible(false);
        setErrorMessage("Sorry, we don't support cats yet!");
    };

    const handleDogClick = () => {
        setIsCatSelected(false);
        setFormVisible(true);
        setErrorMessage("");
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleGenderSelect = (gender) => {
        setFormData(prev => ({
            ...prev,
            gender
        }));
    };

    const calculateAge = (dob) => {
        const dobDate = new Date(dob);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - dobDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = (diffDays % 365) % 30;
        return { years, months, days };
    };

    const handleCalculate = () => {
        const {
            name,
            gender,
            breed,
            dob,
            weight: weightStr,
            bodyCondition: bodyConditionStr,
            activityLevel,
            desexed,
            foodCalories: foodCaloriesStr
        } = formData;

        const weight = parseFloat(weightStr);
        const bodyCondition = parseFloat(bodyConditionStr);
        const foodCalories = parseFloat(foodCaloriesStr);

        if (!name || !dob || isNaN(weight) || isNaN(bodyCondition) || isNaN(foodCalories)) {
            alert("Please ensure all fields are filled out correctly.");
            return;
        }

        // Calculate age
        const age = calculateAge(dob);

        // Calculate Ideal Weight
        const conditionAdjustment = (bodyCondition - 5) * 10;
        const idealWeight = weight * (100 - conditionAdjustment) / 100;

        // Calculate % Over/Under Weight
        const percentOver = ((weight / idealWeight) * 100) - 100;

        // Calculate RER (Resting Energy Requirement)
        const rer = 70 * Math.pow(weight, 0.75);

        // Determine activity factor
        let factor;
        switch (activityLevel) {
            case "0": factor = 1.2; break; // Less active
            case "1": factor = 1.6; break; // Average activity
            case "2": factor = 2.0; break; // More active
            case "3": factor = 2.5; break; // Highly active
            default: factor = 1.6; break;
        }

        // Calculate final caloric needs
        const caloricNeeds = rer * factor;

        // Calculate daily food amount
        const foodPerGramCal = foodCalories / 100;
        const dailyFoodAmount = caloricNeeds / foodPerGramCal;

        setSolution({
            name,
            dob,
            age,
            gender,
            breed,
            weight,
            bodyCondition,
            activityLevel,
            desexed,
            foodCalories,
            idealWeight,
            percentOver,
            caloricNeeds,
            dailyFoodAmount
        });
    };

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
                Calorie Calculator
            </h1>
            <h3 className="text-center mb-8 text-gray-600">
                Calculate the daily energy needs of your dog or cat easily!
            </h3>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    className={`px-6 py-3 text-lg font-semibold rounded-lg transition-colors ${
                        isCatSelected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={handleCatClick}
                >
                    Cat
                </button>
                <button
                    className={`px-6 py-3 text-lg font-semibold rounded-lg transition-colors ${
                        !isCatSelected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={handleDogClick}
                >
                    Dog
                </button>
            </div>

            {errorMessage && (
                <div className="text-center text-red-600 mb-8">
                    <div className="text-6xl font-bold">404</div>
                    <div className="text-xl">{errorMessage}</div>
                </div>
            )}

            {formVisible && (
                <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                    <fieldset className="border border-gray-300 rounded-lg p-4">
                        <legend className="text-lg font-semibold px-2">Lifestage</legend>
                        <div className="flex gap-4 mb-4">
                            <button
                                type="button"
                                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                                    formData.gender === 'male'
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                                onClick={() => handleGenderSelect('male')}
                            >
                                His name is
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                                    formData.gender === 'female'
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                                onClick={() => handleGenderSelect('female')}
                            >
                                Her name is
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your dog&apos;s name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your pet's name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div>
                                <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Breed:</label>
                                <div className="relative">
                                    <input
                                        list="breeds"
                                        id="breed"
                                        value={formData.breed}
                                        onChange={handleInputChange}
                                        placeholder="Type to search..."
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pr-10"
                                    />
                                    <ChevronUpDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                </div>
                                  <datalist id="breeds">
                                  <option value="Afghan Hound" />
                                  <option value="Akita Inu" />
                                  <option value="Alaskan Malamute" />
                                  <option value="Basenji" />
                                  <option value="Basset Hound" />
                                  <option value="Beagle" />
                                  <option value="Bernese Mountain Dog" />
                                  <option value="Bichon Frise" />
                                  <option value="Bolognese" />
                                  <option value="Border Collie" />
                                  <option value="Borzoi" />
                                  <option value="Boxer" />
                                  <option value="Bull Terrier" />
                                  <option value="Bulldog" />
                                  <option value="Cavalier King Charles Spaniel" />
                                  <option value="Chihuahua" />
                                  <option value="Chow Chow" />
                                  <option value="Cocker Spaniel" />
                                  <option value="Collie" />
                                  <option value="Dachshund" />
                                  <option value="Dalmatian" />
                                  <option value="Doberman" />
                                  <option value="Drever" />
                                  <option value="French Bulldog" />
                                  <option value="German Shepherd" />
                                  <option value="Golden Retriever" />
                                  <option value="Great Dane" />
                                  <option value="Greyhound" />
                                  <option value="Italian Greyhound" />
                                  <option value="Jack Russell Terrier" />
                                  <option value="Japanese Spitz" />
                                  <option value="Labrador Retriever" />
                                  <option value="Landseer" />
                                  <option value="Lhasa Apso" />
                                  <option value="Maltese" />
                                  <option value="Manchester Terrier" />
                                  <option value="Mastiff" />
                                  <option value="Miniature Schnauzer" />
                                  <option value="Mudi" />
                                  <option value="Newfoundland" />
                                  <option value="Papillon" />
                                  <option value="Pembroke Welsh Corgi" />
                                  <option value="Pekingese" />
                                  <option value="Pitbull" />
                                  <option value="Pomeranian" />
                                  <option value="Poodle (Miniature)" />
                                  <option value="Pug" />
                                  <option value="Rottweiler" />
                                  <option value="Saint Bernard" />
                                  <option value="Samoyed" />
                                  <option value="Schnauzer" />
                                  <option value="Shetland Sheepdog" />
                                  <option value="Shiba Inu" />
                                  <option value="Shih Tzu" />
                                  <option value="Siberian Husky" />
                                  <option value="Thai Bangkaew" />
                                  <option value="Thai Ridgeback" />
                                  <option value="Welsh Terrier" />
                                  <option value="Yorkshire Terrier" />
                              </datalist>
                            </div>

                            <div>
                                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth:</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        id="dob"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pr-10"
                                    />
                                    <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg):</label>
                                <input
                                    type="number"
                                    id="weight"
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                    placeholder="Enter weight in kg"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="border border-gray-300 rounded-lg p-4">
                        <legend className="text-lg font-semibold px-2">Lifestyle</legend>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="activity-level" className="block text-sm font-medium text-gray-700">Activity Level:</label>
                                <select
                                    id="activityLevel"
                                    value={formData.activityLevel}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                >
                                    <option value="0">Less active (&lt; 1hr/day)</option>
                                    <option value="1">Average activity (1-1.5hr/day)</option>
                                    <option value="2">More active (1.5-2hr/day)</option>
                                    <option value="3">Highly active/working (&gt;2hr/day)</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="desexed" className="block text-sm font-medium text-gray-700">Is your dog desexed?</label>
                                <select
                                    id="desexed"
                                    value={formData.desexed}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="body-condition" className="block text-sm font-medium text-gray-700">Body Condition Score (1-9):</label>
                                <div className="text-center text-2xl font-bold mb-2">{formData.bodyCondition}</div>
                                <input
                                    type="range"
                                    id="bodyCondition"
                                    min="1"
                                    max="9"
                                    step="0.5"
                                    value={formData.bodyCondition}
                                    onChange={handleInputChange}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <p className="mt-2 text-sm text-gray-600">Use the score to assess your pet&apos;s body condition based on this <a href="link-to-chart" className="text-blue-600 hover:underline">chart</a>.</p>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="border border-gray-300 rounded-lg p-4">
                        <legend className="text-lg font-semibold px-2">About your dog&apos;s food</legend>
                        <div>
                            <label htmlFor="food-calories" className="block text-sm font-medium text-gray-700">Calories in selected food:</label>
                            <input
                                type="number"
                                id="foodCalories"
                                value={formData.foodCalories}
                                onChange={handleInputChange}
                                placeholder="Enter calories per 100 grams"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <p className="mt-2 text-sm text-gray-600">Note: The entered value represents kilocalories (kcal) per 100 grams of the food.</p>
                        </div>
                    </fieldset>

                    <button
                        type="button"
                        className="w-full py-3 px-6 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={handleCalculate}
                    >
                        Calculate
                    </button>
                </form>
            )}

            {solution && !errorMessage && (
                <div className="mt-8 bg-gray-100 rounded-lg p-6 shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Results for {solution.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong>Date of Birth:</strong> {solution.dob}</p>
                        <p><strong>Age:</strong> {solution.age.years} years, {solution.age.months} months, {solution.age.days} days</p>
                        <p><strong>Gender:</strong> {solution.gender}</p>
                        <p><strong>Breed:</strong> {solution.breed}</p>
                        <p><strong>Weight:</strong> {solution.weight} kg</p>
                        <p><strong>Body Condition Score:</strong> {solution.bodyCondition}</p>
                        <p><strong>Activity Level:</strong> {solution.activityLevel}</p>
                        <p><strong>Desexed:</strong> {solution.desexed === "yes" ? "Yes" : "No"}</p>
                        <p><strong>Calories in Selected Food:</strong> {solution.foodCalories} kcal/100g</p>
                    </div>
                    <hr className="my-4 border-gray-300" />
                    <h3 className="text-xl font-semibold mb-2">Calculation Breakdown:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong>Approx Ideal Weight:</strong> {solution.idealWeight.toFixed(1)} kg</p>
                        <p><strong>% Over/Under Weight:</strong> {solution.percentOver.toFixed(0)}%</p>
                        <p><strong>Approx Daily Calories:</strong> {Math.round(solution.caloricNeeds)} kcal/day</p>
                        <p><strong>Suggested Starting Daily Feeding Amount:</strong> {Math.round(solution.dailyFoodAmount)} g</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodCalculator;

