"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { counselorAPI } from "../../service/client";

// ------------------ Constant Options ------------------

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

const CERTIFICATIONS = [
  "Mental Health First Aid",
  "Peer Support Certification",
  "Psychological First Aid (PFA)",
  "QPR / Suicide Prevention",
  "Trauma-Informed Care",
  "Active Listening",
  "Coaching Certificate",
  "Other",
];

const MENTOR_STYLES = [
  "Empathetic & Supportive",
  "Calm & Understanding",
  "Motivational",
  "Structured & Step-by-Step",
  "Good Listener",
  "Practical & Solution-Oriented",
];

const MENTEE_TYPES = [
  "Emotional Support",
  "Accountability",
  "Better Study Habits",
  "Stress/Anxiety Support",
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

const COMMUNICATION_OPTIONS = [
  "Text Chat",
  "Voice Calls",
  "Video Calls",
  "Message-Only Support",
];

const AGE_RANGES = [
  "Any",
  "13-17",
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55+",
];

// ------------------ Helper ------------------

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ------------------ Main Component ------------------

export default function MentorForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      mentorAge: "",
      profession: "",
      degreeLevel: "",
      experienceYears: 0,
      supportAreas: [],
      certifications: [],
      mentoringStyle: "",
      menteePreference: "",
      menteePreferenceAge: "Any",
      avoidTopics: "",
      communication: "",
      maxMentees: "2",
      availability: "",
      timezone: "",
      comfortLevels: {},
      canHandleCrisis: "no",
    },
  });

  const mutation = useMutation({
    mutationFn: (payload) => counselorAPI.submitApplication(payload),
    onSuccess: () => {
      alert("Mentor profile saved successfully.");
      reset();
    },
    onError: (err) => alert("Failed to submit: " + (err?.message || "Unknown error")),
  });

  const onSubmit = (data) => {
    const payload = {
      profession: data.profession?.trim(),
      degreeLevel: data.degreeLevel || "",
      experienceYears: Number(data.experienceYears) || 0,
      supportAreas: data.supportAreas || [],
      certifications: data.certifications || [],
      personalityStyle: data.mentoringStyle ? [data.mentoringStyle] : [],
      communicationStyles: data.communication ? [data.communication] : [],
      preferredMenteeGoals: data.menteePreference ? [data.menteePreference] : [],
      menteeAgePreference: data.menteePreferenceAge || "Any",
      avoidTopics: data.avoidTopics ? [data.avoidTopics] : [],
      availability: data.availability || "",
      timezone: data.timezone || "",
      maxMentees: Number(data.maxMentees) || 2,
      canHandleCrisis: data.canHandleCrisis || "no",
      comfortLevels: data.comfortLevels || {},
    };

    console.log("Final Mentor Payload:", payload);
    mutation.mutate(payload);
  };

  const CheckboxGrid = ({ options, name }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-2 border rounded p-2 hover:shadow cursor-pointer"
        >
          <input type="checkbox" value={opt} {...register(name)} />
          <span className="text-sm">{opt}</span>
        </label>
      ))}
    </div>
  );

  const ComfortSlider = ({ topic }) => {
    const field = `comfortLevels.${topic}`;
    return (
      <div className="flex items-center gap-4 mt-3">
        <span className="w-52 text-sm">{topic}</span>
        <input
          type="range"
          min="1"
          max="5"
          defaultValue="3"
          {...register(field, { valueAsNumber: true })}
        />
        <span className="w-6 text-right text-sm">{watch(field) ?? 3}</span>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 my-10 bg-white rounded-xl shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">Profession Profile</h1>

        {/* Mentor Age + Profession + Degree + Experience */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-semibold">Your Age</label>
            <input
              type="number"
              {...register("mentorAge", { valueAsNumber: true })}
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="e.g., 25"
              min="18"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Profession / Role</label>
            <input
              type="text"
              {...register("profession", {
                required: "Profession is required",
                minLength: { value: 3, message: "Too short" },
              })}
              className={cx(
                "mt-1 w-full rounded border px-3 py-2",
                errors.profession && "border-red-500"
              )}
              placeholder="e.g., Therapist, Psychologist, Peer Counselor"
            />
            {errors.profession && (
              <p className="text-red-500 text-xs mt-1">{errors.profession.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">Degree Level</label>
            <select {...register("degreeLevel")} className="mt-1 w-full rounded border px-3 py-2">
              <option value="">— Select —</option>
              <option value="bachelor">Bachelor's</option>
              <option value="master">Master's</option>
              <option value="phd">PhD</option>
              <option value="professional">Professional Certification</option>
              <option value="none">None</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Experience (Years)</label>
            <input
              type="number"
              {...register("experienceYears", { valueAsNumber: true, required: "Experience required" })}
              className="mt-1 w-full rounded border px-3 py-2"
              min="0"
            />
          </div>
        </div>

        {/* Support Areas */}
        <section>
          <h2 className="font-semibold">Support Areas you can help with</h2>
          <CheckboxGrid options={SUPPORT_AREAS} name="supportAreas" />
        </section>

        {/* Certifications */}
        <section>
          <h2 className="font-semibold mt-4">Certifications</h2>
          <CheckboxGrid options={CERTIFICATIONS} name="certifications" />
        </section>

        {/* Comfort Levels */}
        <section className="mt-4">
          <h2 className="font-semibold">Comfort supporting topics (1–5)</h2>
          {["Stress", "Anxiety", "Low Mood / Depression", "Sleep Issues", "Identity Concerns", "Relationship Stress"].map((topic) => (
            <ComfortSlider key={topic} topic={topic} />
          ))}
        </section>

        {/* Mentoring Style + Preferred Mentee */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm font-semibold">Mentoring Style</label>
            <select {...register("mentoringStyle")} className="mt-1 w-full rounded border px-3 py-2">
              <option value="">— Select —</option>
              {MENTOR_STYLES.map((style) => (
                <option key={style}>{style}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Preferred Mentee Type</label>
            <select {...register("menteePreference")} className="mt-1 w-full rounded border px-3 py-2">
              <option value="">— Select —</option>
              {MENTEE_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mentee Age Preference */}
        <section>
          <label className="text-sm font-semibold">Preferred Mentee Age Range</label>
          <select {...register("menteePreferenceAge")} className="mt-1 w-full rounded border px-3 py-2">
            {AGE_RANGES.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </section>

        {/* Avoid Topics */}
        <section>
          <label className="text-sm font-semibold">Topics you prefer to avoid</label>
          <select {...register("avoidTopics")} className="mt-1 w-full rounded border px-3 py-2">
            <option value="">— Select —</option>
            {AVOID_TOPIC_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </section>

        {/* Communication Style */}
        <section>
          <label className="text-sm font-semibold">Preferred Communication Style</label>
          <select {...register("communication")} className="mt-1 w-full rounded border px-3 py-2">
            <option value="">— Select —</option>
            {COMMUNICATION_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </section>

        {/* Crisis Support */}
        <section className="mt-4">
          <h2 className="text-sm font-semibold">Crisis-level support ability</h2>
          <div className="mt-2 flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" value="no" {...register("canHandleCrisis")} />
              I cannot support crisis situations
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="yes" {...register("canHandleCrisis")} />
              I am trained for crisis support
            </label>
          </div>
        </section>

        {/* Max Mentees / Availability / Timezone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="text-sm font-semibold">Max Mentees</label>
            <select {...register("maxMentees")} className="mt-1 w-full rounded border px-3 py-2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="5">5</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Availability</label>
            <select {...register("availability")} className="mt-1 w-full rounded border px-3 py-2">
              <option value="">— Select —</option>
              {AVAILABILITY_OPTIONS.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Timezone</label>
            <input
              type="text"
              placeholder="e.g., GMT+1"
              {...register("timezone")}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className={cx(
              "px-5 py-3 rounded text-white",
              mutation.isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            )}
          >
            {mutation.isLoading ? "Submitting..." : "Save Mentor Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}