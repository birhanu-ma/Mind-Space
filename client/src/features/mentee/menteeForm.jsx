"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { menteeAPI } from "../../service/client";

// ------------------ Options ------------------

const SUPPORT_AREAS = [
  "Academic Stress",
  "Anxiety",
  "Low Mood / Depression",
  "Sleep Issues",
  "Motivation Problems",
  "Confidence / Self-Esteem",
  "Loneliness",
  "Time Management",
  "Burnout",
];

const MENTOR_STYLES = [
  "Empathetic & Supportive",
  "Calm & Understanding",
  "Motivational",
  "Structured & Step-by-Step",
  "Good Listener",
  "Practical & Solution-Oriented",
];

const GOALS = [
  "Emotional Support",
  "Accountability",
  "Better Study Habits",
  "Stress/Anxiety Coping",
  "Peer Understanding",
  "Productivity Strategy",
];

const AVOID_TOPIC_OPTIONS = [
  "Trauma",
  "Self-harm topics",
  "Substance use",
  "Relationship issues",
  "Identity topics",
  "None",
];

const AVAILABILITY_OPTIONS = [
  "Weekday Mornings",
  "Weekday Evenings",
  "Weekends",
  "Flexible",
  "Scheduled Sessions Only",
];

const AGE_PREFERENCE_OPTIONS = [
  "Any Age",
  "13-17",
  "18-24",
  "25-34",
  "35-44",
  "45+",
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ------------------ Mentee Form ------------------

export default function MenteeForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      supportAreas: [],
      primaryGoal: "",
      secondaryGoal: "",
      preferredMentorPersonality: [],
      communication: "text",
      comfortLevel: "medium",
      avoidTopics: "",
      priorityFactor: "supportArea",
      availability: "",
      agePreference: "Any Age",
    },
  });

  const mutation = useMutation({
    mutationFn: (payload) => menteeAPI.submitCounselorApplication(payload),
    onSuccess: () => {
      alert("Mentee profile saved successfully.");
      reset();
    },
    onError: (error) =>
      alert("Error submitting form: " + (error?.message || "")),
  });

  const onSubmit = (data) => {
    const payload = {
      supportAreas: data.supportAreas || [],
      primaryGoal: data.primaryGoal,
      secondaryGoal: data.secondaryGoal,
      preferredMentorPersonality: data.preferredMentorPersonality || [],
      communication: data.communication,
      comfortLevel: data.comfortLevel,
      avoidTopics: data.avoidTopics,
      priorityFactor: data.priorityFactor,
      availability: data.availability,
      agePreference: data.agePreference,
    };

    console.log("Final Mentee Payload:", payload);
    mutation.mutate(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-8 bg-white shadow-lg rounded-xl  border"
    >
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Mentee Profile</h2>

      {/* Support Areas */}
      <section>
        <label className="block font-semibold text-gray-700 mb-1">
          What do you want support with?
        </label>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {SUPPORT_AREAS.map((item) => (
            <label
              key={item}
              className="flex gap-2 items-center text-gray-700"
            >
              <input type="checkbox" value={item} {...register("supportAreas")} />
              {item}
            </label>
          ))}
        </div>
      </section>

      {/* Goals */}
      <section>
        <label className="block font-semibold text-gray-700">Primary Goal</label>
        <select
          {...register("primaryGoal", { required: true })}
          className={cx(
            "border p-3 rounded-md w-full mt-1",
            errors.primaryGoal && "border-red-500"
          )}
        >
          <option value="">Select...</option>
          {GOALS.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        {errors.primaryGoal && (
          <p className="text-red-500 text-xs mt-1">Primary Goal is required</p>
        )}
      </section>

      <section>
        <label className="block font-semibold text-gray-700">
          Secondary Goal
        </label>
        <select
          {...register("secondaryGoal")}
          className="border p-3 rounded-md w-full mt-1"
        >
          <option value="">Select...</option>
          {GOALS.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </section>

      {/* Preferred Mentor Personality */}
      <section>
        <label className="block font-semibold text-gray-700">
          Preferred Mentor Personality
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {MENTOR_STYLES.map((p) => (
            <label
              key={p}
              className="flex gap-2 items-center text-gray-700"
            >
              <input
                type="checkbox"
                value={p}
                {...register("preferredMentorPersonality")}
              />
              {p}
            </label>
          ))}
        </div>
      </section>

      {/* Age Preference */}
      <section>
        <label className="block font-semibold text-gray-700 mt-2">
          Preferred Mentor Age Range
        </label>
        <select
          {...register("agePreference")}
          className="border p-3 rounded-md w-full mt-1"
        >
          {AGE_PREFERENCE_OPTIONS.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </section>

      {/* Comfort Level */}
      <section>
        <label className="block font-semibold text-gray-700">
          Comfort Level Discussing Mental Health Topics
        </label>
        <select
          {...register("comfortLevel")}
          className="border p-3 rounded-md w-full mt-1"
        >
          <option value="high">Comfortable</option>
          <option value="medium">Somewhat comfortable</option>
          <option value="low">Prefer light topics</option>
        </select>
      </section>

      {/* Avoid Topics */}
      <section>
        <label className="block font-semibold text-gray-700">
          Topics You Prefer to Avoid
        </label>
        <select
          {...register("avoidTopics")}
          className="border p-3 rounded-md w-full mt-1"
        >
          <option value="">Select...</option>
          {AVOID_TOPIC_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </section>

      {/* Priority Factor */}
      <section>
        <label className="block font-semibold text-gray-700">
          What’s Most Important in a Mentor Match?
        </label>
        <select
          {...register("priorityFactor")}
          className="border p-3 rounded-md w-full mt-1"
        >
          <option value="personality">Personality Compatibility</option>
          <option value="supportArea">Support-Area Fit</option>
          <option value="availability">Availability Match</option>
          <option value="communication">Communication Style</option>
        </select>
      </section>

      {/* Communication */}
      <section>
        <label className="block font-semibold text-gray-700">
          Preferred Communication Style
        </label>
        <select
          {...register("communication")}
          className="border p-3 rounded-md w-full mt-1"
        >
          <option value="text">Text Chat</option>
          <option value="voice">Voice Calls</option>
          <option value="video">Video Calls</option>
          <option value="message">Message-Only Support</option>
        </select>
      </section>

      {/* Availability */}
      <section>
        <label className="block font-semibold text-gray-700">
          Availability
        </label>
        <select
          {...register("availability")}
          className="border p-3 rounded-md w-full mt-1"
        >
          <option value="">Select...</option>
          {AVAILABILITY_OPTIONS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </section>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
