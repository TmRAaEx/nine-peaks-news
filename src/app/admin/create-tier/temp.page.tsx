"use client";

import "@/styles/admin.css";
import { useState } from "react";

export default function CreateTierForm({
  createTier,
}: {
  createTier: (formData: FormData) => void;
}) {
  const [benefitFields, setBenefitFields] = useState<string[]>([""]);

  const handleAddBenefitField = () => {
    if (benefitFields.length < 2) {
      setBenefitFields([...benefitFields, ""]);
    }
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updated = [...benefitFields];
    updated[index] = value;
    setBenefitFields(updated);
  };

  return (
    <section className="dashboard-section subscribers">
      <div className="list-container subscribers">
        <h3>Create new tier</h3>
      </div>
      <div className="form-container create-tier">
        <form action={createTier}>
          <label htmlFor="name">Tier Name</label>
          <input type="text" name="name" />

          <label htmlFor="price">Tier Price</label>
          <input type="text" name="price" />

          {benefitFields.map((val, i) => (
            <div key={i}>
              <label>Benefit {i + 1}</label>
              <input
                type="text"
                name="benefits"
                value={val}
                onChange={(e) => handleBenefitChange(i, e.target.value)}
              />
            </div>
          ))}

          {benefitFields.length < 2 && (
            <button type="button" onClick={handleAddBenefitField}>
              + Add Benefit
            </button>
          )}

          <button type="submit">Create Tier</button>
        </form>
      </div>
    </section>
  );
}
